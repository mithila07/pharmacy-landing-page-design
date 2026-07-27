import { useState } from "react";
import { useNavigate } from "react-router";
import { Check, ShieldCheck, MapPin, Clock, Stethoscope, AirplaneTilt, Ear, Syringe, FirstAid, ArrowRight, IconContext } from "@phosphor-icons/react";
import { centralBrand } from "../branding";
import { useOpenStatus } from "../openStatus";
import heroDefault from "../../assets/hero-bg.jpeg";
import travelImg from "../../assets/travel.jpeg";
import earWaxImg from "../../assets/ear-wax.jpeg";
import weightImg from "../../assets/weight-loss.jpeg";
import throatImg from "../../assets/sorethroat.jpg";

/**
 * Central Pharmacy — "Coastal Teal" hero.
 *
 * Built on the same crisp-clinical pattern as the HealthCheck hero (type-led
 * headline with a gradient swoosh accent, a right-hand card of the pharmacy's
 * most-booked services that cross-fades a photo into the background on hover),
 * re-skinned to Central's single-hue teal identity. Opacity-only transitions,
 * so the layout never shifts.
 */
const IMG = {
  default: heroDefault,
  travel: travelImg,
  earwax: earWaxImg,
  weight: weightImg,
  throat: throatImg,
};

const POPULAR = [
  { id: "prv-travel-consult", name: "Travel clinic", price: "From £25", Icon: AirplaneTilt, img: IMG.travel },
  { id: "prv-ear-wax", name: "Ear microsuction", price: "From £40", Icon: Ear, img: IMG.earwax },
  { id: "prv-yellowfever", name: "Yellow fever", price: "From £65", Icon: Syringe, img: IMG.weight },
  { id: "prv-ed", name: "ED treatment", price: "From £20", Icon: FirstAid, img: IMG.throat },
];

