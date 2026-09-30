import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "react-router";
import { Drawer } from "vaul";
import { onecareBrand } from "../branding";
import { OC_BRANCHES, ic, isTbc } from "../data/onecare";
import { BTN_PRIMARY, BranchPin, Icon3D, OpenStatus, Tbc, useBranch } from "./onecareUi";

const BASE = onecareBrand.basePath;

type NavItem = { label: string; hash?: string; to?: string };
export const OC_NAV: NavItem[] = [
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
    return (
      <Link to={item.to} onClick={onNavigate} aria-current={current ? "page" : undefined} className={className}>
        {children}
      </Link>
    );
  }
  return onHome ? (
    <a href={`#${item.hash}`} onClick={onNavigate} className={className}>{children}</a>
  ) : (
    <Link to={`${BASE}#${item.hash}`} onClick={onNavigate} className={className}>{children}</Link>
  );
}

/** "Book an appointment" goes to the private/NHS service choice on the home page. */
function BookLink({ className, onNavigate }: { className: string; onNavigate?: () => void }) {
  return (
    <NavLink item={{ label: "Book", hash: "nhs-services" }} className={className} onNavigate={onNavigate}>
      <Icon3D src={ic.calendar} size={24} className="-my-1" /> Book an appointment
    </NavLink>
  );
}

export function HeaderOneCare() {
  const { statuses } = useBranch();
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  // Close the menu on route change.
  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[90] focus:rounded-full focus:bg-oc-ink focus:text-white focus:px-5 focus:py-3 focus:font-semibold">
        Skip to main content
      </a>

      <header className="sticky top-0 z-[60] px-3 sm:px-5 pt-3">
        <div className="oc-glass mx-auto max-w-[1320px] rounded-full h-16 pl-5 sm:pl-7 pr-2 flex items-center justify-between gap-4">
          <Link to={BASE} className="shrink-0 inline-flex items-center min-h-[44px]">
            <img src={onecareBrand.logo} alt="OneCare Pharmacy home" width={180} height={34} className="h-[26px] sm:h-[30px] w-auto" />
          </Link>

          <nav aria-label="Main" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {OC_NAV.map((n) => (
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
            <BookLink className={`${BTN_PRIMARY} max-md:hidden min-h-[48px]`} />
            <Drawer.Root open={menuOpen} onOpenChange={setMenuOpen} direction="right">
              <Drawer.Trigger asChild>
                <button
                  type="button"
                  aria-label="Open menu"
                  aria-expanded={menuOpen}
                  aria-controls="oc-mobile-menu"
                  className="xl:hidden oc-press w-12 h-12 inline-flex items-center justify-center rounded-full bg-oc-ink text-white cursor-pointer"
                >
                  <span aria-hidden="true" className="grid gap-[5px]">
                    <span className="block w-5 h-[2px] rounded-full bg-current" />
                    <span className="block w-5 h-[2px] rounded-full bg-current" />
                    <span className="block w-3.5 h-[2px] rounded-full bg-current" />
                  </span>
                </button>
              </Drawer.Trigger>
              <Drawer.Portal>
                <Drawer.Overlay className="theme-onecare fixed inset-0 z-[80] bg-oc-ink/40" />
                <Drawer.Content
                  id="oc-mobile-menu"
                  className="theme-onecare fixed inset-y-0 right-0 z-[81] w-[min(92vw,400px)] bg-oc-paper flex flex-col outline-none rounded-l-oc-lg"
                >
                  <div className="flex items-center justify-between h-20 px-5">
                    <Drawer.Title className="oc-h3 text-oc-ink">Menu</Drawer.Title>
                    <Drawer.Close aria-label="Close menu" className="oc-press w-12 h-12 inline-flex items-center justify-center rounded-full bg-oc-mist text-oc-ink cursor-pointer">
                      <span aria-hidden="true" className="relative w-4 h-4">
                        <span className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 rotate-45 rounded-full bg-current" />
                        <span className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 -rotate-45 rounded-full bg-current" />
                      </span>
                    </Drawer.Close>
                  </div>
                  <Drawer.Description className="sr-only">Site navigation and branch phone numbers</Drawer.Description>
                  <nav aria-label="Main" className="px-3">
                    <ul className="grid">
                      {OC_NAV.map((n) => (
                        <li key={n.label}>
                          <NavLink item={n} onNavigate={() => setMenuOpen(false)} className="flex items-center min-h-[56px] px-4 rounded-oc-md oc-h3 text-oc-ink hover:bg-oc-mist aria-[current=page]:text-oc-deep">
                            {n.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </nav>
                  <div className="mt-auto p-5 grid gap-3 border-t border-oc-line">
                    {OC_BRANCHES.map((b) => (
                      <div key={b.id} className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <p className="flex items-center gap-2 font-semibold text-oc-ink truncate"><BranchPin branch={b} size={16} /> {b.shortName}</p>
                          <p className="oc-small"><OpenStatus status={statuses[b.id]} compact /></p>
                        </div>
                        {isTbc(b.phone) ? <Tbc>Phone [REPLACE]</Tbc> : (
                          <a href={`tel:${b.phone.replace(/\s/g, "")}`} className="oc-press shrink-0 w-12 h-12 inline-flex items-center justify-center rounded-full border border-oc-line-strong text-oc-ink">
                            <Icon3D src={ic.phone} size={24} /><span className="sr-only">Call {b.shortName}</span>
                          </a>
                        )}
                      </div>
                    ))}
                    <BookLink className={`${BTN_PRIMARY} w-full mt-2`} onNavigate={() => setMenuOpen(false)} />
                  </div>
                </Drawer.Content>
              </Drawer.Portal>
            </Drawer.Root>
          </div>
        </div>
      </header>
    </>
  );
}
