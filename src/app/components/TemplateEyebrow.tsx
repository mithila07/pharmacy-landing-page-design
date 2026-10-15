import type { ReactNode } from "react";

/**
 * The one eyebrow style for template sites (Meadows, J Morris, Acre): small
 * uppercase text in the brand's secondary colour. The home hero alone adds a
 * short accent bar in front (`bar`).
 * Use it above every section heading so labels look the same on every page.
 */
export function TemplateEyebrow({ children, onDark = false, center = false, bar = false, className = "" }: {
  children: ReactNode;
  /** Leading accent bar. Reserved for the home hero. */
  bar?: boolean;
  /** White text for use over photos or dark panels. */
  onDark?: boolean;
  /** Centre it above a centred heading. */
  center?: boolean;
  className?: string;
}) {
  return (
    <p
      className={`flex items-center gap-2.5 text-[0.78rem] uppercase tracking-[0.14em] leading-none ${center ? "justify-center" : ""} ${onDark ? "text-white/90" : "text-brand-secondary"} ${className}`}
      style={{ fontWeight: 700 }}
    >
      {bar && <span aria-hidden="true" className={`w-6 h-[2px] rounded-full ${onDark ? "bg-white/70" : "bg-brand-secondary"}`} />}
      {children}
    </p>
  );
}
