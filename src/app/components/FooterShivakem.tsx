import { Link } from "react-router";
import { Call24Regular, Location24Regular, Directions24Regular } from "@fluentui/react-icons";
import { shivakemBrand } from "../branding";
import { DAY_ORDER, dayLabel, formatDayHours, gphcRegisterUrl, isTbc } from "../data/onecare";
import { SK_BRANCH, SK_LEGAL, formatSkAddress, shivakemLocations } from "../data/shivakem";
import { londonTodayKey, useOpenNow } from "../onecareOpenNow";
import { GphcBadge } from "./GphcBadge";
import { OpenStatus, Tbc } from "./onecareUi";
import { SK_NAV } from "./HeaderShivakem";
import { Fl } from "./shivakemUi";

const BASE = shivakemBrand.basePath;
const LEGAL_LINKS = ["Privacy notice", "Cookie policy", "Complaints (including NHS complaints)", "Terms"];
const LINK = "inline-flex items-center min-h-[28px] text-oc-dark underline underline-offset-4";

/** Shivakem footer: brand and nav · visit us · opening hours · regulated & legal. */
export function FooterShivakem() {
  const status = useOpenNow([SK_BRANCH])[SK_BRANCH.id];
  const today = londonTodayKey();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-oc-tint border-t border-oc-line">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <img src={shivakemBrand.logoMark} alt="Shivakem Pharmacy" width={56} height={63} className="h-16 w-auto" />
          <p className="oc-small text-oc-text mt-5 max-w-[32ch]">
            Your independent pharmacy on Court Parade, Wembley: prescriptions, NHS care and private clinics.
          </p>
          <nav aria-label="Footer" className="mt-6">
            <ul className="grid gap-1 oc-small">
              {SK_NAV.map((n) => (
                <li key={n.label}>
                  <Link to={n.to ?? `${BASE}#${n.hash}`} className="inline-flex items-center min-h-[28px] text-oc-ink hover:text-oc-dark">{n.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div>
          <h2 className="font-semibold text-oc-ink text-[1.0625rem]">Find us</h2>
          <address className="not-italic oc-small text-oc-text mt-3 flex items-start gap-2">
            <Fl icon={Location24Regular} size={18} className="text-oc-dark mt-0.5" />
            <span>{formatSkAddress()}</span>
          </address>
          <p className="oc-small mt-2 flex items-center gap-2">
            <Fl icon={Call24Regular} size={18} className="text-oc-dark" />
            <a href={`tel:${SK_BRANCH.phone.replace(/\s/g, "")}`} className="text-oc-dark underline underline-offset-4 oc-tnum">{SK_BRANCH.phone}</a>
          </p>
          <p className="oc-small mt-2 flex items-center gap-2">
            <Fl icon={Directions24Regular} size={18} className="text-oc-dark" />
            <a href={SK_BRANCH.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-oc-dark underline underline-offset-4">
              Get directions<span className="sr-only"> (opens Google Maps in a new tab)</span>
            </a>
          </p>
          <div className="mt-4"><GphcBadge location={shivakemLocations[0]} className="h-7" /></div>
        </div>

        <div>
          <h2 className="font-semibold text-oc-ink text-[1.0625rem]">Opening hours</h2>
          <p className="oc-small mt-3"><OpenStatus status={status} /></p>
          <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-5 gap-y-1 oc-small text-oc-text oc-tnum">
            {DAY_ORDER.map((d) => (
              <div key={d} className={`contents ${d === today ? "font-semibold text-oc-ink" : ""}`}>
                <dt>{dayLabel(d)}</dt>
                <dd>{formatDayHours(SK_BRANCH.hours![d])}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <h2 className="font-semibold text-oc-ink text-[1.0625rem]">Regulated &amp; legal</h2>
          <p className="oc-small text-oc-text mt-3">
            {SK_LEGAL.tradingName} is a trading name of {isTbc(SK_LEGAL.owner) ? <Tbc>{SK_LEGAL.owner}</Tbc> : SK_LEGAL.owner}
            {", "}company no. {isTbc(SK_LEGAL.companyNumber) ? <Tbc>{SK_LEGAL.companyNumber}</Tbc> : SK_LEGAL.companyNumber}.
          </p>
          <ul className="oc-small mt-3 grid gap-1.5">
            <li>
              GPhC premises:{" "}
              <a href={gphcRegisterUrl(SK_BRANCH.gphc)} target="_blank" rel="noopener noreferrer" className="text-oc-dark underline underline-offset-4">
                {SK_BRANCH.gphc}<span className="sr-only"> (opens the GPhC register in a new tab)</span>
              </a>
            </li>
            <li>
              Superintendent pharmacist:{" "}
              {isTbc(SK_LEGAL.superintendent) ? <Tbc>{SK_LEGAL.superintendent}</Tbc> : `${SK_LEGAL.superintendent}, GPhC ${SK_LEGAL.superintendentGphc}`}
            </li>
          </ul>
          <nav aria-label="Legal" className="mt-4">
            <ul className="grid gap-1 oc-small">
              {LEGAL_LINKS.map((l) => <li key={l}><a href="#" className={LINK}>{l}</a></li>)}
            </ul>
          </nav>
        </div>
      </div>
      <div className="border-t border-oc-line">
        <p className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-5 oc-small text-oc-quiet">© {year} Shivakem Pharmacy. All rights reserved.</p>
      </div>
    </footer>
  );
}
