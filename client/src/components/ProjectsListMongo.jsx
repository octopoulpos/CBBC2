import React, { useState, useEffect } from "react";
import ProjectMongo from "./ProjectMongo";
import axios from "axios";

const ProjectsListMongo = () => {
  const [projects, setProjects] = useState([]);


  useEffect(() => {
    axios
      .get("/projects")
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      {projects
        .sort((a, b) => a?.nom?.localeCompare(b?.nom)) // sort projects by 'nom' property
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
            margePIF={project.margePIF}
            margeCurrent={project.margeCurrent}
            totalCommandes={project.totalCommandes}
            percent={project.prixVente}
            totalCN={project.sommeCN}
            totalDK={project.sommeDK}
            totalDE={project.sommeDE}
            totalUS={project.sommeUS}
            totalKANNE={project.sommeKANNE}
            totalSODI={project.sommeSODI}
            totalPMV={project.sommePMV}
            totalOLDAM={project.sommeOLDAM}
            totalTCS={project.sommeTCS}
            totalSATELEC={project.sommeSATELEC}
            totalAPAVE={project.sommeAPAVE}


            warranty={project.warranty}
            services={project.services}
            transport={project.transport}
            totalManut={project.manutention}
            totalNoManut={project.noManut}
            listeCN={project.lineText1Concatenatedcn}
            listeDK={project.lineText1Concatenateddk}
            listeDE={project.lineText1Concatenatedde}
            listeUS={project.lineText1Concatenatedus}
    
            newField={project.newField}
            newField1={project.newField1}
            newField2={project.newField2}
            newField3={project.newField3}
            newField4={project.newField4}
            newField5={project.newField5}
            newField6={project.newField6}
            newField7={project.newField7}
            newField8={project.newField8}
            newField9={project.newField9}
          />
        ))}
    </div>
  );
};

export default ProjectsListMongo;