/**
 * "Stories From The Darkroom" — blog/story content.
 *
 * Editable from /admin/blog (+ /admin/blog/new). Each post has a slug for its
 * route (/stories/<slug>), a category, an excerpt, and Markdown-ish body text
 * rendered as paragraphs/headings.
 *
 * TODO: Move to a Supabase `posts` table (id, slug, title, category, excerpt,
 *       body, cover, author, published_at, draft). Image uploads to Supabase
 *       Storage. The Post type below is intentionally close to that schema.
 */

export const BLOG_CATEGORIES = [
  "Photo Tips",
  "Film Processing",
  "Framing Advice",
  "Camera Gear",
  "Local Stories",
  "Jon's Updates",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export type Post = {
  slug: string;
  title: string;
  category: BlogCategory;
  excerpt: string;
  /** cover image placeholder in /public */
  cover: string;
  coverAlt: string;
  author: string;
  date: string; // ISO
  readingTime: string;
  draft: boolean;
  /** Simple block content. type "h2" or "p". */
  body: { type: "h2" | "p"; text: string }[];
};

export const blogPosts: Post[] = [
  {
    slug: "how-to-preserve-old-family-photos",
    title: "How to Preserve Old Family Photos",
    category: "Photo Tips",
    excerpt:
      "A few simple habits — and a few things to never do — can keep your family photographs around for generations.",
    cover: "/jons-assets/3-Kids_d400.jpg",
    coverAlt: "An old family photograph of three children",
    author: "Jon",
    date: "2025-11-02",
    readingTime: "5 min read",
    draft: false,
    body: [
      {
        type: "p",
        text: "Most of the damaged photos that come across my counter weren't ruined by some dramatic event. They were slowly undone by an attic, a basement, a sunny wall, or a well-meaning roll of tape. The good news is that preserving old photographs mostly comes down to a handful of simple habits.",
      },
      { type: "h2", text: "Keep them cool, dry, and dark" },
      {
        type: "p",
        text: "Heat and humidity are a photograph's worst enemies. Attics and basements swing between both. A closet in the living space of your home — stable temperature, away from sunlight — is far better than either. Sunlight fades color photos faster than almost anything.",
      },
      { type: "h2", text: "Stop using tape, glue, and magnetic albums" },
      {
        type: "p",
        text: "Those sticky 'magnetic' albums from the '70s and '80s are quietly destroying the photos inside them. The adhesive yellows, hardens, and can tear the photo when you try to remove it. Acid-free sleeves and archival boxes are inexpensive and make an enormous difference.",
      },
      { type: "h2", text: "Handle by the edges" },
      {
        type: "p",
        text: "Fingerprints leave oils that, over years, etch into the emulsion. Hold prints by their edges, and if you're going through a big box of them, a pair of cotton gloves isn't overkill.",
      },
      { type: "h2", text: "Make copies before you need them" },
      {
        type: "p",
        text: "The single best thing you can do is digitize and reprint the photos that matter most — before they're damaged. Once there's a good scan and a fresh print, a torn original is no longer the end of the story. If a photo is already fading or cracked, bring it in; restoration can do more than most people expect.",
      },
    ],
  },
  {
    slug: "why-local-photo-printing-still-matters",
    title: "Why Local Photo Printing Still Matters",
    category: "Photo Tips",
    excerpt:
      "Your phone holds thousands of photos you'll never see. Here's the case for actually printing the ones you love — locally.",
    cover: "/jons-assets/3-film-types_d400.jpg",
    coverAlt: "Different types of photographic film",
    author: "Jon",
    date: "2025-09-18",
    readingTime: "4 min read",
    draft: false,
    body: [
      {
        type: "p",
        text: "There's a quiet tragedy in modern photography: we take more pictures than any generation in history, and we look at almost none of them. They live on a phone until the phone is lost, broken, or upgraded — and then they're gone.",
      },
      { type: "h2", text: "A print survives the technology" },
      {
        type: "p",
        text: "Formats die. Hard drives fail. Accounts get locked. A printed photograph in a drawer outlives all of it. The oldest images I restore are over a hundred years old — and they survived because someone printed them.",
      },
      { type: "h2", text: "Color you can trust" },
      {
        type: "p",
        text: "When you print locally, a person looks at your photo. I can see when skin tones are off or a sky has gone strangely blue, and fix it before it's printed. A faraway automated lab prints exactly what the file says, mistakes and all.",
      },
      { type: "h2", text: "It keeps the shop down the street alive" },
      {
        type: "p",
        text: "Every print order is also a vote for keeping a real photo lab in Essex Junction — the kind of place you can walk into when you've got a cracked photo or a mystery roll of film. That's not nostalgia. It's a service that disappears the moment people stop using it.",
      },
    ],
  },
  {
    slug: "before-framing-an-important-piece",
    title: "What to Know Before Framing an Important Piece",
    category: "Framing Advice",
    excerpt:
      "Glass, mats, and mounting all matter more than the frame itself. A short guide to framing something you can't replace.",
    cover: "/jons-assets/Mat-choices_d600.jpg",
    coverAlt: "A fan of mat board color choices for custom framing",
    author: "Jon",
    date: "2025-08-05",
    readingTime: "6 min read",
    draft: false,
    body: [
      {
        type: "p",
        text: "When people think about framing, they think about the frame. But for anything valuable or irreplaceable, the frame is the least important decision. What protects your piece is everything you don't see.",
      },
      { type: "h2", text: "Acid-free everything" },
      {
        type: "p",
        text: "Cheap mats and backing boards contain acids that, over years, burn a brown halo into whatever they touch. For a photo, diploma, or artwork you care about, acid-free (archival) mats and backing aren't an upgrade — they're the whole point.",
      },
      { type: "h2", text: "Glass is a real decision" },
      {
        type: "p",
        text: "Regular glass lets UV light fade your piece. UV-protective and museum glass cost more, but for anything that hangs in daylight — or anything you can't replace — they're worth it. Museum glass is also nearly invisible, with no glare.",
      },
      { type: "h2", text: "Never trim or glue the original" },
      {
        type: "p",
        text: "Good framing is reversible. Your piece should be able to come back out, years later, exactly as it went in. That means no trimming to fit, no permanent glue. If a framer suggests otherwise for something valuable, walk it down to me instead.",
      },
      { type: "h2", text: "Bring it in" },
      {
        type: "p",
        text: "The best framing decisions happen with the actual piece on the counter, frame corners and mat boards laid right beside it. Photos of a frame online can't tell you how the mat will make your photograph breathe.",
      },
    ],
  },
  {
    slug: "digitizing-old-tapes-before-they-fade",
    title: "Digitizing Old Tapes Before They Fade",
    category: "Film Processing",
    excerpt:
      "VHS and camcorder tapes are on a clock — and so are the machines that play them. Why 'someday' is riskier than it sounds.",
    cover: "/jons-assets/Video-Tapes_d1450.jpg",
    coverAlt: "A collection of old video tapes ready to be transferred to digital",
    author: "Jon",
    date: "2025-06-21",
    readingTime: "5 min read",
    draft: false,
    body: [
      {
        type: "p",
        text: "Almost every week, someone sets a shoebox of tapes on my counter and says the same thing: 'I've been meaning to do this for years.' I understand completely. But those tapes are the one kind of memory that's actively disappearing while it sits in the closet.",
      },
      { type: "h2", text: "Tape is magnetic, and magnetism fades" },
      {
        type: "p",
        text: "VHS, camcorder, and audio tapes store everything in a thin magnetic layer that weakens over time. They also suffer from 'sticky-shed,' where the binder holding that layer breaks down and the tape literally sheds as it plays. Every year of waiting means a little more loss.",
      },
      { type: "h2", text: "The players are vanishing" },
      {
        type: "p",
        text: "Nobody makes VHS decks anymore, and working camcorders for formats like Hi8 and MiniDV get harder to find every year. Even if your tape is fine, in another decade the machine to read it may not exist.",
      },
      { type: "h2", text: "Once it's digital, it's safe" },
      {
        type: "p",
        text: "After a transfer, your home movies become files you can copy, back up to the cloud, and send to family across the country. The originals come back to you, but the memory is finally out of harm's way. If you've been meaning to do it for years — this is the year.",
      },
    ],
  },
  {
    slug: "a-local-darkroom-still-serving-essex-junction",
    title: "A Local Darkroom Still Serving Essex Junction",
    category: "Local Stories",
    excerpt:
      "After 35+ years on Pearl Street, here's what keeps the lights on — and why it still matters to do this by hand.",
    cover: "/jons-assets/jons-darkroom-long2.jpg",
    coverAlt: "The Jon's Darkroom & Frameshop logo banner",
    author: "Jon",
    date: "2025-03-10",
    readingTime: "4 min read",
    draft: false,
    body: [
      {
        type: "p",
        text: "People are sometimes surprised a shop like mine is still here. The big chains closed their photo counters years ago. The one-hour labs are gone. And yet, more than three decades in, the door on Pearl Street still opens every weekday.",
      },
      { type: "h2", text: "What walks through the door" },
      {
        type: "p",
        text: "A roll of film found while cleaning out a parent's house. The only photo of a grandfather, cracked down the middle. A box of tapes labeled in a child's handwriting. A medal that needs framing for a memorial. This is the work, and there's no app for it.",
      },
      { type: "h2", text: "Why by hand still matters" },
      {
        type: "p",
        text: "Every one of those things is irreplaceable, and every one deserves a person — not a machine in another state — to look at it, understand what it means, and treat it that way. That's the whole job: making sure Essex Junction's memories don't get lost.",
      },
      { type: "h2", text: "Still here, still preserving" },
      {
        type: "p",
        text: "So thank you, to every family that's trusted me with a photograph over the years. As long as you keep bringing them in, I'll keep the darkroom open. We're not done preserving Vermont's memories yet.",
      },
    ],
  },
];

/** Lookup helpers */
export function getPost(slug: string): Post | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getPublishedPosts(): Post[] {
  return blogPosts
    .filter((p) => !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getLatestPosts(n: number): Post[] {
  return getPublishedPosts().slice(0, n);
}

export const allPostSlugs = blogPosts.map((p) => p.slug);
