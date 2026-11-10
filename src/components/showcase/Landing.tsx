import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Building2, Radar, ShieldCheck, Layers, Eye, Scale, CheckCircle2 } from "lucide-react";

function Nav() {
  return (
    <header className="mx-auto flex max-w-7xl items-center justify-between px-6 pt-24 pb-6 lg:px-10">
      <div className="flex items-center gap-2">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-ink font-display text-sm font-bold text-primary">M</span>
        <span className="font-display text-lg font-semibold">Meridian</span>
      </div>
      <nav className="hidden gap-8 text-sm text-muted-foreground md:flex">
        <span>Product</span><span>How it works</span><span>Data ethics</span><span>Pricing</span>
      </nav>
      <div className="flex items-center gap-3 text-sm">
        <span className="hidden text-muted-foreground sm:inline">Sign in</span>
        <Link to="/app" className="rounded-full bg-ink px-4 py-2 font-medium text-ink-foreground">Sign in</Link>
      </div>
    </header>
  );
}

function HeroPreview() {
  return (
    <div className="relative">
      <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-peach-soft" />
      <div className="rotate-[-1.5deg] rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-float)] transition-transform duration-500 hover:rotate-0">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">Signal · detected 2h ago</span>
          <span className="rounded-md bg-success-soft px-2 py-0.5 font-mono text-[11px] text-success">Verified · 3 sources</span>
        </div>
        <h3 className="mt-4 text-xl font-semibold">Halden Logistics</h3>
        <p className="mt-1 text-sm text-muted-foreground">11 data & platform engineering roles opened in 21 days.</p>
        <div className="mt-5 grid grid-cols-2 gap-3">
          {[["ICP fit", 92], ["Confidence", 84]].map(([l, v]) => (
            <div key={l} className="rounded-xl border border-border p-3">
              <div className="text-xs text-muted-foreground">{l}</div>
              <div className="mt-1 font-display text-2xl font-semibold">{v}</div>
              <div className="mt-2 h-1.5 rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{ width: `${v}%` }} /></div>
            </div>
          ))}
        </div>
        <div className="mt-4 space-y-2 border-t border-border pt-4 text-xs">
          {["Matches ICP: logistics, 500+ staff, EU", "Role keywords overlap your category"].map((t) => (
            <div key={t} className="flex items-center gap-2 text-muted-foreground"><CheckCircle2 className="h-3.5 w-3.5 text-success" />{t}</div>
          ))}
        </div>
      </div>
      <div className="absolute -bottom-8 -left-8 hidden rotate-[2deg] rounded-xl border border-border bg-card px-4 py-3 shadow-[var(--shadow-float)] md:block">
        <div className="font-mono text-[11px] text-muted-foreground">Decision-maker found</div>
        <div className="text-sm font-medium">Head of Data Infrastructure</div>
      </div>
    </div>
  );
}

