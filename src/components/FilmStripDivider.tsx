import { cn } from "@/lib/utils";

/**
 * A 35mm film-strip divider: a black band with sprocket perforations top and
 * bottom. Used between sections to reinforce the darkroom feel.
 */
export function FilmStripDivider({
  className,
  label,
}: {
  className?: string;
  label?: string;
}) {
  return (
    <div
      className={cn("relative isolate select-none", className)}
      aria-hidden="true"
    >
      <div className="film-strip flex h-12 items-center justify-between px-2">
        <Perforations />
        {label && (
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[0.6rem] font-semibold uppercase tracking-[0.4em] text-cream/40">
            {label}
          </span>
        )}
        <Perforations bottom />
      </div>
    </div>
  );
}

function Perforations({ bottom = false }: { bottom?: boolean }) {
  // a row of rounded "sprocket holes"
  return (
    <div
      className={cn(
        "absolute inset-x-0 flex justify-between px-3",
        bottom ? "bottom-1.5" : "top-1.5",
      )}
    >
      {Array.from({ length: 22 }).map((_, i) => (
        <span
          key={i}
          className="h-2.5 w-3.5 rounded-[2px] bg-cream/85 shadow-[inset_0_0_2px_rgba(0,0,0,0.6)]"
        />
      ))}
    </div>
  );
}
