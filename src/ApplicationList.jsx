import { useState, useContext } from "react";
import { ApplicationsContext } from "./contexts";
import ApplicationCard from "./ApplicationCard";

export default function ApplicationList() {
  const [applications] = useContext(ApplicationsContext);
  const [filter, setFilter] = useState("all");

  if (!applications) {
    return <p>Loading...</p>;
  }

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

      <p>
        Showing {visible.length} of {applications.length}
      </p>
      {visible.map((app) => (
        <ApplicationCard key={app.id} {...app} />
      ))}
    </div>
  );
}
