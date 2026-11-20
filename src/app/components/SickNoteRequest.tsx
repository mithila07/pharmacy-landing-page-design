import { useState, type ReactNode } from "react";
import { AlertTriangle, CheckCircle, ChevronRight, FileText, Phone, ShieldCheck, Stethoscope } from "lucide-react";
import {
  COMMON_REASONS, GYM_DURATIONS, GYM_REASONS, NOTE_TYPES, RED_FLAGS, SICK_NOTE_RULES,
  addDays, coverLine, daysBetween, illnessComplete, isoDay, noteTypeName,
  type NoteTypeId, type SickNoteRequest, type YesNo,
} from "../data/sickNote";

/**
 * The "Your request" stage of the booking flow for a private sick note: choose
 * the note, answer a few questions, then a safety check and consent. Takes the
 * place of the date & time stage: nothing is booked, a doctor reviews it.
 */

const STEPS = ["Choose your note", "About your illness", "Safety check"];

const input = "w-full px-4 py-2.5 border border-brand-primary/30 rounded-lg text-[0.9rem] bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/30";

function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <div>
      <label className="text-[0.88rem] text-gray-800 mb-1.5 block" style={{ fontWeight: 600 }}>{label}</label>
      {hint && <p className="text-[0.8rem] text-gray-500 -mt-0.5 mb-2">{hint}</p>}
      {children}
    </div>
  );
}

