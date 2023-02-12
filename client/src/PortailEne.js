import React from 'react';
import './App.css';
import Nav from "./components/Nav";
import NavButton from './components/NavButton';
import Info from './components/Info';
import BoutonConnectEnedis from "./components/BoutonConnectEnedis";


const PortailEne = () => {

  return (
    <div>
      <NavButton />
      <Nav />
      <header className="App-header">
        <Info />
        <BoutonConnectEnedis />

      </header>
    </div>
  );

}

export default PortailEne;
