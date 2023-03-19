import React, { useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";


const Espagnol = (props) => {

    const [showAssist, setShowAssist] = useState(false);
    const toggleAssist = () => {
        setShowAssist(!showAssist);
    };

    return (
        <div>
            <div>


                <h3><br></br></h3>
                <img
                    onClick={toggleAssist}
                    className="circle-imgPM"
                    src="https://cdn.discordapp.com/attachments/1075129047379624157/1081975071314301018/AI_Octopoulpos_shes_my_beautiful_personal_assistant_manga_style_0e9c0392-656a-4a44-ab1d-ace7cb391e0a.png"
                    alt="avatar_img"
                    title="Hi dear, how may I help you today ?"
                />
                <div className={`assist ${showAssist ? "visible" : ""}`}>
                    <h3>Hi darling ! I'm your personnal assistant, how may I help you today ?</h3>
                    <h4>Planning </h4>
                    <h4>Plan </h4>
                    <h4>Envoyer email client : validation date d'installation </h4>
                    <h4>Envoyer email ADV : check transport </h4>
                    <h4>Envoyer email ST : check équipes </h4>
                    <h4>Envoyer email WEISHAUPT </h4>
                    <h4>Consulter pour installation</h4>
                    <h4>Consulter pour raccordement</h4>
                </div>

            </div>
            <div className="projetB">

                <h4>quote : </h4>
                <h4>Last AX import : </h4>
                <h4>Prix de vente : </h4>
                <h4>Marge PIF :</h4>



            </div>
        </div>
    );
};
export default Espagnol;