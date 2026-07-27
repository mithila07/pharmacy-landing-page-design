import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { ArrowRight, ArrowLeft, Plane, Syringe, Ear, HeartPulse } from "lucide-react";
import { centralBrand } from "../branding";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import travelImg from "../../assets/travel.jpeg";
import vaccineImg from "../../assets/image-bg.jpeg";
import earWaxImg from "../../assets/ear-wax.jpeg";
import nhsImg from "../../assets/hero-bg.jpeg";

/**
 * Central Pharmacy — ALTERNATIVE full-width carousel hero (demo variant).
 *
 * Not wired in by default. `SimpleLanding` renders it for Central only when the
 * URL carries `?hero=carousel`, so the original hero stays the default and this
 * one can be shown side-by-side in a demo.
 *
 * Full-bleed background image per slide with a subtle scroll parallax and a slow
 * Ken Burns push; centred eyebrow / title / subtitle; and a call-to-action whose
 * label and destination change with the slide. All text sits on a petrol scrim
 * heavy enough that white copy clears WCAG AA.
 */
type Slide = {
  eyebrow: string;
  title: string;
  subtitle: string;
  cta: string;
  Icon: typeof Plane;
  img: string;
  /** Book this service, or scroll to a section id when there's no single service. */
  bookId?: string;
  scrollTo?: string;
};

const SLIDES: Slide[] = [
  {
    eyebrow: "Travel Clinic",
    title: "Travel with confidence",
    subtitle: "Vaccinations, antimalarials and expert pre-travel advice — all in a single visit.",
    cta: "Get your travel jabs",
    Icon: Plane,
    img: travelImg,
    bookId: "prv-travel-consult",
  },
  {
    eyebrow: "Yellow Fever Centre",
    title: "A designated yellow fever centre",
    subtitle: "Certificated vaccination for at-risk destinations, issued the same day you visit.",
    cta: "Book yellow fever",
    Icon: Syringe,
    img: vaccineImg,
    bookId: "prv-yellowfever",
  },
  {
    eyebrow: "Ear Health",
    title: "Clearer hearing, same day",
    subtitle: "Gentle microsuction ear wax removal by a trained clinician — usually one short appointment.",
    cta: "Book ear microsuction",
    Icon: Ear,
    img: earWaxImg,
    bookId: "prv-ear-wax",
  },
  {
    eyebrow: "NHS Services",
    title: "Everyday NHS care, on your doorstep",
    subtitle: "Prescriptions, health checks and stop-smoking support — free to those who qualify.",
    cta: "See NHS services",
    Icon: HeartPulse,
    img: nhsImg,
    scrollTo: "nhs-services",
  },
];

const INTERVAL = 5000;

