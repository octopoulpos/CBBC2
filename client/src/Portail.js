import React from 'react';
import './App.css';
import BoutonConnectEnedis from "./components/BoutonConnectEnedis";
import Login from "./components/Login";
import Nav from "./components/Nav";
import Logo from "./components/Logo";

  var isLoggedIn = false;
  var isRegistered = false;

const Portail = () => {

  return (
    <div className="App">

      <Nav />
      <header className="App-header">

        <Logo /><h1 className="App-title">Portail de connexion</h1>
        {
          isLoggedIn === false ?
            <Login isRegistered={isRegistered} /> : null
        }
        {
          isLoggedIn === true ?
            <BoutonConnectEnedis /> : null
        }

      </header>
      
    </div>
  );

}

export default Portail;
