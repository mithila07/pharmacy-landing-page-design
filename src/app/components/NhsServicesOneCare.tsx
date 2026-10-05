import { OC_IMAGES, OC_NHS_SERVICES, OC_PHARMACY_FIRST, ic, isTbc, type OCService } from "../data/onecare";
import { Arrow, BookLink, Eyebrow, Icon3D, Tbc } from "./onecareUi";

/** Makes the whole card clickable through its one link, keeping a single focus stop. */
export const STRETCH = "after:absolute after:inset-0 after:content-[''] after:rounded-oc-lg";

/** Photo card: image, name, one line, book. The photo does the describing, so no icon. */
export function ServiceImageCard({ s, aspect = "aspect-[4/3]" }: { s: OCService; aspect?: string }) {
  return (
    <article className="group oc-img-zoom relative flex flex-col" data-reveal>
      <div className={`${aspect} overflow-hidden rounded-[20px] bg-oc-mist`}>
        <img src={s.image} alt="" loading="lazy" style={{ objectPosition: s.imagePos }} className="w-full h-full object-cover" />
      </div>
      <div className="pt-4">
        <div className="min-w-0">
          <h3 className="oc-h3 text-oc-ink">
            <BookLink serviceId={s.serviceId} ariaLabel={`Book ${s.name}`} className={`inline-flex items-center gap-2 ${STRETCH}`}>
              {s.name} <Arrow className="text-oc-dark" />
            </BookLink>
          </h3>
          <p className="oc-small text-oc-quiet mt-1.5 max-w-[40ch]">{s.summary}</p>
          {s.priceFrom && (
            <p className="oc-small text-oc-ink font-semibold mt-2.5">From {isTbc(s.priceFrom) ? <Tbc>{s.priceFrom}</Tbc> : s.priceFrom}</p>
          )}
        </div>
      </div>
    </article>
  );
}

export function NhsServicesOneCare() {
  return (
    <section id="nhs-services" aria-labelledby="oc-nhs-title" className="py-[clamp(72px,9vw,136px)]">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[760px]" data-reveal>
          <Eyebrow>NHS services</Eyebrow>
          <h2 id="oc-nhs-title" className="oc-h2 text-oc-ink mt-4">Free NHS care from your pharmacist</h2>
          <p className="oc-lead text-oc-quiet mt-5 max-w-[58ch]">
            No GP appointment needed. We'll check you're eligible and explain any prescription charge before a medicine is supplied.
          </p>
        </div>

        <div className="mt-12 lg:mt-16 grid gap-x-6 gap-y-12 lg:grid-cols-12">
          {/* Pharmacy First: the headline NHS service, so it gets the one dark tile */}
          <article id="pharmacy-first" aria-labelledby="oc-pf-title" className="lg:col-span-6 rounded-oc-xl bg-oc-ink text-white overflow-hidden oc-dark" data-reveal>
            <div className="grid sm:grid-cols-[1fr_180px]">
              <div className="p-7 sm:p-9">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 pl-1.5 pr-3 py-1 text-[0.8125rem] font-semibold">
                  <span className="w-8 h-8 rounded-full bg-oc-mist grid place-items-center"><Icon3D src={ic.stethoscope} size={30} /></span> NHS Pharmacy First
                </span>
                <h3 id="oc-pf-title" className="oc-h2 mt-5 !text-[clamp(1.75rem,1.3rem+1.4vw,2.4rem)]">Help for seven common conditions</h3>
                <p className="oc-body text-white/80 mt-3 max-w-[44ch]">
                  A pharmacist assesses you in private and, where clinically appropriate, supplies treatment on the NHS.
                </p>
              </div>
              <div className="hidden sm:block relative">
                <img src={OC_IMAGES.imgSoreThroat} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
              </div>
            </div>
            <ul className="grid sm:grid-cols-2 gap-px bg-white/10 border-t border-white/10">
              {OC_PHARMACY_FIRST.map((c) => (
                <li key={c.serviceId} className="bg-oc-ink">
                  <BookLink
                    serviceId={c.serviceId}
                    ariaLabel={`Book Pharmacy First for ${c.name}`}
                    className="group w-full min-h-[76px] px-6 sm:px-8 py-4 flex items-center gap-4 text-left hover:bg-white/[0.06] transition-colors"
                  >
                    <span className="w-12 h-12 shrink-0 rounded-oc-md bg-oc-mist grid place-items-center"><Icon3D src={c.icon} size={46} /></span>
                    <span className="flex-1 min-w-0">
                      <span className="block font-semibold">{c.name}</span>
                      <span className="block oc-small text-white/70">{c.eligibility}</span>
                    </span>
                    <Arrow dir="up-right" className="text-oc-light" />
                  </BookLink>
                </li>
              ))}
              <li className="bg-oc-ink px-6 sm:px-8 py-4 oc-small text-white/75 flex items-center">
                Very unwell? Call 999. For urgent advice, call NHS 111.
              </li>
            </ul>
          </article>

          <div className="lg:col-span-6 grid sm:grid-cols-2 gap-x-6 gap-y-10">
            {OC_NHS_SERVICES.map((s) => <ServiceImageCard key={s.slug} s={s} />)}
          </div>
        </div>

      </div>
    </section>
  );
}
