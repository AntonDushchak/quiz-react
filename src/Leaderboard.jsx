import { useState } from "react";
import useStorage from "./hooks/useStorage";
import { useFetch } from "./hooks/useFetch";
import Button from "./components/Button";
import { SORT_OPTIONS, DEFAULT_FILTERS, CUSTOM_QUESTIONS_PATH, ALL_TOPICS } from "./constants";
import { filterResults, sortResults } from "./results";

function getTopicName(id, customCategories) {
    if (id === undefined || id === null) {
        return null;
    }
    if (id === "") {
        return "Any category";
    }
    const custom = customCategories?.find((c) => c.id === id);
    if (custom) {
        return custom.name;
    }
    return `Open Trivia #${id}`;
}

const SORT_LABELS = {
    [SORT_OPTIONS.SCORE_DESC]: "Score: high to low",
    [SORT_OPTIONS.SCORE_ASC]: "Score: low to high",
    [SORT_OPTIONS.DATE_DESC]: "Newest first",
    [SORT_OPTIONS.DATE_ASC]: "Oldest first",
};

function Leaderboard() {
    const { results, removeResult } = useStorage();
    const { data: customCategories } = useFetch(CUSTOM_QUESTIONS_PATH);
    const [filters, setFilters] = useState(DEFAULT_FILTERS);

    const topics = [...new Set(results.map((r) => r.thema).filter((t) => t !== undefined))];

    const onFilter = (key, value) => setFilters((prev) => ({ ...prev, [key]: value }));
    const onReset = () => setFilters(DEFAULT_FILTERS);

    const visibleResults = sortResults(filterResults(results, filters), filters.sortOption);

    return (
        <section className="standings">
            <div className="filter-grid">
                <div className="form-group">
                    <label htmlFor="filter-topic">Topic</label>
                    <select
                        id="filter-topic"
                        value={filters.thema}
                        onChange={(e) => onFilter("thema", e.target.value)}
                    >
                        <option value={ALL_TOPICS}>All topics</option>
                        {topics.map((t) => (
                            <option key={t} value={t}>
                                {getTopicName(t, customCategories)}
                            </option>
                        ))}
                    </select>
                </div>
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
                {visibleResults.map((r) => {
                    const topicName = getTopicName(r.thema, customCategories);
                    return (
                        <div key={r.date} className="result-row">
                            <div className="result-info">
                                <p className="result-name">{r.name || "Anonymous"}</p>
                                <p className="result-meta">
                                    {topicName && <span className="result-topic">{topicName}</span>}
                                    {r.amount && <span>{r.amount} questions</span>}
                                    <span>{new Date(r.date).toLocaleDateString()}</span>
                                </p>
                            </div>
                            <p className="result-score">{r.score}</p>
                            <Button onClick={() => removeResult(r.date)}>Delete</Button>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export default Leaderboard;
