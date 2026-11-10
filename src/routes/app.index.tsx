import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Radar, Users, Gauge, Wallet } from "lucide-react";
import { useAccount } from "@/components/app/accounts";
import { signals } from "@/components/showcase/data";

export const Route = createFileRoute("/app/")({
  head: () => ({
    meta: [
      { title: "Overview — Meridian" },
      { name: "description", content: "Your workspace at a glance: signals, pipeline, credits and team activity." },
      { property: "og:title", content: "Overview — Meridian" },
      { property: "og:description", content: "Workspace dashboard for Meridian lead intelligence." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Overview,
});

const week = [38, 52, 44, 61, 70, 58, 82];

function Overview() {
  const { account } = useAccount();
  const stats = [
    { label: "New signals (7d)", value: account.signals, icon: Radar },
    { label: "Influenced pipeline", value: account.pipeline, icon: Wallet },
    { label: "Team seats", value: account.seats, icon: Users },
    { label: "Credits used", value: `${account.credits}%`, icon: Gauge },
  ];
  return (
    <div className="mx-auto max-w-6xl px-8 py-8">
      <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">ICP · {account.icp}</p>
      <h1 className="mt-1 text-3xl font-semibold">Good evening, Emmanuel</h1>
      <p className="mt-1 text-sm text-muted-foreground">Here's what changed in <span className="text-foreground">{account.name}</span> this week.</p>

      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between text-xs text-muted-foreground">{label}<Icon className="h-4 w-4" /></div>
            <div className="mt-3 font-display text-3xl font-semibold">{value}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-2xl border border-border bg-card p-6">
          <h3 className="font-semibold">Signal volume</h3>
          <p className="text-xs text-muted-foreground">Last 7 days</p>
          <div className="mt-6 flex h-40 items-end gap-3">
            {week.map((v, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-2">
                <div className="w-full rounded-t-lg bg-primary/80" style={{ height: `${v}%` }} />
                <span className="font-mono text-[10px] text-muted-foreground">{"MTWTFSS"[i]}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Top signals</h3>
            <Link to="/app/signals" className="inline-flex items-center gap-1 text-xs text-terracotta">View all <ArrowUpRight className="h-3 w-3" /></Link>
          </div>
          <ul className="mt-4 divide-y divide-border">
            {signals.slice(0, 4).map((s) => (
              <li key={s.id} className="flex items-center justify-between gap-3 py-3">
                <div className="min-w-0">
                  <div className="text-sm font-medium">{s.company}</div>
                  <div className="truncate text-xs text-muted-foreground">{s.headline}</div>
                </div>
                <span className="font-mono text-sm">{s.fit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
