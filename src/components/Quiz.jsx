import { useState, useCallback } from "react";
import QUESTIONS from '../questions';
import Question from "./Question";
import Summary from "./Summary";
import TeamScores from "./TeamScores";

const TEAMS = ['Team 1', 'Team 2', 'Team 3'];

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);
    const [teamScores, setTeamScores] = useState(Array(TEAMS.length).fill(0));
    const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track current question index
    const [isRoundStarted, setIsRoundStarted] = useState(false);

    const quizIsComplete = currentQuestionIndex >= QUESTIONS.length;

    const handleSelectAnswer = useCallback((selectedAnswer) => {
        setUserAnswers((prevUserAnswers) => [...prevUserAnswers, selectedAnswer]);

        if (QUESTIONS[currentQuestionIndex].answers[0] === selectedAnswer) {
            setTeamScores((prevScores) => {
                const newScores = [...prevScores];
                newScores[currentTeamIndex] += 1;
                return newScores;
            });
        }
    }, [currentQuestionIndex, currentTeamIndex]);

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

    const startRound = () => {
        setIsRoundStarted(true);
    };

    const moveToNextQuestion = () => {
        setUserAnswers((prevAnswers) => [...prevAnswers, null]); // Handle skipped answer
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setCurrentTeamIndex((prevIndex) => (prevIndex + 1) % TEAMS.length);
    };

    if (quizIsComplete) {
        return <Summary userAnswers={userAnswers} teamScores={teamScores} teams={TEAMS} />;
    }

    return (
        <div id="quiz">
            {!isRoundStarted ? (
                <div>
                    <h2>Welcome to the Quiz</h2>
                    <button onClick={startRound}>Start Round</button>
                </div>
            ) : (
                <>
                    <h2>Current Team: {TEAMS[currentTeamIndex]}</h2>
                    <Question
                        key={currentQuestionIndex} // Ensure component re-renders for each question
                        index={currentQuestionIndex}
                        onSelectAnswer={handleSelectAnswer}
                        onSkipAnswer={handleSkipAnswer}
                        onNextQuestion={moveToNextQuestion}
                    />
                    <TeamScores teams={TEAMS} scores={teamScores} />
                </>
            )}
        </div>
    );
}
