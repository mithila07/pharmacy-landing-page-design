import { useEffect } from "react";
import { useNavigate } from "react-router";
import { ShieldCheck, Stethoscope, Heartbeat, MapPin, Check, Calendar, ArrowRight, SealCheck, ArrowSquareOut, Pill, Syringe, Pulse, Users, Star, IconContext } from "@phosphor-icons/react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Reveal } from "../components/Reveal";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { healthcheckBrand } from "../branding";
import { useSeo, JsonLd, pharmacyGraph } from "../seo";
import aboutHero from "../../assets/about-hero.jpeg";
import about1 from "../../assets/about-1.jpeg";
import about2 from "../../assets/about-2.jpeg";
import aboutBg from "../../assets/about-bg.jpeg";

const AREA = ["Bradford", "West Yorkshire"];

const IMG = {
  hero: aboutHero,
  story: about1,
  consult: about2,
  team: aboutBg,
};

const STATS = [
  { value: "7", label: "NHS conditions treated free" },
  { value: "4.8★", label: "Average Google rating" },
  { value: "1:1", label: "Private consultation room" },
  { value: "BD7", label: "Great Horton Road, Bradford" },
];

const VALUES = [
  { icon: ShieldCheck, title: "A registered pharmacy", text: "We're registered with the General Pharmaceutical Council (GPhC) and follow its standards for safe, professional care." },
  { icon: Stethoscope, title: "Qualified clinicians", text: "Our pharmacists are trained to assess, advise and, where appropriate, supply treatment — in a private consultation room." },
  { icon: Heartbeat, title: "NHS & private, one roof", text: "From NHS Pharmacy First and dispensing to private travel jabs and health checks — without the wait for a GP." },
  { icon: MapPin, title: "Local & convenient", text: "On Great Horton Road in Bradford, with step-free access and friendly faces who know the community." },
];

const SERVICES = [
  { icon: Heartbeat, title: "NHS Pharmacy First", text: "Assessment and treatment for 7 common conditions — no GP appointment needed." },
  { icon: Pill, title: "Dispensing & medicines advice", text: "NHS dispensing with clear, friendly guidance on how to take your medication safely." },
  { icon: Syringe, title: "Travel vaccinations", text: "Pre-travel advice and a full range of travel jabs in a single visit." },
  { icon: Pulse, title: "Health checks", text: "Blood pressure checks, weight management support and other routine health screening." },
  { icon: Stethoscope, title: "Ear wax removal", text: "Quick, comfortable micro-suction by a trained clinician — usually one short appointment." },
  { icon: Users, title: "Private consultations", text: "A dedicated, private room for sensitive conversations and one-to-one clinical care." },
];

