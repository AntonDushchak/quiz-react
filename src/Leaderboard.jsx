import { useState } from "react";
import useStorage from "./hooks/useStorage";
import Button from "./components/Button";
import { SORT_OPTIONS, DEFAULT_FILTERS } from "./constants";
import { filterResults, sortResults } from "./results";

const SORT_LABELS = {
    [SORT_OPTIONS.SCORE_DESC]: "Score: high to low",
    [SORT_OPTIONS.SCORE_ASC]: "Score: low to high",
    [SORT_OPTIONS.DATE_DESC]: "Newest first",
    [SORT_OPTIONS.DATE_ASC]: "Oldest first",
};

function Leaderboard() {
    const { results, removeResult } = useStorage();
    const [filters, setFilters] = useState(DEFAULT_FILTERS);

    const onFilter = (key, value) => setFilters((prev) => ({ ...prev, [key]: value }));
    const onReset = () => setFilters(DEFAULT_FILTERS);

    const visibleResults = sortResults(filterResults(results, filters), filters.sortOption);

    return (
        <section className="standings">
            <div className="filter-grid">
                <div className="form-group">
                    <label htmlFor="filter-min-score">Min. score</label>
                    <input
                        id="filter-min-score"
                        type="number"
                        min={0}
                        value={filters.minScore}
                        onChange={(e) => onFilter("minScore", e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="filter-sort">Sort by</label>
                    <select
                        id="filter-sort"
                        value={filters.sortOption}
                        onChange={(e) => onFilter("sortOption", e.target.value)}
                    >
                        {Object.values(SORT_OPTIONS).map((o) => (
                            <option key={o} value={o}>
                                {SORT_LABELS[o]}
                            </option>
                        ))}
                    </select>
                </div>
                <Button onClick={onReset}>Reset filters</Button>
            </div>

            <div className="results-table">
                {visibleResults.map((r) => (
                    <div key={r.date} className="result-row">
                        {r.name && <p className="result-name">{r.name}</p>}
                        <p className="result-date">{new Date(r.date).toLocaleDateString()}</p>
                        <p className="result-score">{r.score}</p>
                        <Button onClick={() => removeResult(r.date)}>Delete</Button>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Leaderboard;
