export const DEFAULT_SETTINGS = {
    category: "",
    difficulty: "easy",
    amount: 5,
};

export const DIFFICULTIES = [
    { value: "easy", label: "Easy" },
    { value: "medium", label: "Medium" },
    { value: "hard", label: "Hard" },
];

export const AMOUNT_OPTIONS = Array.from({ length: 11 }, (_, i) => i + 5); // 5..15

// OpenTDB allows one request per IP every 5 seconds.
export const OPENTDB_COOLDOWN_MS = 5000;
