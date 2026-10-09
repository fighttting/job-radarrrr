import { useState } from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import Stats from "../Stats";

export const Route = createLazyFileRoute("/stats")({
  component: StatsPage,
});

function StatsPage() {
  const [crash, setCrash] = useState(false);
  if (crash) throw new Error("Test crash");

  return (
    <div className="stats-page">
      <h2>Statistics</h2>
      <Stats />
      {import.meta.env.DEV && (
        <button onClick={() => setCrash(true)}>Crash this page</button>
      )}
    </div>
  );
}
