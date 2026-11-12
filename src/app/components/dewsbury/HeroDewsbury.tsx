import { useEffect, useRef, useState, type RefObject } from "react";
import { useSearchParams } from "react-router";
import { dewsburyBrand } from "../../branding";
import { templateSites } from "../../data/templateSites";
import { openDewsburyBook } from "../../data/dewsbury";
import { useOpenStatus } from "../../openStatus";
// The real shopfront, widened (extra sky, street and trees) so the whole building
// shows on most screens; the building itself is the original photo, untouched.
import shopfront from "../../../assets/dewsbury/dmp-front-wide.jpg";

/**
 * Dewsbury Moor hero, in three versions for the client to choose from.
 * Pick one with ?hero=1, ?hero=2 or ?hero=3 (or the demo switcher on the page).
 *  1. Centred: full-height shopfront with parallax under a dark layer, big centred title
 *  2. Split: forest-green panel on the left, the shopfront framed on the right
 *  3. Postcard: big centred title on the page, the shopfront as a wide framed photo below
 * The shopfront always shows in its natural colours: no shade over the photo.
 */
type Version = "1" | "2" | "3";
const VERSIONS: { id: Version; name: string }[] = [
  { id: "1", name: "Centred" },
  { id: "2", name: "Split" },
  { id: "3", name: "Postcard" },
];

/** Moves the photo at `rate` of the scroll distance inside its frame (slower than the page = depth). Off for reduced motion. */
function useParallax(target: RefObject<HTMLElement | null>, rate: number) {
  useEffect(() => {
    const el = target.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const frame = el.parentElement;
      if (!frame) return;
      const r = frame.getBoundingClientRect();
      // Offset from the middle of the screen, kept within the photo's spare edge
      const max = Math.max(0, (el.offsetHeight - frame.offsetHeight) / 2);
      const y = Math.max(-max, Math.min(max, -(r.top + r.height / 2 - window.innerHeight / 2) * rate));
      el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, [target, rate]);
}

function OpenLine({ className = "" }: { className?: string }) {
  const status = useOpenStatus(dewsburyBrand.locations[0]);
  return (
    <p className={`text-[0.92rem] ${className}`}>
      <span className={status.open ? "text-brand-cta" : "text-amber-300"} style={{ fontWeight: 700 }}>{status.label}</span>
      {status.detail ? `, ${status.detail.charAt(0).toLowerCase()}${status.detail.slice(1)}` : ""}
    </p>
  );
}

const BookButton = ({ className = "" }: { className?: string }) => (
  <button type="button" onClick={() => openDewsburyBook()} aria-haspopup="dialog" className={`dmp-btn dmp-btn--lg dmp-btn--hero ${className}`}>
    Book an appointment
  </button>
);

const PHOTO_LABEL = <p className="sr-only">Photo: Dewsbury Moor Pharmacy at 119 Heckmondwike Road.</p>;

// ── 1. Centred: full-height photo with parallax, title on black bands ───────

function HeroCentred() {
  const cfg = templateSites.dewsbury.hero;
  const img = useRef<HTMLImageElement>(null);
  useParallax(img, 0.35);
  return (
    <section aria-labelledby="dmp-hero-title" className="relative isolate overflow-hidden min-h-[calc(100svh-76px)] sm:min-h-[calc(100svh-88px)] flex items-center justify-center bg-brand-darkest">
      <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
        <img ref={img} src={shopfront} alt="" className="absolute inset-x-0 -top-[12%] h-[124%] w-full object-cover object-[50%_45%] will-change-transform" />
        {/* Dark layer over the photo so the centred text reads; deepest in the middle */}
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 55% at 50% 50%, rgba(0,0,0,0.3), transparent 75%)" }} />
      </div>
      {PHOTO_LABEL}
      <div className="w-full max-w-5xl mx-auto px-4 py-16 text-center [text-shadow:0_2px_18px_rgba(0,0,0,0.35)]">
        <h1 id="dmp-hero-title" className="font-display text-white text-[2.3rem] sm:text-[3.6rem] lg:text-[4.5rem] leading-[1.32]" style={{ fontWeight: 700, letterSpacing: "-0.025em" }}>
          <span>{cfg.title1}</span>
          <br />
          <span className="text-brand-cta">{cfg.title2}</span>
        </h1>
        <p className="mt-7 sm:mt-8 mx-auto max-w-xl">
          <span className="text-white/90 text-[1.05rem] sm:text-[1.18rem] leading-relaxed">{cfg.subtitle}</span>
        </p>
        <div className="mt-8 flex flex-col items-center gap-3">
          <BookButton className="w-full sm:w-auto" />
          <OpenLine className="text-white/85" />
        </div>
      </div>
    </section>
  );
}

// ── 2. Split: forest panel left, framed shopfront right ─────────────────────

