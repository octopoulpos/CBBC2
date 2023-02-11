import React from 'react';
import './App.css';
import Login from "./components/Login";
import Nav from "./components/Nav";
import NavButton from './components/NavButton';
import Info from './components/Info';
import BoutonConnectEnedis from "./components/BoutonConnectEnedis";

var isLoggedIn = false;
var isRegistered = false;

const Connexion = () => {

  return (
    <div>
      <NavButton />
      <Nav />
      <header className="App-header">
      <Info />
        {
          isLoggedIn === true ?
            <BoutonConnectEnedis isRegistered={isRegistered} /> : null
        }
        {
          isLoggedIn === false ?
            <Login isRegistered={isRegistered} /> : null
        }

      </header>
    </div>
  );

}

export default Connexion;
