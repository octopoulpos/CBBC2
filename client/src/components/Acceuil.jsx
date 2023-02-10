import React from "react";
import texte from "../texte";

function Acceuil(props) {
    return (
        <div className="acceuil">
            <h1>{props.name}</h1>
            <div>
                <p>CBBC propose un ensemble de services et d'outils pour aider les responsables de blanchisseries à optimiser leur production, améliorer leur efficacité et réduire leurs dépenses. </p>
            </div>
            <div>
                <p>CBBC propose un en </p>
            </div>
        </div>
    );
}

export default Acceuil;