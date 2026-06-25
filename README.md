# Jon's Darkroom & Frameshop

**Preserving Vermont's Memories** — a warm, handcrafted website for a local
photo, film, and framing shop in Essex Junction, Vermont.

Built with **Next.js (App Router) · TypeScript · Tailwind CSS**. The look is
all wood, brass, cream paper, film strips, polaroids, and newspaper clippings —
designed to feel like walking into Jon's actual store.

---

## Quick start

> **Requirements:** [Node.js](https://nodejs.org) 18.17+ (or 20+) and npm.
> This machine didn't have Node installed when the project was scaffolded — install
> it first, then run the commands below.

```bash
# 1. install dependencies
npm install

# 2. set up environment variables (admin login + session secret)
cp .env.local.example .env.local
#   then edit .env.local and set ADMIN_USERNAME, ADMIN_PASSWORD,
#   and a long random ADMIN_SESSION_SECRET (e.g. `openssl rand -base64 32`)

# 3. run the dev server
npm run dev
#   → http://localhost:3000
```

Other scripts:

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
npm run scrape  # run the asset scraper (see below)
```

---

## Project structure

```
src/
  app/
    layout.tsx              # root layout: fonts, <html>, SEO, JSON-LD
    globals.css             # the design system (wood/paper/film/brass textures)
    not-found.tsx           # 404
    (site)/                 # public website (shares Navbar + Footer)
      page.tsx              # Home (hero, Memory Desk, services, press, …)
      services/             # /services + /services/[slug] (one page per service)
      about/                # About Jon
      stories/              # Stories From The Darkroom (+ /stories/[slug])
      jon-in-the-press/     # newspaper archive page
      contact/              # Contact & Visit
    admin/                  # admin dashboard
      login/                # /admin/login (public)
      (dashboard)/          # protected pages (sidebar shell)
        page.tsx            # /admin
        blog/ blog/new/
        services/
        business-info/
        featured-article/
        gallery/            # gallery + inventory (display-case) manager
    api/auth/               # login / logout route handlers
  components/               # Navbar, Footer, MemoryDesk, ServiceCard, …
  data/                     # local TypeScript data (the source of truth)
  lib/                      # auth + small utilities
  middleware.ts             # protects /admin/*
scripts/
  scrape-jons-assets.py     # reference-image scraper
  requirements.txt
public/jons-assets/         # local images + scraper output (gitignored)
```

### Components

`Navbar`, `Footer`, `ServiceCard`, `WoodPlaqueCard`, `MemoryDesk`,
`MemoryDeskObject`, `NewspaperFeature`, `PressArticleBlock`, `PolaroidImageCard`,
`FilmStripDivider`, `SectionHeader`, `CTAButton`, `ContactCard`, `PageHero`,
`BlogCard`, `GalleryGrid`, `BeforeAfterBlock`, `InventoryShowcase`, `ShopImage`,
plus admin `AdminSidebar` and `AdminForm` primitives.

### Data files (`src/data/`)

- `services.ts` — the 8 services + page content + SEO
- `blogPosts.ts` — "Stories From The Darkroom" posts + categories
- `businessInfo.ts` — name, address, phone, hours, history
- `featuredArticle.ts` — featured press clipping, press archive, shop timeline
- `gallery.ts` — gallery images, before/after pairs, framing showcase, and the
  camera **inventory** (the polished "display case" cards)

Everything is plain, serializable TypeScript so it maps cleanly onto a database
later (see **Future plan**).

---

## Admin dashboard

Jon can manage the site at **`/admin`** (redirects to `/admin/login` until
signed in).

### Credentials

Auth is intentionally simple for now — two environment variables in `.env.local`:

```env
ADMIN_USERNAME=jon
ADMIN_PASSWORD=your-strong-password
ADMIN_SESSION_SECRET=a-long-random-string
```

On successful login the server sets an HMAC-signed, `httpOnly` session cookie;
`src/middleware.ts` verifies it on every `/admin` route.

### What Jon can manage

- **Stories / Blog** — list, publish/unpublish, delete, and write new posts
- **Services** — edit page copy and toggle which appear on the homepage
- **Business Info** — address, phone, email, **hours**, and a homepage announcement
- **Featured Article** — the newspaper clipping shown on the homepage
- **Gallery & Inventory** — manage gallery photos and camera **display-case
  items** with a live-preview card editor (the retro card template)

> **Demo admin:** edits are currently in-memory (they reset on reload). Each
> mutation point is marked with a `TODO` for wiring up a real database.

---

## Scraper — collecting reference assets

`scripts/scrape-jons-assets.py` downloads publicly available images from the
**existing** `jonsdarkroom.com` into `public/jons-assets/` for local reference
while redesigning.

```bash
pip install -r scripts/requirements.txt
python3 scripts/scrape-jons-assets.py     # or: npm run scrape
```

It scans the main pages, downloads `<img>` assets (skipping duplicates),
rate-limits requests, never crashes on a failed page/image, and writes a
`manifest.json` (source page, original URL, local filename, alt text).

> ⚠️ **Image permission:** Images collected from the existing website should
> only be used **with Jon's permission**. Do not hotlink the old site's images.
> See `public/jons-assets/README.md`.

### Using real photos

Drop approved images into `public/jons-assets/` and update the matching `src`
path in `src/data/*` so it no longer contains the word `placeholder`. The
`ShopImage` component renders a handcrafted placeholder for `placeholder-*`
paths and the real `<img>` for everything else — so the site looks finished
even before any photos are added.

---

## Design system

Defined in `tailwind.config.ts` + `src/app/globals.css`.

| Token            | Hex       | Use                          |
| ---------------- | --------- | ---------------------------- |
| Walnut Brown     | `#5C4033` | wood surfaces                |
| Dark Espresso    | `#2C1E16` | page background              |
| Cream Paper      | `#F4E9D8` | paper sections / text on dark|
| Brass Gold       | `#B08D57` | accents, rules, CTAs         |
| Charcoal         | `#1A1A1A` | text on cream                |
| Film Black       | `#101010` | film strips                  |
| Muted Burgundy   | `#7B3F3F` | primary buttons / details    |

- **Headings:** Cormorant Garamond · **Body:** Inter (via `next/font`)
- Reusable surfaces: `.surface-wood`, `.surface-wood-dark`, `.surface-paper`,
  `.plaque`, `.polaroid`, `.card-paper`, `.film-strip`, `.tape`, `.hairline-brass`

---

## Accessibility & performance

- Strong color contrast, semantic headings, descriptive `alt` text
- Keyboard-friendly nav, visible brass focus rings, a "skip to content" link
- Honors `prefers-reduced-motion`
- Mobile-first responsive layouts, lazy-loaded images/maps, no heavy animations
- Per-page SEO metadata + `LocalBusiness` JSON-LD, targeting local keywords
  (Essex Junction photo lab, Vermont photo restoration, custom framing, passport
  photos, video transfer, camera equipment, film processing)

---

## Future plan — connecting a database

The app is structured to drop onto **Supabase** (or Firebase) with minimal
churn. Search the codebase for `TODO` to find every integration point.

1. **Auth** — replace `src/lib/auth.ts` + the `/api/auth/*` routes with Supabase
   Auth; update `src/middleware.ts` to check the Supabase session.
2. **Database** — create tables mirroring the `src/data` types: `services`,
   `posts`, `business_info`, `press`, `gallery`, `inventory`. Swap the static
   imports for queries; swap the admin's in-memory state for insert/update
   mutations + `revalidatePath`.
3. **Storage / image uploads** — point the admin upload fields at Supabase
   Storage; add the bucket host to `next.config.mjs` `images.remotePatterns`
   and switch `ShopImage` to `next/image`.

---

Handcrafted in Essex Junction, Vermont. 📷
