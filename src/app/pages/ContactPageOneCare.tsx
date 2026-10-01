import { useEffect, useRef, useState, type FormEvent } from "react";
import { onecareBrand } from "../branding";
import contactHero from "../../assets/onecare/contact-hero.webp";
import { OC_BRANCHES, OC_CONTACT_ENDPOINT, OC_LEGAL, ic, isTbc } from "../data/onecare";
import { useSeo, JsonLd } from "../seo";
import { useOcReveal } from "../onecareMotion";
import { HeaderOneCare } from "../components/HeaderOneCare";
import { FooterOneCare } from "../components/FooterOneCare";
import { BranchDetailCard } from "../components/BranchesOneCare";
import { BTN_PRIMARY, Icon3D, OneCareBranchProvider, Tbc } from "../components/onecareUi";

/** Error marker: a solid "!" disc, paired with the message text. */
const ErrorMark = () => (
  <span aria-hidden="true" className="mt-px w-[18px] h-[18px] shrink-0 rounded-full bg-oc-error text-white text-[12px] font-bold leading-none grid place-items-center">!</span>
);
import { useOneCarePage } from "./onecarePage";

type Fields = { name: string; email: string; phone: string; branch: string; message: string; consent: boolean };
type Errors = Partial<Record<keyof Fields, string>>;
type Status = "idle" | "sending" | "sent" | "failed" | "offline";

const EMPTY: Fields = { name: "", email: "", phone: "", branch: "", message: "", consent: false };

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = "Enter your name.";
  if (!f.email.trim()) e.email = "Enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = "Enter an email address in the correct format, like name@example.com.";
  if (f.phone.trim() && !/^[0-9+()\s-]{10,}$/.test(f.phone.trim())) e.phone = "Enter a UK phone number, like 0191 123 4567.";
  if (!f.branch) e.branch = "Choose a branch.";
  if (f.message.trim().length < 10) e.message = "Tell us a little more (at least 10 characters).";
  if (!f.consent) e.consent = "Confirm you're happy for us to contact you about your message.";
  return e;
}

const INPUT = "w-full min-h-[52px] rounded-oc-md border bg-white px-4 text-oc-ink placeholder:text-oc-quiet focus:border-oc-dark";

function Field({ id, label, hint, error, children }: { id: string; label: string; hint?: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="font-semibold text-oc-ink">{label}</label>
      {hint && <p id={`${id}-hint`} className="oc-small text-oc-quiet -mt-1">{hint}</p>}
      {children}
      {error && (
        <p id={`${id}-error`} className="oc-small text-oc-error font-semibold flex items-start gap-1.5">
          <ErrorMark /> {error}
        </p>
      )}
    </div>
  );
}

