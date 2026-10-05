import { createContext, useContext, useState, type ReactNode } from "react";
import { Link } from "react-router";
import { ArrowRight, ArrowUpRight, NavigationArrow, Phone, type Icon as PhIcon } from "@phosphor-icons/react";
import { onecareBrand } from "../branding";
import { OC_BRANCHES, isTbc, type BranchId, type OCBranch } from "../data/onecare";
import { useOpenNow, type OpenNow } from "../onecareOpenNow";

/**
 * One Care shared UI. Two icon families, never mixed:
 *  - Icon3D: the generated 3D illustrations, for service and content tiles.
 *  - Ph: Phosphor icons in the duotone weight, for buttons, links, the footer,
 *    contact details and other interface chrome.
 * Both are decorative; the adjacent text always carries the meaning.
 */

// ── Buttons (tokens only — no stray hex) ─────────────────────────────────
// Shape rule: every button and chip is a full pill; cards are 24px; images 20px.
export const BTN_BASE =
  "oc-press inline-flex items-center justify-center gap-2.5 min-h-[48px] px-6 rounded-full font-semibold whitespace-nowrap no-underline cursor-pointer disabled:cursor-not-allowed";
export const BTN_PRIMARY = `${BTN_BASE} bg-oc-dark text-white hover:bg-oc-deep`;
export const BTN_SECONDARY = `${BTN_BASE} bg-white/70 text-oc-ink border border-oc-line-strong hover:border-oc-dark hover:text-oc-deep`;
export const BTN_ON_DARK = `${BTN_BASE} bg-oc-paper text-oc-ink hover:bg-oc-mist`;

/** A generated 3D illustration. Decorative: the adjacent text carries the meaning. */
export function Icon3D({ src, size = 40, className = "" }: { src: string; size?: number; className?: string }) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      className={`shrink-0 select-none drop-shadow-[0_6px_10px_rgba(18,59,57,0.16)] ${className}`}
      style={{ width: size, height: size }}
    />
  );
}

/** Phosphor icon in the duotone weight (interface icons only). */
export function Ph({ icon: Icon, size = 20, className = "" }: { icon: PhIcon; size?: number; className?: string }) {
  return <Icon size={size} weight="duotone" aria-hidden="true" className={`shrink-0 ${className}`} />;
}

/** Direction arrow (Phosphor duotone) that nudges on hover of the parent `.group`. */
export function Arrow({ dir = "right", size = 18, className = "" }: { dir?: "right" | "up-right"; size?: number; className?: string }) {
  return <Ph icon={dir === "right" ? ArrowRight : ArrowUpRight} size={size} className={`oc-arrow oc-arrow-${dir} ${className}`} />;
}

// ── Motifs ───────────────────────────────────────────────────────────────

/** 12px three-tone square cluster that opens a section eyebrow. */
export function SquareCluster() {
  return (
    <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true" className="shrink-0">
      <rect x="0" y="0" width="5.5" height="5.5" rx="1" fill="var(--cross-dark)" />
      <rect x="6.5" y="0" width="5.5" height="5.5" rx="1" fill="var(--cross-mid)" />
      <rect x="0" y="6.5" width="5.5" height="5.5" rx="1" fill="var(--cross-light)" />
    </svg>
  );
}

export function Eyebrow({ children, onDark = false }: { children: ReactNode; onDark?: boolean }) {
  return (
    <p className={`oc-eyebrow inline-flex items-center gap-2.5 ${onDark ? "text-oc-light" : "text-oc-deep"}`}>
      <SquareCluster />
      {children}
    </p>
  );
}

/**
 * Branch pin — a mini cross. Bewick Road: filled arms, dark-teal centre.
 * Branch 2: outlined arms, mid-teal centre. Different in shape AND tone.
 */
export function BranchPin({ branch, size = 22 }: { branch: OCBranch; size?: number }) {
  const outlined = branch.pin === "mid";
  const centre = outlined ? "var(--cross-mid)" : "var(--cross-dark)";
  const arm = outlined
    ? { fill: "none", stroke: "var(--cross-mid)", strokeWidth: 10 }
    : { fill: "var(--cross-light)" };
  return (
    <svg viewBox="0 0 150 150" width={size} height={size} aria-hidden="true" className="shrink-0">
      <rect x="50" y="10" width="50" height="50" rx="8" {...arm} />
      <rect x="10" y="50" width="50" height="50" rx="8" {...arm} />
      <rect x="90" y="50" width="50" height="50" rx="8" {...arm} />
      <rect x="50" y="90" width="50" height="50" rx="8" {...arm} />
      <rect x="45" y="45" width="60" height="60" rx="8" fill={centre} />
    </svg>
  );
}

