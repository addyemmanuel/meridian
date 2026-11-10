import { createFileRoute } from "@tanstack/react-router";
import { Workspace } from "@/components/showcase/Workspace";

export const Route = createFileRoute("/app/signals")({
  head: () => ({
    meta: [
      { title: "Signals — Meridian" },
      { name: "description", content: "Live feed of buying signals with fit and confidence scores." },
      { property: "og:title", content: "Signals — Meridian" },
      { property: "og:description", content: "Discover and review buying signals across your ICP." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Workspace,
});
