// src/pages/Home.tsx
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import '../assets/styles/Home.css';
import ContributionHeatmap from '../components/ContributionHeatmap';

const Home: React.FC = () => (
  <section className="home-container">
    <Helmet>
      <title>Darragh Mahns - Full-Stack Builder</title>
      <meta name="description" content="Full-stack software engineer focused on shipping products that solve real problems. Building everything from payment platforms to AR experiences." />
      <meta name="keywords" content="Darragh Mahns, Software Engineer, Full-Stack Developer, Product Builder, YC, Los Angeles" />
    </Helmet>

    {/* New Hero Section */}
    <div className="hero-section">
      <div className="hero-text">
        <h1>Darragh Mahns</h1>
        <p className="hero-tagline">I build and ship products</p>
        <p className="hero-intro">
          I'm a software engineer and builder focused on shipping products that solve real problems.
          Currently pursuing my MS in Computer Science at USC while working at Keck Medicine.
          I've led technical teams, contributed to open source, and built everything from payment platforms to AR experiences.
        </p>
        <div className="hero-links">
          <a href="https://github.com/darraghmahns" target="_blank" rel="noopener noreferrer" className="hero-link">
            <FaGithub /> GitHub
          </a>
          <a href="https://linkedin.com/in/darraghmahns" target="_blank" rel="noopener noreferrer" className="hero-link">
            <FaLinkedin /> LinkedIn
          </a>
          <Link to="/contact" className="cta-button">Get in Touch</Link>
        </div>
      </div>
    </div>

    {/* Brief Experience Section */}
    <section className="experience-brief">
      <h2>Experience</h2>
      <div className="timeline">
        <div className="timeline-item">
          <div className="timeline-date">Jan 2025 - Present</div>
          <div className="timeline-content">
            <h3>Software Engineer Intern</h3>
            <p>Keck Medicine of USC</p>
            <p className="timeline-description">Led development of data-driven healthcare admin portal with Azure AD authentication and role-based access control integrating 5 backend environments. Placed first in Keck GenAI hackathon for building HIPAA-compliant OCR solution reducing manual data entry hospital-wide.</p>
          </div>
        </div>
        <div className="timeline-item">
          <div className="timeline-date">Oct 2022 - Aug 2024</div>
          <div className="timeline-content">
            <h3>Tech Lead</h3>
            <p>Posted Software / Standby</p>
            <p className="timeline-description">Tech Lead for scalable payment platform processing $100K+ in transactions with Stripe. Implemented CI/CD pipelines reducing release time by 40%. Built REST APIs for payment processing and user authentication with compliance for financial regulations.</p>
          </div>
        </div>
        <div className="timeline-item">
          <div className="timeline-date">May 2024 - Sept 2024</div>
          <div className="timeline-content">
            <h3>Freelance Consultant</h3>
            <p>Independent</p>
            <p className="timeline-description">Built AR web applications using Three.js, React, and FastAPI for digital storytelling. Developed automated heatsheet generator for Swimmingly that streamlined meet management workflow, reducing manual data entry and improving accuracy for swim coaches.</p>
          </div>
        </div>
        <div className="timeline-item">
          <div className="timeline-date">Current</div>
          <div className="timeline-content">
            <h3>Education</h3>
            <p>MS Computer Science, USC (Expected May 2026)</p>
            <p>BS Computer Science, University of Denver (2022, Cum Laude)</p>
          </div>
        </div>
      </div>
    </section>

    <ContributionHeatmap />

  </section>

);

export default Home;