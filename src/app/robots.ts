import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/morya-admin-hq-9x", "/api"],
    },
    sitemap: "https://www.moryatravels.in/sitemap.xml",
  };
}
