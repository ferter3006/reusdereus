import React, { useState } from "react";

export default function Temporitzador({ num }) {

  

    return (
        <section className="sectionTemporitzador">
            <div className="temporitzador"><span className="numeret">Pregunta {num} / 15</span></div>
        </section>
    )
}