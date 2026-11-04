export const ANSWER_TIME_IN_SECONDS = 10;
export const ROOT_API_LINK = "https://opentdb.com/api.php";
export const CATEGORY_API_LINK = "https://opentdb.com/api_category.php";
export const API_TIMEOUT_DELAY = 5000;
export const QUESTIONS_AMOUNT_OPTIONS = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
export const DEFAULT_API_VALUES = {
    category: "",
    difficulty: "easy",
    amount: 5,
    type: "multiple",
    encode: "url3986",
};
export const DIFFICULTY = ["Easy", "Medium", "Hard"];
export const STREAK_MULTIPLIERS = [1.25, 1.5, 1.75, 2];
export const SCORE_PER_QUESTION = 10;
export const SORT_OPTIONS = {
    SCORE_DESC: "score-desc",
    SCORE_ASC: "score-asc",
    DATE_DESC: "date-desc",
    DATE_ASC: "date-asc",
};
export const DEFAULT_FILTERS = {
    minScore: "",
    sortOption: SORT_OPTIONS.SCORE_DESC,
};
