import type { Metadata } from "next";
import { Phone, MapPin, Navigation, Mail } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ContactCard } from "@/components/ContactCard";
import { CTAButton } from "@/components/CTAButton";
import { FilmStripDivider } from "@/components/FilmStripDivider";
import {
  businessInfo,
  fullAddress,
  directionsUrl,
  mapEmbedUrl,
} from "@/data/businessInfo";

export const metadata: Metadata = {
  title: "Contact & Visit",
  description:
    "Visit Jon's Darkroom & Frameshop at 159 Pearl Street, Essex Junction, VT. Hours, phone, directions, and a note to call ahead for specialty services.",
  keywords: [
    "Jon's Darkroom contact",
    "Essex Junction photo lab address",
    "passport photos Essex Junction",
  ],
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Visit the Shop"
        title="Come in and say hello"
        tagline={`Find us on Pearl Street in Essex Junction. ${businessInfo.specialtyNote}`}
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      >
        <div className="flex flex-wrap gap-4">
          <CTAButton
            href={`tel:${businessInfo.phoneHref}`}
            variant="brass"
            external
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call {businessInfo.phoneDisplay}
          </CTAButton>
          <CTAButton href={directionsUrl} variant="ghost" external>
            <Navigation className="h-4 w-4" aria-hidden="true" />
            Get Directions
          </CTAButton>
        </div>
      </PageHero>

      <FilmStripDivider />

      <section className="surface-wood-dark py-16 sm:py-20">
        <div className="shell grid gap-8 lg:grid-cols-2 lg:items-stretch">
          <ContactCard />

          <div className="overflow-hidden rounded-sm border border-brass/30 shadow-counter">
            <iframe
              title={`Map to ${businessInfo.name}`}
              src={mapEmbedUrl}
              className="h-full min-h-[420px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* quick contact tiles */}
        <div className="shell mt-8 grid gap-4 sm:grid-cols-3">
          <a
            href={directionsUrl}
            className="flex items-center gap-3 rounded-sm border border-brass/25 bg-[#241810]/60 p-5 transition hover:border-brass/60"
          >
            <MapPin className="h-6 w-6 text-brass" aria-hidden="true" />
            <span>
              <span className="block text-xs uppercase tracking-widest text-cream/55">
                Address
              </span>
              <span className="text-sm text-cream">{fullAddress}</span>
            </span>
          </a>
          <a
            href={`tel:${businessInfo.phoneHref}`}
            className="flex items-center gap-3 rounded-sm border border-brass/25 bg-[#241810]/60 p-5 transition hover:border-brass/60"
          >
            <Phone className="h-6 w-6 text-brass" aria-hidden="true" />
            <span>
              <span className="block text-xs uppercase tracking-widest text-cream/55">
                Phone
              </span>
              <span className="text-sm text-cream">
                {businessInfo.phoneDisplay}
              </span>
            </span>
          </a>
          <a
            href={`mailto:${businessInfo.email}`}
            className="flex items-center gap-3 rounded-sm border border-brass/25 bg-[#241810]/60 p-5 transition hover:border-brass/60"
          >
            <Mail className="h-6 w-6 text-brass" aria-hidden="true" />
            <span>
              <span className="block text-xs uppercase tracking-widest text-cream/55">
                Email
              </span>
              <span className="text-sm text-cream">{businessInfo.email}</span>
            </span>
          </a>
        </div>
      </section>
    </>
  );
}
