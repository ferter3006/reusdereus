import React, { useEffect, useState } from "react";
import './TeamInputs.css';
import { useDispatch, useSelector } from "react-redux";
import { setTeam1Name, setTeam2Name, setTeam3Name, setNumOfPlayers, setJocId, setApiToken, setUserAtributes, setTeam1Points, setTeam2Points, setTeam3Points } from "../../features/reus/reusSlice";
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie'

export default function TeamInputs() {

  const placeJolder = 'Elige un nombre entre 3 y 25 carácteres'
  const reus = useSelector(state => state.reusdereus)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cookies = new Cookies();

  const [mostraBton, setmostraBtn] = useState(true);

  // Comprovem si existeixen ls Cookies d'Usuari i Api
  // Per si hi ha un refresh de la pagina que no peti
  useEffect(() => {
    if ((cookies.get('reusdereusApiKey')) && (cookies.get('reusdereusUser'))) {
      dispatch(setApiToken(cookies.get('reusdereusApiKey')));
      let cuki = cookies.get('reusdereusUser');
      dispatch(setUserAtributes({
        id: cuki.id,
        name: cuki.name,
        email: cuki.email,
        roles: cuki.roles[0].name
      }));
    }
  }, [])

  // Actualització realTime dels inputs al state
  const onChange = (e) => {
    switch (e.target.id) {
      case "team1name":
        return dispatch(setTeam1Name(e.target.value))
      case "team2name":
        return dispatch(setTeam2Name(e.target.value))
      case "team3name":
        return dispatch(setTeam3Name(e.target.value))

      default:
        break;
    }
  }

  const onSubmit = (e) => {
    dispatch(setTeam1Points(0))
    dispatch(setTeam2Points(0))
    dispatch(setTeam3Points(0))
    setmostraBtn(false)
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/crearjuego`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${reus.user.apiToken}`,
        'Content-Type': "application/json",
        'Accept': "application/json",
      },
      body: JSON.stringify({
        "id": reus.user.id,
        "username": reus.user.name,
        "email": reus.user.email,        
        "team1name": reus.team1Name,
        "team2name": reus.team2Name,
        "team3name": reus.team3Name,
      })
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (jsonResponse.message) {
          setmostraBtn(true)
          return alert(jsonResponse.message)
        }
        // Si el joc es crea correctament
        // Guardem la ID del joc al state y a una cookie
        dispatch(setJocId(jsonResponse.jocCreat[0].id))
        cookies.set('reusdereusGameId', JSON.stringify(jsonResponse.jocCreat[0].id));
        console.log('joc creat correctament',jsonResponse.jocCreat[0]);                
        navigate('/donamelnumero')
        setmostraBtn(true)
      });
  }

  return (
    <>
      <h2>Noms dels equips</h2>
      <section>
        <h3>{reus.team1Name}</h3><br />
        <input onChange={onChange} className='inputTeam' type='text' maxLength="25" id='team1name' placeholder={placeJolder}></input>
      </section>
      <section>
        <h3>{reus.team2Name}</h3><br />
        <input onChange={onChange} className='inputTeam' type='text' maxLength="25" id='team2name' placeholder={placeJolder}></input>
      </section>
      <section>
        <h3>{reus.team3Name}</h3><br />
        <input onChange={onChange} className='inputTeam' type='text' maxLength="25" id='team3name' placeholder={placeJolder}></input>
      </section>
      <section>
        <h2>Listos?</h2>
        <button onClick={mostraBton ? onSubmit : null} className='regularButton'>Crear Joc</button>        
      </section>
    </>
  )
}
