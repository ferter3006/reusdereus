import React, { useState } from "react";
import TeamPoints from "../TeamPoints/TeamPoints";
import InfoInicialQuantesSaps from "./InfoInicialQuantesSaps";
import { PreguntesQuantesSaps } from "../../Preguntes/PreguntesQuantesSaps";
import './QuantesSaps.css'
import MostraCartes from "./MostraCartes";
import MostraDuel from "./MostraDuel";
import { useDispatch } from "react-redux";
import { setTeam1Points, setTeam2Points, setTeam3Points } from "../../features/reus/reusSlice";
import { useNavigate } from "react-router-dom";

export default function QuantesSaps() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [mostraInfo, setMostraInfo] = useState(true)
    const [mostraCartes, setMostraCartes] = useState(false)
    const [mostraDuel, setMostraDuel] = useState(false)
    const [numJugadors, setNumJugadors] = useState(9)
    const [arrayRandom, setArrayRandom] = useState([])
    const [cartaSelected, setCartaSelected] = useState(999888)

    const handleClickReadyGo = () => {
        setMostraInfo(false)
        setMostraCartes(true)
        let arraytemporal = []

        while (arraytemporal.length < numJugadors) {
            let numeroRandom = Math.floor(Math.random() * PreguntesQuantesSaps.length)
            let alreadyUsed = (element) => element === numeroRandom;
            while (arraytemporal.some(alreadyUsed)) {
                let numeroRandom2 = Math.floor(Math.random() * PreguntesQuantesSaps.length)
                alreadyUsed = (element) => element === numeroRandom2;
                numeroRandom = numeroRandom2
            }
            arraytemporal.push(numeroRandom)
        }
        setArrayRandom(arraytemporal)
    }

    const masMenosJug = (e) => {
        if ((e.target.id === 'mas') && (numJugadors < 15)) { setNumJugadors(prev => (prev + 1)) }
        if ((e.target.id === 'menos') && (numJugadors > 3)) { setNumJugadors(prev => (prev - 1)) }

    }

    const retornaVistaCartes = (guanya, perd) => {

        setMostraCartes(true)
        setMostraDuel(false)

        if (guanya === 'team1points') {
            dispatch(setTeam1Points('quantes-saps-guanya'))
        } else if (guanya === 'team2points') {
            dispatch(setTeam2Points('quantes-saps-guanya'))
        } else if (guanya === 'team3points') {
            dispatch(setTeam3Points('quantes-saps-guanya'))
        }

        if (perd === 'team1points') {
            dispatch(setTeam1Points('quantes-saps-perd'))
        } else if (perd === 'team2points') {
            dispatch(setTeam2Points('quantes-saps-perd'))
        } else if (perd === 'team3points') {
            dispatch(setTeam3Points('quantes-saps-perd'))
        }

        if (arrayRandom.length < 1) { navigate('/endevina-song') }
    }

    const handleSelected = (e) => {

        const idClickada = parseInt(e.target.id) // la id es string, la pasem a INTEGER
        setArrayRandom(prev => (prev.filter(x => (x !== idClickada))))
        setCartaSelected(idClickada)
        setMostraCartes(false)
        setMostraDuel(true)
    }

    return (
        <>
            <TeamPoints />
            {!mostraInfo ? null : <InfoInicialQuantesSaps readyGo={handleClickReadyGo} numJug={numJugadors} masMenosJug={masMenosJug} />}
            {!mostraCartes ? null : <MostraCartes arrayRandom={arrayRandom} handleSelected={handleSelected} PreguntesQuantesSaps={PreguntesQuantesSaps} />}
            {!mostraDuel ? null : <MostraDuel retornaVistaCartes={retornaVistaCartes} cartaSelected={PreguntesQuantesSaps[cartaSelected]} />}

        </>
    )
}