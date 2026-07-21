import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { ShieldCheck, Clock, Phone, ArrowRight, ArrowUpRight, ArrowLeft, Plane, Ear, Scale, Syringe } from "lucide-react";
import { kepplelaneBrand } from "../branding";
import { useOpenStatus } from "../openStatus";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import travelImg from "../../assets/travel.jpeg";
import earWaxImg from "../../assets/ear-wax.jpeg";
import weightImg from "../../assets/weight-loss.jpeg";
import throatImg from "../../assets/sorethroat.jpg";

/**
 * Kepple Lane hero.
 *
 * Same skeleton as the iCare hero — full-height split, CTA column pinned to the
 * site container on the left, full-bleed service imagery running off the right
 * edge — but the right side is a carousel rather than a hover accordion: one
 * service at a time, advancing on its own, with arrows and a progress rail.
 */
const SLIDES = [
  { id: "prv-travel-consult", name: "Travel vaccinations", tag: "From £25", desc: "Pre-travel risk assessment, antimalarials and yellow fever certificates issued on the day.", Icon: Plane, img: travelImg },
  { id: "prv-ear-wax", name: "Ear microsuction", tag: "From £40", desc: "Comfortable wax removal by a trained clinician — usually one short appointment.", Icon: Ear, img: earWaxImg },
  { id: "prv-weight-consult", name: "Weight management", tag: "From £30", desc: "A private plan built around you, including weight-loss injections where they're suitable.", Icon: Scale, img: weightImg },
  { id: "prv-flu-private", name: "Private flu jab", tag: "£20", desc: "For anyone not eligible on the NHS. No appointment needed for most patients.", Icon: Syringe, img: throatImg },
];

const INTERVAL = 5500;

