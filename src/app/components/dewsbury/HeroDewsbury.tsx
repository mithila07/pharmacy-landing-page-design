import { useEffect, useState } from "react";
import { Link } from "react-router";
import { NavArrowLeft, NavArrowRight } from "iconoir-react";
import { dewsburyBrand } from "../../branding";
import { templateSites } from "../../data/templateSites";
import { DMP_NOMINATE_PATH, openDewsburyBook } from "../../data/dewsbury";
import { useOpenStatus } from "../../openStatus";
import { ImageWithFallback } from "../figma/ImageWithFallback";

const INTERVAL = 6500;

/**
 * Dewsbury Moor hero: the carousel is the full-width background. The left side
 * carries the page's main message and actions; the right side is a smaller
 * glass card that only names the service in the current photo.
 */
export function HeroDewsbury() {
  const brand = dewsburyBrand;
  const cfg = templateSites.dewsbury.hero;
  const slides = cfg.slides;
  const branch = brand.locations[0];
  const status = useOpenStatus(branch);

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (paused || reduced) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % slides.length), INTERVAL);
    return () => clearTimeout(t);
  }, [index, paused, reduced, slides.length]);

  const go = (n: number) => setIndex(((n % slides.length) + slides.length) % slides.length);
  const s = slides[index];

  return (
    <section
      aria-labelledby="dmp-hero-title"
      className="relative isolate overflow-hidden min-h-[40rem] lg:min-h-[calc(100svh-68px)] flex flex-col"
    >
      {/* Background carousel: photos crossfade, with a slow drift */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-brand-darkest">
        {slides.map((sl, i) => (
          <div key={sl.id} className="absolute inset-0 transition-opacity duration-[1100ms] ease-out" style={{ opacity: i === index ? 1 : 0 }}>
            <ImageWithFallback key={i === index ? `on-${index}` : sl.id} src={sl.img} alt="" className={`w-full h-full object-cover ${i === index ? "dmp-drift" : ""}`} />
          </div>
        ))}
        {/* Forest-green shade, deepest behind the headline */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(2,32,28,0.92) 0%, rgba(2,32,28,0.78) 38%, rgba(2,32,28,0.35) 70%, rgba(2,32,28,0.2) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(2,32,28,0.75) 0%, rgba(2,32,28,0) 45%)" }} />
      </div>

      <div className="relative flex-1 w-full max-w-7xl mx-auto px-4 grid lg:grid-cols-[1.25fr_1fr] gap-10 items-end pt-28 pb-14 lg:pt-32 lg:pb-16">
        {/* Main message */}
        <div>
          <h1 id="dmp-hero-title" className="font-display text-white text-[2.6rem] sm:text-[3.3rem] lg:text-[4.2rem] leading-[1.02]" style={{ fontWeight: 700, letterSpacing: "-0.02em" }}>
            <span className="block [text-wrap:balance]">{cfg.title1}</span>
            <span className="block [text-wrap:balance] text-brand-cta">{cfg.title2}</span>
          </h1>
          <p className="text-white/85 text-[1.1rem] lg:text-[1.2rem] leading-relaxed mt-6 max-w-xl">{cfg.subtitle}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <button type="button" onClick={openDewsburyBook} aria-haspopup="dialog" className="dmp-btn dmp-btn--lg">Book an appointment</button>
            <Link to={DMP_NOMINATE_PATH} className="dmp-btn dmp-btn--glass dmp-btn--lg">Get your prescriptions here</Link>
          </div>
          <p className="mt-7 text-white/80 text-[0.95rem]">
            <span className={status.open ? "text-brand-cta" : "text-amber-300"} style={{ fontWeight: 600 }}>{status.label}</span>
            {status.detail ? `, ${status.detail.charAt(0).toLowerCase()}${status.detail.slice(1)}` : ""}
          </p>
        </div>

        {/* Secondary: the service in the current photo */}
        <div
          className="lg:justify-self-end w-full max-w-sm"
          role="region"
          aria-roledescription="carousel"
          aria-label="Services at Dewsbury Moor"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <div className="dmp-glass p-5">
            <div key={s.id} aria-live="polite" className="animate-[dmpFade_500ms_ease-out]">
              <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-[0.78rem] text-white/90" style={{ fontWeight: 600 }}>{s.tag}</span>
              <p className="mt-3 text-[1.15rem] leading-snug" style={{ fontWeight: 600 }}>{s.name}</p>
              <p className="mt-1 text-white/75 text-[0.9rem] leading-relaxed">{s.desc}</p>
              <Link to={`${brand.basePath}/book/${s.id}`} className="inline-flex items-center min-h-[44px] mt-1 text-[0.92rem] text-brand-cta underline underline-offset-4 decoration-brand-cta/50 hover:decoration-brand-cta" style={{ fontWeight: 600 }}>
                Book {s.name.toLowerCase().startsWith("nhs") ? s.name : s.name.toLowerCase()}
              </Link>
            </div>
            <div className="mt-3 pt-4 border-t border-white/15 flex items-center justify-between gap-3">
              <div className="flex items-center gap-1.5">
                {slides.map((sl, i) => (
                  <button key={sl.id} type="button" onClick={() => go(i)} aria-label={`Show ${sl.name}`} aria-current={i === index} className="py-3 cursor-pointer">
                    <span className={`block h-1 rounded-full transition-[width,background-color] duration-300 ${i === index ? "w-8 bg-brand-cta" : "w-4 bg-white/35 hover:bg-white/60"}`} />
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-1.5">
                <button type="button" onClick={() => go(index - 1)} aria-label="Previous service" className="w-10 h-10 rounded-full grid place-items-center text-white/85 hover:bg-white/15 cursor-pointer"><NavArrowLeft width={20} height={20} /></button>
                <button type="button" onClick={() => go(index + 1)} aria-label="Next service" className="w-10 h-10 rounded-full grid place-items-center text-white/85 hover:bg-white/15 cursor-pointer"><NavArrowRight width={20} height={20} /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
