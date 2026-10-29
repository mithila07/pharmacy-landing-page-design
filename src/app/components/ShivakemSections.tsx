import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router";
import {
  Add24Regular, Airplane24Regular, ChevronLeft24Regular, ChevronRight24Regular, Edit24Regular, Pause24Regular, Play24Regular,
  Star24Filled,
} from "@fluentui/react-icons";
import { shivakemBrand } from "../branding";
import { isTbc, type OCMiniService, type OCService } from "../data/onecare";
import {
  SK_FAQS, SK_FEATURED_PRIVATE, SK_PRIVATE_NOTE, SK_GOOGLE_RATING, SK_IMAGES, SK_NHS_SERVICES, SK_PHARMACY_FIRST, SK_REVIEWS, SK_TRAVEL,
  SK_TRAVEL_CONSULT, SK_TREATMENTS, SK_VACCINES, skIc, skReviewUrl, type SkReview,
} from "../data/shivakem";
import { prefersReducedMotion } from "../onecareMotion";
import { STRETCH } from "./NhsServicesOneCare";
import { GoogleG } from "./ReviewsOneCare";
import { BTN_ON_DARK, BTN_PRIMARY, Icon3D, Tbc } from "./onecareUi";
import { Fl, SkArrow } from "./shivakemUi";

const BASE = shivakemBrand.basePath;
const SECTION = "py-[clamp(72px,9vw,136px)]";
const WRAP = "max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8";

/** "Book" goes straight to this service's booking page. */
function Book({ id, label, className, children }: { id: string; label?: string; className?: string; children: ReactNode }) {
  return <Link to={`${BASE}/book/${id}`} aria-label={label} className={className}>{children}</Link>;
}

const Price = ({ value }: { value?: string }) => (value ? <>From {isTbc(value) ? <Tbc>{value}</Tbc> : value}</> : null);

// ── NHS services ───────────────────────────────────────────────────────────

function ServiceImageCard({ s }: { s: OCService }) {
  return (
    <article className="group oc-img-zoom relative flex flex-col" data-reveal>
      <div className="aspect-[4/3] overflow-hidden rounded-[20px] bg-oc-mist">
        <img src={s.image} alt="" loading="lazy" style={{ objectPosition: s.imagePos }} className="w-full h-full object-cover" />
      </div>
      <div className="pt-4">
        <h3 className="oc-h3 text-oc-ink">
          <Book id={s.serviceId} label={`Book ${s.name}`} className={`inline-flex items-center gap-2 ${STRETCH}`}>
            {s.name} <SkArrow className="text-oc-dark" />
          </Book>
        </h3>
        <p className="oc-small text-oc-quiet mt-1.5 max-w-[40ch]">{s.summary}</p>
      </div>
    </article>
  );
}

