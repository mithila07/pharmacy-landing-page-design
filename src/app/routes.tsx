import { createBrowserRouter } from "react-router";
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
import { strachansBrand, canadaBrand, healthcheckBrand } from "./branding";

export const router = createBrowserRouter([
  { path: "/", Component: LandingPage },
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
]);
