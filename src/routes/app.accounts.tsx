import { createFileRoute } from "@tanstack/react-router";
import { Plus, MoreHorizontal } from "lucide-react";
import { accounts, useAccount } from "@/components/app/accounts";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/accounts")({
  head: () => ({
    meta: [
      { title: "Workspaces — Meridian" },
      { name: "description", content: "Manage and switch between the client workspaces you have access to." },
      { property: "og:title", content: "Workspaces — Meridian" },
      { property: "og:description", content: "Multi-account management for Meridian." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Accounts,
});

const statusStyle = { Active: "bg-success/15 text-success", Trial: "bg-peach-soft text-terracotta", Paused: "bg-muted text-muted-foreground" };

function Accounts() {
  const { account, setAccount } = useAccount();
  return (
    <div className="mx-auto max-w-6xl px-8 py-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{accounts.length} workspaces</p>
          <h1 className="mt-1 text-3xl font-semibold">Workspaces</h1>
          <p className="mt-1 text-sm text-muted-foreground">Every client or business unit keeps its own ICP, signals and team.</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-ink px-4 py-2.5 text-sm font-medium text-ink-foreground"><Plus className="h-4 w-4" /> New workspace</button>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card">
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] gap-4 border-b border-border px-6 py-3 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          <span>Workspace</span><span>Plan</span><span>Your role</span><span>Signals (7d)</span><span>Credits</span><span />
        </div>
        {accounts.map((a) => {
          const current = a.id === account.id;
          return (
            <div key={a.id} className={cn("grid grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] items-center gap-4 border-b border-border px-6 py-4 last:border-0", current && "bg-peach-soft/40")}>
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-peach-soft font-display text-sm font-semibold text-terracotta">{a.initials}</span>
                <div>
                  <div className="flex items-center gap-2 font-medium">{a.name}<span className={cn("rounded px-1.5 py-0.5 font-mono text-[10px]", statusStyle[a.status])}>{a.status}</span></div>
                  <div className="text-xs text-muted-foreground">{a.icp} · {a.seats} seats</div>
                </div>
              </div>
              <span className="text-sm">{a.plan}</span>
              <span className="text-sm text-muted-foreground">{a.role}</span>
              <span className="font-mono text-sm">{a.signals}</span>
              <div className="w-24">
                <div className="font-mono text-[11px] text-muted-foreground">{a.credits}%</div>
                <div className="mt-1 h-1 rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{ width: `${a.credits}%` }} /></div>
              </div>
              <div className="flex items-center gap-2">
                {current ? (
                  <span className="w-20 text-center font-mono text-[11px] text-terracotta">Current</span>
                ) : (
                  <button onClick={() => setAccount(a)} className="w-20 rounded-lg border border-border py-1.5 text-xs font-medium hover:bg-muted">Switch</button>
                )}
                <button className="rounded-md p-1.5 hover:bg-muted" aria-label="More"><MoreHorizontal className="h-4 w-4" /></button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
