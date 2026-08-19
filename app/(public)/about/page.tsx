import type { Metadata } from "next";
import { AboutPageContent } from "@/components/public/info-pages";
export const metadata: Metadata = {
  title: "About",
  description: "About the independent Garderie Oasis Digital Experience demonstration.",
  alternates: { canonical: "/about" },
};
export default function AboutPage() {
  return <AboutPageContent />;
}
