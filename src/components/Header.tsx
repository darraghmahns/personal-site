// src/components/Header.tsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/styles/Header.css';
import { FaBars, FaTimes } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const handleToggle = () => {
    setIsMobile(!isMobile);
  };

  return (
    <header className="header-container">
      <h1>Darragh Mahns</h1>
      <div className="header-controls">
        <ThemeToggle />
        <div className="mobile-menu-icon" onClick={handleToggle}>
          {isMobile ? <FaTimes /> : <FaBars />}
        </div>
      </div>
      <nav className={isMobile ? "nav active" : "nav"}>
        <NavLink 
          end 
          to="/" 
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} 
          onClick={() => setIsMobile(false)}
        >
          Home
        </NavLink>
        <NavLink 
          to="/experience" 
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} 
          onClick={() => setIsMobile(false)}
        >
          Experience
        </NavLink>
      
        <NavLink 
          to="/contact" 
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} 
          onClick={() => setIsMobile(false)}
        >
          Contact
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;