function HeroSplit() {
  const cfg = templateSites.dewsbury.hero;
  const img = useRef<HTMLImageElement>(null);
  useParallax(img, 0.12);
  return (
    <section aria-labelledby="dmp-hero-title" className="relative isolate overflow-hidden bg-brand-darkest">
      <div aria-hidden="true" className="absolute -top-40 -left-40 w-[40rem] h-[40rem] rounded-full bg-brand-cta/15 blur-3xl -z-10" />
      <div className="max-w-7xl mx-auto px-4 py-12 lg:py-0 lg:min-h-[calc(100svh-88px)] grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-14 items-center">
        <div className="order-2 lg:order-1">
          <h1 id="dmp-hero-title" className="font-display text-white text-[2.4rem] sm:text-[3.2rem] lg:text-[4rem] leading-[1.03]" style={{ fontWeight: 700, letterSpacing: "-0.025em" }}>
            <span className="block [text-wrap:balance]">{cfg.title1}</span>
            <span className="block [text-wrap:balance] text-brand-cta">{cfg.title2}</span>
          </h1>
          <p className="text-white/80 text-[1.05rem] lg:text-[1.15rem] leading-relaxed mt-6 max-w-lg">{cfg.subtitle}</p>
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <BookButton className="w-full sm:w-auto" />
            <OpenLine className="text-white/75" />
          </div>
        </div>
        <div className="order-1 lg:order-2 relative">
          <div className="relative overflow-hidden rounded-[2rem] aspect-[4/3] lg:aspect-[5/4] ring-1 ring-white/10 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.7)]">
            <img ref={img} src={shopfront} alt="" className="absolute inset-x-0 -top-[8%] h-[116%] w-full object-cover object-[50%_50%] will-change-transform" />
          </div>
          {PHOTO_LABEL}
          <span className="absolute -bottom-4 left-6 rounded-full bg-white text-brand-darkest px-4 py-2 text-[0.88rem] shadow-lg" style={{ fontWeight: 600 }}>119 Heckmondwike Road, Dewsbury</span>
        </div>
      </div>
    </section>
  );
}

// ── 3. Postcard: centred title on the page, wide framed photo below ─────────

function HeroPostcard() {
  const cfg = templateSites.dewsbury.hero;
  const img = useRef<HTMLImageElement>(null);
  useParallax(img, 0.18);
  return (
    <section aria-labelledby="dmp-hero-title" className="relative isolate overflow-hidden dmp-wash">
      <div className="max-w-7xl mx-auto px-4 pt-12 sm:pt-16 lg:pt-20 pb-10 lg:pb-14">
        <div className="text-center max-w-4xl mx-auto">
          <h1 id="dmp-hero-title" className="font-display text-slate-900 text-[2.4rem] sm:text-[3.4rem] lg:text-[4.4rem] leading-[1.03]" style={{ fontWeight: 700, letterSpacing: "-0.025em" }}>
            <span className="block [text-wrap:balance]">{cfg.title1}</span>
            <span className="block [text-wrap:balance] text-brand-secondary">{cfg.title2}</span>
          </h1>
          <p className="text-slate-600 text-[1.05rem] lg:text-[1.15rem] leading-relaxed mt-5 max-w-2xl mx-auto">{cfg.subtitle}</p>
          <div className="mt-7 flex flex-col items-center gap-3">
            <BookButton className="w-full sm:w-auto" />
            <OpenLine className="text-slate-600" />
          </div>
        </div>
        <div className="mt-10 lg:mt-12 relative overflow-hidden rounded-[2rem] aspect-[16/10] sm:aspect-[16/8] shadow-[0_40px_80px_-46px_rgba(2,32,28,0.6)] ring-1 ring-black/5">
          <img ref={img} src={shopfront} alt="" className="absolute inset-x-0 -top-[10%] h-[120%] w-full object-cover object-[50%_50%] will-change-transform" />
        </div>
        {PHOTO_LABEL}
      </div>
    </section>
  );
}

/** Demo-only: lets the client flip between the three hero versions. Remove once one is chosen. */
function VersionSwitcher({ current, onPick }: { current: Version; onPick: (v: Version) => void }) {
  const [hidden, setHidden] = useState(false);
  if (hidden) return null;
  return (
    <div role="group" aria-label="Hero version (demo)" className="fixed bottom-5 right-5 z-[60] rounded-2xl bg-[#0b0f0e]/95 backdrop-blur-md text-white shadow-xl ring-1 ring-white/10 p-3">
      <div className="flex items-center justify-between gap-3 mb-2">
        <span className="text-[0.78rem] text-white/70" style={{ fontWeight: 600 }}>Hero version</span>
        <button type="button" onClick={() => setHidden(true)} className="text-[0.75rem] text-white/60 hover:text-white cursor-pointer">Hide</button>
      </div>
      <div className="flex gap-1.5">
        {VERSIONS.map((v) => (
          <button key={v.id} type="button" aria-pressed={current === v.id} onClick={() => onPick(v.id)} className={`px-3 py-1.5 rounded-full text-[0.82rem] cursor-pointer transition-colors ${current === v.id ? "bg-white text-[#0b0f0e]" : "text-white/75 hover:text-white"}`} style={{ fontWeight: 600 }}>
            {v.id}. {v.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export function HeroDewsbury() {
  const [params, setParams] = useSearchParams();
  const raw = params.get("hero");
  const version: Version = raw === "2" || raw === "3" ? raw : "1";
  const pick = (v: Version) => {
    const next = new URLSearchParams(params);
    next.set("hero", v);
    setParams(next, { replace: true });
  };
  return (
    <>
      {version === "1" && <HeroCentred />}
      {version === "2" && <HeroSplit />}
      {version === "3" && <HeroPostcard />}
      <VersionSwitcher current={version} onPick={pick} />
    </>
  );
}
