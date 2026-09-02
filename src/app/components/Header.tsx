import { Phone, Mail, Clock, MapPin, Menu, X, ChevronRight, ChevronDown, Calendar } from "lucide-react";
import { Calendar as PhCalendar } from "@phosphor-icons/react";
import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLocation, useNavigate } from "react-router";
import { pharmacyInfo, nhsServices, privateServices } from "../data/services";
import { carefirstBrand, type Brand } from "../branding";

type HeaderProps = {
  /** Service IDs offered in the "Book Appointment Now" picker modal. The landing
   *  passes its own featured list; other pages fall back to DEFAULT_BOOK_SERVICES
   *  so every page shows the same booking CTA. */
  bookNowServices?: string[];
  /** Brand identity + theme scope. Defaults to CareFirst. */
  brand?: Brand;
};

/** Fallback booking menu for pages that don't pass their own list (About, Contact, etc.):
 *  the 7 NHS Pharmacy First conditions plus the most-requested private clinics. */
const DEFAULT_BOOK_SERVICES = [
  "nhs-pf-sinusitis", "nhs-pf-sore-throat", "nhs-pf-earache", "nhs-pf-insect-bite",
  "nhs-pf-impetigo", "nhs-pf-shingles", "nhs-pf-uti",
  "prv-travel-consult", "prv-ear-wax", "prv-weight-consult", "prv-flu-private",
];

