import React from "react";
import './TeamScores.css'; // Import the CSS file for styling

export default function TeamScores({ teams, scores }) {
    return (
        <div id="team-scores">
            <h4>Team Scores</h4>
            <div className="scores-container">
                {teams.map((team, index) => (
                    <div key={index} className="team-score">
                        <h4>{team}</h4>
                        <p>{scores[index]}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
