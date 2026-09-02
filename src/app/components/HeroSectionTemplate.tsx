import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { ShieldCheck, Clock, Phone, ArrowRight, ArrowUpRight, ArrowLeft } from "lucide-react";
import type { Brand } from "../branding";
import { useOpenStatus } from "../openStatus";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { templateSites } from "../data/templateSites";

/**
 * Shared Kepple-Lane-style hero for the template brands (J Morris, Acre,
 * Meadows). Full-height split: a CTA column pinned to the site container on the
 * left, and a full-bleed auto-advancing service carousel on the right. Brand-
 * neutral — colours come from the brand's `--brand-*` tokens, content from
 * `templateSites[brand.id]`.
 */
const INTERVAL = 5500;

export function HeroSectionTemplate({ brand }: { brand: Brand }) {
  const cfg = templateSites[brand.id].hero;
  const branch = brand.locations[0];
  const navigate = useNavigate();
  const status = useOpenStatus(branch);

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const count = cfg.slides.length;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (paused || reduced) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), INTERVAL);
    return () => clearInterval(id);
  }, [paused, reduced, count, index]);

  const go = useCallback((next: number) => setIndex(((next % count) + count) % count), [count]);
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const book = (id: string) => navigate(`${brand.basePath}/book/${id}`);

  const dragStart = useRef<number | null>(null);
  const onPointerDown = (e: React.PointerEvent) => { dragStart.current = e.clientX; };
  const onPointerUp = (e: React.PointerEvent) => {
    if (dragStart.current === null) return;
    const dx = e.clientX - dragStart.current;
    dragStart.current = null;
    if (Math.abs(dx) > 60) go(index + (dx < 0 ? 1 : -1));
  };

  return (
    <section className="relative overflow-x-clip lg:h-[calc(100vh-68px)] lg:min-h-[36rem] bg-brand-light">
      {/* Brand-tinted decorative blobs */}
      <div aria-hidden="true" className="absolute -top-24 -left-24 w-[34rem] h-[34rem] rounded-full bg-brand-primary/10 blur-3xl" />
      <div aria-hidden="true" className="absolute bottom-0 left-1/3 w-[30rem] h-[30rem] rounded-full bg-brand-accent/15 blur-3xl" />

      <div className="relative w-full lg:h-full grid lg:grid-cols-[1fr_1.15fr] items-stretch">
        {/* ── Left — CTA column ── */}
        <div
          className="flex flex-col justify-center pr-6 lg:pr-12 py-12 lg:py-10"
          style={{ paddingLeft: "max(1rem, calc((100vw - 80rem) / 2 + 1rem))" }}
        >
          <p className="inline-flex items-center gap-2 text-[0.76rem] tracking-[0.16em] uppercase text-brand-primary mb-5" style={{ fontWeight: 700 }}>
            <ShieldCheck size={15} /> {cfg.eyebrow}
          </p>

          <h1 className="font-display text-slate-900 text-[2.5rem] lg:text-[3.6rem] leading-[1.04] mb-5" style={{ fontWeight: 700, letterSpacing: "-0.02em" }}>
            {cfg.title1}
            <br />
            <span className="text-brand-secondary">{cfg.title2}</span>
          </h1>

          <p className="text-slate-500 text-[1.05rem] leading-relaxed mb-8 max-w-md">{cfg.subtitle}</p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => scrollTo("nhs-services")}
              className="group inline-flex items-center justify-center gap-2 px-8 min-h-[52px] rounded-full text-[1rem] cursor-pointer bg-brand-secondary text-white shadow-lg shadow-brand-secondary/25 hover:-translate-y-0.5 hover:shadow-xl transition-all"
              style={{ fontWeight: 700 }}
            >
              Book an appointment <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href={`tel:${branch.phone.replace(/\s/g, "")}`}
              className="group inline-flex items-center justify-center gap-2 px-7 min-h-[52px] rounded-full text-[0.95rem] cursor-pointer no-underline bg-white/70 backdrop-blur-sm border border-slate-200 text-brand-primary hover:bg-white hover:border-brand-primary/40 transition-all"
              style={{ fontWeight: 600 }}
            >
              <Phone size={16} className="group-hover:rotate-12 transition-transform" /> {branch.phone}
            </a>
          </div>

          {/* Live opening status */}
          <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/75 backdrop-blur-sm px-3.5 py-2 text-[0.84rem]" style={{ fontWeight: 600 }}>
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                {status.open && !reduced && <span className="absolute inline-flex h-full w-full rounded-full bg-brand-secondary opacity-75 animate-ping" />}
                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${status.open ? "bg-brand-secondary" : "bg-amber-400"}`} />
              </span>
              <span className="text-slate-900">{status.label}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-[0.84rem] text-slate-500">
              <Clock size={14} className="text-brand-accent" />
              {status.detail ? `${status.detail} · ` : ""}{branch.shortName}
            </span>
          </div>
        </div>

        {/* ── Right — service carousel (desktop) ── */}
        <div
          className="hidden lg:block relative h-full overflow-hidden"
          role="region"
          aria-roledescription="carousel"
          aria-label="Our most-booked services"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
        >
          <div
            className="flex h-full will-change-transform"
            style={{
              transform: `translate3d(-${index * 100}%, 0, 0)`,
              transition: reduced ? "none" : "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            {cfg.slides.map((s, i) => {
              const on = i === index;
              return (
                <a
                  key={s.id}
                  href={`${brand.basePath}/book/${s.id}`}
                  onClick={(e) => { e.preventDefault(); book(s.id); }}
                  tabIndex={on ? 0 : -1}
                  aria-hidden={!on}
                  aria-roledescription="slide"
                  aria-label={`${s.name} — ${s.tag}. Book this service.`}
                  className="relative shrink-0 w-full h-full block no-underline select-none outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-inset"
                >
                  <ImageWithFallback
                    src={s.img}
                    alt=""
                    draggable={false}
                    className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[6000ms] ease-out ${on && !reduced ? "scale-110" : "scale-100"}`}
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(180deg, rgba(15,23,42,0.28) 0%, rgba(15,23,42,0.12) 35%, rgba(15,23,42,0.76) 78%, rgba(15,23,42,0.92) 100%)" }}
                  />
                  <div className="absolute inset-x-0 bottom-0 px-12 pb-24 max-w-[34rem]">
                    <div className="flex items-center gap-2.5 mb-4">
                      <span className="w-10 h-10 rounded-full bg-white/15 ring-1 ring-white/25 backdrop-blur-sm flex items-center justify-center shrink-0">
                        <s.icon size={18} className="text-white" />
                      </span>
                      <span className="inline-block text-[0.7rem] px-2.5 py-1 rounded-full bg-white/95 text-brand-primary" style={{ fontWeight: 700 }}>{s.tag}</span>
                    </div>
                    <h2 className="font-display text-white text-[2.1rem] leading-tight mb-2.5" style={{ fontWeight: 700, letterSpacing: "-0.015em" }}>{s.name}</h2>
                    <p className="text-white/80 text-[0.95rem] leading-relaxed mb-6 max-w-[26rem]">{s.desc}</p>
                    <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-brand-primary text-[0.85rem]" style={{ fontWeight: 600 }}>
                      Book now <ArrowUpRight size={15} />
                    </span>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Progress rail */}
          <div className="absolute left-12 bottom-10 flex items-center gap-2.5 z-20">
            {cfg.slides.map((s, i) => (
              <button key={s.id} onClick={() => go(i)} aria-label={`Show ${s.name}`} aria-current={i === index} className="group py-2 cursor-pointer">
                <span className={`block h-1 rounded-full transition-all duration-300 ${i === index ? "w-10 bg-white" : "w-5 bg-white/40 group-hover:bg-white/70"}`} />
              </button>
            ))}
            <span className="ml-2 text-[0.78rem] text-white/70 tabular-nums" style={{ fontWeight: 600 }}>
              {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </span>
          </div>

          {/* Arrows */}
          <div className="absolute right-12 bottom-10 flex items-center gap-2.5 z-20">
            <button onClick={() => go(index - 1)} aria-label="Previous service" className="w-11 h-11 rounded-full border border-white/35 bg-white/10 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white hover:text-brand-primary hover:border-white transition-all cursor-pointer">
              <ArrowLeft size={17} />
            </button>
            <button onClick={() => go(index + 1)} aria-label="Next service" className="w-11 h-11 rounded-full border border-white/35 bg-white/10 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white hover:text-brand-primary hover:border-white transition-all cursor-pointer">
              <ArrowRight size={17} />
            </button>
          </div>

          <p className="sr-only" aria-live="polite">Slide {index + 1} of {count}: {cfg.slides[index].name}</p>
        </div>

        {/* ── Mobile — touch-native snap carousel ── */}
        <div className="lg:hidden pb-12">
          <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory px-4 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {cfg.slides.map((s) => (
              <a
                key={s.id}
                href={`${brand.basePath}/book/${s.id}`}
                onClick={(e) => { e.preventDefault(); book(s.id); }}
                className="relative snap-start shrink-0 w-[72%] max-w-[19rem] aspect-[4/5] rounded-3xl overflow-hidden no-underline shadow-lg"
              >
                <ImageWithFallback src={s.img} alt="" className="absolute inset-0 w-full h-full object-cover" />
                <div aria-hidden="true" className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(15,23,42,0.10) 0%, rgba(15,23,42,0.55) 55%, rgba(15,23,42,0.90) 100%)" }} />
                <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 text-[0.68rem] px-2.5 py-1 rounded-full bg-white/95 text-brand-primary" style={{ fontWeight: 700 }}>
                  <s.icon size={12} /> {s.tag}
                </span>
                <div className="absolute inset-x-3 bottom-3">
                  <h2 className="text-white text-[1.05rem] leading-tight mb-1" style={{ fontWeight: 700 }}>{s.name}</h2>
                  <span className="inline-flex items-center gap-1 text-white/85 text-[0.78rem]" style={{ fontWeight: 600 }}>Book now <ArrowUpRight size={13} /></span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
