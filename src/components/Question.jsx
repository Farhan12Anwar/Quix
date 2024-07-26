import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";
import { useState, useEffect } from "react";
import QUESTIONS from '../questions';

export default function Question({ index, onSelectAnswer, onSkipAnswer }) {
    const [answer, setAnswer] = useState({
        selectedAnswer: '',
        isCorrect: null
    });

    

    // Set default timer to 10 seconds
    const [timer, setTimer] = useState(10000);

    useEffect(() => {
        // Update timer based on answer state
        if (answer.selectedAnswer) {
            setTimer(10000); // Extend timer to 20 seconds after answering
        } else {
            setTimer(60000); // Default timer duration
        }
    }, [answer.selectedAnswer]);

    function handleSelectAnswer(answer) {
        setAnswer({
            selectedAnswer: answer,
            isCorrect: null
        });

        setTimeout(() => {
            setAnswer({
                selectedAnswer: answer,
                isCorrect: QUESTIONS[index].answers[0] === answer
            });

            // Wait 10 seconds before switching to the next question
            setTimeout(() => {
                onSelectAnswer(answer);
            }, 10000); // 10 seconds delay

        }, 1000); // 1 second delay
    }

    let answerState = '';

    if (answer.selectedAnswer && answer.isCorrect !== null) {
        answerState = answer.isCorrect ? 'correct' : 'wrong';
    } else if (answer.selectedAnswer) {
        answerState = 'answered';
    }

    return (
        <div id="question">
            <QuestionTimer
                key={timer}
                timeout={timer}
                onTimeout={answer.selectedAnswer === '' ? onSkipAnswer : null}
                mode={answerState}
            />
            <h2>{QUESTIONS[index].text}</h2>
            <Answers
                answers={QUESTIONS[index].answers}
                selectedAnswer={answer.selectedAnswer}
                answerState={answerState}
                onSelect={handleSelectAnswer}
            />
        </div>
    );
}
