import { Megaphone, Syringe, Clock, Truck, Pill, Plane } from "lucide-react";
import { KeppleSubPage } from "../components/KeppleSubPage";
import { Reveal } from "../components/Reveal";
import { kepplelaneBrand } from "../branding";
import heroImg from "../../assets/hero-bg.jpeg";

type Update = {
  date: string;
  /** Machine-readable date for <time>. */
  iso: string;
  category: string;
  icon: typeof Megaphone;
  title: string;
  body: string;
  /** Pinned notices sit at the top with a highlighted card. */
  pinned?: boolean;
};

// PLACEHOLDER CONTENT — replace with the pharmacy's real notices before launch.
const UPDATES: Update[] = [
  {
    date: "1 September 2026",
    iso: "2026-09-01",
    category: "Vaccinations",
    icon: Syringe,
    title: "Flu clinics now open for booking",
    body: "Appointments for this season's flu vaccinations are open. NHS jabs are free if you're eligible — over 65, pregnant, or in a clinical at-risk group. If you're not eligible, our private flu vaccination is available at £20.00. Book online or ask at the counter.",
    pinned: true,
  },
  {
    date: "18 August 2026",
    iso: "2026-08-18",
    category: "Opening hours",
    icon: Clock,
    title: "Bank holiday opening",
    body: "We'll be open as normal over the late August bank holiday weekend, including Monday. Our Sunday hours remain 8:00 AM – 4:00 PM.",
  },
  {
    date: "2 July 2026",
    iso: "2026-07-02",
    category: "Travel health",
    icon: Plane,
    title: "Book travel vaccinations six weeks ahead",
    body: "Summer is our busiest period for travel clinics. Some courses — rabies and Japanese encephalitis in particular — need several appointments spaced weeks apart, so please get in touch at least six weeks before you fly. Yellow fever certificates are issued on the day.",
  },
  {
    date: "12 May 2026",
    iso: "2026-05-12",
    category: "Deliveries",
    icon: Truck,
    title: "Delivery rounds extended",
    body: "We've added a second weekly round covering the villages north of Garstang. If you're housebound and haven't set up delivery yet, call us on 01995 607399 and we'll add you to the route.",
  },
  {
    date: "3 March 2026",
    iso: "2026-03-03",
    category: "Services",
    icon: Pill,
    title: "NHS Pharmacy Contraception Service available",
    body: "You can now start or continue oral contraception with our pharmacists — no GP appointment needed, and free on the NHS. Consultations take place in our private consultation room.",
  },
];

export default function UpdatesPageKepple() {
  const brand = kepplelaneBrand;
  const pinned = UPDATES.filter((u) => u.pinned);
  const rest = UPDATES.filter((u) => !u.pinned);

  return (
    <KeppleSubPage
      eyebrow="Dispensary"
      title="What's happening"
      titleAccent="at the pharmacy."
      intro="Seasonal clinics, opening-hours changes and new services — the things worth knowing before you next visit us on Kepple Lane."
      heroImage={heroImg}
      heroImageAlt="The counter at Kepple Lane Pharmacy"
      seo={{
        title: "Updates & Notices | Kepple Lane Pharmacy, Garstang",
        description: "The latest news from Kepple Lane Pharmacy in Garstang — flu clinics, bank holiday opening hours, travel vaccination lead times, delivery rounds and new NHS services.",
        path: `${brand.basePath}/updates`,
      }}
    >
      {/* Pinned */}
      {pinned.length > 0 && (
        <section className="relative pt-14">
          <div className="max-w-4xl mx-auto px-4 space-y-4">
            {pinned.map((u) => (
              <Reveal key={u.iso}>
                <article className="rounded-2xl border-2 border-brand-primary/25 bg-brand-light shadow-sm p-6 sm:p-7">
                  <div className="flex flex-wrap items-center gap-2.5 mb-3">
                    <span className="inline-flex items-center gap-1.5 text-[0.7rem] uppercase tracking-widest text-white bg-brand-secondary rounded-full px-3 py-1" style={{ fontWeight: 700 }}>
                      <Megaphone size={12} /> Pinned
                    </span>
                    <span className="text-[0.75rem] text-brand-primary" style={{ fontWeight: 600 }}>{u.category}</span>
                    <time dateTime={u.iso} className="text-[0.75rem] text-[#5A5578]" style={{ fontVariantNumeric: "tabular-nums" }}>{u.date}</time>
                  </div>
                  <h2 className="text-[1.3rem] md:text-[1.5rem] text-[#1E1A3C] mb-2" style={{ fontWeight: 700, letterSpacing: "-0.01em" }}>{u.title}</h2>
                  <p className="text-[0.95rem] text-[#5A5578] leading-relaxed">{u.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Timeline */}
      <section className="relative py-14">
        <div className="max-w-4xl mx-auto px-4">
          <Reveal className="mb-8">
            <span className="text-[0.8rem] text-brand-secondary uppercase tracking-widest" style={{ fontWeight: 700 }}>Earlier</span>
            <h2 className="text-[1.6rem] md:text-[1.9rem] text-[#1E1A3C] mt-2" style={{ fontWeight: 700, letterSpacing: "-0.01em" }}>Previous updates</h2>
          </Reveal>

          <ol className="relative space-y-4 before:absolute before:left-[1.4rem] before:top-4 before:bottom-4 before:w-px before:bg-[#DED9F7]">
            {rest.map((u, i) => (
              <Reveal key={u.iso} delay={i * 0.05}>
                <li className="relative flex gap-5">
                  <span className="relative z-10 shrink-0 w-11 h-11 rounded-xl bg-white border border-[#DED9F7] text-brand-primary flex items-center justify-center shadow-sm">
                    <u.icon size={20} />
                  </span>
                  <article className="rounded-2xl border border-[#DED9F7] bg-white shadow-sm p-5 sm:p-6 flex-1">
                    <div className="flex flex-wrap items-center gap-2.5 mb-2">
                      <span className="text-[0.72rem] text-brand-secondary" style={{ fontWeight: 700 }}>{u.category}</span>
                      <span aria-hidden="true" className="text-[#DED9F7]">·</span>
                      <time dateTime={u.iso} className="text-[0.75rem] text-[#5A5578]" style={{ fontVariantNumeric: "tabular-nums" }}>{u.date}</time>
                    </div>
                    <h3 className="text-[1.08rem] text-[#1E1A3C] mb-1.5" style={{ fontWeight: 600 }}>{u.title}</h3>
                    <p className="text-[0.9rem] text-[#5A5578] leading-relaxed">{u.body}</p>
                  </article>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
    </KeppleSubPage>
  );
}
