import React from 'react';
import Hero from '../components/Hero';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaInfoCircle } from 'react-icons/fa';
import './Home.css';

const Home = () => {
  const sections = [
    {
      id: "about",
      title: "About Me",
      description: "Learn about my background, education, and journey.",
      link: "/about"
    },
    // {
    //   id: "skills",
    //   title: "Skills & Expertise",
    //   description: "Explore my technical skills, certifications, and areas of expertise.",
    //   link: "/skills"
    // },
    {
      id: "projects",
      title: "Projects",
      description: "View my portfolio of projects.",
      link: "/projects"
    },
    // {
    //   id: "htb",
    //   title: "HackTheBox Journey",
    //   description: "Follow my progress through HackTheBox challenges and CPTS certification.",
    //   link: "/htb"
    // },
    {
      id: "contact",
      title: "Get In Touch",
      description: "Connect with me for collaborations, opportunities, or just to chat.",
      link: "/contact"
    }
  ];

  return (
    <div>
      <Hero />
      <div id="explore" className="section-previews">
        <div className="container">
          <h2 className="previews-title">Explore My Portfolio</h2>
          <div className="previews-grid">
            {sections.map((section, index) => (
              <div key={index} className="preview-card">
                <h3>{section.title}</h3>
                <p>{section.description}</p>
                <Link to={section.link} className="preview-link">
                  Visit <FaArrowRight className="arrow-icon" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* <div className="recent-activity">
          <div className="container">
            <h2 className="activity-title">Recent Activities</h2>
            <div className="activity-grid">
              <div className="activity-card">
                <div className="activity-date">September 2023</div>
                <h3>Completed HTB Machine: Nineveh</h3>
                <p>Successfully compromised and obtained root on the medium-difficulty Nineveh machine.</p>
                <div className="activity-type">HackTheBox</div>
              </div>
              
              <div className="activity-card">
                <div className="activity-date">August 2023</div>
                <h3>Security Scanner Dashboard</h3>
                <p>Launched the initial version of my vulnerability scanner visualization dashboard.</p>
                <div className="activity-type">Project</div>
              </div>
              
              <div className="activity-card">
                <div className="activity-date">August 2023</div>
                <h3>Web Security Module</h3>
                <p>Completed 80% of the Web Attacks module in the CPTS certification path.</p>
                <div className="activity-type">Certification</div>
              </div>
            </div>
          </div>
        </div> */}
        
        <div className="home-cta">
          <div className="container">
            <div className="cta-content">
              <h2>Interested in working together?</h2>
              <p>I'm always open to discussing interesting projects or collaboration opportunities.</p>
              <Link to="/contact" className="cta-button">Get In Touch</Link>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Home;
