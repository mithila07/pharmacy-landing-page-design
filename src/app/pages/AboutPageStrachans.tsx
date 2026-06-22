import { useEffect, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useNavigate } from "react-router";
import {
  ArrowRight,
  Target,
  Compass,
  HeartHandshake,
  Stethoscope,
  Clock,
  Users,
  ShieldCheck,
  Sparkles,
  MapPin,
  Quote,
} from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { StoryStack } from "../components/StoryStack";
import { strachansBrand } from "../branding";
import { useSeo, JsonLd, pharmacyGraph } from "../seo";

import aboutHero from "../../assets/image 1.jpg";
import ctaBg from "../../assets/image-bg.jpeg";
import storyAA from "../../assets/img-aa.jpg";
import storyA from "../../assets/img-a.png";
import storyB from "../../assets/img-b.jpg";
import storyC from "../../assets/img-c.jpg";
import storyD from "../../assets/img-d.jpg";

const STORY_IMAGES = [storyAA, storyA, storyB, storyC, storyD];
import team1 from "../../assets/aisha.jpg";
import team2 from "../../assets/james.jpg";
import team3 from "../../assets/priya.jpg";
import team4 from "../../assets/daniel.jpg";

const EASE = [0.22, 1, 0.36, 1] as const;

const heroStats = [
  { value: "27+", label: "Years serving the community" },
  { value: "3", label: "Local branches" },
  { value: "50k+", label: "Patients cared for" },
  { value: "4.8★", label: "Google rating" },
];

const milestones = [
  { year: "1998", text: "Strachans opens its first pharmacy in the centre of Bury, founded by the Strachan family." },
  { year: "2009", text: "Among the first community pharmacies in Greater Manchester to offer private travel vaccinations." },
  { year: "2018", text: "Dedicated private clinic rooms launch for weight management, ear care and diagnostics." },
  { year: "2023", text: "Joins the NHS Pharmacy First programme from day one, treating seven conditions without a GP." },
  { year: "2025", text: "Expands to three branches — two in Bury and one in Uppermill." },
];

const values = [
  { icon: HeartHandshake, title: "Compassionate care", text: "We treat every patient like a neighbour — with patience, warmth and zero judgement." },
  { icon: Stethoscope, title: "Clinical excellence", text: "Independent prescribers and accredited clinicians, holding to the highest GPhC standards." },
  { icon: Clock, title: "Fast & accessible", text: "Same-day appointments and walk-ins, so good healthcare never means a long wait." },
  { icon: Users, title: "Community first", text: "Rooted in the neighbourhoods we serve, reinvesting in local health and wellbeing." },
];

const team = [
  { img: team1, name: "Aisha Strachan", role: "Superintendent Pharmacist", bio: "Third-generation pharmacist leading clinical governance across all three branches." },
  { img: team2, name: "James Okafor", role: "Independent Prescriber", bio: "Specialises in Pharmacy First conditions and private minor-illness clinics." },
  { img: team3, name: "Priya Nair", role: "Lead Travel Health Nurse", bio: "Runs our certified travel clinic, from yellow fever to bespoke trip planning." },
  { img: team4, name: "Daniel Brooks", role: "Clinical Pharmacist", bio: "Heads up weight management and long-term condition reviews with NHS Pharmacy First." },
];

