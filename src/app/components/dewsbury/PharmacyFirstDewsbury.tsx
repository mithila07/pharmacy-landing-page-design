import { dewsburyBrand } from "../../branding";
import { DMP_IMG } from "../../data/dewsbury";
import { RevealCard } from "./RevealCard";

/** The seven NHS Pharmacy First conditions, in plain words. */
const CONDITIONS = [
  { id: "nhs-pf-sore-throat", name: "Sore throat", age: "Age 5+", desc: "A pharmacist checks your throat and, if you need it, gives you treatment on the NHS." },
  { id: "nhs-pf-earache", name: "Earache", age: "Age 1 to 17", desc: "Help for children and teenagers with painful ears, without waiting for a GP." },
  { id: "nhs-pf-sinusitis", name: "Sinusitis", age: "Age 12+", desc: "Blocked, painful sinuses that won't clear? We'll assess you and suggest the right treatment." },
  { id: "nhs-pf-uti", name: "Urine infection", age: "Women 16 to 64", desc: "Burning or needing to go often? We can assess and treat uncomplicated urine infections." },
  { id: "nhs-pf-insect-bite", name: "Infected insect bite", age: "Age 1+", desc: "A bite that's red, swollen or getting worse can be checked and treated here." },
  { id: "nhs-pf-impetigo", name: "Impetigo", age: "Age 1+", desc: "Crusty, spreading skin sores, assessed and treated quickly by our pharmacist." },
  { id: "nhs-pf-shingles", name: "Shingles", age: "Age 18+", desc: "A painful band of rash? Getting treatment early can help, so come and see us." },
  // Not a Pharmacy First condition, but free on the NHS and often needed in a hurry
  { id: "nhs-sti", name: "Emergency contraception", age: "Free on the NHS", desc: "Confidential, and best taken as soon as possible. Book a time or join our live queue." },
];

/** NHS Pharmacy First for Dewsbury Moor: bright photo cards that open on hover. */
export function PharmacyFirstDewsbury() {
  return (
    <section id="nhs-services" aria-labelledby="dmp-pf-title" className="relative py-20 scroll-mt-20 dmp-wash">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-4 lg:items-end mb-10">
          <h2 id="dmp-pf-title" className="font-display text-slate-900 text-[1.8rem] md:text-[2.4rem] leading-tight" style={{ fontWeight: 700 }}>
            NHS Pharmacy First, <span className="text-brand-secondary">no GP appointment needed.</span>
          </h2>
          <p className="text-slate-600 text-[1rem] leading-relaxed lg:max-w-md lg:justify-self-end">Free help for seven common conditions. Choose yours to book, or just walk in during opening hours.</p>
        </div>
        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {CONDITIONS.map((c) => (
            <li key={c.id}>
              <RevealCard
                to={`${dewsburyBrand.basePath}/book/${c.id}`}
                img={DMP_IMG[c.id] ?? DMP_IMG["prv-ehc"]}
                name={c.name}
                tag={c.age}
                desc={c.desc}
                cta={c.id === "nhs-sti" ? "Book or join the queue" : "Book free consultation"}
                className="h-full min-h-[15rem] sm:min-h-[19rem]"
              />
            </li>
          ))}
        </ul>
        <p className="mt-6 text-slate-500 text-[0.92rem]">Free on the NHS. If you're given a medicine, the usual prescription charge applies unless you're exempt. Very unwell? Call 999, or NHS 111 for urgent advice.</p>
      </div>
    </section>
  );
}
