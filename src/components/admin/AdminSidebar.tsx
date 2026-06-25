"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Newspaper,
  PlusSquare,
  Wrench,
  Store,
  Star,
  Images,
  LogOut,
  Aperture,
  ExternalLink,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard, exact: true },
  { label: "Stories / Blog", href: "/admin/blog", icon: Newspaper },
  { label: "New Story", href: "/admin/blog/new", icon: PlusSquare },
  { label: "Services", href: "/admin/services", icon: Wrench },
  { label: "Business Info", href: "/admin/business-info", icon: Store },
  { label: "Featured Article", href: "/admin/featured-article", icon: Star },
  { label: "Gallery & Inventory", href: "/admin/gallery", icon: Images },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + "/");

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <>
      {/* mobile bar */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-brass/20 bg-espresso px-4 py-3 lg:hidden">
        <span className="flex items-center gap-2 font-serif text-cream">
          <Aperture className="h-5 w-5 text-brass" /> Admin
        </span>
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle admin menu"
          className="grid h-9 w-9 place-items-center rounded border border-brass/40 text-cream"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <aside
        className={cn(
          "z-30 w-full shrink-0 border-r border-brass/20 bg-espresso lg:sticky lg:top-0 lg:block lg:h-screen lg:w-64",
          open ? "block" : "hidden lg:block",
        )}
      >
        <div className="flex h-full flex-col p-4">
          <Link
            href="/admin"
            className="mb-6 hidden items-center gap-2.5 px-2 lg:flex"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full border border-brass/60 text-brass">
              <Aperture className="h-5 w-5" />
            </span>
            <span className="leading-tight">
              <span className="block font-serif text-cream">Jon&apos;s Darkroom</span>
              <span className="block text-[0.6rem] uppercase tracking-[0.25em] text-brass">
                Admin
              </span>
            </span>
          </Link>

          <nav className="flex-1 space-y-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition",
                  isActive(item.href, item.exact)
                    ? "bg-brass/15 text-brass"
                    : "text-cream/70 hover:bg-white/5 hover:text-cream",
                )}
              >
                <item.icon className="h-4 w-4" aria-hidden="true" />
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-4 space-y-1 border-t border-brass/15 pt-4">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-cream/70 transition hover:bg-white/5 hover:text-cream"
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              View live site
            </Link>
            <button
              onClick={logout}
              className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm text-burgundy transition hover:bg-burgundy/10"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Sign out
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
