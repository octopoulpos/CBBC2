import React from "react";

const DivX = () => {
    return (
        <div className="divX">
            <h3>Accès non authorisé, merci de vous connecter afin d'accéder au service</h3>
            <a href="/Connexion">
                <button>
                    <span>Connexion</span>
                </button>
            </a>
        </div>
    );
};
export default DivX;