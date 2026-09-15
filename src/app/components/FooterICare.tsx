import { useNavigate } from "react-router";
import { MapPin, Phone, Envelope, Clock } from "@phosphor-icons/react";
import type { Brand } from "../branding";
import { GRAD_INK } from "./icareUi";
import { GphcBadge } from "./GphcBadge";

/** Shared footer for every iCare page. */
export function FooterICare({ brand }: { brand: Brand }) {
  const navigate = useNavigate();
  const branch = brand.locations[0];

  const nav = [
    { label: "Services", href: `${brand.basePath}#nhs` },
    { label: "Private clinics", href: `${brand.basePath}#private` },
    { label: "About", href: brand.aboutPath! },
    { label: "Contact", href: brand.contactPath! },
  ];

  return (
    <footer className="relative overflow-hidden text-white/70" style={{ background: GRAD_INK }}>
      <div className="relative z-10 max-w-7xl mx-auto px-5 py-14 grid gap-10 md:grid-cols-[1.4fr_1fr_1.2fr]">
        {/* Brand */}
        <div>
          <span className="bg-white rounded-xl px-3.5 py-2.5 inline-flex"><img src={brand.logo} alt={brand.name} className="h-7 w-auto" /></span>
          <p className="mt-5 text-[0.92rem] leading-relaxed max-w-xs text-white/55">
            {brand.tagline}. NHS &amp; private pharmacy services in the heart of Ealing, West London.
          </p>
          <div className="mt-5"><GphcBadge location={branch} className="h-12" /></div>
        </div>

        {/* Links */}
        <div>
          <p className="text-white text-[0.82rem] uppercase tracking-[0.16em] mb-4" style={{ fontWeight: 600 }}>Explore</p>
          <ul className="space-y-2.5 text-[0.92rem]">
            {nav.map((l) => (
              <li key={l.label}>
                <a href={l.href} onClick={(e) => { e.preventDefault(); navigate(l.href); }} className="hover:text-white transition-colors cursor-pointer">{l.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="text-white text-[0.82rem] uppercase tracking-[0.16em] mb-4" style={{ fontWeight: 600 }}>Visit us</p>
          <ul className="space-y-3 text-[0.92rem]">
            <li className="flex items-start gap-2.5"><MapPin size={17} weight="fill" className="text-brand-secondary mt-0.5 shrink-0" /> {branch.address}</li>
            <li className="flex items-center gap-2.5"><Phone size={16} weight="fill" className="text-brand-secondary shrink-0" /> <a href={`tel:${branch.phone.replace(/\s/g, "")}`} className="hover:text-white transition-colors">{branch.phone}</a></li>
            <li className="flex items-center gap-2.5"><Envelope size={16} weight="fill" className="text-brand-secondary shrink-0" /> <a href={`mailto:${branch.email}`} className="hover:text-white transition-colors break-all">{branch.email}</a></li>
            <li className="flex items-start gap-2.5"><Clock size={16} weight="fill" className="text-brand-secondary mt-0.5 shrink-0" /> Mon–Fri 9am–6pm</li>
          </ul>
        </div>
      </div>

      <div className="relative z-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-5 py-5 flex flex-col md:flex-row md:items-center justify-between gap-2 text-[0.74rem] text-white/40">
          <p>© {new Date().getFullYear()} {brand.legal?.companyName}. All rights reserved.</p>
          <p>Superintendent Pharmacist: {brand.legal?.superintendent} · GPhC Reg. No. {brand.legal?.gphcNumber}.</p>
        </div>
      </div>
    </footer>
  );
}
