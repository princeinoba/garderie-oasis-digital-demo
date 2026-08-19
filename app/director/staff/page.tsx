import { Plus } from "lucide-react";
import { demoStaff } from "@/lib/demo/director-data";
export const metadata = { title: "Staff Directory" };
export default function StaffPage() {
  return (
    <>
      <header className="director-page-heading">
        <div>
          <p className="eyebrow">Synthetic identities</p>
          <h1>Staff Directory</h1>
          <p>View fictional roles available for inquiry assignment.</p>
        </div>
        <button className="button button-primary">
          <Plus aria-hidden="true" />
          Add synthetic staff
        </button>
      </header>
      <section className="dashboard-panel staff-list">
        {demoStaff.map((staff) => (
          <article key={staff.email}>
            <span className="director-avatar">{staff.initials}</span>
            <strong>{staff.name}</strong>
            <span>{staff.role}</span>
            <small>{staff.email}</small>
            <span className="status-pill status-confirmed">Active</span>
          </article>
        ))}
      </section>
    </>
  );
}
