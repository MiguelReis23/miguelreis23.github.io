import React, { useState } from 'react';
import { FaEnvelope, FaGithub, FaLinkedin, FaTerminal, FaMapMarkerAlt } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setFormStatus({
      submitted: true,
      success: false,
      message: 'Sending message...'
    });
    
    // Simulate API call delay
    setTimeout(() => {
      setFormStatus({
        submitted: true,
        success: true,
        message: 'Message sent successfully!'
      });
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    }, 1500);
  };

  return (
    <div className="page-container">
      <section id="contact" className="page-section contact-section">
        <div className="page-header">
          <h1 className="page-title">Get In Touch</h1>
          <p className="page-subtitle">Have a question or want to work together? Reach out to me directly.</p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-card">
              <div className="contact-intro">
                <h2>Let's Connect</h2>
                <p>
                  I'm interested in cybersecurity opportunities, collaborative projects, or just a chat about security and technology. Feel free to reach out!
                </p>
              </div>
              
              <div className="contact-links">
                <div className="contact-link-item">
                  <div className="contact-icon">
                    <FaEnvelope />
                  </div>
                  <div className="contact-link-content">
                    <h3>Email</h3>
                    <a href="mailto:your.actual.email@example.com">your.actual.email@example.com</a>
                  </div>
                </div>
                
                <div className="contact-link-item">
                  <div className="contact-icon">
                    <FaLinkedin />
                  </div>
                  <div className="contact-link-content">
                    <h3>LinkedIn</h3>
                    <a href="https://linkedin.com/in/miguelreis" target="_blank" rel="noopener noreferrer">
                      linkedin.com/in/miguelreis
                    </a>
                  </div>
                </div>
                
                <div className="contact-link-item">
                  <div className="contact-icon">
                    <FaGithub />
                  </div>
                  <div className="contact-link-content">
                    <h3>GitHub</h3>
                    <a href="https://github.com/miguelreis" target="_blank" rel="noopener noreferrer">
                      github.com/miguelreis
                    </a>
                  </div>
                </div>
                
                <div className="contact-link-item">
                  <div className="contact-icon">
                    <FaTerminal />
                  </div>
                  <div className="contact-link-content">
                    <h3>HackTheBox</h3>
                    <a href="https://app.hackthebox.com/profile/yourusername" target="_blank" rel="noopener noreferrer">
                      hackthebox.com/profile/yourusername
                    </a>
                  </div>
                </div>
                
                <div className="contact-link-item">
                  <div className="contact-icon">
                    <FaMapMarkerAlt />
                  </div>
                  <div className="contact-link-content">
                    <h3>Location</h3>
                    <span>Your City, Your Country</span>
                  </div>
                </div>
              </div>

              <div className="available-indicator">
                <div className="available-dot"></div>
                <span>Available for freelance & full-time positions</span>
              </div>
            </div>
          </div>
          
          <div className="contact-form-container">
            <form className="contact-form" onSubmit={handleSubmit}>
              <h2>Send Me A Message</h2>
              
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="submit-btn" disabled={formStatus.submitted && !formStatus.success}>
                {formStatus.submitted && !formStatus.success ? 'Sending...' : 'Send Message'}
              </button>
              
              {formStatus.submitted && (
                <div className={`form-status ${formStatus.success ? 'success' : ''}`}>
                  {formStatus.message}
                </div>
              )}
            </form>
            
            <div className="form-decoration">
              <span className="bracket">{`{`}</span>
              <span className="bracket">{`}`}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
