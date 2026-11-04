import { SORT_OPTIONS } from "./constants";

export function filterResults(results, filters) {
    const minScore = Number(filters.minScore);
    const hasMinScore = filters.minScore !== "" && Number.isFinite(minScore);

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
