import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * A wooden plaque with brass-rimmed edges and four corner screws.
 * Generic shell reused by ServiceCard and other "mounted on the wall" content.
 */
export function WoodPlaqueCard({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
}) {
  return (
    <Tag className={cn("plaque relative grain overflow-hidden p-7 sm:p-8", className)}>
      {/* corner screws */}
      <span className="plaque-screw left-4 top-4" aria-hidden="true" />
      <span className="plaque-screw right-4 top-4" aria-hidden="true" />
      <span className="plaque-screw bottom-4 left-4" aria-hidden="true" />
      <span className="plaque-screw bottom-4 right-4" aria-hidden="true" />
      <div className="relative z-10">{children}</div>
    </Tag>
  );
}
