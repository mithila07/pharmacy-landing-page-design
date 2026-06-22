import { createBrowserRouter } from "react-router";
import LandingPage from "./pages/LandingPage";
import LandingPageSimple from "./pages/LandingPageSimple";
import LandingPageStrachans from "./pages/LandingPageStrachans";
import LandingPageCanada from "./pages/LandingPageCanada";
import AboutPageStrachans from "./pages/AboutPageStrachans";
import BlogPageStrachans from "./pages/BlogPageStrachans";
import BlogPostStrachans from "./pages/BlogPostStrachans";
import ContactPageStrachans from "./pages/ContactPageStrachans";
import BookingPage from "./pages/BookingPage";
import QuestionnairePage from "./pages/QuestionnairePage";
import { strachansBrand, canadaBrand } from "./branding";

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

  // Canada Pharmacy — separate brand & design language
  { path: "/canada", Component: LandingPageCanada },
  { path: "/canada/book/:serviceId", element: <BookingPage brand={canadaBrand} /> },
  { path: "/canada/questionnaire/:serviceId", element: <QuestionnairePage brand={canadaBrand} /> },
]);
