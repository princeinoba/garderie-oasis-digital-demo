import type { Metadata } from "next";

import { PrivacyAuthPageContent } from "@/components/auth/auth-information-pages";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy boundaries for this independent synthetic demonstration.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return <PrivacyAuthPageContent />;
}
