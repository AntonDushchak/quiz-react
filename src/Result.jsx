import Button from "./components/Button";
import { useNavigate, useLocation, Navigate } from "react-router";
import useStorage from "./hooks/useStorage";

function Result() {
    const location = useLocation();
    const score = location.state?.score;
    const navigate = useNavigate();
    const { addResult } = useStorage();
    if (score === null || score === undefined) {
        return <Navigate to="/" />;
    }

    function save() {
        addResult({ date: Date.now(), score: score });
        navigate("/leaderboard");
    }

    return (
        <section className="result">
            <p className="final-score">Your final score is {score}</p>
            <p className="subtitle">Would you like to save it to the leaderboard?</p>

            <Button variant="primary" onClick={() => save()}>
                Save
            </Button>
        </section>
    );
}

export default Result;