export default function AboutPageStrachans() {
  const brand = strachansBrand;
  const reduce = useReducedMotion();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  useSeo({
    title: "About Strachans Pharmacy | Family-Run Pharmacy in Bury & Uppermill",
    description: "Meet Strachans Pharmacy — a family-run independent pharmacy caring for Bury and Uppermill for over 27 years. Our clinicians, mission and values across three Greater Manchester branches.",
    path: `${brand.basePath}/about`,
  });

  // Scroll-reveal wrapper — gentle fade-up, disabled under reduced motion.
  function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
    return (
      <motion.div
        className={className}
        variants={{ hidden: { opacity: 0, y: 28 }, show: (d: number) => ({ opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE, delay: d } }) }}
        custom={delay}
        initial={reduce ? "show" : "hidden"}
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
      >
        {children}
      </motion.div>
    );
  }

  const float = (delay = 0, dist = 12) =>
    reduce ? {} : { y: [0, -dist, 0], transition: { duration: 6, ease: "easeInOut", repeat: Infinity, delay } };

  const container = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } } };
  const item = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } };

  return (
    <div className={`min-h-screen bg-white ${brand.themeClass}`}>
      <JsonLd data={pharmacyGraph(brand)} />
      <Header brand={brand} />

      {/* ───────── Hero ───────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light via-white to-white" />
        <motion.div
          aria-hidden
          className="absolute -top-24 -right-16 w-[440px] h-[440px] rounded-full bg-brand-secondary/20 blur-3xl"
          animate={reduce ? {} : { x: [0, -24, 0], y: [0, 18, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 13, ease: "easeInOut", repeat: Infinity }}
        />
        <motion.div
          aria-hidden
          className="absolute top-1/3 -left-24 w-[380px] h-[380px] rounded-full bg-brand-primary/15 blur-3xl"
          animate={reduce ? {} : { x: [0, 22, 0], y: [0, -16, 0] }}
          transition={{ duration: 15, ease: "easeInOut", repeat: Infinity }}
        />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-10 items-center py-14 lg:py-20">
            {/* Copy */}
            <motion.div variants={container} initial="hidden" animate="show">
              <motion.div variants={item} className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md rounded-full px-3 py-1.5 shadow-sm border border-brand-primary/10 mb-6">
                <Sparkles size={13} className="text-brand-secondary" />
                <span className="text-[0.78rem] text-gray-600" style={{ fontWeight: 600 }}>About Strachans</span>
              </motion.div>
              <motion.h1 variants={item} className="text-[2.3rem] md:text-[3rem] leading-[1.08] text-brand-primary mb-5" style={{ fontWeight: 800, letterSpacing: "-0.02em" }}>
                Caring for our community,
                <br />
                one <span className="text-brand-secondary">neighbour</span> at a time
              </motion.h1>
              <motion.p variants={item} className="text-gray-500 text-[1.05rem] leading-relaxed max-w-lg mb-8">
                For over a quarter of a century, Strachans has been the trusted health partner on the
                high streets of Bury and Saddleworth — blending NHS and private clinical services with the
                warmth of a true community pharmacy.
              </motion.p>
              <motion.div variants={item} className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl">
                {heroStats.map((s) => (
                  <div key={s.label} className="rounded-2xl border border-brand-primary/10 bg-white/60 backdrop-blur-sm px-4 py-3">
                    <p className="text-[1.3rem] text-brand-primary leading-none" style={{ fontWeight: 800 }}>{s.value}</p>
                    <p className="text-[0.72rem] text-gray-500 mt-1.5 leading-tight">{s.label}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
              className="relative mx-auto w-full max-w-md lg:max-w-none"
            >
              <div className="absolute -inset-5 bg-gradient-to-tr from-brand-primary/15 via-brand-accent/10 to-brand-secondary/20 rounded-[2.5rem] blur-2xl" />
              <div className="relative rounded-[2rem] overflow-hidden border border-white/60 shadow-2xl shadow-brand-primary/15">
                <ImageWithFallback src={aboutHero} alt="Strachans team" className="w-full h-[340px] sm:h-[440px] object-cover" />
              </div>
              <motion.div animate={float(0)} className="absolute -left-3 sm:-left-7 bottom-10 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl shadow-brand-primary/10 px-4 py-3 border border-white/70 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center"><ShieldCheck size={15} className="text-brand-primary" /></span>
                <span className="text-[0.78rem] text-gray-700" style={{ fontWeight: 600 }}>GPhC registered</span>
              </motion.div>
              <motion.div aria-hidden animate={reduce ? {} : { rotate: [0, 18, -12, 0], scale: [1, 1.15, 1] }} transition={{ duration: 7, ease: "easeInOut", repeat: Infinity }} className="absolute -top-3 right-12">
                <Sparkles size={22} className="text-brand-secondary" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ───────── Our story + timeline ───────── */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-brand-light-alt/40 to-white" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal className="relative order-2 lg:order-1">
              <div className="absolute -inset-4 bg-gradient-to-br from-brand-secondary/15 to-brand-primary/15 rounded-[2rem] blur-2xl" />
              <StoryStack images={STORY_IMAGES} />
            </Reveal>

            <div className="order-1 lg:order-2">
              <Reveal>
                <span className="text-[0.8rem] text-brand-secondary uppercase tracking-widest" style={{ fontWeight: 700 }}>Our story</span>
                <h2 className="text-[1.8rem] md:text-[2.2rem] text-gray-900 mt-2 mb-4" style={{ fontWeight: 700 }}>From one counter to three clinics</h2>
                <p className="text-gray-600 text-[1rem] leading-relaxed mb-8">
                  What began as a single family-run dispensary in Bury has grown into one of Greater Manchester's
                  most trusted independent pharmacy groups — without ever losing the personal touch that started it all.
                </p>
              </Reveal>

              {/* Timeline */}
              <div className="relative pl-6">
                <div className="absolute left-[7px] top-1 bottom-1 w-px bg-brand-primary/15" />
                {milestones.map((m, i) => (
                  <Reveal key={m.year} delay={i * 0.05} className="relative mb-6 last:mb-0">
                    <span className="absolute -left-6 top-1.5 w-3.5 h-3.5 rounded-full bg-brand-primary ring-4 ring-brand-primary/15" />
                    <div className="flex items-baseline gap-3">
                      <span className="text-[0.95rem] text-brand-primary" style={{ fontWeight: 800 }}>{m.year}</span>
                    </div>
                    <p className="text-[0.92rem] text-gray-600 leading-relaxed mt-0.5">{m.text}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Mission & vision ───────── */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-light via-white to-brand-light-alt" />
        <div className="absolute top-10 right-1/4 w-[360px] h-[360px] bg-brand-secondary/8 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4">
          <Reveal className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-[1.8rem] md:text-[2.2rem] text-gray-900 mb-3" style={{ fontWeight: 700 }}>What drives us</h2>
            <p className="text-gray-600 text-[1rem] leading-relaxed">The purpose behind every appointment, prescription and friendly conversation across the counter.</p>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { icon: Target, tag: "Our mission", title: "Make expert healthcare effortless", text: "To bring NHS and private clinical care under one roof — delivered with speed, warmth and genuine clinical excellence — so getting well never means waiting weeks for a GP." },
              { icon: Compass, tag: "Our vision", title: "Your first port of call for health", text: "A future where your local pharmacy is the first place you turn for trusted health advice and treatment — not the last resort after a long wait." },
            ].map((c, i) => (
              <Reveal key={c.tag} delay={i * 0.08}>
                <div className="h-full bg-white rounded-2xl border border-gray-100 shadow-sm p-7 hover:shadow-xl hover:shadow-brand-primary/10 hover:-translate-y-0.5 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center mb-4">
                    <c.icon size={22} className="text-brand-primary" />
                  </div>
                  <span className="text-[0.78rem] text-brand-secondary uppercase tracking-widest" style={{ fontWeight: 700 }}>{c.tag}</span>
                  <h3 className="text-[1.2rem] text-gray-900 mt-1 mb-2.5" style={{ fontWeight: 700 }}>{c.title}</h3>
                  <p className="text-gray-600 text-[0.95rem] leading-relaxed">{c.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Values ───────── */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4">
          <Reveal className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[0.8rem] text-brand-secondary uppercase tracking-widest" style={{ fontWeight: 700 }}>Our values</span>
            <h2 className="text-[1.8rem] md:text-[2.2rem] text-gray-900 mt-2" style={{ fontWeight: 700 }}>The standards we hold ourselves to</h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.07}>
                <div className="h-full rounded-2xl border border-gray-100 bg-white p-6 hover:border-brand-secondary/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-secondary/10 transition-all">
                  <div className="w-11 h-11 rounded-xl bg-brand-secondary/10 flex items-center justify-center mb-4">
                    <v.icon size={20} className="text-brand-secondary" />
                  </div>
                  <h3 className="text-[1.02rem] text-gray-900 mb-1.5" style={{ fontWeight: 700 }}>{v.title}</h3>
                  <p className="text-gray-500 text-[0.86rem] leading-relaxed">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Team / clinicians ───────── */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-brand-light/40 to-white" />
        <div className="absolute bottom-10 left-1/4 w-[360px] h-[360px] bg-brand-secondary/8 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4">
          <Reveal className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[0.8rem] text-brand-secondary uppercase tracking-widest" style={{ fontWeight: 700 }}>Meet the team</span>
            <h2 className="text-[1.8rem] md:text-[2.2rem] text-gray-900 mt-2 mb-3" style={{ fontWeight: 700 }}>The clinicians behind your care</h2>
            <p className="text-gray-600 text-[1rem] leading-relaxed">A close-knit team of accredited pharmacists, prescribers and nurses you'll come to know by name.</p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {team.map((member, i) => (
              <Reveal key={member.name} delay={i * 0.07}>
                <div className="group h-full rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-sm hover:shadow-xl hover:shadow-brand-primary/10 hover:-translate-y-1 transition-all">
                  <div className="aspect-[4/5] overflow-hidden bg-brand-light">
                    <ImageWithFallback src={member.img} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-[1.02rem] text-gray-900 leading-tight" style={{ fontWeight: 700 }}>{member.name}</h3>
                    <p className="text-[0.82rem] text-brand-secondary mt-0.5" style={{ fontWeight: 600 }}>{member.role}</p>
                    <p className="text-[0.83rem] text-gray-500 leading-relaxed mt-2">{member.bio}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── CTA band ───────── */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-4">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl p-10 sm:p-14 text-center isolate">
              {/* Background photo (decorative) */}
              <img src={ctaBg} alt="" aria-hidden="true" className="absolute inset-0 -z-10 w-full h-full object-cover" />
              {/* Dark brand overlay — guarantees text legibility (WCAG AA) over any photo */}
              <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-darkest/92 via-brand-darkest/82 to-brand-dark/85" />
              {/* Subtle colour wash for flair (kept light so it doesn't lift contrast) */}
              <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-tr from-brand-primary/25 via-transparent to-brand-secondary/25" />
              {/* Clip-path sheen accent — a soft diagonal highlight along the top */}
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 -z-10 h-28 bg-gradient-to-b from-white/10 to-transparent"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 55%, 0 100%)" }}
              />
              {/* Brand glow orbs */}
              <div aria-hidden className="absolute -top-10 right-0 -z-10 w-[300px] h-[300px] bg-brand-secondary/25 rounded-full blur-3xl" />
              <div aria-hidden className="absolute bottom-0 left-0 -z-10 w-[260px] h-[260px] bg-brand-accent/15 rounded-full blur-3xl" />

              <div className="relative">
                <Quote size={28} className="text-white/50 mx-auto mb-4" />
                <h2 className="text-white text-[1.6rem] md:text-[2rem] leading-snug mb-3 max-w-2xl mx-auto" style={{ fontWeight: 700 }}>
                  Healthcare that feels personal — right on your high street
                </h2>
                <p className="text-white/90 text-[1rem] max-w-xl mx-auto mb-8">
                  Explore our NHS and private clinics, or pop in to any of our three branches. We'd love to look after you.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => navigate(`${brand.basePath}/#nhs-services`)}
                    className="group inline-flex items-center gap-2 bg-white text-brand-primary px-6 py-3 rounded-xl hover:-translate-y-0.5 hover:shadow-xl transition-all cursor-pointer"
                    style={{ fontWeight: 600 }}
                  >
                    Explore services
                    <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                  </button>
                  <button
                    onClick={() => navigate(`${brand.basePath}/#private-services`)}
                    className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/40 px-6 py-3 rounded-xl hover:bg-white/20 hover:-translate-y-0.5 transition-all cursor-pointer"
                    style={{ fontWeight: 600 }}
                  >
                    <MapPin size={15} /> Private clinics
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer brand={brand} />
    </div>
  );
}
