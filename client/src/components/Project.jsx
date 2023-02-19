import React from "react";
import ProgressBar from "./ProgressBar";



const Project = (props) => {

    return (
        <div className="projet">
            <div className="projetA">
                <h2>{props.name}</h2>
                <h3>Etat du projet : {props.progression}</h3>
                <ProgressBar percentage={props.percent} />
                <h3>Date d'installation et équipes : {props.installation}</h3>
                <h3><br></br></h3>
                <h3>A suivre : {props.suite}</h3>
            </div>
            <div className="projetB">notes : {props.notes} </div>
        </div>

    );
};
export default Project;