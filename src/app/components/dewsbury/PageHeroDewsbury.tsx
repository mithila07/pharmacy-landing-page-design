import type { ReactNode } from "react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

/**
 * Opening for Dewsbury Moor's inner pages: a full-width photo with a forest
 * gradient on the left only, so the title reads while the rest of the photo
 * stays bright. Actions and a right-hand aside are optional.
 */
export function PageHeroDewsbury({ img, imgPos, title1, title2, intro, actions, aside, labelId }: {
  img: string;
  imgPos?: string;
  title1: string;
  title2: string;
  intro: string;
  actions?: ReactNode;
  aside?: ReactNode;
  labelId: string;
}) {
  return (
    <section aria-labelledby={labelId} className="relative isolate overflow-hidden min-h-[32rem] lg:min-h-[38rem] flex flex-col">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-brand-darkest">
        <ImageWithFallback src={img} alt="" className="w-full h-full object-cover dmp-drift" style={imgPos ? { objectPosition: imgPos } : undefined} />
        {/* Left side only: deep behind the words, clear by the middle */}
        <div className="absolute inset-0 hidden md:block" style={{ background: "linear-gradient(90deg, rgba(2,32,28,0.9) 0%, rgba(2,32,28,0.72) 30%, rgba(2,32,28,0.25) 52%, rgba(2,32,28,0) 66%)" }} />
        {/* Phones: the text spans the width, so the gradient runs up from the foot */}
        <div className="absolute inset-0 md:hidden" style={{ background: "linear-gradient(0deg, rgba(2,32,28,0.92) 0%, rgba(2,32,28,0.74) 55%, rgba(2,32,28,0.4) 100%)" }} />
      </div>

      <div className={`relative flex-1 w-full max-w-7xl mx-auto px-4 grid ${aside ? "lg:grid-cols-[1.25fr_1fr]" : ""} gap-10 items-end pt-24 pb-14 lg:pt-32 lg:pb-16`}>
        <div className="max-w-2xl">
          <h1 id={labelId} className="font-display text-white text-[2.5rem] sm:text-[3.2rem] lg:text-[3.8rem] leading-[1.03]" style={{ fontWeight: 700, letterSpacing: "-0.02em" }}>
            <span className="block [text-wrap:balance]">{title1}</span>
            <span className="block [text-wrap:balance] text-brand-cta">{title2}</span>
          </h1>
          <p className="text-white/85 text-[1.1rem] lg:text-[1.18rem] leading-relaxed mt-6 max-w-xl">{intro}</p>
          {actions && <div className="mt-9 flex flex-wrap gap-3">{actions}</div>}
        </div>
        {aside && <div className="lg:justify-self-end w-full max-w-md">{aside}</div>}
      </div>
    </section>
  );
}
