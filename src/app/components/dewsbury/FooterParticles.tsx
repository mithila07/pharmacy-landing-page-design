import { useEffect, useRef } from "react";

type P = { x: number; y: number; r: number; vy: number; drift: number; phase: number; speed: number; lime: boolean };

/**
 * Subtle micro particles for the footer: tiny lime and white specks rising
 * slowly and twinkling. Decorative only (aria-hidden, no pointer events).
 * Runs only while the footer is on screen; with reduced motion it draws one
 * still frame instead of animating.
 */
export function FooterParticles() {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvas.current;
    const ctx = el?.getContext("2d");
    if (!el || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, dpr = 1, raf = 0, running = false;
    let parts: P[] = [];

    const seed = (): P => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 0.5 + Math.random() * 1.5,
      vy: 0.08 + Math.random() * 0.22,
      drift: 0.15 + Math.random() * 0.35,
      phase: Math.random() * Math.PI * 2,
      speed: 0.004 + Math.random() * 0.01,
      lime: Math.random() < 0.55,
    });

    const resize = () => {
      const box = el.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = box.width; h = box.height;
      el.width = Math.round(w * dpr); el.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // About one speck per 9,000 px², capped so large screens stay light
      const count = Math.min(140, Math.round((w * h) / 9000));
      parts = Array.from({ length: count }, seed);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        const twinkle = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(p.phase + t * p.speed * 0.06));
        const x = p.x + Math.sin(p.phase + t * 0.0004) * p.drift * 12;
        ctx.beginPath();
        ctx.arc(x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.lime ? `rgba(140, 210, 80, ${0.55 * twinkle})` : `rgba(255, 255, 255, ${0.4 * twinkle})`;
        ctx.shadowColor = p.lime ? "rgba(120, 195, 54, 0.6)" : "rgba(255, 255, 255, 0.5)";
        ctx.shadowBlur = p.r * 4;
        ctx.fill();
      }
    };

    const step = (t: number) => {
      for (const p of parts) {
        p.y -= p.vy;
        if (p.y < -4) { Object.assign(p, seed(), { y: h + 4 }); }
      }
      draw(t);
      raf = requestAnimationFrame(step);
    };

    const start = () => { if (!running && !reduce) { running = true; raf = requestAnimationFrame(step); } };
    const stop = () => { running = false; cancelAnimationFrame(raf); };

    resize();
    draw(0);
    const ro = new ResizeObserver(() => { resize(); draw(performance.now()); });
    ro.observe(el);
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()));
    io.observe(el);
    const onVis = () => (document.visibilityState === "visible" ? start() : stop());
    document.addEventListener("visibilitychange", onVis);

    return () => { stop(); ro.disconnect(); io.disconnect(); document.removeEventListener("visibilitychange", onVis); };
  }, []);

  return <canvas ref={canvas} aria-hidden="true" className="pointer-events-none absolute inset-0 w-full h-full" />;
}
