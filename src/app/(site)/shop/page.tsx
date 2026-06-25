import type { Metadata } from "next";
import { Phone, ShieldCheck, Tag } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { CTAButton } from "@/components/CTAButton";
import { FilmStripDivider } from "@/components/FilmStripDivider";
import { ShopBrowser, ShopHowItWorks } from "@/components/shop/ShopBrowser";
import { TOTAL_ITEMS, lowestPrice } from "@/data/shop";
import { businessInfo } from "@/data/businessInfo";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "The Shop — Used Camera Gear for Sale",
  description:
    "Browse Jon's used photo equipment for sale in Essex Junction, VT — film & digital cameras, lenses, flashes, tripods, and more. Every piece checked and cleaned.",
  keywords: [
    "used cameras Essex Junction",
    "used camera gear Vermont",
    "buy used lenses Vermont",
    "camera equipment Essex Junction",
  ],
};

export default function ShopPage() {
  return (
    <>
      <PageHero
        eyebrow="Used Photo Equipment"
        title="The Shop"
        tagline="Jon's marketplace of checked-and-cleaned used gear — cameras, lenses, flashes, and accessories, priced to help you get into photography without breaking the bank."
        crumbs={[{ label: "Home", href: "/" }, { label: "Shop" }]}
      >
        <div className="flex flex-wrap items-center gap-6">
          <CTAButton href={`tel:${businessInfo.phoneHref}`} variant="brass" external>
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call to reserve
          </CTAButton>
          <div className="flex items-center gap-5 text-sm text-cream/70">
            <span className="flex items-center gap-1.5">
              <Tag className="h-4 w-4 text-brass" aria-hidden="true" />
              {TOTAL_ITEMS}+ items
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-brass" aria-hidden="true" />
              From {formatPrice(lowestPrice())}
            </span>
          </div>
        </div>
      </PageHero>

      {/* how it works */}
      <section className="surface-wood-dark py-12 sm:py-14">
        <div className="shell">
          <ShopHowItWorks />
          <p className="mt-6 text-center text-xs italic text-cream/45">
            Every piece has been checked and cleaned by Jon. Prices are close to
            cost and non-negotiable. New items are added as they come in.
          </p>
        </div>
      </section>

      <FilmStripDivider />

      {/* the browser */}
      <section className="surface-wood py-14 sm:py-16">
        <div className="shell">
          <ShopBrowser />
        </div>
      </section>
    </>
  );
}
