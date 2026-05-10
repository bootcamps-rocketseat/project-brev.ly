import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./theme.css";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
});

const TOAST_AUTO_CLOSE_TIME_IN_MILLISECONDS = 1000 * 5;
const TOAST_LIMIT = 5;

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ToastContainer
        autoClose={TOAST_AUTO_CLOSE_TIME_IN_MILLISECONDS}
        limit={TOAST_LIMIT}
        position="bottom-right"
        hideProgressBar
        closeButton={false}
      />
    </QueryClientProvider>
  </StrictMode>,
);
