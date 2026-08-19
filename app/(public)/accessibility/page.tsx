import type { Metadata } from "next";
import { AccessibilityPageContent } from "@/components/public/info-pages";
export const metadata: Metadata = {
  title: "Accessibility",
  description: "Accessibility approach for this independent portfolio demonstration.",
  alternates: { canonical: "/accessibility" },
};
export default function AccessibilityPage() {
  return <AccessibilityPageContent />;
}
