import { ImageWithFallback } from "./figma/ImageWithFallback";
import heroImage from "figma:asset/4e49557b0febf64334f96f171bee81cc1d2e15ab.png";
import { ArrowRight, Star } from "lucide-react";
import { motion } from "motion/react";
import { pharmacyInfo } from "../data/services";

export function HeroSection() {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-light via-brand-light-alt to-brand-light-cyan" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-brand-accent/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-brand-secondary/10 to-transparent rounded-full blur-3xl" />

      {/* Right: Edge-to-edge image (top, bottom, right) */}
      <div className="hidden lg:block absolute top-0 bottom-0 right-0 w-1/2 z-0">
        <ImageWithFallback
          src={heroImage}
          alt="Community pharmacy team"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-light/90 via-brand-light/20 to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, x: [0, 6, 0] }}
          transition={{
            opacity: { delay: 0.6, duration: 0.5 },
            y: { delay: 0.6, duration: 0.5 },
            x: { delay: 1.1, duration: 4, ease: "easeInOut", repeat: Infinity },
          }}
          className="absolute bottom-8 left-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg px-5 py-4 max-w-[220px] border border-emerald-100/50"
        >
          <div className="flex items-center gap-2 mb-1.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <span className="text-[0.78rem] text-emerald-600" style={{ fontWeight: 600 }}>Open Now</span>
          </div>
          <p className="text-[0.75rem] text-gray-500">Walk-ins welcome. No appointment needed for most services.</p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[520px] py-12 lg:py-0">
          {/* Left: Copy */}
          <div className="relative z-10">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm mb-6 border border-emerald-100/50">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-[0.78rem] text-gray-600" style={{ fontWeight: 500 }}>
                {pharmacyInfo.googleRating} rating · {pharmacyInfo.totalReviews} reviews
              </span>
            </div>

            <h1 className="text-[2rem] md:text-[2.6rem] leading-[1.15] text-brand-primary mb-5" style={{ fontWeight: 800 }}>
              Your Neighbourhood
              <br />
              Health & Wellness
              <br />
              <span className="text-brand-secondary">Partner</span>
            </h1>
            <p className="text-gray-500 text-[1rem] mb-8 leading-relaxed max-w-lg">
              Skip the long waits. Get expert advice, NHS services, private treatments, and prescriptions — all from your trusted local community pharmacy.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => scrollTo("nhs-services")}
                className="inline-flex items-center gap-2 bg-brand-primary text-white px-6 py-3 rounded-lg hover:shadow-lg hover:shadow-emerald-900/20 transition-all cursor-pointer"
                style={{ fontWeight: 600 }}
              >
                Explore Services
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          <div className="hidden lg:block" />
        </div>
      </div>
    </section>
  );
}