import { createLazyFileRoute } from "@tanstack/react-router";
import NewApplication from "../NewApplication";
import ApplicationList from "../ApplicationList";

export const Route = createLazyFileRoute("/")({
  component: Board,
});

function Board() {
  return (
    <div className="board">
      <NewApplication />
      <ApplicationList />
    </div>
  );
}
