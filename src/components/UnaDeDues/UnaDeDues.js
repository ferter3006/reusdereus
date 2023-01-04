import React, { useEffect, useState } from "react"
import TeamPoints from "../TeamPoints/TeamPoints";
import { PreguntesUnaDeDues } from "../../Preguntes/PreguntesUnaDeDues";
import { useDispatch, useSelector } from "react-redux";
import { setTeam1Points, setTeam2Points, setTeam3Points } from "../../features/reus/reusSlice";
import { useNavigate } from "react-router-dom";

export function UnaDeDues() {

    const [tocaPregunta, setTocaPregunta] = useState('')
    const [tocaResposta1, setTocaResposta1] = useState('')
    const [tocaResposta2, setTocaResposta2] = useState('')
    const [tocaResposta3, setTocaResposta3] = useState('')
    const [tocaFont, setTocaFont] = useState('')
    const [tocaId, setTocaID] = useState(0)
    const [contadorCompletes, setContadorCompletes] = useState(0)
    const [contadorFalten, setContadorFalten] = useState(0)
    const [mostrem, setmostrem] = useState(false)


    const [seccioPreguntes, setSeccioPreguntes] = useState(false)

    const [jasuma, setJasuma] = useState(false)


    const dispatch = useDispatch()
    const navigate = useNavigate()
    const reus = useSelector(state => state.reusdereus)


    const handleClickPoints = (e) => {

        if (!jasuma) { return }

        if (e === 'team1points') {
            dispatch(setTeam1Points('unaDeDues'))
        } else if (e === 'team2points') {
            dispatch(setTeam2Points('unaDeDues'))
        } else if (e === 'team3points') {
            dispatch(setTeam3Points('unaDeDues'))
        }
    }

    const demanaPregunta = () => {
        fetch(`${process.env.REACT_APP_API_ENDPOINT}/preguntesunadedues/game/${reus.game.jocId}`, {
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
                setTocaResposta1(jsonResponse.tocaResposta1)
                setTocaResposta2(jsonResponse.tocaResposta2)
                setTocaResposta3(jsonResponse.tocaResposta3)
                setTocaFont(jsonResponse.tocaFont)
                setTocaID(jsonResponse.tocaID)
                setContadorCompletes(jsonResponse.preguntesCompletades)
                setContadorFalten(jsonResponse.preguntesFalten)
                setmostrem(true)
                console.log(jsonResponse);
            });
    }


    const handleClickDale = () => {
        demanaPregunta()
        setJasuma(true)
        seccioPreguntes ? setSeccioPreguntes(false) : setSeccioPreguntes(true)
    }



    // simplement pintem verd o vermell al clicar per visualitzar la resposta                                               
    const handleResposta = (valor, index) => {
        console.log(valor, index);
        let color = valor ? 'lightgreen' : 'tomato'

        document.getElementById(index).style.backgroundColor = color
    }

    const handleClick = (e) => {
        console.log(e);
        if (!mostrem) { return }
        setmostrem(false)
        fetch(`${process.env.REACT_APP_API_ENDPOINT}/preguntesunadedues/clickresposta`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${reus.user.apiToken}`,
                'Content-Type': "application/json",
                'Accept': "application/json",
            },
            body: JSON.stringify({
                "pregunta_id": tocaId,
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
                    //completaprova();
                    return navigate('/pantallafinal')
                }
                demanaPregunta();
            });
    }

    const NextPregunta = () => {

        if (contadorFalten > 0) {
            console.log('contador falten: ', contadorFalten);
            // aki feiem pintapregunta
        }
        else { navigate('/pantalla-final') }

        document.getElementById('resp1').style.backgroundColor = 'white'
        document.getElementById('resp2').style.backgroundColor = 'white'
        document.getElementById('resp3').style.backgroundColor = 'white'
    }

    return (
        <div>
            <TeamPoints handleClick={handleClick} />

            <h2>Una<span className="de">de</span>Dues</h2>
            {seccioPreguntes ? null :

                <section>
                    <h3>Prova per Equips</h3>
                    <p>Aquesta es la <strong>última prova!</strong></p>
                    <p>Consta de 3 preguntes per a cada Equip, amb tres posibles respostes</p>
                    <p>Si l'encerteu, guanyeu 20 punts. Pero si falleu, cada un dels equips contraris guanyaran 20 punts!</p>
                    <p>Així que aquí es decideix tot.</p>
                    <p>Comença qui sigui i amb l'ordre que sigui, per exemple: per ordre de puntuació, qui més té començará primer.</p>

                    <button className="regularButton" onClick={handleClickDale}>Ok, Dale!</button>
                </section>
            }
            {!mostrem ? null :
                <section>
                    <h3>{tocaPregunta}</h3>
                    <br />
                    <div className="tresRespostesDiv">
                        <button id="resp1" onClick={() => handleResposta(tocaResposta1[1], 'resp1')} className="teamSquare">{tocaResposta1[0]}</button>
                        <button id="resp2" onClick={() => handleResposta(tocaResposta2[1], 'resp2')} className="teamSquare">{tocaResposta2[0]}</button>
                        <button id="resp3" onClick={() => handleResposta(tocaResposta3[1], 'resp3')} className="teamSquare">{tocaResposta3[0]}</button>
                    </div>
                    <div className="font">Segons: {tocaFont}</div>                    

                </section>
            }
        </div>

    )
}