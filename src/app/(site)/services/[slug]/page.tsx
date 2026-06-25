import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Phone, ArrowRight, Check, MapPin } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { CTAButton } from "@/components/CTAButton";
import { FilmStripDivider } from "@/components/FilmStripDivider";
import { ServiceIcon } from "@/components/icons";
import { InventoryShowcase } from "@/components/InventoryShowcase";
import { PolaroidImageCard } from "@/components/PolaroidImageCard";
import { ContactCard } from "@/components/ContactCard";
import { ShopImage } from "@/components/ShopImage";
import { services, getService, allServiceSlugs } from "@/data/services";
import { restorationExamples } from "@/data/gallery";
import { businessInfo } from "@/data/businessInfo";

export function generateStaticParams() {
  return allServiceSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const service = getService(params.slug);
  if (!service) return { title: "Service not found" };
  return {
    title: service.seo.title,
    description: service.seo.description,
    keywords: service.seo.keywords,
  };
}

export default function ServiceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const service = getService(params.slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={service.tagline}
        title={service.title}
        tagline={service.intro}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
      >
        <div className="flex flex-wrap items-center gap-4">
          <CTAButton href="/contact" variant="brass">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            Visit the shop
          </CTAButton>
          <CTAButton
            href={`tel:${businessInfo.phoneHref}`}
            variant="ghost"
            external
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {businessInfo.phoneDisplay}
          </CTAButton>
        </div>
        <p className="mt-6 flex items-center gap-2 text-sm italic text-cream/55">
          <ServiceIcon name={service.icon} className="h-4 w-4 text-brass" />
          {service.vibe}
        </p>
      </PageHero>

      {/* real reference photo band */}
      <section className="surface-wood-dark py-10">
        <div className="shell">
          <div className="mx-auto max-w-4xl overflow-hidden rounded-lg border border-brass/30 shadow-counter">
            <div className="aspect-[16/8]">
              <ShopImage
                src={service.image}
                alt={`${service.title} at Jon's Darkroom & Frameshop`}
                variant="camera"
              />
            </div>
          </div>
        </div>
      </section>

      <FilmStripDivider />

      {/* main content + highlights rail */}
      <section className="surface-paper py-16 sm:py-20">
        <div className="shell grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="space-y-10">
              {service.sections.map((sec) => (
                <div key={sec.heading}>
                  <h2 className="font-serif text-2xl text-espresso sm:text-3xl">
                    {sec.heading}
                  </h2>
                  <div className="mt-3 h-px w-16 hairline-brass" />
                  <p className="mt-4 text-lg leading-relaxed text-walnut">
                    {sec.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* highlights plaque */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="card-paper p-6">
                <div className="mb-4 grid h-12 w-12 place-items-center rounded-md border border-walnut/30 bg-cream-dark text-burgundy">
                  <ServiceIcon name={service.icon} className="h-6 w-6" />
                </div>
                <h3 className="font-serif text-xl text-espresso">
                  What you get
                </h3>
                <ul className="mt-4 space-y-3">
                  {service.highlights.map((h) => (
                    <li key={h} className="flex gap-2.5 text-sm text-walnut">
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-burgundy"
                        aria-hidden="true"
                      />
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 border-t border-walnut/15 pt-5">
                  <p className="text-xs italic text-walnut/80">
                    {businessInfo.specialtyNote}
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* service-specific feature blocks */}
      {service.slug === "camera-equipment" && (
        <section className="surface-wood py-16 sm:py-20">
          <div className="shell">
            <p className="eyebrow text-brass">From the display case</p>
            <h2 className="mt-2 font-serif text-3xl text-cream sm:text-4xl">
              In the shop right now
            </h2>
            <p className="mt-3 max-w-2xl text-cream/70">
              A rotating selection of film and digital gear. Tap any item for
              details, condition, and price — then call to confirm it&apos;s
              still on the shelf.
            </p>
            <div className="mt-10">
              <InventoryShowcase />
            </div>
          </div>
        </section>
      )}

      {service.slug === "photo-restoration" && (
        <section className="surface-wood py-16 sm:py-20">
          <div className="shell">
            <p className="eyebrow text-brass">Restoration examples</p>
            <h2 className="mt-2 font-serif text-3xl text-cream sm:text-4xl">
              The kind of photographs we help save
            </h2>
            <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {restorationExamples.map((ex, i) => (
                <PolaroidImageCard
                  key={ex.id}
                  src={ex.src}
                  alt={ex.alt}
                  caption={ex.caption}
                  tilt={[-2.5, 1.5, -1.5, 2][i % 4]}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA + contact */}
      <section className="surface-wood-dark py-16 sm:py-20">
        <div className="shell grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-serif text-3xl text-cream sm:text-4xl">
              Ready when you are
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-cream/75">
              Stop by the shop on Pearl Street, or give Jon a call to talk
              through your {service.title.toLowerCase()} project before you come
              in.
            </p>
            <div className="mt-7 flex flex-wrap gap-4">
              <CTAButton
                href={`tel:${businessInfo.phoneHref}`}
                variant="brass"
                external
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call Jon
              </CTAButton>
              <CTAButton href="/contact" variant="ghost">
                Get directions
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </CTAButton>
            </div>
          </div>
          <ContactCard />
        </div>
      </section>

      {/* explore other services */}
      <section className="surface-paper py-16">
        <div className="shell">
          <h2 className="text-center font-serif text-2xl text-espresso">
            More from the shop
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {others.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group flex items-center gap-3 rounded-lg border border-walnut/20 bg-cream-dark/40 p-4 transition hover:border-burgundy hover:bg-cream-dark"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-walnut/30 text-burgundy">
                  <ServiceIcon name={s.icon} className="h-5 w-5" />
                </span>
                <span className="font-serif text-lg text-espresso">
                  {s.title}
                </span>
                <ArrowRight className="ml-auto h-4 w-4 text-burgundy transition group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
