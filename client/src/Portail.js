import React from 'react';
import './App.css';
import BoutonConnectEnedis from "./components/BoutonConnectEnedis";
import Nav from "./components/Nav";
import Logo from "./components/Logo";
import DivX from './components/DivX';
import { CallbackTest } from './components/Enedis1';

var isLoggedIn = true;

const Portail = () => {

  return (
    <div className="App">

      <Nav />
      <header className="App-header">

        <Logo /><h1 className="App-title">Portail de connexion</h1>
        {
          isLoggedIn === false ?
            <DivX /> : null
        }
        {
          isLoggedIn === true ?
            <BoutonConnectEnedis /> : null
        }
        <button id="auth-button">Obtenir un jeton d'accès</button>
        <CallbackTest />

      </header>

    </div>
  );

}

export default Portail;
