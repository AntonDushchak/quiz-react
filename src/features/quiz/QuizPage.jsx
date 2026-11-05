import { useState, useMemo } from "react";
import { ROOT_API_LINK, CUSTOM_QUESTIONS_PATH } from "../../api/endpoints";
import { SCORE_PER_QUESTION, STREAK_MULTIPLIERS, ANSWER_TIME_IN_SECONDS } from "./config";
import QuestionPanel from "./components/QuestionPanel";
import AnswerLine from "./components/AnswerLine";
import Button from "../../components/Button";
import { useNavigate } from "react-router";
import { useFetch } from "../../hooks/useFetch";
import ErrorPanel from "../../components/ErrorPanel";
import Score from "./components/Score";
import Timer from "./components/Timer";

function buildApiLink(settings) {
    const params = new URLSearchParams(settings);
    return `${ROOT_API_LINK}?${params.toString()}`;
}
function shuffle(array) {
    const arrayCopy = [...array];
    for (let i = arrayCopy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = arrayCopy[i];
        arrayCopy[i] = arrayCopy[j];
        arrayCopy[j] = temp;
    }
    return arrayCopy;
}

function prepareCustomQuestions(themen, settings) {
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

function prepareQuestions(results) {
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

function checkErrors(error, questionsDataLength) {
    if (error?.status === 429) {
        return (
            <ErrorPanel error="Too many requests. Please wait 5 seconds and refresh the page." />
        );
    }
    if (error) {
        return (
            <ErrorPanel error="Failed to load questions. Please check your internet connection." />
        );
    }
    if (questionsDataLength === 0) {
        return (
            <ErrorPanel error="There are no questions for this category. Please choose another one." />
        );
    }
    return null;
}

function Quiz({ settings }) {
    const isCustom = settings.category.startsWith("custom-");
    const link = isCustom ? CUSTOM_QUESTIONS_PATH : buildApiLink(settings);
    const { data, loading, error } = useFetch(link);
    const questionsData = useMemo(
        () =>
            isCustom
                ? prepareCustomQuestions(data ?? [], settings)
                : prepareQuestions(data?.results ?? []),
        [data, isCustom, settings],
    );
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answer, setAnswer] = useState(null);
    const navigate = useNavigate();
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);
    function getMultiplier() {
        if (streak === 0) {
            return 1;
        }
        const index =
            streak > STREAK_MULTIPLIERS.length ? STREAK_MULTIPLIERS.length - 1 : streak - 1;
        return STREAK_MULTIPLIERS[index];
    }
    function countScore() {
        let currentScore = score;
        if (answer === questionsData[currentQuestionIndex].correctAnswer) {
            setStreak(streak + 1);
            const multiplier = getMultiplier();
            currentScore = score + SCORE_PER_QUESTION * multiplier;
            setScore(currentScore);
        } else {
            setStreak(0);
        }
        return currentScore;
    }
    if (loading) {
        return <p className="status">Loading...</p>;
    }

    const result = checkErrors(error, questionsData.length);
    if (result !== null) {
        return result;
    }

    const onNext = (isLast) => {
        if (!isLast) {
            countScore();
            setAnswer(null);
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            const newScore = countScore();
            navigate("/result", { state: { score: newScore } });
        }
    };

    return (
        <section className="quiz-panel">
            <div className="quiz-header">
                <Score score={score} />
                <Timer
                    key={currentQuestionIndex}
                    timeInSeconds={ANSWER_TIME_IN_SECONDS}
                    onFinish={() => setAnswer("")}
                    running={answer === null}
                />
            </div>
            <QuestionPanel text={questionsData[currentQuestionIndex].question} />
            {questionsData[currentQuestionIndex].answers.map((a) => (
                <AnswerLine
                    key={a}
                    text={a}
                    disabled={answer !== null}
                    onClick={() => setAnswer(a)}
                    variant={pickColor(
                        answer !== null,
                        a === answer,
                        a === questionsData[currentQuestionIndex].correctAnswer,
                    )}
                />
            ))}
            <Button
                variant="primary"
                disabled={answer === null}
                onClick={() => onNext(currentQuestionIndex === questionsData.length - 1)}
            >
                Continue
            </Button>
        </section>
    );
}

function pickColor(isFinish, isPicked, isCorrect) {
    if (!isFinish) {
        return "secondary";
    } else if (!isPicked && isCorrect) {
        return "correct";
    } else if (isPicked && isCorrect) {
        return "correct";
    } else if (isPicked && !isCorrect) {
        return "wrong";
    } else {
        return "secondary";
    }
}
export default Quiz;
