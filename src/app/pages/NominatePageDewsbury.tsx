import { useEffect } from "react";
import { OpenNewWindow, Phone } from "iconoir-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { NominationForm } from "../components/nomination/NominationForm";
import { PageHeroDewsbury } from "../components/dewsbury/PageHeroDewsbury";
import { dewsburyBrand } from "../branding";
import { templateSites } from "../data/templateSites";
import { useSeo } from "../seo";
import heroPhoto from "../../assets/hero-bg.jpeg";

const STEPS = [
  { title: "Fill in the form", body: "Tell us who the prescriptions are for and which GP surgery you use." },
  { title: "We set it up", body: "We record Dewsbury Moor Pharmacy as your nominated pharmacy on the NHS system." },
  { title: "Collect from us", body: "Your GP sends your prescriptions straight to us, ready for you." },
];

const QUESTIONS = [
  { q: "Does it cost anything?", a: "No. Choosing a pharmacy is free. You'll pay the usual prescription charge unless you're exempt." },
  { q: "Can I change my mind later?", a: "Yes. You can change your nominated pharmacy at any time, in the NHS App or by asking any pharmacy." },
  { q: "Can I do this for someone else?", a: "Yes, with their permission. The form lets you nominate us on behalf of a family member or someone you care for." },
];

/** Repeat-prescription nomination: full-width photo opening, then the form on a soft wash. */
export default function NominatePageDewsbury() {
  const brand = dewsburyBrand;
  const branch = brand.locations[0];

  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, []);
  useSeo({
    title: "Nominate Dewsbury Moor Pharmacy for your repeat prescriptions",
    description: "Choose Dewsbury Moor Pharmacy as your nominated pharmacy and your GP will send your repeat prescriptions straight to us on Heckmondwike Road, Dewsbury.",
    path: `${brand.basePath}/nominate`,
    favicon: brand.favicon,
  });

  return (
    <div className={`min-h-screen bg-white ${brand.themeClass}`}>
      <Header brand={brand} />

      <main id="main-content">
        <PageHeroDewsbury
          labelId="dmp-nominate-title"
          img={heroPhoto}
          title1="Get your repeat prescriptions"
          title2="from Dewsbury Moor."
          intro="Choose us as your nominated pharmacy and your GP will send your prescriptions straight to us. No paper slips, and no trips to the surgery."
          actions={<>
            <a href="#nominate-form" className="dmp-btn dmp-btn--lg">Nominate us now</a>
            <a href="https://www.nhs.uk/nhs-app/nhs-app-help-and-support/prescriptions-in-the-nhs-app/" target="_blank" rel="noopener noreferrer" className="dmp-btn dmp-btn--glass dmp-btn--lg">Use the NHS App instead</a>
          </>}
          aside={
            <ol className="grid gap-3">
              {STEPS.map((s, i) => (
                <li key={s.title} className="dmp-glass flex gap-4 p-4">
                  <span className="w-10 h-10 rounded-full bg-brand-cta text-brand-darkest grid place-items-center font-display text-[1.05rem] shrink-0" style={{ fontWeight: 700 }} aria-hidden="true">{i + 1}</span>
                  <div>
                    <h2 className="text-[1.02rem]" style={{ fontWeight: 600 }}>{s.title}</h2>
                    <p className="text-white/75 text-[0.9rem] mt-0.5 leading-relaxed">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          }
        />

        <div className="dmp-wash">
          <section id="nominate-form" className="py-20 lg:py-24 scroll-mt-20">
            <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-[1.35fr_0.65fr] gap-8 items-start">
              <div className="dmp-form dmp-glass-light p-6 sm:p-10">
                <h2 className="font-display text-slate-900 text-[1.9rem] lg:text-[2.2rem] leading-tight mb-2" style={{ fontWeight: 700 }}>Nominate Dewsbury Moor Pharmacy</h2>
                <p className="text-slate-600 mb-8">We'll use these details only to set up your nomination.</p>
                <NominationForm brand={brand} endpoint={templateSites.dewsbury.forms?.endpoint} />
              </div>

              <aside className="lg:sticky lg:top-24 grid gap-5">
                <div className="dmp-glass-light p-7">
                  <h2 className="font-display text-slate-900 text-[1.4rem]" style={{ fontWeight: 700 }}>Questions?</h2>
                  <p className="text-slate-600 mt-2 leading-relaxed">Our team can set up your nomination over the phone or at the counter.</p>
                  <a href={`tel:${branch.phone.replace(/\s/g, "")}`} className="mt-4 inline-flex items-center gap-2 text-brand-primary text-[1.15rem] min-h-[44px]" style={{ fontWeight: 700 }}>
                    <Phone width={20} height={20} className="text-brand-secondary" /> {branch.phone}
                  </a>
                </div>
                <div className="dmp-glass-light p-7">
                  <h2 className="text-slate-900 text-[1.1rem]" style={{ fontWeight: 700 }}>Good to know</h2>
                  <dl className="mt-4 grid gap-5">
                    {QUESTIONS.map((x) => (
                      <div key={x.q}>
                        <dt className="text-slate-900" style={{ fontWeight: 600 }}>{x.q}</dt>
                        <dd className="text-slate-600 mt-1 text-[0.95rem] leading-relaxed">{x.a}</dd>
                      </div>
                    ))}
                  </dl>
                  <a href="https://www.nhs.uk/nhs-services/prescriptions/" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-1.5 min-h-[44px] text-brand-primary underline underline-offset-4" style={{ fontWeight: 600 }}>
                    NHS prescriptions guide <OpenNewWindow width={15} height={15} />
                  </a>
                </div>
              </aside>
            </div>
          </section>
        </div>
      </main>

      <Footer brand={brand} />
    </div>
  );
}
