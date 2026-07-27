import { useEffect } from "react";
import { useNavigate } from "react-router";
import {
  ShieldCheck, MapPin, Clock, Calendar, ArrowRight, ArrowUpRight, Quote,
  Plane, Syringe, Ear, Sparkles, HeartHandshake, Stethoscope, DoorOpen,
} from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Reveal } from "../components/Reveal";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { centralBrand } from "../branding";
import { useSeo, JsonLd, pharmacyGraph } from "../seo";
import storyImg from "../../assets/about-1.jpeg";
import consultImg from "../../assets/about-2.jpeg";

const AREA = ["New Quay", "Ceredigion", "Cardigan Bay", "Wales"];

const FACTS = [
  { icon: Calendar, label: "Serving New Quay", value: "Over 35 years" },
  { icon: MapPin, label: "Find us", value: "Arfryn, Church Street, SA45 9NX" },
  { icon: Clock, label: "Open", value: "Mon–Fri, 9:00–17:30" },
  { icon: ShieldCheck, label: "GPhC premises reg.", value: "1043313" },
];

const SERVICES = [
  { id: "prv-travel-consult", icon: Plane, name: "Travel vaccinations", blurb: "A full travel clinic with tailored pre-travel advice." },
  { id: "prv-yellowfever", icon: Syringe, name: "Yellow fever", blurb: "A designated centre — certificate issued the same day." },
  { id: "prv-vitamin-injection", icon: Sparkles, name: "Vitamin B12 injections", blurb: "Quick energy-boosting B12 injections by appointment." },
  { id: "prv-shingles-prv", icon: ShieldCheck, name: "Speciality vaccines", blurb: "Shingles, chickenpox and HPV, for those not eligible on the NHS." },
  { id: "prv-ear-wax", icon: Ear, name: "Ear microsuction", blurb: "Gentle wax removal — usually one short appointment." },
  { id: "prv-meningitis", icon: HeartHandshake, name: "Hajj & Umrah", blurb: "Meningitis ACWY and the vaccinations pilgrims need." },
];

