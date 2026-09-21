import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import Stats from "./Stats";
import NewApplication from "./NewApplication";
import ApplicationList from "./ApplicationList";

const App = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  async function fetchApplications() {
    const res = await fetch("/applications.json");
    const json = await res.json();
    setApplications(json);
    setLoading(false);
  }

  function addApplication(application) {
    setApplications((previous) => [...previous, application]);
  }

  return (
    <StrictMode>
      <div>
        <h1 className="logo">Job Radar --lets goooo^^</h1>

        <NewApplication onAdd={addApplication} />
        <ApplicationList applications={applications} loading={loading} />
        <Stats applications={applications} loading={loading} />
      </div>
    </StrictMode>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
