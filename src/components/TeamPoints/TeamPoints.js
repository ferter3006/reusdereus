import React from "react";
import './TeamPoints.css'
import { useSelector } from "react-redux";


export default function TeamPoints({ handleClick }) {

    const reus = useSelector(state => state.reusdereus)

    const siCLick = (e) => {
        if (handleClick) { handleClick(e.target.id) }
    }

    return (
        <section className="pointsOfTeams">
            <button className="teamSquare" id='team1points' onClick={siCLick}>
                <span id='team1points' className="teamName">{reus.team1Name}</span>
                <span id='team1points' className="teamPoints">{reus.team1Points}</span>
            </button>
            <button className="teamSquare" id='team2points' onClick={siCLick}>
                <span id='team2points' className="teamName">{reus.team2Name}</span>
                <span id='team2points' className="teamPoints">{reus.team2Points}</span></button>
            <button className="teamSquare" id='team3points' onClick={siCLick}>
                <span id='team3points' className="teamName">{reus.team3Name}</span>
                <span id='team3points' className="teamPoints">{reus.team3Points}</span></button>
        </section>
    )
}