import { useState } from "react";
import { useLocation, useSearchParams } from "react-router";
import { SlidersHorizontal, X } from "lucide-react";

/**
 * Floating demo-only control for switching between the default and alternative
 * layout variants of the Central Pharmacy pages, without hand-editing the URL.
 *
 * It reads the current path to decide which toggle to show:
 *   /central            → Hero:    Default | Carousel   (?hero=carousel)
 *   /central/about      → Layout:  Default | Alternative (?layout=alt)
 *   /central/contact    → Layout:  Default | Alternative (?layout=alt)
 *
 * Styled as a neutral dark overlay (not brand-themed) so it reads as a tooling
 * control rather than part of the site. Purely for demos — mount only where wanted.
 */
type Config = { title: string; param: string; altValue: string; altLabel: string };

function configFor(pathname: string): Config | null {
  const p = pathname.replace(/\/+$/, "");
  if (p.endsWith("/central/about")) return { title: "About layout", param: "layout", altValue: "alt", altLabel: "Alternative" };
  if (p.endsWith("/central/contact")) return { title: "Contact layout", param: "layout", altValue: "alt", altLabel: "Alternative" };
  if (p.endsWith("/central")) return { title: "Hero section", param: "hero", altValue: "carousel", altLabel: "Carousel" };
  return null;
}

export function DemoVariantSwitcher() {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [hidden, setHidden] = useState(false);

  const config = configFor(pathname);
  if (!config) return null;

  const isAlt = searchParams.get(config.param) === config.altValue;

  const select = (alt: boolean) => {
    const next = new URLSearchParams(searchParams);
    if (alt) next.set(config.param, config.altValue);
    else next.delete(config.param);
    setSearchParams(next, { replace: true });
  };

  if (hidden) {
    return (
      <button
        onClick={() => setHidden(false)}
        aria-label="Show demo layout switcher"
        className="fixed bottom-5 right-5 z-[55] w-11 h-11 rounded-full bg-slate-900 text-white shadow-lg ring-1 ring-white/10 flex items-center justify-center hover:bg-slate-800 transition-colors cursor-pointer"
      >
        <SlidersHorizontal size={18} />
      </button>
    );
  }

  const optionClass = (active: boolean) =>
    `px-3.5 py-1.5 rounded-full text-[0.8rem] transition-colors cursor-pointer ${
      active ? "bg-white text-slate-900" : "text-slate-300 hover:text-white"
    }`;

  return (
    <div className="fixed bottom-5 right-5 z-[55] rounded-2xl bg-slate-900/95 backdrop-blur-md text-white shadow-xl ring-1 ring-white/10 px-3.5 py-3 w-[15.5rem]">
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <span className="inline-flex items-center gap-1.5 text-[0.68rem] uppercase tracking-[0.14em] text-slate-400" style={{ fontWeight: 700 }}>
          <SlidersHorizontal size={12} /> Demo
        </span>
        <button onClick={() => setHidden(true)} aria-label="Hide switcher" className="text-slate-400 hover:text-white transition-colors cursor-pointer -mr-1 p-1">
          <X size={14} />
        </button>
      </div>

      <p className="text-[0.8rem] text-slate-400 mb-2" style={{ fontWeight: 500 }}>{config.title}</p>

      <div role="group" aria-label={config.title} className="flex items-center gap-1 bg-slate-800/80 rounded-full p-1">
        <button onClick={() => select(false)} aria-pressed={!isAlt} className={`flex-1 ${optionClass(!isAlt)}`} style={{ fontWeight: 600 }}>
          Default
        </button>
        <button onClick={() => select(true)} aria-pressed={isAlt} className={`flex-1 ${optionClass(isAlt)}`} style={{ fontWeight: 600 }}>
          {config.altLabel}
        </button>
      </div>
    </div>
  );
}
