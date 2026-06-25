/**
 * Gallery & inventory data.
 *
 * Covers:
 *  - galleryImages: general polaroid/showcase placeholders (managed in /admin/gallery)
 *  - restorationPairs: before/after restoration examples
 *  - framingShowcase: custom framing examples
 *  - inventory: camera-equipment items shown as polished "display case" cards.
 *    This is the template Jon will use in the admin to add/edit items, prices,
 *    and descriptions.
 *
 * TODO: Move images to Supabase Storage and rows to Supabase tables
 *       (`gallery`, `inventory`). Each item keeps `image` as a storage path.
 */

export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  tag: string;
};

export const galleryImages: GalleryImage[] = [
  {
    id: "g-1",
    src: "/jons-assets/Framing-Services_d400.jpg",
    alt: "Custom framing samples at Jon's Darkroom & Frameshop",
    caption: "Custom framing",
    tag: "Framing",
  },
  {
    id: "g-2",
    src: "/jons-assets/photo-film-formats_d1450.jpg",
    alt: "A range of photo and film formats handled in the lab",
    caption: "Every format, finished",
    tag: "Photo Finishing",
  },
  {
    id: "g-3",
    src: "/jons-assets/3c5af7f21c1e44ff9d0fbacbfa2ac97f.jpg",
    alt: "A 35mm film camera with a roll of film",
    caption: "From the camera counter",
    tag: "Camera Gear",
  },
  {
    id: "g-4",
    src: "/jons-assets/Video-Tapes_d1450.jpg",
    alt: "A collection of old video tapes ready for transfer to digital",
    caption: "Saved before they fade",
    tag: "Video Transfers",
  },
  {
    id: "g-5",
    src: "/jons-assets/film_d1450.jpg",
    alt: "Rolls of film ready for processing",
    caption: "Film, developed with care",
    tag: "Film",
  },
  {
    id: "g-6",
    src: "/jons-assets/Novelty-photo-gifts_d400.jpg",
    alt: "Novelty photo gifts made in the shop",
    caption: "Gifts from your photos",
    tag: "Photo Gifts",
  },
];

export type BeforeAfter = {
  id: string;
  title: string;
  note: string;
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
};

export const restorationPairs: BeforeAfter[] = [
  {
    id: "ba-1",
    title: "Water-damaged portrait, 1948",
    note: "Faded color and a crease through the face — rebuilt by hand and reprinted.",
    before: "/jons-assets/placeholder-restore-before.svg",
    after: "/jons-assets/placeholder-restore-after.svg",
    beforeAlt: "A cracked, water-stained black-and-white portrait before restoration",
    afterAlt: "The same portrait restored, clean and sharp, after Jon's work",
  },
];

/**
 * Real photo-restoration example images from Jon's site.
 * Shown as honest "examples" (not fabricated before/after pairs).
 */
export const restorationExamples: GalleryImage[] = [
  {
    id: "re-1",
    src: "/jons-assets/Soldier_d400.jpg",
    alt: "A restored vintage portrait of a soldier",
    caption: "Vintage portrait",
    tag: "Restoration",
  },
  {
    id: "re-2",
    src: "/jons-assets/3-Kids_d400.jpg",
    alt: "A restored old family photograph of three children",
    caption: "Family photograph",
    tag: "Restoration",
  },
  {
    id: "re-3",
    src: "/jons-assets/Boy_d400.jpg",
    alt: "A restored old portrait of a young boy",
    caption: "Childhood portrait",
    tag: "Restoration",
  },
  {
    id: "re-4",
    src: "/jons-assets/tintype-photography-2.jpg",
    alt: "An antique tintype photograph",
    caption: "Antique tintype",
    tag: "Restoration",
  },
];

export type FramePiece = {
  id: string;
  title: string;
  material: string;
  image: string;
  alt: string;
};

export const framingShowcase: FramePiece[] = [
  {
    id: "f-1",
    title: "Wooden frame corners",
    material: "Hand-built wood mouldings",
    image: "/jons-assets/wooden-farme-corners_d600.jpg",
    alt: "A selection of wooden frame corner samples",
  },
  {
    id: "f-2",
    title: "Mat board choices",
    material: "Acid-free mats in every color",
    image: "/jons-assets/Mat-choices_d600.jpg",
    alt: "A fan of mat board color choices for custom framing",
  },
  {
    id: "f-3",
    title: "Metal frame corners",
    material: "Sleek aluminum profiles",
    image: "/jons-assets/metal-corners_d600.jpg",
    alt: "Metal frame corner samples in several finishes",
  },
];

/**
 * Inventory — the camera-equipment "display case" items.
 * These render as polished retro cards. The detail card layout is the template
 * Jon edits in the admin (title, price, condition, description, specs).
 */
export type InventoryCondition = "Mint" | "Excellent" | "Good" | "Fair" | "For Parts";
export type InventoryStatus = "available" | "on-hold" | "sold";

