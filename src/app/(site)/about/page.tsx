import type { Metadata } from "next";
import { ArrowRight, Heart, Eye, Hammer } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { CTAButton } from "@/components/CTAButton";
import { FilmStripDivider } from "@/components/FilmStripDivider";
import { ShopImage } from "@/components/ShopImage";
import { SectionHeader } from "@/components/SectionHeader";
import { shopTimeline } from "@/data/featuredArticle";
import { businessInfo } from "@/data/businessInfo";

export const metadata: Metadata = {
  title: "About Jon",
  description:
    "Meet Jon — for over three decades he's helped Vermont families in Essex Junction preserve photographs, restore memories, frame keepsakes, and save old films.",
  keywords: ["Jon's Darkroom", "about Jon Essex Junction", "Vermont photographer framer"],
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Meet Jon"
        title="The hands behind the counter"
        tagline="For over three decades, Jon has helped Vermont families preserve the moments that matter most — one frame, one negative, one home movie at a time."
        crumbs={[{ label: "Home", href: "/" }, { label: "About Jon" }]}
      />

      <FilmStripDivider />

      <section className="surface-paper py-16 sm:py-20">
        <div className="shell grid gap-12 lg:grid-cols-5 lg:items-start">
          <div className="lg:col-span-2">
            <div className="relative mx-auto max-w-sm">
              <span className="tape -top-4 left-10 -rotate-6" aria-hidden="true" />
              <div className="polaroid">
                <div className="aspect-[4/5]">
                  <ShopImage
                    src="/jons-assets/placeholder-jon-portrait.jpg"
                    alt="Jon at work in his Essex Junction darkroom and frameshop"
                    variant="camera"
                  />
                </div>
                <p className="absolute inset-x-0 bottom-3 text-center font-serif text-lg text-charcoal/80">
                  Jon, Pearl Street
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-5 lg:col-span-3">
            <p className="text-lg leading-relaxed text-walnut">
              From faded photographs to treasured family films, every project
              that comes across Jon&apos;s counter receives personal attention.
              It&apos;s never been about volume — it&apos;s about the single photo
              you can&apos;t replace.
            </p>
            <p className="leading-relaxed text-walnut">
              Jon opened the shop in Essex Junction more than{" "}
              {businessInfo.yearsServing} years ago, betting that a community
              would always want its memories handled by a real person. Through
              the busiest years of film, the arrival of digital, and the slow
              disappearance of one-hour labs and big-box photo counters, the door
              on Pearl Street kept opening.
            </p>
            <p className="leading-relaxed text-walnut">
              Today, the work is as much about preservation as it is about
              making new prints: restoring water-damaged portraits, transferring
              shoeboxes of VHS tapes before the magnetic tape fades, and framing
              the diplomas, jerseys, and medals that mark a family&apos;s life.
            </p>

            <div className="grid gap-4 pt-4 sm:grid-cols-3">
              {[
                { icon: Eye, label: "Real photo knowledge" },
                { icon: Hammer, label: "Local craftsmanship" },
                { icon: Heart, label: "Memories, preserved" },
              ].map((v) => (
                <div
                  key={v.label}
                  className="flex items-center gap-2.5 rounded-md border border-walnut/20 bg-cream-dark/40 px-4 py-3"
                >
                  <v.icon className="h-5 w-5 text-burgundy" aria-hidden="true" />
                  <span className="text-sm font-medium text-espresso">
                    {v.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* timeline */}
      <section className="surface-wood py-16 sm:py-20">
        <div className="shell">
          <SectionHeader
            eyebrow="The shop's story"
            title="A timeline on Pearl Street"
          />
          <ol className="mx-auto mt-12 max-w-3xl space-y-8 border-l border-brass/30 pl-6">
            {shopTimeline.map((entry) => (
              <li key={entry.year} className="relative">
                <span
                  className="absolute -left-[1.65rem] top-1.5 h-3 w-3 rounded-full border-2 border-brass bg-espresso"
                  aria-hidden="true"
                />
                <p className="font-serif text-2xl text-brass-light">
                  {entry.year}
                </p>
                <h3 className="mt-1 font-serif text-xl text-cream">
                  {entry.title}
                </h3>
                <p className="mt-2 leading-relaxed text-cream/70">
                  {entry.body}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-12 text-center">
            <CTAButton href="/contact" variant="brass">
              Come meet Jon
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </CTAButton>
          </div>
        </div>
      </section>
    </>
  );
}
