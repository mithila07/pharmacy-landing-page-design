import { useEffect } from "react";
import { useNavigate } from "react-router";
import { ArrowRight, Clock, Sparkles } from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Reveal } from "../components/Reveal";
import { BlogCard } from "../components/BlogCard";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { strachansBrand } from "../branding";
import { blogPosts, formatBlogDate } from "../data/blog";
import { useSeo } from "../seo";

export default function BlogPageStrachans() {
  const brand = strachansBrand;
  const navigate = useNavigate();
  const [featured, ...rest] = blogPosts;
  const featuredHref = `${brand.basePath}/blog/${featured.slug}`;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  useSeo({
    title: "Health Advice & Pharmacy Tips | Strachans Pharmacy Blog",
    description: "Practical, jargon-free health advice from the pharmacists at Strachans Pharmacy in Bury and Uppermill — NHS services, private clinics and everyday wellbeing.",
    path: `${brand.basePath}/blog`,
  });

  return (
    <div className={`min-h-screen bg-white ${brand.themeClass}`}>
      <Header brand={brand} />

      {/* Intro */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light via-white to-white" />
        <div className="absolute -top-20 -right-16 w-[380px] h-[380px] rounded-full bg-brand-secondary/15 blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 pt-14 pb-10">
          <Reveal className="max-w-2xl">
            <span className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md rounded-full px-3 py-1.5 shadow-sm border border-brand-primary/10 mb-5">
              <Sparkles size={13} className="text-brand-secondary" />
              <span className="text-[0.78rem] text-gray-600" style={{ fontWeight: 600 }}>The Strachans journal</span>
            </span>
            <h1 className="text-[2.2rem] md:text-[2.8rem] leading-[1.1] text-brand-primary mb-4" style={{ fontWeight: 800, letterSpacing: "-0.02em" }}>
              Health advice, <span className="text-brand-secondary">straight from the pharmacy</span>
            </h1>
            <p className="text-gray-500 text-[1.05rem] leading-relaxed">
              Practical, jargon-free guidance from our pharmacists and clinicians — on NHS services, private clinics
              and everyday wellbeing.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Featured */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 pb-4">
          <Reveal>
            <a
              href={featuredHref}
              onClick={(e) => { e.preventDefault(); navigate(featuredHref); }}
              className="group grid lg:grid-cols-2 gap-0 overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm hover:shadow-xl hover:shadow-brand-primary/10 transition-all"
            >
              <div className="aspect-[16/10] lg:aspect-auto overflow-hidden bg-brand-light">
                <ImageWithFallback
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-7 sm:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-3 text-[0.74rem]">
                  <span className="px-2.5 py-1 rounded-full bg-brand-secondary/10 text-brand-secondary" style={{ fontWeight: 600 }}>
                    Featured · {featured.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-gray-400"><Clock size={12} /> {featured.readMinutes} min read</span>
                </div>
                <h2 className="text-[1.5rem] sm:text-[1.9rem] leading-tight text-gray-900 mb-3 group-hover:text-brand-primary transition-colors" style={{ fontWeight: 700 }}>
                  {featured.title}
                </h2>
                <p className="text-gray-500 text-[0.96rem] leading-relaxed mb-5">{featured.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="text-[0.82rem] text-gray-500">
                    <span style={{ fontWeight: 600 }} className="text-gray-700">{featured.author.name}</span> · {formatBlogDate(featured.date)}
                  </div>
                  <span className="inline-flex items-center gap-2 text-brand-primary group-hover:gap-3 transition-all" style={{ fontWeight: 600 }}>
                    Read article <ArrowRight size={16} />
                  </span>
                </div>
              </div>
            </a>
          </Reveal>
        </div>
      </section>

      {/* Grid */}
      <section className="relative py-12">
        <div className="max-w-7xl mx-auto px-4">
          <Reveal className="mb-6">
            <h2 className="text-[1.4rem] text-gray-900" style={{ fontWeight: 700 }}>Latest articles</h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.06}>
                <BlogCard post={post} basePath={brand.basePath} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Footer brand={brand} />
    </div>
  );
}
