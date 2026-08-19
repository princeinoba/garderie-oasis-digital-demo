import type { Metadata } from "next";
import { FeesPageContent } from "@/components/public/info-pages";
export const metadata: Metadata = {
  title: "Fees",
  description: "Illustrative-only childcare fee information and official Ottawa resources.",
  alternates: { canonical: "/fees" },
};
export default function FeesPage() {
  return <FeesPageContent />;
}
