import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ShopImage } from "./ShopImage";
import { CTAButton } from "./CTAButton";
import { featuredArticle } from "@/data/featuredArticle";
import { formatDate } from "@/lib/utils";

/**
 * Homepage "Featured in the Local Press" — a scanned newspaper clipping resting
 * on the wooden counter, slightly rotated and taped at the corner.
 */
export function NewspaperFeature() {
  const a = featuredArticle;
  return (
    <div className="relative mx-auto max-w-4xl">
      {/* the clipping */}
      <div className="relative -rotate-1 transition-transform duration-500 hover:rotate-0">
        <span className="tape -top-4 left-10 -rotate-6" aria-hidden="true" />
        <span className="tape -top-4 right-10 rotate-6" aria-hidden="true" />

        <article className="card-paper grain relative overflow-hidden p-6 sm:p-9">
          {/* masthead */}
          <div className="border-b-2 border-charcoal/80 pb-3 text-center">
            <p className="font-serif text-2xl tracking-wide text-charcoal sm:text-3xl">
              {a.publication}
            </p>
            <p className="mt-1 text-[0.65rem] uppercase tracking-[0.35em] text-walnut/70">
              Local Press · {formatDate(a.date)}
            </p>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-5">
            <div className="sm:col-span-3">
              <h3 className="font-serif text-2xl leading-tight text-charcoal sm:text-[1.75rem]">
                {a.headline}
              </h3>
              <p className="mt-4 border-l-2 border-burgundy pl-4 font-serif text-lg italic leading-snug text-burgundy">
                {a.pullQuote}
              </p>
              <p className="mt-4 columns-1 text-sm leading-relaxed text-walnut sm:columns-2 sm:gap-5">
                {a.body[0]} {a.body[1]}
              </p>
            </div>
            <div className="sm:col-span-2">
              <div className="overflow-hidden border border-charcoal/15 bg-white p-1.5 shadow-inner">
                <div className="aspect-[4/5] grayscale">
                  <ShopImage src={a.image} alt={a.imageAlt} variant="newspaper" />
                </div>
                <p className="px-1 py-1.5 text-[0.65rem] italic text-walnut/70">
                  {a.imageAlt}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-4 border-t border-walnut/20 pt-5">
            <CTAButton href="/jon-in-the-press" variant="primary" size="sm">
              Read Jon&apos;s Story
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </CTAButton>
            <Link
              href="/jon-in-the-press"
              className="text-sm font-medium text-walnut underline-offset-4 hover:text-burgundy hover:underline"
            >
              See the full press archive
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
