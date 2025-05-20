import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// GitHub Pages SPA redirect handler
const redirectFromPath = new URLSearchParams(window.location.search).get('redirectFrom');
if (redirectFromPath === '404') {
  const storedPath = localStorage.getItem('spa_path');
  if (storedPath) {
    localStorage.removeItem('spa_path');
    window.history.replaceState(null, null, storedPath);
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
