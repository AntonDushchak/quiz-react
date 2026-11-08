export const SORT_OPTIONS = [
    { value: "score-desc", label: "Score: high to low", compare: (a, b) => b.score - a.score },
    { value: "score-asc", label: "Score: low to high", compare: (a, b) => a.score - b.score },
    { value: "date-desc", label: "Newest first", compare: (a, b) => b.date - a.date },
    { value: "date-asc", label: "Oldest first", compare: (a, b) => a.date - b.date },
];

export const DEFAULT_FILTERS = {
    minScore: "",
    sortOption: SORT_OPTIONS[0].value,
};

export function filterResults(results, minScore) {
    if (minScore === "") {
        return results;
    }
    const min = Number(minScore);
    return results.filter((r) => r.score >= min);
}

export function applyFilters(results, { minScore, sortOption }) {
    const filtered = filterResults(results, minScore);
    const sort = SORT_OPTIONS.find((o) => o.value === sortOption);
    return sort ? filtered.toSorted(sort.compare) : filtered;
}
