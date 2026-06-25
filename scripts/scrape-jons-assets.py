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

Behaviour
---------
- Scans the main pages listed in PAGES.
- Downloads <img> assets (src or data-src), skipping duplicates.
- Saves images locally with content-hashed filenames.
- Rate-limits requests so we're polite to the server.
- Never crashes on a single failed page or image — it logs and moves on.
- Writes a manifest.json describing every saved image:
  source page, original URL, local filename, and alt text.

Usage
-----
    pip install requests beautifulsoup4
    python3 scripts/scrape-jons-assets.py
    # or:  npm run scrape
"""

import os
import json
import time
import hashlib
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse

BASE = "https://www.jonsdarkroom.com"
PAGES = [
    "/",
    "/about",
    "/contact",
    "/custom-picture-framing",
    "/photo-finishing-lab-services",
    "/camera-equipment-for-sale",
    "/video-transfer-services",
    "/instant-passport-and-visa-photos",
    "/novelty-photo-gifts",
]

OUT_DIR = "public/jons-assets"
os.makedirs(OUT_DIR, exist_ok=True)

# Be polite: identify the bot and rate-limit.
HEADERS = {
    "User-Agent": "Mozilla/5.0 jons-darkroom-website-redesign-asset-collector",
}
PAGE_DELAY = 1.0   # seconds between pages
IMAGE_DELAY = 0.3  # seconds between image downloads

manifest = []
seen = set()


def safe_name(url):
    """Stable, collision-resistant filename derived from the image URL."""
    parsed = urlparse(url)
    ext = os.path.splitext(parsed.path)[1] or ".jpg"
    clean_ext = ext.split("?")[0]
    if len(clean_ext) > 5 or "/" in clean_ext:
        clean_ext = ".jpg"
    h = hashlib.md5(url.encode()).hexdigest()[:10]
    return f"jon-{h}{clean_ext}"


def download_image(img_url, alt, page_url):
    """Download a single image. Returns True if saved."""
    filename = safe_name(img_url)
    path = os.path.join(OUT_DIR, filename)

    try:
        r = requests.get(img_url, headers=HEADERS, timeout=20)
    except Exception as e:  # network error, timeout, etc.
        print("  ! failed image:", img_url, e)
        return False

    content_type = r.headers.get("content-type", "")
    if r.status_code == 200 and "image" in content_type:
        try:
            with open(path, "wb") as f:
                f.write(r.content)
        except OSError as e:
            print("  ! could not write:", path, e)
            return False

        manifest.append(
            {
                "source_page": page_url,
                "image_url": img_url,
                "filename": filename,
                "alt": alt,
            }
        )
        print("  + downloaded:", filename)
        return True

    print(f"  - skipped (status {r.status_code}, type '{content_type}'):", img_url)
    return False


def scan_page(page):
    page_url = urljoin(BASE, page)
    print("Scanning:", page_url)

    try:
        response = requests.get(page_url, headers=HEADERS, timeout=15)
        response.raise_for_status()
        html = response.text
    except Exception as e:
        print("  ! failed page:", page_url, e)
        return

    soup = BeautifulSoup(html, "html.parser")

    for img in soup.find_all("img"):
        src = img.get("src") or img.get("data-src")
        if not src:
            continue

        img_url = urljoin(page_url, src)
        if img_url in seen:
            continue
        seen.add(img_url)

        alt = img.get("alt", "") or ""
        if download_image(img_url, alt, page_url):
            time.sleep(IMAGE_DELAY)


def main():
    for page in PAGES:
        scan_page(page)
        time.sleep(PAGE_DELAY)

    manifest_path = os.path.join(OUT_DIR, "manifest.json")
    with open(manifest_path, "w") as f:
        json.dump(manifest, f, indent=2)

    print(f"\nDone. Downloaded {len(manifest)} images.")
    print(f"Manifest written to {manifest_path}")
    print(
        "\nReminder: images collected from the existing website should only be "
        "used with Jon's permission."
    )


if __name__ == "__main__":
    main()
