import { SimpleLanding } from "./LandingPageSimple";
import { healthcheckBrand } from "../branding";

/** HealthCheck Pharmacy & Clinic — reuses the shared landing with its own
 *  hero, theme and (no) blog. */
export default function LandingPageHealthCheck() {
  return <SimpleLanding brand={healthcheckBrand} />;
}
