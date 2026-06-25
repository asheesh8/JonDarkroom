"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Aperture, Lock, User, AlertCircle } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const from = params.get("from") || "/admin";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Sign in failed. Please try again.");
        setLoading(false);
        return;
      }
      router.push(from);
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="flex items-center gap-2 rounded-md border border-burgundy/50 bg-burgundy/15 px-4 py-3 text-sm text-cream">
          <AlertCircle className="h-4 w-4 shrink-0 text-burgundy" aria-hidden="true" />
          {error}
        </div>
      )}

      <div className="space-y-1.5">
        <label
          htmlFor="username"
          className="block text-xs font-semibold uppercase tracking-widest text-cream/60"
        >
          Username
        </label>
        <div className="relative">
          <User
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brass/70"
            aria-hidden="true"
          />
          <input
            id="username"
            name="username"
            autoComplete="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-md border border-brass/25 bg-espresso/60 py-2.5 pl-10 pr-3.5 text-sm text-cream focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="password"
          className="block text-xs font-semibold uppercase tracking-widest text-cream/60"
        >
          Password
        </label>
        <div className="relative">
          <Lock
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brass/70"
            aria-hidden="true"
          />
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-brass/25 bg-espresso/60 py-2.5 pl-10 pr-3.5 text-sm text-cream focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-reset w-full rounded-md bg-gradient-to-b from-brass-light to-brass-dark px-5 py-3 text-sm font-medium text-espresso shadow-brass transition hover:-translate-y-0.5 disabled:opacity-60"
      >
        {loading ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="grid min-h-screen place-items-center px-5 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full border border-brass/50 text-brass shadow-brass"
          >
            <Aperture className="h-7 w-7" aria-hidden="true" />
          </Link>
          <h1 className="font-serif text-3xl text-cream">Jon&apos;s Darkroom</h1>
          <p className="mt-1 text-xs uppercase tracking-[0.3em] text-brass">
            Admin Sign In
          </p>
        </div>

        <div className="rounded-xl border border-brass/20 bg-[#241810]/70 p-6 shadow-counter sm:p-7">
          <Suspense fallback={<div className="text-cream/60">Loading…</div>}>
            <LoginForm />
          </Suspense>
        </div>

        <p className="mt-6 text-center text-xs text-cream/40">
          Credentials are set with <code className="text-cream/60">ADMIN_USERNAME</code>{" "}
          and <code className="text-cream/60">ADMIN_PASSWORD</code> in{" "}
          <code className="text-cream/60">.env.local</code>.
        </p>
        <p className="mt-3 text-center">
          <Link href="/" className="text-xs text-brass hover:underline">
            ← Back to the shop
          </Link>
        </p>
      </div>
    </div>
  );
}
