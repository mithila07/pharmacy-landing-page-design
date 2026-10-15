import { useEffect, useRef, useState, type FormEvent } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import type { Brand } from "../../branding";
import {
  Checkbox, ChoiceGroup, ErrorSummary, Field, FormSection, TextInput, borderFor, describedBy, dobError, inputBase,
  isUkPostcode, submitForm, type Errors,
} from "./formKit";

type Who = "self" | "someone";
type Sex = "female" | "male";

/**
 * Only what the NHS Personal Demographics Service (PDS) needs to find the
 * patient. Address, GP practice and contact details come back from the PDS
 * record itself, so the form doesn't ask for them.
 */
const EMPTY = {
  who: "" as Who | "",
  carerName: "", carerRelationship: "", carerPermission: false,
  firstName: "", lastName: "",
  dobDay: "", dobMonth: "", dobYear: "",
  sex: "" as Sex | "",
  postcode: "",
  consent: false,
};
type Data = typeof EMPTY;

/** Field order drives the error summary order. */
const ORDER: (keyof Data | "dob")[] = ["who", "carerName", "carerRelationship", "carerPermission", "firstName", "lastName", "dob", "sex", "postcode", "consent"];

function validate(d: Data): Errors {
  const e: Errors = {};
  if (!d.who) e.who = "Choose who you're nominating for";
  if (d.who === "someone") {
    if (!d.carerName.trim()) e.carerName = "Enter your full name";
    if (!d.carerRelationship.trim()) e.carerRelationship = "Enter your relationship to the patient";
    if (!d.carerPermission) e.carerPermission = "Confirm you have the patient's permission";
  }
  if (!d.firstName.trim()) e.firstName = "Enter the patient's first name";
  if (!d.lastName.trim()) e.lastName = "Enter the patient's last name";
  const dob = dobError(d.dobDay, d.dobMonth, d.dobYear);
  if (dob) e.dob = dob;
  if (!d.sex) e.sex = "Choose the patient's sex at birth";
  if (!isUkPostcode(d.postcode)) e.postcode = d.postcode.trim() ? "Enter a real UK postcode, for example WN4 9BH" : "Enter the patient's postcode";
  if (!d.consent) e.consent = "Confirm you'd like us to be the nominated pharmacy";
  return e;
}

