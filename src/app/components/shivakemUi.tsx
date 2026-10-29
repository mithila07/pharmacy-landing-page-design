import type { CSSProperties } from "react";
import { ArrowRight24Regular, ArrowUpRight24Regular, type FluentIcon } from "@fluentui/react-icons";

/**
 * Shivakem shared UI. Shivakem runs on the One Care design system (buttons,
 * tokens, 3D tiles come from `onecareUi`), with two swaps:
 *  - interface icons are Fluent UI (`Fl`), never Phosphor;
 *  - 3D illustrations are the blue-recoloured set (`skIc` in data/shivakem).
 * Both are decorative; the adjacent text always carries the meaning.
 */

/** A Fluent UI icon at any pixel size. Decorative by default. */
export function Fl({ icon: Icon, size = 20, className = "", style }: { icon: FluentIcon; size?: number; className?: string; style?: CSSProperties }) {
  return <Icon aria-hidden="true" className={`shrink-0 ${className}`} style={{ width: size, height: size, ...style }} />;
}

/** Direction arrow that nudges on hover of the parent `.group` (same motion as One Care). */
export function SkArrow({ dir = "right", size = 18, className = "" }: { dir?: "right" | "up-right"; size?: number; className?: string }) {
  return <Fl icon={dir === "right" ? ArrowRight24Regular : ArrowUpRight24Regular} size={size} className={`oc-arrow oc-arrow-${dir} ${className}`} />;
}

/** Root classes for every Shivakem page: One Care's system, re-pointed to Shivakem blue. */
export const SK_ROOT = "theme-onecare theme-shivakem oc-page min-h-screen bg-oc-paper";
