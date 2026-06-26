/**
 * NHS Pharmacy First eligibility triage — chat-style flows.
 *
 * Questions branch to other questions or to terminal outcomes. Reaching the
 * `eligible` outcome ("gateway reached") unlocks booking; any other outcome
 * blocks the NHS appointment and, where appropriate, offers a private route.
 *
 * Question types:
 *  - yes/no  (default)         — two neutral options
 *  - "single"                  — pick one option
 *  - "multi"                   — tick any that apply (e.g. red-flag checklist)
 *
 * Age questions carry an `auto` rule. When the patient's details (and so their
 * date of birth) are collected BEFORE the questionnaire — see bookingConfig —
 * the chat resolves these automatically and never asks the patient their age.
 *
 * ⚠️ DEMO CONTENT: a plausible approximation of the NICE / PGD gateway points.
 * Must be reviewed and signed off by the responsible pharmacist before real use.
 */

export type OutcomeKind = "eligible" | "urgent" | "refer-gp" | "self-care" | "ineligible";

export type EligOutcome = {
  kind: OutcomeKind;
  title: string;
  message: string;
  privateAlternative?: string;
};

/** Auto-resolved from the patient's date of birth, when known. */
export type AutoRule = { field: "age"; op: ">=" | "<=" | "between"; value: number | [number, number] };

export type YesNoQuestion = {
  id: string;
  type?: "yesno";
  text: string;
  help?: string;
  auto?: AutoRule;
  yes: string;
  no: string;
};

export type SingleQuestion = {
  id: string;
  type: "single";
  text: string;
  help?: string;
  options: { label: string; goto: string }[];
};

export type MultiQuestion = {
  id: string;
  type: "multi";
  text: string;
  help?: string;
  /** Where to go if nothing flagged is selected. */
  next: string;
  /** Each option may carry a `goto`; if any selected option has one, the first wins. */
  options: { label: string; goto?: string }[];
};

export type EligQuestion = YesNoQuestion | SingleQuestion | MultiQuestion;

export type EligibilityFlow = {
  serviceId: string;
  condition: string;
  intro: string;
  start: string;
  questions: Record<string, EligQuestion>;
  outcomes: Record<string, EligOutcome>;
};

/** Evaluate an auto rule against a known age. */
export function evalAuto(rule: AutoRule, age: number): boolean {
  if (rule.op === ">=") return age >= (rule.value as number);
  if (rule.op === "<=") return age <= (rule.value as number);
  const [lo, hi] = rule.value as [number, number];
  return age >= lo && age <= hi;
}

// ── Shared outcome fragments ──────────────────────────────────────────────
const URGENT_111: EligOutcome = {
  kind: "urgent",
  title: "Please get urgent advice",
  message:
    "Your answers suggest symptoms that need prompt medical attention. Please call NHS 111 now for advice, or 999 if it's an emergency. This isn't something we can treat at the pharmacy counter.",
};

const referGp = (why: string, privateAlternative?: string): EligOutcome => ({
  kind: "refer-gp",
  title: "Best seen by your GP",
  message: `${why} For this, we'd recommend booking with your GP practice (or NHS 111 if you can't get an appointment). We can't supply treatment for this on NHS Pharmacy First.`,
  privateAlternative,
});

const ELIGIBLE: EligOutcome = {
  kind: "eligible",
  title: "You're eligible to book",
  message:
    "Great news — based on your answers you can book a free NHS Pharmacy First consultation with our pharmacist, who'll confirm everything and discuss treatment.",
};

