"use client";

import { useState } from "react";
import Link from "next/link";
import { PlusSquare, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import {
  AdminPageHeader,
  MockNotice,
  Card,
} from "@/components/admin/AdminForm";
import { formatDate } from "@/lib/utils";
import { blogPosts as seedPosts } from "@/data/blogPosts";

export default function AdminBlogPage() {
  // local working copy — TODO: replace with Supabase `posts` query + mutations
  const [posts, setPosts] = useState(seedPosts);

  function toggleDraft(slug: string) {
    setPosts((prev) =>
      prev.map((p) => (p.slug === slug ? { ...p, draft: !p.draft } : p)),
    );
  }

  function remove(slug: string) {
    if (!confirm("Remove this story? (mock — resets on reload)")) return;
    setPosts((prev) => prev.filter((p) => p.slug !== slug));
  }

  return (
    <div>
      <AdminPageHeader
        title="Stories From The Darkroom"
        description="Manage the shop's blog posts and stories."
        action={
          <Link
            href="/admin/blog/new"
            className="btn-reset rounded-xl bg-gradient-to-b from-brass-light to-brass-dark px-4 py-2.5 text-sm font-medium text-espresso shadow-brass"
          >
            <PlusSquare className="h-4 w-4" aria-hidden="true" />
            New story
          </Link>
        }
      />

      <MockNotice />

      <Card className="p-0">
        <ul className="divide-y divide-brass/10">
          {posts.map((post) => (
            <li
              key={post.slug}
              className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-sm bg-burgundy/20 px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-brass-light">
                    {post.category}
                  </span>
                  {post.draft ? (
                    <span className="rounded-sm bg-charcoal px-2.5 py-0.5 text-[0.65rem] uppercase tracking-wide text-cream/60">
                      Draft
                    </span>
                  ) : (
                    <span className="rounded-sm bg-[#3a5a40]/60 px-2.5 py-0.5 text-[0.65rem] uppercase tracking-wide text-cream">
                      Published
                    </span>
                  )}
                  <span className="text-xs text-cream/40">
                    {formatDate(post.date)}
                  </span>
                </div>
                <h3 className="mt-1.5 truncate font-serif text-lg text-cream">
                  {post.title}
                </h3>
                <p className="truncate text-sm text-cream/50">{post.excerpt}</p>
              </div>

              <div className="flex shrink-0 items-center gap-1">
                <button
                  onClick={() => toggleDraft(post.slug)}
                  title={post.draft ? "Publish" : "Unpublish"}
                  className="grid h-9 w-9 place-items-center rounded-xl border border-brass/25 text-cream/70 hover:border-brass hover:text-brass"
                >
                  {post.draft ? (
                    <Eye className="h-4 w-4" />
                  ) : (
                    <EyeOff className="h-4 w-4" />
                  )}
                </button>
                <Link
                  href={`/stories/${post.slug}`}
                  target="_blank"
                  title="Preview"
                  className="grid h-9 w-9 place-items-center rounded-xl border border-brass/25 text-cream/70 hover:border-brass hover:text-brass"
                >
                  <Pencil className="h-4 w-4" />
                </Link>
                <button
                  onClick={() => remove(post.slug)}
                  title="Delete"
                  className="grid h-9 w-9 place-items-center rounded-xl border border-burgundy/40 text-burgundy hover:bg-burgundy/10"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </li>
          ))}
          {posts.length === 0 && (
            <li className="p-8 text-center text-cream/50">
              No stories yet. Create your first one.
            </li>
          )}
        </ul>
      </Card>
    </div>
  );
}
