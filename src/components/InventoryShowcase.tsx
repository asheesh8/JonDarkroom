"use client";

import { useEffect, useState } from "react";
import { X, Tag } from "lucide-react";
import { ShopImage } from "./ShopImage";
import { CTAButton } from "./CTAButton";
import { formatPrice, cn } from "@/lib/utils";
import {
  inventory as defaultInventory,
  statusLabels,
  type InventoryItem,
} from "@/data/gallery";

const statusStyles: Record<string, string> = {
  available: "bg-[#3a5a40]/80 text-cream border-[#588157]/60",
  "on-hold": "bg-brass-dark/80 text-espresso border-brass/60",
  sold: "bg-charcoal/80 text-cream/70 border-cream/20",
};

/**
 * The camera-equipment "display case": a grid of polished retro cards.
 * Clicking a card opens a detailed item card (a museum-label-meets-price-tag
 * layout). This detail card is the template Jon edits in the admin to add
 * inventory, set pricing, and write descriptions.
 */
export function InventoryShowcase({
  items = defaultInventory,
}: {
  items?: InventoryItem[];
}) {
  const [active, setActive] = useState<InventoryItem | null>(null);

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <InventoryCard
            key={item.id}
            item={item}
            onOpen={() => setActive(item)}
          />
        ))}
      </div>

      {active && (
        <InventoryDetail item={active} onClose={() => setActive(null)} />
      )}
    </>
  );
}

/* ---- the case card ---- */
function InventoryCard({
  item,
  onOpen,
}: {
  item: InventoryItem;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative flex flex-col overflow-hidden rounded-lg border border-brass/30 bg-[#241810] text-left shadow-counter transition-all duration-300 hover:-translate-y-1 hover:border-brass/70"
    >
      {/* notched ticket edge along the top */}
      <NotchStrip />

      <div className="relative aspect-[4/3] overflow-hidden bg-espresso">
        <ShopImage src={item.image} alt={item.alt} variant="camera" />
        {/* starburst price tag */}
        <PriceBurst price={item.price} />
        <span
          className={cn(
            "absolute left-3 top-3 rounded border px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-widest",
            statusStyles[item.status],
          )}
        >
          {statusLabels[item.status]}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[0.65rem] uppercase tracking-[0.2em] text-brass/80">
            {item.brand} · {item.era}
          </span>
          <span className="text-[0.65rem] uppercase tracking-widest text-cream/50">
            {item.condition}
          </span>
        </div>
        <h3 className="mt-1 font-serif text-lg text-cream">{item.name}</h3>
        <p className="mt-1 flex-1 text-sm leading-relaxed text-cream/65">
          {item.blurb}
        </p>
        <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brass transition group-hover:gap-2.5">
          <Tag className="h-4 w-4" aria-hidden="true" />
          View details
        </span>
      </div>
    </button>
  );
}

/* ---- the detail modal (admin template) ---- */
function InventoryDetail({
  item,
  onClose,
}: {
  item: InventoryItem;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-film/80 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`${item.name} details`}
      onClick={onClose}
    >
      <div
        className="relative my-8 w-full max-w-3xl overflow-hidden rounded-xl border border-brass/40 bg-[#241810] shadow-counter"
        onClick={(e) => e.stopPropagation()}
      >
        <NotchStrip />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-4 z-20 grid h-9 w-9 place-items-center rounded-full border border-brass/40 bg-espresso/80 text-cream hover:bg-espresso"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid md:grid-cols-2">
          {/* image side */}
          <div className="relative aspect-square overflow-hidden bg-espresso md:aspect-auto">
            <ShopImage src={item.image} alt={item.alt} variant="camera" />
            <PriceBurst price={item.price} large />
          </div>

          {/* info side */}
          <div className="p-6 sm:p-8">
            <span
              className={cn(
                "inline-block rounded border px-2.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-widest",
                statusStyles[item.status],
              )}
            >
              {statusLabels[item.status]}
            </span>
            <p className="mt-3 text-[0.7rem] uppercase tracking-[0.25em] text-brass">
              {item.category} · {item.brand} · {item.era}
            </p>
            <h2 className="mt-1 font-serif text-3xl text-cream">{item.name}</h2>

            <div className="my-4 hairline-brass" />

            <p className="text-sm leading-relaxed text-cream/75">
              {item.description}
            </p>

            <dl className="mt-5 space-y-0 overflow-hidden rounded-md border border-brass/20">
              {item.specs.map((s, i) => (
                <div
                  key={s.label}
                  className={cn(
                    "flex items-center justify-between px-4 py-2 text-sm",
                    i % 2 === 0 ? "bg-espresso/40" : "bg-transparent",
                  )}
                >
                  <dt className="text-cream/55">{s.label}</dt>
                  <dd className="font-medium text-cream">{s.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <CTAButton href="/contact" variant="brass" size="sm">
                Ask about this item
              </CTAButton>
              <span className="font-serif text-2xl text-brass-light">
                {formatPrice(item.price)}
              </span>
            </div>
            <p className="mt-3 text-xs italic text-cream/45">
              Inventory changes often — please call to confirm availability
              before visiting.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---- decorative bits (the "spiky" retro flavor) ---- */
function NotchStrip() {
  return (
    <div
      aria-hidden="true"
      className="h-2 w-full bg-brass"
      style={{
        WebkitMaskImage:
          "radial-gradient(circle 5px at 10px 0, transparent 5px, #000 5px)",
        WebkitMaskSize: "20px 8px",
        maskImage:
          "radial-gradient(circle 5px at 10px 0, transparent 5px, #000 5px)",
        maskSize: "20px 8px",
      }}
    />
  );
}

function PriceBurst({
  price,
  large = false,
}: {
  price: number;
  large?: boolean;
}) {
  return (
    <div
      className={cn(
        "absolute z-10 grid place-items-center text-espresso",
        large ? "right-4 top-4 h-24 w-24" : "right-3 bottom-3 h-16 w-16",
      )}
      aria-hidden="true"
    >
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full drop-shadow">
        <polygon
          points="50,2 61,16 78,9 78,27 95,33 84,48 95,63 78,69 78,87 61,80 50,94 39,80 22,87 22,69 5,63 16,48 5,33 22,27 22,9 39,16"
          className="fill-brass-light stroke-brass-dark"
          strokeWidth="2"
        />
      </svg>
      <span
        className={cn(
          "relative font-serif font-semibold leading-none",
          large ? "text-lg" : "text-sm",
        )}
      >
        {formatPrice(price)}
      </span>
    </div>
  );
}
