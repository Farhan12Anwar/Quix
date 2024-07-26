import quizCompleteImg from '../assets/quiz-complete.png';
import QUESTIONS from '../questions';
// import './Summary.css'; // Import the CSS file

export default function Summary({ userAnswers, teamScores }) {
    // Calculate statistics for each team
    const teamStats = teamScores.map((_, index) => {
        const teamNumber = index + 1;

        const teamAnswers = userAnswers.map((answer, i) => {
            return QUESTIONS[i].team === teamNumber ? answer : null;
        }).filter(answer => answer !== null);

        const teamSkipped = teamAnswers.filter(answer => answer === null).length;
        const teamCorrect = teamAnswers.filter(
            (answer, i) => answer === QUESTIONS[i].answers[0]
        ).length;
        const teamWrong = teamAnswers.length - teamSkipped - teamCorrect;

        return {
            skipped: teamSkipped,
            correct: teamCorrect,
            wrong: teamWrong
        };
    });

    return (
        <div id="summary">
            <img src={quizCompleteImg} alt="Trophy icon" className="summary-image" />
            <h2 className="summary-title">Quiz Completed</h2>
            <div className="scoreboard">
                {teamScores.map((score, index) => (
                    <div className="team-card" key={index}>
                        <div className="team-name">Team {index + 1}</div>
                        <div className="team-score">Score: <span>{score}</span></div>
                    </div>
                ))}
            </div>
            <div id="team-stats-summary">
                {teamStats.map((stats, index) => (
                    <div className="team-stats-card" key={index}>
                        <h4>Team {index + 1} Statistics</h4>
                        <p>Skipped: {stats.skipped}</p>
                        <p>Answered Correctly: {stats.correct}</p>
                        <p>Answered Incorrectly: {stats.wrong}</p>
                    </div>
                ))}
            </div>
            <ol>
                {userAnswers.map((answer, index) => {
                    let cssClass = 'user-answer';

                    if (answer === null) {
                        cssClass += ' skipped';
                    } else if (answer === QUESTIONS[index].answers[0]) {
                        cssClass += ' correct';
                    } else {
                        cssClass += ' wrong';
                    }

                    return (
                        <li key={index}>
                            <h4>Question {index + 1}</h4>
                            <p className='question'>{QUESTIONS[index].text}</p>
                            <p className={cssClass}>{answer ?? 'Skipped'}</p>
                        </li>
                    )
                })}
            </ol>
        </div>
    );
}
