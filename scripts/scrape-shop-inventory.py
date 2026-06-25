#!/usr/bin/env python3
"""
scrape-shop-inventory.py
========================

Scrapes Jon's "Used Photo Equipment For Sale" marketplace from the live site
(jonsdarkroom.com) into structured data + local item photos for the redesign's
Shop section.

Like the asset scraper, this renders each page with Playwright because the live
site injects all content (and prices) via JavaScript.

Output:
  - public/jons-assets/shop/*           item photos (content-hashed)
  - src/data/shopItems.generated.ts     typed TS array of every item

PERMISSION: item photos are collected for the redesign and should only be
published with Jon's permission (see public/jons-assets/README.md).

Usage:
  pip install -r scripts/requirements.txt
  python3 -m playwright install chromium
  python3 scripts/scrape-shop-inventory.py
"""

import asyncio, re, os, json, hashlib
from urllib.parse import urlparse
from playwright.async_api import async_playwright

BASE = "https://www.jonsdarkroom.com"
IMG_DIR = "public/jons-assets/shop"
OUT_TS = "src/data/shopItems.generated.ts"

# slug -> (department, category label, brand)
PAGES = {
    # Film cameras
    "canon-film-cameras": ("Film Cameras", "Canon Film Cameras", "Canon"),
    "nikon-film-cameras": ("Film Cameras", "Nikon Film Cameras", "Nikon"),
    "minolta-film-cameras": ("Film Cameras", "Minolta Film Cameras", "Minolta"),
    "olympus-film-cameras": ("Film Cameras", "Olympus Film Cameras", "Olympus"),
    "pentax-film-cameras": ("Film Cameras", "Pentax Film Cameras", "Pentax"),
    "retro-cameras": ("Film Cameras", "Retro & Vintage Cameras", "Various"),
    "misc-film-cameras": ("Film Cameras", "Other Film Cameras", "Various"),
    "medium-format-film-cameras": ("Film Cameras", "Medium Format", "Various"),
    "film-slr-camerass": ("Film Cameras", "Film SLRs", "Various"),
    "film-point-shoot-cameras": ("Film Cameras", "Film Point & Shoot", "Various"),
    # Digital cameras
    "canon-digital-cameras": ("Digital Cameras", "Canon Digital", "Canon"),
    "nikon-digital-cameras": ("Digital Cameras", "Nikon Digital", "Nikon"),
    "sony-digital-cameras": ("Digital Cameras", "Sony Digital", "Sony"),
    "olympus-digital-cameras": ("Digital Cameras", "Olympus Digital", "Olympus"),
    "digital-video-cameras": ("Digital Cameras", "Video Cameras", "Various"),
    "digital-point-shoot-cameras": ("Digital Cameras", "Digital Point & Shoot", "Various"),
    "point-and-shoot-cameras": ("Digital Cameras", "Point & Shoot", "Various"),
    "digital-cameras-under-25": ("Digital Cameras", "Budget Digital", "Various"),
    # Lenses
    "canon-lenses": ("Lenses", "Canon Lenses", "Canon"),
    "nikon-lenses": ("Lenses", "Nikon Lenses", "Nikon"),
    "minolta-lenses": ("Lenses", "Minolta Lenses", "Minolta"),
    "olympus-lenses": ("Lenses", "Olympus Lenses", "Olympus"),
    "pentax-lenses": ("Lenses", "Pentax Lenses", "Pentax"),
    "sony-lenses": ("Lenses", "Sony Lenses", "Sony"),
    "other-brand-lenses": ("Lenses", "Other Lenses", "Various"),
    "camera-lenses": ("Lenses", "Camera Lenses", "Various"),
    "lens-filters-caps-hoods-etc": ("Lenses", "Filters, Caps & Hoods", "Various"),
    "lenses-peripherals": ("Lenses", "Lens Peripherals", "Various"),
    # Lighting & studio
    "flash-units": ("Lighting & Studio", "Flash Units", "Various"),
    "studio-equipment": ("Lighting & Studio", "Studio Equipment", "Various"),
    "studio-lighting": ("Lighting & Studio", "Studio Lighting", "Various"),
    "studio-backgrounds": ("Lighting & Studio", "Studio Backgrounds", "Various"),
    # Accessories
    "tripods": ("Accessories", "Tripods", "Various"),
    "camera-bags": ("Accessories", "Camera Bags", "Various"),
    "misc-camera-assessories": ("Accessories", "Misc Accessories", "Various"),
    "printers-ink-cartridges": ("Accessories", "Printers & Ink", "Various"),
    "non-photo-items-for-sale": ("Accessories", "Other Items", "Various"),
}

