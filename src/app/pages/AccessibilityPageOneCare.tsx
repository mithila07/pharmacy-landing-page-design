import { onecareBrand } from "../branding";
import { useSeo } from "../seo";
import { HeaderOneCare } from "../components/HeaderOneCare";
import { FooterOneCare } from "../components/FooterOneCare";
import { Eyebrow, OneCareBranchProvider, Tbc } from "../components/onecareUi";
import { useOneCarePage } from "./onecarePage";

/** Accessibility statement — stub until the client supplies content (DESIGN.md §10). */
export default function AccessibilityPageOneCare() {
  useSeo({
    title: "Accessibility statement | One Care Pharmacy",
    description: "How we make the One Care Pharmacy website accessible, and how to contact us if something doesn't work for you.",
    path: `${onecareBrand.basePath}/accessibility`,
    favicon: onecareBrand.favicon,
  });
  useOneCarePage();

  return (
    <OneCareBranchProvider>
      <div className="theme-onecare oc-page min-h-screen bg-oc-paper">
        <HeaderOneCare />
        <main id="main-content" tabIndex={-1} className="outline-none">
          <div className="max-w-[720px] mx-auto px-4 sm:px-6 pt-[clamp(48px,6vw,96px)] pb-[clamp(64px,8vw,128px)]">
            <Eyebrow>Accessibility</Eyebrow>
            <h1 className="oc-h2 text-oc-ink mt-4">Accessibility statement</h1>
            <div className="oc-body text-oc-text mt-6 grid gap-4">
              <p>We want everyone to be able to use this website. It's designed to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA.</p>
              <p>We test the site with a keyboard, a screen reader and at 200% zoom. We're not aware of any parts that fail the standard. If you need information in another format, such as large print or easy read, ask at either branch and we'll arrange it. This statement was last reviewed in October 2026.</p>
              <p>If something on this site doesn't work for you, call Bewick Road on <a href="tel:01914774456" className="text-oc-dark underline underline-offset-4">0191 477 4456</a> or email <a href="mailto:br@onecarepharmacy.co.uk" className="text-oc-dark underline underline-offset-4">br@onecarepharmacy.co.uk</a>.</p>
            </div>
          </div>
        </main>
        <FooterOneCare />
      </div>
    </OneCareBranchProvider>
  );
}
