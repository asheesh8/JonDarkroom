import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — Jon's Darkroom",
  robots: { index: false, follow: false },
};

/**
 * Thin wrapper for the whole /admin tree. The authed dashboard pages get the
 * sidebar from admin/(dashboard)/layout.tsx; the login page renders bare.
 */
export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen">{children}</div>;
}
