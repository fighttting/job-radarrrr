import { useState } from "react";
import { useApplications } from "./useApplications";
import ApplicationCard from "./ApplicationCard";

export default function ApplicationList() {
  const { isLoading, error, data: applications } = useApplications();
  const [filter, setFilter] = useState("all");

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Could not load applications: {error.message}</p>;
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