export function Landing() {
  return (
    <div className="bg-background">
      <Nav />
      <section className="mx-auto grid max-w-7xl items-center gap-16 px-6 pt-10 pb-28 lg:grid-cols-[1.15fr_1fr] lg:px-10">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-terracotta">Lead intelligence, with receipts</p>
          <h1 className="mt-6 text-[clamp(2.75rem,6vw,5.25rem)] font-semibold leading-[0.95]">
            Find the companies <em className="font-normal italic text-terracotta">ready</em> to hear from you.
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Meridian builds a prospect database around your ideal customer, then watches for the signals that suggest a real need — and shows you exactly why each lead was surfaced.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground transition hover:bg-terracotta hover:text-ink-foreground">
              Start with your ICP <ArrowRight className="h-4 w-4" />
            </button>
            <button className="inline-flex items-center gap-2 px-2 py-3 font-medium underline decoration-primary decoration-2 underline-offset-8">See a sample pipeline</button>
          </div>
        </div>
        <HeroPreview />
      </section>

      {/* Problem */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-[1fr_2fr] lg:px-10">
          <h2 className="text-4xl font-semibold leading-tight">Most prospect lists are big, stale, and silent about timing.</h2>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
            {[
              ["01", "Volume isn't relevance", "Static databases tell you who exists, not who has a reason to buy now."],
              ["02", "Signals are scattered", "Hiring posts, leadership news and stack changes live across dozens of sources."],
              ["03", "Black-box scores", "Reps ignore lead scores they can't explain. Trust needs visible evidence."],
            ].map(([n, t, d]) => (
              <div key={n} className="bg-card p-6">
                <span className="font-mono text-xs text-terracotta">{n}</span>
                <h3 className="mt-6 text-lg font-semibold">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engines */}
      <section className="mx-auto max-w-7xl px-6 py-28 lg:px-10">
        <div className="flex items-end justify-between gap-6">
          <h2 className="max-w-2xl text-5xl font-semibold leading-[1.02]">Two engines. <span className="text-muted-foreground">One prioritized pipeline.</span></h2>
          <span className="hidden font-mono text-xs text-muted-foreground md:block">HOW IT WORKS</span>
        </div>
        <div className="mt-16 grid gap-6 lg:grid-cols-[1fr_auto_1fr]">
          <div className="rounded-3xl border border-border bg-card p-8">
            <div className="flex items-center gap-3"><Building2 className="h-5 w-5 text-terracotta" /><span className="font-mono text-xs uppercase tracking-wider">Engine 01</span></div>
            <h3 className="mt-6 text-3xl font-semibold">Prospect Database</h3>
            <p className="mt-3 text-muted-foreground">Discover companies matching your ICP and enrich them with firmographics and, where permitted, relevant decision-makers.</p>
            <div className="mt-8 space-y-2">
              {[["Industry", "Logistics, Supply chain"], ["Headcount", "500 – 5,000"], ["Region", "EU, UK"], ["Roles", "CTO, Head of Data"]].map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-dashed border-border py-2 text-sm"><span className="text-muted-foreground">{k}</span><span className="font-medium">{v}</span></div>
              ))}
            </div>
          </div>
          <div className="hidden items-center lg:flex"><div className="grid h-14 w-14 place-items-center rounded-full bg-primary"><Layers className="h-5 w-5" /></div></div>
          <div className="rounded-3xl bg-ink p-8 text-ink-foreground">
            <div className="flex items-center gap-3"><Radar className="h-5 w-5 text-primary" /><span className="font-mono text-xs uppercase tracking-wider">Engine 02</span></div>
            <h3 className="mt-6 text-3xl font-semibold">Buying-Signal Detection</h3>
            <p className="mt-3 opacity-70">Monitor configurable sources for evidence of a relevant need — then score each signal on fit and confidence.</p>
            <div className="mt-8 space-y-3">
              {[["Hiring surge", "Careers page", 84], ["Leadership change", "Press release", 91], ["Tech stack change", "Site scan", 62]].map(([t, s, c]) => (
                <div key={t as string} className="flex items-center justify-between rounded-xl border border-ink-foreground/15 px-4 py-3 text-sm">
                  <div><div className="font-medium">{t}</div><div className="font-mono text-[11px] opacity-60">{s}</div></div>
                  <span className="font-mono text-primary">{c}% conf.</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Principles / trust */}
      <section className="bg-peach-soft">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <h2 className="max-w-3xl text-4xl font-semibold leading-tight">Built to be trusted by the people who actually send the email.</h2>
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {[
              [Eye, "Every score is explainable", "See the sources, dates, and reasons behind each fit and confidence value."],
              [Scale, "Signals, not promises", "A signal is evidence of possible need — never presented as guaranteed intent."],
              [ShieldCheck, "Compliance-aware by default", "Source rules, opt-outs and regional data policies are configurable per workspace."],
            ].map(([Icon, t, d]: any) => (
              <div key={t}>
                <Icon className="h-6 w-6 text-terracotta" />
                <h3 className="mt-5 text-xl font-semibold">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
          <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
            {[["5", "signal families"], ["2", "discovery engines"], ["100%", "scores with evidence"], ["0", "invented contacts"]].map(([v, l]) => (
              <div key={l} className="bg-card p-6"><div className="font-display text-4xl font-semibold">{v}</div><div className="mt-1 text-sm text-muted-foreground">{l}</div></div>
            ))}
          </div>
          <p className="mt-3 font-mono text-[11px] text-muted-foreground">Product capabilities, not customer outcomes.</p>
        </div>
      </section>

      {/* CTA + footer */}
      <section className="mx-auto max-w-7xl px-6 py-28 text-center lg:px-10">
        <h2 className="mx-auto max-w-3xl text-[clamp(2.5rem,5vw,4.5rem)] font-semibold leading-none">Spend your week on the right accounts.</h2>
        <button className="mt-10 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 font-medium text-ink-foreground">Request early access <ArrowUpRight className="h-4 w-4" /></button>
      </section>
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-6 py-10 text-sm text-muted-foreground md:flex-row lg:px-10">
          <span className="font-display font-semibold text-foreground">Meridian</span>
          <div className="flex gap-6"><span>Product</span><span>Data ethics</span><span>Security</span><span>Privacy</span><span>Contact</span></div>
          <span className="font-mono text-xs">© 2026 Meridian</span>
        </div>
      </footer>
    </div>
  );
}
