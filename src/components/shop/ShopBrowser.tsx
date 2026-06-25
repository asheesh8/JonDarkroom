"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Search,
  X,
  Phone,
  MapPin,
  Tag,
  ShieldCheck,
  Hash,
  ArrowRight,
} from "lucide-react";
import { ShopImage } from "@/components/ShopImage";
import { cn, formatPrice } from "@/lib/utils";
import { businessInfo } from "@/data/businessInfo";
import {
  shopItems,
  activeDepartments,
  categoriesIn,
  countIn,
  type ShopItem,
} from "@/data/shop";

const ALL = "All";

export function ShopBrowser() {
  const depts = useMemo(() => activeDepartments(), []);
  const [dept, setDept] = useState(depts[0]?.name ?? "");
  const [category, setCategory] = useState(ALL);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<ShopItem | null>(null);

  const cats = useMemo(() => [ALL, ...categoriesIn(dept)], [dept]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q) {
      // global search across everything
      return shopItems.filter((i) =>
        [i.name, i.itemNumber, i.brand, i.category, i.description]
          .join(" ")
          .toLowerCase()
          .includes(q),
      );
    }
    return shopItems.filter(
      (i) => i.department === dept && (category === ALL || i.category === category),
    );
  }, [query, dept, category]);

  return (
    <div>
      {/* search */}
      <div className="relative mx-auto mb-8 max-w-xl">
        <Search
          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-brass/70"
          aria-hidden="true"
        />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search the whole shop — “AE-1”, “50mm”, “tripod”…"
          className="w-full rounded-sm border border-brass/30 bg-[#241810]/70 py-3.5 pl-12 pr-12 text-cream placeholder:text-cream/35 focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-sm text-cream/60 hover:bg-white/10 hover:text-cream"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* department tabs (hidden while searching) */}
      {!query && (
        <>
          <div className="mb-6 flex flex-wrap justify-center gap-2.5">
            {depts.map((d) => {
              const on = d.name === dept;
              return (
                <button
                  key={d.name}
                  onClick={() => {
                    setDept(d.name);
                    setCategory(ALL);
                  }}
                  className={cn(
                    "group rounded-sm border px-5 py-2.5 text-sm font-medium transition-all",
                    on
                      ? "border-brass bg-gradient-to-b from-brass-light to-brass-dark text-espresso shadow-brass"
                      : "border-brass/30 text-cream/75 hover:border-brass/60 hover:text-cream",
                  )}
                >
                  {d.name}
                  <span
                    className={cn(
                      "ml-2 rounded-sm px-1.5 py-0.5 text-[0.65rem]",
                      on ? "bg-espresso/25 text-espresso" : "bg-white/10 text-cream/60",
                    )}
                  >
                    {countIn(d.name)}
                  </span>
                </button>
              );
            })}
          </div>

          {/* department blurb */}
          <p className="mx-auto mb-7 max-w-xl text-center text-sm italic text-cream/55">
            {depts.find((d) => d.name === dept)?.blurb}
          </p>

          {/* category chips */}
          <div className="mb-9 flex flex-wrap justify-center gap-2">
            {cats.map((c) => {
              const on = c === category;
              return (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={cn(
                    "rounded-sm border px-3.5 py-1.5 text-xs transition",
                    on
                      ? "border-burgundy bg-burgundy text-cream"
                      : "border-cream/20 text-cream/60 hover:border-brass/50 hover:text-cream",
                  )}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </>
      )}

      {query && (
        <p className="mb-6 text-center text-sm text-cream/60">
          {results.length} {results.length === 1 ? "result" : "results"} for
          <span className="text-brass"> “{query}”</span>
        </p>
      )}

      {/* grid */}
      {results.length === 0 ? (
        <p className="py-16 text-center text-cream/55">
          Nothing here right now — new gear comes in often. Try another search or
          give Jon a call.
        </p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((item) => (
            <ShopCard key={item.id} item={item} onOpen={() => setActive(item)} />
          ))}
        </div>
      )}

      {active && <ShopDetail item={active} onClose={() => setActive(null)} />}
    </div>
  );
}

/* ---------------- card ---------------- */
function ShopCard({ item, onOpen }: { item: ShopItem; onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      className="group relative flex flex-col overflow-hidden rounded-sm border border-brass/25 bg-[#241810] text-left shadow-counter transition-all duration-300 hover:-translate-y-1.5 hover:border-brass/70"
    >
      <div className="relative aspect-square overflow-hidden bg-[#1d130d]">
        <ShopImage src={item.image} alt={item.name} variant="camera" />
        {typeof item.price === "number" && item.price > 0 && (
          <span className="absolute right-3 top-3 rounded-sm border border-brass-dark bg-gradient-to-b from-brass-light to-brass-dark px-3 py-1 font-serif text-sm font-semibold text-espresso shadow">
            {formatPrice(item.price)}
          </span>
        )}
        {item.condition != null && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-sm bg-espresso/85 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-wide text-brass-light">
            <ShieldCheck className="h-3 w-3" aria-hidden="true" />
            {item.condition}/10
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <span className="text-[0.62rem] uppercase tracking-[0.2em] text-brass/80">
          {item.brand !== "Various" ? item.brand + " · " : ""}
          {item.category}
        </span>
        <h3 className="mt-1 line-clamp-2 font-serif text-base leading-snug text-cream">
          {item.name}
        </h3>
        <span className="mt-auto pt-3 inline-flex items-center gap-1.5 text-xs font-medium text-brass transition group-hover:gap-2.5">
          <Tag className="h-3.5 w-3.5" aria-hidden="true" /> Details
        </span>
      </div>
    </button>
  );
}

/* ---------------- detail modal ---------------- */
function ShopDetail({ item, onClose }: { item: ShopItem; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const itemNo = item.itemNumber.replace(/^items?\s*/i, "");

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-film/80 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={item.name}
      onClick={onClose}
    >
      <div
        className="relative my-8 w-full max-w-3xl overflow-hidden rounded-sm border border-brass/40 bg-[#241810] shadow-counter"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-20 grid h-9 w-9 place-items-center rounded-full border border-brass/40 bg-espresso/80 text-cream hover:bg-espresso"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid md:grid-cols-2">
          <div className="relative aspect-square overflow-hidden bg-[#1d130d] md:aspect-auto">
            <ShopImage src={item.image} alt={item.name} variant="camera" />
          </div>

          <div className="p-6 sm:p-8">
            <span className="text-[0.7rem] uppercase tracking-[0.25em] text-brass">
              {item.brand !== "Various" ? item.brand + " · " : ""}
              {item.category}
            </span>
            <h2 className="mt-1 font-serif text-2xl text-cream sm:text-3xl">
              {item.name}
            </h2>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              {typeof item.price === "number" && item.price > 0 ? (
                <span className="font-serif text-3xl text-brass-light">
                  {formatPrice(item.price)}
                </span>
              ) : (
                <span className="font-serif text-2xl text-brass-light">
                  Call for price
                </span>
              )}
              {item.condition != null && (
                <span className="inline-flex items-center gap-1.5 rounded-sm bg-[#3a5a40]/40 px-3 py-1 text-xs font-medium text-cream">
                  <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                  Condition {item.condition}/10
                </span>
              )}
            </div>

            {item.priceText && item.priceText !== `$${item.price}` && (
              <p className="mt-2 text-sm text-cream/60">{item.priceText}</p>
            )}

            <div className="my-4 hairline-brass" />

            {item.description && (
              <p className="text-sm leading-relaxed text-cream/75">
                {item.description}
              </p>
            )}

            <div className="mt-5 inline-flex items-center gap-2 rounded-sm border border-brass/30 bg-espresso/50 px-3.5 py-1.5 text-sm text-cream">
              <Hash className="h-4 w-4 text-brass" aria-hidden="true" />
              Item <span className="font-semibold text-brass-light">{itemNo}</span>
            </div>

            <div className="mt-6 rounded-sm border border-brass/20 bg-espresso/40 p-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-brass">
                How to buy
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-cream/70">
                Note the item number above, then call or stop by — Jon will have
                it ready for pickup the same or next business day. Payment at
                pickup.
              </p>
              <div className="mt-3 flex flex-wrap gap-2.5">
                <a
                  href={`tel:${businessInfo.phoneHref}`}
                  className="btn-reset rounded-sm bg-gradient-to-b from-brass-light to-brass-dark px-4 py-2 text-sm font-medium text-espresso shadow-brass"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  Call to reserve
                </a>
                <a
                  href="/contact"
                  className="btn-reset rounded-sm border border-brass/40 px-4 py-2 text-sm text-cream hover:bg-brass/10"
                >
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  Visit the shop
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- the 3-step walkthrough strip ---------------- */
export function ShopHowItWorks() {
  const steps = [
    { icon: Search, t: "Browse the shelves", d: "Pick a department, filter by category, or search the whole shop." },
    { icon: Hash, t: "Note the item number", d: "Each listing has an item #. Jot it down with the price." },
    { icon: ArrowRight, t: "Call or visit to pick up", d: "Jon readies it for same/next-day pickup. Pay when you collect it." },
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {steps.map((s, i) => (
        <div
          key={s.t}
          className="relative rounded-sm border border-brass/20 bg-[#241810]/60 p-5"
        >
          <span className="absolute right-4 top-3 font-serif text-3xl text-brass/25">
            {i + 1}
          </span>
          <span className="grid h-11 w-11 place-items-center rounded-sm border border-brass/40 bg-espresso text-brass">
            <s.icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <h3 className="mt-3 font-serif text-lg text-cream">{s.t}</h3>
          <p className="mt-1 text-sm leading-relaxed text-cream/65">{s.d}</p>
        </div>
      ))}
    </div>
  );
}
