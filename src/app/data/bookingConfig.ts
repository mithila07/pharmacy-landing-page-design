/**
 * Booking flow configuration — the order of stages in the booking journey.
 *
 * In production this is fetched per brand/service from the backend, so an admin
 * can reorder steps without a code change. For example, putting `details`
 * (patient info, incl. date of birth) BEFORE `triage` means the eligibility
 * questionnaire can auto-resolve age and never ask the patient how old they are.
 *
 * Stages:
 *  - "triage"   — NHS eligibility questionnaire (only used when a flow exists)
 *  - "details"  — patient information (name, DOB, etc.)
 *  - "consult"  — first consultation or follow-up? Asked straight after the NHS
 *                 PDS check, for services the backend books as two separate
 *                 consultation types (e.g. weight management)
 *  - "datetime" — appointment type, date & time
 *  - "contact"  — verify contact details (NHS PDS)
 *  - "payment"  — advance booking fee / private service payment (admin-configured)
 *
 * Rule of thumb: `details` must come before `contact` (contact verification
 * builds on the entered details), `triage` before `datetime`/`contact`, and
 * `payment` is always last (the patient pays once everything else is settled).
 */
export type StageKind = "triage" | "details" | "consult" | "datetime" | "contact" | "payment";

/** Initial vs follow-up: the backend has a separate consultation for each. */
export type ConsultKind = "initial" | "follow-up";

export const CONSULT_LABELS: Record<ConsultKind, string> = {
  initial: "First consultation",
  "follow-up": "Follow-up",
};

export const STAGE_LABELS: Record<StageKind, string> = {
  triage: "Eligibility",
  details: "Patient Info",
  consult: "Consultation",
  datetime: "Date & Time",
  contact: "Verify Contact",
  payment: "Payment",
};

/**
 * Payment step — ENTIRELY admin-configured. The patient never chooses whether,
 * how much, or how they pay; the pharmacy sets this per service/brand from the
 * admin side and the flow simply renders it. Two independent uses:
 *
 *  - kind "deposit": a small advance booking fee (a "token" amount) taken to
 *    reduce DNA (Did Not Attend) rates. Can apply to NHS *and* private services
 *    — the NHS consultation itself stays free; the fee only secures the slot.
 *  - kind "service": the private service fee itself.
 *
 * Collection `method` (private services can use either; the admin decides):
 *  - "online":  the patient pays in-flow by card before the booking confirms.
 *  - "counter": payable in person at the pharmacy — shown as a notice to
 *               acknowledge, with no online payment taken.
 */
export type PaymentKind = "deposit" | "service";
export type PaymentMethod = "online" | "counter";

export type PaymentConfig = {
  enabled: boolean;
  kind: PaymentKind;
  method: PaymentMethod;
  /** Amount in GBP. For "service" this is typically derived from the service price upstream. */
  amount: number;
};

export const NO_PAYMENT: PaymentConfig = { enabled: false, kind: "deposit", method: "online", amount: 0 };

export type BookingConfig = { steps: StageKind[]; payment: PaymentConfig };

// Admin-configurable step orders. Swap the arrays below to change the journey.
// Patient info first → questionnaire can auto-fill age → date/time → verify.
const NHS_WITH_TRIAGE_STEPS: StageKind[] = ["details", "triage", "datetime", "contact"];
// Used for vaccines and private services (no eligibility questionnaire).
const STANDARD_STEPS: StageKind[] = ["datetime", "details", "contact"];

export function getBookingConfig(
  { hasTriage, askConsultKind = false, payment = NO_PAYMENT }: { isNHS: boolean; hasTriage: boolean; askConsultKind?: boolean; payment?: PaymentConfig },
): BookingConfig {
  let base = hasTriage ? NHS_WITH_TRIAGE_STEPS : STANDARD_STEPS;
  // The consultation-type question sits directly after patient details, so it
  // follows the PDS check (which runs on leaving the details stage).
  if (askConsultKind) {
    const i = base.indexOf("details");
    base = [...base.slice(0, i + 1), "consult", ...base.slice(i + 1)];
  }
  // Payment, when enabled, is appended as the final stage.
  const steps = payment.enabled ? [...base, "payment" as const] : [...base];
  return { steps, payment };
}
