import { DAY_ORDER, ic, onecareLocations, dayLabel, formatAddress, formatDayHours, gphcRegisterUrl, isTbc, type OCBranch } from "../data/onecare";
import { londonTodayKey } from "../onecareOpenNow";
import { GphcBadge } from "./GphcBadge";
import { Arrow, BranchPin, CallAction, DirectionsAction, Icon3D, OpenStatus, Tbc, useBranch } from "./onecareUi";

export function BranchAddress({ b }: { b: OCBranch }) {
  const addr = formatAddress(b);
  return (
    <address className="not-italic oc-body text-oc-text flex items-start gap-2.5">
      <Icon3D src={ic.pin} size={24} />
      <span>{isTbc(addr) ? <Tbc>{addr}</Tbc> : addr}</span>
    </address>
  );
}

/** Full week; today is marked for sighted and screen-reader users. */
export function BranchHoursTable({ b }: { b: OCBranch }) {
  const today = londonTodayKey();
  return (
    <table className="w-full oc-small">
      <caption className="sr-only">Opening hours for {b.shortName}</caption>
      <tbody>
        {DAY_ORDER.map((d) => {
          const isToday = d === today;
          return (
            <tr key={d} aria-current={isToday ? "date" : undefined} className={isToday ? "font-semibold text-oc-ink bg-oc-mist" : "text-oc-text"}>
              <th scope="row" className="text-left font-[inherit] py-2.5 pl-3 rounded-l-full">{dayLabel(d)}{isToday && <span className="sr-only"> (today)</span>}</th>
              <td className="py-2.5 pr-3 text-right oc-tnum rounded-r-full">{b.hours ? formatDayHours(b.hours[d]) : <Tbc>[REPLACE]</Tbc>}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

/** Contact-page detail card: everything a patient needs for one branch, including its own GPhC badge. */
export function BranchDetailCard({ b }: { b: OCBranch }) {
  const { statuses } = useBranch();
  const location = onecareLocations.find((l) => l.id === b.id);
  return (
    <article id={b.id} aria-labelledby={`oc-detail-${b.id}`} className="scroll-mt-28 rounded-oc-xl border border-oc-line bg-white p-6 sm:p-9 flex flex-col">
      <div className="flex items-center gap-3">
        <BranchPin branch={b} size={28} />
        <h2 id={`oc-detail-${b.id}`} className="oc-h3 !text-[1.75rem] text-oc-ink min-w-0">{b.shortName}</h2>
      </div>
      <p className="mt-3 oc-body"><OpenStatus status={statuses[b.id]} /></p>
      <div className="mt-6 grid gap-3">
        <BranchAddress b={b} />
        <p className="oc-small text-oc-quiet pl-[34px]">{isTbc(b.landmark) ? <Tbc>{b.landmark}</Tbc> : b.landmark}</p>
        <p className="oc-body flex items-center gap-2.5">
          <Icon3D src={ic.envelope} size={24} />
          {isTbc(b.email) ? <Tbc>{b.email}</Tbc> : <a href={`mailto:${b.email}`} className="text-oc-dark underline underline-offset-4">{b.email}</a>}
        </p>
      </div>

      <h3 className="mt-8 font-semibold text-oc-ink">Opening hours</h3>
      <div className="mt-3"><BranchHoursTable b={b} /></div>

      <h3 className="mt-8 font-semibold text-oc-ink">Facilities</h3>
      <ul className="mt-2 grid gap-1 oc-small text-oc-text">
        {b.facilities.map((f) => <li key={f}>{isTbc(f) ? <Tbc>{f}</Tbc> : f}</li>)}
      </ul>

      <h3 className="mt-8 font-semibold text-oc-ink">Registered pharmacy</h3>
      <div className="mt-2 oc-small flex flex-wrap items-center gap-x-5 gap-y-3">
        {isTbc(b.gphc) ? (
          <Tbc>GPhC premises no. [REPLACE]</Tbc>
        ) : (
          <a href={gphcRegisterUrl(b.gphc)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 min-h-[24px] text-oc-dark underline underline-offset-4">
            GPhC premises {b.gphc} <Arrow dir="up-right" /><span className="sr-only"> (opens the GPhC register in a new tab)</span>
          </a>
        )}
        {/* Location-specific badge: one per branch, never a single group badge. */}
        <GphcBadge location={location} className="h-7" />
      </div>

      <div className="mt-auto pt-8 grid sm:grid-cols-2 gap-3">
        <CallAction branch={b} className="w-full" />
        <DirectionsAction branch={b} className="w-full" />
      </div>
    </article>
  );
}
