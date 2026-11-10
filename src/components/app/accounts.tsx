import { createContext, useContext, useState, type ReactNode } from "react";

export interface Account {
  id: string;
  name: string;
  initials: string;
  plan: "Growth" | "Scale" | "Enterprise";
  role: "Owner" | "Admin" | "Analyst";
  seats: number;
  icp: string;
  signals: number;
  pipeline: string;
  credits: number;
  status: "Active" | "Paused" | "Trial";
}

export const accounts: Account[] = [
  { id: "a1", name: "Northwind Analytics", initials: "NA", plan: "Scale", role: "Owner", seats: 14, icp: "EU logistics & fintech", signals: 142, pipeline: "€1.8M", credits: 72, status: "Active" },
  { id: "a2", name: "Brightline Data", initials: "BD", plan: "Growth", role: "Admin", seats: 6, icp: "UK healthcare IT", signals: 58, pipeline: "€640K", credits: 41, status: "Active" },
  { id: "a3", name: "Kestrel Partners", initials: "KP", plan: "Enterprise", role: "Analyst", seats: 32, icp: "DACH manufacturing", signals: 211, pipeline: "€3.2M", credits: 88, status: "Active" },
  { id: "a4", name: "Lumen Cloud", initials: "LC", plan: "Growth", role: "Owner", seats: 3, icp: "Nordic SaaS, 50–500", signals: 19, pipeline: "€120K", credits: 12, status: "Trial" },
  { id: "a5", name: "Orbis Freight", initials: "OF", plan: "Scale", role: "Admin", seats: 9, icp: "Iberian 3PL", signals: 0, pipeline: "€0", credits: 0, status: "Paused" },
];

const Ctx = createContext<{ account: Account; setAccount: (a: Account) => void } | null>(null);

export function AccountProvider({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<Account>(accounts[0]!);
  return <Ctx.Provider value={{ account, setAccount }}>{children}</Ctx.Provider>;
}

export function useAccount() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useAccount outside AccountProvider");
  return c;
}
