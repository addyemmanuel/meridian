import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Bookmark, ArrowUpRight, Building2, Radar, Target, X, ChevronDown, ArrowDownWideNarrow } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CompanyIntelligence } from "@/components/app/CompanyIntelligence";
import { prospects, filterProspects, type Prospect } from "@/components/app/prospect-data";
import { useAccount } from "@/components/app/accounts";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/prospects")({
  head: () => ({ meta: [
    { title: "Prospect Database — Meridian" },
    { name: "description", content: "Explore target companies, buying signals, decision-makers and technology intelligence in Meridian." },
    { property: "og:title", content: "Prospect Database — Meridian" },
    { property: "og:description", content: "Company intelligence and prioritized prospects for your workspace." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: ProspectDatabase,
});

const intentStyles = { High: "bg-success-soft text-success", Medium: "bg-peach-soft text-terracotta", Low: "bg-muted text-muted-foreground" };

function ProspectDatabase() {
  const { account } = useAccount();
  const [query, setQuery] = useState("");
  const [industry, setIndustry] = useState("All industries");
  const [intent, setIntent] = useState("All intent levels");
  const [view, setView] = useState("All companies");
  const [sortByFit, setSortByFit] = useState(true);
  const [active, setActive] = useState<Prospect | null>(null);
  const [savedByAccount, setSavedByAccount] = useState<Record<string, string[]>>({});
  const saved = savedByAccount[account.id] ?? [];
  const toggleSaved = (id: string) => setSavedByAccount((previous) => {
    const current = previous[account.id] ?? [];
    return { ...previous, [account.id]: current.includes(id) ? current.filter((value) => value !== id) : [...current, id] };
  });
  const filtered = filterProspects(prospects, query, industry, intent).filter((p) => view === "All companies" || saved.includes(p.id));
  const list = [...filtered].sort((a, b) => sortByFit ? b.fit - a.fit : a.name.localeCompare(b.name));
  const industries = useMemo(() => [...new Set(prospects.map((p) => p.industry))].sort(), []);
  const hasFilters = query !== "" || industry !== "All industries" || intent !== "All intent levels";

  return (
    <div className="mx-auto max-w-7xl px-4 py-7 md:px-8 md:py-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div><p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">ICP · {account.icp}</p><h1 className="mt-1 text-3xl font-semibold">Prospect database</h1><p className="mt-2 text-sm text-muted-foreground">Your next opportunity starts with the right company.</p></div>
        <span className="flex items-center gap-2 text-xs text-success"><span className="h-1.5 w-1.5 rounded-full bg-success" />Intelligence up to date</span>
      </div>

      <div className="mt-7 grid grid-cols-2 gap-y-5 border-y border-border py-5 lg:grid-cols-4">
        {[{ label: "Companies", value: prospects.length, icon: Building2 }, { label: "High-intent companies", value: prospects.filter((p) => p.intent === "High").length, icon: Target }, { label: "Active buying signals", value: prospects.reduce((total, p) => total + p.signals.length, 0), icon: Radar }, { label: "Saved prospects", value: saved.length, icon: Bookmark }].map(({ label, value, icon: Icon }, i) => <div key={label} className={cn("px-4 first:pl-0", i % 2 === 1 && "border-l border-border", i === 2 && "lg:border-l")}><div className="flex items-center gap-2 text-xs text-muted-foreground"><Icon className="h-4 w-4" />{label}</div><p className="mt-2 font-display text-3xl font-semibold">{value}</p></div>)}
      </div>

      <div className="mt-5 flex gap-5 border-b border-border" role="tablist" aria-label="Prospect views">
        {["All companies", "Saved prospects"].map((label) => <Button key={label} role="tab" aria-selected={view === label} onClick={() => setView(label)} variant="ghost" className={cn("h-11 rounded-none border-b-2 border-transparent px-0 hover:bg-transparent", view === label ? "border-primary" : "text-muted-foreground")}>{label}<span className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px]">{label === "All companies" ? prospects.length : saved.length}</span></Button>)}
      </div>

      <div className="flex flex-wrap items-center gap-3 py-5">
        <div className="relative w-full sm:max-w-xs"><Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" /><Input value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search prospects" placeholder="Search companies, industries…" className="h-9 bg-card pl-9" /></div>
        <Select value={industry} onValueChange={setIndustry}><SelectTrigger className="h-9 w-[170px] bg-card" aria-label="Filter by industry"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="All industries">All industries</SelectItem>{industries.map((value) => <SelectItem key={value} value={value}>{value}</SelectItem>)}</SelectContent></Select>
        <Select value={intent} onValueChange={setIntent}><SelectTrigger className="h-9 w-[170px] bg-card" aria-label="Filter by buying intent"><SelectValue /></SelectTrigger><SelectContent>{["All intent levels", "High", "Medium", "Low"].map((value) => <SelectItem key={value} value={value}>{value}</SelectItem>)}</SelectContent></Select>
        {hasFilters && <Button variant="ghost" size="sm" onClick={() => { setQuery(""); setIndustry("All industries"); setIntent("All intent levels"); }}><X />Clear</Button>}
        <Button variant="ghost" className="sm:ml-auto" onClick={() => setSortByFit((value) => !value)} aria-label={sortByFit ? "Sort companies alphabetically" : "Sort companies by ICP fit"}><ArrowDownWideNarrow />{sortByFit ? "Highest fit" : "Company A–Z"}<ChevronDown /></Button>
      </div>

      <div className="overflow-x-auto border-y border-border bg-card">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="border-b border-border bg-muted/40 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"><tr><th className="px-5 py-3 font-normal">Company</th><th className="px-4 py-3 font-normal">Industry / location</th><th className="px-4 py-3 font-normal">Employees</th><th className="px-4 py-3 font-normal">ICP fit</th><th className="px-4 py-3 font-normal">Intent</th><th className="px-4 py-3 font-normal">Signals</th><th className="px-4 py-3"><span className="sr-only">Save company</span></th></tr></thead>
          <tbody className="divide-y divide-border">{list.map((p) => <tr key={p.id} className="group transition-colors hover:bg-peach-soft/20">
            <td className="px-5 py-4"><div className="flex items-center gap-3"><span className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-lg font-display text-xs font-semibold", p.industry === "Logistics" || p.industry === "Financial services" ? "bg-peach-soft text-terracotta" : "bg-success-soft text-success")}>{p.name.split(" ").map((word) => word[0]).slice(0, 2).join("")}</span><div><Button variant="ghost" onClick={() => setActive(p)} className="h-auto justify-start gap-1 p-0 font-semibold hover:bg-transparent hover:text-terracotta" aria-label={`Inspect ${p.name}`}>{p.name}<ArrowUpRight className="opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100" /></Button><p className="mt-1 font-mono text-[10px] text-muted-foreground">{p.domain}</p></div></div></td>
            <td className="px-4 py-4"><p className="text-xs">{p.industry}</p><p className="mt-1 text-xs text-muted-foreground">{p.location}</p></td><td className="px-4 py-4 font-mono text-xs text-muted-foreground">{p.employees}</td>
            <td className="px-4 py-4"><div className="flex items-center gap-2"><span className="font-mono text-sm font-medium">{p.fit}</span><div className="h-1.5 w-12 overflow-hidden rounded-full bg-muted"><div className="h-full bg-primary" style={{ width: `${p.fit}%` }} /></div></div></td>
            <td className="px-4 py-4"><span className={cn("inline-flex items-center gap-1.5 rounded px-2 py-1 text-[10px] font-medium", intentStyles[p.intent])}><span className="h-1 w-1 rounded-full bg-current" />{p.intent}</span></td>
            <td className="px-4 py-4"><span className={cn("flex items-center gap-1.5 font-mono text-xs", p.signals.length ? "text-terracotta" : "text-muted-foreground")}><Radar className="h-3.5 w-3.5" />{p.signals.length}</span></td>
            <td className="px-4 py-4"><Button variant="ghost" size="icon" aria-label={`${saved.includes(p.id) ? "Unsave" : "Save"} ${p.name}`} aria-pressed={saved.includes(p.id)} onClick={() => toggleSaved(p.id)} className={cn("h-8 w-8", saved.includes(p.id) && "text-terracotta")}><Bookmark className={saved.includes(p.id) ? "fill-current" : ""} /></Button></td>
          </tr>)}</tbody>
        </table>
        {list.length === 0 && <div className="py-16 text-center"><Search className="mx-auto mb-3 h-7 w-7 text-muted-foreground" /><h3 className="text-sm font-semibold">{view === "Saved prospects" && !hasFilters ? "No saved prospects yet" : "No companies match your filters"}</h3>{hasFilters && <Button variant="ghost" className="mt-3 text-terracotta" onClick={() => { setQuery(""); setIndustry("All industries"); setIntent("All intent levels"); }}>Clear filters</Button>}</div>}
      </div>
      <div className="flex items-center justify-between py-4 text-xs text-muted-foreground"><span>{list.length} {list.length === 1 ? "company" : "companies"}</span><span className="font-mono text-[10px]">Meridian intelligence</span></div>
      <CompanyIntelligence key={active?.id ?? "closed"} company={active} onClose={() => setActive(null)} saved={active ? saved.includes(active.id) : false} onSave={() => { if (active) toggleSaved(active.id); }} />
    </div>
  );
}