"use client";

import { useState } from "react";
import { ShopImage } from "./ShopImage";
import type { BeforeAfter } from "@/data/gallery";

/**
 * A before/after restoration comparison with a draggable slider.
 * Lightweight: a single range input drives a clip on the "after" layer.
 */
export function BeforeAfterBlock({ pair }: { pair: BeforeAfter }) {
  const [pos, setPos] = useState(50);

  return (
    <figure className="card-paper overflow-hidden">
      <div className="relative aspect-[4/3] select-none">
        {/* before (full) */}
        <div className="absolute inset-0">
          <ShopImage src={pair.before} alt={pair.beforeAlt} />
          <span className="absolute left-3 top-3 rounded bg-charcoal/70 px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-widest text-cream">
            Before
          </span>
        </div>

        {/* after (clipped) */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <ShopImage src={pair.after} alt={pair.afterAlt} />
          <span className="absolute right-3 top-3 rounded bg-burgundy/85 px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-widest text-cream">
            After
          </span>
        </div>

        {/* handle line */}
        <div
          className="pointer-events-none absolute inset-y-0 w-0.5 bg-brass shadow-[0_0_10px_rgba(176,141,87,0.8)]"
          style={{ left: `${pos}%` }}
        >
          <span className="absolute left-1/2 top-1/2 grid h-8 w-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-brass bg-espresso text-brass">
            ⇆
          </span>
        </div>

        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label={`Reveal restored version of ${pair.title}`}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
      <figcaption className="border-t border-walnut/15 p-4">
        <p className="font-serif text-lg text-espresso">{pair.title}</p>
        <p className="mt-1 text-sm text-walnut">{pair.note}</p>
      </figcaption>
    </figure>
  );
}
