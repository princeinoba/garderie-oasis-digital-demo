import { Plus } from "lucide-react";

import { StaffDirectory } from "@/components/director/staff-directory";

export const metadata = { title: "Staff Directory" };

export default function StaffPage() {
  return (
    <>
      <header className="director-page-heading">
        <div>
          <h1>Staff Directory</h1>
          <p>View and manage staff information.</p>
        </div>
        <button className="button button-primary" type="button">
          <Plus aria-hidden="true" />
          Add Staff
        </button>
      </header>
      <StaffDirectory />
    </>
  );
}
