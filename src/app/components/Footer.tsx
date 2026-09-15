import { useNavigate } from "react-router";
import { Facebook, Instagram, Twitter, MapPin, Phone } from "lucide-react";
import { carefirstBrand, homePath, type Brand } from "../branding";
import { FooterHealthCheck } from "./FooterHealthCheck";
import { GphcBadge } from "./GphcBadge";
import nhsBadge from "../../assets/Providing NHS Services RGB BLUE 2.svg";

const LEGAL_LINKS = [
  "Privacy Policy",
  "Terms & Conditions",
  "Cookie Policy",
  "Complaints Procedure",
  "Accessibility Statement",
];

/** A small white-on-dark regulatory line built from the brand's legal details. */
function RegulatoryLine({ brand }: { brand: Brand }) {
  if (!brand.legal) return null;
  return (
    <p className="text-white/40 text-[0.74rem] md:text-right max-w-2xl leading-relaxed">
      Superintendent Pharmacist: {brand.legal.superintendent} · GPhC Reg. No. {brand.legal.gphcNumber}. {brand.legal.companyName} is registered in England &amp; Wales (Company No. {brand.legal.companyNumber}). All services are provided by qualified, GPhC-registered pharmacists.
    </p>
  );
}

/**
 * Footer.
 *  - "full" (default) — marketing footer for landing/about/blog/contact.
 *  - "compact" — slim strip for transactional pages (booking, questionnaire):
 *    keeps the legal links + regulatory line + an exit, without the marketing weight.
 */
