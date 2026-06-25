#!/usr/bin/env python3
"""
scrape-jons-assets.py
=====================

Collect publicly available image assets from the EXISTING Jon's Darkroom website
into /public/jons-assets so they can be used as local reference material while
redesigning the site.

IMPORTANT — PERMISSION & USE
----------------------------
These images are downloaded for local reference during the redesign ONLY.
Images collected from the existing website should only be used with Jon's
permission. Do NOT hotlink the old website's images from the new site — always
serve local copies that Jon has approved.

WHY A HEADLESS BROWSER?
-----------------------
jonsdarkroom.com is built with a JavaScript site builder (sitebuilder.com /
mywebsitebuilder.com). The raw HTML contains **zero** content <img> tags — every
photo is injected by JavaScript at runtime and served from blob/CDN storage.
A plain requests + BeautifulSoup scrape therefore finds nothing, so this script
renders each page with Playwright (headless Chromium) and captures the images
that actually load, from both the DOM and the network.

Behaviour
---------
- Renders the main pages (from the site's sitemap) with headless Chromium.
- Captures <img> sources (incl. currentSrc) and image network responses.
- Unwraps the site's /x/cdn/? proxy to the underlying asset URL.
- Keeps only the LARGEST size variant of each image (…_d200 / _d400 / _d1450).
- Skips icons, favicons, tiles, and the site-preview thumbnail.
- Rate-limits, never crashes on a single failed page.
- Writes manifest.json: source page, original URL, local filename, alt text, size.

Setup & usage
-------------
    pip install -r scripts/requirements.txt
    python3 -m playwright install chromium
    python3 scripts/scrape-jons-assets.py      # or: npm run scrape
"""

import os
import re
import json
import time
import asyncio
from urllib.parse import urlparse, unquote

from playwright.async_api import async_playwright

BASE = "https://www.jonsdarkroom.com"

# Main pages worth pulling reference imagery from (see sitemap.xml for the rest).
PAGES = [
    "/",
    "/about",
    "/contact",
    "/custom-picture-framing",
    "/photo-finishing-lab",
    "/film-processing",
    "/photo-restoration-services",
    "/video-transfer",
    "/passport-and-visa-photos",
    "/cameras",
    "/items-for-sale",
    "/novelty-photo-gifts",
    "/vt-business-article",
    "/customer-testimonials",
]

OUT_DIR = "public/jons-assets"
PAGE_DELAY = 0.8

SKIP = ("favicon", "touch-icon", "tile", "sitebuilder/", "wzsitethumbnails", "data:")


def unwrap(url: str) -> str:
    """Unwrap the site's /x/cdn/?<realurl> image proxy."""
    if "/x/cdn/?" in url:
        return url.split("/x/cdn/?", 1)[1]
    return url


def size_of(url: str) -> int:
    """Pull the _dNNN size hint from a filename so we can prefer the largest."""
    m = re.search(r"_d(\d{2,4})\.", url)
    return int(m.group(1)) if m else 0


def base_key(url: str) -> str:
    """Group key that ignores the size suffix, so variants collapse to one image."""
    path = urlparse(unwrap(url)).path
    path = re.sub(r"_d\d{2,4}(?=\.\w+$)", "", path)
    return path


def clean_filename(url: str) -> str:
    real = unwrap(url)
    name = os.path.basename(urlparse(real).path) or "image"
    name = unquote(name)
    name = re.sub(r"[^A-Za-z0-9._-]", "-", name)
    if "." not in name:
        name += ".jpg"
    return name


async def collect():
    """Render each page; return {base_key: best_image_record}."""
    best = {}
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        ctx = await browser.new_context(user_agent="Mozilla/5.0 jons-darkroom-redesign")
        for path in PAGES:
            page_url = BASE + path
            print("Rendering:", page_url)
            page = await ctx.new_page()
            net = set()
            page.on(
                "response",
                lambda r: net.add(r.url) if r.request.resource_type == "image" else None,
            )
            try:
                await page.goto(page_url, wait_until="networkidle", timeout=35000)
                await page.wait_for_timeout(1500)
                dom = await page.eval_on_selector_all(
                    "img",
                    "els => els.map(e => ({src: e.currentSrc || e.src, alt: e.alt || ''}))",
                )
            except Exception as e:
                print("  ! failed page:", path, str(e)[:90])
                await page.close()
                continue

            records = [{"src": s, "alt": ""} for s in net]
            records += [d for d in dom if d.get("src")]

            for rec in records:
                src = rec["src"]
                if not src or not src.startswith("http"):
                    continue
                if any(k in src for k in SKIP):
                    continue
                key = base_key(src)
                cur = best.get(key)
                if cur is None or size_of(src) > size_of(cur["src"]):
                    best[key] = {
                        "src": src,
                        "alt": rec.get("alt") or (cur["alt"] if cur else ""),
                        "page": page_url,
                    }
                elif rec.get("alt") and not best[key]["alt"]:
                    best[key]["alt"] = rec["alt"]

            await page.close()
            time.sleep(PAGE_DELAY)

        # download with the same browser context (handles the CDN proxy nicely)
        manifest = []
        os.makedirs(OUT_DIR, exist_ok=True)
        api = await ctx.new_page()
        for rec in best.values():
            url = rec["src"]
            filename = clean_filename(url)
            dest = os.path.join(OUT_DIR, filename)
            try:
                resp = await api.request.get(url, timeout=30000)
                if resp.ok and "image" in (resp.headers.get("content-type", "")):
                    with open(dest, "wb") as f:
                        f.write(await resp.body())
                    manifest.append(
                        {
                            "source_page": rec["page"],
                            "image_url": unwrap(url),
                            "filename": filename,
                            "alt": rec["alt"],
                            "size_hint": size_of(url) or None,
                        }
                    )
                    print("  + downloaded:", filename)
                else:
                    print("  - skipped:", filename, resp.status)
            except Exception as e:
                print("  ! failed image:", filename, str(e)[:80])
            await asyncio.sleep(0.2)

        await browser.close()
    return manifest


def main():
    manifest = asyncio.run(collect())
    with open(os.path.join(OUT_DIR, "manifest.json"), "w") as f:
        json.dump(manifest, f, indent=2)
    print(f"\nDone. Downloaded {len(manifest)} images.")
    print(f"Manifest written to {os.path.join(OUT_DIR, 'manifest.json')}")
    print(
        "\nReminder: images collected from the existing website should only be "
        "used with Jon's permission."
    )


if __name__ == "__main__":
    main()
