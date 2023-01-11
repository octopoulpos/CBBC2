import React from 'react';
import './App.css';
import Login from "./components/Login";
import Nav from "./components/Nav";
import Logo from "./components/Logo";

  var isLoggedIn = false;
  var isRegistered = false;

const Connexion = () => {

  return (
    <div className="App">
      <Nav />
      <header className="App-header">

        <Logo /><h1 className="App-title">Portail de connexion</h1>
        {
          isLoggedIn === false ?
            <Login isRegistered={isRegistered} /> : null
        }

      </header>
    </div>
  );

}

export default Connexion;
