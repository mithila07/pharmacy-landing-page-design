import {
  OC_FEATURED_PRIVATE, OC_IMAGES, OC_TRAVEL, OC_TRAVEL_CONSULT, OC_TREATMENTS, OC_VACCINES, PRIVATE_DISCLAIMER, ic, isTbc,
  type OCMiniService, type OCService,
} from "../data/onecare";
import { STRETCH } from "./NhsServicesOneCare";
import { Arrow, BTN_PRIMARY, BookLink, Eyebrow, Icon3D, Tbc } from "./onecareUi";

const Price = ({ value }: { value?: string }) =>
  value ? <>From {isTbc(value) ? <Tbc>{value}</Tbc> : value}</> : null;

// ── 1. Headline private clinics: two large photo cards ───────────────────

function FeatureCard({ s }: { s: OCService }) {
  return (
    <article className="group oc-img-zoom relative flex flex-col rounded-oc-xl bg-white border border-oc-line overflow-hidden" data-reveal>
      <div className="aspect-[16/10] overflow-hidden bg-oc-mist">
        <img src={s.image} alt="" loading="lazy" style={{ objectPosition: s.imagePos }} className="w-full h-full object-cover" />
      </div>
      <div className="p-7 sm:p-9 flex flex-col gap-4 flex-1">
        <h3 className="oc-h2 !text-[clamp(1.75rem,1.3rem+1.4vw,2.5rem)] text-oc-ink">{s.name}</h3>
        <p className="oc-lead text-oc-quiet max-w-[46ch]">{s.summary}</p>
        <div className="mt-auto pt-4 flex flex-wrap items-center justify-between gap-4">
          <p className="oc-body font-semibold text-oc-ink"><Price value={s.priceFrom} /></p>
          <BookLink serviceId={s.serviceId} ariaLabel={`Book ${s.name}`} className={`${BTN_PRIMARY} ${STRETCH}`}>
            Book now <Arrow />
          </BookLink>
        </div>
      </div>
    </article>
  );
}

export function PrivateServicesOneCare() {
  return (
    <section id="private-services" aria-labelledby="oc-private-title" className="py-[clamp(72px,9vw,136px)] bg-oc-tint">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[760px]" data-reveal>
          <Eyebrow>Private services</Eyebrow>
          <h2 id="oc-private-title" className="oc-h2 text-oc-ink mt-4">Private clinics, booked around you</h2>
          <p className="oc-lead text-oc-quiet mt-5 max-w-[56ch]">
            Choose a time that suits you. The pharmacist checks the treatment is right for you before going ahead.
          </p>
        </div>
        <div className="mt-12 grid lg:grid-cols-2 gap-6">
          {OC_FEATURED_PRIVATE.map((s) => <FeatureCard key={s.slug} s={s} />)}
        </div>
        <p className="mt-8 oc-small text-oc-quiet">{PRIVATE_DISCLAIMER}</p>
      </div>
    </section>
  );
}

// ── 2. Travel clinic ─────────────────────────────────────────────────────

function TravelTile({ t }: { t: OCMiniService }) {
  return (
    <li className="group relative rounded-oc-lg bg-white border border-oc-line p-5 sm:p-6 flex flex-col gap-3 hover:border-oc-dark transition-colors" data-reveal>
      <Icon3D src={t.icon} size={56} className="transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[-4deg]" />
      <h4 className="font-semibold text-oc-ink text-[1.0625rem] leading-snug">
        <BookLink serviceId={t.serviceId} ariaLabel={`Book ${t.name}`} className={STRETCH}>{t.name}</BookLink>
      </h4>
      <p className="oc-small text-oc-quiet">{t.line}</p>
      <Arrow dir="up-right" className="mt-auto text-oc-dark" />
    </li>
  );
}

