import type { ReactNode } from "react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

/**
 * Opening for Dewsbury Moor's inner pages, matching the home hero: a full-width
 * photo under the same forest-green shade, the page's title and actions on the
 * left, and secondary glass cards on the right, bottom-aligned with the left.
 */
export function PageHeroDewsbury({ img, title1, title2, intro, actions, aside, labelId }: {
  img: string;
  title1: string;
  title2: string;
  intro: string;
  actions: ReactNode;
  aside: ReactNode;
  labelId: string;
}) {
  return (
    <section aria-labelledby={labelId} className="relative isolate overflow-hidden min-h-[36rem] lg:min-h-[40rem] flex flex-col">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-brand-darkest">
        <ImageWithFallback src={img} alt="" className="w-full h-full object-cover dmp-drift" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(2,32,28,0.92) 0%, rgba(2,32,28,0.78) 38%, rgba(2,32,28,0.5) 66%, rgba(2,32,28,0.48) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(2,32,28,0.75) 0%, rgba(2,32,28,0) 45%)" }} />
      </div>

      <div className="relative flex-1 w-full max-w-7xl mx-auto px-4 grid lg:grid-cols-[1.25fr_1fr] gap-10 items-end pt-24 pb-14 lg:pt-32 lg:pb-16">
        <div>
          <h1 id={labelId} className="font-display text-white text-[2.5rem] sm:text-[3.2rem] lg:text-[3.8rem] leading-[1.03]" style={{ fontWeight: 700, letterSpacing: "-0.02em" }}>
            <span className="block [text-wrap:balance]">{title1}</span>
            <span className="block [text-wrap:balance] text-brand-cta">{title2}</span>
          </h1>
          <p className="text-white/85 text-[1.1rem] lg:text-[1.18rem] leading-relaxed mt-6 max-w-xl">{intro}</p>
          <div className="mt-9 flex flex-wrap gap-3">{actions}</div>
        </div>
        <div className="lg:justify-self-end w-full max-w-md">{aside}</div>
      </div>
    </section>
  );
}
