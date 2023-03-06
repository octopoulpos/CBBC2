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
      {projects.map((project) => (
        <ProjectMongo
          key={project._id}
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
          transport={project.transport}
          totalManut={project.manutention}
          totalNoManut={project.noManut}
          listeCN={project.lineText1Concatenatedcn}
          listeDK={project.lineText1Concatenateddk}
          listeDE={project.lineText1Concatenatedde}
          listeUS={project.lineText1Concatenatedus}
          notes={project.quote}
        />
      ))}


    </div>
  );
};

export default ProjectsListMongo;