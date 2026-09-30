import { onecareBrand } from "../branding";
import { useSeo } from "../seo";
import { HeaderOneCare } from "../components/HeaderOneCare";
import { FooterOneCare } from "../components/FooterOneCare";
import { Eyebrow, OneCareBranchProvider, Tbc } from "../components/onecareUi";
import { useOneCarePage } from "./onecarePage";

/** Accessibility statement — stub until the client supplies content (DESIGN.md §10). */
export default function AccessibilityPageOneCare() {
  useSeo({
    title: "Accessibility statement | OneCare Pharmacy",
    description: "How we make the OneCare Pharmacy website accessible, and how to contact us if something doesn't work for you.",
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
              <p><Tbc>[REPLACE: full accessibility statement: known issues, date last reviewed, and how to request information in another format]</Tbc></p>
              <p>If something on this site doesn't work for you, please contact either branch. <Tbc>[REPLACE: contact email / phone]</Tbc></p>
            </div>
          </div>
        </main>
        <FooterOneCare />
      </div>
    </OneCareBranchProvider>
  );
}
