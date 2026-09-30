import { useEffect } from "react";
import { useLocation } from "react-router";

/**
 * Page-level behaviour shared by every OneCare page:
 *  - theme-color is OneCare teal while the page is open, restored on leave;
 *  - a #hash (from the nav, footer or another page) scrolls its section into
 *    view once rendered, and again whenever the hash changes;
 *  - a plain route change starts at the top.
 */
export function useOneCarePage() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    const prev = meta?.content;
    meta?.setAttribute("content", "#2E7A75");
    return () => { if (meta && prev) meta.setAttribute("content", prev); };
  }, []);

  useEffect(() => {
    const id = hash.slice(1);
    if (!id) {
      window.scrollTo({ top: 0 });
      return;
    }
    const raf = requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
    return () => cancelAnimationFrame(raf);
  }, [pathname, hash]);
}
