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
  /** scanned-clipping image in /public */
  image: string;
  imageAlt: string;
  /** big pull quote */
  pullQuote: string;
  /** article body paragraphs */
  body: string[];
  featured: boolean;
  /** optional full-page scans of the article */
  pages?: { src: string; alt: string }[];
};

export const featuredArticle: PressArticle = {
  id: "press-well-developed-business-people-vermont",
  headline: "Well Developed",
  publication: "Business People–Vermont",
  date: "2018-08-01",
  image: "/jons-assets/P1.jpg",
  imageAlt:
    "Magazine feature page showing Jon Long at his workstation at Jon's Darkroom & Frameshop in Essex Junction",
  pullQuote:
    "\"From film to digital, from photography to framing, this guy does it all.\"",
  body: [
    "In its August 2018 issue, Business People–Vermont featured Jon Long, president of Jon's Darkroom & Frameshop Inc., in a profile titled \"Well Developed.\" The story traces a lifelong love of photography that began when Jon picked up a Brownie camera at the age of five.",
    "Over the years on Pearl Street in Essex Junction, that passion has grown into a full-service shop that does it all — developing film, making prints, restoring damaged photographs, transferring old home movies, and building custom frames for the things families treasure most.",
    "The feature paints the picture of a true local craftsman: someone who has followed photography from film to digital and never stopped doing the work by hand, one customer and one memory at a time.",
    "For Essex Junction, the shop remains exactly that — the place you bring the photographs, films, and keepsakes you can't replace, knowing a real person will take care of them.",
  ],
  featured: true,
  pages: [
    {
      src: "/jons-assets/P1.jpg",
      alt: "Page 1 of the Business People–Vermont feature on Jon's Darkroom & Frameshop",
    },
    {
      src: "/jons-assets/P2.jpg",
      alt: "Page 2 of the Business People–Vermont feature on Jon's Darkroom & Frameshop",
    },
    {
      src: "/jons-assets/P3.jpg",
      alt: "Page 3 of the Business People–Vermont feature on Jon's Darkroom & Frameshop",
    },
  ],
};

/** Press mentions for the Jon In The Press archive page. */
export const pressArchive: PressArticle[] = [featuredArticle];

/** Shop timeline used on /jon-in-the-press. */
export type TimelineEntry = {
  year: string;
  title: string;
  body: string;
};

export const shopTimeline: TimelineEntry[] = [
  {
    year: "Age 5",
    title: "A Brownie camera",
    body: "Jon Long picks up a Brownie camera as a boy — the start of a lifelong love of photography that he'd eventually build a business around.",
  },
  {
    year: "The early years",
    title: "The shop opens",
    body: "Jon opens a darkroom and frame shop in Essex Junction, betting that a community will always want its photographs handled by a real person.",
  },
  {
    year: "Film → digital",
    title: "Following the craft",
    body: "As photography moves from film to digital and old formats begin to fade, Jon leans into restoration and video transfers — and keeps doing the work by hand.",
  },
  {
    year: "2018",
    title: "Featured in the press",
    body: "Business People–Vermont profiles Jon in a feature titled \"Well Developed,\" celebrating a craftsman who, from film to framing, does it all.",
  },
  {
    year: "Today",
    title: "Still preserving memories",
    body: "Jon is still behind the counter on Pearl Street — developing, restoring, framing, and transferring — keeping Vermont's memories alive.",
  },
];
