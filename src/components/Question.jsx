import { useState, useCallback } from "react";
import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";
import QUESTIONS from '../questions';

export default function Question({ index, onSelectAnswer, onSkipAnswer, onNextQuestion }) {
    const [answer, setAnswer] = useState({
        selectedAnswer: '',
        isCorrect: null
    });
    const [showNextButton, setShowNextButton] = useState(false); // State to control the visibility of the Next Question button

    const handleSelectAnswer = useCallback((selectedAnswer) => {
        setAnswer({
            selectedAnswer,
            isCorrect: QUESTIONS[index].answers[0] === selectedAnswer
        });

        setShowNextButton(true); // Show the Next Question button

        // Optionally, you can use a timeout if you want to delay the visibility
        // setTimeout(() => setShowNextButton(true), 1000);

        // Optionally, move to the next question after a delay if you want
        // setTimeout(() => {
        //     onSelectAnswer(selectedAnswer);
        //     onNextQuestion();
        // }, 1000);
    }, [index, onSelectAnswer, onNextQuestion]);

    const handleNextQuestion = () => {
        onSelectAnswer(answer.selectedAnswer);
        onNextQuestion();
    };

    let answerState = '';

    if (answer.selectedAnswer && answer.isCorrect !== null) {
        answerState = answer.isCorrect ? 'correct' : 'wrong';
    } else if (answer.selectedAnswer) {
        answerState = 'answered';
    }

    return (
        <div id="question">
            {answer.selectedAnswer === '' && (
                <QuestionTimer
                    timeout={60000}
                    onTimeout={answer.selectedAnswer === '' ? onSkipAnswer : null}
                    mode={answerState}
                />
            )}
            <h2>{QUESTIONS[index].text}</h2>
            <Answers
                answers={QUESTIONS[index].answers}
                selectedAnswer={answer.selectedAnswer}
                answerState={answerState}
                onSelect={handleSelectAnswer}
            />
            {showNextButton && (
                <button onClick={handleNextQuestion}>Next Question</button>
            )}
        </div>
    );
}
