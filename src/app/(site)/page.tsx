import Link from "next/link";
import {
  Phone,
  MapPin,
  ArrowRight,
  Heart,
  Handshake,
  Eye,
  Hammer,
  Archive,
  Store,
} from "lucide-react";
import { CTAButton } from "@/components/CTAButton";
import { SectionHeader } from "@/components/SectionHeader";
import { FilmStripDivider } from "@/components/FilmStripDivider";
import { MemoryDesk } from "@/components/MemoryDesk";
import { ServiceCard } from "@/components/ServiceCard";
import { NewspaperFeature } from "@/components/NewspaperFeature";
import { PolaroidImageCard } from "@/components/PolaroidImageCard";
import { BlogCard } from "@/components/BlogCard";
import { ContactCard } from "@/components/ContactCard";
import { ShopImage } from "@/components/ShopImage";
import { getFeaturedServices } from "@/data/services";
import { getLatestPosts } from "@/data/blogPosts";
import { restorationExamples, framingShowcase } from "@/data/gallery";
import { businessInfo, mapEmbedUrl, directionsUrl } from "@/data/businessInfo";

export default function HomePage() {
  const featuredServices = getFeaturedServices();
  const latestPosts = getLatestPosts(3);

  return (
    <>
      {/* ---------- 1. HERO ---------- */}
      <section className="relative overflow-hidden">
        {/* warm storefront background placeholder */}
        <div className="absolute inset-0" aria-hidden="true">
          <ShopImage
            src="/jons-assets/film_d1450.jpg"
            alt=""
            variant="camera"
            className="opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-espresso/90 via-espresso/80 to-espresso" />
          <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_30%_20%,rgba(176,141,87,0.18),transparent_60%)]" />
        </div>

        <div className="shell relative grid min-h-[88vh] items-center py-20">
          <div className="max-w-3xl animate-fade-up">
            <p className="eyebrow text-brass">
              Essex Junction, Vermont · Since {2026 - businessInfo.yearsServing}
            </p>
            <h1 className="mt-4 font-serif text-5xl leading-[1.02] text-cream text-balance sm:text-6xl lg:text-7xl">
              Preserving{" "}
              <span className="text-brass-grad">Vermont&apos;s</span> Memories
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/80 sm:text-xl">
              Film processing, photo restoration, custom framing, passport
              photos, video transfers, and camera gear — all handled locally
              with care.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <CTAButton href={directionsUrl} variant="brass" size="lg" external>
                <MapPin className="h-5 w-5" aria-hidden="true" />
                Visit the Shop
              </CTAButton>
              <CTAButton
                href={`tel:${businessInfo.phoneHref}`}
                variant="primary"
                size="lg"
                external
              >
                <Phone className="h-5 w-5" aria-hidden="true" />
                Call Jon
              </CTAButton>
              <CTAButton href="/services" variant="ghost" size="lg">
                Explore Services
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </CTAButton>
            </div>
            <p className="mt-8 text-sm text-cream/55">
              {businessInfo.address.street} · {businessInfo.phoneDisplay} ·{" "}
              Mon–Fri 11–4, Sat 11–2
            </p>
          </div>
        </div>
      </section>

      <FilmStripDivider label="Jon's Darkroom & Frameshop" />

      {/* ---------- 2. MEMORY DESK ---------- */}
      <section className="surface-wood-dark py-20 sm:py-24">
        <div className="shell">
          <SectionHeader
            eyebrow="The Memory Desk"
            title="Step up to Jon's workbench"
            description="Everything that comes across this counter is someone's memory. Pick up an object below to find the part of the shop that can help."
          />
          <div className="mt-12">
            <MemoryDesk />
          </div>
        </div>
      </section>

      {/* ---------- 3. SERVICES ---------- */}
      <section id="services" className="surface-paper py-20 sm:py-24">
        <div className="shell">
          <SectionHeader
            tone="cream"
            eyebrow="What we do"
            title="Services, mounted on the wall"
            description="Seven kinds of care for the things you can't replace. Each one done by hand, in the shop, by someone who's done it for decades."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredServices.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
            {/* "all services" plaque-style link as last cell */}
            <Link
              href="/services"
              className="group flex min-h-[180px] flex-col items-center justify-center rounded-md border-2 border-dashed border-walnut/40 p-6 text-center transition hover:border-burgundy hover:bg-burgundy/5"
            >
              <span className="font-serif text-xl text-espresso">
                See all services
              </span>
              <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-burgundy transition group-hover:gap-2.5">
                Browse the shop <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- 4. FEATURED IN LOCAL PRESS ---------- */}
      <section className="surface-wood py-20 sm:py-24">
        <div className="shell">
          <SectionHeader
            eyebrow="Featured in the Local Press"
            title="Recognized by the community we serve"
            description="Jon's work and long-time service to the Essex Junction community have been recognized locally. For decades, Jon's Darkroom has helped families preserve photos, restore memories, frame meaningful pieces, and keep old media alive."
          />
          <div className="mt-12">
            <NewspaperFeature />
          </div>
        </div>
      </section>

      <FilmStripDivider />

      {/* ---------- 5. WHY LOCALS TRUST JON ---------- */}
      <section className="surface-wood-dark py-20 sm:py-24">
        <div className="shell">
          <SectionHeader
            eyebrow="Why locals trust Jon"
            title="Not a big-box experience"
            description="The kind of place where a person — not a kiosk — looks at your photograph and understands what it means."
          />
          <ul className="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Archive, title: `${businessInfo.yearsServing}+ years serving Essex Junction`, body: "A neighborhood fixture on Pearl Street through the entire film era and beyond." },
              { icon: Handshake, title: "One-on-one service", body: "You talk to the person doing the work — every time, on every project." },
              { icon: Eye, title: "Real photo knowledge", body: "Decades of seeing when a color's off or a face needs help, and fixing it." },
              { icon: Hammer, title: "Local craftsmanship", body: "Frames built, photos restored, and tapes transferred right here in the shop." },
              { icon: Heart, title: "Preserving family memories", body: "We treat the only photo of someone like the irreplaceable thing it is." },
              { icon: Store, title: "A real local shop", body: "Walk in with a shoebox, a mystery roll, or a cracked portrait — we'll help." },
            ].map((item) => (
              <li
                key={item.title}
                className="rounded-lg border border-brass/25 bg-[#241810]/60 p-6"
              >
                <span className="grid h-11 w-11 place-items-center rounded-md border border-brass/40 bg-espresso text-brass">
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-serif text-lg text-cream">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/65">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- 6. BEFORE / AFTER RESTORATION ---------- */}
      <section className="surface-paper py-20 sm:py-24">
        <div className="shell grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader
              tone="cream"
              align="left"
              eyebrow="Photo Restoration"
              title="Bring the faces back"
              description="Cracks, fading, water damage, missing corners — gently repaired by hand and reprinted. A few examples of the kind of photographs we help save."
            />
            <div className="mt-7">
              <CTAButton href="/services/photo-restoration" variant="paper">
                About photo restoration
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </CTAButton>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5 sm:gap-6">
            {restorationExamples.map((ex, i) => (
              <PolaroidImageCard
                key={ex.id}
                src={ex.src}
                alt={ex.alt}
                caption={ex.caption}
                tilt={[-2.5, 1.5, 2, -1.5][i % 4]}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ---------- 7. CUSTOM FRAMING SHOWCASE ---------- */}
      <section className="surface-wood py-20 sm:py-24">
        <div className="shell">
          <SectionHeader
            eyebrow="Custom Framing"
            title="Framed to last a lifetime"
            description="From a child's artwork to a veteran's medals — built by hand with acid-free mats and UV glass."
          />
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {framingShowcase.map((piece, i) => (
              <div key={piece.id} className="text-center">
                <PolaroidImageCard
                  src={piece.image}
                  alt={piece.alt}
                  caption={piece.title}
                  variant="frame"
                  tilt={[-2, 1.5, -1.5][i % 3]}
                />
                <p className="mt-4 text-sm text-cream/60">{piece.material}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <CTAButton href="/services/custom-framing" variant="brass">
              Explore custom framing
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </CTAButton>
          </div>
        </div>
      </section>

      <FilmStripDivider />

      {/* ---------- 8. MEET JON ---------- */}
      <section className="surface-wood-dark py-20 sm:py-24">
        <div className="shell grid items-center gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="relative mx-auto max-w-sm">
              <span className="tape -top-4 left-1/2 -translate-x-1/2" aria-hidden="true" />
              <div className="polaroid">
                <div className="aspect-[4/5]">
                  <ShopImage
                    src="/jons-assets/Jons-Headshot_d400.jpg"
                    alt="Jon Long, owner of Jon's Darkroom & Frameshop"
                    variant="camera"
                  />
                </div>
                <p className="absolute inset-x-0 bottom-3 text-center font-serif text-lg text-charcoal/80">
                  Jon — behind the counter
                </p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-3">
            <SectionHeader
              align="left"
              eyebrow="Meet Jon"
              title="Three decades of personal attention"
            />
            <p className="mt-5 text-lg leading-relaxed text-cream/80">
              For over three decades, Jon has helped Vermont families preserve
              the moments that matter most. From faded photographs to treasured
              family films, every project receives personal attention.
            </p>
            <p className="mt-4 leading-relaxed text-cream/65">
              It&apos;s never been about volume. It&apos;s about the single photo
              you can&apos;t replace, the medal that deserves a proper frame, and
              the home movies that need saving before the tape gives out.
            </p>
            <div className="mt-7 flex flex-wrap gap-4">
              <CTAButton href="/about" variant="ghost">
                Read Jon&apos;s story
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </CTAButton>
              <CTAButton href="/contact" variant="primary">
                Visit the shop
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- 9. STORIES FROM THE DARKROOM ---------- */}
      <section className="surface-paper py-20 sm:py-24">
        <div className="shell">
          <SectionHeader
            tone="cream"
            eyebrow="Stories From The Darkroom"
            title="Notes from the shop"
            description="Practical tips and local stories — on preserving photos, processing film, framing what matters, and keeping memories alive."
          />
          <div className="mt-12 grid gap-7 md:grid-cols-3">
            {latestPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <CTAButton href="/stories" variant="paper">
              Read all stories
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </CTAButton>
          </div>
        </div>
      </section>

      {/* ---------- 10. VISIT THE SHOP ---------- */}
      <section className="surface-wood py-20 sm:py-24">
        <div className="shell">
          <SectionHeader
            eyebrow="Visit the Shop"
            title="Come in and say hello"
            description="Find us on Pearl Street in Essex Junction. Free parking, friendly help, and someone who actually knows photos."
          />
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <ContactCard />
            <div className="overflow-hidden rounded-lg border border-brass/30 shadow-counter">
              <iframe
                title={`Map to ${businessInfo.name}`}
                src={mapEmbedUrl}
                className="h-full min-h-[360px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
