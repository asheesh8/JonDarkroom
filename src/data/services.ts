/**
 * Services data.
 *
 * Local TypeScript source of truth. Each service has a slug used for its page
 * route (/services/<slug>), an icon name (mapped to a lucide-react icon in
 * components/icons.tsx), short copy for cards, and rich page content.
 *
 * TODO: Replace static import with a Supabase `services` table so Jon can edit
 *       this from /admin/services. Suggested columns mirror the Service type
 *       below (id, slug, title, icon, short, ... jsonb for sections/details).
 */

export type ServiceSection = {
  heading: string;
  body: string;
};

export type Service = {
  slug: string;
  title: string;
  /** lucide-react icon name — see components/icons.tsx */
  icon: string;
  /** real reference photo for the service page hero (in /public/jons-assets) */
  image: string;
  /** one-line summary for cards */
  short: string;
  /** hero tagline on the service page */
  tagline: string;
  /** the "feel" of this corner of the shop (used in page styling/copy) */
  vibe: string;
  /** longer intro paragraph */
  intro: string;
  /** content sections rendered down the page */
  sections: ServiceSection[];
  /** quick bulleted highlights */
  highlights: string[];
  /** whether the homepage Services grid should feature this card */
  featured: boolean;
  /** SEO */
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
};

export const services: Service[] = [
  {
    slug: "photo-finishing",
    title: "Photo Finishing",
    icon: "Image",
    image: "/jons-assets/photo-film-formats_d1450.jpg",
    short:
      "Prints done right — true color, real paper, and an eye that's developed millions of frames.",
    tagline: "Prints with depth, color, and care.",
    vibe: "Film rolls, prints, and the quiet glow of the darkroom.",
    intro:
      "Whether it's a single 4×6 or an album's worth of memories, your photos are printed on real photographic paper and checked by hand. No vending-machine kiosk — just prints that look the way the moment felt.",
    sections: [
      {
        heading: "Real prints, real paper",
        body: "We print on archival photographic paper in standard and enlargement sizes. Colors are balanced by eye, not by an automated guess, so skin tones look like people and skies look like Vermont.",
      },
      {
        heading: "From phone, card, or negative",
        body: "Bring a memory card, a USB stick, your phone, or a shoebox of negatives. We can print from nearly any source and help you pick the sizes that suit each shot.",
      },
      {
        heading: "Enlargements & reprints",
        body: "Have one photo you love? We can enlarge it, touch up the color, and reprint it so it's ready to frame — often the same visit for standard sizes.",
      },
    ],
    highlights: [
      "Standard prints & enlargements",
      "Prints from phone, card, USB, or negatives",
      "Hand-balanced color",
      "Reprints from old prints",
    ],
    featured: true,
    seo: {
      title: "Photo Finishing & Printing | Jon's Darkroom — Essex Junction, VT",
      description:
        "Real photographic prints and enlargements at Essex Junction's local photo lab. Print from phone, card, USB, or negatives with hand-balanced color.",
      keywords: [
        "Essex Junction photo lab",
        "local photo printing Vermont",
        "film processing Vermont",
        "photo enlargements Essex Junction",
      ],
    },
  },
  {
    slug: "film-processing",
    title: "Film Processing",
    icon: "Film",
    image: "/jons-assets/film_d1450.jpg",
    short:
      "C-41, black & white, and that roll you found in a drawer — developed and scanned with care.",
    tagline: "Your negatives, brought back to light.",
    vibe: "Spools, chemistry, and the patient work of developing a roll.",
    intro:
      "Shoot film? So do we. Drop off your rolls for developing, scanning, and prints. We treat that mystery roll from the back of a drawer with the same care as a wedding photographer's portfolio.",
    sections: [
      {
        heading: "Color & black-and-white",
        body: "We handle common color (C-41) and black-and-white films. Ask us about your specific stock — we've seen a few in our time.",
      },
      {
        heading: "Develop, scan, and print",
        body: "Get developed negatives, high-resolution scans for sharing, and prints — choose any combination. Found-film and disposable cameras welcome.",
      },
    ],
    highlights: [
      "Color (C-41) & black-and-white",
      "Develop + scan + print options",
      "Disposable & found-film cameras",
      "Negatives returned to you",
    ],
    featured: false,
    seo: {
      title: "Film Processing & Developing | Jon's Darkroom — Vermont",
      description:
        "Color and black-and-white film developing, scanning, and prints in Essex Junction, VT. Disposable and found-film cameras welcome.",
      keywords: [
        "film processing Vermont",
        "film developing Essex Junction",
        "35mm developing Vermont",
      ],
    },
  },
  {
    slug: "photo-restoration",
    title: "Photo Restoration",
    icon: "Sparkles",
    image: "/jons-assets/tintype-photography-2.jpg",
    short:
      "Cracks, fading, water damage, missing corners — gently repaired so faces come back.",
    tagline: "Faded, torn, or water-stained? Bring it in.",
    vibe: "Cotton gloves, a loupe, and a steady hand over fragile prints.",
    intro:
      "Time is hard on photographs. Jon repairs cracks, tears, fading, and water damage by hand and digitally — carefully restoring the photos that hold your family's history, then printing fresh copies you can keep and share.",
    sections: [
      {
        heading: "What we can fix",
        body: "Faded color, yellowing, cracks, creases, tears, missing corners, water spots, and mold marks. Even badly damaged photos can often be saved — bring it in and we'll tell you honestly what's possible.",
      },
      {
        heading: "The original stays safe",
        body: "We work from a careful scan, so your original is handled with cotton gloves and returned to you untouched. You receive restored prints and a digital file.",
      },
      {
        heading: "One-of-a-kind images",
        body: "Heirloom portraits, military photos, wedding pictures, and the only copy of someone now gone — these are the projects we care about most.",
      },
    ],
    highlights: [
      "Repairs cracks, tears & fading",
      "Water & mold damage",
      "Originals handled with cotton gloves",
      "Restored prints + digital file",
    ],
    featured: true,
    seo: {
      title: "Photo Restoration | Jon's Darkroom — Vermont Photo Repair",
      description:
        "Hand and digital photo restoration in Essex Junction, VT. Repair fading, cracks, tears, and water damage to preserve treasured family photographs.",
      keywords: [
        "Vermont photo restoration",
        "photo repair Essex Junction",
        "restore old family photos Vermont",
      ],
    },
  },
  {
    slug: "custom-framing",
    title: "Custom Framing",
    icon: "Frame",
    image: "/jons-assets/Framing-Services_d400.jpg",
    short:
      "Wood, metal, mats, and museum glass — framed by hand to protect what matters.",
    tagline: "Framed to last a lifetime.",
    vibe: "Frame corners, mat boards, and the smell of cut wood and glass.",
    intro:
      "From a child's artwork to a grandfather's medals, custom framing protects and presents the things you love. We help you choose frame, mat, and glass in person — and build it right here in the shop.",
    sections: [
      {
        heading: "Choose it together",
        body: "Bring your piece in and we'll lay frame corners and mat boards right next to it. You'll see exactly how it looks before we build a thing.",
      },
      {
        heading: "Built to protect",
        body: "Acid-free mats and backing, UV-protective glass, and proper mounting keep artwork, photos, and textiles safe from fading and time.",
      },
      {
        heading: "Almost anything",
        body: "Photos, art, diplomas, jerseys, medals, shadow boxes, needlework, records, and odd-shaped keepsakes. If it matters to you, we'll find a way to frame it.",
      },
    ],
    highlights: [
      "Hand-built wood & metal frames",
      "Acid-free mats & backing",
      "UV-protective & museum glass",
      "Shadow boxes & objects",
    ],
    featured: true,
    seo: {
      title: "Custom Picture Framing | Jon's Darkroom — Essex Junction, VT",
      description:
        "Custom picture framing in Essex Junction, VT. Hand-built frames, acid-free mats, and UV glass for photos, art, diplomas, jerseys, and keepsakes.",
      keywords: [
        "custom framing Essex Junction",
        "picture framing Vermont",
        "shadow box framing Essex Junction",
      ],
    },
  },
  {
    slug: "camera-equipment",
    title: "Camera Equipment",
    icon: "Camera",
    image: "/jons-assets/3c5af7f21c1e44ff9d0fbacbfa2ac97f.jpg",
    short:
      "New, used, and vintage cameras, lenses, and gear — plus we buy and sell.",
    tagline: "Cameras with stories, and gear you can hold first.",
    vibe: "Glass display cases, old bodies, and lenses under warm light.",
    intro:
      "A real camera counter, run by someone who actually shoots. Browse film and digital cameras, lenses, and accessories — and ask questions you'd never ask a website. We also buy and sell used gear.",
    sections: [
      {
        heading: "New, used & vintage",
        body: "Film bodies, digital cameras, lenses, flashes, tripods, bags, batteries, and the little accessories that always go missing. Inventory changes often — call ahead for a specific item.",
      },
      {
        heading: "We buy & sell used gear",
        body: "Have a camera collecting dust? Bring it in for an honest look. Selling your collection, or hunting for that one lens? We can help both ways.",
      },
      {
        heading: "Try before you buy",
        body: "Hold it, feel the weight, hear the shutter. We'll show you how it works and make sure it fits your hands and your budget.",
      },
    ],
    highlights: [
      "Film & digital cameras",
      "Lenses & accessories",
      "We buy & sell used gear",
      "Honest, in-person advice",
    ],
    featured: true,
    seo: {
      title: "Camera Equipment — Buy & Sell | Jon's Darkroom, Essex Junction VT",
      description:
        "New, used, and vintage cameras, lenses, and accessories in Essex Junction, VT. We buy and sell used camera gear with honest, in-person advice.",
      keywords: [
        "camera equipment Essex Junction",
        "used cameras Vermont",
        "buy sell cameras Essex Junction",
      ],
    },
  },
  {
    slug: "video-transfers",
    title: "Video Transfers",
    icon: "Clapperboard",
    image: "/jons-assets/Video-Tapes_d1450.jpg",
    short:
      "VHS, tapes, films, and slides moved to digital before they fade for good.",
    tagline: "Save the home movies before the tape gives out.",
    vibe: "A stack of labeled tapes — 'Family Vacation 1993' — waiting to be saved.",
    intro:
      "Magnetic tape doesn't last forever, and the players are disappearing. We transfer VHS, camcorder tapes, film reels, slides, and more to digital files and discs so your family movies survive the next thirty years.",
    sections: [
      {
        heading: "Formats we transfer",
        body: "VHS, VHS-C, MiniDV, 8mm/Hi8 camcorder tapes, audio cassettes, slides, and film reels. Not sure what you've got? Bring the box and we'll sort it out together.",
      },
      {
        heading: "Why now matters",
        body: "Tape degrades a little every year, and the machines that read it are getting rare. The sooner old media is digitized, the more of it we can save cleanly.",
      },
      {
        heading: "Digital files you can share",
        body: "Receive digital files (and discs if you'd like) you can copy, back up, and send to family anywhere. Your originals come back to you.",
      },
    ],
    highlights: [
      "VHS, VHS-C, MiniDV, 8mm/Hi8",
      "Slides & film reels",
      "Audio cassettes",
      "Digital files + discs",
    ],
    featured: true,
    seo: {
      title: "Video Transfers — VHS to Digital | Jon's Darkroom, Vermont",
      description:
        "Transfer VHS, camcorder tapes, film reels, and slides to digital in Essex Junction, VT. Preserve home movies before the tape fades.",
      keywords: [
        "video transfer Vermont",
        "VHS to digital Essex Junction",
        "convert home movies Vermont",
      ],
    },
  },
  {
    slug: "passport-photos",
    title: "Passport & Visa Photos",
    icon: "BadgeCheck",
    image: "/jons-assets/Passport-Photos_d400.jpg",
    short:
      "Fast, correct, government-compliant passport and visa photos while you wait.",
    tagline: "In and out, done right the first time.",
    vibe: "A clean backdrop, good light, and a photo that won't get rejected.",
    intro:
      "Need a passport or visa photo? We take them in minutes, to the correct size and specification, so your application sails through. Walk in — no appointment needed for standard passport photos.",
    sections: [
      {
        heading: "Done to spec",
        body: "Correct dimensions, background, and head position for U.S. passports and most visas. We know the rules so your photo isn't the reason for a delay.",
      },
      {
        heading: "While you wait",
        body: "Most passport photos take just a few minutes. For specialty country or visa requirements, give us a quick call first so we can confirm the exact specs.",
      },
    ],
    highlights: [
      "U.S. passport photos",
      "Visa & ID photos",
      "Government-compliant sizing",
      "Walk-in, done in minutes",
    ],
    featured: true,
    seo: {
      title: "Passport & Visa Photos | Jon's Darkroom — Essex Junction, VT",
      description:
        "Fast, compliant passport and visa photos in Essex Junction, VT. Walk in and get correctly sized U.S. passport, visa, and ID photos in minutes.",
      keywords: [
        "passport photos Essex Junction",
        "visa photos Vermont",
        "passport photo near me Essex Junction",
      ],
    },
  },
  {
    slug: "photo-gifts",
    title: "Photo Gifts",
    icon: "Gift",
    image: "/jons-assets/Novelty-photo-gifts_d400.jpg",
    short:
      "Mugs, magnets, ornaments, calendars, and novelty keepsakes from your favorite photos.",
    tagline: "Turn a photo into something they'll keep.",
    vibe: "Warm, family-oriented — a shelf of finished keepsakes.",
    intro:
      "Some memories deserve to leave the album. Put a favorite photo on a mug, a magnet, an ornament, a calendar, or another keepsake — thoughtful, personal gifts made right here in the shop.",
    sections: [
      {
        heading: "Make it personal",
        body: "Bring a photo (or a few) and we'll help you choose the gift. Great for grandparents, holidays, memorials, weddings, and 'I didn't know what to get them.'",
      },
      {
        heading: "Seasonal favorites",
        body: "Photo ornaments and calendars are popular around the holidays — come early in the season so we can get them perfect in time.",
      },
    ],
    highlights: [
      "Mugs, magnets & ornaments",
      "Photo calendars",
      "Memorial & holiday keepsakes",
      "Made in the shop",
    ],
    featured: true,
    seo: {
      title: "Novelty Photo Gifts | Jon's Darkroom — Essex Junction, VT",
      description:
        "Personalized photo gifts in Essex Junction, VT — mugs, magnets, ornaments, calendars, and keepsakes made from your favorite photos.",
      keywords: [
        "photo gifts Essex Junction",
        "personalized photo gifts Vermont",
        "photo mugs ornaments Vermont",
      ],
    },
  },
];

/** Lookup helpers */
export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getFeaturedServices(): Service[] {
  return services.filter((s) => s.featured);
}

export const allServiceSlugs = services.map((s) => s.slug);
