import React from 'react';
import './App.css';
import Nav from "./components/Nav";
import Logo from "./components/Logo";

function App() {

  return (
    <div className="App">

      <Nav />
      <header className="App-header">
        <Logo />
      </header>

    </div>
  );

}

export default App;
