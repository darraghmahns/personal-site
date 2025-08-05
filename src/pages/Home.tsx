// src/pages/Home.tsx
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import '../assets/styles/Home.css';
import Skills from '../components/Skills'; // Import the Skills component
import ContributionHeatmap from '../components/ContributionHeatmap';
import InteractiveTerminal from '../components/InteractiveTerminal';

const Home: React.FC = () => (
  <section className="home-container">
    <Helmet>
      <title>Darragh Mahns</title>
      <meta name="description" content="Professional freelance web developer specializing in custom, responsive websites for businesses. Contact me for a free quote." />
      <meta name="keywords" content="Darragh Mahns, Web Development, Software Engineering, Los Angeles, LA, Culver City, Missoula" />
    </Helmet>
    <div className="hero-section">
      <div className="hero-text">
        <h1>Hi, I'm Darragh Mahns</h1>
        <p>Software Engineer, Entrepreneur, Cyclist, Baker</p>
        <a href="/contact" className="cta-button">Let's Chat!</a>
      </div>
    </div>
    
    <div className="terminal-showcase">
      <InteractiveTerminal />
    </div>

    <Skills /> {/* Add the Skills component to the Home page */}
    
    <ContributionHeatmap />
    
    <section className="projects-preview">
      <h2>Some Of My Projects</h2>
      <p>Check out some of the exciting projects I've been working on, from AI-powered cycling platforms to web applications for sports performance.</p>
      <Link to="/projects" className="cta-button">View All Projects</Link>
    </section>
    
  </section>
  
);

export default Home;