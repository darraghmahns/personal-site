// src/pages/Projects.tsx
import React from 'react';
import '../assets/styles/Projects.css';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import rerouteImage from '../assets/images/reroute.png';
import rerouteLogin from '../assets/images/reroute-login.png';
import rerouteDashboard from '../assets/images/reroute-dashboard.png';
import rerouteRoute from '../assets/images/reroute-route.png';
import rerouteTraining from '../assets/images/reroute-training.png';
import rerouteChat from '../assets/images/reroute-chat.png';
import rerouteProfile from '../assets/images/reroute-profile.png';
import rerouteSettings from '../assets/images/reroute-settings.png';
import sealevelLanding from '../assets/images/sealevel-landing.png';
import sealevelFiles from '../assets/images/sealevel-files.png';
import sealevelUpload from '../assets/images/sealevel-upload.png';
import sealevelAudit from '../assets/images/sealevel-audit.png';
import sealevelPermissions from '../assets/images/sealevel-permissions.png';
import ImageCarousel from '../components/ImageCarousel';

const Projects: React.FC = () => {
  return (
    <section className="projects-container">
      <h2>Projects</h2>
      <p className="projects-intro">Here are some of the products I've built:</p>

      {/* Project 1: Unified Patient Communications Project (Keck Medicine) */}
      <div className="project" id="patient-comms">
        <h3>Unified Patient Communications Platform</h3>
        <p className="project-description">Data-driven healthcare admin portal integrating 5 backend environments with Azure AD authentication and role-based access control. Enables clinic staff to manage patient communications and appointments across multiple systems from a single interface.</p>
        <div className="project-impact">
          <strong>Impact:</strong> Unified 5 backend systems | <strong>Technologies:</strong> Next.js, TypeScript, Azure AD, React
        </div>
        <div className="technologies">
          <h4>Technologies Used:</h4>
          <ul>
            <li>Next.js</li>
            <li>TypeScript</li>
            <li>React</li>
            <li>Azure AD</li>
            <li>Role-Based Access Control</li>
            <li>Cerner API</li>
          </ul>
        </div>
      </div>

      {/* Project 2: Keck GenAI Hackathon Winner - HIPAA-Compliant OCR */}
      <div className="project" id="keck-genai">
        <h3>HIPAA-Compliant OCR Solution (Hackathon Winner)</h3>
        <p className="project-description">First-place winner at Keck GenAI hackathon. Developed HIPAA-compliant OCR solution using OpenAI's ChatGPT API, Langchain, and Docling to automate manual data entry hospital-wide, reducing processing time and improving accuracy.</p>
        <div className="project-impact">
          <strong>Achievement:</strong> 1st Place - Keck GenAI Hackathon | <strong>Impact:</strong> Hospital-wide manual data entry reduction
        </div>
        <div className="technologies">
          <h4>Technologies Used:</h4>
          <ul>
            <li>OpenAI ChatGPT API</li>
            <li>Langchain</li>
            <li>Docling</li>
            <li>Python</li>
            <li>HIPAA Compliance</li>
            <li>OCR</li>
          </ul>
        </div>
        <div className="project-links">
          <a href="https://github.com/gleiceschaves/GENAI2-BACKEND/tree/docker" target="_blank" rel="noopener noreferrer" className="project-link">
            <FaGithub /> GitHub
          </a>
        </div>
      </div>

      {/* Project 3: Common Crawl Open Source */}
      <div className="project" id="common-crawl">
        <h3>Common Crawl (Open Source Contribution)</h3>
        <p className="project-description">Open source contributions to Common Crawl Foundation's web-scale datasets infrastructure. Contributing to tools that expose complex web-scale datasets through accessible APIs, supporting researchers and developers in building responsible AI-driven applications.</p>
        <div className="project-impact">
          <strong>Contribution:</strong> Creating Java and Rust documentation and guides for accessing Common Crawl's distributed systems and columnar data
        </div>
        <div className="technologies">
          <h4>Technologies Used:</h4>
          <ul>
            <li>Rust</li>
            <li>Java</li>
            <li>Web Crawling</li>
            <li>Distributed Systems</li>
            <li>Documentation</li>
          </ul>
        </div>
        <div className="project-links">
          <a href="https://github.com/commoncrawl/cc-pyspark/pull/96" target="_blank" rel="noopener noreferrer" className="project-link">
            <FaGithub /> Pull Request
          </a>
        </div>
      </div>

      {/* Project 4: G3N3RATION AR */}
      <div className="project" id="g3nar">
        <h3>G3N3RATION AR</h3>
        <p className="project-description">Interactive AR magazine experience created with Three.js for immersive web-based augmented reality content and digital storytelling.</p>
        <div className="technologies">
          <h4>Technologies Used:</h4>
          <ul>
            <li>Three.js</li>
            <li>React</li>
            <li>WebGL</li>
            <li>AR.js</li>
          </ul>
        </div>
        <div className="project-links">
          <a href="https://g3nar.onrender.com" target="_blank" rel="noopener noreferrer" className="project-link">
            <FaExternalLinkAlt /> Live Demo
          </a>
          <a href="https://github.com/darraghmahns/G3NAR" target="_blank" rel="noopener noreferrer" className="project-link">
            <FaGithub /> GitHub
          </a>
        </div>
      </div>

      {/* Project 5: Reroute */}
      <div className="project" id="reroute">
        <h3>Reroute</h3>
        <p className="project-description">AI-powered cycling route optimizer that generates personalized training routes. Full-stack application with Strava integration, GPT-4 powered route generation, and performance analytics.</p>
        <div className="technologies">
          <h4>Technologies Used:</h4>
          <ul>
            <li>React</li>
            <li>FastAPI</li>
            <li>PostgreSQL</li>
            <li>OpenAI GPT-4</li>
            <li>Strava API</li>
            <li>Mapbox GL</li>
          </ul>
        </div>
        <div className="project-links">
          <a href="https://github.com/darraghmahns/reroute-v3" target="_blank" rel="noopener noreferrer" className="project-link">
            <FaGithub /> GitHub
          </a>
        </div>
        <div className="media">
          <h4>Media:</h4>
          <ImageCarousel
            images={[
              {
                src: rerouteImage,
                alt: "Reroute Landing Page",
                caption: "AI-powered cycling training platform homepage"
              },
              {
                src: rerouteLogin,
                alt: "Reroute Login",
                caption: "Secure authentication with Strava integration"
              },
              {
                src: rerouteDashboard,
                alt: "Reroute Dashboard",
                caption: "Personal training dashboard with performance metrics"
              },
              {
                src: rerouteRoute,
                alt: "Route Planning",
                caption: "AI-generated route suggestions with elevation and distance"
              },
              {
                src: rerouteTraining,
                alt: "Training Plans",
                caption: "Personalized training plans and workout scheduling"
              },
              {
                src: rerouteChat,
                alt: "AI Chat Assistant",
                caption: "Interactive AI coach for training guidance and tips"
              },
              {
                src: rerouteProfile,
                alt: "User Profile",
                caption: "Comprehensive profile with goals and achievements"
              },
              {
                src: rerouteSettings,
                alt: "Settings Panel",
                caption: "Customizable preferences and account settings"
              }
            ]}
          />
        </div>
      </div>

      {/* Project 6: SeaLevel Health */}
      <div className="project" id="sealevel">
        <h3>SeaLevel Health</h3>
        <p className="project-description">Blockchain-based medical file sharing application on Solana. Enables secure, decentralized patient data management with immutable audit trails and granular access control.</p>
        <div className="technologies">
          <h4>Technologies Used:</h4>
          <ul>
            <li>React</li>
            <li>Node.js</li>
            <li>Python</li>
            <li>FastAPI</li>
            <li>AWS</li>
            <li>Solana</li>
          </ul>
        </div>
        <div className="project-links">
          <a href="https://health.darraghmahns.com" target="_blank" rel="noopener noreferrer" className="project-link">
            <FaExternalLinkAlt /> Live Site
          </a>
          <a href="https://github.com/darraghmahns/sealevel-app" target="_blank" rel="noopener noreferrer" className="project-link">
            <FaGithub /> GitHub
          </a>
        </div>
        <div className="media">
          <h4>Media:</h4>
          <ImageCarousel
            images={[
              {
                src: sealevelLanding,
                alt: "Sealevel Health Landing Page",
                caption: "Modern healthcare data management with blockchain security"
              },
              {
                src: sealevelFiles,
                alt: "File Management Dashboard",
                caption: "Secure file management with download and sharing capabilities"
              },
              {
                src: sealevelUpload,
                alt: "Upload Health Document",
                caption: "Simple and secure file upload interface"
              },
              {
                src: sealevelAudit,
                alt: "Blockchain Audit Trail",
                caption: "Complete transparency with immutable blockchain audit trails"
              },
              {
                src: sealevelPermissions,
                alt: "Access Permissions Management",
                caption: "Granular access control and permission management"
              }
            ]}
          />
        </div>
      </div>

      {/* Project 7: Standby */}
      <div className="project" id="standby">
        <h3>Standby</h3>
        <p className="project-description">Payment platform connecting gig workers with flexible job opportunities. As Tech Lead, developed payment infrastructure processing $100K+ in transactions with Stripe integration, REST APIs for payment processing and user authentication.</p>
        <div className="project-impact">
          <strong>Impact:</strong> $100K+ processed | <strong>Role:</strong> Tech Lead
        </div>
        <div className="technologies">
          <h4>Technologies Used:</h4>
          <ul>
            <li>React</li>
            <li>Node.js</li>
            <li>TypeScript</li>
            <li>Stripe</li>
            <li>PostgreSQL</li>
            <li>REST APIs</li>
          </ul>
        </div>
        <div className="project-links">
          <a href="https://standbyjobs.com" target="_blank" rel="noopener noreferrer" className="project-link">
            <FaExternalLinkAlt /> Live Site
          </a>
        </div>
      </div>

    </section>
  );
};

export default Projects;