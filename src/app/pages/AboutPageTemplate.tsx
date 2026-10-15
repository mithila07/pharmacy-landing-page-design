import { useEffect } from "react";
import { useNavigate } from "react-router";
import { ShieldCheck, HeartPulse, Users, MapPin, Check, Calendar, ArrowRight, BadgeCheck, ExternalLink, Pill, Syringe, Activity, HandHeart, Building2 } from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Reveal } from "../components/Reveal";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import type { Brand } from "../branding";
import { templateSites } from "../data/templateSites";
import { useSeo, JsonLd, pharmacyGraph } from "../seo";
import aboutHero from "../../assets/about-hero.jpeg";
import about1 from "../../assets/about-1.jpeg";
import about2 from "../../assets/about-2.jpeg";
import aboutBg from "../../assets/about-bg.jpeg";

const VALUES = [
  { icon: ShieldCheck, title: "A registered pharmacy", text: "We're registered with the General Pharmaceutical Council (GPhC) and follow its standards for safe, professional care." },
  { icon: HeartPulse, title: "NHS & private, one roof", text: "From NHS Pharmacy First and dispensing to private clinics — without the wait for a GP appointment." },
  { icon: Users, title: "A friendly local team", text: "Qualified pharmacists and support staff who take the time to listen and explain your options in plain English." },
  { icon: MapPin, title: "Close to home", text: "Care on your doorstep, with a dedicated consultation room for private, one-to-one conversations." },
];

const SERVICES = [
  { icon: HeartPulse, title: "NHS Pharmacy First", text: "Assessment and treatment for common conditions — no GP appointment needed." },
  { icon: Pill, title: "Dispensing & medicines advice", text: "NHS dispensing with clear, friendly guidance on how to take your medication safely." },
  { icon: Syringe, title: "Vaccinations", text: "NHS and private vaccinations, from seasonal flu to travel and specialty vaccines." },
  { icon: Activity, title: "Health checks", text: "Blood pressure checks and routine health screening to help you stay well." },
  { icon: HandHeart, title: "Private clinics", text: "Book private services in minutes — delivered by trained pharmacists in a private room." },
  { icon: Building2, title: "Community focused", text: "A local pharmacy that knows its patients and is here to help the whole community." },
];