export function AboutPageCentralAlt() {
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

  const book = (id: string) => navigate(`${brand.basePath}/book/${id}`);

  return (
    <div className={`min-h-screen bg-white ${brand.themeClass}`}>
      <JsonLd data={pharmacyGraph(brand, AREA, { addressRegion: "Ceredigion" })} />
      <Header brand={brand} />

      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-10 lg:py-16 grid lg:grid-cols-[21rem_1fr] gap-10 lg:gap-16">
        {/* ── Left — sticky identity rail ── */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-[0.72rem] tracking-[0.16em] uppercase text-brand-secondary mb-4" style={{ fontWeight: 700 }}>
              <span className="w-6 h-px bg-brand-secondary" /> About us
            </span>
            <h1 className="font-display text-[#0A3238] text-[2.1rem] lg:text-[2.5rem] leading-[1.08] mb-5" style={{ fontWeight: 700, letterSpacing: "-0.02em" }}>
              Convenient access to <span className="cp-swoosh-text">quality healthcare.</span>
            </h1>
            <p className="text-[#4A6A6F] text-[1.02rem] leading-relaxed mb-7">
              An independent, family-owned pharmacy on Church Street in New Quay, providing a full range of private and NHS services to Ceredigion and Cardigan Bay.
            </p>

            {/* Quick facts */}
            <dl className="space-y-3.5 mb-8">
              {FACTS.map((f) => (
                <div key={f.label} className="flex items-start gap-3">
                  <span className="w-9 h-9 rounded-lg bg-brand-light text-brand-primary flex items-center justify-center shrink-0 mt-0.5"><f.icon size={16} /></span>
                  <div>
                    <dt className="text-[0.74rem] uppercase tracking-wide text-[#7A9498]" style={{ fontWeight: 600 }}>{f.label}</dt>
                    <dd className="text-[0.92rem] text-[#0A3238]" style={{ fontWeight: 600 }}>{f.value}</dd>
                  </div>
                </div>
              ))}
            </dl>

            <div className="flex flex-wrap gap-2.5">
              <button onClick={() => navigate(brand.basePath)} className="cp-btn-gradient inline-flex items-center gap-2 text-white px-5 min-h-[46px] rounded-xl cursor-pointer" style={{ fontWeight: 600 }}>
                <Calendar size={16} /> Book appointment
              </button>
              <button onClick={() => navigate(brand.contactPath!)} className="inline-flex items-center gap-2 border border-[#CDEBEF] text-brand-primary px-5 min-h-[46px] rounded-xl hover:bg-brand-light transition-colors cursor-pointer" style={{ fontWeight: 600 }}>
                Contact <ArrowRight size={15} />
              </button>
            </div>
          </Reveal>
        </aside>

        {/* ── Right — scrolling content ── */}
        <div className="min-w-0">
          {/* Lead image */}
          <Reveal>
            <div className="rounded-3xl overflow-hidden shadow-lg aspect-[16/10] mb-12">
              <ImageWithFallback src={storyImg} alt="Inside Central Pharmacy, New Quay" className="w-full h-full object-cover" />
            </div>
          </Reveal>

          {/* Our approach + pull quote */}
          <Reveal>
            <section className="mb-14">
              <h2 className="font-display text-[1.7rem] lg:text-[2rem] text-[#0A3238] mb-4" style={{ fontWeight: 700, letterSpacing: "-0.01em" }}>Our approach</h2>
              <div className="grid md:grid-cols-2 gap-6 text-[#4A6A6F] text-[1.02rem] leading-[1.7]">
                <p>
                  We're well equipped to provide health care services, with a specially designed consultation room and highly trained staff. From everyday prescriptions to a busy travel clinic, we bring NHS and private care together under one roof.
                </p>
                <p>
                  For more than 35 years we've been a fixture on Church Street — a family business that has grown up alongside the community it serves. Faces change, but the way we look after people hasn't.
                </p>
              </div>

              <figure className="mt-8 relative rounded-2xl border border-[#CDEBEF] bg-brand-light px-7 py-8 sm:px-10">
                <Quote size={30} className="text-brand-accent/50 mb-3" />
                <blockquote className="font-display text-[1.25rem] lg:text-[1.5rem] leading-snug text-[#0A3238]" style={{ fontWeight: 600, letterSpacing: "-0.01em" }}>
                  We believe in supporting our customers and empowering them to make decisions about their health and wellbeing — by providing expert advice and information.
                </blockquote>
              </figure>
            </section>
          </Reveal>

          {/* Consultation room highlight */}
          <Reveal>
            <section className="mb-14 grid sm:grid-cols-[1.1fr_0.9fr] gap-6 items-center rounded-3xl overflow-hidden border border-[#CDEBEF] bg-white shadow-sm">
              <div className="p-7 sm:p-9 order-2 sm:order-1">
                <span className="inline-flex items-center gap-2 w-11 h-11 rounded-xl bg-brand-secondary/10 text-brand-secondary justify-center mb-4"><DoorOpen size={22} /></span>
                <h3 className="font-display text-[1.3rem] text-[#0A3238] mb-2" style={{ fontWeight: 700 }}>A private consultation room</h3>
                <p className="text-[#4A6A6F] text-[0.98rem] leading-relaxed">
                  A specially designed, private space for sensitive conversations, travel consultations and one-to-one clinical care — so you're always seen with discretion.
                </p>
              </div>
              <div className="aspect-[4/3] sm:h-full order-1 sm:order-2">
                <ImageWithFallback src={consultImg} alt="The private consultation room" className="w-full h-full object-cover" />
              </div>
            </section>
          </Reveal>

          {/* Services — echoes the site's card grid with More Details / Book Online */}
          <Reveal>
            <section className="mb-14">
              <div className="flex items-end justify-between gap-3 mb-6">
                <h2 className="font-display text-[1.7rem] lg:text-[2rem] text-[#0A3238]" style={{ fontWeight: 700, letterSpacing: "-0.01em" }}>What we do</h2>
                <Stethoscope size={22} className="text-brand-accent mb-1.5 hidden sm:block" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {SERVICES.map((s) => (
                  <div key={s.id} className="group rounded-2xl border border-[#CDEBEF] bg-white p-5 hover:shadow-md hover:border-brand-primary/30 transition-all">
                    <div className="flex items-start gap-3.5">
                      <span className="w-11 h-11 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0"><s.icon size={20} /></span>
                      <div className="min-w-0">
                        <h3 className="text-[1.02rem] text-[#0A3238] mb-1" style={{ fontWeight: 700 }}>{s.name}</h3>
                        <p className="text-[0.86rem] text-[#4A6A6F] leading-relaxed mb-3">{s.blurb}</p>
                        <div className="flex flex-wrap items-center gap-2">
                          <button onClick={() => book(s.id)} className="cp-btn-gradient inline-flex items-center gap-1.5 text-white text-[0.8rem] px-3.5 min-h-[38px] rounded-lg cursor-pointer" style={{ fontWeight: 600 }}>
                            Book online <ArrowUpRight size={13} />
                          </button>
                          <button onClick={() => navigate(`${brand.basePath}#private-services`)} className="inline-flex items-center gap-1 text-brand-primary text-[0.8rem] px-2 min-h-[38px] hover:gap-2 transition-all cursor-pointer" style={{ fontWeight: 600 }}>
                            More details <ArrowRight size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </Reveal>

          {/* Registration strip */}
          <Reveal>
            <section className="rounded-2xl border border-[#CDEBEF] bg-[#ECFAFB] p-6 sm:p-7">
              <h2 className="font-display text-[1.2rem] text-[#0A3238] mb-4" style={{ fontWeight: 700 }}>Registration &amp; governance</h2>
              <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-3.5 text-[0.9rem]">
                <div><dt className="text-[#7A9498]" style={{ fontWeight: 500 }}>Superintendent Pharmacist</dt><dd className="text-[#0A3238]" style={{ fontWeight: 600 }}>{brand.legal?.superintendent}</dd></div>
                <div><dt className="text-[#7A9498]" style={{ fontWeight: 500 }}>GPhC premises registration</dt><dd className="text-[#0A3238]" style={{ fontWeight: 600 }}>{brand.legal?.gphcNumber}</dd></div>
                <div><dt className="text-[#7A9498]" style={{ fontWeight: 500 }}>Company registration</dt><dd className="text-[#0A3238]" style={{ fontWeight: 600 }}>{brand.legal?.companyNumber}</dd></div>
                <div><dt className="text-[#7A9498]" style={{ fontWeight: 500 }}>Address</dt><dd className="text-[#0A3238]" style={{ fontWeight: 600 }}>{branch.address}</dd></div>
              </dl>
            </section>
          </Reveal>
        </div>
      </div>

      <Footer brand={brand} />
    </div>
  );
}
