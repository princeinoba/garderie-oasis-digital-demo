"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { Filter, Search } from "lucide-react";

import { demoInquiries } from "@/lib/demo/director-data";

export function TourInquiryList() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [age, setAge] = useState("all");
  const rows = useMemo(
    () =>
      demoInquiries.filter((item) => {
        const matchesQuery = [item.guardian, item.email, item.reference]
          .join(" ")
          .toLowerCase()
          .includes(query.toLowerCase());
        return (
          matchesQuery &&
          (status === "all" || item.status === status) &&
          (age === "all" || item.ageGroup === age)
        );
      }),
    [query, status, age],
  );

  return (
    <section className="dashboard-panel inquiry-panel">
      <div className="inquiry-filters">
        <label className="search-field">
          <Search aria-hidden="true" />
          <span className="sr-only">Search inquiries</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search name, email, or reference?"
          />
        </label>
        <label>
          <span className="sr-only">Filter status</span>
          <select value={status} onChange={(event) => setStatus(event.target.value)}>
            <option value="all">All statuses</option>
            <option value="new">New</option>
            <option value="reviewing">Reviewing</option>
            <option value="tour_offered">Tour offered</option>
            <option value="confirmed">Confirmed</option>
            <option value="follow_up">Follow-up</option>
          </select>
        </label>
        <label>
          <span className="sr-only">Filter age group</span>
          <select value={age} onChange={(event) => setAge(event.target.value)}>
            <option value="all">All age groups</option>
            <option value="infant">Infant</option>
            <option value="toddler">Toddler</option>
            <option value="preschool">Preschool</option>
          </select>
        </label>
        <button className="icon-button" type="button" aria-label="More filters">
          <Filter aria-hidden="true" />
        </button>
      </div>
      {rows.length === 0 ? (
        <div className="empty-state">
          <Search aria-hidden="true" />
          <h2>No synthetic inquiries found</h2>
          <p>Try another search or clear one of the filters.</p>
        </div>
      ) : (
        <div className="responsive-table">
          <table>
            <thead>
              <tr>
                <th>Inquiry</th>
                <th>Contact</th>
                <th>Child age</th>
                <th>Requested</th>
                <th>Status</th>
                <th>Source</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((item) => (
                <tr key={item.id}>
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
                  <td>{item.ageGroup}</td>
                  <td>{item.requested}</td>
                  <td>
                    <span className={`status-pill status-${item.status}`}>
                      {item.status.replace("_", " ")}
                    </span>
                  </td>
                  <td>{item.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <footer>
        Showing {rows.length} of {demoInquiries.length} synthetic inquiries
      </footer>
    </section>
  );
}
