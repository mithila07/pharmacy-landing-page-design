import { useEffect } from "react";
import { useNavigate } from "react-router";
import { ArrowRight, Clock, ShieldCheck, Sparkles } from "lucide-react";
import { ArrowRight as PhArrowRight } from "@phosphor-icons/react";
import { Header } from "../components/Header";
import { HeroSection } from "../components/HeroSection";
import { HeroSectionStrachans } from "../components/HeroSectionStrachans";
import { HeroSectionHealthCheck } from "../components/HeroSectionHealthCheck";
import { ReviewsSection } from "../components/ReviewsSection";
import { ReviewsSectionHealthCheck } from "../components/ReviewsSectionHealthCheck";
import { BlogTeaserSection } from "../components/BlogTeaserSection";
import { FaqSection } from "../components/FaqSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { nhsServices, privateServices } from "../data/services";
import { carefirstBrand, type Brand } from "../branding";
import { useSeo, JsonLd, pharmacyGraph } from "../seo";

type CardItem = {
  id: string;
  imageUrl: string;
  chip?: string;
  ctaLabel: string;
  accent: "nhs" | "private";
  highlight?: { icon: typeof Clock; label: string };
  /** Flags the service as newly added — renders a glowing "New" chip (Strachans only). */
  isNew?: boolean;
};

const pharmacyFirstCards: CardItem[] = [
  {
    id: "nhs-pf-sinusitis",
    imageUrl: "https://images.unsplash.com/photo-1573032780225-a67b1b866312?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
    chip: "Age 12+",
    ctaLabel: "Book free consultation",
    accent: "nhs",
    isNew: true,
  },
  {
    id: "nhs-pf-sore-throat",
    imageUrl: "https://images.unsplash.com/photo-1555211652-5c6222f971bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
    chip: "Age 5+",
    ctaLabel: "Book free consultation",
    accent: "nhs",
  },
  {
    id: "nhs-pf-earache",
    imageUrl: "https://images.unsplash.com/photo-1632053005736-6bd9cfc4daf9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
    chip: "Age 1–17",
    ctaLabel: "Book free consultation",
    accent: "nhs",
  },
  {
    id: "nhs-pf-insect-bite",
    imageUrl: "https://images.unsplash.com/photo-1625055659726-aba67a25b9af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
    chip: "Age 1+",
    ctaLabel: "Book free consultation",
    accent: "nhs",
  },
  {
    id: "nhs-pf-impetigo",
    imageUrl: "https://images.unsplash.com/photo-1552819289-824d37ca69d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
    chip: "Age 1+",
    ctaLabel: "Book free consultation",
    accent: "nhs",
  },
  {
    id: "nhs-pf-shingles",
    imageUrl: "https://images.unsplash.com/photo-1547128802-a6750e8e3c3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
    chip: "Age 18+",
    ctaLabel: "Book free consultation",
    accent: "nhs",
  },
  {
    id: "nhs-pf-uti",
    imageUrl: "https://images.unsplash.com/photo-1624948465027-6f9b51067557?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
    chip: "Women 16–64",
    ctaLabel: "Book free consultation",
    accent: "nhs",
  },
];

const privateCards: CardItem[] = [
  {
    id: "prv-weight-consult",
    imageUrl: "https://images.unsplash.com/photo-1522844990619-4951c40f7eda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
    ctaLabel: "Book this service",
    accent: "private",
    highlight: { icon: Sparkles, label: "Lose 5–15% body weight" },
    isNew: true,
  },
  {
    id: "prv-ear-wax",
    imageUrl: "https://images.unsplash.com/photo-1758598738326-3bc889d1558d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
    ctaLabel: "Book this service",
    accent: "private",
    highlight: { icon: Clock, label: "15-minute appointment" },
  },
  {
    id: "prv-vitamin-injection",
    imageUrl: "https://images.unsplash.com/photo-1608326389386-0305acbe600f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
    ctaLabel: "Book this service",
    accent: "private",
    highlight: { icon: ShieldCheck, label: "No prescription needed" },
  },
];

