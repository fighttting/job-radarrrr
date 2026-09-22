import { useState, useEffect } from "react";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Header from "../Header";
import { ApplicationsContext } from "../contexts";

export const Route = createRootRoute({
  component: () => {
    const applicationsHook = useState(null);
    const [, setApplications] = applicationsHook;

    useEffect(() => {
      async function fetchApplications() {
        const res = await fetch("/applications.json");
        const json = await res.json();
        setApplications(json);
      }

      fetchApplications();
    }, []);

    return (
      <>
        <ApplicationsContext.Provider value={applicationsHook}>
          <div>
            <Header />
            <Outlet />
          </div>
        </ApplicationsContext.Provider>
        <TanStackRouterDevtools />
      </>
    );
  },
});
