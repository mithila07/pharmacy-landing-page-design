import { useEffect, useRef, useState, type FormEvent } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import type { Brand } from "../../branding";
import { Checkbox, ChoiceGroup, ErrorSummary, Field, TextInput, inputBase, borderFor, isEmail, isUkPhone, submitForm, type Errors } from "./formKit";

type Topic = "prescriptions" | "services" | "something-else";
const EMPTY = { name: "", email: "", phone: "", topic: "" as Topic | "", message: "", consent: false };
type Data = typeof EMPTY;
const ORDER: (keyof Data)[] = ["name", "email", "phone", "topic", "message", "consent"];

function validate(d: Data): Errors {
  const e: Errors = {};
  if (!d.name.trim()) e.name = "Enter your name";
  if (!d.email.trim() && !d.phone.trim()) e.email = "Give us an email or a phone number so we can reply";
  if (d.email.trim() && !isEmail(d.email)) e.email = "Enter an email address like name@example.com";
  if (d.phone.trim() && !isUkPhone(d.phone)) e.phone = "Enter a UK phone number, for example 07700 900982";
  if (!d.topic) e.topic = "Choose what your question is about";
  if (d.message.trim().length < 10) e.message = d.message.trim() ? "Tell us a little more (10 characters or more)" : "Enter your question";
  if (!d.consent) e.consent = "Confirm we can contact you about your question";
  return e;
}

/** General enquiries. Asks for email or phone (at least one), never both. */
export function EnquiryForm({ brand, endpoint }: { brand: Brand; endpoint?: string }) {
  const [d, setD] = useState<Data>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "preview" | "failed">("idle");
  const [attempt, setAttempt] = useState(0);
  const summaryRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);

  const set = <K extends keyof Data>(k: K, v: Data[K]) => {
    setD((p) => ({ ...p, [k]: v }));
    if (errors[k as string]) setErrors((p) => ({ ...p, [k]: undefined, ...(k === "phone" || k === "email" ? { email: undefined, phone: undefined } : {}) }));
  };

  useEffect(() => { if (attempt) summaryRef.current?.focus(); }, [attempt]);
  useEffect(() => { if (status === "sent" || status === "preview") doneRef.current?.focus(); }, [status]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const found = validate(d);
    setErrors(found);
    if (Object.values(found).some(Boolean)) { setAttempt((n) => n + 1); return; }
    setStatus("sending");
    setStatus(await submitForm(endpoint, "enquiry", d));
  };

  if (status === "sent" || status === "preview") {
    return (
      <div ref={doneRef} tabIndex={-1} role="status" className="outline-none py-4">
        <CheckCircle2 size={44} strokeWidth={1.75} className="text-brand-secondary" aria-hidden="true" />
        <h3 className="mt-4 text-[1.6rem] text-brand-primary" style={{ fontWeight: 800, letterSpacing: "-0.015em" }}>Thanks, {d.name.split(" ")[0]}. Your question is with us.</h3>
        <p className="mt-2 text-slate-600 text-[1.02rem] leading-relaxed max-w-[52ch]">
          A member of the team will reply by {d.email ? "email" : "phone"}, usually within one working day. For anything urgent, call us on {brand.locations[0].phone}.
        </p>
        {status === "preview" && (
          <p className="mt-6 text-[0.85rem] text-slate-500 border-t border-slate-200 pt-4">Preview site: this message wasn't sent anywhere. It will be once the form is connected to the pharmacy's inbox.</p>
        )}
        <button type="button" onClick={() => { setD(EMPTY); setStatus("idle"); }} className="mt-6 text-brand-secondary underline underline-offset-4 min-h-[44px] cursor-pointer" style={{ fontWeight: 700 }}>
          Ask another question
        </button>
      </div>
    );
  }

  const anchor = (k: string) => (k === "topic" ? "choice-topic" : k === "consent" ? "enquiryConsent" : k);
  const errorList = ORDER.filter((k) => errors[k]).map((k) => [anchor(k), errors[k]!] as [string, string]);

  return (
    <form noValidate onSubmit={submit} className="grid gap-6">
      <ErrorSummary errors={errorList} refEl={summaryRef} />
      <Field id="name" label="Your name" error={errors.name}>
        <TextInput id="name" autoComplete="name" value={d.name} onChange={(e) => set("name", e.target.value)} error={errors.name} className="sm:max-w-[26rem]" />
      </Field>
      <div className="grid sm:grid-cols-2 gap-5">
        <Field id="email" label="Email" hint="Give us an email, a phone number, or both." error={errors.email}>
          <TextInput id="email" hint type="email" autoComplete="email" spellCheck={false} value={d.email} onChange={(e) => set("email", e.target.value)} error={errors.email} />
        </Field>
        <Field id="phone" label="Phone number" optional error={errors.phone}>
          <TextInput id="phone" type="tel" autoComplete="tel" value={d.phone} onChange={(e) => set("phone", e.target.value)} error={errors.phone} className="sm:mt-[1.6rem]" />
        </Field>
      </div>
      <ChoiceGroup<Topic>
        name="topic"
        legend="What's it about?"
        value={d.topic}
        onChange={(v) => set("topic", v)}
        error={errors.topic}
        options={[{ value: "prescriptions", label: "Prescriptions" }, { value: "services", label: "Services and appointments" }, { value: "something-else", label: "Something else" }]}
      />
      <Field id="message" label="Your question" hint="Please don't include detailed medical information. For medical advice, call us or NHS 111." error={errors.message}>
        <textarea
          id="message"
          rows={5}
          value={d.message}
          onChange={(e) => set("message", e.target.value)}
          aria-invalid={!!errors.message}
          aria-describedby={["message-hint", errors.message ? "message-error" : ""].filter(Boolean).join(" ")}
          className={`${inputBase} ${borderFor(errors.message)} py-3 min-h-[140px] resize-y`}
        />
      </Field>
      <Checkbox id="enquiryConsent" checked={d.consent} onChange={(v) => set("consent", v)} error={errors.consent}>
        I'm happy for {brand.name} to contact me about my question.
      </Checkbox>
      {status === "failed" && (
        <p role="alert" className="rounded-xl border-2 border-red-600 bg-red-50/60 p-4 text-[0.95rem] text-slate-800">
          Your message didn't go through. Check your connection and try again, or call us on {brand.locations[0].phone}.
        </p>
      )}
      <div>
        <button type="submit" disabled={status === "sending"} className="inline-flex items-center justify-center gap-2 min-h-[48px] px-7 rounded-xl bg-brand-secondary text-white hover:brightness-110 disabled:opacity-70 cursor-pointer" style={{ fontWeight: 700 }}>
          {status === "sending" ? <><Loader2 size={18} aria-hidden="true" /> Sending</> : "Send question"}
        </button>
      </div>
    </form>
  );
}
