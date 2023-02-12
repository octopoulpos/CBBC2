
import React from 'react';
import HoverTooltip from './HoverTooltip';
import HoverTooltipPV from './HoverTooltipPV';
import HoverTooltipNRJ from './HoverTooltipNRJ';
import HoverTooltipInf from './HoverTooltipInf';
import Logo from "./Logo";


const Nav = () => {
    return (
        <header>
            <Logo />
            <nav className="menu">

                <a href="/">Accueil</a>
                <HoverTooltip>
                    <a href="/Blanchisserie">Blanchisserie</a>
                </HoverTooltip>
                <HoverTooltipPV>
                    <a href="/PV" >Photovoltaïque</a>
                </HoverTooltipPV>

                <HoverTooltipNRJ>
                    <a href="/energie">Energie</a>
                </HoverTooltipNRJ>

                <HoverTooltipInf>
                    <a href="/informatique">Informatique</a>
                </HoverTooltipInf>
                <a href="/Connexion">Connexion</a>
                <a href="/apropos">Contact</a>
            </nav>

        </header>
    );
};


export default Nav;

