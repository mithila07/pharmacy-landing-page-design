import { useMemo, useRef, useState } from "react";
import { Link } from "react-router";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowRight24Regular, Call24Regular, Dismiss24Regular, Dismiss16Regular, Search24Regular } from "@fluentui/react-icons";
import { shivakemBrand } from "../branding";
import { nhsServices, privateServices, type Service } from "../data/services";
import { SK_BRANCH } from "../data/shivakem";
import { HIDDEN_FROM_SEARCH } from "./ServiceSearch";
import { Fl } from "./shivakemUi";

type Kind = "all" | "nhs" | "private";
type Item = Service & { kind: "nhs" | "private" };

/** Every bookable service. Prescription-only medicines are never listed by name (MHRA). */
const ALL: Item[] = [
  ...nhsServices.map((s) => ({ ...s, kind: "nhs" as const })),
  ...privateServices.filter((s) => !HIDDEN_FROM_SEARCH.has(s.id)).map((s) => ({ ...s, kind: "private" as const })),
];

const priceLabel = (s: Item) => {
  if (s.kind === "nhs") return "Free on the NHS";
  const p = (s.price ?? "").replace(/^From\s*/i, "").replace(/^£/, "");
  return p ? `From £${p}` : "Private";
};

/** Every word typed must appear somewhere; name matches rank first. */
function search(items: Item[], q: string) {
  const words = q.toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return items;
  return items
    .map((s) => {
      const name = s.name.toLowerCase();
      const hay = `${name} ${s.description} ${s.category}`.toLowerCase();
      if (!words.every((w) => hay.includes(w))) return null;
      const score = words.reduce((n, w) => n + (name.startsWith(w) ? 3 : name.includes(w) ? 2 : 0), 0);
      return { s, score };
    })
    .filter((x): x is { s: Item; score: number } => !!x)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.s);
}

const FILTERS: { id: Kind; label: string }[] = [
  { id: "all", label: "All services" },
  { id: "nhs", label: "Free on the NHS" },
  { id: "private", label: "Private" },
];

/**
 * "Book an appointment": a dialog listing every service we offer, with a
 * search box and an NHS / private filter. Choosing one opens its booking page.
 * Radix Dialog handles focus trapping, Escape and returning focus to the trigger.
 */
