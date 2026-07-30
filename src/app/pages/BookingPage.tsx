import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { ArrowLeft, Calendar, CalendarPlus, Clock, Phone, Mail, CheckCircle, MapPin, Video, PhoneCall, Pencil, ChevronLeft, ChevronRight, ShieldCheck, AlertTriangle, ThumbsUp, Info, ClipboardList, RotateCcw, Home, Zap, CreditCard, Store, Lock } from "lucide-react";
import { nhsServices, privateServices } from "../data/services";
import { getServiceContent } from "../data/serviceContent";
import { ServiceInfoSection } from "../components/ServiceInfoSection";
import { Footer } from "../components/Footer";
import { BranchSelector } from "../components/BranchSelector";
import { carefirstBrand, homePath, type Brand } from "../branding";
import { useResolvedLocation } from "../useLocation";
import { useSeo, serviceSeo } from "../seo";
import { getEligibilityFlow, type EligOutcome } from "../data/eligibility";
import { getBookingConfig, STAGE_LABELS, NO_PAYMENT, type StageKind, type PaymentConfig } from "../data/bookingConfig";
import { EligibilityChat, EligibilityGate } from "../components/EligibilityChat";

const allServices = [...nhsServices, ...privateServices];

function parseTimeSlotToHM(slot: string): [number, number] {
  // slot looks like "9:30 AM" or "1:00 PM"
  const m = slot.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!m) return [9, 0];
  let h = parseInt(m[1], 10);
  const min = parseInt(m[2], 10);
  const ampm = m[3].toUpperCase();
  if (ampm === "PM" && h !== 12) h += 12;
  if (ampm === "AM" && h === 12) h = 0;
  return [h, min];
}

function toIcsDate(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;
}