/** Tap-to-pick options (radio group). */
function Chips({ options, value, onPick, label }: { options: string[]; value: string; onPick: (v: string) => void; label: string }) {
  return (
    <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          role="radio"
          aria-checked={value === o}
          onClick={() => onPick(o)}
          className={`px-3.5 py-2 rounded-full border text-[0.85rem] transition-colors cursor-pointer ${value === o ? "border-brand-primary bg-brand-primary text-white" : "border-gray-200 text-gray-700 bg-white hover:border-brand-primary/50"}`}
          style={{ fontWeight: 500 }}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

function YesNoPick({ value, onPick, label }: { value: YesNo; onPick: (v: YesNo) => void; label: string }) {
  return <Chips label={label} options={["Yes", "No"]} value={value === "yes" ? "Yes" : value === "no" ? "No" : ""} onPick={(v) => onPick(v === "Yes" ? "yes" : "no")} />;
}

function NavRow({ onBack, onNext, nextLabel = "Continue", disabled }: { onBack?: () => void; onNext: () => void; nextLabel?: string; disabled?: boolean }) {
  return (
    <div className="mt-8 flex items-center justify-between gap-3">
      {onBack ? <button type="button" onClick={onBack} className="text-gray-500 hover:text-gray-700 text-[0.9rem] cursor-pointer">Back</button> : <span />}
      <button
        type="button"
        disabled={disabled}
        onClick={onNext}
        className="cta cta-primary bg-brand-primary text-white px-6 py-2.5 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
        style={{ fontWeight: 600 }}
      >
        {nextLabel} <ChevronRight size={16} />
      </button>
    </div>
  );
}

export function SickNoteRequestStage({ value, onChange, onDone, priceLabel }: {
  value: SickNoteRequest;
  onChange: (v: SickNoteRequest) => void;
  onDone: () => void;
  priceLabel?: string;
}) {
  const [step, setStep] = useState(0);
  const set = (patch: Partial<SickNoteRequest>) => onChange({ ...value, ...patch });
  const today = isoDay(new Date());
  const earliest = addDays(today, -SICK_NOTE_RULES.maxBackdateDays);
  const go = (n: number) => { setStep(n); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      {/* Who reviews it, and what it costs */}
      <div className="flex items-start gap-3 rounded-xl bg-gradient-to-br from-brand-light to-brand-light-alt p-4 mb-6">
        <span className="w-10 h-10 rounded-lg bg-white/80 text-brand-primary flex items-center justify-center shrink-0"><Stethoscope size={20} /></span>
        <div className="text-[0.85rem] text-gray-700 leading-relaxed">
          <p className="text-gray-900" style={{ fontWeight: 600 }}>No appointment needed</p>
          <p>Answer a few questions and a UK-registered doctor reviews your request, {SICK_NOTE_RULES.turnaround}. If it's approved, your note is emailed to you as a PDF.{priceLabel ? ` ${priceLabel}.` : ""}</p>
        </div>
      </div>

      {/* Mini progress */}
      <ol className="flex items-center gap-2 mb-6" aria-label="Request progress">
        {STEPS.map((s, i) => (
          <li key={s} className="flex items-center gap-2 flex-1 min-w-0" aria-current={i === step ? "step" : undefined}>
            <span className={`h-1.5 rounded-full flex-1 ${i <= step ? "bg-brand-primary" : "bg-gray-200"}`} />
          </li>
        ))}
      </ol>
      <h3 className="text-gray-900 text-[1.1rem] mb-5" style={{ fontWeight: 700 }}>{STEPS[step]}</h3>

      {step === 0 && (
        <>
          <div role="radiogroup" aria-label="Type of note" className="grid sm:grid-cols-2 gap-3">
            {NOTE_TYPES.map((t) => {
              const on = value.type === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={() => set({ type: t.id as NoteTypeId })}
                  className={`relative text-left p-4 rounded-xl border-2 transition-all cursor-pointer ${on ? "border-brand-primary bg-brand-primary/5" : "border-gray-100 hover:border-gray-300"}`}
                >
                  {t.popular && <span className="absolute top-3 right-3 text-[0.7rem] px-2 py-0.5 rounded-full bg-brand-secondary/12 text-brand-green-ink" style={{ fontWeight: 600 }}>Most requested</span>}
                  <FileText size={20} className={on ? "text-brand-primary mb-2" : "text-gray-400 mb-2"} />
                  <span className={`block text-[0.95rem] pr-24 ${on ? "text-brand-primary" : "text-gray-900"}`} style={{ fontWeight: 700 }}>{t.name}</span>
                  <span className="block text-[0.82rem] text-gray-500 mt-1">{t.desc}</span>
                </button>
              );
            })}
          </div>
          <p className="text-[0.8rem] text-gray-500 mt-4">This is a private note, not an NHS fit note. Off work for more than {SICK_NOTE_RULES.maxDays} days? You'll need a fit note from your GP or hospital.</p>
          <NavRow onNext={() => go(1)} disabled={!value.type} />
        </>
      )}

      {step === 1 && (
        <div className="space-y-6">
          {value.type !== "gym" && (
            <Field label={value.type === "fit-return" ? "What were you off with?" : "What's the main reason?"}>
              <Chips label="Main reason" options={COMMON_REASONS} value={value.reason} onPick={(v) => set({ reason: v })} />
            </Field>
          )}

          {value.type === "gym" && (
            <>
              <Field label="Why do you need to stop going?">
                <Chips label="Reason" options={GYM_REASONS} value={value.gymReason} onPick={(v) => set({ gymReason: v })} />
              </Field>
              <Field label="For how long?">
                <Chips label="How long" options={GYM_DURATIONS} value={value.gymDuration} onPick={(v) => set({ gymDuration: v })} />
              </Field>
            </>
          )}

          {(value.type === "work" || value.type === "travel") && (
            <Field label="When did your symptoms start?">
              <input type="date" max={today} value={value.startedOn} onChange={(e) => set({ startedOn: e.target.value })} className={`${input} sm:max-w-xs`} />
            </Field>
          )}

          {value.type === "work" && (() => {
            const span = value.from && value.to ? daysBetween(value.from, value.to) + 1 : 0;
            const tooLong = span > SICK_NOTE_RULES.maxDays;
            const tooEarly = !!value.from && value.from < earliest;
            const beforeSymptoms = !!value.from && !!value.startedOn && value.from < value.startedOn;
            return (
              <Field label="Which days should the note cover?" hint={`Up to ${SICK_NOTE_RULES.maxDays} days. The first day can be up to ${SICK_NOTE_RULES.maxBackdateDays} days ago.`}>
                <div className="grid grid-cols-2 gap-3 sm:max-w-md">
                  <div>
                    <span className="text-[0.78rem] text-gray-500 block mb-1">First day off</span>
                    <input type="date" min={earliest} max={addDays(today, 3)} value={value.from} onChange={(e) => set({ from: e.target.value, to: value.to && value.to < e.target.value ? e.target.value : value.to })} className={input} aria-label="First day off" />
                  </div>
                  <div>
                    <span className="text-[0.78rem] text-gray-500 block mb-1">Last day off</span>
                    <input type="date" min={value.from || earliest} max={value.from ? addDays(value.from, SICK_NOTE_RULES.maxDays - 1) : undefined} value={value.to} onChange={(e) => set({ to: e.target.value })} className={input} aria-label="Last day off" />
                  </div>
                </div>
                {span > 0 && !tooLong && !tooEarly && <p className="text-[0.82rem] text-brand-green-ink mt-2 flex items-center gap-1.5"><CheckCircle size={14} /> {coverLine(value)}</p>}
                {tooEarly && <p className="text-[0.82rem] text-amber-700 mt-2">The first day can be no more than {SICK_NOTE_RULES.maxBackdateDays} days ago.</p>}
                {tooLong && <p className="text-[0.82rem] text-amber-700 mt-2">A private note covers up to {SICK_NOTE_RULES.maxDays} days. For longer, please see your GP for a fit note.</p>}
                {beforeSymptoms && <p className="text-[0.82rem] text-amber-700 mt-2">The first day off can't be before your symptoms started.</p>}
              </Field>
            );
          })()}

          {value.type === "travel" && (
            <Field label="When were you due to travel?">
              <input type="date" value={value.travelDate} onChange={(e) => set({ travelDate: e.target.value })} className={`${input} sm:max-w-xs`} />
            </Field>
          )}

          {value.type === "fit-return" && (
            <>
              <div className="grid grid-cols-2 gap-3 sm:max-w-md">
                <Field label="Off since">
                  <input type="date" max={today} value={value.from} onChange={(e) => set({ from: e.target.value })} className={input} />
                </Field>
                <Field label="Back from">
                  <input type="date" min={value.from || undefined} value={value.returnDate} onChange={(e) => set({ returnDate: e.target.value })} className={input} />
                </Field>
              </div>
              <Field label="Do you need any changes when you go back?" hint="For example lighter duties or shorter hours for a while.">
                <YesNoPick label="Changes needed" value={value.adjustments} onPick={(v) => set({ adjustments: v })} />
                {value.adjustments === "yes" && (
                  <input value={value.adjustmentsDetail} onChange={(e) => set({ adjustmentsDetail: e.target.value })} className={`${input} mt-3`} placeholder="What would help?" />
                )}
              </Field>
            </>
          )}

          {value.type === "work" && (
            <Field label="Have you been off with this in the last 4 weeks?">
              <YesNoPick label="Off with this before" value={value.offBefore} onPick={(v) => set({ offBefore: v })} />
            </Field>
          )}

          <Field label="Tell the doctor what's been happening" hint="Your symptoms, how they affect you, and anything you've tried. A few sentences is fine.">
            <textarea value={value.details} onChange={(e) => set({ details: e.target.value })} rows={4} className={`${input} resize-none`} placeholder="For example: I've had a high temperature and a cough since Monday and can't get out of bed." />
            {value.details.trim().length > 0 && value.details.trim().length < 20 && <p className="text-[0.78rem] text-gray-500 mt-1">A little more detail, please.</p>}
          </Field>

          <Field label={value.type === "gym" ? "Gym name (optional)" : value.type === "travel" ? "Travel company or insurer (optional)" : "Employer, college or school (optional)"} hint="We'll put this on the note if you add it.">
            <input value={value.organisation} onChange={(e) => set({ organisation: e.target.value })} className={`${input} sm:max-w-md`} />
          </Field>

          <NavRow onBack={() => go(0)} onNext={() => go(2)} disabled={!illnessComplete(value, today)} />
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <Field label="Do you have any of these right now?">
            <ul className="mb-3 space-y-1.5 text-[0.88rem] text-gray-700">
              {RED_FLAGS.map((f) => <li key={f} className="flex gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 shrink-0" />{f}</li>)}
            </ul>
            <YesNoPick label="Any of these symptoms" value={value.redFlag} onPick={(v) => set({ redFlag: v })} />
          </Field>

          {value.redFlag === "yes" ? (
            <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-5">
              <p className="text-red-800 flex items-center gap-2 text-[1rem]" style={{ fontWeight: 700 }}><AlertTriangle size={18} /> Please get help now</p>
              <p className="text-[0.88rem] text-red-900/80 mt-2">A sick note isn't the right step today. Call <strong>999</strong> or go to A&amp;E if it's an emergency, or call <strong>NHS 111</strong> for urgent advice. If you're having thoughts of harming yourself, you can call Samaritans free on <strong>116 123</strong>, any time.</p>
              <div className="flex flex-wrap gap-2 mt-4">
                <a href="tel:999" className="inline-flex items-center gap-1.5 rounded-lg bg-red-600 text-white px-4 py-2 text-[0.88rem] no-underline" style={{ fontWeight: 600 }}><Phone size={15} /> Call 999</a>
                <a href="tel:111" className="inline-flex items-center gap-1.5 rounded-lg border border-red-300 bg-white text-red-700 px-4 py-2 text-[0.88rem] no-underline" style={{ fontWeight: 600 }}><Phone size={15} /> Call 111</a>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <label className="flex items-start gap-3 rounded-lg border border-brand-primary/20 bg-brand-light/40 p-4 cursor-pointer">
                <input type="checkbox" checked={value.consentTrue} onChange={(e) => set({ consentTrue: e.target.checked })} className="mt-0.5 w-4 h-4 accent-[var(--brand-primary)] cursor-pointer" />
                <span className="text-[0.88rem] text-gray-700">What I've told you is true. The doctor may call me to ask more, and may decide a note isn't right for me.</span>
              </label>
              <label className="flex items-start gap-3 rounded-lg border border-brand-primary/20 bg-brand-light/40 p-4 cursor-pointer">
                <input type="checkbox" checked={value.consentPrivate} onChange={(e) => set({ consentPrivate: e.target.checked })} className="mt-0.5 w-4 h-4 accent-[var(--brand-primary)] cursor-pointer" />
                <span className="text-[0.88rem] text-gray-700">I understand this is a private {noteTypeName(value.type).toLowerCase() || "note"}, not an NHS fit note, and it's up to my {value.type === "gym" ? "gym" : value.type === "travel" ? "insurer" : "employer or college"} whether they accept it.</span>
              </label>
              <p className="text-[0.8rem] text-gray-500 flex items-center gap-1.5"><ShieldCheck size={14} className="text-brand-accent" /> Your answers are only shared with the reviewing doctor.</p>
            </div>
          )}

          <NavRow onBack={() => go(1)} onNext={onDone} nextLabel="Continue to your details" disabled={value.redFlag !== "no" || !value.consentTrue || !value.consentPrivate} />
        </div>
      )}
    </div>
  );
}

/** Compact summary shown above the later stages, with a way back to edit. */
export function SickNoteSummary({ value, onChange }: { value: SickNoteRequest; onChange: () => void }) {
  const what = value.type === "gym" ? value.gymReason : value.reason;
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-[0.85rem] text-gray-900" style={{ fontWeight: 600 }}>Your request</h4>
        <button type="button" onClick={onChange} className="text-[0.8rem] text-brand-primary hover:text-brand-primary-hover cursor-pointer" style={{ fontWeight: 500 }}>Change</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { k: "Note", v: noteTypeName(value.type) },
          { k: "Reason", v: what },
          { k: "Covers", v: coverLine(value) },
        ].map((r) => (
          <div key={r.k} className="bg-gradient-to-br from-brand-light to-brand-light-alt rounded-lg px-4 py-3">
            <p className="text-[0.72rem] text-gray-400 mb-0.5" style={{ fontWeight: 500 }}>{r.k}</p>
            <p className="text-[0.88rem] text-gray-900" style={{ fontWeight: 600 }}>{r.v || "—"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
