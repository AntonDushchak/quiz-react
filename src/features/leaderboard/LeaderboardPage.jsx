import { useState } from "react";
import Button from "../../components/Button";
import FormField from "../../components/FormField";
import { applyFilters, DEFAULT_FILTERS, SORT_OPTIONS } from "./results";
import { useLeaderboard } from "./useLeaderboard";

function LeaderboardPage() {
    const { results, removeResult } = useLeaderboard();
    const [filters, setFilters] = useState(DEFAULT_FILTERS);

    const handleChange = (key) => (e) => setFilters((prev) => ({ ...prev, [key]: e.target.value }));

    const visibleResults = applyFilters(results, filters);

    return (
        <section className="standings">
            <div className="filter-grid">
                <FormField id="filter-min-score" label="Min. score">
                    <input
                        id="filter-min-score"
                        type="number"
                        min={0}
                        value={filters.minScore}
                        onChange={handleChange("minScore")}
                    />
                </FormField>
                <FormField id="filter-sort" label="Sort by">
                    <select
                        id="filter-sort"
                        value={filters.sortOption}
                        onChange={handleChange("sortOption")}
                    >
                        {SORT_OPTIONS.map((o) => (
                            <option key={o.value} value={o.value}>
                                {o.label}
                            </option>
                        ))}
                    </select>
                </FormField>
                <Button onClick={() => setFilters(DEFAULT_FILTERS)}>Reset filters</Button>
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

export default LeaderboardPage;
