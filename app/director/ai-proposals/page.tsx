import { AiProposalsBoard } from "@/components/director/ai-proposals-board";

export const metadata = { title: "AI Proposals" };

export default function AiProposalsPage() {
  return (
    <>
      <header className="director-page-heading">
        <div>
          <h1>AI Proposals</h1>
          <p>Review AI-generated content before any fictional next step.</p>
        </div>
      </header>
      <AiProposalsBoard />
    </>
  );
}