export default function AboutPageHealthCheck() {
  const brand = healthcheckBrand;
  const navigate = useNavigate();
  const branch = brand.locations[0];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  useSeo({
    title: "About Health-Check Pharmacy & Clinic | Bradford",
    description: "Meet Health-Check Pharmacy & Clinic on Great Horton Road, Bradford — a GPhC-registered community pharmacy offering NHS and private services with qualified, friendly clinicians.",
    path: `${brand.basePath}/about`,
  });

  return (
    <IconContext.Provider value={{ weight: "duotone" }}>
    <div className={`min-h-screen bg-white ${brand.themeClass}`}>
      <JsonLd data={pharmacyGraph(brand, AREA)} />
      <Header brand={brand} />

      {/* Hero — now with a visual */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: "radial-gradient(55% 65% at 15% 20%, rgba(0,93,230,0.14), transparent 70%), radial-gradient(55% 65% at 85% 25%, rgba(0,178,59,0.14), transparent 70%), #F2F7FD" }}
        />
        <div className="relative max-w-7xl mx-auto px-4 pt-14 pb-12 grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-12 items-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md rounded-full pl-1.5 pr-3.5 py-1.5 shadow-sm border border-[#D0E0F2] mb-5">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-brand-secondary text-white"><Check size={12} weight="bold" /></span>
              <span className="text-[0.78rem] text-[#4A5B72]" style={{ fontWeight: 600 }}>About us</span>
            </span>
            <h1 className="font-display text-[#111D30] text-[2.2rem] md:text-[3rem] leading-[1.05] mb-4" style={{ fontWeight: 700, letterSpacing: "-0.02em" }}>
              Trusted local healthcare, <span className="hc-swoosh-text">made simple.</span>
            </h1>
            <p className="text-[#4A5B72] text-[1.1rem] leading-relaxed">
              Health-Check Pharmacy &amp; Clinic is a community pharmacy on Great Horton Road in Bradford. We bring NHS and private services together under one roof, so you can get seen, treated and on your way — without the wait.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-[4/3]">
                <ImageWithFallback src={IMG.hero} alt="A pharmacist welcoming a patient at Health-Check Pharmacy" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-5 -left-3 sm:left-4 bg-white rounded-2xl shadow-lg border border-[#D0E0F2] px-4 py-3 flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-brand-secondary/10 text-brand-secondary flex items-center justify-center"><ShieldCheck size={18} /></span>
                <div className="leading-tight">
                  <p className="text-[#111D30] text-[0.86rem]" style={{ fontWeight: 700 }}>GPhC registered</p>
                  <p className="text-[#4A5B72] text-[0.74rem]">Safe, professional care</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
        <div aria-hidden="true" className="hc-swoosh-bar h-[3px] w-full opacity-80" />
      </section>

      {/* Stats strip */}
      <section className="relative bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-[#E3EDF8] rounded-2xl border border-[#E3EDF8] overflow-hidden -mt-px">
            {STATS.map((s) => (
              <div key={s.label} className="p-6 text-center">
                <p className="font-display text-[2rem] md:text-[2.4rem] text-brand-primary leading-none mb-1.5" style={{ fontWeight: 700, letterSpacing: "-0.02em" }}>{s.value}</p>
                <p className="text-[0.82rem] text-[#4A5B72] leading-snug">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our story — text + image */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <Reveal>
            <span className="text-[0.8rem] text-brand-secondary uppercase tracking-widest" style={{ fontWeight: 700 }}>Our approach</span>
            <h2 className="font-display text-[1.75rem] md:text-[2.2rem] text-[#111D30] mt-2 mb-4" style={{ fontWeight: 700, letterSpacing: "-0.01em" }}>Healthcare that fits around your life</h2>
            <div className="space-y-4 text-[#4A5B72] text-[1.0625rem] leading-[1.65]">
              <p>
                Getting help with your health shouldn't be complicated. Whether you need advice on a common condition, a travel vaccination or a routine health check, our team is here to help — clearly, calmly and close to home.
              </p>
              <p>
                Under NHS Pharmacy First, our pharmacists can assess and treat a range of everyday conditions without a GP appointment. For private services, you'll be seen in a dedicated consultation room by a qualified clinician who takes the time to explain your options.
              </p>
              <p className="text-[0.95rem]">
                If your symptoms are severe, getting worse, or you're worried, please contact your GP or call <a href="tel:111" className="text-brand-primary underline" style={{ fontWeight: 600 }}>NHS 111</a> — and in an emergency, always call <a href="tel:999" className="text-brand-primary underline" style={{ fontWeight: 600 }}>999</a>.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden shadow-md aspect-[3/4] mt-6">
                <ImageWithFallback src={IMG.story} alt="Dispensary at Health-Check Pharmacy" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-md aspect-[3/4]">
                <ImageWithFallback src={IMG.consult} alt="Private clinical consultation" className="w-full h-full object-cover" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* What we offer — added info */}
      <section className="relative py-16" style={{ background: "linear-gradient(135deg, #F2F7FD 0%, #E8F7EE 100%)" }}>
        <div className="max-w-7xl mx-auto px-4">
          <Reveal className="max-w-2xl mb-10">
            <span className="text-[0.8rem] text-brand-secondary uppercase tracking-widest" style={{ fontWeight: 700 }}>What we offer</span>
            <h2 className="font-display text-[1.8rem] md:text-[2.2rem] text-[#111D30] mt-2 mb-3" style={{ fontWeight: 700, letterSpacing: "-0.01em" }}>NHS and private care, side by side</h2>
            <p className="text-[#4A5B72] text-[1rem] leading-relaxed">From everyday NHS services to private clinics you can book in minutes — here's what you'll find at our Bradford pharmacy.</p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.05}>
                <div className="h-full rounded-2xl border border-[#D0E0F2] bg-white shadow-sm p-6 hover:-translate-y-0.5 hover:shadow-md transition-all">
                  <span className="w-11 h-11 rounded-xl bg-brand-secondary/10 text-brand-secondary flex items-center justify-center mb-4"><s.icon size={22} /></span>
                  <h3 className="font-display text-[1.05rem] text-[#111D30] mb-1.5" style={{ fontWeight: 600 }}>{s.title}</h3>
                  <p className="text-[0.88rem] text-[#4A5B72] leading-relaxed">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why HealthCheck */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-4">
          <Reveal className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[0.8rem] text-brand-secondary uppercase tracking-widest" style={{ fontWeight: 700 }}>Why HealthCheck</span>
            <h2 className="font-display text-[1.8rem] md:text-[2.2rem] text-[#111D30] mt-2" style={{ fontWeight: 700, letterSpacing: "-0.01em" }}>What you can count on</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.06}>
                <div className="h-full rounded-2xl border border-[#D0E0F2] bg-white shadow-sm p-6 hover:-translate-y-0.5 hover:shadow-md transition-all">
                  <span className="w-12 h-12 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-4">
                    <v.icon size={24} />
                  </span>
                  <h3 className="font-display text-[1.1rem] text-[#111D30] mb-1.5" style={{ fontWeight: 600 }}>{v.title}</h3>
                  <p className="text-[0.9rem] text-[#4A5B72] leading-relaxed">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Our team — image band with overlay */}
      <section className="relative py-16" style={{ background: "#F2F7FD" }}>
        <div className="max-w-7xl mx-auto px-4">
          <Reveal>
            <div className="relative rounded-3xl overflow-hidden min-h-[20rem] flex items-center">
              <ImageWithFallback src={IMG.team} alt="The Health-Check Pharmacy team" className="absolute inset-0 w-full h-full object-cover" />
              <div aria-hidden="true" className="absolute inset-0" style={{ background: "linear-gradient(100deg, rgba(0,19,57,0.88) 0%, rgba(0,51,121,0.72) 45%, rgba(0,135,45,0.30) 100%)" }} />
              <div className="relative max-w-xl px-7 sm:px-10 py-10 text-white">
                <span className="inline-flex items-center gap-2 text-[0.78rem] uppercase tracking-widest text-white/85" style={{ fontWeight: 700 }}>
                  <Users size={15} /> Friendly faces
                </span>
                <h2 className="font-display text-[1.7rem] md:text-[2.2rem] leading-tight mt-3 mb-3" style={{ fontWeight: 700, letterSpacing: "-0.01em" }}>A team that knows the community</h2>
                <p className="text-white/85 text-[1rem] leading-relaxed mb-5">
                  Our pharmacists and support staff live and work locally. We take the time to listen, explain your options in plain English, and make sure you leave feeling looked after.
                </p>
                <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 text-[0.88rem]">
                  <Star size={15} weight="fill" className="text-amber-300" /> Rated 4.8 by patients across Bradford
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
            <div className="rounded-2xl border border-[#D0E0F2] bg-white shadow-sm p-7 sm:p-9">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-11 h-11 rounded-xl bg-brand-secondary/10 text-brand-secondary flex items-center justify-center"><SealCheck size={22} /></span>
                <h2 className="font-display text-[1.4rem] text-[#111D30]" style={{ fontWeight: 700 }}>Registration &amp; governance</h2>
              </div>
              <p className="text-[#4A5B72] text-[0.98rem] leading-relaxed mb-6">
                Health-Check Pharmacy &amp; Clinic is a registered pharmacy regulated by the General Pharmaceutical Council (GPhC). You can verify our registration on the GPhC register.
              </p>
              <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-4 text-[0.92rem]">
                <div>
                  <dt className="text-[#4A5B72]" style={{ fontWeight: 500 }}>Superintendent Pharmacist</dt>
                  <dd className="text-[#111D30]" style={{ fontWeight: 600 }}>{brand.legal?.superintendent}</dd>
                </div>
                <div>
                  <dt className="text-[#4A5B72]" style={{ fontWeight: 500 }}>GPhC registration number</dt>
                  <dd className="text-[#111D30]" style={{ fontWeight: 600 }}>{brand.legal?.gphcNumber}</dd>
                </div>
                <div>
                  <dt className="text-[#4A5B72]" style={{ fontWeight: 500 }}>Trading name</dt>
                  <dd className="text-[#111D30]" style={{ fontWeight: 600 }}>{brand.legal?.companyName}</dd>
                </div>
                <div>
                  <dt className="text-[#4A5B72]" style={{ fontWeight: 500 }}>Address</dt>
                  <dd className="text-[#111D30]" style={{ fontWeight: 600 }}>{branch.address}</dd>
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
      <section className="relative py-16" style={{ background: "linear-gradient(110deg, #005DE6 0%, #00872D 100%)" }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-white text-[1.9rem] md:text-[2.4rem] leading-tight mb-4" style={{ fontWeight: 700, letterSpacing: "-0.01em" }}>Ready to get started?</h2>
          <p className="text-white/85 text-[1.05rem] max-w-lg mx-auto mb-7">Book an appointment online, or get in touch with the team — we're happy to help.</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => navigate(brand.basePath)}
              className="inline-flex items-center justify-center gap-2 bg-white text-brand-primary px-7 min-h-[48px] rounded-xl hover:-translate-y-0.5 hover:shadow-xl transition-all cursor-pointer"
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
