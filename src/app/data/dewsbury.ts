import type { PharmacyLocation } from "./locations";
import { privateServices } from "./services";
import earWaxImg from "../../assets/ear-wax.jpeg";
import travelImg from "../../assets/travel.jpeg";
// Condition photos (src/assets/condition images), one per service
import cnhs_pf_sore_throat from "../../assets/condition images/sorethroat.jpg";
import cnhs_pf_sinusitis from "../../assets/condition images/What-Happens-If-Chronic-Sinusitis-Goes-Untreated-Schalch-Lepe.jpg";
import cnhs_pf_earache from "../../assets/condition images/50051_123RF-112617383-web.jpg";
import cnhs_pf_insect_bite from "../../assets/condition images/image (13).jpeg";
import cnhs_pf_impetigo from "../../assets/condition images/image (15).jpeg";
import cnhs_pf_shingles from "../../assets/condition images/image (14).jpeg";
import cnhs_pf_uti from "../../assets/condition images/UTIWOmanPain.jpg";
import cnhs_flu from "../../assets/condition images/image (8).jpeg";
import cnhs_nms from "../../assets/condition images/new-medicine-service-1 (1)-web.jpg";
import cweight_consult from "../../assets/condition images/image (28).jpeg";
import cflu_private from "../../assets/condition images/image (17).jpeg";
import cchicken_pox from "../../assets/condition images/image (12).jpeg";
import chpv from "../../assets/condition images/image (5).jpeg";
import cperiod_delay from "../../assets/condition images/period-delay-1600x900.jpg";
import chayfever from "../../assets/condition images/image (2).jpeg";
import ccold_sore from "../../assets/condition images/image (6).jpeg";
import cmigraine from "../../assets/condition images/image (26).jpeg";
import cfungal from "../../assets/condition images/image (11).jpeg";
import cvitamin_injection from "../../assets/condition images/image (10).jpeg";
import cehc from "../../assets/condition images/image (22).jpeg";
import cpregnancy_test from "../../assets/condition images/WPM-Internal-Image-1.webp";
import chep_a from "../../assets/condition images/image (25).jpeg";
import chep_b from "../../assets/condition images/otc images/what-is-hepatitis-b-thumbnail.jpg";
import ctyphoid from "../../assets/condition images/image (32).jpeg";
import ccholera from "../../assets/condition images/image (9).jpeg";
import crabies from "../../assets/condition images/image (34).jpeg";
import cmeningitis from "../../assets/condition images/otc images/blog-hajj-and-umrah.jpg";
import cjapanese_enc from "../../assets/condition images/dengue-fever-mosquitos.webp";
import ctickborne from "../../assets/condition images/image (29).jpeg";
import cmalaria from "../../assets/condition images/TELEMMGLPICT000336700492_17714944806320_trans_NvBQzQNjv4BqwDgGh3pkom49KxtKngnUazFCz-CXoLiAuLtBSY0KYYg.webp";
import caltitude from "../../assets/condition images/image (4).jpeg";

/**
 * Dewsbury Moor Pharmacy: facts for the Kepple-Lane-template build.
 *
 * Taken from the pharmacy's current website (dewsburymoorpharmacy.co.uk, read
 * 6 Nov 2026). Anything it doesn't publish is a `[REPLACE — …]` placeholder,
 * listed in DEWSBURY-TODO.md.
 */

export const DMP_LEGAL = {
  owner: "[REPLACE — Company name]",
  companyNumber: "[REPLACE — Company No.]",
  superintendent: "Ash Ali",
  superintendentGphc: "[REPLACE — GPhC Reg. No.]",
};

