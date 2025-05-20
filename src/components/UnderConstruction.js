import React from 'react';
import { Link } from 'react-router-dom';
import './UnderConstruction.css';

const UnderConstruction = () => {
  return (
    <div className="under-construction-overlay">
      <div className="under-construction-container">
        <div className="under-construction-icon">🚧</div>
        <h2>Under Construction</h2>
        <p>This section is coming soon. We're working hard to bring you great content!</p>
        <Link to="/" className="back-button">Back to Home</Link>
      </div>
    </div>
  );
};

export default UnderConstruction;
