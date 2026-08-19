import type { Metadata } from "next";

import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "A deterministic password recovery preview with no email delivery.",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
