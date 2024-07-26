import { useState, useCallback } from "react";
import QUESTIONS from '../questions';
import quizCompleteImg from '../assets/quiz-complete.png';
import Question from "./Question";
import Summary from "./Summary";

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);
    const [teamScores, setTeamScores] = useState([0, 0, 0]); // Scores for 3 teams
    const [currentTeam, setCurrentTeam] = useState(0); // Index of the current team

    const activeQuestionIndex = userAnswers.length;
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    const handleSelectAnswer = useCallback((selectedAnswer) => {
        setUserAnswers((prevUserAnswers) => [...prevUserAnswers, selectedAnswer]);

        setTeamScores((prevScores) => {
            const newScores = [...prevScores];
            if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
                newScores[currentTeam] += 1; // Increment score if the answer is correct
            }
            return newScores;
        });

        // Switch to the next team
        setCurrentTeam((prevTeam) => (prevTeam + 1) % 3);
    }, [currentTeam, activeQuestionIndex]);

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

    if (quizIsComplete) {
        return <Summary userAnswers={userAnswers} teamScores={teamScores} />;
    }

    return (
        <div id="quiz">
            <h2>Team {currentTeam + 1}'s Turn</h2>
            <div id="team-scores">
                {teamScores.map((score, index) => (
                    <p key={index}>Team {index + 1}: {score} points</p>
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
