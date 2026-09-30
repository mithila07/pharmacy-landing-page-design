import { useEffect, useRef, useState } from "react";
import type { Brand } from "./branding";
import { distanceMiles, type PharmacyLocation } from "./data/locations";

/** How the current branch came to be selected. */
export type LocationReason = "default" | "geo" | "manual" | "locating";

type UserCoords = { lat: number; lng: number };

const storageKey = (brandId: string) => `conx:branch:${brandId}`;

/**
 * Resolves which branch a visitor is booking at, mirroring ConX's
 * per-account-per-location model:
 *
 *  1. A previously chosen branch (localStorage) wins — it's sticky across the session.
 *  2. Otherwise, with the visitor's permission, the nearest branch by geolocation.
 *  3. If permission is denied/unavailable, the admin-set default branch.
 *
 * The default is shown immediately so there is always a valid selection; the
 * nearest branch swaps in once geolocation resolves (unless the user has since
 * chosen one manually).
 */
export function useResolvedLocation(brand: Brand) {
  const locations = brand.locations;
  const defaultLocation =
    locations.find((l) => l.isDefault) ?? locations[0];

  const saved = typeof window !== "undefined" ? window.localStorage.getItem(storageKey(brand.id)) : null;
  const savedValid = saved && locations.some((l) => l.id === saved) ? saved : null;

  const [selectedId, setSelectedId] = useState<string>(savedValid ?? defaultLocation.id);
  const [reason, setReason] = useState<LocationReason>(savedValid ? "manual" : "default");
  const [userCoords, setUserCoords] = useState<UserCoords | null>(null);
  const manualRef = useRef<boolean>(Boolean(savedValid));

  useEffect(() => {
    // Single-location brands or an existing choice need no geolocation.
    if (locations.length <= 1 || savedValid) return;
    if (typeof navigator === "undefined" || !("geolocation" in navigator)) return;

    setReason("locating");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserCoords(coords);
        if (manualRef.current) return; // user picked a branch while we were locating
        // Branches with unknown coordinates sort last instead of poisoning the comparison.
        const dist = (l: PharmacyLocation) => {
          const d = distanceMiles(coords, l);
          return Number.isFinite(d) ? d : Number.POSITIVE_INFINITY;
        };
        const nearest = [...locations].sort((a, b) => dist(a) - dist(b))[0];
        setSelectedId(nearest.id);
        setReason("geo");
      },
      () => {
        // Denied / unavailable / timed out → keep the admin default.
        if (!manualRef.current) setReason("default");
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 10 * 60 * 1000 }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brand.id]);

  const selectLocation = (id: string) => {
    if (!locations.some((l) => l.id === id)) return;
    manualRef.current = true;
    setSelectedId(id);
    setReason("manual");
    if (typeof window !== "undefined") window.localStorage.setItem(storageKey(brand.id), id);
  };

  const selected: PharmacyLocation =
    locations.find((l) => l.id === selectedId) ?? defaultLocation;

  return { selected, reason, locations, userCoords, selectLocation };
}
