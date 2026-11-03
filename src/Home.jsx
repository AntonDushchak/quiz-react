import { DIFFICULTY, API_TIMEOUT_DELAY } from "./constants";
import { useNavigate } from "react-router";
import { useFetch } from "./hooks/useFetch";
import { CATEGORY_API_LINK } from "./constants";
import { useState, useEffect } from "react";
import Button from "./components/Button";
import ErrorPanel from "./components/ErrorPanel";

function Home({ setSettings }) {
    const navigate = useNavigate();
    const { data, loading, error } = useFetch(CATEGORY_API_LINK);
    const [canContinue, setCanContinue] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            setCanContinue(!loading);
        }, API_TIMEOUT_DELAY);
        return () => clearTimeout(timer);
    }, [loading]);

    if (error) {
        return <ErrorPanel error="Failed to load categories." />;
    }

    return (
        <section className="home">
            <h1>Choose settings</h1>
            <div className="form-group">
                <label htmlFor="cat-choose">Category</label>
                <select
                    id="cat-choose"
                    onChange={(e) => setSettings((prev) => ({ ...prev, category: e.target.value }))}
                >
                    <option value="">Any Category</option>
                    {data?.trivia_categories?.map((c) => (
                        <option key={c.id} value={c.id}>
                            {c.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="diff-choose">Difficulty</label>
                <select
                    id="diff-choose"
                    onChange={(e) =>
                        setSettings((prev) => ({ ...prev, difficulty: e.target.value }))
                    }
                >
                    {DIFFICULTY.map((d) => (
                        <option key={d} value={d.toLowerCase()}>
                            {d}
                        </option>
                    ))}
                </select>
            </div>
            <Button variant="primary" onClick={() => navigate("/quiz")} disabled={!canContinue}>
                Start
            </Button>
        </section>
    );
}

export default Home;
