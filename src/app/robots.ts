import { MetadataRoute } from "next";
import { SITE } from "@/constants/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/morya-admin-hq-9x", "/api"],
    },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
