import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "react-router";
import { Drawer } from "vaul";
import { CalendarCheckmark24Regular, Call24Regular, Dismiss24Regular, Navigation24Regular } from "@fluentui/react-icons";
import { shivakemBrand } from "../branding";
import { SK_BRANCH } from "../data/shivakem";
import { useOpenNow } from "../onecareOpenNow";
import { BTN_PRIMARY, OpenStatus } from "./onecareUi";
import { Fl } from "./shivakemUi";
import { BookModalShivakem } from "./BookModalShivakem";

const BASE = shivakemBrand.basePath;

type NavItem = { label: string; hash?: string; to?: string };
export const SK_NAV: NavItem[] = [
  { label: "NHS services", hash: "nhs-services" },
  { label: "Private services", hash: "private-services" },
  { label: "Travel clinic", hash: "travel-clinic" },
  { label: "About us", to: `${BASE}/about` },
  { label: "Contact us", to: `${BASE}/contact` },
];

/** Section links scroll in place on the home page and route home from elsewhere. */
function NavLink({ item, className, onNavigate, children }: { item: NavItem; className: string; onNavigate?: () => void; children: ReactNode }) {
  const { pathname } = useLocation();
  const onHome = pathname.replace(/\/$/, "").endsWith(BASE);
  if (item.to) {
    const current = pathname.replace(/\/$/, "").endsWith(item.to);
    return <Link to={item.to} onClick={onNavigate} aria-current={current ? "page" : undefined} className={className}>{children}</Link>;
  }
  return onHome
    ? <a href={`#${item.hash}`} onClick={onNavigate} className={className}>{children}</a>
    : <Link to={`${BASE}#${item.hash}`} onClick={onNavigate} className={className}>{children}</Link>;
}

/** Opens the "all services" booking dialog. */
function BookButton({ className, onClick }: { className: string; onClick: () => void }) {
  return (
    <button type="button" aria-haspopup="dialog" onClick={onClick} className={className}>
      <Fl icon={CalendarCheckmark24Regular} size={20} /> Book an appointment
    </button>
  );
}

/** Floating glass header (One Care pattern): logo, section nav, one booking action. */
export function HeaderShivakem() {
  const status = useOpenNow([SK_BRANCH])[SK_BRANCH.id];
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookOpen, setBookOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[90] focus:rounded-full focus:bg-oc-ink focus:text-white focus:px-5 focus:py-3 focus:font-semibold">
        Skip to main content
      </a>

      <header className="sticky top-0 z-[60] px-3 sm:px-5 pt-3">
        <div className="oc-glass mx-auto max-w-[1320px] rounded-full h-16 pl-5 sm:pl-7 pr-2 flex items-center justify-between gap-4">
          <Link to={BASE} className="shrink-0 inline-flex items-center min-h-[44px]">
            <img src={shivakemBrand.logo} alt="Shivakem Pharmacy home" width={140} height={41} className="h-[38px] sm:h-[46px] w-auto" />
          </Link>

          <nav aria-label="Main" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {SK_NAV.map((n) => (
                <li key={n.label}>
                  <NavLink
                    item={n}
                    className="inline-flex items-center min-h-[44px] px-4 rounded-full whitespace-nowrap text-[0.9375rem] font-medium text-oc-ink hover:bg-oc-mist aria-[current=page]:bg-oc-mist aria-[current=page]:text-oc-deep transition-colors"
                  >
                    {n.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <BookButton className={`${BTN_PRIMARY} max-md:hidden min-h-[48px]`} onClick={() => setBookOpen(true)} />
            <Drawer.Root open={menuOpen} onOpenChange={setMenuOpen} direction="right">
              <Drawer.Trigger asChild>
                <button
                  type="button"
                  aria-label="Open menu"
                  aria-expanded={menuOpen}
                  aria-controls="sk-mobile-menu"
                  className="xl:hidden oc-press w-12 h-12 inline-flex items-center justify-center rounded-full bg-oc-ink text-white cursor-pointer"
                >
                  <Fl icon={Navigation24Regular} size={22} />
                </button>
              </Drawer.Trigger>
              <Drawer.Portal>
                <Drawer.Overlay className="theme-onecare theme-shivakem fixed inset-0 z-[80] bg-oc-ink/40" />
                <Drawer.Content id="sk-mobile-menu" className="theme-onecare theme-shivakem fixed inset-y-0 right-0 z-[81] w-[min(92vw,400px)] bg-oc-paper flex flex-col outline-none rounded-l-oc-lg">
                  <div className="flex items-center justify-between h-20 px-5">
                    <Drawer.Title className="oc-h3 text-oc-ink">Menu</Drawer.Title>
                    <Drawer.Close aria-label="Close menu" className="oc-press w-12 h-12 inline-flex items-center justify-center rounded-full bg-oc-mist text-oc-ink cursor-pointer">
                      <Fl icon={Dismiss24Regular} size={20} />
                    </Drawer.Close>
                  </div>
                  <Drawer.Description className="sr-only">Site navigation and our phone number</Drawer.Description>
                  <nav aria-label="Main" className="px-3">
                    <ul className="grid">
                      {SK_NAV.map((n) => (
                        <li key={n.label}>
                          <NavLink item={n} onNavigate={() => setMenuOpen(false)} className="flex items-center min-h-[56px] px-4 rounded-oc-md oc-h3 text-oc-ink hover:bg-oc-mist aria-[current=page]:text-oc-deep">
                            {n.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </nav>
                  <div className="mt-auto p-5 grid gap-3 border-t border-oc-line">
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-semibold text-oc-ink truncate">{SK_BRANCH.address.line1}, {SK_BRANCH.shortName}</p>
                        <p className="oc-small"><OpenStatus status={status} compact /></p>
                      </div>
                      <a href={`tel:${SK_BRANCH.phone.replace(/\s/g, "")}`} className="oc-press shrink-0 w-12 h-12 inline-flex items-center justify-center rounded-full border border-oc-line-strong text-oc-ink">
                        <Fl icon={Call24Regular} size={22} /><span className="sr-only">Call us on {SK_BRANCH.phone}</span>
                      </a>
                    </div>
                    <BookButton className={`${BTN_PRIMARY} w-full mt-2`} onClick={() => { setMenuOpen(false); setBookOpen(true); }} />
                  </div>
                </Drawer.Content>
              </Drawer.Portal>
            </Drawer.Root>
          </div>
        </div>
      </header>
      <BookModalShivakem open={bookOpen} onOpenChange={setBookOpen} />
    </>
  );
}
