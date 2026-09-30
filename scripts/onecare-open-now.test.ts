// OneCare open-now logic test. Run: node_modules/.bin/esbuild scripts/onecare-open-now.test.ts --bundle --platform=node --outfile=%TEMP%/oc-test.cjs && node %TEMP%/oc-test.cjs
import { computeOpenNow } from "../src/app/onecareOpenNow";
import type { OCBranch } from "../src/app/data/onecare";

const wk = [{ open: "09:00", close: "13:00" }, { open: "14:00", close: "18:00" }];
const fixture = {
  id: "bewick-road", name: "t", shortName: "t", address: { line1: "", town: "", postcode: "" },
  phone: "", email: "", gphc: "", mapsUrl: "", facilities: [], landmark: "", ods: "", pin: "dark",
  hours: { mon: wk, tue: wk, wed: wk, thu: wk, fri: wk, sat: [{ open: "09:00", close: "13:00" }], sun: "closed" },
  exceptions: [{ date: "2026-12-25", label: "Christmas Day", hours: "closed" }],
} as unknown as OCBranch;

// Winter dates are GMT (= UTC); the July case checks BST (UTC+1).
const cases: [string, string, string, string][] = [
  ["open",           "2026-12-14T10:00:00Z", "open",    "Open until 13:00"],
  ["closing <1h",    "2026-12-14T12:30:00Z", "closing", "Closes at 13:00"],
  ["lunch break",    "2026-12-14T13:30:00Z", "closed",  "Opens today at 14:00"],
  ["after hours",    "2026-12-14T19:00:00Z", "closed",  "Opens tomorrow at 09:00"],
  ["Sunday",         "2026-12-13T11:00:00Z", "closed",  "Opens tomorrow at 09:00"],
  ["bank holiday",   "2026-12-25T10:00:00Z", "closed",  "Opens tomorrow at 09:00"],
  ["Sat pm -> Mon",  "2026-12-19T15:00:00Z", "closed",  "Opens Monday at 09:00"],
  ["BST open",       "2026-07-06T09:30:00Z", "open",    "Open until 13:00"],
];
let fail = 0;
for (const [name, iso, state, detail] of cases) {
  const r = computeOpenNow(fixture, new Date(iso));
  const ok = r.state === state && r.detail === detail;
  if (!ok) fail++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${name.padEnd(14)} ${r.state.padEnd(8)} | ${r.headline} | ${r.detail}${r.exception ? " | " + r.exception : ""}`);
}
const lunch = computeOpenNow(fixture, new Date("2026-12-14T13:30:00Z"));
if (lunch.headline !== "Closed for lunch") { fail++; console.log("FAIL  lunch headline:", lunch.headline); } else console.log("PASS  lunch headline 'Closed for lunch'");
const closing = computeOpenNow(fixture, new Date("2026-12-14T12:30:00Z"));
if (closing.headline !== "Closes in 30 min") { fail++; console.log("FAIL  closing headline:", closing.headline); } else console.log("PASS  closing headline 'Closes in 30 min'");
const unknown = computeOpenNow({ ...fixture, hours: null } as OCBranch);
console.log(`${unknown.state === "unknown" ? "PASS" : (fail++, "FAIL")}  hours [REPLACE] -> ${unknown.headline}`);
console.log(fail ? `\n${fail} FAILED` : "\nALL PASSED");
process.exit(fail ? 1 : 0);
