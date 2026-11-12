import type { PharmacyLocation } from "./locations";
import { privateServices } from "./services";
import { gphcRegisterUrl, isTbc, type DayKey, type OCBranch, type OCMiniService, type OCService, DAY_ORDER, dayLabel, formatDayHours } from "./onecare";
import imgConsult from "../../assets/about-1.jpeg";
import imgBloodPressure from "../../assets/about-2.jpeg";
import imgFamily from "../../assets/about-bg.jpeg";
import imgCounter from "../../assets/about-hero.jpeg";
import imgEarWax from "../../assets/ear-wax.jpeg";
import imgPharmacist from "../../assets/hero-bg.jpeg";
import imgFriends from "../../assets/image-bg.jpeg";
import imgTravel from "../../assets/travel.jpeg";
import imgWeight from "../../assets/weight-loss.jpeg";
import imgSoreThroat from "../../assets/sorethroat.jpg";
import imgEhc from "../../assets/condition images/image (22).jpeg";

/**
 * Shivakem Pharmacy, Wembley — the single source of truth for the site.
 *
 * Confirmed by the pharmacy: name, phone, address and GPhC premises number.
 * Everything marked `// DUMMY` is a realistic stand-in so the site reads as
 * finished; each is listed in SHIVAKEM-TODO.md and must be replaced before
 * launch. Unknown facts stay as visible `[REPLACE…]` strings.
 */

/**
 * 3D illustrations: the One Care set, recoloured from teal to Shivakem blue
 * (only the teal pixels move, so natural colours like a lemon stay put).
 */
const ICONS = import.meta.glob<string>("../../assets/shivakem/icons3d/*.webp", { eager: true, import: "default" });
export const skIc: Record<string, string> = Object.fromEntries(
  Object.entries(ICONS).map(([path, url]) => [path.split("/").pop()!.replace(".webp", ""), url]),
);

const mapsSearch = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

// ── The branch ──────────────────────────────────────────────────────────────
// Typed as a One Care branch so the shared open-now logic and hours table work
// unchanged; the id is the only field that doesn't apply.

export const SK_BRANCH = {
  id: "wembley",
  name: "Shivakem Pharmacy",
  shortName: "Wembley",
  address: { line1: "12a Court Parade", town: "Wembley", county: "Middlesex", postcode: "HA0 3HU" },
  phone: "020 8904 1514",
  email: "[REPLACE: email]",
  gphc: "1035195",
  mapsUrl: mapsSearch("Shivakem Pharmacy, 12a Court Parade, Wembley HA0 3HU"),
  hours: {
    mon: [{ open: "09:00", close: "18:30" }],
    tue: [{ open: "09:00", close: "18:30" }],
    wed: [{ open: "09:00", close: "18:30" }],
    thu: [{ open: "09:00", close: "18:30" }],
    fri: [{ open: "09:00", close: "18:30" }],
    sat: [{ open: "09:00", close: "17:00" }],
    sun: "closed",
  }, // DUMMY
  exceptions: [
    { date: "2026-12-25", label: "Christmas Day", hours: "closed" },
    { date: "2026-12-26", label: "Boxing Day", hours: "closed" },
    { date: "2027-01-01", label: "New Year's Day", hours: "closed" },
  ], // DUMMY
  facilities: ["Private consultation room", "Step-free access", "On-street parking nearby"], // DUMMY
  landmark: "On Court Parade, Wembley", // DUMMY
  ods: "[REPLACE: ODS code]",
  pin: "dark",
  googlePlaceId: "[REPLACE: Google Place ID]",
} as unknown as OCBranch;

export const formatSkAddress = () => {
  const a = SK_BRANCH.address;
  return [a.line1, a.town, a.county, a.postcode].filter(Boolean).join(", ");
};

export const SK_LEGAL = {
  tradingName: "Shivakem Pharmacy",
  owner: "[REPLACE: registered company name]",
  companyNumber: "[REPLACE: company number]",
  registeredOffice: "12a Court Parade, Wembley HA0 3HU", // DUMMY: confirm the registered office
  superintendent: "[REPLACE: superintendent pharmacist]",
  superintendentGphc: "[REPLACE: GPhC number]",
};

