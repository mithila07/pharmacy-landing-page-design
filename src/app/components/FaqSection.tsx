import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Plus, MessageCircleQuestion, ArrowRight } from "lucide-react";
import { Headset as PhHeadset, ArrowRight as PhArrowRight } from "@phosphor-icons/react";
import { Reveal } from "./Reveal";
import { carefirstBrand, type Brand } from "../branding";
import { JsonLd } from "../seo";

const faqSchema = (items: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

const faqs = [
  {
    q: "Do I need an appointment, or can I just walk in?",
    a: "Many of our services welcome walk-ins, but booking ahead means we'll have a private consultation room ready and can see you faster. For clinics like weight management or travel health, we'd always recommend booking.",
  },
  {
    q: "Are NHS services really free?",
    a: "Yes. NHS services such as Pharmacy First, blood pressure checks and eligible vaccinations are funded by the NHS and completely free to those who qualify. We'll always tell you upfront if a service is private and what it costs.",
  },
  {
    q: "Can I get treatment without seeing my GP?",
    a: "For many common conditions, yes. Under NHS Pharmacy First our pharmacists can assess and treat seven conditions — including supplying prescription medicines like antibiotics where clinically appropriate — without a GP appointment.",
  },
  {
    q: "Do you offer private prescriptions and treatments?",
    a: "We do. From travel vaccinations and ear microsuction to weight management and minor-illness clinics, our pharmacist prescribers can assess you and provide private treatment, often on the same day.",
  },
  {
    q: "How do I book an appointment?",
    a: "Choose a service on this page and follow the booking steps — pick a time, confirm your details, and you're done. You can also complete a short pre-consultation questionnaire so your pharmacist is prepared before you arrive.",
  },
  {
    q: "Is my information kept confidential?",
    a: "Always. Consultations take place in a private room and your information is handled in line with NHS confidentiality and data-protection standards. We only share what's clinically necessary, with your consent.",
  },
];

export function FaqSection({ brand = carefirstBrand }: { brand?: Brand } = {}) {
  const [open, setOpen] = useState<number | null>(0);
  const navigate = useNavigate();
  const isHC = brand.id === "healthcheck";

  const handleContact = () => {
    if (brand.contactPath) navigate(brand.contactPath);
    else document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="faq" className="relative py-20 overflow-hidden">
      <JsonLd data={faqSchema(faqs)} />
      <div className="absolute inset-0 bg-gradient-to-b from-white via-brand-light/30 to-white" />
      <div className="absolute top-10 right-1/4 w-[360px] h-[360px] bg-brand-secondary/8 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 grid lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-14">
        {/* Intro */}
        <Reveal>
          <div className="lg:sticky lg:top-24">
            {!brand.template && <span className="text-[0.8rem] text-brand-secondary uppercase tracking-widest" style={{ fontWeight: 700 }}>FAQs</span>}
            <h2 className="text-[1.8rem] md:text-[2.2rem] text-gray-900 mt-2 mb-4" style={{ fontWeight: 700 }}>
              {isHC ? <>Questions, <span className="hc-swoosh-text">answered</span></> : "Questions, answered"}
            </h2>
            <p className="text-gray-600 text-[1rem] leading-relaxed mb-6">
              Everything you need to know about booking, NHS eligibility and our private clinics. Can't find your
              answer? Our team is always happy to help.
            </p>
            <button
              onClick={handleContact}
              className="hc-btn-grad-blue inline-flex items-center gap-2 bg-brand-primary text-white px-5 py-2.5 rounded-xl transition-all cursor-pointer"
              style={{ fontWeight: 600 }}
            >
              {isHC ? <PhHeadset size={17} weight="duotone" /> : <MessageCircleQuestion size={16} />} Contact the team
              {isHC ? <PhArrowRight size={15} weight="duotone" /> : <ArrowRight size={15} />}
            </button>
          </div>
        </Reveal>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.04}>
                <div className={`rounded-2xl border bg-white transition-colors ${isOpen ? "border-brand-primary/30 shadow-sm" : "border-gray-100"}`}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer"
                  >
                    <span className="text-[0.96rem] text-gray-900" style={{ fontWeight: 600 }}>{f.q}</span>
                    <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all ${isOpen ? "bg-brand-primary text-white rotate-45" : "bg-brand-primary/10 text-brand-primary"}`}>
                      <Plus size={16} />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 text-[0.9rem] text-gray-600 leading-relaxed">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
