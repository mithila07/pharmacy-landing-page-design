import { useEffect } from "react";
import { Clock, Mail, MapPin, Phone, WarningCircle } from "iconoir-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { EnquiryForm } from "../components/nomination/EnquiryForm";
import { PageHeroDewsbury } from "../components/dewsbury/PageHeroDewsbury";
import { dewsburyBrand } from "../branding";
import { templateSites } from "../data/templateSites";
import { useOpenStatus } from "../openStatus";
import { useSeo, JsonLd, pharmacyGraph } from "../seo";
import heroPhoto from "../../assets/about-bg.jpeg";

/** Dewsbury Moor Contact page: full-width photo opening, then glass cards on a soft wash. */
export default function ContactPageDewsbury() {
  const brand = dewsburyBrand;
  const branch = brand.locations[0];
  const status = useOpenStatus(branch);
  const tel = `tel:${branch.phone.replace(/\s/g, "")}`;
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(branch.address)}`;
  // Rows are "Monday - Friday", "Saturday", "Sunday"
  const day = new Date().getDay();
  const todayRow = day === 0 ? 2 : day === 6 ? 1 : 0;

  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, []);
  useSeo({
    title: "Contact Dewsbury Moor Pharmacy | 01924 502828",
    description: "Call, email or visit Dewsbury Moor Pharmacy at 119 Heckmondwike Road, Dewsbury WF13 3NT. Open Monday to Friday, 9am to 6pm.",
    path: `${brand.basePath}/contact`,
    favicon: brand.favicon,
  });

  const ways = [
    { icon: Phone, title: "Call us", line: branch.phone, href: tel },
    { icon: Mail, title: "Email us", line: branch.email, href: `mailto:${branch.email}` },
    { icon: MapPin, title: "Visit us", line: "119 Heckmondwike Road, WF13 3NT", href: directions, external: true },
  ];

  return (
    <div className={`min-h-screen bg-white ${brand.themeClass}`}>
      <JsonLd data={pharmacyGraph(brand, ["Dewsbury", "Dewsbury Moor", "West Yorkshire"])} />
      <Header brand={brand} />

      <main id="main-content">
        <PageHeroDewsbury
          labelId="dmp-contact-title"
          img={heroPhoto}
          title1="Get in touch,"
          title2="we're happy to help."
          intro="Call, email or pop in. For anything about your medicines, the quickest way is to give us a ring."
          actions={<>
            <a href={tel} className="dmp-btn dmp-btn--lg">Call {branch.phone}</a>
            <a href={directions} target="_blank" rel="noopener noreferrer" className="dmp-btn dmp-btn--glass dmp-btn--lg">Get directions</a>
          </>}
          aside={
            <ul className="grid gap-3">
              {ways.map(({ icon: Icon, title, line, href, external }) => (
                <li key={title}>
                  <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="dmp-glass group flex items-center gap-4 p-4 hover:bg-white/15 transition-colors">
                    <span className="w-11 h-11 rounded-2xl bg-brand-cta text-brand-darkest grid place-items-center shrink-0"><Icon width={22} height={22} /></span>
                    <span className="min-w-0">
                      <span className="block text-white/70 text-[0.85rem]">{title}</span>
                      <span className="block text-[1.02rem] break-words group-hover:underline underline-offset-4" style={{ fontWeight: 600 }}>{line}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          }
        />

        <div className="dmp-wash">
          {/* Opening hours and map */}
          <section className="pt-20 lg:pt-24 pb-14">
            <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-[0.9fr_1.1fr] gap-8 items-stretch">
              <div className="dmp-glass-light p-7 sm:p-9">
                <h2 className="font-display text-slate-900 text-[2rem] lg:text-[2.4rem] leading-tight" style={{ fontWeight: 700 }}>Opening hours</h2>
                <p className="mt-3 inline-flex items-center gap-2 text-[0.98rem]">
                  <Clock width={18} height={18} className="text-brand-secondary" />
                  <span className={status.open ? "text-brand-secondary" : "text-amber-700"} style={{ fontWeight: 700 }}>{status.label}</span>
                  {status.detail && <span className="text-slate-600">{status.detail}</span>}
                </p>
                <ul className="mt-6 divide-y divide-slate-200/80 border-y border-slate-200/80">
                  {branch.openingHours.map((h, i) => (
                    <li key={h.day} aria-current={i === todayRow ? "date" : undefined} className={`flex justify-between gap-4 py-4 text-[1.02rem] ${i === todayRow ? "text-slate-900" : "text-slate-700"}`}>
                      <span style={{ fontWeight: i === todayRow ? 700 : 500 }}>{h.day}{i === todayRow ? " (today)" : ""}</span>
                      <span style={{ fontWeight: i === todayRow ? 700 : 500 }}>{h.hours}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-slate-500 text-[0.92rem] mt-4">Bank holiday hours may differ. Please call ahead.</p>
              </div>
              <div className="dmp-glass-light p-2 min-h-[24rem]">
                <iframe title="Map showing Dewsbury Moor Pharmacy on Heckmondwike Road" src={branch.googleMapsEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="w-full h-full min-h-[24rem] border-0 rounded-[1.4rem]" />
              </div>
            </div>
          </section>

          {/* Message form */}
          <section className="pb-20 lg:pb-28">
            <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-[0.8fr_1.2fr] gap-8 items-start">
              <div className="lg:pt-4">
                <h2 className="font-display text-slate-900 text-[2rem] lg:text-[2.5rem] leading-tight" style={{ fontWeight: 700 }}>Send us a message</h2>
                <p className="text-slate-600 text-[1.05rem] leading-relaxed mt-4">Questions about a service, a booking or your prescriptions. We'll reply by email within two working days.</p>
                <p className="dmp-glass-light mt-6 flex gap-3 p-5 text-slate-700 text-[0.95rem]">
                  <WarningCircle width={22} height={22} className="text-amber-600 shrink-0" />
                  <span>Please don't use this form for medical advice. Call us, or NHS 111. In an emergency, call 999.</span>
                </p>
              </div>
              <div className="dmp-form dmp-glass-light p-6 sm:p-9">
                <EnquiryForm brand={brand} endpoint={templateSites.dewsbury.forms?.endpoint} />
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer brand={brand} />
    </div>
  );
}
