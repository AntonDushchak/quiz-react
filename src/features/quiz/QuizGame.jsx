import { useReducer } from "react";
import { Navigate } from "react-router";
import Button from "../../components/Button";
import AnswerOption from "./components/AnswerOption";
import QuestionPanel from "./components/QuestionPanel";
import Score from "./components/Score";
import Timer from "./components/Timer";
import { ANSWER_TIME_SECONDS } from "./config";
import { initQuiz, quizReducer } from "./quizReducer";

function getAnswerVariant(answer, { isAnswered, selectedAnswer, correctAnswer }) {
    if (!isAnswered) return "secondary";
    if (answer === correctAnswer) return "correct";
    if (answer === selectedAnswer) return "wrong";
    return "secondary";
}

function QuizGame({ questions }) {
    const [state, dispatch] = useReducer(quizReducer, questions, initQuiz);
    const { index, isAnswered, selectedAnswer, score, isFinished } = state;

    if (isFinished) {
        return <Navigate to="/result" state={{ score }} />;
    }

    const { question, answers, correctAnswer } = state.questions[index];

    return (
        <section className="quiz-panel">
            <div className="quiz-header">
                <Score score={score} />
                <Timer
                    key={index}
                    seconds={ANSWER_TIME_SECONDS}
                    running={!isAnswered}
                    onExpire={() => dispatch({ type: "timeUp" })}
                />
            </div>
            <QuestionPanel text={question} />
            {answers.map((answer) => (
                <AnswerOption
                    key={answer}
                    text={answer}
                    disabled={isAnswered}
                    onClick={() => dispatch({ type: "answer", answer })}
                    variant={getAnswerVariant(answer, {
                        isAnswered,
                        selectedAnswer,
                        correctAnswer,
                    })}
                />
            ))}
            <Button
                variant="primary"
                disabled={!isAnswered}
                onClick={() => dispatch({ type: "next" })}
            >
                Continue
            </Button>
        </section>
    );
}

export default QuizGame;
