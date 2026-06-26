import { useState } from "react";
import { useNavigate } from "react-router";
import { Menu, X, ArrowRight } from "lucide-react";
import type { Brand } from "../branding";
import { useOpenStatus } from "../openStatus";
import { ServicesModal } from "./ServicesModal";

type Props = {
  brand: Brand;
  /** Provided on the landing page so section links smooth-scroll instead of routing. */
  onSection?: (id: string) => void;
};

/** Shared sticky header for every iCare page — keeps nav + branding consistent. */
export function HeaderICare({ brand, onSection }: Props) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [booking, setBooking] = useState(false);
  const status = useOpenStatus(brand.locations[0]);

  const openBooking = () => { setOpen(false); setBooking(true); };

  const section = (id: string) => {
    setOpen(false);
    if (onSection) onSection(id);
    else navigate(`${brand.basePath}#${id}`);
  };
  const go = (path: string) => { setOpen(false); navigate(path); };

  const links = [
    { label: "Services", onClick: () => section("nhs") },
    { label: "Private", onClick: () => section("private") },
    { label: "About", onClick: () => go(brand.aboutPath!) },
    { label: "Contact", onClick: () => go(brand.contactPath!) },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl border-b" style={{ backgroundColor: "rgba(234,242,237,0.82)", borderColor: "var(--icare-line)" }}>
      <div className="max-w-7xl mx-auto px-5 h-[80px] flex items-center justify-between gap-4">
        <a href={brand.basePath} onClick={(e) => { e.preventDefault(); go(brand.basePath); }} aria-label={`${brand.name} — home`} className="flex items-center no-underline shrink-0">
          <img src={brand.logo} alt={brand.name} className="h-9 sm:h-10 w-auto" />
        </a>

        <nav className="hidden md:flex items-center gap-8 text-[0.9rem] text-brand-primary/70">
          {links.map((l) => (
            <button key={l.label} onClick={l.onClick} className="hover:text-brand-primary transition-colors cursor-pointer" style={{ fontWeight: 500 }}>{l.label}</button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Live open/closed status */}
          <span className="hidden lg:inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[0.78rem] border" style={{ borderColor: "var(--icare-line)", backgroundColor: "rgba(255,255,255,0.6)", fontWeight: 600 }}>
            <span className="relative flex h-2 w-2">
              {status.open && <span className="absolute inline-flex h-full w-full rounded-full bg-brand-secondary opacity-75 animate-ping" />}
              <span className={`relative inline-flex rounded-full h-2 w-2 ${status.open ? "bg-brand-secondary" : "bg-amber-400"}`} />
            </span>
            <span className={status.open ? "text-brand-green-ink" : "text-brand-primary/60"}>{status.label}</span>
          </span>
          <button onClick={openBooking} className="cta cta-primary hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-[0.88rem] cursor-pointer" style={{ fontWeight: 600 }}>
            Book now <ArrowRight size={15} />
          </button>
          <button className="md:hidden text-brand-primary cursor-pointer p-1" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t px-5 py-4 space-y-1" style={{ borderColor: "var(--icare-line)", backgroundColor: "var(--icare-paper)" }}>
          {links.map((l) => (
            <button key={l.label} onClick={l.onClick} className="flex items-center justify-between w-full py-2.5 text-brand-primary/80 text-[0.95rem] cursor-pointer" style={{ fontWeight: 500 }}>
              {l.label} <ArrowRight size={16} className="text-brand-primary/30" />
            </button>
          ))}
          <button onClick={openBooking} className="cta cta-primary w-full mt-2 inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-full text-[0.9rem] cursor-pointer" style={{ fontWeight: 600 }}>
            Book now <ArrowRight size={15} />
          </button>
        </div>
      )}

      <ServicesModal brand={brand} open={booking} onClose={() => setBooking(false)} />
    </header>
  );
}
