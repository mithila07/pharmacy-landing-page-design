import { useEffect } from "react";
import type { Brand } from "./branding";
import { pharmacyInfo, type Service } from "./data/services";
import type { BlogPost } from "./data/blog";

/**
 * Lightweight, dependency-free SEO/GEO layer for this SPA.
 *  - `useSeo` updates <title> + meta/canonical/OG/Twitter per route at runtime.
 *  - `JsonLd` renders structured data; builders below produce the graphs.
 *
 * NOTE: set SITE.url to the real production domain before launch, and drop a
 * 1200×630 image at /public/og-strachans.jpg for social/AI link previews.
 */
export const SITE = {
  url: "https://www.strachanspharmacy.co.uk", // TODO: replace with the live domain
  name: "Strachans Pharmacy",
  ogImage: "/og-strachans.jpg",
};

const abs = (pathOrUrl: string) => (pathOrUrl.startsWith("http") ? pathOrUrl : SITE.url + pathOrUrl);

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

type SeoInput = {
  title: string;
  description: string;
  /** Route path for the canonical/OG url, e.g. "/strachans/about". Defaults to current path. */
  path?: string;
  image?: string;
  type?: "website" | "article";
  /** false → noindex (use for transactional/utility pages). */
  index?: boolean;
};

export function useSeo({ title, description, path, image = SITE.ogImage, type = "website", index = true }: SeoInput) {
  useEffect(() => {
    const url = abs(path ?? window.location.pathname);
    const img = abs(image);
    document.title = title;
    upsertMeta("name", "description", description);
    upsertMeta("name", "robots", index ? "index, follow" : "noindex, nofollow");
    upsertLink("canonical", url);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:image", img);
    upsertMeta("property", "og:site_name", SITE.name);
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", img);
  }, [title, description, path, image, type, index]);
}

export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

// ── Structured-data builders ──────────────────────────────────────────────

// All branches share the same trading hours.
const HOURS_SPEC = [
  { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "20:00" },
  { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "18:00" },
  { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "10:00", closes: "16:00" },
];

const AREA_SERVED = ["Bury", "Uppermill", "Saddleworth", "Greater Manchester"];

function postalAddress(address: string) {
  const parts = address.split(",").map((s) => s.trim());
  const postalCode = parts[parts.length - 1];
  const addressLocality = parts.length >= 3 ? parts[parts.length - 2] : parts[1];
  const streetAddress = parts.slice(0, Math.max(1, parts.length - 2)).join(", ");
  return { "@type": "PostalAddress", streetAddress, addressLocality, addressRegion: "Greater Manchester", postalCode, addressCountry: "GB" };
}

/** Organization + one Pharmacy node per branch (NAP, geo, hours, rating). */
export function pharmacyGraph(brand: Brand, areaServed: string[] = AREA_SERVED) {
  const base = abs(brand.basePath || "/");
  const logo = abs(SITE.ogImage);

  const branches = brand.locations.map((loc) => ({
    "@type": "Pharmacy",
    "@id": `${base}#${loc.id}`,
    name: `${brand.name} — ${loc.shortName}`,
    url: base,
    image: logo,
    telephone: loc.phone,
    email: loc.email,
    address: postalAddress(loc.address),
    geo: { "@type": "GeoCoordinates", latitude: loc.lat, longitude: loc.lng },
    openingHoursSpecification: HOURS_SPEC,
    areaServed,
    priceRange: "££",
    parentOrganization: { "@id": `${base}#organization` },
  }));

  const org = {
    "@type": ["Organization", "MedicalOrganization"],
    "@id": `${base}#organization`,
    name: brand.name,
    url: base,
    logo,
    image: logo,
    medicalSpecialty: "Pharmacy",
    areaServed,
    aggregateRating: { "@type": "AggregateRating", ratingValue: pharmacyInfo.googleRating, reviewCount: pharmacyInfo.totalReviews },
    department: brand.locations.map((loc) => ({ "@id": `${base}#${loc.id}` })),
  };

  return { "@context": "https://schema.org", "@graph": [org, ...branches] };
}

/** FAQPage graph — feeds both Google rich results and AI-engine citations. */
export function faqPageSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** Title + meta description for a service/booking page. */
export function serviceSeo(service: Service, isNHS: boolean): { title: string; description: string } {
  const price = isNHS
    ? "free on the NHS"
    : service.price
      ? service.price.replace(/From\s*(\d)/, "from £$1").toLowerCase()
      : "a private service";
  const title = `${service.name} in Bury & Uppermill | ${SITE.name}`;
  const description = `${service.name} at ${SITE.name} — ${price}. ${service.description}. Book a same-day appointment at our Bury or Uppermill branches.`;
  return { title, description: description.length > 160 ? description.slice(0, 157) + "…" : description };
}

/** BlogPosting/Article schema for an individual post. */
export function blogPostingSchema(post: BlogPost, basePath: string) {
  const url = `${SITE.url}${basePath}/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.date,
    dateModified: post.date,
    articleSection: post.category,
    author: { "@type": "Person", name: post.author.name, jobTitle: post.author.role },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: { "@type": "ImageObject", url: abs(SITE.ogImage) },
    },
  };
}
