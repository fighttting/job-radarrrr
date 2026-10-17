import { createLazyFileRoute } from "@tanstack/react-router";
import NewApplication from "../NewApplication";
import ApplicationList from "../ApplicationList";
import DataControls from "../DataControls";

export const Route = createLazyFileRoute("/")({
  component: Board,
});

function Board() {
  return (
    <div className="board">
      <aside className="board-side">
        <NewApplication />
        <DataControls />
      </aside>
      <section className="board-main">
        <ApplicationList />
      </section>
    </div>
  );
}
