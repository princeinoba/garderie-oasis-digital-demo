"use client";

import { useState } from "react";

import { Check, Mail, MapPin, MessageSquare, MoreHorizontal, Phone, Sparkles } from "lucide-react";

import type { DemoInquiry } from "@/lib/demo/director-data";

export function InquiryDetail({ inquiry }: { inquiry: DemoInquiry }) {
  const [tab, setTab] = useState<"details" | "notes" | "activity">("details");
  const [proposalState, setProposalState] = useState<"pending" | "approved">("pending");

  return (
    <section className="reference-inquiry-detail">
      <aside className="contact-card dashboard-panel">
        <span className="contact-avatar">
          {inquiry.guardian
            .split(" ")
            .map((part) => part[0])
            .join("")
            .slice(0, 2)}
        </span>
        <h1>{inquiry.guardian}</h1>
        <span className={`status-pill status-${inquiry.status}`}>
          {inquiry.status.replace("_", " ")}
        </span>
        <ul>
          <li>
            <Mail aria-hidden="true" />
            {inquiry.email}
          </li>
          <li>
            <Phone aria-hidden="true" />
            {inquiry.phone}
          </li>
          <li>
            <MapPin aria-hidden="true" />
            Ottawa, ON
          </li>
        </ul>
        <dl>
          <div>
            <dt>Inquiry Source</dt>
            <dd>{inquiry.source} – Contact Form</dd>
          </div>
          <div>
            <dt>Submitted</dt>
            <dd>{inquiry.requested}</dd>
          </div>
          <div>
            <dt>Preferred Language</dt>
            <dd>{inquiry.language}</dd>
          </div>
          <div>
            <dt>How did you hear about us?</dt>
            <dd>Google Search</dd>
          </div>
        </dl>
      </aside>

      <article className="dashboard-panel reference-detail-panel">
        <nav className="reference-detail-tabs" aria-label="Inquiry sections">
          <button
            className={tab === "details" ? "is-active" : undefined}
            onClick={() => setTab("details")}
          >
            Details
          </button>
          <button
            className={tab === "notes" ? "is-active" : undefined}
            onClick={() => setTab("notes")}
          >
            Notes (0)
          </button>
          <button
            className={tab === "activity" ? "is-active" : undefined}
            onClick={() => setTab("activity")}
          >
            Activity
          </button>
        </nav>
        {tab === "details" ? (
          <div className="reference-detail-body">
            <section>
              <h2>Childcare Needs</h2>
              <dl>
                <div>
                  <dt>Child&apos;s Age</dt>
                  <dd>{inquiry.ageGroup === "toddler" ? "2 years, 3 months" : inquiry.ageGroup}</dd>
                </div>
                <div>
                  <dt>Preferred Start</dt>
                  <dd>{inquiry.desiredStart}</dd>
                </div>
                <div>
                  <dt>Schedule</dt>
                  <dd>{inquiry.careSchedule}</dd>
                </div>
                <div>
                  <dt>Care Type</dt>
                  <dd>
                    {inquiry.ageGroup.charAt(0).toUpperCase() + inquiry.ageGroup.slice(1)} Program
                  </dd>
                </div>
                <div className="detail-wide">
                  <dt>Additional Info</dt>
                  <dd>{inquiry.question}</dd>
                </div>
              </dl>
            </section>
            <section>
              <h2>Preferred Tour Times</h2>
              <dl>
                <div>
                  <dt>Weekdays</dt>
                  <dd>Tue–Thu</dd>
                </div>
                <div>
                  <dt>Time Range</dt>
                  <dd>{inquiry.preferredTime} – 12:00 PM</dd>
                </div>
                <div>
                  <dt>Flexibility</dt>
                  <dd>Somewhat flexible</dd>
                </div>
              </dl>
            </section>
            <aside className="reference-draft-preview">
              <Sparkles aria-hidden="true" />
              <div>
                <strong>Human-reviewed draft ready</strong>
                <p>
                  Evidence: approved FAQ, program details, and tour guidelines. No delivery occurs.
                </p>
              </div>
              {proposalState === "pending" ? (
                <button
                  className="button button-secondary"
                  type="button"
                  onClick={() => setProposalState("approved")}
                >
                  <Check aria-hidden="true" /> Approve draft
                </button>
              ) : (
                <span className="status-pill status-confirmed">approved</span>
              )}
            </aside>
          </div>
        ) : tab === "notes" ? (
          <div className="reference-empty-tab">
            <MessageSquare aria-hidden="true" />
            <h2>No internal notes</h2>
            <p>Add a synthetic note from the actions below.</p>
          </div>
        ) : (
          <ol className="reference-activity-timeline">
            <li>
              <span />
              <div>
                <strong>Inquiry created</strong>
                <p>{inquiry.requested}</p>
              </div>
            </li>
            <li>
              <span />
              <div>
                <strong>Assigned to {inquiry.assignedTo}</strong>
                <p>Human-reviewed synthetic workflow</p>
              </div>
            </li>
          </ol>
        )}
        <footer className="reference-detail-actions">
          <button className="button button-primary" type="button">
            Offer Tour
          </button>
          <button className="button button-secondary" type="button">
            Draft Reply
          </button>
          <button className="button button-secondary" type="button">
            Close Inquiry
          </button>
          <button className="icon-button" type="button" aria-label="More inquiry actions">
            <MoreHorizontal aria-hidden="true" />
          </button>
        </footer>
      </article>
    </section>
  );
}
