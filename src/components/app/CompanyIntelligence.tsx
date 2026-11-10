import { useState } from "react";
import { Bookmark, Check, MapPin, Users, Radar, Cpu, Building2, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { type Prospect } from "./prospect-data";
import { cn } from "@/lib/utils";

export function CompanyIntelligence({ company, onClose, saved, onSave }: {
  company: Prospect | null; onClose: () => void; saved: boolean; onSave: () => void;
}) {
  const [tab, setTab] = useState("Overview");
  const tabs = ["Overview", "Signals", "People", "Technology"];
  return (
    <Sheet open={Boolean(company)} onOpenChange={(open) => { if (!open) onClose(); }}>
      <SheetContent className="flex w-full flex-col gap-0 bg-card p-0 sm:max-w-[560px]">
        {company && <>
          <SheetHeader className="border-b border-border px-6 pb-6 pt-5 text-left">
            <p className="mb-5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Company intelligence</p>
            <div className="flex items-center gap-4">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-lg bg-peach-soft font-display text-xl font-semibold text-terracotta">{company.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}</span>
              <div className="min-w-0"><SheetTitle className="text-2xl">{company.name}</SheetTitle><SheetDescription className="mt-1 break-all font-mono text-xs">{company.domain}</SheetDescription></div>
            </div>
            <div className="flex flex-wrap gap-3 pt-3 text-xs text-muted-foreground"><span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{company.location}</span><span className="flex items-center gap-1"><Building2 className="h-3.5 w-3.5" />{company.industry}</span></div>
          </SheetHeader>
          <div className="flex shrink-0 gap-1 overflow-x-auto border-b border-border px-4" role="tablist" aria-label="Company intelligence sections">
            {tabs.map((t) => <Button key={t} role="tab" aria-selected={tab === t} variant="ghost" onClick={() => setTab(t)} className={cn("h-12 rounded-none border-b-2 border-transparent px-3 text-xs", tab === t ? "border-primary text-foreground" : "text-muted-foreground")}>{t}{t === "Signals" && <span className="font-mono text-[10px]">{company.signals.length}</span>}</Button>)}
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6" role="tabpanel" aria-label={tab}>
            {tab === "Overview" && <>
              <div className="grid grid-cols-3 divide-x divide-border border-y border-border py-4">
                <div><p className="text-xs text-muted-foreground">ICP fit</p><p className="mt-1 font-display text-3xl font-semibold">{company.fit}<span className="text-sm text-muted-foreground"> / 100</span></p></div>
                <div className="pl-4"><p className="text-xs text-muted-foreground">Buying intent</p><p className={cn("mt-2 text-sm font-semibold", company.intent === "High" ? "text-success" : "text-terracotta")}>{company.intent}<ArrowUpRight className="ml-1 inline h-4 w-4" /></p></div>
                <div className="pl-4"><p className="text-xs text-muted-foreground">Active signals</p><p className="mt-1 font-display text-3xl font-semibold">{company.signals.length}</p></div>
              </div>
              <h3 className="mt-7 text-sm font-semibold">Company overview</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{company.description}</p>
              <dl className="mt-5 grid grid-cols-2 gap-x-5 gap-y-5 text-sm"><div><dt className="text-xs text-muted-foreground">Employees</dt><dd className="mt-1 flex items-center gap-2"><Users className="h-4 w-4 text-muted-foreground" />{company.employees}</dd></div><div><dt className="text-xs text-muted-foreground">Estimated revenue</dt><dd className="mt-1">{company.revenue}</dd></div></dl>
              <div className="mt-7 flex items-center justify-between"><h3 className="text-sm font-semibold">Latest buying signal</h3><Button variant="ghost" size="sm" onClick={() => setTab("Signals")} className="text-terracotta">View signals<ArrowUpRight /></Button></div>
              {company.signals[0] ? <div className="mt-3 border-l-2 border-primary bg-peach-soft/30 p-4"><span className="text-xs text-terracotta">{company.signals[0].type}</span><p className="mt-2 text-sm font-medium">{company.signals[0].headline}</p><p className="mt-2 font-mono text-[10px] text-muted-foreground">{company.signals[0].source} · {company.signals[0].detected}</p></div> : <p className="mt-3 text-sm text-muted-foreground">No active signals detected.</p>}
              <h3 className="mt-7 text-sm font-semibold">Technology stack</h3><div className="mt-3 flex flex-wrap gap-2">{company.technologies.map((tech) => <span key={tech} className="rounded-md border border-border px-2.5 py-1.5 text-xs">{tech}</span>)}</div>
            </>}
            {tab === "Signals" && <><h3 className="text-sm font-semibold">Buying signals</h3>{company.signals.length === 0 ? <Empty icon={Radar} text="No active buying signals" /> : company.signals.map((s) => <article key={s.id} className="mt-5 border-b border-border pb-6"><div className="flex items-center justify-between text-xs"><span className="text-terracotta">{s.type}</span><span className="font-mono text-muted-foreground">{s.detected}</span></div><h4 className="mt-3 text-lg font-semibold">{s.headline}</h4><p className="mt-3 text-sm leading-6 text-muted-foreground">{s.summary}</p><p className="mt-4 font-mono text-xs text-success">{s.confidence}% confidence</p><h4 className="mt-5 text-xs font-semibold">Evidence trail</h4><ul className="mt-3 space-y-4">{s.evidence.map((e) => <li key={e.label} className="border-l-2 border-primary pl-3"><p className="text-sm">{e.label}</p><p className="mt-1 break-all font-mono text-[10px] text-muted-foreground">{e.source} · {e.date}</p></li>)}</ul><h4 className="mt-5 text-xs font-semibold">Why this company</h4><ul className="mt-3 space-y-2">{s.why.map((reason) => <li key={reason} className="flex gap-2 text-sm"><Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />{reason}</li>)}</ul></article>)}</>}
            {tab === "People" && <><h3 className="text-sm font-semibold">Key decision-makers</h3><div className="mt-4 divide-y divide-border">{company.people.map((person) => <div key={person.name} className="flex items-center gap-3 py-4"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-muted text-xs font-medium">{person.initials}</span><div><p className="text-sm font-medium">{person.name}</p><p className="mt-1 text-xs text-muted-foreground">{person.role}</p></div></div>)}</div></>}
            {tab === "Technology" && <><h3 className="text-sm font-semibold">Detected technologies</h3><div className="mt-4 divide-y divide-border">{company.technologies.map((tech) => <div key={tech} className="flex items-center gap-3 py-4"><Cpu className="h-5 w-5 text-terracotta" /><span className="flex-1 text-sm font-medium">{tech}</span><span className="rounded bg-success-soft px-2 py-1 text-[10px] text-success">Detected</span></div>)}</div></>}
          </div>
          <div className="shrink-0 border-t border-border px-6 py-4"><Button onClick={onSave} variant={saved ? "outline" : "default"} className="w-full">{saved ? <Check /> : <Bookmark />}{saved ? "Saved to prospects" : "Save prospect"}</Button></div>
        </>}
      </SheetContent>
    </Sheet>
  );
}

function Empty({ icon: Icon, text }: { icon: typeof Radar; text: string }) {
  return <div className="py-16 text-center text-muted-foreground"><Icon className="mx-auto mb-3 h-8 w-8" /><p className="text-sm">{text}</p></div>;
}