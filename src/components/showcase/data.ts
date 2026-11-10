export type SignalType = "Hiring surge" | "Leadership change" | "Tech stack change" | "Funding event" | "Expansion";

export interface Signal {
  id: string;
  company: string;
  domain: string;
  industry: string;
  type: SignalType;
  headline: string;
  summary: string;
  fit: number;
  confidence: number;
  intent: "High" | "Medium" | "Low";
  source: string;
  detected: string;
  location: string;
  size: string;
  evidence: { label: string; source: string; date: string }[];
  why: string[];
}

export const signals: Signal[] = [
  {
    id: "s1", company: "Halden Logistics", domain: "halden-logistics.example", industry: "Logistics",
    type: "Hiring surge", headline: "11 new data & platform engineering roles in 21 days",
    summary: "Engineering headcount openings rose sharply across Rotterdam and Lisbon offices, concentrated in data infrastructure.",
    fit: 92, confidence: 84, intent: "High", source: "Careers page", detected: "2h ago", location: "Rotterdam, NL", size: "800–1,200",
    evidence: [
      { label: "Senior Data Platform Engineer posted", source: "careers.halden…/jobs/4412", date: "Oct 17" },
      { label: "Head of Data Infrastructure posted", source: "careers.halden…/jobs/4398", date: "Oct 12" },
      { label: "Engineering blog: 'Rebuilding our pipeline'", source: "blog.halden…", date: "Oct 03" },
    ],
    why: ["Matches ICP: logistics, 500+ employees, EU", "Role keywords overlap with your product category", "Three independent sources agree"],
  },
  {
    id: "s2", company: "Corvane Health", domain: "corvane.example", industry: "Healthcare",
    type: "Leadership change", headline: "New Chief Information Officer appointed",
    summary: "Former VP Infrastructure at a regional insurer joins as CIO. New technology leaders often re-evaluate vendors in their first 6 months.",
    fit: 81, confidence: 91, intent: "Medium", source: "Press release", detected: "5h ago", location: "Manchester, UK", size: "2,000–5,000",
    evidence: [
      { label: "Press release announcing CIO appointment", source: "corvane.example/news", date: "Oct 18" },
      { label: "Updated leadership page", source: "corvane.example/about", date: "Oct 18" },
    ],
    why: ["Decision-maker change in buying committee", "Industry within secondary ICP", "High source reliability"],
  },
  {
    id: "s3", company: "Brightmoor Studio", domain: "brightmoor.example", industry: "Marketing agency",
    type: "Tech stack change", headline: "Removed legacy analytics tag; trialling new CDP",
    summary: "Site scripts show the removal of an incumbent analytics vendor and a new customer-data-platform snippet in staging.",
    fit: 74, confidence: 62, intent: "Medium", source: "Site technology scan", detected: "Yesterday", location: "Austin, US", size: "50–200",
    evidence: [
      { label: "Analytics script no longer detected", source: "brightmoor.example (scan)", date: "Oct 17" },
      { label: "New CDP snippet on staging subdomain", source: "staging.brightmoor…", date: "Oct 16" },
    ],
    why: ["Active tooling evaluation window", "Smaller than ideal company size", "Single source type — verify before outreach"],
  },
  {
    id: "s4", company: "Ostra Manufacturing", domain: "ostra-mfg.example", industry: "Manufacturing",
    type: "Expansion", headline: "Second production facility announced in Monterrey",
    summary: "Planning approval granted for a 40,000 m² facility; operations hiring expected in Q1.",
    fit: 68, confidence: 77, intent: "Low", source: "Public filing", detected: "2d ago", location: "Monterrey, MX", size: "1,200–2,000",
    evidence: [{ label: "Municipal planning approval", source: "Public registry", date: "Oct 15" }],
    why: ["Expansion often precedes procurement", "Timeline may be 6–12 months out"],
  },
  {
    id: "s5", company: "Fennick Finance", domain: "fennick.example", industry: "Financial services",
    type: "Funding event", headline: "Series B announced — growth in compliance tooling",
    summary: "Announcement highlights investment in compliance automation and EU market entry.",
    fit: 88, confidence: 79, intent: "High", source: "News article", detected: "3d ago", location: "Dublin, IE", size: "200–500",
    evidence: [
      { label: "Funding announcement", source: "fennick.example/blog", date: "Oct 15" },
      { label: "Coverage in trade publication", source: "Industry news", date: "Oct 15" },
    ],
    why: ["Fresh budget and stated priority aligned with your offer", "Strong ICP fit on size and region"],
  },
];

export const facets = {
  type: ["Hiring surge", "Leadership change", "Tech stack change", "Funding event", "Expansion"],
  industry: ["Logistics", "Healthcare", "Financial services", "Manufacturing", "Marketing agency"],
  intent: ["High", "Medium", "Low"],
  window: ["24 hours", "7 days", "30 days", "90 days"],
};
