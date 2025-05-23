import React, { useState } from 'react';
import { FaGithub, FaExternalLinkAlt, FaLock, FaShieldAlt, FaNetworkWired, FaServer, FaDatabase, FaGlobe} from 'react-icons/fa';
import './Projects.css';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const projects = [
    {
      id: 1,
      title: "Portable Isolated Environment (PIE)",
      description: "This project was designed and developed as part of the Project in Computer and Informatics Engineering course at the University of Aveiro. This project aims to develop a portable device together with a webapp to facilitate the process of creating and carrying out evaluations. Ensuring a secure method in which students can use the peripherals of their personal computers in an isolated environment.",
      icon: <FaShieldAlt />,
      categories: ["web", "cybersecurity", "application", "network", "database"],
      tags: ["Python", "FastAPI", "MySQL", "Next.js", "JavaScript", "Flutter", "Redis", "Docker", "Bash"],
      github: "https://github.com/PortableIsolatedEnvironment/",
      demo: "https://portableisolatedenvironment.github.io/",
      isMainProject: true
    },
        {
      id: 2,
      title: "Deti Merch",
      description: "This project was developed for the course of Information And Organisational Security (SIO) and the goal was to present a web application that would be an online shop to sell DETI memorabilia, The purpose of this project was to learn about web security and how to protect a web application implementing OWASP ASVS checklist.",
      icon: <FaShieldAlt />,
      categories: ["web", "cybersecurity"],
      tags: ["Python", "Flask", "HTML", "CSS", "Bash"],
      github: "https://github.com/miguelreis23/2nd-project-sio",
    },
    {
      id: 3,
      title: "UA-BUD-BD",
      description: "Project developed for the course of Databases and my group's goal was to create a ticketing system for communication between students and STIC (Serviços de Tecnologia Informação e Comunicação) of Aveiro's University. Putting in practice the knowledge acquired in the course of Databases.",
      icon: <FaDatabase />,
      categories: ["database", "application"],
      tags: ["C#", "SQL"],
      github: "https://github.com/miguelreis23/ua-bd-bud",
      demo: null,
    },
    {
      id: 4,
      title: "UA-BUD-IHC",
      description: "Project developed for the course of Human-Computer Interaction and the goal was to take an existing web application and improve its usability. The web application we chose was the Aveiro's University BUD (Balcão Único Digital) and we created a new web application with a better UI/UX as we found the original one very outdated and not user-friendly.",
      icon: <FaGlobe />,
      categories: ["web"],
      tags: ["Next.js", "React", "TypeScript", "JavaScript", "Tailwind CSS"],
      github: "https://github.com/miguelreis23/ua-bud-ihc",
      demo: "https://ua-bud-ihc.vercel.app/pt",
    },
    {
      id: 5,
      title: "Networking Project",
      description: "Project developed for the Communications Networks I Course in University of Aveiro",
      icon: <FaNetworkWired />,
      categories: ["network", "web"],
      tags: ["GNS3", "Wireshark", "Bash", "Cisco"],
      github: "https://github.com/miguelreis23/RC1-Project",
      demo: null
    },
  ];

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web' },
    { id: 'network', label: 'Network' },
    { id: 'application', label: 'Application' },
    { id: 'database', label: 'Database' },
    { id: 'cybersecurity', label: 'Cybersecurity' }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.categories.includes(activeFilter));

  return (
    <div className="page-container">
      <section id="projects" className="page-section projects-section">
        <div className="page-header">
          <h1 className="page-title">Projects</h1>
          <p className="page-subtitle">Explore my personal and group projects.</p>
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
            <div key={project.id} className={`project-card ${project.isMainProject ? 'main-project' : ''}`}>
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
                      <FaExternalLinkAlt /> Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Projects;
