import Link from "next/link";
import { cn } from "@/lib/utils";

export type DeskObjectKind =
  | "camera"
  | "frame"
  | "film"
  | "vhs"
  | "polaroids"
  | "newspaper"
  | "note"
  | "loupe"
  | "gloves";

export type DeskObject = {
  kind: DeskObjectKind;
  label: string;
  hint: string;
  href: string;
  tilt: number;
};

/**
 * One object resting on Jon's workbench. The whole tile is a link.
 * Illustrations are simple brass line-art so the desk feels handcrafted,
 * not like a row of stock icons.
 */
export function MemoryDeskObject({ object }: { object: DeskObject }) {
  return (
    <Link
      href={object.href}
      style={{ rotate: `${object.tilt}deg` }}
      className={cn(
        "group relative block rounded-3xl border border-brass/25 bg-[#231811]/70 p-4 text-center shadow-counter transition-all duration-300",
        "hover:-translate-y-1.5 hover:rotate-0 hover:border-brass/70 hover:bg-[#2c2017]/80 focus-visible:-translate-y-1.5 focus-visible:rotate-0",
      )}
    >
      {/* little nail/pin */}
      <span
        className="absolute left-1/2 top-2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-brass/60"
        aria-hidden="true"
      />
      <div className="mx-auto mt-1 grid h-24 w-full place-items-center">
        <DeskIllustration kind={object.kind} />
      </div>
      <p className="mt-2 font-serif text-base text-cream">{object.label}</p>
      <p className="text-[0.7rem] uppercase tracking-[0.18em] text-brass/80">
        {object.hint}
      </p>
    </Link>
  );
}

/* ----------------------------------------------------------------------------
   Brass line-art illustrations. Stroke uses currentColor (brass).
   ------------------------------------------------------------------------- */
function DeskIllustration({ kind }: { kind: DeskObjectKind }) {
  const common = "h-20 w-20 text-brass-light";
  switch (kind) {
    case "camera":
      return (
        <svg viewBox="0 0 100 80" className={common} fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <rect x="10" y="22" width="80" height="46" rx="6" />
          <rect x="34" y="12" width="22" height="12" rx="2" />
          <circle cx="50" cy="46" r="15" />
          <circle cx="50" cy="46" r="7" />
          <circle cx="78" cy="32" r="2.5" fill="currentColor" />
        </svg>
      );
    case "frame":
      return (
        <svg viewBox="0 0 100 80" className={common} fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <rect x="18" y="8" width="64" height="64" rx="2" />
          <rect x="27" y="17" width="46" height="46" rx="1" />
          <circle cx="50" cy="34" r="7" />
          <path d="M35 56c4-10 26-10 30 0" />
        </svg>
      );
    case "film":
      return (
        <svg viewBox="0 0 100 80" className={common} fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <circle cx="44" cy="40" r="26" />
          <circle cx="44" cy="40" r="9" />
          <rect x="64" y="32" width="26" height="16" rx="2" />
          <path d="M44 14v6M44 60v6M18 40h6M64 40h0" />
        </svg>
      );
    case "vhs":
      return (
        <svg viewBox="0 0 100 80" className={common} fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <rect x="12" y="18" width="76" height="44" rx="4" />
          <rect x="24" y="30" width="52" height="20" rx="2" />
          <circle cx="38" cy="40" r="5" />
          <circle cx="62" cy="40" r="5" />
        </svg>
      );
    case "polaroids":
      return (
        <svg viewBox="0 0 100 80" className={common} fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <rect x="16" y="20" width="44" height="50" rx="2" transform="rotate(-8 38 45)" />
          <rect x="40" y="14" width="44" height="50" rx="2" transform="rotate(7 62 39)" />
          <rect x="48" y="22" width="28" height="22" />
        </svg>
      );
    case "newspaper":
      return (
        <svg viewBox="0 0 100 80" className={common} fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <rect x="16" y="12" width="68" height="56" rx="2" />
          <path d="M24 22h52M24 30h22M50 30h26M24 38h52M24 46h52M24 54h36" />
        </svg>
      );
    case "note":
      return (
        <svg viewBox="0 0 100 80" className={common} fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <path d="M22 14h44l12 12v40H22z" />
          <path d="M66 14v12h12" />
          <path d="M32 36h36M32 44h36M32 52h24" />
        </svg>
      );
    case "loupe":
      return (
        <svg viewBox="0 0 100 80" className={common} fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <circle cx="42" cy="38" r="22" />
          <circle cx="42" cy="38" r="13" />
          <path d="M59 55l18 18" strokeWidth="5" />
        </svg>
      );
    case "gloves":
      return (
        <svg viewBox="0 0 100 80" className={common} fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <path d="M34 70V40c0-3 4-3 4 0v-6c0-3 4-3 4 0v-2c0-3 4-3 4 0v2c0-3 4-3 4 0v6c4-2 8 0 8 5v19" />
          <path d="M30 44l-8-6c-2-2 1-6 4-4l8 6" />
        </svg>
      );
    default:
      return null;
  }
}
