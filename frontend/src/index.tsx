// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import
import './assets/styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container!); // Create root

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();