import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { ArrowLeft24Regular, ArrowRight24Regular, ArrowUpRight24Regular, CalendarCheckmark24Regular, Call24Regular } from "@fluentui/react-icons";
import { shivakemBrand } from "../branding";
import { SK_BRANCH, SK_HERO_SLIDES } from "../data/shivakem";
import { prefersReducedMotion } from "../onecareMotion";
import { BTN_PRIMARY, BTN_SECONDARY } from "./onecareUi";
import { Fl } from "./shivakemUi";
import { BookModalShivakem } from "./BookModalShivakem";

const BASE = shivakemBrand.basePath;
const INTERVAL = 5500;

/**
 * Shivakem hero, on the Kepple Lane skeleton: a full-height split with the
 * call-to-action column pinned to the site container on the left and a
 * full-bleed service carousel running off the right edge (one service at a
 * time, advancing on its own, with arrows and a progress rail). Phones get a
 * touch-native snap rail instead. Autoplay pauses on hover and focus and is
 * off under reduced motion.
 */
export function HeroSectionShivakem() {
  const [bookOpen, setBookOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced] = useState(prefersReducedMotion);
  const count = SK_HERO_SLIDES.length;
  const go = useCallback((n: number) => setIndex(((n % count) + count) % count), [count]);

  useEffect(() => {
    if (paused || reduced) return;
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % count), INTERVAL);
    return () => window.clearTimeout(id);
  }, [paused, reduced, count, index]);

  // Swipe on the desktop carousel too (touch laptops, trackpads with pointer drag).
  const dragStart = useRef<number | null>(null);
  const onPointerUp = (e: React.PointerEvent) => {
    if (dragStart.current === null) return;
    const dx = e.clientX - dragStart.current;
    dragStart.current = null;
    if (Math.abs(dx) > 60) go(index + (dx < 0 ? 1 : -1));
  };

  const tel = `tel:${SK_BRANCH.phone.replace(/\s/g, "")}`;

  return (
    <section aria-labelledby="sk-hero-title" className="sk-mesh relative -mt-[76px] overflow-x-clip lg:h-[100svh] lg:min-h-[40rem] lg:max-h-[60rem]">
      <div className="relative w-full lg:h-full grid lg:grid-cols-[1fr_1.15fr] items-stretch">
        {/* ── Left: call to action, aligned to the site container ── */}
        <div
          className="flex flex-col justify-center pr-4 sm:pr-6 lg:pr-12 pt-[124px] pb-12 lg:pt-[96px] lg:pb-10"
          style={{ paddingLeft: "max(1rem, calc((100vw - 1320px) / 2 + 2rem))" }}
        >
          <h1 id="sk-hero-title" className="oc-display !text-[clamp(2.75rem,1.6rem+4vw,4.6rem)] text-oc-ink">
            Health advice,
            <br />
            <span className="sk-grad-text">without the wait.</span>
          </h1>

          <p className="oc-lead text-oc-quiet mt-6 max-w-[44ch]">
            See a pharmacist today about everyday illnesses, collect your prescriptions, or book a private clinic when it suits you. All at 12a Court Parade, Wembley.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <button type="button" aria-haspopup="dialog" onClick={() => setBookOpen(true)} className={`${BTN_PRIMARY} group min-h-[52px] px-7`}>
              <Fl icon={CalendarCheckmark24Regular} size={20} /> Book an appointment
            </button>
            <a href={tel} className={`${BTN_SECONDARY} min-h-[52px] px-6 oc-tnum`}>
              <Fl icon={Call24Regular} size={20} /> {SK_BRANCH.phone}
            </a>
          </div>

        </div>

        {/* ── Right: full-bleed service carousel (desktop) ── */}
        <div
          className="hidden lg:block relative h-full overflow-hidden"
          role="region"
          aria-roledescription="carousel"
          aria-label="Popular services"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          onPointerDown={(e) => { dragStart.current = e.clientX; }}
          onPointerUp={onPointerUp}
        >
          <div
            className="flex h-full will-change-transform"
            style={{ transform: `translate3d(-${index * 100}%, 0, 0)`, transition: reduced ? "none" : "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)" }}
          >
            {SK_HERO_SLIDES.map((s, i) => {
              const on = i === index;
              return (
                <Link
                  key={s.id}
                  to={`${BASE}/book/${s.id}`}
                  tabIndex={on ? 0 : -1}
                  aria-hidden={!on}
                  aria-roledescription="slide"
                  aria-label={`${s.name}, ${s.tag}. Book this service.`}
                  draggable={false}
                  className="relative shrink-0 w-full h-full block no-underline select-none outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-white/80"
                >
                  <img
                    src={s.img}
                    alt=""
                    draggable={false}
                    className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[6000ms] ease-out ${on && !reduced ? "scale-110" : "scale-100"}`}
                  />
                  {/* Navy scrim, heavier at the foot where the copy sits */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(180deg, rgba(10,35,82,0.30) 0%, rgba(10,35,82,0.10) 35%, rgba(10,35,82,0.78) 78%, rgba(10,35,82,0.94) 100%)" }}
                  />
                  <div className="absolute inset-x-0 bottom-0 px-12 pb-28 max-w-[36rem]">
                    <span className="inline-flex items-center mb-4 min-h-[32px] px-3.5 rounded-full bg-white/15 ring-1 ring-white/30 backdrop-blur-sm text-white text-[0.875rem] font-semibold">{s.tag}</span>
                    <h2 className="oc-h2 !text-[clamp(2rem,1.4rem+1.2vw,2.6rem)] text-white">{s.name}</h2>
                    <p className="oc-body text-white/85 mt-3 max-w-[30rem]">{s.desc}</p>
                    <span className="mt-6 inline-flex items-center gap-2 min-h-[44px] px-5 rounded-full bg-white text-oc-dark font-semibold">
                      Book now <Fl icon={ArrowUpRight24Regular} size={18} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Progress rail, bottom-left */}
          <div className="absolute left-12 bottom-10 z-20 flex items-center gap-2.5">
            {SK_HERO_SLIDES.map((s, i) => (
              <button key={s.id} type="button" onClick={() => go(i)} aria-label={`Show ${s.name}`} aria-current={i === index} className="group py-3 cursor-pointer">
                <span className={`block h-1 rounded-full transition-all duration-300 ${i === index ? "w-10 bg-white" : "w-5 bg-white/45 group-hover:bg-white/75"}`} />
              </button>
            ))}
            <span className="ml-2 text-[0.8125rem] text-white/75 oc-tnum font-semibold">
              {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </span>
          </div>

          {/* Arrows, bottom-right */}
          <div className="absolute right-12 bottom-10 z-20 flex items-center gap-2.5">
            {([[-1, "Previous service", ArrowLeft24Regular], [1, "Next service", ArrowRight24Regular]] as const).map(([d, label, Icon]) => (
              <button
                key={label}
                type="button"
                onClick={() => go(index + d)}
                aria-label={label}
                className="oc-press w-12 h-12 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm text-white grid place-items-center hover:bg-white hover:text-oc-dark hover:border-white transition-colors cursor-pointer"
              >
                <Fl icon={Icon} size={20} />
              </button>
            ))}
          </div>

          <p className="sr-only" aria-live="polite">Slide {index + 1} of {count}: {SK_HERO_SLIDES[index].name}</p>
        </div>

        {/* ── Phones and tablets: touch-native snap rail ── */}
        <div className="lg:hidden pb-12">
          <ul className="oc-rail flex gap-3 overflow-x-auto snap-x snap-mandatory px-4 sm:px-6 scroll-px-4 sm:scroll-px-6 pb-2">
            {SK_HERO_SLIDES.map((s) => {
              return (
                <li key={s.id} className="snap-start shrink-0 w-[72%] max-w-[19rem]">
                  <Link to={`${BASE}/book/${s.id}`} className="relative block aspect-[4/5] rounded-oc-lg overflow-hidden no-underline">
                    <img src={s.img} alt="" className="absolute inset-0 w-full h-full object-cover" />
                    <div aria-hidden="true" className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,35,82,0.08) 0%, rgba(10,35,82,0.55) 55%, rgba(10,35,82,0.92) 100%)" }} />
                    <span className="absolute top-3 left-3 inline-flex items-center text-[0.8125rem] px-3 py-1 rounded-full bg-white/15 ring-1 ring-white/30 backdrop-blur-sm text-white font-semibold">
                      {s.tag}
                    </span>
                    <span className="absolute inset-x-4 bottom-4">
                      <span className="block font-semibold text-white text-[1.125rem] leading-tight">{s.name}</span>
                      <span className="mt-1 inline-flex items-center gap-1 text-white/85 oc-small font-semibold">Book now <Fl icon={ArrowUpRight24Regular} size={14} /></span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <BookModalShivakem open={bookOpen} onOpenChange={setBookOpen} />
    </section>
  );
}
