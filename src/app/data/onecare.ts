import type { PharmacyLocation } from "./locations";
import imgConsult from "../../assets/about-1.jpeg";
import imgBloodPressure from "../../assets/about-2.jpeg";
import imgFamily from "../../assets/about-bg.jpeg";
import imgCounter from "../../assets/about-hero.jpeg";
import imgEarWax from "../../assets/ear-wax.jpeg";
import imgPharmacist from "../../assets/hero-bg.jpeg";
import imgFriends from "../../assets/image-bg.jpeg";
import imgTravel from "../../assets/travel.jpeg";
import imgSoreThroat from "../../assets/sorethroat.jpg";
import imgWeightConsult from "../../assets/onecare/weight-consult.webp";
import imgTravelClinic from "../../assets/onecare/travel-clinic.webp";

/** Fluent 3D illustrations (MIT, Microsoft), keyed by file name: `ic.syringe`, `ic.mosquito`, ... */
const ICONS = import.meta.glob<string>("../../assets/onecare/icons3d/*.png", { eager: true, import: "default" });
export const ic: Record<string, string> = Object.fromEntries(
  Object.entries(ICONS).map(([path, url]) => [path.split("/").pop()!.replace(".png", ""), url]),
);

/**
 * OneCare Pharmacy — the single source of truth for both branches, the service
 * list, Pharmacy First, FAQs and legal details (DESIGN.md §1, §7).
 *
 * RULE: never invent facts. Anything unknown is the literal `[REPLACE…]` string
 * so it stays visible on the page and is listed in ONECARE-TODO.md.
 */

export const REPLACE = "[REPLACE]";
/** True for a still-unknown value (renders as a visible placeholder, never a live link). */
export const isTbc = (v?: string | null): boolean => !v || v.includes("[REPLACE");

// ── Branches ──────────────────────────────────────────────────────────────

export type DayKey = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
export type Interval = { open: string; close: string }; // "HH:MM", 24h, Europe/London
export type DayHours = Interval[] | "closed";
export type WeekHours = Record<DayKey, DayHours>;

export type OCBranch = {
  id: "bewick-road" | "branch-2"; // "branch-2" is a stand-in id until the name is confirmed
  name: string;
  shortName: string;
  address: { line1: string; town: string; county?: string; postcode: string };
  phone: string;
  email: string;
  gphc: string;
  mapsUrl: string;
  geo?: { lat: number; lng: number };
  /** null = opening hours not yet supplied ([REPLACE]); open-now shows "Hours to be confirmed". */
  hours: WeekHours | null;
  exceptions?: { date: string; label: string; hours: "closed" | Interval[] }[]; // bank holidays, "YYYY-MM-DD"
  facilities: string[];
  landmark: string;
  ods: string;
  /** Branch pin glyph — distinguishable in shape AND tone, always paired with a text label. */
  pin: "dark" | "mid";
};

const mapsSearch = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

export const OC_BRANCHES: OCBranch[] = [
  {
    id: "bewick-road",
    name: "OneCare Pharmacy, Bewick Road",
    shortName: "Bewick Road",
    address: { line1: "13-15 Bewick Road", town: "Gateshead", county: "Tyne and Wear", postcode: "NE8 4DP" },
    phone: "[REPLACE: phone]",
    email: "[REPLACE: email]",
    gphc: "1037448",
    // Built from the confirmed address — replace with the branch's own Maps link if preferred.
    mapsUrl: mapsSearch("OneCare Pharmacy, 13-15 Bewick Road, Gateshead NE8 4DP"),
    hours: null,
    facilities: ["[REPLACE: parking / step-free access / private consultation room]"],
    landmark: "[REPLACE: landmark / transport note]",
    ods: "[REPLACE: ODS code]",
    pin: "dark",
  },
  {
    id: "branch-2",
    name: "OneCare Pharmacy, [REPLACE: Branch 2]",
    shortName: "[REPLACE: Branch 2]",
    address: { line1: "[REPLACE: address]", town: "[REPLACE: town]", postcode: "[REPLACE: postcode]" },
    phone: "[REPLACE: phone]",
    email: "[REPLACE: email]",
    gphc: "[REPLACE: GPhC no.]",
    mapsUrl: "[REPLACE: Google Maps URL]",
    hours: null,
    facilities: ["[REPLACE: parking / step-free access / private consultation room]"],
    landmark: "[REPLACE: landmark / transport note]",
    ods: "[REPLACE: ODS code]",
    pin: "mid",
  },
];

