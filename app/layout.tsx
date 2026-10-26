import type { Metadata, Viewport } from "next";
import "@fontsource-variable/manrope";
import "@fontsource-variable/fraunces";
import "@fontsource/noto-sans-malayalam/400.css";
import "@fontsource/noto-sans-malayalam/600.css";
import "./globals.css";
import { site } from "@/content/site";
import { DEFAULT_OG_IMAGE } from "@/lib/seo";
import { clinicJsonLd } from "@/lib/structured-data";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileActionBar } from "@/components/MobileActionBar";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name}: ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.fullName }],
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_IN",
    title: `${site.name}: ${site.tagline}`,
    description: site.description,
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: { card: "summary_large_image", images: [DEFAULT_OG_IMAGE.url] },
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
      </body>
    </html>
  );
}
