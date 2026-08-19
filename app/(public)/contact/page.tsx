import type { Metadata } from "next";
import { ContactPageContent } from "@/components/public/info-pages";
export const metadata: Metadata = {
  title: "Contact",
  description: "A safe, delivery-disabled demonstration contact form.",
  alternates: { canonical: "/contact" },
};
export default function ContactPage() {
  return <ContactPageContent />;
}