/** Shared booking flow adapter (BranchSelector / useResolvedLocation / GPhC badge). */
export const shivakemLocations: PharmacyLocation[] = [{
  id: SK_BRANCH.id,
  name: SK_BRANCH.name,
  shortName: SK_BRANCH.shortName,
  address: formatSkAddress(),
  phone: SK_BRANCH.phone,
  email: SK_BRANCH.email,
  lat: Number.NaN,
  lng: Number.NaN,
  openingHours: DAY_ORDER.map((d: DayKey) => ({ day: dayLabel(d), hours: formatDayHours(SK_BRANCH.hours![d]) })),
  googleMapsEmbedUrl: "",
  isDefault: true,
  gphcUrl: gphcRegisterUrl(SK_BRANCH.gphc),
}];

// ── Hero carousel ───────────────────────────────────────────────────────────

/** "From £40", read from the shared service catalogue so this page and the booking page always agree. */
const fromPrice = (id: string) => {
  const p = privateServices.find((x) => x.id === id)?.price ?? "";
  const n = p.replace(/^From\s*/i, "").replace(/^£/, "");
  return n ? `From £${n}` : "";
};

export type SkSlide = { id: string; name: string; tag: string; desc: string; img: string };
export const SK_HERO_SLIDES: SkSlide[] = [
  { id: "prv-travel-consult", name: "Travel clinic", tag: fromPrice("prv-travel-consult"), desc: "Jabs, malaria tablets if suitable and a written plan, sorted in one visit before you fly.", img: imgTravel },
  { id: "prv-ear-wax", name: "Ear wax removal", tag: fromPrice("prv-ear-wax"), desc: "Clear, comfortable hearing again, usually in a single short appointment.", img: imgEarWax },
  { id: "prv-weight-consult", name: "Weight loss clinic", tag: fromPrice("prv-weight-consult"), desc: "A private chat about your goals, your health and the kind of support that could help.", img: imgWeight },
  { id: "prv-flu-private", name: "Flu vaccination", tag: fromPrice("prv-flu-private"), desc: "Your winter flu jab in minutes, if you're not covered by the free NHS programme.", img: imgPharmacist },
];

// ── Services (candidate set — confirm with the pharmacy before launch) ─────
// Photos are shared stand-in stock until Shivakem supplies its own.

export const SK_IMAGES = { imgConsult, imgBloodPressure, imgFamily, imgCounter, imgEarWax, imgPharmacist, imgFriends, imgTravel, imgWeight, imgSoreThroat };

const W = ["bewick-road"] as OCService["branches"]; // single branch: field unused here

export const SK_NHS_SERVICES: OCService[] = [
  { slug: "flu-nhs", serviceId: "nhs-flu", name: "NHS flu vaccination", type: "nhs", summary: "Free every autumn and winter for people who qualify, including over-65s, pregnant women and those with some long-term conditions.", branches: W, image: imgPharmacist, imagePos: "50% 30%" },
  { slug: "blood-pressure", serviceId: "nhs-bp", name: "Blood pressure check", type: "nhs", summary: "A quick, free reading for anyone aged 40 or over who doesn't already have a high blood pressure diagnosis.", branches: W, image: imgBloodPressure, imagePos: "60% 40%" },
  { slug: "contraception", serviceId: "nhs-contraception", name: "Contraception", type: "nhs", summary: "Begin or carry on with the contraceptive pill through your pharmacist, with no GP visit needed first.", branches: W, image: imgCounter, imagePos: "30% 50%" },
  { slug: "emergency-contraception", serviceId: "nhs-sti", name: "Emergency contraception", type: "nhs", summary: "Free, private and quick. It works best the sooner it's taken, so book or join our live queue.", branches: W, image: imgEhc, imagePos: "50% 35%", learnMore: "https://www.nhs.uk/contraception/emergency-contraception/" },
  { slug: "new-medicine-service", serviceId: "nhs-nms", name: "New Medicine Service", type: "nhs", summary: "Just started a medicine for a long-term condition? We'll check in over the first few weeks to see how it's going.", branches: W, image: imgConsult, imagePos: "50% 35%" },
];

export const SK_PHARMACY_FIRST = [
  { serviceId: "nhs-pf-sore-throat", name: "Sore throat", eligibility: "Age 5 and over", icon: skIc["sore-throat"] },
  { serviceId: "nhs-pf-sinusitis", name: "Sinusitis", eligibility: "Age 12 and over", icon: skIc["sinusitis"] },
  { serviceId: "nhs-pf-earache", name: "Earache", eligibility: "Age 1 to 17", icon: skIc["earache"] },
  { serviceId: "nhs-pf-insect-bite", name: "Infected insect bite", eligibility: "Age 1 and over", icon: skIc["insect-bite"] },
  { serviceId: "nhs-pf-impetigo", name: "Impetigo", eligibility: "Age 1 and over", icon: skIc["impetigo"] },
  { serviceId: "nhs-pf-shingles", name: "Shingles", eligibility: "Age 18 and over", icon: skIc["shingles"] },
  { serviceId: "nhs-pf-uti", name: "Urinary tract infection", eligibility: "Women 16 to 64, uncomplicated", icon: skIc["uti"] },
];

