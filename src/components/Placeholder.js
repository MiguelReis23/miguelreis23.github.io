import React from 'react';
import './Placeholder.css';

const Placeholder = ({ title, id }) => {
  return (
    <section id={id} className="section placeholder-section">
      <h2 className="section-title">{title}</h2>
      <div className="placeholder-content">
        <div className="placeholder-message">
          <span className="icon">🚧</span>
          <p>This section is under construction</p>
          <div className="loading-bar">
            <div className="loading-progress"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Placeholder;