TOKEN_JS = r"""
() => {
  const out=[]; const w=document.createTreeWalker(document.body, NodeFilter.SHOW_ALL); let n;
  const sy=window.scrollY||0, sx=window.scrollX||0;
  while((n=w.nextNode())){
    if(n.nodeType===1 && n.tagName==='IMG'){
      const src=n.currentSrc||n.src||''; const r=n.getBoundingClientRect();
      if(src && r.width>60 && r.height>60)
        out.push({t:'i', s:src, cx:r.left+r.width/2+sx, cy:r.top+r.height/2+sy});
    } else if(n.nodeType===3){
      const tx=(n.textContent||'').replace(/[​ ]/g,' ').trim();
      if(tx){ let cx=0,cy=0; const pe=n.parentElement; if(pe){const r=pe.getBoundingClientRect(); cx=r.left+r.width/2+sx; cy=r.top+r.height/2+sy;} out.push({t:'x', x:tx, cx, cy}); }
    }
  }
  return out;
};
"""

SKIP = re.compile(
    r"(jonsdarkroom|Pearl Street|Essex Junction|Hours of Operation|mail@|^M-F|Saturday|Sunday|"
    r"^Heading|Payment required|Packaging|^Please|^Submit$|^Name$|^Email$|^Phone$|^Date$|^Message$|"
    r"Requested Time|separate form|one man operation|marketplace|non-Negotiable|checked and cleaned|"
    r"low prices|breaking the bank|Have fun|new items are added|Used Photo Equipment|categories at the end|"
    r"buy with confidence|Available now|instruction time|categories$)",
    re.I,
)
ITEMRE = re.compile(r"^Items?\b[\s#]*[0-9xX]", re.I)
PRICE = re.compile(r"\$\s?\d[\d,]*(?:\.\d{2})?")
COND = re.compile(r"Condition\s*[=:]?\s*(\d{1,2})", re.I)


def safe_name(url):
    h = hashlib.md5(url.encode()).hexdigest()[:12]
    ext = os.path.splitext(urlparse(url.split("?")[-1] if "x/cdn" in url else url).path)[1]
    if not ext or len(ext) > 5:
        ext = ".jpg"
    return f"shop-{h}{ext}"


def parse_tokens(toks, slug, dept, cat, brand):
    items = []
    cur = None
    page_imgs = []  # [{url, y}] in document order, deduped
    seen_img = set()
    for t in toks:
        if t["t"] == "i":
            if t["s"] not in seen_img:
                seen_img.add(t["s"])
                page_imgs.append({"url": t["s"], "cx": t.get("cx", 0), "cy": t.get("cy", 0)})
            continue
        tx = t["x"]
        if len(tx) < 2:
            continue
        if ITEMRE.match(tx):
            if cur:
                items.append(cur)
            cur = {"itemNumber": tx, "lines": [], "cx": t.get("cx", 0), "cy": t.get("cy", 0)}
        elif cur is not None and not SKIP.search(tx):
            cur["lines"].append(tx)
    if cur:
        items.append(cur)

    # ---- 2D pairing: each item's photo sits in its grid column, at/above its text ----
    used = set()
    for it in items:
        icx, icy = it.get("cx", 0), it.get("cy", 0)
        best, best_d = None, 1e18
        for idx, im in enumerate(page_imgs):
            if idx in used:
                continue
            if im["cy"] > icy + 150:   # image must be at or above the caption
                continue
            # weight horizontal (column) distance heavily so we stay in the right column
            d = abs(im["cx"] - icx) * 2.5 + abs(im["cy"] - icy)
            if d < best_d:
                best_d, best = d, idx
        if best is not None and best_d < 1400:
            it["image"] = page_imgs[best]["url"]
            used.add(best)
        else:
            it["image"] = None

    out = []
    for it in items:
        lines = it["lines"]
        if not lines:
            continue
        name = lines[0]
        body = " ".join(lines)
        prices = PRICE.findall(body)
        price_text = ""
        for ln in lines:
            if PRICE.search(ln):
                price_text = ln.strip()
                break
        cond_m = COND.search(it["itemNumber"] + " " + body)
        # description = lines minus the name and pure-price lines
        desc_lines = [
            ln for ln in lines[1:]
            if not re.fullmatch(r"[\s$0-9.,xX#=Conditon]*", ln) and len(ln) > 2
        ]
        price_num = None
        if prices:
            price_num = float(re.sub(r"[^\d.]", "", prices[0]) or 0)
        out.append({
            "itemNumber": re.sub(r"\s+", " ", it["itemNumber"]).strip(),
            "name": re.sub(r"\s+", " ", name).strip(),
            "price": price_num,
            "priceText": re.sub(r"\s+", " ", price_text).strip(),
            "condition": int(cond_m.group(1)) if cond_m else None,
            "description": re.sub(r"\s+", " ", " ".join(desc_lines)).strip()[:400],
            "brand": brand,
            "category": cat,
            "department": dept,
            "_imgUrl": it.get("image"),
            "sourceUrl": BASE + "/" + slug,
        })
    return out


