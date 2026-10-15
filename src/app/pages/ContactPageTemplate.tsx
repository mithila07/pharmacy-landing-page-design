import { useEffect, useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, Navigation, Check, ShieldAlert as ShieldWarn } from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Reveal } from "../components/Reveal";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import type { Brand } from "../branding";
import { useOpenStatus } from "../openStatus";
import { useSeo, JsonLd, pharmacyGraph } from "../seo";
import { publicEmail } from "../data/locations";
import storefront from "../../assets/about-hero.jpeg";

const directionsUrl = (address: string) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;

export function ContactPageTemplate({ brand }: { brand: Brand }) {
  const branch = brand.locations[0];
  const status = useOpenStatus(branch);
  const email = publicEmail(branch); // null when the pharmacy has asked to hide it
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, []);

  useSeo({
    title: `Contact ${brand.name} | ${brand.seoArea}`,
    description: `Get in touch with ${brand.name} in ${brand.seoArea}. Opening hours, phone${email ? ", email" : ""} and directions, or send us a message online.`,
    path: `${brand.basePath}/contact`,
    favicon: brand.favicon,
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });
  const valid = form.name && form.email && form.message;
  const inputClass = "w-full px-4 min-h-[48px] border border-slate-200 rounded-xl text-[0.95rem] bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-primary/40 focus:bg-white transition-colors";

  return (
    <div className={`min-h-screen bg-white ${brand.themeClass}`}>
      <JsonLd data={pharmacyGraph(brand, [brand.seoArea ?? branch.shortName])} />
      <Header brand={brand} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-light">
        <div aria-hidden="true" className="absolute -top-24 right-0 w-[30rem] h-[30rem] rounded-full bg-brand-accent/15 blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 pt-14 pb-10 grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-12 items-center">
          <Reveal>
            <h1 className="font-display text-slate-900 text-[2.2rem] md:text-[2.9rem] leading-[1.05] mb-4" style={{ fontWeight: 700, letterSpacing: "-0.02em" }}>
              We're here to <span className="text-brand-secondary">help</span>
            </h1>
            <p className="text-slate-500 text-[1.05rem] leading-relaxed">
              Have a question about a service or a booking? Send us a message, or pop into the pharmacy — we'd love to hear from you.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-[5/4]">
              <ImageWithFallback src={storefront} alt={`${brand.name} storefront`} className="w-full h-full object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Form + info */}
      <section className="relative py-12">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-10 items-start">
          {/* Info */}
          <Reveal>
            <div className="lg:sticky lg:top-24 space-y-4">
              <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-200 bg-white">
                <div className="aspect-[16/10] bg-brand-light">
                  <iframe src={branch.googleMapsEmbedUrl} width="100%" height="100%" style={{ border: 0 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" title={`Map — ${branch.name}`} />
                </div>
                <div className="p-4 flex items-center justify-between gap-3">
                  <p className="flex items-center gap-2 text-[0.85rem] text-slate-900 min-w-0" style={{ fontWeight: 600 }}>
                    <MapPin size={15} className="text-brand-accent shrink-0" /> <span className="truncate">{branch.shortName}</span>
                  </p>
                  <a href={directionsUrl(branch.address)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 bg-brand-secondary text-white px-4 min-h-[42px] rounded-lg text-[0.85rem] hover:brightness-110 transition-all no-underline shrink-0" style={{ fontWeight: 600 }}>
                    <Navigation size={15} /> Directions
                  </a>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
                <h2 className="text-[1.1rem] text-slate-900 mb-4" style={{ fontWeight: 700 }}>Ways to reach us</h2>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center shrink-0"><Phone size={18} className="text-brand-primary" /></span>
                    <div><p className="text-[0.8rem] text-slate-500" style={{ fontWeight: 500 }}>Call the pharmacy</p>
                      <a href={`tel:${branch.phone.replace(/\s/g, "")}`} className="text-[0.95rem] text-slate-900 hover:text-brand-primary transition-colors" style={{ fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>{branch.phone}</a></div>
                  </li>
                  {email && (
                  <li className="flex items-start gap-3">
                    <span className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center shrink-0"><Mail size={18} className="text-brand-primary" /></span>
                    <div className="min-w-0"><p className="text-[0.8rem] text-slate-500" style={{ fontWeight: 500 }}>Email us</p>
                      <a href={`mailto:${email}`} className="text-[0.95rem] text-slate-900 hover:text-brand-primary transition-colors break-all" style={{ fontWeight: 600 }}>{email}</a></div>
                  </li>
                  )}
                  <li className="flex items-start gap-3">
                    <span className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center shrink-0"><MapPin size={18} className="text-brand-primary" /></span>
                    <div><p className="text-[0.8rem] text-slate-500" style={{ fontWeight: 500 }}>Visit us</p>
                      <p className="text-[0.95rem] text-slate-900" style={{ fontWeight: 600 }}>{branch.address}</p></div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center shrink-0"><Clock size={18} className="text-brand-primary" /></span>
                    <div className="min-w-0"><p className="text-[0.8rem] text-slate-500" style={{ fontWeight: 500 }}>Opening hours <span className="text-brand-secondary">· {status.label}</span></p>
                      <div className="mt-1 space-y-0.5">
                        {branch.openingHours.map((h) => (
                          <div key={h.day} className="flex justify-between gap-6 text-[0.85rem]">
                            <span className="text-slate-500">{h.day}</span>
                            <span className="text-slate-900" style={{ fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>{h.hours}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 flex items-start gap-3">
                <span className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center shrink-0"><ShieldWarn size={18} className="text-amber-600" /></span>
                <div>
                  <p className="text-[0.9rem] text-amber-900" style={{ fontWeight: 700 }}>Need urgent medical help?</p>
                  <p className="text-[0.84rem] text-amber-900/80 leading-relaxed mt-0.5">
                    This form isn't monitored out of hours. For urgent advice call <a href="tel:111" className="underline" style={{ fontWeight: 600 }}>111</a>, or <a href="tel:999" className="underline" style={{ fontWeight: 600 }}>999</a> in an emergency.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.08}>
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8">
              {submitted ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 rounded-full bg-brand-secondary/10 flex items-center justify-center mx-auto mb-4"><CheckCircle2 size={32} className="text-brand-secondary" /></div>
                  <h2 className="font-display text-[1.5rem] text-slate-900 mb-2" style={{ fontWeight: 700 }}>Message sent!</h2>
                  <p className="text-slate-500 text-[0.95rem] max-w-sm mx-auto mb-6">Thanks {form.name.split(" ")[0] || "there"} — we've received your message and will get back to you as soon as we can.</p>
                  <button onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", email: "", message: "" }); }} className="inline-flex items-center gap-2 text-brand-primary hover:underline cursor-pointer" style={{ fontWeight: 600 }}>Send another message</button>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                  <h2 className="font-display text-[1.5rem] text-slate-900 mb-1.5" style={{ fontWeight: 700, letterSpacing: "-0.01em" }}>Send us a message</h2>
                  <p className="text-slate-500 text-[0.92rem] mb-6">Fill in the form and we'll be in touch.</p>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="text-[0.85rem] text-slate-900 mb-1.5 block" style={{ fontWeight: 500 }}>Full name *</label>
                      <input id="name" value={form.name} onChange={set("name")} required className={inputClass} placeholder="Jane Doe" />
                    </div>
                    <div>
                      <label htmlFor="phone" className="text-[0.85rem] text-slate-900 mb-1.5 block" style={{ fontWeight: 500 }}>Phone <span className="text-slate-400">(optional)</span></label>
                      <input id="phone" value={form.phone} onChange={set("phone")} className={inputClass} placeholder="07123 456789" />
                    </div>
                    <div>
                      <label htmlFor="email" className="text-[0.85rem] text-slate-900 mb-1.5 block" style={{ fontWeight: 500 }}>Email *</label>
                      <input id="email" type="email" value={form.email} onChange={set("email")} required className={inputClass} placeholder="you@example.com" />
                    </div>
                    <div>
                      <label htmlFor="message" className="text-[0.85rem] text-slate-900 mb-1.5 block" style={{ fontWeight: 500 }}>Message *</label>
                      <textarea id="message" value={form.message} onChange={set("message")} required rows={5} className={`${inputClass} py-3 min-h-[130px] resize-none`} placeholder="How can we help?" />
                    </div>
                  </div>
                  <button type="submit" disabled={!valid} className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-brand-secondary text-white min-h-[52px] rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-110 transition-all cursor-pointer" style={{ fontWeight: 600 }}>
                    <Send size={16} /> Send message
                  </button>
                  <p className="text-[0.75rem] text-slate-400 mt-3">By sending, you agree to our privacy policy. We'll only use your details to respond to your enquiry.</p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <Footer brand={brand} />
    </div>
  );
}
