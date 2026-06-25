import {
  Image,
  Film,
  Sparkles,
  Frame,
  Camera,
  Clapperboard,
  BadgeCheck,
  Gift,
  type LucideIcon,
} from "lucide-react";

/**
 * Maps the string `icon` field on data records to a real lucide-react icon.
 * Keeps the data files serializable (database-ready) — they store icon *names*,
 * not component references.
 */
const iconMap: Record<string, LucideIcon> = {
  Image,
  Film,
  Sparkles,
  Frame,
  Camera,
  Clapperboard,
  BadgeCheck,
  Gift,
};

export function ServiceIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = iconMap[name] ?? Image;
  return <Icon className={className} aria-hidden="true" />;
}
