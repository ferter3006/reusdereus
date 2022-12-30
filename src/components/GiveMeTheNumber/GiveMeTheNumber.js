import React, { useEffect } from "react";
import { useState } from 'react';
import TeamPoints from "../TeamPoints/TeamPoints";
import InformativaInicial from "./InformativaInicial";
import Temporitzador from "../Temporitzador/Temporitzador";
import { useDispatch, useSelector } from "react-redux";
import { setTeam1Name, setTeam1Points, setTeam2Name, setTeam2Points, setTeam3Name, setTeam3Points, setUserAtributes } from "../../features/reus/reusSlice";
import { useNavigate } from "react-router-dom";
import PillaCookies from "../PillaCookies/PillaCookies";

export default function GiveMeTheNumber() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const reus = useSelector(state => state.reusdereus)    

    const [infoIni, setInfoIni] = useState(true)
    const [secciopreguntitas, setsecciopreguntitas] = useState(false)

    const [tocaPregunta, setTocaPregunta] = useState('')
    const [tocaResposta, setTocaResposta] = useState('')
    const [tocaFont, setTocaFont] = useState('')
    const [tocaID, setTocaID] = useState(0)
    const [contadorFalten, setContadorFalten] = useState(0)
    const [contadorCompletes, setContadorCompletes] = useState(0)    

    // Quan hi ha un click per sumar punts d'un equip....
    // el que fem es un post per suamr els punts i per posar
    // la pregunta com "respondida" a la BD
    const handleClick = (e) => {
        if (!secciopreguntitas) { return }
        setsecciopreguntitas(false)
        fetch(`${process.env.REACT_APP_API_ENDPOINT}/preguntesdonamelnumero/clickresposta`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${reus.user.apiToken}`,
                'Content-Type': "application/json",
                'Accept': "application/json",
            },
            body: JSON.stringify({
                "pregunta_id": tocaID,
                "game_id": reus.game.jocId,
                "winner": e
            })
        })
            .then((response) => response.json())
            .then((jsonResponse) => {
                if (jsonResponse.message) {
                    return alert(jsonResponse.message)
                }                
                dispatch(setTeam1Points(jsonResponse.team1points))
                dispatch(setTeam2Points(jsonResponse.team2points))
                dispatch(setTeam3Points(jsonResponse.team3points))
                if (contadorFalten === 1) {
                    completaprova();
                    return navigate('/quantessaps')
                }
                demanaPregunta();
            });
    }

    // Demanem la seguent pregunta que toca per respondre a la base de dades
    // i actualitzem l'informació al State d'aquest component. 
    const demanaPregunta = () => {        
        fetch(`${process.env.REACT_APP_API_ENDPOINT}/preguntesdonamelnumero/game/${reus.game.jocId}`, {
            headers: {
                Authorization: `Bearer ${reus.user.apiToken}`,
                'Content-Type': "application/json",
                'Accept': "application/json",
            }
        })
            .then((response) => response.json())
            .then((jsonResponse) => {
                if (jsonResponse.message) {                    
                    return alert(jsonResponse.message)
                }                
                setTocaPregunta(jsonResponse.tocaPregunta)
                setTocaResposta(jsonResponse.tocaResposta)
                setTocaFont(jsonResponse.tocaFont)
                setTocaID(jsonResponse.tocaID)
                setContadorCompletes(jsonResponse.preguntesCompletades)
                setContadorFalten(jsonResponse.preguntesFalten)
                setsecciopreguntitas(true)
            });
    }

    // Per teure la pantala informativa inicial i mostrar ja les preguntes:
    const readyGo = () => {
        demanaPregunta();
        setInfoIni(false);
        setsecciopreguntitas(true)
    }

    // Marquem la prova com completada
    const completaprova = () => {
        fetch(`${process.env.REACT_APP_API_ENDPOINT}/preguntesdonamelnumero/completaprova/${reus.game.jocId}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${reus.user.apiToken}`,
                'Content-Type': "application/json",
                'Accept': "application/json",
            }
        })
            .then((response) => response.json())
            .then((jsonResponse) => {
                console.log(jsonResponse);
            })
    }

    return (
        <>            
            <TeamPoints handleClick={handleClick} />
            {!infoIni ? null : <InformativaInicial readyGo={readyGo} />}
            {!secciopreguntitas ? null
                : <>
                    {contadorCompletes !== 0 ? null : <p className="primerAvis">Clicka al equip que encerti la resposta per passar a la seguent</p>}

                    <Temporitzador falten={contadorFalten} completes={contadorCompletes} />
                    <section className="preguntitas">
                        {tocaPregunta}
                    </section>
                    <section className="respostitas">
                        <h2>{tocaResposta}</h2>
                        <p className="font">font: {tocaFont}</p>
                    </section>
                </>}
        </>
    )
}