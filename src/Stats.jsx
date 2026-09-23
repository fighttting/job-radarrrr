import { useApplications } from "./useApplications";
import { useStats } from "./useStats";

export default function Stats() {
  const { isLoading, error, data: applications } = useApplications();
  const stats = useStats(applications ?? []);

  if (isLoading) {
    return <p>Loading stats...</p>;
  }

  if (error) {
    return <p>Could not load stats: {error.message}</p>;
  }

  return (
    <div className="stats">
      <span>Total: {stats.total}</span>
      {" · "}
      <span>This week: {stats.thisWeek}</span>
      {" · "}
      <span>Response rate: {stats.responseRate}%</span>
      {" · "}
      <span>Avg wait: {stats.avgWaitDays} days</span>
    </div>
  );
}
