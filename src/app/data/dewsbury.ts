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
