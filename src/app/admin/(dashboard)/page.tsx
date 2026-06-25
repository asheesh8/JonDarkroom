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
  ShieldCheck,
  Clock,
  MessageSquareQuote,
} from "lucide-react";
import { MockNotice } from "@/components/admin/AdminForm";
import { blogPosts } from "@/data/blogPosts";
import { services } from "@/data/services";
import { galleryImages, inventory } from "@/data/gallery";
import { businessInfo } from "@/data/businessInfo";
import { googleReviewSummary } from "@/data/reviews";

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
    <div className="space-y-10">
      <div className="relative overflow-hidden rounded-3xl border border-brass/25 bg-[#241810]/75 p-6 shadow-counter sm:p-8">
        <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-brass/10 blur-3xl" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow text-brass">Admin counter</p>
            <h1 className="mt-3 font-serif text-3xl text-cream sm:text-5xl">
              Welcome back, Jon
            </h1>
            <p className="mt-3 max-w-2xl text-cream/65">
              Keep the public site tidy: update stories, services, hours,
              gallery images, press mentions, and the shop display case.
            </p>
          </div>
          <div className="grid gap-3 text-sm text-cream/70 sm:grid-cols-3 lg:min-w-[420px]">
            <div className="rounded-2xl border border-brass/20 bg-espresso/55 p-4">
              <ShieldCheck className="mb-2 h-5 w-5 text-brass" />
              Login: JON
            </div>
            <div className="rounded-2xl border border-brass/20 bg-espresso/55 p-4">
              <Clock className="mb-2 h-5 w-5 text-brass" />
              Mon-Fri {businessInfo.hours[0].hours}
            </div>
            <div className="rounded-2xl border border-brass/20 bg-espresso/55 p-4">
              <MessageSquareQuote className="mb-2 h-5 w-5 text-brass" />
              {googleReviewSummary.rating} Google rating
            </div>
          </div>
        </div>
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
      <section>
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-brass">Next edits</p>
            <h2 className="mt-2 font-serif text-2xl text-cream">
              Quick actions
            </h2>
          </div>
          <Link
            href="/"
            target="_blank"
            className="hidden text-sm text-brass hover:underline sm:inline"
          >
            View live site
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {quick.map((q) => (
            <Link
              key={q.href}
              href={q.href}
              className="group flex items-start gap-4 rounded-2xl border border-brass/20 bg-[#241810]/70 p-5 transition hover:-translate-y-0.5 hover:border-brass/50 hover:bg-[#2b1d14]/80"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-brass/30 bg-espresso text-brass">
                <q.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>
                <span className="flex items-center gap-1.5 font-medium text-cream">
                  {q.label}
                  <ArrowRight className="h-4 w-4 text-brass opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100" aria-hidden="true" />
                </span>
                <span className="mt-1 block text-sm text-cream/55">
                  {q.desc}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* announcement reminder */}
      <div className="rounded-2xl border border-brass/20 bg-[#241810]/70 p-5">
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
