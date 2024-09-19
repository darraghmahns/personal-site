// src/components/Footer.tsx
import React from 'react';
import '../assets/styles/Footer.css';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

const Footer: React.FC = () => (
  <footer className="footer-container">
    <p>&copy; {new Date().getFullYear()} Darragh Mahns. All rights reserved.</p>
    <div className="social-links">
      <a href="https://www.linkedin.com/in/darraghmahns" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
        <FaLinkedin />
      </a>
      <a href="https://github.com/darraghmahns" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
        <FaGithub />
      </a>
      <a href="https://twitter.com/darraghmahns" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
        <FaTwitter />
      </a>
    </div>
  </footer>
);

export default Footer;