export function HeroSectionCentral() {
  const brand = centralBrand;
  const branch = brand.locations[0];
  const navigate = useNavigate();
  const status = useOpenStatus(branch);
  const [hovered, setHovered] = useState<string | null>(null);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const book = (id: string) => navigate(`${brand.basePath}/book/${id}`);

  return (
    <IconContext.Provider value={{ weight: "duotone" }}>
    <section className="relative overflow-hidden">
      {/* Calm teal mesh wash — the signature gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 65% at 12% 18%, rgba(22,166,183,0.09), transparent 70%), radial-gradient(55% 65% at 88% 24%, rgba(22,166,183,0.06), transparent 70%), #F5FAFB",
        }}
      />

      {/* Legibility wash — keeps the headline crisp, fades to clear on the right. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: "linear-gradient(90deg, rgba(236,250,251,0.82) 0%, rgba(236,250,251,0.40) 48%, rgba(236,250,251,0) 100%)" }}
      />

      {/* Background image — a reduced, centred soft-edged medallion. Only opacity
          animates on hover so the layout never moves. */}
      <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div
          className="relative w-[min(680px,56%)] aspect-[3/2]"
          style={{
            WebkitMaskImage: "radial-gradient(54% 54% at 50% 50%, #000 0%, rgba(0,0,0,0.5) 42%, transparent 82%)",
            maskImage: "radial-gradient(54% 54% at 50% 50%, #000 0%, rgba(0,0,0,0.5) 42%, transparent 82%)",
          }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-out"
            style={{ backgroundImage: `url(${IMG.default})`, opacity: hovered ? 0 : 0.16 }}
          />
          {POPULAR.map((s) => (
            <div
              key={s.id}
              className="absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-out"
              style={{ backgroundImage: `url(${s.img})`, opacity: hovered === s.id ? 0.32 : 0 }}
            />
          ))}
        </div>
      </div>

      {/* Decorative swoosh shape, top-right */}
      <div
        aria-hidden="true"
        className="cp-swoosh-bar absolute -top-24 -right-24 w-[36rem] h-[36rem] rounded-full opacity-[0.10] blur-2xl"
      />

      <div className="relative max-w-7xl mx-auto px-4 pt-16 pb-14 lg:pt-20 lg:pb-20 grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-10 items-center">
        {/* Left — type-led */}
        <div>
          <p className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md rounded-full pl-1.5 pr-3.5 py-1.5 shadow-sm border border-[#CDEBEF] mb-6">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-brand-secondary text-white"><Check size={12} weight="bold" /></span>
            <span className="text-[0.8rem] text-[#4A6A6F]" style={{ fontWeight: 600 }}>Independent &amp; family-owned — New Quay</span>
          </p>

          <h1 className="font-display text-[#0A3238] text-[2.5rem] sm:text-[3rem] lg:text-[3.6rem] leading-[1.05] mb-5" style={{ fontWeight: 700, letterSpacing: "-0.02em" }}>
            Trusted local care,{" "}
            <span className="cp-swoosh-text">for over 35 years.</span>
          </h1>

          <p className="text-[#4A6A6F] text-[1.1rem] leading-relaxed max-w-xl mb-8">
            NHS and private services from a pharmacy that has looked after New Quay for generations — travel clinics, vaccinations and more, all booked in minutes.
          </p>

          {/* Single clear action */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => scrollTo("private-services")}
              className="cp-btn-gradient inline-flex items-center justify-center gap-2 px-7 rounded-xl text-[1rem] min-h-[48px] cursor-pointer"
              style={{ fontWeight: 600 }}
            >
              <Stethoscope size={18} /> Explore our services
            </button>
          </div>

          {/* Trust row */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 mt-8 text-[0.85rem]">
            <span className="inline-flex items-center gap-2" style={{ fontWeight: 600 }}>
              <span className={`w-2.5 h-2.5 rounded-full ${status.open ? "bg-brand-secondary" : "bg-[#B5780A]"}`} />
              <span className="text-[#0A3238]" style={{ fontVariantNumeric: "tabular-nums" }}>
                {status.label}{status.detail ? ` · ${status.detail}` : ""}
              </span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-[#4A6A6F]">
              <ShieldCheck size={15} className="text-brand-primary" /> GPhC-registered pharmacy
            </span>
            <span className="inline-flex items-center gap-1.5 text-[#4A6A6F]">
              <MapPin size={15} className="text-brand-accent" /> Church Street, New Quay
            </span>
          </div>
        </div>

        {/* Right — popular services card */}
        <div className="relative">
          <div className="rounded-2xl bg-white border border-[#CDEBEF] shadow-[0_1px_2px_rgba(10,50,56,0.04),0_8px_24px_rgba(10,50,56,0.07)] overflow-hidden">
            <div className="cp-swoosh-bar h-1.5 w-full" />
            <div className="p-5 sm:p-6">
              <div className="flex items-center justify-between gap-2 mb-4">
                <p className="text-[0.92rem] text-[#0A3238]" style={{ fontWeight: 700 }}>Popular services</p>
                <span className="inline-flex items-center gap-1 text-[0.72rem] text-[#4A6A6F]"><Clock size={13} className="text-brand-primary" /> Book in minutes</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {POPULAR.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => book(s.id)}
                    onMouseEnter={() => setHovered(s.id)}
                    onMouseLeave={() => setHovered(null)}
                    onFocus={() => setHovered(s.id)}
                    onBlur={() => setHovered(null)}
                    aria-label={`Book ${s.name}`}
                    className="group text-left rounded-xl border border-[#CDEBEF] bg-white p-4 min-h-[92px] flex flex-col hover:-translate-y-0.5 hover:shadow-md hover:border-brand-primary/40 transition-all cursor-pointer no-underline"
                  >
                    <span className="w-10 h-10 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-3 group-hover:bg-brand-secondary group-hover:text-white transition-colors">
                      <s.Icon size={20} />
                    </span>
                    <span className="block text-[0.9rem] text-[#0A3238] leading-tight" style={{ fontWeight: 600 }}>{s.name}</span>
                    <span className="block text-[0.76rem] text-brand-secondary mt-0.5" style={{ fontWeight: 600 }}>{s.price}</span>
                  </button>
                ))}
              </div>
              <button
                onClick={() => scrollTo("nhs-services")}
                className="mt-4 w-full inline-flex items-center justify-center gap-1.5 text-[0.85rem] text-brand-primary hover:gap-2.5 transition-all cursor-pointer"
                style={{ fontWeight: 600 }}
              >
                View all services <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Swoosh divider into the next section */}
      <div aria-hidden="true" className="cp-swoosh-bar h-[3px] w-full opacity-80" />
    </section>
    </IconContext.Provider>
  );
}
