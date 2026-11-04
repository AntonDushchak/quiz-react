import { CUSTOM_QUESTIONS_URL, OPENTDB_QUESTIONS_URL } from "../../api/endpoints";
import { shuffle } from "../../lib/shuffle";

const CUSTOM_CATEGORY_PREFIX = "custom-";

export const isCustomCategory = (category) => category.startsWith(CUSTOM_CATEGORY_PREFIX);

export function getQuestionsUrl(settings) {
    if (isCustomCategory(settings.category)) {
        return CUSTOM_QUESTIONS_URL;
    }
    const params = new URLSearchParams({ ...settings, type: "multiple", encode: "url3986" });
    return `${OPENTDB_QUESTIONS_URL}?${params}`;
}

function toQuestion({ question, correctAnswer, incorrectAnswers }) {
    return {
        question,
        correctAnswer,
        answers: shuffle([correctAnswer, ...incorrectAnswers]),
    };
}

/** Converts an OpenTDB response (url3986-encoded) into the app's question format. */
export function fromOpenTdb(response) {
    return (response?.results ?? []).map((item) =>
        toQuestion({
            question: decodeURIComponent(item.question),
            correctAnswer: decodeURIComponent(item.correct_answer),
            incorrectAnswers: item.incorrect_answers.map(decodeURIComponent),
        }),
    );
}

/** Picks random questions from public/questions.json that match the settings. */
export function fromCustomTopics(topics, { category, difficulty, amount }) {
    const pool = (topics ?? [])
        .filter((topic) => topic.id === category)
        .flatMap((topic) => topic.questions)
        .filter((q) => q.difficulty === difficulty);

    return shuffle(pool).slice(0, Number(amount)).map(toQuestion);
}
