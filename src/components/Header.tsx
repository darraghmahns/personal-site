// src/components/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/Header.css';

const Header: React.FC = () => (
  <header className="header-container">
    <h1>Darragh Mahns</h1>
    <nav className="nav">
      <Link className="nav-link" to="/">Home</Link>
      <Link className="nav-link" to="/experience">Experience</Link>
      <Link className="nav-link" to="/contact">Contact</Link>
    </nav>
  </header>
);

export default Header;