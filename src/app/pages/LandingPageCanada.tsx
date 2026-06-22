import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router";
import { ArrowRight, ArrowUpRight, MapPin, Phone, Star, Quote, ShieldCheck, Navigation, CalendarCheck, MousePointerClick, Truck, Syringe, Plane, Ear, Scale, TestTube, Clock, Plus, Check } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { canadaBrand } from "../branding";
import { pharmacyInfo } from "../data/services";
import { useSeo, JsonLd, pharmacyGraph, faqPageSchema } from "../seo";

gsap.registerPlugin(ScrollTrigger);

const cover = (id: string) => `https://images.unsplash.com/photo-${id}?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900`;

// Real-face avatars for the (more visual) reviews section.
const avatar = (i: number) => `https://i.pravatar.cc/120?img=${[32, 5, 12, 47, 60][i % 5]}`;

type Card = { id: string; name: string; img: string; tag: string; isNew?: boolean };

const NHS_CARDS: Card[] = [
  { id: "nhs-men-b", name: "Meningitis B", img: cover("1632053002434-1bb03f1c80a1"), tag: "Free · NHS", isNew: true },
  { id: "nhs-pf-sore-throat", name: "Sore Throat", img: cover("1576091160550-2173dba999ef"), tag: "Free · NHS" },
  { id: "nhs-pf-earache", name: "Earache", img: cover("1758598738326-3bc889d1558d"), tag: "Free · NHS" },
  { id: "nhs-flu", name: "Flu Jab", img: cover("1608326389386-0305acbe600f"), tag: "Free · NHS" },
  { id: "nhs-pf-uti", name: "UTI (women)", img: cover("1559757175-080c2c66f6c8"), tag: "Free · NHS" },
  { id: "nhs-pf-sinusitis", name: "Sinusitis", img: cover("1502741224143-90386d7f8c82"), tag: "Free · NHS" },
  { id: "nhs-pf-shingles", name: "Shingles", img: cover("1522844990619-4951c40f7eda"), tag: "Free · NHS" },
  { id: "nhs-pf-insect-bite", name: "Insect Bites", img: cover("1488646953014-85cb44e25828"), tag: "Free · NHS" },
  { id: "nhs-pf-impetigo", name: "Impetigo", img: cover("1607619056574-7b8d3ee536b2"), tag: "Free · NHS" },
];

const PRIVATE_CARDS: Card[] = [
  { id: "prv-men-b", name: "Meningitis B", img: cover("1632053002434-1bb03f1c80a1"), tag: "From £120", isNew: true },
  { id: "prv-travel-consult", name: "Travel Health", img: cover("1488646953014-85cb44e25828"), tag: "From £25" },
  { id: "prv-weight-consult", name: "Weight Management", img: cover("1607619056574-7b8d3ee536b2"), tag: "From £30" },
  { id: "prv-ear-wax", name: "Ear Wax Removal", img: cover("1758598738326-3bc889d1558d"), tag: "From £40" },
  { id: "prv-vitamin-injection", name: "Vitamin B12 Boost", img: cover("1608326389386-0305acbe600f"), tag: "From £30" },
  { id: "prv-blood-test", name: "Blood Tests", img: cover("1576091160550-2173dba999ef"), tag: "From £50" },
  { id: "prv-flu-private", name: "Private Flu Jab", img: cover("1522844990619-4951c40f7eda"), tag: "From £15" },
];

const ACCORDION = [
  { id: "nhs-flu", name: "Flu Jab", desc: "Walk-in flu shots — no appointment needed.", img: cover("1608326389386-0305acbe600f"), tag: "Free · NHS", icon: Syringe },
  { id: "prv-travel-consult", name: "Travel Health", desc: "Vaccines & tailored advice for a safe trip abroad.", img: cover("1488646953014-85cb44e25828"), tag: "From £25", icon: Plane },
  { id: "prv-ear-wax", name: "Ear Wax Removal", desc: "Gentle microsuction — relief in a single visit.", img: cover("1758598738326-3bc889d1558d"), tag: "From £40", icon: Ear },
  { id: "prv-weight-consult", name: "Weight Loss", desc: "Personalised plans, including GLP-1 options.", img: cover("1607619056574-7b8d3ee536b2"), tag: "From £30", icon: Scale },
  { id: "prv-blood-test", name: "Blood Tests", desc: "Comprehensive panels with fast, clear results.", img: cover("1576091160550-2173dba999ef"), tag: "From £50", icon: TestTube },
];

