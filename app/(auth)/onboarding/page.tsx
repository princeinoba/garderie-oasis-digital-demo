import type { Metadata } from "next";
import Link from "next/link";
import { Check, UserRound } from "lucide-react";
export const metadata: Metadata = { title: "Staff Onboarding" };
export default function OnboardingPage() {
  return (
    <section className="auth-form auth-form-wide">
      <div className="auth-form-heading">
        <p className="eyebrow">Step 1 of 3</p>
        <h1>Staff Onboarding</h1>
        <p>Set up a fictional account in a few simple steps.</p>
      </div>
      <ol className="mini-stepper">
        <li className="is-current">
          <span>
            <UserRound aria-hidden="true" />
          </span>
          <strong>Profile</strong>
        </li>
        <li>
          <span>2</span>
          <strong>Role</strong>
        </li>
        <li>
          <span>3</span>
          <strong>Preferences</strong>
        </li>
      </ol>
      <div className="form-grid">
        <label className="field">
          <span>Full name</span>
          <input placeholder="Fictional staff name" />
        </label>
        <label className="field">
          <span>Email address</span>
          <input value="educator@synthetic.invalid" readOnly />
        </label>
      </div>
      <div className="form-actions">
        <Link className="text-link" href="/sign-in">
          Save and exit
        </Link>
        <Link className="button button-primary" href="/director">
          Continue <Check aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
