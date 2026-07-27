import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { AboutPageCentralAlt } from "./AboutPageCentralAlt";
import { DemoVariantSwitcher } from "../components/DemoVariantSwitcher";
import { ShieldCheck, Certificate, Heartbeat, Users, ThumbsUp, Check, Calendar, ArrowRight, SealCheck, ArrowSquareOut, Pill, Syringe, AirplaneTilt, Ear, HandHeart, Star, IconContext } from "@phosphor-icons/react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Reveal } from "../components/Reveal";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { centralBrand } from "../branding";
import { useSeo, JsonLd, pharmacyGraph } from "../seo";
import aboutHero from "../../assets/about-hero.jpeg";
import about1 from "../../assets/about-1.jpeg";
import about2 from "../../assets/about-2.jpeg";
import aboutBg from "../../assets/about-bg.jpeg";

const AREA = ["New Quay", "Ceredigion", "Cardigan Bay", "Wales"];

const IMG = { hero: aboutHero, story: about1, consult: about2, team: aboutBg };

const STATS = [
  { value: "35+", label: "Years serving New Quay" },
  { value: "Family", label: "Independent & family-owned" },
  { value: "1:1", label: "Private consultation room" },
  { value: "SA45", label: "Church Street, New Quay" },
];

const VALUES = [
  { icon: ThumbsUp, title: "Independent & family-owned", text: "Not a chain. We've been part of New Quay for over 35 years, and we look after our patients the way you'd hope a village pharmacy would." },
  { icon: ShieldCheck, title: "A registered pharmacy", text: "We're registered with the General Pharmaceutical Council (GPhC) and follow its standards for safe, professional care." },
  { icon: Certificate, title: "Qualified clinicians", text: "Our pharmacists are trained to assess, advise and, where appropriate, supply treatment — in a private consultation room." },
  { icon: AirplaneTilt, title: "A full travel clinic", text: "A designated yellow fever centre, with antimalarials and the vaccines you need for Hajj, Umrah and travel worldwide." },
];

const SERVICES = [
  { icon: Heartbeat, title: "NHS services", text: "Prescription dispensing, blood pressure checks, health checks and stop-smoking support — free to those who qualify." },
  { icon: Pill, title: "Dispensing & medicines advice", text: "NHS and private dispensing with clear, friendly guidance on how to take your medication safely." },
  { icon: AirplaneTilt, title: "Travel clinic", text: "Pre-travel advice, antimalarials, yellow fever and a full range of travel vaccinations in one visit." },
  { icon: Syringe, title: "Vaccinations", text: "Flu, COVID-19, meningitis and specialty vaccines — including Hajj and Umrah requirements." },
  { icon: Ear, title: "Ear microsuction", text: "Quick, comfortable wax removal by a trained clinician — usually one short appointment." },
  { icon: HandHeart, title: "Private consultations", text: "A dedicated, private room for sensitive conversations and one-to-one clinical care." },
];

/** Routed entry: `?layout=alt` shows the alternative (demo) layout; otherwise the default. */
export default function AboutPageCentral() {
  const [params] = useSearchParams();
  return (
    <>
      {params.get("layout") === "alt" ? <AboutPageCentralAlt /> : <AboutPageCentralDefault />}
      <DemoVariantSwitcher />
    </>
  );
}

