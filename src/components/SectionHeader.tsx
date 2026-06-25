import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** "cream" for dark text on paper sections, "light" for cream text on wood */
  tone?: "cream" | "light";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "light",
  className,
}: Props) {
  const isLight = tone === "light";
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "eyebrow mb-3",
            isLight ? "text-brass" : "text-burgundy",
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.1] text-balance",
          isLight ? "text-cream" : "text-espresso",
        )}
      >
        {title}
      </h2>
      <div
        className={cn(
          "mt-4 h-px w-24 hairline-brass",
          align === "center" && "mx-auto",
        )}
      />
      {description && (
        <p
          className={cn(
            "mt-5 text-base sm:text-lg leading-relaxed",
            isLight ? "text-cream/75" : "text-walnut",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
