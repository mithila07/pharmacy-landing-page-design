import { useEffect, useState } from "react";
import { Envelope, Phone, Clock, MapPin, PaperPlaneTilt, CheckCircle, NavigationArrow, ShieldWarning, ChatText, Check, Star, IconContext } from "@phosphor-icons/react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Reveal } from "../components/Reveal";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { healthcheckBrand } from "../branding";
import { useSeo, JsonLd, pharmacyGraph } from "../seo";
import healthcheckFront from "../../assets/healthcheck-front.jpeg";

const AREA = ["Bradford", "West Yorkshire"];
const directionsUrl = (address: string) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;

export default function ContactPageHealthCheck() {
  const brand = healthcheckBrand;
  const branch = brand.locations[0];

  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  useSeo({
    title: "Contact Health-Check Pharmacy & Clinic | Bradford, BD7",
    description: "Get in touch with Health-Check Pharmacy & Clinic on Great Horton Road, Bradford. Opening hours, phone, email and directions — or send us a message online.",
    path: `${brand.basePath}/contact`,
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const valid = form.name && form.email && form.message;

  return (
    <IconContext.Provider value={{ weight: "duotone" }}>
    <div className={`min-h-screen bg-white ${brand.themeClass}`}>
      <JsonLd data={pharmacyGraph(brand, AREA)} />
      <Header brand={brand} />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: "radial-gradient(55% 65% at 15% 20%, rgba(0,93,230,0.14), transparent 70%), radial-gradient(55% 65% at 85% 25%, rgba(0,178,59,0.14), transparent 70%), #F2F7FD" }}
        />
        <div className="relative max-w-7xl mx-auto px-4 pt-14 pb-10 grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-12 items-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md rounded-full pl-1.5 pr-3.5 py-1.5 shadow-sm border border-[#D0E0F2] mb-5">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-brand-secondary text-white"><Check size={12} weight="bold" /></span>
              <span className="text-[0.78rem] text-[#4A5B72]" style={{ fontWeight: 600 }}>Get in touch</span>
            </span>
            <h1 className="font-display text-[#111D30] text-[2.2rem] md:text-[2.9rem] leading-[1.05] mb-4" style={{ fontWeight: 700, letterSpacing: "-0.02em" }}>
              We're here to <span className="hc-swoosh-text">help</span>
            </h1>
            <p className="text-[#4A5B72] text-[1.05rem] leading-relaxed">
              Have a question about a service or a booking? Send us a message, or pop into our pharmacy on Great Horton Road — we'd love to hear from you.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-[5/4]">
                <ImageWithFallback src={healthcheckFront} alt="Health-Check Pharmacy & Clinic storefront on Great Horton Road, Bradford" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-5 left-4 sm:left-6 bg-white rounded-2xl shadow-lg border border-[#D0E0F2] px-4 py-3 flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-amber-100 text-amber-500 flex items-center justify-center"><Star size={18} weight="fill" className="text-amber-400" /></span>
                <div className="leading-tight">
                  <p className="text-[#111D30] text-[0.86rem]" style={{ fontWeight: 700 }}>4.8 on Google</p>
                  <p className="text-[#4A5B72] text-[0.74rem]">Trusted across Bradford</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
        <div aria-hidden="true" className="hc-swoosh-bar h-[3px] w-full opacity-80" />
      </section>

      {/* Form + info */}
      <section className="relative py-12">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-10 items-start">
          {/* Info panel */}
          <Reveal>
            <div className="lg:sticky lg:top-24 space-y-4">
              {/* Map + directions */}
              <div className="rounded-2xl overflow-hidden shadow-sm border border-[#D0E0F2] bg-white">
                <div className="aspect-[16/10] bg-[#E8F7EE]">
                  <iframe
                    src={branch.googleMapsEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Map — ${branch.name}`}
                  />
                </div>
                <div className="p-4 flex items-center justify-between gap-3">
                  <p className="flex items-center gap-2 text-[0.85rem] text-[#111D30]" style={{ fontWeight: 600 }}>
                    <MapPin size={15} className="text-brand-accent" /> Great Horton Road, Bradford · BD7
                  </p>
                  <a
                    href={directionsUrl(branch.address)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-brand-secondary text-white px-4 min-h-[42px] rounded-lg text-[0.85rem] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#00872D]/25 transition-all no-underline shrink-0"
                    style={{ fontWeight: 600 }}
                  >
                    <NavigationArrow size={15} /> Directions
                  </a>
                </div>
              </div>

              <div className="rounded-2xl border border-[#D0E0F2] bg-white shadow-sm p-6">
                <h2 className="text-[1.1rem] text-[#111D30] mb-4" style={{ fontWeight: 700 }}>Ways to reach us</h2>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center shrink-0"><Phone size={18} className="text-brand-primary" /></span>
                    <div>
                      <p className="text-[0.8rem] text-[#4A5B72]" style={{ fontWeight: 500 }}>Call the pharmacy</p>
                      <a href={`tel:${branch.phone.replace(/\s/g, "")}`} className="text-[0.95rem] text-[#111D30] hover:text-brand-primary transition-colors" style={{ fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>{branch.phone}</a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center shrink-0"><Envelope size={18} className="text-brand-primary" /></span>
                    <div>
                      <p className="text-[0.8rem] text-[#4A5B72]" style={{ fontWeight: 500 }}>Email us</p>
                      <a href={`mailto:${branch.email}`} className="text-[0.95rem] text-[#111D30] hover:text-brand-primary transition-colors break-all" style={{ fontWeight: 600 }}>{branch.email}</a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center shrink-0"><MapPin size={18} className="text-brand-primary" /></span>
                    <div>
                      <p className="text-[0.8rem] text-[#4A5B72]" style={{ fontWeight: 500 }}>Visit us</p>
                      <p className="text-[0.95rem] text-[#111D30]" style={{ fontWeight: 600 }}>{branch.address}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center shrink-0"><Clock size={18} className="text-brand-primary" /></span>
                    <div>
                      <p className="text-[0.8rem] text-[#4A5B72]" style={{ fontWeight: 500 }}>Opening hours</p>
                      <div className="mt-1 space-y-0.5">
                        {branch.openingHours.map((h) => (
                          <div key={h.day} className="flex justify-between gap-6 text-[0.85rem]">
                            <span className="text-[#4A5B72]">{h.day}</span>
                            <span className="text-[#111D30]" style={{ fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>{h.hours}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Urgent care note (safety-netting) */}
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 flex items-start gap-3">
                <span className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center shrink-0"><ShieldWarning size={18} className="text-amber-600" /></span>
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
            <div className="rounded-2xl border border-[#D0E0F2] bg-white shadow-sm p-6 sm:p-8">
              {submitted ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 rounded-full bg-brand-secondary/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-brand-secondary" />
                  </div>
                  <h2 className="text-[1.4rem] text-[#111D30] mb-2" style={{ fontWeight: 700 }}>Message sent!</h2>
                  <p className="text-[#4A5B72] text-[0.95rem] max-w-sm mx-auto mb-6">
                    Thanks {form.name.split(" ")[0] || "there"} — we've received your message and will get back to you as soon as we can.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", message: "" }); }}
                    className="inline-flex items-center gap-2 text-brand-primary hover:underline cursor-pointer"
                    style={{ fontWeight: 600 }}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                  <div className="flex items-center gap-2 mb-5">
                    <ChatText size={18} className="text-brand-secondary" />
                    <h2 className="text-[1.15rem] text-[#111D30]" style={{ fontWeight: 700 }}>Send us a message</h2>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="text-[0.85rem] text-[#111D30] mb-1.5 block" style={{ fontWeight: 500 }}>Full name *</label>
                      <input id="name" value={form.name} onChange={set("name")} required className="w-full px-4 min-h-[48px] border border-[#D0E0F2] rounded-lg text-[0.95rem] focus:outline-none focus:ring-2 focus:ring-brand-primary/40" placeholder="Jane Doe" />
                    </div>
                    <div>
                      <label htmlFor="email" className="text-[0.85rem] text-[#111D30] mb-1.5 block" style={{ fontWeight: 500 }}>Email *</label>
                      <input id="email" type="email" value={form.email} onChange={set("email")} required className="w-full px-4 min-h-[48px] border border-[#D0E0F2] rounded-lg text-[0.95rem] focus:outline-none focus:ring-2 focus:ring-brand-primary/40" placeholder="you@example.com" />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="phone" className="text-[0.85rem] text-[#111D30] mb-1.5 block" style={{ fontWeight: 500 }}>Phone <span className="text-[#4A5B72]">(optional)</span></label>
                      <input id="phone" value={form.phone} onChange={set("phone")} className="w-full px-4 min-h-[48px] border border-[#D0E0F2] rounded-lg text-[0.95rem] focus:outline-none focus:ring-2 focus:ring-brand-primary/40" placeholder="07123 456789" />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label htmlFor="message" className="text-[0.85rem] text-[#111D30] mb-1.5 block" style={{ fontWeight: 500 }}>Message *</label>
                    <textarea id="message" value={form.message} onChange={set("message")} required rows={5} className="w-full px-4 py-3 border border-[#D0E0F2] rounded-lg text-[0.95rem] focus:outline-none focus:ring-2 focus:ring-brand-primary/40 resize-none" placeholder="How can we help?" />
                  </div>

                  <button
                    type="submit"
                    disabled={!valid}
                    className="mt-5 inline-flex items-center gap-2 bg-brand-secondary text-white px-6 min-h-[48px] rounded-xl disabled:opacity-40 disabled:cursor-not-allowed hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#00872D]/25 transition-all cursor-pointer"
                    style={{ fontWeight: 600 }}
                  >
                    <PaperPlaneTilt size={16} /> Send message
                  </button>
                  <p className="text-[0.75rem] text-[#4A5B72] mt-3">By sending, you agree to our privacy policy. We'll only use your details to respond to your enquiry.</p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <Footer brand={brand} />
    </div>
    </IconContext.Provider>
  );
}
