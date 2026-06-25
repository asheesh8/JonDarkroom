import type { Metadata } from "next";
import { Phone, MapPin } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { CTAButton } from "@/components/CTAButton";
import { FilmStripDivider } from "@/components/FilmStripDivider";
import { PressArticleBlock } from "@/components/PressArticleBlock";
import { SectionHeader } from "@/components/SectionHeader";
import {
  featuredArticle,
  pressArchive,
  shopTimeline,
} from "@/data/featuredArticle";
import { businessInfo } from "@/data/businessInfo";

export const metadata: Metadata = {
  title: "Jon In The Press",
  description:
    "A local darkroom keeping Vermont's memories alive. Read local press coverage of Jon's Darkroom & Frameshop and the story of a 35+ year Essex Junction business.",
  keywords: [
    "Jon's Darkroom press",
    "Essex Junction local business",
    "Vermont darkroom story",
  ],
};

export default function PressPage() {
  const archiveOnly = pressArchive.filter((a) => a.id !== featuredArticle.id);

  return (
    <>
      <PageHero
        eyebrow="Jon In The Press"
        title="A Local Darkroom Keeping Vermont's Memories Alive"
        tagline="For decades, Jon's Darkroom has helped families preserve photos, restore memories, frame meaningful pieces, and keep old media alive — and the community has taken notice."
        crumbs={[{ label: "Home", href: "/" }, { label: "Jon In The Press" }]}
      >
        <div className="flex flex-wrap gap-4">
          <CTAButton
            href={`tel:${businessInfo.phoneHref}`}
            variant="brass"
            external
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call Jon
          </CTAButton>
          <CTAButton href="/contact" variant="ghost">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            Visit the shop
          </CTAButton>
        </div>
      </PageHero>

      <FilmStripDivider label="The Essex Reporter" />

      {/* featured article */}
      <section className="surface-wood py-16 sm:py-20">
        <div className="shell max-w-4xl">
          <PressArticleBlock article={featuredArticle} featured />
        </div>
      </section>

      {/* timeline */}
      <section className="surface-wood-dark py-16 sm:py-20">
        <div className="shell">
          <SectionHeader
            eyebrow="The story of the shop"
            title="From opening day to today"
          />
          <ol className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {shopTimeline.map((entry) => (
              <li
                key={entry.year}
                className="rounded-lg border border-brass/25 bg-[#241810]/60 p-6"
              >
                <p className="font-serif text-3xl text-brass-light">
                  {entry.year}
                </p>
                <h3 className="mt-1 font-serif text-lg text-cream">
                  {entry.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/65">
                  {entry.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* archive */}
      {archiveOnly.length > 0 && (
        <section className="surface-paper py-16 sm:py-20">
          <div className="shell max-w-4xl">
            <SectionHeader
              tone="cream"
              eyebrow="The archive"
              title="More local coverage"
            />
            <div className="mt-10 space-y-10">
              {archiveOnly.map((a) => (
                <PressArticleBlock key={a.id} article={a} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="surface-wood py-16">
        <div className="shell text-center">
          <h2 className="font-serif text-3xl text-cream sm:text-4xl">
            Become part of the story
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-cream/75">
            Bring in the photographs, films, and keepsakes that matter to your
            family. We&apos;ll help you keep them safe for the next generation.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-4">
            <CTAButton
              href={`tel:${businessInfo.phoneHref}`}
              variant="brass"
              external
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {businessInfo.phoneDisplay}
            </CTAButton>
            <CTAButton href="/contact" variant="ghost">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              Get directions
            </CTAButton>
          </div>
        </div>
      </section>
    </>
  );
}
