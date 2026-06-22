import { Star, Quote } from "lucide-react";
import { pharmacyInfo } from "../data/services";

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={14} className={i < count ? "fill-amber-400 text-amber-400" : "text-gray-300"} />
      ))}
    </div>
  );
}

export function ReviewsSection() {
  return (
    <section id="reviews" className="py-16 relative overflow-hidden">
      {/* Subtle gradient bg */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-light via-brand-light-alt to-white" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-[420px] h-[420px] bg-brand-secondary/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-[1.7rem] md:text-[2rem] text-brand-primary mb-2" style={{ fontWeight: 700 }}>Trusted by Our Community</h2>
          <div className="flex items-center justify-center gap-3 mt-3">
            <div className="flex items-center gap-1.5">
              <span className="text-[1.8rem] text-brand-primary" style={{ fontWeight: 700 }}>{pharmacyInfo.googleRating}</span>
              <Stars count={Math.round(pharmacyInfo.googleRating)} />
            </div>
            <span className="text-gray-300">|</span>
            <span className="text-gray-500 text-[0.9rem]">{pharmacyInfo.totalReviews} Google Reviews</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {pharmacyInfo.reviews.slice(0, 3).map((review) => (
            <div key={review.name} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-emerald-100/50">
              <Quote size={20} className="text-brand-accent/40 mb-3" />
              <p className="text-gray-600 text-[0.9rem] mb-4 leading-relaxed">"{review.text}"</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-900 text-[0.9rem]" style={{ fontWeight: 600 }}>{review.name}</p>
                  <p className="text-gray-400 text-[0.78rem]">{review.date}</p>
                </div>
                <Stars count={review.rating} />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="https://www.google.com/maps"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-brand-primary text-[0.9rem] hover:underline"
            style={{ fontWeight: 600 }}
          >
            View All Reviews on Google
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17l9.2-9.2M17 17V8H8" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
