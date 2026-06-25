/**
 * Shop data access — wraps the scraped inventory with helpers for the
 * walkthrough UI (departments → categories → items, search, counts).
 */
import { shopItems } from "./shopItems.generated";
import { DEPARTMENTS, type ShopItem, type ShopDepartment } from "./shopTypes";

export { shopItems, DEPARTMENTS };
export type { ShopItem, ShopDepartment };

/** Departments that actually have items, in the configured order. */
export function activeDepartments(): ShopDepartment[] {
  const present = new Set(shopItems.map((i) => i.department));
  return DEPARTMENTS.filter((d) => present.has(d.name));
}

/** Unique category labels within a department, in first-seen order. */
export function categoriesIn(department: string): string[] {
  const seen: string[] = [];
  for (const it of shopItems) {
    if (it.department === department && !seen.includes(it.category)) {
      seen.push(it.category);
    }
  }
  return seen;
}

export function countIn(department: string): number {
  return shopItems.filter((i) => i.department === department).length;
}

export const TOTAL_ITEMS = shopItems.length;

/** Cheapest listed price across the shop (for the hero stat). */
export function lowestPrice(): number {
  const prices = shopItems
    .map((i) => i.price)
    .filter((p): p is number => typeof p === "number" && p > 0);
  return prices.length ? Math.min(...prices) : 0;
}
