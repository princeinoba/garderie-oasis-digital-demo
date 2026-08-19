import Link from "next/link";

import { ArrowRight, Bot, CalendarCheck, Clock3, UserRoundSearch } from "lucide-react";

import { demoInquiries } from "@/lib/demo/director-data";

export const metadata = { title: "Director Overview" };

export default function DirectorOverviewPage() {
  const metrics = [
    [
      "New inquiries",
      demoInquiries.filter((item) => item.status === "new").length + 7,
      UserRoundSearch,
      "+3 vs yesterday",
    ],
    ["Tours this week", 8, CalendarCheck, "+2 vs last week"],
    ["Follow-ups", 5, Clock3, "Due in next 7 days"],
    ["AI drafts", 3, Bot, "Ready for human review"],
  ] as const;
  return (
    <>
      <header className="director-page-heading">
        <div>
          <p className="eyebrow">Director overview</p>
          <h1>Welcome back, Director.</h1>
          <p>
            Monitor fictional tour interest, review work, and keep every automated suggestion
            human-controlled.
          </p>
        </div>
        <Link className="button button-primary" href="/director/tour-inquiries">
          View inquiries <ArrowRight aria-hidden="true" />
        </Link>
      </header>
      <section className="director-metrics">
        {metrics.map(([label, value, Icon, note]) => (
          <article key={label}>
            <span>
              <Icon aria-hidden="true" />
            </span>
            <p>{label}</p>
            <strong>{value}</strong>
            <small>{note}</small>
          </article>
        ))}
      </section>
      <section className="director-grid">
        <article className="dashboard-panel">
          <header>
            <div>
              <h2>Inquiries Over Time</h2>
              <p>Last 30 days - synthetic</p>
            </div>
            <span className="status-pill status-new">Tour requests</span>
          </header>
          <div className="chart" role="img" aria-label="Synthetic inquiry volume trend">
            <span style={{ height: "28%" }} />
            <span style={{ height: "46%" }} />
            <span style={{ height: "35%" }} />
            <span style={{ height: "68%" }} />
            <span style={{ height: "60%" }} />
            <span style={{ height: "84%" }} />
            <span style={{ height: "73%" }} />
            <span style={{ height: "95%" }} />
          </div>
          <div className="chart-axis">
            <span>Jul 20</span>
            <span>Jul 27</span>
            <span>Aug 3</span>
            <span>Aug 10</span>
            <span>Aug 17</span>
          </div>
        </article>
        <article className="dashboard-panel">
          <header>
            <div>
              <h2>Recent Activity</h2>
              <p>Human-reviewed demo events</p>
            </div>
          </header>
          <ul className="activity-list">
            {demoInquiries.slice(0, 4).map((item, index) => (
              <li key={item.id}>
                <span className="activity-icon">{index + 1}</span>
                <div>
                  <strong>
                    {index === 0
                      ? "New inquiry from"
                      : index === 1
                        ? "Tour confirmed for"
                        : index === 2
                          ? "Follow-up due for"
                          : "Inquiry assigned to"}{" "}
                    {item.guardian}
                  </strong>
                  <small>
                    {item.reference} - {item.assignedTo}
                  </small>
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
