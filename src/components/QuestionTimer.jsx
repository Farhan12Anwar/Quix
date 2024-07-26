import React, { useEffect, useState } from 'react';

export default function QuestionTimer({ timeout, onTimeout, mode }) {
    const [timeLeft, setTimeLeft] = useState(timeout / 1000); // Convert to seconds
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        setTimeLeft(timeout / 1000);
        setProgress(100);

        const interval = setInterval(() => {
            setTimeLeft(prev => prev - 1);
            setProgress((prevTimeLeft / timeout) * 100);
        }, 1000);

        const timer = setTimeout(() => {
            clearInterval(interval);
            onTimeout && onTimeout();
        }, timeout);

        return () => {
            clearInterval(interval);
            clearTimeout(timer);
        };
    }, [timeout, onTimeout]);

    return (
        <div className="timer-container">
            <div className="timer">{timeLeft}s</div>
            <div className="progress-bar">
                <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
            </div>
        </div>
    );
}
