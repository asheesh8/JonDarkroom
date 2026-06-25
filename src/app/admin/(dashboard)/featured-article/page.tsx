"use client";

import { ImagePlus } from "lucide-react";
import {
  AdminPageHeader,
  MockNotice,
  Card,
  Field,
  TextInput,
  TextArea,
  SaveForm,
} from "@/components/admin/AdminForm";
import { featuredArticle } from "@/data/featuredArticle";

export default function AdminFeaturedArticlePage() {
  return (
    <div>
      <AdminPageHeader
        title="Featured Article"
        description="The newspaper clipping featured on the homepage and at the top of Jon In The Press."
      />
      <MockNotice />

      {/* TODO: persist to Supabase `press` (mark one row featured) + Storage. */}
      <SaveForm submitLabel="Save featured article">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Card className="space-y-5">
              <Field label="Headline" htmlFor="headline">
                <TextInput
                  id="headline"
                  name="headline"
                  defaultValue={featuredArticle.headline}
                />
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Publication" htmlFor="publication">
                  <TextInput
                    id="publication"
                    name="publication"
                    defaultValue={featuredArticle.publication}
                  />
                </Field>
                <Field label="Date" htmlFor="date">
                  <TextInput
                    id="date"
                    name="date"
                    type="date"
                    defaultValue={featuredArticle.date}
                  />
                </Field>
              </div>
              <Field label="Pull quote" htmlFor="pullQuote">
                <TextArea
                  id="pullQuote"
                  name="pullQuote"
                  className="min-h-[80px]"
                  defaultValue={featuredArticle.pullQuote}
                />
              </Field>
              <Field
                label="Article body"
                htmlFor="body"
                hint="One paragraph per line."
              >
                <TextArea
                  id="body"
                  name="body"
                  className="min-h-[220px]"
                  defaultValue={featuredArticle.body.join("\n\n")}
                />
              </Field>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <Field
                label="Scanned clipping"
                hint="TODO: uploads go to Supabase Storage. For now paste a path under /jons-assets."
              >
                <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed border-brass/40 bg-espresso/40 px-4 py-10 text-center text-sm text-cream/55 transition hover:border-brass">
                  <ImagePlus className="h-6 w-6 text-brass" aria-hidden="true" />
                  Upload scan (mock)
                  <input type="file" name="image" accept="image/*" className="hidden" />
                </label>
                <TextInput
                  name="imagePath"
                  className="mt-3"
                  defaultValue={featuredArticle.image}
                />
              </Field>
              <Field label="Image alt text" htmlFor="imageAlt">
                <TextArea
                  id="imageAlt"
                  name="imageAlt"
                  className="min-h-[70px]"
                  defaultValue={featuredArticle.imageAlt}
                />
              </Field>
            </Card>
          </div>
        </div>
      </SaveForm>
    </div>
  );
}
