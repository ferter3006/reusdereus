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
import Login from './components/Login/Login';
import Menu from './components/Menu/Menu';
import LogoutButton from './components/LogoutButton/LogoutButton';
import PillaCookies from './components/PillaCookies/PillaCookies';


export default function App() {

  return (
    <BrowserRouter>
      <PillaCookies />
      <div className='container'>
        <header>
          <h1>Reus<span className='de'>de</span>Reus</h1>
          <LogoutButton />
          <p className='byferter'>by Ferter / versió Beta 0.8.3</p>
        </header>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/menu' element={<Menu />} />
          <Route path='/creargame' element={<TeamInputs />} />
          <Route path='/donamelnumero' element={<GiveMeTheNumber />} />
          <Route path='/quantessaps' element={<QuantesSaps />} />
          <Route path='/endevinasong' element={<EndevinaSong />} />
          <Route path='/unadedues' element={<UnaDeDues />} />
          <Route path='/pantallafinal' element={<PantallaFinal />} />
        </Routes>


      </div >
    </BrowserRouter>
  );
}


