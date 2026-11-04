import Button from "./components/Button";
import { useNavigate, useLocation, Navigate } from "react-router";
import useStorage from "./hooks/useStorage";
import { useState } from "react";

function Result() {
    const location = useLocation();
    const score = location.state?.score;
    const thema = location.state?.thema;
    const amount = location.state?.amount;

    const navigate = useNavigate();
    const { addResult } = useStorage();
    const [name, setName] = useState("");
    if (score === null || score === undefined) {
        return <Navigate to="/" />;
    }

    function handleSubmit(e) {
        e.preventDefault();
        addResult({ name: name, date: Date.now(), score: score, thema: thema, amount: amount });
        navigate("/leaderboard");
    }

    return (
        <section className="result">
            <p className="final-score">Your final score is {score}</p>
            <p className="subtitle">Would you like to save it to the leaderboard?</p>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="player-name">Your name</label>
                    <input
                        id="player-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        maxLength={20}
                        minLength={3}
                    />
                </div>
                <Button variant="primary" type="submit" disabled={!name.trim()}>
                    Save
                </Button>
            </form>
        </section>
    );
}

export default Result;
