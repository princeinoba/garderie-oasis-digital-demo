import type { Metadata } from "next";

import { OnboardingWizard } from "@/components/auth/onboarding-wizard";

export const metadata: Metadata = { title: "Staff Onboarding" };

export default function OnboardingPage() {
  return <OnboardingWizard />;
}
