import type { Metadata } from "next";
import { Phone, MapPin } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { CTAButton } from "@/components/CTAButton";
import { FilmStripDivider } from "@/components/FilmStripDivider";
import { PressArticleBlock } from "@/components/PressArticleBlock";
import { PressPagesLightbox } from "@/components/PressPagesLightbox";
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

          {featuredArticle.pages && featuredArticle.pages.length > 0 && (
            <div className="mt-12">
              <p className="eyebrow mb-4 text-center text-brass">
                The full feature — {featuredArticle.publication}
              </p>
              <PressPagesLightbox pages={featuredArticle.pages} />
            </div>
          )}
        </div>
      </section>

      {/* timeline */}
      <section className="surface-wood-dark py-16 sm:py-20">
        <div className="shell">
          <SectionHeader
            eyebrow="The story of the shop"
            title="From opening day to today"
          />
          <ol className="relative mx-auto mt-14 max-w-5xl before:absolute before:bottom-4 before:left-5 before:top-4 before:w-px before:bg-gradient-to-b before:from-transparent before:via-brass/55 before:to-transparent md:before:left-1/2 md:before:-translate-x-1/2">
            {shopTimeline.map((entry, index) => (
              <li
                key={entry.year}
                className={`relative grid gap-5 pb-10 last:pb-0 md:grid-cols-[1fr_5rem_1fr] md:items-center ${
                  index % 2 === 0 ? "" : "md:[&_.timeline-card]:col-start-3"
                }`}
              >
                <div
                  className={`timeline-card ml-14 rounded-sm border border-brass/25 bg-[#241810]/75 p-6 shadow-counter transition hover:-translate-y-0.5 hover:border-brass/55 md:ml-0 ${
                    index % 2 === 0 ? "md:text-right" : "md:text-left"
                  }`}
                >
                  <p className="font-serif text-3xl text-brass-light">
                    {entry.year}
                  </p>
                  <h3 className="mt-1 font-serif text-lg text-cream">
                    {entry.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-cream/65">
                    {entry.body}
                  </p>
                </div>

                <div className="absolute left-5 top-2 z-10 -translate-x-1/2 md:static md:col-start-2 md:row-start-1 md:grid md:translate-x-0 md:place-items-center">
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-brass/60 bg-espresso text-sm font-semibold text-brass shadow-brass ring-8 ring-[#2c1e16]">
                    {index + 1}
                  </span>
                </div>

                <div
                  className={`hidden md:block ${
                    index % 2 === 0 ? "md:col-start-3" : "md:col-start-1 md:row-start-1"
                  }`}
                  aria-hidden="true"
                >
                  <div className="h-px w-full bg-gradient-to-r from-brass/45 to-transparent" />
                </div>
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
