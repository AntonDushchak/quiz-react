const STORAGE_KEY = "results";

export function loadResults() {
    try {
        const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

export function saveResults(results) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
}
