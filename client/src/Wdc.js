import React from 'react';
import './App.css';
import Nav from "./components/Nav";
import NavButton from './components/NavButton';
// import ProjectsList from "./components/ProjectsList";
import ProjectsListMongo from "./components/ProjectsListMongo";



const Wdc = () => {

  return (
    <div>
      <NavButton />
      <Nav />
      <header className="App-header">
        {/* <ProjectsList /> */}

        <ProjectsListMongo />

      </header>
    </div>
  );

}

export default Wdc;
