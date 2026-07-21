import { SimpleLanding } from "./LandingPageSimple";
import { kepplelaneBrand } from "../branding";

/** Kepple Lane Pharmacy (Garstang) — reuses the shared landing with its own
 *  hero, violet theme and private-clinic mix. No blog. */
export default function LandingPageKepple() {
  return <SimpleLanding brand={kepplelaneBrand} />;
}
