import { AiProposalsBoard } from "@/components/director/ai-proposals-board";
export const metadata = { title: "AI Proposals" };
export default function AiProposalsPage() {
  return (
    <>
      <header className="director-page-heading">
        <div>
          <p className="eyebrow">Deterministic mode - remote AI disabled</p>
          <h1>AI Proposals</h1>
          <p>Review evidence, warnings, and bilingual drafts before any fictional next step.</p>
        </div>
      </header>
      <AiProposalsBoard />
    </>
  );
}
