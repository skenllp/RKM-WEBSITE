import type { Metadata } from "next";
import { site } from "@/content/site";

export const DEFAULT_OG_IMAGE = {
  url: "/og/rkm-eye-care-og.jpg",
  width: 1200,
  height: 630,
  alt: "RKM Eye Care: Better Vision Brighter Life",
};

type PageMeta = {
  title: string;
  description: string;
  /** Path beginning with "/" */
  path: string;
  image?: { url: string; width: number; height: number; alt: string };
  type?: "website" | "article";
};

/**
 * One helper so every page gets a title, description, canonical URL,
 * Open Graph and Twitter card consistently.
 */
export function buildMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  type = "website",
}: PageMeta): Metadata {
  const isHome = path === "/";
  return {
    title: isHome ? { absolute: `${site.name}: ${site.tagline}` } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      siteName: site.name,
      locale: "en_IN",
      title: isHome ? `${site.name}: ${site.tagline}` : `${title} | ${site.name}`,
      description,
      url: path,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: isHome ? `${site.name}: ${site.tagline}` : `${title} | ${site.name}`,
      description,
      images: [image.url],
    },
  };
}
