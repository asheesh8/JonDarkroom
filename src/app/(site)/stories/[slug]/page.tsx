import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react";
import { CTAButton } from "@/components/CTAButton";
import { FilmStripDivider } from "@/components/FilmStripDivider";
import { ShopImage } from "@/components/ShopImage";
import { BlogCard } from "@/components/BlogCard";
import { formatDate } from "@/lib/utils";
import {
  getPost,
  getPublishedPosts,
  allPostSlugs,
} from "@/data/blogPosts";

export function generateStaticParams() {
  return allPostSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = getPost(params.slug);
  if (!post) return { title: "Story not found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default function StoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPost(params.slug);
  if (!post || post.draft) notFound();

  const related = getPublishedPosts()
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);
  const fallback = getPublishedPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);
  const more = related.length > 0 ? related : fallback;

  return (
    <>
      {/* article header on wood */}
      <section className="surface-wood border-b border-brass/25 py-14 sm:py-16">
        <div className="shell max-w-3xl">
          <Link
            href="/stories"
            className="inline-flex items-center gap-1.5 text-sm text-cream/60 transition hover:text-brass"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All stories
          </Link>
          <span className="mt-5 inline-block rounded-full bg-burgundy/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brass-light">
            {post.category}
          </span>
          <h1 className="mt-4 font-serif text-4xl leading-tight text-cream text-balance sm:text-5xl">
            {post.title}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-5 text-sm text-cream/60">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-brass" aria-hidden="true" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-brass" aria-hidden="true" />
              {post.readingTime}
            </span>
            <span>By {post.author}</span>
          </div>
        </div>
      </section>

      {/* cover */}
      <div className="surface-wood-dark">
        <div className="shell max-w-4xl py-10">
          <div className="overflow-hidden rounded-lg border border-brass/25 shadow-counter">
            <div className="aspect-[16/9]">
              <ShopImage src={post.cover} alt={post.coverAlt} />
            </div>
          </div>
        </div>
      </div>

      {/* body */}
      <article className="surface-paper py-14 sm:py-16">
        <div className="shell max-w-2xl">
          <div className="space-y-6">
            {post.body.map((block, i) =>
              block.type === "h2" ? (
                <h2
                  key={i}
                  className="pt-4 font-serif text-2xl text-espresso sm:text-3xl"
                >
                  {block.text}
                </h2>
              ) : (
                <p
                  key={i}
                  className="text-lg leading-relaxed text-walnut"
                >
                  {block.text}
                </p>
              ),
            )}
          </div>

          <div className="mt-12 rounded-lg border border-walnut/20 bg-cream-dark/50 p-6 text-center">
            <p className="font-serif text-xl text-espresso">
              Have a project like this?
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm text-walnut">
              Bring it in to the shop on Pearl Street, or call Jon to talk it
              through first.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <CTAButton href="/contact" variant="primary" size="sm">
                Visit the shop
              </CTAButton>
              <CTAButton href="/services" variant="paper" size="sm">
                Browse services
              </CTAButton>
            </div>
          </div>
        </div>
      </article>

      <FilmStripDivider />

      {/* related */}
      <section className="surface-wood-dark py-16">
        <div className="shell">
          <div className="flex items-end justify-between">
            <h2 className="font-serif text-2xl text-cream sm:text-3xl">
              More stories
            </h2>
            <Link
              href="/stories"
              className="inline-flex items-center gap-1.5 text-sm text-brass transition hover:gap-2.5"
            >
              All stories <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-8 grid gap-7 md:grid-cols-3">
            {more.map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
