import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { useNavigate } from "react-router";
import { ArrowRight, Phone, Search, X } from "lucide-react";
import type { Brand } from "../branding";
import { nhsServices, privateServices, type Service } from "../data/services";

/**
 * Hero service search for the template sites (Meadows, J Morris, Acre).
 * Built for a large catalogue: type a service, condition or plain word
 * ("jab", "holiday", "water infection") and jump straight to its booking page.
 *
 * Accessible combobox (WAI-ARIA 1.2): arrow keys move, Enter books,
 * Escape closes then clears. Results group into NHS and private.
 */

/**
 * Entries named after a specific prescription-only medicine are not offered
 * here: promoting a POM by name to the public breaches MHRA advertising rules.
 * Patients reach them through the matching consultation instead.
 */
const HIDDEN_FROM_SEARCH = new Set(["prv-wegovy", "prv-mounjaro", "prv-saxenda", "prv-orlistat", "prv-finasteride"]);

/** Everyday words patients type, mapped to the catalogue's wording. */
const SYNONYMS: Record<string, string[]> = {
  jab: ["vaccin"], jabs: ["vaccin"], injection: ["vaccin", "injection"], vaccine: ["vaccin"],
  holiday: ["travel"], abroad: ["travel"], trip: ["travel"],
  weight: ["weight"], diet: ["weight"], slimming: ["weight"],
  "water infection": ["uti", "cystitis"], bladder: ["uti", "cystitis"], wee: ["uti", "cystitis"],
  throat: ["sore throat"], ear: ["ear"], ears: ["ear"], hearing: ["ear wax"],
  sinus: ["sinusitis"], skin: ["skin", "impetigo", "acne", "eczema"], rash: ["impetigo", "shingles", "eczema"],
  bite: ["insect bite"], blood: ["blood pressure", "cholesterol", "diabetes"], bp: ["blood pressure"],
  smoking: ["stop smoking"], quit: ["stop smoking"], period: ["period"], hair: ["hair loss"],
  contraceptive: ["contraception"], pill: ["contraception"], "morning after": ["emergency contraception"],
};

type Item = Service & { kind: "nhs" | "private" };

const ALL: Item[] = [
  ...nhsServices.map((s) => ({ ...s, kind: "nhs" as const })),
  ...privateServices.filter((s) => !HIDDEN_FROM_SEARCH.has(s.id)).map((s) => ({ ...s, kind: "private" as const })),
];

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9 ]+/g, " ").replace(/\s+/g, " ").trim();

/** Score a service against the query; 0 means no match. Name matches beat category, then description. */
function score(item: Item, q: string): number {
  const name = norm(item.name);
  const cat = norm(item.category);
  const desc = norm(item.description);
  const terms = [q, ...(SYNONYMS[q] ?? []), ...q.split(" ").flatMap((w) => SYNONYMS[w] ?? [])];
  let best = 0;
  for (const t of terms) {
    if (!t) continue;
    if (name.startsWith(t)) best = Math.max(best, 100);
    else if (name.split(" ").some((w) => w.startsWith(t))) best = Math.max(best, 80);
    else if (name.includes(t)) best = Math.max(best, 60);
    else if (cat.includes(t)) best = Math.max(best, 40);
    else if (desc.includes(t)) best = Math.max(best, 20);
  }
  // Every word of a multi-word query should appear somewhere.
  if (!best && q.includes(" ")) {
    const hay = `${name} ${cat} ${desc}`;
    if (q.split(" ").every((w) => hay.includes(w))) best = 15;
  }
  return best;
}

/** "From £25" for private services (the catalogue stores "From 25"), "Free on the NHS" for NHS ones. */
const priceLabel = (s: Item) => {
  if (s.kind === "nhs") return "Free on the NHS";
  if (!s.price) return "Private";
  const amount = s.price.replace(/^from\s*/i, "").replace(/^£/, "");
  return /^\d/.test(amount) ? `From £${amount}` : s.price;
};

/** Bold the part of the name that matches the query. */
function Highlight({ text, q }: { text: string; q: string }) {
  const i = q ? text.toLowerCase().indexOf(q.toLowerCase()) : -1;
  if (i < 0) return <>{text}</>;
  return <>{text.slice(0, i)}<mark className="bg-transparent text-brand-secondary" style={{ fontWeight: 700 }}>{text.slice(i, i + q.length)}</mark>{text.slice(i + q.length)}</>;
}

