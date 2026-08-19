import type { Metadata } from "next";

import { HomePageContent } from "@/components/public/home-page";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function HomePage() {
  return <HomePageContent />;
}