const allServices = [...nhsServices, ...privateServices];

function ServiceCard({ item, brand }: { item: CardItem; brand: Brand }) {
  const navigate = useNavigate();
  const service = allServices.find((s) => s.id === item.id);
  if (!service) return null;

  const isNHS = item.accent === "nhs";
  const accentText = isNHS ? "text-brand-primary" : "text-brand-secondary";
  const accentBorder = isNHS ? "hover:border-brand-primary/40" : "hover:border-brand-secondary/50";
  const accentShadow = isNHS ? "hover:shadow-emerald-900/10" : "hover:shadow-teal-500/10";
  const chipClass = isNHS
    ? "bg-white/95 text-brand-primary border-brand-primary/20"
    : "bg-white/95 text-brand-secondary border-brand-secondary/20";

  return (
    <a
      href={`${brand.basePath}/book/${item.id}`}
      onClick={(e) => { e.preventDefault(); navigate(`${brand.basePath}/book/${item.id}`); }}
      aria-label={service.name}
      className={`group relative block overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all duration-300 ease-in-out hover:shadow-xl ${accentBorder} ${accentShadow}`}
    >
      {/* Image */}
      <div className="aspect-square overflow-hidden bg-gray-100">
        <ImageWithFallback
          src={item.imageUrl}
          alt={service.name}
          className="h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
        />
      </div>

      {/* Floating chip — top-right (NHS age) */}
      {item.chip && (
        <span
          className={`absolute top-3 right-3 text-[0.72rem] px-2.5 py-1 rounded-full border backdrop-blur-sm ${chipClass}`}
          style={{ fontWeight: 600 }}
        >
          {item.chip}
        </span>
      )}

      {/* Price chip — top-right for private services: white with green border + text */}
      {!isNHS && service.price && (
        <span
          className="absolute top-3 right-3 text-[0.72rem] px-2.5 py-1 rounded-full bg-white text-brand-secondary border border-brand-secondary backdrop-blur-sm"
          style={{ fontWeight: 700 }}
        >
          {service.price.replace(/^From\s+(\d)/, "From £$1")}
        </span>
      )}

      {/* Glowing "New" highlight — top-left (Strachans only) */}
      {item.isNew && brand.id === "strachans" && (
        <span className="chip-new-pink absolute top-3 left-3 inline-flex items-center gap-1 text-[0.66rem] uppercase tracking-[0.12em] px-2.5 py-1 rounded-full text-white" style={{ fontWeight: 800 }}>
          <span className="chip-new-pink-dot" /> New
        </span>
      )}

      {/* Content */}
      <div className="p-5">
        <h3 className="text-[1.05rem] text-gray-900 leading-tight mb-1.5" style={{ fontWeight: 700 }}>
          {service.name}
        </h3>
        <p className="text-[0.85rem] text-gray-500 leading-relaxed mb-4 line-clamp-3">
          {service.description}
        </p>

        {item.highlight && (
          <div className="flex items-center gap-1.5 text-[0.78rem] text-gray-500 mb-3">
            <item.highlight.icon size={14} className={accentText} />
            <span style={{ fontWeight: 500 }}>{item.highlight.label}</span>
          </div>
        )}

        <div className={`flex items-center gap-2 ${accentText} group-hover:gap-3 transition-all`} style={{ fontWeight: 600 }}>
          <span className="text-[0.9rem]">{item.ctaLabel}</span>
          {brand.id === "healthcheck" ? <PhArrowRight size={16} weight="duotone" /> : <ArrowRight size={16} />}
        </div>
      </div>
    </a>
  );
}

