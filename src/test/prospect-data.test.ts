import { describe, expect, it } from "vitest";
import { filterProspects, prospects } from "@/components/app/prospect-data";

describe("Prospect filtering", () => {
  it("searches company names without case sensitivity", () => {
    expect(filterProspects(prospects, " HALDEN ", "All industries", "All intent levels").map((p) => p.name)).toEqual(["Halden Logistics"]);
  });
  it("combines industry and intent filters", () => {
    expect(filterProspects(prospects, "", "Logistics", "High").map((p) => p.name)).toEqual(["Halden Logistics", "Portway Freight"]);
  });
  it("returns no records when the search has no match", () => {
    expect(filterProspects(prospects, "unmatched company", "All industries", "All intent levels")).toEqual([]);
  });
});