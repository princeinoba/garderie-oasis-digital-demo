import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import "./globals.css";

import { ServiceWorkerRegistration } from "@/components/shells/service-worker-registration";
import { getSiteUrl, shouldIndexSite } from "@/lib/site-url";

const siteUrl = getSiteUrl();
const shouldIndex = shouldIndexSite();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Garderie Oasis Digital Experience",
    template: "%s | Garderie Oasis Digital Experience",
  },
  description:
    "An independent bilingual childcare portfolio demonstration with synthetic tour and director workflows.",
  applicationName: "Garderie Oasis Digital Experience",
  manifest: "/manifest.webmanifest",
  robots: { index: shouldIndex, follow: shouldIndex, nocache: !shouldIndex },
  openGraph: {
    type: "website",
    locale: "en_CA",
    alternateLocale: "fr_CA",
    siteName: "Garderie Oasis Digital Experience",
    title: "Warm spaces. Curious minds. Bright futures.",
    description:
      "Explore an independent childcare portfolio demonstration built around confidence, clarity, and care.",
    images: [
      {
        url: "/images/social-card.png",
        width: 1728,
        height: 904,
        alt: "Garderie Oasis Digital Experience independent portfolio demonstration",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Garderie Oasis Digital Experience",
    description: "An independent bilingual childcare portfolio demonstration.",
    images: ["/images/social-card.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbf7ee" },
    { media: "(prefers-color-scheme: dark)", color: "#102a21" },
  ],
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body>
        <ServiceWorkerRegistration />
        {children}
      </body>
    </html>
  );
}
