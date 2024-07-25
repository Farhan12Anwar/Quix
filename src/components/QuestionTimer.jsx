import { useEffect, useState } from "react";

export default function QuestionTimer({ timeout, onTimeout, mode }) {
    const [remainingTime, setRemainingTime] = useState(timeout);
    const [animationStarted, setAnimationStarted] = useState(false);
    const [extraTime, setExtraTime] = useState(0);

    useEffect(() => {
        if (mode === 'answered' && !animationStarted) {
            setAnimationStarted(true);
            // Reset progress bar animation
            const progressBar = document.querySelector('#question progress');
            progressBar.style.width = '0%'; // Reset width
            progressBar.offsetWidth; // Trigger reflow
            progressBar.style.animation = 'progress-bar-fill 0.5s ease-out'; // Start animation

            // Increase the remaining time after answering
            setExtraTime(10000); // Add 10 seconds
        }
    }, [mode, animationStarted]);

    useEffect(() => {
        if (mode === 'answered') {
            // Stop animation when the question is answered
            const progressBar = document.querySelector('#question progress');
            progressBar.style.animation = 'none';
        }
    }, [mode]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (extraTime > 0) {
                setRemainingTime((prevRemainingTime) => prevRemainingTime + extraTime);
                setExtraTime(0);
            }
            onTimeout();
        }, timeout + extraTime);

        return () => {
            clearTimeout(timer);
        };
    }, [timeout, extraTime, onTimeout]);

    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
        }, 100);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <progress
            id="question-time"
            max={timeout + extraTime}
            value={remainingTime}
            className={mode}
        />
    );
}
