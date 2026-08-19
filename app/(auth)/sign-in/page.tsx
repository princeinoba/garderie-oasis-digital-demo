import type { Metadata } from "next";
import Link from "next/link";
import { SignInForm } from "@/components/auth/sign-in-form";
export const metadata: Metadata = {
  title: "Director Sign In",
  description: "Protected access to the synthetic director demonstration.",
};
export default function SignInPage() {
  return (
    <>
      <SignInForm />
      <p className="auth-helper">
        <Link href="/forgot-password">Forgot password?</Link> -{" "}
        <Link href="/">Return to public site</Link>
      </p>
    </>
  );
}
