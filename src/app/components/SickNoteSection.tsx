import { Link } from "react-router";
import { ArrowRight, Mail, MessageSquareText, Stethoscope } from "lucide-react";
import type { Brand } from "../branding";
import { privateServices } from "../data/services";
import { NOTE_TYPES, SICK_NOTE_RULES, SICK_NOTE_SERVICE_ID } from "../data/sickNote";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import sickImg from "../../assets/condition images/image (16).jpeg";

/**
 * Home-page widget for private sick notes, on every site. One layout, three skins:
 *  - "default":  brand tokens (template and white-label sites)
 *  - "oc":       One Care / Shivakem design system
 *  - "dewsbury": Dewsbury Moor glass + Jost display type
 * Each note type deep-links into the request flow with that note pre-selected.
 */
type Skin = "default" | "oc" | "dewsbury";

const SKINS: Record<Skin, {
  section: string; h2: string; accent: string; lead: string; step: string; stepNum: string;
  cta: string; panel: string; row: string; rowTitle: string; chip: string; fine: string; wrap: string;
}> = {
  default: {
    section: "relative py-20 overflow-hidden bg-gradient-to-b from-white via-brand-light/50 to-white",
    wrap: "max-w-7xl mx-auto px-4",
    h2: "text-[1.8rem] md:text-[2.2rem] text-gray-900 leading-tight",
    accent: "text-brand-primary",
    lead: "text-gray-600 text-[1rem] leading-relaxed",
    step: "text-gray-700",
    stepNum: "bg-brand-primary/10 text-brand-primary",
    cta: "cta cta-primary inline-flex items-center gap-2 bg-brand-primary text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all no-underline",
    panel: "rounded-2xl bg-white border border-gray-100 shadow-[0_24px_50px_-30px_rgba(15,40,30,0.35)] overflow-hidden",
    row: "hover:bg-brand-light/60",
    rowTitle: "text-gray-900 group-hover:text-brand-primary",
    chip: "bg-brand-secondary/12 text-brand-green-ink",
    fine: "text-gray-500",
  },
  oc: {
    section: "py-[clamp(72px,9vw,136px)] bg-oc-paper",
    wrap: "max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8",
    h2: "oc-h2 text-oc-ink",
    accent: "text-oc-dark",
    lead: "oc-lead text-oc-quiet",
    step: "text-oc-ink",
    stepNum: "bg-oc-mist text-oc-dark",
    cta: "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold bg-oc-dark text-white hover:bg-oc-deep transition-colors no-underline",
    panel: "rounded-oc-xl bg-white border border-oc-line overflow-hidden",
    row: "hover:bg-oc-tint",
    rowTitle: "text-oc-ink group-hover:text-oc-deep",
    chip: "bg-oc-mist text-oc-dark",
    fine: "oc-small text-oc-quiet",
  },
  dewsbury: {
    section: "relative py-20 lg:py-24 dmp-wash",
    wrap: "max-w-7xl mx-auto px-4",
    h2: "font-display text-slate-900 text-[1.9rem] md:text-[2.5rem] leading-tight",
    accent: "text-brand-secondary",
    lead: "text-slate-600 text-[1.02rem] leading-relaxed",
    step: "text-slate-700",
    stepNum: "bg-brand-light text-brand-primary",
    cta: "dmp-btn dmp-btn--lg no-underline",
    panel: "dmp-glass-light overflow-hidden",
    row: "hover:bg-white",
    rowTitle: "text-slate-900 group-hover:text-brand-primary",
    chip: "bg-brand-cta/25 text-brand-darkest",
    fine: "text-slate-500",
  },
};

const STEPS = [
  { icon: MessageSquareText, text: "Answer a few questions online" },
  { icon: Stethoscope, text: `A UK-registered doctor reviews it, ${SICK_NOTE_RULES.turnaround}` },
  { icon: Mail, text: "If approved, your note is emailed to you" },
];

export function SickNoteSection({ brand, skin = "default" }: { brand: Brand; skin?: Skin }) {
  const s = SKINS[skin];
  const price = (privateServices.find((x) => x.id === SICK_NOTE_SERVICE_ID)?.price ?? "").replace(/^From\s*/i, "");
  const href = (note?: string) => `${brand.basePath}/book/${SICK_NOTE_SERVICE_ID}${note ? `?note=${note}` : ""}`;

  return (
    <section id="sick-notes" aria-labelledby="sick-notes-title" className={`${s.section} scroll-mt-20`}>
      <div className={`${s.wrap} grid lg:grid-cols-[1fr_1.05fr] gap-10 lg:gap-16 items-center`}>
        <div>
          <h2 id="sick-notes-title" className={s.h2} style={{ fontWeight: 700 }}>
            Need a sick note? <span className={s.accent}>No appointment needed.</span>
          </h2>
          <p className={`${s.lead} mt-4 max-w-xl`}>
            Request a private sick note online, for work, a cancelled trip or your gym. A doctor checks your answers and, if it's right for you, sends your note by email.
          </p>
          <ol className="mt-7 grid gap-3.5">
            {STEPS.map((st, i) => (
              <li key={st.text} className={`flex items-center gap-3 ${s.step}`}>
                <span className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-[0.9rem] ${s.stepNum}`} style={{ fontWeight: 700 }}>{i + 1}</span>
                <span className="text-[0.98rem]">{st.text}</span>
              </li>
            ))}
          </ol>
          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
            <Link to={href()} className={s.cta} style={{ fontWeight: 600 }}>
              Request a sick note <ArrowRight size={17} />
            </Link>
            {price && <span className={`${s.lead} !text-[0.95rem]`}>From <strong style={{ fontWeight: 700 }}>£{price}</strong></span>}
          </div>
          <p className={`${s.fine} text-[0.82rem] mt-6 max-w-xl`}>
            A private note, not an NHS fit note. It's up to your employer, insurer or gym whether they accept it. Off work for more than {SICK_NOTE_RULES.maxDays} days? Ask your GP for a fit note.
          </p>
        </div>

        <div className={s.panel}>
          <div className="relative aspect-[16/8] overflow-hidden">
            <ImageWithFallback src={sickImg} alt="" className="absolute inset-0 w-full h-full object-cover object-[50%_45%]" />
          </div>
          <ul className="p-2 sm:p-3">
            {NOTE_TYPES.map((t) => (
              <li key={t.id}>
                <Link to={href(t.id)} aria-label={`Request a ${t.name.toLowerCase()}`} className={`group flex items-center gap-4 rounded-xl px-3 sm:px-4 py-3.5 no-underline transition-colors ${s.row}`}>
                  <span className="min-w-0 flex-1">
                    <span className={`flex flex-wrap items-center gap-2 text-[1rem] transition-colors ${s.rowTitle}`} style={{ fontWeight: 700 }}>
                      {t.name}
                      {t.popular && <span className={`text-[0.7rem] px-2 py-0.5 rounded-full ${s.chip}`} style={{ fontWeight: 600 }}>Most requested</span>}
                    </span>
                    <span className={`block text-[0.86rem] mt-0.5 ${s.fine}`}>{t.desc}</span>
                  </span>
                  <ArrowRight size={18} className="shrink-0 opacity-50 transition-transform group-hover:translate-x-0.5 group-hover:opacity-100" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
