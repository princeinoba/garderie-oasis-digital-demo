"use client";

import { useMemo, useState } from "react";

import { MoreHorizontal } from "lucide-react";

import styles from "@/components/director/director-board.module.css";
import { demoFaqArticles } from "@/lib/demo/director-data";

type StatusFilter = "All" | "Approved" | "Draft";

export function FaqContentBoard() {
  const [status, setStatus] = useState<StatusFilter>("All");
  const [language, setLanguage] = useState<"All" | "EN" | "FR">("All");
  const rows = useMemo(
    () =>
      demoFaqArticles.filter(
        (article) =>
          (status === "All" || article.status === status) &&
          (language === "All" || article.language === language),
      ),
    [status, language],
  );

  return (
    <section className="dashboard-panel inquiry-panel">
      <div className={styles.contentToolbar}>
        <div className="tab-row" role="group" aria-label="FAQ article status">
          {(["All", "Approved", "Draft"] as const).map((item) => (
            <button
              className={status === item ? "is-active" : undefined}
              type="button"
              aria-pressed={status === item}
              onClick={() => setStatus(item)}
              key={item}
            >
              {item} ({item === "All" ? 12 : item === "Approved" ? 8 : 4})
            </button>
          ))}
        </div>
        <label className={styles.compactSelect}>
          <span className={styles.visuallyHidden}>Filter FAQ language</span>
          <select
            value={language}
            onChange={(event) => setLanguage(event.target.value as "All" | "EN" | "FR")}
          >
            <option value="All">All Languages</option>
            <option value="EN">English</option>
            <option value="FR">French</option>
          </select>
        </label>
      </div>

      <div className="responsive-table">
        <table>
          <thead>
            <tr>
              <th>Article</th>
              <th>Language</th>
              <th>Status</th>
              <th>Updated</th>
              <th className={styles.actionColumn}>
                <span className={styles.visuallyHidden}>Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((item) => (
              <tr key={item.article}>
                <td>
                  <strong>{item.article}</strong>
                </td>
                <td>{item.language}</td>
                <td>
                  <span
                    className={
                      item.status === "Approved"
                        ? "status-pill status-confirmed"
                        : "status-pill status-tour_offered"
                    }
                  >
                    {item.status}
                  </span>
                </td>
                <td>{item.updated}</td>
                <td className={styles.actionColumn}>
                  <button
                    className="icon-button"
                    type="button"
                    aria-label={`More actions for ${item.article}`}
                  >
                    <MoreHorizontal aria-hidden="true" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <footer className={styles.simpleFooter}>{rows.length} visible synthetic articles</footer>
    </section>
  );
}
