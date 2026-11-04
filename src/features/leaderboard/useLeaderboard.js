import { useState } from "react";
import { loadResults, saveResults } from "./storage";

export function useLeaderboard() {
    const [results, setResults] = useState(loadResults);

    // Always start from storage so changes from other tabs are not lost.
    const update = (change) => {
        const next = change(loadResults());
        saveResults(next);
        setResults(next);
    };

    const addResult = (result) => update((list) => [...list, result]);
    const removeResult = (date) => update((list) => list.filter((r) => r.date !== date));

    return { results, addResult, removeResult };
}
