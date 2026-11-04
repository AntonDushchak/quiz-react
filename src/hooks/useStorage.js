import { useState } from "react";

const STORAGE_KEY = "results";

const readResults = () => JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];

export function useStorage() {
    const [results, setResults] = useState(readResults);

    const save = (updatedResults) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedResults));
        setResults(updatedResults);
    };

    const addResult = (result) => save([...readResults(), result]);

    const removeResult = (date) => save(readResults().filter((r) => r.date !== date));

    return { results, addResult, removeResult };
}

export default useStorage;
