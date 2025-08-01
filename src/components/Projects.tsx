// src/components/Projects.tsx
import React from 'react';
import '../assets/styles/Projects.css';
import ProjectCard from './ProjectCard'; // Create a reusable ProjectCard component
import rerouteImage from '../assets/images/reroute.png';
import heatSheetImage from '../assets/images/swimmingly.png';
import buildSportsImage from '../assets/images/build.png';
import sealevelMedicalImage from '../assets/images/sealevel_logo.png';

const Projects: React.FC = () => (
  <section className="projects-container">
    <h2>Some Of My Projects</h2>
    <div className="projects-grid">
      <ProjectCard
        title="Reroute - AI-Powered Cycling Training Platform"
        description="A comprehensive cycling training platform with AI-powered route generation, training plans, and Strava integration."
        image={rerouteImage}
        liveLink="https://reroute-app-828281382646.us-central1.run.app"
        repoLink="https://github.com/darraghmahns/ReRoute_v2"
        experienceLink="/experience#reroute"
      />
      <ProjectCard
        title="Swimmingly Heat Sheet PDF Generator"
        description="A tool for generating heat sheets for swimming competitions."
        image={heatSheetImage}
        liveLink="https://clubhouse.swimmingly.app/login"
        repoLink="https://github.com/darraghmahns/heat-sheet"
        experienceLink="/experience#swimmingly"
      />
      <ProjectCard
        title="BUILD Sports Performance Website"
        description="A website for a sports performance company to showcase their services and programs."
        image={buildSportsImage}
        liveLink="https://buildyou.co/"
        repoLink="https://github.com/darraghmahns/build-sports"
        experienceLink="/experience#build-sports"
      />
      <ProjectCard
        title="Sealevel Medical File Sharing App and Website"
        description="A secure application for sharing medical files and documents online."
        image={sealevelMedicalImage}
        liveLink="https://sealevel.co."
        repoLink="https://github.com/darraghmahns/"
        experienceLink="/experience#sealevel"
      />
    </div>
  </section>
);

export default Projects;