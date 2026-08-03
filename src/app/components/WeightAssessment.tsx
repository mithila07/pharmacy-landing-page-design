import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router";
import { X, ArrowRight, ArrowLeft, Check, ShieldCheck, Scale, ClipboardList, Stethoscope, Ruler } from "lucide-react";
import type { Brand } from "../branding";
import {
  SCREENING, SCOFF, LIFESTYLE, COMORBIDITIES,
  computeBmi, bmiCategory, bmiEligible, evaluateWeight,
  type WQuestion,
} from "../data/weightAssessment";

/**
 * Patient-facing weight-management health check — a stepped wizard shown in the
 * same tall bottom-drawer as the eligibility chat. It gates booking for the
 * weight-management service.
 *
 * Clinical alerts are NEVER surfaced: the questionnaire's stop/caution flags run
 * silently (see evaluateWeight) and the patient only ever sees their BMI and a
 * friendly final result — "book your consultation" or "speak to your GP first".
 */

const STEPS = ["Measurements", "Your health", "Eating & lifestyle", "Result"] as const;

// ── One question card (single-select, with optional reveal-on-select text) ──
function QuestionCard({
  q, value, specify, onSelect, onSpecify,
}: {
  q: WQuestion;
  value: string | undefined;
  specify: string;
  onSelect: (v: string) => void;
  onSpecify: (v: string) => void;
}) {
  const chosen = q.choices.find((c) => c.value === value);
  return (
    <div className="rounded-2xl border bg-white p-4 sm:p-5 shadow-sm" style={{ borderColor: "var(--icare-line, #d3e3d8)" }}>
      <p className="text-[0.95rem] text-brand-primary leading-snug" style={{ fontWeight: 600 }}>{q.text}</p>
      {q.help && <p className="text-[0.8rem] text-brand-primary/50 mt-1 leading-snug">{q.help}</p>}
      <div className="mt-3 space-y-2">
        {q.choices.map((c) => {
          const on = value === c.value;
          return (
            <button
              key={c.value}
              onClick={() => onSelect(c.value)}
              className={`w-full flex items-center gap-3 text-left px-4 py-2.5 rounded-xl border-2 cursor-pointer transition-colors ${on ? "border-brand-secondary bg-brand-secondary/8" : "hover:bg-black/[0.02]"}`}
              style={!on ? { borderColor: "var(--icare-line, #d3e3d8)" } : undefined}
            >
              <span className={`w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center shrink-0 ${on ? "border-brand-secondary" : "border-brand-primary/30"}`} style={{ width: 18, height: 18 }}>
                {on && <span className="w-2.5 h-2.5 rounded-full bg-brand-secondary" />}
              </span>
              <span className="text-[0.9rem] text-brand-primary" style={{ fontWeight: 500 }}>{c.label}</span>
            </button>
          );
        })}
      </div>
      {chosen?.specify && (
        <input
          value={specify}
          onChange={(e) => onSpecify(e.target.value)}
          placeholder={chosen.specify}
          className="mt-3 w-full px-4 py-2.5 rounded-xl border-2 text-[0.9rem] text-brand-primary focus:outline-none focus:border-brand-secondary"
          style={{ borderColor: "var(--icare-line, #d3e3d8)" }}
        />
      )}
    </div>
  );
}

