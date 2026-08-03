/**
 * Patient-facing weight-management eligibility assessment.
 *
 * Adapted from the clinician PGD questionnaire. IMPORTANT: the clinical alert
 * text (the ⛔ stop / ⚠ caution guidance boxes) is *never* shown to the patient.
 * Each answer instead carries a silent `flag` that the logic uses to decide
 * whether the patient can book — the patient only ever sees a friendly result.
 *
 * The clinician-only sections of the original form — treatment selection, the
 * consent declaration, and the follow-up/monitoring plan — are deliberately out
 * of scope here; they belong in the pharmacist's system, not the patient flow.
 *
 * ⚠ DEMO CONTENT: a plausible adaptation of the PGD gateway points. Must be
 * reviewed and signed off by the responsible pharmacist before real use.
 */

export const WEIGHT_SERVICE_ID = "prv-weight-consult";

/** stop = hard exclusion (refer to GP); caution = proceed, recorded for the pharmacist. */
export type WFlag = "stop" | "caution";

export type WChoice = {
  value: string;
  label: string;
  flag?: WFlag;
  /** Recorded for the pharmacist when chosen — never displayed to the patient. */
  note?: string;
  /** Placeholder for a reveal-on-select free-text field. */
  specify?: string;
};

export type WQuestion = { id: string; text: string; help?: string; choices: WChoice[] };

const YES_NO_STOP = (note?: string): WChoice[] => [
  { value: "no", label: "No" },
  { value: "yes", label: "Yes", flag: "stop", note },
];
const YES_NO_CAUTION = (note: string, specify?: string): WChoice[] => [
  { value: "no", label: "No" },
  { value: "yes", label: "Yes", flag: "caution", note, specify },
];

/** Section 1 — medical screening. */
export const SCREENING: WQuestion[] = [
  {
    id: "meds",
    text: "Are you taking any regular medicines?",
    help: "Include anything prescribed, bought over the counter, or herbal.",
    choices: YES_NO_CAUTION("Takes regular medicine(s) — check interactions per SPC.", "List your medicines — name, dose and how often"),
  },
  {
    id: "diabetes",
    text: "Have you been diagnosed with diabetes?",
    choices: [
      { value: "no", label: "No" },
      { value: "t1", label: "Yes — Type 1", flag: "stop" },
      { value: "t2", label: "Yes — Type 2", flag: "caution", note: "Type 2 diabetes — review glycaemic control and treatment." },
      { value: "other", label: "Yes — another type", flag: "caution", note: "Other diabetes — pharmacist to review." },
    ],
  },
  { id: "eatingDisorder", text: "Have you ever been diagnosed with an eating disorder?", choices: YES_NO_STOP() },
  { id: "thyroidCancer", text: "Do you, or anyone in your family, have a history of medullary thyroid cancer?", choices: YES_NO_STOP() },
  { id: "neuro", text: "Do you have epilepsy, a seizure disorder, or another active neurological condition?", help: "A past head injury on its own doesn't count unless it causes seizures.", choices: YES_NO_STOP() },
  { id: "pancreatitis", text: "Have you ever had pancreatitis?", choices: YES_NO_STOP() },
  { id: "gi", text: "Do you have a stomach, bowel or gallbladder condition?", help: "For example gastroparesis, Crohn's, ulcerative colitis or gallstones.", choices: YES_NO_CAUTION("GI condition — review severity and control.") },
  {
    id: "opioids",
    text: "Do you take or use opioids in any form?",
    help: "Includes prescribed pain relief (e.g. morphine, codeine), methadone or buprenorphine.",
    choices: [
      { value: "no", label: "No" },
      { value: "chronic", label: "Yes — prescribed for pain (not dependent)", flag: "caution", note: "Opioids for chronic pain — assess dose and stability." },
      { value: "dependent", label: "Yes — opioid dependence or substitution therapy", flag: "stop" },
    ],
  },
  { id: "sugarIntolerance", text: "Do you have a rare inherited problem with sugar or dairy?", help: "For example galactose intolerance or lactase deficiency.", choices: YES_NO_CAUTION("Rare sugar/dairy intolerance — excludes some treatments; review per SPC.") },
  { id: "mentalHealth", text: "Do you have a significant mental health condition, or difficulties with alcohol or drugs?", help: "For example severe depression, bipolar disorder or psychosis.", choices: YES_NO_CAUTION("Mental health / substance concern — assess severity and stability.") },
  { id: "heart", text: "Have you been diagnosed with a heart or circulation condition?", help: "For example heart disease, stroke, heart failure or high blood pressure.", choices: YES_NO_CAUTION("Cardiovascular condition — assess type, severity and BP control.") },
  { id: "liverKidney", text: "Do you have any liver or kidney disease?", choices: YES_NO_CAUTION("Liver/kidney disease — review severity; baseline bloods may be needed.") },
  { id: "contributing", text: "Do you have a condition that may be contributing to weight gain?", help: "For example an underactive thyroid, PCOS or Cushing's syndrome.", choices: YES_NO_CAUTION("Possible contributing condition — ensure treated and stable.", "Which condition(s)?") },
  { id: "pregnant", text: "Are you pregnant, planning a pregnancy, or could you be pregnant?", choices: YES_NO_STOP() },
  { id: "breastfeeding", text: "Are you currently breastfeeding?", choices: YES_NO_STOP() },
  {
    id: "contraception",
    text: "What contraception are you currently using?",
    help: "If this doesn't apply to you, choose the first option.",
    choices: [
      { value: "na", label: "Not applicable" },
      { value: "none", label: "None currently" },
      { value: "oral", label: "The pill (combined or progesterone-only)", flag: "caution", note: "Oral contraception — may be less effective during initiation; advise extra precautions." },
      { value: "nonoral", label: "Non-oral (coil, implant, injection, patch, ring)" },
    ],
  },
  { id: "allergies", text: "Do you have any known allergies?", help: "For example to medicines, foods or other substances.", choices: YES_NO_CAUTION("Allergy history — check relevance to the treatment.", "What are you allergic to, and what reaction?") },
  { id: "otherHistory", text: "Is there any other significant medical history we should know about?", choices: YES_NO_CAUTION("Other history disclosed — review for relevance.", "Please give brief details") },
];

