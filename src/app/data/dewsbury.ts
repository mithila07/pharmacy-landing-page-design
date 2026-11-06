import type { PharmacyLocation } from "./locations";

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
export const openDewsburyBook = () => window.dispatchEvent(new Event(DMP_BOOK_EVENT));

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
