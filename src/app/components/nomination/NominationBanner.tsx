import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Brand } from "../../branding";
import adPhoto from "../../../assets/hero-bg.jpeg";

gsap.registerPlugin(ScrollTrigger);

/** The photo's resting shape on wide screens (keep in sync with the md:[clip-path] class below). */
const SLANT = "polygon(14% 0%, 100% 0%, 100% 100%, 0% 100%)";
const HIDDEN = "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)";

/**
 * Leaderboard ad for repeat-prescription nomination: copy on a light panel,
 * a slanted full-bleed photo, and one round "free" sticker on the seam.
 *
 * Reveal on scroll (desktop/tablet only, once): the panel rises, the photo
 * wipes in to its slant, the copy follows, and the sticker lands last as the
 * payoff. Phones and reduced-motion users get the static banner, untouched.
 */
export function NominationBanner({ brand }: { brand: Brand }) {
  const short = brand.name.replace(" Pharmacy", "");
  const street = brand.locations[0].address.split(",")[0].replace(/^\d+[-\d]*\s*/, "");
  const root = useRef<HTMLElement>(null);

  // Layout effect: initial states are applied before first paint, so nothing flashes.
  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const q = gsap.utils.selector(el);
      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
        scrollTrigger: { trigger: el, start: "top 82%", once: true },
      });
      tl.from(q("[data-ad-card]"), { y: 28, autoAlpha: 0, duration: 0.8 })
        .fromTo(q("[data-ad-photo]"), { clipPath: HIDDEN }, { clipPath: SLANT, duration: 1, ease: "power4.inOut" }, 0.1)
        .from(q("[data-ad-photo] img"), { scale: 1.12, duration: 1.4 }, 0.1)
        .from(q("[data-ad-copy]"), { y: 18, autoAlpha: 0, duration: 0.7, stagger: 0.08 }, 0.35)
        // GSAP owns the transform here, so land on the same -10deg tilt the class gives it.
        .fromTo(q("[data-ad-sticker]"), { scale: 0.3, rotation: -40, autoAlpha: 0 }, { scale: 1, rotation: -10, autoAlpha: 1, duration: 0.6, ease: "back.out(2.2)" }, 0.85);
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} aria-labelledby="nominate-banner-title" className="bg-white py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4">
        <Link
          to={`${brand.basePath}/contact#nominate`}
          data-ad-card
          className="group relative grid md:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] xl:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] overflow-hidden rounded-2xl bg-brand-light ring-1 ring-brand-primary/10 no-underline shadow-[0_20px_40px_-28px_rgba(8,51,68,0.45)]"
        >
          {/* Copy + button */}
          <div className="order-2 md:order-1 grid xl:grid-cols-[minmax(0,1fr)_auto] items-center gap-5 xl:gap-10 px-6 py-7 sm:px-9 md:pr-16 xl:py-0 xl:min-h-[168px]">
            <div className="min-w-0">
              <h2 data-ad-copy id="nominate-banner-title" className="font-display text-brand-primary text-[1.55rem] sm:text-[1.9rem] lg:text-[2.1rem] leading-[1.08] tracking-tight [text-wrap:balance]" style={{ fontWeight: 800 }}>
                Repeat prescriptions, sent straight to us.
              </h2>
              <p data-ad-copy className="mt-2 text-slate-600 text-[1rem] sm:text-[1.05rem]">
                Nominate {short} once and collect on {street}.
              </p>
            </div>
            <span data-ad-copy className="inline-flex items-center justify-center gap-2 min-h-[48px] px-7 rounded-xl bg-brand-secondary text-white whitespace-nowrap justify-self-start group-hover:brightness-110" style={{ fontWeight: 700 }}>
              Nominate us <ArrowRight size={16} aria-hidden="true" />
            </span>
          </div>

          {/* Photo, slanted into the panel on wide screens */}
          <div data-ad-photo className="order-1 md:order-2 relative overflow-hidden h-44 md:h-auto md:min-h-[168px] md:[clip-path:polygon(14%_0%,100%_0%,100%_100%,0%_100%)]">
            <img
              src={adPhoto}
              alt={`A ${short} pharmacist handing a patient her repeat medicine`}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover object-[60%_32%]"
            />
          </div>

          {/* The one ad flourish: a round sticker on the seam */}
          <span
            data-ad-sticker
            aria-hidden="true"
            className="absolute z-10 right-5 top-28 md:top-1/2 md:right-[calc(20rem-3.5rem)] xl:right-[calc(26rem-3.5rem)] md:-mt-[2.625rem] w-[5.25rem] h-[5.25rem] rounded-full bg-brand-cta text-slate-900 grid place-items-center text-center -rotate-[10deg] ring-4 ring-white shadow-[0_10px_20px_-10px_rgba(8,51,68,0.6)]"
          >
            <span className="text-[0.78rem] leading-[1.05]" style={{ fontWeight: 800 }}>Free on<br />the NHS</span>
          </span>
          <span className="sr-only">Nomination is free on the NHS.</span>
        </Link>
      </div>
    </section>
  );
}
