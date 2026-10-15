import { useId, type InputHTMLAttributes, type ReactNode } from "react";
import { AlertCircle, Check } from "lucide-react";

/**
 * Small form kit for the template sites' contact forms (nomination + enquiry).
 * Label above, optional hint, error below; errors are linked to their input
 * with aria-describedby and summarised at the top on submit.
 */

export type Errors = Record<string, string | undefined>;

export const inputBase =
  "w-full min-h-[52px] rounded-xl border bg-white px-4 text-[1rem] text-slate-900 placeholder:text-slate-400 outline-none focus:border-brand-secondary focus:shadow-[0_0_0_4px_color-mix(in_oklab,var(--brand-secondary)_15%,transparent)]";
export const borderFor = (err?: string) => (err ? "border-red-600" : "border-slate-300 hover:border-slate-400");

export function Field({ id, label, hint, error, optional, children }: {
  id: string; label: string; hint?: string; error?: string; optional?: boolean; children: ReactNode;
}) {
  return (
    <div className="grid gap-1.5 content-start">
      <label htmlFor={id} className="text-[0.95rem] text-slate-900" style={{ fontWeight: 700 }}>
        {label}{optional && <span className="text-slate-500" style={{ fontWeight: 500 }}> (optional)</span>}
      </label>
      {hint && <p id={`${id}-hint`} className="text-[0.85rem] text-slate-600 -mt-0.5">{hint}</p>}
      {children}
      {error && (
        <p id={`${id}-error`} className="flex items-start gap-1.5 text-[0.88rem] text-red-700" style={{ fontWeight: 600 }}>
          <AlertCircle size={16} className="mt-0.5 shrink-0" aria-hidden="true" /> {error}
        </p>
      )}
    </div>
  );
}

/** aria-describedby value for a field's hint and error. */
export const describedBy = (id: string, hint?: boolean, error?: string) =>
  [hint ? `${id}-hint` : "", error ? `${id}-error` : ""].filter(Boolean).join(" ") || undefined;

export function TextInput({ id, error, hint, className = "", ...rest }: InputHTMLAttributes<HTMLInputElement> & { id: string; error?: string; hint?: boolean }) {
  return (
    <input
      id={id}
      aria-invalid={!!error}
      aria-describedby={describedBy(id, hint, error)}
      className={`${inputBase} ${borderFor(error)} ${className}`}
      {...rest}
    />
  );
}

/** Large tappable radio options laid out as a segmented row (wraps on small screens). */
export function ChoiceGroup<T extends string>({ name, legend, hint, value, onChange, options, error }: {
  name: string; legend: string; hint?: string; value: T | ""; onChange: (v: T) => void;
  options: { value: T; label: string }[]; error?: string;
}) {
  const id = useId();
  return (
    <fieldset id={`choice-${name}`} className="grid gap-2 scroll-mt-28" aria-describedby={describedBy(id, !!hint, error)}>
      <legend className="text-[0.95rem] text-slate-900 mb-1.5" style={{ fontWeight: 700 }}>{legend}</legend>
      {hint && <p id={`${id}-hint`} className="text-[0.85rem] text-slate-600 -mt-1.5 mb-0.5">{hint}</p>}
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const on = value === o.value;
          return (
            <label
              key={o.value}
              className={`relative inline-flex items-center gap-2.5 min-h-[48px] pl-3.5 pr-4 rounded-xl border cursor-pointer select-none ${on ? "border-brand-secondary bg-brand-light text-brand-primary" : `bg-white text-slate-800 ${error ? "border-red-600" : "border-slate-300 hover:border-slate-400"}`}`}
              style={{ fontWeight: 600 }}
            >
              <input type="radio" name={name} value={o.value} checked={on} onChange={() => onChange(o.value)} className="peer sr-only" />
              <span aria-hidden="true" className={`w-5 h-5 rounded-full border-2 grid place-items-center shrink-0 ${on ? "border-brand-secondary" : "border-slate-400"}`}>
                <span className={`w-2.5 h-2.5 rounded-full bg-brand-secondary ${on ? "block" : "hidden"}`} />
              </span>
              {o.label}
              <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-xl peer-focus-visible:ring-4 peer-focus-visible:ring-brand-secondary/25" />
            </label>
          );
        })}
      </div>
      {error && (
        <p id={`${id}-error`} className="flex items-start gap-1.5 text-[0.88rem] text-red-700" style={{ fontWeight: 600 }}>
          <AlertCircle size={16} className="mt-0.5 shrink-0" aria-hidden="true" /> {error}
        </p>
      )}
    </fieldset>
  );
}

