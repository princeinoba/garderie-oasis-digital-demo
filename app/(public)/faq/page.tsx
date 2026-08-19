import type { Metadata } from "next";
import { FaqPageContent } from "@/components/public/faq-page";
export const metadata: Metadata = {
  title: "FAQ & Oasis Guide",
  description: "Approved bilingual FAQ content and a bounded deterministic assistant.",
  alternates: { canonical: "/faq" },
};
export default function FaqPage() {
  return <FaqPageContent />;
}