export function WeightAssessment({ brand, open, onClose, onEligible, onResult }: {
  brand: Brand;
  open: boolean;
  onClose: () => void;
  onEligible: () => void;
  /** Reports the final result to the host (true = eligible). */
  onResult?: (eligible: boolean) => void;
}) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [specifies, setSpecifies] = useState<Record<string, string>>({});
  const [heightCm, setHeightCm] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [waistCm, setWaistCm] = useState("");
  const [comorbid, setComorbid] = useState<Set<string>>(new Set());
  const bodyRef = useRef<HTMLDivElement>(null);

  const reset = () => {
    setStep(0); setAnswers({}); setSpecifies({});
    setHeightCm(""); setWeightKg(""); setWaistCm(""); setComorbid(new Set());
  };

  useEffect(() => { if (open) reset(); }, [open]);

  // Lock background scroll while open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  // Scroll the panel body to top on step change.
  useEffect(() => { bodyRef.current?.scrollTo({ top: 0, behavior: "instant" }); }, [step]);

  const bmi = useMemo(() => computeBmi(parseFloat(heightCm), parseFloat(weightKg)), [heightCm, weightKg]);
  const needsComorbidity = bmi != null && bmi >= 27 && bmi < 30;

  const result = useMemo(
    () => evaluateWeight({ answers, bmi, comorbidityCount: comorbid.size }),
    [answers, bmi, comorbid],
  );

  const select = (id: string, v: string) => setAnswers((a) => ({ ...a, [id]: v }));
  const setSpecify = (id: string, v: string) => setSpecifies((s) => ({ ...s, [id]: v }));
  const toggleComorbid = (label: string) =>
    setComorbid((s) => { const n = new Set(s); n.has(label) ? n.delete(label) : n.add(label); return n; });

  // Per-step completeness gates the "Next" button.
  const allAnswered = (qs: WQuestion[]) => qs.every((q) => answers[q.id] != null);
  const stepValid = [
    bmi != null && (!needsComorbidity || comorbid.size > 0), // measurements
    allAnswered(SCREENING),
    allAnswered([...SCOFF, ...LIFESTYLE]),
    true,
  ][step];

  // Tell the host once the result screen is reached.
  useEffect(() => {
    if (open && step === 3) onResult?.(result.eligible);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  if (!open) return null;

  const next = () => setStep((s) => Math.min(STEPS.length - 1, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));

  return createPortal(
    <div
      className={`elig-overlay fixed inset-0 z-[70] flex items-end justify-center bg-brand-primary/45 backdrop-blur-sm ${brand.themeClass}`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Weight management health check"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="elig-panel bg-[#f6f8f8] flex flex-col overflow-hidden shadow-2xl w-full max-w-3xl h-[94dvh] rounded-t-3xl"
      >
        {/* Grab handle */}
        <div className="flex justify-center pt-2.5 pb-1 shrink-0">
          <span className="h-1.5 w-10 rounded-full bg-brand-primary/15" />
        </div>

        {/* Header + progress */}
        <div className="px-4 sm:px-6 pt-2 pb-3 border-b bg-white shrink-0" style={{ borderColor: "var(--icare-line, #d3e3d8)" }}>
          <div className="flex items-center gap-3 mb-3">
            <span className="w-10 h-10 rounded-full bg-brand-light flex items-center justify-center shrink-0">
              <img src={brand.logoMark ?? brand.logo} alt="" className="w-7 h-7 object-contain" />
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-brand-primary text-[0.95rem] leading-tight" style={{ fontWeight: 700 }}>Weight management health check</p>
              <p className="text-brand-primary/50 text-[0.78rem] truncate">Private service · pharmacist-assessed</p>
            </div>
            <button onClick={onClose} className="text-brand-primary/40 hover:text-brand-primary cursor-pointer p-1 shrink-0" aria-label="Close"><X size={22} /></button>
          </div>
          {/* Step rail */}
          <div className="flex items-center gap-1.5">
            {STEPS.map((label, i) => (
              <div key={label} className="flex-1">
                <div className={`h-1.5 rounded-full transition-colors ${i < step ? "bg-brand-secondary" : i === step ? "bg-brand-primary" : "bg-brand-primary/12"}`} />
                <span className={`hidden sm:block mt-1.5 text-[0.68rem] ${i === step ? "text-brand-primary" : "text-brand-primary/40"}`} style={{ fontWeight: i === step ? 700 : 500 }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Body */}
        <div ref={bodyRef} className="flex-1 min-h-0 overflow-y-auto px-4 sm:px-6 py-5 space-y-3">
          {step === 0 && (
            <>
              <div className="flex items-center gap-2 text-brand-primary/60 text-[0.82rem] mb-1"><Ruler size={15} /> A couple of measurements to start.</div>
              <div className="rounded-2xl border bg-white p-4 sm:p-5 shadow-sm space-y-4" style={{ borderColor: "var(--icare-line, #d3e3d8)" }}>
                <div className="grid grid-cols-2 gap-3">
                  <label className="block">
                    <span className="text-[0.8rem] text-brand-primary/70" style={{ fontWeight: 600 }}>Height (cm) *</span>
                    <input inputMode="numeric" value={heightCm} onChange={(e) => setHeightCm(e.target.value.replace(/[^\d.]/g, ""))} placeholder="e.g. 170" className="mt-1 w-full px-4 py-2.5 rounded-xl border-2 text-[0.95rem] text-brand-primary focus:outline-none focus:border-brand-secondary" style={{ borderColor: "var(--icare-line, #d3e3d8)" }} />
                  </label>
                  <label className="block">
                    <span className="text-[0.8rem] text-brand-primary/70" style={{ fontWeight: 600 }}>Weight (kg) *</span>
                    <input inputMode="numeric" value={weightKg} onChange={(e) => setWeightKg(e.target.value.replace(/[^\d.]/g, ""))} placeholder="e.g. 85" className="mt-1 w-full px-4 py-2.5 rounded-xl border-2 text-[0.95rem] text-brand-primary focus:outline-none focus:border-brand-secondary" style={{ borderColor: "var(--icare-line, #d3e3d8)" }} />
                  </label>
                </div>
                <label className="block">
                  <span className="text-[0.8rem] text-brand-primary/70" style={{ fontWeight: 600 }}>Waist (cm) <span className="text-brand-primary/40">— optional</span></span>
                  <input inputMode="numeric" value={waistCm} onChange={(e) => setWaistCm(e.target.value.replace(/[^\d.]/g, ""))} placeholder="e.g. 95" className="mt-1 w-full px-4 py-2.5 rounded-xl border-2 text-[0.95rem] text-brand-primary focus:outline-none focus:border-brand-secondary" style={{ borderColor: "var(--icare-line, #d3e3d8)" }} />
                </label>

                {bmi != null && (
                  <div className="rounded-xl bg-brand-primary text-white px-4 py-3.5 flex items-center justify-between">
                    <div>
                      <p className="text-[0.7rem] uppercase tracking-wide text-white/55" style={{ fontWeight: 600 }}>Your BMI</p>
                      <p className="text-[1.8rem] leading-none mt-0.5" style={{ fontWeight: 700 }}>{bmi.toFixed(1)}</p>
                    </div>
                    <span className="text-[0.8rem] px-3 py-1.5 rounded-full bg-white/15" style={{ fontWeight: 600 }}>{bmiCategory(bmi)}</span>
                  </div>
                )}
              </div>

              {needsComorbidity && (
                <div className="rounded-2xl border bg-white p-4 sm:p-5 shadow-sm" style={{ borderColor: "var(--icare-line, #d3e3d8)" }}>
                  <p className="text-[0.95rem] text-brand-primary leading-snug" style={{ fontWeight: 600 }}>Do any of these apply to you?</p>
                  <p className="text-[0.8rem] text-brand-primary/50 mt-1 mb-3 leading-snug">Tick any that you've been told you have — or leave blank if none.</p>
                  <div className="space-y-2">
                    {COMORBIDITIES.map((c) => {
                      const on = comorbid.has(c);
                      return (
                        <button key={c} onClick={() => toggleComorbid(c)} className={`w-full flex items-center gap-3 text-left px-4 py-2.5 rounded-xl border-2 cursor-pointer transition-colors ${on ? "border-brand-secondary bg-brand-secondary/8" : "hover:bg-black/[0.02]"}`} style={!on ? { borderColor: "var(--icare-line, #d3e3d8)" } : undefined}>
                          <span className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 ${on ? "bg-brand-secondary border-brand-secondary text-white" : "border-brand-primary/30"}`}>{on && <Check size={13} />}</span>
                          <span className="text-[0.9rem] text-brand-primary" style={{ fontWeight: 500 }}>{c}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}

          {step === 1 && (
            <>
              <div className="flex items-center gap-2 text-brand-primary/60 text-[0.82rem] mb-1"><Stethoscope size={15} /> A few health questions. Your answers stay private.</div>
              {SCREENING.map((q) => (
                <QuestionCard key={q.id} q={q} value={answers[q.id]} specify={specifies[q.id] ?? ""} onSelect={(v) => select(q.id, v)} onSpecify={(v) => setSpecify(q.id, v)} />
              ))}
            </>
          )}

          {step === 2 && (
            <>
              <div className="flex items-center gap-2 text-brand-primary/60 text-[0.82rem] mb-1"><ClipboardList size={15} /> Just a few more.</div>
              {[...SCOFF, ...LIFESTYLE].map((q) => (
                <QuestionCard key={q.id} q={q} value={answers[q.id]} specify={specifies[q.id] ?? ""} onSelect={(v) => select(q.id, v)} onSpecify={(v) => setSpecify(q.id, v)} />
              ))}
            </>
          )}

          {step === 3 && (
            <div className="pt-2">
              <div className="rounded-2xl border bg-white p-6 shadow-sm text-center" style={{ borderColor: "var(--icare-line, #d3e3d8)" }}>
                {result.eligible ? (
                  <>
                    <span className="w-14 h-14 rounded-2xl bg-brand-secondary/12 text-brand-green-ink flex items-center justify-center mx-auto mb-4"><ShieldCheck size={26} /></span>
                    <h3 className="font-display text-brand-primary text-[1.3rem] leading-tight mb-2" style={{ fontWeight: 700 }}>You can book your consultation</h3>
                    <p className="text-[0.92rem] text-brand-primary/70 leading-relaxed max-w-md mx-auto mb-6">
                      Thanks — from your answers you're able to book a weight-management consultation. The pharmacist will go through everything with you and confirm the right option before any treatment is supplied.
                    </p>
                    <button onClick={onEligible} className="cta cta-primary w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full cursor-pointer" style={{ fontWeight: 700 }}>
                      Continue to booking <ArrowRight size={16} />
                    </button>
                  </>
                ) : (
                  <>
                    <span className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-4"><Stethoscope size={26} /></span>
                    <h3 className="font-display text-brand-primary text-[1.3rem] leading-tight mb-2" style={{ fontWeight: 700 }}>Let's get you the right care</h3>
                    <p className="text-[0.92rem] text-brand-primary/70 leading-relaxed max-w-md mx-auto mb-6">
                      From your answers, this service may not be the safest fit for you right now. We'd recommend speaking to your GP first — they can advise on the best options for you. If anything's changed, you're welcome to check again.
                    </p>
                    <div className="flex gap-2.5">
                      <button onClick={() => setStep(0)} className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full border text-[0.88rem] cursor-pointer hover:bg-black/[0.03] transition-colors" style={{ borderColor: "var(--icare-line, #d3e3d8)", fontWeight: 600 }}>Start again</button>
                      <button onClick={onClose} className="flex-1 inline-flex items-center justify-center px-4 py-2.5 rounded-full text-brand-primary/60 hover:text-brand-primary text-[0.88rem] cursor-pointer" style={{ fontWeight: 600 }}>Close</button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer nav (hidden on the result step, which carries its own actions) */}
        {step < 3 && (
          <div className="shrink-0 border-t bg-white px-4 sm:px-6 py-3 flex items-center justify-between gap-3 shadow-[0_-10px_24px_-16px_rgba(16,24,40,0.18)]" style={{ borderColor: "var(--icare-line, #d3e3d8)" }}>
            {step > 0 ? (
              <button onClick={back} className="inline-flex items-center gap-1.5 text-brand-primary/60 hover:text-brand-primary text-[0.9rem] cursor-pointer" style={{ fontWeight: 600 }}><ArrowLeft size={15} /> Back</button>
            ) : <span className="text-[0.78rem] text-brand-primary/40 inline-flex items-center gap-1.5"><Scale size={13} /> Takes 2–3 minutes</span>}
            <button
              onClick={next}
              disabled={!stepValid}
              className="cta cta-primary inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ fontWeight: 700 }}
            >
              {step === 2 ? "See result" : "Continue"} <ArrowRight size={15} />
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}

// ── Inline gate shown in the booking page's triage stage ──
export function WeightAssessmentGate({ brand, blocked, onStart }: { brand: Brand; blocked: boolean; onStart: () => void }) {
  const navigate = useNavigate();
  if (blocked) {
    return (
      <div className="max-w-xl mx-auto bg-white rounded-2xl border shadow-sm p-6 sm:p-8 text-center" style={{ borderColor: "var(--icare-line, #d3e3d8)" }}>
        <span className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-4"><Stethoscope size={26} /></span>
        <h3 className="font-display text-brand-primary text-[1.4rem] leading-tight mb-2" style={{ fontWeight: 700 }}>Let's get you the right care</h3>
        <p className="text-brand-primary/60 text-[0.95rem] leading-relaxed max-w-md mx-auto mb-6">
          From your answers, this service may not be the safest fit right now. We'd recommend speaking to your GP first. If anything's changed, you can check again.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button onClick={onStart} className="cta cta-primary inline-flex items-center gap-2 px-6 py-3 rounded-full cursor-pointer" style={{ fontWeight: 700 }}>Check again</button>
          <button onClick={() => navigate(brand.basePath || "/")} className="text-brand-primary/60 hover:text-brand-primary text-[0.9rem] cursor-pointer" style={{ fontWeight: 600 }}>Back to home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl border shadow-sm p-6 sm:p-8 text-center" style={{ borderColor: "var(--icare-line, #d3e3d8)" }}>
      <span className="w-14 h-14 rounded-2xl bg-brand-secondary/12 text-brand-green-ink flex items-center justify-center mx-auto mb-4"><Scale size={26} /></span>
      <h3 className="font-display text-brand-primary text-[1.4rem] leading-tight mb-2" style={{ fontWeight: 700 }}>Quick health check</h3>
      <p className="text-brand-primary/60 text-[0.95rem] leading-relaxed max-w-md mx-auto mb-6">
        Before booking a weight-management consultation, we ask a few questions and take your BMI to make sure it's safe and suitable for you. It takes 2–3 minutes and stays private.
      </p>
      <button onClick={onStart} className="cta cta-primary inline-flex items-center gap-2 px-7 py-3.5 rounded-full cursor-pointer" style={{ fontWeight: 700 }}>
        Start health check <ArrowRight size={16} />
      </button>
      <p className="text-[0.78rem] text-brand-primary/40 mt-4 flex items-center justify-center gap-1.5"><ShieldCheck size={13} /> Private · pharmacist-assessed</p>
    </div>
  );
}
