import React from 'react';
import { FaGraduationCap, FaBriefcase, FaAward, FaGlobe, FaFileDownload, FaUsers } from 'react-icons/fa';
import './About.css';

const About = () => {
  const [showTasks, setShowTasks] = React.useState(false);
  
  const education = [
    {
      degree: "High School Diploma in Science and Technology",
      institution: "Centro de Estudos de Fátima",
      period: "2018 - 2021",
    },
    {
      degree: "Bachelor in Computer and Informatics Engineering",
      institution: "Aveiro's University",
      period: "2021 - Present",
    }
  ];

  const experience = [
    {
      role: "Cybersecurity Intern",
      company: "SCUBIC - Smart Software Solutions",
      period: "Summer 2024",
      description: "Infrastructure review and implementation of security solutions.",
      main_tasks: [
        "Data collection on the network infrastructure",
        "Research on methodologies and best practices",
        "Development of proposals for network and device optimization",
        "Creation of internal documentation",
        "Research and implementation of IDS/IPS solutions",
        "Development of training materials"
      ]
    }
  ];

  const activities = [
    {
      name: "GLUA - Aveiro's University Linux Group",
      role: "Member",
      period: "2023 - 2025",
      description: "Participated in workshops, events, and collaborative projects promoting open-source software and Linux-based solutions."
    }
  ];

  return (
    <div className="page-container">
      <section id="about" className="page-section about-section">
        <div className="page-header">
          <h1 className="page-title">About Me</h1>
          <p className="page-subtitle">Get to know my background, experience and interests.</p>
        </div>

        <div className="about-content">
          <div className="about-text">
            <h2>Who I Am</h2>
            <p>
              I am a motivated Computer and Informatics Engineering student with a keen interest intechnology and cybersecurity, eager to apply my classroom knowledge to real-worldapplications. I see myself as a collaborative person with a strong willingness to learn andcontribute. I am prepared to offer fresh perspectives and a strong work ethic to any team.
            </p>
            <p>
              Currently pursuing my degree, I'm actively enhancing my skills through hands-on practice in environments like Hack The Box and working towards the Certified Penetration Testing Specialist (CPTS) certification.
            </p>
          </div>
          
          <div className="about-stats">
            <div className="minimal-language-card">
              <h3><FaGlobe /> Languages</h3>
              <div className="minimal-language-list">
                <div className="minimal-language-item">
                  <span>Portuguese</span>
                  <span className="language-level">Native</span>
                </div>
                <div className="minimal-language-item">
                  <span>English</span>
                  <span className="language-level">B2 Level</span>
                </div>
                {/* <div className="minimal-language-item">
                  <span>German</span>
                  <span className="language-level">Learning</span>
                </div> */}
              </div>
            </div>
          </div>
        </div>

        <div className="timeline-section">
          <div className="timeline-column">
            <h2><FaGraduationCap /> Education</h2>
            <div className="timeline">
              {education.map((item, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <div className="timeline-date">{item.period}</div>
                    <h3>{item.degree}</h3>
                    <h4>{item.institution}</h4>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="timeline-column">
            <h2><FaBriefcase /> Experience</h2>
            <div className="timeline">
              {experience.map((item, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <div className="timeline-date">{item.period}</div>
                    <h3>{item.role}</h3>
                    <h4>{item.company}</h4>
                    <p>{item.description}</p>
                    
                    {item.main_tasks && (
                      <>
                        <button 
                          onClick={() => setShowTasks(!showTasks)}
                          className="tasks-toggle-btn"
                        >
                          {showTasks ? 'Hide details' : 'See details'}
                        </button>
                        
                        {showTasks && (
                          <div className="main-tasks">
                            <h5>Main Tasks:</h5>
                            <ul>
                              {item.main_tasks.map((task, taskIndex) => (
                                <li key={taskIndex}>{task}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="timeline-section">
          <div className="timeline-column">
            <h2><FaUsers /> Activities</h2>
            <div className="timeline">
              {activities.map((item, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <div className="timeline-date">{item.period}</div>
                    <h3>{item.name}</h3>
                    <h4>{item.role}</h4>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* <div className="interests-section">
          <h2><FaAward /> Interests & Goals</h2>
          <div className="interests-grid">
            <div className="interest-card">
              <h3>Ethical Hacking</h3>
              <p>Exploring systems with permission to identify and fix security vulnerabilities before malicious actors can exploit them.</p>
            </div>
            <div className="interest-card">
              <h3>Network Security</h3>
              <p>Designing and implementing secure network architectures that protect sensitive data and critical infrastructure.</p>
            </div>
            <div className="interest-card">
              <h3>Web Application Security</h3>
              <p>Identifying and mitigating security risks in web applications to ensure safe user experiences.</p>
            </div>
            <div className="interest-card">
              <h3>Cloud Security</h3>
              <p>Securing cloud environments and ensuring proper implementation of security controls in cloud-based infrastructures.</p>
            </div>
          </div>
        </div> */}
        
        {/* <div className="cv-download-container">
          <a 
            href={process.env.PUBLIC_URL + '/assets/files/Miguel_Reis_CV.pdf'} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="cv-download-btn"
          >
            <FaFileDownload /> Download CV
          </a>
        </div> */}
      </section>
    </div>
  );
};

export default About;
