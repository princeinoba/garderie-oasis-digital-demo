import { LockKeyhole, ShieldCheck } from "lucide-react";
export const metadata = { title: "Director Settings" };
export default function SettingsPage() {
  return (
    <>
      <header className="director-page-heading">
        <div>
          <p className="eyebrow">System boundaries</p>
          <h1>Settings</h1>
          <p>Review deterministic demo, privacy, retention, language, and integration controls.</p>
        </div>
      </header>
      <section className="settings-layout">
        <nav className="dashboard-panel">
          <button className="is-active">General</button>
          <button>Privacy</button>
          <button>Data retention</button>
          <button>Language & region</button>
          <button>Integrations</button>
        </nav>
        <div className="dashboard-panel settings-panel">
          <section>
            <div>
              <h2>Demo Mode</h2>
              <p>Remote providers and durable writes are disabled.</p>
            </div>
            <span className="toggle is-on" aria-label="Demo mode on">
              <i />
            </span>
          </section>
          <section>
            <div>
              <h2>Privacy</h2>
              <p>Manage the demonstration privacy summary and consent version.</p>
            </div>
            <button className="button button-secondary">
              <ShieldCheck aria-hidden="true" />
              Privacy version 2026-08-18
            </button>
          </section>
          <section>
            <div>
              <h2>Data Retention</h2>
              <p>Submitted tour previews are not persisted in initial production mode.</p>
            </div>
            <span className="status-pill status-confirmed">No durable form storage</span>
          </section>
          <section>
            <div>
              <h2>Language & Region</h2>
              <p>English (Canada) - Français (Canada) - America/Toronto</p>
            </div>
          </section>
          <section>
            <div>
              <h2>Integrations</h2>
              <p>Calendar, email, SMS, Supabase, and remote AI remain off.</p>
            </div>
            <span className="status-pill status-cancelled">
              <LockKeyhole aria-hidden="true" />
              Disabled
            </span>
          </section>
        </div>
      </section>
    </>
  );
}
