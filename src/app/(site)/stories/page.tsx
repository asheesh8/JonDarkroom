import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { FilmStripDivider } from "@/components/FilmStripDivider";
import { StoriesBrowser } from "@/components/StoriesBrowser";
import { getPublishedPosts } from "@/data/blogPosts";

export const metadata: Metadata = {
  title: "Stories From The Darkroom",
  description:
    "Practical photo tips and local stories from Jon's Darkroom in Essex Junction, VT — preserving photos, processing film, framing advice, camera gear, and more.",
  keywords: [
    "photo tips Vermont",
    "film processing advice",
    "framing advice Essex Junction",
    "Jon's Darkroom blog",
  ],
};

export default function StoriesPage() {
  const posts = getPublishedPosts();

  return (
    <>
      <PageHero
        eyebrow="Stories From The Darkroom"
        title="Notes from the shop"
        tagline="Tips on preserving your photographs and films, advice on framing what matters, and stories from a darkroom that's been part of Essex Junction for decades."
        crumbs={[{ label: "Home", href: "/" }, { label: "Stories" }]}
      />

      <FilmStripDivider />

      <section className="surface-paper py-16 sm:py-20">
        <div className="shell">
          <StoriesBrowser posts={posts} />
        </div>
      </section>
    </>
  );
}
