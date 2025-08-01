// src/components/ProjectCard.tsx
import React from 'react';
import '../assets/styles/ProjectCard.css';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  liveLink: string;
  repoLink: string;
  experienceLink?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, image, liveLink, repoLink, experienceLink }) => (
  <div className="project-card">
    <img src={image} alt={`${title} Screenshot`} className="project-image" />
    <div className="project-details">
      <h3>
        {experienceLink ? (
          <a href={experienceLink} style={{ textDecoration: 'none', color: 'inherit' }}>
            {title}
          </a>
        ) : (
          title
        )}
      </h3>
      <p>{description}</p>
      <div className="project-links">
        <a href={liveLink} target="_blank" rel="noopener noreferrer" aria-label="Live Demo">
          <FaExternalLinkAlt /> Live
        </a>
        <a href={repoLink} target="_blank" rel="noopener noreferrer" aria-label="Source Code">
          <FaGithub /> Code
        </a>
      </div>
    </div>
  </div>
);

export default ProjectCard;