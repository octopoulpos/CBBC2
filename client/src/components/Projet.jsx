import React from "react";
import ProgressBar from "./ProgressBar";



const Projet = () => {

    // const [percentage, setPercentage] = React.useState(0);
    
    return (
        <div className="projet">
            <h2>Projet truc</h2>
            <h3>- Progression : Livraisons planifiées, installation planifiée, MES prévue le 25/12/2023</h3>
            <ProgressBar percentage={85} />
        
            <h3>Lien vers débriefing</h3>
            <h3>Plans du projet</h3>
            
            <h3><br></br></h3>
            <h3>A noter :   </h3>
        </div>
    );
};
export default Projet;