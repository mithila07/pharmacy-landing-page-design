import { useEffect } from "react";
import { useNavigate } from "react-router";
import { ArrowRight, ShieldCheck, HeartHandshake, Clock, Stethoscope, MapPin, Sparkles } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { HeaderICare } from "../components/HeaderICare";
import { FooterICare } from "../components/FooterICare";
import { Reveal } from "../components/Reveal";
import { Watermark, GRAD_HERO, GRAD_MIST, GRAD_DEEP, GRAD_WHITE, GRAD_INK, LINE } from "../components/icareUi";
import { canadaBrand } from "../branding";
import { pharmacyInfo } from "../data/services";
import { useSeo, JsonLd, pharmacyGraph } from "../seo";
const cover = (id: string) => `https://images.unsplash.com/photo-${id}?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1100`;

const AREA = ["Ealing", "Ealing Broadway", "West Ealing", "Pitshanger", "Hanwell", "Acton", "North Ealing", "Greater London"];

const VALUES = [
  { icon: ShieldCheck, title: "NHS & private, side by side", text: "From NHS Pharmacy First and repeat prescriptions to private clinics — the right care, however you're funded." },
  { icon: HeartHandshake, title: "Genuinely local", text: "An independent community pharmacy on Queens Parade, trusted by families across Ealing and W5." },
  { icon: Clock, title: "Same-day, no fuss", text: "Walk in or book online in minutes. Most consultations are available the very same day." },
  { icon: Stethoscope, title: "Expert pharmacists", text: "GPhC-registered pharmacists who take the time to listen, explain and treat with confidence." },
];

const STATS = [
  { value: "7", label: "Pharmacy First conditions treated" },
  { value: "15,000+", label: "Prescriptions dispensed" },
  { value: `${pharmacyInfo.googleRating}★`, label: "Average patient rating" },
  { value: "W5", label: "Proudly serving Ealing" },
];

