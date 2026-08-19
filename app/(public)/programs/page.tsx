import type { Metadata } from "next";

import { ProgramsIndex } from "@/components/public/programs-pages";

export const metadata: Metadata = {
  title: "Programs",
  description: "Explore three synthetic, age-aware early-learning program demonstrations.",
  alternates: { canonical: "/programs" },
};

export default function ProgramsPage() {
  return <ProgramsIndex />;
}
