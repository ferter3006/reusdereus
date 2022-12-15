import TeamPoints from "../TeamPoints/TeamPoints";
import React, { useState } from "react";
import { SongArray } from "./omg";
import { useDispatch } from "react-redux";
import { setTeam1Points, setTeam2Points, setTeam3Points } from "../../features/reus/reusSlice";
import { useNavigate } from "react-router-dom";

export default function EndevinaSong() {

    const [mostradiv, setMostraDiv] = useState(false)
    const [contaSong, setContaSong] = useState(1)
    const [lesUsades, setLesUsades] = useState([])
    const [jasuma, setJasuma] = useState(false)
    const [randomSong, setRandomSong] = useState(Math.floor(Math.random() * SongArray.length))

    const audio = new Audio(SongArray[randomSong])
    const pista = audio.src.split('/')[6].split('.')[0].split('%20').toString().replaceAll(',', ' ')
    const titul = pista.split(' - ')[0]
    const autor = pista.split(' - ')[1]

    //    const reus = useSelector(state => state.reusdereus)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const toggleInfo = () => {
        document.getElementById('infoInicialSong').style.display = 'none'
        setMostraDiv(true)
        setJasuma(true)
    }

    const handlePlayClick = () => {

        if (audio.paused) {
            audio.play()
            document.getElementById('playButton').style.display = 'none'
            document.getElementById('nextButton').style.display = 'none'
            setTimeout(() => {
                audio.pause()
                document.getElementById('playButton').style.display = ''
                document.getElementById('nextButton').style.display = ''
            }, 15000);
        }

    }

    const handleClick = (e) => {

        if (!jasuma) { return }

        if (e === 'team1points') {
            dispatch(setTeam1Points('endevinaSong'))
        } else if (e === 'team2points') {
            dispatch(setTeam2Points('endevinaSong'))
        } else if (e === 'team3points') {
            dispatch(setTeam3Points('endevinaSong'))
        }


    }

    const nextSong = () => {
        let numeroRandom = Math.floor(Math.random() * SongArray.length)
        let alreadyUsed = ((element) => element === numeroRandom);
        while (lesUsades.some(alreadyUsed)) {
            if (lesUsades.length >= SongArray.length) { alert('error inesperado, dejara de funcionar con normalidad'); break; }
            let numeroRandom2 = Math.floor(Math.random() * SongArray.length)
            alreadyUsed = ((element) => element === numeroRandom2);
            numeroRandom = numeroRandom2
        }

        setRandomSong(numeroRandom)
        setLesUsades(prev => [...prev, numeroRandom])
        setContaSong(prev => (prev + 1))

        if (contaSong === 6) {
            navigate('/una-de-dues')
        }


    }

    const titulClick = () => {
        if (document.getElementById('h3Content').style.backgroundColor !== 'black') {
            document.getElementById('h3Content').style.backgroundColor = 'black'
        } else { document.getElementById('h3Content').style.backgroundColor = 'white' }

    }

    return (
        <div>
            <TeamPoints handleClick={handleClick} />
            <section>
                <h2>EndevinaSong</h2>
                <h3>Prova per Equips</h3>
                <div id="infoInicialSong">
                    <p>Sonará els primers 15 segons d'una canço que haureu d'adivinar</p>
                    <p>Heu de donar una única resposta, només s'aceptará com a resposta bona el <strong>títul exacte</strong> de la cançó</p>
                    <p>Comença el torn per l'equip que vagi guanyant</p>
                    <p>Si no la sabeu hi ha rebot pel seguent equip, pero no es tornará a reproduir la cançó. Així que s'ha d'estar molt atent la primera vegada.</p>
                    <p>Si cap dels 3 equips l'endevina, es podrá escoltar 15 segons més per a tornar a intentar endevinarla, en el mateix ordre que fins ara</p>
                    <p>Si tampoc l'endevina ningú, molt malament!</p>
                    <p>Després el torn anirá al seguent equip, fins a un total de 6 torns, 2 cançons per cada equip.</p>

                    <button className="regularButton" onClick={toggleInfo}>Ok, Dale!</button>
                </div>
                {!mostradiv ? null :
                    <div>
                        <div className="btncontent">
                            <button id="playButton" className="regularButton playSong" onClick={handlePlayClick}>¡Play Song!</button>
                        </div>

                        <div className="h3Content" id="h3Content" onClick={titulClick}>
                            <h3 className="titulAutor">{titul}</h3>
                            <p>{autor}</p>
                        </div>
                        <div className="btncontent">
                            <button id="nextButton" onClick={nextSong} className="regularButton" style={{ marginTop: '50px' }}>nextSong</button>
                        </div>
                    </div>
                }
            </section>
        </div>
    )
}

