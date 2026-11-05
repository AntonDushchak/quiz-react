import { ROOT_API_LINK, CUSTOM_QUESTIONS_PATH } from "../../api/endpoints";

export function isCustom(settings) {
    return settings.category.startsWith("custom-");
}

export function getQuestionsUrl(settings) {
    if (isCustom(settings)) {
        return CUSTOM_QUESTIONS_PATH;
    }
    const params = new URLSearchParams(settings);
    return `${ROOT_API_LINK}?${params.toString()}`;
}

function shuffle(array) {
    const arrayCopy = [...array];
    for (let i = arrayCopy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
    }
    return arrayCopy;
}

export function prepareCustomQuestions(themen, settings) {
    const questions = themen
        .filter((t) => t.id === settings.category)
        .flatMap((t) => t.questions)
        .filter((q) => q.difficulty === settings.difficulty);

    return shuffle(questions)
        .slice(0, Number(settings.amount))
        .map((q) => ({
            question: q.question,
            correctAnswer: q.correctAnswer,
            answers: shuffle([q.correctAnswer, ...q.incorrectAnswers]),
        }));
}

export function prepareQuestions(results) {
    return results.map((item) => {
        const decodedCorrect = decodeURIComponent(item.correct_answer);
        const decodedIncorrect = item.incorrect_answers.map(decodeURIComponent);
        return {
            question: decodeURIComponent(item.question),
            correctAnswer: decodedCorrect,
            answers: shuffle([decodedCorrect, ...decodedIncorrect]),
        };
    });
}
