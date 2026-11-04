import { describe, expect, it } from "vitest";
import { fromCustomTopics, fromOpenTdb, getQuestionsUrl } from "./questions";

describe("getQuestionsUrl", () => {
    it("uses the local file for custom topics", () => {
        expect(getQuestionsUrl({ category: "custom-php", difficulty: "easy", amount: 5 })).toBe(
            "/questions.json",
        );
    });

    it("builds an OpenTDB url for other categories", () => {
        expect(getQuestionsUrl({ category: "9", difficulty: "hard", amount: 7 })).toBe(
            "https://opentdb.com/api.php?category=9&difficulty=hard&amount=7&type=multiple&encode=url3986",
        );
    });
});

describe("fromOpenTdb", () => {
    it("decodes text and mixes the correct answer into the answers", () => {
        const [q] = fromOpenTdb({
            results: [
                {
                    question: "What%20is%202%2B2%3F",
                    correct_answer: "4",
                    incorrect_answers: ["3", "5%25"],
                },
            ],
        });
        expect(q.question).toBe("What is 2+2?");
        expect(q.correctAnswer).toBe("4");
        expect(q.answers.toSorted()).toEqual(["3", "4", "5%"]);
    });

    it("returns an empty list for an empty response", () => {
        expect(fromOpenTdb(null)).toEqual([]);
    });
});

describe("fromCustomTopics", () => {
    const topics = [
        {
            id: "custom-js",
            questions: [
                { difficulty: "easy", question: "E1", correctAnswer: "a", incorrectAnswers: ["b"] },
                { difficulty: "easy", question: "E2", correctAnswer: "a", incorrectAnswers: ["b"] },
                { difficulty: "hard", question: "H1", correctAnswer: "a", incorrectAnswers: ["b"] },
            ],
        },
        { id: "custom-php", questions: [] },
    ];

    it("filters by topic and difficulty and limits the amount", () => {
        const result = fromCustomTopics(topics, {
            category: "custom-js",
            difficulty: "easy",
            amount: "1",
        });
        expect(result).toHaveLength(1);
        expect(["E1", "E2"]).toContain(result[0].question);
    });

    it("returns nothing for a topic without matching questions", () => {
        expect(
            fromCustomTopics(topics, { category: "custom-php", difficulty: "easy", amount: 5 }),
        ).toEqual([]);
    });
});
