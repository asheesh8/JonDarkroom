import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { businessInfo, fullAddress } from "@/data/businessInfo";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.jonsdarkroom.com"),
  title: {
    default: `${businessInfo.name} — ${businessInfo.tagline}`,
    template: `%s | ${businessInfo.name}`,
  },
  description:
    "Essex Junction's local photo lab and frameshop. Film processing, photo restoration, custom framing, passport photos, video transfers, and camera gear — handled locally with care.",
  keywords: [
    "Essex Junction photo lab",
    "Vermont photo restoration",
    "custom framing Essex Junction",
    "passport photos Essex Junction",
    "video transfer Vermont",
    "camera equipment Essex Junction",
    "Jon's Darkroom",
    "film processing Vermont",
  ],
  authors: [{ name: businessInfo.name }],
  openGraph: {
    title: `${businessInfo.name} — ${businessInfo.tagline}`,
    description:
      "Film processing, photo restoration, custom framing, passport photos, video transfers, and camera gear in Essex Junction, VT.",
    type: "website",
    locale: "en_US",
    siteName: businessInfo.name,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // LocalBusiness structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: businessInfo.name,
    description: businessInfo.concept,
    address: {
      "@type": "PostalAddress",
      streetAddress: businessInfo.address.street,
      addressLocality: businessInfo.address.city,
      addressRegion: businessInfo.address.state,
      postalCode: businessInfo.address.zip,
      addressCountry: "US",
    },
    telephone: businessInfo.phoneDisplay,
    url: "https://www.jonsdarkroom.com",
    areaServed: "Essex Junction, Vermont",
  };

  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded focus:bg-brass focus:px-4 focus:py-2 focus:text-espresso"
        >
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