export function Header({ bookNowServices, brand = carefirstBrand }: HeaderProps = {}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bookOpen, setBookOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  // Small close delay so the pointer can cross the gap into the panel.
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isHC = brand.id === "healthcheck";
  /** Active-link styling is opt-in per brand (currently Kepple Lane only). */
  const showsActive = brand.id === "kepplelane";
  const isActive = (path: string) => showsActive && pathname.replace(/\/+$/, "") === path.replace(/\/+$/, "");
  const groupIsActive = (items: { path: string }[]) => items.some((i) => isActive(i.path));
  // Show the standalone About link unless About already lives inside a nav group.
  const aboutInGroup = brand.navGroups?.some((g) => g.items.some((i) => i.path === brand.aboutPath));

  const navLinkClass = (active: boolean) =>
    `relative transition-colors cursor-pointer ${
      active
        ? "text-brand-primary after:absolute after:-bottom-1.5 after:left-0 after:right-0 after:h-0.5 after:rounded-full after:bg-brand-primary"
        : "hover:text-brand-primary"
    }`;

  const openNow = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenGroup(label);
  };
  const closeSoon = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenGroup(null), 140);
  };
  const allServices = [...nhsServices, ...privateServices];
  // Quick-contact strip (single-location brands) — pull from the brand's own branch.
  const primaryBranch = brand.locations[0];
  const primaryPhone = primaryBranch?.phone ?? pharmacyInfo.phone;
  const primaryHours = primaryBranch?.openingHours?.[0];
  const primaryHoursLabel = primaryHours
    ? `${primaryHours.day.replace("Monday - Friday", "Mon–Fri")} ${primaryHours.hours}`
    : "Mon–Fri 8AM–8PM";
  /** Single-branch brands show phone + hours beside the logo, unless opted out. */
  const showContactStrip = brand.locations.length <= 1 && !brand.hideHeaderContact;
  // Every page shows the booking picker: use the page's own list, else the default.
  const bookServiceIds = bookNowServices ?? DEFAULT_BOOK_SERVICES;
  const bookableServices = bookServiceIds
    .map((id) => allServices.find((s) => s.id === id))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

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
                <img src={brand.logo} alt={brand.name} className={`${brand.headerLogoClass ?? "h-9"} w-auto`} />
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
            {showContactStrip && (
              <div className="hidden lg:flex items-center gap-4 pl-5 border-l border-gray-200 text-[0.78rem] text-gray-500">
                <span className="flex items-center gap-1.5"><Phone size={12} className="text-brand-accent" /> {primaryPhone}</span>
                <span className="flex items-center gap-1.5"><Clock size={12} className="text-brand-accent" /> {primaryHoursLabel}</span>
              </div>
            )}
          </div>

          {/* Center: Nav links */}
          <nav className="hidden md:flex items-center gap-7 text-[0.85rem] text-gray-600">
            <button onClick={() => scrollTo("nhs-services")} className="hover:text-brand-primary transition-colors cursor-pointer" style={{ fontWeight: 500 }}>NHS Services</button>
            <button onClick={() => scrollTo("private-services")} className="hover:text-brand-primary transition-colors cursor-pointer" style={{ fontWeight: 500 }}>Private Services</button>
            {brand.blogPath && (
              <button onClick={() => goTo(brand.blogPath!)} className={navLinkClass(isActive(brand.blogPath))} style={{ fontWeight: 500 }}>Blog</button>
            )}

            {/* Grouped items — a label-only hover dropdown (the group itself has no page). */}
            {brand.navGroups?.map((group) => {
              const isOpen = openGroup === group.label;
              return (
                <div
                  key={group.label}
                  className="relative"
                  onMouseEnter={() => openNow(group.label)}
                  onMouseLeave={closeSoon}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    onClick={() => setOpenGroup(isOpen ? null : group.label)}
                    className={`${navLinkClass(groupIsActive(group.items))} inline-flex items-center gap-1`}
                    style={{ fontWeight: 500 }}
                  >
                    {group.label}
                    <ChevronDown size={13} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>

                  {isOpen && (
                    <div
                      onMouseEnter={() => openNow(group.label)}
                      onMouseLeave={closeSoon}
                      className="absolute left-0 top-full pt-3 z-50"
                    >
                      <div className="min-w-[15rem] rounded-xl border border-gray-100 bg-white shadow-xl overflow-hidden py-1.5">
                        {group.items.map((item) => (
                          <button
                            key={item.path}
                            onClick={() => { setOpenGroup(null); goTo(item.path); }}
                            className={`w-full text-left px-4 py-2.5 text-[0.85rem] transition-colors cursor-pointer ${
                              isActive(item.path)
                                ? "text-brand-primary bg-brand-light"
                                : "text-gray-600 hover:text-brand-primary hover:bg-brand-light/50"
                            }`}
                            style={{ fontWeight: isActive(item.path) ? 600 : 500 }}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Standalone About — dropped only when About lives inside a nav group. */}
            {brand.aboutPath && !aboutInGroup && (
              <button onClick={() => goTo(brand.aboutPath!)} className={navLinkClass(isActive(brand.aboutPath))} style={{ fontWeight: 500 }}>About</button>
            )}
            {brand.contactPath && (
              <button onClick={() => goTo(brand.contactPath!)} className={navLinkClass(isActive(brand.contactPath))} style={{ fontWeight: 500 }}>Contact</button>
            )}
          </nav>

          {/* Right: CTA */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setBookOpen(true)}
              className="hc-btn-grad-green hidden md:inline-flex items-center gap-1.5 bg-brand-secondary text-white px-5 py-2 rounded-lg text-[0.85rem] transition-all cursor-pointer"
              style={{ fontWeight: 600 }}
            >
              {isHC ? <PhCalendar size={15} weight="duotone" /> : <Calendar size={14} />} Book Appointment Now
            </button>
            <button className="md:hidden text-gray-600 cursor-pointer" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-1">
          {showContactStrip && (
            <div className="flex items-center gap-4 text-[0.8rem] text-gray-500 pb-3 mb-2 border-b border-gray-100">
              <span className="flex items-center gap-1.5"><Phone size={12} className="text-brand-accent" /> {primaryPhone}</span>
              <span className="flex items-center gap-1.5"><Clock size={12} className="text-brand-accent" /> {primaryHoursLabel}</span>
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
          {/* Grouped items — flattened into a labelled block on mobile (no hover). */}
          {brand.navGroups?.map((group) => (
            <div key={group.label} className="pt-2">
              <p className="px-0 pb-1 text-[0.72rem] uppercase tracking-widest text-gray-400" style={{ fontWeight: 700 }}>{group.label}</p>
              {group.items.map((item) => (
                <button
                  key={item.path}
                  onClick={() => goTo(item.path)}
                  className={`flex items-center justify-between w-full py-2.5 text-[0.9rem] cursor-pointer ${isActive(item.path) ? "text-brand-primary" : "text-gray-700"}`}
                  style={{ fontWeight: isActive(item.path) ? 600 : 500 }}
                >
                  {item.label}
                  <ChevronRight size={16} className="text-gray-400" />
                </button>
              ))}
            </div>
          ))}

          {brand.aboutPath && !aboutInGroup && (
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
              className={`flex items-center justify-between w-full py-2.5 text-[0.9rem] cursor-pointer ${isActive(brand.contactPath) ? "text-brand-primary" : "text-gray-700"}`}
              style={{ fontWeight: isActive(brand.contactPath) ? 600 : 500 }}
            >
              Contact
              <ChevronRight size={16} className="text-gray-400" />
            </button>
          )}
          <button
            onClick={() => { setMobileOpen(false); setBookOpen(true); }}
            className="hc-btn-grad-green w-full bg-brand-secondary text-white py-2.5 rounded-lg text-center text-[0.9rem] mt-2 cursor-pointer flex items-center justify-center gap-1.5 transition-all"
            style={{ fontWeight: 600 }}
          >
            {isHC ? <PhCalendar size={15} weight="duotone" /> : <Calendar size={14} />} Book Appointment Now
          </button>
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