export function ServiceSearch({ brand, popular }: { brand: Brand; popular: { id: string; label: string }[] }) {
  const navigate = useNavigate();
  const uid = useId();
  const inputId = `${uid}-input`;
  const listId = `${uid}-list`;
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const branch = brand.locations[0];

  const q = norm(query);
  const results = useMemo<Item[]>(() => {
    if (!q) {
      // Nothing typed yet: suggest the site's most-booked services.
      return popular.map((p) => ALL.find((s) => s.id === p.id)).filter((s): s is Item => !!s);
    }
    return ALL.map((s) => ({ s, sc: score(s, q) }))
      .filter((r) => r.sc > 0)
      // Best match first; on a tie, free NHS services before private ones.
      .sort((a, b) => b.sc - a.sc || (a.s.kind === b.s.kind ? 0 : a.s.kind === "nhs" ? -1 : 1) || a.s.name.localeCompare(b.s.name))
      .slice(0, 10)
      .map((r) => r.s);
  }, [q, popular]);

  useEffect(() => setActive(0), [q]);

  // Close when focus or a pointer leaves the search.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => { if (!wrapRef.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  // Keep the active option in view when moving with the keyboard.
  useEffect(() => {
    if (!open) return;
    document.getElementById(`${listId}-${active}`)?.scrollIntoView({ block: "nearest" });
  }, [active, open, listId]);

  const book = (s: Item) => {
    setOpen(false);
    navigate(`${brand.basePath}/book/${s.id}`);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setOpen(true); setActive((i) => (results.length ? (i + 1) % results.length : 0)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setOpen(true); setActive((i) => (results.length ? (i - 1 + results.length) % results.length : 0)); }
    else if (e.key === "Enter") { if (open && results[active]) { e.preventDefault(); book(results[active]); } }
    else if (e.key === "Escape") { if (open) setOpen(false); else setQuery(""); }
  };

  const showList = open;
  const groups = q
    ? [{ label: "NHS services", items: results.filter((r) => r.kind === "nhs") }, { label: "Private services", items: results.filter((r) => r.kind === "private") }]
    : [{ label: "Most booked", items: results }];
  let optionIndex = -1;

  return (
    <div ref={wrapRef} className="w-full max-w-[34rem]">
      <form role="search" onSubmit={(e) => { e.preventDefault(); if (results[active]) book(results[active]); }}>
        <label htmlFor={inputId} className="block text-[0.9rem] text-slate-700 mb-2" style={{ fontWeight: 600 }}>
          What can we help you with?
        </label>
        <div className="relative">
          <div className="flex items-center gap-2 rounded-2xl bg-white border border-slate-200 pl-4 pr-1.5 min-h-[60px] shadow-[0_14px_34px_-18px_rgba(15,23,42,0.35)] focus-within:border-brand-secondary focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--brand-secondary)_16%,transparent),0_14px_34px_-18px_rgba(15,23,42,0.35)]">
            <Search size={20} strokeWidth={2} className="text-slate-400 shrink-0" aria-hidden="true" />
            <input
              ref={inputRef}
              id={inputId}
              type="search"
              role="combobox"
              aria-expanded={showList}
              aria-controls={listId}
              aria-autocomplete="list"
              aria-activedescendant={showList && results[active] ? `${listId}-${active}` : undefined}
              autoComplete="off"
              enterKeyHint="go"
              placeholder="Search a service or condition, e.g. travel jabs"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
              onFocus={() => setOpen(true)}
              onKeyDown={onKeyDown}
              className="flex-1 min-w-0 bg-transparent text-[1rem] text-slate-900 placeholder:text-slate-500 outline-none [&::-webkit-search-cancel-button]:hidden"
            />
            {query && (
              <button
                type="button"
                onClick={() => { setQuery(""); inputRef.current?.focus(); }}
                aria-label="Clear search"
                className="w-9 h-9 rounded-full grid place-items-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X size={16} strokeWidth={2} />
              </button>
            )}
            <button
              type="submit"
              className="inline-flex items-center gap-2 min-h-[48px] px-5 rounded-xl bg-brand-secondary text-white text-[0.95rem] hover:brightness-110 cursor-pointer"
              style={{ fontWeight: 700 }}
            >
              Book
            </button>
          </div>

          {showList && (
            <div
              id={listId}
              role="listbox"
              aria-label="Matching services"
              className="absolute left-0 right-0 top-[calc(100%+8px)] z-30 max-h-[min(24rem,60vh)] overflow-y-auto overscroll-contain rounded-2xl bg-white border border-slate-200 shadow-[0_24px_50px_-20px_rgba(15,23,42,0.35)] p-2"
            >
              {results.length === 0 ? (
                <div className="px-4 py-6 text-center" role="presentation">
                  <p className="text-slate-900" style={{ fontWeight: 600 }}>No services match "{query.trim()}"</p>
                  <p className="text-[0.9rem] text-slate-600 mt-1">Try a different word, or ask our team what we can help with.</p>
                  <a href={`tel:${branch.phone.replace(/\s/g, "")}`} className="mt-3 inline-flex items-center gap-2 text-brand-primary no-underline hover:underline" style={{ fontWeight: 600 }}>
                    <Phone size={15} /> Call {branch.phone}
                  </a>
                </div>
              ) : (
                groups.filter((g) => g.items.length).map((g) => (
                  <div key={g.label} role="group" aria-label={g.label} className="py-1">
                    <p className="px-3 pt-1.5 pb-1 text-[0.75rem] text-slate-500" style={{ fontWeight: 600 }} aria-hidden="true">{g.label}</p>
                    {g.items.map((s) => {
                      optionIndex += 1;
                      const i = optionIndex;
                      const on = i === active;
                      return (
                        <div
                          key={s.id}
                          id={`${listId}-${i}`}
                          role="option"
                          aria-selected={on}
                          onPointerMove={() => setActive(i)}
                          onClick={() => book(s)}
                          className={`flex items-center gap-3 rounded-xl px-3 py-2.5 cursor-pointer ${on ? "bg-brand-light" : ""}`}
                        >
                          <span className={`shrink-0 text-[0.68rem] px-2 py-0.5 rounded-md ${s.kind === "nhs" ? "bg-[#005eb8] text-white" : "bg-slate-100 text-slate-700"}`} style={{ fontWeight: 700 }}>
                            {s.kind === "nhs" ? "NHS" : "Private"}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-[0.95rem] text-slate-900 truncate"><Highlight text={s.name} q={query.trim()} /></span>
                            <span className="block text-[0.8rem] text-slate-500 truncate">{s.category} · {priceLabel(s)}</span>
                          </span>
                          <ArrowRight size={16} className={`shrink-0 text-brand-secondary ${on ? "opacity-100" : "opacity-0"}`} aria-hidden="true" />
                        </div>
                      );
                    })}
                  </div>
                ))
              )}
            </div>
          )}
          <p className="sr-only" aria-live="polite">
            {showList ? (results.length ? `${results.length} services found` : "No services found") : ""}
          </p>
        </div>
      </form>
    </div>
  );
}
