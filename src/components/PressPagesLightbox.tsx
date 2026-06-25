"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { ShopImage } from "@/components/ShopImage";

type PressPage = {
  src: string;
  alt: string;
};

export function PressPagesLightbox({ pages }: { pages: PressPage[] }) {
  const [active, setActive] = useState<number | null>(null);
  const current = active === null ? null : pages[active];

  useEffect(() => {
    if (active === null) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowLeft") {
        setActive((value) =>
          value === null ? value : (value - 1 + pages.length) % pages.length,
        );
      }
      if (event.key === "ArrowRight") {
        setActive((value) => (value === null ? value : (value + 1) % pages.length));
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [active, pages.length]);

  function previous() {
    setActive((value) =>
      value === null ? value : (value - 1 + pages.length) % pages.length,
    );
  }

  function next() {
    setActive((value) => (value === null ? value : (value + 1) % pages.length));
  }

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-3">
        {pages.map((pg, i) => (
          <button
            key={pg.src}
            type="button"
            onClick={() => setActive(i)}
            className="group overflow-hidden rounded-2xl border border-brass/30 bg-white p-1.5 text-left shadow-counter transition hover:-translate-y-1 hover:border-brass"
          >
            <span className="relative block aspect-[3/4] overflow-hidden">
              <ShopImage src={pg.src} alt={pg.alt} variant="newspaper" />
              <span className="absolute inset-0 grid place-items-center bg-espresso/0 transition group-hover:bg-espresso/35">
                <span className="inline-flex items-center gap-2 rounded-full bg-cream px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-espresso opacity-0 shadow-counter transition group-hover:opacity-100">
                  <Expand className="h-4 w-4" aria-hidden="true" />
                  Open page
                </span>
              </span>
            </span>
            <span className="block px-1 py-2 text-center text-xs italic text-walnut/70">
              Page {i + 1}
            </span>
          </button>
        ))}
      </div>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Newspaper article page viewer"
          className="fixed inset-0 z-[300] bg-espresso/90 px-4 py-5 backdrop-blur-sm sm:px-8"
        >
          <button
            type="button"
            onClick={() => setActive(null)}
            aria-label="Close article viewer"
            className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-brass/40 bg-espresso text-cream shadow-counter transition hover:bg-burgundy"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>

          <div className="mx-auto flex h-full max-w-5xl flex-col">
            <div className="mb-4 pr-14">
              <p className="eyebrow text-brass">Business People-Vermont</p>
              <h2 className="mt-1 font-serif text-2xl text-cream sm:text-3xl">
                Well Developed
              </h2>
              <p className="mt-1 text-sm text-cream/60">
                Page {(active ?? 0) + 1} of {pages.length}
              </p>
            </div>

            <div className="min-h-0 flex-1 overflow-auto rounded-2xl border border-brass/25 bg-[#f7f1e7] p-3 shadow-counter sm:p-5">
              <div className="mx-auto max-w-3xl">
                <ShopImage
                  src={current.src}
                  alt={current.alt}
                  variant="newspaper"
                  className="h-auto w-full object-contain"
                />
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={previous}
                className="btn-reset rounded-full border border-brass/40 px-4 py-2 text-sm text-cream transition hover:bg-brass/10"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                Previous
              </button>
              <button
                type="button"
                onClick={next}
                className="btn-reset rounded-full border border-brass/40 px-4 py-2 text-sm text-cream transition hover:bg-brass/10"
              >
                Next
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
