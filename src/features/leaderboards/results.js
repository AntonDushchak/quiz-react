export const DEFAULT_FILTERS = {
    minScore: "",
    sortOption: SORT_OPTIONS[0].value,
};

export const SORT_OPTIONS = [
    { value: "score-desc", label: "Score: high to low", compare: (a, b) => b.score - a.score },
    { value: "score-asc", label: "Score: low to high", compare: (a, b) => a.score - b.score },
    { value: "date-desc", label: "Newest first", compare: (a, b) => b.date - a.date },
    { value: "date-asc", label: "Oldest first", compare: (a, b) => a.date - b.date },
];

export function filterResults(results, minScore) {
    const minScore = Number(minScore);
    const hasMinScore = minScore !== "" && Number.isFinite(minScore);

    return results.filter((r) => {
        if (hasMinScore && r.score < minScore) {
            return false;
        }
        return true;
    });
}

export function sortResults(results, sortOption) {
    switch (sortOption) {
        case SORT_OPTIONS.SCORE_DESC:
            return results.toSorted((a, b) => b.score - a.score);
        case SORT_OPTIONS.SCORE_ASC:
            return results.toSorted((a, b) => a.score - b.score);
        case SORT_OPTIONS.DATE_DESC:
            return results.toSorted((a, b) => b.date - a.date);
        case SORT_OPTIONS.DATE_ASC:
            return results.toSorted((a, b) => a.date - b.date);
        default:
            return results;
    }
}

export function applyFilters(results, { minScore, sortOption }) {
    const filtred = filterResults(results, minScore);
    const sort = SORT_OPTIONS.find((o) => o.value === sortOption);
    return sort ? filtred.toSorted(sort.compare) : filtred;
}
