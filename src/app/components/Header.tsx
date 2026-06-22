import { Phone, Mail, Clock, MapPin, Menu, X, ChevronRight, Calendar } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router";
import { pharmacyInfo, nhsServices, privateServices } from "../data/services";
import { carefirstBrand, type Brand } from "../branding";

type HeaderProps = {
  /** When provided, replaces "Order Prescription" with a "Book Appointment Now" button
   *  that opens a modal listing these service IDs for direct booking. */
  bookNowServices?: string[];
  /** Brand identity + theme scope. Defaults to CareFirst. */
  brand?: Brand;
};

export function Header({ bookNowServices, brand = carefirstBrand }: HeaderProps = {}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bookOpen, setBookOpen] = useState(false);
  const navigate = useNavigate();

  const allServices = [...nhsServices, ...privateServices];
  const bookableServices = bookNowServices
    ? bookNowServices.map((id) => allServices.find((s) => s.id === id)).filter((s): s is NonNullable<typeof s> => Boolean(s))
    : [];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    else navigate(`${brand.basePath}/#${id}`); // section lives on the landing — go there
    setMobileOpen(false);
  };

  const goTo = (path: string) => {
    navigate(path);
    setMobileOpen(false);
  };

  return (
    <header className="bg-white/80 backdrop-blur-xl sticky top-0 z-50 border-b border-emerald-100/60">
      <div className="max-w-7xl mx-auto px-4">
        {/* Single row layout */}
        <div className="flex items-center justify-between h-[68px]">
          {/* Left: Logo + name + quick info */}
          <div className="flex items-center gap-5">
            <a
              href={brand.basePath || "/"}
              onClick={(e) => { e.preventDefault(); goTo(brand.basePath || "/"); }}
              aria-label={`${brand.name} — home`}
              className="cursor-pointer no-underline shrink-0"
            >
              {brand.logoIsWordmark ? (
                <img src={brand.logo} alt={brand.name} className="h-9 w-auto" />
              ) : (
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden">
                    <img src={brand.logo} alt={brand.name} className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <span className="text-brand-primary text-[1.05rem] block leading-tight" style={{ fontWeight: 700 }}>{brand.name}</span>
                    <span className="text-gray-400 text-[0.7rem] hidden sm:block leading-tight">{brand.tagline}</span>
                  </div>
                </div>
              )}
            </a>

            {/* Divider + quick contact — only for single-location brands (avoids confusion across branches) */}
            {brand.locations.length <= 1 && (
              <div className="hidden lg:flex items-center gap-4 pl-5 border-l border-gray-200 text-[0.78rem] text-gray-500">
                <span className="flex items-center gap-1.5"><Phone size={12} className="text-brand-accent" /> {pharmacyInfo.phone}</span>
                <span className="flex items-center gap-1.5"><Clock size={12} className="text-brand-accent" /> Mon–Fri 8AM–8PM</span>
              </div>
            )}
          </div>

          {/* Center: Nav links */}
          <nav className="hidden md:flex items-center gap-7 text-[0.85rem] text-gray-600">
            <button onClick={() => scrollTo("nhs-services")} className="hover:text-brand-primary transition-colors cursor-pointer" style={{ fontWeight: 500 }}>NHS Services</button>
            <button onClick={() => scrollTo("private-services")} className="hover:text-brand-primary transition-colors cursor-pointer" style={{ fontWeight: 500 }}>Private Services</button>
            {brand.blogPath && (
              <button onClick={() => goTo(brand.blogPath!)} className="hover:text-brand-primary transition-colors cursor-pointer" style={{ fontWeight: 500 }}>Blog</button>
            )}
            {brand.aboutPath && (
              <button onClick={() => goTo(brand.aboutPath!)} className="hover:text-brand-primary transition-colors cursor-pointer" style={{ fontWeight: 500 }}>About</button>
            )}
            {brand.contactPath && (
              <button onClick={() => goTo(brand.contactPath!)} className="hover:text-brand-primary transition-colors cursor-pointer" style={{ fontWeight: 500 }}>Contact</button>
            )}
          </nav>

          {/* Right: CTA */}
          <div className="flex items-center gap-3">
            {bookNowServices ? (
              <button
                onClick={() => setBookOpen(true)}
                className="hidden md:inline-flex items-center gap-1.5 bg-brand-secondary text-white px-5 py-2 rounded-lg text-[0.85rem] hover:shadow-lg hover:shadow-teal-500/25 transition-all cursor-pointer"
                style={{ fontWeight: 600 }}
              >
                <Calendar size={14} /> Book Appointment Now
              </button>
            ) : (
              <a
                href="https://sandbox3.gallezone.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-1.5 bg-brand-secondary text-white px-5 py-2 rounded-lg text-[0.85rem] hover:shadow-lg hover:shadow-teal-500/25 transition-all cursor-pointer no-underline"
                style={{ fontWeight: 600 }}
              >
                Order Prescription
                <ChevronRight size={14} />
              </a>
            )}
            <button className="md:hidden text-gray-600 cursor-pointer" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-1">
          {brand.locations.length <= 1 && (
            <div className="flex items-center gap-4 text-[0.8rem] text-gray-500 pb-3 mb-2 border-b border-gray-100">
              <span className="flex items-center gap-1.5"><Phone size={12} className="text-brand-accent" /> {pharmacyInfo.phone}</span>
              <span className="flex items-center gap-1.5"><Clock size={12} className="text-brand-accent" /> Mon–Fri 8–8</span>
            </div>
          )}
          {[
            { label: "NHS Services", target: "nhs-services" },
            { label: "Private Services", target: "private-services" },
          ].map((item) => (
            <button
              key={item.target}
              onClick={() => scrollTo(item.target)}
              className="flex items-center justify-between w-full py-2.5 text-gray-700 text-[0.9rem] cursor-pointer"
              style={{ fontWeight: 500 }}
            >
              {item.label}
              <ChevronRight size={16} className="text-gray-400" />
            </button>
          ))}
          {brand.blogPath && (
            <button
              onClick={() => goTo(brand.blogPath!)}
              className="flex items-center justify-between w-full py-2.5 text-gray-700 text-[0.9rem] cursor-pointer"
              style={{ fontWeight: 500 }}
            >
              Blog
              <ChevronRight size={16} className="text-gray-400" />
            </button>
          )}
          {brand.aboutPath && (
            <button
              onClick={() => goTo(brand.aboutPath!)}
              className="flex items-center justify-between w-full py-2.5 text-gray-700 text-[0.9rem] cursor-pointer"
              style={{ fontWeight: 500 }}
            >
              About
              <ChevronRight size={16} className="text-gray-400" />
            </button>
          )}
          {brand.contactPath && (
            <button
              onClick={() => goTo(brand.contactPath!)}
              className="flex items-center justify-between w-full py-2.5 text-gray-700 text-[0.9rem] cursor-pointer"
              style={{ fontWeight: 500 }}
            >
              Contact
              <ChevronRight size={16} className="text-gray-400" />
            </button>
          )}
          {bookNowServices ? (
            <button
              onClick={() => { setMobileOpen(false); setBookOpen(true); }}
              className="w-full bg-brand-secondary text-white py-2.5 rounded-lg text-center text-[0.9rem] mt-2 cursor-pointer flex items-center justify-center gap-1.5"
              style={{ fontWeight: 600 }}
            >
              <Calendar size={14} /> Book Appointment Now
            </button>
          ) : (
            <a
              href="https://sandbox3.gallezone.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-brand-secondary text-white py-2.5 rounded-lg text-center text-[0.9rem] mt-2 cursor-pointer no-underline"
              style={{ fontWeight: 600 }}
            >
              Order Prescription
            </a>
          )}
        </div>
      )}

      {/* Book Appointment Now — service picker modal (portaled so sticky header's backdrop-filter doesn't trap it) */}
      {bookOpen && createPortal(
        <div className={`fixed inset-0 z-[60] flex items-start sm:items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm overflow-y-auto ${brand.themeClass}`} onClick={() => setBookOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8 overflow-hidden">
            <div className="flex items-start justify-between p-5 border-b border-gray-100">
              <div>
                <h3 className="text-[1.1rem] text-gray-900" style={{ fontWeight: 700 }}>Book an appointment</h3>
                <p className="text-[0.85rem] text-gray-500 mt-0.5">Pick a service to continue</p>
              </div>
              <button onClick={() => setBookOpen(false)} className="text-gray-400 hover:text-gray-600 cursor-pointer p-1" aria-label="Close">
                <X size={20} />
              </button>
            </div>
            <div className="p-4 max-h-[70vh] overflow-y-auto">
              <div className="grid gap-2">
                {bookableServices.map((s) => {
                  const isNHS = s.id.startsWith("nhs-");
                  return (
                    <button
                      key={s.id}
                      onClick={() => { setBookOpen(false); navigate(`${brand.basePath}/book/${s.id}`); }}
                      className="group text-left flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-brand-primary/40 hover:bg-brand-light/30 transition-colors cursor-pointer"
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${isNHS ? "bg-brand-primary/10 text-brand-primary" : "bg-brand-secondary/10 text-brand-secondary"}`}>
                        <Calendar size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[0.92rem] text-gray-900 truncate" style={{ fontWeight: 600 }}>{s.name}</p>
                        <p className="text-[0.78rem] text-gray-500 truncate">{isNHS ? "Free (NHS)" : s.price ? s.price.replace(/From (\d)/, "From £$1") : "Private"}</p>
                      </div>
                      <ChevronRight size={16} className="text-gray-400 group-hover:text-brand-primary shrink-0" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
}