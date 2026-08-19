import type { Metadata } from "next";
import { PrivacyPageContent } from "@/components/public/info-pages";
export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy boundaries for this independent synthetic demonstration.",
  alternates: { canonical: "/privacy" },
};
export default function PrivacyPage() {
  return <PrivacyPageContent />;
}
