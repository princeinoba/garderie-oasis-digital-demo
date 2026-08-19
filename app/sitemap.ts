import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/site-url";

const routes = [
  "",
  "/programs",
  "/programs/infant",
  "/programs/toddler",
  "/programs/preschool",
  "/daily-experience",
  "/meals",
  "/fees",
  "/about",
  "/faq",
  "/contact",
  "/tours-and-registration",
  "/privacy",
  "/accessibility",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  return routes.map((route) => ({
    url: `${base}${route}`,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
