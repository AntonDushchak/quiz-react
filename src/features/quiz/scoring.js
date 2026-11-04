import { POINTS_PER_QUESTION, STREAK_MULTIPLIERS } from "./config";

export function getStreakMultiplier(streak) {
    if (streak <= 0) return 1;
    return STREAK_MULTIPLIERS[Math.min(streak, STREAK_MULTIPLIERS.length) - 1];
}

/** The multiplier depends on the streak *before* the current answer. */
export function scoreAnswer({ score, streak }, isCorrect) {
    if (!isCorrect) {
        return { score, streak: 0 };
    }
    return {
        score: score + POINTS_PER_QUESTION * getStreakMultiplier(streak),
        streak: streak + 1,
    };
}
