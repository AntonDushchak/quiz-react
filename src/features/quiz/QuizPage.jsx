import ErrorPanel from "../../components/ErrorPanel";
import { useQuestions } from "./useQuestions";
import QuizGame from "./QuizGame";

function getErrorMessage(error) {
    if (error.status === 429) {
        return "Too many requests. Please wait 5 seconds and refresh the page.";
    }
    return "Failed to load questions. Please check your internet connection.";
}

function QuizPage({ settings }) {
    const { questions, loading, error } = useQuestions(settings);

    if (loading) {
        return <p className="status">Loading...</p>;
    }
    if (error) {
        return <ErrorPanel message={getErrorMessage(error)} />;
    }
    if (questions.length === 0) {
        return (
            <ErrorPanel message="There are no questions for this category. Please choose another one." />
        );
    }

    return <QuizGame questions={questions} />;
}

export default QuizPage;
