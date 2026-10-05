import { useEffect } from "react";
import { useLocation } from "react-router";

/**
 * Page-level behaviour shared by every OneCare page:
 *  - theme-color is OneCare teal while the page is open, restored on leave;
 *  - a #hash (from the nav, footer or another page) scrolls its section into
 *    view once rendered, and again whenever the hash changes;
 *  - same-page section links scroll smoothly (instantly under reduced motion).
 */
export function useOneCarePage() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    const prev = meta?.content;
    meta?.setAttribute("content", "#2E7A75");
    return () => { if (meta && prev) meta.setAttribute("content", prev); };
  }, []);

  // Same-page section links (#nhs-services etc.) glide to their section. Done
  // here rather than with CSS `scroll-behavior: smooth`, which would also
  // animate page changes and leave a new page at the old scroll position.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest?.('a[href^="#"]');
      const id = link?.getAttribute("href")?.slice(1);
      const target = id ? document.getElementById(id) : null;
      if (!target) return;
      e.preventDefault();
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      // Keep the URL shareable without triggering a router navigation (and its scroll reset).
      window.history.replaceState(window.history.state, "", `#${id}`);
      // The skip link targets <main tabIndex={-1}>: move keyboard focus there too.
      if (target.hasAttribute("tabindex")) target.focus({ preventScroll: true });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Top-of-page on navigation is handled app-wide by RootLayout. Here we only
  // re-aim #hash links once images and fonts have had a frame to settle.
  useEffect(() => {
    const id = hash.slice(1);
    if (!id) return;
    const raf = requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
    return () => cancelAnimationFrame(raf);
  }, [pathname, hash]);
}
