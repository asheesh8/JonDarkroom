import { cn } from "@/lib/utils";
import { ShopImage } from "./ShopImage";

/**
 * A polaroid-style image card with a handwritten caption on the white border.
 * `tilt` gives a gently scattered, handmade look.
 */
export function PolaroidImageCard({
  src,
  alt,
  caption,
  tilt = 0,
  className,
  variant = "photo",
}: {
  src: string;
  alt: string;
  caption?: string;
  tilt?: number;
  className?: string;
  variant?: "photo" | "camera" | "frame" | "newspaper";
}) {
  return (
    <figure
      className={cn("polaroid transition-transform duration-300 hover:-translate-y-1 hover:rotate-0", className)}
      style={{ rotate: `${tilt}deg` }}
    >
      <div className="aspect-square w-full overflow-hidden bg-espresso/10">
        <ShopImage src={src} alt={alt} variant={variant} />
      </div>
      {caption && (
        <figcaption className="absolute inset-x-0 bottom-3 px-3 text-center font-serif text-base text-charcoal/80">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
