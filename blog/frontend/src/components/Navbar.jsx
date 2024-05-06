import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../styles/Navbar.css";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen); // Toggle the visibility of the menu
    };

    return (
        <nav className="navbar">
            <Link to="/" className="nav-logo">MyBlog</Link>
            <div className="menu-icon" onClick={toggleMenu}>
                {isOpen ? 'X' : '☰'}
            </div>
            <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
                <li>
                    <Link to="/" className="nav-item" onClick={() => setIsOpen(false)}>Home</Link>
                </li>
                <li>
                    <Link to="/about" className="nav-item" onClick={() => setIsOpen(false)}>About</Link>
                </li>
                <li>
                    <Link to="/contact" className="nav-item" onClick={() => setIsOpen(false)}>Contact</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
