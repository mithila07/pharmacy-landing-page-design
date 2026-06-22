import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router";
import { ArrowRight, Star, ArrowUpRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { strachansBrand } from "../branding";
import { pharmacyInfo } from "../data/services";
import nhsBadge from "../../assets/Providing NHS Services RGB BLUE 2.svg";

const cover = (id: string) =>
  `https://images.unsplash.com/photo-${id}?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900`;

type Tile = {
  id: string;
  name: string;
  tagline: string;
  image: string;
  price?: string; // omitted = NHS (shows the NHS lockup)
  nhs?: boolean;
  span: string; // grid placement
};

const TILES: Tile[] = [
  { id: "nhs-pf-sore-throat", name: "Sore Throat Treatment", tagline: "Same-day · no GP needed", image: cover("1576091160550-2173dba999ef"), nhs: true, span: "row-span-2" },
  { id: "prv-weight-consult", name: "Weight Management", tagline: "GLP-1 plans available", image: cover("1522844990619-4951c40f7eda"), price: "From £30", span: "" },
  { id: "prv-ear-wax", name: "Ear Wax Removal", tagline: "Gentle microsuction", image: cover("1758598738326-3bc889d1558d"), price: "From £40", span: "" },
  { id: "prv-travel-consult", name: "Travel Health", tagline: "Vaccines & trip advice", image: cover("1488646953014-85cb44e25828"), price: "From £25", span: "col-span-2" },
];

const stats = [
  { value: "30+", label: "Private services" },
  { value: "3", label: "Local branches" },
  { value: "Same-day", label: "Appointments" },
];

export function HeroSectionStrachans() {
  const root = useRef<HTMLElement>(null);
  const bentoRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const reduce =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const book = (id: string) => navigate(`${strachansBrand.basePath}/book/${id}`);

  useLayoutEffect(() => {
    if (reduce) return;
    let removeParallax: (() => void) | undefined;
    const ctx = gsap.context(() => {
      // Masks start covering each tile, then wipe away.
      gsap.set(".tile-mask", { scaleY: 1, transformOrigin: "bottom" });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-badge", { y: 18, autoAlpha: 0, duration: 0.5 })
        .from(".hero-line", { yPercent: 115, duration: 0.7, stagger: 0.12 }, "-=0.15")
        .from(".hero-accent", { y: 20, autoAlpha: 0, duration: 0.55 }, "-=0.35")
        .fromTo(".hero-underline", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.7 }, "-=0.1")
        .from(".hero-copy", { y: 18, autoAlpha: 0, duration: 0.5 }, "-=0.5")
        .from(".hero-cta", { y: 14, autoAlpha: 0, stagger: 0.1, duration: 0.45 }, "-=0.3")
        .from(".hero-stat", { y: 14, autoAlpha: 0, stagger: 0.08, duration: 0.4 }, "-=0.25")
        .to(".tile-mask", { scaleY: 0, duration: 0.75, stagger: 0.12, ease: "power3.inOut" }, "-=1.0");

      // Ambient drift.
      gsap.to(".orb-1", { x: -26, y: 18, scale: 1.08, duration: 6, ease: "sine.inOut", repeat: -1, yoyo: true });
      gsap.to(".orb-2", { x: 22, y: -16, duration: 7, ease: "sine.inOut", repeat: -1, yoyo: true });

      // Pointer parallax (desktop only).
      if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        const tiles = gsap.utils.toArray<HTMLElement>(".bento-tile");
        const movers = tiles.map((el, i) => ({
          x: gsap.quickTo(el, "x", { duration: 0.7, ease: "power3" }),
          y: gsap.quickTo(el, "y", { duration: 0.7, ease: "power3" }),
          depth: 10 + (i % 3) * 7,
        }));
        const el = bentoRef.current;
        const onMove = (e: MouseEvent) => {
          if (!el) return;
          const r = el.getBoundingClientRect();
          const nx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
          const ny = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
          movers.forEach((m) => { m.x(nx * m.depth); m.y(ny * m.depth); });
        };
        const onLeave = () => movers.forEach((m) => { m.x(0); m.y(0); });
        el?.addEventListener("mousemove", onMove);
        el?.addEventListener("mouseleave", onLeave);
        removeParallax = () => {
          el?.removeEventListener("mousemove", onMove);
          el?.removeEventListener("mouseleave", onLeave);
        };
      }
    }, root);
    return () => {
      removeParallax?.();
      ctx.revert();
    };
  }, [reduce]);

  return (
    <section ref={root} className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-light via-white to-white" />
      <div aria-hidden className="orb-1 absolute -top-24 -right-16 w-[440px] h-[440px] rounded-full bg-brand-secondary/20 blur-3xl" />
      <div aria-hidden className="orb-2 absolute top-1/3 -left-24 w-[380px] h-[380px] rounded-full bg-brand-primary/15 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-12 items-center min-h-[88vh] py-14 lg:py-16">
          {/* Left — copy */}
          <div>
            <div className="hero-badge inline-flex items-center gap-2 bg-white/80 backdrop-blur-md rounded-full pl-1.5 pr-3 py-1.5 shadow-sm border border-brand-primary/10 mb-6">
              <span className="inline-flex items-center gap-1 rounded-full bg-brand-secondary/10 px-2 py-0.5">
                <Star size={11} className="fill-brand-secondary text-brand-secondary" />
                <span className="text-[0.74rem] text-brand-secondary" style={{ fontWeight: 700 }}>{pharmacyInfo.googleRating}</span>
              </span>
              <span className="text-[0.78rem] text-gray-600" style={{ fontWeight: 500 }}>
                Rated by {pharmacyInfo.totalReviews} patients on Google
              </span>
            </div>

            <h1 className="text-[2.4rem] md:text-[3.2rem] leading-[1.15] text-brand-primary mb-5" style={{ fontWeight: 800, letterSpacing: "-0.025em" }}>
              <span className="block overflow-hidden"><span className="hero-line block">Modern healthcare,</span></span>
              <span className="block overflow-hidden"><span className="hero-line block">right on your</span></span>
              <span className="hero-accent inline-block relative w-fit text-brand-secondary">
                doorstep
                <svg aria-hidden className="absolute left-0 -bottom-2 w-full text-brand-secondary/55" height="12" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none">
                  <path className="hero-underline" pathLength={1} style={{ strokeDasharray: 1 }} d="M2 8 C 55 2, 150 2, 198 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            <p className="hero-copy text-gray-500 text-[1.05rem] mb-8 leading-relaxed max-w-lg">
              Skip the GP queue. Book NHS Pharmacy First and private clinics — vaccinations, weight management,
              blood tests and more — with trained pharmacists across our Bury and Uppermill branches.
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-10">
              <button
                onClick={() => scrollTo("nhs-services")}
                className="hero-cta group inline-flex items-center gap-2 bg-brand-primary text-white px-6 py-3 rounded-xl shadow-lg shadow-brand-primary/20 hover:shadow-xl hover:shadow-brand-primary/30 hover:-translate-y-0.5 transition-all cursor-pointer"
                style={{ fontWeight: 600 }}
              >
                Explore Services
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
              <button
                onClick={() => scrollTo("private-services")}
                className="hero-cta inline-flex items-center gap-2 bg-white text-brand-primary border border-brand-primary/20 px-6 py-3 rounded-xl hover:border-brand-secondary/50 hover:text-brand-secondary hover:-translate-y-0.5 transition-all cursor-pointer"
                style={{ fontWeight: 600 }}
              >
                Private Clinics
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 max-w-md">
              {stats.map((s) => (
                <div key={s.label} className="hero-stat rounded-2xl border border-brand-primary/10 bg-white/60 backdrop-blur-sm px-4 py-3">
                  <p className="text-[1.25rem] text-brand-primary leading-none" style={{ fontWeight: 800 }}>{s.value}</p>
                  <p className="text-[0.72rem] text-gray-500 mt-1.5 leading-tight">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — bento gallery of services */}
          <div className="relative">
            <div aria-hidden className="absolute -inset-6 bg-gradient-to-tr from-brand-primary/15 via-brand-accent/10 to-brand-secondary/20 rounded-[2.5rem] blur-2xl" />
            <div ref={bentoRef} className="relative grid grid-cols-2 grid-rows-3 gap-3 h-[480px] sm:h-[560px]" style={{ perspective: 1000 }}>
              {TILES.map((t) => (
                <a
                  key={t.id}
                  href={`${strachansBrand.basePath}/book/${t.id}`}
                  onClick={(e) => { e.preventDefault(); book(t.id); }}
                  aria-label={`Book ${t.name}`}
                  className={`bento-tile group relative overflow-hidden rounded-2xl border border-white/50 shadow-lg shadow-brand-primary/10 cursor-pointer no-underline ${t.span}`}
                >
                  <ImageWithFallback
                    src={t.image}
                    alt={t.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                  {/* Badge — NHS lockup for the NHS service, price for private */}
                  <div className="absolute top-3 left-3 z-10">
                    {t.nhs ? (
                      <span className="inline-flex items-center bg-white rounded-md px-2 py-1 shadow-sm">
                        <img src={nhsBadge} alt="Providing NHS Services" className="h-5 sm:h-[1.4rem] w-auto" />
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-brand-secondary text-white text-[0.7rem]" style={{ fontWeight: 600 }}>
                        {t.price}
                      </span>
                    )}
                  </div>

                  {/* Bottom — name always; CTA wipes in on hover/focus */}
                  <div className="absolute inset-x-0 bottom-0 p-4 z-10">
                    <h3 className="text-white text-[1.05rem] leading-tight" style={{ fontWeight: 700 }}>{t.name}</h3>
                    <div className="mt-2 flex items-center gap-2 text-white/90 opacity-0 translate-y-2 [clip-path:inset(0_0_100%_0)] transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0 group-hover:[clip-path:inset(0_0_0_0)] group-focus:opacity-100 group-focus:translate-y-0 group-focus:[clip-path:inset(0_0_0_0)]">
                      <span className="text-[0.82rem]">{t.tagline}</span>
                      <span className="ml-auto inline-flex items-center gap-1 bg-white text-brand-primary px-3 py-1.5 rounded-lg text-[0.76rem]" style={{ fontWeight: 600 }}>
                        Book <ArrowUpRight size={14} />
                      </span>
                    </div>
                  </div>

                  {/* Entrance clip-mask */}
                  <span className="tile-mask absolute inset-0 bg-brand-primary z-20 pointer-events-none" style={{ transformOrigin: "bottom", transform: "scaleY(0)" }} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
