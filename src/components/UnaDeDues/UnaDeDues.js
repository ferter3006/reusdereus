import React, { useEffect, useState } from "react"
import TeamPoints from "../TeamPoints/TeamPoints";
import { PreguntesUnaDeDues } from "../../Preguntes/PreguntesUnaDeDues";
import { useDispatch } from "react-redux";
import { setTeam1Points, setTeam2Points, setTeam3Points } from "../../features/reus/reusSlice";
import { useNavigate } from "react-router-dom";

export function UnaDeDues() {


    const [arrayRandom, setArrayRandom] = useState([])
    const [seccioPreguntes, setSeccioPreguntes] = useState(false)
    const [numerPreguntaToca, setnumeroPreguntaToca] = useState(0)
    const [enunciat, setEnunciat] = useState('')
    const [resposta1, setResposta1] = useState({ text: '', valor: false })
    const [resposta2, setResposta2] = useState({ text: '', valor: false })
    const [resposta3, setResposta3] = useState({ text: '', valor: false })
    const [jasuma, setJasuma] = useState(false)
    

    const dispatch = useDispatch()
    const navigate = useNavigate()


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

    useEffect(() => {
        let arraytemporal = []

        while (arraytemporal.length < 6) {

            let numeroRandom = Math.floor(Math.random() * PreguntesUnaDeDues.length)
            let alreadyUsed = (element) => element === numeroRandom;
            while (arraytemporal.some(alreadyUsed)) {

                let numeroRandom2 = Math.floor(Math.random() * PreguntesUnaDeDues.length)
                alreadyUsed = (element) => element === numeroRandom2;
                numeroRandom = numeroRandom2
            }
            arraytemporal.push(numeroRandom)
        }

        setArrayRandom(arraytemporal)



    }, []);


    const handleClickDale = () => {

        setJasuma(true)
        seccioPreguntes ? setSeccioPreguntes(false) : setSeccioPreguntes(true)
        pintaPregunta()
    }

    const pintaPregunta = () => {

        setEnunciat(PreguntesUnaDeDues[arrayRandom[numerPreguntaToca]].P)
        let x = Math.floor(Math.random() * 11)

        if (x > 5) {
            setResposta1({
                text: PreguntesUnaDeDues[arrayRandom[numerPreguntaToca]].R[0],
                valor: true
            })
            setResposta2({
                text: PreguntesUnaDeDues[arrayRandom[numerPreguntaToca]].R[1],
                valor: false
            })
        } else {
            setResposta1({
                text: PreguntesUnaDeDues[arrayRandom[numerPreguntaToca]].R[1],
                valor: false
            })
            setResposta2({
                text: PreguntesUnaDeDues[arrayRandom[numerPreguntaToca]].R[0],
                valor: true
            })
        }

        setResposta3({
            text: PreguntesUnaDeDues[arrayRandom[numerPreguntaToca]].R[2],
            valor: false
        })

        setnumeroPreguntaToca(numerPreguntaToca + 1)

    }

    const handleResposta = (valor, index) => {

        let color = valor ? 'lightgreen' : 'tomato'

        document.getElementById(index).style.backgroundColor = color
    }

    const NextPregunta = () => {

        if (numerPreguntaToca < 6) { pintaPregunta() }
        else { navigate('/pantalla-final') }



        document.getElementById('resp1').style.backgroundColor = 'white'
        document.getElementById('resp2').style.backgroundColor = 'white'
        document.getElementById('resp3').style.backgroundColor = 'white'


    }

    return (
        <div>
            <TeamPoints handleClick={handleClickPoints} />

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
            {!seccioPreguntes ? null :
                <section>
                    <h3>{enunciat}</h3>
                    <br />
                    <div className="tresRespostesDiv">
                        <button id="resp1" onClick={() => handleResposta(resposta1.valor, 'resp1')} className="teamSquare">{resposta1.text}</button>
                        <button id="resp2" onClick={() => handleResposta(resposta2.valor, 'resp2')} className="teamSquare">{resposta2.text}</button>
                        <button id="resp3" onClick={() => handleResposta(resposta3.valor, 'resp3')} className="teamSquare">{resposta3.text}</button>
                    </div>
                    <br />
                    <button onClick={NextPregunta} className="regularButton">Next!</button>

                </section>
            }
        </div>

    )
}