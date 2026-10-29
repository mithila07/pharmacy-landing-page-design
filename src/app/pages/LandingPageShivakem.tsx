import { useRef } from "react";
import { shivakemBrand } from "../branding";
import { SK_BRANCH, SK_LEGAL } from "../data/shivakem";
import { isTbc } from "../data/onecare";
import { useSeo, JsonLd } from "../seo";
import { useOcReveal } from "../onecareMotion";
import { HeaderShivakem } from "../components/HeaderShivakem";
import { HeroSectionShivakem } from "../components/HeroSectionShivakem";
import {
  ClosingCtaShivakem, FaqShivakem, MoreServicesShivakem, NhsServicesShivakem, PrivateServicesShivakem, ReviewsShivakem, TravelClinicShivakem,
} from "../components/ShivakemSections";
import { FooterShivakem } from "../components/FooterShivakem";
import { SK_ROOT } from "../components/shivakemUi";
import { useOneCarePage } from "./onecarePage";

/** One Pharmacy node. No AggregateRating: Google ignores self-served review markup. */
export function shivakemGraph() {
  const a = SK_BRANCH.address;
  return {
    "@context": "https://schema.org",
    "@type": "Pharmacy",
    name: "Shivakem Pharmacy",
    ...(isTbc(SK_LEGAL.owner) ? {} : { legalName: SK_LEGAL.owner }),
    address: { "@type": "PostalAddress", streetAddress: a.line1, addressLocality: a.town, addressRegion: a.county, postalCode: a.postcode, addressCountry: "GB" },
    telephone: SK_BRANCH.phone,
    identifier: { "@type": "PropertyValue", propertyID: "GPhC premises registration", value: SK_BRANCH.gphc },
  };
}

export default function LandingPageShivakem() {
  useSeo({
    title: "Shivakem Pharmacy | NHS Pharmacy First & Private Clinics, Wembley",
    description: "See a pharmacist without a GP appointment at Shivakem Pharmacy, 12a Court Parade, Wembley HA0 3HU. Prescriptions, NHS Pharmacy First, travel vaccines and private clinics. Call 020 8904 1514.",
    path: shivakemBrand.basePath,
    favicon: shivakemBrand.favicon,
  });
  useOneCarePage("#0450B4");
  const root = useRef<HTMLDivElement>(null);
  useOcReveal(root);

  return (
    <div ref={root} className={SK_ROOT}>
      <JsonLd data={shivakemGraph()} />
      <HeaderShivakem />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <HeroSectionShivakem />
        <NhsServicesShivakem />
        <PrivateServicesShivakem />
        <TravelClinicShivakem />
        <MoreServicesShivakem />
        <ReviewsShivakem />
        <FaqShivakem />
        <ClosingCtaShivakem />
      </main>
      <FooterShivakem />
    </div>
  );
}
