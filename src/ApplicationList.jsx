import { useState } from "react";
import { useApplications } from "./useApplications";
import { STATUSES, currentStatus } from "./application";
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

  if (applications.length === 0) {
    return <p>No applications yet. Add one, or load the sample data.</p>;
  }

  const visible =
    filter === "all"
      ? applications
      : applications.filter((app) => currentStatus(app) === filter);

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
        {STATUSES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <p>
        Showing {visible.length} of {applications.length}
      </p>
      {visible.map((app) => (
        <ApplicationCard key={app.id} application={app} />
      ))}
    </div>
  );
}
