import { useNavigate } from "react-router";
import { CUSTOM_QUESTIONS_URL, OPENTDB_CATEGORIES_URL } from "../../api/endpoints";
import { useFetch } from "../../hooks/useFetch";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";
import Button from "../../components/Button";
import ErrorPanel from "../../components/ErrorPanel";
import FormField from "../../components/FormField";
import { AMOUNT_OPTIONS, DIFFICULTIES, OPENTDB_COOLDOWN_MS } from "./config";

function HomePage({ settings, onSettingsChange }) {
    const navigate = useNavigate();
    const { data: openTdb, loading, error } = useFetch(OPENTDB_CATEGORIES_URL);
    const { data: customTopics } = useFetch(CUSTOM_QUESTIONS_URL);

    // The categories request counts against the OpenTDB rate limit,
    // so the quiz can only start after the cooldown has passed.
    const canStart = useDebouncedValue(!loading, OPENTDB_COOLDOWN_MS);

    const handleChange = (key) => (e) =>
        onSettingsChange((prev) => ({ ...prev, [key]: e.target.value }));

    if (error) {
        return <ErrorPanel message="Failed to load categories." />;
    }

    return (
        <section className="home">
            <h1>Choose settings</h1>

            <FormField id="cat-choose" label="Category">
                <select
                    id="cat-choose"
                    value={settings.category}
                    onChange={handleChange("category")}
                >
                    <option value="">Any Category</option>
                    {customTopics && (
                        <optgroup label="Custom topics">
                            {customTopics.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.name}
                                </option>
                            ))}
                        </optgroup>
                    )}
                    <optgroup label="Open Trivia DB">
                        {openTdb?.trivia_categories?.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.name}
                            </option>
                        ))}
                    </optgroup>
                </select>
            </FormField>

            <FormField id="diff-choose" label="Difficulty">
                <select
                    id="diff-choose"
                    value={settings.difficulty}
                    onChange={handleChange("difficulty")}
                >
                    {DIFFICULTIES.map((d) => (
                        <option key={d.value} value={d.value}>
                            {d.label}
                        </option>
                    ))}
                </select>
            </FormField>

            <FormField id="amount-choose" label="Questions amount">
                <select
                    id="amount-choose"
                    value={settings.amount}
                    onChange={handleChange("amount")}
                >
                    {AMOUNT_OPTIONS.map((n) => (
                        <option key={n} value={n}>
                            {n}
                        </option>
                    ))}
                </select>
            </FormField>

            <Button variant="primary" onClick={() => navigate("/quiz")} disabled={!canStart}>
                Start
            </Button>
        </section>
    );
}

export default HomePage;