export function Footer({ brand = carefirstBrand, variant = "full" }: { brand?: Brand; variant?: "full" | "compact" } = {}) {
  const navigate = useNavigate();
  const year = new Date().getFullYear();
  const multiBranch = brand.locations.length > 1;

  // HealthCheck uses a bespoke full-footer layout (coloured logo mark, contact card).
  if (variant === "full" && brand.id === "healthcheck") {
    return <FooterHealthCheck brand={brand} />;
  }

  if (variant === "compact") {
    return (
      <footer className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-darkest via-brand-dark to-brand-primary" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            {/* Brand + trust */}
            <div className="flex items-center gap-2.5 flex-wrap">
              {brand.logoIsWordmark ? (
                brand.footerLogo
                  ? <img src={brand.footerLogo} alt={brand.name} className="h-11 w-auto" style={{ filter: "brightness(0) invert(0.92)" }} />
                  : <img src={brand.logo} alt={brand.name} className="h-7 w-auto brightness-0 invert" />
              ) : (
                <span className="text-white text-[0.98rem]" style={{ fontWeight: 700 }}>{brand.name}</span>
              )}
              <span className="inline-flex items-center bg-white rounded-md px-2 py-1"><img src={nhsBadge} alt="Providing NHS Services" className="h-4 w-auto" /></span>
              {/* GPhC badge is location-specific — shown here only for single-branch brands.
                  Height matches the NHS pill (h-4 img + py-1 ≈ h-6). */}
              {!multiBranch && <GphcBadge location={brand.locations[0]} className="h-6" />}
            </div>

            {/* Legal + exit links */}
            <nav aria-label="Legal" className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <button onClick={() => navigate(homePath(brand))} className="text-white/70 hover:text-white text-[0.82rem] transition-colors cursor-pointer">Home</button>
              {brand.contactPath && (
                <button onClick={() => navigate(brand.contactPath!)} className="text-white/70 hover:text-white text-[0.82rem] transition-colors cursor-pointer">Contact</button>
              )}
              {LEGAL_LINKS.map((l) => (
                <a key={l} href="#" className="text-white/70 hover:text-white text-[0.82rem] transition-colors">{l}</a>
              ))}
            </nav>
          </div>

          <div className="border-t border-white/10 mt-6 pt-5 flex flex-col md:flex-row md:items-start justify-between gap-2">
            <p className="text-white/40 text-[0.76rem]">© {year} {brand.name}. All rights reserved.</p>
            <RegulatoryLine brand={brand} />
          </div>
        </div>
      </footer>
    );
  }

  // Section anchors live on the landing — scroll if present, otherwise navigate there.
  const goSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    else navigate(`${brand.basePath}/#${id}`);
  };

  const explore: { label: string; onClick: () => void }[] = [
    { label: "NHS Services", onClick: () => goSection("nhs-services") },
    { label: "Private Services", onClick: () => goSection("private-services") },
    ...(brand.blogPath ? [{ label: "Blog", onClick: () => navigate(brand.blogPath!) }] : []),
    ...(brand.aboutPath ? [{ label: "About us", onClick: () => navigate(brand.aboutPath!) }] : []),
    { label: "Contact", onClick: () => (brand.contactPath ? navigate(brand.contactPath) : goSection("contact")) },
  ];

  return (
    <footer className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-darkest via-brand-dark to-brand-primary" />
      <div className="absolute top-0 right-0 w-[320px] h-[320px] bg-brand-secondary/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Top */}
        <div className="py-12 grid gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand + trust */}
          <div className="lg:col-span-4">
            {brand.logoIsWordmark ? (
              brand.footerLogo
                ? <img src={brand.footerLogo} alt={brand.name} className="h-16 w-auto mb-4" style={{ filter: "brightness(0) invert(0.92)" }} />
                : <img src={brand.logo} alt={brand.name} className="h-8 w-auto brightness-0 invert mb-4" />
            ) : (
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-lg overflow-hidden">
                  <img src={brand.logo} alt={brand.name} className="w-full h-full object-contain brightness-0 invert" />
                </div>
                <span className="text-white text-[1.05rem]" style={{ fontWeight: 700 }}>{brand.name}</span>
              </div>
            )}
            <p className="text-white/60 text-[0.88rem] leading-relaxed max-w-xs mb-5">
              Your neighbourhood health &amp; wellness partner — NHS and private clinical services delivered by trained pharmacists.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-2.5 mb-5">
              <span className="inline-flex items-center bg-white rounded-md px-2 py-1">
                <img src={nhsBadge} alt="Providing NHS Services" className="h-5 w-auto" />
              </span>
              {/* GPhC badge is location-specific — for multi-branch groups it's shown under
                  each branch below, not here. Height matches the NHS pill (h-5 img + py-1 ≈ h-7). */}
              {!multiBranch && <GphcBadge location={brand.locations[0]} className="h-7" />}
            </div>

            {/* Social */}
            <div className="flex items-center gap-2">
              {[
                { Icon: Facebook, label: "Facebook" },
                { Icon: Instagram, label: "Instagram" },
                { Icon: Twitter, label: "X (Twitter)" },
              ].map(({ Icon, label }) => (
                <a key={label} href="#" aria-label={label} className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <nav className="lg:col-span-2" aria-label="Footer">
            <h4 className="text-white text-[0.8rem] uppercase tracking-wider mb-4" style={{ fontWeight: 700 }}>Explore</h4>
            <ul className="space-y-2.5">
              {explore.map((l) => (
                <li key={l.label}>
                  <button onClick={l.onClick} className="text-white/60 hover:text-white text-[0.88rem] transition-colors cursor-pointer text-left">{l.label}</button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal */}
          <nav className="lg:col-span-3" aria-label="Legal">
            <h4 className="text-white text-[0.8rem] uppercase tracking-wider mb-4" style={{ fontWeight: 700 }}>Legal &amp; policies</h4>
            <ul className="space-y-2.5">
              {LEGAL_LINKS.map((l) => (
                <li key={l}>
                  <a href="#" className="text-white/60 hover:text-white text-[0.88rem] transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Branches */}
          <div className="lg:col-span-3">
            <h4 className="text-white text-[0.8rem] uppercase tracking-wider mb-4" style={{ fontWeight: 700 }}>{multiBranch ? "Our branches" : "Visit us"}</h4>
            <ul className="space-y-3.5">
              {brand.locations.map((loc) => (
                <li key={loc.id} className="text-white/60 text-[0.84rem] leading-relaxed">
                  {multiBranch && <p className="text-white/90" style={{ fontWeight: 600 }}>{loc.shortName}</p>}
                  <p className="flex items-start gap-1.5"><MapPin size={13} className="mt-0.5 shrink-0 text-brand-accent" /> {loc.address}</p>
                  <a href={`tel:${loc.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-1.5 mt-0.5 hover:text-white transition-colors">
                    <Phone size={12} className="text-brand-accent" /> {loc.phone}
                  </a>
                  {/* Per-branch GPhC badge (multi-branch groups only). */}
                  {multiBranch && <div className="mt-2"><GphcBadge location={loc} className="h-7" /></div>}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Regulatory bar */}
        <div className="border-t border-white/10 py-6 flex flex-col md:flex-row md:items-start justify-between gap-3">
          <p className="text-white/40 text-[0.76rem]">© {year} {brand.name}. All rights reserved.</p>
          <RegulatoryLine brand={brand} />
        </div>
      </div>
    </footer>
  );
}
