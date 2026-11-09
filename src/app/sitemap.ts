import { MetadataRoute } from "next";
import { SITE } from "@/constants/site";
import { FLEET } from "@/constants/fleet";
import { SERVICES } from "@/constants/services";

const base = SITE.url;

const staticRoutes = [
  { url: "/", changeFrequency: "weekly" as const, priority: 1.0 },
  { url: "/about", changeFrequency: "monthly" as const, priority: 0.8 },
  { url: "/services", changeFrequency: "weekly" as const, priority: 0.9 },
  { url: "/fleet", changeFrequency: "weekly" as const, priority: 0.9 },
  { url: "/packages", changeFrequency: "monthly" as const, priority: 0.8 },
  { url: "/corporate", changeFrequency: "monthly" as const, priority: 0.7 },
  { url: "/faqs", changeFrequency: "monthly" as const, priority: 0.7 },
  { url: "/contact", changeFrequency: "monthly" as const, priority: 0.8 },
  { url: "/book", changeFrequency: "weekly" as const, priority: 0.9 },
  ...SERVICES.map((s) => ({
    url: `/services/${s.id}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  })),
  ...FLEET.map((v) => ({
    url: `/fleet/${v.id}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return staticRoutes.map((r) => ({ ...r, url: `${base}${r.url}`, lastModified: new Date() }));
}
