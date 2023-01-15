
import React from 'react';
import HoverTooltip from './HoverTooltip';



const Nav = () => {
    return (
        <header>
            {/* <h1>BLANCHISSERIE INDUSTRIELLE</h1>
            <h2>OUTILS ET SERVICES </h2> */}
            <nav className="menu">

                <a href="/">Accueil</a>
                <HoverTooltip tooltip="XXXXXXXXXXXX">
                    <a href="/Root">Blanchisserie Services</a>
                </HoverTooltip>
                <HoverTooltip tooltip="XXXXXXXXXXXX">
                    <a href="/Root">Energie</a>
                </HoverTooltip>
                <HoverTooltip tooltip="XXXXXXXXXXXX">
                    <a href="/Root">Photovoltaïque</a>
                </HoverTooltip>
                <HoverTooltip tooltip="XXXXXXXXXXXX">
                    <a href="/Root">Web Services Informatique</a>
                </HoverTooltip>
                <a href="/Connexion">Connexion</a>
                <a href="/cbbc-enedis">CBBC-Enedis app</a>
                <a href="/apropos">Contact</a>
            </nav>

        </header>
    );
};

export default Nav;
