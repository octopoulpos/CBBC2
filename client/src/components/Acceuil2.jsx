import React from "react";

function Acceuil2(props) {
    return (
       
 <div className="acceuil">
            <h1>Maitrisez votre énergie</h1>
            <div className="acceuil2">
                <h1>{props.name}</h1>
                <img
                    src="https://cdn.midjourney.com/85b2ebe6-616c-43bc-91f9-2c7f1cebb669/grid_0.png"
                    alt="oeil"
                    className="circle-img"
                    style={{ cursor: 'pointer' }}
                />
                <div className="acceuil3">
                <p>L'énergie à toujours été un élément essentiel dans la production d'une blanchisserie industrielle, l'évolution récente des équilibres géostratégiques mondiaux, la raréfaction des énergies fossiles et la volonté collective de limiter nos émmisions de CO2 rendent l'enjeux de l'énergie d'autant plus important. La maîtrise de vos dépenses en énergie devient maintenant fondamentale pour assurer la continuité de vos services.</p>
                <p>Vous aider dans cette mission :</p>
               
                <p className="p2">Réalisez un audit de votre process.</p>
                <p className="p2">Organisez un suivi constant de vos dépenses énergétiques et évitez les dérivent.</p>
                </div>

            </div>
        </div>


    );
}

export default Acceuil2;