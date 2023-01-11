import React from 'react';
import {Routes, Route} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Nav from "./components/Nav";
import Logo from "./components/Logo";

function App () {

  return (
    <div className="App">

      <Nav />
      <header className="App-header">
        <Logo />
        <img src={logo} className="App-logo" alt="logo" />


      </header>

    </div>
  );

}


// TEST synchro avec proxy vers server
// const [msg, setMsg] = useState('')
// const handleClick = async () => {
//   const data = await window.fetch('/api/xxx')
//   const json = await data.json()
//   console.log(json)
// }
/* <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={handleClick}>Yo!</button>
        <p>{msg}</p>
      </header>
    </div> */



export default App;
