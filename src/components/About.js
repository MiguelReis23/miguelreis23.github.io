import React from 'react';
import { FaGraduationCap, FaBriefcase, FaAward } from 'react-icons/fa';
import './About.css';

const About = () => {
  const education = [
    {
      degree: "Bachelor in Computer and Informatics Engineering",
      institution: "University of Example",
      period: "2019 - Present",
      description: "Focusing on cybersecurity, network infrastructure, and software development."
    }
  ];

  const experience = [
    {
      role: "Cybersecurity Intern",
      company: "SecureTech Solutions",
      period: "Summer 2022",
      description: "Conducted security assessments, vulnerability scanning, and assisted in penetration testing of web applications."
    },
    {
      role: "IT Support Technician",
      company: "Tech Innovators Inc.",
      period: "2020 - 2021",
      description: "Managed network infrastructure and implemented security measures for small business clients."
    }
  ];

  return (
    <div className="page-container">
      <section id="about" className="page-section about-section">
        <div className="page-header">
          <h1 className="page-title">About Me</h1>
          <p className="page-subtitle">Get to know my background, experience, and what drives my passion for cybersecurity.</p>
        </div>

        <div className="about-content">
          <div className="about-text">
            <h2>Who I Am</h2>
            <p>
              I'm Miguel Reis, a Computer and Informatics Engineering student with a strong focus on cybersecurity. My journey in the tech world began with a curiosity about how systems work and evolved into a passion for securing them.
            </p>
            <p>
              Currently pursuing my degree, I'm actively enhancing my skills through hands-on practice in environments like Hack The Box and working toward the Certified Penetration Testing Specialist (CPTS) certification.
            </p>
            <p>
              My approach combines technical expertise with analytical thinking. I believe that effective security requires understanding both the attacker's perspective and defensive strategies. Whether it's identifying vulnerabilities in web applications or securing network infrastructure, I'm driven by the challenge of staying one step ahead in the ever-evolving security landscape.
            </p>
            <p>
              When I'm not immersed in cybersecurity challenges, you'll find me contributing to open-source projects, participating in CTF competitions, or exploring the latest security research.
            </p>
          </div>
          
          <div className="about-stats">
            <div className="stats-card">
              <div className="stats-item">
                <div className="stat-value">3+</div>
                <div className="stat-label">Years of Programming</div>
              </div>
              <div className="stats-item">
                <div className="stat-value">10+</div>
                <div className="stat-label">Projects Completed</div>
              </div>
              <div className="stats-item">
                <div className="stat-value">5+</div>
                <div className="stat-label">CTFs Participated</div>
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
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="interests-section">
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
        </div>
      </section>
    </div>
  );
};

export default About;
