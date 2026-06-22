import { SimpleLanding } from "./LandingPageSimple";
import { strachansBrand } from "../branding";

/** Strachans white-label version of the simple landing page. */
export default function LandingPageStrachans() {
  return <SimpleLanding brand={strachansBrand} />;
}
