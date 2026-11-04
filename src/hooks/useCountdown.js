import { useEffect, useEffectEvent, useState } from "react";

/** Counts down from `seconds` while `running` is true and calls `onExpire` once at zero. */
export function useCountdown(seconds, { running, onExpire }) {
    const [timeLeft, setTimeLeft] = useState(seconds);
    const handleExpire = useEffectEvent(onExpire);

    useEffect(() => {
        if (!running) return;
        if (timeLeft === 0) {
            handleExpire();
            return;
        }
        const id = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
        return () => clearTimeout(id);
    }, [running, timeLeft]);

    return timeLeft;
}
