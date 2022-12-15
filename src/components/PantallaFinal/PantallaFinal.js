import { useState } from "react";
import QuantesSaps from "../QuantesSaps/QuantesSaps";
import TeamPoints from "../TeamPoints/TeamPoints";

export function PantallaFinal() {

    const [desempat, setDesempat] = useState(false)

    const handleClick = () => {
        setDesempat(true)
    }

    return (
        <>
            <section>
                <h2>Enhorabona als Guanyadors</h2>
                <h3>Pringaaaaaosss!!! als perdedors</h3>
                <TeamPoints />
                <h3>Hi ha empat?</h3>
                <p>Doncs o us ho jugueu a pedra-paper-tissora...</p>
                <p>O feu unes proves de Quantes Saps fins a desempatar...</p>
                <p>Si només hi ha 2 equips empatats doncs us ho jugeu entre els 2 mentres els 3ers s'ho miren</p>
            </section>
            
            {!desempat ? 
            <button onClick={handleClick} className="regularButton">Desempat Please!</button> :
                <QuantesSaps />
            }

        </>
    )
}