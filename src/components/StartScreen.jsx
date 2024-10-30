import React from 'react';
import './StartScreen.css';
import quizLogo from '../assets/quiz-logo.png'; // Import your logo image

export default function StartScreen({ onStartQuiz }) {
    return (
        <div className="start-screen">
            <div className="welcome-content">
                <img src={quizLogo} alt="Quiz Logo" className="logo" />
                <h1>Welcome to the Quiz Challenge!</h1>
                <p className="description">
                    Test your knowledge with a series of exciting questions.
                    Click below to start the quiz and see how you score!
                </p>
                <button className="start-button" onClick={onStartQuiz}>
                    Start Quiz
                </button>
            </div>
        </div>
    );
}
