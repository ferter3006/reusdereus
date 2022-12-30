import React, { useState } from "react";

export default function Temporitzador({ falten, completes }) {

  

    return (
        <section className="sectionTemporitzador">
            <div className="temporitzador"><span className="numeret">Pregunta {completes+1} / {falten+completes}</span></div>
        </section>
    )
}