import { useEffect, useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, Navigation, Facebook, Instagram, Linkedin } from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Reveal } from "../components/Reveal";
import { centralBrand } from "../branding";
import { useOpenStatus } from "../openStatus";
import { useSeo, JsonLd, pharmacyGraph } from "../seo";

const AREA = ["New Quay", "Ceredigion", "Cardigan Bay", "Wales"];
const directionsUrl = (address: string) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;

const SOCIALS = [
  { Icon: Facebook, label: "Facebook" },
  { Icon: Instagram, label: "Instagram" },
  { Icon: Linkedin, label: "LinkedIn" },
];

export function ContactPageCentralAlt() {
  const brand = centralBrand;
  const branch = brand.locations[0];
  const status = useOpenStatus(branch);

  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  useSeo({
    title: "Contact Central Pharmacy | New Quay, SA45 9NX",
    description: "Get in touch with Central Pharmacy on Church Street, New Quay. Phone, email, opening hours and directions — or fill the form to contact us.",
    path: `${brand.basePath}/contact`,
    favicon: brand.favicon,
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });
  const valid = form.name && form.email && form.message;

  const inputClass =
    "w-full px-4 min-h-[50px] border border-[#CDEBEF] rounded-xl text-[0.95rem] bg-[#FAFEFE] focus:outline-none focus:ring-2 focus:ring-brand-primary/40 focus:bg-white transition-colors";

  return (
    <div className={`min-h-screen bg-white ${brand.themeClass}`}>
      <JsonLd data={pharmacyGraph(brand, AREA, { addressRegion: "Ceredigion" })} />
      <Header brand={brand} />

      {/* ── Split screen ── */}
      <section className="grid lg:grid-cols-2 items-stretch">
        {/* Left — brand panel (dark enough for AA white text throughout) */}
        <div
          className="relative overflow-hidden px-6 sm:px-10 lg:px-14 py-14 lg:py-20 flex"
          style={{ background: "linear-gradient(160deg, #05191c 0%, #0a3238 60%, #0c3a41 100%)" }}
        >
          {/* Soft depth accents (neutral, not tinted) */}
          <div aria-hidden="true" className="absolute -top-16 -right-10 w-72 h-72 rounded-full blur-3xl" style={{ background: "rgba(255,255,255,0.06)" }} />
          <div aria-hidden="true" className="absolute bottom-0 -left-16 w-80 h-80 rounded-full blur-3xl" style={{ background: "rgba(255,255,255,0.05)" }} />

          <Reveal className="relative w-full max-w-md lg:ml-auto self-center">
            <span className="inline-flex items-center gap-2 text-[0.74rem] tracking-[0.16em] uppercase text-brand-accent mb-4" style={{ fontWeight: 700 }}>
              <span className="w-6 h-px bg-brand-accent" /> Get in touch
            </span>
            <h1 className="font-display text-white text-[2.3rem] lg:text-[3rem] leading-[1.06] mb-4" style={{ fontWeight: 700, letterSpacing: "-0.02em" }}>
              We're here to help.
            </h1>
            <p className="text-white/80 text-[1.05rem] leading-relaxed mb-9">
              Fill the form to contact us, or reach the pharmacy directly — we're open Monday to Friday on Church Street.
            </p>

            <ul className="space-y-5 mb-9">
              <li className="flex items-start gap-3.5">
                <span className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0"><Phone size={18} className="text-white" /></span>
                <div>
                  <p className="text-[0.76rem] uppercase tracking-wide text-white/55" style={{ fontWeight: 600 }}>Call us</p>
                  <a href={`tel:${branch.phone.replace(/\s/g, "")}`} className="text-white text-[1rem] hover:text-brand-accent transition-colors" style={{ fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>{branch.phone}</a>
                </div>
              </li>
              <li className="flex items-start gap-3.5">
                <span className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0"><Mail size={18} className="text-white" /></span>
                <div className="min-w-0">
                  <p className="text-[0.76rem] uppercase tracking-wide text-white/55" style={{ fontWeight: 600 }}>Email us</p>
                  <a href={`mailto:${branch.email}`} className="text-white text-[1rem] hover:text-brand-accent transition-colors break-all" style={{ fontWeight: 600 }}>{branch.email}</a>
                </div>
              </li>
              <li className="flex items-start gap-3.5">
                <span className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0"><MapPin size={18} className="text-white" /></span>
                <div>
                  <p className="text-[0.76rem] uppercase tracking-wide text-white/55" style={{ fontWeight: 600 }}>Visit us</p>
                  <p className="text-white text-[1rem]" style={{ fontWeight: 600 }}>{branch.address}</p>
                </div>
              </li>
              <li className="flex items-start gap-3.5">
                <span className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0"><Clock size={18} className="text-white" /></span>
                <div>
                  <p className="text-[0.76rem] uppercase tracking-wide text-white/55" style={{ fontWeight: 600 }}>Opening hours</p>
                  <div className="mt-0.5 space-y-0.5">
                    {branch.openingHours.map((h) => (
                      <div key={h.day} className="flex justify-between gap-6 text-[0.9rem]">
                        <span className="text-white/70">{h.day}</span>
                        <span className="text-white" style={{ fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>{h.hours}</span>
                      </div>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1.5 mt-2 text-[0.82rem] text-white/80">
                    <span className={`w-2 h-2 rounded-full ${status.open ? "bg-brand-accent" : "bg-amber-400"}`} /> {status.label}{status.detail ? ` · ${status.detail}` : ""}
                  </span>
                </div>
              </li>
            </ul>

            {/* Socials */}
            <div className="flex items-center gap-2.5">
              {SOCIALS.map(({ Icon, label }) => (
                <a key={label} href="#" aria-label={label} className="w-10 h-10 rounded-full bg-white/10 border border-white/15 hover:bg-white hover:text-brand-primary text-white flex items-center justify-center transition-colors">
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Right — form */}
        <div className="px-6 sm:px-10 lg:px-14 py-14 lg:py-20 flex bg-white">
          <Reveal className="w-full max-w-md lg:mr-auto self-center">
            {submitted ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 rounded-full bg-brand-secondary/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} className="text-brand-secondary" />
                </div>
                <h2 className="font-display text-[1.5rem] text-[#0A3238] mb-2" style={{ fontWeight: 700 }}>Message sent!</h2>
                <p className="text-[#4A6A6F] text-[0.95rem] max-w-sm mx-auto mb-6">
                  Thanks {form.name.split(" ")[0] || "there"} — we've received your message and will get back to you as soon as we can.
                </p>
                <button onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", email: "", message: "" }); }} className="inline-flex items-center gap-2 text-brand-primary hover:underline cursor-pointer" style={{ fontWeight: 600 }}>
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                <h2 className="font-display text-[1.5rem] text-[#0A3238] mb-1.5" style={{ fontWeight: 700, letterSpacing: "-0.01em" }}>Send us a message</h2>
                <p className="text-[#4A6A6F] text-[0.92rem] mb-6">Fill the form to contact us and we'll be in touch.</p>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="text-[0.85rem] text-[#0A3238] mb-1.5 block" style={{ fontWeight: 500 }}>Full name *</label>
                    <input id="name" value={form.name} onChange={set("name")} required className={inputClass} placeholder="Jane Doe" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="text-[0.85rem] text-[#0A3238] mb-1.5 block" style={{ fontWeight: 500 }}>Phone <span className="text-[#7A9498]">(optional)</span></label>
                    <input id="phone" value={form.phone} onChange={set("phone")} className={inputClass} placeholder="07123 456789" />
                  </div>
                  <div>
                    <label htmlFor="email" className="text-[0.85rem] text-[#0A3238] mb-1.5 block" style={{ fontWeight: 500 }}>Email *</label>
                    <input id="email" type="email" value={form.email} onChange={set("email")} required className={inputClass} placeholder="you@example.com" />
                  </div>
                  <div>
                    <label htmlFor="message" className="text-[0.85rem] text-[#0A3238] mb-1.5 block" style={{ fontWeight: 500 }}>Message *</label>
                    <textarea id="message" value={form.message} onChange={set("message")} required rows={5} className={`${inputClass} py-3 min-h-[130px] resize-none`} placeholder="How can we help?" />
                  </div>
                </div>

                <button type="submit" disabled={!valid} className="cp-btn-gradient mt-6 w-full inline-flex items-center justify-center gap-2 text-white min-h-[52px] rounded-xl disabled:cursor-not-allowed transition-all cursor-pointer" style={{ fontWeight: 600 }}>
                  <Send size={16} /> Submit
                </button>
                <p className="text-[0.75rem] text-[#7A9498] mt-3">By sending, you agree to our privacy policy. We'll only use your details to respond to your enquiry.</p>
              </form>
            )}
          </Reveal>
        </div>
      </section>

      {/* ── Full-width map band ── */}
      <section className="relative">
        <div className="h-[340px] sm:h-[420px] bg-[#E2F6F9]">
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
        {/* Floating directions card */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-6 w-[min(92%,34rem)]">
          <div className="rounded-2xl bg-white shadow-xl border border-[#CDEBEF] px-5 py-4 flex items-center justify-between gap-4">
            <p className="flex items-center gap-2 text-[0.9rem] text-[#0A3238] min-w-0" style={{ fontWeight: 600 }}>
              <MapPin size={16} className="text-brand-accent shrink-0" /> <span className="truncate">Church Street, New Quay · SA45 9NX</span>
            </p>
            <a href={directionsUrl(branch.address)} target="_blank" rel="noopener noreferrer" className="cp-btn-gradient inline-flex items-center gap-1.5 text-white px-4 min-h-[42px] rounded-lg text-[0.85rem] no-underline shrink-0" style={{ fontWeight: 600 }}>
              <Navigation size={15} /> Directions
            </a>
          </div>
        </div>
      </section>

      <Footer brand={brand} />
    </div>
  );
}
