import type { Metadata, Viewport } from "next";
import "@fontsource-variable/manrope";
import "@fontsource-variable/fraunces";
import "@fontsource/noto-sans-malayalam/400.css";
import "@fontsource/noto-sans-malayalam/600.css";
import "./globals.css";
import { site } from "@/content/site";
import { DEFAULT_OG_IMAGE } from "@/lib/seo";
import { clinicJsonLd, websiteJsonLd } from "@/lib/structured-data";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileActionBar } from "@/components/MobileActionBar";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.seoTitle,
    template: `%s | ${site.name}`,
  },
  description: site.seoDescription,
  applicationName: site.name,
  authors: [{ name: site.fullName }],
  creator: site.fullName,
  publisher: site.fullName,
  keywords: site.keywords,
  category: "health",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  // Set GOOGLE_SITE_VERIFICATION (and optionally BING_SITE_VERIFICATION) in Vercel to verify Search Console / Bing Webmaster.
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: process.env.BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION } : undefined,
  },
  other: {
    "geo.region": "IN-KL",
    "geo.placename": site.town,
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_IN",
    title: site.seoTitle,
    description: site.seoDescription,
    url: "/",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: site.seoTitle,
    description: site.seoDescription,
    images: [DEFAULT_OG_IMAGE.url],
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#123C61",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <body className="min-h-dvh">
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <MobileActionBar />
        <JsonLd data={clinicJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
      </body>
    </html>
  );
}