const STEPS = [
  { icon: MousePointerClick, title: "Choose your service", text: "Browse NHS Pharmacy First treatments and private clinics — from flu jabs to weight management." },
  { icon: CalendarCheck, title: "Book a time", text: "Pick a same-day or future slot at our Manchester or Salford branch in seconds." },
  { icon: Truck, title: "Visit or get it delivered", text: "Pop in for your appointment, or have your prescription delivered to your door." },
];

// Local + service keywords woven into genuine answers — strong for SEO rich
// results and for AI engines that quote FAQ content directly (GEO).
const FAQS = [
  { q: "Do I need to see a GP first?", a: "No. Under NHS Pharmacy First, our Manchester and Salford pharmacists can assess and treat seven common conditions — including supplying prescription medicines such as antibiotics where clinically appropriate — without a GP appointment." },
  { q: "Are your NHS services really free?", a: "Yes. NHS Pharmacy First consultations, blood pressure checks and eligible flu and travel vaccinations are funded by the NHS and free to those who qualify. We always tell you upfront if a service is private and exactly what it costs." },
  { q: "Can I get a same-day appointment?", a: "Most services offer same-day slots at both our Deansgate (Manchester) and Chapel Street (Salford) branches. Choose a service above and pick the soonest time that suits you — it takes about two minutes." },
  { q: "Which private clinics do you offer?", a: "Travel health and vaccinations, ear wax removal by microsuction, weight management including GLP-1 options, vitamin B12 injections, and a range of blood tests — most available on the same day." },
  { q: "Where are your pharmacies?", a: "We have two branches in central Greater Manchester: 88 Deansgate, Manchester (M3 2ER) and 21 Chapel Street, Salford (M3 5BH). Both are open seven days a week." },
  { q: "How do I book and prepare?", a: "Choose a service on this page, pick a time and confirm your details. You can also complete a short pre-consultation questionnaire beforehand so your pharmacist is fully prepared before you arrive." },
];

const CANADA_AREA = ["Manchester", "Salford", "Greater Manchester"];

const STATS = [
  { to: 2, decimals: 0, suffix: "", label: "Local branches" },
  { to: 15000, decimals: 0, suffix: "+", label: "Prescriptions filled" },
  { to: pharmacyInfo.googleRating, decimals: 1, suffix: "★", label: "Patient rating" },
  { to: 98, decimals: 0, suffix: "%", label: "Same-day ready" },
];

