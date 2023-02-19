import React from "react";

const Semaine = (props) => {

    return (
        <div className="semaine">
            <div className="semaineA">
                <h1>{props.name}</h1>
                <h3>Points principaux : {props.done}</h3>
                <h3><br></br></h3>
                <h3>Jours travaillés : {props.jours}</h3>
            </div>
            <div className="semaineB">Notes : {props.notes} </div>
        </div>

    );
};
export default Semaine;