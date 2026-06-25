"use client";

import { useState } from "react";
import { BlogCard } from "./BlogCard";
import { cn } from "@/lib/utils";
import { BLOG_CATEGORIES, type Post } from "@/data/blogPosts";

/** Client-side category filter for the Stories index. */
export function StoriesBrowser({ posts }: { posts: Post[] }) {
  const [active, setActive] = useState<string>("All");

  const filtered =
    active === "All" ? posts : posts.filter((p) => p.category === active);

  const filters = ["All", ...BLOG_CATEGORIES];

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2.5">
        {filters.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActive(cat)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm transition",
              active === cat
                ? "border-burgundy bg-burgundy text-cream"
                : "border-walnut/30 text-walnut hover:border-burgundy hover:text-burgundy",
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-12 text-center text-walnut">
          No stories in this category yet — check back soon.
        </p>
      ) : (
        <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
