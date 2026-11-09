import { Clock } from "iconoir-react";
import type { Brand } from "../branding";
import { templateSites, type BentoTile } from "../data/templateSites";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { RevealCard } from "./dewsbury/RevealCard";
import { openDewsburyBook } from "../data/dewsbury";

/**
 * Optional template sections, inspired by pharmappy.com's design suite and
 * switched on per brand through `templateSites[id].extras` (Dewsbury Moor):
 *  - BentoServicesTemplate: everyday services as a bento grid
 *  - ClosingCtaTemplate: one last "book or call" band before the footer
 * Colours come from the brand's --brand-* tokens, like the rest of the template.
 */

const bookPath = (brand: Brand, id: string) => `${brand.basePath}/book/${id}`;

// ── Bento services ─────────────────────────────────────────────────────────

function Tile({ t, brand }: { t: BentoTile; brand: Brand }) {
  const big = t.size === "lg";
  return (
    <RevealCard
      to={t.serviceId ? bookPath(brand, t.serviceId) : undefined}
      href={t.serviceId ? undefined : t.href}
      img={t.img}
      name={t.title}
      tag={t.tag}
      desc={t.desc}
      cta={t.cta}
      open={big}
      tall={big}
      className={big ? "col-span-2 lg:row-span-2 min-h-[20rem] sm:min-h-[24rem] lg:min-h-[540px]" : "min-h-[15rem] sm:min-h-[260px]"}
    />
  );
}

export function BentoServicesTemplate({ brand }: { brand: Brand }) {
  const tiles = templateSites[brand.id]?.extras?.bento;
  const heading = templateSites[brand.id]?.extras?.bentoHeading;
  if (!tiles?.length) return null;
  return (
    <section id={heading?.id ?? "private-services"} aria-labelledby="bento-title" className="relative py-20 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-4 lg:items-end mb-10">
          <h2 id="bento-title" className="font-display text-slate-900 text-[1.8rem] md:text-[2.4rem] leading-tight" style={{ fontWeight: 700 }}>
            {heading ? <>{heading.lead} <span className="text-brand-secondary">{heading.accent}</span></> : <>More ways we can <span className="text-brand-secondary">help you.</span></>}
          </h2>
          <p className="text-slate-600 text-[1rem] leading-relaxed lg:max-w-md lg:justify-self-end">{heading?.intro ?? "From your regular prescriptions to a quick check-up, it's all here on Heckmondwike Road."}</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {tiles.map((t) => <Tile key={t.title} t={t} brand={brand} />)}
        </div>
      </div>
    </section>
  );
}

// ── Closing booking band ───────────────────────────────────────────────────

export function ClosingCtaTemplate({ brand }: { brand: Brand }) {
  const cta = templateSites[brand.id]?.extras?.closingCta;
  if (!cta) return null;
  const branch = brand.locations[0];
  const weekday = branch.openingHours[0];
  return (
    <section aria-labelledby="closing-cta-title" className="pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-brand-darkest via-brand-dark to-brand-primary px-6 py-14 sm:px-12 sm:py-20">
          {cta.img && (
            <div aria-hidden="true" className="absolute inset-0 -z-10">
              <ImageWithFallback src={cta.img} alt="" className="w-full h-full object-cover object-[70%_35%]" />
              {/* Same forest shade as the page heroes: deep behind the words, lighter over the photo */}
              <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(2,32,28,0.94) 0%, rgba(2,32,28,0.82) 42%, rgba(2,32,28,0.45) 75%, rgba(2,32,28,0.35) 100%)" }} />
              <div className="absolute inset-0" style={{ background: "radial-gradient(40rem 22rem at 100% 100%, rgba(120,195,54,0.28), transparent 70%)" }} />
            </div>
          )}
          {!cta.img && <div aria-hidden="true" className="absolute -right-24 -top-24 w-[26rem] h-[26rem] rounded-full bg-brand-cta/25 blur-3xl" />}
          <div className="relative grid lg:grid-cols-[1.4fr_1fr] gap-8 lg:items-center">
            <div>
              <h2 id="closing-cta-title" className="font-display text-white text-[1.9rem] md:text-[2.5rem] leading-tight" style={{ fontWeight: 700 }}>{cta.title}</h2>
              <p className="text-white/80 text-[1.05rem] mt-3 max-w-xl">{cta.subtitle}</p>
              <p className="text-white/70 text-[0.92rem] mt-4 inline-flex items-center gap-2"><Clock width={16} height={16} className="text-brand-cta" /> {weekday.day}: {weekday.hours}</p>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:justify-self-end">
              <button type="button" onClick={() => openDewsburyBook()} aria-haspopup="dialog" className="dmp-btn dmp-btn--lg">Book an appointment</button>
              <a href={`tel:${branch.phone.replace(/\s/g, "")}`} className="dmp-btn dmp-btn--glass dmp-btn--lg">Call {branch.phone}</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