export function HeroSectionCentralAlt() {
  const brand = centralBrand;
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const count = SLIDES.length;

  const parallaxRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Respect reduced-motion: no autoplay, no parallax, no Ken Burns.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Autoplay.
  useEffect(() => {
    if (paused || reduced) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), INTERVAL);
    return () => clearInterval(id);
  }, [paused, reduced, count, index]);

  // Scroll parallax — nudge the background slower than the page (rAF-throttled).
  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = sectionRef.current;
        const bg = parallaxRef.current;
        if (!el || !bg) return;
        const rect = el.getBoundingClientRect();
        // Only while the hero is on screen; translate up to ~8% of its height.
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;
        const shift = Math.max(-1, Math.min(1, -rect.top / window.innerHeight)) * 8;
        bg.style.transform = `translate3d(0, ${shift}%, 0)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, [reduced]);

  const go = useCallback((next: number) => setIndex(((next % count) + count) % count), [count]);

  const act = (s: Slide) => {
    if (s.bookId) navigate(`${brand.basePath}/book/${s.bookId}`);
    else if (s.scrollTo) document.getElementById(s.scrollTo)?.scrollIntoView({ behavior: "smooth" });
  };

  const slide = SLIDES[index];

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden h-[86vh] min-h-[560px] max-h-[860px]"
      aria-roledescription="carousel"
      aria-label="Our services"
      // Autoplay keeps running under the mouse (demo requirement); it only pauses
      // for keyboard focus, so keyboard users aren't fighting a moving target.
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* Parallax layer — slightly taller than the section so it can shift without gaps */}
      <div ref={parallaxRef} className="absolute inset-x-0 -top-[8%] h-[116%] will-change-transform">
        {SLIDES.map((s, i) => {
          const on = i === index;
          return (
            <div
              key={s.title}
              aria-hidden={!on}
              className={`absolute inset-0 transition-opacity duration-[900ms] ease-out ${on ? "opacity-100" : "opacity-0"}`}
            >
              <ImageWithFallback
                // Re-mount the active image (key changes with index) so the Ken Burns
                // animation restarts on each slide.
                key={on ? `on-${index}` : "off"}
                src={s.img}
                alt=""
                draggable={false}
                className={`w-full h-full object-cover ${on && !reduced ? "cp-hero-kb" : ""}`}
              />
            </div>
          );
        })}
      </div>

      {/* Scrims — a full wash for baseline contrast, a heavier centre-weighted
          vignette so the centred title blends into the image while staying AA. */}
      <div aria-hidden="true" className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(5,25,28,0.55) 0%, rgba(5,25,28,0.32) 42%, rgba(5,25,28,0.66) 100%)" }} />
      <div aria-hidden="true" className="absolute inset-0" style={{ background: "radial-gradient(70% 70% at 50% 50%, rgba(5,25,28,0.55) 0%, rgba(5,25,28,0.12) 55%, transparent 100%)" }} />
      {/* Subtle single-hue brand tint (kept minimal — client prefers less colour) */}
      <div aria-hidden="true" className="absolute inset-0 mix-blend-soft-light" style={{ background: "linear-gradient(120deg, rgba(22,166,183,0.20), rgba(22,166,183,0.05))" }} />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        {/* key on the group re-triggers the rise animation each slide */}
        <div key={index} className="max-w-3xl mx-auto">
          <span className="cp-hero-rise inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full px-3.5 py-1.5 mb-5 text-white">
            <slide.Icon size={15} />
            <span className="text-[0.8rem] tracking-[0.12em] uppercase" style={{ fontWeight: 700 }}>{slide.eyebrow}</span>
          </span>

          <h1
            className="cp-hero-rise text-white text-[2.3rem] sm:text-[3rem] lg:text-[3.6rem] leading-[1.05] mb-4"
            style={{ fontWeight: 700, letterSpacing: "-0.02em", textShadow: "0 2px 24px rgba(5,25,28,0.5)" }}
          >
            {slide.title}
          </h1>

          <p className="cp-hero-rise cp-hero-rise-delay text-white/90 text-[1.05rem] sm:text-[1.15rem] leading-relaxed max-w-xl mx-auto mb-8" style={{ textShadow: "0 1px 12px rgba(5,25,28,0.5)" }}>
            {slide.subtitle}
          </p>

          <button
            key={`cta-${index}`}
            onClick={() => act(slide)}
            className="cp-hero-rise cp-hero-rise-delay group inline-flex items-center justify-center gap-2 bg-white text-brand-primary px-8 min-h-[52px] rounded-full text-[1rem] cursor-pointer hover:shadow-xl hover:-translate-y-0.5 transition-all"
            style={{ fontWeight: 700 }}
          >
            {slide.cta} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Dots — bottom centre */}
      <div className="absolute inset-x-0 bottom-7 z-20 flex items-center justify-center gap-2.5">
        {SLIDES.map((s, i) => (
          <button
            key={s.title}
            onClick={() => go(i)}
            aria-label={`Show ${s.eyebrow}`}
            aria-current={i === index}
            className="group py-2 cursor-pointer"
          >
            <span className={`block h-1.5 rounded-full transition-all duration-300 ${i === index ? "w-9 bg-white" : "w-2.5 bg-white/45 group-hover:bg-white/75"}`} />
          </button>
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={() => go(index - 1)}
        aria-label="Previous slide"
        className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full border border-white/35 bg-black/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white hover:text-brand-primary transition-all cursor-pointer"
      >
        <ArrowLeft size={18} />
      </button>
      <button
        onClick={() => go(index + 1)}
        aria-label="Next slide"
        className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full border border-white/35 bg-black/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white hover:text-brand-primary transition-all cursor-pointer"
      >
        <ArrowRight size={18} />
      </button>

      {/* Announce slide changes without moving focus */}
      <p className="sr-only" aria-live="polite">Slide {index + 1} of {count}: {slide.title}</p>
    </section>
  );
}
