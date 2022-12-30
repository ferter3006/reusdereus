import React, { useEffect } from "react";
import './TeamPoints.css'
import { useSelector } from "react-redux";

export default function TeamPoints({ handleClick }) {

    const reus = useSelector(state => state.reusdereus)

    const siCLick = (e) => {
        if (handleClick) { handleClick(e.target.id) }
    }    

    return (
        <section className="pointsOfTeams">
            <button className="teamSquare" id='1' onClick={siCLick}>
                <span id='1' className="teamName">{reus.team1Name}</span>
                <span id='1' className="teamPoints">{reus.team1Points}</span>
            </button>
            <button className="teamSquare" id='2' onClick={siCLick}>
                <span id='2' className="teamName">{reus.team2Name}</span>
                <span id='2' className="teamPoints">{reus.team2Points}</span></button>
            <button className="teamSquare" id='3' onClick={siCLick}>
                <span id='3' className="teamName">{reus.team3Name}</span>
                <span id='3' className="teamPoints">{reus.team3Points}</span></button>
        </section>
    )
}