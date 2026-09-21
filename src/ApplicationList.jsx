import { useState } from "react";
import ApplicationCard from "./ApplicationCard";

export default function ApplicationList({ applications, loading }) {
  const [filter, setFilter] = useState("all");
  const visible =
    filter === "all"
      ? applications
      : applications.filter((app) => app.status === filter);

  return (
    <div className="application-list">
      <label htmlFor="filter">Filter by status</label>
      <select
        onChange={(e) => setFilter(e.target.value)}
        name="filter"
        id="filter"
        value={filter}
      >
        <option value="all">All</option>
        <option value="applied">Applied</option>
        <option value="interviewing">Interviewing</option>
        <option value="offer">Offer</option>
        <option value="rejected">Rejected</option>
      </select>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p>
            Showing {visible.length} of {applications.length}
          </p>
          {visible.map((app) => (
            <ApplicationCard key={app.id} {...app} />
          ))}
        </>
      )}
    </div>
  );
}
