import { useEffect, useState } from "react";
import type { DayKey, Interval, OCBranch } from "./data/onecare";

/**
 * OneCare open-now logic (DESIGN.md §7). Computed client-side in Europe/London
 * regardless of the visitor's own time zone. Handles lunch closures, bank-holiday
 * `exceptions`, "Closes in 45 min" (under an hour) and the next opening time.
 * The no-JS fallback is the plain hours table in the branches section.
 */

export type OpenState = "open" | "closing" | "closed" | "unknown";
export type OpenNow = {
  state: OpenState;
  /** Short status: "Open now", "Closes in 45 min", "Closed for lunch", "Closed", "Hours to be confirmed". */
  headline: string;
  /** Detail: "Open until 18:00", "Opens tomorrow at 09:00", … */
  detail: string;
  /** Today's hours as text ("09:00–13:00, 14:00–18:00" / "Closed"). */
  today: string;
  /** Set when today is a bank-holiday exception ("Christmas Day"). */
  exception?: string;
};

const DAYS: DayKey[] = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
const DAY_MS = 86_400_000;
const toMin = (t: string) => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };
const isoDate = (d: Date) => d.toISOString().slice(0, 10);

/** The current calendar date + minutes past midnight, in Europe/London. */
export function londonNow(now: Date) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/London", year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", hourCycle: "h23",
    }).formatToParts(now).map((p) => [p.type, p.value]),
  );
  const date = new Date(Date.UTC(+parts.year, +parts.month - 1, +parts.day)); // date-only, UTC midnight
  return { date, minutes: (+parts.hour % 24) * 60 + +parts.minute, dayKey: DAYS[date.getUTCDay()] };
}

function intervalsOn(branch: OCBranch, date: Date): { list: Interval[]; exception?: string } {
  const ex = branch.exceptions?.find((e) => e.date === isoDate(date));
  const h = ex ? ex.hours : branch.hours![DAYS[date.getUTCDay()]];
  const list = h === "closed" ? [] : [...h].sort((a, b) => toMin(a.open) - toMin(b.open));
  return { list, exception: ex?.label };
}

export function computeOpenNow(branch: OCBranch, now: Date = new Date()): OpenNow {
  if (!branch.hours) {
    return { state: "unknown", headline: "Hours to be confirmed", detail: "[REPLACE: opening hours]", today: "[REPLACE]" };
  }
  const { date, minutes } = londonNow(now);
  const { list, exception } = intervalsOn(branch, date);
  const today = list.length ? list.map((i) => `${i.open} to ${i.close}`).join(", ") : "Closed";
  const base = { today, exception };

  const current = list.find((i) => minutes >= toMin(i.open) && minutes < toMin(i.close));
  if (current) {
    const left = toMin(current.close) - minutes;
    return left <= 60
      ? { ...base, state: "closing", headline: `Closes in ${left} min`, detail: `Closes at ${current.close}` }
      : { ...base, state: "open", headline: "Open now", detail: `Open until ${current.close}` };
  }

  const laterToday = list.find((i) => minutes < toMin(i.open));
  if (laterToday) {
    const onBreak = list.some((i) => toMin(i.close) <= minutes);
    return { ...base, state: "closed", headline: onBreak ? "Closed for lunch" : "Closed", detail: `Opens today at ${laterToday.open}` };
  }

  for (let k = 1; k <= 14; k++) {
    const next = new Date(date.getTime() + k * DAY_MS);
    const { list: nextList } = intervalsOn(branch, next);
    if (nextList.length) {
      const when = k === 1 ? "tomorrow" : next.toLocaleDateString("en-GB", { weekday: "long", timeZone: "UTC" });
      return { ...base, state: "closed", headline: "Closed", detail: `Opens ${when} at ${nextList[0].open}` };
    }
  }
  return { ...base, state: "closed", headline: "Closed", detail: "" };
}

/**
 * Live statuses for several branches. Re-evaluates every minute and updates the
 * text silently — callers must NOT put this in an aria-live region (§9: never
 * re-announce open-now every minute).
 */
export function useOpenNow(branches: OCBranch[]): Record<string, OpenNow> {
  const calc = () => Object.fromEntries(branches.map((b) => [b.id, computeOpenNow(b)]));
  const [statuses, setStatuses] = useState(calc);
  useEffect(() => {
    const id = window.setInterval(() => setStatuses(calc()), 60_000);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return statuses;
}

/** Today's weekday key in Europe/London (for highlighting the hours table). */
export const londonTodayKey = (now: Date = new Date()): DayKey => londonNow(now).dayKey;
