// src/pages/Home.tsx
import React from 'react';
import Skills from '../components/Skills';
import About from '../components/About';
import Projects from '../components/Projects';
import '../assets/styles/Home.css';
import profileImage from '../assets/images/profile.jpg';
import profileImage1 from '../assets/images/profile1.jpg';
import profileImage2 from '../assets/images/profile2.jpg';

const Home: React.FC = () => (
  <div className="home-container">
    <div className="profile-images">
      <img src={profileImage1} alt="Profile 1" className="profile-image side-image" />
      <img src={profileImage} alt="Profile" className="profile-image main-image" />
      <img src={profileImage2} alt="Profile 2" className="profile-image side-image" />
    </div>
    <Skills />
    <About />
    <Projects />
  </div>
);

export default Home;