function AboutPageCentralDefault() {
  const brand = centralBrand;
  const navigate = useNavigate();
  const branch = brand.locations[0];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  useSeo({
    title: "About Central Pharmacy | New Quay, Ceredigion",
    description: "Meet Central Pharmacy on Church Street, New Quay — an independent, family-owned pharmacy serving Ceredigion for over 35 years, with NHS and private services.",
    path: `${brand.basePath}/about`,
    favicon: brand.favicon,
  });

  return (
    <IconContext.Provider value={{ weight: "duotone" }}>
    <div className={`min-h-screen bg-white ${brand.themeClass}`}>
      <JsonLd data={pharmacyGraph(brand, AREA, { addressRegion: "Ceredigion" })} />
      <Header brand={brand} />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: "radial-gradient(55% 65% at 15% 20%, rgba(22,166,183,0.08), transparent 70%), radial-gradient(55% 65% at 85% 25%, rgba(22,166,183,0.05), transparent 70%), #F5FAFB" }}
        />
        <div className="relative max-w-7xl mx-auto px-4 pt-14 pb-12 grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-12 items-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md rounded-full pl-1.5 pr-3.5 py-1.5 shadow-sm border border-[#CDEBEF] mb-5">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-brand-secondary text-white"><Check size={12} weight="bold" /></span>
              <span className="text-[0.78rem] text-[#4A6A6F]" style={{ fontWeight: 600 }}>About us</span>
            </span>
            <h1 className="font-display text-[#0A3238] text-[2.2rem] md:text-[3rem] leading-[1.05] mb-4" style={{ fontWeight: 700, letterSpacing: "-0.02em" }}>
              A New Quay pharmacy, <span className="cp-swoosh-text">for over 35 years.</span>
            </h1>
            <p className="text-[#4A6A6F] text-[1.1rem] leading-relaxed">
              Central Pharmacy is an independent, family-owned pharmacy on Church Street in New Quay. We bring NHS and private services together under one roof — from everyday prescriptions to a full travel clinic — for the people of Ceredigion and Cardigan Bay.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-[4/3]">
                <ImageWithFallback src={IMG.hero} alt="A pharmacist welcoming a patient at Central Pharmacy" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-5 -left-3 sm:left-4 bg-white rounded-2xl shadow-lg border border-[#CDEBEF] px-4 py-3 flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-brand-secondary/10 text-brand-secondary flex items-center justify-center"><ShieldCheck size={18} /></span>
                <div className="leading-tight">
                  <p className="text-[#0A3238] text-[0.86rem]" style={{ fontWeight: 700 }}>GPhC registered</p>
                  <p className="text-[#4A6A6F] text-[0.74rem]">Safe, professional care</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
        <div aria-hidden="true" className="cp-swoosh-bar h-[3px] w-full opacity-80" />
      </section>

      {/* Stats strip */}
      <section className="relative bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-[#DDF1F3] rounded-2xl border border-[#DDF1F3] overflow-hidden -mt-px">
            {STATS.map((s) => (
              <div key={s.label} className="p-6 text-center">
                <p className="font-display text-[2rem] md:text-[2.4rem] text-brand-primary leading-none mb-1.5" style={{ fontWeight: 700, letterSpacing: "-0.02em" }}>{s.value}</p>
                <p className="text-[0.82rem] text-[#4A6A6F] leading-snug">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our story */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <Reveal>
            <span className="text-[0.8rem] text-brand-secondary uppercase tracking-widest" style={{ fontWeight: 700 }}>Our story</span>
            <h2 className="font-display text-[1.75rem] md:text-[2.2rem] text-[#0A3238] mt-2 mb-4" style={{ fontWeight: 700, letterSpacing: "-0.01em" }}>Three decades of local care</h2>
            <div className="space-y-4 text-[#4A6A6F] text-[1.0625rem] leading-[1.65]">
              <p>
                For more than 35 years, Central Pharmacy has been a fixture on Church Street — a family business that has grown up alongside the community it serves. Faces change, but the way we look after people hasn't.
              </p>
              <p>
                We're a full NHS and private pharmacy. Alongside dispensing and everyday NHS services, we run a busy travel clinic — a designated yellow fever centre offering antimalarials, Hajj and Umrah vaccinations, and pre-travel advice tailored to wherever you're going.
              </p>
              <p className="text-[0.95rem]">
                If your symptoms are severe, getting worse, or you're worried, please contact your GP or call <a href="tel:111" className="text-brand-primary underline" style={{ fontWeight: 600 }}>NHS 111</a> — and in an emergency, always call <a href="tel:999" className="text-brand-primary underline" style={{ fontWeight: 600 }}>999</a>.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden shadow-md aspect-[3/4] mt-6">
                <ImageWithFallback src={IMG.story} alt="The dispensary at Central Pharmacy" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-md aspect-[3/4]">
                <ImageWithFallback src={IMG.consult} alt="Private clinical consultation" className="w-full h-full object-cover" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* What we offer */}
      <section className="relative py-16" style={{ background: "linear-gradient(135deg, #ECFAFB 0%, #E2F6F9 100%)" }}>
        <div className="max-w-7xl mx-auto px-4">
          <Reveal className="max-w-2xl mb-10">
            <span className="text-[0.8rem] text-brand-secondary uppercase tracking-widest" style={{ fontWeight: 700 }}>What we offer</span>
            <h2 className="font-display text-[1.8rem] md:text-[2.2rem] text-[#0A3238] mt-2 mb-3" style={{ fontWeight: 700, letterSpacing: "-0.01em" }}>NHS and private care, side by side</h2>
            <p className="text-[#4A6A6F] text-[1rem] leading-relaxed">From everyday NHS services to private clinics you can book in minutes — here's what you'll find at our New Quay pharmacy.</p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.05}>
                <div className="h-full rounded-2xl border border-[#CDEBEF] bg-white shadow-sm p-6 hover:-translate-y-0.5 hover:shadow-md transition-all">
                  <span className="w-11 h-11 rounded-xl bg-brand-secondary/10 text-brand-secondary flex items-center justify-center mb-4"><s.icon size={22} /></span>
                  <h3 className="font-display text-[1.05rem] text-[#0A3238] mb-1.5" style={{ fontWeight: 600 }}>{s.title}</h3>
                  <p className="text-[0.88rem] text-[#4A6A6F] leading-relaxed">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Central */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-4">
          <Reveal className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[0.8rem] text-brand-secondary uppercase tracking-widest" style={{ fontWeight: 700 }}>Why Central</span>
            <h2 className="font-display text-[1.8rem] md:text-[2.2rem] text-[#0A3238] mt-2" style={{ fontWeight: 700, letterSpacing: "-0.01em" }}>What you can count on</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.06}>
                <div className="h-full rounded-2xl border border-[#CDEBEF] bg-white shadow-sm p-6 hover:-translate-y-0.5 hover:shadow-md transition-all">
                  <span className="w-12 h-12 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-4">
                    <v.icon size={24} />
                  </span>
                  <h3 className="font-display text-[1.1rem] text-[#0A3238] mb-1.5" style={{ fontWeight: 600 }}>{v.title}</h3>
                  <p className="text-[0.9rem] text-[#4A6A6F] leading-relaxed">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Our team band */}
      <section className="relative py-16" style={{ background: "#ECFAFB" }}>
        <div className="max-w-7xl mx-auto px-4">
          <Reveal>
            <div className="relative rounded-3xl overflow-hidden min-h-[20rem] flex items-center">
              <ImageWithFallback src={IMG.team} alt="The Central Pharmacy team" className="absolute inset-0 w-full h-full object-cover" />
              <div aria-hidden="true" className="absolute inset-0" style={{ background: "linear-gradient(100deg, rgba(5,25,28,0.90) 0%, rgba(10,50,56,0.74) 45%, rgba(10,50,56,0.30) 100%)" }} />
              <div className="relative max-w-xl px-7 sm:px-10 py-10 text-white">
                <span className="inline-flex items-center gap-2 text-[0.78rem] uppercase tracking-widest text-white/85" style={{ fontWeight: 700 }}>
                  <Users size={15} /> Friendly faces
                </span>
                <h2 className="font-display text-[1.7rem] md:text-[2.2rem] leading-tight mt-3 mb-3" style={{ fontWeight: 700, letterSpacing: "-0.01em" }}>A team that knows the community</h2>
                <p className="text-white/85 text-[1rem] leading-relaxed mb-5">
                  Our pharmacists and support staff live and work locally. We take the time to listen, explain your options in plain English, and make sure you leave feeling looked after.
                </p>
                <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 text-[0.88rem]">
                  <Star size={15} weight="fill" className="text-amber-300" /> Trusted across New Quay &amp; Ceredigion
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Registration & compliance */}
      <section className="relative py-16">
        <div className="max-w-4xl mx-auto px-4">
          <Reveal>
            <div className="rounded-2xl border border-[#CDEBEF] bg-white shadow-sm p-7 sm:p-9">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-11 h-11 rounded-xl bg-brand-secondary/10 text-brand-secondary flex items-center justify-center"><SealCheck size={22} /></span>
                <h2 className="font-display text-[1.4rem] text-[#0A3238]" style={{ fontWeight: 700 }}>Registration &amp; governance</h2>
              </div>
              <p className="text-[#4A6A6F] text-[0.98rem] leading-relaxed mb-6">
                Central Pharmacy is a registered pharmacy regulated by the General Pharmaceutical Council (GPhC). You can verify our registration on the GPhC register.
              </p>
              <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-4 text-[0.92rem]">
                <div>
                  <dt className="text-[#4A6A6F]" style={{ fontWeight: 500 }}>Superintendent Pharmacist</dt>
                  <dd className="text-[#0A3238]" style={{ fontWeight: 600 }}>{brand.legal?.superintendent}</dd>
                </div>
                <div>
                  <dt className="text-[#4A6A6F]" style={{ fontWeight: 500 }}>GPhC premises registration</dt>
                  <dd className="text-[#0A3238]" style={{ fontWeight: 600 }}>{brand.legal?.gphcNumber}</dd>
                </div>
                <div>
                  <dt className="text-[#4A6A6F]" style={{ fontWeight: 500 }}>Company registration</dt>
                  <dd className="text-[#0A3238]" style={{ fontWeight: 600 }}>{brand.legal?.companyNumber}</dd>
                </div>
                <div>
                  <dt className="text-[#4A6A6F]" style={{ fontWeight: 500 }}>Address</dt>
                  <dd className="text-[#0A3238]" style={{ fontWeight: 600 }}>{branch.address}</dd>
                </div>
              </dl>
              <a
                href="https://www.pharmacyregulation.org/registers"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-1.5 text-brand-primary hover:gap-2.5 transition-all text-[0.9rem]"
                style={{ fontWeight: 600 }}
              >
                Check the GPhC register <ArrowSquareOut size={14} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16" style={{ background: "#0A3238" }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-white text-[1.9rem] md:text-[2.4rem] leading-tight mb-4" style={{ fontWeight: 700, letterSpacing: "-0.01em" }}>Ready to get started?</h2>
          <p className="text-white/85 text-[1.05rem] max-w-lg mx-auto mb-7">Book an appointment online, or get in touch with the team — we're happy to help.</p>
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
    </IconContext.Provider>
  );
}
