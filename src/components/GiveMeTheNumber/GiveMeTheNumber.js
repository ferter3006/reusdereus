import React from "react";
import { useState } from 'react';
import { PreguntesDonemElNumero } from "../../Preguntes/PreguntesGiveMeTheNumber"
import TeamPoints from "../TeamPoints/TeamPoints";
import InformativaInicial from "./InformativaInicial";
import Temporitzador from "./Temporitzador";
import { useDispatch } from "react-redux";
import { setTeam1Points, setTeam2Points, setTeam3Points } from "../../features/reus/reusSlice";
import { useNavigate } from "react-router-dom";

export default function GiveMeTheNumber() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [infoIni, setInfoIni] = useState(true)
    const [secciopreguntitas, setsecciopreguntitas] = useState(false)
    const [contaQuestion, setContaQuestion] = useState(1)
    const [lesUsades, setLesUsades] = useState([])
    const [randomQuest, setRandomQuest] = useState(0)
    const [jasuma, setJasuma] = useState(false)

    const handleClick = (e) => {

        if (jasuma) {
            if (e === "team1points") {
                dispatch(setTeam1Points("giveMeTheNumber"))
            }
            if (e === "team2points") {
                dispatch(setTeam2Points("giveMeTheNumber"))
            }
            if (e === "team3points") {
                dispatch(setTeam3Points("giveMeTheNumber"))
            }


            let numeroRandom = Math.floor(Math.random() * PreguntesDonemElNumero.length)
            let alreadyUsed = ((element) => element === numeroRandom);
            while (lesUsades.some(alreadyUsed)) {
                let numeroRandom2 = Math.floor(Math.random() * PreguntesDonemElNumero.length)
                alreadyUsed = ((element) => element === numeroRandom2);
            }
            setRandomQuest(numeroRandom)
            setLesUsades(prev => [...prev, numeroRandom])            
            setContaQuestion(prev => (prev + 1))

            if (contaQuestion === 15) {
                navigate('/quantes-saps')
            }
        }
    }

    const readyGo = () => {

        let numeroRandom = Math.floor(Math.random() * PreguntesDonemElNumero.length)
        setRandomQuest(numeroRandom)
        setLesUsades(prev => [...prev, numeroRandom])

        setInfoIni(false);
        setsecciopreguntitas(true)
        setJasuma(true);

    }

    return (
        <>
            <TeamPoints handleClick={handleClick} />
            {!infoIni ? null : <InformativaInicial readyGo={readyGo} />}
            {!secciopreguntitas ? null
                : <>
                    {contaQuestion !== 1 ? null : <p className="primerAvis">Clicka al equip que encerti la resposta per passar a la seguent</p>}

                    <Temporitzador num={contaQuestion} />
                    <section className="preguntitas">
                        {PreguntesDonemElNumero[randomQuest].P}
                    </section>
                    <section className="respostitas">
                        <h2>{PreguntesDonemElNumero[randomQuest].R}</h2>
                        <p>font: {PreguntesDonemElNumero[randomQuest].F}</p>
                    </section>
                </>}


        </>
    )
}