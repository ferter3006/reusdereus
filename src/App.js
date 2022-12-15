import React from 'react';
import './App.css';
import './components/GiveMeTheNumber/GiveMeTheNumber.css'
import TeamInputs from './components/TeamInputs/TeamInputs';
import GiveMeTheNumber from './components/GiveMeTheNumber/GiveMeTheNumber';
import QuantesSaps from './components/QuantesSaps/QuantesSaps';
import EndevinaSong from './components/EndevinaSong/EndevinaSong';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UnaDeDues } from './components/UnaDeDues/UnaDeDues';
import { PantallaFinal } from './components/PantallaFinal/PantallaFinal';


export default function App() {

  return (
    /*<div className='container'>
      <header>
        <h1>Reus<span className='de'>de</span>Reus</h1>
        <p className='byferter'>by Ferter / versió Beta 0.6</p>
        <TeamInputs />
      </header>
      <TeamInputs />*/
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<TeamInputs />} />
          <Route path='/give-me-the-number' element={<GiveMeTheNumber />} />
          <Route path='/quantes-saps' element={<QuantesSaps />} />
          <Route path='/endevina-song' element={<EndevinaSong />} />
          <Route path='/una-de-dues' element={<UnaDeDues />} />
          <Route path='/pantalla-final' element={<PantallaFinal />} />
        </Routes>
      </BrowserRouter>

    /*</div>*/
  );
}


