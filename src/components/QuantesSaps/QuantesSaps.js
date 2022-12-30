import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TeamPoints from "../TeamPoints/TeamPoints";
import InfoInicialQuantesSaps from "./InfoInicialQuantesSaps";
import MostraDuel from "./MostraDuel";

export default function QuantesSaps(){    

    const [mostraInfo, setMostraInfo] = useState(true)  
    const reus = useSelector(state => state.reusdereus)  
    const navigate = useNavigate()

    const handleClickReadyGo = () => {
        setMostraInfo(false)
    }

    const completaProva = () => {
        fetch(`${process.env.REACT_APP_API_ENDPOINT}/preguntesquantessaps/completaprova/${reus.game.jocId}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${reus.user.apiToken}`,
                'Content-Type': "application/json",
                'Accept': "application/json",
            }
        })
            .then((response) => response.json())
            .then((jsonResponse) => {
                console.log(jsonResponse);
                return navigate('/endevinasong')
            })
    }

    return (
        <>            
            <TeamPoints />
            {mostraInfo ?
                <InfoInicialQuantesSaps readyGo={handleClickReadyGo} />
                : <MostraDuel completaProva={completaProva} />
            }
        </>
    )
}