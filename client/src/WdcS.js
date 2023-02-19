import React from 'react';
import './App.css';
import Nav from "./components/Nav";
import NavButton from './components/NavButton';
import SemainesList from "./components/SemainesList";


const WdcS = () => {

  return (
    <div>
      <NavButton />
      <Nav />
      <header className="App-header">
      <SemainesList />
      
      </header>
    </div>
  );

}

export default WdcS;