export function NominationForm({ brand, endpoint }: { brand: Brand; endpoint?: string }) {
  const short = brand.name.replace(" Pharmacy", "");
  const [d, setD] = useState<Data>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "preview" | "failed">("idle");
  const [attempt, setAttempt] = useState(0);
  const summaryRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);
  const forSomeone = d.who === "someone";

  const set = <K extends keyof Data>(k: K, v: Data[K]) => {
    setD((p) => ({ ...p, [k]: v }));
    const isDob = k.toString().startsWith("dob");
    if (errors[k as string] || (isDob && errors.dob)) setErrors((p) => ({ ...p, [k]: undefined, ...(isDob ? { dob: undefined } : {}) }));
  };

  useEffect(() => { if (attempt) summaryRef.current?.focus(); }, [attempt]);
  useEffect(() => { if (status === "sent" || status === "preview") doneRef.current?.focus(); }, [status]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const found = validate(d);
    setErrors(found);
    if (Object.values(found).some(Boolean)) { setAttempt((n) => n + 1); return; }
    setStatus("sending");
    setStatus(await submitForm(endpoint, "nomination", d));
  };

  if (status === "sent" || status === "preview") {
    return (
      <div ref={doneRef} tabIndex={-1} role="status" className="outline-none py-4">
        <CheckCircle2 size={44} strokeWidth={1.75} className="text-brand-secondary" aria-hidden="true" />
        <h3 className="mt-4 text-[1.6rem] text-brand-primary" style={{ fontWeight: 800, letterSpacing: "-0.015em" }}>
          Thanks, we've got {forSomeone ? `${d.firstName}'s` : "your"} details
        </h3>
        <p className="mt-2 text-slate-600 text-[1.02rem] leading-relaxed max-w-[52ch]">
          We'll find {forSomeone ? `${d.firstName}'s` : "your"} NHS record and set {short} as the nominated pharmacy. If anything doesn't match, we'll get in touch using the contact details on the record.
        </p>
        {status === "preview" && (
          <p className="mt-6 text-[0.85rem] text-slate-500 border-t border-slate-200 pt-4">Preview site: this request wasn't sent anywhere. It will be once the form is connected to the pharmacy's inbox.</p>
        )}
        <button type="button" onClick={() => { setD(EMPTY); setStatus("idle"); }} className="mt-6 text-brand-secondary underline underline-offset-4 min-h-[44px] cursor-pointer" style={{ fontWeight: 700 }}>
          Nominate someone else
        </button>
      </div>
    );
  }

  // Error links jump to the field (radio questions link to their group).
  const anchor = (k: string) => (k === "dob" ? "dobDay" : k === "who" || k === "sex" ? `choice-${k}` : k);
  const errorList = ORDER.filter((k) => errors[k]).map((k) => [anchor(k), errors[k]!] as [string, string]);

  return (
    <form noValidate onSubmit={submit} className="grid gap-8">
      <ErrorSummary errors={errorList} refEl={summaryRef} />

      <FormSection title="Who is this for?">
        <ChoiceGroup<Who>
          name="who"
          legend="I'm nominating"
          value={d.who}
          onChange={(v) => set("who", v)}
          error={errors.who}
          options={[{ value: "self", label: "Myself" }, { value: "someone", label: "Someone I care for" }]}
        />
        {forSomeone && (
          <div className="grid gap-5 rounded-2xl bg-brand-light/60 p-5 sm:p-6">
            <div className="grid sm:grid-cols-2 gap-5">
              <Field id="carerName" label="Your full name" error={errors.carerName}>
                <TextInput id="carerName" autoComplete="name" value={d.carerName} onChange={(e) => set("carerName", e.target.value)} error={errors.carerName} />
              </Field>
              <Field id="carerRelationship" label="Relationship to the patient" error={errors.carerRelationship}>
                <TextInput id="carerRelationship" placeholder="e.g. daughter, carer" value={d.carerRelationship} onChange={(e) => set("carerRelationship", e.target.value)} error={errors.carerRelationship} />
              </Field>
            </div>
            <Checkbox id="carerPermission" checked={d.carerPermission} onChange={(v) => set("carerPermission", v)} error={errors.carerPermission}>
              The patient has agreed to me nominating {short} for them.
            </Checkbox>
          </div>
        )}
      </FormSection>

      <FormSection title={forSomeone ? "The patient's details" : "Your details"}>
        <p className="text-[0.9rem] text-slate-600 -mt-2">Enter them as your GP practice has them, so we can find the right NHS record.</p>
        <div className="grid sm:grid-cols-2 gap-5">
          <Field id="firstName" label="First name" error={errors.firstName}>
            <TextInput id="firstName" autoComplete={forSomeone ? "off" : "given-name"} value={d.firstName} onChange={(e) => set("firstName", e.target.value)} error={errors.firstName} />
          </Field>
          <Field id="lastName" label="Last name" error={errors.lastName}>
            <TextInput id="lastName" autoComplete={forSomeone ? "off" : "family-name"} value={d.lastName} onChange={(e) => set("lastName", e.target.value)} error={errors.lastName} />
          </Field>
        </div>

        {/* Date of birth and sex share a row; DOB uses three boxes, the pattern NHS services use */}
        <div className="grid sm:grid-cols-2 gap-5 items-start">
        <fieldset className="grid gap-1.5" aria-describedby={describedBy("dob", true, errors.dob)}>
          <legend className="text-[0.95rem] text-slate-900" style={{ fontWeight: 700 }}>Date of birth</legend>
          <p id="dob-hint" className="text-[0.85rem] text-slate-600">For example, 27 3 1958</p>
          <div className="flex gap-3">
            {([
              ["dobDay", "Day", "w-[4.5rem]", 2, forSomeone ? "off" : "bday-day", "DD"],
              ["dobMonth", "Month", "w-[4.5rem]", 2, forSomeone ? "off" : "bday-month", "MM"],
              ["dobYear", "Year", "w-[6.5rem]", 4, forSomeone ? "off" : "bday-year", "YYYY"],
            ] as const).map(([k, l, w, max, ac, ph]) => (
              <div key={k} className="grid gap-1">
                <label htmlFor={k} className="sr-only">{l}</label>
                <input
                  id={k}
                  inputMode="numeric"
                  autoComplete={ac}
                  maxLength={max}
                  placeholder={ph}
                  value={d[k]}
                  onChange={(e) => set(k, e.target.value.replace(/\D/g, ""))}
                  aria-invalid={!!errors.dob}
                  className={`${inputBase.replace("w-full ", "")} ${borderFor(errors.dob)} ${w} text-center tabular-nums`}
                />
              </div>
            ))}
          </div>
          {errors.dob && <p id="dob-error" className="text-[0.88rem] text-red-700" style={{ fontWeight: 600 }}>{errors.dob}</p>}
        </fieldset>

        <ChoiceGroup<Sex>
          name="sex"
          legend="Sex at birth"
          hint="As shown on the NHS record."
          value={d.sex}
          onChange={(v) => set("sex", v)}
          error={errors.sex}
          options={[{ value: "female", label: "Female" }, { value: "male", label: "Male" }]}
        />
        </div>

        <Field id="postcode" label="Postcode" error={errors.postcode}>
          <TextInput id="postcode" autoComplete={forSomeone ? "off" : "postal-code"} value={d.postcode} onChange={(e) => set("postcode", e.target.value.toUpperCase())} error={errors.postcode} className="uppercase sm:max-w-[12rem]" />
        </Field>
      </FormSection>

      <div className="grid gap-5 rounded-2xl bg-slate-50 p-5 sm:p-6">
        <Checkbox id="consent" checked={d.consent} onChange={(v) => set("consent", v)} error={errors.consent}>
          I'd like {brand.name} to be {forSomeone ? "the patient's" : "my"} nominated pharmacy for NHS electronic prescriptions. I understand this can be changed at any time.
        </Checkbox>
        <p className="text-[0.82rem] text-slate-500 leading-relaxed pl-9">
          We use these details only to find the NHS record and set up the nomination.
        </p>
      </div>

      {status === "failed" && (
        <p role="alert" className="rounded-xl border-2 border-red-600 bg-red-50/60 p-4 text-[0.95rem] text-slate-800">
          The request didn't go through. Check your connection and try again, or call us on {brand.locations[0].phone}.
        </p>
      )}

      <div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center justify-center gap-2 min-h-[48px] px-7 rounded-xl bg-brand-secondary text-white hover:brightness-110 disabled:opacity-70 cursor-pointer"
          style={{ fontWeight: 700 }}
        >
          {status === "sending" ? <><Loader2 size={18} aria-hidden="true" /> Sending request</> : "Send nomination request"}
        </button>
      </div>
    </form>
  );
}
