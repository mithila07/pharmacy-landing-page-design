import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ArrowUpRight, CaretLeft, CaretRight, Pause, PencilSimpleLine, Play, Star } from "@phosphor-icons/react";
import { OC_BRANCHES, OC_GOOGLE_RATING, OC_REVIEWS, googleReviewUrl, type OCReview } from "../data/onecare";
import { prefersReducedMotion } from "../onecareMotion";
import { BTN_PRIMARY, BranchPin, Eyebrow, Ph } from "./onecareUi";

/** How long each position stays put before the rail moves on. */
const DWELL_MS = 6500;

// Google's own colours: brand attribution, so they sit outside the One Care tokens.
const GOOGLE_STAR = "#FBBC04";

/** The Google "G", used only to attribute reviews that come from Google. */
function GoogleG({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} aria-hidden="true" className="shrink-0">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

/** Five stars, filled to the exact rating (4.9 fills 98%). The label carries the number. */
function Stars({ value, size = 18 }: { value: number; size?: number }) {
  const row = (fill: string) => (
    <span className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => <Star key={i} size={size} weight="fill" color={fill} aria-hidden="true" />)}
    </span>
  );
  return (
    <span role="img" aria-label={`Rated ${value} out of 5`} className="relative inline-flex shrink-0">
      {row("var(--line-strong)")}
      <span className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${(value / 5) * 100}%` }}>{row(GOOGLE_STAR)}</span>
    </span>
  );
}

const initials = (name: string) => name.split(/\s+/).filter((w) => /^[A-Z]/.test(w)).slice(0, 2).map((w) => w[0]).join("");

function ReviewCard({ r, i, total }: { r: OCReview; i: number; total: number }) {
  return (
    <li
      role="group"
      aria-roledescription="review"
      aria-label={`${i + 1} of ${total}`}
      className="snap-start shrink-0 w-[86%] sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)] rounded-oc-xl bg-white border border-oc-line p-7 sm:p-8 flex flex-col"
    >
      <div className="flex items-center gap-3.5">
        <span aria-hidden="true" className="w-11 h-11 shrink-0 rounded-full bg-oc-mist text-oc-deep grid place-items-center font-semibold text-[0.9375rem]">
          {initials(r.name)}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-semibold text-oc-ink">{r.name}</span>
          <span className="block oc-small text-oc-quiet">{r.when}</span>
        </span>
        <span title="Posted on Google"><GoogleG size={22} /></span>
      </div>
      <div className="mt-5"><Stars value={r.rating} /></div>
      <blockquote className="mt-3 oc-body text-oc-text flex-1">
        <p>{r.quote}</p>
      </blockquote>
      <p className="mt-6 pt-4 border-t border-oc-line oc-small text-oc-quiet">{r.service} at {r.branch}</p>
    </li>
  );
}

/** "Write a review": asks which branch, then opens that branch's Google review box in a new tab. */
function WriteReview() {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const btn = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => { if (!wrap.current?.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); btn.current?.focus(); } };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("pointerdown", onDown); document.removeEventListener("keydown", onKey); };
  }, [open]);

  return (
    <div ref={wrap} className="relative">
      <button
        ref={btn}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((o) => !o)}
        className={`${BTN_PRIMARY} w-full sm:w-auto`}
      >
        <Ph icon={PencilSimpleLine} size={20} /> Write a review
      </button>
      {open && (
        <div id={menuId} className="oc-fade absolute z-20 left-0 sm:left-auto sm:right-0 top-[calc(100%+8px)] w-full sm:w-[300px] rounded-oc-lg bg-white border border-oc-line oc-lift p-2">
          <p className="px-3 pt-2 pb-1.5 oc-small text-oc-quiet">Which branch did you visit?</p>
          <ul>
            {OC_BRANCHES.map((b) => (
              <li key={b.id}>
                <a
                  href={googleReviewUrl(b)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="group flex items-center gap-3 min-h-[52px] px-3 py-2 rounded-oc-md hover:bg-oc-tint no-underline"
                >
                  <BranchPin branch={b} />
                  <span className="flex-1 min-w-0">
                    <span className="block font-semibold text-oc-ink">{b.shortName}</span>
                    <span className="block oc-small text-oc-quiet truncate">{b.address.line1}</span>
                  </span>
                  <Ph icon={ArrowUpRight} size={18} className="oc-arrow oc-arrow-up-right text-oc-dark" />
                  <span className="sr-only"> (opens Google in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const CTRL = "oc-press w-12 h-12 rounded-full grid place-items-center border border-oc-line-strong bg-white text-oc-ink hover:border-oc-dark hover:text-oc-deep cursor-pointer";

/**
 * Google reviews: a rating summary with a "Write a review" button, then a
 * snap-scrolling rail that advances on its own.
 * Auto-advance stops while the pointer is over the rail, while anything in the
 * section has focus, when it's off screen or the tab is hidden, and for good
 * when the visitor presses Pause (WCAG 2.2.2). Reduced motion: starts paused
 * and moves without smooth scrolling. Swipe, buttons and keyboard all work.
 */
export function ReviewsOneCare() {
  const rail = useRef<HTMLUListElement>(null);
  const reduced = useRef(prefersReducedMotion());
  const [playing, setPlaying] = useState(!reduced.current);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ index: 0, last: 0 });

  // One step = one card plus the gap. Positions = how many distinct snap stops there are.
  const measure = useCallback(() => {
    const el = rail.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return null;
    const step = card.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "0");
    const last = Math.max(0, Math.round((el.scrollWidth - el.clientWidth) / step));
    return { el, step, last };
  }, []);

  const goTo = useCallback((i: number) => {
    const m = measure();
    if (!m) return;
    const target = i > m.last ? 0 : i < 0 ? m.last : i;
    m.el.scrollTo({ left: target * m.step, behavior: reduced.current ? "auto" : "smooth" });
  }, [measure]);

  // Track where the rail is, whoever moved it (timer, buttons, swipe, keyboard).
  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    const update = () => {
      const m = measure();
      if (m) setPos({ index: Math.min(m.last, Math.round(el.scrollLeft / m.step)), last: m.last });
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { el.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, [measure]);

  // Only run while on screen.
  useEffect(() => {
    const el = rail.current;
    if (!el || !("IntersectionObserver" in window)) { setVisible(true); return; }
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const running = playing && !hovered && !focused && visible;

  // A fresh timer for every position, so a manual move gets a full dwell too.
  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => { if (!document.hidden) goTo(pos.index + 1); }, DWELL_MS);
    return () => window.clearTimeout(t);
  }, [running, pos.index, goTo]);

  return (
    <section
      id="reviews"
      aria-labelledby="oc-reviews-title"
      className="pt-[clamp(72px,9vw,136px)] pb-[clamp(24px,3vw,40px)]"
      onFocus={() => setFocused(true)}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocused(false); }}
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 grid gap-8 lg:grid-cols-12 lg:items-end" data-reveal>
          <div className="lg:col-span-7">
            <Eyebrow>Reviews</Eyebrow>
            <h2 id="oc-reviews-title" className="oc-h2 text-oc-ink mt-4 [text-wrap:balance]">What our patients say</h2>
          </div>

          {/* Google summary: score, count and the way to add one */}
          <div className="lg:col-span-5 lg:justify-self-end w-full lg:w-auto rounded-oc-xl bg-oc-tint border border-oc-line p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
            <div className="flex items-center gap-4">
              <span className="w-14 h-14 shrink-0 rounded-full bg-white border border-oc-line grid place-items-center"><GoogleG size={28} /></span>
              <div>
                <p className="flex items-center gap-2.5">
                  <span className="text-[2rem] leading-none font-semibold text-oc-ink oc-tnum">{OC_GOOGLE_RATING.rating.toFixed(1)}</span>
                  <Stars value={OC_GOOGLE_RATING.rating} size={20} />
                </p>
                <p className="mt-1.5 oc-small text-oc-quiet">
                  <span className="oc-tnum">{OC_GOOGLE_RATING.count}</span> reviews on Google
                </p>
              </div>
            </div>
            <WriteReview />
          </div>
        </div>

        <ul
          ref={rail}
          id="oc-reviews-rail"
          tabIndex={0}
          aria-label="Google reviews"
          aria-roledescription="carousel"
          aria-live={running ? "off" : "polite"}
          onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
          onPointerLeave={() => setHovered(false)}
          className="oc-rail mt-10 lg:mt-12 -mx-4 px-4 scroll-px-4 sm:mx-0 sm:px-0 sm:scroll-px-0 flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory sm:rounded-oc-xl"
          data-reveal
        >
          {OC_REVIEWS.map((r, i) => <ReviewCard key={r.name} r={r} i={i} total={OC_REVIEWS.length} />)}
        </ul>

        <div className="mt-7 flex items-center justify-between gap-6">
          {/* Position: decorative; the buttons and the rail itself are the controls */}
          <div aria-hidden="true" className="flex items-center gap-2">
            {Array.from({ length: pos.last + 1 }, (_, i) => (
              <span key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === pos.index ? "w-8 bg-oc-dark" : "w-1.5 bg-oc-line-strong"}`} />
            ))}
          </div>
          <div className="flex items-center gap-2.5">
            <button type="button" className={CTRL} onClick={() => setPlaying((p) => !p)} aria-label={playing ? "Pause reviews" : "Play reviews"}>
              <Ph icon={playing ? Pause : Play} size={20} />
            </button>
            <span aria-hidden="true" className="w-px h-6 bg-oc-line mx-1" />
            <button type="button" className={CTRL} onClick={() => goTo(pos.index - 1)} aria-label="Previous reviews" aria-controls="oc-reviews-rail">
              <Ph icon={CaretLeft} size={20} />
            </button>
            <button type="button" className={CTRL} onClick={() => goTo(pos.index + 1)} aria-label="Next reviews" aria-controls="oc-reviews-rail">
              <Ph icon={CaretRight} size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
