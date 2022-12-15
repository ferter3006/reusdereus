import React from "react";


export default function MostraCartes({arrayRandom, handleSelected, PreguntesQuantesSaps}){
    return(
        <>
                    <section className="titulsQuantesSaps">
                        <h2 >Títuls per escollir</h2>
                    </section>
                    <div className="contentCards">
                        {arrayRandom.map((cosa, i) => (<button key={i} id={cosa} onClick={handleSelected} className="opcioQuantesSaps">{PreguntesQuantesSaps[cosa].T}</button>))}
                    </div>

                </>
    )
}