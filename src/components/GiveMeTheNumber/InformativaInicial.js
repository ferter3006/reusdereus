import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";


export default function InformativaInicial({ readyGo }) {

    const sinonims = ['animalada', 'barbaritat', 'carretonada',
        'burrada', 'cabassada', 'carretada', 'fart', 'morterada', 'pluja',
        'porronada', 'riuada', 'fotracada']

    const [randomPerSinonims, setRandomPerSinonims] = useState(Math.floor(Math.random() * sinonims.length))

    const reus = useSelector(state => state.reusdereus);
    const canviaRandom = () => {
        setRandomPerSinonims(Math.floor(Math.random() * sinonims.length))
    }
    return (
        <section className="informativaInicial" >

            <h2>Les 15 que no saps!</h2>
            <p onClick={canviaRandom}>
                En aquesta prova jo us donaré un/a <strong>{sinonims[randomPerSinonims]}</strong> de preguntes on
                la resposta és sempre un número, es tracta de respondre el més rápid posible. </p>
            <ul>
                <li> 180 segons de ronda de preguntes.</li>
                <li> Teniu un máxim de 2 segons per donarme una resposta.</li>
                <li> Si encertes segueixes responent. </li>
                <li> Si falles passa al seguent jugador de la dreta. El torn va passant de jugador en jugador pasasant per tots. </li>
                <li> El moredador (jo) anirá responent "més" o "manco" segons la resposta. Encara que també pot respondre un simple "no" o "casi"...etc.</li>
                <li> Surtián 3 icones relatius a cada equip, apreta'l per informar quí ha guanyat els punts en cada pregunta i seguim jugant.</li>
                <li> <strong>10 punts</strong> cada resposta correcte.</li>
            </ul>
            {reus.game.jocId !== -999 ? <button className="regularButton" onClick={readyGo}>Inicia/Reanuda</button> : null}



        </section>
    )
}