export const SK_FEATURED_PRIVATE: OCService[] = [
  { slug: "weight-loss", serviceId: "prv-weight-consult", name: "Weight loss clinic", type: "private", summary: "Talk privately about your weight and the support that's available, then keep in touch with us for regular reviews if you start a plan.", priceFrom: fromPrice("prv-weight-consult").replace("From ", ""), branches: W, image: imgWeight, imagePos: "50% 40%" }, // price from the shared catalogue
  { slug: "ear-wax", serviceId: "prv-ear-wax", name: "Ear wax removal", type: "private", summary: "We look inside both ears first, then clear the build-up that's muffling your hearing or making your ears feel blocked.", priceFrom: fromPrice("prv-ear-wax").replace("From ", ""), branches: W, image: imgEarWax, imagePos: "50% 40%" }, // price from the shared catalogue
];

export const SK_TRAVEL_CONSULT = { serviceId: "prv-travel-consult", name: "Travel health consultation" };
export const SK_TRAVEL: OCMiniService[] = [
  { serviceId: "prv-hep-a", name: "Hepatitis A", line: "Caught from unsafe food and drinking water.", icon: skIc["hep-a"] },
  { serviceId: "prv-hep-b", name: "Hepatitis B", line: "Passed on through blood and body fluids. A course of doses.", icon: skIc["hep-b"] },
  { serviceId: "prv-typhoid", name: "Typhoid", line: "A risk where food and water hygiene is poor.", icon: skIc["typhoid"] },
  { serviceId: "prv-cholera", name: "Cholera", line: "An oral vaccine, taken as a drink, for some trips.", icon: skIc["cholera"] },
  { serviceId: "prv-rabies", name: "Rabies", line: "For trips where animal bites or scratches are a risk.", icon: skIc["rabies"] },
  { serviceId: "prv-meningitis", name: "Meningitis ACWY", line: "Needed for Hajj and Umrah, and advised in some areas.", icon: skIc["men-acwy"] },
  { serviceId: "prv-japanese-enc", name: "Japanese encephalitis", line: "Carried by mosquitoes in rural parts of Asia.", icon: skIc["japanese-enc"] },
  { serviceId: "prv-tickborne", name: "Tick-borne encephalitis", line: "For walkers and campers in wooded parts of Europe.", icon: skIc["tick-borne"] },
  { serviceId: "prv-malaria", name: "Malaria prevention", line: "Bite advice, plus antimalarials if they suit you.", icon: skIc["malaria"] },
  { serviceId: "prv-altitude", name: "Altitude sickness", line: "Preparing for treks and climbs at high altitude.", icon: skIc["altitude"] },
];

export const SK_VACCINES: OCMiniService[] = [
  { serviceId: "prv-flu-private", name: "Flu vaccination", line: "For anyone outside the free NHS flu programme.", icon: skIc["flu"] },
  { serviceId: "prv-chicken-pox", name: "Chickenpox", line: "Protection if you or your child haven't had it.", icon: skIc["chickenpox"] },
  { serviceId: "prv-shingles-prv", name: "Shingles", line: "For adults too young for the NHS shingles jab.", icon: skIc["shingles-vax"] },
  { serviceId: "prv-hpv", name: "HPV", line: "Guards against the human papillomavirus.", icon: skIc["hpv"] },
  { serviceId: "prv-men-b", name: "Meningitis B", line: "For people the NHS schedule doesn't cover.", icon: skIc["men-b"] },
];

export const SK_TREATMENTS: OCMiniService[] = [
  { serviceId: "prv-hayfever", name: "Hay fever", line: "When shop-bought remedies aren't working.", icon: skIc["hay-fever"] },
  { serviceId: "prv-cystitis", name: "Cystitis", line: "A quick assessment, and treatment if it's right.", icon: skIc["cystitis"] },
  { serviceId: "prv-acid-reflux", name: "Acid reflux", line: "For heartburn that won't stay away.", icon: skIc["acid-reflux"] },
  { serviceId: "prv-cold-sore", name: "Cold sores", line: "Help to clear a flare-up faster.", icon: skIc["cold-sore"] },
  { serviceId: "prv-migraine", name: "Migraine", line: "Talk through your symptoms and what may help.", icon: skIc["migraine"] },
  { serviceId: "prv-fungal", name: "Fungal nail", line: "For thick, yellowed or brittle nails.", icon: skIc["fungal-nail"] },
  { serviceId: "prv-threadworm", name: "Threadworm", line: "One treatment plan for everyone at home.", icon: skIc["threadworm"] },
  { serviceId: "prv-period-delay", name: "Period delay", line: "Move your period around a trip or big day.", icon: skIc["period-delay"] },
];

