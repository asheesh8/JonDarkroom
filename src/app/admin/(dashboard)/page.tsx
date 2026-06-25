import Link from "next/link";
import {
  Newspaper,
  Wrench,
  Images,
  Star,
  Store,
  PlusSquare,
  ArrowRight,
  Camera,
} from "lucide-react";
import { MockNotice } from "@/components/admin/AdminForm";
import { blogPosts } from "@/data/blogPosts";
import { services } from "@/data/services";
import { galleryImages, inventory } from "@/data/gallery";
import { businessInfo } from "@/data/businessInfo";

export default function AdminDashboard() {
  const stats = [
    { label: "Stories", value: blogPosts.length, href: "/admin/blog", icon: Newspaper },
    { label: "Services", value: services.length, href: "/admin/services", icon: Wrench },
    { label: "Gallery images", value: galleryImages.length, href: "/admin/gallery", icon: Images },
    { label: "Inventory items", value: inventory.length, href: "/admin/gallery", icon: Camera },
  ];

  const quick = [
    { label: "Write a new story", href: "/admin/blog/new", icon: PlusSquare, desc: "Add a post to Stories From The Darkroom." },
    { label: "Edit business info", href: "/admin/business-info", icon: Store, desc: "Update hours, phone, and address." },
    { label: "Set featured article", href: "/admin/featured-article", icon: Star, desc: "Change the homepage press feature." },
    { label: "Manage gallery & inventory", href: "/admin/gallery", icon: Images, desc: "Add photos and camera-case items." },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-cream sm:text-4xl">
          Welcome back, Jon
        </h1>
        <p className="mt-2 text-cream/60">
          Manage the shop&apos;s website — stories, services, hours, and the
          display case.
        </p>
      </div>

      <MockNotice />

      {/* stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="group rounded-xl border border-brass/20 bg-[#241810]/70 p-5 transition hover:border-brass/50"
          >
            <div className="flex items-center justify-between">
              <span className="grid h-10 w-10 place-items-center rounded-xl border border-brass/30 text-brass">
                <s.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <ArrowRight className="h-4 w-4 text-cream/30 transition group-hover:translate-x-1 group-hover:text-brass" aria-hidden="true" />
            </div>
            <p className="mt-4 font-serif text-3xl text-cream">{s.value}</p>
            <p className="text-sm text-cream/55">{s.label}</p>
          </Link>
        ))}
      </div>

      {/* quick actions */}
      <h2 className="mb-4 mt-10 font-serif text-xl text-cream">Quick actions</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {quick.map((q) => (
          <Link
            key={q.href}
            href={q.href}
            className="group flex items-start gap-4 rounded-xl border border-brass/20 bg-[#241810]/70 p-5 transition hover:border-brass/50"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-brass/30 bg-espresso text-brass">
              <q.icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <span>
              <span className="flex items-center gap-1.5 font-medium text-cream">
                {q.label}
                <ArrowRight className="h-4 w-4 text-brass opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100" aria-hidden="true" />
              </span>
              <span className="mt-1 block text-sm text-cream/55">{q.desc}</span>
            </span>
          </Link>
        ))}
      </div>

      {/* announcement reminder */}
      <div className="mt-10 rounded-xl border border-brass/20 bg-[#241810]/70 p-5">
        <h2 className="font-serif text-xl text-cream">Homepage announcement</h2>
        <p className="mt-2 text-sm text-cream/60">
          The shop is currently showing standard hours: Mon–Fri{" "}
          {businessInfo.hours[0].hours}, Sat {businessInfo.hours[5].hours}.
          Update an announcement banner or hours from{" "}
          <Link href="/admin/business-info" className="text-brass hover:underline">
            Business Info
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
