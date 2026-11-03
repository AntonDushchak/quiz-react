import { useState, useEffect } from "react";

export function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        let ignore = false;
        const controller = new AbortController();

        fetch(url, { signal: controller.signal })
            .then((response) => {
                if (!response.ok) {
                    const err = new Error(`HTTP ${response.status}`);
                    err.status = response.status;
                    throw err;
                }
                return response.json();
            })
            .then((data) => {
                if (!ignore) setData(data);
            })
            .catch((err) => {
                console.error(err);
                if (!ignore) setError(err);
            })
            .finally(() => {
                if (!ignore) setLoading(false);
            });

        return () => {
            ignore = true;
            controller.abort();
        };
    }, [url]);

    return { data, loading, error };
}
