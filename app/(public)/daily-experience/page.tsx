import type { Metadata } from "next";

import { DailyExperience } from "@/components/public/programs-pages";

export const metadata: Metadata = {
  title: "Daily Experience",
  description: "Explore a calm, synthetic early-learning daily rhythm.",
  alternates: { canonical: "/daily-experience" },
};

export default function DailyExperiencePage() {
  return <DailyExperience />;
}
