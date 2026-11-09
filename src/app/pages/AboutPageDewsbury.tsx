import { useEffect } from "react";
import { ChatBubble, CheckCircle, Community, HomeSimpleDoor, OpenNewWindow } from "iconoir-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Reveal } from "../components/Reveal";
import { PageHeroDewsbury } from "../components/dewsbury/PageHeroDewsbury";
import { dewsburyBrand } from "../branding";
import { templateSites } from "../data/templateSites";
import { DMP_LEGAL } from "../data/dewsbury";
import { useSeo, JsonLd, pharmacyGraph } from "../seo";
import heroPhoto from "../../assets/about-hero.jpeg";

const PROMISES = [
  { icon: ChatBubble, title: "Time to talk", body: "We're never too busy to listen. Ask about your medicines, a symptom or a test result, and we'll explain it clearly." },
  { icon: HomeSimpleDoor, title: "A private room", body: "If you'd rather not talk at the counter, just say. Our consultation room is free whenever you need it." },
  { icon: CheckCircle, title: "Straight answers", body: "If something isn't right for you, we'll tell you why, and point you to the right place instead." },
  { icon: Community, title: "Part of the neighbourhood", body: "We look after families across Dewsbury Moor, and we get to know the people who come through our door." },
];

const isTbc = (v: string) => v.includes("[REPLACE");

/** Dewsbury Moor About page: full-width photo opening, then glass cards on a soft wash. */
export default function AboutPageDewsbury() {
  const brand = dewsburyBrand;
  const branch = brand.locations[0];
  const about = templateSites.dewsbury.about;

  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, []);
  useSeo({
    title: "About Dewsbury Moor Pharmacy | Heckmondwike Road, Dewsbury",
    description: "Dewsbury Moor Pharmacy is an independent community pharmacy on Heckmondwike Road, Dewsbury. NHS prescriptions, Pharmacy First, flu jabs and friendly advice.",
    path: `${brand.basePath}/about`,
    favicon: brand.favicon,
  });

  return (
    <div className={`min-h-screen bg-white ${brand.themeClass}`}>
      <JsonLd data={pharmacyGraph(brand, ["Dewsbury", "Dewsbury Moor", "West Yorkshire"])} />
      <Header brand={brand} />

      <main id="main-content">
        <PageHeroDewsbury
          labelId="dmp-about-title"
          img={heroPhoto}
          title1="A pharmacy that"
          title2="knows Dewsbury Moor."
          intro={about.subtitle}
        />

        <div className="dmp-wash">
          {/* Story */}
          <section className="pt-20 lg:pt-28 pb-14">
            <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-20">
              <Reveal>
                <h2 className="font-display text-slate-900 text-[2.2rem] lg:text-[2.8rem] leading-tight" style={{ fontWeight: 700 }}>Our story</h2>
              </Reveal>
              <Reveal>
                <p className="text-slate-900 text-[1.35rem] lg:text-[1.55rem] leading-snug" style={{ fontWeight: 500 }}>{about.story[0]}</p>
                {about.story.slice(1).map((p) => <p key={p.slice(0, 20)} className="text-slate-600 text-[1.08rem] leading-relaxed mt-6">{p}</p>)}
              </Reveal>
            </div>
          </section>

          {/* What you can expect */}
          <section className="pb-20 lg:pb-28">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="font-display text-slate-900 text-[2rem] lg:text-[2.5rem] leading-tight mb-8" style={{ fontWeight: 700 }}>What you can expect from us</h2>
              <ul className="grid sm:grid-cols-2 gap-5">
                {PROMISES.map(({ icon: Icon, title, body }) => (
                  <li key={title} className="dmp-glass-light p-7 flex gap-5">
                    <span className="w-12 h-12 rounded-2xl bg-brand-light text-brand-secondary grid place-items-center shrink-0"><Icon width={24} height={24} /></span>
                    <div>
                      <h3 className="text-slate-900 text-[1.15rem]" style={{ fontWeight: 700 }}>{title}</h3>
                      <p className="text-slate-600 mt-1.5 leading-relaxed">{body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Who's responsible for your care */}
          <section className="pb-20 lg:pb-28">
            <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-[1fr_1.1fr] gap-10 items-center">
              <Reveal>
                <h2 className="font-display text-slate-900 text-[2rem] lg:text-[2.5rem] leading-tight" style={{ fontWeight: 700 }}>Registered and accountable</h2>
                <p className="text-slate-600 text-[1.08rem] leading-relaxed mt-4 max-w-lg">
                  We're a registered pharmacy, regulated by the General Pharmaceutical Council (GPhC). Our superintendent pharmacist is responsible for how medicines and services are run here.
                </p>
                <a href="https://www.pharmacyregulation.org/registers" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 min-h-[44px] text-brand-primary underline underline-offset-4" style={{ fontWeight: 600 }}>
                  Check the GPhC register <OpenNewWindow width={16} height={16} />
                </a>
              </Reveal>
              <Reveal>
                <div className="dmp-glass-light p-7 sm:p-9">
                  <div className="flex items-center gap-4">
                    <span className="w-16 h-16 rounded-full bg-brand-primary text-white grid place-items-center font-display text-[1.4rem]" style={{ fontWeight: 700 }} aria-hidden="true">AA</span>
                    <div>
                      <p className="text-slate-900 text-[1.2rem]" style={{ fontWeight: 700 }}>{DMP_LEGAL.superintendent}</p>
                      <p className="text-slate-600">Superintendent pharmacist</p>
                    </div>
                  </div>
                  <dl className="mt-7 grid sm:grid-cols-2 gap-5 text-[0.95rem]">
                    <div><dt className="text-slate-500">Pharmacy</dt><dd className="text-slate-900 mt-0.5" style={{ fontWeight: 600 }}>{branch.name}</dd></div>
                    <div><dt className="text-slate-500">Address</dt><dd className="text-slate-900 mt-0.5" style={{ fontWeight: 600 }}>{branch.address}</dd></div>
                    <div><dt className="text-slate-500">GPhC premises number</dt><dd className="text-amber-700 mt-0.5" style={{ fontWeight: 600 }}>To be confirmed</dd></div>
                    <div><dt className="text-slate-500">Operated by</dt><dd className={`mt-0.5 ${isTbc(DMP_LEGAL.owner) ? "text-amber-700" : "text-slate-900"}`} style={{ fontWeight: 600 }}>{isTbc(DMP_LEGAL.owner) ? "To be confirmed" : DMP_LEGAL.owner}</dd></div>
                  </dl>
                </div>
              </Reveal>
            </div>
          </section>

        </div>
      </main>

      <Footer brand={brand} />
    </div>
  );
}
