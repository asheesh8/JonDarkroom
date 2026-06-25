import { MapPin, Phone, Clock, Navigation } from "lucide-react";
import {
  businessInfo,
  fullAddress,
  directionsUrl,
} from "@/data/businessInfo";
import { CTAButton } from "./CTAButton";

/**
 * A cream "shop card" with address, phone, and the full weekly hours table.
 * Used on the homepage "Visit the Shop" section and the Contact page.
 */
export function ContactCard({ className }: { className?: string }) {
  return (
    <div className={`card-paper p-6 sm:p-8 ${className ?? ""}`}>
      <div className="grid gap-8 sm:grid-cols-2">
        <div className="space-y-6">
          <div className="flex gap-3">
            <MapPin className="mt-1 h-5 w-5 shrink-0 text-burgundy" aria-hidden="true" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-walnut/70">
                Find us
              </p>
              <p className="mt-1 font-serif text-lg text-espresso">
                {businessInfo.address.street}
              </p>
              <p className="text-walnut">
                {businessInfo.address.city}, {businessInfo.address.state}{" "}
                {businessInfo.address.zip}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Phone className="mt-1 h-5 w-5 shrink-0 text-burgundy" aria-hidden="true" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-walnut/70">
                Call us
              </p>
              <a
                href={`tel:${businessInfo.phoneHref}`}
                className="mt-1 block font-serif text-lg text-espresso hover:text-burgundy"
              >
                {businessInfo.phoneDisplay}
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-1 sm:flex-row">
            <CTAButton href={directionsUrl} variant="primary" size="sm" external>
              <Navigation className="h-4 w-4" aria-hidden="true" />
              Get Directions
            </CTAButton>
            <CTAButton
              href={`tel:${businessInfo.phoneHref}`}
              variant="paper"
              size="sm"
              external
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call Jon
            </CTAButton>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-burgundy" aria-hidden="true" />
            <p className="text-xs font-semibold uppercase tracking-widest text-walnut/70">
              Shop hours
            </p>
          </div>
          <dl className="mt-3 divide-y divide-walnut/15 rounded-2xl border border-walnut/15 overflow-hidden">
            {businessInfo.hours.map((h) => (
              <div
                key={h.day}
                className="flex items-center justify-between px-4 py-2.5 text-sm"
              >
                <dt className="text-walnut">{h.day}</dt>
                <dd
                  className={
                    h.closed
                      ? "font-medium text-burgundy"
                      : "font-medium text-espresso"
                  }
                >
                  {h.hours}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-xs italic leading-relaxed text-walnut/80">
            {businessInfo.specialtyNote}
          </p>
        </div>
      </div>
    </div>
  );
}
