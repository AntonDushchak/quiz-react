import { useState } from "react";
import { useNavigate } from "react-router";
import { ANSWER_TIME_IN_SECONDS } from "./config";
import { useQuestions } from "./useQuestions";
import { scoreAnswer } from "./scoring";
import QuestionPanel from "./components/QuestionPanel";
import AnswerLine from "./components/AnswerLine";
import Score from "./components/Score";
import Timer from "./components/Timer";
import Button from "../../components/Button";
import ErrorPanel from "../../components/ErrorPanel";

function getErrorMessage(error, questionsCount) {
    if (error?.status === 429) {
        return "Too many requests. Please wait 5 seconds and refresh the page.";
    }
    if (error) {
        return "Failed to load questions. Please check your internet connection.";
    }
    if (questionsCount === 0) {
        return "There are no questions for this category. Please choose another one.";
    }
    return null;
}

function pickColor(isAnswered, isPicked, isCorrect) {
    if (!isAnswered) return "secondary";
    if (isCorrect) return "correct";
    if (isPicked) return "wrong";
    return "secondary";
}

function QuizPage({ settings }) {
    const navigate = useNavigate();
    const { questions, loading, error } = useQuestions(settings);

    const [index, setIndex] = useState(0);
    const [answer, setAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);

    if (loading) {
        return <p className="status">Loading...</p>;
    }

    const errorMessage = getErrorMessage(error, questions.length);
    if (errorMessage) {
        return <ErrorPanel error={errorMessage} />;
    }

    const question = questions[index];
    const isAnswered = answer !== null;
    const isLast = index === questions.length - 1;

    function handleNext() {
        const next = scoreAnswer({ score, streak }, answer === question.correctAnswer);

        if (isLast) {
            navigate("/result", { state: { score: next.score } });
            return;
        }
        setScore(next.score);
        setStreak(next.streak);
        setAnswer(null);
        setIndex(index + 1);
    }

    return (
        <section className="quiz-panel">
            <div className="quiz-header">
                <Score score={score} />
                <Timer
                    key={index}
                    timeInSeconds={ANSWER_TIME_IN_SECONDS}
                    onFinish={() => setAnswer("")}
                    running={!isAnswered}
                />
            </div>
            <QuestionPanel text={question.question} />
            {question.answers.map((a) => (
                <AnswerLine
                    key={a}
                    text={a}
                    disabled={isAnswered}
                    onClick={() => setAnswer(a)}
                    variant={pickColor(isAnswered, a === answer, a === question.correctAnswer)}
                />
            ))}
            <Button variant="primary" disabled={!isAnswered} onClick={handleNext}>
                Continue
            </Button>
        </section>
    );
}

export default QuizPage;
