import { Outlet, ScrollRestoration } from "react-router";

/**
 * Wraps every route. Scroll handling for the whole app lives here: a new page
 * opens at the top, Back/Forward returns to where you were, and a link with a
 * #hash opens at that section.
 *
 * Keep page-wide CSS `scroll-behavior: smooth` off the <html> element: it would
 * turn this reset into a slow animated scroll from the previous position.
 */
export default function RootLayout() {
  return (
    <>
      <ScrollRestoration />
      <Outlet />
    </>
  );
}
