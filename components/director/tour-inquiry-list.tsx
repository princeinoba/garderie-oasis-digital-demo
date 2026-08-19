"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { ChevronLeft, ChevronRight, FilterX, MoreHorizontal, Search } from "lucide-react";

import styles from "@/components/director/director-board.module.css";
import { demoInquiries } from "@/lib/demo/director-data";

function statusLabel(value: string) {
  return value
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function TourInquiryList() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [source, setSource] = useState("all");
  const rows = useMemo(
    () =>
      demoInquiries.filter((item) => {
        const matchesQuery = [item.guardian, item.email, item.phone, item.reference]
          .join(" ")
          .toLowerCase()
          .includes(query.toLowerCase());
        return (
          matchesQuery &&
          (status === "all" || item.status === status) &&
          (source === "all" || item.source === source)
        );
      }),
    [query, status, source],
  );

  const resetFilters = () => {
    setQuery("");
    setStatus("all");
    setSource("all");
  };

  return (
    <section className="dashboard-panel inquiry-panel">
      <div className="inquiry-filters">
        <label className="search-field">
          <Search aria-hidden="true" />
          <span className={styles.visuallyHidden}>Search inquiries</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name, email, or phone..."
          />
        </label>
        <label>
          <span className={styles.visuallyHidden}>Filter by status</span>
          <select value={status} onChange={(event) => setStatus(event.target.value)}>
            <option value="all">All Statuses</option>
            <option value="new">New</option>
            <option value="reviewing">Reviewing</option>
            <option value="tour_offered">Tour Offered</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="follow_up">Follow-up</option>
            <option value="closed">Closed</option>
          </select>
        </label>
        <label>
          <span className={styles.visuallyHidden}>Filter by source</span>
          <select value={source} onChange={(event) => setSource(event.target.value)}>
            <option value="all">All Sources</option>
            <option value="Website">Website</option>
            <option value="Referral">Referral</option>
          </select>
        </label>
        <button
          className="icon-button"
          type="button"
          aria-label="Clear inquiry filters"
          onClick={resetFilters}
        >
          <FilterX aria-hidden="true" />
        </button>
      </div>

      {rows.length === 0 ? (
        <div className="empty-state">
          <Search aria-hidden="true" />
          <h2>No synthetic inquiries found</h2>
          <p>Try another search or clear the filters.</p>
          <button className="button button-secondary" type="button" onClick={resetFilters}>
            Clear filters
          </button>
        </div>
      ) : (
        <div className="responsive-table">
          <table>
            <thead>
              <tr>
                <th className={styles.checkColumn}>
                  <input type="checkbox" aria-label="Select all visible inquiries" />
                </th>
                <th>Inquiry</th>
                <th>Contact</th>
                <th>Child Age</th>
                <th>Requested</th>
                <th>Status</th>
                <th>Source</th>
                <th className={styles.actionColumn}>
                  <span className={styles.visuallyHidden}>Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((item) => (
                <tr key={item.id}>
                  <td className={styles.checkColumn}>
                    <input type="checkbox" aria-label={`Select inquiry from ${item.guardian}`} />
                  </td>
                  <td>
                    <Link href={`/director/tour-inquiries/${item.id}`}>
                      <strong>{item.guardian}</strong>
                      <small>{item.reference}</small>
                    </Link>
                  </td>
                  <td>
                    <span>{item.email}</span>
                    <small>{item.phone}</small>
                  </td>
                  <td>{item.ageGroup.charAt(0).toUpperCase() + item.ageGroup.slice(1)}</td>
                  <td>{item.requested}</td>
                  <td>
                    <span className={`status-pill status-${item.status}`}>
                      {statusLabel(item.status)}
                    </span>
                  </td>
                  <td>{item.source}</td>
                  <td className={styles.actionColumn}>
                    <button
                      className="icon-button"
                      type="button"
                      aria-label={`More actions for ${item.guardian}`}
                    >
                      <MoreHorizontal aria-hidden="true" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <footer className={styles.tableFooter}>
        <span>
          Showing {rows.length === 0 ? 0 : 1} to {rows.length} of {rows.length} inquiries
        </span>
        <div className={styles.pagination} aria-label="Inquiry pagination">
          <button type="button" aria-label="Previous page" disabled>
            <ChevronLeft aria-hidden="true" />
          </button>
          <button className={styles.currentPage} type="button" aria-current="page">
            1
          </button>
          <button type="button" disabled>
            2
          </button>
          <button type="button" disabled>
            3
          </button>
          <button type="button" aria-label="Next page" disabled>
            <ChevronRight aria-hidden="true" />
          </button>
          <select aria-label="Rows per page" defaultValue="10">
            <option value="10">10 / page</option>
          </select>
        </div>
      </footer>
    </section>
  );
}
