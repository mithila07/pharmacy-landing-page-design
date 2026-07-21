import { useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router";
import { Check, Calendar, ArrowRight } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Reveal } from "./Reveal";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { kepplelaneBrand } from "../branding";
import { useSeo, JsonLd, pharmacyGraph } from "../seo";

const AREA = ["Garstang", "Preston", "Lancashire"];

type Props = {
  /** Small pill above the headline, e.g. "Dispensary". */
  eyebrow: string;
  /** Headline, split so the tail can carry the violet gradient. */
  title: string;
  titleAccent: string;
  intro: string;
  heroImage: string;
  heroImageAlt: string;
  seo: { title: string; description: string; path: string };
  children: ReactNode;
};

/**
 * Shared shell for the Kepple Lane "Dispensary" sub-pages (dispensing process,
 * deliveries, roles, updates). Keeps the hero, gradient rule and closing CTA
 * identical across all four so they read as one section of the site — each page
 * only supplies its own body.
 */
export function KeppleSubPage({ eyebrow, title, titleAccent, intro, heroImage, heroImageAlt, seo, children }: Props) {
  const brand = kepplelaneBrand;
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [seo.path]);

  useSeo(seo);

  return (
    <div className={`min-h-screen bg-white ${brand.themeClass}`}>
      <JsonLd data={pharmacyGraph(brand, AREA, { addressRegion: "Lancashire" })} />
      <Header brand={brand} />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: "radial-gradient(55% 65% at 15% 20%, rgba(74,63,184,0.14), transparent 70%), radial-gradient(55% 65% at 85% 25%, rgba(169,155,240,0.22), transparent 70%), #F7F5FF" }}
        />
        <div className="relative max-w-7xl mx-auto px-4 pt-14 pb-12 grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-12 items-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md rounded-full pl-1.5 pr-3.5 py-1.5 shadow-sm border border-[#DED9F7] mb-5">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-brand-secondary text-white"><Check size={12} strokeWidth={3} /></span>
              <span className="text-[0.78rem] text-[#5A5578]" style={{ fontWeight: 600 }}>{eyebrow}</span>
            </span>
            <h1 className="text-[#1E1A3C] text-[2.2rem] md:text-[2.9rem] leading-[1.05] mb-4" style={{ fontWeight: 700, letterSpacing: "-0.02em" }}>
              {title} <span className="kl-grad-text">{titleAccent}</span>
            </h1>
            <p className="text-[#5A5578] text-[1.05rem] leading-relaxed">{intro}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-[5/4]">
              <ImageWithFallback src={heroImage} alt={heroImageAlt} className="w-full h-full object-cover" />
            </div>
          </Reveal>
        </div>
        <div aria-hidden="true" className="kl-grad-bar h-[3px] w-full opacity-80" />
      </section>

      {children}

      {/* CTA */}
      <section className="relative py-16" style={{ background: "linear-gradient(110deg, #4A3FB8 0%, #8E82EE 100%)" }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-white text-[1.9rem] md:text-[2.4rem] leading-tight mb-4" style={{ fontWeight: 700, letterSpacing: "-0.01em" }}>Any questions?</h2>
          <p className="text-white/85 text-[1.05rem] max-w-lg mx-auto mb-7">Our team is happy to talk anything through — call us, drop in, or book an appointment online.</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => navigate(brand.basePath)}
              className="inline-flex items-center justify-center gap-2 bg-white text-brand-primary px-7 min-h-[48px] rounded-xl hover:shadow-lg transition-all cursor-pointer"
              style={{ fontWeight: 700 }}
            >
              <Calendar size={18} /> Book appointment
            </button>
            <button
              onClick={() => navigate(brand.contactPath!)}
              className="inline-flex items-center justify-center gap-2 bg-white/10 text-white border border-white/40 px-6 min-h-[48px] rounded-xl hover:bg-white/20 transition-all cursor-pointer"
              style={{ fontWeight: 600 }}
            >
              Contact us <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      <Footer brand={brand} />
    </div>
  );
}
