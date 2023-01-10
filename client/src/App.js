import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import BoutonConnectEnedis from "./components/BoutonConnectEnedis";
import Login from "./components/Login";
import Nav from "./components/Nav";
import Logo from "./components/Logo"

  var isLoggedIn = true;
  var isRegistered = true;

const App = () => {
  const [msg, setMsg] = useState('')

  const handleClick = async () => {
    const data = await window.fetch('/api/xxx')
    const json = await data.json()
    console.log(json)
  }

  return (
    <div className="App">

      <Nav />
      <header className="App-header">

        <img src={logo} className="App-logo" alt="logo" />
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


// TEST synchro avec proxy vers server
{/* <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={handleClick}>Yo!</button>
        <p>{msg}</p>
      </header>
    </div> */}



export default App;
