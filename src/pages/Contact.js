import React from 'react';
import { FaEnvelope, FaGithub, FaLinkedin, FaTerminal, FaMapMarkerAlt } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  return (
    <div className="page-container">
      <section id="contact" className="page-section contact-section">
        <div className="page-header">
          <h1 className="page-title">Get In Touch</h1>
          <p className="page-subtitle">Have a question or want to work together? Reach out to me directly.</p>
        </div>

        <div className="contact-content-centered">
          <div className="contact-info">
            <div className="contact-card">
              <div className="contact-intro">
                <h2>Let's Connect</h2>
                <p>
                  I'm interested in cybersecurity opportunities, collaborative projects, or just a chat about security and technology. Feel free to reach out through any of the channels below!
                </p>
              </div>
              
              <div className="contact-links">
                <div className="contact-link-item">
                  <div className="contact-icon">
                    <FaEnvelope />
                  </div>
                  <div className="contact-link-content">
                    <h3>Email</h3>
                    <a href="mailto:your.actual.email@example.com">r315miguel@gmail.com</a>
                  </div>
                </div>
                
                <div className="contact-link-item">
                  <div className="contact-icon">
                    <FaLinkedin />
                  </div>
                  <div className="contact-link-content">
                    <h3>LinkedIn</h3>
                    <a href="https://linkedin.com/in/miguel-rosa-reis" target="_blank" rel="noopener noreferrer">
                      linkedin.com/in/miguel-rosa-reis
                    </a>
                  </div>
                </div>
                
                <div className="contact-link-item">
                  <div className="contact-icon">
                    <FaGithub />
                  </div>
                  <div className="contact-link-content">
                    <h3>GitHub</h3>
                    <a href="https://github.com/miguelreis23" target="_blank" rel="noopener noreferrer">
                      github.com/miguelreis23
                    </a>
                  </div>
                </div>
                
                <div className="contact-link-item">
                  <div className="contact-icon">
                    <FaMapMarkerAlt />
                  </div>
                  <div className="contact-link-content">
                    <h3>Location</h3>
                    <span>Fátima, Portugal</span>
                  </div>
                </div>
              </div>

              <div className="available-indicator">
                <div className="available-dot"></div>
                <span>Available for collaboration</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
