import { Star, Quote, ExternalLink } from "lucide-react";
import { googleReviews, googleReviewSummary } from "@/data/reviews";

export function GoogleReviews() {
  return (
    <section className="surface-paper py-20 sm:py-24">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="eyebrow text-burgundy">Google reviews</p>
            <h2 className="mt-3 text-3xl leading-tight text-espresso sm:text-4xl lg:text-[2.75rem]">
              Kind words from the counter
            </h2>
            <div className="mt-4 h-px w-24 hairline-brass" />
            <p className="mt-5 text-lg leading-relaxed text-walnut">
              Customers come in with artwork, family photos, odd-sized prints,
              film, and last-minute gifts. The common thread: Jon takes the time
              to help the piece look right.
            </p>
            <div className="mt-7 inline-flex items-center gap-4 rounded-2xl border border-walnut/15 bg-white/55 px-5 py-4 shadow-counter">
              <div>
                <p className="font-serif text-4xl leading-none text-burgundy">
                  {googleReviewSummary.rating}
                </p>
                <div className="mt-1 flex text-brass-dark" aria-label="4.1 star rating">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-current"
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>
              <p className="max-w-36 text-sm leading-snug text-walnut/75">
                {googleReviewSummary.count} {googleReviewSummary.source}
              </p>
            </div>
            <a
              href="https://www.google.com/search?q=Jon%27s+Darkroom+%26+Frameshop+reviews"
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-burgundy hover:underline"
            >
              View Google reviews
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {googleReviews.map((review) => (
              <figure
                key={`${review.author}-${review.topic}`}
                className="card-paper relative overflow-hidden p-5"
              >
                <Quote className="absolute right-4 top-4 h-8 w-8 text-burgundy/15" />
                <div className="mb-4 flex items-center gap-1 text-brass-dark">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <blockquote className="relative text-sm leading-relaxed text-walnut">
                  "{review.text}"
                </blockquote>
                <figcaption className="mt-5 border-t border-walnut/15 pt-3">
                  <p className="font-serif text-lg leading-tight text-espresso">
                    {review.author}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-burgundy/80">
                    {review.topic} · {review.age}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
