"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Phone, Aperture } from "lucide-react";
import { cn } from "@/lib/utils";
import { businessInfo } from "@/data/businessInfo";

const links: { label: string; href: string }[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Shop", href: "/shop" },
  { label: "About Jon", href: "/about" },
  { label: "Stories", href: "/stories" },
  { label: "In the Press", href: "/jon-in-the-press" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 surface-wood-dark border-b border-brass/25 backdrop-blur-sm">
      <nav className="shell flex h-16 items-center justify-between gap-4">
        {/* Brand */}
        <Link
          href="/"
          className="group flex items-center gap-2.5"
          onClick={() => setOpen(false)}
        >
          <span className="grid h-9 w-9 place-items-center rounded-full border border-brass/60 bg-espresso text-brass shadow-brass transition group-hover:rotate-12">
            <Aperture className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="leading-tight">
            <span className="block font-serif text-lg text-cream">
              Jon&apos;s Darkroom
            </span>
            <span className="block text-[0.6rem] uppercase tracking-[0.3em] text-brass">
              &amp; Frameshop
            </span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={cn(
                  "rounded px-3 py-2 text-sm transition-colors",
                  isActive(l.href)
                    ? "text-brass"
                    : "text-cream/80 hover:text-cream",
                )}
              >
                {l.label}
                {isActive(l.href) && (
                  <span className="mx-auto mt-1 block h-px w-5 hairline-brass" />
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Call CTA (desktop) */}
        <a
          href={`tel:${businessInfo.phoneHref}`}
          className="btn-reset hidden rounded-full border border-brass/50 px-5 py-2 text-sm text-cream hover:bg-brass/10 lg:inline-flex"
        >
          <Phone className="h-4 w-4 text-brass" aria-hidden="true" />
          {businessInfo.phoneDisplay}
        </a>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-2xl border border-brass/40 text-cream lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="surface-wood-dark border-t border-brass/20 lg:hidden">
          <ul className="shell flex flex-col py-3">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block rounded px-3 py-3 text-base",
                    isActive(l.href)
                      ? "text-brass"
                      : "text-cream/85 hover:text-cream",
                  )}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="mt-2 px-3">
              <a
                href={`tel:${businessInfo.phoneHref}`}
                className="btn-reset w-full rounded-full bg-gradient-to-b from-brass-light to-brass-dark px-4 py-3 text-sm font-medium text-espresso"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call {businessInfo.phoneDisplay}
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
