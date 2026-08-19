import type { Metadata } from "next";
import { ToursPageContent } from "@/components/tours/tours-page";
export const metadata: Metadata = {
  title: "Tours & Registration",
  description:
    "Request a fictional demonstration tour or continue to Ottawa's official childcare application information.",
  alternates: { canonical: "/tours-and-registration" },
};
export default function ToursPage() {
  return <ToursPageContent />;
}
