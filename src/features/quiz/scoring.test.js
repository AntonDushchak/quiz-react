import { describe, expect, it } from "vitest";
import { getStreakMultiplier, scoreAnswer } from "./scoring";

describe("getStreakMultiplier", () => {
    it.each([
        [0, 1],
        [1, 1.25],
        [2, 1.5],
        [3, 1.75],
        [4, 2],
        [10, 2],
    ])("streak %i -> x%f", (streak, expected) => {
        expect(getStreakMultiplier(streak)).toBe(expected);
    });
});

describe("scoreAnswer", () => {
    it("adds base points for the first correct answer", () => {
        expect(scoreAnswer({ score: 0, streak: 0 }, true)).toEqual({ score: 10, streak: 1 });
    });

    it("applies the multiplier from the previous streak", () => {
        expect(scoreAnswer({ score: 10, streak: 1 }, true)).toEqual({ score: 22.5, streak: 2 });
    });

    it("resets the streak and keeps the score on a wrong answer", () => {
        expect(scoreAnswer({ score: 30, streak: 3 }, false)).toEqual({ score: 30, streak: 0 });
    });
});
