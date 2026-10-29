import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Call24Regular, CheckmarkCircle24Regular, ErrorCircle24Regular, Info24Regular, Location24Regular, Directions24Regular } from "@fluentui/react-icons";
import { shivakemBrand } from "../branding";
import { DAY_ORDER, dayLabel, formatDayHours, isTbc } from "../data/onecare";
import { SK_BRANCH, SK_CONTACT_ENDPOINT, formatSkAddress } from "../data/shivakem";
import { londonTodayKey, useOpenNow } from "../onecareOpenNow";
import { useSeo, JsonLd } from "../seo";
import { useOcReveal } from "../onecareMotion";
import { HeaderShivakem } from "../components/HeaderShivakem";
import { FooterShivakem } from "../components/FooterShivakem";
import { BTN_PRIMARY, BTN_SECONDARY, OpenStatus } from "../components/onecareUi";
import { Fl, SK_ROOT } from "../components/shivakemUi";
import { shivakemGraph } from "./LandingPageShivakem";
import { useOneCarePage } from "./onecarePage";

type Fields = { name: string; email: string; phone: string; message: string; consent: boolean };
type Errors = Partial<Record<keyof Fields, string>>;
type Status = "idle" | "sending" | "sent" | "failed" | "offline";
const EMPTY: Fields = { name: "", email: "", phone: "", message: "", consent: false };

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = "Enter your name.";
  if (!f.email.trim()) e.email = "Enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = "Enter an email address in the correct format, like name@example.com.";
  if (f.phone.trim() && !/^[0-9+()\s-]{10,}$/.test(f.phone.trim())) e.phone = "Enter a UK phone number, like 020 8123 4567.";
  if (f.message.trim().length < 10) e.message = "Tell us a little more (at least 10 characters).";
  if (!f.consent) e.consent = "Confirm you're happy for us to contact you about your message.";
  return e;
}

const INPUT = "w-full min-h-[52px] rounded-oc-md border bg-white px-4 text-oc-ink placeholder:text-oc-quiet focus:border-oc-dark";
const ErrorMark = () => <Fl icon={ErrorCircle24Regular} size={20} className="text-oc-error -mt-px" />;

function Field({ id, label, hint, error, children }: { id: string; label: string; hint?: string; error?: string; children: ReactNode }) {
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="font-semibold text-oc-ink">{label}</label>
      {hint && <p id={`${id}-hint`} className="oc-small text-oc-quiet -mt-1">{hint}</p>}
      {children}
      {error && <p id={`${id}-error`} className="oc-small text-oc-error font-semibold flex items-start gap-1.5"><ErrorMark /> {error}</p>}
    </div>
  );
}

