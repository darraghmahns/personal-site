// src/components/Skills.tsx
import React from 'react';
import '../assets/styles/Skills.css';
import { FaReact, FaNodeJs, FaAws, FaGitAlt } from 'react-icons/fa';
import { SiHtml5, SiCss3, SiSqlalchemy, SiFastapi, SiTypescript, SiDjango, SiFlask, SiPostgresql, SiExpress, SiNginx, SiRedux, SiSqlite, SiDocker, SiNetlify, SiMysql } from 'react-icons/si';

const Skills: React.FC = () => (
  <section className="skills-container">
    {/* <h2>Skills</h2> */}
    <div className="skills-grid">
      <div className="skill-category">
        <h3>Frontend</h3>
        <ul>
          <li><FaReact /> React</li>
          <li><SiTypescript /> TypeScript</li>
          <li><SiRedux /> Redux</li>
          <li><SiHtml5 /> HTML5</li>
          <li><SiCss3 /> CSS3</li>
        </ul>
      </div>
      <div className="skill-category">
        <h3>Backend</h3>
        <ul>
          <li><FaNodeJs /> Node.js</li>
          <li><SiExpress /> Express.js</li>
          <li><SiDjango /> Django</li>
          <li><SiFlask /> Flask</li>
          <li><SiFastapi /> FastAPI</li>
        </ul>
      </div>
      <div className="skill-category">
        <h3>Databases</h3>
        <ul>
          <li><SiPostgresql /> PostgreSQL</li>
          <li><SiSqlalchemy /> SQLAlchemy</li>
          <li><SiSqlite /> SQLite</li>
          <li><SiMysql />MySQL</li>
        </ul>
      </div>
      <div className="skill-category">
        <h3>DevOps & Tools</h3>
        <ul>
          <li><FaAws /> AWS</li>
          <li><SiNginx /> Nginx</li>
          <li><FaGitAlt /> Git & GitHub</li>
          <li><SiDocker /> Docker</li>
          <li><SiNetlify />Netlify</li>
        </ul>
      </div>
      <div className="skill-category">
        <h3>Security</h3>
        <ul>
          <li>OAuth</li>
          <li>JWT</li>
          <li>HTTPS</li>
        </ul>
      </div>
      <div className="skill-category">
        <h3>Soft Skills</h3>
        <ul>
          <li>Problem Solving</li>
          <li>Collaboration</li>
          <li>Agile/Scrum Methods</li>
          <li>Project Management Tools</li>
          <li>Communication</li>
        </ul>
      </div>
    </div>
  </section>
);

export default Skills;