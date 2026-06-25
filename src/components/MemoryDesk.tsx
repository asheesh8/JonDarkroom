import { MemoryDeskObject, type DeskObject } from "./MemoryDeskObject";

/**
 * The Memory Desk — the homepage's signature interactive section.
 *
 * You're looking down at Jon's workbench. Scattered across the wood are the
 * objects of his trade; each one is a doorway into a part of the shop.
 * Mobile-first: a tidy grid on small screens, a scattered desk on large ones.
 */
const objects: DeskObject[] = [
  {
    kind: "camera",
    label: "Vintage Camera",
    hint: "Camera Gear",
    href: "/services/camera-equipment",
    tilt: -4,
  },
  {
    kind: "frame",
    label: "Framed Portrait",
    hint: "Custom Framing",
    href: "/services/custom-framing",
    tilt: 3,
  },
  {
    kind: "film",
    label: "35mm Film Roll",
    hint: "Photo Finishing",
    href: "/services/photo-finishing",
    tilt: -2,
  },
  {
    kind: "vhs",
    label: "“Family Vacation 1993”",
    hint: "Video Transfers",
    href: "/services/video-transfers",
    tilt: 4,
  },
  {
    kind: "polaroids",
    label: "Stack of Polaroids",
    hint: "Stories From The Darkroom",
    href: "/stories",
    tilt: -3,
  },
  {
    kind: "newspaper",
    label: "Newspaper Article",
    hint: "Jon In The Press",
    href: "/jon-in-the-press",
    tilt: 2,
  },
  {
    kind: "note",
    label: "Thank-You Note",
    hint: "Contact Jon",
    href: "/contact",
    tilt: -3,
  },
  {
    kind: "loupe",
    label: "Magnifying Loupe",
    hint: "Photo Restoration",
    href: "/services/photo-restoration",
    tilt: 5,
  },
  {
    kind: "gloves",
    label: "Restoration Gloves",
    hint: "About Jon",
    href: "/about",
    tilt: -2,
  },
];

export function MemoryDesk() {
  return (
    <div className="relative">
      {/* the desk surface */}
      <div className="surface-wood grain relative overflow-hidden rounded-[2.5rem] border border-brass/30 p-5 shadow-counter sm:p-8">
        {/* warm lamp glow from the top-left, like a desk lamp */}
        <div
          className="pointer-events-none absolute -left-10 -top-16 h-72 w-72 rounded-full bg-brass/20 blur-3xl"
          aria-hidden="true"
        />
        {/* engraved brass nameplate */}
        <div className="relative z-10 mb-6 flex items-center justify-center">
          <span className="rounded-full border border-brass/40 bg-espresso/60 px-4 py-1.5 text-[0.65rem] uppercase tracking-[0.35em] text-brass shadow-brass">
            Jon&apos;s Workbench
          </span>
        </div>

        <ul className="relative z-10 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
          {objects.map((obj) => (
            <li key={obj.kind}>
              <MemoryDeskObject object={obj} />
            </li>
          ))}
        </ul>

        <p className="relative z-10 mt-6 text-center text-sm italic text-cream/55">
          Pick something up — every object opens a part of the shop.
        </p>
      </div>
    </div>
  );
}