export function SimpleLanding({ brand = carefirstBrand }: { brand?: Brand } = {}) {
  // Scroll to a section when arriving via a hash link (e.g. from the About page nav).
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }));
  }, []);

  const seo = brand.id === "strachans"
    ? {
        title: "Strachans Pharmacy | NHS & Private Pharmacy in Bury & Uppermill",
        description: "NHS Pharmacy First and private clinics across Bury and Uppermill — travel vaccines, weight management, ear wax removal, blood tests and more. Book a same-day pharmacist appointment online.",
      }
    : brand.id === "healthcheck"
    ? {
        title: "Health-Check Pharmacy & Clinic — Bradford | NHS & Private Services",
        description: "NHS Pharmacy First, repeat prescriptions and private clinics at Health-Check Pharmacy on Great Horton Road, Bradford. Book a same-day appointment online — travel jabs, blood pressure checks, ear wax removal and more.",
      }
    : {
        title: `${brand.name} | NHS & Private Community Pharmacy`,
        description: `${brand.name} offers NHS Pharmacy First, vaccinations and private clinics. Book a same-day pharmacist appointment online — no GP referral needed.`,
      };
  useSeo({ ...seo, path: brand.basePath || "/" });

  const isHC = brand.id === "healthcheck";

  return (
    <div className={`min-h-screen bg-white ${brand.themeClass}`}>
      <JsonLd data={pharmacyGraph(brand, brand.id === "healthcheck" ? ["Bradford", "West Yorkshire"] : undefined)} />
      <Header brand={brand} bookNowServices={[...pharmacyFirstCards.map((c) => c.id), ...privateCards.map((c) => c.id)]} />
      {brand.id === "strachans" ? <HeroSectionStrachans /> : brand.id === "healthcheck" ? <HeroSectionHealthCheck /> : <HeroSection />}

      {/* NHS Pharmacy First */}
      <section id="nhs-services" className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light/60 via-white to-white" />
        <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-brand-primary/5 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-10 max-w-2xl mx-auto">
            <h2 className="text-[1.8rem] md:text-[2.2rem] text-gray-900 mb-3" style={{ fontWeight: 700 }}>
              {isHC ? <><span className="hc-swoosh-text">Free NHS</span> Services</> : "NHS Pharmacy First"}
            </h2>
            <p className="text-gray-600 text-[1rem] leading-relaxed">
              {isHC
                ? "Get fast, expert treatment for 7 common conditions without seeing your GP. Our pharmacists can assess you and supply prescription medicines where appropriate — fully funded by the NHS, at no cost to you."
                : "Get free, fast treatment for 7 common conditions without seeing your GP. Our pharmacists can assess you and supply prescription medicines where appropriate — at no cost."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {pharmacyFirstCards.map((c) => (
              <ServiceCard key={c.id} item={c} brand={brand} />
            ))}
          </div>
        </div>
      </section>

      {/* Private Services */}
      <section id="private-services" className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-brand-light-alt/40 to-white" />
        <div className="absolute bottom-20 left-0 w-[400px] h-[400px] bg-brand-secondary/8 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-10 max-w-2xl mx-auto">
            <h2 className="text-[1.8rem] md:text-[2.2rem] text-gray-900 mb-3" style={{ fontWeight: 700 }}>
              {isHC ? <><span className="hc-swoosh-text">Private clinics</span> at your pharmacy</> : "Private clinics at your pharmacy"}
            </h2>
            <p className="text-gray-600 text-[1rem] leading-relaxed">Skip the GP queue. Book one of our most-requested private services in minutes — delivered by trained pharmacists in a private consultation room.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {privateCards.map((c) => (
              <ServiceCard key={c.id} item={c} brand={brand} />
            ))}
          </div>
        </div>
      </section>

      {brand.id === "healthcheck" ? <ReviewsSectionHealthCheck /> : <ReviewsSection />}
      {brand.blogPath && <BlogTeaserSection brand={brand} />}
      <FaqSection brand={brand} />
      {/* Inline "Find Us" only for single-location brands; multi-location brands use a dedicated Contact page. */}
      {!brand.contactPath && <ContactSection brand={brand} />}
      <Footer brand={brand} />
    </div>
  );
}

export default function LandingPageSimple() {
  return <SimpleLanding brand={carefirstBrand} />;
}
