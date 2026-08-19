import type { ReactNode } from "react";
import Link from "next/link";

import { BotanicalComposition } from "@/components/auth/botanical-composition";
import { BrandMark } from "@/components/brand/brand-mark";
import { LanguageProvider } from "@/components/i18n/language-provider";

export default function AuthLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <LanguageProvider>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <div className="auth-shell">
        <header className="auth-utility-header">
          <BrandMark />
          <nav aria-label="Authentication help">
            <Link href="/faq">Help</Link>
            <Link href="/accessibility">Accessibility</Link>
            <span aria-hidden="true" className="auth-help-mark">
              ?
            </span>
          </nav>
        </header>
        <main className="auth-stage" id="main-content">
          <aside className="auth-art" aria-hidden="true">
            <BotanicalComposition />
          </aside>
          <section className="auth-content" aria-label="Demo access">
            {children}
          </section>
        </main>
        <footer className="auth-footer">
          <span>&copy; 2026 Garderie Oasis &middot; Independent synthetic demonstration</span>
          <nav aria-label="Authentication footer">
            <Link href="/privacy">Privacy</Link>
            <Link href="/accessibility">Accessibility</Link>
            <Link href="/contact">Contact</Link>
            <span>English</span>
          </nav>
        </footer>
      </div>
    </LanguageProvider>
  );
}