/** Open-now indicator: a single square — solid when open, outlined when closed. Always paired with text. */
export function OpenSquare({ state }: { state: OpenNow["state"] }) {
  const cls =
    state === "open" ? "bg-oc-open border-oc-open"
    : state === "closing" ? "bg-oc-closing border-oc-closing"
    : state === "unknown" ? "border-dashed border-oc-quiet"
    : "border-oc-quiet";
  return <span aria-hidden="true" className={`inline-block w-2.5 h-2.5 rounded-[2px] border-2 shrink-0 ${cls}`} />;
}

export function OpenStatus({ status, compact = false, onDark = false }: { status: OpenNow; compact?: boolean; onDark?: boolean }) {
  const tone = onDark ? "text-white" : status.state === "closing" ? "text-oc-closing" : status.state === "open" ? "text-oc-open" : "text-oc-quiet";
  return (
    <span className="inline-flex items-center gap-2 min-w-0">
      <OpenSquare state={status.state} />
      <span className={`${tone} font-semibold`}>{status.headline}</span>
      {!compact && status.detail && !status.detail.startsWith("[REPLACE") && (
        <span className={onDark ? "text-white/80" : "text-oc-quiet"}>{status.detail}</span>
      )}
    </span>
  );
}

/** A still-unknown value, rendered visibly (never as a live link). */
export function Tbc({ children }: { children: ReactNode }) {
  return <span className="font-mono text-[0.85em] text-oc-quiet bg-oc-mist border border-dashed border-oc-line-strong rounded-oc-sm px-1.5 py-0.5">{children}</span>;
}

// ── Branch context (open-now for the footer and contact page) ────────────

// Same key the shared booking flow (useResolvedLocation) reads.
const STORAGE_KEY = `conx:branch:${onecareBrand.id}`;

type BranchCtx = {
  branchId: BranchId | null;
  setBranch: (id: BranchId) => void;
  statuses: Record<string, OpenNow>;
};
const Ctx = createContext<BranchCtx | null>(null);

export function OneCareBranchProvider({ children }: { children: ReactNode }) {
  const statuses = useOpenNow(OC_BRANCHES);
  const [branchId, setBranchId] = useState<BranchId | null>(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      return OC_BRANCHES.some((b) => b.id === saved) ? (saved as BranchId) : null;
    } catch { return null; }
  });
  const setBranch = (id: BranchId) => {
    setBranchId(id);
    try { window.localStorage.setItem(STORAGE_KEY, id); } catch { /* storage blocked, keep in memory */ }
  };
  return <Ctx.Provider value={{ branchId, setBranch, statuses }}>{children}</Ctx.Provider>;
}

export function useBranch() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useBranch must be used inside OneCareBranchProvider");
  return v;
}

// ── Contact actions (placeholders stay visible, never dead links) ─────────

export function CallAction({ branch, className = "" }: { branch: OCBranch; className?: string }) {
  if (isTbc(branch.phone)) {
    return (
      <span className={`${BTN_SECONDARY} opacity-80 cursor-default ${className}`} aria-disabled="true">
        <Ph icon={Phone} /> <Tbc>Phone [REPLACE]</Tbc>
      </span>
    );
  }
  return (
    <a href={`tel:${branch.phone.replace(/\s/g, "")}`} className={`${BTN_SECONDARY} ${className}`}>
      <Ph icon={Phone} />
      <span className="oc-tnum">Call</span>
      <span className="sr-only"> {branch.shortName} on {branch.phone}</span>
    </a>
  );
}

export function DirectionsAction({ branch, className = "" }: { branch: OCBranch; className?: string }) {
  if (isTbc(branch.mapsUrl)) {
    return (
      <span className={`${BTN_SECONDARY} opacity-80 cursor-default ${className}`} aria-disabled="true">
        <Ph icon={NavigationArrow} /> <Tbc>Maps [REPLACE]</Tbc>
      </span>
    );
  }
  return (
    <a href={branch.mapsUrl} target="_blank" rel="noopener noreferrer" className={`${BTN_SECONDARY} ${className}`}>
      <Ph icon={NavigationArrow} /> Directions
      <span className="sr-only"> to {branch.shortName} (opens Google Maps in a new tab)</span>
    </a>
  );
}

// ── Booking ──────────────────────────────────────────────────────────────

export const bookPath = (serviceId: string) => `${onecareBrand.basePath}/book/${serviceId}`;

/**
 * "Book" goes straight to the booking page for that service. The patient
 * picks their branch there, so there's no branch step on the home page.
 */
export function BookLink({ serviceId, children, className, ariaLabel }: {
  serviceId: string; children: ReactNode; className?: string; ariaLabel?: string;
}) {
  return (
    <Link to={bookPath(serviceId)} aria-label={ariaLabel} className={className}>
      {children}
    </Link>
  );
}
