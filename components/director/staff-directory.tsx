"use client";

import { useMemo, useState } from "react";

import { MoreHorizontal, Search } from "lucide-react";

import styles from "@/components/director/director-board.module.css";
import { demoStaff } from "@/lib/demo/director-data";

export function StaffDirectory() {
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("All Roles");
  const roles = useMemo(
    () => ["All Roles", ...Array.from(new Set(demoStaff.map((member) => member.role)))],
    [],
  );
  const rows = useMemo(
    () =>
      demoStaff.filter((member) => {
        const matchesQuery = [member.name, member.email]
          .join(" ")
          .toLowerCase()
          .includes(query.toLowerCase());
        return matchesQuery && (role === "All Roles" || member.role === role);
      }),
    [query, role],
  );

  return (
    <section className={`dashboard-panel staff-directory-panel ${styles.staffBoard}`}>
      <div className="staff-toolbar">
        <label className="search-field">
          <Search aria-hidden="true" />
          <span className={styles.visuallyHidden}>Search staff</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search staff by name or email..."
          />
        </label>
        <label>
          <span className={styles.visuallyHidden}>Filter by role</span>
          <select value={role} onChange={(event) => setRole(event.target.value)}>
            {roles.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="staff-table-head" aria-hidden="true">
        <span>Staff Member</span>
        <span>Role</span>
        <span>Email</span>
        <span>Status</span>
        <span />
      </div>
      <div className="staff-list">
        {rows.map((staff, index) => (
          <article key={staff.email}>
            <span className={`staff-photo portrait-${(index % 6) + 1}`} aria-hidden="true" />
            <strong>{staff.name}</strong>
            <span>{staff.role}</span>
            <small>{staff.email}</small>
            <span className="status-pill status-confirmed">Active</span>
            <button
              className="icon-button"
              type="button"
              aria-label={`More actions for ${staff.name}`}
            >
              <MoreHorizontal aria-hidden="true" />
            </button>
          </article>
        ))}
      </div>
      {rows.length === 0 ? (
        <div className="empty-state">
          <Search aria-hidden="true" />
          <h2>No staff found</h2>
          <p>Try another name, email, or role.</p>
        </div>
      ) : null}
    </section>
  );
}
