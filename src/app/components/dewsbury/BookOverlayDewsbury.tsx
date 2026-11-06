import { useMemo, useRef, useState } from "react";
import { Link } from "react-router";
import * as Dialog from "@radix-ui/react-dialog";
import { Phone, Search, Xmark } from "iconoir-react";
import { dewsburyBrand } from "../../branding";
import { templateSites, type QuickService } from "../../data/templateSites";

type Row = QuickService & { group: string };

const PATHS = templateSites.dewsbury.extras?.bookingGroups ?? [];
const ALL: Row[] = PATHS.flatMap((p) => p.services.map((s) => ({ ...s, group: p.label })));

/** Every typed word must appear in the name, note or group. */
const match = (r: Row, q: string) => {
  const hay = `${r.name} ${r.note} ${r.group}`.toLowerCase();
  return q.toLowerCase().split(/\s+/).filter(Boolean).every((w) => hay.includes(w));
};

/**
 * "Book Appointment Now": a full-page view with a large search box and the
 * pharmacy's services grouped by need. Radix Dialog handles focus trapping,
 * Escape and returning focus to the button that opened it.
 */
export function BookOverlayDewsbury({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const [q, setQ] = useState("");
  const [group, setGroup] = useState("all");
  const input = useRef<HTMLInputElement>(null);
  const branch = dewsburyBrand.locations[0];

  const groups = useMemo(() => {
    const rows = ALL.filter((r) => (group === "all" || r.group === group) && match(r, q));
    return PATHS.map((p) => ({ title: p.label, rows: rows.filter((r) => r.group === p.label) })).filter((g) => g.rows.length);
  }, [q, group]);
  const count = groups.reduce((n, g) => n + g.rows.length, 0);

  const close = (o: boolean) => {
    onOpenChange(o);
    if (!o) { setQ(""); setGroup("all"); }
  };

  return (
    <Dialog.Root open={open} onOpenChange={close}>
      <Dialog.Portal>
        <Dialog.Content
          onOpenAutoFocus={(e) => { e.preventDefault(); input.current?.focus(); }}
          className="theme-dewsbury fixed inset-0 z-[80] overflow-y-auto overscroll-contain bg-gradient-to-br from-brand-light via-white to-brand-light-cyan outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:duration-200"
        >
          <div aria-hidden="true" className="pointer-events-none fixed -top-40 -right-40 w-[38rem] h-[38rem] rounded-full bg-brand-cta/20 blur-3xl" />
          <div className="relative max-w-4xl mx-auto px-4 pt-6 pb-20">
            <div className="flex items-center justify-between gap-4">
              <img src={dewsburyBrand.logo} alt="Dewsbury Moor Pharmacy" className="h-12 w-auto" />
              <Dialog.Close aria-label="Close" className="w-12 h-12 rounded-full bg-white shadow-md ring-1 ring-black/5 grid place-items-center text-brand-primary hover:bg-brand-light cursor-pointer">
                <Xmark width={22} height={22} />
              </Dialog.Close>
            </div>

            <Dialog.Title className="font-display text-slate-900 text-[2.2rem] md:text-[3rem] leading-[1.05] mt-12" style={{ fontWeight: 700, letterSpacing: "-0.02em" }}>
              What would you like to book?
            </Dialog.Title>
            <Dialog.Description className="text-slate-600 text-[1.05rem] mt-3">
              Search for a service or choose from the list. Some you can book, others you can just walk in for.
            </Dialog.Description>

            <div className="relative mt-8">
              <label htmlFor="dmp-book-search" className="sr-only">Search services</label>
              <Search width={24} height={24} className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-secondary pointer-events-none" />
              <input
                ref={input}
                id="dmp-book-search"
                type="search"
                autoComplete="off"
                placeholder="For example sore throat, flu jab or blood pressure"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="w-full min-h-[68px] rounded-full bg-white pl-16 pr-6 text-[1.1rem] text-slate-900 placeholder:text-slate-400 shadow-[0_20px_44px_-24px_rgba(31,77,28,0.45)] ring-1 ring-black/5 outline-none focus:ring-2 focus:ring-brand-secondary [&::-webkit-search-cancel-button]:hidden"
              />
            </div>

            <div role="group" aria-label="Filter services" className="mt-5 flex flex-wrap gap-2">
              {[{ id: "all", label: "Everything" }, ...PATHS.map((p) => ({ id: p.label, label: p.label }))].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={group === f.id}
                  onClick={() => setGroup(f.id)}
                  className="min-h-[44px] px-5 rounded-full text-[0.95rem] cursor-pointer transition-colors duration-300 ease-[var(--dmp-ease)] bg-white/80 text-slate-700 ring-1 ring-black/10 hover:bg-white aria-pressed:bg-brand-primary aria-pressed:text-white aria-pressed:ring-brand-primary"
                  style={{ fontWeight: 600 }}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <p className="sr-only" aria-live="polite">{count} {count === 1 ? "service" : "services"} found</p>

            {count === 0 ? (
              <div className="mt-14 text-center">
                <p className="font-display text-slate-900 text-[1.5rem]" style={{ fontWeight: 700 }}>We couldn't find "{q}"</p>
                <p className="text-slate-600 mt-2">Try another word, or give us a call and we'll help.</p>
                <a href={`tel:${branch.phone.replace(/\s/g, "")}`} className="dmp-btn mt-6">Call {branch.phone}</a>
              </div>
            ) : (
              groups.map((g) => (
                <section key={g.title} aria-label={g.title} className="mt-10">
                  <h2 className="text-slate-500 text-[0.95rem] mb-3" style={{ fontWeight: 600 }}>{g.title}</h2>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {g.rows.map((r) => (
                      <li key={r.id}>
                        {r.access === "book" ? (
                          <Link
                            to={`${dewsburyBrand.basePath}/book/${r.id}`}
                            onClick={() => close(false)}
                            className="group flex items-center justify-between gap-4 min-h-[76px] rounded-2xl bg-white px-5 py-4 ring-1 ring-black/5 shadow-sm hover:ring-brand-secondary/50 hover:shadow-md transition-[box-shadow] duration-500 ease-[var(--dmp-ease)] no-underline"
                          >
                            <span className="min-w-0">
                              <span className="block text-slate-900 text-[1.05rem]" style={{ fontWeight: 600 }}>{r.name}</span>
                              <span className="block text-slate-500 text-[0.9rem]">{r.note}</span>
                            </span>
                            <span className="dmp-btn dmp-btn--sm shrink-0">Book</span>
                          </Link>
                        ) : (
                          <div className="flex items-center justify-between gap-4 min-h-[76px] rounded-2xl bg-white/70 px-5 py-4 ring-1 ring-black/5">
                            <span className="min-w-0">
                              <span className="block text-slate-900 text-[1.05rem]" style={{ fontWeight: 600 }}>{r.name}</span>
                              <span className="block text-slate-500 text-[0.9rem]">{r.note}</span>
                            </span>
                            <span className="shrink-0 rounded-full bg-brand-light text-brand-primary px-4 py-2 text-[0.85rem]" style={{ fontWeight: 600 }}>Walk in</span>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </section>
              ))
            )}

            <p className="mt-12 flex items-center gap-2 text-slate-600">
              <Phone width={18} height={18} className="text-brand-secondary shrink-0" />
              Not sure? Call us on <a href={`tel:${branch.phone.replace(/\s/g, "")}`} className="text-brand-primary underline underline-offset-4" style={{ fontWeight: 600 }}>{branch.phone}</a>
            </p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