export type BranchId = OCBranch["id"];
export const branchById = (id: BranchId) => OC_BRANCHES.find((b) => b.id === id)!;
export const formatAddress = (b: OCBranch) =>
  [b.address.line1, b.address.town, b.address.county, b.address.postcode].filter(Boolean).join(", ");

/** GPhC register verify link. TODO: confirm the current URL format before shipping. */
export const gphcRegisterUrl = (reg: string) =>
  isTbc(reg) ? "https://www.pharmacyregulation.org/registers" : `https://www.pharmacyregulation.org/registers/pharmacy/${reg}`;

// ── Legal / owner ─────────────────────────────────────────────────────────

export const OC_LEGAL = {
  tradingName: "OneCare Pharmacy",
  owner: "Greenleafe BR Retail Limited",
  companyNumber: "[REPLACE: company no.]",
  registeredOffice: "[REPLACE: registered office]",
  superintendent: "[REPLACE: superintendent pharmacist]",
  superintendentGphc: "[REPLACE: GPhC no.]",
  domain: "[REPLACE: domain]",
};

// ── Services (candidate set — confirm per branch before launch) ────────────
// Photos are stand-in stock until OneCare supplies its own (see ONECARE-TODO.md).

export const OC_IMAGES = { imgConsult, imgBloodPressure, imgFamily, imgCounter, imgEarWax, imgPharmacist, imgFriends, imgTravel, imgSoreThroat, imgWeightConsult, imgTravelClinic };

export type OCService = {
  slug: string;
  /** Booking id used by the shared ConX-style booking flow (/onecare/book/:id). */
  serviceId: string;
  name: string;
  type: "nhs" | "private";
  summary: string; // one plain-English sentence, no outcome claims, no medicine names
  duration?: string;
  priceFrom?: string; // private only
  eligibility?: string;
  branches: BranchId[];
  image: string;
  /** CSS object-position so a reused stock photo crops differently. */
  imagePos?: string;
  /** Authoritative NHS page for patients who want to read more (E-E-A-T, §SEO). */
  learnMore?: string;
  /** 3D illustration shown on the card (Fluent 3D). */
  icon?: string;
};

const BOTH: BranchId[] = ["bewick-road", "branch-2"];

export const OC_NHS_SERVICES: OCService[] = [
  { slug: "flu-nhs", serviceId: "nhs-flu", name: "NHS flu vaccination", type: "nhs", summary: "Free if you're eligible, for example if you're 65 or over, pregnant, or have certain long-term health conditions.", eligibility: "NHS eligibility applies", branches: BOTH, image: imgPharmacist, imagePos: "50% 30%", learnMore: "https://www.nhs.uk/vaccinations/flu-vaccine/" },
  { slug: "blood-pressure", serviceId: "nhs-bp", name: "Blood pressure check", type: "nhs", summary: "A free check for adults aged 40 and over who haven't been diagnosed with high blood pressure.", eligibility: "Age 40+", branches: BOTH, image: imgBloodPressure, imagePos: "60% 40%", learnMore: "https://www.nhs.uk/conditions/high-blood-pressure/" },
  { slug: "contraception", serviceId: "nhs-contraception", name: "Contraception", type: "nhs", summary: "Start or continue the contraceptive pill with a pharmacist, without seeing your GP first.", branches: BOTH, image: imgCounter, imagePos: "30% 50%", learnMore: "https://www.nhs.uk/contraception/" },
  { slug: "new-medicine-service", serviceId: "nhs-nms", name: "New Medicine Service", type: "nhs", summary: "Extra support from a pharmacist in the first weeks of a new medicine for certain long-term conditions.", branches: BOTH, image: imgConsult, imagePos: "50% 35%", learnMore: "https://www.nhs.uk/nhs-services/pharmacies/how-pharmacies-can-help/" },
];

/** The two headline private clinics, shown as large photo cards. */
export const OC_FEATURED_PRIVATE: OCService[] = [
  { slug: "weight-loss", serviceId: "prv-weight-consult", name: "Weight loss clinic", type: "private", summary: "A confidential consultation about your weight and the options that may suit you, with regular check-ins if you start a plan.", duration: "[REPLACE] min", priceFrom: "£[REPLACE]", branches: BOTH, image: imgWeightConsult, imagePos: "40% 40%" },
  { slug: "ear-wax", serviceId: "prv-ear-wax", name: "Ear wax removal", type: "private", summary: "A trained clinician checks both ears, then gently removes the wax that's causing muffled hearing or discomfort.", duration: "[REPLACE] min", priceFrom: "£[REPLACE]", branches: BOTH, image: imgEarWax, imagePos: "50% 40%" },
];

