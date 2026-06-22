import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Clock, Calendar, ArrowRight } from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Reveal } from "../components/Reveal";
import { BlogCard } from "../components/BlogCard";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { strachansBrand } from "../branding";
import { blogPosts, getPost, formatBlogDate, type BlogBlock } from "../data/blog";
import { useSeo, JsonLd, blogPostingSchema } from "../seo";

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "heading":
      return <h2 className="text-[1.35rem] text-gray-900 mt-9 mb-3" style={{ fontWeight: 700 }}>{block.text}</h2>;
    case "paragraph":
      return <p className="text-[1.02rem] text-gray-700 leading-[1.75] mb-5">{block.text}</p>;
    case "list":
      return (
        <ul className="space-y-2.5 mb-5">
          {block.items.map((it, i) => (
            <li key={i} className="flex items-start gap-3 text-[1.02rem] text-gray-700 leading-[1.7]">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-brand-secondary shrink-0" />
              <span>{it}</span>
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote className="my-7 border-l-4 border-brand-secondary bg-brand-light/50 rounded-r-xl px-5 py-4">
          <p className="text-[1.1rem] text-gray-800 leading-relaxed italic">“{block.text}”</p>
          {block.cite && <footer className="mt-2 text-[0.85rem] text-brand-primary" style={{ fontWeight: 600 }}>— {block.cite}</footer>}
        </blockquote>
      );
  }
}

export default function BlogPostStrachans() {
  const brand = strachansBrand;
  const navigate = useNavigate();
  const { slug } = useParams();
  const post = slug ? getPost(slug) : undefined;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  useSeo(
    post
      ? {
          title: `${post.title} | Strachans Pharmacy`,
          description: post.excerpt,
          path: `${brand.basePath}/blog/${post.slug}`,
          image: post.image,
          type: "article",
        }
      : { title: "Article not found | Strachans Pharmacy", description: "This article could not be found.", index: false },
  );

  if (!post) {
    return (
      <div className={`min-h-screen bg-white ${brand.themeClass}`}>
        <Header brand={brand} />
        <div className="max-w-3xl mx-auto px-4 py-24 text-center">
          <p className="text-gray-500 mb-4">Article not found.</p>
          <button onClick={() => navigate(`${brand.basePath}/blog`)} className="text-brand-primary hover:underline cursor-pointer" style={{ fontWeight: 600 }}>
            Back to the blog
          </button>
        </div>
        <Footer brand={brand} />
      </div>
    );
  }

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className={`min-h-screen bg-white ${brand.themeClass}`}>
      <JsonLd data={blogPostingSchema(post, brand.basePath)} />
      <Header brand={brand} />

      <article className="relative">
        {/* Header band */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-light via-white to-white" />
          <div className="absolute -top-20 right-0 w-[360px] h-[360px] rounded-full bg-brand-secondary/12 blur-3xl" />
          <div className="relative max-w-3xl mx-auto px-4 pt-8 pb-6">
            <button
              onClick={() => navigate(`${brand.basePath}/blog`)}
              className="flex w-fit items-center gap-1.5 text-[0.85rem] text-gray-500 hover:text-brand-primary transition-colors cursor-pointer mb-6"
              style={{ fontWeight: 500 }}
            >
              <ArrowLeft size={15} /> All articles
            </button>
            <div className="mb-4">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-brand-secondary/10 text-brand-secondary text-[0.74rem]" style={{ fontWeight: 600 }}>
                {post.category}
              </span>
            </div>
            <h1 className="text-[1.9rem] md:text-[2.5rem] leading-[1.12] text-gray-900 mb-5" style={{ fontWeight: 800, letterSpacing: "-0.02em" }}>
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.85rem] text-gray-500">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary" style={{ fontWeight: 700 }}>
                  {post.author.name.charAt(0)}
                </div>
                <div className="leading-tight">
                  <p className="text-gray-800" style={{ fontWeight: 600 }}>{post.author.name}</p>
                  <p className="text-[0.78rem] text-gray-400">{post.author.role}</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5"><Calendar size={13} /> {formatBlogDate(post.date)}</span>
              <span className="inline-flex items-center gap-1.5"><Clock size={13} /> {post.readMinutes} min read</span>
            </div>
          </div>
        </div>

        {/* Cover */}
        <div className="max-w-4xl mx-auto px-4">
          <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm aspect-[16/8] bg-brand-light">
            <ImageWithFallback src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Body */}
        <div className="max-w-3xl mx-auto px-4 py-10">
          <p className="text-[1.15rem] text-gray-600 leading-relaxed mb-8" style={{ fontWeight: 500 }}>{post.excerpt}</p>
          {post.content.map((block, i) => (
            <Block key={i} block={block} />
          ))}

          {/* Inline CTA */}
          <div className="mt-10 rounded-2xl border border-brand-primary/15 bg-gradient-to-br from-brand-light/70 to-white p-6 text-center">
            <p className="text-[1.05rem] text-gray-900 mb-1.5" style={{ fontWeight: 700 }}>Need to speak to a pharmacist?</p>
            <p className="text-[0.9rem] text-gray-500 mb-4">Book an NHS or private appointment at your nearest Strachans branch.</p>
            <button
              onClick={() => navigate(`${brand.basePath}/#nhs-services`)}
              className="inline-flex items-center gap-2 bg-brand-primary text-white px-6 py-3 rounded-xl hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-primary/25 transition-all cursor-pointer"
              style={{ fontWeight: 600 }}
            >
              Explore services <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </article>

      {/* Related */}
      <section className="relative py-14 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <Reveal className="mb-6">
            <h2 className="text-[1.4rem] text-gray-900" style={{ fontWeight: 700 }}>Keep reading</h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.06}>
                <BlogCard post={p} basePath={brand.basePath} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Footer brand={brand} />
    </div>
  );
}
