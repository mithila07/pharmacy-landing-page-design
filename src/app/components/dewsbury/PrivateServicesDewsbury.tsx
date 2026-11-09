import { Link } from "react-router";
import { Airplane, Calendar, Check, NavArrowRight, Suitcase } from "iconoir-react";
import { dewsburyBrand } from "../../branding";
import { DMP_FEATURED_PRIVATE, DMP_IMG, DMP_OTHER_PRIVATE, DMP_PRIVATE_NOTE, DMP_TRAVEL, DMP_TRAVEL_IMG, dmpPrice } from "../../data/dewsbury";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { RevealCard } from "./RevealCard";

const book = (id: string) => `${dewsburyBrand.basePath}/book/${id}`;

const H2 = "font-display text-slate-900 text-[1.9rem] md:text-[2.5rem] leading-tight";

/** Weight loss and ear wax removal, as two large photo cards with glass detail panels. */
function FeaturedPrivate() {
  return (
    <section id="private-services" aria-labelledby="dmp-private-title" className="py-20 lg:py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-4 lg:items-end mb-10">
          <h2 id="dmp-private-title" className={H2} style={{ fontWeight: 700 }}>
            Private clinics, <span className="text-brand-secondary">booked around you.</span>
          </h2>
          <p className="text-slate-600 text-[1.02rem] leading-relaxed lg:max-w-md lg:justify-self-end">Our two most popular private services, in our consultation room at a time that suits you.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {DMP_FEATURED_PRIVATE.map((s) => (
            <article key={s.id} className="group relative isolate overflow-hidden rounded-[2rem] min-h-[30rem] sm:min-h-[34rem] flex items-end p-3 sm:p-5">
              <ImageWithFallback src={s.img} alt="" className="absolute inset-0 -z-10 w-full h-full object-cover transition-transform duration-[1200ms] ease-[var(--dmp-ease)] group-hover:scale-[1.025]" style={{ objectPosition: s.pos }} />
              <div className="dmp-glass-forest w-full p-6 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-white text-[1.7rem] sm:text-[1.9rem] leading-tight" style={{ fontWeight: 700 }}>{s.name}</h3>
                  <span className="shrink-0 rounded-full bg-brand-cta text-brand-darkest px-3.5 py-1.5 text-[0.88rem]" style={{ fontWeight: 700 }}>{dmpPrice(s.id)}</span>
                </div>
                <p className="text-white/85 mt-2 leading-relaxed">{s.summary}</p>
                <ul className="mt-4 grid sm:grid-cols-2 gap-2">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-white/85 text-[0.92rem]"><Check width={16} height={16} className="text-brand-cta shrink-0" /> {p}</li>
                  ))}
                </ul>
                <Link to={book(s.id)} className="dmp-btn mt-5">Book {s.name.toLowerCase()}</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Travel clinic: a photo banner with the booking action, then the vaccines as tiles. */
function TravelClinic() {
  return (
    <section id="travel-clinic" aria-labelledby="dmp-travel-title" className="pb-20 lg:pb-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative isolate overflow-hidden rounded-[2rem] min-h-[24rem] lg:min-h-[26rem] flex items-end">
          <ImageWithFallback src={DMP_TRAVEL_IMG} alt="" className="absolute inset-0 -z-10 w-full h-full object-cover object-right" />
          <div className="w-full grid lg:grid-cols-[1.3fr_1fr] gap-5 lg:gap-8 items-end p-4 sm:p-8 lg:p-10">
            <div className="dmp-glass-forest p-6 sm:p-8">
              <h2 id="dmp-travel-title" className="font-display text-white text-[2rem] md:text-[2.6rem] leading-tight" style={{ fontWeight: 700 }}>
                Going abroad? <span className="text-brand-cta">Travel with peace of mind.</span>
              </h2>
              <p className="text-white/85 text-[1.05rem] leading-relaxed mt-4 max-w-xl">Tell us where you're going and we'll plan the vaccines and medicines you need, all in one place.</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link to={book("prv-travel-consult")} className="dmp-btn dmp-btn--lg">Book a travel appointment</Link>
              </div>
            </div>
            <div className="dmp-glass-forest p-5 lg:justify-self-end w-full lg:max-w-sm">
              <ul className="grid gap-3 text-white/90 text-[0.95rem]">
                <li className="flex gap-3"><Calendar width={20} height={20} className="text-brand-cta shrink-0" /> Book six to eight weeks before you travel</li>
                <li className="flex gap-3"><Suitcase width={20} height={20} className="text-brand-cta shrink-0" /> Bring your trip dates and vaccine history</li>
                <li className="flex gap-3"><Airplane width={20} height={20} className="text-brand-cta shrink-0" /> Consultation {dmpPrice("prv-travel-consult").toLowerCase()}</li>
              </ul>
            </div>
          </div>
        </div>

        <h3 className="sr-only">Travel vaccines and medicines</h3>
        <ul className="mt-6 grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          {DMP_TRAVEL.map((t) => (
            <li key={t.id}>
              <RevealCard to={book(t.id)} img={DMP_IMG[t.id]} name={t.name} tag={dmpPrice(t.id)} desc={t.line} cta="Book now" className="h-full min-h-[14rem] sm:min-h-[17rem]" />
            </li>
          ))}
        </ul>
        <p className="mt-6 text-slate-500 text-[0.92rem] max-w-3xl">Which vaccines you need depends on your destination, what you'll be doing and your vaccination history. Some are given as a course over several weeks. All travel vaccines are subject to a consultation.</p>
      </div>
    </section>
  );
}

