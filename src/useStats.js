import { useMemo, useDebugValue } from "react";
import {
  CLOSED_STATUSES,
  appliedDate,
  currentStatus,
  lastUpdate,
} from "./application";
import { daysBetween, today } from "./dates";

function computeStats(applications) {
  const now = today();
  const total = applications.length;

  const thisWeek = applications.filter(
    (app) => daysBetween(appliedDate(app), now) < 7,
  ).length;

  // "applied" means still waiting; anything else means they got back to you
  const answered = applications.filter(
    (app) => currentStatus(app) !== "applied",
  ).length;
  const responseRate = total === 0 ? 0 : Math.round((answered / total) * 100);

  const open = applications.filter(
    (app) => !CLOSED_STATUSES.includes(currentStatus(app)),
  );
  const avgWaitDays =
    open.length === 0
      ? 0
      : Math.round(
          open.reduce(
            (sum, app) => sum + daysBetween(lastUpdate(app), now),
            0,
          ) / open.length,
        );

  return { total, thisWeek, responseRate, avgWaitDays };
}

export const useStats = (applications) => {
  const stats = useMemo(() => computeStats(applications), [applications]);
  useDebugValue(`${stats.total} applications`);
  return stats;
};
