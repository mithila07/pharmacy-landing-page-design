import { useRef } from "react";
import { Link } from "react-router";
import { shivakemBrand } from "../branding";
import { gphcRegisterUrl, isTbc } from "../data/onecare";
import { SK_BRANCH, SK_IMAGES, SK_LEGAL, formatSkAddress, shivakemLocations, skIc } from "../data/shivakem";
import { useSeo } from "../seo";
import { useOcReveal } from "../onecareMotion";
import { HeaderShivakem } from "../components/HeaderShivakem";
import { FooterShivakem } from "../components/FooterShivakem";
import { GphcBadge } from "../components/GphcBadge";
import { BTN_PRIMARY, BTN_SECONDARY, Icon3D, Tbc } from "../components/onecareUi";
import { SK_ROOT, SkArrow } from "../components/shivakemUi";
import { useOneCarePage } from "./onecarePage";

const BASE = shivakemBrand.basePath;
const SECTION = "py-[clamp(72px,9vw,136px)]";
const WRAP = "max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8";

/** How we work: principles a patient can hold us to, not claims. */
const PRINCIPLES = [
  { title: "Private conversations", body: "Every consultation happens in our private room, at your pace. You're welcome to bring someone with you." },
  { title: "Honest advice", body: "If something isn't right for you, we'll tell you plainly and explain why, even if that means sending you elsewhere." },
  { title: "The right next step", body: "When you need your GP, NHS 111 or another service, we'll tell you which one, and what to mention when you get there." },
];

