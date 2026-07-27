import { createBrowserRouter } from "react-router";
import PharmacyIndex from "./pages/PharmacyIndex";
import LandingPage from "./pages/LandingPage";
import LandingPageSimple from "./pages/LandingPageSimple";
import LandingPageStrachans from "./pages/LandingPageStrachans";
import LandingPageCanada from "./pages/LandingPageCanada";
import AboutPageICare from "./pages/AboutPageICare";
import ContactPageICare from "./pages/ContactPageICare";
import AboutPageStrachans from "./pages/AboutPageStrachans";
import BlogPageStrachans from "./pages/BlogPageStrachans";
import BlogPostStrachans from "./pages/BlogPostStrachans";
import ContactPageStrachans from "./pages/ContactPageStrachans";
import BookingPage from "./pages/BookingPage";
import QuestionnairePage from "./pages/QuestionnairePage";
import LandingPageHealthCheck from "./pages/LandingPageHealthCheck";
import AboutPageHealthCheck from "./pages/AboutPageHealthCheck";
import ContactPageHealthCheck from "./pages/ContactPageHealthCheck";
import LandingPageKepple from "./pages/LandingPageKepple";
import AboutPageKepple from "./pages/AboutPageKepple";
import ContactPageKepple from "./pages/ContactPageKepple";
import DispensingProcessPageKepple from "./pages/DispensingProcessPageKepple";
import DeliveriesPageKepple from "./pages/DeliveriesPageKepple";
import RolesPageKepple from "./pages/RolesPageKepple";
import UpdatesPageKepple from "./pages/UpdatesPageKepple";
import LandingPageCentral from "./pages/LandingPageCentral";
import AboutPageCentral from "./pages/AboutPageCentral";
import ContactPageCentral from "./pages/ContactPageCentral";
import { strachansBrand, canadaBrand, healthcheckBrand, kepplelaneBrand, centralBrand } from "./branding";

// Under GitHub Pages the app is served from /<repo>/, so routing is scoped to
// Vite's configured base (BASE_URL). Locally this is just "/".
const basename = import.meta.env.BASE_URL.replace(/\/+$/, "") || undefined;

export const router = createBrowserRouter([
  // Showcase index — links out to every white-label pharmacy build.
  { path: "/", Component: PharmacyIndex },
  { path: "/carefirst", Component: LandingPage },
  { path: "/simple", Component: LandingPageSimple },
  { path: "/book/:serviceId", Component: BookingPage },
  { path: "/questionnaire/:serviceId", Component: QuestionnairePage },

  // Strachans white-label brand
  { path: "/strachans", Component: LandingPageStrachans },
  { path: "/strachans/about", Component: AboutPageStrachans },
  { path: "/strachans/blog", Component: BlogPageStrachans },
  { path: "/strachans/blog/:slug", Component: BlogPostStrachans },
  { path: "/strachans/contact", Component: ContactPageStrachans },
  { path: "/strachans/book/:serviceId", element: <BookingPage brand={strachansBrand} /> },
  { path: "/strachans/questionnaire/:serviceId", element: <QuestionnairePage brand={strachansBrand} /> },

  // iCare Pharmacy (Ealing) — separate brand & design language
  { path: "/icare", Component: LandingPageCanada },
  { path: "/icare/about", Component: AboutPageICare },
  { path: "/icare/contact", Component: ContactPageICare },
  { path: "/icare/book/:serviceId", element: <BookingPage brand={canadaBrand} /> },
  { path: "/icare/questionnaire/:serviceId", element: <QuestionnairePage brand={canadaBrand} /> },

  // HealthCheck Pharmacy & Clinic (Bradford) — no blog
  { path: "/healthcheck", Component: LandingPageHealthCheck },
  { path: "/healthcheck/about", Component: AboutPageHealthCheck },
  { path: "/healthcheck/contact", Component: ContactPageHealthCheck },
  { path: "/healthcheck/book/:serviceId", element: <BookingPage brand={healthcheckBrand} /> },
  { path: "/healthcheck/questionnaire/:serviceId", element: <QuestionnairePage brand={healthcheckBrand} /> },

  // Kepple Lane Pharmacy (Garstang) — no blog
  { path: "/kepple-lane", Component: LandingPageKepple },
  { path: "/kepple-lane/about", Component: AboutPageKepple },
  { path: "/kepple-lane/contact", Component: ContactPageKepple },
  // "Dispensary" is a nav group only — it has no page of its own, just these children.
  { path: "/kepple-lane/dispensing-process", Component: DispensingProcessPageKepple },
  { path: "/kepple-lane/deliveries", Component: DeliveriesPageKepple },
  { path: "/kepple-lane/roles", Component: RolesPageKepple },
  { path: "/kepple-lane/updates", Component: UpdatesPageKepple },
  { path: "/kepple-lane/book/:serviceId", element: <BookingPage brand={kepplelaneBrand} /> },
  { path: "/kepple-lane/questionnaire/:serviceId", element: <QuestionnairePage brand={kepplelaneBrand} /> },

  // Central Pharmacy (New Quay) — private-first landing, no blog
  { path: "/central", Component: LandingPageCentral },
  { path: "/central/about", Component: AboutPageCentral },
  { path: "/central/contact", Component: ContactPageCentral },
  { path: "/central/book/:serviceId", element: <BookingPage brand={centralBrand} /> },
  { path: "/central/questionnaire/:serviceId", element: <QuestionnairePage brand={centralBrand} /> },
], { basename });
