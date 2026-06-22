import { Star, Quotes, ArrowUpRight, IconContext } from "@phosphor-icons/react";
import { pharmacyInfo } from "../data/services";

/** Coloured Google "G" mark — keeps the review block visibly tied to Google. */
function GoogleG({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
      <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
      <path fill="#FBBC05" d="M11.69 28.18c-.44-1.32-.69-2.73-.69-4.18s.25-2.86.69-4.18v-5.7H4.34A21.98 21.98 0 0 0 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z" />
      <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
    </svg>
  );
}

function Stars({ count, size = 14 }: { count: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={size} weight={i < count ? "fill" : "regular"} className={i < count ? "text-amber-400" : "text-gray-300"} />
      ))}
    </div>
  );
}

/**
 * HealthCheck reviews — a "bento" layout that differs from the shared 3-card
 * grid: a brand-gradient summary panel sits alongside an asymmetric grid of
 * Google reviews, each tagged with the Google mark.
 */
export function ReviewsSectionHealthCheck() {
  const reviews = pharmacyInfo.reviews.slice(0, 4);

  return (
    <IconContext.Provider value={{ weight: "duotone" }}>
    <section id="reviews" className="relative py-20 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,#F2F7FD 0%, #FFFFFF 60%)" }} />
      <div aria-hidden="true" className="hc-swoosh-bar absolute -top-32 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] rounded-full opacity-[0.06] blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-9">
          <div>
            <span className="text-[0.8rem] text-brand-secondary uppercase tracking-widest" style={{ fontWeight: 700 }}>Reviews</span>
            <h2 className="font-display text-[1.9rem] md:text-[2.4rem] text-[#111D30] mt-2" style={{ fontWeight: 700, letterSpacing: "-0.02em" }}>
              What Bradford <span className="hc-swoosh-text">says about us</span>
            </h2>
          </div>
          <a
            href="https://www.google.com/maps"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-[#D0E0F2] bg-white px-4 min-h-[44px] text-[0.9rem] text-[#111D30] shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all no-underline"
            style={{ fontWeight: 600 }}
          >
            <GoogleG /> Read all reviews <ArrowUpRight size={16} className="text-brand-primary" />
          </a>
        </div>

        <div className="grid md:grid-cols-12 gap-4">
          {/* Summary panel — brand gradient */}
          <div
            className="md:col-span-4 rounded-2xl p-7 text-white flex flex-col justify-between overflow-hidden relative"
            style={{ background: "linear-gradient(150deg,#005DE6 0%, #00B6EB 55%, #00872D 100%)" }}
          >
            <div className="relative">
              <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1.5 text-[0.78rem]" style={{ fontWeight: 600 }}>
                <span className="bg-white rounded-full p-0.5 flex"><GoogleG size={14} /></span> Google rating
              </span>
              <div className="flex items-end gap-3 mt-5">
                <span className="text-[3.6rem] leading-none" style={{ fontWeight: 700 }}>{pharmacyInfo.googleRating}</span>
                <div className="mb-2">
                  <Stars count={Math.round(pharmacyInfo.googleRating)} size={18} />
                  <p className="text-white/80 text-[0.84rem] mt-1">{pharmacyInfo.totalReviews} verified reviews</p>
                </div>
              </div>
            </div>
            <p className="relative text-white/85 text-[0.92rem] leading-relaxed mt-6">
              Rated by patients across Bradford for friendly, fast and professional care — NHS and private, all in one place.
            </p>
          </div>

          {/* Review cards — asymmetric fill */}
          {reviews.map((review, i) => (
            <article
              key={review.name}
              className={`rounded-2xl border border-[#D0E0F2] bg-white shadow-sm p-6 hover:-translate-y-0.5 hover:shadow-md transition-all ${
                i === 0 ? "md:col-span-8" : "md:col-span-4"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <Stars count={review.rating} />
                <Quotes size={22} className="text-brand-primary/30" />
              </div>
              <p className={`text-[#3A4B62] leading-relaxed mb-5 ${i === 0 ? "text-[1.05rem]" : "text-[0.9rem]"}`}>
                "{review.text}"
              </p>
              <div className="flex items-center gap-3 mt-auto">
                <span className="w-9 h-9 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center text-[0.85rem]" style={{ fontWeight: 700 }}>
                  {review.name.charAt(0)}
                </span>
                <div className="leading-tight">
                  <p className="text-[#111D30] text-[0.9rem]" style={{ fontWeight: 600 }}>{review.name}</p>
                  <p className="text-[#8190A5] text-[0.76rem] flex items-center gap-1"><GoogleG size={11} /> {review.date}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
    </IconContext.Provider>
  );
}
