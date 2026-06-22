import { useParams, useNavigate } from "react-router";
import { useState } from "react";
import { ArrowLeft, ClipboardList, CheckCircle, ChevronRight } from "lucide-react";
import { nhsServices, privateServices } from "../data/services";
import { Footer } from "../components/Footer";
import { carefirstBrand, homePath, type Brand } from "../branding";
import { useSeo } from "../seo";

const allServices = [...nhsServices, ...privateServices];

const questions = [
  { id: "symptoms", label: "Briefly describe your symptoms or reason for the appointment", type: "textarea" as const },
  { id: "duration", label: "How long have you been experiencing this?", type: "text" as const, placeholder: "e.g. 3 days" },
  { id: "medications", label: "List any current medications", type: "textarea" as const },
  { id: "allergies", label: "Do you have any known allergies?", type: "text" as const, placeholder: "e.g. penicillin, none" },
  { id: "conditions", label: "Any pre-existing medical conditions?", type: "textarea" as const },
  { id: "pregnant", label: "Are you pregnant or breastfeeding?", type: "radio" as const, options: ["Yes", "No", "Prefer not to say"] },
];

export default function QuestionnairePage({ brand = carefirstBrand }: { brand?: Brand } = {}) {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const service = allServices.find((s) => s.id === serviceId);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  useSeo({
    title: "Pre-consultation questionnaire | Strachans Pharmacy",
    description: "Complete a short pre-consultation questionnaire ahead of your Strachans Pharmacy appointment.",
    index: false,
  });

  if (done) {
    return (
      <div className={`min-h-screen bg-gray-50 flex items-center justify-center p-4 ${brand.themeClass}`}>
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-brand-primary/10 flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-brand-primary" />
          </div>
          <h2 className="text-[1.4rem] text-gray-900 mb-2" style={{ fontWeight: 700 }}>Thank you!</h2>
          <p className="text-gray-500 mb-6 text-[0.9rem]">Your answers have been shared with the pharmacist. They'll review them before your appointment.</p>
          <button onClick={() => navigate(homePath(brand))} className="cta cta-primary w-full bg-brand-primary text-white px-6 py-2.5 rounded-lg hover:shadow-lg hover:shadow-emerald-900/20 transition-all cursor-pointer" style={{ fontWeight: 600 }}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-b from-brand-secondary/5 via-gray-50 to-white ${brand.themeClass}`}>
      <div className="bg-white shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-gray-700 cursor-pointer"><ArrowLeft size={20} /></button>
          <div>
            <h1 className="text-[1.1rem] text-gray-900" style={{ fontWeight: 700 }}>Pre-consultation Questionnaire</h1>
            <p className="text-[0.8rem] text-gray-500">{service?.name ?? "Your appointment"}</p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="rounded-xl border border-brand-primary/30 bg-gradient-to-br from-brand-light/70 to-white p-5 mb-5 flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center shrink-0">
            <ClipboardList size={20} className="text-brand-primary" />
          </div>
          <div>
            <p className="text-[0.95rem] text-gray-900" style={{ fontWeight: 600 }}>A few questions before your appointment</p>
            <p className="text-[0.85rem] text-gray-600 mt-0.5">This takes about 2 minutes and helps the pharmacist prepare. Skip any question you're unsure about.</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 space-y-5">
          {questions.map((q) => (
            <div key={q.id}>
              <label className="text-[0.9rem] text-gray-800 mb-2 block" style={{ fontWeight: 500 }}>{q.label}</label>
              {q.type === "textarea" && (
                <textarea
                  rows={3}
                  value={answers[q.id] ?? ""}
                  onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
                  className="w-full px-4 py-2.5 border border-brand-primary/30 rounded-lg text-[0.9rem] focus:outline-none focus:ring-2 focus:ring-brand-primary/30 resize-none"
                />
              )}
              {q.type === "text" && (
                <input
                  value={answers[q.id] ?? ""}
                  onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
                  placeholder={q.placeholder}
                  className="w-full px-4 py-2.5 border border-brand-primary/30 rounded-lg text-[0.9rem] focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                />
              )}
              {q.type === "radio" && (
                <div className="flex flex-wrap gap-2">
                  {q.options.map((opt) => (
                    <button
                      type="button"
                      key={opt}
                      onClick={() => setAnswers({ ...answers, [q.id]: opt })}
                      className={`px-4 py-2 rounded-lg border text-[0.85rem] transition-colors cursor-pointer ${answers[q.id] === opt ? "border-brand-primary bg-brand-primary/5 text-brand-primary" : "border-brand-primary/30 text-gray-700 hover:border-brand-primary/60"}`}
                      style={{ fontWeight: 500 }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="flex items-center justify-between pt-3">
            <button onClick={() => navigate(homePath(brand))} className="text-gray-500 hover:text-gray-700 text-[0.9rem] cursor-pointer">Skip for now</button>
            <button
              onClick={() => setDone(true)}
              className="cta cta-primary bg-brand-primary text-white px-6 py-2.5 rounded-lg hover:shadow-lg hover:shadow-emerald-900/20 transition-all cursor-pointer flex items-center gap-2"
              style={{ fontWeight: 600 }}
            >
              Submit answers <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <Footer brand={brand} variant="compact" />
    </div>
  );
}
