import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Outlet, useLocation } from "@tanstack/react-router";
import Header from "../Header";

const { pathname } = useLocation();

export const Route = createRootRoute({
  component: () => (
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
  ),
});
