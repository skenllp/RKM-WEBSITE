import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { newsPosts } from "@/content/news";

const pages: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.9, changeFrequency: "monthly" },
  { path: "/doctor", priority: 0.8, changeFrequency: "monthly" },
  { path: "/optical-care", priority: 0.8, changeFrequency: "monthly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/facilities", priority: 0.6, changeFrequency: "monthly" },
  { path: "/news", priority: 0.6, changeFrequency: "weekly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    ...pages.map((p) => ({
      url: `${site.url}${p.path}`,
      lastModified: now,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
    })),
    ...newsPosts.map((n) => ({
      url: `${site.url}/news/${n.slug}`,
      lastModified: n.date ?? now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
