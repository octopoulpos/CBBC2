
import React from 'react';
import HoverTooltip from './HoverTooltip';
import Logo from "./Logo";

const Nav = () => {
    return (
        <header>
            <Logo />
            <nav className="menu">

                <a href="/">Accueil</a>
                <HoverTooltip tooltip="XXXXXXXXXXXX">
                    <a href="/Blanchisserie">Blanchisserie</a>
                </HoverTooltip>
                <HoverTooltip tooltip="XXXXXXXXXXXX" >
                    <a href="/PV" >Photovoltaïque</a>
                </HoverTooltip>

                <HoverTooltip tooltip="XXXXXXXXXXXX">
                    <a href="/energie">Energie</a>
                </HoverTooltip>

                <HoverTooltip tooltip="XXXXXXXXXXXX">
                    <a href="/informatique">Informatique</a>
                </HoverTooltip>
                <a href="/Connexion">Connexion</a>
                <a href="/apropos">Contact</a>
            </nav>

        </header>
    );
};


export default Nav;

