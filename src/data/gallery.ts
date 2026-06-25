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
    src: "/jons-assets/placeholder-gallery-1.svg",
    alt: "A restored family portrait in a hand-built wooden frame",
    caption: "Restored & framed — 1952",
    tag: "Restoration",
  },
  {
    id: "g-2",
    src: "/jons-assets/placeholder-gallery-2.svg",
    alt: "A stack of fresh photographic prints fanned out on the counter",
    caption: "Fresh prints, real paper",
    tag: "Photo Finishing",
  },
  {
    id: "g-3",
    src: "/jons-assets/placeholder-gallery-3.svg",
    alt: "A vintage rangefinder camera in a warm-lit glass display case",
    caption: "From the display case",
    tag: "Camera Gear",
  },
  {
    id: "g-4",
    src: "/jons-assets/placeholder-gallery-4.svg",
    alt: "A child's hockey jersey mounted in a deep shadow box frame",
    caption: "Shadow box framing",
    tag: "Framing",
  },
  {
    id: "g-5",
    src: "/jons-assets/placeholder-gallery-5.svg",
    alt: "A loupe resting on a sheet of 35mm negatives",
    caption: "Reading the negatives",
    tag: "Film",
  },
  {
    id: "g-6",
    src: "/jons-assets/placeholder-gallery-6.svg",
    alt: "Polaroids and a thank-you note pinned to a cork board",
    caption: "Notes from the neighborhood",
    tag: "Local",
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
    title: "Heirloom portrait",
    material: "Walnut frame · cream mat · museum glass",
    image: "/jons-assets/placeholder-frame-1.svg",
    alt: "A family portrait in a walnut frame with a wide cream mat",
  },
  {
    id: "f-2",
    title: "Veteran's medals",
    material: "Shadow box · suede mat · UV glass",
    image: "/jons-assets/placeholder-frame-2.svg",
    alt: "Military medals arranged in a deep shadow box frame",
  },
  {
    id: "f-3",
    title: "Diploma & tassel",
    material: "Black & gold frame · double mat",
    image: "/jons-assets/placeholder-frame-3.svg",
    alt: "A framed diploma with a graduation tassel and double mat",
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
    name: "Canon AE-1 Program",
    category: "Camera",
    brand: "Canon",
    era: "1981",
    condition: "Excellent",
    status: "available",
    price: 245,
    blurb: "The 35mm SLR that taught a generation to shoot.",
    description:
      "A clean, fully working AE-1 Program with a smooth shutter and bright viewfinder. Light seals have been replaced. A forgiving, beautifully built camera — the one I hand to people who want to learn film without fighting their gear.",
    specs: [
      { label: "Format", value: "35mm film" },
      { label: "Mount", value: "Canon FD" },
      { label: "Shutter", value: "1/1000s – 2s, B" },
      { label: "Metering", value: "Program AE + manual" },
      { label: "Tested", value: "Yes — film run through" },
    ],
    image: "/jons-assets/placeholder-cam-ae1.svg",
    alt: "Canon AE-1 Program 35mm film SLR camera",
  },
  {
    id: "inv-2",
    name: "Nikkor 50mm f/1.8 Ai-S",
    category: "Lens",
    brand: "Nikon",
    era: "1980s",
    condition: "Mint",
    status: "available",
    price: 120,
    blurb: "The 'nifty fifty' — sharp, fast, and nearly indestructible.",
    description:
      "Glass is clean and clear, no fungus or haze, with smooth focus and a snappy aperture ring. A perfect first prime: tack-sharp stopped down, dreamy wide open, and built like it'll outlive all of us.",
    specs: [
      { label: "Focal length", value: "50mm" },
      { label: "Max aperture", value: "f/1.8" },
      { label: "Mount", value: "Nikon F (Ai-S)" },
      { label: "Glass", value: "Clean — no fungus/haze" },
      { label: "Filter", value: "52mm" },
    ],
    image: "/jons-assets/placeholder-lens-50.svg",
    alt: "Nikkor 50mm f/1.8 Ai-S prime lens",
  },
  {
    id: "inv-3",
    name: "Polaroid SX-70",
    category: "Camera",
    brand: "Polaroid",
    era: "1972",
    condition: "Good",
    status: "on-hold",
    price: 310,
    blurb: "Folding instant-film icon — still magic in the hand.",
    description:
      "A genuine folding SX-70 in good cosmetic shape with working bellows and ejection. Takes modern instant film. A conversation piece that still makes pictures — currently on hold for a customer, ask about the waitlist.",
    specs: [
      { label: "Format", value: "Instant (SX-70 type)" },
      { label: "Type", value: "Folding SLR" },
      { label: "Bellows", value: "Light-tight" },
      { label: "Film", value: "Modern instant available" },
      { label: "Status", value: "On hold" },
    ],
    image: "/jons-assets/placeholder-cam-sx70.svg",
    alt: "Polaroid SX-70 folding instant film camera",
  },
  {
    id: "inv-4",
    name: "Vivitar 285HV Flash",
    category: "Accessory",
    brand: "Vivitar",
    era: "1990s",
    condition: "Good",
    status: "available",
    price: 65,
    blurb: "The legendary workhorse auto-thyristor flash.",
    description:
      "A powerful, reliable shoe-mount flash with tilt/swivel head and auto-thyristor metering. Fires consistently and recycles quickly. Great for film or digital with a standard hot shoe.",
    specs: [
      { label: "Type", value: "Shoe-mount flash" },
      { label: "Head", value: "Tilt / swivel" },
      { label: "Metering", value: "Auto-thyristor + manual" },
      { label: "Power", value: "4× AA" },
      { label: "Tested", value: "Yes — fires & recycles" },
    ],
    image: "/jons-assets/placeholder-flash.svg",
    alt: "Vivitar 285HV shoe-mount camera flash",
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
