import { useState, useEffect } from "react";

const INTERVAL_IN_SECONDS = 1;

function Timer({ timeInSeconds, onFinish, running }) {
    const [time, setTime] = useState(timeInSeconds);

    useEffect(() => {
        if (!running) {
            return;
        }
        const interval = setInterval(() => {
            setTime((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - INTERVAL_IN_SECONDS;
            });
        }, INTERVAL_IN_SECONDS * 1000);

        return () => clearInterval(interval);
    }, [running]);

    useEffect(() => {
        if (time === 0 && running) {
            onFinish();
        }
    }, [time, onFinish, running]);
    return (
        <div className="timer">
            <p>Time left: {time} s.</p>
        </div>
    );
}

export default Timer;
