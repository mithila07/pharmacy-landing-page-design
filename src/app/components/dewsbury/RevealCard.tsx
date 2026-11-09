import type { ReactNode } from "react";
import { Link } from "react-router";
import { ArrowRight, ArrowUpRight } from "iconoir-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

/**
 * A bright photo card for a service. The price or age chip sits in the top
 * right corner; the name sits at the foot over a soft shadow gradient. On hover
 * or keyboard focus a forest-glass panel fades in behind the name and the
 * description and booking link slide open. Touch screens keep the compact
 * card (the whole card is the link). `open` keeps the panel and text showing,
 * for a large feature card.
 */
export function RevealCard({ to, href, img, imgPos, name, tag, desc, cta, open = false, className = "", tall = false }: {
  to?: string;
  href?: string;
  img: string;
  imgPos?: string;
  name: string;
  tag?: ReactNode;
  desc: string;
  cta: string;
  open?: boolean;
  className?: string;
  tall?: boolean;
}) {
  const body = (
    <>
      <ImageWithFallback
        src={img}
        alt=""
        className="absolute inset-0 -z-10 w-full h-full object-cover transition-transform duration-[1200ms] ease-[var(--dmp-ease)] group-hover:scale-[1.035]"
        style={imgPos ? { objectPosition: imgPos } : undefined}
      />
      {/* Soft shadow at the foot so the name reads on any photo */}
      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-3/5 -z-10" style={{ background: "linear-gradient(0deg, rgba(2,32,28,0.72) 0%, rgba(2,32,28,0.32) 45%, rgba(2,32,28,0) 100%)" }} />
      {tag && (
        <span className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 rounded-full bg-brand-cta text-brand-darkest px-2.5 py-1 text-[0.74rem] sm:text-[0.78rem] max-w-[calc(100%-1.25rem)] truncate shadow-sm" style={{ fontWeight: 700 }}>{tag}</span>
      )}
      <span className={`dmp-card-panel ${open ? "dmp-card-panel--open" : ""} block p-3 sm:p-4`}>
        <span className={`block text-white leading-tight [text-shadow:0_1px_8px_rgba(2,32,28,0.45)] ${tall ? "font-display text-[1.5rem] sm:text-[1.9rem]" : "text-[0.98rem] sm:text-[1.08rem]"}`} style={{ fontWeight: 700 }}>{name}</span>
        <span className={`dmp-reveal ${open ? "dmp-reveal--open" : ""}`}>
          <span className="block">
            <span className={`block text-white/85 leading-relaxed pt-2 ${tall ? "text-[1rem] max-w-md" : "text-[0.88rem]"}`}>{desc}</span>
            <span className="mt-2.5 inline-flex items-center gap-1.5 text-brand-cta text-[0.9rem]" style={{ fontWeight: 700 }}>
              {cta} {href ? <ArrowUpRight width={15} height={15} /> : <ArrowRight width={15} height={15} />}
            </span>
          </span>
        </span>
      </span>
    </>
  );
  const cls = `group relative isolate flex flex-col justify-end overflow-hidden rounded-3xl p-2.5 sm:p-3 no-underline shadow-[0_18px_40px_-26px_rgba(2,32,28,0.55)] ring-1 ring-black/5 transition-[transform,box-shadow] duration-500 ease-[var(--dmp-ease)] hover:-translate-y-0.5 hover:shadow-[0_26px_50px_-24px_rgba(2,32,28,0.6)] ${className}`;
  const label = `${name}${typeof tag === "string" ? `, ${tag}` : ""}. ${desc}`;
  if (href) return <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`${label} (opens in a new tab)`} className={cls}>{body}</a>;
  return <Link to={to ?? "#"} aria-label={label} className={cls}>{body}</Link>;
}
