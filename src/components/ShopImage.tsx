import { cn } from "@/lib/utils";

/**
 * Renders an image *or* a handcrafted placeholder.
 *
 * Every `src` in the data files currently points at a `placeholder-*.svg` that
 * doesn't exist on disk yet — so for those we draw a warm, on-brand placeholder
 * (a vintage "frame" with the alt text) instead of a broken image. As soon as
 * Jon uploads real photos (or you wire up Supabase Storage and the paths stop
 * containing "placeholder"), the same component renders the actual <img>.
 *
 * TODO: when using Supabase Storage, swap the <img> for next/image and add the
 *       storage hostname to next.config.mjs `images.remotePatterns`.
 */
export function ShopImage({
  src,
  alt,
  className,
  variant = "photo",
}: {
  src: string;
  alt: string;
  className?: string;
  variant?: "photo" | "newspaper" | "camera" | "frame";
}) {
  const isPlaceholder = !src || src.includes("placeholder");

  if (!isPlaceholder) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={cn("h-full w-full object-cover", className)}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={cn(
        "relative flex h-full w-full items-center justify-center overflow-hidden",
        tone[variant],
        className,
      )}
    >
      <Decoration variant={variant} />
      <span className="relative z-10 max-w-[80%] px-4 text-center text-[0.7rem] font-medium uppercase tracking-[0.2em] text-espresso/55">
        {label[variant]}
      </span>
    </div>
  );
}

const tone: Record<string, string> = {
  photo: "bg-gradient-to-br from-[#e9dcc4] to-[#cdb892]",
  newspaper: "bg-[#e7ddc7]",
  camera: "bg-gradient-to-br from-[#3a2a20] to-[#1f150e]",
  frame: "bg-gradient-to-br from-[#e3d2b2] to-[#c2a878]",
};

const label: Record<string, string> = {
  photo: "Photo placeholder",
  newspaper: "Clipping placeholder",
  camera: "Item photo placeholder",
  frame: "Framing placeholder",
};

function Decoration({ variant }: { variant: string }) {
  if (variant === "camera") {
    // a simple camera silhouette in brass
    return (
      <svg
        viewBox="0 0 120 90"
        className="absolute inset-0 m-auto h-1/2 w-1/2 text-brass/40"
        fill="none"
        aria-hidden="true"
      >
        <rect x="10" y="22" width="100" height="56" rx="8" stroke="currentColor" strokeWidth="3" />
        <circle cx="60" cy="50" r="18" stroke="currentColor" strokeWidth="3" />
        <circle cx="60" cy="50" r="8" stroke="currentColor" strokeWidth="2" />
        <rect x="40" y="12" width="24" height="12" rx="3" stroke="currentColor" strokeWidth="3" />
        <circle cx="96" cy="34" r="3" fill="currentColor" />
      </svg>
    );
  }
  if (variant === "newspaper") {
    return (
      <svg
        viewBox="0 0 120 90"
        className="absolute inset-0 m-auto h-2/3 w-2/3 text-walnut/25"
        aria-hidden="true"
      >
        {Array.from({ length: 7 }).map((_, i) => (
          <rect
            key={i}
            x="14"
            y={18 + i * 9}
            width={i === 0 ? 92 : 78 + ((i * 13) % 20)}
            height="4"
            rx="2"
            fill="currentColor"
          />
        ))}
      </svg>
    );
  }
  // photo / frame — corner ticks like a viewfinder
  return (
    <svg
      viewBox="0 0 120 90"
      className="absolute inset-0 h-full w-full text-espresso/20"
      aria-hidden="true"
    >
      <path d="M12 12h22M12 12v18" stroke="currentColor" strokeWidth="3" />
      <path d="M108 12H86M108 12v18" stroke="currentColor" strokeWidth="3" />
      <path d="M12 78h22M12 78V60" stroke="currentColor" strokeWidth="3" />
      <path d="M108 78H86M108 78V60" stroke="currentColor" strokeWidth="3" />
    </svg>
  );
}
