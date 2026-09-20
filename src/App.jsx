import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Stats from "./Stats";
import NewApplication from "./NewApplication";
import ApplicationList from "./ApplicationList";

const App = () => {
  return (
    <StrictMode>
    <div>
      <h1 className="logo">Job Radar --lets goooo^^</h1>
      <NewApplication />
      <ApplicationList />
      <Stats />
    </div>
    </StrictMode>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
