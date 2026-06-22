import { CheckCircle2, ListChecks, Users, HelpCircle, ChevronDown, ChevronUp, ShieldAlert, Phone } from "lucide-react";
import { useState } from "react";
import { ServiceContent } from "../data/serviceContent";
import { carefirstBrand, type Brand } from "../branding";

const DEFAULT_SAFETY_NETTING =
  "Seek urgent help if you have difficulty breathing or swallowing, are drooling, can't open your mouth, or develop a high fever or a rash — call 111 or 999.";

interface Props {
  content: ServiceContent;
  serviceName: string;
  isNHS: boolean;
  brand?: Brand;
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer hover:bg-gray-50 transition-colors"
      >
        <span className="text-[0.92rem] text-gray-800 pr-4" style={{ fontWeight: 600 }}>
          {q}
        </span>
        {open ? (
          <ChevronUp size={18} className="text-brand-primary shrink-0" />
        ) : (
          <ChevronDown size={18} className="text-gray-400 shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-5 pb-5">
          <p className="text-[0.88rem] text-gray-600 leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

export function ServiceInfoSection({ content, serviceName, isNHS, brand = carefirstBrand }: Props) {
  const accent = isNHS ? "var(--brand-primary)" : "var(--brand-secondary)";
  const accentLight = isNHS ? "var(--brand-light)" : "var(--brand-light-alt)";
  const areaServed = [...new Set(brand.locations.map((l) => l.shortName))];

  return (
    <article className="max-w-3xl mx-auto px-4 pb-16 pt-6">
      {/* Divider */}
      <div className="flex items-center gap-3 mb-8">
        <div className="flex-1 h-px bg-gray-100" />
        <span className="text-[0.78rem] text-gray-400 uppercase tracking-widest" style={{ fontWeight: 600 }}>
          About This Service
        </span>
        <div className="flex-1 h-px bg-gray-100" />
      </div>

      {/* Hero block: image + headline + intro */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6 border border-gray-100">
        <div className="relative h-52 sm:h-64 overflow-hidden">
          <img
            src={content.image}
            alt={content.imageAlt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h2 className="text-white text-[1.15rem] sm:text-[1.3rem] leading-snug" style={{ fontWeight: 700 }}>
              {content.headline}
            </h2>
          </div>
        </div>
        <div className="p-5">
          <p className="text-[0.9rem] text-gray-600 leading-relaxed">{content.intro}</p>
        </div>
      </div>

      {/* Two-column grid: Benefits + What to Expect */}
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        {/* Benefits */}
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: accentLight, color: accent }}
            >
              <CheckCircle2 size={17} />
            </div>
            <h3 className="text-[0.95rem] text-gray-900" style={{ fontWeight: 700 }}>
              Key Benefits
            </h3>
          </div>
          <ul className="space-y-2.5">
            {content.benefits.map((b, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-[0.65rem]"
                  style={{ backgroundColor: accentLight, color: accent, fontWeight: 700 }}
                >
                  ✓
                </span>
                <span className="text-[0.84rem] text-gray-600 leading-relaxed">{b}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* What to Expect */}
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: accentLight, color: accent }}
            >
              <ListChecks size={17} />
            </div>
            <h3 className="text-[0.95rem] text-gray-900" style={{ fontWeight: 700 }}>
              What to Expect
            </h3>
          </div>
          <ol className="space-y-3">
            {content.whatToExpect.map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[0.68rem] mt-0.5"
                  style={{ backgroundColor: accent, color: "#fff", fontWeight: 700 }}
                >
                  {i + 1}
                </span>
                <span className="text-[0.84rem] text-gray-600 leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Who is it suitable for */}
      <div className="bg-white rounded-xl shadow-sm p-5 mb-6 border border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: accentLight, color: accent }}
          >
            <Users size={17} />
          </div>
          <h3 className="text-[0.95rem] text-gray-900" style={{ fontWeight: 700 }}>
            Who is This Service Suitable For?
          </h3>
        </div>
        <div className="grid sm:grid-cols-2 gap-2">
          {content.suitableFor.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-2.5 px-3.5 py-2.5 rounded-lg"
              style={{ backgroundColor: accentLight }}
            >
              <span className="text-sm mt-0.5" style={{ color: accent }}>●</span>
              <span className="text-[0.83rem] text-gray-700 leading-relaxed">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* FAQs */}
      {content.faqs.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: accentLight, color: accent }}
            >
              <HelpCircle size={17} />
            </div>
            <h3 className="text-[0.95rem] text-gray-900" style={{ fontWeight: 700 }}>
              Frequently Asked Questions — {serviceName}
            </h3>
          </div>
          <div className="space-y-2">
            {content.faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      )}

      {/* Safety-netting — clinical red-flag advice, shown for every service */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 mt-6">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
            <ShieldAlert size={18} className="text-amber-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-[0.95rem] text-amber-900 mb-1" style={{ fontWeight: 700 }}>
              Safety-netting
            </h3>
            <p className="text-[0.86rem] text-amber-900/80 leading-relaxed">
              {content.safetyNetting ?? DEFAULT_SAFETY_NETTING}
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <a
                href="tel:111"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white border border-amber-300 text-amber-800 text-[0.82rem] hover:bg-amber-100 transition-colors no-underline"
                style={{ fontWeight: 600 }}
              >
                <Phone size={13} /> Call 111
              </a>
              <a
                href="tel:999"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-amber-600 text-white text-[0.82rem] hover:bg-amber-700 transition-colors no-underline"
                style={{ fontWeight: 600 }}
              >
                <Phone size={13} /> Call 999
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Schema.org structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalClinic",
            name: brand.name,
            description: content.intro,
            medicalSpecialty: "Pharmacy",
            areaServed,
            availableService: {
              "@type": "MedicalProcedure",
              name: serviceName,
              description: content.intro,
              howPerformed: isNHS ? "Provided free under the NHS by a qualified pharmacist." : "Private service provided by a qualified pharmacist.",
            },
            mainEntityOfPage: {
              "@type": "FAQPage",
              mainEntity: content.faqs.map((faq) => ({
                "@type": "Question",
                name: faq.q,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.a,
                },
              })),
            },
          }),
        }}
      />
    </article>
  );
}
