import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { type ReactNode } from "react";

type Crumb = { label: string; href?: string };

/**
 * Standard inner-page hero on dark wood with breadcrumbs and an optional
 * eyebrow + tagline. Keeps every section page feeling like part of one shop.
 */
export function PageHero({
  eyebrow,
  title,
  tagline,
  crumbs = [],
  children,
}: {
  eyebrow?: string;
  title: string;
  tagline?: string;
  crumbs?: Crumb[];
  children?: ReactNode;
}) {
  return (
    <section className="surface-wood relative overflow-hidden border-b border-brass/25">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-brass/25"
        aria-hidden="true"
      />
      <div className="shell relative py-16 sm:py-20">
        {crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-cream/55">
              {crumbs.map((c, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  {c.href ? (
                    <Link href={c.href} className="hover:text-brass">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-brass">{c.label}</span>
                  )}
                  {i < crumbs.length - 1 && (
                    <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {eyebrow && <p className="eyebrow text-brass">{eyebrow}</p>}
        <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-tight text-cream text-balance sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <div className="mt-5 h-px w-24 hairline-brass" />
        {tagline && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-cream/75">
            {tagline}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
