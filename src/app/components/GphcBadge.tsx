import type { PharmacyLocation } from "../data/locations";
import defaultBadge from "../../assets/gphc-logo.png";

/**
 * GPhC "Registered Pharmacy" badge — a dedicated image PER pharmacy location
 * (each carries its own registration number), linking to that pharmacy's entry
 * on the GPhC register. Until the real per-branch assets/links are supplied,
 * every location falls back to a shared placeholder image and the register URL.
 *
 * TODO: replace `defaultBadge` / `GPHC_URL` per location by setting
 * `location.gphcBadge` and `location.gphcUrl` in data/locations.ts.
 */
const GPHC_URL = "https://www.pharmacyregulation.org/registers";

export function GphcBadge({ location, className = "h-14" }: { location?: PharmacyLocation; className?: string }) {
  const src = location?.gphcBadge ?? defaultBadge;
  const href = location?.gphcUrl ?? GPHC_URL;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="GPhC Registered Pharmacy — view our registration"
      className="inline-block hover:opacity-90 transition-opacity"
    >
      <img src={src} alt="Registered Pharmacy — General Pharmaceutical Council (GPhC)" className={`${className} w-auto`} />
    </a>
  );
}
