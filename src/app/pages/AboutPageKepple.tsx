import { useEffect } from "react";
import { useNavigate } from "react-router";
import {
  ShieldCheck, Award, HeartPulse, Building2, Check, Calendar, ArrowRight,
  BadgeCheck, ExternalLink, Pill, Syringe, Ear, Scale, Truck, Users, Clock,
} from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Reveal } from "../components/Reveal";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { kepplelaneBrand } from "../branding";
import { useSeo, JsonLd, pharmacyGraph } from "../seo";
import aboutHero from "../../assets/about-hero.jpeg";
import about1 from "../../assets/about-1.jpeg";
import about2 from "../../assets/about-2.jpeg";
import aboutBg from "../../assets/about-bg.jpeg";

const AREA = ["Garstang", "Preston", "Lancashire"];

const IMG = {
  hero: aboutHero,
  story: about1,
  consult: about2,
  team: aboutBg,
};

const STATS = [
  { value: "72", label: "Hours open every week" },
  { value: "2", label: "Full-time pharmacists" },
  { value: "20+", label: "Members of staff" },
  { value: "PR3", label: "Kepple Lane, Garstang" },
];

const VALUES = [
  { icon: Award, title: "Healthy Living Pharmacy", text: "We're an accredited Healthy Living Pharmacy, with staff specifically trained to give guidance on health, nutrition and wellbeing." },
  { icon: ShieldCheck, title: "A registered pharmacy", text: "We're registered with the General Pharmaceutical Council (GPhC) and follow its standards for safe, professional care." },
  { icon: Users, title: "A team of over 20", text: "Two full-time pharmacists alongside accuracy checking technicians, dispensing technicians and healthcare assistants." },
  { icon: Clock, title: "Open seven days", text: "72 hours a week — early mornings, late evenings and weekends, so you can get seen when it suits you." },
];

const SERVICES = [
  { icon: HeartPulse, title: "NHS Pharmacy First", text: "Assessment and treatment for 7 common conditions — no GP appointment needed." },
  { icon: Pill, title: "Dispensing & medicines advice", text: "NHS dispensing with clear, friendly guidance on how to take your medication safely." },
  { icon: Syringe, title: "Travel health & vaccinations", text: "Travel consultations, private travel vaccines, antimalarial tablets and yellow fever." },
  { icon: Scale, title: "Weight management", text: "A private weight-management service, including weight-loss injections where suitable." },
  { icon: Ear, title: "Ear microsuction", text: "Comfortable microsuction ear wax removal by a trained clinician, by appointment." },
  { icon: Truck, title: "Free home delivery", text: "Deliveries for housebound patients, plus regular rounds to local nursing and rest homes." },
];

