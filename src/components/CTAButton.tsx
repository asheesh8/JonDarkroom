import Link from "next/link";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "brass" | "ghost" | "paper";
type Size = "sm" | "md" | "lg";

const base =
  "btn-reset rounded-full font-medium tracking-wide transition-all duration-200 focus-visible:outline-brass disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  // burgundy stamp
  primary:
    "bg-burgundy text-cream shadow-brass hover:bg-[#8d4a4a] hover:-translate-y-0.5 active:translate-y-0",
  // brass plate
  brass:
    "bg-gradient-to-b from-brass-light to-brass-dark text-espresso shadow-brass hover:from-brass hover:to-brass-dark hover:-translate-y-0.5 active:translate-y-0",
  // outlined on dark wood
  ghost:
    "border border-brass/50 text-cream hover:border-brass hover:bg-brass/10",
  // for use on cream sections
  paper:
    "border border-walnut/40 text-walnut hover:bg-walnut hover:text-cream",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm sm:text-base",
  lg: "px-8 py-4 text-base",
};

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
};

type LinkProps = CommonProps & {
  href: string;
  external?: boolean;
};

/** Link-style CTA. Use `external` for tel:/http links. */
export function CTAButton({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  external,
}: LinkProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (external) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

/** Button-element variant (for forms / onClick). */
export function CTAButtonEl({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