/** A compact service tile: a 3D illustration, a name and one line. */
export type OCMiniService = { serviceId: string; name: string; line: string; icon: string };

/** Travel clinic. Confirm stock per branch; yellow fever is omitted until OneCare confirms it is a registered centre. */
export const OC_TRAVEL_CONSULT = { serviceId: "prv-travel-consult", name: "Travel health consultation" };
export const OC_TRAVEL: OCMiniService[] = [
  { serviceId: "prv-hep-a", name: "Hepatitis A", line: "Spread through contaminated food and water.", icon: ic.microbe },
  { serviceId: "prv-hep-b", name: "Hepatitis B", line: "Spread through blood and body fluids. Given as a course.", icon: ic.blood },
  { serviceId: "prv-typhoid", name: "Typhoid", line: "Spread through contaminated food and water.", icon: ic.wave },
  { serviceId: "prv-cholera", name: "Cholera", line: "A drink-based vaccine for some higher-risk trips.", icon: ic.droplet },
  { serviceId: "prv-rabies", name: "Rabies", line: "Spread by bites and scratches from infected animals.", icon: ic.dog },
  { serviceId: "prv-meningitis", name: "Meningitis ACWY", line: "Required for Hajj and Umrah, and advised for some regions.", icon: ic.brain },
  { serviceId: "prv-japanese-enc", name: "Japanese encephalitis", line: "Spread by mosquitoes in parts of Asia.", icon: ic.globe },
  { serviceId: "prv-tickborne", name: "Tick-borne encephalitis", line: "Spread by ticks in forested parts of Europe and Asia.", icon: ic.beetle },
  { serviceId: "prv-malaria", name: "Malaria prevention", line: "Advice and, if suitable, antimalarial tablets for your trip.", icon: ic.mosquito },
  { serviceId: "prv-altitude", name: "Altitude sickness", line: "Advice and, if suitable, treatment before high-altitude trips.", icon: ic.mountain },
];

export const OC_VACCINES: OCMiniService[] = [
  { serviceId: "prv-flu-private", name: "Flu vaccination", line: "If you don't qualify for a free NHS flu vaccine.", icon: ic.syringe },
  { serviceId: "prv-chicken-pox", name: "Chickenpox", line: "For children and adults who haven't had chickenpox.", icon: ic.baby },
  { serviceId: "prv-shingles-prv", name: "Shingles", line: "For adults not yet eligible for the NHS programme.", icon: ic.older },
  { serviceId: "prv-hpv", name: "HPV", line: "Protection against the human papillomavirus.", icon: ic.shield },
  { serviceId: "prv-men-b", name: "Meningitis B", line: "For people not covered by the NHS schedule.", icon: ic.brain },
];

export const OC_TREATMENTS: OCMiniService[] = [
  { serviceId: "prv-hayfever", name: "Hay fever", line: "When over-the-counter remedies aren't enough.", icon: ic.tulip },
  { serviceId: "prv-cystitis", name: "Cystitis", line: "Assessment and treatment if it's suitable.", icon: ic.droplet },
  { serviceId: "prv-acid-reflux", name: "Acid reflux", line: "Help with heartburn that keeps coming back.", icon: ic.fire },
  { serviceId: "prv-cold-sore", name: "Cold sores", line: "Treatment to shorten an outbreak.", icon: ic.mouth },
  { serviceId: "prv-migraine", name: "Migraine", line: "A review of your symptoms and treatment options.", icon: ic.headache },
  { serviceId: "prv-fungal", name: "Fungal nail", line: "Treatment for discoloured or thickened nails.", icon: ic.foot },
  { serviceId: "prv-threadworm", name: "Threadworm", line: "Treatment for the whole household.", icon: ic.worm },
  { serviceId: "prv-period-delay", name: "Period delay", line: "For holidays and special occasions.", icon: ic.calendar },
  { serviceId: "prv-vitamin-injection", name: "Vitamin B12 service", line: "A consultation to check if the service suits you.", icon: ic.pill },
];

export const OC_SERVICES: OCService[] = [...OC_NHS_SERVICES, ...OC_FEATURED_PRIVATE];