// ── Flows ─────────────────────────────────────────────────────────────────
export const eligibilityFlows: EligibilityFlow[] = [
  // 1. Sore throat — age 5+
  {
    serviceId: "nhs-pf-sore-throat",
    condition: "Sore throat",
    intro: "Let's quickly check a sore throat can be treated here. It takes under a minute.",
    start: "red",
    questions: {
      red: { id: "red", text: "Are you finding it hard to breathe or swallow, drooling, or do you have a severe one-sided throat pain with a muffled voice?", help: "These can be signs of a more serious problem.", yes: "o_urgent", no: "age" },
      age: { id: "age", text: "Is the person who needs treatment aged 5 or over?", auto: { field: "age", op: ">=", value: 5 }, yes: "fever", no: "o_under5" },
      fever: { id: "fever", text: "Have the symptoms been present for less than about a week?", help: "Pharmacy First treats short-lived, acute sore throats.", yes: "o_eligible", no: "o_long" },
    },
    outcomes: {
      o_urgent: URGENT_111,
      o_under5: referGp("NHS Pharmacy First covers sore throat for ages 5 and over, and this is for someone younger."),
      o_long: referGp("A sore throat lasting more than about a week should be checked by your GP."),
      o_eligible: ELIGIBLE,
    },
  },

  // 2. Earache (acute otitis media) — age 1–17, private alt for adults
  {
    serviceId: "nhs-pf-earache",
    condition: "Earache",
    intro: "Let's check whether we can help with this earache on the NHS.",
    start: "red",
    questions: {
      red: { id: "red", text: "Is there swelling or redness behind the ear, a severe headache, a stiff neck, or is the person very unwell?", yes: "o_urgent", no: "child" },
      child: { id: "child", text: "Is the person aged between 1 and 17?", auto: { field: "age", op: "between", value: [1, 17] }, yes: "duration", no: "adult" },
      adult: { id: "adult", text: "Is the person aged 18 or over?", help: "Babies under 1 should always be seen by a GP for earache.", auto: { field: "age", op: ">=", value: 18 }, yes: "o_adult", no: "o_under1" },
      duration: { id: "duration", text: "Did the earache start within the last few days?", yes: "o_eligible", no: "o_long" },
    },
    outcomes: {
      o_urgent: URGENT_111,
      o_under1: referGp("Babies under 1 with earache should always be assessed by a GP."),
      o_adult: {
        kind: "ineligible",
        title: "Not covered on the NHS here",
        message: "NHS Pharmacy First treats earache for ages 1–17 only. As an adult you're not eligible for the free NHS service — but we can see you privately.",
        privateAlternative: "prv-ear-infection",
      },
      o_long: referGp("A long-lasting earache is better assessed by your GP."),
      o_eligible: ELIGIBLE,
    },
  },

  // 3. Acute sinusitis — age 12+, symptoms ~10 days+
  {
    serviceId: "nhs-pf-sinusitis",
    condition: "Sinusitis",
    intro: "A few quick questions to check we can treat your sinus symptoms.",
    start: "red",
    questions: {
      red: { id: "red", text: "Do you have swelling or redness around one eye, changes to your vision, or a severe / worsening one-sided headache?", yes: "o_urgent", no: "age" },
      age: { id: "age", text: "Is the person aged 12 or over?", auto: { field: "age", op: ">=", value: 12 }, yes: "duration", no: "o_under12" },
      duration: { id: "duration", text: "Have the symptoms lasted around 10 days or more without starting to improve?", help: "Earlier than this, sinusitis usually settles on its own.", yes: "o_eligible", no: "o_early" },
    },
    outcomes: {
      o_urgent: URGENT_111,
      o_under12: referGp("NHS Pharmacy First covers sinusitis for ages 12 and over."),
      o_early: {
        kind: "self-care",
        title: "Self-care is best for now",
        message: "Sinusitis usually clears up by itself within about 2–3 weeks. Rest, fluids and over-the-counter relief are the best first step. Come back if it lasts beyond ~10 days or gets worse.",
      },
      o_eligible: ELIGIBLE,
    },
  },

  // 4. Shingles — age 18+
  {
    serviceId: "nhs-pf-shingles",
    condition: "Shingles",
    intro: "Let's check a few things about your shingles rash.",
    start: "eye",
    questions: {
      eye: { id: "eye", text: "Is the rash near or around an eye, or do you have eye pain or changes to your vision?", help: "Shingles affecting the eye needs urgent attention.", yes: "o_urgent", no: "age" },
      age: { id: "age", text: "Is the person aged 18 or over?", auto: { field: "age", op: ">=", value: 18 }, yes: "risk", no: "o_under18" },
      risk: { id: "risk", type: "multi", text: "Do any of these apply?", help: "Tick any that are true — or continue if none.", next: "o_eligible", options: [
        { label: "Pregnant", goto: "o_refer" },
        { label: "Seriously weakened immune system", goto: "o_refer" },
      ] },
    },
    outcomes: {
      o_urgent: { ...URGENT_111, title: "Get same-day advice", message: "Shingles around the eye, or with eye symptoms, needs urgent same-day assessment. Please contact NHS 111 or your GP today." },
      o_under18: referGp("NHS Pharmacy First covers shingles for adults aged 18 and over."),
      o_refer: referGp("Because of pregnancy or a weakened immune system, shingles should be assessed by a GP."),
      o_eligible: ELIGIBLE,
    },
  },

  // 5. Impetigo — age 1+
  {
    serviceId: "nhs-pf-impetigo",
    condition: "Impetigo",
    intro: "A quick check on this skin infection before we book you in.",
    start: "red",
    questions: {
      red: { id: "red", text: "Is the person feverish or generally very unwell, or is the rash spreading quickly across the body?", yes: "o_refer", no: "age" },
      age: { id: "age", text: "Is the person aged 1 or over?", auto: { field: "age", op: ">=", value: 1 }, yes: "type", no: "o_under1" },
      type: { id: "type", text: "Are there large fluid-filled blisters, or has this kept coming back repeatedly?", help: "Bullous or recurrent impetigo needs a GP.", yes: "o_refer", no: "o_eligible" },
    },
    outcomes: {
      o_refer: referGp("This type of impetigo is better assessed by your GP."),
      o_under1: referGp("Babies under 1 with impetigo should be seen by a GP."),
      o_eligible: ELIGIBLE,
    },
  },

  // 6. Infected insect bite — age 1+ (multi-select red-flag checklist)
  {
    serviceId: "nhs-pf-insect-bite",
    condition: "Infected insect bite",
    intro: "Let's check whether this bite needs pharmacy treatment.",
    start: "red",
    questions: {
      red: { id: "red", type: "multi", text: "Are you experiencing any of these? Tick all that apply.", help: "Leave them all unticked if none apply.", next: "age", options: [
        { label: "Swelling of the lips, mouth or face", goto: "o_urgent" },
        { label: "Difficulty breathing", goto: "o_urgent" },
        { label: "Redness spreading out from the bite", goto: "o_urgent" },
        { label: "A fever and feeling very unwell", goto: "o_urgent" },
      ] },
      age: { id: "age", text: "Is the person aged 1 or over?", auto: { field: "age", op: ">=", value: 1 }, yes: "signs", no: "o_under1" },
      signs: { id: "signs", text: "Are there signs of infection — increasing redness, warmth, swelling or pus — that began a day or more after the bite?", yes: "o_eligible", no: "o_self" },
    },
    outcomes: {
      o_urgent: URGENT_111,
      o_under1: referGp("Bites in babies under 1 are better checked by a GP."),
      o_self: {
        kind: "self-care",
        title: "Self-care is best for now",
        message: "Most insect bites aren't infected and settle within a few days. Keep it clean, avoid scratching, and use a cold compress. Come back if you see spreading redness, swelling or pus.",
      },
      o_eligible: ELIGIBLE,
    },
  },

  // 7. Uncomplicated UTI in women — age 16–64, private alt = cystitis treatment
  {
    serviceId: "nhs-pf-uti",
    condition: "Urinary tract infection (UTI)",
    intro: "A few private questions to check we can treat a UTI here on the NHS.",
    start: "red",
    questions: {
      red: { id: "red", type: "multi", text: "Do you have any of these symptoms? Tick all that apply.", help: "These can be signs the infection has reached the kidneys.", next: "sex", options: [
        { label: "A high temperature or shivering", goto: "o_urgent" },
        { label: "Pain in your lower back or side", goto: "o_urgent" },
        { label: "Feeling or being sick", goto: "o_urgent" },
      ] },
      sex: { id: "sex", text: "Is the person who needs treatment a woman?", yes: "age", no: "o_male" },
      age: { id: "age", text: "Is she aged between 16 and 64?", auto: { field: "age", op: "between", value: [16, 64] }, yes: "preg", no: "o_age" },
      preg: { id: "preg", text: "Is she pregnant, or does she have a urinary catheter?", yes: "o_refer", no: "recurrent" },
      recurrent: { id: "recurrent", text: "Has she had 2 or more UTIs in the last 6 months?", yes: "o_refer", no: "o_eligible" },
    },
    outcomes: {
      o_urgent: { ...URGENT_111, title: "Get advice today", message: "Your answers suggest a possible kidney infection, which needs same-day medical assessment. Please contact NHS 111 or your GP today." },
      o_male: referGp("NHS Pharmacy First covers uncomplicated UTI in women aged 16–64. Men with UTI symptoms should see a GP.", "prv-cystitis"),
      o_age: {
        kind: "ineligible",
        title: "Not covered on the NHS here",
        message: "The free NHS UTI service is for women aged 16–64. You're outside that range — but we can help privately with a cystitis consultation instead.",
        privateAlternative: "prv-cystitis",
      },
      o_refer: referGp("Because of pregnancy, a catheter or recurrent infections, this UTI should be assessed by a GP.", "prv-cystitis"),
      o_eligible: ELIGIBLE,
    },
  },
];

/** Returns the triage flow for a service id, if one exists. */
export function getEligibilityFlow(serviceId: string | undefined): EligibilityFlow | undefined {
  if (!serviceId) return undefined;
  return eligibilityFlows.find((f) => f.serviceId === serviceId);
}