export const dewsburyLocations: PharmacyLocation[] = [{
  id: "dewsbury-moor",
  name: "Dewsbury Moor Pharmacy",
  shortName: "Dewsbury Moor",
  address: "119 Heckmondwike Road, Dewsbury, WF13 3NT",
  phone: "01924 502828",
  email: "dewsburymoor.pharmacy@nhs.net",
  lat: Number.NaN,
  lng: Number.NaN,
  openingHours: [
    { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
    { day: "Saturday", hours: "Closed" },
    { day: "Sunday", hours: "Closed" },
  ],
  googleMapsEmbedUrl: `https://www.google.com/maps?q=${encodeURIComponent("119 Heckmondwike Road, Dewsbury WF13 3NT")}&output=embed`,
  isDefault: true,
}];

// ── Booking overlay ────────────────────────────────────────────────────────

/** Opens the full-page "Book an appointment" overlay (listened for in Header). */
export const DMP_BOOK_EVENT = "dmp:book";
/** Filter the overlay opens on: a booking group's label, or "vaccinations". */
export type BookFilter = string;
export const openDewsburyBook = (filter?: BookFilter) =>
  window.dispatchEvent(new CustomEvent<BookFilter | undefined>(DMP_BOOK_EVENT, { detail: filter }));

export const DMP_NOMINATE_PATH = "/dewsbury/nominate";

// ── Google reviews ──────────────────────────────────────────────────────────
// DUMMY: stand-ins in the shape of Google reviews so the layout reads as
// finished. Before launch, show only real reviews from the pharmacy's Google
// Business Profile (first name and initial), keep the rating and count in step
// with Google, and keep the Google attribution. Never add an AggregateRating to
// the structured data: Google ignores self-served review markup.

export type DmpReview = { quote: string; name: string; rating: 1 | 2 | 3 | 4 | 5; when: string };

export const DMP_GOOGLE_RATING = { rating: 4.8, count: 57 }; // DUMMY

export const DMP_REVIEWS: DmpReview[] = [
  { quote: "Popped in with a sore throat on my lunch break and was seen in the consultation room straight away. Didn't need a GP appointment at all.", name: "Nadia H.", rating: 5, when: "2 weeks ago" },
  { quote: "They always have my mum's repeat prescriptions ready when they say. If something's out of stock they ring us, which really helps.", name: "Imran S.", rating: 5, when: "a month ago" },
  { quote: "Friendly team who take the time to explain things. Had my flu jab here in ten minutes, no fuss.", name: "Carol W.", rating: 5, when: "3 weeks ago" },
  { quote: "Great local pharmacy. Asked for advice for my little one's earache and they were really patient with us.", name: "Sophie B.", rating: 5, when: "2 months ago" },
  { quote: "Had a blood pressure check on the way home from work. Quick, private and they told me exactly what to do next.", name: "Mark T.", rating: 4, when: "a month ago" },
  { quote: "Always a warm welcome on Heckmondwike Road. You're never made to feel like you're bothering them.", name: "Aisha K.", rating: 5, when: "5 days ago" },
];

/** Google Business Profile Place ID. Until set, review links open the pharmacy on Google Maps. */
export const DMP_GOOGLE_PLACE_ID = "[REPLACE: Google Place ID]";
const mapsSearch = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Dewsbury Moor Pharmacy, 119 Heckmondwike Road, Dewsbury WF13 3NT")}`;
export const dmpWriteReviewUrl = DMP_GOOGLE_PLACE_ID.includes("[REPLACE") ? mapsSearch : `https://search.google.com/local/writereview?placeid=${encodeURIComponent(DMP_GOOGLE_PLACE_ID)}`;
export const dmpReviewsUrl = DMP_GOOGLE_PLACE_ID.includes("[REPLACE") ? mapsSearch : `https://search.google.com/local/reviews?placeid=${encodeURIComponent(DMP_GOOGLE_PLACE_ID)}`;

// ── Private services (confirm the pharmacy offers each before launch) ───────

/** "From £30", read from the shared catalogue so this page and booking agree. */
export const dmpPrice = (id: string) => {
  const n = (privateServices.find((x) => x.id === id)?.price ?? "").replace(/^From\s*/i, "").replace(/^£/, "");
  return n ? `From £${n}` : "Ask us";
};

export type DmpFeatured = { id: string; name: string; summary: string; points: string[]; img: string; pos?: string };

/** The two headline private clinics. No medicine names (MHRA): the pharmacist decides what's suitable. */
export const DMP_FEATURED_PRIVATE: DmpFeatured[] = [
  {
    id: "prv-weight-consult",
    name: "Weight loss clinic",
    summary: "A confidential consultation about your weight, your health and the options that may suit you, with regular check-ins if you start a plan.",
    points: ["Private one-to-one consultation", "Ongoing support and reviews"],
    // A tape measure, not an injection pen: the photo must not promote a prescription-only medicine (MHRA)
    img: cweight_consult,
    pos: "50% 45%",
  },
  {
    id: "prv-ear-wax",
    name: "Ear wax removal",
    summary: "A trained clinician checks both ears, then gently removes the wax that's causing muffled hearing or discomfort.",
    points: ["Both ears checked first", "Usually takes about 30 minutes"],
    img: earWaxImg,
    pos: "50% 40%",
  },
];

/** Travel clinic. Yellow fever is left out until the pharmacy confirms it's a registered centre. */
export const DMP_TRAVEL_IMG = travelImg;
export const DMP_TRAVEL: { id: string; name: string; line: string }[] = [
  { id: "prv-hep-a", name: "Hepatitis A", line: "Spread through contaminated food and water" },
  { id: "prv-hep-b", name: "Hepatitis B", line: "Spread through blood and body fluids, given as a course" },
  { id: "prv-typhoid", name: "Typhoid", line: "Spread through contaminated food and water" },
  { id: "prv-cholera", name: "Cholera", line: "A drink-based vaccine for some higher-risk trips" },
  { id: "prv-rabies", name: "Rabies", line: "Spread by bites and scratches from infected animals" },
  { id: "prv-meningitis", name: "Meningitis ACWY", line: "Required for Hajj and Umrah, advised for some regions" },
  { id: "prv-japanese-enc", name: "Japanese encephalitis", line: "Spread by mosquitoes in parts of Asia" },
  { id: "prv-tickborne", name: "Tick-borne encephalitis", line: "Spread by ticks in forested parts of Europe and Asia" },
  { id: "prv-malaria", name: "Malaria prevention", line: "Advice and, if suitable, antimalarial tablets" },
  { id: "prv-altitude", name: "Altitude sickness", line: "Advice and, if suitable, treatment before you go" },
];

export type DmpOther = { id: string; name: string; line: string; access: "book" | "walk-in" };

/** Everything else, grouped the way patients look for it. */
export const DMP_OTHER_PRIVATE: { title: string; intro: string; items: DmpOther[] }[] = [
  {
    title: "Vaccinations",
    intro: "Protection that isn't on your NHS schedule.",
    items: [
      { id: "prv-flu-private", name: "Private flu jab", line: "If you don't qualify for a free NHS flu jab", access: "book" },
      { id: "prv-chicken-pox", name: "Chickenpox vaccine", line: "For children and adults who haven't had it", access: "book" },
      { id: "prv-hpv", name: "HPV vaccine", line: "Protection against the human papillomavirus", access: "book" },
    ],
  },
  {
    title: "Everyday treatments",
    intro: "Quick help without waiting for a GP.",
    items: [
      { id: "prv-period-delay", name: "Period delay", line: "For holidays and special occasions", access: "book" },
      { id: "prv-hayfever", name: "Hay fever", line: "When over-the-counter remedies aren't enough", access: "book" },
      { id: "prv-cold-sore", name: "Cold sores", line: "Treatment to shorten an outbreak", access: "book" },
      { id: "prv-migraine", name: "Migraine", line: "A review of your symptoms and options", access: "book" },
      { id: "prv-fungal", name: "Fungal nail", line: "For discoloured or thickened nails", access: "book" },
      { id: "prv-vitamin-injection", name: "Vitamin B12 service", line: "A consultation to check it suits you", access: "book" },
    ],
  },
  {
    title: "Just walk in",
    intro: "No appointment needed. Ask at the counter.",
    items: [
      { id: "prv-ehc", name: "Emergency contraception", line: "Confidential advice and the morning-after pill", access: "walk-in" },
      { id: "pregnancy-test", name: "Pregnancy test", line: "A test in our private consultation room", access: "walk-in" },
    ],
  },
];

/** Compliance line on every private service. */
export const DMP_PRIVATE_NOTE = "Private services are subject to a consultation. The pharmacist will decide if a treatment is suitable for you.";

// ── Condition photos, keyed by booking id ────────────────────────────────────
// Never a photo of a prescription-only medicine or its packaging (MHRA): the
// weight loss card shows a tape measure, the B12 service shows supplements.
export const DMP_IMG: Record<string, string> = {
  "nhs-pf-sore-throat": cnhs_pf_sore_throat,
  "nhs-pf-sinusitis": cnhs_pf_sinusitis,
  "nhs-pf-earache": cnhs_pf_earache,
  "nhs-pf-insect-bite": cnhs_pf_insect_bite,
  "nhs-pf-impetigo": cnhs_pf_impetigo,
  "nhs-pf-shingles": cnhs_pf_shingles,
  "nhs-pf-uti": cnhs_pf_uti,
  "nhs-flu": cnhs_flu,
  "nhs-nms": cnhs_nms,
  "prv-weight-consult": cweight_consult,
  "prv-flu-private": cflu_private,
  "prv-chicken-pox": cchicken_pox,
  "prv-hpv": chpv,
  "prv-period-delay": cperiod_delay,
  "prv-hayfever": chayfever,
  "prv-cold-sore": ccold_sore,
  "prv-migraine": cmigraine,
  "prv-fungal": cfungal,
  "prv-vitamin-injection": cvitamin_injection,
  "prv-ehc": cehc,
  "pregnancy-test": cpregnancy_test,
  "prv-hep-a": chep_a,
  "prv-hep-b": chep_b,
  "prv-typhoid": ctyphoid,
  "prv-cholera": ccholera,
  "prv-rabies": crabies,
  "prv-meningitis": cmeningitis,
  "prv-japanese-enc": cjapanese_enc,
  "prv-tickborne": ctickborne,
  "prv-malaria": cmalaria,
  "prv-altitude": caltitude,
};
