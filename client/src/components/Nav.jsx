
import React, { useState, useEffect } from 'react';
import HoverTooltip from './HoverTooltip';
import Logo from "./Logo";

const Nav = () => {
    return (
        <header>
            <Logo />
            <nav className="menu">

                <a href="/">Accueil</a>
                <HoverTooltip tooltip="XXXXXXXXXXXX">
                    <a href="/Root">Blanchisserie</a>
                </HoverTooltip>
                <HoverTooltip tooltip="XXXXXXXXXXXX" >
                    <a href="/Root" >Photovoltaïque</a>
                </HoverTooltip>

                <HoverTooltip tooltip="XXXXXXXXXXXX">
                    <a href="/Root">Energie</a>
                </HoverTooltip>

                <HoverTooltip tooltip="XXXXXXXXXXXX">
                    <a href="/Root">Informatique</a>
                </HoverTooltip>
                <a href="/Connexion">Connexion</a>
                <a href="/cbbc-enedis">CBBC-Enedis app</a>
                <a href="/apropos">Contact</a>
            </nav>

        </header>
    );
};


export default Nav;

