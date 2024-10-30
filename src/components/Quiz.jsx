import React, { useState, useCallback } from 'react';
import StartScreen from './StartScreen';
import Question from './Question';
import Summary from './Summary';
import QUESTIONS from '../questions';

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);
    const [teamScores, setTeamScores] = useState([0, 0, 0]);
    const [currentTeam, setCurrentTeam] = useState(0);
    const [quizStarted, setQuizStarted] = useState(false);

    const activeQuestionIndex = userAnswers.length;
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    const handleStartQuiz = () => {
        setQuizStarted(true);
    };

    const handleSelectAnswer = useCallback((selectedAnswer) => {
        setUserAnswers((prevUserAnswers) => [...prevUserAnswers, selectedAnswer]);

        setTeamScores((prevScores) => {
            const newScores = [...prevScores];
            if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
                newScores[currentTeam] += 1;
            }
            return newScores;
        });

        setCurrentTeam((prevTeam) => (prevTeam + 1) % 3);
    }, [currentTeam, activeQuestionIndex]);

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

    if (!quizStarted) {
        return <StartScreen onStartQuiz={handleStartQuiz} />;
    }

    if (quizIsComplete) {
        return <Summary userAnswers={userAnswers} teamScores={teamScores} />;
    }

    return (
        <div id="quiz">
            <h2>Team {currentTeam + 1}'s Turn</h2>
            <div id="team-scores">
                {teamScores.map((score, index) => (
                    <p key={index}>Team {index + 1}: {score} </p>
                ))}
            </div>
            <Question
                key={activeQuestionIndex}
                index={activeQuestionIndex}
                onSelectAnswer={handleSelectAnswer}
                onSkipAnswer={handleSkipAnswer}
            />
        </div>
    );
}
