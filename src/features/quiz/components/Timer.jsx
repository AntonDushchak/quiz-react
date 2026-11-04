import { useCountdown } from "../../../hooks/useCountdown";

const LOW_TIME_SECONDS = 5;

function Timer({ seconds, running, onExpire }) {
    const timeLeft = useCountdown(seconds, { running, onExpire });

    return (
        <div className={timeLeft <= LOW_TIME_SECONDS ? "timer timer-low" : "timer"}>
            <p>Time left: {timeLeft} s.</p>
        </div>
    );
}

export default Timer;
