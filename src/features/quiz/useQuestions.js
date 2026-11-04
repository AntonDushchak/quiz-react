import { useMemo } from "react";
import { useFetch } from "../../hooks/useFetch";
import { fromCustomTopics, fromOpenTdb, getQuestionsUrl, isCustomCategory } from "./questions";

export function useQuestions(settings) {
    const { data, loading, error } = useFetch(getQuestionsUrl(settings));

    const questions = useMemo(() => {
        if (!data) return [];
        return isCustomCategory(settings.category)
            ? fromCustomTopics(data, settings)
            : fromOpenTdb(data);
    }, [data, settings]);

    return { questions, loading, error };
}
