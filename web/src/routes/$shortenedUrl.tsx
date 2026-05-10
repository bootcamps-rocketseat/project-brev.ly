import { RouteRedirectLink } from "@/pages/redirect-link";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$shortenedUrl")({
  component: RouteRedirectLink,
});
