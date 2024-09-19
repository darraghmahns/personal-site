// src/pages/Home.tsx
import React from 'react';
import { Helmet } from 'react-helmet';
import '../assets/styles/Home.css';
import heroImage from '../assets/images/hero.jpg';
import Skills from '../components/Skills'; // Import the Skills component
import Projects from '../components/Projects'; // Import the Projects component

const Home: React.FC = () => (
  <section className="home-container">
    <Helmet>
      <title>Darragh Mahns | Freelance Web Developer</title>
      <meta name="description" content="Professional freelance web developer specializing in custom, responsive websites for businesses. Contact me for a free quote." />
      <meta name="keywords" content="Freelance Web Developer, Custom Websites, Responsive Design, Web Development, Darragh Mahns, Los Angeles, LA, Culver City, Missoula" />
    </Helmet>
    <div className="hero-section">
      <div className="hero-text">
        <h1>Hi, I'm Darragh Mahns</h1>
        <p>Freelance Web Developer Specializing in Custom, Responsive Web Applications</p>
        <a href="/contact" className="cta-button">Get a Free Quote</a>
      </div>
      <img src={heroImage} alt="Web Development" className="hero-image" />
    </div>

    <Skills /> {/* Add the Skills component to the Home page */}
    <Projects /> {/* Add the Projects component to the Home page */}
    
  </section>
  
);

export default Home;