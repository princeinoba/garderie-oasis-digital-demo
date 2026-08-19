import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { demoInquiries } from "@/lib/demo/director-data";

export const metadata = { title: "Director Overview" };

const metrics = [
  ["New Inquiries", 12, "+3 vs yesterday"],
  ["Tours This Week", 8, "+2 vs last week"],
  ["Follow-ups", 5, "Due in next 7 days"],
  ["AI Drafts", 3, "Ready for review"],
] as const;

export default function DirectorOverviewPage() {
  return (
    <>
      <header className="director-page-heading">
        <div>
          <h1>Overview</h1>
          <p>Welcome back, Director.</p>
        </div>
      </header>
      <section className="director-metrics" aria-label="Overview metrics">
        {metrics.map(([label, value, note]) => (
          <article key={label}>
            <p>{label}</p>
            <strong>{value}</strong>
            <small>{note}</small>
          </article>
        ))}
      </section>
      <section className="director-grid">
        <article className="dashboard-panel dashboard-chart-panel">
          <header>
            <div>
              <h2>Inquiries Over Time</h2>
              <p>Last 30 days</p>
            </div>
            <span className="chart-legend">
              <i /> New inquiries <i /> Tours completed
            </span>
          </header>
          <div
            className="reference-line-chart"
            role="img"
            aria-label="Synthetic inquiry volume trend"
          >
            <svg viewBox="0 0 760 260" preserveAspectRatio="none" aria-hidden="true">
              <g className="chart-grid-lines">
                <path d="M0 40H760M0 100H760M0 160H760M0 220H760" />
              </g>
              <path
                className="chart-area"
                d="M0 220C55 192 62 124 115 143S190 223 239 169 310 68 363 126 432 199 478 144 547 174 600 105 684 150 760 34V260H0Z"
              />
              <path
                className="chart-line-primary"
                d="M0 220C55 192 62 124 115 143S190 223 239 169 310 68 363 126 432 199 478 144 547 174 600 105 684 150 760 34"
              />
              <path
                className="chart-line-secondary"
                d="M0 238C80 224 95 186 150 201s70 39 113 16 90-44 135-16 69 23 116 5 91-33 132-14 69 10 114-18"
              />
            </svg>
          </div>
          <div className="chart-axis">
            <span>Apr 22</span>
            <span>Apr 29</span>
            <span>May 6</span>
            <span>May 13</span>
            <span>May 20</span>
          </div>
        </article>
        <article className="dashboard-panel recent-activity-panel">
          <header>
            <div>
              <h2>Recent Activity</h2>
            </div>
          </header>
          <ul className="activity-list">
            {demoInquiries.slice(0, 4).map((item, index) => (
              <li key={item.id}>
                <span className={`activity-icon activity-${index + 1}`}>{index + 1}</span>
                <div>
                  <strong>
                    {index === 0
                      ? "New inquiry from"
                      : index === 1
                        ? "Tour completed for"
                        : index === 2
                          ? "AI proposal ready for"
                          : "Follow-up due for"}{" "}
                    {item.guardian}
                  </strong>
                  <small>{index === 0 ? "10:34 AM" : index === 1 ? "Yesterday" : "Aug 18"}</small>
                </div>
              </li>
            ))}
          </ul>
          <Link className="text-link panel-link" href="/director/tour-inquiries">
            View all activity <ArrowRight aria-hidden="true" size={16} />
          </Link>
        </article>
      </section>
    </>
  );
}
