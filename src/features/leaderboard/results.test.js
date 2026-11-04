import { describe, expect, it } from "vitest";
import { applyFilters, DEFAULT_FILTERS } from "./results";

const results = [
    { name: "A", score: 10, date: 3 },
    { name: "B", score: 30, date: 1 },
    { name: "C", score: 20, date: 2 },
];

const names = (list) => list.map((r) => r.name);

describe("applyFilters", () => {
    it("sorts by score descending by default", () => {
        expect(names(applyFilters(results, DEFAULT_FILTERS))).toEqual(["B", "C", "A"]);
    });

    it("sorts by date", () => {
        expect(names(applyFilters(results, { minScore: "", sortOption: "date-asc" }))).toEqual([
            "B",
            "C",
            "A",
        ]);
    });

    it("filters by minimum score", () => {
        expect(names(applyFilters(results, { ...DEFAULT_FILTERS, minScore: "20" }))).toEqual([
            "B",
            "C",
        ]);
    });

    it("does not mutate the input", () => {
        applyFilters(results, DEFAULT_FILTERS);
        expect(names(results)).toEqual(["A", "B", "C"]);
    });
});