export default function AboutPageShivakem() {
  useSeo({
    title: "About us | Shivakem Pharmacy, Wembley",
    description: "Shivakem Pharmacy is a GPhC-registered community pharmacy at 12a Court Parade, Wembley. See how we work and who's responsible for your care.",
    path: `${BASE}/about`,
    favicon: shivakemBrand.favicon,
  });
  useOneCarePage("#0450B4");
  const root = useRef<HTMLDivElement>(null);
  useOcReveal(root);

  return (
    <div ref={root} className={SK_ROOT}>
      <HeaderShivakem />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <section aria-labelledby="sk-about-title" className="oc-hero-wash -mt-[76px] pt-[124px] lg:pt-[148px] pb-[clamp(56px,7vw,112px)]">
          <div className={`${WRAP} grid gap-12 lg:grid-cols-12 items-end`}>
            <div className="lg:col-span-6" data-reveal>
              <h1 id="sk-about-title" className="oc-display !text-[clamp(2.5rem,1.4rem+4vw,4.5rem)] text-oc-ink">A Wembley pharmacy that makes time for you</h1>
              <p className="oc-lead text-oc-quiet mt-6 max-w-[48ch]">
                Shivakem is an independent community pharmacy on Court Parade, offering NHS services and private clinics to local families.
              </p>
            </div>
            <div className="lg:col-span-6 grid grid-cols-5 gap-4" data-reveal>
              <div className="col-span-3 aspect-[4/5] rounded-[20px] overflow-hidden bg-oc-mist">
                <img src={SK_IMAGES.imgCounter} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="col-span-2 grid gap-4 content-end">
                <div className="aspect-square rounded-[20px] overflow-hidden bg-oc-mist"><img src={SK_IMAGES.imgConsult} alt="" className="w-full h-full object-cover" /></div>
                <div className="aspect-[4/3] rounded-[20px] overflow-hidden bg-oc-mist"><img src={SK_IMAGES.imgBloodPressure} alt="" className="w-full h-full object-cover" /></div>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="sk-story-title" className={SECTION}>
          <div className={`${WRAP} grid gap-8 lg:grid-cols-12`}>
            <h2 id="sk-story-title" className="oc-h2 text-oc-ink lg:col-span-5" data-reveal>Our story</h2>
            <div className="lg:col-span-7 grid gap-5 oc-lead text-oc-text max-w-[62ch]" data-reveal>
              <p><Tbc>[REPLACE: how Shivakem started, who runs it and how long it has served Wembley]</Tbc></p>
              <p>Alongside your prescriptions, our pharmacists run NHS services such as Pharmacy First, flu jabs and blood pressure checks, plus private clinics for travel health, ear wax removal and more.</p>
            </div>
          </div>
        </section>

        <section aria-labelledby="sk-principles-title" className={`${SECTION} bg-oc-tint`}>
          <div className={WRAP}>
            <h2 id="sk-principles-title" className="oc-h2 text-oc-ink max-w-[16ch]" data-reveal>What you can expect</h2>
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

        <section aria-labelledby="sk-team-title" className={SECTION}>
          <div className={`${WRAP} grid gap-10 lg:grid-cols-12 items-center`}>
            <div aria-hidden="true" className="lg:col-span-5 aspect-[4/5] w-full max-w-[440px] rounded-oc-xl bg-gradient-to-br from-oc-mist to-white border border-oc-line grid place-items-center" data-reveal>
              <Icon3D src={skIc["pharmacist-coat"]} size={220} />
            </div>
            <div className="lg:col-span-7" data-reveal>
              <h2 id="sk-team-title" className="oc-h2 text-oc-ink">Who's responsible for your care</h2>
              <p className="oc-h3 text-oc-ink mt-6">{isTbc(SK_LEGAL.superintendent) ? <Tbc>{SK_LEGAL.superintendent}</Tbc> : SK_LEGAL.superintendent}</p>
              <p className="oc-body text-oc-quiet mt-1">Superintendent pharmacist, GPhC registration {isTbc(SK_LEGAL.superintendentGphc) ? <Tbc>{SK_LEGAL.superintendentGphc}</Tbc> : SK_LEGAL.superintendentGphc}</p>
              <p className="oc-lead text-oc-text mt-6 max-w-[56ch]">
                Our superintendent pharmacist oversees how medicines and services are run at Shivakem, and checks the health information on this website.
              </p>
            </div>
          </div>
        </section>

        <section aria-labelledby="sk-reg-title" className={`${SECTION} bg-oc-tint`}>
          <div className={`${WRAP} grid gap-10 lg:grid-cols-12 items-center`}>
            <div className="lg:col-span-6" data-reveal>
              <h2 id="sk-reg-title" className="oc-h2 text-oc-ink">Checked and registered</h2>
              <p className="oc-lead text-oc-quiet mt-5 max-w-[52ch]">
                Shivakem is registered with the General Pharmaceutical Council (GPhC), which regulates pharmacies across Great Britain. Anyone can look up our registration.
              </p>
            </div>
            <div className="lg:col-span-6 rounded-oc-xl bg-white border border-oc-line p-7 sm:p-9 flex flex-col gap-5" data-reveal>
              <h3 className="oc-h3 text-oc-ink">Shivakem Pharmacy</h3>
              <p className="oc-body text-oc-text">{formatSkAddress()}</p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 oc-small">
                <a href={gphcRegisterUrl(SK_BRANCH.gphc)} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 text-oc-dark underline underline-offset-4">
                  GPhC premises {SK_BRANCH.gphc} <SkArrow dir="up-right" size={14} /><span className="sr-only"> (opens the GPhC register in a new tab)</span>
                </a>
                <GphcBadge location={shivakemLocations[0]} className="h-7" />
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="sk-about-next" className={SECTION}>
          <div className={`${WRAP} flex flex-wrap items-end justify-between gap-8`} data-reveal>
            <h2 id="sk-about-next" className="oc-h2 text-oc-ink max-w-[18ch]">Drop in, or book a time</h2>
            <div className="flex flex-wrap gap-3">
              <Link to={`${BASE}#nhs-services`} className={BTN_PRIMARY}>Book an appointment</Link>
              <Link to={`${BASE}/contact`} className={`${BTN_SECONDARY} group`}>Get in touch <SkArrow /></Link>
            </div>
          </div>
        </section>
      </main>
      <FooterShivakem />
    </div>
  );
}
