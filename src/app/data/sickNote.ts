/**
 * Private sick notes: a request (not an appointment) that a partner UK-registered
 * doctor reviews remotely. The patient answers a short questionnaire in the
 * booking flow; nothing is booked in the diary.
 *
 * In production this is configured per pharmacy from the backend (which note
 * types are offered, the price, how far back a note can be dated). The values
 * below are the defaults until that API exists.
 *
 * Wording rules (keep to these anywhere this service is described):
 *  - It's a private note, not an NHS fit note.
 *  - A doctor decides: never promise the note will be issued.
 *  - Never claim employers "must" or "always" accept it.
 */
export const SICK_NOTE_SERVICE_ID = "prv-sick-note";

export const isSickNoteService = (id?: string) => id === SICK_NOTE_SERVICE_ID;

export type NoteTypeId = "work" | "travel" | "gym" | "fit-return";

export type NoteType = { id: NoteTypeId; name: string; desc: string; popular?: boolean };

/** The note types offered at launch, most requested first. */
export const NOTE_TYPES: NoteType[] = [
  { id: "work", name: "Sick note for work", desc: "Off work for a few days? A note for your employer covering up to 7 days.", popular: true },
  { id: "travel", name: "Travel cancellation letter", desc: "Too unwell to travel? A letter to support your travel insurance claim." },
  { id: "gym", name: "Gym cancellation letter", desc: "Need to freeze or cancel a membership for health reasons." },
  { id: "fit-return", name: "Fit to return letter", desc: "Confirms you're well enough to go back to work or study." },
];

export const noteTypeName = (id: NoteTypeId | "") => NOTE_TYPES.find((t) => t.id === id)?.name ?? "";

/** The most common reasons people ask for a note, in plain words. */
export const COMMON_REASONS = [
  "Cold, flu or fever",
  "Sickness or diarrhoea",
  "Back pain",
  "Migraine or headache",
  "Chest infection or Covid",
  "Stress or anxiety",
  "Injury or sprain",
  "Period pain",
  "Something else",
];

export const GYM_REASONS = ["Injury", "Long-term health condition", "Pregnancy", "Surgery or recovery", "Something else"];
export const GYM_DURATIONS = ["Up to 1 month", "1 to 3 months", "3 to 6 months", "Cancel for good"];

/** Backend-configurable limits. */
export const SICK_NOTE_RULES = {
  /** A private note covers short absences; longer ones need a fit note from a GP or hospital. */
  maxDays: 7,
  /** How far back the first day off can be. */
  maxBackdateDays: 7,
  turnaround: "usually the same day",
};

/** Anything here means "get help now", not a sick note. */
export const RED_FLAGS = [
  "Chest pain or tightness",
  "Struggling to breathe",
  "Fainting, a fit, or sudden confusion",
  "Signs of a stroke: face drooping, arm weakness or slurred speech",
  "Thoughts of harming yourself or ending your life",
];

export type YesNo = "" | "yes" | "no";

export type SickNoteRequest = {
  type: NoteTypeId | "";
  reason: string;
  startedOn: string; // yyyy-mm-dd: when symptoms started
  from: string; // first day the note covers
  to: string; // last day the note covers
  travelDate: string;
  gymReason: string;
  gymDuration: string;
  returnDate: string;
  adjustments: YesNo;
  adjustmentsDetail: string;
  organisation: string; // employer, gym, college or travel company to show on the note (optional)
  offBefore: YesNo; // off with the same thing in the last 4 weeks
  details: string;
  redFlag: YesNo;
  consentTrue: boolean;
  consentPrivate: boolean;
};

export const EMPTY_SICK_NOTE: SickNoteRequest = {
  type: "", reason: "", startedOn: "", from: "", to: "", travelDate: "",
  gymReason: "", gymDuration: "", returnDate: "",
  adjustments: "", adjustmentsDetail: "", organisation: "", offBefore: "",
  details: "", redFlag: "", consentTrue: false, consentPrivate: false,
};

// ── Dates (local yyyy-mm-dd, so "today" matches the patient's calendar) ──────

export const isoDay = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
export const addDays = (iso: string, n: number) => { const d = new Date(`${iso}T00:00:00`); d.setDate(d.getDate() + n); return isoDay(d); };
export const daysBetween = (a: string, b: string) => Math.round((new Date(`${b}T00:00:00`).getTime() - new Date(`${a}T00:00:00`).getTime()) / 86400000);
export const prettyDate = (iso: string) => (iso ? new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" }) : "");

/** Short "what's covered" line for summaries, e.g. "Mon 17 Nov to Wed 19 Nov (3 days)". */
export function coverLine(r: SickNoteRequest): string {
  switch (r.type) {
    case "work": {
      if (!r.from || !r.to) return "";
      const n = daysBetween(r.from, r.to) + 1;
      return r.from === r.to ? `${prettyDate(r.from)} (1 day)` : `${prettyDate(r.from)} to ${prettyDate(r.to)} (${n} days)`;
    }
    case "travel": return r.travelDate ? `Travel on ${prettyDate(r.travelDate)}` : "";
    case "gym": return r.gymDuration;
    case "fit-return": return r.returnDate ? `Back from ${prettyDate(r.returnDate)}` : "";
    default: return "";
  }
}

/** Is the "about your illness" part complete for the chosen note type? */
export function illnessComplete(r: SickNoteRequest, today = isoDay(new Date())): boolean {
  const detailsOk = r.details.trim().length >= 20;
  switch (r.type) {
    case "work": {
      if (!r.reason || !r.startedOn || !r.from || !r.to || !r.offBefore || !detailsOk) return false;
      const earliest = addDays(today, -SICK_NOTE_RULES.maxBackdateDays);
      const span = daysBetween(r.from, r.to) + 1;
      return r.from >= earliest && r.to >= r.from && span <= SICK_NOTE_RULES.maxDays && r.startedOn <= r.from;
    }
    case "travel":
      return !!r.reason && !!r.startedOn && !!r.travelDate && detailsOk;
    case "gym":
      return !!r.gymReason && !!r.gymDuration && detailsOk;
    case "fit-return":
      return !!r.reason && !!r.from && !!r.returnDate && r.returnDate >= r.from && !!r.adjustments && (r.adjustments === "no" || r.adjustmentsDetail.trim().length > 3) && detailsOk;
    default:
      return false;
  }
}
