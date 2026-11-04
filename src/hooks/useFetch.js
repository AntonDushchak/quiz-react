import { useEffect, useState } from "react";
import { fetchJson } from "../api/http";

export function useFetch(url) {
    const [state, setState] = useState({ data: null, loading: true, error: null });

    useEffect(() => {
        const controller = new AbortController();

        fetchJson(url, { signal: controller.signal })
            .then((data) => {
                if (!controller.signal.aborted) {
                    setState({ data, loading: false, error: null });
                }
            })
            .catch((error) => {
                if (controller.signal.aborted) return;
                console.error(error);
                setState({ data: null, loading: false, error });
            });

        return () => controller.abort();
    }, [url]);

    return state;
}
