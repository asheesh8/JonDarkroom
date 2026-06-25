# jons-assets

This folder holds **local image assets** for Jon's Darkroom & Frameshop website.

## Image permission note

> **Images collected from the existing website should only be used with Jon's
> permission.**

The scraper at [`scripts/scrape-jons-assets.py`](../../scripts/scrape-jons-assets.py)
downloads publicly available images from the current `jonsdarkroom.com` into this
folder **for local reference only** while redesigning the site. Do **not**
hotlink the old website's images, and do not publish any scraped image on the new
site without Jon's explicit approval.

When the scraper runs it also writes a `manifest.json` here recording, for each
image: its source page, original URL, local filename, and alt text.

## Placeholders

The site is designed to look complete **before** any real photos are added.
Every `placeholder-*` path referenced in `src/data/*` is rendered by the
`ShopImage` component as a warm, on-brand placeholder graphic (no broken images).

To use real photos:

1. Drop the approved image files into this folder (e.g. `hero-counter.jpg`).
2. Update the matching `src` path in the relevant data file
   (`src/data/services.ts`, `gallery.ts`, `featuredArticle.ts`, `blogPosts.ts`,
   `businessInfo.ts`) so it **no longer contains the word `placeholder`**.
3. `ShopImage` will then render the real image automatically.

> Note: this folder is gitignored (except this README) so scraped/reference
> images aren't committed. Commit only assets you have permission to use.
