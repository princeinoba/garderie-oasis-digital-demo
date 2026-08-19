import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
export const metadata: Metadata = { title: "Accept Demo Invitation" };
export default async function AcceptInvitePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  return (
    <section className="auth-form">
      <div className="auth-form-heading">
        <p className="eyebrow">Invitation preview</p>
        <h1>Accept your invitation</h1>
        <p>Create a fictional display name and password to preview onboarding.</p>
      </div>
      <div className="notice notice-sage">
        <ShieldCheck aria-hidden="true" />
        <span>Invitation token: {token.slice(0, 12)} - Verified demo format</span>
      </div>
      <label className="field">
        <span>Display name</span>
        <input placeholder="Fictional staff name" />
      </label>
      <label className="field">
        <span>Create password</span>
        <input type="password" defaultValue="oasis-demo" />
      </label>
      <div className="notice notice-gold">
        <span>Synthetic staff demonstration only. No real children or families are involved.</span>
      </div>
      <Link className="button button-primary" href="/onboarding">
        Accept invitation
      </Link>
    </section>
  );
}
