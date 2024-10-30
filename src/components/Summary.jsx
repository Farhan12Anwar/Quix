import quizCompleteImg from '../assets/quiz-complete.png';
import QUESTIONS from '../questions';

export default function Summary({ userAnswers, teamScores }) {
    // Determine the winning team(s)
    const maxScore = Math.max(...teamScores);
    const winningTeams = teamScores
        .map((score, index) => score === maxScore ? index + 1 : null)
        .filter(teamNumber => teamNumber !== null);

    // Generate team stats
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
            <div className="team-stats-cover">
                <div className="winners-container">
                    {winningTeams.length === 1 ? (
                        <div className="winner-card single-winner">
                            <h3>Congratulations to the Winner!</h3>
                            <div className="team-name">Team {winningTeams[0]}</div>
                            <div className="team-score">Score: <span>{teamScores[winningTeams[0] - 1]}</span></div>
                        </div>
                    ) : (
                        winningTeams.map(teamNumber => (
                            <div className="winner-card single-winner" key={teamNumber}>
                                <h3>Congratulations to the Winners!</h3>
                                <div className="team-name">Team {teamNumber}</div>
                                <div className="team-score">Score: <span>{teamScores[teamNumber - 1]}</span></div>
                            </div>
                        ))
                    )}
                </div>
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
