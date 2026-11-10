import { useState } from "react";
import { Search, X, Users, TrendingUp, Cpu, Banknote, MapPin, ExternalLink, Bookmark, Check, SlidersHorizontal } from "lucide-react";
import { signals, facets, type Signal, type SignalType } from "./data";
import { cn } from "@/lib/utils";

const typeIcon: Record<SignalType, typeof Users> = {
  "Hiring surge": Users, "Leadership change": TrendingUp, "Tech stack change": Cpu, "Funding event": Banknote, Expansion: MapPin,
};

function Facet({ title, options, selected, toggle }: { title: string; options: string[]; selected: string[]; toggle: (o: string) => void }) {
  return (
    <div className="border-b border-border py-4">
      <h4 className="mb-3 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{title}</h4>
      <div className="space-y-1">
        {options.map((o) => {
          const on = selected.includes(o);
          return (
            <button key={o} onClick={() => toggle(o)} className="flex w-full items-center gap-2.5 rounded-md px-1.5 py-1.5 text-left text-sm hover:bg-muted">
              <span className={cn("grid h-4 w-4 place-items-center rounded border", on ? "border-terracotta bg-primary" : "border-border bg-card")}>{on && <Check className="h-3 w-3" />}</span>
              {o}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Score({ label, value, tone }: { label: string; value: number; tone: "peach" | "green" }) {
  return (
    <div className="w-24">
      <div className="flex justify-between text-[11px] text-muted-foreground"><span>{label}</span><span className="font-mono text-foreground">{value}</span></div>
      <div className="mt-1 h-1 rounded-full bg-muted"><div className={cn("h-full rounded-full", tone === "peach" ? "bg-primary" : "bg-success")} style={{ width: `${value}%` }} /></div>
    </div>
  );
}

const intentStyle = { High: "bg-peach-soft text-terracotta", Medium: "bg-muted text-foreground", Low: "bg-muted text-muted-foreground" };

function Inspector({ s, onClose }: { s: Signal; onClose: () => void }) {
  const Icon = typeIcon[s.type];
  return (
    <aside className="flex w-[420px] shrink-0 flex-col border-l border-border bg-card animate-in slide-in-from-right-8 fade-in duration-300">
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">Signal inspector</span>
        <button onClick={onClose} className="rounded-md p-1 hover:bg-muted" aria-label="Close inspector"><X className="h-4 w-4" /></button>
      </div>
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="flex items-center gap-2 text-sm text-terracotta"><Icon className="h-4 w-4" />{s.type}</div>
        <h2 className="mt-3 text-2xl font-semibold leading-tight">{s.headline}</h2>
        <div className="mt-4 flex items-center gap-3 rounded-xl border border-border p-3">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-peach-soft font-display font-semibold text-terracotta">{s.company[0]}</span>
          <div className="text-sm"><div className="font-medium">{s.company}</div><div className="font-mono text-[11px] text-muted-foreground">{s.domain} · {s.size} staff · {s.location}</div></div>
        </div>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{s.summary}</p>
        <div className="mt-6 grid grid-cols-2 gap-3">
          {[["ICP fit", s.fit, "bg-primary"], ["Confidence", s.confidence, "bg-success"]].map(([l, v, c]) => (
            <div key={l as string} className="rounded-xl bg-background p-4">
              <div className="text-xs text-muted-foreground">{l}</div>
              <div className="font-display text-3xl font-semibold">{v}</div>
              <div className="mt-2 h-1.5 rounded-full bg-muted"><div className={cn("h-full rounded-full", c as string)} style={{ width: `${v}%` }} /></div>
            </div>
          ))}
        </div>
        <h4 className="mt-8 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">Why this surfaced</h4>
        <ul className="mt-3 space-y-2">
          {s.why.map((w) => <li key={w} className="flex gap-2 text-sm"><Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />{w}</li>)}
        </ul>
        <h4 className="mt-8 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">Evidence trail</h4>
        <ol className="mt-3 border-l border-border">
          {s.evidence.map((e) => (
            <li key={e.label} className="relative pb-4 pl-5">
              <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-card bg-primary" />
              <div className="text-sm font-medium">{e.label}</div>
              <div className="flex items-center gap-1 font-mono text-[11px] text-muted-foreground">{e.date} · {e.source}<ExternalLink className="h-3 w-3" /></div>
            </li>
          ))}
        </ol>
        <p className="rounded-lg bg-muted p-3 text-xs text-muted-foreground">Signals indicate possible need, not confirmed buying intent. Review evidence before outreach.</p>
      </div>
      <div className="flex gap-2 border-t border-border p-4">
        <button className="flex-1 rounded-lg bg-ink py-2.5 text-sm font-medium text-ink-foreground">Send to review queue</button>
        <button className="rounded-lg border border-border px-3" aria-label="Save"><Bookmark className="h-4 w-4" /></button>
        <button className="rounded-lg border border-border px-3 text-sm">Dismiss</button>
      </div>
    </aside>
  );
}

export function Workspace() {
  const [sel, setSel] = useState<{ type: string[]; industry: string[]; intent: string[]; window: string[] }>({ type: [], industry: [], intent: [], window: ["7 days"] });
  const [active, setActive] = useState<Signal | null>(signals[0] ?? null);
  const toggle = (k: "type" | "industry" | "intent" | "window") => (o: string) =>
    setSel((p) => ({ ...p, [k]: k === "window" ? [o] : p[k].includes(o) ? p[k].filter((x) => x !== o) : [...p[k], o] }));

  const list = signals.filter((s) =>
    (!sel.type.length || sel.type.includes(s.type)) && (!sel.industry.length || sel.industry.includes(s.industry)) && (!sel.intent.length || sel.intent.includes(s.intent)));

  return (
    <div className="flex h-full bg-background">

      <aside className="w-60 shrink-0 overflow-y-auto border-r border-border px-4 py-5">
        <div className="flex items-center justify-between"><h3 className="text-sm font-semibold">Filters</h3><SlidersHorizontal className="h-4 w-4 text-muted-foreground" /></div>
        <Facet title="Signal type" options={facets.type} selected={sel.type} toggle={toggle("type")} />
        <Facet title="Industry" options={facets.industry} selected={sel.industry} toggle={toggle("industry")} />
        <Facet title="Intent level" options={facets.intent} selected={sel.intent} toggle={toggle("intent")} />
        <Facet title="Time window" options={facets.window} selected={sel.window} toggle={toggle("window")} />
      </aside>
      <main className="flex-1 overflow-y-auto">
        <div className="sticky top-0 z-10 border-b border-border bg-background/90 px-8 py-5 backdrop-blur">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">ICP · EU logistics & fintech</p>
              <h1 className="mt-1 text-3xl font-semibold">Signal discovery</h1>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm text-muted-foreground"><Search className="h-4 w-4" /> Search companies, signals…</div>
          </div>
          <div className="mt-4 flex gap-6 text-sm">
            <span className="border-b-2 border-primary pb-1 font-medium">Feed <span className="font-mono text-muted-foreground">{list.length}</span></span>
            <span className="text-muted-foreground">Saved</span><span className="text-muted-foreground">Dismissed</span>
          </div>
        </div>
        <div className="space-y-3 px-8 py-6">
          {list.length === 0 && <div className="rounded-2xl border border-dashed border-border p-12 text-center text-sm text-muted-foreground">No signals match these filters.</div>}
          {list.map((s) => {
            const Icon = typeIcon[s.type];
            const on = active?.id === s.id;
            return (
              <button key={s.id} onClick={() => setActive(s)}
                className={cn("group grid w-full grid-cols-[auto_1fr_auto] items-center gap-5 rounded-2xl border bg-card p-5 text-left transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-float)]",
                  on ? "border-primary ring-2 ring-peach-soft" : "border-border")}>
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-peach-soft text-terracotta"><Icon className="h-5 w-5" /></span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-semibold text-foreground">{s.company}</span>
                    <span className="text-muted-foreground">· {s.industry}</span>
                    <span className={cn("rounded px-1.5 py-0.5 font-mono text-[10px]", intentStyle[s.intent])}>{s.intent} intent</span>
                  </div>
                  <div className="mt-1 truncate font-medium">{s.headline}</div>
                  <div className="mt-1.5 flex items-center gap-3 font-mono text-[11px] text-muted-foreground">
                    <span className="rounded border border-border px-1.5 py-0.5">{s.source}</span><span>{s.detected}</span>
                  </div>
                </div>
                <div className="hidden gap-4 md:flex"><Score label="Fit" value={s.fit} tone="peach" /><Score label="Conf." value={s.confidence} tone="green" /></div>
              </button>
            );
          })}
        </div>
      </main>
      {active && <Inspector s={active} onClose={() => setActive(null)} />}
    </div>
  );
}
