"use client";

import { useState } from "react";

import { Check, ShieldAlert, X } from "lucide-react";

const proposals = [
  {
    id: "p1",
    name: "Sophie Martin",
    title: "Tour invitation draft",
    message:
      "Bonjour Sophie, thank you for exploring our independent demonstration. We can offer the fictional tour time shown in your inquiry.",
    evidence: ["Approved FAQ 03", "Program details", "Tour guide wording"],
    warnings: ["Schedule not confirmed", "Per-recipient delivery disabled"],
  },
  {
    id: "p2",
    name: "Noah Bernard",
    title: "Clarification request",
    message:
      "Hello Noah, could you confirm whether morning or afternoon works better for your fictional tour preview?",
    evidence: ["Inquiry preference", "Synthetic tour slots"],
    warnings: ["Human review required"],
  },
  {
    id: "p3",
    name: "Léa Tremblay",
    title: "Post-tour follow-up",
    message:
      "Thank you for exploring the preschool demonstration. This draft does not indicate admission, availability, or a waitlist position.",
    evidence: ["Completed demo event", "Approved non-affiliation wording"],
    warnings: ["No operational claim"],
  },
];

export function AiProposalsBoard() {
  const [states, setStates] = useState<Record<string, "pending" | "approved" | "rejected">>({});
  return (
    <div className="proposal-stack">
      {proposals.map((proposal) => (
        <article className="dashboard-panel proposal-card" key={proposal.id}>
          <header>
            <div>
              <p className="eyebrow">{proposal.title}</p>
              <h2>Proposal for {proposal.name}</h2>
            </div>
            <span className="status-pill status-tour_offered">Human review required</span>
          </header>
          <div className="proposal-grid">
            <div>
              <h3>Proposed message</h3>
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
            {states[proposal.id] ? (
              <span className="notice notice-sage">
                Proposal {states[proposal.id]}. No delivery or record mutation occurred.
              </span>
            ) : (
              <>
                <button
                  className="button button-primary"
                  onClick={() =>
                    setStates((current) => ({ ...current, [proposal.id]: "approved" }))
                  }
                >
                  <Check aria-hidden="true" />
                  Approve
                </button>
                <button
                  className="button button-danger"
                  onClick={() =>
                    setStates((current) => ({ ...current, [proposal.id]: "rejected" }))
                  }
                >
                  <X aria-hidden="true" />
                  Reject
                </button>
              </>
            )}
          </footer>
        </article>
      ))}
    </div>
  );
}
