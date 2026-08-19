import type { ReactNode } from "react";

import { Bell, ChevronDown, LockKeyhole } from "lucide-react";

import { DirectorNav } from "@/components/director/director-nav";

export default function DirectorLayout({ children }: { children: ReactNode }) {
  return (
    <div className="director-shell">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <DirectorNav />
      <div className="director-workspace">
        <header className="director-topbar">
          <button className="director-environment" type="button">
            Synthetic Demo <ChevronDown aria-hidden="true" />
          </button>
          <div className="director-topbar-actions">
            <span className="director-language">EN&nbsp; | &nbsp;FR</span>
            <span className="topbar-lock">
              <LockKeyhole aria-hidden="true" />
              Protected demo
            </span>
            <button className="icon-button" type="button" aria-label="Synthetic notifications">
              <Bell aria-hidden="true" />
            </button>
            <span className="director-avatar" aria-hidden="true">
              IG
            </span>
            <form action="/api/auth/sign-out" method="post">
              <button className="director-profile" type="submit">
                Director <ChevronDown aria-hidden="true" />
              </button>
            </form>
          </div>
        </header>
        <main className="director-main" id="main-content">
          {children}
        </main>
      </div>
    </div>
  );
}
