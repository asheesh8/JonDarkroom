"use client";

import Link from "next/link";
import { ArrowLeft, ImagePlus } from "lucide-react";
import {
  AdminPageHeader,
  MockNotice,
  Card,
  Field,
  TextInput,
  TextArea,
  Select,
  SaveForm,
} from "@/components/admin/AdminForm";
import { BLOG_CATEGORIES } from "@/data/blogPosts";

export default function NewStoryPage() {
  return (
    <div>
      <Link
        href="/admin/blog"
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-cream/60 hover:text-brass"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to stories
      </Link>

      <AdminPageHeader
        title="New Story"
        description="Write a new post for Stories From The Darkroom."
      />

      <MockNotice />

      <SaveForm submitLabel="Publish story">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Card className="space-y-5">
              <Field label="Title" htmlFor="title">
                <TextInput
                  id="title"
                  name="title"
                  required
                  placeholder="How to Preserve Old Family Photos"
                />
              </Field>

              <Field
                label="Excerpt"
                htmlFor="excerpt"
                hint="One or two sentences shown on cards and previews."
              >
                <TextArea
                  id="excerpt"
                  name="excerpt"
                  required
                  className="min-h-[80px]"
                  placeholder="A short, inviting summary of the story…"
                />
              </Field>

              <Field
                label="Body"
                htmlFor="body"
                hint="Write the full story. Use a blank line between paragraphs; start a line with ## for a heading."
              >
                <TextArea
                  id="body"
                  name="body"
                  required
                  className="min-h-[320px] font-sans"
                  placeholder={"## A heading\n\nYour first paragraph…\n\n## Another heading\n\nMore of the story…"}
                />
              </Field>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="space-y-5">
              <Field label="Category" htmlFor="category">
                <Select id="category" name="category" defaultValue={BLOG_CATEGORIES[0]}>
                  {BLOG_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </Select>
              </Field>

              <Field label="Author" htmlFor="author">
                <TextInput id="author" name="author" defaultValue="Jon" />
              </Field>

              <Field label="Publish date" htmlFor="date">
                <TextInput id="date" name="date" type="date" />
              </Field>

              <Field label="Status" htmlFor="status">
                <Select id="status" name="status" defaultValue="published">
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </Select>
              </Field>
            </Card>

            <Card>
              <Field
                label="Cover image"
                hint="TODO: image uploads land in Supabase Storage. For now, paste a path under /jons-assets."
              >
                <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed border-brass/40 bg-espresso/40 px-4 py-8 text-center text-sm text-cream/55 transition hover:border-brass">
                  <ImagePlus className="h-6 w-6 text-brass" aria-hidden="true" />
                  Click to upload (mock)
                  <input type="file" name="cover" accept="image/*" className="hidden" />
                </label>
                <TextInput
                  name="coverPath"
                  className="mt-3"
                  placeholder="/jons-assets/your-image.jpg"
                />
              </Field>
            </Card>
          </div>
        </div>
      </SaveForm>
    </div>
  );
}
