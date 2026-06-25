import Link from "next/link";
import { Phone, MapPin, Clock, Aperture } from "lucide-react";
import {
  businessInfo,
  condensedHours,
  fullAddress,
  directionsUrl,
} from "@/data/businessInfo";
import { services } from "@/data/services";
import { FilmStripDivider } from "./FilmStripDivider";

export function Footer() {
  return (
    <footer className="surface-wood-dark border-t border-brass/25">
      <FilmStripDivider />
      <div className="shell grid gap-10 py-14 md:grid-cols-4">
        {/* Brand + concept */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-full border border-brass/60 text-brass">
              <Aperture className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="font-serif text-lg text-cream">
              Jon&apos;s Darkroom
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-cream/65">
            {businessInfo.tagline} — {businessInfo.concept}
          </p>
          <p className="mt-4 text-xs text-cream/45">
            {businessInfo.yearsServing}+ years serving Essex Junction, Vermont.
          </p>
        </div>

        {/* Services */}
        <div>
          <h3 className="engraved text-sm font-semibold uppercase tracking-widest">
            Services
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {services.slice(0, 7).map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="text-cream/70 transition hover:text-brass"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Explore */}
        <div>
          <h3 className="engraved text-sm font-semibold uppercase tracking-widest">
            Explore
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              { label: "About Jon", href: "/about" },
              { label: "Stories From The Darkroom", href: "/stories" },
              { label: "Jon In The Press", href: "/jon-in-the-press" },
              { label: "Visit the Shop", href: "/contact" },
              { label: "Admin", href: "/admin/login" },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-cream/70 transition hover:text-brass"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Visit */}
        <div>
          <h3 className="engraved text-sm font-semibold uppercase tracking-widest">
            Visit
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-cream/70">
            <li className="flex gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brass" aria-hidden="true" />
              <a href={directionsUrl} className="hover:text-brass">
                {fullAddress}
              </a>
            </li>
            <li className="flex gap-2.5">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brass" aria-hidden="true" />
              <a href={`tel:${businessInfo.phoneHref}`} className="hover:text-brass">
                {businessInfo.phoneDisplay}
              </a>
            </li>
            <li className="flex gap-2.5">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brass" aria-hidden="true" />
              <span>
                {condensedHours.map((h) => (
                  <span key={h.label} className="block">
                    {h.label}: {h.value}
                  </span>
                ))}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-brass/15">
        <div className="shell flex flex-col items-center justify-between gap-2 py-5 text-xs text-cream/45 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {businessInfo.name}. All rights reserved.
          </p>
          <p>Handcrafted in Essex Junction, Vermont.</p>
        </div>
      </div>
    </footer>
  );
}
