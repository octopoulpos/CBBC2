import React from 'react';
import './App.css';
import Nav from "./components/Nav";
import NavButton from './components/NavButton';
import Acceuil from './components/Acceuil';


function App() {

  return (
    <div className="App">

      <header></header>

      <NavButton />
      <Nav />
      <Acceuil />
      <Acceuil />
      <Acceuil />
    </div>
  );

}

export default App;