export function NhsServicesShivakem() {
  return (
    <section id="nhs-services" aria-labelledby="sk-nhs-title" className={SECTION}>
      <div className={WRAP}>
        <div className="max-w-[760px]" data-reveal>
          <h2 id="sk-nhs-title" className="oc-h2 text-oc-ink">NHS care, no GP appointment needed</h2>
          <p className="oc-lead text-oc-quiet mt-5 max-w-[58ch]">
            Lots of everyday health problems can be sorted here, free on the NHS. We'll check you qualify and tell you about any prescription charge up front.
          </p>
        </div>

        <div className="mt-12 lg:mt-16 grid gap-x-6 gap-y-12 lg:grid-cols-12">
          {/* Pharmacy First: the headline NHS service, so it gets the one dark tile */}
          <article id="pharmacy-first" aria-labelledby="sk-pf-title" className="lg:col-span-6 rounded-oc-xl bg-oc-ink text-white overflow-hidden oc-dark" data-reveal>
            <div className="grid sm:grid-cols-[1fr_180px]">
              <div className="p-7 sm:p-9">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 pl-1.5 pr-3 py-1 text-[0.8125rem] font-semibold">
                  <span className="w-8 h-8 rounded-full bg-oc-mist grid place-items-center"><Icon3D src={skIc.stethoscope} size={30} /></span> NHS Pharmacy First
                </span>
                <h3 id="sk-pf-title" className="oc-h2 mt-5 !text-[clamp(1.75rem,1.3rem+1.4vw,2.4rem)]">Seven conditions we can treat today</h3>
                <p className="oc-body text-white/80 mt-3 max-w-[44ch]">
                  Talk to a pharmacist in our consultation room. If treatment is clinically right for you, we can supply it on the NHS.
                </p>
              </div>
              <div className="hidden sm:block relative">
                <img src={SK_IMAGES.imgSoreThroat} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
              </div>
            </div>
            <ul className="grid sm:grid-cols-2 gap-px bg-white/10 border-t border-white/10">
              {SK_PHARMACY_FIRST.map((c) => (
                <li key={c.serviceId} className="bg-oc-ink">
                  <Book
                    id={c.serviceId}
                    label={`Book Pharmacy First for ${c.name}`}
                    className="group w-full min-h-[76px] px-6 sm:px-8 py-4 flex items-center gap-4 text-left hover:bg-white/[0.06] transition-colors"
                  >
                    <span className="w-12 h-12 shrink-0 rounded-oc-md bg-oc-mist grid place-items-center"><Icon3D src={c.icon} size={46} /></span>
                    <span className="flex-1 min-w-0">
                      <span className="block font-semibold">{c.name}</span>
                      <span className="block oc-small text-white/70">{c.eligibility}</span>
                    </span>
                    <SkArrow dir="up-right" className="text-oc-light" />
                  </Book>
                </li>
              ))}
              <li className="bg-oc-ink px-6 sm:px-8 py-4 oc-small text-white/75 flex items-center">
                Feeling seriously unwell? Call 999. For urgent advice, call NHS 111.
              </li>
            </ul>
          </article>

          <div className="lg:col-span-6 grid sm:grid-cols-2 gap-x-6 gap-y-10">
            {SK_NHS_SERVICES.map((s) => <ServiceImageCard key={s.slug} s={s} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Private clinics ────────────────────────────────────────────────────────

function FeatureCard({ s }: { s: OCService }) {
  return (
    <article className="group oc-img-zoom relative flex flex-col rounded-oc-xl bg-white border border-oc-line overflow-hidden" data-reveal>
      <div className="aspect-[16/10] overflow-hidden bg-oc-mist">
        <img src={s.image} alt="" loading="lazy" style={{ objectPosition: s.imagePos }} className="w-full h-full object-cover" />
      </div>
      <div className="p-7 sm:p-9 flex flex-col gap-4 flex-1">
        <h3 className="oc-h2 !text-[clamp(1.75rem,1.3rem+1.4vw,2.5rem)] text-oc-ink">{s.name}</h3>
        <p className="oc-lead text-oc-quiet max-w-[46ch]">{s.summary}</p>
        <div className="mt-auto pt-4 flex flex-wrap items-center justify-between gap-4">
          <p className="oc-body font-semibold text-oc-ink"><Price value={s.priceFrom} /></p>
          <Book id={s.serviceId} label={`Book ${s.name}`} className={`${BTN_PRIMARY} ${STRETCH}`}>
            Book now <SkArrow />
          </Book>
        </div>
      </div>
    </article>
  );
}

export function PrivateServicesShivakem() {
  return (
    <section id="private-services" aria-labelledby="sk-private-title" className={`${SECTION} bg-oc-tint`}>
      <div className={WRAP}>
        <div className="max-w-[760px]" data-reveal>
          <h2 id="sk-private-title" className="oc-h2 text-oc-ink">Private clinics at a time that suits you</h2>
          <p className="oc-lead text-oc-quiet mt-5 max-w-[56ch]">
            Pick an appointment online. Your pharmacist makes sure a treatment is suitable before anything goes ahead.
          </p>
        </div>
        <div className="mt-12 grid lg:grid-cols-2 gap-6">
          {SK_FEATURED_PRIVATE.map((s) => <FeatureCard key={s.slug} s={s} />)}
        </div>
        <p className="mt-8 oc-small text-oc-quiet">{SK_PRIVATE_NOTE}</p>
      </div>
    </section>
  );
}

// ── Travel clinic ──────────────────────────────────────────────────────────

function TravelTile({ t }: { t: OCMiniService }) {
  return (
    <li className="group relative rounded-oc-lg bg-white border border-oc-line p-5 sm:p-6 flex flex-col gap-3 hover:border-oc-dark transition-colors" data-reveal>
      <Icon3D src={t.icon} size={84} className="-ml-2 -mt-1 transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[-4deg]" />
      <h4 className="font-semibold text-oc-ink text-[1.0625rem] leading-snug">
        <Book id={t.serviceId} label={`Book ${t.name}`} className={STRETCH}>{t.name}</Book>
      </h4>
      <p className="oc-small text-oc-quiet">{t.line}</p>
      <SkArrow dir="up-right" className="mt-auto text-oc-dark" />
    </li>
  );
}

export function TravelClinicShivakem() {
  return (
    <section id="travel-clinic" aria-labelledby="sk-travel-title" className={SECTION}>
      <div className={WRAP}>
        <div className="relative rounded-oc-xl overflow-hidden bg-oc-mist" data-reveal>
          <img src={SK_IMAGES.imgTravel} alt="" loading="lazy" className="w-full aspect-[16/9] lg:aspect-[21/9] object-cover object-right" />
          <div className="lg:absolute lg:inset-y-0 lg:left-0 lg:w-[54%] p-7 sm:p-10 lg:p-14 flex flex-col justify-center bg-white lg:bg-gradient-to-r lg:from-[#f5f8ff]/95 lg:via-[#f5f8ff]/85 lg:to-transparent">
            <h2 id="sk-travel-title" className="oc-h2 text-oc-ink max-w-[16ch]">Going abroad? Plan your jabs with us</h2>
            <p className="oc-lead text-oc-text mt-5 max-w-[40ch]">
              Share your destination and dates, and we'll work out which vaccines and travel medicines you need. Aim to see us six to eight weeks before you fly.
            </p>
            <div className="mt-8">
              <Book id={SK_TRAVEL_CONSULT.serviceId} className={`${BTN_PRIMARY} group`}>
                <Fl icon={Airplane24Regular} size={20} /> Book a travel consultation
              </Book>
            </div>
          </div>
        </div>

        <h3 className="sr-only">Travel vaccines and services</h3>
        <ul className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {SK_TRAVEL.map((t) => <TravelTile key={t.serviceId} t={t} />)}
        </ul>
        <p className="mt-6 oc-small text-oc-quiet max-w-[80ch]">
          Your vaccines depend on where you're going, what you'll do there and what you've had before. Every travel vaccine needs a consultation first, and some are a course spread over several weeks.
        </p>
      </div>
    </section>
  );
}

// ── Vaccinations and everyday treatments ───────────────────────────────────

function ServiceRow({ t }: { t: OCMiniService }) {
  return (
    <li className="group relative flex items-center gap-4 rounded-oc-md px-3 py-3 -mx-3 hover:bg-white transition-colors">
      <span className="w-16 h-16 shrink-0 rounded-oc-md bg-white border border-oc-line grid place-items-center group-hover:border-oc-dark transition-colors">
        <Icon3D src={t.icon} size={58} />
      </span>
      <span className="flex-1 min-w-0">
        <Book id={t.serviceId} label={`Book ${t.name}`} className={`block font-semibold text-oc-ink ${STRETCH}`}>{t.name}</Book>
        <span className="block oc-small text-oc-quiet">{t.line}</span>
      </span>
      <SkArrow className="text-oc-dark opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
    </li>
  );
}

export function MoreServicesShivakem() {
  return (
    <section id="more-services" aria-labelledby="sk-more-title" className={`${SECTION} bg-oc-tint`}>
      <div className={WRAP}>
        <h2 id="sk-more-title" className="oc-h2 text-oc-ink max-w-[18ch]" data-reveal>Vaccines and quick treatments</h2>
        <p className="oc-lead text-oc-quiet mt-5 max-w-[58ch]" data-reveal>
          Vaccines outside your NHS schedule, and fast help with everyday complaints, with no wait for a GP.
        </p>
        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-5 rounded-oc-xl bg-oc-mist p-6 sm:p-8" data-reveal>
            <h3 className="oc-h3 text-oc-ink flex items-center gap-3"><Icon3D src={skIc.vaccines} size={60} /> Private vaccines</h3>
            <ul className="mt-5 grid gap-1">{SK_VACCINES.map((t) => <ServiceRow key={t.serviceId} t={t} />)}</ul>
          </div>
          <div className="lg:col-span-7 rounded-oc-xl bg-oc-mist p-6 sm:p-8" data-reveal>
            <h3 className="oc-h3 text-oc-ink flex items-center gap-3"><Icon3D src={skIc.treatments} size={60} /> Treatments</h3>
            <ul className="mt-5 grid sm:grid-cols-2 gap-x-6 gap-y-1">{SK_TREATMENTS.map((t) => <ServiceRow key={t.serviceId} t={t} />)}</ul>
          </div>
        </div>
        <p className="mt-8 oc-small text-oc-quiet">
          {SK_PRIVATE_NOTE} Some common conditions can be treated free under <a href="#pharmacy-first" className="text-oc-dark underline underline-offset-4">NHS Pharmacy First</a>.
        </p>
      </div>
    </section>
  );
}

// ── Google reviews ─────────────────────────────────────────────────────────

const GOOGLE_STAR = "#FBBC04"; // Google's own star colour (brand attribution)
const DWELL_MS = 6500;

function Stars({ value, size = 18 }: { value: number; size?: number }) {
  const row = (fill: string) => (
    <span className="flex gap-0.5">{Array.from({ length: 5 }, (_, i) => <Fl key={i} icon={Star24Filled} size={size} style={{ color: fill }} />)}</span>
  );
  return (
    <span role="img" aria-label={`Rated ${value} out of 5`} className="relative inline-flex shrink-0">
      {row("var(--line-strong)")}
      <span className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${(value / 5) * 100}%` }}>{row(GOOGLE_STAR)}</span>
    </span>
  );
}

const initials = (name: string) => name.split(/\s+/).filter((w) => /^[A-Z]/.test(w)).slice(0, 2).map((w) => w[0]).join("");

function ReviewCard({ r, i, total }: { r: SkReview; i: number; total: number }) {
  return (
    <li role="group" aria-roledescription="review" aria-label={`${i + 1} of ${total}`}
      className="snap-start shrink-0 w-[86%] sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)] rounded-oc-xl bg-white border border-oc-line p-7 sm:p-8 flex flex-col">
      <div className="flex items-center gap-3.5">
        <span aria-hidden="true" className="w-11 h-11 shrink-0 rounded-full bg-oc-mist text-oc-deep grid place-items-center font-semibold text-[0.9375rem]">{initials(r.name)}</span>
        <span className="min-w-0 flex-1">
          <span className="block font-semibold text-oc-ink">{r.name}</span>
          <span className="block oc-small text-oc-quiet">{r.when}</span>
        </span>
        <span title="Posted on Google"><GoogleG size={22} /></span>
      </div>
      <div className="mt-5"><Stars value={r.rating} /></div>
      <blockquote className="mt-3 oc-body text-oc-text flex-1"><p>{r.quote}</p></blockquote>
      <p className="mt-6 pt-4 border-t border-oc-line oc-small text-oc-quiet">{r.service}</p>
    </li>
  );
}

const CTRL = "oc-press w-12 h-12 rounded-full grid place-items-center border border-oc-line-strong bg-white text-oc-ink hover:border-oc-dark hover:text-oc-deep cursor-pointer";

/**
 * Google reviews: rating summary and a "Write a review" link, then an
 * auto-advancing snap rail. Stops on hover, focus, off screen, hidden tab or
 * Pause (WCAG 2.2.2); starts paused under reduced motion.
 */
export function ReviewsShivakem() {
  const rail = useRef<HTMLUListElement>(null);
  const reduced = useRef(prefersReducedMotion());
  const [playing, setPlaying] = useState(!reduced.current);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ index: 0, last: 0 });

  const measure = useCallback(() => {
    const el = rail.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return null;
    const step = card.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "0");
    return { el, step, last: Math.max(0, Math.round((el.scrollWidth - el.clientWidth) / step)) };
  }, []);

  const goTo = useCallback((i: number) => {
    const m = measure();
    if (!m) return;
    const target = i > m.last ? 0 : i < 0 ? m.last : i;
    m.el.scrollTo({ left: target * m.step, behavior: reduced.current ? "auto" : "smooth" });
  }, [measure]);

  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    const update = () => { const m = measure(); if (m) setPos({ index: Math.min(m.last, Math.round(el.scrollLeft / m.step)), last: m.last }); };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { el.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, [measure]);

  useEffect(() => {
    const el = rail.current;
    if (!el || !("IntersectionObserver" in window)) { setVisible(true); return; }
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const running = playing && !hovered && !focused && visible;
  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => { if (!document.hidden) goTo(pos.index + 1); }, DWELL_MS);
    return () => window.clearTimeout(t);
  }, [running, pos.index, goTo]);

  return (
    <section
      id="reviews"
      aria-labelledby="sk-reviews-title"
      className="pt-[clamp(72px,9vw,136px)] pb-[clamp(24px,3vw,40px)]"
      onFocus={() => setFocused(true)}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocused(false); }}
    >
      <div className={WRAP}>
        <div className="relative z-10 grid gap-8 lg:grid-cols-12 lg:items-end" data-reveal>
          <div className="lg:col-span-7">
            <h2 id="sk-reviews-title" className="oc-h2 text-oc-ink [text-wrap:balance]">Kind words from our patients</h2>
          </div>
          <div className="lg:col-span-5 lg:justify-self-end w-full lg:w-auto rounded-oc-xl bg-oc-tint border border-oc-line p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
            <div className="flex items-center gap-4">
              <span className="w-14 h-14 shrink-0 rounded-full bg-white border border-oc-line grid place-items-center"><GoogleG size={28} /></span>
              <div>
                <p className="flex items-center gap-2.5">
                  <span className="text-[2rem] leading-none font-semibold text-oc-ink oc-tnum">{SK_GOOGLE_RATING.rating.toFixed(1)}</span>
                  <Stars value={SK_GOOGLE_RATING.rating} size={20} />
                </p>
                <p className="mt-1.5 oc-small text-oc-quiet"><span className="oc-tnum">{SK_GOOGLE_RATING.count}</span> reviews on Google</p>
              </div>
            </div>
            <a href={skReviewUrl()} target="_blank" rel="noopener noreferrer" className={`${BTN_PRIMARY} w-full sm:w-auto`}>
              <Fl icon={Edit24Regular} size={20} /> Write a review
              <span className="sr-only"> (opens Google in a new tab)</span>
            </a>
          </div>
        </div>

        <ul
          ref={rail}
          id="sk-reviews-rail"
          tabIndex={0}
          aria-label="Google reviews"
          aria-roledescription="carousel"
          aria-live={running ? "off" : "polite"}
          onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
          onPointerLeave={() => setHovered(false)}
          className="oc-rail mt-10 lg:mt-12 -mx-4 px-4 scroll-px-4 sm:mx-0 sm:px-0 sm:scroll-px-0 flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory sm:rounded-oc-xl"
          data-reveal
        >
          {SK_REVIEWS.map((r, i) => <ReviewCard key={r.name} r={r} i={i} total={SK_REVIEWS.length} />)}
        </ul>

        <div className="mt-7 flex items-center justify-between gap-6">
          <div aria-hidden="true" className="flex items-center gap-2">
            {Array.from({ length: pos.last + 1 }, (_, i) => (
              <span key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === pos.index ? "w-8 bg-oc-dark" : "w-1.5 bg-oc-line-strong"}`} />
            ))}
          </div>
          <div className="flex items-center gap-2.5">
            <button type="button" className={CTRL} onClick={() => setPlaying((p) => !p)} aria-label={playing ? "Pause reviews" : "Play reviews"}>
              <Fl icon={playing ? Pause24Regular : Play24Regular} size={20} />
            </button>
            <span aria-hidden="true" className="w-px h-6 bg-oc-line mx-1" />
            <button type="button" className={CTRL} onClick={() => goTo(pos.index - 1)} aria-label="Previous reviews" aria-controls="sk-reviews-rail">
              <Fl icon={ChevronLeft24Regular} size={20} />
            </button>
            <button type="button" className={CTRL} onClick={() => goTo(pos.index + 1)} aria-label="Next reviews" aria-controls="sk-reviews-rail">
              <Fl icon={ChevronRight24Regular} size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── FAQ and closing call to action ─────────────────────────────────────────

export function FaqShivakem() {
  return (
    <section aria-labelledby="sk-faq-title" className={SECTION}>
      <div className={`${WRAP} grid gap-10 lg:grid-cols-12`}>
        <div className="lg:col-span-4" data-reveal>
          <h2 id="sk-faq-title" className="oc-h2 text-oc-ink">Your questions, answered</h2>
          <Link to={`${BASE}/contact`} className="group mt-6 inline-flex items-center gap-1.5 min-h-[44px] font-semibold text-oc-dark">
            Can't see yours? Ask us <SkArrow />
          </Link>
        </div>
        <div className="lg:col-span-8 grid gap-3" data-reveal>
          {SK_FAQS.map((f) => (
            <details key={f.q} className="group rounded-oc-lg bg-oc-tint open:bg-oc-mist transition-colors">
              <summary className="list-none flex items-center justify-between gap-6 min-h-[64px] px-6 py-4 cursor-pointer [&::-webkit-details-marker]:hidden">
                <span className="font-semibold text-oc-ink text-[1.0625rem]">{f.q}</span>
                <span aria-hidden="true" className="shrink-0 w-9 h-9 rounded-full bg-white grid place-items-center text-oc-ink transition-transform duration-300 group-open:rotate-45">
                  <Fl icon={Add24Regular} size={18} />
                </span>
              </summary>
              <div className="oc-faq-body px-6 pb-6 -mt-1 oc-body text-oc-text max-w-[68ch]">{f.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ClosingCtaShivakem() {
  return (
    <section aria-labelledby="sk-cta-title" className="pb-[clamp(72px,9vw,136px)]">
      <div className={WRAP}>
        <div className="oc-dark rounded-oc-xl bg-oc-ink text-white overflow-hidden grid lg:grid-cols-2" data-reveal>
          <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
            <h2 id="sk-cta-title" className="oc-h2">Not sure where to start?</h2>
            <p className="oc-lead text-white/80 mt-5 max-w-[42ch]">Ring us or drop in to Court Parade, and a pharmacist will help you find the right service.</p>
            <div className="mt-9">
              <Link to={`${BASE}/contact`} className={`${BTN_ON_DARK} group`}>Get in touch <SkArrow /></Link>
            </div>
          </div>
          <div className="relative min-h-[260px] lg:min-h-[420px]">
            <img src={SK_IMAGES.imgCounter} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
