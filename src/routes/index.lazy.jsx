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
      <NewApplication />
      <ApplicationList />
      <DataControls />
    </div>
  );
}
