import strachansLogo from "../assets/strachans-logo.svg";
import carefirstLogo from "../assets/d0b862ede6c0c3c9cbee51cd53c49828213cc4c9.png";
import icareLogo from "../assets/icare Full logo dark.svg";
import icareLogoMark from "../assets/icare Logo mark dark.svg";
import healthcheckLogo from "../assets/health-check logo.png";
import kepplelaneLogo from "../assets/kepple-lane-logo.png";
import centralLogo from "../assets/central-pharamcy-logo.svg";
import centralLogoMark from "../assets/central-pharamcy-logo-mark.svg";
import jmorrisLogo from "../assets/J Morris Pharmacy Logo horizontal.svg";
import jmorrisFooter from "../assets/J Morris Pharmacy Logo.svg";
import jmorrisMark from "../assets/j-morris logomark.svg";
import acreLogo from "../assets/Acre Logo 2 horizontal.svg";
import acreFooter from "../assets/Acre Logo.svg";
import acreMark from "../assets/Acre logomark.svg";
import meadowsLogo from "../assets/Meadows FB Logo horizontal.svg";
import meadowsFooter from "../assets/Meadows.svg";
import meadowsMark from "../assets/Meadows logomark.svg";
import onecareLogo from "../assets/onecare/OCP_Logo_Transparent.png";
import onecareMark from "../assets/onecare/onecare-icon.svg";
import onecareFavicon from "../assets/onecare/favicon.ico";
import { onecareLocations, OC_LEGAL } from "./data/onecare";
import { carefirstLocations, strachansLocations, canadaLocations, healthcheckLocations, kepplelaneLocations, centralLocations, jmorrisLocations, acreLocations, meadowsLocations, type PharmacyLocation } from "./data/locations";

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
  /** Full-colour logo variant for the dark footer (rendered as-is, not inverted). */
  footerLogo?: string;
  /** Marks a brand that uses the shared Kepple-Lane template (hero, about, contact). */
  template?: boolean;
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

export const jmorrisBrand: Brand = {
  id: "jmorris",
  name: "J Morris Pharmacy",
  tagline: "Your local NHS & private pharmacy",
  logo: jmorrisLogo,
  logoMark: jmorrisMark,
  footerLogo: jmorrisFooter,
  favicon: jmorrisMark,
  logoIsWordmark: true,
  headerLogoClass: "h-11",
  themeClass: "theme-jmorris",
  basePath: "/j-morris",
  seoArea: "Ashton-in-Makerfield",
  locations: jmorrisLocations,
  aboutPath: "/j-morris/about",
  contactPath: "/j-morris/contact",
  hideHeaderContact: true,
  template: true,
  legal: {
    companyName: "J Morris Pharmacy",
    companyNumber: "[REPLACE — Company No.]",
    superintendent: "[REPLACE — Superintendent Pharmacist]",
    gphcNumber: "1033995",
  },
};

export const acreBrand: Brand = {
  id: "acre",
  name: "Acre Pharmacy",
  tagline: "Trusted NHS & private healthcare",
  logo: acreLogo,
  logoMark: acreMark,
  footerLogo: acreFooter,
  favicon: acreMark,
  logoIsWordmark: true,
  headerLogoClass: "h-11",
  themeClass: "theme-acre",
  basePath: "/acre",
  seoArea: "Huddersfield",
  locations: acreLocations,
  aboutPath: "/acre/about",
  contactPath: "/acre/contact",
  hideHeaderContact: true,
  template: true,
  legal: {
    companyName: "Dickinsons Chemist Ltd (T/A Acre Pharmacy)",
    companyNumber: "[REPLACE — Company No.]",
    superintendent: "[REPLACE — Superintendent Pharmacist]",
    gphcNumber: "[REPLACE — GPhC Reg. No.]",
  },
};

export const meadowsBrand: Brand = {
  id: "meadows",
  name: "Meadows Pharmacy",
  tagline: "Your community pharmacy in Maghull",
  logo: meadowsLogo,
  logoMark: meadowsMark,
  footerLogo: meadowsFooter,
  favicon: meadowsMark,
  logoIsWordmark: true,
  headerLogoClass: "h-11",
  themeClass: "theme-meadows",
  basePath: "/meadows",
  seoArea: "Maghull",
  locations: meadowsLocations,
  aboutPath: "/meadows/about",
  contactPath: "/meadows/contact",
  hideHeaderContact: true,
  template: true,
  legal: {
    companyName: "Meadows Pharmacy",
    companyNumber: "[REPLACE — Company No.]",
    superintendent: "[REPLACE — Superintendent Pharmacist]",
    gphcNumber: "1034529",
  },
};

export const onecareBrand: Brand = {
  id: "onecare",
  name: "One Care Pharmacy",
  tagline: "NHS & private pharmacy",
  logo: onecareLogo,
  logoMark: onecareMark,
  favicon: onecareFavicon,
  logoIsWordmark: true,
  themeClass: "theme-onecare",
  basePath: "/onecare",
  seoArea: "Gateshead & Low Fell",
  locations: onecareLocations, // both branches, from data/onecare.ts
  legal: {
    companyName: OC_LEGAL.owner,
    companyNumber: OC_LEGAL.companyNumber,
    superintendent: OC_LEGAL.superintendent,
    gphcNumber: OC_LEGAL.superintendentGphc,
  },
};

/** Home URL for a brand (root for the default brand). */
export const homePath = (brand: Brand) => brand.basePath || "/";
