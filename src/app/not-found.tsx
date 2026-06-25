import Link from "next/link";
import { Aperture } from "lucide-react";

export default function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center px-5 py-20 text-center">
      <div className="max-w-md">
        <span className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full border border-brass/50 text-brass shadow-brass">
          <Aperture className="h-8 w-8" aria-hidden="true" />
        </span>
        <p className="eyebrow text-brass">Out of focus</p>
        <h1 className="mt-3 font-serif text-5xl text-cream">Page not found</h1>
        <p className="mt-4 text-cream/70">
          This negative didn&apos;t develop. The page you&apos;re looking for
          may have moved or never existed.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="btn-reset rounded-md bg-gradient-to-b from-brass-light to-brass-dark px-5 py-3 text-sm font-medium text-espresso shadow-brass"
          >
            Back to the shop
          </Link>
          <Link
            href="/services"
            className="btn-reset rounded-md border border-brass/50 px-5 py-3 text-sm text-cream hover:bg-brass/10"
          >
            Browse services
          </Link>
        </div>
      </div>
    </div>
  );
}
