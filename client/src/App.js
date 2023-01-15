import React from 'react';
import './App.css';
import Nav from "./components/Nav";
import Logo from "./components/Logo";
import Acceuil from './components/Acceuil';

function App() {

  return (
    <div className="App">

      <Nav />
      <Acceuil />
      <header className="App-header">
        <Logo />
      </header>

    </div>
  );

}

export default App;
