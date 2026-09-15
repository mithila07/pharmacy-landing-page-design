import { useNavigate } from "react-router";
import { MapPin, Phone, Envelope, Clock, FacebookLogo, InstagramLogo, XLogo, IconContext } from "@phosphor-icons/react";
import { homePath, type Brand } from "../branding";
import { GphcBadge } from "./GphcBadge";
import nhsBadge from "../../assets/Providing NHS Services RGB BLUE 2.svg";
import logoMark from "../../assets/health-check logo mark.svg";

const LEGAL_LINKS = [
  "Privacy Policy",
  "Terms & Conditions",
  "Cookie Policy",
  "Complaints Procedure",
  "Accessibility Statement",
];

/**
 * HealthCheck footer — a deliberately different layout from the shared one:
 * a brand lockup that keeps the COLOURED logo mark (on a white badge, never
 * inverted) paired with a floating "Visit us" contact card, then a single
 * horizontal link/legal bar above the regulatory line. Dark navy → blue.
 */
export function FooterHealthCheck({ brand }: { brand: Brand }) {
  const navigate = useNavigate();
  const year = new Date().getFullYear();
  const branch = brand.locations[0];

  const goSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    else navigate(`${brand.basePath}/#${id}`);
  };

  const explore: { label: string; onClick: () => void }[] = [
    { label: "NHS Services", onClick: () => goSection("nhs-services") },
    { label: "Private Clinics", onClick: () => goSection("private-services") },
    { label: "Reviews", onClick: () => goSection("reviews") },
    ...(brand.aboutPath ? [{ label: "About us", onClick: () => navigate(brand.aboutPath!) }] : []),
    ...(brand.contactPath ? [{ label: "Contact", onClick: () => navigate(brand.contactPath!) }] : []),
  ];

  return (
    <IconContext.Provider value={{ weight: "duotone" }}>
    <footer className="relative overflow-hidden bg-[#001339]">
      {/* Signature swoosh seam */}
      <div aria-hidden="true" className="hc-swoosh-bar h-1.5 w-full" />
      <div aria-hidden="true" className="absolute -bottom-32 -left-24 w-[34rem] h-[34rem] rounded-full bg-brand-primary/15 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Top: brand lockup (left) + contact card (right) */}
        <div className="py-14 grid lg:grid-cols-[1.25fr_1fr] gap-10 lg:gap-16 items-start">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3.5 mb-5">
              {/* Coloured logo mark on a white badge — NOT inverted */}
              <span className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-lg shrink-0">
                <img src={logoMark} alt={brand.name} className="w-9 h-auto" />
              </span>
              <div className="leading-tight">
                <p className="text-white text-[1.15rem]" style={{ fontWeight: 700 }}>Health-Check</p>
                <p className="text-brand-accent text-[0.82rem]" style={{ fontWeight: 600 }}>{brand.tagline}</p>
              </div>
            </div>

            <p className="text-white/60 text-[0.92rem] leading-relaxed max-w-md mb-6">
              Your neighbourhood pharmacy &amp; health clinic on Great Horton Road, Bradford —
              NHS Pharmacy First and private clinics delivered by qualified, friendly clinicians.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-2.5 mb-6">
              <span className="inline-flex items-center bg-white rounded-md px-2 py-1.5">
                <img src={nhsBadge} alt="Providing NHS Services" className="h-5 w-auto" />
              </span>
              {/* Height matches the NHS pill (h-5 img + py-1.5 ≈ h-8). */}
              <GphcBadge location={branch} className="h-8" />
            </div>

            {/* Social */}
            <div className="flex items-center gap-2">
              {[
                { Icon: FacebookLogo, label: "Facebook" },
                { Icon: InstagramLogo, label: "Instagram" },
                { Icon: XLogo, label: "X (Twitter)" },
              ].map(({ Icon, label }) => (
                <a key={label} href="#" aria-label={label} className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-secondary flex items-center justify-center text-white/80 hover:text-white transition-colors">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Floating contact card */}
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-sm p-6">
            <p className="text-white text-[0.8rem] uppercase tracking-wider mb-4" style={{ fontWeight: 700 }}>Visit the pharmacy</p>
            <ul className="space-y-3 text-[0.88rem] text-white/70">
              <li className="flex items-start gap-2.5"><MapPin size={15} className="mt-0.5 shrink-0 text-brand-accent" /> {branch.address}</li>
              <li className="flex items-center gap-2.5"><Phone size={14} className="shrink-0 text-brand-accent" /> <a href={`tel:${branch.phone.replace(/\s/g, "")}`} className="hover:text-white transition-colors" style={{ fontVariantNumeric: "tabular-nums" }}>{branch.phone}</a></li>
              <li className="flex items-center gap-2.5"><Envelope size={14} className="shrink-0 text-brand-accent" /> <a href={`mailto:${branch.email}`} className="hover:text-white transition-colors break-all">{branch.email}</a></li>
            </ul>

            <div className="border-t border-white/10 mt-4 pt-4">
              <p className="flex items-center gap-2 text-white/80 text-[0.78rem] uppercase tracking-wider mb-2.5" style={{ fontWeight: 700 }}><Clock size={13} className="text-brand-accent" /> Opening hours</p>
              {branch.openingHours.map((h) => (
                <div key={h.day} className="flex justify-between text-[0.83rem] py-0.5">
                  <span className="text-white/55">{h.day}</span>
                  <span className="text-white/85" style={{ fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>{h.hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Horizontal link + legal bar */}
        <div className="border-t border-white/10 py-6 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <button onClick={() => navigate(homePath(brand))} className="text-white/70 hover:text-white text-[0.86rem] transition-colors cursor-pointer" style={{ fontWeight: 600 }}>Home</button>
            {explore.map((l) => (
              <button key={l.label} onClick={l.onClick} className="text-white/70 hover:text-white text-[0.86rem] transition-colors cursor-pointer">{l.label}</button>
            ))}
          </nav>
          <nav aria-label="Legal" className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {LEGAL_LINKS.map((l) => (
              <a key={l} href="#" className="text-white/45 hover:text-white/80 text-[0.78rem] transition-colors">{l}</a>
            ))}
          </nav>
        </div>

        {/* Regulatory bar */}
        <div className="border-t border-white/10 py-6 flex flex-col md:flex-row md:items-start justify-between gap-3">
          <p className="text-white/40 text-[0.76rem]">© {year} {brand.name}. All rights reserved.</p>
          {brand.legal && (
            <p className="text-white/40 text-[0.74rem] md:text-right max-w-2xl leading-relaxed">
              Superintendent Pharmacist: {brand.legal.superintendent} · GPhC Reg. No. {brand.legal.gphcNumber}. {brand.legal.companyName} is registered in England &amp; Wales (Company No. {brand.legal.companyNumber}). All services are provided by qualified, GPhC-registered pharmacists.
            </p>
          )}
        </div>
      </div>
    </footer>
    </IconContext.Provider>
  );
}
