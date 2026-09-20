import { createRoot } from "react-dom/client";
import NewApplication from "./NewApplication";
import ApplicationList from "./ApplicationList";

const App = () => {
  return (
    <div>
      <h1 className="logo">Job Radar</h1>
      <NewApplication />
      <ApplicationList />
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
