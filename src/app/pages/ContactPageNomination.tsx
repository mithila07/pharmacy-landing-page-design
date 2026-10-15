import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { useLocation } from "react-router";
import { Clock, FileText, Mail, MapPin, MessageCircle, Navigation, Phone, ShieldCheck } from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import type { Brand } from "../branding";
import { publicEmail } from "../data/locations";
import { templateSites } from "../data/templateSites";
import { dayMatches, useOpenStatus } from "../openStatus";
import { useSeo, JsonLd, pharmacyGraph } from "../seo";
import { NominationForm } from "../components/nomination/NominationForm";
import { EnquiryForm } from "../components/nomination/EnquiryForm";

type Tab = "nominate" | "enquiry";
const TABS: { id: Tab; title: string; body: string; icon: typeof FileText }[] = [
  { id: "nominate", title: "Nominate us for your prescriptions", body: "Have your GP send repeat prescriptions to us.", icon: FileText },
  { id: "enquiry", title: "Ask a question", body: "About a service, an order or anything else.", icon: MessageCircle },
];

const directionsUrl = (address: string) => `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;

/**
 * Contact page for template sites that take nominations (J Morris).
 * Two jobs, chosen up front: nominate the pharmacy, or ask a question.
 * #nominate and #enquiry deep-link to each form.
 */
export function ContactPageNomination({ brand }: { brand: Brand }) {
  const branch = brand.locations[0];
  const short = brand.name.replace(" Pharmacy", "");
  const endpoint = templateSites[brand.id]?.forms?.endpoint;
  const email = publicEmail(branch);
  const status = useOpenStatus(branch);
  const today = new Date().getDay();
  const tel = `tel:${branch.phone.replace(/\s/g, "")}`;
  const { hash } = useLocation();
  const [tab, setTab] = useState<Tab>(hash === "#enquiry" ? "enquiry" : "nominate");
  const tabRefs = useRef<Record<Tab, HTMLButtonElement | null>>({ nominate: null, enquiry: null });

  useEffect(() => { if (hash === "#enquiry" || hash === "#nominate") setTab(hash.slice(1) as Tab); }, [hash]);

  useSeo({
    title: `Contact ${brand.name} | Nominate us for repeat prescriptions | ${brand.seoArea}`,
    description: `Nominate ${brand.name} in ${brand.seoArea} for your NHS repeat prescriptions, or send us a question. Opening hours, phone and directions.`,
    path: `${brand.basePath}/contact`,
    favicon: brand.favicon,
  });

  const choose = (t: Tab) => {
    setTab(t);
    window.history.replaceState(window.history.state, "", `#${t}`);
  };
  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft" && e.key !== "Home" && e.key !== "End") return;
    e.preventDefault();
    const i = TABS.findIndex((t) => t.id === tab);
    const next = e.key === "Home" ? 0 : e.key === "End" ? TABS.length - 1 : (i + (e.key === "ArrowRight" ? 1 : -1) + TABS.length) % TABS.length;
    choose(TABS[next].id);
    tabRefs.current[TABS[next].id]?.focus();
  };

  return (
    <div className={`min-h-screen bg-white ${brand.themeClass}`}>
      <JsonLd data={pharmacyGraph(brand, [brand.seoArea ?? branch.shortName])} />
      <Header brand={brand} />

      <main>
        {/* Choose a job */}
        <section className="relative overflow-hidden bg-brand-light">
          <div aria-hidden="true" className="absolute -top-32 -right-24 w-[34rem] h-[34rem] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--brand-accent)_22%,transparent),transparent)]" />
          <div className="relative max-w-7xl mx-auto px-4 pt-14 pb-10 md:pt-20 md:pb-14">
            <h1 className="font-display text-brand-primary text-[2.4rem] md:text-[3.4rem] leading-[1.04] [text-wrap:balance]" style={{ fontWeight: 800, letterSpacing: "-0.025em" }}>
              How can we help?
            </h1>
            <p className="mt-4 text-slate-600 text-[1.08rem] leading-relaxed max-w-[56ch]">
              Make {short} your nominated pharmacy, or send the team a question. For anything urgent, call us on{" "}
              <a href={tel} className="text-brand-primary underline underline-offset-4" style={{ fontWeight: 700 }}>{branch.phone}</a>.
            </p>

            <div role="tablist" aria-label="What would you like to do?" className="mt-9 grid sm:grid-cols-2 gap-3 max-w-4xl">
              {TABS.map((t) => {
                const on = tab === t.id;
                return (
                  <button
                    key={t.id}
                    ref={(el) => { tabRefs.current[t.id] = el; }}
                    id={`tab-${t.id}`}
                    role="tab"
                    type="button"
                    aria-selected={on}
                    aria-controls={`panel-${t.id}`}
                    tabIndex={on ? 0 : -1}
                    onClick={() => choose(t.id)}
                    onKeyDown={onTabKey}
                    className={`group relative text-left flex items-start gap-4 rounded-2xl p-5 sm:p-6 border-2 cursor-pointer ${on ? "bg-white border-brand-secondary shadow-[0_18px_40px_-24px_rgba(8,51,68,0.45)]" : "bg-white/55 border-transparent hover:bg-white/85 hover:border-slate-200"}`}
                  >
                    <span className={`w-12 h-12 shrink-0 rounded-xl grid place-items-center ${on ? "bg-brand-secondary text-white" : "bg-white text-brand-primary ring-1 ring-slate-200"}`}>
                      <t.icon size={22} strokeWidth={1.9} aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[1.08rem] text-brand-primary leading-snug" style={{ fontWeight: 800 }}>{t.title}</span>
                      <span className="block text-[0.92rem] text-slate-600 mt-1">{t.body}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* The chosen form, with guidance beside it (desktop) or after it (mobile, so the form comes first) */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <aside className="order-2 lg:order-1 lg:col-span-4 lg:sticky lg:top-28 grid gap-6 min-w-0" aria-label={tab === "nominate" ? "About nomination" : "Other ways to reach us"}>
              {tab === "nominate" ? (
                <div className="grid gap-6">
                  <div>
                    <h2 className="text-[1.2rem] text-brand-primary" style={{ fontWeight: 800 }}>What we check</h2>
                    <p className="mt-2 text-[0.95rem] text-slate-600 leading-relaxed">
                      We find the patient's record on the NHS Personal Demographics Service (PDS) using just these details. Their address, GP practice and contact details come from the record, so you don't need to enter them.
                    </p>
                    <ul className="mt-4 grid gap-2.5">
                      {["First and last name", "Date of birth", "Sex at birth", "Postcode"].map((t) => (
                        <li key={t} className="flex items-start gap-2.5 text-[0.95rem] text-slate-700">
                          <ShieldCheck size={18} strokeWidth={1.9} className="text-brand-secondary mt-0.5 shrink-0" aria-hidden="true" /> {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-[0.88rem] text-slate-500 leading-relaxed border-t border-slate-200 pt-5">
                    Prefer to do it yourself? You can also choose {short} as your nominated pharmacy in the NHS App, or ask at the counter.
                  </p>
                </div>
              ) : (
                <div className="grid gap-6">
                  <div className="rounded-3xl bg-brand-light p-6">
                    <h2 className="text-[1.2rem] text-brand-primary" style={{ fontWeight: 800 }}>Quicker by phone</h2>
                    <a href={tel} className="mt-3 flex items-center gap-2.5 text-[1.3rem] text-brand-primary no-underline hover:underline tabular-nums" style={{ fontWeight: 800 }}>
                      <Phone size={20} aria-hidden="true" /> {branch.phone}
                    </a>
                    <p className="mt-2 text-[0.92rem] text-slate-600">
                      <span className={status.open ? "text-brand-secondary" : "text-slate-700"} style={{ fontWeight: 700 }}>{status.label}</span>
                      {status.detail ? `. ${status.detail}` : ""}
                    </p>
                  </div>
                  <div>
                    <h2 className="text-[1.2rem] text-brand-primary" style={{ fontWeight: 800 }}>Need medical advice?</h2>
                    <p className="mt-2 text-[0.95rem] text-slate-600 leading-relaxed">
                      We can't give medical advice through this form. Call us or NHS{" "}
                      <a href="tel:111" className="text-brand-primary underline underline-offset-4" style={{ fontWeight: 700 }}>111</a>, or{" "}
                      <a href="tel:999" className="text-brand-primary underline underline-offset-4" style={{ fontWeight: 700 }}>999</a> in an emergency.
                    </p>
                  </div>
                </div>
              )}
            </aside>

            <div className="order-1 lg:order-2 lg:col-span-8 min-w-0">
              <div
                id={`panel-${tab}`}
                role="tabpanel"
                aria-labelledby={`tab-${tab}`}
                key={tab}
                className="rounded-[28px] bg-white ring-1 ring-slate-200 shadow-[0_30px_60px_-40px_rgba(8,51,68,0.35)] p-6 sm:p-10"
              >
                <h2 className="text-[1.65rem] text-brand-primary leading-tight" style={{ fontWeight: 800, letterSpacing: "-0.02em" }}>
                  {tab === "nominate" ? `Nominate ${short} for your prescriptions` : "Send us a question"}
                </h2>
                <p className="mt-2 mb-8 text-slate-600 text-[0.98rem]">
                  {tab === "nominate"
                    ? "It takes about a minute. We'll confirm once your nomination is set."
                    : "We usually reply within one working day."}
                </p>
                {tab === "nominate" ? <NominationForm brand={brand} endpoint={endpoint} /> : <EnquiryForm brand={brand} endpoint={endpoint} />}
              </div>
            </div>
          </div>
        </section>

        {/* Visit us */}
        <section aria-labelledby="visit-title" className="pb-16 md:pb-24">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-[0.9fr_1.1fr] rounded-[28px] overflow-hidden ring-1 ring-slate-200">
              <div className="p-7 sm:p-10 bg-slate-50">
                <h2 id="visit-title" className="text-[1.65rem] text-brand-primary" style={{ fontWeight: 800, letterSpacing: "-0.02em" }}>Visit us on {branch.address.split(",")[0].replace(/^\d+[-\d]*\s*/, "")}</h2>
                <ul className="mt-6 grid gap-4 text-[0.98rem] text-slate-700">
                  <li className="flex items-start gap-3"><MapPin size={20} className="text-brand-secondary mt-0.5 shrink-0" aria-hidden="true" /> <span>{branch.address}</span></li>
                  <li className="flex items-center gap-3"><Phone size={20} className="text-brand-secondary shrink-0" aria-hidden="true" /> <a href={tel} className="text-brand-primary no-underline hover:underline tabular-nums" style={{ fontWeight: 700 }}>{branch.phone}</a></li>
                  {email && <li className="flex items-center gap-3 min-w-0"><Mail size={20} className="text-brand-secondary shrink-0" aria-hidden="true" /> <a href={`mailto:${email}`} className="text-brand-primary no-underline hover:underline break-all" style={{ fontWeight: 700 }}>{email}</a></li>}
                </ul>
                <div className="mt-7">
                  <p className="flex items-center gap-2 text-[0.95rem] text-slate-900" style={{ fontWeight: 800 }}>
                    <Clock size={18} className="text-brand-secondary" aria-hidden="true" /> Opening hours
                  </p>
                  <dl className="mt-3 grid gap-1.5">
                    {branch.openingHours.map((h) => {
                      const isToday = dayMatches(h.day, today);
                      return (
                        <div key={h.day} className={`flex justify-between gap-6 rounded-lg px-3 py-2 text-[0.95rem] ${isToday ? "bg-white ring-1 ring-brand-secondary/30" : ""}`}>
                          <dt className="text-slate-600" style={{ fontWeight: isToday ? 700 : 500 }}>{h.day}{isToday && <span className="sr-only"> (today)</span>}</dt>
                          <dd className={/closed/i.test(h.hours) ? "text-slate-400" : "text-slate-900 tabular-nums"} style={{ fontWeight: 600 }}>{h.hours}</dd>
                        </div>
                      );
                    })}
                  </dl>
                </div>
                <a href={directionsUrl(branch.address)} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center justify-center gap-2 min-h-[48px] px-7 rounded-xl bg-brand-primary text-white no-underline hover:bg-brand-primary-hover" style={{ fontWeight: 700 }}>
                  <Navigation size={17} aria-hidden="true" /> Get directions<span className="sr-only"> (opens Google Maps in a new tab)</span>
                </a>
              </div>
              <div className="min-h-[320px] bg-slate-100">
                <iframe src={branch.googleMapsEmbedUrl} title={`Map showing ${brand.name}, ${branch.address}`} width="100%" height="100%" style={{ border: 0, display: "block", minHeight: 320 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer brand={brand} />
    </div>
  );
}