export default function AboutPageKepple() {
  const brand = kepplelaneBrand;
  const navigate = useNavigate();
  const branch = brand.locations[0];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  useSeo({
    title: "About Kepple Lane Pharmacy | Garstang, Lancashire",
    description: "Meet Kepple Lane Pharmacy in Garstang — an accredited Healthy Living Pharmacy open 72 hours a week, with two full-time pharmacists and a team of over 20.",
    path: `${brand.basePath}/about`,
  });

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
              <span className="text-[0.78rem] text-[#5A5578]" style={{ fontWeight: 600 }}>About us</span>
            </span>
            <h1 className="text-[#1E1A3C] text-[2.2rem] md:text-[3rem] leading-[1.05] mb-4" style={{ fontWeight: 700, letterSpacing: "-0.02em" }}>
              Your village pharmacy, <span className="kl-grad-text">open when you need it.</span>
            </h1>
            <p className="text-[#5A5578] text-[1.1rem] leading-relaxed">
              Kepple Lane Pharmacy sits at the heart of Garstang. We open 72 hours a week — seven days, early to late — so getting your prescription or seeing a pharmacist never has to wait for a weekday morning.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-[4/3]">
                <ImageWithFallback src={IMG.hero} alt="A pharmacist welcoming a patient at Kepple Lane Pharmacy" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-5 -left-3 sm:left-4 bg-white rounded-2xl shadow-lg border border-[#DED9F7] px-4 py-3 flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-brand-secondary/10 text-brand-secondary flex items-center justify-center"><Award size={18} /></span>
                <div className="leading-tight">
                  <p className="text-[#1E1A3C] text-[0.86rem]" style={{ fontWeight: 700 }}>Healthy Living Pharmacy</p>
                  <p className="text-[#5A5578] text-[0.74rem]">Accredited team</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
        <div aria-hidden="true" className="kl-grad-bar h-[3px] w-full opacity-80" />
      </section>

      {/* Stats strip */}
      <section className="relative bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-[#EAE7FB] rounded-2xl border border-[#EAE7FB] overflow-hidden -mt-px">
            {STATS.map((s) => (
              <div key={s.label} className="p-6 text-center">
                <p className="text-[2rem] md:text-[2.4rem] text-brand-primary leading-none mb-1.5" style={{ fontWeight: 700, letterSpacing: "-0.02em" }}>{s.value}</p>
                <p className="text-[0.82rem] text-[#5A5578] leading-snug">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our approach */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <Reveal>
            <span className="text-[0.8rem] text-brand-secondary uppercase tracking-widest" style={{ fontWeight: 700 }}>Our approach</span>
            <h2 className="text-[1.75rem] md:text-[2.2rem] text-[#1E1A3C] mt-2 mb-4" style={{ fontWeight: 700, letterSpacing: "-0.01em" }}>More than a dispensary</h2>
            <div className="space-y-4 text-[#5A5578] text-[1.0625rem] leading-[1.65]">
              <p>
                Behind the counter you'll find two full-time pharmacists and a team of over twenty — accuracy checking technicians, dispensing technicians and healthcare assistants — all working to get your medication right, first time.
              </p>
              <p>
                As an accredited Healthy Living Pharmacy, several of our team are specifically trained to give guidance on health and nutrition. Under NHS Pharmacy First our pharmacists can also assess and treat a range of everyday conditions without a GP appointment, and our private clinics cover travel health, weight management and ear microsuction.
              </p>
              <p>
                If you're housebound we'll deliver your prescription to your door, and we run regular deliveries to nursing and rest homes across the area.
              </p>
              <p className="text-[0.95rem]">
                If your symptoms are severe, getting worse, or you're worried, please contact your GP or call <a href="tel:111" className="text-brand-primary underline" style={{ fontWeight: 600 }}>NHS 111</a> — and in an emergency, always call <a href="tel:999" className="text-brand-primary underline" style={{ fontWeight: 600 }}>999</a>.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden shadow-md aspect-[3/4] mt-6">
                <ImageWithFallback src={IMG.story} alt="The dispensary at Kepple Lane Pharmacy" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-md aspect-[3/4]">
                <ImageWithFallback src={IMG.consult} alt="A private clinical consultation" className="w-full h-full object-cover" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* What we offer */}
      <section className="relative py-16" style={{ background: "linear-gradient(135deg, #F2F0FD 0%, #F7F5FF 100%)" }}>
        <div className="max-w-7xl mx-auto px-4">
          <Reveal className="max-w-2xl mb-10">
            <span className="text-[0.8rem] text-brand-secondary uppercase tracking-widest" style={{ fontWeight: 700 }}>What we offer</span>
            <h2 className="text-[1.8rem] md:text-[2.2rem] text-[#1E1A3C] mt-2 mb-3" style={{ fontWeight: 700, letterSpacing: "-0.01em" }}>NHS and private care, side by side</h2>
            <p className="text-[#5A5578] text-[1rem] leading-relaxed">From everyday NHS services to private clinics you can book in minutes — here's what you'll find on Kepple Lane.</p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.05}>
                <div className="h-full rounded-2xl border border-[#DED9F7] bg-white shadow-sm p-6 hover:-translate-y-0.5 hover:shadow-md transition-all">
                  <span className="w-11 h-11 rounded-xl bg-brand-secondary/10 text-brand-secondary flex items-center justify-center mb-4"><s.icon size={22} /></span>
                  <h3 className="text-[1.05rem] text-[#1E1A3C] mb-1.5" style={{ fontWeight: 600 }}>{s.title}</h3>
                  <p className="text-[0.88rem] text-[#5A5578] leading-relaxed">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Kepple Lane */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-4">
          <Reveal className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[0.8rem] text-brand-secondary uppercase tracking-widest" style={{ fontWeight: 700 }}>Why Kepple Lane</span>
            <h2 className="text-[1.8rem] md:text-[2.2rem] text-[#1E1A3C] mt-2" style={{ fontWeight: 700, letterSpacing: "-0.01em" }}>What you can count on</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.06}>
                <div className="h-full rounded-2xl border border-[#DED9F7] bg-white shadow-sm p-6 hover:-translate-y-0.5 hover:shadow-md transition-all">
                  <span className="w-12 h-12 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-4">
                    <v.icon size={24} />
                  </span>
                  <h3 className="text-[1.1rem] text-[#1E1A3C] mb-1.5" style={{ fontWeight: 600 }}>{v.title}</h3>
                  <p className="text-[0.9rem] text-[#5A5578] leading-relaxed">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery band */}
      <section className="relative py-16" style={{ background: "#F2F0FD" }}>
        <div className="max-w-7xl mx-auto px-4">
          <Reveal>
            <div className="relative rounded-3xl overflow-hidden min-h-[20rem] flex items-center">
              <ImageWithFallback src={IMG.team} alt="The Kepple Lane Pharmacy team" className="absolute inset-0 w-full h-full object-cover" />
              <div aria-hidden="true" className="absolute inset-0" style={{ background: "linear-gradient(100deg, rgba(23,18,67,0.90) 0%, rgba(44,37,120,0.74) 45%, rgba(142,130,238,0.32) 100%)" }} />
              <div className="relative max-w-xl px-7 sm:px-10 py-10 text-white">
                <span className="inline-flex items-center gap-2 text-[0.78rem] uppercase tracking-widest text-white/85" style={{ fontWeight: 700 }}>
                  <Truck size={15} /> Free delivery
                </span>
                <h2 className="text-[1.7rem] md:text-[2.2rem] leading-tight mt-3 mb-3" style={{ fontWeight: 700, letterSpacing: "-0.01em" }}>We'll bring your prescription to you</h2>
                <p className="text-white/85 text-[1rem] leading-relaxed mb-5">
                  If you're housebound, we deliver your medication straight to your door — and we run regular rounds to nursing and rest homes across Garstang and the surrounding villages. Just ask the team to set it up.
                </p>
                <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 text-[0.88rem]">
                  <Building2 size={15} /> Serving Garstang, Preston &amp; rural Lancashire
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
            <div className="rounded-2xl border border-[#DED9F7] bg-white shadow-sm p-7 sm:p-9">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-11 h-11 rounded-xl bg-brand-secondary/10 text-brand-secondary flex items-center justify-center"><BadgeCheck size={22} /></span>
                <h2 className="text-[1.4rem] text-[#1E1A3C]" style={{ fontWeight: 700 }}>Registration &amp; governance</h2>
              </div>
              <p className="text-[#5A5578] text-[0.98rem] leading-relaxed mb-6">
                Kepple Lane Pharmacy is a registered pharmacy regulated by the General Pharmaceutical Council (GPhC). You can verify our registration on the GPhC register.
              </p>
              <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-4 text-[0.92rem]">
                <div>
                  <dt className="text-[#5A5578]" style={{ fontWeight: 500 }}>Superintendent Pharmacist</dt>
                  <dd className="text-[#1E1A3C]" style={{ fontWeight: 600 }}>{brand.legal?.superintendent}</dd>
                </div>
                <div>
                  <dt className="text-[#5A5578]" style={{ fontWeight: 500 }}>GPhC registration number</dt>
                  <dd className="text-[#1E1A3C]" style={{ fontWeight: 600 }}>{brand.legal?.gphcNumber}</dd>
                </div>
                <div>
                  <dt className="text-[#5A5578]" style={{ fontWeight: 500 }}>Trading name</dt>
                  <dd className="text-[#1E1A3C]" style={{ fontWeight: 600 }}>{brand.legal?.companyName}</dd>
                </div>
                <div>
                  <dt className="text-[#5A5578]" style={{ fontWeight: 500 }}>Address</dt>
                  <dd className="text-[#1E1A3C]" style={{ fontWeight: 600 }}>{branch.address}</dd>
                </div>
              </dl>
              <a
                href="https://www.pharmacyregulation.org/registers"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-1.5 text-brand-primary hover:gap-2.5 transition-all text-[0.9rem]"
                style={{ fontWeight: 600 }}
              >
                Check the GPhC register <ExternalLink size={14} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16" style={{ background: "linear-gradient(110deg, #4A3FB8 0%, #8E82EE 100%)" }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-white text-[1.9rem] md:text-[2.4rem] leading-tight mb-4" style={{ fontWeight: 700, letterSpacing: "-0.01em" }}>Ready to get started?</h2>
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
  );
}