export function HeroSectionKepple() {
  const brand = kepplelaneBrand;
  const branch = brand.locations[0];
  const navigate = useNavigate();
  const status = useOpenStatus(branch);

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const count = SLIDES.length;

  // Autoplay is motion the user didn't ask for — drop it under reduced-motion.
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

  // Touch/drag support on the desktop carousel.
  const dragStart = useRef<number | null>(null);
  const onPointerDown = (e: React.PointerEvent) => { dragStart.current = e.clientX; };
  const onPointerUp = (e: React.PointerEvent) => {
    if (dragStart.current === null) return;
    const dx = e.clientX - dragStart.current;
    dragStart.current = null;
    if (Math.abs(dx) > 60) go(index + (dx < 0 ? 1 : -1));
  };

  return (
    <section className="relative overflow-x-clip lg:h-[calc(100vh-68px)] lg:min-h-[36rem]">
      {/* Violet mesh ground */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 70% at 10% 15%, rgba(74,63,184,0.16), transparent 70%), radial-gradient(50% 60% at 45% 90%, rgba(169,155,240,0.20), transparent 70%), #F7F5FF",
        }}
      />

      <div className="relative w-full lg:h-full grid lg:grid-cols-[1fr_1.15fr] items-stretch">
        {/* ── Left — CTA column ── */}
        <div
          className="flex flex-col justify-center pr-6 lg:pr-12 py-12 lg:py-10"
          style={{ paddingLeft: "max(1rem, calc((100vw - 80rem) / 2 + 1rem))" }}
        >
          <p className="inline-flex items-center gap-2 text-[0.76rem] tracking-[0.18em] uppercase text-brand-primary mb-5" style={{ fontWeight: 700 }}>
            <ShieldCheck size={15} /> Healthy Living Pharmacy — Garstang
          </p>

          <h1 className="text-[#1E1A3C] text-[2.6rem] lg:text-[3.7rem] leading-[1.04] mb-5" style={{ fontWeight: 700, letterSpacing: "-0.025em" }}>
            Good health,
            <br />
            <span className="kl-grad-text">close to home.</span>
          </h1>

          <p className="text-[#5A5578] text-[1.05rem] leading-relaxed mb-8 max-w-md">
            NHS Pharmacy First, dispensing and private clinics in Garstang — seven days a week, no trip into Preston.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => scrollTo("nhs-services")}
              className="kl-btn-gradient group inline-flex items-center justify-center gap-2 px-8 min-h-[52px] rounded-full text-[1rem] cursor-pointer"
              style={{ fontWeight: 700 }}
            >
              Book an appointment <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href={`tel:${branch.phone.replace(/\s/g, "")}`}
              className="group inline-flex items-center justify-center gap-2 px-7 min-h-[52px] rounded-full text-[0.95rem] cursor-pointer no-underline bg-white/70 backdrop-blur-sm border border-[#DED9F7] text-brand-primary hover:bg-white hover:border-brand-primary/40 transition-all"
              style={{ fontWeight: 600 }}
            >
              <Phone size={16} className="group-hover:rotate-12 transition-transform" /> {branch.phone}
            </a>
          </div>

          {/* Live opening status */}
          <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#DED9F7] bg-white/75 backdrop-blur-sm px-3.5 py-2 text-[0.84rem]" style={{ fontWeight: 600 }}>
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                {status.open && !reduced && <span className="absolute inline-flex h-full w-full rounded-full bg-brand-secondary opacity-75 animate-ping" />}
                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${status.open ? "bg-brand-secondary" : "bg-amber-400"}`} />
              </span>
              <span className="text-[#1E1A3C]">{status.label}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-[0.84rem] text-[#5A5578]">
              <Clock size={14} className="text-brand-accent" />
              {status.detail ? `${status.detail} · ` : ""}Kepple Lane, Garstang
            </span>
          </div>
        </div>

        {/* ── Right — service carousel, full-bleed (desktop) ── */}
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
          {/* Track */}
          <div
            className="flex h-full will-change-transform"
            style={{
              transform: `translate3d(-${index * 100}%, 0, 0)`,
              transition: reduced ? "none" : "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            {SLIDES.map((s, i) => {
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
                  {/* Violet scrim — heavier at the foot where the copy sits */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(180deg, rgba(23,18,67,0.30) 0%, rgba(23,18,67,0.15) 35%, rgba(23,18,67,0.78) 78%, rgba(23,18,67,0.94) 100%)" }}
                  />

                  {/* Copy */}
                  <div className="absolute inset-x-0 bottom-0 px-12 pb-24 max-w-[34rem]">
                    <div className="flex items-center gap-2.5 mb-4">
                      <span className="w-10 h-10 rounded-full bg-white/15 ring-1 ring-white/25 backdrop-blur-sm flex items-center justify-center shrink-0">
                        <s.Icon size={18} className="text-white" />
                      </span>
                      <span className="inline-block text-[0.7rem] px-2.5 py-1 rounded-full bg-white/95 text-brand-primary" style={{ fontWeight: 700 }}>{s.tag}</span>
                    </div>
                    <h2 className="text-white text-[2.1rem] leading-tight mb-2.5" style={{ fontWeight: 700, letterSpacing: "-0.015em" }}>{s.name}</h2>
                    <p className="text-white/80 text-[0.95rem] leading-relaxed mb-6 max-w-[26rem]">{s.desc}</p>
                    <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-brand-primary text-[0.85rem]" style={{ fontWeight: 600 }}>
                      Book now <ArrowUpRight size={15} />
                    </span>
                  </div>
                </a>
              );
            })}
          </div>

          {/* ── Controls — siblings of the track so they sit above it ── */}
          {/* Progress rail, bottom-left */}
          <div className="absolute left-12 bottom-10 flex items-center gap-2.5 z-20">
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                onClick={() => go(i)}
                aria-label={`Show ${s.name}`}
                aria-current={i === index}
                className="group py-2 cursor-pointer"
              >
                <span
                  className={`block h-1 rounded-full transition-all duration-300 ${
                    i === index ? "w-10 bg-white" : "w-5 bg-white/40 group-hover:bg-white/70"
                  }`}
                />
              </button>
            ))}
            <span className="ml-2 text-[0.78rem] text-white/70 tabular-nums" style={{ fontWeight: 600 }}>
              {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </span>
          </div>

          {/* Arrows, bottom-right */}
          <div className="absolute right-12 bottom-10 flex items-center gap-2.5 z-20">
            <button
              onClick={() => go(index - 1)}
              aria-label="Previous service"
              className="w-11 h-11 rounded-full border border-white/35 bg-white/10 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white hover:text-brand-primary hover:border-white transition-all cursor-pointer"
            >
              <ArrowLeft size={17} />
            </button>
            <button
              onClick={() => go(index + 1)}
              aria-label="Next service"
              className="w-11 h-11 rounded-full border border-white/35 bg-white/10 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white hover:text-brand-primary hover:border-white transition-all cursor-pointer"
            >
              <ArrowRight size={17} />
            </button>
          </div>

          {/* Announce slide changes to screen readers without moving focus */}
          <p className="sr-only" aria-live="polite">
            Slide {index + 1} of {count}: {SLIDES[index].name}
          </p>
        </div>

        {/* ── Mobile — touch-native snap carousel ── */}
        <div className="lg:hidden pb-12">
          <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory px-4 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {SLIDES.map((s) => (
              <a
                key={s.id}
                href={`${brand.basePath}/book/${s.id}`}
                onClick={(e) => { e.preventDefault(); book(s.id); }}
                className="relative snap-start shrink-0 w-[72%] max-w-[19rem] aspect-[4/5] rounded-3xl overflow-hidden no-underline shadow-lg"
              >
                <ImageWithFallback src={s.img} alt="" className="absolute inset-0 w-full h-full object-cover" />
                <div aria-hidden="true" className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(23,18,67,0.10) 0%, rgba(23,18,67,0.55) 55%, rgba(23,18,67,0.90) 100%)" }} />
                <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 text-[0.68rem] px-2.5 py-1 rounded-full bg-white/95 text-brand-primary" style={{ fontWeight: 700 }}>
                  <s.Icon size={12} /> {s.tag}
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
