// src/components/About.tsx
import React from 'react';
import '../assets/styles/About.css';
import profilePic from '../assets/images/profile.jpg'; // Add a profile picture

const About: React.FC = () => (
  <section className="about-container">
    <h2>About Me</h2>
    <div className="about-content">
      <img src={profilePic} alt="Darragh Mahns" className="profile-pic" />
      <div className="about-text">
        <p>
          Hi, I’m Darragh, a dedicated web developer from Missoula, Montana living in west LA. I earned my BS in Computer Science from the University of Denver while competing as a captain on the varsity Division One swim team. Since 2018, I have been passionately working in the field, committed to delivering high-quality products.
        </p>
        <p>
          I strongly believe in kindness and making a difference through my work. I thrive in collaborative environments and enjoy having conversations with community members, always eager to learn new technologies at hyper speed. My journey in web development has been fueled by a continuous desire to learn and adapt to the ever-evolving landscape of technology.
        </p>
        <p>
          **Key Highlights:**
        </p>
        <ul>
          <li>Developed 10+ responsive websites for diverse industries.</li>
          <li>Expertise in modern frameworks like React and Node.js.</li>
          <li>Proven track record of improving website performance and SEO rankings.</li>
          <li>Committed to continuous learning and staying updated with the latest technologies.</li>
        </ul>
      </div>
    </div>
  </section>
);

export default About;