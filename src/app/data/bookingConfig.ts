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
 *  - "datetime" — appointment type, date & time
 *  - "contact"  — verify contact details (NHS PDS)
 *
 * Rule of thumb: `details` must come before `contact` (contact verification
 * builds on the entered details), and `triage` before `datetime`/`contact`.
 */
export type StageKind = "triage" | "details" | "datetime" | "contact";

export type BookingConfig = { steps: StageKind[] };

export const STAGE_LABELS: Record<StageKind, string> = {
  triage: "Eligibility",
  details: "Patient Info",
  datetime: "Date & Time",
  contact: "Verify Contact",
};

// Admin-configurable defaults. Swap the arrays below to change the journey.
const NHS_WITH_TRIAGE: BookingConfig = {
  // Patient info first → questionnaire can auto-fill age → date/time → verify.
  // (Alternative: ["triage", "datetime", "details", "contact"] to ask first.)
  steps: ["details", "triage", "datetime", "contact"],
};

const STANDARD: BookingConfig = {
  // Used for vaccines and private services (no eligibility questionnaire).
  // (Alternative: ["details", "datetime", "contact"] for patient-info-first.)
  steps: ["datetime", "details", "contact"],
};

export function getBookingConfig({ hasTriage }: { isNHS: boolean; hasTriage: boolean }): BookingConfig {
  return hasTriage ? NHS_WITH_TRIAGE : STANDARD;
}
