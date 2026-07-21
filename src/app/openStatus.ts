import { useEffect, useState } from "react";
import type { PharmacyLocation } from "./data/locations";

/**
 * Derives a live "open now / closed" status from a branch's display opening
 * hours (e.g. "Monday - Friday" → "9:00 AM - 6:00 PM" / "Closed"). Kept
 * dependency-free and tolerant of the human-readable strings the brands use.
 */
const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function dayMatches(label: string, weekday: number): boolean {
  const l = label.toLowerCase().trim();
  if (l === "weekdays") return weekday >= 1 && weekday <= 5;
  if (l === "weekends") return weekday === 0 || weekday === 6;
  // Range like "Monday - Friday"
  const range = label.split(/\s*[-–]\s*/);
  if (range.length === 2) {
    const start = DAYS.findIndex((d) => d.toLowerCase() === range[0].toLowerCase().trim());
    const end = DAYS.findIndex((d) => d.toLowerCase() === range[1].toLowerCase().trim());
    if (start !== -1 && end !== -1) {
      if (start <= end) return weekday >= start && weekday <= end;
      return weekday >= start || weekday <= end; // wraps past Sunday
    }
  }
  return DAYS[weekday].toLowerCase() === l;
}

/** Parse "9:00 AM" → minutes since midnight. Returns null if unparseable. */
function toMinutes(time: string): number | null {
  const m = time.trim().match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)?$/i);
  if (!m) return null;
  let h = parseInt(m[1], 10);
  const min = m[2] ? parseInt(m[2], 10) : 0;
  const mer = m[3]?.toLowerCase();
  if (mer === "pm" && h !== 12) h += 12;
  if (mer === "am" && h === 12) h = 0;
  return h * 60 + min;
}

export type OpenStatus = {
  open: boolean;
  /** Short status line, e.g. "Open now" / "Closed" / "Opens Monday". */
  label: string;
  /** Secondary detail, e.g. "Closes 6:00 PM" / "Opens 9:00 AM". */
  detail: string;
};

export function computeOpenStatus(
  openingHours: { day: string; hours: string }[],
  now: Date = new Date(),
): OpenStatus {
  const weekday = now.getDay();
  const minutes = now.getHours() * 60 + now.getMinutes();
  const todays = openingHours.filter((h) => dayMatches(h.day, weekday) && !/closed/i.test(h.hours));

  // A day can hold several ranges — either as separate entries or as one
  // comma-separated string (e.g. a pharmacy that closes over lunch).
  const ranges = todays
    .flatMap((h) => h.hours.split(","))
    .map((r) => {
      const [openStr = "", closeStr = ""] = r.split(/\s*[-–]\s*/);
      return { openStr: openStr.trim(), closeStr: closeStr.trim(), open: toMinutes(openStr), close: toMinutes(closeStr) };
    })
    .filter((r): r is typeof r & { open: number; close: number } => r.open !== null && r.close !== null)
    .sort((a, b) => a.open - b.open);

  const current = ranges.find((r) => minutes >= r.open && minutes < r.close);
  if (current) return { open: true, label: "Open now", detail: `Closes ${current.closeStr}` };

  const next = ranges.find((r) => minutes < r.open);
  if (next) return { open: false, label: "Closed", detail: `Opens ${next.openStr}` };

  // Closed today (or after hours) — find the next day that opens.
  for (let i = 1; i <= 7; i++) {
    const d = (weekday + i) % 7;
    const entry = openingHours.find((h) => dayMatches(h.day, d) && !/closed/i.test(h.hours));
    if (entry) {
      const openStr = entry.hours.split(/\s*[-–]\s*/)[0];
      const when = i === 1 ? "tomorrow" : DAYS[d];
      return { open: false, label: "Closed", detail: `Opens ${when} ${openStr.trim()}` };
    }
  }
  return { open: false, label: "Closed", detail: "" };
}

/** Live status that re-evaluates every minute. */
export function useOpenStatus(branch: PharmacyLocation): OpenStatus {
  const [status, setStatus] = useState(() => computeOpenStatus(branch.openingHours));
  useEffect(() => {
    setStatus(computeOpenStatus(branch.openingHours));
    const id = setInterval(() => setStatus(computeOpenStatus(branch.openingHours)), 60_000);
    return () => clearInterval(id);
  }, [branch]);
  return status;
}