/** Section 2 — SCOFF eating-disorder screen. Score ≥ 2 = refer (computed silently). */
export const SCOFF: WQuestion[] = [
  { id: "scoffSick", text: "Do you make yourself sick because you feel uncomfortably full?", choices: [{ value: "no", label: "No" }, { value: "yes", label: "Yes" }] },
  { id: "scoffControl", text: "Do you worry you have lost control over how much you eat?", choices: [{ value: "no", label: "No" }, { value: "yes", label: "Yes" }] },
  { id: "scoffStone", text: "Have you recently lost more than one stone (about 6.3 kg) in three months?", choices: [{ value: "no", label: "No" }, { value: "yes", label: "Yes" }] },
  { id: "scoffFat", text: "Do you believe yourself to be fat when others say you're too thin?", choices: [{ value: "no", label: "No" }, { value: "yes", label: "Yes" }] },
];

/** Section 4 — lifestyle (kept brief; only the gating item). */
export const LIFESTYLE: WQuestion[] = [
  {
    id: "alcohol",
    text: "Do you drink alcohol?",
    choices: [
      { value: "no", label: "No" },
      { value: "within14", label: "Yes — up to 14 units a week" },
      { value: "over14", label: "Yes — more than 14 units a week", flag: "caution", note: "Alcohol above recommended limits — give brief advice; assess for harmful use." },
    ],
  },
];

/** Weight-related comorbidities — asked only when BMI is 27–29.9. */
export const COMORBIDITIES = [
  "High blood pressure",
  "High cholesterol",
  "Obstructive sleep apnoea",
  "Heart or circulation disease",
  "Prediabetes",
  "Type 2 diabetes",
  "Other (e.g. PCOS, fatty liver, osteoarthritis)",
];

export const ALL_QUESTIONS = [...SCREENING, ...SCOFF, ...LIFESTYLE];

export function computeBmi(heightCm: number, weightKg: number): number | null {
  if (!heightCm || !weightKg || heightCm < 100 || weightKg < 20) return null;
  return weightKg / (heightCm / 100) ** 2;
}

/** Patient-friendly BMI band. */
export function bmiCategory(bmi: number): string {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Healthy weight";
  if (bmi < 30) return "Overweight";
  if (bmi < 35) return "Obesity class I";
  if (bmi < 40) return "Obesity class II";
  return "Obesity class III";
}

/** Does BMI (with any comorbidity) meet the service threshold? */
export function bmiEligible(bmi: number | null, comorbidityCount: number): boolean {
  if (bmi == null) return false;
  if (bmi >= 30) return true;
  if (bmi >= 27) return comorbidityCount > 0;
  return false;
}

export type WeightResult = { eligible: boolean; cautions: string[] };

/**
 * Silent evaluation. Any "stop" flag, a failing BMI, or a SCOFF score ≥ 2 blocks
 * booking (→ refer to GP). "caution" flags are recorded for the pharmacist but
 * never shown to the patient.
 */
export function evaluateWeight(input: {
  answers: Record<string, string>;
  bmi: number | null;
  comorbidityCount: number;
}): WeightResult {
  const { answers, bmi, comorbidityCount } = input;
  const cautions: string[] = [];
  let stop = !bmiEligible(bmi, comorbidityCount);

  for (const q of [...SCREENING, ...LIFESTYLE]) {
    const choice = q.choices.find((c) => c.value === answers[q.id]);
    if (!choice) continue;
    if (choice.flag === "stop") stop = true;
    else if (choice.flag === "caution" && choice.note) cautions.push(choice.note);
  }

  const scoffScore = SCOFF.reduce((n, q) => n + (answers[q.id] === "yes" ? 1 : 0), 0);
  if (scoffScore >= 2) stop = true;

  return { eligible: !stop, cautions };
}
