import { signals, type Signal } from "@/components/showcase/data";

export interface Prospect {
  id: string;
  name: string;
  domain: string;
  industry: string;
  location: string;
  employees: string;
  fit: number;
  intent: "High" | "Medium" | "Low";
  revenue: string;
  description: string;
  technologies: string[];
  people: { name: string; role: string; initials: string }[];
  signals: Signal[];
}

const details = [
  { revenue: "€180M–€250M", technologies: ["Snowflake", "AWS", "dbt", "Salesforce"], description: "European logistics operator connecting freight, warehousing and last-mile delivery across 18 markets.", people: [{ name: "Mara de Vries", role: "VP of Engineering", initials: "MV" }, { name: "Jonas Keller", role: "Head of Data", initials: "JK" }] },
  { revenue: "£300M–£500M", technologies: ["Microsoft Azure", "Power BI", "ServiceNow"], description: "Healthcare network operating specialist clinics and digital patient services across the United Kingdom.", people: [{ name: "Priya Shah", role: "Chief Information Officer", initials: "PS" }, { name: "Daniel Reed", role: "Director of IT", initials: "DR" }] },
  { revenue: "$10M–$25M", technologies: ["Segment", "HubSpot", "Google Cloud"], description: "Independent marketing and customer experience agency building data-led campaigns for growing brands.", people: [{ name: "Alex Morgan", role: "Head of Technology", initials: "AM" }] },
  { revenue: "$250M–$400M", technologies: ["SAP", "Microsoft Azure", "Tableau"], description: "Industrial manufacturer of precision components with production facilities across North America.", people: [{ name: "Elena Ruiz", role: "Director of Operations", initials: "ER" }] },
  { revenue: "€25M–€50M", technologies: ["AWS", "PostgreSQL", "Datadog", "Salesforce"], description: "Financial technology company providing automated compliance and risk management for European financial institutions.", people: [{ name: "Sofia Byrne", role: "Chief Technology Officer", initials: "SB" }, { name: "Liam Walsh", role: "VP of Compliance", initials: "LW" }] },
];

export const prospects: Prospect[] = signals.map((signal, index) => {
  const detail = details[index] ?? details[0];
  return {
    id: signal.id, name: signal.company, domain: signal.domain, industry: signal.industry,
    location: signal.location, employees: signal.size, fit: signal.fit, intent: signal.intent,
    revenue: detail?.revenue ?? "Not available", description: detail?.description ?? signal.summary,
    technologies: detail?.technologies ?? [], people: detail?.people ?? [], signals: [signal],
  };
});

prospects.push(
  { id: "p6", name: "Vela Systems", domain: "vela-systems.example", industry: "Software", location: "Copenhagen, DK", employees: "200–500", fit: 86, intent: "High", revenue: "€30M–€60M", description: "Cloud operations software for mid-market teams, with a growing presence in the Nordic and DACH markets.", technologies: ["AWS", "Kubernetes", "HubSpot"], people: [{ name: "Nina Larsen", role: "Chief Technology Officer", initials: "NL" }], signals: [] },
  { id: "p7", name: "Alder Commerce", domain: "alder-commerce.example", industry: "Retail", location: "Berlin, DE", employees: "500–800", fit: 79, intent: "Medium", revenue: "€80M–€120M", description: "Omnichannel retail group operating direct-to-consumer brands across Europe.", technologies: ["Shopify", "Segment", "Snowflake"], people: [{ name: "Felix Weber", role: "Director of Data", initials: "FW" }], signals: [] },
  { id: "p8", name: "Portway Freight", domain: "portway.example", industry: "Logistics", location: "Antwerp, BE", employees: "800–1,200", fit: 90, intent: "High", revenue: "€120M–€180M", description: "Freight forwarding and supply chain specialist serving European ports and inland distribution hubs.", technologies: ["Microsoft Azure", "SAP", "Power BI"], people: [{ name: "Thomas Peeters", role: "Head of Digital", initials: "TP" }], signals: [] },
);

export function filterProspects(records: Prospect[], query: string, industry: string, intent: string) {
  const term = query.trim().toLowerCase();
  return records.filter((p) => (!term || `${p.name} ${p.domain} ${p.location} ${p.industry}`.toLowerCase().includes(term))
    && (industry === "All industries" || p.industry === industry)
    && (intent === "All intent levels" || p.intent === intent));
}