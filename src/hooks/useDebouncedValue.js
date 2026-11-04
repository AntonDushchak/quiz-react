import { useEffect, useState } from "react";

/** Returns `value` only after it has stayed unchanged for `delay` ms. */
export function useDebouncedValue(value, delay) {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
        const id = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(id);
    }, [value, delay]);

    return debounced;
}
