/**
 * Featured newspaper article — the "Featured in the Local Press" trust-builder.
 *
 * Editable from /admin/featured-article. One featured article at a time, plus a
 * small archive used by the /jon-in-the-press page.
 *
 * TODO: Move to a Supabase `press` table; mark one row `featured = true`.
 */

export type PressArticle = {
  id: string;
  headline: string;
  publication: string;
  date: string; // ISO
  /** scanned-clipping image placeholder in /public */
  image: string;
  imageAlt: string;
  /** big pull quote */
  pullQuote: string;
  /** article body paragraphs */
  body: string[];
  featured: boolean;
};

export const featuredArticle: PressArticle = {
  id: "press-darkroom-keeping-memories-alive",
  headline: "A Local Darkroom Keeping Vermont's Memories Alive",
  publication: "The Essex Reporter",
  date: "2023-09-14",
  image: "/jons-assets/placeholder-newspaper.svg",
  imageAlt:
    "Scanned newspaper clipping featuring Jon at the counter of his Essex Junction darkroom and frameshop",
  pullQuote:
    "\"People don't just bring me photographs. They bring me their grandmother, their wedding, the kid who grew up. My job is to make sure none of it gets lost.\"",
  body: [
    "Tucked along Pearl Street in Essex Junction, Jon's Darkroom & Frameshop has spent more than three decades doing something increasingly rare: preserving the physical memories of an entire community.",
    "While big-box stores shuttered their photo counters and one-hour labs vanished, Jon kept the lights on — developing film, restoring water-damaged portraits, framing diplomas and medals, and quietly transferring shoeboxes of VHS tapes before the magnetic tape inside could fade for good.",
    "\"There's a difference between a machine printing your photo and a person looking at it,\" Jon says. \"I've been doing this long enough that I can see when a color's off, when a face needs a little help. That's not something an app does.\"",
    "For the families of Essex Junction, the shop has become a kind of memory bank — the place you go when the only photo of someone is cracked down the middle, or when the home movies are trapped on a format nobody can play anymore.",
    "After all these years, Jon is still behind the counter, still preserving Vermont's memories one frame at a time.",
  ],
  featured: true,
};

/** Additional press mentions for the Jon In The Press archive page. */
export const pressArchive: PressArticle[] = [
  featuredArticle,
  {
    id: "press-framing-the-community",
    headline: "Framing the Community, One Memory at a Time",
    publication: "Seven Days (placeholder)",
    date: "2019-05-02",
    image: "/jons-assets/placeholder-newspaper-2.svg",
    imageAlt:
      "Placeholder newspaper clipping about Jon's custom framing work for local families",
    pullQuote:
      "\"A frame isn't decoration. It's protection. It's respect for the thing inside it.\"",
    body: [
      "Long-time Essex Junction framer Jon has built a reputation for treating every piece — from a child's crayon drawing to a veteran's folded flag — as if it were headed for a museum.",
      "\"I've framed wedding dresses, hockey jerseys, the last letter someone's father ever wrote,\" he says. \"You learn pretty quick that you're not framing objects. You're framing people's lives.\"",
    ],
    featured: false,
  },
];

/** Shop timeline used on /jon-in-the-press. */
export type TimelineEntry = {
  year: string;
  title: string;
  body: string;
};

export const shopTimeline: TimelineEntry[] = [
  {
    year: "1989",
    title: "The shop opens",
    body: "Jon opens a darkroom and frame shop in Essex Junction, betting that a community will always want its photographs handled by a real person.",
  },
  {
    year: "1990s",
    title: "Serving Essex Junction",
    body: "Through the film era's busiest years, the shop becomes a neighborhood fixture — prints, framing, and a camera counter where you can ask anything.",
  },
  {
    year: "2000s",
    title: "Preserving the past",
    body: "As digital arrives and old formats fade, Jon leans into restoration and video transfers — saving water-damaged photos and shoeboxes of home movies.",
  },
  {
    year: "2020s",
    title: "Featured in the local press",
    body: "Jon's decades of one-on-one service to Vermont families are recognized in local coverage of the shop and its mission.",
  },
  {
    year: "Today",
    title: "Still preserving memories",
    body: "Jon is still behind the counter on Pearl Street, developing, restoring, framing, and transferring — keeping Vermont's memories alive.",
  },
];
