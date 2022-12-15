import React from "react";


export default function InfoInicialQuantesSaps({readyGo, numJug, masMenosJug}){
    return(
        <section className="informativaInicial" >

            <h2>Quantes Saps?</h2>
            <p>
                En aquesta proba es <strong>important</strong> que indiquis el número total de participants, la suma de tots els equips </p>
                <div><button id="mas" className="masmenos mas" onClick={masMenosJug}>+</button>
                <div className="masmenos num">{numJug}</div>
                <button id="menos" onClick={masMenosJug} className="masmenos menos">-</button></div>
                <p>Es generará una pregunta per a cada participant.</p>
            
                <p>Cada jugador tría un tema de la llista i li envía el duel a qualsevol altre participant d'un equip enemig</p>
                <p>Pots enviarli el duel a qui sigui, encara que ja hagi estat retat abans.</p>
                <p>Un cop el moderador llegeixi la pregunta relacionada amb el tema que s'ha escollit, es comença una subasta per veure qui dels dos es veu més valent de donar més respostes correctes</p>
                <p>Comença la subasta el qui ha triat el tema, després es pregunta a l'altre participant si creu poder donar més respostes correctes.</p>
                <p>Quan un dels dos dexideix no sobrepujar més, es el moment de començar a respondre (el qui ha guanyat la subasta)</p>
                <p>Si diu tantes com ha promés, guanya. Si es queda curt, perd</p>
                <p>Qui guanya obté 20 punts pel seu equip, qui perd en perdrá 10.</p>
                <p>Abans de clicar <strong>assegura't</strong> que el <strong>número</strong> de participants sigui <strong>correcte</strong></p>
                
            
            
            <button className="regularButton" onClick={readyGo}>Dale!</button>


        </section>
    )
}