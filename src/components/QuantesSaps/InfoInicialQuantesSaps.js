import React from "react";


export default function InfoInicialQuantesSaps({ readyGo }) {
    return (
        <section className="informativaInicial" >

            <h2>Quantes Saps?</h2>
            <p>Duel per Equips</p>
            <p>6 temátiques diferents i aleatóries</p>
            <p>L'orde dels duels será el seguent:</p>
            <p>Equip A tría temática contra equip B</p>
            <p>Equip A tría temática contra equip C</p>
            <p>Equip B tría temática contra equip A</p>
            <p>Equip B tría temática contra equip C</p>
            <p>Equip C tría temática contra equip A</p>
            <p>Equip C tría temática contra equip B</p>          

            <button className="regularButton" onClick={readyGo}>Dale!</button>


        </section>
    )
}