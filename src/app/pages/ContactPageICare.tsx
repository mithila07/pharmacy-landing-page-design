import { useEffect, useState } from "react";
import { MapPin, Phone, Mail, Clock, Navigation, Send, CheckCircle2, ShieldAlert, MessageSquare } from "lucide-react";
import { HeaderICare } from "../components/HeaderICare";
import { FooterICare } from "../components/FooterICare";
import { Reveal } from "../components/Reveal";
import { GRAD_HERO, GRAD_MIST, LINE } from "../components/icareUi";
import { canadaBrand } from "../branding";
import { useOpenStatus } from "../openStatus";
import { useSeo, JsonLd, pharmacyGraph } from "../seo";

const AREA = ["Ealing", "Ealing Broadway", "West Ealing", "Pitshanger", "Hanwell", "Acton", "North Ealing", "Greater London"];
const directionsUrl = (address: string) => `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;

export default function ContactPageICare() {
  const brand = canadaBrand;
  const branch = brand.locations[0];
  const status = useOpenStatus(branch);

  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, []);

  useSeo({
    title: "Contact iCare Pharmacy | Queens Parade, Ealing, London W5",
    description:
      "Get in touch with iCare Pharmacy on Queens Parade, Ealing (W5 3HU). Opening hours, phone, email, directions and an online message form — your local NHS & private pharmacy.",
    path: `${brand.basePath}/contact`,
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });
  const valid = form.name && form.email && form.message;

  const detail = (icon: React.ReactNode, label: string, body: React.ReactNode) => (
    <li className="flex items-start gap-3">
      <span className="w-10 h-10 rounded-xl bg-brand-secondary/12 text-brand-green-ink flex items-center justify-center shrink-0">{icon}</span>
      <div>
        <p className="text-[0.78rem] text-brand-primary/55" style={{ fontWeight: 500 }}>{label}</p>
        {body}
      </div>
    </li>
  );

  return (
    <div className="theme-canada min-h-screen" style={{ background: GRAD_MIST }}>
      <JsonLd data={pharmacyGraph(brand, AREA, {
        addressRegion: "London",
        hoursSpec: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "18:00" }],
      })} />
      <HeaderICare brand={brand} />

      {/* Hero */}
      <section className="relative overflow-hidden py-14 lg:py-16" style={{ background: GRAD_HERO }}>
        <div className="relative z-10 max-w-7xl mx-auto px-5">
          <Reveal className="max-w-2xl">
            <p className="inline-flex items-center gap-2 text-[0.78rem] tracking-[0.18em] uppercase text-brand-green-ink mb-4" style={{ fontWeight: 700 }}>
              <MessageSquare size={15} /> Get in touch
            </p>
            <h1 className="font-display text-brand-primary text-[2.4rem] lg:text-[3.4rem] leading-[1.04] mb-4" style={{ fontWeight: 700 }}>
              We're here to help
            </h1>
            <p className="text-brand-primary/65 text-[1.05rem] leading-relaxed">
              Have a question about a service or a booking? Send us a message, or pop into our pharmacy on Queens Parade in Ealing — we'd love to see you.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Map + details + form */}
      <section className="pb-16 lg:pb-24">
        <div className="max-w-7xl mx-auto px-5 grid lg:grid-cols-[0.95fr_1.05fr] gap-8 lg:gap-10 items-start">
          {/* Info column */}
          <Reveal className="space-y-4">
            {/* Map */}
            <div className="rounded-3xl overflow-hidden shadow-sm border bg-white" style={{ borderColor: LINE }}>
              <div className="aspect-[16/10] bg-brand-light">
                <iframe
                  src={branch.googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Map — ${branch.name}`}
                  className="grayscale-[0.15]"
                />
              </div>
              <div className="p-4 flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 text-[0.82rem]" style={{ fontWeight: 600 }}>
                  <span className="relative flex h-2.5 w-2.5">
                    {status.open && <span className="absolute inline-flex h-full w-full rounded-full bg-brand-secondary opacity-75 animate-ping" />}
                    <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${status.open ? "bg-brand-secondary" : "bg-amber-400"}`} />
                  </span>
                  <span className={status.open ? "text-brand-green-ink" : "text-brand-primary/70"}>{status.label}</span>
                  {status.detail && <span className="text-brand-primary/45" style={{ fontWeight: 500 }}>· {status.detail}</span>}
                </span>
                <a href={directionsUrl(branch.address)} target="_blank" rel="noopener noreferrer" className="cta cta-primary inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[0.82rem] no-underline shrink-0" style={{ fontWeight: 600 }}>
                  <Navigation size={14} /> Directions
                </a>
              </div>
            </div>

            {/* Details */}
            <div className="rounded-3xl border bg-white shadow-sm p-6" style={{ borderColor: LINE }}>
              <h2 className="font-display text-[1.2rem] text-brand-primary mb-4" style={{ fontWeight: 700 }}>Ways to reach us</h2>
              <ul className="space-y-4">
                {detail(<Phone size={18} />, "Call the pharmacy", (
                  <a href={`tel:${branch.phone.replace(/\s/g, "")}`} className="text-[0.95rem] text-brand-primary hover:text-brand-green-ink transition-colors" style={{ fontWeight: 600 }}>{branch.phone}</a>
                ))}
                {detail(<Mail size={18} />, "Email us", (
                  <a href={`mailto:${branch.email}`} className="text-[0.95rem] text-brand-primary hover:text-brand-green-ink transition-colors break-all" style={{ fontWeight: 600 }}>{branch.email}</a>
                ))}
                {detail(<MapPin size={18} />, "Visit us", (
                  <p className="text-[0.95rem] text-brand-primary" style={{ fontWeight: 600 }}>{branch.address}</p>
                ))}
                {detail(<Clock size={18} />, "Opening hours", (
                  <div className="mt-1 space-y-0.5">
                    {branch.openingHours.map((h) => (
                      <div key={h.day} className="flex justify-between gap-6 text-[0.85rem]">
                        <span className="text-brand-primary/55">{h.day}</span>
                        <span className="text-brand-primary" style={{ fontWeight: 600 }}>{h.hours}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </ul>
            </div>

            {/* Urgent care note */}
            <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5 flex items-start gap-3">
              <span className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center shrink-0"><ShieldAlert size={18} className="text-amber-600" /></span>
              <div>
                <p className="text-[0.9rem] text-amber-900" style={{ fontWeight: 700 }}>Need urgent medical help?</p>
                <p className="text-[0.84rem] text-amber-900/80 leading-relaxed mt-0.5">
                  This form isn't monitored out of hours. For urgent advice call <a href="tel:111" className="underline" style={{ fontWeight: 600 }}>111</a>, or <a href="tel:999" className="underline" style={{ fontWeight: 600 }}>999</a> in an emergency.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.08}>
            <div className="rounded-3xl border bg-white shadow-sm p-6 sm:p-8 lg:sticky lg:top-24" style={{ borderColor: LINE }}>
              {submitted ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 rounded-full bg-brand-secondary/12 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={32} className="text-brand-green-ink" />
                  </div>
                  <h2 className="font-display text-[1.5rem] text-brand-primary mb-2" style={{ fontWeight: 700 }}>Message sent!</h2>
                  <p className="text-brand-primary/60 text-[0.95rem] max-w-sm mx-auto mb-6">
                    Thanks {form.name.split(" ")[0] || "there"} — we've received your message and will get back to you as soon as we can.
                  </p>
                  <button onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", message: "" }); }} className="text-brand-green-ink hover:underline cursor-pointer" style={{ fontWeight: 600 }}>
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                  <div className="flex items-center gap-2 mb-5">
                    <Send size={18} className="text-brand-green-ink" />
                    <h2 className="font-display text-[1.25rem] text-brand-primary" style={{ fontWeight: 700 }}>Send us a message</h2>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="text-[0.85rem] text-brand-primary mb-1.5 block" style={{ fontWeight: 500 }}>Full name *</label>
                      <input id="name" value={form.name} onChange={set("name")} required className="w-full px-4 min-h-[48px] border rounded-xl text-[0.95rem] focus:outline-none focus:ring-2 focus:ring-brand-secondary/40" style={{ borderColor: LINE }} placeholder="Jane Doe" />
                    </div>
                    <div>
                      <label htmlFor="email" className="text-[0.85rem] text-brand-primary mb-1.5 block" style={{ fontWeight: 500 }}>Email *</label>
                      <input id="email" type="email" value={form.email} onChange={set("email")} required className="w-full px-4 min-h-[48px] border rounded-xl text-[0.95rem] focus:outline-none focus:ring-2 focus:ring-brand-secondary/40" style={{ borderColor: LINE }} placeholder="you@example.com" />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="phone" className="text-[0.85rem] text-brand-primary mb-1.5 block" style={{ fontWeight: 500 }}>Phone <span className="text-brand-primary/45">(optional)</span></label>
                      <input id="phone" value={form.phone} onChange={set("phone")} className="w-full px-4 min-h-[48px] border rounded-xl text-[0.95rem] focus:outline-none focus:ring-2 focus:ring-brand-secondary/40" style={{ borderColor: LINE }} placeholder="07123 456789" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label htmlFor="message" className="text-[0.85rem] text-brand-primary mb-1.5 block" style={{ fontWeight: 500 }}>Message *</label>
                    <textarea id="message" value={form.message} onChange={set("message")} required rows={5} className="w-full px-4 py-3 border rounded-xl text-[0.95rem] focus:outline-none focus:ring-2 focus:ring-brand-secondary/40 resize-none" style={{ borderColor: LINE }} placeholder="How can we help?" />
                  </div>
                  <button type="submit" disabled={!valid} className="cta cta-primary mt-5 inline-flex items-center gap-2 px-6 min-h-[48px] rounded-full disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer" style={{ fontWeight: 600 }}>
                    <Send size={16} /> Send message
                  </button>
                  <p className="text-[0.75rem] text-brand-primary/50 mt-3">By sending, you agree to our privacy policy. We'll only use your details to respond to your enquiry.</p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <FooterICare brand={brand} />
    </div>
  );
}
