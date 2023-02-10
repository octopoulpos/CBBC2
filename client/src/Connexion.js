import React from 'react';
import './App.css';
import Login from "./components/Login";
import Nav from "./components/Nav";

  var isLoggedIn = false;
  var isRegistered = true;

const Connexion = () => {

  return (
    <div className="App">
      <Nav />
      <header className="App-header">

        <h1 className="App-title">Portail de connexion</h1>
        {
          isLoggedIn === false ?
            <Login isRegistered={isRegistered} /> : null
        }

      </header>
    </div>
  );

}

export default Connexion;
