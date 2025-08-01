// src/pages/Experience.tsx
import React from 'react';
import '../assets/styles/Experience.css';

const Experience: React.FC = () => {
  return (
    <section className="experience-container">
      <h2>Experience</h2>
      
      <div className="experience">
        <div className="job-header">
          <h3>Software Engineer Intern</h3>
          <div className="company-info">
            <h4>Keck Medicine of USC</h4>
            <p className="job-type">Internship</p>
            <p className="duration">Jan 2025 - Present · 8 mos</p>
            <p className="location">Los Angeles, California, United States</p>
          </div>
        </div>
        <div className="job-description">
          <ul>
            <li>Developing frontend and backend components for an admin portal of a patient scheduling application.</li>
            <li>Building automated messaging system to facilitate communication between patients and doctors.</li>
            <li>Integrating with Cerner API for healthcare data management and patient information retrieval.</li>
          </ul>
          <div className="skills">
            <h4>Skills:</h4>
            <span className="skill-tag">React</span>
            <span className="skill-tag">Mantine</span>
            <span className="skill-tag">Next.js</span>
            <span className="skill-tag">C++</span>
            <span className="skill-tag">Cerner API</span>
            <span className="skill-tag">Healthcare Software</span>
          </div>
        </div>
      </div>
      
      <div className="experience">
        <div className="job-header">
          <h3>Tech Lead</h3>
          <div className="company-info">
            <h4>Posted Software</h4>
            <p className="job-type">Full-time</p>
            <p className="duration">Nov 2022 - Aug 2024 · 1 yr 10 mos</p>
            <p className="location">Remote</p>
          </div>
        </div>
        <div className="job-description">
          <ul>
            <li>Led development of mobile apps using React Native and Node.js.</li>
            <li>Implemented secure payment processing with Stripe API.</li>
            <li>Collaborated on features focused on data security and user engagement.</li>
          </ul>
          <div className="skills">
            <h4>Skills:</h4>
            <span className="skill-tag">Cloud Computing</span>
            <span className="skill-tag">Program Management</span>
            <span className="skill-tag">+8 skills</span>
          </div>
        </div>
      </div>
      
      <div className="experience">
        <div className="job-header">
          <h3>Software Developer</h3>
          <div className="company-info">
            <h4>Build Sports Performance Lab and Physical Therapy LLC</h4>
            <p className="job-type">Part-time</p>
            <p className="duration">Nov 2022 - Jun 2023 · 8 mos</p>
            <p className="location">Louisville, Colorado, United States · On-site</p>
          </div>
        </div>
        <div className="job-description">
          <ul>
            <li>Created a web application to streamline administrative tasks like class sign-ups and payments.</li>
            <li>Redesigned file system architecture using Node.js and MySQL.</li>
            <li>Trained staff on the new system to enhance productivity.</li>
          </ul>
          <div className="skills">
            <h4>Skills:</h4>
            <span className="skill-tag">Software Engineering Practices</span>
            <span className="skill-tag">Problem Solving</span>
            <span className="skill-tag">+1 skill</span>
          </div>
        </div>
      </div>
      
      <div className="experience">
        <div className="job-header">
          <h3>Software Engineer Intern</h3>
          <div className="company-info">
            <h4>Swimmingly® LLC</h4>
            <p className="job-type">Internship</p>
            <p className="duration">Sep 2020 - Oct 2021 · 1 yr 2 mos</p>
            <p className="location">Denver, Colorado, United States</p>
          </div>
        </div>
        <div className="job-description">
          <ul>
            <li>Improved user interfaces using JavaScript, HTML5, and CSS3.</li>
            <li>Provided technical support during events, resolving synchronization issues.</li>
            <li>Worked with customers to identify pain points and implemented solutions.</li>
          </ul>
          <div className="skills">
            <h4>Skills:</h4>
            <span className="skill-tag">Cascading Style Sheets (CSS)</span>
            <span className="skill-tag">Git</span>
            <span className="skill-tag">+6 skills</span>
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default Experience;