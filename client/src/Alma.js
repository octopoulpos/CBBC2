import React from 'react';
import './App.css';
import Nav from "./components/Nav";
import NavButton from './components/NavButton';
import Espagnol from './components/Espagnol';


const Alma = () => {

  return (
    <div>
      <NavButton />
      <Nav />
      <header className="App-header">
      <Espagnol />
      
      </header>
    </div>
  );

}

export default Alma;