/** Compliance line shown on every private service (DESIGN.md §10). */
export const PRIVATE_DISCLAIMER = "Subject to consultation. The pharmacist will decide if treatment is suitable.";

// ── NHS Pharmacy First (verify criteria against NHS England before launch) ──

export const OC_PHARMACY_FIRST = [
  { serviceId: "nhs-pf-sore-throat", name: "Sore throat", eligibility: "Age 5 and over", icon: ic.fever },
  { serviceId: "nhs-pf-sinusitis", name: "Sinusitis", eligibility: "Age 12 and over", icon: ic.sneezing },
  { serviceId: "nhs-pf-earache", name: "Earache", eligibility: "Age 1 to 17", icon: ic.ear },
  { serviceId: "nhs-pf-insect-bite", name: "Infected insect bite", eligibility: "Age 1 and over", icon: ic.mosquito },
  { serviceId: "nhs-pf-impetigo", name: "Impetigo", eligibility: "Age 1 and over", icon: ic.bandage },
  { serviceId: "nhs-pf-shingles", name: "Shingles", eligibility: "Age 18 and over", icon: ic.microbe },
  { serviceId: "nhs-pf-uti", name: "Urinary tract infection", eligibility: "Women aged 16 to 64, uncomplicated", icon: ic.droplet },
];

// ── Contact form (no backend yet) ───────────────────────────────────────────
/** POST endpoint for the enquiry form. Until it's set the form explains that and points to the phone. */
export const OC_CONTACT_ENDPOINT = "[REPLACE: form endpoint]";

// ── FAQ (answers are REPLACE-safe; no clinical promises) ────────────────────

export const OC_FAQS: { q: string; a: string }[] = [
  { q: "Do I need an appointment for Pharmacy First?", a: "You can walk in or book ahead online. Booking means a consultation room is ready when you arrive. [REPLACE: confirm walk-in policy per branch]" },
  { q: "Is Pharmacy First free?", a: "Yes, the consultation is free on the NHS. If the pharmacist supplies a medicine, the usual NHS prescription charge applies unless you're exempt." },
  { q: "Which branch offers the service I need?", a: "Most services run at both branches. You choose your branch on the next page when you book." },
  { q: "Which travel vaccines do I need?", a: "It depends on where you're going, what you'll be doing and your vaccination history. Book a travel health consultation at least six to eight weeks before you travel and we'll plan it with you." },
  { q: "What happens if the pharmacist can't treat me?", a: "The pharmacist will explain why and point you to the right next step, which may be your GP, NHS 111 or, if it's urgent, A&E." },
  { q: "Is there a private consultation room?", a: "[REPLACE: confirm consultation room facilities at each branch]" },
  { q: "Is there parking, and is the pharmacy step-free?", a: "[REPLACE: parking and step-free access for each branch]" },
  { q: "How much do private services cost?", a: "Each private service shows its starting price before you book. The pharmacist will confirm the total with you before any treatment." },
];

// ── Adapter for the shared booking flow (BranchSelector / useResolvedLocation) ──

const DAY_LABEL: Record<DayKey, string> = { mon: "Monday", tue: "Tuesday", wed: "Wednesday", thu: "Thursday", fri: "Friday", sat: "Saturday", sun: "Sunday" };
export const DAY_ORDER: DayKey[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
export const dayLabel = (d: DayKey) => DAY_LABEL[d];

export const formatDayHours = (h: DayHours) => (h === "closed" ? "Closed" : h.map((i) => `${i.open} to ${i.close}`).join(", "));

export const onecareLocations: PharmacyLocation[] = OC_BRANCHES.map((b, i) => ({
  id: b.id,
  name: b.name,
  shortName: b.shortName,
  address: formatAddress(b),
  phone: b.phone,
  email: b.email,
  // Unknown coordinates stay NaN — BranchSelector/useResolvedLocation skip them for distance.
  lat: b.geo?.lat ?? Number.NaN,
  lng: b.geo?.lng ?? Number.NaN,
  openingHours: b.hours
    ? DAY_ORDER.map((d) => ({ day: DAY_LABEL[d], hours: formatDayHours(b.hours![d]) }))
    : [{ day: "Opening hours", hours: REPLACE }],
  googleMapsEmbedUrl: "",
  isDefault: i === 0,
  gphcUrl: gphcRegisterUrl(b.gphc),
}));
