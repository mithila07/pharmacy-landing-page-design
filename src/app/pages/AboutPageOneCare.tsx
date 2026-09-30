import { useRef } from "react";
import { Link } from "react-router";
import { onecareBrand } from "../branding";
import { OC_BRANCHES, OC_IMAGES, OC_LEGAL, ic, gphcRegisterUrl, isTbc, onecareLocations } from "../data/onecare";
import { useSeo, JsonLd } from "../seo";
import { useOcReveal } from "../onecareMotion";
import { HeaderOneCare } from "../components/HeaderOneCare";
import { FooterOneCare } from "../components/FooterOneCare";
import { GphcBadge } from "../components/GphcBadge";
import { BranchAddress } from "../components/BranchesOneCare";
import { Arrow, BTN_PRIMARY, BTN_SECONDARY, BranchPin, Eyebrow, Icon3D, OneCareBranchProvider, Tbc } from "../components/onecareUi";
import { useOneCarePage } from "./onecarePage";

const BASE = onecareBrand.basePath;

/** How we work: principles, not claims. Each is something a patient can hold us to. */
const PRINCIPLES = [
  { title: "Time to talk", body: "Consultations happen in private, and you won't be rushed. If you'd like someone with you, bring them." },
  { title: "Straight answers", body: "If a treatment isn't suitable, we'll say so and explain why, even when that means pointing you somewhere else." },
  { title: "Joined-up care", body: "When you need your GP, NHS 111 or another service, we'll tell you which one and what to say." },
];

function aboutGraph() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About OneCare Pharmacy",
    about: {
      "@type": "Organization",
      name: "OneCare Pharmacy",
      legalName: OC_LEGAL.owner,
      subOrganization: OC_BRANCHES.map((b) => ({ "@type": "Pharmacy", name: isTbc(b.name) ? "OneCare Pharmacy" : b.name })),
    },
  };
}