const directionsUrl = (address: string) => `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;

const PAPER = "#faf7f0";
const LINE = "#e7e1d5";
const SLANT = 40; // px — angle of the accordion's leaning dividers

export default function LandingPageCanada() {
  const brand = canadaBrand;
  const root = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const [active, setActive] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useSeo({
    title: "Canada Pharmacy | NHS & Private Pharmacy in Manchester & Salford",
    description:
      "NHS Pharmacy First and private clinics at Canada Pharmacy in Manchester & Salford. Same-day flu jabs, travel health, ear wax removal, weight loss and blood tests. Book online in minutes.",
    path: brand.basePath,
  });

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const book = (id: string) => navigate(`${brand.basePath}/book/${id}`);

  useLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(".c-reveal, .pop, .acc-panel", { autoAlpha: 1, y: 0, scale: 1 });
        return;
      }

      // Hero entrance.
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-eyebrow", { y: 16, autoAlpha: 0, duration: 0.5 })
        .from(".hero-line", { yPercent: 115, duration: 0.8, stagger: 0.12 }, "-=0.2")
        .fromTo(".hero-mark", { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: "power2.out" }, "-=0.15")
        .from(".hero-sub", { y: 16, autoAlpha: 0, duration: 0.5 }, "-=0.4")
        .from(".hero-cta", { y: 14, autoAlpha: 0, duration: 0.45, clearProps: "transform" }, "-=0.3")
        .from(".hero-trust", { y: 14, autoAlpha: 0, duration: 0.45 }, "-=0.25")
        .from(".acc-panel", { xPercent: 8, autoAlpha: 0, stagger: 0.08, duration: 0.6 }, "-=0.4");

      // Soft fade-up for headings / text blocks.
      gsap.set(".c-reveal", { y: 28, autoAlpha: 0 });
      ScrollTrigger.batch(".c-reveal", {
        start: "top 88%",
        onEnter: (els) => gsap.to(els, { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.08, ease: "power3.out", overwrite: true, clearProps: "transform" }),
      });

      // Punchy pop-in for image cards.
      gsap.set(".pop", { y: 34, scale: 0.92, autoAlpha: 0 });
      ScrollTrigger.batch(".pop", {
        start: "top 90%",
        onEnter: (els) => gsap.to(els, { y: 0, scale: 1, autoAlpha: 1, duration: 0.6, stagger: 0.07, ease: "back.out(1.5)", overwrite: true }),
      });

      // Count-up stats.
      gsap.utils.toArray<HTMLElement>(".stat-num").forEach((el) => {
        const to = parseFloat(el.dataset.to || "0");
        const decimals = parseInt(el.dataset.decimals || "0", 10);
        const suffix = el.dataset.suffix || "";
        const o = { v: 0 };
        ScrollTrigger.create({
          trigger: el,
          start: "top 92%",
          once: true,
          onEnter: () =>
            gsap.to(o, {
              v: to,
              duration: 1.5,
              ease: "power2.out",
              onUpdate: () => { el.textContent = o.v.toLocaleString("en-GB", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix; },
            }),
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const navLinks = [
    { label: "NHS", id: "nhs" },
    { label: "Private", id: "private" },
    { label: "Locations", id: "locations" },
    { label: "Reviews", id: "reviews" },
    { label: "FAQs", id: "faq" },
  ];

  const Cards = ({ items }: { items: Card[] }) => (
    <>
      {items.map((c) => (
        <a
          key={c.id}
          href={`${brand.basePath}/book/${c.id}`}
          onClick={(e) => { e.preventDefault(); book(c.id); }}
          aria-label={`Book ${c.name}`}
          className="pop group relative block overflow-hidden rounded-3xl aspect-[4/5] cursor-pointer no-underline shadow-lg shadow-brand-primary/10"
        >
          <ImageWithFallback src={c.img} alt={c.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
          <span className="absolute top-3 left-3 text-[0.72rem] px-2.5 py-1 rounded-full bg-white/95 text-brand-primary" style={{ fontWeight: 700 }}>{c.tag}</span>
          {c.isNew && (
            <span className="chip-new absolute top-3 right-3 inline-flex items-center gap-1 text-[0.66rem] uppercase tracking-[0.12em] px-2.5 py-1 rounded-full text-white" style={{ fontWeight: 800 }}>
              <span className="chip-new-dot" /> New
            </span>
          )}
          <div className="absolute inset-x-0 bottom-0 p-5">
            <h3 className="font-display text-white text-[1.4rem] leading-tight" style={{ fontWeight: 600 }}>{c.name}</h3>
            <span className="mt-2 inline-flex items-center gap-1.5 text-white text-[0.85rem] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300" style={{ fontWeight: 600 }}>
              <span className="cta cta-primary inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full">Book now <ArrowUpRight size={14} /></span>
            </span>
          </div>
        </a>
      ))}
    </>
  );

  return (
    <div ref={root} className="theme-canada min-h-screen" style={{ backgroundColor: PAPER }}>
      <JsonLd data={pharmacyGraph(brand, CANADA_AREA)} />
      <JsonLd data={faqPageSchema(FAQS)} />

      {/* ───────── Header (logo only) ───────── */}
      <header className="sticky top-0 z-50 backdrop-blur border-b" style={{ backgroundColor: `${PAPER}e6`, borderColor: LINE }}>
        <div className="max-w-7xl mx-auto px-5 h-[88px] flex items-center justify-between">
          <a href={brand.basePath} onClick={(e) => { e.preventDefault(); navigate(brand.basePath); }} aria-label="Canada Pharmacy — home" className="flex items-center no-underline">
            <img src={brand.logo} alt="Canada Pharmacy" className="h-12 w-auto" />
          </a>
          <nav className="hidden md:flex items-center gap-8 text-[0.9rem] text-brand-primary/70">
            {navLinks.map((l) => (
              <button key={l.id} onClick={() => scrollTo(l.id)} className="hover:text-brand-primary transition-colors cursor-pointer">{l.label}</button>
            ))}
          </nav>
          <button onClick={() => scrollTo("nhs")} className="cta cta-primary inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-[0.88rem] cursor-pointer" style={{ fontWeight: 600 }}>
            Book now
          </button>
        </div>
      </header>

      {/* ───────── Hero (CTA + tilted hover accordion) ───────── */}
      <section className="hero-sec relative overflow-x-clip min-h-[calc(100vh-88px)] lg:h-[calc(100vh-88px)]" style={{ backgroundColor: PAPER }}>
        {/* Ambient depth behind the CTA column */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-28 -left-24 w-[34rem] h-[34rem] rounded-full" style={{ background: "radial-gradient(circle, rgba(61,181,74,0.14), transparent 68%)" }} />
          <div className="absolute top-1/3 left-[14%] w-[22rem] h-[22rem] rounded-full" style={{ background: "radial-gradient(circle, rgba(54,65,76,0.06), transparent 70%)" }} />
          <div className="absolute -bottom-24 left-[1%] w-[30rem] h-[30rem] rounded-full" style={{ background: "radial-gradient(circle, rgba(61,181,74,0.10), transparent 70%)" }} />
        </div>
        <div className="relative w-full lg:h-full grid lg:grid-cols-[1fr_1.25fr] lg:gap-0 items-stretch">
          {/* Left — CTA (aligned to the site container) */}
          <div className="flex flex-col justify-center pr-6 lg:pr-10 py-10" style={{ paddingLeft: "max(1.5rem, calc((100vw - 80rem) / 2 + 1.5rem))" }}>
            <p className="hero-eyebrow inline-flex items-center gap-2 text-[0.78rem] tracking-[0.18em] uppercase text-brand-green-ink mb-4" style={{ fontWeight: 700 }}>
              <ShieldCheck size={15} /> Your NHS &amp; private pharmacy
            </p>
            <h1 className="font-display text-brand-primary text-[2.8rem] lg:text-[3.9rem] leading-[1.05] mb-5 pb-[0.06em]" style={{ fontWeight: 700 }}>
              <span className="block overflow-hidden pb-[0.08em]"><span className="hero-line block">Feel better,</span></span>
              <span className="block overflow-hidden pb-[0.08em]"><span className="hero-line block">the{" "}<span className="relative inline-block"><span aria-hidden="true" className="hero-mark absolute inset-x-[-0.08em] bottom-[0.12em] h-[0.4em] rounded-[3px] bg-brand-secondary/25 origin-left" /><span className="relative italic text-brand-green-ink">easy</span></span>{" "}way.</span></span>
            </h1>
            <p className="hero-sub text-brand-primary/65 text-[1.05rem] leading-relaxed mb-8 max-w-md">
              Same-day NHS and private appointments with friendly pharmacists. Pick a service and you're sorted in minutes.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button onClick={() => scrollTo("nhs")} className="hero-cta cta cta-primary group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-[1rem] cursor-pointer" style={{ fontWeight: 700 }}>
                Book an appointment <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <a href={`tel:${brand.locations[0].phone.replace(/\s/g, "")}`} className="hero-cta cta cta-outline group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-[0.95rem] cursor-pointer no-underline" style={{ fontWeight: 600 }}>
                <Phone size={16} className="text-brand-green-ink group-hover:rotate-12 transition-transform" /> Call us
              </a>
            </div>

            {/* Social proof */}
            <div className="hero-trust mt-8 flex items-center gap-3.5">
              <div className="flex -space-x-2.5">
                {[0, 1, 2, 3].map((i) => (
                  <ImageWithFallback key={i} src={avatar(i)} alt="" className="w-9 h-9 rounded-full border-2 object-cover bg-brand-light" style={{ borderColor: PAPER }} />
                ))}
              </div>
              <div className="text-[0.85rem] leading-snug">
                <div className="flex items-center gap-1.5 text-brand-primary" style={{ fontWeight: 700 }}>
                  <span className="flex">{[...Array(5)].map((_, i) => <Star key={i} size={13} className="fill-brand-secondary text-brand-secondary" />)}</span>
                  <span>{pharmacyInfo.googleRating}</span>
                </div>
                <p className="text-brand-primary/55">Loved by {pharmacyInfo.totalReviews}+ local patients</p>
              </div>
            </div>
          </div>

          {/* Right — angled hover accordion, full-bleed to the right (desktop) */}
          <div className="hidden lg:block h-full overflow-hidden">
            <div className="flex h-full">
              {ACCORDION.map((s, i) => {
                const on = active === i;
                const first = i === 0;
                const last = i === ACCORDION.length - 1;
                // First panel: straight left edge. Last panel: straight right edge (so no
                // uncovered triangle bleeds off the right). Middle panels lean on both sides.
                const clipPath = first
                  ? `polygon(0 0, 100% 0, calc(100% - ${SLANT}px) 100%, 0 100%)`
                  : last
                    ? `polygon(${SLANT}px 0, 100% 0, 100% 100%, 0 100%)`
                    : `polygon(${SLANT}px 0, 100% 0, calc(100% - ${SLANT}px) 100%, 0 100%)`;
                return (
                  <div
                    key={s.id}
                    className="acc-panel relative h-full overflow-hidden cursor-pointer"
                    style={{
                      flexGrow: on ? 3.4 : 1,
                      flexBasis: 0,
                      marginLeft: first ? 0 : `-${SLANT}px`,
                      zIndex: on ? 20 : 1,
                      clipPath,
                      transition: "flex-grow 0.55s cubic-bezier(0.22,1,0.36,1)",
                    }}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => book(s.id)}
                  >
                    <ImageWithFallback src={s.img} alt={s.name} className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out ${on ? "scale-110" : "scale-100"}`} />
                    <div className={`absolute inset-0 transition-all duration-500 ${on ? "bg-gradient-to-t from-black/85 via-black/30 to-black/5" : "bg-black/55"}`} />

                    {/* Active accent line at the foot of the open panel */}
                    <div className={`absolute bottom-0 left-0 h-1 bg-brand-secondary transition-all duration-500 ${on ? "w-full opacity-100" : "w-0 opacity-0"}`} />

                    {/* Collapsed: icon + name */}
                    <div className={`absolute inset-0 flex flex-col items-center justify-center gap-3 px-4 text-center transition-all duration-300 ${on ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}>
                      <span className="w-12 h-12 rounded-full bg-white/15 ring-1 ring-white/25 backdrop-blur-sm flex items-center justify-center"><s.icon size={22} className="text-white" /></span>
                      <span className="text-white text-[0.82rem] leading-tight" style={{ fontWeight: 600 }}>{s.name}</span>
                    </div>

                    {/* Expanded: full info + CTA */}
                    <div className={`absolute bottom-0 left-0 w-[24rem] max-w-full pl-[3.5rem] pr-7 pb-12 transition-all duration-500 ${on ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
                      <div className="flex items-center gap-2.5 mb-4">
                        <span className="w-10 h-10 rounded-full bg-white/15 ring-1 ring-white/25 backdrop-blur-sm flex items-center justify-center shrink-0"><s.icon size={18} className="text-white" /></span>
                        <span className="inline-block text-[0.7rem] px-2.5 py-1 rounded-full bg-white/95 text-brand-primary" style={{ fontWeight: 700 }}>{s.tag}</span>
                      </div>
                      <h3 className="font-display text-white text-[1.9rem] leading-tight mb-2" style={{ fontWeight: 600 }}>{s.name}</h3>
                      <p className="text-white/80 text-[0.9rem] leading-relaxed mb-5 max-w-[15rem]">{s.desc}</p>
                      <span className="cta cta-light inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[0.85rem]" style={{ fontWeight: 600 }}>Book now <ArrowUpRight size={15} /></span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile — simple image cards */}
          <div className="lg:hidden grid grid-cols-2 gap-3 px-6 pb-10">
            {ACCORDION.map((s) => (
              <a key={s.id} href={`${brand.basePath}/book/${s.id}`} onClick={(e) => { e.preventDefault(); book(s.id); }} className="relative block overflow-hidden rounded-2xl aspect-[4/3] no-underline shadow-md">
                <ImageWithFallback src={s.img} alt={s.name} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <span className="absolute top-2.5 left-2.5 text-[0.66rem] px-2 py-0.5 rounded-full bg-white/95 text-brand-primary" style={{ fontWeight: 700 }}>{s.tag}</span>
                <h3 className="absolute bottom-2.5 left-3 right-3 font-display text-white text-[1rem] leading-tight" style={{ fontWeight: 600 }}>{s.name}</h3>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── NHS services ───────── */}
      <section id="nhs" className="py-14 lg:py-20" style={{ backgroundColor: PAPER }}>
        <div className="max-w-7xl mx-auto px-5">
          <div className="c-reveal flex items-end justify-between flex-wrap gap-3 mb-8">
            <div>
              <p className="text-[0.76rem] tracking-[0.2em] uppercase text-brand-green-ink mb-2" style={{ fontWeight: 600 }}>Free · no GP needed</p>
              <h2 className="font-display text-[2.2rem] md:text-[2.9rem] text-brand-primary leading-[1.05]" style={{ fontWeight: 700 }}>NHS services</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            <Cards items={NHS_CARDS} />
          </div>
        </div>
      </section>

      {/* ───────── Private clinics ───────── */}
      <section id="private" className="py-14 lg:py-20 bg-white border-y" style={{ borderColor: LINE }}>
        <div className="max-w-7xl mx-auto px-5">
          <div className="c-reveal flex items-end justify-between flex-wrap gap-3 mb-8">
            <div>
              <p className="text-[0.76rem] tracking-[0.2em] uppercase text-brand-green-ink mb-2" style={{ fontWeight: 600 }}>Book in minutes</p>
              <h2 className="font-display text-[2.2rem] md:text-[2.9rem] text-brand-primary leading-[1.05]" style={{ fontWeight: 700 }}>Private clinics</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5">
            <Cards items={PRIVATE_CARDS} />
          </div>
        </div>
      </section>

      {/* ───────── How it works ───────── */}
      <section className="py-14 lg:py-20" style={{ backgroundColor: PAPER }}>
        <div className="max-w-6xl mx-auto px-5">
          <div className="c-reveal text-center max-w-2xl mx-auto mb-12">
            <p className="text-[0.76rem] tracking-[0.2em] uppercase text-brand-green-ink mb-2" style={{ fontWeight: 600 }}>Simple from start to finish</p>
            <h2 className="font-display text-[2.2rem] md:text-[2.9rem] text-brand-primary leading-[1.05]" style={{ fontWeight: 700 }}>How it works</h2>
            <p className="text-brand-primary/60 text-[1rem] mt-3 leading-relaxed">Three steps to same-day care at our Manchester and Salford pharmacies — no GP referral needed.</p>
          </div>
          <div className="relative grid sm:grid-cols-3 gap-8 lg:gap-10">
            {/* Connector line behind the badges (desktop) */}
            <div aria-hidden="true" className="hidden sm:block absolute top-9 left-[16.66%] right-[16.66%] h-px bg-gradient-to-r from-transparent via-brand-green-ink/25 to-transparent" />
            {STEPS.map((s, i) => (
              <div key={s.title} className="c-reveal relative text-center">
                <div className="relative mx-auto mb-5 w-[4.5rem] h-[4.5rem]">
                  <div className="w-full h-full rounded-2xl bg-white border flex items-center justify-center text-brand-green-ink shadow-sm" style={{ borderColor: LINE }}>
                    <s.icon size={26} />
                  </div>
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-brand-green-ink text-white text-[0.75rem] flex items-center justify-center" style={{ fontWeight: 700 }}>{i + 1}</span>
                </div>
                <h3 className="font-display text-[1.25rem] text-brand-primary mb-2" style={{ fontWeight: 600 }}>{s.title}</h3>
                <p className="text-[0.92rem] text-brand-primary/60 max-w-[18rem] mx-auto leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Stats (animated count-up) ───────── */}
      <section className="bg-brand-primary text-white py-16 relative overflow-hidden">
        <div aria-hidden="true" className="absolute -right-20 -top-24 w-[28rem] h-[28rem] rounded-full" style={{ background: "radial-gradient(circle, rgba(61,181,74,0.18), transparent 70%)" }} />
        <div className="max-w-7xl mx-auto px-5 grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="stat-num font-display text-[2.8rem] text-brand-secondary leading-none" style={{ fontWeight: 700 }} data-to={s.to} data-decimals={s.decimals} data-suffix={s.suffix}>
                {s.to.toLocaleString("en-GB", { minimumFractionDigits: s.decimals, maximumFractionDigits: s.decimals }) + s.suffix}
              </p>
              <p className="text-white/55 text-[0.88rem] mt-2">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ───────── Locations ───────── */}
      <section id="locations" className="py-14 lg:py-20" style={{ backgroundColor: PAPER }}>
        <div className="max-w-7xl mx-auto px-5">
          <div className="c-reveal mb-10 max-w-2xl">
            <p className="text-[0.76rem] tracking-[0.2em] uppercase text-brand-green-ink mb-2" style={{ fontWeight: 600 }}>Visit us</p>
            <h2 className="font-display text-[2.2rem] md:text-[2.9rem] text-brand-primary leading-[1.05]" style={{ fontWeight: 700 }}>Two branches across Greater Manchester</h2>
            <p className="text-brand-primary/60 text-[1rem] mt-3 leading-relaxed">Find us in the heart of Manchester and Salford — both open seven days a week for NHS and private appointments.</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            {brand.locations.map((loc) => (
              <div key={loc.id} className="c-reveal bg-white border rounded-3xl overflow-hidden flex flex-col" style={{ borderColor: LINE }}>
                {/* Map */}
                <div className="relative h-48 bg-brand-light">
                  <iframe
                    src={loc.googleMapsEmbedUrl}
                    title={`Map of ${loc.name}`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0 w-full h-full grayscale-[0.2]"
                    style={{ border: 0 }}
                  />
                </div>
                <div className="p-7 flex-1 flex flex-col">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <h3 className="font-display text-[1.5rem] text-brand-primary" style={{ fontWeight: 600 }}>{loc.shortName}</h3>
                    <span className="inline-flex items-center gap-1.5 text-[0.72rem] px-2.5 py-1 rounded-full bg-brand-secondary/12 text-brand-green-ink" style={{ fontWeight: 700 }}><Check size={12} /> Open 7 days</span>
                  </div>
                  <ul className="space-y-2.5 text-[0.9rem] text-brand-primary/65 mb-5">
                    <li className="flex items-start gap-2.5"><MapPin size={16} className="text-brand-green-ink mt-0.5 shrink-0" /> {loc.address}</li>
                    <li className="flex items-center gap-2.5"><Phone size={15} className="text-brand-green-ink shrink-0" /> <a href={`tel:${loc.phone.replace(/\s/g, "")}`} className="hover:text-brand-primary transition-colors">{loc.phone}</a></li>
                  </ul>
                  {/* Opening hours */}
                  <div className="rounded-2xl border p-4 mb-6" style={{ borderColor: LINE, backgroundColor: PAPER }}>
                    <p className="flex items-center gap-2 text-[0.8rem] text-brand-primary mb-2.5" style={{ fontWeight: 700 }}><Clock size={14} className="text-brand-green-ink" /> Opening hours</p>
                    <ul className="space-y-1.5">
                      {loc.openingHours.map((h) => (
                        <li key={h.day} className="flex items-center justify-between text-[0.84rem]">
                          <span className="text-brand-primary/55">{h.day}</span>
                          <span className="text-brand-primary" style={{ fontWeight: 600 }}>{h.hours}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-auto flex flex-wrap gap-3">
                    <a href={directionsUrl(loc.address)} target="_blank" rel="noopener noreferrer" className="cta cta-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[0.85rem] no-underline" style={{ fontWeight: 600 }}>
                      <Navigation size={15} /> Directions
                    </a>
                    <a href={`tel:${loc.phone.replace(/\s/g, "")}`} className="cta cta-outline inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[0.85rem] no-underline" style={{ fontWeight: 600 }}>
                      <Phone size={15} className="text-brand-green-ink" /> Call branch
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Reviews (visual: faces + big rating) ───────── */}
      <section id="reviews" className="bg-white py-14 lg:py-20 border-y" style={{ borderColor: LINE }}>
        <div className="max-w-7xl mx-auto px-5 grid lg:grid-cols-12 gap-10 items-start">
          {/* Aggregate */}
          <div className="c-reveal lg:col-span-4 lg:sticky lg:top-24">
            <span className="inline-flex items-center gap-1.5 mb-4 bg-brand-secondary/12 text-brand-green-ink px-3 py-1.5 rounded-full text-[0.76rem]" style={{ fontWeight: 700 }}>
              <Star size={12} className="fill-brand-secondary text-brand-secondary" /> Google rating
            </span>
            <div className="flex items-end gap-3">
              <p className="font-display text-[5rem] text-brand-primary leading-none" style={{ fontWeight: 700 }}>{pharmacyInfo.googleRating}</p>
              <div className="flex gap-1 mb-3">{[...Array(5)].map((_, i) => <Star key={i} size={22} className="fill-brand-secondary text-brand-secondary" />)}</div>
            </div>
            <p className="text-brand-primary/60 mt-3">Based on {pharmacyInfo.totalReviews}+ reviews</p>
            <div className="flex items-center gap-3 mt-7">
              <div className="flex -space-x-3">
                {[0, 1, 2, 3].map((i) => (
                  <ImageWithFallback key={i} src={avatar(i)} alt="" className="w-11 h-11 rounded-full border-2 border-white object-cover bg-brand-light" />
                ))}
              </div>
              <p className="text-[0.88rem] text-brand-primary/65">Join <span className="text-brand-primary" style={{ fontWeight: 700 }}>320+</span> happy patients</p>
            </div>
          </div>

          {/* Review cards with faces */}
          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-5">
            {pharmacyInfo.reviews.slice(0, 4).map((r, i) => (
              <div key={r.name} className="c-reveal rounded-3xl p-6 border" style={{ backgroundColor: PAPER, borderColor: LINE }}>
                <div className="flex items-center gap-3 mb-3">
                  <ImageWithFallback src={avatar(i)} alt={r.name} className="w-12 h-12 rounded-full object-cover bg-brand-light shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[0.92rem] text-brand-primary truncate" style={{ fontWeight: 700 }}>{r.name}</p>
                    <div className="flex gap-0.5 mt-0.5">{[...Array(r.rating)].map((_, j) => <Star key={j} size={12} className="fill-brand-secondary text-brand-secondary" />)}</div>
                  </div>
                  <Quote size={22} className="text-brand-secondary/30 ml-auto shrink-0" />
                </div>
                <p className="text-[0.92rem] text-brand-primary/70 leading-relaxed">“{r.text}”</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── FAQ (schema-backed for SEO rich results + AI citations) ───────── */}
      <section id="faq" className="py-14 lg:py-20" style={{ backgroundColor: PAPER }}>
        <div className="max-w-5xl mx-auto px-5">
          <div className="c-reveal text-center max-w-2xl mx-auto mb-10">
            <p className="text-[0.76rem] tracking-[0.2em] uppercase text-brand-green-ink mb-2" style={{ fontWeight: 600 }}>Good to know</p>
            <h2 className="font-display text-[2.2rem] md:text-[2.9rem] text-brand-primary leading-[1.05]" style={{ fontWeight: 700 }}>Frequently asked questions</h2>
            <p className="text-brand-primary/60 text-[1rem] mt-3 leading-relaxed">Everything about NHS eligibility, our private clinics and booking at our Manchester &amp; Salford pharmacies.</p>
          </div>
          <div className="space-y-3">
            {FAQS.map((f, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={f.q} className="c-reveal bg-white border rounded-2xl overflow-hidden" style={{ borderColor: isOpen ? "rgba(26,110,45,0.3)" : LINE }}>
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left cursor-pointer"
                  >
                    <span className="text-[0.98rem] sm:text-[1.05rem] text-brand-primary" style={{ fontWeight: 600 }}>{f.q}</span>
                    <span className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? "bg-brand-green-ink text-white rotate-45" : "bg-brand-secondary/12 text-brand-green-ink"}`}>
                      <Plus size={16} />
                    </span>
                  </button>
                  <div className="grid transition-all duration-300 ease-out" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
                    <div className="overflow-hidden">
                      <p className="px-5 sm:px-6 pb-5 text-[0.92rem] text-brand-primary/65 leading-relaxed">{f.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────── CTA ───────── */}
      <section className="bg-brand-green-ink py-16">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <h2 className="c-reveal font-display text-white text-[2.4rem] md:text-[3.2rem] leading-[1.05] mb-5" style={{ fontWeight: 700 }}>Ready when you are.</h2>
          <p className="c-reveal text-white/85 text-[1.05rem] max-w-lg mx-auto mb-8">Tap a service and book in under two minutes.</p>
          <button onClick={() => scrollTo("nhs")} className="c-reveal cta cta-light group inline-flex items-center gap-2 px-7 py-3.5 rounded-full cursor-pointer" style={{ fontWeight: 600 }}>
            Get started <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* ───────── Footer ───────── */}
      <footer className="bg-brand-darkest text-white/70">
        <div className="max-w-7xl mx-auto px-5 py-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center">
            <span className="bg-white rounded-lg px-3 py-2 inline-flex"><img src={brand.logo} alt="Canada Pharmacy" className="h-7 w-auto" /></span>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-[0.88rem]">
            {navLinks.map((l) => (
              <button key={l.id} onClick={() => scrollTo(l.id)} className="hover:text-white transition-colors cursor-pointer">{l.label}</button>
            ))}
            {["Privacy", "Terms", "Accessibility"].map((l) => (
              <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>
            ))}
          </nav>
        </div>
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-5 py-5 flex flex-col md:flex-row md:items-center justify-between gap-2 text-[0.74rem] text-white/40">
            <p>© {new Date().getFullYear()} {brand.legal?.companyName}. All rights reserved.</p>
            <p>Superintendent Pharmacist: {brand.legal?.superintendent} · GPhC Reg. No. {brand.legal?.gphcNumber}. {brand.legal?.companyName} is registered in England &amp; Wales (Company No. {brand.legal?.companyNumber}).</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
