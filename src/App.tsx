// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Experience from './pages/Experience';
import Contact from './pages/Contact';
import Header from './components/Header';
import Footer from './components/Footer';
import { ThemeProvider } from './contexts/ThemeContext';
import './assets/styles/App.css';

const App: React.FC = () => (
  <ThemeProvider>
    <Router>
      <div className="app-container">
        <Header />
        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  </ThemeProvider>
);

export default App;