/** Everything else, grouped into three glass panels. */
function OtherPrivate() {
  return (
    <section id="other-private" aria-labelledby="dmp-other-title" className="pb-20 lg:pb-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-4 lg:items-end mb-10">
          <h2 id="dmp-other-title" className={H2} style={{ fontWeight: 700 }}>
            And plenty more <span className="text-brand-secondary">we can help with.</span>
          </h2>
          <p className="text-slate-600 text-[1.02rem] leading-relaxed lg:max-w-md lg:justify-self-end">Vaccinations, quick treatments and confidential help, without waiting for a GP.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-5 items-start">
          {DMP_OTHER_PRIVATE.map((g) => (
            <section key={g.title} aria-label={g.title} className="dmp-glass-light p-6 sm:p-7">
              <h3 className="font-display text-slate-900 text-[1.35rem]" style={{ fontWeight: 700 }}>{g.title}</h3>
              <p className="text-slate-500 text-[0.92rem] mt-1">{g.intro}</p>
              <ul className="mt-4 grid gap-2">
                {g.items.map((it) => {
                  const body = (
                    <>
                      <ImageWithFallback src={DMP_IMG[it.id]} alt="" className="w-14 h-14 rounded-2xl object-cover shrink-0" />
                      <span className="min-w-0 flex-1">
                        <span className="block text-slate-900 leading-snug transition-colors duration-300 ease-[var(--dmp-ease)] group-hover:text-brand-primary" style={{ fontWeight: 600 }}>{it.name}</span>
                        <span className="block text-slate-500 text-[0.86rem] leading-snug mt-0.5">{it.line}</span>
                        <span className="block text-slate-500 text-[0.82rem] mt-1">{it.access === "book" ? dmpPrice(it.id) : "No appointment needed"}</span>
                      </span>
                    </>
                  );
                  return (
                    <li key={it.id}>
                      {it.access === "book" ? (
                        <Link
                          to={book(it.id)}
                          aria-label={`Book ${it.name}, ${dmpPrice(it.id)}`}
                          className="group flex items-center gap-4 rounded-2xl p-2.5 pr-3 no-underline ring-1 ring-transparent transition-[background-color,box-shadow,transform] duration-500 ease-[var(--dmp-ease)] hover:bg-white hover:ring-brand-secondary/40 hover:shadow-[0_14px_30px_-18px_rgba(31,77,28,0.55)] hover:-translate-y-px focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-brand-secondary"
                        >
                          {body}
                          <span className="shrink-0 inline-flex items-center gap-1 rounded-full bg-brand-light text-brand-primary px-3 py-1.5 text-[0.82rem] transition-colors duration-300 ease-[var(--dmp-ease)] group-hover:bg-brand-secondary group-hover:text-white" style={{ fontWeight: 600 }}>
                            Book <NavArrowRight width={14} height={14} className="transition-transform duration-500 ease-[var(--dmp-ease)] group-hover:translate-x-0.5" />
                          </span>
                        </Link>
                      ) : (
                        <div className="flex items-center gap-4 rounded-2xl p-2.5 pr-3 bg-white/50 border border-dashed border-slate-300">
                          {body}
                          <span className="shrink-0 rounded-full bg-white text-brand-primary px-3 py-1.5 text-[0.82rem] ring-1 ring-slate-200" style={{ fontWeight: 600 }}>Walk in</span>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
        <p className="mt-6 text-slate-500 text-[0.92rem]">{DMP_PRIVATE_NOTE}</p>
      </div>
    </section>
  );
}

/** Dewsbury Moor's private range: headline clinics, the travel clinic, then everything else. */
export function PrivateServicesDewsbury() {
  return (
    <div className="dmp-wash">
      <FeaturedPrivate />
      <TravelClinic />
      <OtherPrivate />
    </div>
  );
}
