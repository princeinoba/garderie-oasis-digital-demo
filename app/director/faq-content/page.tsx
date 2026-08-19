import { Plus } from "lucide-react";
import { demoFaqArticles } from "@/lib/demo/director-data";
export const metadata = { title: "FAQ Content" };
export default function FaqContentPage() {
  return (
    <>
      <header className="director-page-heading">
        <div>
          <p className="eyebrow">Approved knowledge</p>
          <h1>FAQ Content</h1>
          <p>Create and manage bilingual public FAQ articles.</p>
        </div>
        <button className="button button-primary">
          <Plus aria-hidden="true" />
          New article
        </button>
      </header>
      <section className="dashboard-panel inquiry-panel">
        <div className="tab-row">
          <button className="is-active">All (6)</button>
          <button>Approved (5)</button>
          <button>Draft (1)</button>
        </div>
        <div className="responsive-table">
          <table>
            <thead>
              <tr>
                <th>Article</th>
                <th>Language</th>
                <th>Status</th>
                <th>Updated</th>
              </tr>
            </thead>
            <tbody>
              {demoFaqArticles.map(([article, language, status, updated]) => (
                <tr key={article}>
                  <td>
                    <strong>{article}</strong>
                  </td>
                  <td>{language}</td>
                  <td>
                    <span
                      className={
                        status === "Approved"
                          ? "status-pill status-confirmed"
                          : "status-pill status-tour_offered"
                      }
                    >
                      {status}
                    </span>
                  </td>
                  <td>{updated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
