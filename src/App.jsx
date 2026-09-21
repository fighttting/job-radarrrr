import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { ApplicationsContext } from "./contexts";
import Header from "./Header";
import Stats from "./Stats";
import NewApplication from "./NewApplication";
import ApplicationList from "./ApplicationList";

const App = () => {
  const applicationsHook = useState([]);
  const [, setApplications] = applicationsHook;
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

  return (
    <StrictMode>
      <ApplicationsContext.Provider value={applicationsHook}>
        <div>
          <Header />

          <NewApplication />
          <ApplicationList loading={loading} />
          <Stats loading={loading} />
        </div>
      </ApplicationsContext.Provider>
    </StrictMode>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
