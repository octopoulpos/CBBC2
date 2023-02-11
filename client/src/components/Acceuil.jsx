import React from "react";

function Acceuil(props) {
    return (
        <div className="acceuil">
            <h1>CBBC - conseils et services à destination des blanchisseries industrielles.</h1>
            <div className="acceuil2">
                <h1>{props.name}</h1>
                <img
                    src="https://cdn.discordapp.com/attachments/995431387333152778/1073974129100865616/AI_Octopoulpos_the_will_of_efficiency_the_beauty_of_energy_natu_c68f75a1-7cf1-447a-8fa6-69e8632da27e.png"
                    alt="oeil"
                    className="circle-img"
                    style={{ cursor: 'pointer' }}
                />
                <div className="acceuil3">
                    <p>Créé en 2022 par Christophe BESLAY après une dizaine d'années d'expérience passées chez deux groupes leaders de l'industrie, notre but est de vous aider à optimiser votre outil industriel. Ci-dessous vous trouverez nos principaux services :</p>
                    <p className="p2">Conseil pour l'installation de vos équipements industriels.</p>
                    <p className="p2">Audit et conseils pour l'optimisation de vos énergies.</p>
                    <p className="p2">Conseil pour l'installation de centrales photovoltaïques.</p>
                    <p className="p2">Services informatiques, création et maintenance de sites internet, création et maintenance d'application de gestion de votre énergie / de gestion de votre production.</p>
                    <p>N'hésitez pas à naviguer sur le site pour en savoir plus ou a nous contacter directement via l'onglet "Contact" du site </p>

                </div>

            </div>
        </div>
    );
}

export default Acceuil;