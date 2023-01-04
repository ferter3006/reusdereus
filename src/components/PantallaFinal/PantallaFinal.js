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
                <p>Doncs ho decidiu a OSTIES</p>
            </section>



        </>
    )
}