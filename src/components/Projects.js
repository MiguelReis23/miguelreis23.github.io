import React, { useState } from 'react';
import { FaGithub, FaExternalLinkAlt, FaLock, FaShieldAlt, FaNetworkWired, FaServer } from 'react-icons/fa';
import './Projects.css';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const projects = [
    {
      id: 1,
      title: "Secure Authentication System",
      description: "A modern authentication system with JWT, 2FA, and protection against common authentication vulnerabilities.",
      icon: <FaLock />,
      category: "web-security",
      tags: ["React", "Node.js", "JWT", "Authentication"],
      github: "https://github.com/miguelreis/secure-auth",
      demo: "https://secure-auth-demo.vercel.app",
      featured: true
    },
    {
      id: 2,
      title: "Vulnerability Scanner Dashboard",
      description: "Web dashboard to visualize and manage vulnerability scan results across multiple systems.",
      icon: <FaShieldAlt />,
      category: "tool",
      tags: ["React", "D3.js", "API Integration", "Security"],
      github: "https://github.com/miguelreis/vuln-dashboard",
      demo: null,
      featured: true
    },
    {
      id: 3,
      title: "Network Packet Analyzer",
      description: "Tool for capturing and analyzing network packets to detect suspicious activities and potential intrusions.",
      icon: <FaNetworkWired />,
      category: "network",
      tags: ["Python", "Networking", "Data Analysis", "Intrusion Detection"],
      github: "https://github.com/yourusername/packet-analyzer",
      demo: null,
      featured: false
    },
    {
      id: 4,
      title: "Security Headers Checker",
      description: "A tool that analyzes HTTP response headers and provides recommendations for improved web security.",
      icon: <FaShieldAlt />,
      category: "web-security",
      tags: ["JavaScript", "HTTP", "Web Security"],
      github: "https://github.com/yourusername/security-headers",
      demo: "https://security-headers-check.vercel.app",
      featured: false
    },
    {
      id: 5,
      title: "Password Strength Evaluator",
      description: "An application that evaluates password strength using multiple algorithms and provides improvement suggestions.",
      icon: <FaLock />,
      category: "tool",
      tags: ["JavaScript", "Cybersecurity", "UI/UX"],
      github: "https://github.com/yourusername/password-strength",
      demo: "https://password-strength-eval.vercel.app",
      featured: true
    },
    {
      id: 6,
      title: "Secure File Transfer System",
      description: "End-to-end encrypted file transfer system with access controls and detailed audit logging.",
      icon: <FaServer />,
      category: "tool",
      tags: ["Java", "Cryptography", "File Operations"],
      github: "https://github.com/yourusername/secure-transfer",
      demo: null,
      featured: false
    }
  ];

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'featured', label: 'Featured' },
    { id: 'web-security', label: 'Web Security' },
    { id: 'network', label: 'Network' },
    { id: 'tool', label: 'Tools' }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : activeFilter === 'featured'
      ? projects.filter(project => project.featured)
      : projects.filter(project => project.category === activeFilter);

  return (
    <div className="page-container">
      <section id="projects" className="page-section projects-section">
        <div className="page-header">
          <h1 className="page-title">Projects</h1>
          <p className="page-subtitle">Explore my cybersecurity and development projects, from web security tools to network analyzers.</p>
        </div>

        <div className="projects-filter">
          {filters.map(filter => (
            <button 
              key={filter.id}
              className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.map(project => (
            <div key={project.id} className="project-card">
              <div className="project-icon">
                {project.icon}
              </div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag, index) => (
                    <span key={index} className="project-tag">{tag}</span>
                  ))}
                </div>
                <div className="project-links">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                    <FaGithub /> GitHub
                  </a>
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-link demo-link">
                      <FaExternalLinkAlt /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="project-callout">
          <h3>Interested in Collaboration?</h3>
          <p>I'm always open to working on interesting cybersecurity projects or contributing to open-source security tools.</p>
          <a href="/contact" className="callout-btn">Get In Touch</a>
        </div>
      </section>
    </div>
  );
};

export default Projects;
