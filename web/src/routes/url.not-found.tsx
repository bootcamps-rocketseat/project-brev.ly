import { RouteNotFound } from "@/pages/not-found";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/url/not-found")({
  component: RouteNotFound,
});
