import { useCallback, useEffect, useRef, useState } from "react";
import { NavArrowLeft, NavArrowRight, Pause, Play, StarSolid } from "iconoir-react";
import { GoogleG } from "../ReviewsOneCare";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import bgPhoto from "../../../assets/about-hero.jpeg";
import { DMP_GOOGLE_RATING, DMP_REVIEWS, dmpReviewsUrl, dmpWriteReviewUrl } from "../../data/dewsbury";

const DWELL_MS = 6500;
// Google's own star colour: brand attribution, so it sits outside the Dewsbury palette.
const GOOGLE_STAR = "#FBBC04";

/** Five stars filled to the exact rating; the label carries the number. */
function Stars({ value, size = 18 }: { value: number; size?: number }) {
  const row = (fill: string) => (
    <span className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => <StarSolid key={i} width={size} height={size} color={fill} aria-hidden="true" />)}
    </span>
  );
  return (
    <span role="img" aria-label={`Rated ${value} out of 5`} className="relative inline-flex shrink-0">
      {row("rgba(255,255,255,0.25)")}
      <span className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${(value / 5) * 100}%` }}>{row(GOOGLE_STAR)}</span>
    </span>
  );
}

const initials = (name: string) => name.split(/\s+/).map((w) => w[0]).filter((c) => /[A-Z]/.test(c)).slice(0, 2).join("");

/**
 * Google reviews as an auto-advancing slider on the forest band. It pauses on
 * hover, keyboard focus, when off screen or in a background tab, and with the
 * Pause button; it never auto-advances for reduced motion.
 */
export function ReviewsDewsbury() {
  const rail = useRef<HTMLUListElement>(null);
  const section = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [held, setHeld] = useState(false); // hover or focus inside
  const [visible, setVisible] = useState(false); // on screen and tab visible
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => { setReduced(mq.matches); if (mq.matches) setPlaying(false); };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // How many positions the rail has, given how many cards fit
  const measure = useCallback(() => {
    const el = rail.current;
    if (!el || !el.children.length) return;
    const card = el.children[0] as HTMLElement;
    const step = card.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "0");
    const perView = Math.max(1, Math.round(el.clientWidth / step));
    setMaxIndex(Math.max(0, el.children.length - perView));
  }, []);
  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  useEffect(() => {
    const el = section.current;
    if (!el) return;
    let onScreen = false;
    const sync = () => setVisible(onScreen && document.visibilityState === "visible");
    const io = new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; sync(); }, { threshold: 0.3 });
    io.observe(el);
    document.addEventListener("visibilitychange", sync);
    return () => { io.disconnect(); document.removeEventListener("visibilitychange", sync); };
  }, []);

  const go = useCallback((i: number) => {
    const el = rail.current;
    if (!el) return;
    const n = i > maxIndex ? 0 : i < 0 ? maxIndex : i;
    const card = el.children[n] as HTMLElement | undefined;
    const first = el.children[0] as HTMLElement | undefined;
    if (!card || !first) return;
    el.scrollTo({ left: card.offsetLeft - first.offsetLeft, behavior: reduced ? "auto" : "smooth" });
    setIndex(n);
  }, [maxIndex, reduced]);

  useEffect(() => {
    if (!playing || held || !visible || reduced) return;
    const t = setTimeout(() => go(index + 1), DWELL_MS);
    return () => clearTimeout(t);
  }, [playing, held, visible, reduced, index, go]);

  // Keep the position in step when someone swipes the rail
  const onScroll = () => {
    const el = rail.current;
    if (!el || !el.children.length) return;
    const card = el.children[0] as HTMLElement;
    const step = card.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "0");
    setIndex(Math.min(maxIndex, Math.round(el.scrollLeft / step)));
  };

  return (
    <section ref={section} aria-labelledby="dmp-reviews-title" className="relative isolate overflow-hidden bg-brand-darkest py-20 lg:py-24">
      {/* Photo behind the reviews, shaded deep enough for the glass cards to read */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <ImageWithFallback src={bgPhoto} alt="" className="w-full h-full object-cover object-[60%_30%]" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(2,32,28,0.86) 0%, rgba(2,32,28,0.78) 45%, rgba(2,32,28,0.92) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(44rem 26rem at 0% 0%, rgba(120,195,54,0.22), transparent 70%)" }} />
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div>
            <p className="inline-flex items-center gap-2.5 rounded-full bg-white px-3.5 py-1.5 text-[0.9rem] text-slate-800" style={{ fontWeight: 600 }}>
              <GoogleG size={18} /> Google reviews
            </p>
            <h2 id="dmp-reviews-title" className="font-display text-white text-[2rem] md:text-[2.6rem] leading-tight mt-5" style={{ fontWeight: 700 }}>
              What our neighbours say
            </h2>
            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-white">
              <span className="font-display text-[2rem] leading-none" style={{ fontWeight: 700 }}>{DMP_GOOGLE_RATING.rating.toFixed(1)}</span>
              <Stars value={DMP_GOOGLE_RATING.rating} size={20} />
              <a href={dmpReviewsUrl} target="_blank" rel="noopener noreferrer" className="text-white/80 underline underline-offset-4 hover:text-white min-h-[44px] inline-flex items-center">
                {DMP_GOOGLE_RATING.count} reviews on Google<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={dmpWriteReviewUrl} target="_blank" rel="noopener noreferrer" className="dmp-btn">Write a review<span className="sr-only"> on Google (opens in a new tab)</span></a>
            <a href={dmpReviewsUrl} target="_blank" rel="noopener noreferrer" className="dmp-btn dmp-btn--glass">See all on Google<span className="sr-only"> (opens in a new tab)</span></a>
          </div>
        </div>

        <div
          className="mt-10"
          role="region"
          aria-roledescription="carousel"
          aria-label="Google reviews"
          onMouseEnter={() => setHeld(true)}
          onMouseLeave={() => setHeld(false)}
          onFocusCapture={() => setHeld(true)}
          onBlurCapture={() => setHeld(false)}
        >
          <ul
            ref={rail}
            onScroll={onScroll}
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {DMP_REVIEWS.map((r, i) => (
              <li
                key={r.name}
                role="group"
                aria-roledescription="review"
                aria-label={`${i + 1} of ${DMP_REVIEWS.length}`}
                className="dmp-glass snap-start shrink-0 w-[86%] sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)] p-6 sm:p-7 flex flex-col"
              >
                <div className="flex items-center gap-3.5">
                  <span aria-hidden="true" className="w-11 h-11 rounded-full bg-brand-cta text-brand-darkest grid place-items-center text-[0.95rem]" style={{ fontWeight: 700 }}>{initials(r.name)}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-white" style={{ fontWeight: 600 }}>{r.name}</span>
                    <span className="block text-white/65 text-[0.88rem]">{r.when}</span>
                  </span>
                  <span title="Posted on Google" className="w-9 h-9 rounded-full bg-white grid place-items-center"><GoogleG size={18} /></span>
                </div>
                <div className="mt-5"><Stars value={r.rating} /></div>
                <blockquote className="mt-3 text-white/90 text-[1.02rem] leading-relaxed flex-1"><p>{r.quote}</p></blockquote>
              </li>
            ))}
          </ul>

          <div className="mt-7 flex items-center justify-between gap-4">
            <div className="flex items-center gap-1.5" aria-hidden="true">
              {Array.from({ length: maxIndex + 1 }, (_, i) => (
                <span key={i} className={`block h-1 rounded-full transition-[width,background-color] duration-300 ${i === index ? "w-8 bg-brand-cta" : "w-4 bg-white/30"}`} />
              ))}
            </div>
            <div className="flex items-center gap-2">
              {!reduced && (
                <button type="button" onClick={() => setPlaying((p) => !p)} aria-label={playing ? "Pause the reviews" : "Play the reviews"} className="w-11 h-11 rounded-full grid place-items-center text-white ring-1 ring-white/30 hover:bg-white/15 cursor-pointer">
                  {playing ? <Pause width={18} height={18} /> : <Play width={18} height={18} />}
                </button>
              )}
              <button type="button" onClick={() => go(index - 1)} aria-label="Previous review" className="w-11 h-11 rounded-full grid place-items-center text-white ring-1 ring-white/30 hover:bg-white/15 cursor-pointer"><NavArrowLeft width={20} height={20} /></button>
              <button type="button" onClick={() => go(index + 1)} aria-label="Next review" className="w-11 h-11 rounded-full grid place-items-center text-white ring-1 ring-white/30 hover:bg-white/15 cursor-pointer"><NavArrowRight width={20} height={20} /></button>
            </div>
          </div>
          <p className="sr-only" aria-live="polite">Showing review {index + 1} of {DMP_REVIEWS.length}</p>
        </div>
      </div>
    </section>
  );
}
