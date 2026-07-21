import { FileText, Stethoscope, PackageCheck, ScanLine, HandHeart, RefreshCw, AlertCircle } from "lucide-react";
import { KeppleSubPage } from "../components/KeppleSubPage";
import { Reveal } from "../components/Reveal";
import { kepplelaneBrand } from "../branding";
import heroImg from "../../assets/about-1.jpeg";

const STEPS = [
  {
    icon: FileText,
    title: "Your prescription arrives",
    text: "Most prescriptions reach us electronically through the NHS Electronic Prescription Service, sent straight from your GP. You can also hand in a paper prescription at the counter, or ask us to collect it from the surgery for you.",
  },
  {
    icon: Stethoscope,
    title: "A pharmacist checks it clinically",
    text: "Before anything is picked, a pharmacist reviews the prescription against your record — the right medicine, the right dose, and no interaction with anything else you take. If something doesn't look right, we contact the prescriber before we go further.",
  },
  {
    icon: PackageCheck,
    title: "A dispensing technician assembles it",
    text: "Your medication is picked, labelled and assembled by a dispensing technician, who checks expiry dates and batch details as they go.",
  },
  {
    icon: ScanLine,
    title: "An accuracy check is carried out",
    text: "A second, independent pair of eyes — an accuracy checking technician or the pharmacist — verifies the assembled items against the prescription. Nothing leaves the dispensary on a single check.",
  },
  {
    icon: HandHeart,
    title: "You collect it — with advice if you want it",
    text: "We'll hand it over at the counter, or deliver it if you're housebound. If it's a new medicine, the pharmacist will offer to talk you through how and when to take it, and what to look out for.",
  },
];

export default function DispensingProcessPageKepple() {
  const brand = kepplelaneBrand;

  return (
    <KeppleSubPage
      eyebrow="Dispensary"
      title="How your prescription"
      titleAccent="is dispensed."
      intro="Every prescription that passes through Kepple Lane follows the same five steps, with two separate checks before anything reaches you. Here's what happens between your GP sending it and you picking it up."
      heroImage={heroImg}
      heroImageAlt="A dispensing technician assembling a prescription at Kepple Lane Pharmacy"
      seo={{
        title: "Our Dispensing Process | Kepple Lane Pharmacy, Garstang",
        description: "How a prescription is dispensed at Kepple Lane Pharmacy in Garstang — from electronic receipt and clinical check through assembly, independent accuracy check and handout.",
        path: `${brand.basePath}/dispensing-process`,
      }}
    >
      {/* The five steps */}
      <section className="relative py-16">
        <div className="max-w-4xl mx-auto px-4">
          <Reveal className="mb-10">
            <span className="text-[0.8rem] text-brand-secondary uppercase tracking-widest" style={{ fontWeight: 700 }}>Step by step</span>
            <h2 className="text-[1.8rem] md:text-[2.2rem] text-[#1E1A3C] mt-2" style={{ fontWeight: 700, letterSpacing: "-0.01em" }}>From prescription to counter</h2>
          </Reveal>

          <ol className="relative space-y-5 before:absolute before:left-[1.4rem] before:top-4 before:bottom-4 before:w-px before:bg-[#DED9F7]">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.05}>
                <li className="relative flex gap-5">
                  <span className="relative z-10 shrink-0 w-11 h-11 rounded-xl bg-white border border-[#DED9F7] text-brand-primary flex items-center justify-center shadow-sm">
                    <s.icon size={20} />
                  </span>
                  <div className="rounded-2xl border border-[#DED9F7] bg-white shadow-sm p-5 sm:p-6 flex-1">
                    <div className="flex items-baseline gap-2.5 mb-1.5">
                      <span className="text-[0.72rem] text-brand-secondary" style={{ fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>STEP {i + 1}</span>
                    </div>
                    <h3 className="text-[1.1rem] text-[#1E1A3C] mb-2" style={{ fontWeight: 600 }}>{s.title}</h3>
                    <p className="text-[0.92rem] text-[#5A5578] leading-relaxed">{s.text}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Repeat prescriptions + turnaround */}
      <section className="relative py-16" style={{ background: "linear-gradient(135deg, #F2F0FD 0%, #F7F5FF 100%)" }}>
        <div className="max-w-4xl mx-auto px-4 grid sm:grid-cols-2 gap-5">
          <Reveal>
            <div className="h-full rounded-2xl border border-[#DED9F7] bg-white shadow-sm p-6">
              <span className="w-11 h-11 rounded-xl bg-brand-secondary/10 text-brand-secondary flex items-center justify-center mb-4"><RefreshCw size={22} /></span>
              <h3 className="text-[1.05rem] text-[#1E1A3C] mb-2" style={{ fontWeight: 600 }}>Repeat prescriptions</h3>
              <p className="text-[0.9rem] text-[#5A5578] leading-relaxed">
                We can manage your repeats for you — ordering from the surgery when they're due and letting you know when they're ready. Allow a few working days between ordering and collection, as the prescription has to be issued by your GP before it reaches us.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="h-full rounded-2xl border border-[#DED9F7] bg-white shadow-sm p-6">
              <span className="w-11 h-11 rounded-xl bg-brand-secondary/10 text-brand-secondary flex items-center justify-center mb-4"><AlertCircle size={22} /></span>
              <h3 className="text-[1.05rem] text-[#1E1A3C] mb-2" style={{ fontWeight: 600 }}>If something's out of stock</h3>
              <p className="text-[0.9rem] text-[#5A5578] leading-relaxed">
                Occasionally a medicine is unavailable nationally. If that happens we'll tell you what we can supply, order the rest for the next delivery, and — where it's clinically appropriate — speak to your prescriber about an alternative rather than leaving you waiting.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </KeppleSubPage>
  );
}
