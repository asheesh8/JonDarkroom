/**
 * Types + helpers for the Shop ("Used Photo Equipment For Sale").
 *
 * The item data itself is scraped from jonsdarkroom.com into
 * shopItems.generated.ts by scripts/scrape-shop-inventory.py.
 *
 * TODO: when moving to Supabase, this becomes the `shop_items` table and the
 *       generated file is replaced by a query. Keep this shape in sync.
 */

export type ShopItem = {
  id: string;
  itemNumber: string;
  name: string;
  /** numeric price in USD, or null if "call for price" */
  price: number | null;
  /** raw price text, may include notes e.g. "$75.00 or $120.00 with lens" */
  priceText: string;
  /** Jon's 1–10 condition rating, if listed */
  condition: number | null;
  description: string;
  brand: string;
  category: string;
  department: string;
  /** local image path under /public, or "" */
  image: string;
  sourceUrl: string;
};

export type ShopDepartment = {
  name: string;
  blurb: string;
  /** lucide icon name (see components/icons or inline) */
  icon: string;
};

/** Department order + copy for the walkthrough. */
export const DEPARTMENTS: ShopDepartment[] = [
  {
    name: "Film Cameras",
    blurb: "SLRs, rangefinders, and medium format — checked, cleaned, ready to shoot.",
    icon: "Camera",
  },
  {
    name: "Digital Cameras",
    blurb: "Point-and-shoots to DSLRs, tested and priced to get you shooting.",
    icon: "Aperture",
  },
  {
    name: "Lenses",
    blurb: "Primes, zooms, filters, caps and hoods for every mount on the shelf.",
    icon: "Focus",
  },
  {
    name: "Lighting & Studio",
    blurb: "Flashes, studio lighting, and backgrounds for any setup.",
    icon: "Lightbulb",
  },
  {
    name: "Accessories",
    blurb: "Tripods, bags, printers, and the odds and ends that complete a kit.",
    icon: "Backpack",
  },
];
