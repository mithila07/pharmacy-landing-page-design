import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ImageWithFallback } from "./figma/ImageWithFallback";

// Resting offset/scale/opacity per rank in the deck (0 = front). Rotation is
// NOT set here — each photo carries its own random tilt (see `tilts` below).
const STACK = [
  { x: 0, y: -10, scale: 1.0, op: 1, z: 50 },
  { x: 34, y: 14, scale: 0.94, op: 1, z: 40 },
  { x: -26, y: 34, scale: 0.89, op: 0.97, z: 30 },
  { x: 28, y: 52, scale: 0.85, op: 0.92, z: 20 },
  { x: -12, y: 66, scale: 0.82, op: 0.86, z: 10 },
];

/**
 * Infinite stacked-photo carousel. Each photo keeps its own random tilt, so the
 * deck reads like a scattered pile of prints. The front photo flings off and
 * re-joins the bottom of the deck; the rest shift forward one rank. Built with GSAP.
 */
export function StoryStack({ images, interval = 3200 }: { images: string[]; interval?: number }) {
  const root = useRef<HTMLDivElement>(null);
  const cards = useRef<HTMLDivElement[]>([]);

  useLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = cards.current.filter(Boolean);
    const n = els.length;
    if (!n) return;

    const order = images.map((_, i) => i); // front → back
    const tilts = images.map(() => gsap.utils.random(-8, 8, 0.1)); // one random tilt per photo
    const rank = (p: number) => STACK[Math.min(p, STACK.length - 1)];

    let timer: number | undefined;
    let animating = false;
    let teardown = () => {};

    const ctx = gsap.context(() => {
      const layout = (animate: boolean) => {
        order.forEach((idx, p) => {
          const el = els[idx];
          const s = rank(p);
          gsap.set(el, { zIndex: s.z });
          const to = { xPercent: -50, yPercent: -50, x: s.x, y: s.y, rotate: tilts[idx], scale: s.scale, autoAlpha: s.op };
          if (animate) gsap.to(el, { ...to, duration: 0.6, ease: "power3.out" });
          else gsap.set(el, to);
        });
      };
      layout(false);

      const advance = () => {
        if (animating || n < 2) return;
        animating = true;
        const frontImg = order[0];
        const frontEl = els[frontImg];
        const tl = gsap.timeline({ onComplete: () => { animating = false; } });
        tl.to(frontEl, { x: "+=170", y: "-=28", rotate: tilts[frontImg] + 16, autoAlpha: 0, duration: 0.45, ease: "power2.in" });
        tl.add(() => {
          order.push(order.shift()!); // front photo goes to the back
          const b = rank(order.length - 1);
          gsap.set(frontEl, { zIndex: b.z, xPercent: -50, yPercent: -50, x: b.x, y: b.y, rotate: tilts[frontImg], scale: b.scale, autoAlpha: 0 });
          layout(true); // shift everyone forward; the returned photo fades in at the back
        });
      };

      if (!reduce) {
        const stop = () => { if (timer) { clearInterval(timer); timer = undefined; } };
        const start = () => { stop(); timer = window.setInterval(advance, interval); };
        const onClick = () => { advance(); start(); };
        const el = root.current;
        el?.addEventListener("mouseenter", stop);
        el?.addEventListener("mouseleave", start);
        el?.addEventListener("click", onClick);
        start();
        teardown = () => {
          stop();
          el?.removeEventListener("mouseenter", stop);
          el?.removeEventListener("mouseleave", start);
          el?.removeEventListener("click", onClick);
        };
      }
    }, root);

    return () => {
      teardown();
      if (timer) clearInterval(timer);
      ctx.revert();
    };
  }, [images, interval]);

  return (
    <div
      ref={root}
      className="relative isolate h-[500px] sm:h-[600px] cursor-pointer select-none"
      role="group"
      aria-label="Photographs from our history"
    >
      {images.map((src, i) => (
        <div
          key={i}
          ref={(el) => { if (el) cards.current[i] = el; }}
          className="absolute left-1/2 top-1/2 w-[320px] h-[400px] sm:w-[380px] sm:h-[480px] rounded-[1.5rem] overflow-hidden border-4 border-white shadow-2xl shadow-brand-primary/20 bg-brand-light will-change-transform"
        >
          <ImageWithFallback src={src} alt={`Strachans history ${i + 1}`} className="w-full h-full object-cover" />
        </div>
      ))}
    </div>
  );
}