export type InventoryItem = {
  id: string;
  name: string;
  category: "Camera" | "Lens" | "Accessory";
  brand: string;
  era: string;
  condition: InventoryCondition;
  status: InventoryStatus;
  price: number;
  /** short one-liner for the case card */
  blurb: string;
  /** longer description shown when the card opens */
  description: string;
  /** spec rows shown in the detail card */
  specs: { label: string; value: string }[];
  image: string;
  alt: string;
};

export const inventory: InventoryItem[] = [
  {
    id: "inv-1",
    name: "Fujica ST701",
    category: "Camera",
    brand: "Fujica",
    era: "1970s",
    condition: "Good",
    status: "available",
    price: 165,
    blurb: "A classic 35mm SLR with a fast Fujinon 55mm f/1.8 lens.",
    description:
      "A handsome chrome-and-leather Fujica ST701 35mm SLR paired with its sharp Fujinon 55mm f/1.8 prime. A solid, all-mechanical shooter for anyone getting into film. Come hold it — the shutter sounds wonderful.",
    specs: [
      { label: "Format", value: "35mm film" },
      { label: "Type", value: "Mechanical SLR" },
      { label: "Lens", value: "Fujinon 55mm f/1.8" },
      { label: "Mount", value: "M42 screw" },
      { label: "Sample", value: "Reference photo — ask in store" },
    ],
    image: "/jons-assets/06e4ee21726c4abfb4fd69f5cca83fb1.jpg",
    alt: "Fujica ST701 35mm film SLR with Fujinon 55mm lens",
  },
  {
    id: "inv-2",
    name: "Canon EOS 450D DSLR",
    category: "Camera",
    brand: "Canon",
    era: "2008",
    condition: "Excellent",
    status: "available",
    price: 185,
    blurb: "A great first DSLR with an EF 40mm pancake lens.",
    description:
      "A clean Canon EOS 450D (Rebel XSi) body shown here with the excellent EF 40mm f/2.8 STM pancake lens. A capable, easy-to-use entry into digital SLR photography. Ask us what's currently in stock and bundled.",
    specs: [
      { label: "Format", value: "Digital (APS-C)" },
      { label: "Type", value: "DSLR" },
      { label: "Mount", value: "Canon EF / EF-S" },
      { label: "Lens shown", value: "EF 40mm f/2.8 STM" },
      { label: "Sample", value: "Reference photo — ask in store" },
    ],
    image: "/jons-assets/a7e0e2d49f78495fa66fae58086359d8.jpg",
    alt: "Canon EOS 450D DSLR with EF 40mm pancake lens",
  },
  {
    id: "inv-3",
    name: "35mm Point-and-Shoot",
    category: "Camera",
    brand: "Assorted",
    era: "1990s–2000s",
    condition: "Good",
    status: "available",
    price: 75,
    blurb: "Load a roll, point, shoot — film made simple.",
    description:
      "A compact 35mm point-and-shoot, shown loaded with a fresh roll of film. We usually have a few of these on the shelf — a fun, no-fuss way to shoot film. Stop in to see what's currently available.",
    specs: [
      { label: "Format", value: "35mm film" },
      { label: "Type", value: "Auto point-and-shoot" },
      { label: "Film", value: "Standard 35mm rolls" },
      { label: "Selection", value: "Several in stock" },
      { label: "Sample", value: "Reference photo — ask in store" },
    ],
    image: "/jons-assets/3c5af7f21c1e44ff9d0fbacbfa2ac97f.jpg",
    alt: "A 35mm point-and-shoot film camera open with a roll of film",
  },
  {
    id: "inv-4",
    name: "Compact Digital Camera",
    category: "Camera",
    brand: "Assorted",
    era: "Modern",
    condition: "Good",
    status: "available",
    price: 90,
    blurb: "Pocketable zoom compact with a bright LCD and Wi-Fi.",
    description:
      "A tidy compact digital camera with optical zoom, a clear rear screen, and built-in Wi-Fi for easy sharing. Great as a grab-and-go second camera. Models and prices vary — call to check today's stock.",
    specs: [
      { label: "Format", value: "Digital compact" },
      { label: "Zoom", value: "Optical zoom" },
      { label: "Sharing", value: "Built-in Wi-Fi" },
      { label: "Screen", value: "Rear LCD" },
      { label: "Sample", value: "Reference photo — ask in store" },
    ],
    image: "/jons-assets/526af9cdea0d449fba974260c68331f7.jpg",
    alt: "Back of a compact digital camera showing the LCD screen",
  },
];

/** Lookup helpers */
export function getInventoryItem(id: string): InventoryItem | undefined {
  return inventory.find((i) => i.id === id);
}

export const conditionOptions: InventoryCondition[] = [
  "Mint",
  "Excellent",
  "Good",
  "Fair",
  "For Parts",
];

export const statusLabels: Record<InventoryStatus, string> = {
  available: "Available",
  "on-hold": "On Hold",
  sold: "Sold",
};
