import React from "react";
import Project from "./Project";
import projects from "../projects";

const ProjectsList = () => {
  return (
    <div>
      {projects.map((project) => (
        <Project
          key={project.id}
          name={project.name}
          progression={project.progression}
          percent={project.percent}
          installation={project.installation}
          suite={project.suite}
          notes={project.notes}
        />
      ))}
    </div>
  );
};

export default ProjectsList;