function EnquiryForm() {
  const [f, setF] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const summary = useRef<HTMLDivElement>(null);
  const [attempt, setAttempt] = useState(0);

  // After a failed submit, move focus to the error summary so it is announced and navigable.
  useEffect(() => {
    if (attempt) summary.current?.focus();
  }, [attempt]);

  const set = <K extends keyof Fields>(k: K, v: Fields[K]) => {
    setF((prev) => ({ ...prev, [k]: v }));
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: undefined }));
  };
  const describe = (k: keyof Fields, hint = false) =>
    [hint ? `oc-${k}-hint` : "", errors[k] ? `oc-${k}-error` : ""].filter(Boolean).join(" ") || undefined;
  const border = (k: keyof Fields) => (errors[k] ? "border-oc-error border-2" : "border-oc-line-strong");

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const found = validate(f);
    setErrors(found);
    if (Object.keys(found).length) {
      setAttempt((n) => n + 1);
      return;
    }
    if (isTbc(OC_CONTACT_ENDPOINT)) {
      setStatus("offline");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(OC_CONTACT_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f) });
      setStatus(res.ok ? "sent" : "failed");
      if (res.ok) setF(EMPTY);
    } catch {
      setStatus("failed");
    }
  };

  if (status === "sent") {
    return (
      <div role="status" className="rounded-oc-xl bg-oc-mist p-8 sm:p-10">
        <Icon3D src={ic.check} size={48} />
        <h3 className="oc-h3 text-oc-ink mt-4">Thanks, your message has been sent</h3>
        <p className="oc-body text-oc-text mt-2">We'll reply by email within two working days. If it's urgent, please call the branch.</p>
        <button type="button" onClick={() => setStatus("idle")} className="mt-6 font-semibold text-oc-dark underline underline-offset-4 min-h-[44px] cursor-pointer">Send another message</button>
      </div>
    );
  }

  const errorList = Object.entries(errors).filter(([, v]) => v) as [keyof Fields, string][];

  return (
    <form noValidate onSubmit={submit} className="grid gap-6" aria-describedby="oc-form-note">
      {errorList.length > 0 && (
        <div ref={summary} tabIndex={-1} role="alert" className="rounded-oc-lg border-2 border-oc-error bg-white p-5 outline-none">
          <h3 className="font-semibold text-oc-ink">There's a problem with your message</h3>
          <ul className="mt-2 grid gap-1 oc-small">
            {errorList.map(([k, msg]) => (
              <li key={k}><a href={`#oc-${k}`} className="text-oc-error underline underline-offset-4">{msg}</a></li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="oc-name" label="Full name" error={errors.name}>
          <input id="oc-name" name="name" autoComplete="name" value={f.name} onChange={(e) => set("name", e.target.value)} aria-invalid={!!errors.name} aria-describedby={describe("name")} className={`${INPUT} ${border("name")}`} />
        </Field>
        <Field id="oc-email" label="Email address" error={errors.email}>
          <input id="oc-email" name="email" type="email" autoComplete="email" spellCheck={false} value={f.email} onChange={(e) => set("email", e.target.value)} aria-invalid={!!errors.email} aria-describedby={describe("email")} className={`${INPUT} ${border("email")}`} />
        </Field>
        <Field id="oc-phone" label="Phone number (optional)" hint="Only if you'd prefer a call back." error={errors.phone}>
          <input id="oc-phone" name="phone" type="tel" autoComplete="tel" value={f.phone} onChange={(e) => set("phone", e.target.value)} aria-invalid={!!errors.phone} aria-describedby={describe("phone", true)} className={`${INPUT} ${border("phone")}`} />
        </Field>
        <Field id="oc-branch" label="Branch" error={errors.branch}>
          <select id="oc-branch" name="branch" value={f.branch} onChange={(e) => set("branch", e.target.value)} aria-invalid={!!errors.branch} aria-describedby={describe("branch")} className={`${INPUT} ${border("branch")} cursor-pointer`}>
            <option value="">Choose a branch</option>
            {OC_BRANCHES.map((b) => <option key={b.id} value={b.id}>{b.shortName}</option>)}
            <option value="either">Either branch</option>
          </select>
        </Field>
      </div>

      <Field id="oc-message" label="Your message" hint="Please don't include detailed medical information." error={errors.message}>
        <textarea id="oc-message" name="message" rows={6} value={f.message} onChange={(e) => set("message", e.target.value)} aria-invalid={!!errors.message} aria-describedby={describe("message", true)} className={`${INPUT} ${border("message")} py-3 min-h-[160px] resize-y`} />
      </Field>

      <div className="grid gap-2">
        <label htmlFor="oc-consent" className="flex items-start gap-3 cursor-pointer">
          <input id="oc-consent" type="checkbox" checked={f.consent} onChange={(e) => set("consent", e.target.checked)} aria-invalid={!!errors.consent} aria-describedby={describe("consent")} className="mt-1 w-5 h-5 accent-[var(--cross-dark)] shrink-0 cursor-pointer" />
          <span className="oc-body text-oc-text">I'm happy for One Care Pharmacy to contact me about this message. See our <a href="#" className="text-oc-dark underline underline-offset-4">privacy notice</a>.</span>
        </label>
        {errors.consent && (
          <p id="oc-consent-error" className="oc-small text-oc-error font-semibold flex items-start gap-1.5">
            <ErrorMark /> {errors.consent}
          </p>
        )}
      </div>

      {status === "offline" && (
        <div role="status" className="rounded-oc-lg bg-oc-mist p-5 flex items-start gap-3">
          <Icon3D src={ic.phone} size={28} />
          <p className="oc-body text-oc-text">Online messages aren't switched on yet, so this hasn't been sent. Please call or email the branch using the details below.</p>
        </div>
      )}
      {status === "failed" && (
        <div role="alert" className="rounded-oc-lg border-2 border-oc-error p-5 flex items-start gap-3">
          <ErrorMark />
          <p className="oc-body text-oc-text">Your message couldn't be sent. Please try again, or call the branch.</p>
        </div>
      )}

      <div>
        <button type="submit" disabled={status === "sending"} className={`${BTN_PRIMARY} disabled:opacity-70`}>
          {status === "sending" ? "Sending message" : "Send message"}
        </button>
      </div>
    </form>
  );
}

function contactGraph() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact One Care Pharmacy",
    about: { "@type": "Organization", name: "One Care Pharmacy", legalName: OC_LEGAL.owner },
  };
}

export default function ContactPageOneCare() {
  useSeo({
    title: "Contact us | One Care Pharmacy, Gateshead",
    description: "Opening hours, phone numbers and directions for One Care Pharmacy's two branches, including 13 Bewick Road, Gateshead NE8 4DP (0191 477 4456). Or send us a message.",
    path: `${onecareBrand.basePath}/contact`,
    favicon: onecareBrand.favicon,
  });
  useOneCarePage();
  const root = useRef<HTMLDivElement>(null);
  useOcReveal(root);

  return (
    <OneCareBranchProvider>
      <div ref={root} className="theme-onecare oc-page min-h-screen bg-oc-paper">
        <JsonLd data={contactGraph()} />
        <HeaderOneCare />
        <main id="main-content" tabIndex={-1} className="outline-none">
          <section aria-labelledby="oc-contact-title" className="oc-hero-wash -mt-[76px] pt-[124px] lg:pt-[140px] pb-14 lg:pb-20">
            <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 grid gap-10 lg:grid-cols-12 lg:gap-12 items-center">
              <div className="lg:col-span-6" data-reveal>
                <h1 id="oc-contact-title" className="oc-display !text-[clamp(2.75rem,1.6rem+4.4vw,5rem)] text-oc-ink">Contact us</h1>
                <p className="oc-lead text-oc-quiet mt-5 max-w-[46ch]">
                  Call, email or visit either branch. For urgent medical help, call NHS 111. In an emergency, call 999.
                </p>
              </div>
              <div className="lg:col-span-6 relative" data-reveal>
                <div className="aspect-[4/3] rounded-oc-xl overflow-hidden bg-oc-mist">
                  <img
                    src={contactHero}
                    alt="A One Care pharmacist taking a phone call at the counter"
                    className="w-full h-full object-cover object-[60%_30%]"
                  />
                </div>
                <div aria-hidden="true" className="oc-glass absolute -bottom-5 left-5 sm:left-8 rounded-full pl-2 pr-5 py-2 flex items-center gap-2.5 text-[0.9375rem] font-semibold text-oc-ink">
                  <Icon3D src={ic.phone} size={32} />
                  Call either branch
                </div>
              </div>
            </div>
          </section>

          <section aria-labelledby="oc-form-title" className="pt-[clamp(40px,5vw,72px)] pb-[clamp(72px,9vw,136px)]">
            <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-5" data-reveal>
                <h2 id="oc-form-title" className="oc-h2 text-oc-ink">Send us a message</h2>
                <p id="oc-form-note" className="oc-lead text-oc-quiet mt-5 max-w-[42ch]">
                  For general questions about our services. For medical advice, call the branch or NHS 111.
                </p>
                <p className="oc-body text-oc-text mt-8 max-w-[42ch]">
                  Want to give feedback or make a complaint? Read our <a href="#" className="text-oc-dark underline underline-offset-4">complaints procedure</a>, including how to raise an NHS complaint.
                </p>
              </div>
              <div className="lg:col-span-7 rounded-oc-xl bg-white border border-oc-line p-6 sm:p-10 shadow-[0_24px_48px_-24px_rgba(18,59,57,0.18)]" data-reveal>
                <EnquiryForm />
              </div>
            </div>
          </section>

          <section aria-labelledby="oc-branches-title" className="py-[clamp(72px,9vw,136px)] bg-oc-tint">
            <h2 id="oc-branches-title" className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 oc-h2 text-oc-ink mb-10" data-reveal>Our branches</h2>
            <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-6">
              {OC_BRANCHES.map((b) => <div key={b.id} data-reveal className="grid"><BranchDetailCard b={b} /></div>)}
            </div>
          </section>
        </main>
        <FooterOneCare />
      </div>
    </OneCareBranchProvider>
  );
}
