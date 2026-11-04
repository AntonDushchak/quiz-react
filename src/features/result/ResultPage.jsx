import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import Button from "../../components/Button";
import FormField from "../../components/FormField";
import { useLeaderboard } from "../leaderboard/useLeaderboard";

function ResultPage() {
    const navigate = useNavigate();
    const score = useLocation().state?.score;
    const { addResult } = useLeaderboard();
    const [name, setName] = useState("");

    // Opened directly, without finishing a quiz.
    if (score == null) {
        return <Navigate to="/" />;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addResult({ name, date: Date.now(), score });
        navigate("/leaderboard");
    };

    return (
        <section className="result">
            <p className="final-score">Your final score is {score}</p>
            <p className="subtitle">Would you like to save it to the leaderboard?</p>
            <form onSubmit={handleSubmit}>
                <FormField id="player-name" label="Your name">
                    <input
                        id="player-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        minLength={3}
                        maxLength={20}
                    />
                </FormField>
                <Button variant="primary" type="submit" disabled={!name.trim()}>
                    Save
                </Button>
            </form>
        </section>
    );
}

export default ResultPage;
