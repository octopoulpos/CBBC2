import React from 'react';
import './App.css';
import Nav from "./components/Nav";
import NavButton from './components/NavButton';
import ProjectsList from "./components/ProjectsList";


const Wdc = () => {

  return (
    <div>
      <NavButton />
      <Nav />
      <header className="App-header">
      <ProjectsList />
      
      </header>
    </div>
  );

}

export default Wdc;