// ── Google reviews ──────────────────────────────────────────────────────────
// DUMMY: stand-ins in the shape of Google reviews. Before launch show only real
// reviews from Shivakem's Google Business Profile, keep the rating and count in
// step with Google, and never add an AggregateRating to the structured data.

export type SkReview = { quote: string; name: string; rating: 1 | 2 | 3 | 4 | 5; when: string; service: string };
export const SK_GOOGLE_RATING = { rating: 4.9, count: 86 }; // DUMMY
export const SK_REVIEWS: SkReview[] = [
  { quote: "Came in with a painful ear on a Saturday and the pharmacist sorted it there and then. Didn't need to wait days for a GP.", name: "Priya S.", rating: 5, when: "a week ago", service: "Pharmacy First" },
  { quote: "Got all our vaccines for Kenya in one visit, with a clear plan for the second doses. Very thorough and friendly.", name: "Daniel O.", rating: 5, when: "a month ago", service: "Travel clinic" },
  { quote: "Prescriptions are always ready when they say, and they text me if anything's out of stock. Proper local pharmacy.", name: "Hasmukh P.", rating: 5, when: "3 weeks ago", service: "Prescriptions" },
  { quote: "Ear wax removal done calmly in a private room. Could hear properly again before I'd left the shop.", name: "Margaret K.", rating: 5, when: "2 months ago", service: "Ear wax removal" },
  { quote: "Blood pressure check booked online for my lunch break. Quick, clear advice, no fuss. Only wait was for a parking spot.", name: "Imran A.", rating: 4, when: "a month ago", service: "Blood pressure check" },
  { quote: "They always take the time to explain my mum's medicines to her properly. Kind, patient people.", name: "Nisha T.", rating: 5, when: "5 days ago", service: "Advice" },
];

/** Where "Write a review" sends someone: Google's review box when the Place ID is known, else the pharmacy on Google Maps. */
export const skReviewUrl = () => {
  const id = (SK_BRANCH as OCBranch & { googlePlaceId?: string }).googlePlaceId;
  return !isTbc(id) ? `https://search.google.com/local/writereview?placeid=${encodeURIComponent(id!)}` : SK_BRANCH.mapsUrl;
};

// ── FAQ ─────────────────────────────────────────────────────────────────────

export const SK_FAQS: { q: string; a: string }[] = [
  { q: "Can I just walk in for Pharmacy First?", a: "Yes, any time we're open. If you'd rather not wait, book a slot online and we'll have the consultation room ready for you." },
  { q: "Do I pay for Pharmacy First?", a: "Seeing the pharmacist costs nothing. If you're given a medicine, the standard NHS prescription charge applies unless you get free prescriptions." },
  { q: "How early should I book for travel vaccines?", a: "Ideally six to eight weeks before you leave, as some vaccines need time to work or are given in several doses. Even if you're travelling sooner, it's still worth coming in." },
  { q: "How do I get my repeat prescriptions sent here?", a: "Choose Shivakem as your nominated pharmacy, in the NHS App, at your GP practice or at our counter. Your electronic prescriptions will then come straight to us." },
  { q: "What if the pharmacist can't help with my problem?", a: "You'll get a clear explanation and be pointed to the right place, whether that's your GP, NHS 111 or, if it's urgent, A&E." },
  { q: "Can I speak to someone privately?", a: "Of course. We have a consultation room where nobody else can hear you. Just ask at the counter." },
  { q: "How will I know what a private service costs?", a: "The starting price is shown before you book, and your pharmacist confirms the full cost with you before any treatment goes ahead." },
];

/** Shown under every private service: treatment always depends on a consultation. */
export const SK_PRIVATE_NOTE = "Every private treatment depends on a consultation first. Your pharmacist decides whether it's suitable for you.";

/** Contact form endpoint. Until it's set the form explains that and points to the phone. */
export const SK_CONTACT_ENDPOINT = "[REPLACE: form endpoint]";
