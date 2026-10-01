import { Link } from "react-router";
import { onecareBrand } from "../branding";
import { OC_BRANCHES, OC_LEGAL, ic, formatAddress, gphcRegisterUrl, isTbc, onecareLocations } from "../data/onecare";
import { GphcBadge } from "./GphcBadge";
import { BranchPin, Icon3D, OpenStatus, Tbc, useBranch } from "./onecareUi";
import { OC_NAV } from "./HeaderOneCare";

const LEGAL_LINKS = [
  { label: "Privacy notice", href: "#" },
  { label: "Cookie policy", href: "#" },
  { label: "Complaints (including NHS complaints)", href: "#" },
  { label: "Terms", href: "#" },
];

/** OneCare footer (DESIGN.md §8.13): brand · Bewick Road · Branch 2 · Regulated & legal. */
export function FooterOneCare() {
  const { statuses } = useBranch();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-oc-tint border-t border-oc-line">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {/* 1 — Brand */}
        <div>
          {/* The logo mark lives here only; the header carries the full wordmark. */}
          <img src={onecareBrand.logoMark} alt="One Care Pharmacy" width={56} height={56} className="w-14 h-14" />
          <p className="oc-small text-oc-text mt-5 max-w-[32ch]">
            NHS Pharmacy First, a travel clinic and private services from two community pharmacies in Bensham and Low Fell, Gateshead.
          </p>
          <nav aria-label="Footer" className="mt-6">
            <ul className="grid gap-1 oc-small">
              {OC_NAV.map((n) => (
                <li key={n.label}>
                  {n.to ? (
                    <Link to={n.to} className="inline-flex items-center min-h-[28px] text-oc-ink hover:text-oc-dark">{n.label}</Link>
                  ) : (
                    <Link to={`${onecareBrand.basePath}#${n.hash}`} className="inline-flex items-center min-h-[28px] text-oc-ink hover:text-oc-dark">{n.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* 2 & 3 — one column per branch, each with its own GPhC badge */}
        {OC_BRANCHES.map((b) => {
          const loc = onecareLocations.find((l) => l.id === b.id);
          return (
            <div key={b.id}>
              <h2 className="flex items-center gap-2 font-semibold text-oc-ink text-[1.0625rem]">
                <BranchPin branch={b} size={18} /> <span className="min-w-0 truncate">{b.shortName}</span>
              </h2>
              <address className="not-italic oc-small text-oc-text mt-3 flex items-start gap-2">
                <Icon3D src={ic.pin} size={20} />
                <span>{isTbc(formatAddress(b)) ? <Tbc>[REPLACE: address]</Tbc> : formatAddress(b)}</span>
              </address>
              <p className="oc-small mt-2 flex items-center gap-2">
                <Icon3D src={ic.phone} size={20} />
                {isTbc(b.phone) ? <Tbc>[REPLACE: phone]</Tbc> : (
                  <a href={`tel:${b.phone.replace(/\s/g, "")}`} className="text-oc-dark underline underline-offset-4 oc-tnum">Call {b.shortName} on {b.phone}</a>
                )}
              </p>
              <p className="oc-small mt-2"><OpenStatus status={statuses[b.id]} compact /></p>
              <Link to={`${onecareBrand.basePath}/contact#${b.id}`} className="oc-small inline-flex items-center min-h-[24px] mt-1 text-oc-dark underline underline-offset-4">Opening hours</Link>
              <div className="mt-4"><GphcBadge location={loc} className="h-7" /></div>
            </div>
          );
        })}

        {/* 4 — Regulated & legal */}
        <div>
          <h2 className="font-semibold text-oc-ink text-[1.0625rem]">Regulated &amp; legal</h2>
          <p className="oc-small text-oc-text mt-3">
            {OC_LEGAL.tradingName} is a trading name of {OC_LEGAL.owner}, company no. {OC_LEGAL.companyNumber}, registered office {OC_LEGAL.registeredOffice}.
          </p>
          <ul className="oc-small mt-3 grid gap-1.5">
            {OC_BRANCHES.map((b) => (
              <li key={b.id}>
                GPhC premises ({b.shortName}):{" "}
                {isTbc(b.gphc) ? <Tbc>[REPLACE]</Tbc> : (
                  <a href={gphcRegisterUrl(b.gphc)} target="_blank" rel="noopener noreferrer" className="text-oc-dark underline underline-offset-4">
                    {b.gphc}<span className="sr-only"> (opens GPhC register in a new tab)</span>
                  </a>
                )}
              </li>
            ))}
            <li>Superintendent pharmacist: {OC_LEGAL.superintendent}, GPhC {OC_LEGAL.superintendentGphc}</li>
          </ul>
          <nav aria-label="Legal" className="mt-4">
            <ul className="grid gap-1 oc-small">
              <li><Link to={`${onecareBrand.basePath}/accessibility`} className="inline-flex items-center min-h-[28px] text-oc-dark underline underline-offset-4">Accessibility statement</Link></li>
              {LEGAL_LINKS.map((l) => (
                <li key={l.label}><a href={l.href} className="inline-flex items-center min-h-[28px] text-oc-dark underline underline-offset-4">{l.label}</a></li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      <div className="border-t border-oc-line">
        <p className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-5 oc-small text-oc-quiet">© {year} One Care Pharmacy. All rights reserved.</p>
      </div>
    </footer>
  );
}
