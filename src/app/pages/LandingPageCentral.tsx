import { SimpleLanding } from "./LandingPageSimple";
import { centralBrand } from "../branding";

/** Central Pharmacy (New Quay) — reuses the shared landing with its own teal
 *  hero, private-first section order and no blog. */
export default function LandingPageCentral() {
  return <SimpleLanding brand={centralBrand} />;
}
