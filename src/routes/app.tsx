import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { LayoutGrid, Radar, Building2, Settings, ChevronsUpDown, Check, Plus, Bell, Search, Database } from "lucide-react";
import { AccountProvider, accounts, useAccount } from "@/components/app/accounts";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

const nav = [
  { to: "/app", label: "Overview", icon: LayoutGrid },
  { to: "/app/signals", label: "Signals", icon: Radar },
  { to: "/app/prospects", label: "Prospect database", icon: Database },
  { to: "/app/accounts", label: "Accounts", icon: Building2 },
] as const;

function AccountSwitcher() {
  const { account, setAccount } = useAccount();
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setOpen((o) => !o)} className="flex items-center gap-2.5 rounded-xl border border-border bg-card py-1.5 pl-1.5 pr-3 text-left transition hover:bg-muted">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-peach-soft font-display text-xs font-semibold text-terracotta">{account.initials}</span>
        <span className="leading-tight">
          <span className="block text-sm font-medium">{account.name}</span>
          <span className="block font-mono text-[10px] text-muted-foreground">{account.plan} · {account.role}</span>
        </span>
        <ChevronsUpDown className="ml-2 h-4 w-4 text-muted-foreground" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-full z-50 mt-2 w-72 rounded-2xl border border-border bg-card p-1.5 shadow-[var(--shadow-float)] animate-in fade-in slide-in-from-top-1">
            <p className="px-3 pb-1 pt-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Workspaces</p>
            {accounts.map((a) => (
              <button key={a.id} onClick={() => { setAccount(a); setOpen(false); }} className="flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-left hover:bg-muted">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-muted font-display text-xs font-semibold">{a.initials}</span>
                <span className="flex-1 leading-tight">
                  <span className="block text-sm font-medium">{a.name}</span>
                  <span className="block text-[11px] text-muted-foreground">{a.icp}</span>
                </span>
                {a.id === account.id && <Check className="h-4 w-4 text-terracotta" />}
              </button>
            ))}
            <div className="my-1 border-t border-border" />
            <Link to="/app/accounts" onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-xl px-2.5 py-2 text-sm text-muted-foreground hover:bg-muted">
              <Plus className="h-4 w-4" /> Manage workspaces
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

function AppLayout() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <AccountProvider>
      <div className="flex h-screen w-full bg-background">
        <aside className="flex w-16 shrink-0 flex-col items-center gap-2 border-r border-border bg-sidebar py-4">
          <Link to="/" className="mb-4 grid h-9 w-9 place-items-center rounded-lg bg-ink font-display font-bold text-primary">M</Link>
          {nav.map(({ to, label, icon: Icon }) => (
           <Link key={to} to={to} title={label} aria-label={label}
              className={cn("grid h-10 w-10 place-items-center rounded-xl text-muted-foreground transition hover:bg-accent", path.replace(/\/$/, "") === to && "bg-accent text-terracotta")}>
              <Icon className="h-[18px] w-[18px]" />
            </Link>
          ))}
          <button title="Settings" className="mt-auto grid h-10 w-10 place-items-center rounded-xl text-muted-foreground hover:bg-accent"><Settings className="h-[18px] w-[18px]" /></button>
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-16 shrink-0 items-center justify-between border-b border-border px-6">
            <AccountSwitcher />
            <div className="flex items-center gap-3">
              <div className="hidden items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm text-muted-foreground md:flex"><Search className="h-4 w-4" /> Search… <kbd className="ml-6 font-mono text-[10px]">⌘K</kbd></div>
              <button className="relative rounded-lg p-2 hover:bg-muted" aria-label="Notifications"><Bell className="h-4 w-4" /><span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-terracotta" /></button>
              <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-xs font-medium text-ink-foreground">EA</span>
            </div>
          </header>
          <div className="min-h-0 flex-1 overflow-y-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </AccountProvider>
  );
}
