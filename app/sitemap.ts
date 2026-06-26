import type { MetadataRoute } from "next";
import { portfolioCategories } from "@/lib/portfolio-data";

const siteUrl = "https://mayankchauhan.co.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const categoryRoutes = portfolioCategories.map((category) => ({
    url: `${siteUrl}${category.href}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8
  }));

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1
    },
    {
      url: `${siteUrl}/work`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9
    },
    ...categoryRoutes
  ];
}
