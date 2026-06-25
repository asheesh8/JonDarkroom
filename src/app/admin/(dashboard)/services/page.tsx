"use client";

import { useState } from "react";
import { Check, Star } from "lucide-react";
import {
  AdminPageHeader,
  MockNotice,
  Card,
  Field,
  TextInput,
  TextArea,
} from "@/components/admin/AdminForm";
import { ServiceIcon } from "@/components/icons";
import { services as seedServices } from "@/data/services";
import { cn } from "@/lib/utils";

export default function AdminServicesPage() {
  // TODO: replace with Supabase `services` table + row mutations.
  const [services, setServices] = useState(
    seedServices.map((s) => ({
      slug: s.slug,
      icon: s.icon,
      title: s.title,
      short: s.short,
      intro: s.intro,
      featured: s.featured,
    })),
  );
  const [savedSlug, setSavedSlug] = useState<string | null>(null);

  function update(slug: string, patch: Partial<(typeof services)[number]>) {
    setServices((prev) =>
      prev.map((s) => (s.slug === slug ? { ...s, ...patch } : s)),
    );
  }

  function save(slug: string) {
    const item = services.find((s) => s.slug === slug);
    // eslint-disable-next-line no-console
    console.log("[admin mock save service]", item);
    setSavedSlug(slug);
    setTimeout(() => setSavedSlug(null), 2000);
  }

  return (
    <div>
      <AdminPageHeader
        title="Services"
        description="Edit the copy shown on each service page, and choose which appear on the homepage."
      />
      <MockNotice />

      <div className="space-y-5">
        {services.map((s) => (
          <Card key={s.slug}>
            <div className="mb-4 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-md border border-brass/30 text-brass">
                <ServiceIcon name={s.icon} className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-serif text-lg text-cream">{s.title}</h3>
                <p className="text-xs text-cream/40">/services/{s.slug}</p>
              </div>
              <button
                type="button"
                onClick={() => update(s.slug, { featured: !s.featured })}
                className={cn(
                  "ml-auto flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition",
                  s.featured
                    ? "border-brass bg-brass/15 text-brass"
                    : "border-cream/20 text-cream/50 hover:border-brass/50",
                )}
              >
                <Star
                  className={cn("h-3.5 w-3.5", s.featured && "fill-brass")}
                  aria-hidden="true"
                />
                {s.featured ? "On homepage" : "Hidden"}
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Title" htmlFor={`title-${s.slug}`}>
                <TextInput
                  id={`title-${s.slug}`}
                  value={s.title}
                  onChange={(e) => update(s.slug, { title: e.target.value })}
                />
              </Field>
              <Field label="Card summary" htmlFor={`short-${s.slug}`}>
                <TextInput
                  id={`short-${s.slug}`}
                  value={s.short}
                  onChange={(e) => update(s.slug, { short: e.target.value })}
                />
              </Field>
            </div>
            <div className="mt-4">
              <Field label="Intro paragraph" htmlFor={`intro-${s.slug}`}>
                <TextArea
                  id={`intro-${s.slug}`}
                  value={s.intro}
                  onChange={(e) => update(s.slug, { intro: e.target.value })}
                />
              </Field>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <button
                type="button"
                onClick={() => save(s.slug)}
                className="btn-reset rounded-md border border-brass/40 px-4 py-2 text-sm text-cream hover:bg-brass/10"
              >
                Save {s.title}
              </button>
              {savedSlug === s.slug && (
                <span className="flex items-center gap-1.5 text-sm text-[#7fae7f]">
                  <Check className="h-4 w-4" /> Saved (locally)
                </span>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
