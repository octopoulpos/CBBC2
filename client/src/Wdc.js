import React from 'react';
import './App.css';
import Nav from "./components/Nav";
import NavButton from './components/NavButton';
import Projet from './components/Projet';



const Wdc = () => {

  return (
    <div>
      <NavButton />
      <Nav />
      <header className="App-header">
      <Projet />
      <Projet />
      <Projet />
      

      </header>
    </div>
  );

}

export default Wdc;
