import strachansLogo from "../assets/strachans-logo.svg";
import carefirstLogo from "../assets/d0b862ede6c0c3c9cbee51cd53c49828213cc4c9.png";
import icareLogo from "../assets/icare Full logo dark.svg";
import icareLogoMark from "../assets/icare Logo mark dark.svg";
import healthcheckLogo from "../assets/health-check logo.png";
import kepplelaneLogo from "../assets/kepple-lane-logo.png";
import centralLogo from "../assets/central-pharamcy-logo.svg";
import centralLogoMark from "../assets/central-pharamcy-logo-mark.svg";
import { carefirstLocations, strachansLocations, canadaLocations, healthcheckLocations, kepplelaneLocations, centralLocations, type PharmacyLocation } from "./data/locations";

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
  /** Compact square logo mark (icon only) — used in tight spots like the booking/service header. */
  logoMark?: string;
  /** Logo already spells out the brand name — render it alone, no separate text. */
  logoIsWordmark: boolean;
  /** Height utility for the header wordmark. Defaults to `h-9`. */
  headerLogoClass?: string;
  /** Per-brand favicon (usually the square logo mark). Applied at runtime by `useSeo`. */
  favicon?: string;
  /** Class that re-scopes the `--brand-*` palette. "" = default (root) palette. */
  themeClass: string;
  /** Route prefix for this brand. "" = default brand at the site root. */
  basePath: string;
  /** Physical branches. ConX scopes an account per location; booking resolves to one. */
  locations: PharmacyLocation[];
  /** Route to this brand's About page, if it has one. */
  aboutPath?: string;
  /**
   * Grouped nav items rendered as hover dropdowns in the header. A group is a
   * label only — it has no page of its own, so it never navigates. When a brand
   * defines groups, the standalone About link is dropped from the nav (About
   * lives inside a group instead); `aboutPath` still drives footer/CTA links.
   */
  navGroups?: { label: string; items: { label: string; path: string }[] }[];
  /** Route to this brand's blog, if it has one. */
  blogPath?: string;
  /** Route to this brand's dedicated Contact page. When set, the inline "Find Us" is hidden. */
  contactPath?: string;
  /**
   * Hides the header's quick-contact strip (phone + opening hours). Single-branch
   * brands show it by default; set this when the brand wants a cleaner nav and
   * carries those details in the hero and footer instead.
   */
  hideHeaderContact?: boolean;
  /** Human-readable area label woven into service/booking page SEO titles & descriptions (local SEO/GEO). When unset, it's derived from the branch short names. */
  seoArea?: string;
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
  seoArea: "Bury & Uppermill",
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
  id: "icare",
  name: "iCare Pharmacy",
  tagline: "Your first stop for trusted healthcare in Ealing",
  logo: icareLogo,
  logoMark: icareLogoMark,
  logoIsWordmark: true,
  themeClass: "theme-canada",
  basePath: "/icare",
  seoArea: "Ealing",
  locations: canadaLocations,
  aboutPath: "/icare/about",
  contactPath: "/icare/contact",
  legal: {
    companyName: "iCare Pharmacy Ltd",
    companyNumber: "[REPLACE — Company No.]",
    superintendent: "[REPLACE — Superintendent Pharmacist]",
    gphcNumber: "[REPLACE — GPhC Reg. No.]",
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

export const kepplelaneBrand: Brand = {
  id: "kepplelane",
  name: "Kepple Lane Pharmacy",
  tagline: "Healthy Living Pharmacy",
  logo: kepplelaneLogo,
  logoIsWordmark: true,
  // Wide wordmark — sits small next to the others at the default h-9.
  headerLogoClass: "h-11",
  themeClass: "theme-kepple",
  basePath: "/kepple-lane",
  seoArea: "Garstang",
  locations: kepplelaneLocations,
  aboutPath: "/kepple-lane/about",
  contactPath: "/kepple-lane/contact",
  // Phone + hours live in the hero and footer — the nav stays clean.
  hideHeaderContact: true,
  navGroups: [
    {
      label: "Dispensary",
      items: [
        { label: "About Us", path: "/kepple-lane/about" },
        { label: "Dispensing Process", path: "/kepple-lane/dispensing-process" },
        { label: "Deliveries", path: "/kepple-lane/deliveries" },
        { label: "Roles within the Dispensary", path: "/kepple-lane/roles" },
        { label: "Updates", path: "/kepple-lane/updates" },
      ],
    },
  ],
  // No blog for this brand.
  legal: {
    companyName: "Kepple Lane Pharmacy",
    companyNumber: "[REPLACE — Company No.]",
    superintendent: "[REPLACE — Superintendent Pharmacist]",
    gphcNumber: "[REPLACE — GPhC Reg. No.]",
  },
};

export const centralBrand: Brand = {
  id: "central",
  name: "Central Pharmacy",
  tagline: "Your family pharmacy in New Quay",
  logo: centralLogo,
  logoMark: centralLogoMark,
  favicon: centralLogoMark,
  logoIsWordmark: true,
  themeClass: "theme-central",
  basePath: "/central",
  seoArea: "New Quay",
  locations: centralLocations,
  aboutPath: "/central/about",
  contactPath: "/central/contact",
  // No blog for this brand.
  legal: {
    companyName: "Central Pharmacy",
    companyNumber: "8120039",
    superintendent: "Babatunde Cyril Olawoye",
    gphcNumber: "1043313",
  },
};

/** Home URL for a brand (root for the default brand). */
export const homePath = (brand: Brand) => brand.basePath || "/";
