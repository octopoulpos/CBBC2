import React from 'react';
import './App.css';
import Nav from "./components/Nav";
import Logo from "./components/Logo";
import DivX from './components/DivX';
import { Callback } from './components/Enedis1';

var isLoggedIn = true;

const Portail = () => {

  return (
    <div className="App">


      <header className="App-header">
        <Nav />
        <Logo /><h1 className="App-title">Portail de connexion</h1>
        {
          isLoggedIn === false ?
            <DivX /> : null
        }
          
        <Callback />

      </header>

    </div>
  );

}

export default Portail;
