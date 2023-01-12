
import React from 'react';
import HoverTooltip from './HoverTooltip';



const Nav = () => {
    return (
        <header>
            {/* <h1>BLANCHISSERIE INDUSTRIELLE</h1>
            <h2>OUTILS ET SERVICES </h2> */}
            <nav className="menu">
            <HoverTooltip tooltip="This is a tooltip">
            <a href="/">Accueil</a>
</HoverTooltip>
                <a href="/">Accueil</a>
                <a href="/Root">Energie</a>
                <a href="/Connexion">Connexion</a>
                <a href="/cbbc-enedis">CBBC-Enedis app</a>
                <a href="/apropos">Contact</a>
            </nav>

        </header>
    );
};

export default Nav;
