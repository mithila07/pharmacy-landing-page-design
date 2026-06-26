import { pharmacyInfo } from "./services";

/**
 * A physical branch. In ConX, an account is scoped per-location, so the
 * booking flow always resolves to exactly one of these before continuing.
 */
export type PharmacyLocation = {
  id: string;
  /** Full branch name, e.g. "Strachans Pharmacy — Bury". */
  name: string;
  /** Short branch label, e.g. "Bury". */
  shortName: string;
  address: string;
  phone: string;
  email: string;
  lat: number;
  lng: number;
  openingHours: { day: string; hours: string }[];
  googleMapsEmbedUrl: string;
  /** Admin-set preferred branch — used as the fallback when geolocation is unavailable/denied. */
  isDefault?: boolean;
};

const standardHours = [
  { day: "Monday - Friday", hours: "8:00 AM - 8:00 PM" },
  { day: "Saturday", hours: "9:00 AM - 6:00 PM" },
  { day: "Sunday", hours: "10:00 AM - 4:00 PM" },
];

const embed = (q: string) =>
  `https://www.google.com/maps?q=${encodeURIComponent(q)}&output=embed`;

export const strachansLocations: PharmacyLocation[] = [
  {
    id: "bury",
    name: "Strachans Pharmacy — Bury",
    shortName: "Bury",
    address: "12 The Rock, Bury, BL9 0JN",
    phone: "0161 764 1100",
    email: "bury@strachans.co.uk",
    lat: 53.5933,
    lng: -2.2966,
    openingHours: standardHours,
    googleMapsEmbedUrl: embed("12 The Rock, Bury BL9 0JN"),
    isDefault: true, // admin-set preferred branch
  },
  {
    id: "walmersley",
    name: "Strachans Pharmacy — Walmersley",
    shortName: "Walmersley",
    address: "204 Walmersley Road, Bury, BL9 6AE",
    phone: "0161 764 2200",
    email: "walmersley@strachans.co.uk",
    lat: 53.608,
    lng: -2.292,
    openingHours: standardHours,
    googleMapsEmbedUrl: embed("204 Walmersley Road, Bury BL9 6AE"),
  },
  {
    id: "uppermill",
    name: "Strachans Pharmacy — Uppermill",
    shortName: "Uppermill",
    address: "78 High Street, Uppermill, OL3 6AP",
    phone: "01457 870 200",
    email: "uppermill@strachans.co.uk",
    lat: 53.552,
    lng: -2.003,
    openingHours: standardHours,
    googleMapsEmbedUrl: embed("78 High Street, Uppermill OL3 6AP"),
  },
];

/** CareFirst operates a single branch — reuses the shared pharmacy info. */
export const carefirstLocations: PharmacyLocation[] = [
  {
    id: "main",
    name: pharmacyInfo.name,
    shortName: "Main",
    address: pharmacyInfo.address,
    phone: pharmacyInfo.phone,
    email: pharmacyInfo.email,
    lat: 51.5034,
    lng: -0.0876,
    openingHours: pharmacyInfo.openingHours,
    googleMapsEmbedUrl: pharmacyInfo.googleMapsEmbedUrl,
    isDefault: true,
  },
];

/** iCare Pharmacy — single community pharmacy on Queens Parade, Ealing (West London). */
const icareHours = [
  { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
  { day: "Saturday", hours: "Closed" },
  { day: "Sunday", hours: "Closed" },
];

export const canadaLocations: PharmacyLocation[] = [
  {
    id: "ealing",
    name: "iCare Pharmacy — Ealing",
    shortName: "Ealing",
    address: "15 Queens Parade, Ealing, London, W5 3HU",
    phone: "020 8997 1100",
    email: "icare.pharmacy@nhs.net",
    lat: 51.5247,
    lng: -0.2998,
    openingHours: icareHours,
    googleMapsEmbedUrl: embed("iCare Pharmacy, 15 Queens Parade, Ealing, London W5 3HU"),
    isDefault: true,
  },
];

/** HealthCheck Pharmacy & Clinic — single branch in Bradford. */
const healthcheckHours = [
  { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
  { day: "Saturday", hours: "Closed" },
  { day: "Sunday", hours: "Closed" },
];

export const healthcheckLocations: PharmacyLocation[] = [
  {
    id: "bradford",
    name: "Health-Check Pharmacy & Clinic — Bradford",
    shortName: "Bradford",
    address: "127 Great Horton Road, Bradford, BD7 1PS",
    phone: "01274 728502",
    email: "healthcheck.pharmacy@nhs.net",
    lat: 53.786,
    lng: -1.762,
    openingHours: healthcheckHours,
    googleMapsEmbedUrl: embed("127 Great Horton Road, Bradford BD7 1PS"),
    isDefault: true,
  },
];

/** Straight-line distance in miles between two coordinates (Haversine). */
export function distanceMiles(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number }
): number {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const R = 3958.8; // Earth radius in miles
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}
