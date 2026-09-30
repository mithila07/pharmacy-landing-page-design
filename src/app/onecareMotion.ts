import { useLayoutEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * OneCare scroll reveals. Anything marked `data-reveal` inside `root` rises in
 * once as it enters the viewport, batched so neighbours stagger together.
 * Why it moves: it paces the page so each section lands as one idea.
 * Reduced motion: nothing is hidden or moved.
 */
export function useOcReveal(root: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    if (!root.current || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      gsap.set(items, { autoAlpha: 0, y: 32 });
      ScrollTrigger.batch(items, {
        start: "top 90%",
        once: true,
        onEnter: (batch) => gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.9, ease: "expo.out", stagger: 0.08, overwrite: true }),
      });
    }, root);
    // Images and web fonts shift layout after mount; re-measure once they settle.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh).catch(() => {});
    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, [root]);
}
