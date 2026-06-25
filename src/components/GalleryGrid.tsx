import { PolaroidImageCard } from "./PolaroidImageCard";
import type { GalleryImage } from "@/data/gallery";

/** A scattered wall of polaroids. */
export function GalleryGrid({ images }: { images: GalleryImage[] }) {
  // gentle alternating tilt so it feels pinned by hand, not laid out by a grid
  const tilts = [-2.5, 1.5, -1, 2, -2, 1];

  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-8">
      {images.map((img, i) => (
        <PolaroidImageCard
          key={img.id}
          src={img.src}
          alt={img.alt}
          caption={img.caption}
          tilt={tilts[i % tilts.length]}
        />
      ))}
    </div>
  );
}
