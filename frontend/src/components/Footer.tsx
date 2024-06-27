// src/components/Footer.tsx
import React from 'react';
import '../assets/styles/Footer.css';

const Footer: React.FC = () => (
  <footer className="footer-container">
    <p>&copy; {new Date().getFullYear()} Darragh Mahns. All rights reserved.</p>
  </footer>
);

export default Footer;