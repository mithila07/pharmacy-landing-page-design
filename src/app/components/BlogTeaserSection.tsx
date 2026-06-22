import { useNavigate } from "react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { BlogCard } from "./BlogCard";
import { blogPosts } from "../data/blog";
import type { Brand } from "../branding";

/** "From our blog" teaser for the home page — shows the latest three posts. */
export function BlogTeaserSection({ brand }: { brand: Brand }) {
  const navigate = useNavigate();
  const posts = blogPosts.slice(0, 3);
  const allHref = `${brand.basePath}/blog`;

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-brand-light-alt/40 to-white" />
      <div className="absolute bottom-10 right-0 w-[360px] h-[360px] bg-brand-secondary/8 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4">
        <Reveal className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div className="max-w-xl">
            <span className="text-[0.8rem] text-brand-secondary uppercase tracking-widest" style={{ fontWeight: 700 }}>From our blog</span>
            <h2 className="text-[1.8rem] md:text-[2.2rem] text-gray-900 mt-2" style={{ fontWeight: 700 }}>Latest health advice</h2>
          </div>
          <button
            onClick={() => navigate(allHref)}
            className="inline-flex items-center gap-2 text-brand-primary hover:gap-3 transition-all cursor-pointer"
            style={{ fontWeight: 600 }}
          >
            View all articles <ArrowRight size={16} />
          </button>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.06}>
              <BlogCard post={post} basePath={brand.basePath} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
