import { useMemo } from "react";
import { useFetch } from "../../hooks/useFetch";
import { isCustom, getQuestionsUrl, prepareCustomQuestions, prepareQuestions } from "./questions";

export function useQuestions(settings) {
    const { data, loading, error } = useFetch(getQuestionsUrl(settings));

    const questions = useMemo(
        () =>
            isCustom(settings)
                ? prepareCustomQuestions(data ?? [], settings)
                : prepareQuestions(data?.results ?? []),
        [data, settings],
    );

    return { questions, loading, error };
}