export default function AboutPageOneCare() {
  useSeo({
    title: "About us | OneCare Pharmacy, Gateshead",
    description: "OneCare Pharmacy runs two GPhC-registered community pharmacies, including Bewick Road in Gateshead. Meet the team and see how we work.",
    path: `${BASE}/about`,
    favicon: onecareBrand.favicon,
  });
  useOneCarePage();
  const root = useRef<HTMLDivElement>(null);
  useOcReveal(root);

  return (
    <OneCareBranchProvider>
      <div ref={root} className="theme-onecare oc-page min-h-screen bg-oc-paper">
        <JsonLd data={aboutGraph()} />
        <HeaderOneCare />
        <main id="main-content" tabIndex={-1} className="outline-none">
          {/* Hero */}
          <section aria-labelledby="oc-about-title" className="oc-hero-wash -mt-[76px] pt-[124px] lg:pt-[148px] pb-[clamp(56px,7vw,112px)]">
            <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 grid gap-12 lg:grid-cols-12 items-end">
              <div className="lg:col-span-6" data-reveal>
                <Eyebrow>About us</Eyebrow>
                <h1 id="oc-about-title" className="oc-display !text-[clamp(2.5rem,1.4rem+4vw,4.5rem)] text-oc-ink mt-5">One standard of care, at both our branches</h1>
                <p className="oc-lead text-oc-quiet mt-6 max-w-[48ch]">
                  OneCare Pharmacy runs two community pharmacies, on Bewick Road in Gateshead and in <Tbc>[REPLACE: Branch 2 area]</Tbc>. We offer NHS services and private clinics, with time to talk.
                </p>
              </div>
              <div className="lg:col-span-6 grid grid-cols-5 gap-4" data-reveal>
                <div className="col-span-3 aspect-[4/5] rounded-[20px] overflow-hidden bg-oc-mist">
                  <img src={OC_IMAGES.imgCounter} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="col-span-2 grid gap-4 content-end">
                  <div className="aspect-square rounded-[20px] overflow-hidden bg-oc-mist">
                    <img src={OC_IMAGES.imgConsult} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="aspect-[4/3] rounded-[20px] overflow-hidden bg-oc-mist">
                    <img src={OC_IMAGES.imgBloodPressure} alt="" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Story */}
          <section aria-labelledby="oc-story-title" className="py-[clamp(72px,9vw,136px)]">
            <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 grid gap-8 lg:grid-cols-12">
              <h2 id="oc-story-title" className="oc-h2 text-oc-ink lg:col-span-5" data-reveal>Our story</h2>
              <div className="lg:col-span-7 grid gap-5 oc-lead text-oc-text max-w-[62ch]" data-reveal>
                <p><Tbc>[REPLACE: two or three sentences on how OneCare started, who runs it and how long it has served Gateshead]</Tbc></p>
                <p>
                  Today our pharmacists provide NHS services such as Pharmacy First, flu vaccinations and blood pressure checks, alongside private clinics including travel health and ear wax removal.
                </p>
                <p>OneCare Pharmacy is a trading name of {OC_LEGAL.owner}.</p>
              </div>
            </div>
          </section>

          {/* How we work */}
          <section aria-labelledby="oc-principles-title" className="py-[clamp(72px,9vw,136px)] bg-oc-tint">
            <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
              <h2 id="oc-principles-title" className="oc-h2 text-oc-ink max-w-[16ch]" data-reveal>How we work</h2>
              <dl className="mt-12">
                {PRINCIPLES.map((p) => (
                  <div key={p.title} className="grid gap-3 md:grid-cols-12 py-8 border-t border-oc-line-strong" data-reveal>
                    <dt className="md:col-span-5 oc-h3 !text-[clamp(1.4rem,1.1rem+1vw,2rem)] text-oc-ink">{p.title}</dt>
                    <dd className="md:col-span-7 oc-lead text-oc-quiet max-w-[52ch]">{p.body}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          {/* Superintendent (E-E-A-T: a named, registered professional accountable for the service) */}
          <section aria-labelledby="oc-team-title" className="py-[clamp(72px,9vw,136px)]">
            <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 grid gap-10 lg:grid-cols-12 items-center">
              <figure className="lg:col-span-5 aspect-[4/5] max-w-[440px] rounded-oc-xl border-2 border-dashed border-oc-line-strong bg-oc-tint flex flex-col items-center justify-center gap-3 text-oc-quiet" data-reveal>
                <Icon3D src={ic.healthworker} size={96} />
                <figcaption><Tbc>[REPLACE: photo of the superintendent pharmacist]</Tbc></figcaption>
              </figure>
              <div className="lg:col-span-7" data-reveal>
                <h2 id="oc-team-title" className="oc-h2 text-oc-ink">Your pharmacist</h2>
                <p className="oc-h3 text-oc-ink mt-6"><Tbc>{OC_LEGAL.superintendent}</Tbc></p>
                <p className="oc-body text-oc-quiet mt-1">Superintendent pharmacist, GPhC registration <Tbc>{OC_LEGAL.superintendentGphc}</Tbc></p>
                <p className="oc-lead text-oc-text mt-6 max-w-[56ch]">
                  The superintendent pharmacist is responsible for how medicines and pharmacy services are managed at both branches, and reviews the health information on this website.
                </p>
                <p className="oc-body text-oc-text mt-4 max-w-[56ch]"><Tbc>[REPLACE: a short introduction in their own words, including qualifications and clinical interests]</Tbc></p>
              </div>
            </div>
          </section>

          {/* Regulation */}
          <section aria-labelledby="oc-reg-title" className="py-[clamp(72px,9vw,136px)] bg-oc-tint">
            <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-[720px]" data-reveal>
                <h2 id="oc-reg-title" className="oc-h2 text-oc-ink">Registered and accountable</h2>
                <p className="oc-lead text-oc-quiet mt-5 max-w-[58ch]">
                  Both branches are registered with the General Pharmaceutical Council (GPhC), the regulator for pharmacies in Great Britain. You can check any registration on the GPhC register.
                </p>
              </div>
              <ul className="mt-12 grid md:grid-cols-2 gap-6">
                {OC_BRANCHES.map((b) => (
                  <li key={b.id} className="rounded-oc-xl bg-white border border-oc-line p-7 sm:p-9 flex flex-col gap-5" data-reveal>
                    <h3 className="oc-h3 text-oc-ink flex items-center gap-3"><BranchPin branch={b} size={24} /> {b.shortName}</h3>
                    <BranchAddress b={b} />
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 oc-small">
                      {isTbc(b.gphc) ? <Tbc>GPhC premises no. [REPLACE]</Tbc> : (
                        <a href={gphcRegisterUrl(b.gphc)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-oc-dark underline underline-offset-4">
                          GPhC premises {b.gphc} <Arrow dir="up-right" /><span className="sr-only"> (opens the GPhC register in a new tab)</span>
                        </a>
                      )}
                      <GphcBadge location={onecareLocations.find((l) => l.id === b.id)} className="h-7" />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Next step */}
          <section aria-labelledby="oc-about-next" className="py-[clamp(72px,9vw,136px)]">
            <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-end justify-between gap-8" data-reveal>
              <h2 id="oc-about-next" className="oc-h2 text-oc-ink max-w-[18ch]">Come and see us, or book ahead</h2>
              <div className="flex flex-wrap gap-3">
                <Link to={`${BASE}#nhs-services`} className={BTN_PRIMARY}>Book an appointment</Link>
                <Link to={`${BASE}/contact`} className={`${BTN_SECONDARY} group`}>Contact us <Arrow /></Link>
              </div>
            </div>
          </section>
        </main>
        <FooterOneCare />
      </div>
    </OneCareBranchProvider>
  );
}
