import { useEffect, useState } from "react";

export default function QuestionTimer({ timeout, onTimeout, mode }) {
    const [remainingTime, setRemainingTime] = useState(timeout);

    useEffect(() => {
        let timer;
        if (remainingTime > 0) {
            timer = setInterval(() => {
                setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
            }, 100);
        } else {
            onTimeout(); // Trigger timeout when the time is up
        }

        return () => {
            clearInterval(timer); // Clean up the interval on unmount
        };
    }, [remainingTime, onTimeout]);

    useEffect(() => {
        if (remainingTime <= 0) {
            onTimeout();
        }
    }, [remainingTime, onTimeout]);

    return (
        <progress
            id="question-time"
            max={timeout}
            value={remainingTime}
            className={mode}
        />
    );
}
