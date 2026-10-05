import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import heroVideo from "../../assets/onecare/hero-consult.mp4";
import heroPoster from "../../assets/onecare/hero-poster.webp";
import { OC_IMAGES, ic } from "../data/onecare";
import { prefersReducedMotion } from "../onecareMotion";
import { CalendarCheck } from "@phosphor-icons/react";
import { Arrow, BTN_PRIMARY, BTN_SECONDARY, Icon3D, Ph } from "./onecareUi";

/** A photo set inline between headline words, at type height. Decorative. */
function Pill({ src, pos = "50% 50%" }: { src: string; pos?: string }) {
  return (
    <span className="oc-pill-img" data-hero-pill aria-hidden="true">
      <img src={src} alt="" style={{ objectPosition: pos }} />
    </span>
  );
}

/** Words wrapped for the entrance stagger; screen readers get the plain sentence from the h1's aria-label. */
function Words({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <span key={i} data-hero-word className="inline-block">{w}&nbsp;</span>
      ))}
    </>
  );
}

/** Small frosted label that sits in the clip's empty corners. */
function FloatChip({ icon, children, className }: { icon: string; children: string; className: string }) {
  return (
    <div data-hero-chip aria-hidden="true" className={`oc-glass absolute rounded-full pl-2 pr-4 py-1.5 flex items-center gap-2 text-[0.875rem] font-semibold text-oc-ink ${className}`}>
      <Icon3D src={icon} size={42} className="-my-1.5" />
      {children}
    </div>
  );
}

/**
 * The consultation clip. It is filmed on pure white and blended with
 * `multiply`, so the white drops out and the people sit straight on the page,
 * in every browser. Reduced motion (or a failed load) keeps the still poster.
 */
function ConsultationClip() {
  const video = useRef<HTMLVideoElement>(null);
  const [still, setStill] = useState(false);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (prefersReducedMotion()) { setStill(true); return; }
    // Only play while on screen; saves battery and data on long pages.
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) v.play().catch(() => setStill(true)); else v.pause(); });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <div className="oc-clip relative mx-auto w-full max-w-[600px] aspect-square">
      {/* Soft brand disc behind the people; the clip multiplies onto it. */}
      <div data-hero-disc aria-hidden="true" className="absolute inset-[6%] rounded-full bg-gradient-to-br from-oc-mist via-[#dff0ee] to-white" />
      {still ? (
        <img data-hero-media src={heroPoster} alt="A One Care pharmacist explaining a medicine to an older patient" className="relative w-full h-full object-contain mix-blend-multiply" />
      ) : (
        <video
          ref={video}
          data-hero-media
          className="relative w-full h-full object-contain mix-blend-multiply"
          src={heroVideo}
          poster={heroPoster}
          muted
          loop
          playsInline
          preload="auto"
          aria-label="A One Care pharmacist explaining a medicine to an older patient"
        />
      )}
      <FloatChip icon={ic.stethoscope} className="top-[4%] right-[-2%] sm:right-[2%]">Pharmacy First</FloatChip>
      <FloatChip icon={ic.airplane} className="bottom-[20%] left-0 sm:left-[-6%]">Travel clinic</FloatChip>
    </div>
  );
}

export function HeroSectionOneCare() {
  const root = useRef<HTMLElement>(null);

  // Entrance: words rise in sequence, then the photos open, then the clip and its labels.
  useLayoutEffect(() => {
    if (!root.current || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from("[data-hero-word]", { yPercent: 60, autoAlpha: 0, duration: 1, stagger: 0.05 })
        .from("[data-hero-pill]", { scale: 0.4, autoAlpha: 0, duration: 0.9, stagger: 0.12, transformOrigin: "50% 50%" }, 0.25)
        .from("[data-hero-rise]", { y: 24, autoAlpha: 0, duration: 0.9, stagger: 0.08 }, 0.45)
        // Animate the disc and the clip themselves, never their wrapper: a transform on an
        // ancestor would isolate the multiply blend and flash the clip's white background.
        .from("[data-hero-disc]", { scale: 0.85, autoAlpha: 0, duration: 1.2 }, 0.15)
        .from("[data-hero-media]", { y: 40, autoAlpha: 0, duration: 1.2 }, 0.3)
        .from("[data-hero-chip]", { y: 16, scale: 0.9, autoAlpha: 0, duration: 0.8, stagger: 0.15 }, 0.9);
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} aria-labelledby="oc-hero-title" className="oc-hero-wash relative -mt-[76px] pt-[108px] lg:pt-[112px] pb-8 lg:pb-10 overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 grid gap-6 lg:grid-cols-12 lg:gap-8 items-center">
        <div className="lg:col-span-6 xl:col-span-7">
          <h1 id="oc-hero-title" aria-label="Your local pharmacy, twice over." className="oc-display text-oc-ink max-w-[13ch] lg:max-w-none">
            <Words text="Your local" /> <Pill src={OC_IMAGES.imgPharmacist} pos="45% 30%" /> <Words text="pharmacy," />{" "}
            <Words text="twice" /> <Pill src={OC_IMAGES.imgFamily} pos="50% 35%" />{" "}
            <span data-hero-word className="inline-block text-oc-dark">over.</span>
          </h1>
          <p data-hero-rise className="oc-lead text-oc-quiet mt-7 max-w-[46ch]">
            NHS Pharmacy First, vaccinations and private clinics, with a pharmacist who has time to talk. Walk in or book online.
          </p>
          <div data-hero-rise className="mt-9 flex flex-wrap gap-3">
            <a href="#nhs-services" className={BTN_PRIMARY}>
              <Ph icon={CalendarCheck} size={20} /> Book an appointment
            </a>
            <a href="#travel-clinic" className={`${BTN_SECONDARY} group`}>
              Travel clinic <Arrow />
            </a>
          </div>
        </div>

        <div className="lg:col-span-6 xl:col-span-5">
          <ConsultationClip />
        </div>
      </div>
    </section>
  );
}