async def main():
    os.makedirs(IMG_DIR, exist_ok=True)
    all_items = []
    async with async_playwright() as p:
        b = await p.chromium.launch()
        ctx = await b.new_context(
            viewport={"width": 1280, "height": 1000},
            user_agent="Mozilla/5.0 jons-darkroom-redesign",
        )
        for slug, (dept, cat, brand) in PAGES.items():
            pg = await ctx.new_page()
            try:
                await pg.goto(f"{BASE}/{slug}", wait_until="networkidle", timeout=35000)
                await pg.wait_for_timeout(1300)
                toks = await pg.evaluate(TOKEN_JS)
            except Exception as e:
                print("  ! failed page:", slug, str(e)[:70])
                await pg.close()
                continue
            items = parse_tokens(toks, slug, dept, cat, brand)
            print(f"{slug:32s} -> {len(items):3d} items")
            all_items += items
            await pg.close()

        # download images
        api = await ctx.new_page()
        cache = {}
        for it in all_items:
            url = it.pop("_imgUrl", None)
            it["image"] = ""
            if not url:
                continue
            if url in cache:
                it["image"] = cache[url]
                continue
            fn = safe_name(url)
            dest = os.path.join(IMG_DIR, fn)
            try:
                resp = await api.request.get(url, timeout=30000)
                if resp.ok and "image" in resp.headers.get("content-type", ""):
                    with open(dest, "wb") as f:
                        f.write(await resp.body())
                    local = "/jons-assets/shop/" + fn
                    it["image"] = local
                    cache[url] = local
            except Exception as e:
                print("  ! img fail:", str(e)[:50])
            await asyncio.sleep(0.12)
        await b.close()

    # keep items that have at least a name and (price or image)
    clean = [i for i in all_items if i["name"] and (i["price"] or i["image"])]
    # assign ids
    for idx, it in enumerate(clean):
        it["id"] = f"shop-{idx+1:03d}"

    ts = (
        "// AUTO-GENERATED by scripts/scrape-shop-inventory.py — do not edit by hand.\n"
        "// Source: jonsdarkroom.com 'Used Photo Equipment For Sale'. Images for redesign\n"
        "// reference; publish only with Jon's permission.\n\n"
        "import type { ShopItem } from \"./shopTypes\";\n\n"
        "export const shopItems: ShopItem[] = "
        + json.dumps(clean, indent=2)
        + ";\n"
    )
    with open(OUT_TS, "w") as f:
        f.write(ts)

    print(f"\nTotal items: {len(clean)}  | with price: {sum(1 for i in clean if i['price'])}"
          f"  | with image: {sum(1 for i in clean if i['image'])}")
    print("Wrote", OUT_TS)


if __name__ == "__main__":
    main_async = main()
    asyncio.get_event_loop().run_until_complete(main_async) if False else asyncio.run(main_async)
