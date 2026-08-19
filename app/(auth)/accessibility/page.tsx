import type { Metadata } from "next";

import { AccessibilityAuthPageContent } from "@/components/auth/auth-information-pages";

export const metadata: Metadata = {
  title: "Accessibility",
  description: "Accessibility approach for this independent portfolio demonstration.",
  alternates: { canonical: "/accessibility" },
};

export default function AccessibilityPage() {
  return <AccessibilityAuthPageContent />;
}
