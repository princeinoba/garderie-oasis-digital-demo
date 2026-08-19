import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Garderie Oasis Digital Experience",
    short_name: "Garderie Oasis",
    description: "Independent bilingual childcare portfolio demonstration.",
    start_url: "/",
    display: "standalone",
    background_color: "#fbf7ee",
    theme_color: "#0d4a38",
    lang: "en-CA",
    categories: ["education", "lifestyle"],
    icons: [
      { src: "/icon", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
