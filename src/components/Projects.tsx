// src/components/Projects.tsx
import React from 'react';
import '../assets/styles/Projects.css';

const Projects: React.FC = () => (
  <section className="projects-container">
    <h2>Some Of My Projects</h2>
    <div className="project">
      <h3>Swimmingly Heat Sheet PDF Generator</h3>
      <p>A tool for generating heat sheets for swimming competitions.</p>
    </div>
    <div className="project">
      <h3>BUILD Sports Performance Website</h3>
      <p>A website for a sports performance company to showcase their services and programs.</p>
    </div>
    <div className="project">
      <h3>Sealevel Medical File Sharing App and Website</h3>
      <p>A secure application for sharing medical files and documents online.</p>
    </div>
  </section>
);

export default Projects;