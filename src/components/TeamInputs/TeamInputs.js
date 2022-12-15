import React from "react";
import './TeamInputs.css';
import { useDispatch, useSelector } from "react-redux";
import { setTeam1Name, setTeam2Name, setTeam3Name } from "../../features/reus/reusSlice";
import { useNavigate } from "react-router-dom";

export default function TeamInputs() {

  const placeJolder = 'Elige un nombre entre 3 y 25 carácteres'
  const reus = useSelector(state => state.reusdereus)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  console.log(reus.team1Name);

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

  const onSubmit = () => {
    navigate('/give-me-the-number')
  }

  return (
    <>
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
        <button onClick={onSubmit} className='regularButton'>Empezar</button>

      </section>
    </>
  )
}
