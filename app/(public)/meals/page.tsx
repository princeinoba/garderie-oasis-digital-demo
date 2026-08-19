import type { Metadata } from "next";
import { MealsPageContent } from "@/components/public/info-pages";
export const metadata: Metadata = {
  title: "Meals",
  description: "A synthetic, allergy-aware weekly meal demonstration.",
  alternates: { canonical: "/meals" },
};
export default function MealsPage() {
  return <MealsPageContent />;
}
