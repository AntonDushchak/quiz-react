import { DIFFICULTY, API_TIMEOUT_DELAY, QUESTIONS_AMOUNT_OPTIONS } from "./config";
import { CATEGORY_API_LINK, CUSTOM_QUESTIONS_PATH } from "../../api/endpoints";
import { useNavigate } from "react-router";
import { useFetch } from "../../hooks/useFetch";
import Button from "../../components/Button";
import ErrorPanel from "../../components/ErrorPanel";
import FormField from "../../components/FormField";
import useDebouncedValue from "../../hooks/useDebouncer";

function HomePage({ settings, setSettings }) {
    const navigate = useNavigate();
    const { data: openTdb, loading, error } = useFetch(CATEGORY_API_LINK);
    const { data: customCategories } = useFetch(CUSTOM_QUESTIONS_PATH);
    const canContinue = useDebouncedValue(!loading, API_TIMEOUT_DELAY);

    const handleChange = (key) => (e) =>
        setSettings((prev) => ({ ...prev, [key]: e.target.value }));

    if (error) {
        return <ErrorPanel error="Failed to load categories." />;
    }

    return (
        <section className="home">
            <h1>Choose settings</h1>
            <FormField id="cat-choose" label="Category">
                <select
                    value={settings.category}
                    id="cat-choose"
                    onChange={handleChange("category")}
                >
                    <option value="">Any Category</option>
                    {customCategories && (
                        <optgroup label="Custom topics">
                            {customCategories.map((c) => (
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
                    value={settings.difficulty}
                    id="diff-choose"
                    onChange={handleChange("difficulty")}
                >
                    {DIFFICULTY.map((d) => (
                        <option key={d} value={d.toLowerCase()}>
                            {d}
                        </option>
                    ))}
                </select>
            </FormField>
            <FormField id="amount-choose" label="Questions amount">
                <select
                    value={settings.amount}
                    id="amount-choose"
                    onChange={handleChange("amount")}
                >
                    {QUESTIONS_AMOUNT_OPTIONS.map((o) => (
                        <option key={o} value={o}>
                            {o}
                        </option>
                    ))}
                </select>
            </FormField>
            <Button variant="primary" onClick={() => navigate("/quiz")} disabled={!canContinue}>
                Start
            </Button>
        </section>
    );
}

export default HomePage;
