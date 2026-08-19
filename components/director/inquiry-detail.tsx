"use client";

import { useMemo, useState } from "react";
import {
  Check,
  Clock3,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { allowedTourTransitions, type TourState } from "@/domain/tours";
import { demoStaff, type DemoInquiry } from "@/lib/demo/director-data";

const labels: Record<TourState, string> = {
  new: "New",
  reviewing: "Reviewing",
  tour_offered: "Tour offered",
  confirmed: "Confirmed",
  completed: "Completed",
  follow_up: "Follow-up",
  cancelled: "Cancelled",
  closed: "Closed",
};

export function InquiryDetail({ inquiry }: { inquiry: DemoInquiry }) {
  const [status, setStatus] = useState<TourState>(inquiry.status);
  const [assignedTo, setAssignedTo] = useState(inquiry.assignedTo);
  const [notes, setNotes] = useState<string[]>(["Synthetic inquiry opened for review."]);
  const [note, setNote] = useState("");
  const [proposalState, setProposalState] = useState<"pending" | "approved" | "rejected">(
    "pending",
  );
  const [events, setEvents] = useState([
    { label: "Inquiry created", detail: `${inquiry.reference} - ${inquiry.requested}` },
    { label: "Assigned for review", detail: inquiry.assignedTo },
  ]);
  const nextStates = allowedTourTransitions[status];
  const proposal = useMemo(
    () => ({
      summary: `${inquiry.guardian} is exploring the ${inquiry.ageGroup} demonstration for ${inquiry.desiredStart}. Preferred tour: ${inquiry.preferredDate} at ${inquiry.preferredTime}.`,
      message: `Bonjour ${inquiry.guardian},\n\nThank you for exploring the Garderie Oasis Digital Experience. We can offer the fictional tour time shown in your inquiry. This draft has not been sent and does not reserve a space.\n\nWarmly,\nThe synthetic demonstration team`,
    }),
    [inquiry],
  );
  const transition = (next: TourState) => {
    if (!allowedTourTransitions[status].includes(next)) return;
    setEvents((current) => [
      ...current,
      {
        label: `${labels[status]} -> ${labels[next]}`,
        detail: `Human-confirmed synthetic transition by ${assignedTo}`,
      },
    ]);
    setStatus(next);
  };
  const addNote = () => {
    if (!note.trim()) return;
    setNotes((current) => [...current, note.trim()]);
    setEvents((current) => [
      ...current,
      { label: "Internal note added", detail: "Synthetic note - not shared externally" },
    ]);
    setNote("");
  };
  return (
    <div className="inquiry-detail-grid">
      <aside className="contact-card dashboard-panel">
        <span className="contact-avatar">
          {inquiry.guardian
            .split(" ")
            .map((part) => part[0])
            .join("")
            .slice(0, 2)}
        </span>
        <span className={`status-pill status-${status}`}>{labels[status]}</span>
        <h1>{inquiry.guardian}</h1>
        <p>{inquiry.reference}</p>
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
            Ottawa, ON - synthetic
          </li>
        </ul>
        <dl>
          <div>
            <dt>Preferred language</dt>
            <dd>{inquiry.language}</dd>
          </div>
          <div>
            <dt>Source</dt>
            <dd>{inquiry.source}</dd>
          </div>
          <div>
            <dt>Assigned staff</dt>
            <dd>
              <select value={assignedTo} onChange={(event) => setAssignedTo(event.target.value)}>
                {demoStaff.map((staff) => (
                  <option key={staff.email}>{staff.name}</option>
                ))}
              </select>
            </dd>
          </div>
        </dl>
      </aside>
      <section className="detail-column">
        <article className="dashboard-panel detail-panel">
          <header>
            <div>
              <p className="eyebrow">Inquiry details</p>
              <h2>Childcare Needs</h2>
            </div>
            <span className="status-pill status-new">Synthetic</span>
          </header>
          <dl className="detail-list">
            <div>
              <dt>Child&apos;s age group</dt>
              <dd>{inquiry.ageGroup}</dd>
            </div>
            <div>
              <dt>Preferred start</dt>
              <dd>{inquiry.desiredStart}</dd>
            </div>
            <div>
              <dt>Schedule</dt>
              <dd>{inquiry.careSchedule}</dd>
            </div>
            <div>
              <dt>Preferred tour</dt>
              <dd>
                {inquiry.preferredDate} - {inquiry.preferredTime}
              </dd>
            </div>
            <div className="detail-full">
              <dt>General question</dt>
              <dd>{inquiry.question}</dd>
            </div>
          </dl>
          <div className="transition-actions">
            <strong>Allowed next steps</strong>
            {nextStates.length ? (
              nextStates.map((next) => (
                <button
                  className="button button-secondary"
                  type="button"
                  onClick={() => transition(next)}
                  key={next}
                >
                  {labels[next]}
                </button>
              ))
            ) : (
              <span>No further transition</span>
            )}
          </div>
        </article>
        <article className="dashboard-panel ai-proposal-detail">
          <header>
            <div>
              <p className="eyebrow">Oasis Assist - deterministic mode</p>
              <h2>Human-reviewed response proposal</h2>
            </div>
            <span
              className={`status-pill status-${proposalState === "pending" ? "tour_offered" : proposalState === "approved" ? "confirmed" : "cancelled"}`}
            >
              {proposalState}
            </span>
          </header>
          <div className="proposal-grid">
            <div>
              <h3>Inquiry summary</h3>
              <p>{proposal.summary}</p>
              <h3>Proposed message</h3>
              <pre>{proposal.message}</pre>
            </div>
            <aside>
              <h3>Evidence</h3>
              <ul>
                <li>
                  <Check aria-hidden="true" />
                  Inquiry fields shown above
                </li>
                <li>
                  <Check aria-hidden="true" />
                  Approved tour-demo wording
                </li>
                <li>
                  <Check aria-hidden="true" />
                  Official registry separation
                </li>
              </ul>
              <h3>Warnings</h3>
              <ul>
                <li>
                  <ShieldCheck aria-hidden="true" />
                  No availability promise
                </li>
                <li>
                  <ShieldCheck aria-hidden="true" />
                  No direct mutation
                </li>
                <li>
                  <ShieldCheck aria-hidden="true" />
                  Delivery disabled
                </li>
              </ul>
            </aside>
          </div>
          <footer>
            {proposalState === "pending" ? (
              <>
                <button
                  className="button button-primary"
                  type="button"
                  onClick={() => {
                    setProposalState("approved");
                    setEvents((current) => [
                      ...current,
                      {
                        label: "Proposal approved",
                        detail: "Human approval recorded - no delivery",
                      },
                    ]);
                  }}
                >
                  <Check aria-hidden="true" />
                  Approve draft
                </button>
                <button
                  className="button button-danger"
                  type="button"
                  onClick={() => setProposalState("rejected")}
                >
                  Reject
                </button>
              </>
            ) : (
              <span className="notice notice-sage">
                <Send aria-hidden="true" />
                This state is local to this session. No message was sent.
              </span>
            )}
          </footer>
        </article>
        <article className="dashboard-panel detail-panel">
          <header>
            <div>
              <p className="eyebrow">Internal only</p>
              <h2>Notes &amp; immutable event preview</h2>
            </div>
            <Clock3 aria-hidden="true" />
          </header>
          <div className="note-entry">
            <label>
              <span>Internal note</span>
              <textarea
                value={note}
                onChange={(event) => setNote(event.target.value)}
                maxLength={500}
              />
            </label>
            <button className="button button-primary" type="button" onClick={addNote}>
              <MessageSquare aria-hidden="true" />
              Add note
            </button>
          </div>
          {notes.map((item, index) => (
            <p className="internal-note" key={index}>
              <UserRound aria-hidden="true" />
              <span>
                {item}
                <small>{assignedTo} - synthetic session</small>
              </span>
            </p>
          ))}
          <ol className="event-timeline">
            {events.map((event, index) => (
              <li key={index}>
                <span />
                <div>
                  <strong>{event.label}</strong>
                  <p>{event.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </article>
      </section>
    </div>
  );
}
