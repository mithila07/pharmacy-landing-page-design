import { Link } from "react-router";
import { ArrowRight, Clock, ExternalLink, Mail, MapPin, Navigation, Phone, ShieldAlert } from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Reveal } from "../components/Reveal";
import type { Brand } from "../branding";
import { dayMatches, useOpenStatus } from "../openStatus";
import { publicEmail } from "../data/locations";
import { useSeo, JsonLd, pharmacyGraph } from "../seo";

const directionsUrl = (address: string) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
const mapsUrl = (address: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

/**
 * Meadows contact page: no enquiry form. People can call, email or walk in,
 * so the page leads with those actions and a full-width map.
 * (J Morris and Acre keep the shared ContactPageTemplate.)
 */
export function ContactPageMeadows({ brand }: { brand: Brand }) {
  const branch = brand.locations[0];
  const status = useOpenStatus(branch);
  const today = new Date().getDay();
  const tel = `tel:${branch.phone.replace(/\s/g, "")}`;
  const email = publicEmail(branch); // null when the pharmacy has asked to hide it

  useSeo({
    title: `Contact ${brand.name} | ${brand.seoArea}`,
    description: `Find ${brand.name} at ${branch.address}. Opening hours, phone${email ? ", email" : ""} and directions.`,
    path: `${brand.basePath}/contact`,
    favicon: brand.favicon,
  });

  const statusPill = (
    <span className="inline-flex items-center gap-2 rounded-full bg-white border border-slate-200 pl-2 pr-3.5 py-1.5 text-[0.85rem] shadow-sm">
      <span aria-hidden="true" className={`w-2.5 h-2.5 rounded-full ${status.open ? "bg-brand-secondary" : "bg-slate-400"}`} />
      <span className={status.open ? "text-brand-secondary" : "text-slate-600"} style={{ fontWeight: 700 }}>{status.label}</span>
      {status.detail && <span className="text-slate-500">{status.detail}</span>}
    </span>
  );

  return (
    <div className={`min-h-screen bg-white ${brand.themeClass}`}>
      <JsonLd data={pharmacyGraph(brand, [brand.seoArea ?? branch.shortName])} />
      <Header brand={brand} />

      <main>
        {/* Intro + quick actions */}
        <section className="bg-brand-light">
          <div className="max-w-7xl mx-auto px-4 pt-14 pb-12 md:pb-16 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-end">
            <Reveal className="min-w-0">
              <h1 className="font-display text-brand-primary text-[2.2rem] md:text-[3rem] leading-[1.05]" style={{ fontWeight: 700, letterSpacing: "-0.02em" }}>
                Come and see us on <span className="text-brand-secondary">Liverpool Road South</span>
              </h1>
              <p className="text-slate-600 text-[1.05rem] leading-relaxed mt-4 max-w-[52ch]">
                Pop in{email ? ", give us a call or send an email" : " or give us a call"}. Our team is happy to help with prescriptions, NHS services and private clinics.
              </p>
            </Reveal>

            <Reveal delay={0.08} className="min-w-0">
              <ul className="grid grid-cols-1 gap-3">
                <li>
                  <a href={tel} className="group flex items-center gap-4 rounded-2xl bg-white border border-slate-200 p-4 hover:border-brand-secondary hover:shadow-md transition-all no-underline">
                    <span className="w-12 h-12 rounded-xl bg-brand-secondary text-white flex items-center justify-center shrink-0"><Phone size={20} /></span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[0.8rem] text-slate-500" style={{ fontWeight: 500 }}>Call the pharmacy</span>
                      <span className="block text-[1.15rem] text-brand-primary" style={{ fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>{branch.phone}</span>
                    </span>
                    <ArrowRight size={18} className="text-slate-400 group-hover:text-brand-secondary group-hover:translate-x-1 transition-all" />
                  </a>
                </li>
                <li>
                  <a href={directionsUrl(branch.address)} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 rounded-2xl bg-white border border-slate-200 p-4 hover:border-brand-secondary hover:shadow-md transition-all no-underline">
                    <span className="w-12 h-12 rounded-xl bg-brand-primary text-white flex items-center justify-center shrink-0"><Navigation size={20} /></span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[0.8rem] text-slate-500" style={{ fontWeight: 500 }}>Get directions</span>
                      <span className="block text-[1rem] text-brand-primary truncate" style={{ fontWeight: 700 }}>{branch.address}</span>
                    </span>
                    <ArrowRight size={18} className="text-slate-400 group-hover:text-brand-secondary group-hover:translate-x-1 transition-all" />
                    <span className="sr-only">(opens Google Maps in a new tab)</span>
                  </a>
                </li>
                {email && (<li>
                  <a href={`mailto:${email}`} className="group flex items-center gap-4 rounded-2xl bg-white border border-slate-200 p-4 hover:border-brand-secondary hover:shadow-md transition-all no-underline">
                    <span className="w-12 h-12 rounded-xl bg-brand-alt text-white flex items-center justify-center shrink-0"><Mail size={20} /></span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[0.8rem] text-slate-500" style={{ fontWeight: 500 }}>Email us</span>
                      <span className="block text-[1rem] text-brand-primary break-all" style={{ fontWeight: 700 }}>{email}</span>
                    </span>
                    <ArrowRight size={18} className="text-slate-400 group-hover:text-brand-secondary group-hover:translate-x-1 transition-all" />
                  </a>
                </li>)}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* Full-width map with a floating "find us" card on the right, clear of Google's own place card (stacks under the map on mobile) */}
        <section aria-labelledby="meadows-find-us" className="relative">
          <div className="h-[360px] md:h-[560px] bg-slate-100">
            <iframe
              src={branch.googleMapsEmbedUrl}
              title={`Map showing ${brand.name}, ${branch.address}`}
              width="100%"
              height="100%"
              style={{ border: 0, display: "block" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="md:absolute md:inset-0 md:pointer-events-none">
            <div className="max-w-7xl mx-auto px-4 md:h-full flex md:items-center md:justify-end">
              <div className="relative -mt-14 md:mt-0 w-full md:w-[380px] md:pointer-events-auto rounded-3xl bg-white shadow-2xl border border-slate-100 p-6 sm:p-7">
                <h2 id="meadows-find-us" className="font-display text-[1.5rem] text-brand-primary leading-tight" style={{ fontWeight: 700 }}>Find us in {branch.shortName}</h2>
                <address className="not-italic text-slate-600 text-[0.98rem] leading-relaxed mt-2">{branch.address}</address>
                <div className="mt-6 grid grid-cols-2 gap-2.5">
                  <a href={directionsUrl(branch.address)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-brand-secondary text-white min-h-[48px] rounded-xl hover:brightness-110 transition-all no-underline text-[0.92rem]" style={{ fontWeight: 600 }}>
                    <Navigation size={16} /> Directions
                  </a>
                  <a href={tel} className="inline-flex items-center justify-center gap-2 border border-slate-200 text-brand-primary min-h-[48px] rounded-xl hover:border-brand-secondary transition-all no-underline text-[0.92rem]" style={{ fontWeight: 600 }}>
                    <Phone size={16} /> Call
                  </a>
                </div>
                <a href={mapsUrl(branch.address)} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-[0.85rem] text-slate-500 hover:text-brand-primary transition-colors">
                  Open in Google Maps <ExternalLink size={13} /><span className="sr-only"> (opens in a new tab)</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Hours + other details */}
        <section className="py-14 md:py-20">
          <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-12 gap-6 lg:gap-8">
            <Reveal className="lg:col-span-7">
              <div className="rounded-3xl border border-slate-200 p-6 sm:p-8 h-full">
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <h2 className="font-display text-[1.4rem] text-brand-primary" style={{ fontWeight: 700 }}>Opening hours</h2>
                  </div>
                  {statusPill}
                </div>
                <dl className="mt-6 grid gap-2">
                  {branch.openingHours.map((h) => {
                    const isToday = dayMatches(h.day, today);
                    return (
                      <div
                        key={h.day}
                        className={`flex items-center justify-between gap-6 rounded-xl px-4 py-3.5 ${isToday ? "bg-brand-light ring-1 ring-brand-secondary/30" : "bg-slate-50"}`}
                      >
                        <dt className="text-slate-700" style={{ fontWeight: isToday ? 700 : 500 }}>
                          {h.day}
                          {isToday && <span className="ml-2 text-[0.75rem] uppercase tracking-wide text-brand-secondary" style={{ fontWeight: 700 }}>Today</span>}
                        </dt>
                        <dd className={/closed/i.test(h.hours) ? "text-slate-400" : "text-brand-primary"} style={{ fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>{h.hours}</dd>
                      </div>
                    );
                  })}
                </dl>
                <p className="text-[0.85rem] text-slate-500 mt-4">Hours can change on bank holidays. If you're unsure, give us a call before you travel.</p>
              </div>
            </Reveal>

            <Reveal delay={0.08} className="lg:col-span-5">
              <div className="grid gap-4 h-full content-start">
                <div className="rounded-3xl bg-brand-primary text-white p-6 sm:p-8">
                  <h2 className="font-display text-[1.3rem]" style={{ fontWeight: 700 }}>Prefer to book online?</h2>
                  <p className="text-white/80 text-[0.95rem] leading-relaxed mt-2">See our NHS and private services and book a time that suits you. No need to call first.</p>
                  <Link to={`${brand.basePath}#private-services`} className="group mt-5 inline-flex items-center gap-2 bg-white text-brand-primary px-5 min-h-[48px] rounded-xl no-underline hover:bg-brand-light transition-colors" style={{ fontWeight: 600 }}>
                    View services <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
                <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6 flex items-start gap-3.5">
                  <span className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0"><ShieldAlert size={20} className="text-amber-700" /></span>
                  <div>
                    <p className="text-[0.95rem] text-amber-900" style={{ fontWeight: 700 }}>Need urgent medical help?</p>
                    <p className="text-[0.88rem] text-amber-900/80 leading-relaxed mt-1">
                      For urgent medical advice, call <a href="tel:111" className="underline" style={{ fontWeight: 600 }}>NHS 111</a>, or <a href="tel:999" className="underline" style={{ fontWeight: 600 }}>999</a> in an emergency.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer brand={brand} />
    </div>
  );
}
