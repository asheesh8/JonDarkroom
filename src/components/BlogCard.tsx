import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ShopImage } from "./ShopImage";
import { formatDate } from "@/lib/utils";
import type { Post } from "@/data/blogPosts";

export function BlogCard({ post }: { post: Post }) {
  return (
    <article className="card-paper group flex h-full flex-col overflow-hidden">
      <Link href={`/stories/${post.slug}`} className="block">
        <div className="aspect-[16/10] overflow-hidden">
          <ShopImage
            src={post.cover}
            alt={post.coverAlt}
            className="transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-3 text-xs">
          <span className="rounded-sm bg-burgundy/10 px-2.5 py-1 font-semibold uppercase tracking-wide text-burgundy">
            {post.category}
          </span>
          <span className="text-walnut/70">{post.readingTime}</span>
        </div>

        <h3 className="mt-3 font-serif text-xl leading-snug text-espresso">
          <Link
            href={`/stories/${post.slug}`}
            className="transition hover:text-burgundy"
          >
            {post.title}
          </Link>
        </h3>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-walnut">
          {post.excerpt}
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-walnut/15 pt-4">
          <span className="text-xs text-walnut/70">
            {formatDate(post.date)}
          </span>
          <Link
            href={`/stories/${post.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-burgundy transition hover:gap-2.5"
          >
            Read
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">{post.title}</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
