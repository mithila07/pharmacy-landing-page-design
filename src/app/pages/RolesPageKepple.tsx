import { Stethoscope, ScanLine, PackageCheck, HeartHandshake, ClipboardList, Truck, Users } from "lucide-react";
import { KeppleSubPage } from "../components/KeppleSubPage";
import { Reveal } from "../components/Reveal";
import { kepplelaneBrand } from "../branding";
import heroImg from "../../assets/about-bg.jpeg";

const ROLES = [
  {
    icon: Stethoscope,
    title: "Pharmacist",
    text: "Clinically responsible for everything that leaves the dispensary. Our two full-time pharmacists check each prescription against your record, run NHS Pharmacy First and private consultations, and are the people to ask if you have a question about your medicines.",
    tag: "GPhC registered",
  },
  {
    icon: ScanLine,
    title: "Accuracy Checking Technician",
    text: "A qualified technician who carries out the final, independent check on assembled prescriptions — confirming the right medicine, strength, quantity and label before it's handed over. This is the second pair of eyes on every item.",
    tag: "Final check",
  },
  {
    icon: PackageCheck,
    title: "Dispensing Technician",
    text: "Assembles and labels prescriptions, manages stock and expiry dates, and prepares monitored dosage systems for patients and care homes that need them.",
    tag: "Qualified",
  },
  {
    icon: HeartHandshake,
    title: "Healthcare Assistant",
    text: "The team you'll usually meet first. Trained through our Healthy Living Pharmacy accreditation to give guidance on health, nutrition and over-the-counter treatment, and to know when to bring a pharmacist in.",
    tag: "Healthy Living trained",
  },
  {
    icon: ClipboardList,
    title: "Dispensing Assistant",
    text: "Handles prescriptions coming in and out — receiving from the surgery, ordering repeats on patients' behalf, and keeping the collection shelves organised so nothing gets missed.",
    tag: "Front of dispensary",
  },
  {
    icon: Truck,
    title: "Delivery Driver",
    text: "Takes prescriptions out to housebound patients and on the regular rounds to local nursing and rest homes — often the only member of the team a housebound patient sees each month.",
    tag: "Out on the road",
  },
];

export default function RolesPageKepple() {
  const brand = kepplelaneBrand;

  return (
    <KeppleSubPage
      eyebrow="Dispensary"
      title="Who's behind"
      titleAccent="the counter."
      intro="Over twenty people work at Kepple Lane, and a prescription passes through several pairs of hands before it reaches you. Here's who does what, and where each role fits into your care."
      heroImage={heroImg}
      heroImageAlt="The team at Kepple Lane Pharmacy"
      seo={{
        title: "Roles within the Dispensary | Kepple Lane Pharmacy, Garstang",
        description: "Meet the roles behind the counter at Kepple Lane Pharmacy in Garstang — pharmacists, accuracy checking technicians, dispensing technicians, healthcare assistants and delivery drivers.",
        path: `${brand.basePath}/roles`,
      }}
    >
      {/* Roles grid */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-4">
          <Reveal className="max-w-2xl mb-10">
            <span className="text-[0.8rem] text-brand-secondary uppercase tracking-widest" style={{ fontWeight: 700 }}>The team</span>
            <h2 className="text-[1.8rem] md:text-[2.2rem] text-[#1E1A3C] mt-2 mb-3" style={{ fontWeight: 700, letterSpacing: "-0.01em" }}>Six roles, one dispensary</h2>
            <p className="text-[#5A5578] text-[1rem] leading-relaxed">Every role below is a separate, trained job — that separation is what makes the double-check on your prescription possible.</p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ROLES.map((r, i) => (
              <Reveal key={r.title} delay={i * 0.05}>
                <div className="h-full rounded-2xl border border-[#DED9F7] bg-white shadow-sm p-6 hover:-translate-y-0.5 hover:shadow-md transition-all">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <span className="w-12 h-12 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center"><r.icon size={24} /></span>
                    <span className="text-[0.68rem] px-2.5 py-1 rounded-full bg-brand-light text-brand-primary border border-[#DED9F7]" style={{ fontWeight: 600 }}>{r.tag}</span>
                  </div>
                  <h3 className="text-[1.1rem] text-[#1E1A3C] mb-1.5" style={{ fontWeight: 600 }}>{r.title}</h3>
                  <p className="text-[0.89rem] text-[#5A5578] leading-relaxed">{r.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team band */}
      <section className="relative py-16" style={{ background: "linear-gradient(135deg, #F2F0FD 0%, #F7F5FF 100%)" }}>
        <div className="max-w-4xl mx-auto px-4">
          <Reveal>
            <div className="rounded-2xl border border-[#DED9F7] bg-white shadow-sm p-7 sm:p-9 text-center">
              <span className="w-12 h-12 rounded-xl bg-brand-secondary/10 text-brand-secondary flex items-center justify-center mx-auto mb-4"><Users size={24} /></span>
              <h2 className="text-[1.4rem] md:text-[1.7rem] text-[#1E1A3C] mb-3" style={{ fontWeight: 700 }}>Two pharmacists, twenty-plus staff</h2>
              <p className="text-[#5A5578] text-[1rem] leading-relaxed max-w-2xl mx-auto">
                Opening 72 hours a week takes a full team. Whichever day you come in, there's a pharmacist on site and a trained dispensary team behind them — so you're never waiting for someone qualified to be available.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </KeppleSubPage>
  );
}
