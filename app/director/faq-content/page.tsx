import { Plus } from "lucide-react";

import { FaqContentBoard } from "@/components/director/faq-content-board";

export const metadata = { title: "FAQ Content" };

export default function FaqContentPage() {
  return (
    <>
      <header className="director-page-heading">
        <div>
          <h1>FAQ Content</h1>
          <p>Create and manage public FAQ articles.</p>
        </div>
        <button className="button button-primary" type="button">
          <Plus aria-hidden="true" />
          New Article
        </button>
      </header>
      <FaqContentBoard />
    </>
  );
}
