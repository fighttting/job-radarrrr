import { createLazyFileRoute } from "@tanstack/react-router";
import Stats from "../Stats";

export const Route = createLazyFileRoute("/stats")({
  component: StatsPage,
});

function StatsPage() {
  return (
    <div className="stats-page">
      <h2>Statistics</h2>
      <Stats />
    </div>
  );
}
