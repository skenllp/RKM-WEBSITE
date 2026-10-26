import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { newsPosts } from "@/content/news";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/services", "/doctor", "/optical-care", "/facilities", "/news", "/contact", "/privacy"];
  return [
    ...pages.map((p) => ({
      url: `${site.url}${p}`,
      changeFrequency: "monthly" as const,
      priority: p === "" ? 1 : 0.7,
    })),
    ...newsPosts.map((n) => ({
      url: `${site.url}/news/${n.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.5,
      ...(n.date ? { lastModified: n.date } : {}),
    })),
  ];
}
