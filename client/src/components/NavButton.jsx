
import React, { useState, useEffect } from 'react';

const NavButton = () => {
    const [showButton, setShowButton] = useState(false);
    const [showNav, setShowNav] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScroll = () => {
        if (window.scrollY > 60) {
            setShowButton(true);
        } else {
            setShowNav(false);
        }
        if (window.scrollY < 60) {
            setShowButton(false);
        } 
    };

    const handleResize = () => {
        if (window.matchMedia("(max-width: 1200px)").matches) {
            setShowButton(true);
        } else {
            setShowButton(false);
            setShowNav(false);
        }
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


    return (
        <div>
            {showButton && (
                <button className='navButton' onClick={() => setShowNav(!showNav)}>
                    <img src={require("../static/C.png")} style={{ cursor: 'pointer', maxWidth: '250px' }} width="50" alt="Nav logo" />
                </button>
            )}
            {showNav && (
                <div>
                    <nav className={`nav2 ${showNav ? 'show' : 'hidden'}`}>
                        <a href="/">Accueil</a>
                        <a href="/Root" >Photovoltaïque</a>
                        <a href="/Blanchisserie">Blanchisserie</a>
                        <a href="/Root">Energie</a>
                        <a href="/Root">Informatique</a>
                        <a href="/Connexion">Connexion</a>
                        <a href="/apropos">Contact</a>
                    </nav>
                </div>
            )}
        </div>
    );

};

export default NavButton;