export function BookModalShivakem({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const [q, setQ] = useState("");
  const [kind, setKind] = useState<Kind>("all");
  const input = useRef<HTMLInputElement>(null);

  const results = useMemo(() => search(ALL.filter((s) => kind === "all" || s.kind === kind), q), [q, kind]);
  // Group by category while browsing; a flat ranked list while searching.
  const groups = useMemo(() => {
    if (q.trim()) return [{ title: "", items: results }];
    const map = new Map<string, Item[]>();
    for (const s of results) {
      const key = s.kind === "nhs" ? `${s.category} (NHS)` : s.category;
      map.set(key, [...(map.get(key) ?? []), s]);
    }
    return [...map].map(([title, items]) => ({ title, items }));
  }, [results, q]);

  const reset = (o: boolean) => {
    onOpenChange(o);
    if (!o) { setQ(""); setKind("all"); }
  };

  return (
    <Dialog.Root open={open} onOpenChange={reset}>
      <Dialog.Portal>
        <Dialog.Overlay className="theme-onecare theme-shivakem fixed inset-0 z-[90] bg-oc-ink/45 backdrop-blur-[2px] oc-fade" />
        <Dialog.Content
          onOpenAutoFocus={(e) => { e.preventDefault(); input.current?.focus(); }}
          className="theme-onecare theme-shivakem oc-fade fixed z-[91] inset-x-0 bottom-0 top-[6dvh] sm:inset-auto sm:left-1/2 sm:top-[8dvh] sm:-translate-x-1/2 sm:w-[min(760px,calc(100vw-2rem))] sm:max-h-[84dvh] flex flex-col rounded-t-oc-xl sm:rounded-oc-xl bg-oc-paper shadow-[0_32px_80px_-24px_rgba(10,35,82,0.45)] outline-none overflow-hidden"
        >
          {/* Header: title, search, filters */}
          <div className="px-5 sm:px-8 pt-6 sm:pt-7 pb-5 border-b border-oc-line">
            <div className="flex items-start justify-between gap-4">
              <div>
                <Dialog.Title className="oc-h3 !text-[1.75rem] text-oc-ink">Book an appointment</Dialog.Title>
                <Dialog.Description className="oc-small text-oc-quiet mt-1">Choose a service to see available times.</Dialog.Description>
              </div>
              <Dialog.Close aria-label="Close" className="oc-press shrink-0 w-11 h-11 rounded-full bg-oc-mist text-oc-ink grid place-items-center cursor-pointer">
                <Fl icon={Dismiss24Regular} size={20} />
              </Dialog.Close>
            </div>

            <div className="relative mt-5">
              <label htmlFor="sk-book-search" className="sr-only">Search services</label>
              <Fl icon={Search24Regular} size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-oc-quiet pointer-events-none" />
              <input
                ref={input}
                id="sk-book-search"
                type="search"
                autoComplete="off"
                placeholder="Search, for example travel, ear wax or flu"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="w-full min-h-[52px] rounded-full border border-oc-line-strong bg-white pl-12 pr-12 text-oc-ink placeholder:text-oc-quiet focus:border-oc-dark [&::-webkit-search-cancel-button]:hidden"
              />
              {q && (
                <button type="button" onClick={() => { setQ(""); input.current?.focus(); }} aria-label="Clear search" className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full grid place-items-center text-oc-quiet hover:bg-oc-mist cursor-pointer">
                  <Fl icon={Dismiss16Regular} size={16} />
                </button>
              )}
            </div>

            <div role="group" aria-label="Filter services" className="mt-4 flex flex-wrap gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={kind === f.id}
                  onClick={() => setKind(f.id)}
                  className="oc-press min-h-[40px] px-4 rounded-full border text-[0.9375rem] font-medium cursor-pointer border-oc-line-strong text-oc-ink hover:border-oc-dark aria-pressed:bg-oc-dark aria-pressed:border-oc-dark aria-pressed:text-white"
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="flex-1 overflow-y-auto overscroll-contain px-3 sm:px-5 py-4">
            <p className="sr-only" aria-live="polite">{results.length} {results.length === 1 ? "service" : "services"} found</p>
            {results.length === 0 ? (
              <div className="px-3 py-10 text-center">
                <p className="oc-h3 text-oc-ink">No services match "{q}"</p>
                <p className="oc-body text-oc-quiet mt-2 max-w-[40ch] mx-auto">Try a different word, or call us and we'll tell you if we can help.</p>
                <a href={`tel:${SK_BRANCH.phone.replace(/\s/g, "")}`} className="oc-press mt-5 inline-flex items-center gap-2 min-h-[48px] px-6 rounded-full border border-oc-line-strong text-oc-ink font-semibold oc-tnum">
                  <Fl icon={Call24Regular} size={20} /> {SK_BRANCH.phone}
                </a>
              </div>
            ) : (
              groups.map((g) => (
                <section key={g.title || "results"} aria-label={g.title || "Search results"} className="mb-4 last:mb-0">
                  {g.title && <h3 className="px-3 pt-2 pb-2 text-[0.875rem] font-semibold text-oc-quiet" style={{ fontFamily: "inherit", letterSpacing: "0.01em" }}>{g.title}</h3>}
                  <ul className="grid grid-cols-1">
                    {g.items.map((s) => (
                      <li key={s.id}>
                        <Link
                          to={`${shivakemBrand.basePath}/book/${s.id}`}
                          onClick={() => reset(false)}
                          className="group flex items-center gap-4 min-h-[64px] px-3 py-3 rounded-oc-md hover:bg-oc-tint focus-visible:bg-oc-tint no-underline"
                        >
                          <span className="flex-1 min-w-0">
                            <span className="block font-semibold text-oc-ink">{s.name}</span>
                            <span className="block oc-small text-oc-quiet sm:truncate">{s.description}</span>
                            {/* Phones: price sits under the description */}
                            <span className={`sm:hidden mt-2 inline-block text-[0.8125rem] font-semibold px-2.5 py-0.5 rounded-full ${s.kind === "nhs" ? "bg-oc-mist text-oc-deep" : "bg-white border border-oc-line text-oc-ink"}`}>
                              {priceLabel(s)}
                            </span>
                          </span>
                          <span className={`max-sm:hidden shrink-0 text-[0.8125rem] font-semibold px-2.5 py-1 rounded-full ${s.kind === "nhs" ? "bg-oc-mist text-oc-deep" : "bg-white border border-oc-line text-oc-ink"}`}>
                            {priceLabel(s)}
                          </span>
                          <Fl icon={ArrowRight24Regular} size={18} className="oc-arrow oc-arrow-right text-oc-dark" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ))
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
