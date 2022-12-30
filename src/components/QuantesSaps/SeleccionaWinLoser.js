import React, { useState } from "react";
import { useSelector } from "react-redux";


export function SeleccionaWinLoser ({ handleClick }) {

    const reus = useSelector(state => state.reusdereus)

    const [guanyador, setGuanyador] = useState([0, 0, 0])
    const [perdedor, setPerdedor] = useState([0, 0, 0])
    const [stringGuanyador, setStringGuanyador] = useState('')
    const [stringPerdedor, setStringPerdedor] = useState('')
    const [mensaje, setmensaje] = useState('')

    const siCLick = (e) => {

        switch (e.target.id) { 
            case "team1pointsw":
                setGuanyador(['WIN', 0, 0])
                setStringGuanyador('1')
                break;
            case "team2pointsw":
                setGuanyador([0, 'WIN', 0])
                setStringGuanyador('2')
                break;
            case "team3pointsw":
                setGuanyador([0, 0, 'WIN'])
                setStringGuanyador('3')
                break;
            case "team1pointsl":
                setPerdedor(['LOSE', 0, 0])
                setStringPerdedor('1')
                break;
            case "team2pointsl":
                setPerdedor([0, 'LOSE', 0])
                setStringPerdedor('2')
                break;
            case "team3pointsl":
                setPerdedor([0, 0, 'LOSE'])
                setStringPerdedor('3')
                break;

            default:
                break;
        }
    }

    const dalePalante = () => {
        if (stringGuanyador === '') {
            setmensaje('Algú he de guanyar...')
            return
        }
        if (stringPerdedor === '') {
            setmensaje('Algú he de perdre...')
            return
        }
        if (stringGuanyador === stringPerdedor) {
            setmensaje('No pot guanyar i perdre el mateix equip...')
            return
        }
        setmensaje('')
        handleClick(stringGuanyador, stringPerdedor)
    }
    return (
        <>

            <h2>Qui ha guanyat?</h2>
            <section className="pointsOfTeams">
                <button className="teamSquare" id='team1pointsw' onClick={siCLick}>
                    <span id='team1pointsw' className="teamName">{reus.team1Name}</span>
                    <span id='team1pointsw' className="teamPoints">{guanyador[0]}</span>
                </button>
                <button className="teamSquare" id='team2pointsw' onClick={siCLick}>
                    <span id='team2pointsw' className="teamName">{reus.team2Name}</span>
                    <span id='team2pointsw' className="teamPoints">{guanyador[1]}</span></button>
                <button className="teamSquare" id='team3pointsw' onClick={siCLick}>
                    <span id='team3pointsw' className="teamName">{reus.team3Name}</span>
                    <span id='team3pointsw' className="teamPoints">{guanyador[2]}</span></button>
            </section>
            <h2>Qui ha perdut?</h2>
            <section className="pointsOfTeams">
                <button className="teamSquare" id='team1pointsl' onClick={siCLick}>
                    <span id='team1pointsl' className="teamName">{reus.team1Name}</span>
                    <span id='team1pointsl' className="teamPoints">{perdedor[0]}</span>
                </button>
                <button className="teamSquare" id='team2pointsl' onClick={siCLick}>
                    <span id='team2pointsl' className="teamName">{reus.team2Name}</span>
                    <span id='team2pointsl' className="teamPoints">{perdedor[1]}</span></button>
                <button className="teamSquare" id='team3pointsl' onClick={siCLick}>
                    <span id='team3pointsl' className="teamName">{reus.team3Name}</span>
                    <span id='team3pointsl' className="teamPoints">{perdedor[2]}</span></button>
            </section>
            <p className="mesajeAlerta">{mensaje}</p>
            <button className="regularButton espai" onClick={dalePalante}>Dale!</button>
        </>
    )
}
