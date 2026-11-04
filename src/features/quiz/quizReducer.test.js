import { describe, expect, it } from "vitest";
import { initQuiz, quizReducer } from "./quizReducer";

const questions = [
    { question: "Q1", correctAnswer: "a", answers: ["a", "b"] },
    { question: "Q2", correctAnswer: "c", answers: ["c", "d"] },
];

const play = (...actions) => actions.reduce(quizReducer, initQuiz(questions));

describe("quizReducer", () => {
    it("ignores a second answer to the same question", () => {
        const state = play({ type: "answer", answer: "a" }, { type: "answer", answer: "b" });
        expect(state.selectedAnswer).toBe("a");
    });

    it("does not move on before the question is answered", () => {
        expect(play({ type: "next" }).index).toBe(0);
    });

    it("counts a time-out as a wrong answer", () => {
        const state = play({ type: "timeUp" }, { type: "next" });
        expect(state).toMatchObject({ index: 1, score: 0, streak: 0, isAnswered: false });
    });

    it("finishes after the last question with the final score", () => {
        const state = play(
            { type: "answer", answer: "a" },
            { type: "next" },
            { type: "answer", answer: "c" },
            { type: "next" },
        );
        expect(state).toMatchObject({ isFinished: true, score: 22.5, streak: 2 });
    });
});
