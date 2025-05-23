import React from 'react';
import { FaShieldAlt, FaCode, FaServer, FaNetworkWired, FaTools } from 'react-icons/fa';
import './Skills.css';

const Skills = () => {
  const skillCategories = [
    {
      title: "Security",
      icon: <FaShieldAlt />,
      skills: [
        { name: "Penetration Testing", level: 75 },
        { name: "Vulnerability Assessment", level: 80 },
        { name: "OSINT", level: 70 },
        { name: "Security Auditing", level: 65 }
      ]
    },
    {
      title: "Development",
      icon: <FaCode />,
      skills: [
        { name: "React", level: 85 },
        { name: "JavaScript", level: 80 },
        { name: "Python", level: 75 },
        { name: "Java", level: 70 }
      ]
    },
    {
      title: "Infrastructure",
      icon: <FaServer />,
      skills: [
        { name: "Linux", level: 85 },
        { name: "Docker", level: 75 },
        { name: "AWS", level: 60 },
        { name: "CI/CD", level: 65 }
      ]
    },
    {
      title: "Networking",
      icon: <FaNetworkWired />,
      skills: [
        { name: "Network Protocols", level: 80 },
        { name: "Firewall Configuration", level: 70 },
        { name: "VPN Setup", level: 75 },
        { name: "Network Monitoring", level: 65 }
      ]
    },
    {
      title: "Tools & Frameworks",
      icon: <FaTools />,
      skills: [
        { name: "Metasploit", level: 75 },
        { name: "Burp Suite", level: 80 },
        { name: "Nmap", level: 85 },
        { name: "Wireshark", level: 70 }
      ]
    }
  ];

  return (
    <div className="page-container">
      <section id="skills" className="page-section skills-section">
        <div className="page-header">
          <h1 className="page-title">Skills & Expertise</h1>
          <p className="page-subtitle">A comprehensive overview of my technical capabilities in cybersecurity and software development.</p>
        </div>
        
        <div className="skill-categories">
          {skillCategories.map((category, index) => (
            <div key={index} className="skill-category">
              <div className="category-header">
                <span className="category-icon">{category.icon}</span>
                <h3>{category.title}</h3>
              </div>
              <div className="skills-list">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="skill-item">
                    <div className="skill-info">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-percent">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <div 
                        className="skill-progress"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="certifications-section">
          <h2>Certifications & Training</h2>
          <div className="certification-list">
            <div className="certification-item in-progress">
              <div className="cert-badge">
                <FaShieldAlt className="cert-icon" />
                <div className="cert-status">In Progress</div>
              </div>
              <div className="cert-details">
                <h3>Hack The Box CPTS</h3>
                <p>Certified Penetration Testing Specialist</p>
                <div className="cert-progress">
                  <div className="cert-progress-bar">
                    <div className="cert-progress-fill" style={{ width: '65%' }}></div>
                  </div>
                  <span className="cert-progress-text">65% Complete</span>
                </div>
              </div>
            </div>
            
            {/* Add more certifications as you obtain them */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Skills;
