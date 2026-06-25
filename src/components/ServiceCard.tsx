import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { WoodPlaqueCard } from "./WoodPlaqueCard";
import { ServiceIcon } from "./icons";
import type { Service } from "@/data/services";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <WoodPlaqueCard as="article" className="flex h-full flex-col">
      <div className="mb-4 grid h-12 w-12 place-items-center rounded-md border border-brass/40 bg-espresso/60 text-brass shadow-brass">
        <ServiceIcon name={service.icon} className="h-6 w-6" />
      </div>

      <h3 className="font-serif text-xl text-cream">{service.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-cream/70">
        {service.short}
      </p>

      <Link
        href={`/services/${service.slug}`}
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brass transition hover:gap-2.5 hover:text-brass-light"
      >
        Learn more
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
        <span className="sr-only">about {service.title}</span>
      </Link>
    </WoodPlaqueCard>
  );
}
