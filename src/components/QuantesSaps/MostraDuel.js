import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTeam1Points, setTeam2Points, setTeam3Points } from "../../features/reus/reusSlice";
import { SeleccionaWinLoser } from "./SeleccionaWinLoser";
import Temporitzador from "../Temporitzador/Temporitzador";

export default function MostraDuel({ completaProva }) {

    const [tocaPregunta, setTocaPregunta] = useState('')
    const [tocaRespostes, setTocaRespostes] = useState([])
    const [tocaFont, setTocaFont] = useState('')
    const [tocaId, setTocaID] = useState(0)
    const [contadorCompletes, setContadorCompletes] = useState(0)
    const [contadorFalten, setContadorFalten] = useState(0)
    const [mostrem, setmostrem] = useState(false)

    const reus = useSelector(state => state.reusdereus)
    const dispatch = useDispatch()

    useEffect(() => {
        demanaPregunta()
    }, [])

    const demanaPregunta = () => {
        fetch(`${process.env.REACT_APP_API_ENDPOINT}/preguntesquantessaps/game/${reus.game.jocId}`, {
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
                setTocaRespostes(jsonResponse.tocaRespostes)
                setTocaFont(jsonResponse.tocaFont)
                setTocaID(jsonResponse.tocaID)
                setContadorCompletes(jsonResponse.preguntesCompletades)
                setContadorFalten(jsonResponse.preguntesFalten)
                setmostrem(true)
            });
    }

    const handleClickWinLoser = (guanya, perd) => {        
        setmostrem(false)
        fetch(`${process.env.REACT_APP_API_ENDPOINT}/preguntesquantessaps/clickresposta`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${reus.user.apiToken}`,
                'Content-Type': "application/json",
                'Accept': "application/json",
            },
            body: JSON.stringify({
                'pregunta_id': tocaId,
                'game_id': reus.game.jocId,
                'winner': guanya,
                'loser': perd,
            })
        })
            .then(response => response.json())
            .then(jsonResponse => {
                console.log(jsonResponse);
                dispatch(setTeam1Points(jsonResponse.team1points))
                dispatch(setTeam2Points(jsonResponse.team2points))
                dispatch(setTeam3Points(jsonResponse.team3points))
                if (contadorFalten === 1) {
                    return completaProva();
                }
                demanaPregunta()
            })
    }

    // senzillament cambia de color la resposta al clickar
    const toggleColor = (e) => {
        if ((e.target.style.backgroundColor === 'rgb(48, 82, 183)') || !e.target.style.backgroundColor) {
            e.target.style.backgroundColor = 'rgb(46, 204, 113)'
        } else { e.target.style.backgroundColor = 'rgb(48, 82, 183)' }
    }

    return (
        <>
            <Temporitzador falten={contadorFalten} completes={contadorCompletes} />
            {!mostrem ? null :
                <>
                    <section>
                        <h2>{tocaPregunta ? tocaPregunta : 'Inventant pregunta...'}</h2>
                        <div className="font">Segons {tocaFont}</div>
                    </section>
                    <section className="respostesDuel">
                        {tocaRespostes.map((x, i) => (
                            <div key={i} className="opcionsDuel" onClick={toggleColor}>{x.resposta}</div>
                        ))}
                    </section>

                    <section>
                        <SeleccionaWinLoser handleClick={handleClickWinLoser} />
                    </section>
                </>
            }
        </>
    )
}