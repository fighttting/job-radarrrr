import { createRootRoute, Outlet, useLocation } from "@tanstack/react-router";
{import.meta.env.DEV && <TanStackRouterDevtools />}
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Header from "../Header";
import ErrorBoundary from "../ErrorBoundary";

export const Route = createRootRoute({
  component: () => {
    const { pathname } = useLocation();
    return (
      <>
        <div>
          <Header />
          <ErrorBoundary key={pathname}>
            <Outlet />
          </ErrorBoundary>
        </div>
        <TanStackRouterDevtools />
        <ReactQueryDevtools />
      </>
    );
  },
});
