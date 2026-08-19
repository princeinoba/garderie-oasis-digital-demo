import type { MetadataRoute } from "next";

import { getSiteUrl, shouldIndexSite } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  const shouldIndex = shouldIndexSite();
  return {
    rules: {
      userAgent: "*",
      ...(shouldIndex ? { allow: "/" } : { disallow: "/" }),
    },
    sitemap: shouldIndex ? `${getSiteUrl()}/sitemap.xml` : undefined,
  };
}
