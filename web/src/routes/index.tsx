import { createFileRoute } from "@tanstack/react-router";
import { RouteHome } from "../pages/home";

export const Route = createFileRoute("/")({
  component: RouteHome,
});
