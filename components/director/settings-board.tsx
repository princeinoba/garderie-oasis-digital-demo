"use client";

import { useState } from "react";

import {
  CalendarDays,
  Database,
  Languages,
  Mail,
  MessageSquareText,
  ShieldCheck,
} from "lucide-react";

import styles from "@/components/director/director-board.module.css";

const sections = [
  ["general", "General"],
  ["privacy", "Privacy"],
  ["retention", "Data Retention"],
  ["language", "Language & Region"],
  ["integrations", "Integrations"],
] as const;

export function SettingsBoard() {
  const [active, setActive] = useState<(typeof sections)[number][0]>("general");

  const focusSection = (id: (typeof sections)[number][0]) => {
    setActive(id);
    document.getElementById(`settings-${id}`)?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  };

  return (
    <section className={`settings-layout ${styles.settingsBoard}`}>
      <nav className="dashboard-panel" aria-label="Settings sections">
        {sections.map(([id, label]) => (
          <button
            className={active === id ? "is-active" : undefined}
            type="button"
            aria-current={active === id ? "page" : undefined}
            aria-controls={`settings-${id}`}
            onClick={() => focusSection(id)}
            key={id}
          >
            {label}
          </button>
        ))}
      </nav>

      <div className="dashboard-panel settings-panel">
        <section id="settings-general" className={styles.settingsRow}>
          <span className={styles.settingIcon}>
            <ShieldCheck aria-hidden="true" />
          </span>
          <div>
            <h2>Demo Mode</h2>
            <p>
              Deterministic synthetic content is enabled. No remote delivery, public persistence, or
              unattended mutation occurs.
            </p>
          </div>
          <button
            className={styles.demoSwitch}
            type="button"
            role="switch"
            aria-checked="true"
            aria-label="Demo mode is on and required"
            disabled
          >
            <span />
          </button>
        </section>

        <section id="settings-privacy" className={styles.settingsRow}>
          <span className={styles.settingIcon}>
            <ShieldCheck aria-hidden="true" />
          </span>
          <div>
            <h2>Privacy</h2>
            <p>Manage the approved demonstration privacy summary and consent version.</p>
          </div>
          <button className="button button-secondary" type="button">
            Manage Privacy
          </button>
        </section>

        <section id="settings-retention" className={styles.settingsRow}>
          <span className={styles.settingIcon}>
            <Database aria-hidden="true" />
          </span>
          <div>
            <h2>Data Retention</h2>
            <p>Display-only policy control. Submitted tour previews are not durably stored.</p>
          </div>
          <label className={styles.controlLabel}>
            <span>Retention preview</span>
            <select defaultValue="24-month-preview">
              <option value="24-month-preview">Retain for 24 months (preview)</option>
              <option value="none">No durable storage</option>
            </select>
          </label>
        </section>

        <section id="settings-language" className={styles.settingsRow}>
          <span className={styles.settingIcon}>
            <Languages aria-hidden="true" />
          </span>
          <div>
            <h2>Language & Region</h2>
            <p>Set the display languages used in this synthetic workspace.</p>
          </div>
          <div className={styles.languageControls}>
            <label className={styles.controlLabel}>
              <span>Default language</span>
              <select defaultValue="en-CA">
                <option value="en-CA">English (Canada)</option>
                <option value="fr-CA">Français (Canada)</option>
              </select>
            </label>
            <label className={styles.controlLabel}>
              <span>Secondary language</span>
              <select defaultValue="fr-CA">
                <option value="fr-CA">Français (Canada)</option>
                <option value="en-CA">English (Canada)</option>
              </select>
            </label>
          </div>
        </section>

        <section id="settings-integrations" className={styles.integrationSection}>
          <header>
            <span className={styles.settingIcon}>
              <CalendarDays aria-hidden="true" />
            </span>
            <div>
              <h2>Integrations</h2>
              <p>Managed services remain disconnected in deterministic demo mode.</p>
            </div>
          </header>
          <ul className={styles.integrationList}>
            <li>
              <CalendarDays aria-hidden="true" />
              <span>Calendar (Google)</span>
              <strong>Disabled</strong>
            </li>
            <li>
              <Mail aria-hidden="true" />
              <span>Email (Microsoft 365)</span>
              <strong>Disabled</strong>
            </li>
            <li>
              <MessageSquareText aria-hidden="true" />
              <span>SMS (Twilio)</span>
              <strong>Disabled</strong>
            </li>
          </ul>
        </section>
      </div>
    </section>
  );
}
