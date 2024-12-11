import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navigation.scss';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navigation">
      {/* Added onClick to the h1 tag to toggle menu */}
      <h1 onClick={toggleMenu} style={{ cursor: 'pointer' }}>Create &amp; Explore</h1> 
      <button className="hamburger" onClick={toggleMenu}>
        &#9776; {/* Hamburger icon */}
      </button>
      <div className={`menu ${isOpen ? 'open' : ''}`}>
        <Link to="/" onClick={toggleMenu}>Home</Link>
        <Link to="/create-recipe" onClick={toggleMenu}>Make New Recipe</Link>
      </div>
    </nav>
  );
}

export default Navigation;
