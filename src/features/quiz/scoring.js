import { SCORE_PER_QUESTION, STREAK_MULTIPLIERS } from "./config";

function getStreakMultiplier(streak) {
    if (streak === 0) {
        return 1;
    }
    const index = Math.min(streak, STREAK_MULTIPLIERS.length) - 1;
    return STREAK_MULTIPLIERS[index];
}

export function scoreAnswer({ score, streak }, isCorrect) {
    if (!isCorrect) {
        return { score, streak: 0 };
    }
    return {
        score: score + SCORE_PER_QUESTION * getStreakMultiplier(streak),
        streak: streak + 1,
    };
}
