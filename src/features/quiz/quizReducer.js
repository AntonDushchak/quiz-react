import { scoreAnswer } from "./scoring";

export function initQuiz(questions) {
    return {
        questions,
        index: 0,
        selectedAnswer: null,
        isAnswered: false,
        score: 0,
        streak: 0,
        isFinished: false,
    };
}

export function quizReducer(state, action) {
    switch (action.type) {
        case "answer":
            if (state.isAnswered) return state;
            return { ...state, isAnswered: true, selectedAnswer: action.answer };

        case "timeUp":
            if (state.isAnswered) return state;
            return { ...state, isAnswered: true, selectedAnswer: null };

        case "next": {
            if (!state.isAnswered) return state;

            const { correctAnswer } = state.questions[state.index];
            const { score, streak } = scoreAnswer(state, state.selectedAnswer === correctAnswer);

            if (state.index === state.questions.length - 1) {
                return { ...state, score, streak, isFinished: true };
            }
            return {
                ...state,
                score,
                streak,
                index: state.index + 1,
                selectedAnswer: null,
                isAnswered: false,
            };
        }

        default:
            throw new Error(`Unknown action: ${action.type}`);
    }
}
