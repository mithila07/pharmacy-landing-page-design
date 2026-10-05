import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { onecareBrand } from "../branding";
import { OC_BRANCHES, OC_FAQS, OC_IMAGES, OC_LEGAL, formatAddress, isTbc } from "../data/onecare";
import { useSeo, JsonLd } from "../seo";
import { useOcReveal } from "../onecareMotion";
import { HeaderOneCare } from "../components/HeaderOneCare";
import { HeroSectionOneCare } from "../components/HeroSectionOneCare";
import { NhsServicesOneCare } from "../components/NhsServicesOneCare";
import { MoreServicesOneCare, PrivateServicesOneCare, TravelClinicOneCare } from "../components/PrivateServicesOneCare";
import { FooterOneCare } from "../components/FooterOneCare";
import { Plus } from "@phosphor-icons/react";
import { Arrow, BTN_ON_DARK, OneCareBranchProvider, Ph, Tbc } from "../components/onecareUi";
import { useOneCarePage } from "./onecarePage";

function Faq() {
  return (
    <section aria-labelledby="oc-faq-title" className="py-[clamp(72px,9vw,136px)]">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4" data-reveal>
          <h2 id="oc-faq-title" className="oc-h2 text-oc-ink">Questions we're often asked</h2>
          <Link to={`${onecareBrand.basePath}/contact`} className="group mt-6 inline-flex items-center gap-1.5 min-h-[44px] font-semibold text-oc-dark">
            Ask us something else <Arrow />
          </Link>
        </div>
        <div className="lg:col-span-8 grid gap-3" data-reveal>
          {OC_FAQS.map((f) => {
            const tbcAt = f.a.indexOf("[REPLACE");
            return (
              <details key={f.q} className="group rounded-oc-lg bg-oc-tint open:bg-oc-mist transition-colors">
                <summary className="list-none flex items-center justify-between gap-6 min-h-[64px] px-6 py-4 cursor-pointer [&::-webkit-details-marker]:hidden">
                  <span className="font-semibold text-oc-ink text-[1.0625rem]">{f.q}</span>
                  <span aria-hidden="true" className="shrink-0 w-9 h-9 rounded-full bg-white grid place-items-center text-oc-ink transition-transform duration-300 group-open:rotate-45">
                    <Ph icon={Plus} size={18} />
                  </span>
                </summary>
                <div className="oc-faq-body px-6 pb-6 -mt-1 oc-body text-oc-text max-w-[68ch]">
                  {tbcAt === -1 ? f.a : <>{f.a.slice(0, tbcAt)}<Tbc>{f.a.slice(tbcAt)}</Tbc></>}
                </div>
              </details>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ClosingCta() {
  return (
    <section aria-labelledby="oc-cta-title" className="pb-[clamp(72px,9vw,136px)]">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="oc-dark rounded-oc-xl bg-oc-ink text-white overflow-hidden grid lg:grid-cols-2" data-reveal>
          <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
            <h2 id="oc-cta-title" className="oc-h2">Not sure which service you need?</h2>
            <p className="oc-lead text-white/80 mt-5 max-w-[42ch]">Call or pop into either branch. A pharmacist will point you the right way.</p>
            <div className="mt-9">
              <Link to={`${onecareBrand.basePath}/contact`} className={`${BTN_ON_DARK} group`}>
                Contact us <Arrow />
              </Link>
            </div>
          </div>
          <div className="relative min-h-[260px] lg:min-h-[420px]">
            <img src={OC_IMAGES.imgCounter} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Structured data: one Pharmacy node per branch, no AggregateRating ──
export function onecareGraph() {
  const org = {
    "@type": "Organization",
    "@id": "#onecare",
    name: "One Care Pharmacy",
    legalName: OC_LEGAL.owner,
    ...(isTbc(OC_LEGAL.companyNumber) ? {} : { identifier: { "@type": "PropertyValue", propertyID: "Companies House number", value: OC_LEGAL.companyNumber } }),
  };
  // Stand-in (demo) branches are left out so search engines never index dummy details.
  const branches = OC_BRANCHES.filter((b) => !b.demo).map((b) => ({
    "@type": "Pharmacy",
    "@id": `#${b.id}`,
    name: isTbc(b.name) ? "One Care Pharmacy" : b.name,
    ...(isTbc(formatAddress(b)) ? {} : {
      address: { "@type": "PostalAddress", streetAddress: b.address.line1, addressLocality: b.address.town, addressRegion: b.address.county, postalCode: b.address.postcode, addressCountry: "GB" },
    }),
    ...(isTbc(b.phone) ? {} : { telephone: b.phone }),
    ...(isTbc(b.email) ? {} : { email: b.email }),
    ...(b.geo ? { geo: { "@type": "GeoCoordinates", latitude: b.geo.lat, longitude: b.geo.lng } } : {}),
    ...(isTbc(b.gphc) ? {} : { identifier: { "@type": "PropertyValue", propertyID: "GPhC premises registration", value: b.gphc } }),
    parentOrganization: { "@id": "#onecare" },
  }));
  return { "@context": "https://schema.org", "@graph": [org, ...branches] };
}

export default function LandingPageOneCare() {
  useSeo({
    title: "One Care Pharmacy | NHS Pharmacy First & Private Clinics, Gateshead",
    description: "NHS Pharmacy First, a travel vaccination clinic, weight loss and ear wax removal at One Care Pharmacy, Bewick Road, Gateshead. Book online and choose your branch.",
    path: onecareBrand.basePath,
    favicon: onecareBrand.favicon,
  });
  useOneCarePage();
  const root = useRef<HTMLDivElement>(null);
  useOcReveal(root);

  return (
    <OneCareBranchProvider>
      <div ref={root} className="theme-onecare oc-page min-h-screen bg-oc-paper">
        <JsonLd data={onecareGraph()} />
        <HeaderOneCare />
        <main id="main-content" tabIndex={-1} className="outline-none">
          <HeroSectionOneCare />
          <NhsServicesOneCare />
          <PrivateServicesOneCare />
          <TravelClinicOneCare />
          <MoreServicesOneCare />
          <Faq />
          <ClosingCta />
        </main>
        <FooterOneCare />
      </div>
    </OneCareBranchProvider>
  );
}
