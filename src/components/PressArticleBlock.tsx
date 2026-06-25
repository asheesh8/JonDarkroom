import { ShopImage } from "./ShopImage";
import { formatDate } from "@/lib/utils";
import type { PressArticle } from "@/data/featuredArticle";

/**
 * A full press article rendered as a newspaper column block.
 * Used on /jon-in-the-press for the featured article and archive entries.
 */
export function PressArticleBlock({
  article,
  featured = false,
}: {
  article: PressArticle;
  featured?: boolean;
}) {
  return (
    <article className="card-paper grain relative overflow-hidden p-6 sm:p-9">
      <header className="border-b border-charcoal/20 pb-4">
        <p className="text-[0.65rem] uppercase tracking-[0.3em] text-burgundy">
          {article.publication} · {formatDate(article.date)}
        </p>
        <h2
          className={`mt-2 font-serif leading-tight text-charcoal ${
            featured ? "text-3xl sm:text-[2.5rem]" : "text-2xl"
          }`}
        >
          {article.headline}
        </h2>
      </header>

      {featured && (
        <div className="my-6 overflow-hidden border border-charcoal/15 bg-white p-2 shadow-inner">
          <div className="aspect-[16/9] grayscale">
            <ShopImage
              src={article.image}
              alt={article.imageAlt}
              variant="newspaper"
            />
          </div>
          <p className="px-1 py-1.5 text-xs italic text-walnut/70">
            {article.imageAlt}
          </p>
        </div>
      )}

      <p className="my-6 border-l-4 border-burgundy pl-5 font-serif text-xl italic leading-snug text-burgundy sm:text-2xl">
        {article.pullQuote}
      </p>

      <div className="columns-1 gap-8 text-[0.95rem] leading-relaxed text-walnut sm:columns-2 [&>p]:mb-4 [&>p:first-letter]:float-left [&>p:first-letter]:mr-2 [&>p:first-letter]:font-serif [&>p:first-letter]:text-5xl [&>p:first-letter]:leading-none [&>p:first-letter]:text-burgundy">
        {article.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </article>
  );
}
