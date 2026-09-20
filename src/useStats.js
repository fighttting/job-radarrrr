import { useState, useEffect, useDebugValue } from "react";

const DAY = 24 * 60 * 60 * 1000;

function computeStats(applications) {
  const now = Date.now();
  const total = applications.length;

  const thisWeek = applications.filter(
    (app) => now - new Date(app.appliedDate).getTime() < 7 * DAY,
  ).length;

  // "applied" means still waiting; anything else means they got back to you
  const answered = applications.filter(
    (app) => app.status !== "applied",
  ).length;
  const responseRate = total === 0 ? 0 : Math.round((answered / total) * 100);

  const waiting = applications.filter((app) => app.status === "applied");
  const avgWaitDays =
    waiting.length === 0
      ? 0
      : Math.round(
          waiting.reduce(
            (sum, app) =>
              sum + (now - new Date(app.appliedDate).getTime()) / DAY,
            0,
          ) / waiting.length,
        );

  return { total, thisWeek, responseRate, avgWaitDays };
}

export const useStats = () => {
  const [stats, setStats] = useState(null);

  useDebugValue(stats ? `${stats.total} applications` : "Loading...");

  useEffect(() => {
    async function fetchStats() {
      const response = await fetch("/applications.json");
      const applications = await response.json();
      setStats(computeStats(applications));
    }

    fetchStats();
  }, []);

  return stats;
};