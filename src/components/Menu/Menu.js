import React from "react";
import { useNavigate } from "react-router-dom";
import TeamPoints from "../TeamPoints/TeamPoints";

export default function Menu() {
    const navigate = useNavigate();
    return (
        <>
            <TeamPoints />
            <div className="menuContainer">
                <button className="menuSection">Hisorial de Jocs</button>
                <button className="menuSection">Jocs en Curs</button>

                <button className="menuSection"
                    onClick={() => { navigate('/creargame') }}
                >Crear nou Joc</button>
            </div>
        </>
    )
}