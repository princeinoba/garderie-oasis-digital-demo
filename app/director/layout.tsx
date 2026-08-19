import type { ReactNode } from "react";

import { Bell, LockKeyhole } from "lucide-react";

import { DirectorNav } from "@/components/director/director-nav";

export default function DirectorLayout({ children }: { children: ReactNode }) {
  return (
    <div className="director-shell">
      <DirectorNav />
      <div className="director-workspace">
        <header className="director-topbar">
          <div>
            <strong>Garderie Oasis Director Demonstration</strong>
            <span>Protected - Synthetic records only</span>
          </div>
          <div>
            <span className="topbar-lock">
              <LockKeyhole aria-hidden="true" />
              Authorized demo viewers
            </span>
            <button className="icon-button" type="button" aria-label="Synthetic notifications">
              <Bell aria-hidden="true" />
            </button>
            <span className="director-avatar">IG</span>
            <form action="/api/auth/sign-out" method="post">
              <button className="text-button" type="submit">
                Sign out
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
