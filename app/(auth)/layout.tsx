import type { ReactNode } from "react";
import { BrandMark } from "@/components/brand/brand-mark";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="auth-shell">
      <header>
        <BrandMark />
        <nav>
          <a href="/faq">Help</a>
          <a href="/accessibility">Accessibility</a>
        </nav>
      </header>
      <div className="auth-stage">
        <aside className="auth-art" aria-hidden="true">
          <span className="auth-sun" />
          <span className="auth-plant plant-one" />
          <span className="auth-plant plant-two" />
          <div className="auth-room">
            <span />
            <span />
            <span />
          </div>
        </aside>
        <section>{children}</section>
      </div>
      <footer>
        &copy; 2026 Independent Garderie Oasis portfolio demonstration &bull; Fictional information
        only
      </footer>
    </main>
  );
}