export function Checkbox({ id, checked, onChange, error, children }: {
  id: string; checked: boolean; onChange: (v: boolean) => void; error?: string; children: ReactNode;
}) {
  return (
    <div className="grid gap-1.5">
      <label htmlFor={id} className="group flex items-start gap-3 cursor-pointer">
        <input id={id} type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} aria-invalid={!!error} aria-describedby={error ? `${id}-error` : undefined} className="peer sr-only" />
        <span
          aria-hidden="true"
          className={`mt-0.5 w-6 h-6 shrink-0 rounded-md border-2 grid place-items-center peer-focus-visible:ring-4 peer-focus-visible:ring-brand-secondary/25 ${checked ? "bg-brand-secondary border-brand-secondary text-white" : error ? "border-red-600 bg-white" : "border-slate-400 bg-white group-hover:border-slate-500"}`}
        >
          <Check size={15} strokeWidth={3} className={checked ? "opacity-100" : "opacity-0"} />
        </span>
        <span className="text-[0.95rem] text-slate-700 leading-relaxed">{children}</span>
      </label>
      {error && (
        <p id={`${id}-error`} className="flex items-start gap-1.5 text-[0.88rem] text-red-700 pl-9" style={{ fontWeight: 600 }}>
          <AlertCircle size={16} className="mt-0.5 shrink-0" aria-hidden="true" /> {error}
        </p>
      )}
    </div>
  );
}

/** Shown at the top of a form after a failed submit; links jump to each field. Receives focus. */
export function ErrorSummary({ errors, refEl }: { errors: [string, string][]; refEl: React.RefObject<HTMLDivElement | null> }) {
  if (!errors.length) return null;
  return (
    <div ref={refEl} tabIndex={-1} role="alert" className="rounded-2xl border-2 border-red-600 bg-red-50/60 p-5 outline-none">
      <p className="text-slate-900" style={{ fontWeight: 800 }}>Check the highlighted {errors.length === 1 ? "answer" : `${errors.length} answers`}</p>
      <ul className="mt-2 grid gap-1">
        {errors.map(([id, msg]) => (
          <li key={id}><a href={`#${id}`} className="text-red-700 underline underline-offset-2 text-[0.92rem]" style={{ fontWeight: 600 }}>{msg}</a></li>
        ))}
      </ul>
    </div>
  );
}

/** A titled group of fields inside a long form. */
export function FormSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="grid gap-5 pt-8 first:pt-0 border-t border-slate-200 first:border-t-0">
      <h3 className="text-[1.15rem] text-brand-primary" style={{ fontWeight: 800, letterSpacing: "-0.01em" }}>{title}</h3>
      {children}
    </section>
  );
}

// ── Validation helpers ────────────────────────────────────────────────────

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
export const isUkPhone = (v: string) => v.replace(/[\s()+-]/g, "").replace(/^44/, "0").match(/^0\d{9,10}$/) !== null;
export const isUkPostcode = (v: string) => /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i.test(v.trim());

/** NHS number: 10 digits with a valid Modulus 11 check digit. */
export function isNhsNumber(v: string): boolean {
  const d = v.replace(/\s/g, "");
  if (!/^\d{10}$/.test(d)) return false;
  const sum = d.slice(0, 9).split("").reduce((acc, n, i) => acc + Number(n) * (10 - i), 0);
  let check = 11 - (sum % 11);
  if (check === 11) check = 0;
  if (check === 10) return false;
  return check === Number(d[9]);
}

/** Date of birth from day/month/year boxes: real date, in the past, under 120 years ago. */
export function dobError(day: string, month: string, year: string): string | undefined {
  if (!day && !month && !year) return "Enter the patient's date of birth";
  const d = Number(day), m = Number(month), y = Number(year);
  if (!d || !m || !y || year.length !== 4) return "Enter a real date of birth, for example 27 3 1958";
  const date = new Date(y, m - 1, d);
  if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) return "Enter a real date of birth, for example 27 3 1958";
  if (date > new Date()) return "Date of birth must be in the past";
  if (y < new Date().getFullYear() - 120) return "Check the year of birth";
  return undefined;
}

/**
 * Submits a form to the site's endpoint. Until an endpoint is configured the
 * site runs in preview: nothing is sent, and the confirmation screen says so.
 */
export async function submitForm(endpoint: string | undefined, kind: string, data: unknown): Promise<"sent" | "preview" | "failed"> {
  if (!endpoint) return "preview";
  try {
    const res = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ kind, data }) });
    return res.ok ? "sent" : "failed";
  } catch {
    return "failed";
  }
}