export function TravelClinicOneCare() {
  return (
    <section id="travel-clinic" aria-labelledby="oc-travel-title" className="py-[clamp(72px,9vw,136px)]">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner: the photo leaves its left side clear for the text on wide screens */}
        <div className="relative rounded-oc-xl overflow-hidden bg-oc-mist" data-reveal>
          <img src={OC_IMAGES.imgTravelClinic} alt="" loading="lazy" className="w-full aspect-[16/9] lg:aspect-[21/9] object-cover object-right" />
          <div className="lg:absolute lg:inset-y-0 lg:left-0 lg:w-[52%] p-7 sm:p-10 lg:p-14 flex flex-col justify-center bg-white lg:bg-gradient-to-r lg:from-[#faf6ef]/95 lg:via-[#faf6ef]/80 lg:to-transparent">
            <Eyebrow>Travel clinic</Eyebrow>
            <h2 id="oc-travel-title" className="oc-h2 text-oc-ink mt-4 max-w-[16ch]">Travel vaccines and advice for your trip</h2>
            <p className="oc-lead text-oc-text mt-5 max-w-[40ch]">
              Tell us where you're going and we'll plan the vaccines and medicines you need. Book six to eight weeks before you travel.
            </p>
            <div className="mt-8">
              <BookLink serviceId={OC_TRAVEL_CONSULT.serviceId} className={`${BTN_PRIMARY} group`}>
                <Icon3D src={ic.airplane} size={24} className="-my-1" /> Book a travel consultation
              </BookLink>
            </div>
          </div>
        </div>

        <h3 className="sr-only">Travel vaccines and services</h3>
        <ul className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {OC_TRAVEL.map((t) => <TravelTile key={t.serviceId} t={t} />)}
        </ul>
        <p className="mt-6 oc-small text-oc-quiet max-w-[80ch]">
          Which vaccines you need depends on your destination, activities and vaccination history. All travel vaccines are subject to consultation, and some are given as a course over several weeks.
        </p>
      </div>
    </section>
  );
}

// ── 3. Other vaccinations and everyday treatments ────────────────────────

function ServiceRow({ t }: { t: OCMiniService }) {
  return (
    <li className="group relative flex items-center gap-4 rounded-oc-md px-3 py-3 -mx-3 hover:bg-white transition-colors">
      <span className="w-14 h-14 shrink-0 rounded-oc-md bg-white border border-oc-line grid place-items-center group-hover:border-oc-dark transition-colors">
        <Icon3D src={t.icon} size={36} />
      </span>
      <span className="flex-1 min-w-0">
        <BookLink serviceId={t.serviceId} ariaLabel={`Book ${t.name}`} className={`block font-semibold text-oc-ink ${STRETCH}`}>{t.name}</BookLink>
        <span className="block oc-small text-oc-quiet">{t.line}</span>
      </span>
      <Arrow className="text-oc-dark opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
    </li>
  );
}

export function MoreServicesOneCare() {
  return (
    <section id="more-services" aria-labelledby="oc-more-title" className="py-[clamp(72px,9vw,136px)] bg-oc-tint">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="oc-more-title" className="oc-h2 text-oc-ink max-w-[18ch]" data-reveal>Vaccinations and everyday treatments</h2>
        <p className="oc-lead text-oc-quiet mt-5 max-w-[58ch]" data-reveal>
          Protection that isn't on the NHS schedule for you, and quick help for common problems, without waiting for a GP.
        </p>

        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-5 rounded-oc-xl bg-oc-mist p-6 sm:p-8" data-reveal>
            <h3 className="oc-h3 text-oc-ink flex items-center gap-3"><Icon3D src={ic.syringe} size={40} /> Vaccinations</h3>
            <ul className="mt-5 grid gap-1">
              {OC_VACCINES.map((t) => <ServiceRow key={t.serviceId} t={t} />)}
            </ul>
          </div>
          <div className="lg:col-span-7 rounded-oc-xl bg-oc-mist p-6 sm:p-8" data-reveal>
            <h3 className="oc-h3 text-oc-ink flex items-center gap-3"><Icon3D src={ic.pill} size={40} /> Everyday treatments</h3>
            <ul className="mt-5 grid sm:grid-cols-2 gap-x-6 gap-y-1">
              {OC_TREATMENTS.map((t) => <ServiceRow key={t.serviceId} t={t} />)}
            </ul>
          </div>
        </div>
        <p className="mt-8 oc-small text-oc-quiet">{PRIVATE_DISCLAIMER} For NHS help with seven common conditions, see <a href="#pharmacy-first" className="text-oc-dark underline underline-offset-4">Pharmacy First</a>.</p>
      </div>
    </section>
  );
}
