import type { Metadata } from "next";
import Link from "next/link";
import { Mail } from "lucide-react";
export const metadata: Metadata = { title: "Forgot Password" };
export default function ForgotPasswordPage() {
  return (
    <section className="auth-form">
      <div className="auth-form-heading">
        <p className="eyebrow">Synthetic reset</p>
        <h1>Forgot your password?</h1>
        <p>Enter the displayed synthetic address to preview reset instructions.</p>
      </div>
      <label className="field">
        <span>Email address</span>
        <span className="input-with-icon">
          <Mail aria-hidden="true" />
          <input type="email" defaultValue="director@synthetic.invalid" />
        </span>
      </label>
      <div className="notice notice-sage">
        <span>This is a simulated password reset. No real email is sent.</span>
      </div>
      <button className="button button-primary" type="button">
        Preview reset instructions
      </button>
      <Link className="text-link" href="/sign-in">
        Back to sign in
      </Link>
    </section>
  );
}
