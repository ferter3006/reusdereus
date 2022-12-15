import React from "react";
import { SeleccionaWinLoser } from "./SeleccionaWinLoser";


export default function MostraDuel({ retornaVistaCartes, cartaSelected }) {

    const handleClickDuel = (guanya, perd) => {
        retornaVistaCartes(guanya, perd)
    }

    const toggleColor = (e) => {
        if ((e.target.style.backgroundColor === 'rgb(48, 82, 183)') || !e.target.style.backgroundColor) {
            e.target.style.backgroundColor = 'rgb(46, 204, 113)'
        } else { e.target.style.backgroundColor = 'rgb(48, 82, 183)' }
    }

    return (
        <>
            <section>
                <h2>{cartaSelected.P}</h2>
                <div className="font">Segons {cartaSelected.F}</div>
            </section>
            <section className="respostesDuel">
                {cartaSelected.R.map((x, i) => (
                    <div key={i} className="opcionsDuel" onClick={toggleColor}>{x}</div>
                ))}
            </section>

            <section>
                <SeleccionaWinLoser handleClick={handleClickDuel} />
            </section>

        </>
    )
}