// Summary.js
import quizCompleteImg from '../assets/quiz-complete.png';
import QUESTIONS from '../questions';
import TeamScores from './TeamScores';
import './Summary.css'; // Import the CSS file for custom styles

export default function Summary({ userAnswers, teamScores, teams }) {
    const totalTeams = teams.length;

    // Initialize statistics for each team
    const teamStats = teams.map(() => ({
        skipped: 0,
        correct: 0,
        incorrect: 0,
    }));

    // Calculate statistics for each team
    userAnswers.forEach((answer, index) => {
        const teamIndex = index % totalTeams;
        if (answer === null) {
            teamStats[teamIndex].skipped += 1;
        } else if (answer === QUESTIONS[index].answers[0]) {
            teamStats[teamIndex].correct += 1;
        } else {
            teamStats[teamIndex].incorrect += 1;
        }
    });

    const skippedAnswers = userAnswers.filter(answer => answer === null);
    const correctAnswers = userAnswers.filter(
        (answer, index) => answer === QUESTIONS[index].answers[0]
    );

    const skippedAnswersShare = Math.round((skippedAnswers.length / userAnswers.length) * 100);
    const correctAnswersShare = Math.round((correctAnswers.length / userAnswers.length) * 100);
    const wrongAnswersShare = 100 - skippedAnswersShare - correctAnswersShare;

    return (
        <div id="summary">
            <img src={quizCompleteImg} alt="Trophy icon" className="summary-img" />
            <h2 className="summary-title">Quiz Completed</h2>
            <TeamScores teams={teams} scores={teamScores} />

            <div className="team-stats">
                <h4 className="team-stats-title">Team Statistics</h4>
                <div className="team-stats-list">
                    {teams.map((team, index) => (
                        <div key={index} className="team-stat-item">
                            <h4 className="team-name">{team}</h4>
                            <p className="stat-item">Skipped: <span className="stat-value">{teamStats[index].skipped}</span></p>
                            <p className="stat-item">Correct: <span className="stat-value">{teamStats[index].correct}</span></p>
                            <p className="stat-item">Incorrect: <span className="stat-value">{teamStats[index].incorrect}</span></p>
                        </div>
                    ))}
                </div>
            </div>

            <ol className="user-answers">
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
                        <li key={index} className="answer-item">
                            <h3 className="question-number">{index + 1}</h3>
                            <p className='question-text'>{QUESTIONS[index].text}</p>
                            <p className={cssClass}>{answer ?? 'Skipped'}</p>
                        </li>
                    )
                })}
            </ol>
        </div>
    );
}