function EnquiryForm() {
  const [f, setF] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [attempt, setAttempt] = useState(0);
  const summary = useRef<HTMLDivElement>(null);
  useEffect(() => { if (attempt) summary.current?.focus(); }, [attempt]);

  const set = <K extends keyof Fields>(k: K, v: Fields[K]) => {
    setF((p) => ({ ...p, [k]: v }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  };
  const describe = (k: keyof Fields, hint = false) => [hint ? `sk-${k}-hint` : "", errors[k] ? `sk-${k}-error` : ""].filter(Boolean).join(" ") || undefined;
  const border = (k: keyof Fields) => (errors[k] ? "border-oc-error border-2" : "border-oc-line-strong");

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const found = validate(f);
    setErrors(found);
    if (Object.keys(found).length) { setAttempt((n) => n + 1); return; }
    if (isTbc(SK_CONTACT_ENDPOINT)) { setStatus("offline"); return; }
    setStatus("sending");
    try {
      const res = await fetch(SK_CONTACT_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f) });
      setStatus(res.ok ? "sent" : "failed");
      if (res.ok) setF(EMPTY);
    } catch { setStatus("failed"); }
  };

  if (status === "sent") {
    return (
      <div role="status" className="rounded-oc-xl bg-oc-mist p-8 sm:p-10">
        <Fl icon={CheckmarkCircle24Regular} size={44} className="text-oc-dark" />
        <h3 className="oc-h3 text-oc-ink mt-4">Message received, thank you</h3>
        <p className="oc-body text-oc-text mt-2">Expect an email reply within two working days. For anything urgent, please phone us.</p>
        <button type="button" onClick={() => setStatus("idle")} className="mt-6 font-semibold text-oc-dark underline underline-offset-4 min-h-[44px] cursor-pointer">Send another message</button>
      </div>
    );
  }

  const errorList = Object.entries(errors).filter(([, v]) => v) as [keyof Fields, string][];
  return (
    <form noValidate onSubmit={submit} className="grid gap-6" aria-describedby="sk-form-note">
      {errorList.length > 0 && (
        <div ref={summary} tabIndex={-1} role="alert" className="rounded-oc-lg border-2 border-oc-error bg-white p-5 outline-none">
          <h3 className="font-semibold text-oc-ink">There's a problem with your message</h3>
          <ul className="mt-2 grid gap-1 oc-small">
            {errorList.map(([k, msg]) => <li key={k}><a href={`#sk-${k}`} className="text-oc-error underline underline-offset-4">{msg}</a></li>)}
          </ul>
        </div>
      )}
      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="sk-name" label="Full name" error={errors.name}>
          <input id="sk-name" name="name" autoComplete="name" value={f.name} onChange={(e) => set("name", e.target.value)} aria-invalid={!!errors.name} aria-describedby={describe("name")} className={`${INPUT} ${border("name")}`} />
        </Field>
        <Field id="sk-email" label="Email address" error={errors.email}>
          <input id="sk-email" name="email" type="email" autoComplete="email" spellCheck={false} value={f.email} onChange={(e) => set("email", e.target.value)} aria-invalid={!!errors.email} aria-describedby={describe("email")} className={`${INPUT} ${border("email")}`} />
        </Field>
      </div>
      <Field id="sk-phone" label="Phone number (optional)" hint="Only if you'd prefer a call back." error={errors.phone}>
        <input id="sk-phone" name="phone" type="tel" autoComplete="tel" value={f.phone} onChange={(e) => set("phone", e.target.value)} aria-invalid={!!errors.phone} aria-describedby={describe("phone", true)} className={`${INPUT} ${border("phone")} sm:max-w-[22rem]`} />
      </Field>
      <Field id="sk-message" label="Your message" hint="Please don't include detailed medical information." error={errors.message}>
        <textarea id="sk-message" name="message" rows={6} value={f.message} onChange={(e) => set("message", e.target.value)} aria-invalid={!!errors.message} aria-describedby={describe("message", true)} className={`${INPUT} ${border("message")} py-3 min-h-[160px] resize-y`} />
      </Field>
      <div className="grid gap-2">
        <label htmlFor="sk-consent" className="flex items-start gap-3 cursor-pointer">
          <input id="sk-consent" type="checkbox" checked={f.consent} onChange={(e) => set("consent", e.target.checked)} aria-invalid={!!errors.consent} aria-describedby={describe("consent")} className="mt-1 w-5 h-5 accent-[var(--cross-dark)] shrink-0 cursor-pointer" />
          <span className="oc-body text-oc-text">I'm happy for Shivakem Pharmacy to contact me about this message. See our <a href="#" className="text-oc-dark underline underline-offset-4">privacy notice</a>.</span>
        </label>
        {errors.consent && <p id="sk-consent-error" className="oc-small text-oc-error font-semibold flex items-start gap-1.5"><ErrorMark /> {errors.consent}</p>}
      </div>
      {status === "offline" && (
        <div role="status" className="rounded-oc-lg bg-oc-mist p-5 flex items-start gap-3">
          <Fl icon={Info24Regular} size={24} className="text-oc-dark mt-0.5" />
          <p className="oc-body text-oc-text">Online messages aren't switched on yet, so this hasn't been sent. Please call us on {SK_BRANCH.phone}.</p>
        </div>
      )}
      {status === "failed" && (
        <div role="alert" className="rounded-oc-lg border-2 border-oc-error p-5 flex items-start gap-3">
          <ErrorMark /><p className="oc-body text-oc-text">Your message couldn't be sent. Please try again, or call us.</p>
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

export default function ContactPageShivakem() {
  useSeo({
    title: "Contact us | Shivakem Pharmacy, Wembley",
    description: "Opening hours, phone and directions for Shivakem Pharmacy, 12a Court Parade, Wembley HA0 3HU (020 8904 1514). Or send us a message.",
    path: `${shivakemBrand.basePath}/contact`,
    favicon: shivakemBrand.favicon,
  });
  useOneCarePage("#0450B4");
  const root = useRef<HTMLDivElement>(null);
  useOcReveal(root);
  const status = useOpenNow([SK_BRANCH])[SK_BRANCH.id];
  const today = londonTodayKey();
  const tel = `tel:${SK_BRANCH.phone.replace(/\s/g, "")}`;
  const embed = `https://maps.google.com/maps?q=${encodeURIComponent("Shivakem Pharmacy, 12a Court Parade, Wembley HA0 3HU")}&z=16&output=embed`;

  return (
    <div ref={root} className={SK_ROOT}>
      <JsonLd data={shivakemGraph()} />
      <HeaderShivakem />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <section aria-labelledby="sk-contact-title" className="oc-hero-wash -mt-[76px] pt-[124px] lg:pt-[148px] pb-14 lg:pb-20">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 grid gap-10 lg:grid-cols-12 lg:gap-12 items-start">
            <div className="lg:col-span-6" data-reveal>
              <h1 id="sk-contact-title" className="oc-display !text-[clamp(2.75rem,1.6rem+4.4vw,5rem)] text-oc-ink">Get in touch</h1>
              <p className="oc-lead text-oc-quiet mt-5 max-w-[46ch]">
                Phone, pop in or send a message. Need urgent medical help? Call NHS 111, or 999 in an emergency.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={tel} className={`${BTN_PRIMARY} oc-tnum`}><Fl icon={Call24Regular} size={20} /> {SK_BRANCH.phone}</a>
                <a href={SK_BRANCH.mapsUrl} target="_blank" rel="noopener noreferrer" className={BTN_SECONDARY}>
                  <Fl icon={Directions24Regular} size={20} /> Get directions<span className="sr-only"> (opens Google Maps in a new tab)</span>
                </a>
              </div>
            </div>

            {/* Visit card: address, live status and the week's hours */}
            <div className="lg:col-span-6 rounded-oc-xl bg-white border border-oc-line p-7 sm:p-9 shadow-[0_24px_48px_-24px_rgba(10,35,82,0.18)]" data-reveal>
              <h2 className="oc-h3 text-oc-ink">Find us</h2>
              <address className="not-italic oc-body text-oc-text mt-3 flex items-start gap-2.5">
                <Fl icon={Location24Regular} size={22} className="text-oc-dark mt-0.5" /> {formatSkAddress()}
              </address>
              <p className="mt-4 oc-body"><OpenStatus status={status} /></p>
              <dl className="mt-5 pt-5 border-t border-oc-line grid grid-cols-[auto_1fr] gap-x-8 gap-y-1.5 oc-body text-oc-text oc-tnum">
                {DAY_ORDER.map((d) => (
                  <div key={d} className={`contents ${d === today ? "font-semibold text-oc-ink" : ""}`}>
                    <dt>{dayLabel(d)}{d === today && <span className="sr-only"> (today)</span>}</dt>
                    <dd>{formatDayHours(SK_BRANCH.hours![d])}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section aria-label="Map" className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-[1320px] mx-auto rounded-oc-xl overflow-hidden border border-oc-line bg-oc-mist" data-reveal>
            <iframe title="Map showing Shivakem Pharmacy on Court Parade, Wembley" src={embed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="block w-full h-[360px] lg:h-[440px] border-0" />
          </div>
        </section>

        <section aria-labelledby="sk-form-title" className="py-[clamp(72px,9vw,136px)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5" data-reveal>
              <h2 id="sk-form-title" className="oc-h2 text-oc-ink">Write to us</h2>
              <p id="sk-form-note" className="oc-lead text-oc-quiet mt-5 max-w-[42ch]">
                Ask us anything about our services. If you need medical advice, please phone us or NHS 111 instead.
              </p>
              <p className="oc-body text-oc-text mt-8 max-w-[42ch]">
                Have feedback, or something we could do better? Our <a href="#" className="text-oc-dark underline underline-offset-4">complaints procedure</a> explains how to tell us, including NHS complaints.
              </p>
            </div>
            <div className="lg:col-span-7 rounded-oc-xl bg-white border border-oc-line p-6 sm:p-10 shadow-[0_24px_48px_-24px_rgba(10,35,82,0.18)]" data-reveal>
              <EnquiryForm />
            </div>
          </div>
        </section>
      </main>
      <FooterShivakem />
    </div>
  );
}
