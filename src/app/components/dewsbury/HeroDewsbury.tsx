import { Link } from "react-router";
import { ClipboardCheck, HealthShield, NavArrowRight, PharmacyCrossCircle } from "iconoir-react";
import { dewsburyBrand } from "../../branding";
import { templateSites } from "../../data/templateSites";
import { DMP_NOMINATE_PATH, openDewsburyBook } from "../../data/dewsbury";
import { useOpenStatus } from "../../openStatus";
// The real shopfront, widened (extra sky, street and trees) so the whole building
// shows on most screens; the building itself is the original photo, untouched.
import shopfront from "../../../assets/dewsbury/dmp-front-wide.jpg";

/** The three things most patients come in for, right under the main action. */
const OPTIONS = [
  { title: "Pharmacy First", line: "Free NHS help for 7 common conditions", icon: PharmacyCrossCircle, action: () => openDewsburyBook("I'm feeling unwell") },
  { title: "Repeat prescriptions", line: "Choose us as your pharmacy", icon: ClipboardCheck, to: DMP_NOMINATE_PATH },
  { title: "Vaccinations", line: "Flu jabs, travel and private vaccines", icon: HealthShield, action: () => openDewsburyBook("vaccinations") },
] as const;

/**
 * Dewsbury Moor hero: the real shopfront, bright and filling the screen, so
 * patients recognise it. There's no shade over the photo; the words sit on
 * forest-green glass panels at the foot, the main message on the left and
 * the three quick options on the right, bottom-aligned.
 */
export function HeroDewsbury() {
  const cfg = templateSites.dewsbury.hero;
  const branch = dewsburyBrand.locations[0];
  const status = useOpenStatus(branch);

  const option = "group flex lg:items-center gap-2 lg:gap-4 flex-col lg:flex-row w-full h-full min-h-[64px] p-3 lg:px-4 lg:py-2.5 text-left text-white cursor-pointer no-underline transition-[background-color,transform] duration-500 ease-[var(--dmp-ease)] hover:bg-[rgba(2,32,28,0.8)] hover:-translate-y-px";

  return (
    <section aria-labelledby="dmp-hero-title" className="relative isolate overflow-hidden bg-brand-light">
      {/* Behind the panels: the same photo, softly blurred, so the hero is photo
          from top to bottom with no plain band under the shop */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <img src={shopfront} alt="" className="w-full h-full object-cover object-[50%_100%] scale-110 blur-2xl" />
        <div className="absolute inset-0 bg-[rgba(2,32,28,0.18)]" />
      </div>
      {/* The photo at its own shape, so the whole building and sky show; it fades
          into the blurred copy at its foot */}
      <div aria-hidden="true" className="relative overflow-hidden h-[46svh] sm:h-[min(56vw,calc(100svh-88px-11rem))] [mask-image:linear-gradient(180deg,#000_82%,transparent)]">
        <img src={shopfront} alt="" className="w-full h-full object-cover object-[50%_48%] dmp-zoom" />
      </div>
      <p className="sr-only">Photo: Dewsbury Moor Pharmacy at 119 Heckmondwike Road.</p>

      <div className="relative w-full max-w-7xl mx-auto px-3 sm:px-4 -mt-10 sm:-mt-24 lg:-mt-28 pb-4 sm:pb-6 lg:pb-7 grid lg:grid-cols-[1.2fr_1fr] gap-3 lg:gap-6 items-end">
        <div className="dmp-glass-forest p-5 sm:p-6 lg:px-7">
          <h1 id="dmp-hero-title" className="font-display text-white text-[1.85rem] sm:text-[2.4rem] lg:text-[2.4rem] leading-[1.05]" style={{ fontWeight: 700, letterSpacing: "-0.02em" }}>
            <span className="block [text-wrap:balance]">{cfg.title1}</span>
            <span className="block [text-wrap:balance] text-brand-cta">{cfg.title2}</span>
          </h1>
          <p className="hidden sm:block text-white/85 text-[1rem] lg:text-[1.02rem] leading-relaxed mt-2.5 max-w-xl">{cfg.subtitle}</p>
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
            <button type="button" onClick={() => openDewsburyBook()} aria-haspopup="dialog" className="dmp-btn dmp-btn--lg dmp-btn--hero w-full sm:w-auto">
              Book an appointment
            </button>
            <p className="text-[0.92rem] text-white/80">
              <span className={status.open ? "text-brand-cta" : "text-amber-300"} style={{ fontWeight: 700 }}>{status.label}</span>
              {status.detail ? `, ${status.detail.charAt(0).toLowerCase()}${status.detail.slice(1)}` : ""}
            </p>
          </div>
        </div>

        <nav aria-label="Popular services">
          <ul className="grid grid-cols-3 lg:grid-cols-1 gap-2 lg:gap-3">
            {OPTIONS.map((o) => {
              const Icon = o.icon;
              const inner = (
                <>
                  <span className="w-10 h-10 lg:w-11 lg:h-11 rounded-xl bg-brand-cta text-brand-darkest grid place-items-center shrink-0"><Icon width={22} height={22} /></span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[0.9rem] lg:text-[1.05rem] leading-tight" style={{ fontWeight: 700 }}>{o.title}</span>
                    <span className="hidden lg:block text-white/75 text-[0.9rem] leading-snug mt-0.5">{o.line}</span>
                  </span>
                  <NavArrowRight width={20} height={20} className="hidden lg:block text-brand-cta shrink-0 transition-transform duration-500 ease-[var(--dmp-ease)] group-hover:translate-x-1" />
                </>
              );
              return (
                <li key={o.title} className="dmp-glass-forest !rounded-2xl overflow-hidden">
                  {"to" in o
                    ? <Link to={o.to} className={option}>{inner}</Link>
                    : <button type="button" onClick={o.action} aria-haspopup="dialog" className={option}>{inner}</button>}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </section>
  );
}
