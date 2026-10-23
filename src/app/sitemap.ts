import type { MetadataRoute } from "next";

import { getPosts } from "@/lib/blog";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPosts();
  return [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/blog`, changeFrequency: "weekly", priority: 0.8 },
    ...posts.map((p) => ({
      url: `${siteUrl}/blog/${p.slug}`,
      ...(p.date ? { lastModified: new Date(`${p.date}T00:00:00Z`) } : {}),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
