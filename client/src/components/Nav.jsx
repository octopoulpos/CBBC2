
import React from 'react';

const Nav = () => {
    return (
        <header>
            {/* <h1>BLANCHISSERIE INDUSTRIELLE</h1>
            <h2>OUTILS ET SERVICES </h2> */}
            <nav className="menu">
                <a href="/">Accueil</a>
                <a href="/apropos">À propos</a>
                <a href="/contact">Contact</a>
            </nav>

        </header>
    );
};

export default Nav;
