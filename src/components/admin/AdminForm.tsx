"use client";

import { useState, type ReactNode } from "react";
import { Save, CheckCircle2, Info } from "lucide-react";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------------------
   Reusable admin form primitives.

   NOTE: For now the admin is local/mocked — submitting a form calls the
   onSave callback (which by default just logs and shows a "saved" toast).
   TODO: wire onSave to Supabase (insert/update) + revalidatePath().
   --------------------------------------------------------------------------- */

export function AdminPageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 border-b border-brass/15 pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="font-serif text-3xl text-cream">{title}</h1>
        {description && (
          <p className="mt-2 max-w-2xl text-sm text-cream/60">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}

export function MockNotice() {
  return (
    <div className="mb-6 flex items-start gap-3 rounded-2xl border border-brass/30 bg-brass/10 p-4 text-sm text-cream/80">
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-brass" aria-hidden="true" />
      <p>
        <span className="font-medium text-brass">Demo admin.</span> Changes here
        are saved locally for now and reset on reload.{" "}
        <span className="text-cream/60">
          Connect Supabase to make edits permanent (see the README).
        </span>
      </p>
    </div>
  );
}

export function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-brass/20 bg-[#241810]/70 p-5 sm:p-6",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Field({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string;
  htmlFor?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={htmlFor}
        className="block text-xs font-semibold uppercase tracking-widest text-cream/60"
      >
        {label}
      </label>
      {children}
      {hint && <p className="text-xs text-cream/40">{hint}</p>}
    </div>
  );
}

const inputBase =
  "w-full rounded-xl border border-brass/25 bg-espresso/60 px-3.5 py-2.5 text-sm text-cream placeholder:text-cream/30 focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass";

export function TextInput(
  props: React.InputHTMLAttributes<HTMLInputElement>,
) {
  return <input {...props} className={cn(inputBase, props.className)} />;
}

export function TextArea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>,
) {
  return (
    <textarea {...props} className={cn(inputBase, "min-h-[120px]", props.className)} />
  );
}

export function Select(
  props: React.SelectHTMLAttributes<HTMLSelectElement>,
) {
  return <select {...props} className={cn(inputBase, props.className)} />;
}

/**
 * Wraps a form and shows a transient "Saved" confirmation when submitted.
 * onSave defaults to logging the FormData (mock behaviour).
 */
export function SaveForm({
  children,
  onSave,
  submitLabel = "Save changes",
}: {
  children: ReactNode;
  onSave?: (data: FormData) => void | Promise<void>;
  submitLabel?: string;
}) {
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    const data = new FormData(e.currentTarget);
    // TODO: replace with a Supabase mutation.
    if (onSave) {
      await onSave(data);
    } else {
      // eslint-disable-next-line no-console
      console.log("[admin mock save]", Object.fromEntries(data.entries()));
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {children}
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={saving}
          className="btn-reset rounded-full bg-gradient-to-b from-brass-light to-brass-dark px-6 py-2.5 text-sm font-medium text-espresso shadow-brass transition hover:-translate-y-0.5 disabled:opacity-60"
        >
          <Save className="h-4 w-4" aria-hidden="true" />
          {saving ? "Saving…" : submitLabel}
        </button>
        {saved && (
          <span className="flex items-center gap-1.5 text-sm text-[#7fae7f]">
            <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
            Saved (locally)
          </span>
        )}
      </div>
    </form>
  );
}
