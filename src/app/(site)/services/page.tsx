import type { Metadata } from "next";
import { Phone, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ServiceCard } from "@/components/ServiceCard";
import { FilmStripDivider } from "@/components/FilmStripDivider";
import { CTAButton } from "@/components/CTAButton";
import { services } from "@/data/services";
import { businessInfo } from "@/data/businessInfo";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Photo finishing, film processing, photo restoration, custom framing, camera equipment, video transfers, passport photos, and photo gifts in Essex Junction, VT.",
  keywords: [
    "Essex Junction photo lab",
    "Vermont photo restoration",
    "custom framing Essex Junction",
    "film processing Vermont",
  ],
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What we do"
        title="Everything under one warm roof"
        tagline="Nine kinds of care for the photographs, films, and keepsakes you can't replace — each handled in the shop by someone who's done it for decades."
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      >
        <CTAButton href={`tel:${businessInfo.phoneHref}`} variant="brass" external>
          <Phone className="h-4 w-4" aria-hidden="true" />
          Call {businessInfo.phoneDisplay}
        </CTAButton>
      </PageHero>

      <FilmStripDivider />

      <section className="surface-wood-dark py-16 sm:py-20">
        <div className="shell">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>

          <div className="mt-14 rounded-xl border border-brass/30 bg-[#241810]/60 p-8 text-center">
            <h2 className="font-serif text-2xl text-cream">
              Not sure where your project fits?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-cream/70">
              Bring it in, or give Jon a call. Mystery rolls of film, cracked
              portraits, odd-shaped keepsakes — we&apos;ll figure out the best way
              to help.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <CTAButton href="/contact" variant="primary">
                Visit the shop
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </CTAButton>
              <CTAButton
                href={`tel:${businessInfo.phoneHref}`}
                variant="ghost"
                external
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call Jon
              </CTAButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
