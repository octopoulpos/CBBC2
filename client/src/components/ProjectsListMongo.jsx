import React, { useState, useEffect } from "react";
import ProjectMongo from "./ProjectMongo";
import axios from "axios";

const ProjectsListMongo = () => {
  const [projects, setProjects] = useState([]);


  useEffect(() => {
    axios
      .get("/projects")
      .then((response) => {
        console.log("Response data:", response.data); // Add this line to log the data received from the server
        setProjects(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  
  return (
    <div>
      {projects
        //.sort((a, b) => a?.nom?.localeCompare(b?.nom)) 
        .sort((a, b) => new Date(b.today) - new Date(a.today))
        .map((project) => (
          <ProjectMongo
            key={project.quote}
            quote={project.quote}
            today={project.today}
            name={project.nom}
            ewdk={project.jedkDates}
            ewde={project.jedeDates}
            ewcn={project.jecnDates}
            ewus={project.jeusDates}
            ewiw={project.jeiwDates}
            prixVente={project.prixVente}
            margePIF={project.margePIF}
            margeCurrent={project.margeCurrent}
            totalCommandes={project.totalCommandes}
            percent={project.prixVente}
            totalCN={project.sommeCN}
            totalDK={project.sommeDK}
            totalDE={project.sommeDE}
            totalUS={project.sommeUS}
            totalIW={project.sommeIW}
            totalKANNE={project.sommeKANNE}
            totalSODI={project.sommeSODI}
            totalSILER={project.sommeSILER}
            totalFRADIN={project.sommeFRADIN}
            totalPMV={project.sommePMV}
            totalNUOVA={project.sommeNUOVA}
            totalOLDAM={project.sommeOLDAM}
            totalTCS={project.sommeTCS}
            totalSATELEC={project.sommeSATELEC}
            totalAPAVE={project.sommeAPAVE}

            paid={project.paid}
            warranty={project.warranty}
            services={project.services}
            transport={project.transport}
            totalManut={project.manutention}
            totalNoManut={project.noManut}
            listeCN={project.lineText1Concatenatedcn}
            listeDK={project.lineText1Concatenateddk}
            listeDE={project.lineText1Concatenatedde}
            listeUS={project.lineText1Concatenatedus}
            listeAutre={project.lineText1ConcatenatedAutre}

            newField0={project.newField0}
            newField1={project.newField1}
            newField2={project.newField2}
            newField3={project.newField3}
            newField4={project.newField4}
            newField5={project.newField5}
            newField6={project.newField6}
            newField7={project.newField7}
            newField8={project.newField8}
            newField9={project.newField9}

            dField0={project.dField0}
            dField1={project.dField1}
            dField2={project.dField2}
            dField3={project.dField3}
            dField4={project.dField4}
            dField5={project.dField5}
            dField6={project.dField6}
            dField7={project.dField7}
            dField8={project.dField8}
            dField9={project.dField9}
          />
        ))}
    </div>
  );
};

export default ProjectsListMongo;