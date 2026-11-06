import { Outlet } from "react-router";
import { CookieBannerDewsbury } from "./CookieBannerDewsbury";

/** Wraps every Dewsbury Moor route so the cookie notice appears on whichever page a visitor lands on. */
export function DewsburyLayout() {
  return (
    <div className="theme-dewsbury">
      <Outlet />
      <CookieBannerDewsbury />
    </div>
  );
}
