import { useNavigate } from "react-router";
import { ArrowRight, Clock } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { formatBlogDate, type BlogPost } from "../data/blog";

/** Compact article card used in the blog listing and the home-page teaser. */
export function BlogCard({ post, basePath }: { post: BlogPost; basePath: string }) {
  const navigate = useNavigate();
  const href = `${basePath}/blog/${post.slug}`;
  return (
    <a
      href={href}
      onClick={(e) => { e.preventDefault(); navigate(href); }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-xl hover:shadow-brand-primary/10 hover:-translate-y-1 transition-all"
    >
      <div className="aspect-[16/10] overflow-hidden bg-brand-light">
        <ImageWithFallback
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-3 mb-2.5 text-[0.72rem]">
          <span className="px-2.5 py-1 rounded-full bg-brand-secondary/10 text-brand-secondary" style={{ fontWeight: 600 }}>
            {post.category}
          </span>
          <span className="inline-flex items-center gap-1 text-gray-400">
            <Clock size={11} /> {post.readMinutes} min read
          </span>
        </div>
        <h3 className="text-[1.05rem] text-gray-900 leading-snug mb-2 group-hover:text-brand-primary transition-colors" style={{ fontWeight: 700 }}>
          {post.title}
        </h3>
        <p className="text-[0.86rem] text-gray-500 leading-relaxed mb-4 line-clamp-3 flex-1">{post.excerpt}</p>
        <div className="flex items-center justify-between">
          <span className="text-[0.74rem] text-gray-400">{formatBlogDate(post.date)}</span>
          <span className="inline-flex items-center gap-1.5 text-[0.84rem] text-brand-primary group-hover:gap-2.5 transition-all" style={{ fontWeight: 600 }}>
            Read <ArrowRight size={15} />
          </span>
        </div>
      </div>
    </a>
  );
}
