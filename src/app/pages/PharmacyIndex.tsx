import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { ArrowUpRight, LayoutGrid, Sparkles, ArrowRight } from "lucide-react";
import { carefirstBrand, strachansBrand, canadaBrand, healthcheckBrand, kepplelaneBrand, centralBrand, jmorrisBrand, acreBrand, meadowsBrand } from "../branding";
import { useSeo } from "../seo";

/** Prefix a route with Vite's base so previews work locally and on GitHub Pages. */
const withBase = (p: string) => `${import.meta.env.BASE_URL}${p.replace(/^\//, "")}`;

/** `external` entries live on another domain: `path` holds the full URL, the
 *  card opens in a new tab and the iframe loads the URL directly. */
export type Entry = { name: string; tagline: string; location: string; path: string; external?: boolean };

const SITES: Entry[] = [
  { name: carefirstBrand.name, tagline: carefirstBrand.tagline, location: "London", path: "/carefirst" },
  { name: strachansBrand.name, tagline: strachansBrand.tagline, location: "Bury & Uppermill", path: "/strachans" },
  { name: canadaBrand.name, tagline: "NHS & private pharmacy", location: "Ealing, London", path: "/icare" },
  { name: healthcheckBrand.name, tagline: healthcheckBrand.tagline, location: "Bradford", path: "/healthcheck" },
  { name: kepplelaneBrand.name, tagline: kepplelaneBrand.tagline, location: "Garstang, Lancashire", path: "/kepple-lane" },
  { name: centralBrand.name, tagline: "NHS & private pharmacy", location: "New Quay, Ceredigion", path: "/central" },
  { name: jmorrisBrand.name, tagline: jmorrisBrand.tagline, location: "Ashton-in-Makerfield", path: "/j-morris" },
  { name: acreBrand.name, tagline: acreBrand.tagline, location: "Huddersfield", path: "/acre" },
  { name: meadowsBrand.name, tagline: meadowsBrand.tagline, location: "Maghull", path: "/meadows" },
];

/** The chrome address-bar label — the domain for external sites, the route otherwise. */
const chromeLabel = (s: Entry) => {
  if (!s.external) return s.path;
  try { return new URL(s.path).host; } catch { return s.path; }
};

/** A live, scaled-down preview of a page rendered in an iframe (a self-updating "screenshot").
 *  Note: some external sites set X-Frame-Options/CSP that prevent framing; those render blank. */
export function SitePreview({ src, title }: { src: string; title: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.3);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / 1280);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100">
      <iframe
        src={src}
        title={`Preview of ${title}`}
        loading="lazy"
        tabIndex={-1}
        aria-hidden="true"
        scrolling="no"
        className="absolute top-0 left-0 origin-top-left pointer-events-none"
        style={{ width: 1280, height: 800, transform: `scale(${scale})`, border: 0 }}
      />
      {/* Transparent guard so hover/clicks always belong to the card, never the iframe */}
      <div className="absolute inset-0" />
    </div>
  );
}

/** A single showcase card. Internal entries route in-app; external ones open in a new tab. */
export function ShowcaseCard({ s, badge }: { s: Entry; badge?: string }) {
  const cardClass = "group block rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden no-underline";
  const body = (
    <>
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 h-10 border-b border-slate-100 bg-slate-50">
        <span className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
        </span>
        <span className="ml-2 flex-1 truncate text-[0.74rem] text-slate-400 bg-white border border-slate-200 rounded-md px-2.5 py-1" style={{ fontVariantNumeric: "tabular-nums" }}>
          {chromeLabel(s)}
        </span>
        {badge && (
          <span className="shrink-0 text-[0.62rem] uppercase tracking-wide text-slate-400 border border-slate-200 rounded px-1.5 py-0.5" style={{ fontWeight: 600 }}>{badge}</span>
        )}
      </div>

      {/* Live preview */}
      <SitePreview src={s.external ? s.path : withBase(s.path)} title={s.name} />

      {/* Footer */}
      <div className="flex items-center justify-between gap-3 p-5">
        <div className="min-w-0">
          <h2 className="text-[1.1rem] text-slate-900 truncate" style={{ fontWeight: 700 }}>{s.name}</h2>
          <p className="text-[0.85rem] text-slate-500 truncate">{s.tagline} · {s.location}</p>
        </div>
        <span className="shrink-0 inline-flex items-center gap-1.5 text-[0.85rem] text-slate-900 bg-slate-100 group-hover:bg-slate-900 group-hover:text-white rounded-full px-3.5 py-2 transition-colors" style={{ fontWeight: 600 }}>
          Open <ArrowUpRight size={15} />
        </span>
      </div>
    </>
  );

  return s.external ? (
    <a href={s.path} target="_blank" rel="noopener noreferrer" className={cardClass}>{body}</a>
  ) : (
    <Link to={s.path} className={cardClass}>{body}</Link>
  );
}

export default function PharmacyIndex() {
  useSeo({
    title: "Pharmacy Landing Pages — Showcase",
    description: "A showcase of white-label pharmacy landing pages built from one codebase — CareFirst, Strachans, iCare, Health-Check, Kepple Lane and Central. Open any to explore.",
    path: "/",
  });

  return (
    <div className="min-h-screen text-slate-900" style={{ background: "radial-gradient(120% 100% at 50% 0%, #f1f5f9 0%, #e7edf3 55%, #dfe6ee 100%)" }}>
      <div className="max-w-6xl mx-auto px-5 py-14 sm:py-20">
        {/* Header */}
        <header className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-2 text-[0.78rem] tracking-[0.16em] uppercase text-slate-500 bg-white/70 border border-slate-200 rounded-full px-3.5 py-1.5 mb-5" style={{ fontWeight: 600 }}>
            <LayoutGrid size={14} /> Showcase
          </span>
          <h1 className="text-[2.4rem] sm:text-[3.2rem] leading-[1.05] text-slate-900 mb-4" style={{ fontWeight: 800, letterSpacing: "-0.02em" }}>
            Pharmacy landing pages
          </h1>
          <p className="text-slate-500 text-[1.05rem] leading-relaxed">
            Nine white-label pharmacy sites built from a single codebase. Open any one to explore its design, services and booking flow.
          </p>
        </header>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
          {SITES.map((s) => <ShowcaseCard key={s.path} s={s} />)}
        </div>

        {/* Link to the fully-customised builds */}
        <Link
          to="/fully-customised"
          className="group mt-8 flex items-center gap-4 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 px-6 py-5 no-underline"
        >
          <span className="w-11 h-11 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0"><Sparkles size={20} /></span>
          <div className="min-w-0 flex-1">
            <h2 className="text-[1.05rem] text-slate-900" style={{ fontWeight: 700 }}>Fully customised websites</h2>
            <p className="text-[0.85rem] text-slate-500">Bespoke pharmacy sites tailored to each client's own brand and requirements.</p>
          </div>
          <span className="shrink-0 inline-flex items-center gap-1.5 text-[0.85rem] text-slate-900 bg-slate-100 group-hover:bg-slate-900 group-hover:text-white rounded-full px-3.5 py-2 transition-colors" style={{ fontWeight: 600 }}>
            View <ArrowRight size={15} />
          </span>
        </Link>

        <p className="text-center text-[0.8rem] text-slate-400 mt-14">
          Each preview is the live site rendered in miniature — click through to interact.
        </p>
      </div>
    </div>
  );
}
