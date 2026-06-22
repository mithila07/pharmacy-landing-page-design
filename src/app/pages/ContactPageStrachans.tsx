import { useEffect, useState } from "react";
import {
  Mail,
  Phone,
  Clock,
  MapPin,
  Send,
  CheckCircle,
  ChevronDown,
  Navigation,
  ShieldAlert,
  Sparkles,
  MessageSquare,
} from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Reveal } from "../components/Reveal";
import { strachansBrand } from "../branding";
import { useSeo, JsonLd, pharmacyGraph } from "../seo";

const GENERAL_EMAIL = "hello@strachans.co.uk";

const directionsUrl = (address: string) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;

export default function ContactPageStrachans() {
  const brand = strachansBrand;
  const branches = brand.locations;

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    branch: branches[0].id,
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  useSeo({
    title: "Contact Strachans Pharmacy | Bury & Uppermill Branches",
    description: "Get in touch with Strachans Pharmacy. Opening hours, phone numbers and directions for our two Bury branches and our Uppermill pharmacy — or send us a message online.",
    path: `${brand.basePath}/contact`,
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const valid = form.name && form.email && form.message;

  return (
    <div className={`min-h-screen bg-white ${brand.themeClass}`}>
      <JsonLd data={pharmacyGraph(brand)} />
      <Header brand={brand} />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light via-white to-white" />
        <div className="absolute -top-20 -right-16 w-[380px] h-[380px] rounded-full bg-brand-secondary/15 blur-3xl" />
        <div className="absolute top-1/3 -left-24 w-[320px] h-[320px] rounded-full bg-brand-primary/10 blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 pt-14 pb-8">
          <Reveal className="max-w-2xl">
            <span className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md rounded-full px-3 py-1.5 shadow-sm border border-brand-primary/10 mb-5">
              <Sparkles size={13} className="text-brand-secondary" />
              <span className="text-[0.78rem] text-gray-600" style={{ fontWeight: 600 }}>Get in touch</span>
            </span>
            <h1 className="text-[2.2rem] md:text-[2.9rem] leading-[1.1] text-brand-primary mb-4" style={{ fontWeight: 800, letterSpacing: "-0.02em" }}>
              We're here to <span className="text-brand-secondary">help</span>
            </h1>
            <p className="text-gray-500 text-[1.05rem] leading-relaxed">
              Have a question about a service, a booking or a prescription? Send us a message, or visit any of our
              three local branches — we'd love to hear from you.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Form + info */}
      <section className="relative pb-6">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-10 items-start">
          {/* Info panel */}
          <Reveal>
            <div className="lg:sticky lg:top-24 space-y-4">
              <div className="rounded-2xl border border-gray-100 bg-white shadow-sm p-6">
                <h2 className="text-[1.1rem] text-gray-900 mb-4" style={{ fontWeight: 700 }}>Other ways to reach us</h2>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center shrink-0"><Mail size={18} className="text-brand-primary" /></span>
                    <div>
                      <p className="text-[0.8rem] text-gray-400" style={{ fontWeight: 500 }}>Email us</p>
                      <a href={`mailto:${GENERAL_EMAIL}`} className="text-[0.95rem] text-gray-900 hover:text-brand-primary transition-colors" style={{ fontWeight: 600 }}>{GENERAL_EMAIL}</a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center shrink-0"><MapPin size={18} className="text-brand-primary" /></span>
                    <div>
                      <p className="text-[0.8rem] text-gray-400" style={{ fontWeight: 500 }}>Visit a branch</p>
                      <p className="text-[0.95rem] text-gray-900" style={{ fontWeight: 600 }}>3 branches across Greater Manchester</p>
                      <p className="text-[0.82rem] text-gray-500">Two in Bury, one in Uppermill — see below</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center shrink-0"><Clock size={18} className="text-brand-primary" /></span>
                    <div>
                      <p className="text-[0.8rem] text-gray-400" style={{ fontWeight: 500 }}>Response time</p>
                      <p className="text-[0.95rem] text-gray-900" style={{ fontWeight: 600 }}>Within 1 working day</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Urgent care note */}
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 flex items-start gap-3">
                <span className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center shrink-0"><ShieldAlert size={18} className="text-amber-600" /></span>
                <div>
                  <p className="text-[0.9rem] text-amber-900" style={{ fontWeight: 700 }}>Need urgent medical help?</p>
                  <p className="text-[0.84rem] text-amber-900/80 leading-relaxed mt-0.5">
                    This form isn't monitored 24/7. For urgent advice call <a href="tel:111" className="underline" style={{ fontWeight: 600 }}>111</a>, or <a href="tel:999" className="underline" style={{ fontWeight: 600 }}>999</a> in an emergency.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.08}>
            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm p-6 sm:p-8">
              {submitted ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 rounded-full bg-brand-primary/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-brand-primary" />
                  </div>
                  <h2 className="text-[1.4rem] text-gray-900 mb-2" style={{ fontWeight: 700 }}>Message sent!</h2>
                  <p className="text-gray-500 text-[0.95rem] max-w-sm mx-auto mb-6">
                    Thanks {form.name.split(" ")[0] || "there"} — we've received your message and will get back to you within one working day.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", branch: branches[0].id, message: "" }); }}
                    className="inline-flex items-center gap-2 text-brand-primary hover:underline cursor-pointer"
                    style={{ fontWeight: 600 }}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                  <div className="flex items-center gap-2 mb-5">
                    <MessageSquare size={18} className="text-brand-secondary" />
                    <h2 className="text-[1.15rem] text-gray-900" style={{ fontWeight: 700 }}>Send us a message</h2>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="text-[0.85rem] text-gray-700 mb-1.5 block" style={{ fontWeight: 500 }}>Full name *</label>
                      <input id="name" value={form.name} onChange={set("name")} required className="w-full px-4 py-2.5 border border-brand-primary/30 rounded-lg text-[0.9rem] focus:outline-none focus:ring-2 focus:ring-brand-primary/30" placeholder="Jane Doe" />
                    </div>
                    <div>
                      <label htmlFor="email" className="text-[0.85rem] text-gray-700 mb-1.5 block" style={{ fontWeight: 500 }}>Email *</label>
                      <input id="email" type="email" value={form.email} onChange={set("email")} required className="w-full px-4 py-2.5 border border-brand-primary/30 rounded-lg text-[0.9rem] focus:outline-none focus:ring-2 focus:ring-brand-primary/30" placeholder="you@example.com" />
                    </div>
                    <div>
                      <label htmlFor="phone" className="text-[0.85rem] text-gray-700 mb-1.5 block" style={{ fontWeight: 500 }}>Phone <span className="text-gray-400">(optional)</span></label>
                      <input id="phone" value={form.phone} onChange={set("phone")} className="w-full px-4 py-2.5 border border-brand-primary/30 rounded-lg text-[0.9rem] focus:outline-none focus:ring-2 focus:ring-brand-primary/30" placeholder="07123 456789" />
                    </div>
                    <div>
                      <label htmlFor="branch" className="text-[0.85rem] text-gray-700 mb-1.5 block" style={{ fontWeight: 500 }}>Preferred branch</label>
                      <div className="relative">
                        <select id="branch" value={form.branch} onChange={set("branch")} className="w-full appearance-none px-4 py-2.5 pr-9 border border-brand-primary/30 rounded-lg text-[0.9rem] bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/30 cursor-pointer">
                          {branches.map((b) => (
                            <option key={b.id} value={b.id}>{b.shortName}</option>
                          ))}
                        </select>
                        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label htmlFor="message" className="text-[0.85rem] text-gray-700 mb-1.5 block" style={{ fontWeight: 500 }}>Message *</label>
                    <textarea id="message" value={form.message} onChange={set("message")} required rows={5} className="w-full px-4 py-2.5 border border-brand-primary/30 rounded-lg text-[0.9rem] focus:outline-none focus:ring-2 focus:ring-brand-primary/30 resize-none" placeholder="How can we help?" />
                  </div>

                  <button
                    type="submit"
                    disabled={!valid}
                    className="mt-5 inline-flex items-center gap-2 bg-brand-primary text-white px-6 py-3 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-primary/25 transition-all cursor-pointer"
                    style={{ fontWeight: 600 }}
                  >
                    <Send size={16} /> Send message
                  </button>
                  <p className="text-[0.75rem] text-gray-400 mt-3">By sending, you agree to our privacy policy. We'll only use your details to respond to your enquiry.</p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Branches */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-brand-light-alt/40 to-white" />
        <div className="absolute bottom-10 left-1/4 w-[360px] h-[360px] bg-brand-secondary/8 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4">
          <Reveal className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[0.8rem] text-brand-secondary uppercase tracking-widest" style={{ fontWeight: 700 }}>Our branches</span>
            <h2 className="text-[1.8rem] md:text-[2.2rem] text-gray-900 mt-2 mb-3" style={{ fontWeight: 700 }}>Find your nearest Strachans</h2>
            <p className="text-gray-600 text-[1rem] leading-relaxed">Three friendly local pharmacies, each with private consultation rooms and the full range of NHS and private services.</p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {branches.map((loc, i) => (
              <Reveal key={loc.id} delay={i * 0.07}>
                <div className="h-full flex flex-col rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden hover:shadow-xl hover:shadow-brand-primary/10 transition-all">
                  <div className="h-44 bg-brand-light">
                    <iframe
                      src={loc.googleMapsEmbedUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`Map — ${loc.name}`}
                    />
                  </div>
                  <div className="flex flex-col flex-1 p-5">
                    <h3 className="text-[1.05rem] text-gray-900 mb-2" style={{ fontWeight: 700 }}>{loc.shortName}</h3>
                    <ul className="space-y-2 text-[0.85rem] text-gray-600 mb-4">
                      <li className="flex items-start gap-2.5"><MapPin size={15} className="text-brand-accent mt-0.5 shrink-0" /> {loc.address}</li>
                      <li className="flex items-center gap-2.5"><Phone size={15} className="text-brand-accent shrink-0" /> <a href={`tel:${loc.phone.replace(/\s/g, "")}`} className="hover:text-brand-primary transition-colors">{loc.phone}</a></li>
                      <li className="flex items-center gap-2.5"><Mail size={15} className="text-brand-accent shrink-0" /> <a href={`mailto:${loc.email}`} className="hover:text-brand-primary transition-colors break-all">{loc.email}</a></li>
                    </ul>

                    <div className="rounded-lg bg-gradient-to-br from-brand-light to-brand-light-alt p-3 mb-4">
                      {loc.openingHours.map((h) => (
                        <div key={h.day} className="flex justify-between text-[0.8rem]">
                          <span className="text-gray-600">{h.day}</span>
                          <span className="text-brand-primary" style={{ fontWeight: 500 }}>{h.hours}</span>
                        </div>
                      ))}
                    </div>

                    <a
                      href={directionsUrl(loc.address)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex items-center justify-center gap-2 bg-brand-primary text-white px-4 py-2.5 rounded-lg text-[0.85rem] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-primary/25 transition-all no-underline"
                      style={{ fontWeight: 600 }}
                    >
                      <Navigation size={15} /> Get directions
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Footer brand={brand} />
    </div>
  );
}
