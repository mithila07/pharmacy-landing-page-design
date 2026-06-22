import strachansLogo from "../assets/strachans-logo.svg";
import carefirstLogo from "../assets/d0b862ede6c0c3c9cbee51cd53c49828213cc4c9.png";
import canadaLogo from "../assets/canada-pharmacy-logo-vector.svg";
import healthcheckLogo from "../assets/health-check logo.png";
import { carefirstLocations, strachansLocations, canadaLocations, healthcheckLocations, type PharmacyLocation } from "./data/locations";

/**
 * A brand defines everything that differs between the white-label versions of
 * the site: identity (logo + name), the CSS theme scope that re-colours the
 * shared `--brand-*` palette, and the URL prefix for that brand's routes.
 *
 * Colours themselves live in `styles/theme.css` under `themeClass` so every
 * existing `bg-brand-*` / `text-brand-*` utility re-themes automatically — the
 * layout and components stay identical across brands.
 */
export type Brand = {
  id: string;
  name: string;
  tagline: string;
  logo: string;
  /** Logo already spells out the brand name — render it alone, no separate text. */
  logoIsWordmark: boolean;
  /** Class that re-scopes the `--brand-*` palette. "" = default (root) palette. */
  themeClass: string;
  /** Route prefix for this brand. "" = default brand at the site root. */
  basePath: string;
  /** Physical branches. ConX scopes an account per location; booking resolves to one. */
  locations: PharmacyLocation[];
  /** Route to this brand's About page, if it has one. */
  aboutPath?: string;
  /** Route to this brand's blog, if it has one. */
  blogPath?: string;
  /** Route to this brand's dedicated Contact page. When set, the inline "Find Us" is hidden. */
  contactPath?: string;
  /** Regulatory / company details shown in the footer (GPhC, company registration). */
  legal?: {
    companyName: string;
    companyNumber: string;
    superintendent: string;
    gphcNumber: string;
  };
};

export const carefirstBrand: Brand = {
  id: "carefirst",
  name: "CareFirst Pharmacy",
  tagline: "Community Pharmacy",
  logo: carefirstLogo,
  logoIsWordmark: false,
  themeClass: "",
  basePath: "",
  locations: carefirstLocations,
  legal: {
    companyName: "CareFirst Pharmacy Ltd",
    companyNumber: "07654321",
    superintendent: "Sarah Mills",
    gphcNumber: "9011223",
  },
};

export const strachansBrand: Brand = {
  id: "strachans",
  name: "Strachans Pharmacy",
  tagline: "Community Pharmacy",
  logo: strachansLogo,
  logoIsWordmark: true,
  themeClass: "theme-strachans",
  basePath: "/strachans",
  locations: strachansLocations,
  aboutPath: "/strachans/about",
  blogPath: "/strachans/blog",
  contactPath: "/strachans/contact",
  legal: {
    companyName: "Strachans Pharmacy Ltd",
    companyNumber: "01234567",
    superintendent: "Aisha Strachan",
    gphcNumber: "9012345",
  },
};

export const canadaBrand: Brand = {
  id: "canada",
  name: "Canada Pharmacy",
  tagline: "Pharmacy & Wellness",
  logo: canadaLogo,
  logoIsWordmark: true,
  themeClass: "theme-canada",
  basePath: "/canada",
  locations: canadaLocations,
  legal: {
    companyName: "Canada Pharmacy Ltd",
    companyNumber: "09988776",
    superintendent: "Daniel Reid",
    gphcNumber: "9011892",
  },
};

export const healthcheckBrand: Brand = {
  id: "healthcheck",
  name: "Health-Check Pharmacy & Clinic",
  tagline: "Pharmacy & Clinic",
  logo: healthcheckLogo,
  logoIsWordmark: true,
  themeClass: "theme-healthcheck",
  basePath: "/healthcheck",
  locations: healthcheckLocations,
  aboutPath: "/healthcheck/about",
  contactPath: "/healthcheck/contact",
  // No blog for this brand.
  legal: {
    companyName: "Health-Check Pharmacy & Clinic",
    companyNumber: "[REPLACE — Company No.]",
    superintendent: "[REPLACE — Superintendent Pharmacist]",
    gphcNumber: "[REPLACE — GPhC Reg. No.]",
  },
};

/** Home URL for a brand (root for the default brand). */
export const homePath = (brand: Brand) => brand.basePath || "/";