function downloadIcs({ date, time, title, location, description }: { date: Date; time: string; title: string; location: string; description: string }) {
  const [h, m] = parseTimeSlotToHM(time);
  const start = new Date(date);
  start.setHours(h, m, 0, 0);
  const end = new Date(start.getTime() + 30 * 60 * 1000); // 30-minute slot
  const uid = `${Date.now()}-${Math.random().toString(36).slice(2)}@pharmacy.local`;
  const esc = (s: string) => s.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Pharmacy Booking//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${toIcsDate(new Date())}`,
    `DTSTART:${toIcsDate(start)}`,
    `DTEND:${toIcsDate(end)}`,
    `SUMMARY:${esc(title)}`,
    `LOCATION:${esc(location)}`,
    `DESCRIPTION:${esc(description)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${title.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function ContactInputs({ phone, email, onPhone, onEmail }: { phone: string; email: string; onPhone: (v: string) => void; onEmail: (v: string) => void }) {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      <div className="min-w-0">
        <label className="text-[0.85rem] text-gray-700 mb-1.5 block" style={{ fontWeight: 500 }}>Phone number *</label>
        <div className="relative">
          <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={phone} onChange={(e) => onPhone(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-brand-primary/30 rounded-lg text-[0.9rem] focus:outline-none focus:ring-2 focus:ring-brand-primary/30" placeholder="07123 456789" />
        </div>
      </div>
      <div className="min-w-0">
        <label className="text-[0.85rem] text-gray-700 mb-1.5 block" style={{ fontWeight: 500 }}>Email *</label>
        <div className="relative">
          <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={email} onChange={(e) => onEmail(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-brand-primary/30 rounded-lg text-[0.9rem] focus:outline-none focus:ring-2 focus:ring-brand-primary/30" placeholder="you@example.com" />
        </div>
      </div>
    </div>
  );
}

const timeSlots = ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM"];

const MAX_DAYS_AHEAD = 90;

// Demo availability: Sundays are closed, plus a deterministic ~1-in-5 "fully booked".
// Replace with a real backend lookup when wiring up bookings.
function isDateUnavailable(d: Date) {
  if (d.getDay() === 0) return true; // Sunday — pharmacy closed
  const key = d.getFullYear() * 372 + (d.getMonth() + 1) * 31 + d.getDate();
  return key % 7 === 3 || key % 11 === 5;
}

function getUnavailableReason(d: Date) {
  if (d.getDay() === 0) return "Closed";
  return "Fully booked";
}

type PdsResult =
  | { matched: true; maskedPhone: string; maskedEmail: string; fullPhone: string; fullEmail: string }
  | { matched: false };

// Demo NHS PDS lookup — swap with a real API call.
// The `force` argument lets the demo toggle pick either branch deterministically.
function mockPdsLookup(patient: { firstName: string; lastName: string }, force?: "match" | "no-match"): PdsResult {
  if (force === "no-match") return { matched: false };
  const fn = patient.firstName.trim().toLowerCase() || "patient";
  return {
    matched: true,
    maskedPhone: "+44 79****2345",
    maskedEmail: `${fn.slice(0, 2)}****@example.com`,
    fullPhone: "+44 7900 112345",
    fullEmail: `${fn}@example.com`,
  };
}

// Demo time-slot availability: deterministically marks a few slots as taken per day.
// Replace with a real backend lookup when wiring up bookings.
function isTimeSlotUnavailable(d: Date, slot: string) {
  const key = d.getFullYear() * 372 + (d.getMonth() + 1) * 31 + d.getDate();
  const idx = timeSlots.indexOf(slot);
  return (key + idx * 3) % 5 === 0;
}

function getNextAvailable(): { date: Date; time: string } | null {
  const today = new Date();
  for (let i = 1; i <= MAX_DAYS_AHEAD; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    if (isDateUnavailable(d)) continue;
    const slot = timeSlots.find((t) => !isTimeSlotUnavailable(d, t));
    if (slot) return { date: d, time: slot };
  }
  return null;
}

/** Whole-years age from a DD/MM/YYYY trio, or undefined if incomplete/invalid. */
function computeAge(dd: string, mm: string, yyyy: string): number | undefined {
  const d = parseInt(dd, 10), m = parseInt(mm, 10), y = parseInt(yyyy, 10);
  if (!d || !m || !y || y < 1900) return undefined;
  const now = new Date();
  let age = now.getFullYear() - y;
  const hadBirthday = now.getMonth() + 1 > m || (now.getMonth() + 1 === m && now.getDate() >= d);
  if (!hadBirthday) age--;
  return age >= 0 && age < 130 ? age : undefined;
}

function getWeekFromOffset(offset: number) {
  const days = [];
  const today = new Date();
  const start = 1 + offset * 7;
  for (let i = start; i < start + 7 && i <= MAX_DAYS_AHEAD; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push(d);
  }
  return days;
}

export default function BookingPage({ brand = carefirstBrand }: { brand?: Brand } = {}) {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const { selected: branch, reason: branchReason, locations: branches, userCoords, selectLocation } = useResolvedLocation(brand);
  const multiBranch = branches.length > 1;
  const service = allServices.find((s) => s.id === serviceId);
  const triageFlow = getEligibilityFlow(service?.id); // NHS Pharmacy First eligibility gate (undefined = no triage)
  const [stageIdx, setStageIdx] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [appointmentType, setAppointmentType] = useState<"face-to-face" | "video" | "telephone">("face-to-face");
  const [submitted, setSubmitted] = useState(false);
  const [weekOffset, setWeekOffset] = useState(0);

  // Step 2 — patient info for NHS PDS check
  const [patient, setPatient] = useState({
    firstName: "",
    lastName: "",
    dobDay: "",
    dobMonth: "",
    dobYear: "",
    gender: "" as "" | "male" | "female",
    postcode: "",
  });
  const [pdsResult, setPdsResult] = useState<PdsResult | null>(null);
  const [pdsLoading, setPdsLoading] = useState(false);

  // Step 3 — confirm/enter contact
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [useNewContact, setUseNewContact] = useState(false); // on match: switch to entering new details
  const [notes, setNotes] = useState("");
  const [continuePrivate, setContinuePrivate] = useState(false); // no-match: acknowledge private session
  const [demoMode, setDemoMode] = useState<"match" | "no-match">("match"); // demo-only — drop when real PDS is wired

  // NHS eligibility triage gate
  const [eligibility, setEligibility] = useState<"pending" | "passed">("pending");
  const [triageOutcome, setTriageOutcome] = useState<EligOutcome | null>(null);
  const [chatOpen, setChatOpen] = useState(false);

  // Payment — admin-configured (see below). `paymentSetting` stands in for the
  // pharmacy's backend config; there is deliberately NO patient-facing choice of
  // whether/how to pay. The demo box lets you preview each admin configuration.
  const initialIsNHS = !!service && service.id.startsWith("nhs-");
  const [paymentSetting, setPaymentSetting] = useState<"off" | "token" | "online" | "counter">(initialIsNHS ? "off" : "online");
  const [card, setCard] = useState({ name: "", number: "", expiry: "", cvc: "" });
  const [payAcknowledged, setPayAcknowledged] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [serviceId]);

  // Reset the journey for each service.
  useEffect(() => {
    setStageIdx(0);
    setEligibility("pending");
    setTriageOutcome(null);
    setChatOpen(false);
    setPaymentSetting(service && service.id.startsWith("nhs-") ? "off" : "online");
    setCard({ name: "", number: "", expiry: "", cvc: "" });
    setPayAcknowledged(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceId]);

  // Backend-configurable journey: the ordered stages, incl. where the questionnaire sits.
  const isNHS = !!service && service.id.startsWith("nhs-");

  // Admin-configured payment. TOKEN_AMOUNT is the advance booking fee ("token"
  // amount) used to reduce DNA; the service fee is derived from the price.
  const TOKEN_AMOUNT = 5;
  const servicePriceNum = (() => {
    const m = service?.price?.match(/\d+/);
    return m ? parseInt(m[0], 10) : 0;
  })();
  const payment: PaymentConfig =
    paymentSetting === "off" ? NO_PAYMENT
    : paymentSetting === "token" ? { enabled: true, kind: "deposit", method: "online", amount: TOKEN_AMOUNT }
    : paymentSetting === "online" ? { enabled: true, kind: "service", method: "online", amount: servicePriceNum }
    : { enabled: true, kind: "service", method: "counter", amount: servicePriceNum };

  const config = getBookingConfig({ isNHS, hasTriage: !!triageFlow, payment });
  const stages = config.steps;
  const stage = stages[stageIdx];
  const hasPayment = stages.includes("payment");

  // Keep the pointer in range if turning payment off shrinks the journey.
  useEffect(() => {
    if (stageIdx > stages.length - 1) setStageIdx(stages.length - 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stages.length]);

  // Open the chat automatically as soon as the patient reaches the eligibility stage.
  useEffect(() => {
    if (stage === "triage" && eligibility !== "passed") setChatOpen(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage]);

  useSeo(
    service
      ? { ...serviceSeo(service, service.id.startsWith("nhs-"), brand), path: `${brand.basePath}/book/${service.id}` }
      : { title: `Service not found | ${brand.name}`, description: "Sorry, we couldn't find that service.", index: false },
  );

  if (!service) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${brand.themeClass}`}>
        <div className="text-center">
          <p className="text-gray-500 mb-4">Service not found</p>
          <button onClick={() => navigate(homePath(brand))} className="text-brand-primary hover:underline cursor-pointer">Back to Home</button>
        </div>
      </div>
    );
  }

  const patientAge = computeAge(patient.dobDay, patient.dobMonth, patient.dobYear);

  const goStage = (kind: StageKind) => { const i = stages.indexOf(kind); if (i >= 0) setStageIdx(i); };
  const goBack = () => setStageIdx((i) => Math.max(0, i - 1));
  const goNext = () => {
    const target = stages[stageIdx + 1];
    if (!target) return;
    // Verifying contact needs the patient details + an NHS PDS lookup first.
    if (target === "contact" && !pdsResult) {
      setPdsLoading(true);
      setTimeout(() => {
        setPdsResult(mockPdsLookup(patient, demoMode));
        setUseNewContact(false);
        setContinuePrivate(false);
        setContactPhone("");
        setContactEmail("");
        setPdsLoading(false);
        setStageIdx((i) => i + 1);
      }, 600);
    } else {
      setStageIdx((i) => i + 1);
    }
  };

  const days = getWeekFromOffset(weekOffset);
  const maxOffset = Math.floor((MAX_DAYS_AHEAD - 1) / 7);
  const canGoPrev = weekOffset > 0;
  const canGoNext = weekOffset < maxOffset && days.length === 7;
  const rangeLabel = days.length
    ? `${days[0].toLocaleDateString("en-GB", { day: "numeric", month: "short" })} – ${days[days.length - 1].toLocaleDateString("en-GB", { day: "numeric", month: "short" })}`
    : "";

  if (submitted) {
    const patientName = `${patient.firstName} ${patient.lastName}`.trim();
    return (
      <div className={`min-h-screen bg-gray-50 flex items-center justify-center p-4 ${brand.themeClass}`}>
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-lg w-full">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-brand-primary/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} className="text-brand-primary" />
            </div>
            <h2 className="text-[1.4rem] text-gray-900 mb-2" style={{ fontWeight: 700 }}>Booking Confirmed!</h2>
            <p className="text-gray-500 mb-6 text-[0.9rem]">
              {patientName ? <>Thanks <strong>{patientName}</strong> — your </> : "Your "}
              appointment for <strong>{service.name}</strong> has been booked. We've sent a confirmation to <strong>{contactEmail || "your email"}</strong>.
            </p>
          </div>

          <div className="bg-gradient-to-br from-brand-light to-brand-light-alt rounded-lg p-4 mb-4 text-[0.9rem] space-y-2">
            <p><span className="text-gray-500">Date:</span> <span style={{ fontWeight: 500 }}>{selectedDate?.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}</span></p>
            <p><span className="text-gray-500">Time:</span> <span style={{ fontWeight: 500 }}>{selectedTime}</span></p>
            <p><span className="text-gray-500">Type:</span> <span style={{ fontWeight: 500 }}>{appointmentType === "face-to-face" ? "Face to Face" : appointmentType === "video" ? "Video Call" : "Telephone"}</span></p>
            <p><span className="text-gray-500">Location:</span> <span style={{ fontWeight: 500 }}>{branch.name} · {branch.address}</span></p>
            <p><span className="text-gray-500">Phone:</span> <span style={{ fontWeight: 500 }}>{contactPhone}</span></p>
            {payment.enabled && (
              <p>
                <span className="text-gray-500">{payment.kind === "deposit" ? "Booking fee:" : "Payment:"}</span>{" "}
                <span style={{ fontWeight: 500 }}>
                  {payment.method === "counter"
                    ? `£${payment.amount.toFixed(2)} due at the pharmacy`
                    : `£${payment.amount.toFixed(2)} paid${payment.kind === "deposit" ? " (advance booking fee)" : " online"}`}
                </span>
              </p>
            )}
          </div>

          <button
            onClick={() => selectedDate && downloadIcs({
              date: selectedDate,
              time: selectedTime,
              title: `${service.name} — ${brand.name}`,
              location: `${branch.name}, ${branch.address}`,
              description: `Appointment type: ${appointmentType === "face-to-face" ? "Face to Face" : appointmentType === "video" ? "Video Call" : "Telephone"}. Booked for ${patientName || "patient"}.`,
            })}
            className="cta cta-outline w-full mb-5 px-5 py-2.5 rounded-lg border-2 border-brand-primary text-brand-primary bg-white hover:bg-brand-light/60 transition-colors cursor-pointer flex items-center justify-center gap-2"
            style={{ fontWeight: 600 }}
          >
            <CalendarPlus size={18} /> Add to Calendar
          </button>

          {/* Pre-consultation questionnaire CTA */}
          <div className="rounded-xl border border-brand-primary/30 bg-gradient-to-br from-brand-light/70 to-white p-5 mb-5">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center shrink-0">
                <ClipboardList size={20} className="text-brand-primary" />
              </div>
              <div>
                <p className="text-[0.95rem] text-gray-900" style={{ fontWeight: 600 }}>Save time at your appointment</p>
                <p className="text-[0.85rem] text-gray-600 mt-0.5">Complete a short pre-consultation questionnaire now and the pharmacist can consult you more quickly and easily. It's optional — you can also do it on the day.</p>
              </div>
            </div>
            <button
              onClick={() => navigate(`${brand.basePath}/questionnaire/${service.id}`)}
              className="cta cta-primary w-full bg-brand-primary text-white px-6 py-2.5 rounded-lg hover:shadow-lg hover:shadow-emerald-900/20 transition-all cursor-pointer flex items-center justify-center gap-2"
              style={{ fontWeight: 600 }}
            >
              Complete pre-consultation questionnaire <ChevronRight size={16} />
            </button>
          </div>

          <button
            onClick={() => navigate(homePath(brand))}
            className="w-full px-5 py-2.5 rounded-lg border border-gray-200 text-gray-600 bg-white hover:bg-gray-50 hover:text-gray-800 transition-colors cursor-pointer flex items-center justify-center gap-2 text-[0.9rem]"
            style={{ fontWeight: 500 }}
          >
            <Home size={16} /> Skip and go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-b from-brand-secondary/5 via-gray-50 to-white ${brand.themeClass}`}>
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3">
          <button onClick={() => navigate(homePath(brand))} className="text-gray-500 hover:text-gray-700 cursor-pointer"><ArrowLeft size={20} /></button>
          <div>
            <h1 className="text-[1.1rem] text-gray-900" style={{ fontWeight: 700 }}>Book: {service.name}</h1>
            <p className="text-[0.8rem] text-gray-500">{service.description}</p>
          </div>
          {(service.price || isNHS) && (
            <span className={`ml-auto px-3 py-1 rounded-full text-[0.8rem] shrink-0 ${isNHS ? "bg-brand-primary/10 text-brand-primary" : "bg-brand-secondary/10 text-brand-secondary"}`} style={{ fontWeight: 600 }}>
              {isNHS ? "Free (NHS)" : service.price?.replace(/From (\d)/, "From £$1")}
            </span>
          )}
        </div>
      </div>

      {/* Branch / ConX location — clearly visible, persists across steps */}
      {multiBranch && (
        <div className="max-w-3xl mx-auto px-4 pt-5">
          <BranchSelector
            selected={branch}
            reason={branchReason}
            locations={branches}
            userCoords={userCoords}
            onSelect={selectLocation}
          />
        </div>
      )}

      {/* Steps indicator — driven by the configured stage order */}
      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="flex items-center gap-2 mb-8">
          {stages.map((kind, i) => (
            <div key={kind} className="flex items-center gap-2 flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[0.8rem] shrink-0 ${i <= stageIdx ? "bg-brand-primary text-white" : "bg-gray-200 text-gray-500"}`} style={{ fontWeight: 600 }}>{i + 1}</div>
              <span className={`text-[0.85rem] hidden sm:inline ${i <= stageIdx ? "text-gray-900" : "text-gray-400"}`} style={{ fontWeight: 500 }}>{STAGE_LABELS[kind]}</span>
              {i < stages.length - 1 && <div className={`flex-1 h-0.5 ${i < stageIdx ? "bg-brand-primary" : "bg-gray-200"}`} />}
            </div>
          ))}
        </div>

        {/* Admin-config simulation (demo only) — the pharmacy sets payment from
            the backend; the patient never chooses. Drop this box when the real
            admin config is wired in. */}
        <div className="rounded-lg border border-dashed border-brand-primary/40 bg-brand-light/40 p-3 mb-6 flex flex-col lg:flex-row lg:items-center gap-3">
          <div className="flex items-center gap-2 text-[0.78rem] text-brand-primary shrink-0" style={{ fontWeight: 600 }}>
            <Info size={14} /> Demo · admin payment config
          </div>
          <p className="text-[0.78rem] text-gray-600 flex-1">Set by the pharmacy — not shown as a patient choice:</p>
          <div className="flex flex-wrap gap-2">
            {(isNHS
              ? ([{ v: "off", l: "No payment" }, { v: "token", l: `Advance fee £${TOKEN_AMOUNT}` }] as const)
              : ([{ v: "off", l: "No payment" }, { v: "token", l: `Advance fee £${TOKEN_AMOUNT}` }, { v: "online", l: `Pay online £${servicePriceNum}` }, { v: "counter", l: `Pay at counter £${servicePriceNum}` }] as const)
            ).map((opt) => (
              <button
                key={opt.v}
                type="button"
                onClick={() => setPaymentSetting(opt.v)}
                className={`px-3 py-1.5 rounded-md text-[0.78rem] border transition-colors cursor-pointer ${paymentSetting === opt.v ? "border-brand-primary bg-brand-primary text-white" : "border-brand-primary/30 text-gray-700 bg-white hover:border-brand-primary/60"}`}
                style={{ fontWeight: 500 }}
              >
                {opt.l}
              </button>
            ))}
          </div>
        </div>

        {/* Eligibility stage */}
        {stage === "triage" && triageFlow && (
          eligibility === "passed" ? (
            <div className="max-w-xl mx-auto bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 text-center">
              <span className="w-14 h-14 rounded-2xl bg-brand-secondary/12 text-brand-green-ink flex items-center justify-center mx-auto mb-4"><ShieldCheck size={26} /></span>
              <h3 className="text-gray-900 text-[1.25rem] mb-2" style={{ fontWeight: 700 }}>Eligibility confirmed</h3>
              <p className="text-gray-500 text-[0.92rem] max-w-md mx-auto mb-6">You're good to go — let's get the rest of your booking sorted.</p>
              <div className="flex items-center justify-center gap-3">
                {stageIdx > 0 && <button onClick={goBack} className="text-gray-500 hover:text-gray-700 text-[0.9rem] cursor-pointer">Back</button>}
                <button onClick={goNext} className="cta cta-primary bg-brand-primary text-white px-6 py-2.5 rounded-lg cursor-pointer inline-flex items-center gap-2" style={{ fontWeight: 600 }}>Continue <ChevronRight size={16} /></button>
              </div>
            </div>
          ) : (
            <EligibilityGate flow={triageFlow} brand={brand} outcome={triageOutcome} onStart={() => setChatOpen(true)} />
          )
        )}

        {stage === "datetime" && (
          <>
            {/* Pharmacy & Appointment Type card */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-4">
              <div className="flex items-start gap-4 mb-6">
                {brand.logoMark ? (
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center overflow-hidden shrink-0">
                    <img src={brand.logoMark} alt={brand.name} className="w-full h-full object-contain" />
                  </div>
                ) : brand.logoIsWordmark ? (
                  <img src={brand.logo} alt={brand.name} className="h-9 w-auto shrink-0" />
                ) : (
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center overflow-hidden shrink-0">
                    <img src={brand.logo} alt={brand.name} className="w-full h-full object-contain" />
                  </div>
                )}
                <div>
                  <p className="text-[0.8rem] text-gray-400" style={{ fontWeight: 500 }}>You're booking with</p>
                  <p className="text-[1.05rem] text-gray-900" style={{ fontWeight: 700 }}>{brand.name}</p>
                  <p className="text-[0.82rem] text-gray-500 flex items-center gap-1.5 mt-0.5"><MapPin size={13} className="text-brand-accent" /> {branch.address}</p>
                </div>
              </div>

              <h3 className="text-gray-900 mb-3 text-[0.9rem]" style={{ fontWeight: 600 }}>Appointment Type</h3>
              <div className="grid grid-cols-3 gap-3">
                {([
                  { value: "face-to-face" as const, label: "Face to Face", icon: MapPin, desc: "Visit in person" },
                  { value: "video" as const, label: "Video Call", icon: Video, desc: "Online consultation" },
                  { value: "telephone" as const, label: "Telephone", icon: PhoneCall, desc: "Phone consultation" },
                ]).map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setAppointmentType(opt.value)}
                    className={`p-4 rounded-xl border-2 text-center transition-all cursor-pointer ${appointmentType === opt.value ? "border-brand-primary bg-brand-primary/5" : "border-gray-100 hover:border-gray-300"}`}
                  >
                    <opt.icon size={22} className={`mx-auto mb-2 ${appointmentType === opt.value ? "text-brand-primary" : "text-gray-400"}`} />
                    <p className={`text-[0.82rem] ${appointmentType === opt.value ? "text-brand-primary" : "text-gray-700"}`} style={{ fontWeight: 600 }}>{opt.label}</p>
                    <p className="text-[0.72rem] text-gray-400 mt-0.5">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Next available — quick pick */}
            {(() => {
              const next = getNextAvailable();
              if (!next) return null;
              const isSelected = selectedDate?.toDateString() === next.date.toDateString() && selectedTime === next.time;
              const dateLabel = next.date.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });
              const today = new Date();
              const diff = Math.round((next.date.getTime() - new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime()) / 86400000);
              const relative = diff === 1 ? "Tomorrow" : diff < 7 ? `In ${diff} days` : dateLabel;
              return (
                <div className="bg-gradient-to-br from-brand-primary to-brand-primary-mid rounded-xl shadow-sm p-5 mb-4 text-white">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center shrink-0">
                      <Zap size={22} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[0.75rem] uppercase tracking-wide text-white/80" style={{ fontWeight: 600 }}>Soonest available</p>
                      <p className="text-[1.05rem] leading-tight mt-0.5" style={{ fontWeight: 700 }}>{relative} at {next.time}</p>
                      <p className="text-[0.82rem] text-white/85 mt-0.5">{dateLabel}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedDate(next.date);
                        setSelectedTime(next.time);
                        const today2 = new Date();
                        const dayIdx = Math.floor((next.date.getTime() - today2.getTime()) / 86400000);
                        setWeekOffset(Math.max(0, Math.floor((dayIdx - 1) / 7)));
                      }}
                      disabled={isSelected}
                      className="cta cta-light px-5 py-2.5 rounded-lg bg-white text-brand-primary hover:bg-brand-light transition-colors cursor-pointer disabled:opacity-70 disabled:cursor-default flex items-center justify-center gap-2 shrink-0"
                      style={{ fontWeight: 600 }}
                    >
                      {isSelected ? <><CheckCircle size={16} /> Selected</> : <>Book this slot <ChevronRight size={16} /></>}
                    </button>
                  </div>
                </div>
              );
            })()}

            {/* Date & Time card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-2 gap-3">
                <p className="text-[0.82rem] text-gray-500">Or pick a different date and time below</p>
              </div>
              <div className="flex items-center justify-between mb-4 gap-3">
                <h3 className="text-gray-900 flex items-center gap-2" style={{ fontWeight: 600 }}><Calendar size={18} className="text-brand-accent" /> Select a Date</h3>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setWeekOffset((o) => Math.max(0, o - 1))}
                    disabled={!canGoPrev}
                    aria-label="Previous week"
                    className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:border-brand-primary hover:text-brand-primary disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <span className="text-[0.8rem] text-gray-600 min-w-[8.5rem] text-center" style={{ fontWeight: 500 }}>{rangeLabel}</span>
                  <button
                    type="button"
                    onClick={() => setWeekOffset((o) => Math.min(maxOffset, o + 1))}
                    disabled={!canGoNext}
                    aria-label="Next week"
                    className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:border-brand-primary hover:text-brand-primary disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 mb-8">
                {days.map((d) => {
                  const unavailable = isDateUnavailable(d);
                  const isSelected = selectedDate?.toDateString() === d.toDateString();
                  return (
                    <button
                      key={d.toISOString()}
                      onClick={() => !unavailable && setSelectedDate(d)}
                      disabled={unavailable}
                      aria-disabled={unavailable}
                      title={unavailable ? getUnavailableReason(d) : undefined}
                      className={`relative p-3 rounded-lg text-center transition-colors border ${
                        unavailable
                          ? "border-gray-100 bg-gray-50 cursor-not-allowed opacity-60"
                          : isSelected
                          ? "border-brand-primary bg-brand-primary/5 cursor-pointer"
                          : "border-gray-100 hover:border-gray-300 cursor-pointer"
                      }`}
                    >
                      <div className={`text-[0.72rem] ${unavailable ? "text-gray-400" : "text-gray-500"}`}>{d.toLocaleDateString("en-GB", { weekday: "short" })}</div>
                      <div className={`text-[1.1rem] ${unavailable ? "text-gray-400 line-through" : "text-gray-900"}`} style={{ fontWeight: 600 }}>{d.getDate()}</div>
                      <div className={`text-[0.7rem] ${unavailable ? "text-gray-400" : "text-gray-400"}`}>
                        {unavailable ? getUnavailableReason(d) : d.toLocaleDateString("en-GB", { month: "short" })}
                      </div>
                    </button>
                  );
                })}
              </div>

              {selectedDate && (
                <>
                  <h3 className="text-gray-900 mb-4 flex items-center gap-2" style={{ fontWeight: 600 }}><Clock size={18} className="text-brand-accent" /> Select a Time</h3>
                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                    {timeSlots.map((t) => {
                      const taken = isTimeSlotUnavailable(selectedDate, t);
                      const isSel = selectedTime === t;
                      return (
                        <button
                          key={t}
                          onClick={() => !taken && setSelectedTime(t)}
                          disabled={taken}
                          title={taken ? "Slot unavailable" : undefined}
                          className={`py-2 rounded-lg text-[0.82rem] transition-colors border ${
                            taken
                              ? "border-gray-100 bg-gray-50 text-gray-400 line-through cursor-not-allowed"
                              : isSel
                              ? "border-brand-primary bg-brand-primary text-white cursor-pointer"
                              : "border-gray-100 text-gray-700 hover:border-gray-300 cursor-pointer"
                          }`}
                          style={{ fontWeight: 500 }}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}

              <div className="mt-8 flex justify-end">
                <button
                  disabled={!selectedDate || !selectedTime}
                  onClick={goNext}
                  className="cta cta-primary bg-brand-primary text-white px-6 py-2.5 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-emerald-900/20 transition-all cursor-pointer"
                >
                  Continue
                </button>
              </div>
            </div>
          </>
        )}

        {(stage === "details" || stage === "contact" || stage === "payment") && selectedDate && selectedTime && (
          <>
            {/* Pharmacy & Booking Summary */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-4">
              <div className="flex items-start gap-4 mb-5">
                {brand.logoMark ? (
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center overflow-hidden shrink-0">
                    <img src={brand.logoMark} alt={brand.name} className="w-full h-full object-contain" />
                  </div>
                ) : brand.logoIsWordmark ? (
                  <img src={brand.logo} alt={brand.name} className="h-9 w-auto shrink-0" />
                ) : (
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center overflow-hidden shrink-0">
                    <img src={brand.logo} alt={brand.name} className="w-full h-full object-contain" />
                  </div>
                )}
                <div>
                  <p className="text-[0.8rem] text-gray-400" style={{ fontWeight: 500 }}>You're booking with</p>
                  <p className="text-[1.05rem] text-gray-900" style={{ fontWeight: 700 }}>{brand.name}</p>
                  <p className="text-[0.82rem] text-gray-500 flex items-center gap-1.5 mt-0.5"><MapPin size={13} className="text-brand-accent" /> {branch.address}</p>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-[0.85rem] text-gray-900" style={{ fontWeight: 600 }}>Appointment Summary</h4>
                  <button onClick={() => goStage("datetime")} className="flex items-center gap-1.5 text-[0.8rem] text-brand-primary hover:text-brand-primary-hover transition-colors cursor-pointer" style={{ fontWeight: 500 }}>
                    <Pencil size={13} /> Change
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-gradient-to-br from-brand-light to-brand-light-alt rounded-lg px-4 py-3">
                    <p className="text-[0.72rem] text-gray-400 mb-0.5" style={{ fontWeight: 500 }}>Date</p>
                    <p className="text-[0.88rem] text-gray-900" style={{ fontWeight: 600 }}>{selectedDate?.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" })}</p>
                  </div>
                  <div className="bg-gradient-to-br from-brand-light to-brand-light-alt rounded-lg px-4 py-3">
                    <p className="text-[0.72rem] text-gray-400 mb-0.5" style={{ fontWeight: 500 }}>Time</p>
                    <p className="text-[0.88rem] text-gray-900" style={{ fontWeight: 600 }}>{selectedTime}</p>
                  </div>
                  <div className="bg-gradient-to-br from-brand-light to-brand-light-alt rounded-lg px-4 py-3">
                    <p className="text-[0.72rem] text-gray-400 mb-0.5" style={{ fontWeight: 500 }}>Type</p>
                    <p className="text-[0.88rem] text-gray-900" style={{ fontWeight: 600 }}>{appointmentType === "face-to-face" ? "Face to Face" : appointmentType === "video" ? "Video Call" : "Telephone"}</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {stage === "details" && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-gray-900 text-[1rem] mb-1.5" style={{ fontWeight: 600 }}>Patient information</h3>
            <p className="text-[0.82rem] text-gray-500 mb-5 flex items-center gap-1.5"><ShieldCheck size={14} className="text-brand-accent" /> We'll check this against your NHS records to verify your identity.</p>

            {/* Demo-only toggle — remove once real NHS PDS API is wired in */}
            <div className="rounded-lg border border-dashed border-brand-primary/40 bg-brand-light/40 p-3 mb-5 flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex items-center gap-2 text-[0.78rem] text-brand-primary" style={{ fontWeight: 600 }}>
                <Info size={14} /> Demo
              </div>
              <p className="text-[0.78rem] text-gray-600 flex-1">Simulate the NHS PDS response for this submission:</p>
              <div className="flex gap-2">
                {([
                  { value: "match" as const, label: "Match" },
                  { value: "no-match" as const, label: "No match" },
                ]).map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setDemoMode(opt.value)}
                    className={`px-3 py-1.5 rounded-md text-[0.78rem] border transition-colors cursor-pointer ${demoMode === opt.value ? "border-brand-primary bg-brand-primary text-white" : "border-brand-primary/30 text-gray-700 bg-white hover:border-brand-primary/60"}`}
                    style={{ fontWeight: 500 }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="min-w-0">
                  <label className="text-[0.85rem] text-gray-700 mb-1.5 block" style={{ fontWeight: 500 }}>First name *</label>
                  <input value={patient.firstName} onChange={(e) => setPatient({ ...patient, firstName: e.target.value })} className="w-full px-4 py-2.5 border border-brand-primary/30 rounded-lg text-[0.9rem] focus:outline-none focus:ring-2 focus:ring-brand-primary/30" placeholder="Enter your first name" />
                </div>
                <div className="min-w-0">
                  <label className="text-[0.85rem] text-gray-700 mb-1.5 block" style={{ fontWeight: 500 }}>Last name *</label>
                  <input value={patient.lastName} onChange={(e) => setPatient({ ...patient, lastName: e.target.value })} className="w-full px-4 py-2.5 border border-brand-primary/30 rounded-lg text-[0.9rem] focus:outline-none focus:ring-2 focus:ring-brand-primary/30" placeholder="Enter your last name" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="min-w-0">
                  <label className="text-[0.85rem] text-gray-700 mb-1.5 block" style={{ fontWeight: 500 }}>Date of birth *</label>
                  <div className="flex gap-2">
                    <input inputMode="numeric" maxLength={2} value={patient.dobDay} onChange={(e) => setPatient({ ...patient, dobDay: e.target.value.replace(/\D/g, "") })} className="w-14 px-2 py-2.5 border border-brand-primary/30 rounded-lg text-[0.9rem] text-center focus:outline-none focus:ring-2 focus:ring-brand-primary/30" placeholder="DD" />
                    <input inputMode="numeric" maxLength={2} value={patient.dobMonth} onChange={(e) => setPatient({ ...patient, dobMonth: e.target.value.replace(/\D/g, "") })} className="w-14 px-2 py-2.5 border border-brand-primary/30 rounded-lg text-[0.9rem] text-center focus:outline-none focus:ring-2 focus:ring-brand-primary/30" placeholder="MM" />
                    <input inputMode="numeric" maxLength={4} value={patient.dobYear} onChange={(e) => setPatient({ ...patient, dobYear: e.target.value.replace(/\D/g, "") })} className="flex-1 min-w-0 px-3 py-2.5 border border-brand-primary/30 rounded-lg text-[0.9rem] text-center focus:outline-none focus:ring-2 focus:ring-brand-primary/30" placeholder="YYYY" />
                  </div>
                </div>
                <div className="min-w-0">
                  <label className="text-[0.85rem] text-gray-700 mb-1.5 block" style={{ fontWeight: 500 }}>Gender at birth *</label>
                  <div className="flex gap-2">
                    {([
                      { value: "male" as const, label: "Male" },
                      { value: "female" as const, label: "Female" },
                    ]).map((g) => (
                      <button
                        type="button"
                        key={g.value}
                        onClick={() => setPatient({ ...patient, gender: g.value })}
                        className={`flex-1 min-w-0 px-3 py-2.5 rounded-lg border text-[0.85rem] transition-colors cursor-pointer flex items-center justify-center gap-2 ${patient.gender === g.value ? "border-brand-primary bg-brand-primary/5 text-brand-primary" : "border-brand-primary/30 text-gray-700 hover:border-brand-primary/60"}`}
                        style={{ fontWeight: 600 }}
                      >
                        <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${patient.gender === g.value ? "border-brand-primary" : "border-brand-primary/40"}`}>
                          {patient.gender === g.value && <span className="w-2 h-2 rounded-full bg-brand-primary" />}
                        </span>
                        {g.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="sm:max-w-xs">
                <label className="text-[0.85rem] text-gray-700 mb-1.5 block" style={{ fontWeight: 500 }}>Postal code *</label>
                <input value={patient.postcode} onChange={(e) => setPatient({ ...patient, postcode: e.target.value.toUpperCase() })} className="w-full px-4 py-2.5 border border-brand-primary/30 rounded-lg text-[0.9rem] focus:outline-none focus:ring-2 focus:ring-brand-primary/30" placeholder="Enter your postcode" />
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              {stageIdx > 0 ? (
                <button onClick={goBack} className="text-gray-500 hover:text-gray-700 text-[0.9rem] cursor-pointer">Back</button>
              ) : <span />}
              <div className="flex items-center gap-3 sm:ml-auto">
                <p className="text-[0.78rem] text-gray-500 max-w-[16rem] hidden sm:block">Check the entered information matches your NHS records.</p>
                <button
                  disabled={
                    pdsLoading ||
                    !patient.firstName ||
                    !patient.lastName ||
                    !patient.dobDay ||
                    !patient.dobMonth ||
                    !patient.dobYear ||
                    !patient.gender ||
                    !patient.postcode
                  }
                  onClick={goNext}
                  className="cta cta-primary bg-brand-primary text-white px-6 py-2.5 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-emerald-900/20 transition-all cursor-pointer flex items-center gap-2"
                  style={{ fontWeight: 600 }}
                >
                  {pdsLoading ? "Checking NHS records…" : "Continue"}
                </button>
              </div>
            </div>
          </div>
        )}

        {stage === "contact" && pdsResult && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-gray-900 text-[1rem] mb-5" style={{ fontWeight: 600 }}>Verify contact details</h3>

            {pdsResult.matched && !useNewContact && (
              <>
                <div className="flex items-start gap-3 mb-5">
                  <div className="w-11 h-11 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                    <ThumbsUp size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-[1.05rem] text-gray-900" style={{ fontWeight: 600 }}>It's a match!</p>
                    <p className="text-[0.88rem] text-gray-600">We've retrieved your contact details from NHS records. Please confirm them below by entering the full phone number and email address.</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-[0.85rem] text-gray-700" style={{ fontWeight: 500 }}>Phone number</label>
                      <span className="text-[0.82rem] text-brand-primary" style={{ fontWeight: 500 }}>{pdsResult.maskedPhone}</span>
                    </div>
                    <input value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} className="w-full px-4 py-2.5 border border-brand-primary/30 rounded-lg text-[0.9rem] focus:outline-none focus:ring-2 focus:ring-brand-primary/30" placeholder="Confirm phone number" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-[0.85rem] text-gray-700" style={{ fontWeight: 500 }}>Email</label>
                      <span className="text-[0.82rem] text-brand-primary" style={{ fontWeight: 500 }}>{pdsResult.maskedEmail}</span>
                    </div>
                    <input value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} className="w-full px-4 py-2.5 border border-brand-primary/30 rounded-lg text-[0.9rem] focus:outline-none focus:ring-2 focus:ring-brand-primary/30" placeholder="Confirm email address" />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => { setUseNewContact(true); setContactPhone(""); setContactEmail(""); }}
                  className="mt-3 inline-flex items-center gap-1.5 text-[0.85rem] text-brand-primary hover:text-brand-primary-hover transition-colors cursor-pointer"
                  style={{ fontWeight: 500 }}
                >
                  No longer use these? Enter new contact details instead
                  <Info size={14} />
                </button>
              </>
            )}

            {pdsResult.matched && useNewContact && (
              <>
                <div className="rounded-lg bg-brand-light/60 border border-brand-primary/20 p-4 mb-5 text-[0.85rem] text-gray-700 flex items-start gap-2.5">
                  <Info size={16} className="text-brand-primary mt-0.5 shrink-0" />
                  <p>We'll use the new details below for this booking. Your NHS record won't be updated — please contact your GP to change it permanently.</p>
                </div>
                <ContactInputs phone={contactPhone} email={contactEmail} onPhone={setContactPhone} onEmail={setContactEmail} />
                <button
                  type="button"
                  onClick={() => { setUseNewContact(false); setContactPhone(""); setContactEmail(""); }}
                  className="mt-3 text-[0.85rem] text-brand-primary hover:text-brand-primary-hover transition-colors cursor-pointer"
                  style={{ fontWeight: 500 }}
                >
                  ← Use the details on file instead
                </button>
              </>
            )}

            {!pdsResult.matched && (
              <>
                <div className="flex items-start gap-3 mb-5">
                  <div className="w-11 h-11 rounded-full bg-orange-500 flex items-center justify-center shrink-0">
                    <AlertTriangle size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-[1.05rem] text-gray-900" style={{ fontWeight: 600 }}>We couldn't find a matching NHS record</p>
                    <p className="text-[0.88rem] text-gray-600 mt-1">
                      {isNHS ? (
                        <>This service is normally free under the NHS. Please check the details you entered, or continue as a <span style={{ fontWeight: 600 }}>private consultation</span> (this <span className="underline">won't be covered by the NHS</span>).</>
                      ) : (
                        <>No problem — this is a private service. Enter your contact details below to continue.</>
                      )}
                    </p>
                  </div>
                </div>

                {isNHS && !continuePrivate && (
                  <div className="grid sm:grid-cols-2 gap-3 mb-2">
                    <button
                      type="button"
                      onClick={() => { setPdsResult(null); goStage("details"); }}
                      className="cta cta-outline px-5 py-3 rounded-lg border-2 border-brand-primary text-brand-primary bg-white hover:bg-brand-light/60 transition-colors cursor-pointer flex items-center justify-center gap-2"
                      style={{ fontWeight: 600 }}
                    >
                      <RotateCcw size={16} /> Check details &amp; try again
                    </button>
                    <button
                      type="button"
                      onClick={() => setContinuePrivate(true)}
                      className="px-5 py-3 rounded-lg bg-orange-500 text-white hover:shadow-lg hover:shadow-orange-500/30 transition-all cursor-pointer flex items-center justify-center gap-2"
                      style={{ fontWeight: 600 }}
                    >
                      Continue as private consultation <ChevronRight size={16} />
                    </button>
                  </div>
                )}

                {isNHS && continuePrivate && (
                  <div className="rounded-lg bg-orange-50 border border-orange-200 p-3 mb-4 flex items-start justify-between gap-3">
                    <p className="text-[0.85rem] text-gray-700 flex items-start gap-2"><Info size={16} className="text-orange-500 mt-0.5 shrink-0" /> You're continuing as a private consultation. This won't be covered by the NHS.</p>
                    <button type="button" onClick={() => setContinuePrivate(false)} className="text-[0.8rem] text-brand-primary hover:text-brand-primary-hover cursor-pointer shrink-0" style={{ fontWeight: 500 }}>Change</button>
                  </div>
                )}

                {(!isNHS || continuePrivate) && (
                  <ContactInputs phone={contactPhone} email={contactEmail} onPhone={setContactPhone} onEmail={setContactEmail} />
                )}
              </>
            )}

            <div className="mt-6">
              <label className="text-[0.85rem] text-gray-700 mb-1.5 block" style={{ fontWeight: 500 }}>Notes (optional)</label>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} className="w-full px-4 py-2.5 border border-brand-primary/30 rounded-lg text-[0.9rem] focus:outline-none focus:ring-2 focus:ring-brand-primary/30 resize-none" placeholder="Anything the pharmacist should know in advance?" />
            </div>

            <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <button onClick={goBack} className="text-gray-500 hover:text-gray-700 text-[0.9rem] cursor-pointer text-left">Back</button>
              <div className="flex flex-col sm:items-end gap-1.5">
                <button
                  disabled={
                    !contactPhone ||
                    !contactEmail ||
                    (!pdsResult.matched && isNHS && !continuePrivate)
                  }
                  onClick={() => (hasPayment ? goNext() : setSubmitted(true))}
                  className="cta cta-primary bg-brand-primary text-white px-6 py-2.5 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-emerald-900/20 transition-all cursor-pointer flex items-center justify-center gap-2"
                  style={{ fontWeight: 600 }}
                >
                  {hasPayment ? "Continue to payment" : "Confirm Booking"} <ChevronRight size={16} />
                </button>
                <p className="text-[0.75rem] text-gray-500 sm:text-right max-w-xs">
                  By continuing you agree to our <a href="#" className="text-brand-primary underline">terms and conditions</a> and <a href="#" className="text-brand-primary underline">privacy policy</a>.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Payment stage — admin-configured; the patient just follows it. */}
        {stage === "payment" && payment.enabled && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-start gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl bg-brand-primary/10 flex items-center justify-center shrink-0">
                {payment.method === "counter" ? <Store size={22} className="text-brand-primary" /> : <CreditCard size={22} className="text-brand-primary" />}
              </div>
              <div>
                <h3 className="text-gray-900 text-[1rem]" style={{ fontWeight: 600 }}>
                  {payment.kind === "deposit" ? "Secure your appointment" : payment.method === "counter" ? "Payment at the pharmacy" : "Payment"}
                </h3>
                <p className="text-[0.85rem] text-gray-600 mt-0.5">
                  {payment.kind === "deposit"
                    ? `A £${payment.amount} advance booking fee helps us reduce missed appointments and secures your slot.`
                    : payment.method === "counter"
                    ? "Payment for this service is taken over the counter at the pharmacy when you attend."
                    : "Pay securely online to confirm your booking."}
                </p>
              </div>
            </div>

            {/* Amount */}
            <div className="rounded-xl border border-brand-primary/20 bg-gradient-to-br from-brand-light to-brand-light-alt p-4 mb-6">
              <p className="text-[0.75rem] text-gray-500" style={{ fontWeight: 500 }}>
                {payment.kind === "deposit" ? "Advance booking fee" : "Amount"}{payment.method === "counter" ? " · payable on arrival" : ""}
              </p>
              <p className="text-[1.7rem] text-gray-900 leading-tight" style={{ fontWeight: 700 }}>£{payment.amount.toFixed(2)}</p>
              {payment.kind === "deposit" && isNHS && (
                <p className="text-[0.78rem] text-gray-500 mt-1">This NHS consultation is free — the fee only secures your appointment.</p>
              )}
            </div>

            {payment.method === "online" ? (
              (() => {
                const digits = card.number.replace(/\s/g, "");
                const cardValid = card.name.trim().length > 1 && digits.length >= 12 && card.expiry.trim().length >= 4 && card.cvc.trim().length >= 3;
                return (
                  <>
                    <div className="space-y-4">
                      <div>
                        <label className="text-[0.85rem] text-gray-700 mb-1.5 block" style={{ fontWeight: 500 }}>Name on card *</label>
                        <input value={card.name} onChange={(e) => setCard({ ...card, name: e.target.value })} className="w-full px-4 py-2.5 border border-brand-primary/30 rounded-lg text-[0.9rem] focus:outline-none focus:ring-2 focus:ring-brand-primary/30" placeholder="Name as shown on card" />
                      </div>
                      <div>
                        <label className="text-[0.85rem] text-gray-700 mb-1.5 block" style={{ fontWeight: 500 }}>Card number *</label>
                        <div className="relative">
                          <CreditCard size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            inputMode="numeric"
                            value={card.number}
                            onChange={(e) => {
                              const d = e.target.value.replace(/\D/g, "").slice(0, 16);
                              setCard({ ...card, number: d.replace(/(.{4})/g, "$1 ").trim() });
                            }}
                            className="w-full pl-10 pr-4 py-2.5 border border-brand-primary/30 rounded-lg text-[0.9rem] focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                            placeholder="1234 5678 9012 3456"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="min-w-0">
                          <label className="text-[0.85rem] text-gray-700 mb-1.5 block" style={{ fontWeight: 500 }}>Expiry (MM/YY) *</label>
                          <input
                            inputMode="numeric"
                            value={card.expiry}
                            onChange={(e) => {
                              const d = e.target.value.replace(/\D/g, "").slice(0, 4);
                              setCard({ ...card, expiry: d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d });
                            }}
                            className="w-full px-4 py-2.5 border border-brand-primary/30 rounded-lg text-[0.9rem] focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                            placeholder="MM/YY"
                          />
                        </div>
                        <div className="min-w-0">
                          <label className="text-[0.85rem] text-gray-700 mb-1.5 block" style={{ fontWeight: 500 }}>CVC *</label>
                          <input
                            inputMode="numeric"
                            value={card.cvc}
                            onChange={(e) => setCard({ ...card, cvc: e.target.value.replace(/\D/g, "").slice(0, 4) })}
                            className="w-full px-4 py-2.5 border border-brand-primary/30 rounded-lg text-[0.9rem] focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                            placeholder="123"
                          />
                        </div>
                      </div>
                    </div>
                    <p className="text-[0.75rem] text-gray-500 mt-3 flex items-center gap-1.5"><Lock size={13} className="text-brand-accent" /> Secure payment — demo only, no real card is charged.</p>

                    <div className="mt-8 flex items-center justify-between gap-3">
                      <button onClick={goBack} className="text-gray-500 hover:text-gray-700 text-[0.9rem] cursor-pointer">Back</button>
                      <button
                        disabled={!cardValid}
                        onClick={() => setSubmitted(true)}
                        className="cta cta-primary bg-brand-primary text-white px-6 py-2.5 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-emerald-900/20 transition-all cursor-pointer flex items-center justify-center gap-2"
                        style={{ fontWeight: 600 }}
                      >
                        <Lock size={15} /> Pay £{payment.amount.toFixed(2)} &amp; confirm
                      </button>
                    </div>
                  </>
                );
              })()
            ) : (
              <>
                <label className="flex items-start gap-3 rounded-lg border border-brand-primary/20 bg-brand-light/40 p-4 cursor-pointer">
                  <input type="checkbox" checked={payAcknowledged} onChange={(e) => setPayAcknowledged(e.target.checked)} className="mt-0.5 w-4 h-4 accent-[var(--brand-primary)] cursor-pointer" />
                  <span className="text-[0.88rem] text-gray-700">I understand £{payment.amount.toFixed(2)} is payable at the pharmacy when I attend my appointment.</span>
                </label>

                <div className="mt-8 flex items-center justify-between gap-3">
                  <button onClick={goBack} className="text-gray-500 hover:text-gray-700 text-[0.9rem] cursor-pointer">Back</button>
                  <button
                    disabled={!payAcknowledged}
                    onClick={() => setSubmitted(true)}
                    className="cta cta-primary bg-brand-primary text-white px-6 py-2.5 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-emerald-900/20 transition-all cursor-pointer flex items-center justify-center gap-2"
                    style={{ fontWeight: 600 }}
                  >
                    Confirm Booking <ChevronRight size={16} />
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* SEO Service Info Section */}
      <ServiceInfoSection
        content={getServiceContent(service.id, service.category)}
        serviceName={service.name}
        isNHS={isNHS}
        brand={brand}
      />

      <Footer brand={brand} variant="compact" />

      {/* NHS eligibility triage — chat-style, gates booking for Pharmacy First conditions */}
      {triageFlow && (
        <EligibilityChat
          flow={triageFlow}
          brand={brand}
          open={chatOpen}
          context={{ age: patientAge }}
          onClose={() => setChatOpen(false)}
          onEligible={() => {
            setEligibility("passed");
            setChatOpen(false);
            if (stage === "triage") setStageIdx((i) => i + 1); // advance past the eligibility stage
            window.scrollTo({ top: 0, behavior: "instant" });
          }}
          onOutcome={(o) => setTriageOutcome(o)}
        />
      )}
    </div>
  );
}