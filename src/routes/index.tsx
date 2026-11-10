import { createFileRoute } from "@tanstack/react-router";
import { Landing } from "@/components/showcase/Landing";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Meridian — B2B Lead Intelligence" },
      { name: "description", content: "Prospect database and buying-signal detection, combined into one prioritized pipeline." },
      { property: "og:title", content: "Meridian — B2B Lead Intelligence" },
      { property: "og:description", content: "Find the companies ready to buy, with the evidence to prove it." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});