export function AboutPageTemplate({ brand }: { brand: Brand }) {
  const cfg = templateSites[brand.id].about;
  const navigate = useNavigate();
  const branch = brand.locations[0];

  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, []);

  useSeo({
    title: `About ${brand.name} | ${brand.seoArea}`,
    description: `Meet ${brand.name} in ${brand.seoArea} — a GPhC-registered community pharmacy bringing NHS and private services together under one roof.`,
    path: `${brand.basePath}/about`,
    favicon: brand.favicon,
  });

  return (
    <div className={`min-h-screen bg-white ${brand.themeClass}`}>
      <JsonLd data={pharmacyGraph(brand, [brand.seoArea ?? branch.shortName])} />
      <Header brand={brand} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-light">
        <div aria-hidden="true" className="absolute -top-24 right-0 w-[30rem] h-[30rem] rounded-full bg-brand-accent/15 blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 pt-14 pb-12 grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-12 items-center">
          <Reveal>
            <h1 className="font-display text-slate-900 text-[2.2rem] md:text-[3rem] leading-[1.05] mb-4" style={{ fontWeight: 700, letterSpacing: "-0.02em" }}>
              Trusted local care, <span className="text-brand-secondary">{cfg.accent}</span>
            </h1>
            <p className="text-slate-500 text-[1.1rem] leading-relaxed">{cfg.subtitle}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-[4/3]">
                <ImageWithFallback src={aboutHero} alt={`A pharmacist welcoming a patient at ${brand.name}`} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-5 -left-3 sm:left-4 bg-white rounded-2xl shadow-lg border border-slate-200 px-4 py-3 flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-brand-secondary/10 text-brand-secondary flex items-center justify-center"><ShieldCheck size={18} /></span>
                <div className="leading-tight">
                  <p className="text-slate-900 text-[0.86rem]" style={{ fontWeight: 700 }}>GPhC registered</p>
                  <p className="text-slate-500 text-[0.74rem]">Safe, professional care</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats strip */}
      <section className="relative bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-slate-100 rounded-2xl border border-slate-100 overflow-hidden -mt-px">
            {cfg.stats.map((s) => (
              <div key={s.label} className="p-6 text-center">
                <p className="font-display text-[1.9rem] md:text-[2.3rem] text-brand-primary leading-none mb-1.5" style={{ fontWeight: 700, letterSpacing: "-0.02em" }}>{s.value}</p>
                <p className="text-[0.82rem] text-slate-500 leading-snug">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our story */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <Reveal>
            <h2 className="font-display text-[1.75rem] md:text-[2.2rem] text-slate-900 mt-2 mb-4" style={{ fontWeight: 700, letterSpacing: "-0.01em" }}>Healthcare that fits around your life</h2>
            <div className="space-y-4 text-slate-600 text-[1.0625rem] leading-[1.65]">
              {cfg.story.map((p, i) => <p key={i}>{p}</p>)}
              <p className="text-[0.95rem]">
                If your symptoms are severe, getting worse, or you're worried, please contact your GP or call <a href="tel:111" className="text-brand-primary underline" style={{ fontWeight: 600 }}>NHS 111</a> — and in an emergency, always call <a href="tel:999" className="text-brand-primary underline" style={{ fontWeight: 600 }}>999</a>.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden shadow-md aspect-[3/4] mt-6">
                <ImageWithFallback src={about1} alt={`The dispensary at ${brand.name}`} className="w-full h-full object-cover" />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-md aspect-[3/4]">
                <ImageWithFallback src={about2} alt="A private clinical consultation" className="w-full h-full object-cover" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* What we offer */}
      <section className="relative py-16 bg-brand-light">
        <div className="max-w-7xl mx-auto px-4">
          <Reveal className="max-w-2xl mb-10">
            <h2 className="font-display text-[1.8rem] md:text-[2.2rem] text-slate-900 mt-2 mb-3" style={{ fontWeight: 700, letterSpacing: "-0.01em" }}>NHS and private care, side by side</h2>
            <p className="text-slate-500 text-[1rem] leading-relaxed">From everyday NHS services to private clinics you can book in minutes — here's what you'll find at {brand.name}.</p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.05}>
                <div className="h-full rounded-2xl border border-slate-200 bg-white shadow-sm p-6 hover:-translate-y-0.5 hover:shadow-md transition-all">
                  <span className="w-11 h-11 rounded-xl bg-brand-secondary/10 text-brand-secondary flex items-center justify-center mb-4"><s.icon size={22} /></span>
                  <h3 className="font-display text-[1.05rem] text-slate-900 mb-1.5" style={{ fontWeight: 600 }}>{s.title}</h3>
                  <p className="text-[0.88rem] text-slate-500 leading-relaxed">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-4">
          <Reveal className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-display text-[1.8rem] md:text-[2.2rem] text-slate-900 mt-2" style={{ fontWeight: 700, letterSpacing: "-0.01em" }}>Why patients choose {brand.name.replace(" Pharmacy", "")}</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.06}>
                <div className="h-full rounded-2xl border border-slate-200 bg-white shadow-sm p-6 hover:-translate-y-0.5 hover:shadow-md transition-all">
                  <span className="w-12 h-12 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-4"><v.icon size={24} /></span>
                  <h3 className="font-display text-[1.1rem] text-slate-900 mb-1.5" style={{ fontWeight: 600 }}>{v.title}</h3>
                  <p className="text-[0.9rem] text-slate-500 leading-relaxed">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team band */}
      <section className="relative py-16 bg-brand-light">
        <div className="max-w-7xl mx-auto px-4">
          <Reveal>
            <div className="relative rounded-3xl overflow-hidden min-h-[20rem] flex items-center">
              <ImageWithFallback src={aboutBg} alt={`The ${brand.name} team`} className="absolute inset-0 w-full h-full object-cover" />
              <div aria-hidden="true" className="absolute inset-0" style={{ background: "linear-gradient(100deg, rgba(15,23,42,0.90) 0%, rgba(15,23,42,0.72) 45%, rgba(15,23,42,0.30) 100%)" }} />
              <div className="relative max-w-xl px-7 sm:px-10 py-10 text-white">
                <h2 className="font-display text-[1.7rem] md:text-[2.2rem] leading-tight mt-3 mb-3" style={{ fontWeight: 700, letterSpacing: "-0.01em" }}>A team that knows the community</h2>
                <p className="text-white/85 text-[1rem] leading-relaxed">
                  Our pharmacists and support staff live and work locally. We take the time to listen, explain your options in plain English, and make sure you leave feeling looked after.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Registration & compliance */}
      <section className="relative py-16">
        <div className="max-w-4xl mx-auto px-4">
          <Reveal>
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-7 sm:p-9">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-11 h-11 rounded-xl bg-brand-secondary/10 text-brand-secondary flex items-center justify-center"><BadgeCheck size={22} /></span>
                <h2 className="font-display text-[1.4rem] text-slate-900" style={{ fontWeight: 700 }}>Registration &amp; governance</h2>
              </div>
              <p className="text-slate-500 text-[0.98rem] leading-relaxed mb-6">
                {brand.name} is a registered pharmacy regulated by the General Pharmaceutical Council (GPhC). You can verify our registration on the GPhC register.
              </p>
              <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-4 text-[0.92rem]">
                <div><dt className="text-slate-500" style={{ fontWeight: 500 }}>Superintendent Pharmacist</dt><dd className="text-slate-900" style={{ fontWeight: 600 }}>{brand.legal?.superintendent}</dd></div>
                <div><dt className="text-slate-500" style={{ fontWeight: 500 }}>GPhC registration number</dt><dd className="text-slate-900" style={{ fontWeight: 600 }}>{brand.legal?.gphcNumber}</dd></div>
                <div><dt className="text-slate-500" style={{ fontWeight: 500 }}>Trading name</dt><dd className="text-slate-900" style={{ fontWeight: 600 }}>{brand.legal?.companyName}</dd></div>
                <div><dt className="text-slate-500" style={{ fontWeight: 500 }}>Address</dt><dd className="text-slate-900" style={{ fontWeight: 600 }}>{branch.address}</dd></div>
              </dl>
              <a href="https://www.pharmacyregulation.org/registers" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-1.5 text-brand-primary hover:gap-2.5 transition-all text-[0.9rem]" style={{ fontWeight: 600 }}>
                Check the GPhC register <ExternalLink size={14} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16 bg-brand-primary">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-white text-[1.9rem] md:text-[2.4rem] leading-tight mb-4" style={{ fontWeight: 700, letterSpacing: "-0.01em" }}>Ready to get started?</h2>
          <p className="text-white/85 text-[1.05rem] max-w-lg mx-auto mb-7">Book an appointment online, or get in touch with the team — we're happy to help.</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button onClick={() => navigate(brand.basePath)} className="inline-flex items-center justify-center gap-2 bg-white text-brand-primary px-7 min-h-[48px] rounded-xl hover:shadow-lg transition-all cursor-pointer" style={{ fontWeight: 700 }}>
              <Calendar size={18} /> Book appointment
            </button>
            <button onClick={() => navigate(brand.contactPath!)} className="inline-flex items-center justify-center gap-2 bg-white/10 text-white border border-white/40 px-6 min-h-[48px] rounded-xl hover:bg-white/20 transition-all cursor-pointer" style={{ fontWeight: 600 }}>
              Contact us <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      <Footer brand={brand} />
    </div>
  );
}
