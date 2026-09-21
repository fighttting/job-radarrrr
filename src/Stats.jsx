import { useStats } from "./useStats";

export default function Stats({ applications, loading }) {
  const stats = useStats(applications);

  if (loading) {
    return <p>Loading stats…</p>;
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
