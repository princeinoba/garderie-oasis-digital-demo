"use client";

import { useState } from "react";

import { Check, ChevronDown, ChevronUp, MoreHorizontal, ShieldAlert, X } from "lucide-react";

import styles from "@/components/director/director-board.module.css";

type Proposal = {
  id: string;
  name: string;
  title: string;
  generated: string;
  message: string;
  evidence: string[];
  warnings: string[];
};

const pendingProposals: Proposal[] = [
  {
    id: "p1",
    name: "Sophie Martin",
    title: "Tour invitation draft",
    generated: "Aug 19, 2026 at 10:36 AM",
    message:
      "Bonjour Sophie, thank you for exploring Garderie Oasis. We would be happy to welcome you for a fictional tour at the time shown in your inquiry.",
    evidence: ["Approved FAQ 03", "Program details", "Tour guidelines"],
    warnings: ["Schedule not confirmed", "Per-recipient delivery disabled"],
  },
  {
    id: "p2",
    name: "Noah Bernard",
    title: "Clarification request",
    generated: "Aug 19, 2026 at 2:15 PM",
    message:
      "Hello Noah, could you confirm whether morning or afternoon works better for your fictional tour preview?",
    evidence: ["Inquiry preference", "Synthetic tour slots"],
    warnings: ["Human review required"],
  },
  {
    id: "p3",
    name: "Léa Tremblay",
    title: "Post-tour follow-up",
    generated: "Aug 18, 2026 at 4:40 PM",
    message:
      "Thank you for exploring the preschool demonstration. This draft does not indicate admission, availability, or a waitlist position.",
    evidence: ["Completed demo event", "Approved non-affiliation wording"],
    warnings: ["No operational claim"],
  },
];

const approvedProposals = [
  ["Amélie & Marc Dupont", "Tour reminder", "Aug 18, 2026 at 9:20 AM"],
  ["Fatima Alami", "Accessibility follow-up", "Aug 17, 2026 at 3:15 PM"],
  ["Julien Rousseau", "Program summary", "Aug 16, 2026 at 11:42 AM"],
  ["Chloé Gagnon", "Infant program follow-up", "Aug 15, 2026 at 1:08 PM"],
  ["Carlos Mendes", "Tour clarification", "Aug 14, 2026 at 10:05 AM"],
] as const;

export function AiProposalsBoard() {
  const [tab, setTab] = useState<"pending" | "approved">("pending");
  const [expanded, setExpanded] = useState<string>("p1");
  const [states, setStates] = useState<Record<string, "approved" | "rejected">>({});

  return (
    <section className={styles.proposalBoard}>
      <div className={styles.proposalTabs} role="tablist" aria-label="Proposal status">
        <button
          type="button"
          role="tab"
          aria-selected={tab === "pending"}
          className={tab === "pending" ? styles.activeTab : undefined}
          onClick={() => setTab("pending")}
        >
          Pending Review (3)
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "approved"}
          className={tab === "approved" ? styles.activeTab : undefined}
          onClick={() => setTab("approved")}
        >
          Approved (5)
        </button>
      </div>

      {tab === "pending" ? (
        <div className="proposal-stack">
          {pendingProposals.map((proposal) => {
            const isExpanded = expanded === proposal.id;
            const decision = states[proposal.id];
            return (
              <article
                className={`dashboard-panel proposal-card ${styles.proposalCard}`}
                key={proposal.id}
              >
                <header>
                  <div>
                    <h2>Proposal for {proposal.name}</h2>
                    <p>
                      {proposal.title} · Generated {proposal.generated}
                    </p>
                  </div>
                  <div className={styles.proposalHeaderActions}>
                    <span className="status-pill status-tour_offered">Human review required</span>
                    <button
                      className="icon-button"
                      type="button"
                      aria-label={isExpanded ? "Collapse proposal" : "Expand proposal"}
                      aria-expanded={isExpanded}
                      onClick={() => setExpanded(isExpanded ? "" : proposal.id)}
                    >
                      {isExpanded ? (
                        <ChevronUp aria-hidden="true" />
                      ) : (
                        <ChevronDown aria-hidden="true" />
                      )}
                    </button>
                  </div>
                </header>

                {isExpanded ? (
                  <>
                    <div className="proposal-grid">
                      <div>
                        <h3>Proposed Message</h3>
                        <p>{proposal.message}</p>
                      </div>
                      <aside>
                        <h3>Evidence</h3>
                        <ul>
                          {proposal.evidence.map((item) => (
                            <li key={item}>
                              <Check aria-hidden="true" />
                              {item}
                            </li>
                          ))}
                        </ul>
                        <h3>Warnings</h3>
                        <ul>
                          {proposal.warnings.map((item) => (
                            <li key={item}>
                              <ShieldAlert aria-hidden="true" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </aside>
                    </div>
                    <footer>
                      {decision ? (
                        <span className="notice notice-sage">
                          Proposal {decision}. No delivery or record mutation occurred.
                        </span>
                      ) : (
                        <>
                          <button
                            className="button button-primary"
                            type="button"
                            onClick={() =>
                              setStates((current) => ({
                                ...current,
                                [proposal.id]: "approved",
                              }))
                            }
                          >
                            <Check aria-hidden="true" />
                            Approve
                          </button>
                          <button
                            className="button button-danger"
                            type="button"
                            onClick={() =>
                              setStates((current) => ({
                                ...current,
                                [proposal.id]: "rejected",
                              }))
                            }
                          >
                            <X aria-hidden="true" />
                            Reject
                          </button>
                          <button
                            className="icon-button"
                            type="button"
                            aria-label={`More actions for proposal for ${proposal.name}`}
                          >
                            <MoreHorizontal aria-hidden="true" />
                          </button>
                        </>
                      )}
                    </footer>
                  </>
                ) : null}
              </article>
            );
          })}
        </div>
      ) : (
        <div className={styles.approvedProposalList}>
          {approvedProposals.map(([name, title, date]) => (
            <article className="dashboard-panel" key={name}>
              <div>
                <h2>Proposal for {name}</h2>
                <p>
                  {title} · Approved {date}
                </p>
              </div>
              <span className="status-pill status-confirmed">Approved</span>
              <button
                className="icon-button"
                type="button"
                aria-label={`More actions for approved proposal for ${name}`}
              >
                <MoreHorizontal aria-hidden="true" />
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
