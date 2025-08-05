// src/pages/Projects.tsx
import React from 'react';
import '../assets/styles/Projects.css';
import rerouteImage from '../assets/images/reroute.png';
import swimminglyBefore from '../assets/videos/Swimminglybefore.mov';
import swimminglyAfter from '../assets/videos/Swimminglyafter.mov';
import buildSportsImage from '../assets/images/build.png';
import sealevelImage from '../assets/images/sealevel_logo.png';
import thisWebsiteImage from '../assets/images/hero.jpg';

const Projects: React.FC = () => {
  return (
    <section className="projects-container">
      <h2>Projects</h2>
      
      <div className="project" id="reroute">
        <h3>Reroute - AI-Powered Cycling Training Platform</h3>
        <p>A comprehensive cycling training platform that combines AI-powered route generation, personalized training plans, performance analytics, and Strava integration. Built as a full-stack application to help cyclists optimize their training and discover new routes. <a href="https://reroute.training" target="_blank" rel="noopener noreferrer">Try it live here!</a></p>
        <div className="technologies">
          <h4>Technologies Used:</h4>
          <ul>
            <li>React</li>
            <li>TypeScript</li>
            <li>Tailwind CSS</li>
            <li>Python</li>
            <li>FastAPI</li>
            <li>PostgreSQL</li>
            <li>SQLAlchemy</li>
            <li>OpenAI GPT-4</li>
            <li>Strava API</li>
            <li>Mapbox GL JS</li>
            <li>GraphHopper</li>
            <li>Google Cloud Run</li>
          </ul>
        </div>
        <div className="media">
          <h4>Media:</h4>
          <img src={rerouteImage} alt="Reroute AI Cycling Platform" />
        </div>
      </div>
      
      <div className="project" id="swimmingly">
        <h3>Swimmingly Heat Sheet PDF Generator</h3>
        <p>A tool for generating heat sheets for swimming competitions. Swimmingly is a mobile platform that lets users run swim meets on their phones rather than with a pen and paper! <a href='https://swimmingly.app/' target="_blank" rel="noopener noreferrer">Here is a link to their website.</a></p>
        <div className="technologies">
          <h4>Technologies Used:</h4>
          <ul>
            <li>React</li>
            <li>Node.js</li>
            <li>mySQL</li>
            <li>jsPDF</li>
            <li>Typescript</li>
          </ul>
        </div>
        <div className="media">
          <h4>Media:</h4>
          <div className="video-container">
            <div className="video-wrapper">
              <h5>Before</h5>
              <video src={swimminglyBefore} width="400" autoPlay={true} loop={true} controls={false} playsInline muted  />
            </div>
            <div className="video-wrapper">
              <h5>After</h5>
              <video src={swimminglyAfter} width="400" autoPlay={true} loop={true} controls={false} playsInline muted />
            </div>
          </div>
        </div>
      </div>
      
      <div className="project" id="build-sports">
        <h3>BUILD Sports Performance Website</h3>
        <p>A website for a sports performance company to showcase their services and programs. I built their current one and the one before! Check them out <a href="https://buildyou.co/" target="_blank" rel="noopener noreferrer">here</a>.</p>
        <div className="technologies">
          <h4>Technologies Used:</h4>
          <ul>
            <li>HTML5</li>
            <li>CSS3</li>
            <li>JavaScript</li>
            <li>WordPress</li>
          </ul>
        </div>
        <div className="media">
          <h4>Media:</h4>
          <img src={buildSportsImage} alt="BUILD Sports Performance Project" />
        </div>
      </div>
      
      <div className="project" id="sealevel">
        <h3>Sealevel Medical File Sharing App and Website</h3>
        <p>A secure application for sharing medical files and documents online. I founded and am building this product continuously! <a href="https://health.darraghmahns.com" target="_blank" rel="noopener noreferrer">Check it out!</a> </p>
        <div className="technologies">
          <h4>Technologies Used:</h4>
          <ul>
            <li>React</li>
            <li>NodeJS</li>
            <li>TypeScript</li>
            <li>HTML/CSS</li>
            <li>Python</li>
            <li>FastAPI</li>
            <li>Flask</li>
            <li>Solana</li>
            <li>AWS</li>
          </ul>
        </div>
        <div className="media">
          <h4>Media:</h4>
          <img src={sealevelImage} alt="Sealevel Medical Project" />
        </div>
      </div>

      <div className="project">
        <h3>Neural Network Training with TensorFlow</h3>
        <p>A project focused on training neural networks using TensorFlow to identify if a subject is wearing a mask or not. Working on implementing a live demonstration here so stay tuned!</p>
        <div className="technologies">
          <h4>Technologies Used:</h4>
          <ul>
            <li>Python</li>
            <li>TensorFlow</li>
            <li>Jupyter Notebook</li>
            <li>NumPy</li>
          </ul>
        </div>
      </div>
      
      <div className="project">
        <h3>This Website</h3>
        <p>A personal resume website showcasing my skills and projects. Thank you for looking around. Let me know if you have any questions about anything!</p>
        <div className="technologies">
          <h4>Technologies Used:</h4>
          <ul>
            <li>React</li>
            <li>TypeScript</li>
            <li>CSS</li>
            <li>Node.js</li>
          </ul>
        </div>
        <div className="media">
          <h4>Media:</h4>
          <img src={thisWebsiteImage} alt="This Website Project" />
        </div>
      </div>
      
    </section>
  );
};

export default Projects;