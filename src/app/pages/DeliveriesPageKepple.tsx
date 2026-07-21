import { Truck, Home, Building2, Phone, Clock, ShieldCheck, PackageCheck } from "lucide-react";
import { KeppleSubPage } from "../components/KeppleSubPage";
import { Reveal } from "../components/Reveal";
import { kepplelaneBrand } from "../branding";
import heroImg from "../../assets/about-2.jpeg";

const WHO = [
  {
    icon: Home,
    title: "Housebound patients",
    text: "If you can't get to the pharmacy — through illness, mobility or because you have no one to collect for you — we'll bring your prescription to your door, free of charge.",
  },
  {
    icon: Building2,
    title: "Nursing & rest homes",
    text: "We run regular delivery rounds to local nursing and residential homes, working with staff so residents' medication arrives on a predictable schedule.",
  },
];

const HOW = [
  { icon: Phone, title: "Ask us to set it up", text: "Call the pharmacy on 01995 607399 or speak to any member of the team at the counter. We'll take your address and note it on your record — you only need to arrange it once." },
  { icon: PackageCheck, title: "We dispense as normal", text: "Your prescription goes through the same clinical and accuracy checks as anything collected in person. Nothing is skipped because it's going out for delivery." },
  { icon: Truck, title: "We bring it to you", text: "A member of our team delivers it to your door. If you're not in, we won't leave medication unattended — we'll try again or call to rearrange." },
];

export default function DeliveriesPageKepple() {
  const brand = kepplelaneBrand;

  return (
    <KeppleSubPage
      eyebrow="Dispensary"
      title="We'll bring your prescription"
      titleAccent="to your door."
      intro="Getting to the pharmacy isn't always possible. We deliver free of charge to housebound patients across Garstang and the surrounding villages, and run regular rounds to local nursing and rest homes."
      heroImage={heroImg}
      heroImageAlt="A prescription being prepared for delivery at Kepple Lane Pharmacy"
      seo={{
        title: "Prescription Deliveries | Kepple Lane Pharmacy, Garstang",
        description: "Free prescription delivery from Kepple Lane Pharmacy for housebound patients in Garstang, plus regular deliveries to local nursing and rest homes. Call 01995 607399 to arrange.",
        path: `${brand.basePath}/deliveries`,
      }}
    >
      {/* Who it's for */}
      <section className="relative py-16">
        <div className="max-w-4xl mx-auto px-4">
          <Reveal className="mb-9">
            <span className="text-[0.8rem] text-brand-secondary uppercase tracking-widest" style={{ fontWeight: 700 }}>Who we deliver to</span>
            <h2 className="text-[1.8rem] md:text-[2.2rem] text-[#1E1A3C] mt-2" style={{ fontWeight: 700, letterSpacing: "-0.01em" }}>Free delivery, where it's needed</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-5">
            {WHO.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.06}>
                <div className="h-full rounded-2xl border border-[#DED9F7] bg-white shadow-sm p-6 hover:-translate-y-0.5 hover:shadow-md transition-all">
                  <span className="w-12 h-12 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-4"><w.icon size={24} /></span>
                  <h3 className="text-[1.1rem] text-[#1E1A3C] mb-1.5" style={{ fontWeight: 600 }}>{w.title}</h3>
                  <p className="text-[0.9rem] text-[#5A5578] leading-relaxed">{w.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="relative py-16" style={{ background: "linear-gradient(135deg, #F2F0FD 0%, #F7F5FF 100%)" }}>
        <div className="max-w-5xl mx-auto px-4">
          <Reveal className="mb-9 max-w-2xl">
            <span className="text-[0.8rem] text-brand-secondary uppercase tracking-widest" style={{ fontWeight: 700 }}>How it works</span>
            <h2 className="text-[1.8rem] md:text-[2.2rem] text-[#1E1A3C] mt-2 mb-3" style={{ fontWeight: 700, letterSpacing: "-0.01em" }}>Three steps, arranged once</h2>
            <p className="text-[#5A5578] text-[1rem] leading-relaxed">Set it up with us and it stays on your record — you won't need to ask again each month.</p>
          </Reveal>
          <div className="grid sm:grid-cols-3 gap-5">
            {HOW.map((h, i) => (
              <Reveal key={h.title} delay={i * 0.05}>
                <div className="h-full rounded-2xl border border-[#DED9F7] bg-white shadow-sm p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-10 h-10 rounded-xl bg-brand-secondary/10 text-brand-secondary flex items-center justify-center"><h.icon size={20} /></span>
                    <span className="text-[0.72rem] text-brand-secondary" style={{ fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>0{i + 1}</span>
                  </div>
                  <h3 className="text-[1.02rem] text-[#1E1A3C] mb-1.5" style={{ fontWeight: 600 }}>{h.title}</h3>
                  <p className="text-[0.88rem] text-[#5A5578] leading-relaxed">{h.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Good to know */}
      <section className="relative py-16">
        <div className="max-w-4xl mx-auto px-4">
          <Reveal>
            <div className="rounded-2xl border border-[#DED9F7] bg-white shadow-sm p-7 sm:p-9">
              <h2 className="text-[1.4rem] text-[#1E1A3C] mb-6" style={{ fontWeight: 700 }}>Good to know</h2>
              <ul className="space-y-5">
                <li className="flex items-start gap-3.5">
                  <span className="w-10 h-10 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0"><Clock size={18} /></span>
                  <div>
                    <p className="text-[0.95rem] text-[#1E1A3C] mb-0.5" style={{ fontWeight: 600 }}>Allow a few days</p>
                    <p className="text-[0.88rem] text-[#5A5578] leading-relaxed">Your GP has to issue the prescription before we can dispense it, so please order in good time rather than waiting until you run out.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3.5">
                  <span className="w-10 h-10 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0"><ShieldCheck size={18} /></span>
                  <div>
                    <p className="text-[0.95rem] text-[#1E1A3C] mb-0.5" style={{ fontWeight: 600 }}>Medication is never left unattended</p>
                    <p className="text-[0.88rem] text-[#5A5578] leading-relaxed">If nobody's home we'll take it back to the pharmacy and get in touch to rearrange. Some items also need a signature on the doorstep.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3.5">
                  <span className="w-10 h-10 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0"><Phone size={18} /></span>
                  <div>
                    <p className="text-[0.95rem] text-[#1E1A3C] mb-0.5" style={{ fontWeight: 600 }}>Questions about a delivery?</p>
                    <p className="text-[0.88rem] text-[#5A5578] leading-relaxed">
                      Call us on <a href="tel:01995607399" className="text-brand-primary underline" style={{ fontWeight: 600 }}>01995 607399</a> and we'll check where your prescription is up to.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </KeppleSubPage>
  );
}
