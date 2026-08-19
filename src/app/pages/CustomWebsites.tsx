import { Link } from "react-router";
import { ArrowLeft, Sparkles } from "lucide-react";
import { useSeo } from "../seo";
import { ShowcaseCard, type Entry } from "./PharmacyIndex";

/** Bespoke, fully-customised pharmacy sites — each on its own domain. */
const CUSTOM: Entry[] = [
  { name: "Stone Pharmacy", tagline: "Fully customised website", location: "stonepharmacy.com", path: "https://www.stonepharmacy.com/", external: true },
  { name: "Paydens Pharmacy", tagline: "Fully customised website", location: "paydens-pharmacy.vercel.app", path: "https://paydens-pharmacy.vercel.app/", external: true },
  { name: "Highfield Pharmacy", tagline: "Fully customised website", location: "highfieldpharmacy.com", path: "https://www.highfieldpharmacy.com/", external: true },
];

export default function CustomWebsites() {
  useSeo({
    title: "Fully Customised Pharmacy Websites",
    description: "Bespoke pharmacy websites built to each client's own brand and requirements — Stone Pharmacy, Paydens Pharmacy and Highfield Pharmacy.",
    path: "/fully-customised",
  });

  return (
    <div className="min-h-screen text-slate-900" style={{ background: "radial-gradient(120% 100% at 50% 0%, #f1f5f9 0%, #e7edf3 55%, #dfe6ee 100%)" }}>
      <div className="max-w-6xl mx-auto px-5 py-14 sm:py-20">
        {/* Back to showcase */}
        <Link to="/" className="inline-flex items-center gap-1.5 text-[0.85rem] text-slate-500 hover:text-slate-900 transition-colors mb-8 no-underline" style={{ fontWeight: 600 }}>
          <ArrowLeft size={15} /> Back to showcase
        </Link>

        {/* Header */}
        <header className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-2 text-[0.78rem] tracking-[0.16em] uppercase text-slate-500 bg-white/70 border border-slate-200 rounded-full px-3.5 py-1.5 mb-5" style={{ fontWeight: 600 }}>
            <Sparkles size={14} /> Bespoke builds
          </span>
          <h1 className="text-[2.4rem] sm:text-[3.2rem] leading-[1.05] text-slate-900 mb-4" style={{ fontWeight: 800, letterSpacing: "-0.02em" }}>
            Fully customised websites
          </h1>
          <p className="text-slate-500 text-[1.05rem] leading-relaxed">
            Bespoke pharmacy sites designed and built to each client's own brand and requirements — not from the shared white-label template. Open any one to explore it live.
          </p>
        </header>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
          {CUSTOM.map((s) => <ShowcaseCard key={s.path} s={s} badge="Live" />)}
        </div>

        <p className="text-center text-[0.8rem] text-slate-400 mt-14">
          Each preview is the live site rendered in miniature — click through to open it in a new tab.
        </p>
      </div>
    </div>
  );
}