export default function AboutPageICare() {
  const brand = canadaBrand;
  const navigate = useNavigate();

  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, []);

  useSeo({
    title: "About iCare Pharmacy | Trusted Community Pharmacy in Ealing, London",
    description:
      "Meet iCare Pharmacy on Queens Parade, Ealing — an independent, GPhC-registered community pharmacy offering NHS Pharmacy First, private clinics and same-day care across W5 and West London.",
    path: `${brand.basePath}/about`,
  });

  return (
    <div className="theme-canada min-h-screen" style={{ background: GRAD_MIST }}>
      <JsonLd data={pharmacyGraph(brand, AREA, {
        addressRegion: "London",
        hoursSpec: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "18:00" }],
      })} />
      <HeaderICare brand={brand} />

      {/* Hero */}
      <section className="relative overflow-hidden py-16 lg:py-24" style={{ background: GRAD_HERO }}>
        <div className="relative z-10 max-w-7xl mx-auto px-5 grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
          <Reveal>
            <p className="inline-flex items-center gap-2 text-[0.78rem] tracking-[0.18em] uppercase text-brand-green-ink mb-4" style={{ fontWeight: 700 }}>
              <Sparkles size={15} /> About iCare Pharmacy
            </p>
            <h1 className="font-display text-brand-primary text-[2.6rem] lg:text-[3.6rem] leading-[1.04] mb-5" style={{ fontWeight: 700 }}>
              Caring for Ealing, one neighbour at a time.
            </h1>
            <p className="text-brand-primary/65 text-[1.08rem] leading-relaxed max-w-xl mb-8">
              iCare Pharmacy is an independent community pharmacy on Queens Parade in Ealing. We blend the convenience of NHS
              services with private clinics — all delivered by friendly, GPhC-registered pharmacists who know our patients by name.
            </p>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => navigate(`${brand.basePath}#nhs`)} className="cta cta-primary group inline-flex items-center gap-2 px-7 py-3.5 rounded-full cursor-pointer" style={{ fontWeight: 700 }}>
                Explore our services <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={() => navigate(brand.contactPath!)} className="cta cta-outline inline-flex items-center gap-2 px-7 py-3.5 rounded-full cursor-pointer" style={{ fontWeight: 600 }}>
                Get in touch
              </button>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="relative">
              <div className="rounded-[2rem] overflow-hidden shadow-2xl shadow-brand-primary/15 border-4 border-white aspect-[5/4]">
                <ImageWithFallback src={cover("1587854692152-cbe660dbde88")} alt="iCare Pharmacy team supporting a patient in Ealing" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-5 -left-3 sm:left-6 bg-white rounded-2xl shadow-xl border px-4 py-3 flex items-center gap-3" style={{ borderColor: LINE }}>
                <span className="w-10 h-10 rounded-xl bg-brand-secondary/12 text-brand-green-ink flex items-center justify-center"><MapPin size={18} /></span>
                <div className="leading-tight">
                  <p className="text-brand-primary text-[0.86rem]" style={{ fontWeight: 700 }}>15 Queens Parade</p>
                  <p className="text-brand-primary/55 text-[0.76rem]">Ealing, London · W5 3HU</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section className="py-14 lg:py-20 border-y" style={{ background: GRAD_WHITE, borderColor: LINE }}>
        <div className="max-w-4xl mx-auto px-5 text-center">
          <Reveal>
            <p className="text-[0.76rem] tracking-[0.2em] uppercase text-brand-green-ink mb-2" style={{ fontWeight: 600 }}>Our story</p>
            <h2 className="font-display text-[2rem] md:text-[2.6rem] text-brand-primary leading-[1.08] mb-5" style={{ fontWeight: 700 }}>Healthcare that feels personal again</h2>
            <p className="text-brand-primary/65 text-[1.05rem] leading-relaxed">
              We opened iCare Pharmacy with a simple belief: getting help with your health shouldn't mean long waits or
              impersonal service. Whether you're collecting a repeat prescription, starting a new medicine, or booking a
              private clinic, our pharmacists are here to make it easy — with honest advice and real, same-day care for
              the people of Ealing, Hanwell, Acton and the wider W5 community.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="py-14 lg:py-20" style={{ background: GRAD_MIST }}>
        <div className="max-w-7xl mx-auto px-5">
          <Reveal className="max-w-2xl mb-10">
            <p className="text-[0.76rem] tracking-[0.2em] uppercase text-brand-green-ink mb-2" style={{ fontWeight: 600 }}>What we stand for</p>
            <h2 className="font-display text-[2rem] md:text-[2.6rem] text-brand-primary leading-[1.08]" style={{ fontWeight: 700 }}>The iCare difference</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.06}>
                <div className="h-full bg-white border rounded-3xl p-6 hover:shadow-lg hover:shadow-brand-primary/5 transition-shadow" style={{ borderColor: LINE }}>
                  <span className="w-12 h-12 rounded-2xl bg-brand-secondary/12 text-brand-green-ink flex items-center justify-center mb-4"><v.icon size={22} /></span>
                  <h3 className="font-display text-[1.2rem] text-brand-primary mb-2" style={{ fontWeight: 600 }}>{v.title}</h3>
                  <p className="text-[0.92rem] text-brand-primary/60 leading-relaxed">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative overflow-hidden text-white py-16" style={{ background: GRAD_INK }}>
        <Watermark light className="-left-10 -bottom-14 w-72 opacity-[0.06]" />
        <div className="relative z-10 max-w-7xl mx-auto px-5 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map((s) => (
            <Reveal key={s.label}>
              <p className="font-display text-[2.6rem] text-brand-secondary leading-none" style={{ fontWeight: 700 }}>{s.value}</p>
              <p className="text-white/55 text-[0.88rem] mt-2">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20" style={{ background: GRAD_DEEP }}>
        <div className="max-w-4xl mx-auto px-5 text-center">
          <Reveal>
            <h2 className="font-display text-[2rem] md:text-[2.8rem] text-brand-primary leading-[1.06] mb-4" style={{ fontWeight: 700 }}>Pop in and say hello</h2>
            <p className="text-brand-primary/60 text-[1.05rem] max-w-lg mx-auto mb-8">
              Find us on Queens Parade, Ealing — Monday to Friday, 9am to 6pm. No appointment needed for a quick chat with your pharmacist.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button onClick={() => navigate(brand.contactPath!)} className="cta cta-primary group inline-flex items-center gap-2 px-7 py-3.5 rounded-full cursor-pointer" style={{ fontWeight: 700 }}>
                Visit &amp; contact us <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={() => navigate(`${brand.basePath}#nhs`)} className="cta cta-outline inline-flex items-center gap-2 px-7 py-3.5 rounded-full cursor-pointer" style={{ fontWeight: 600 }}>
                Browse services
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      <FooterICare brand={brand} />
    </div>
  );
}
