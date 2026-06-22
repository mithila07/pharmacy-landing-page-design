import { useState } from "react";
import { MapPin, ChevronDown, Check, Navigation, Building2, LocateFixed } from "lucide-react";
import { distanceMiles, type PharmacyLocation } from "../data/locations";
import type { LocationReason } from "../useLocation";

type Props = {
  selected: PharmacyLocation;
  reason: LocationReason;
  locations: PharmacyLocation[];
  userCoords: { lat: number; lng: number } | null;
  onSelect: (id: string) => void;
};

const reasonChip: Record<LocationReason, { label: string; className: string }> = {
  locating: { label: "Finding nearest…", className: "bg-amber-100 text-amber-700" },
  geo: { label: "Nearest to you", className: "bg-brand-primary/10 text-brand-primary" },
  default: { label: "Default branch", className: "bg-gray-100 text-gray-500" },
  manual: { label: "Your choice", className: "bg-brand-secondary/10 text-brand-secondary" },
};

/**
 * Branch picker for the booking flow. Always visible so the visitor knows
 * which location (ConX account) they're booking against, with a clear reason
 * for the auto-selection and a one-tap way to change it.
 */
export function BranchSelector({ selected, reason, locations, userCoords, onSelect }: Props) {
  const [open, setOpen] = useState(false);
  const chip = reasonChip[reason];

  const fmtDistance = (loc: PharmacyLocation) =>
    userCoords ? `${distanceMiles(userCoords, loc).toFixed(1)} mi away` : null;

  return (
    <div className="rounded-xl border border-brand-primary/20 bg-white shadow-sm overflow-hidden">
      <div className="flex items-center gap-3 p-4">
        <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center shrink-0">
          <MapPin size={18} className="text-brand-primary" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[0.68rem] uppercase tracking-wide text-gray-400" style={{ fontWeight: 700 }}>
              Your branch
            </span>
            <span className={`inline-flex items-center gap-1 text-[0.68rem] px-2 py-0.5 rounded-full ${chip.className}`} style={{ fontWeight: 600 }}>
              {reason === "geo" && <LocateFixed size={10} />}
              {chip.label}
            </span>
          </div>
          <p className="text-[0.95rem] text-gray-900 truncate" style={{ fontWeight: 700 }}>{selected.name}</p>
          <p className="text-[0.8rem] text-gray-500 truncate">{selected.address}</p>
        </div>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-brand-primary/30 text-brand-primary text-[0.82rem] hover:bg-brand-light/60 transition-colors cursor-pointer"
          style={{ fontWeight: 600 }}
        >
          Change
          <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
      </div>

      {open && (
        <div className="border-t border-gray-100 p-2.5 space-y-2">
          <p className="px-2 pt-1 pb-0.5 text-[0.72rem] text-gray-400 flex items-center gap-1.5">
            <Building2 size={12} /> Choose a branch to book at
          </p>
          {locations.map((loc) => {
            const isSelected = loc.id === selected.id;
            const dist = fmtDistance(loc);
            return (
              <button
                key={loc.id}
                type="button"
                onClick={() => { onSelect(loc.id); setOpen(false); }}
                className={`w-full text-left flex items-start gap-3 p-3 rounded-lg border transition-colors cursor-pointer ${
                  isSelected
                    ? "border-brand-primary bg-brand-primary/5"
                    : "border-gray-100 hover:border-brand-primary/40 hover:bg-brand-light/30"
                }`}
              >
                <span className={`mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${isSelected ? "border-brand-primary bg-brand-primary text-white" : "border-gray-300 text-transparent"}`}>
                  <Check size={12} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-2">
                    <span className="text-[0.9rem] text-gray-900 truncate" style={{ fontWeight: 600 }}>{loc.shortName}</span>
                    {dist && (
                      <span className="shrink-0 inline-flex items-center gap-1 text-[0.72rem] text-brand-primary" style={{ fontWeight: 600 }}>
                        <Navigation size={10} /> {dist}
                      </span>
                    )}
                  </span>
                  <span className="block text-[0.78rem] text-gray-500 truncate">{loc.address}</span>
                  <span className="block text-[0.74rem] text-gray-400 mt-0.5">{loc.phone}</span>
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
