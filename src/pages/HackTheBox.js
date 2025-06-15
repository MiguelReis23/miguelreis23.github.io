import React, { useState } from 'react';
import { FaTrophy, FaServer, FaTerminal, FaNetworkWired, FaLock, FaFire, FaChevronDown, FaLinux, FaWindows, FaDesktop, FaGraduationCap, FaChartLine, FaShieldAlt } from 'react-icons/fa';
import CodeBlock from '../components/CodeBlock';
import './HackTheBox.css';

const HackTheBox = () => {
  // State for navigation and collapsible modules
  const [activeSection, setActiveSection] = useState('overview');
  const [isModulesExpanded, setIsModulesExpanded] = useState(false);
  const [animationState, setAnimationState] = useState('');
  
  // Handle toggle with animation
  const toggleModules = () => {
    if (isModulesExpanded) {
      // Start collapsing
      setAnimationState('collapsing');
      setTimeout(() => {
        setIsModulesExpanded(false);
        setAnimationState('');
      }, 300); // Match animation duration
    } else {
      // Start expanding
      setIsModulesExpanded(true);
      setAnimationState('expanding');
      setTimeout(() => {
        setAnimationState('');
      }, 300); // Match animation duration
    }
  };
  
  // Get HTB Academy modules data from JSON
  const htbModulesData = require('../data/htb-academy-modules.json');
  
  // Get HTB Machines data from JSON
  const htbMachinesData = require('../data/htb-machines.json');
  
  // Calculate derived data automatically
  const processedModules = htbModulesData.modules.map(module => ({
    ...module,
    percentage: module.total > 0 ? Math.round((module.completed / module.total) * 100) : 0,
    status: module.completed === module.total ? 'completed' : 
            module.completed > 0 ? 'in_progress' : 'not_started'
  }));
  
  // Calculate summary statistics
  const totalModules = processedModules.length;
  const completedModules = processedModules.filter(m => m.status === 'completed').length;
  const inProgressModules = processedModules.filter(m => m.status === 'in_progress').length;
  const notStartedModules = processedModules.filter(m => m.status === 'not_started').length;
  const totalSections = processedModules.reduce((sum, m) => sum + m.total, 0);
  const completedSections = processedModules.reduce((sum, m) => sum + m.completed, 0);
  const overallProgress = totalSections > 0 ? (completedSections / totalSections) * 100 : 0;
  
  const summary = {
    totalModules,
    completedModules,
    inProgressModules,
    notStartedModules,
    totalSections,
    completedSections,
    overallProgress
  };
  
  // Transform modules data for display
  const cptsModules = processedModules.map(module => ({
    name: module.title,
    progress: module.percentage,
    status: module.status,
    difficulty: module.difficulty
  }));
  
  const totalProgress = summary.overallProgress;
  
  // Get machines from JSON data
  const startingPointMachines = htbMachinesData["Starting Point"];
  const activeMachines = htbMachinesData["Active"];
  const retiredMachines = htbMachinesData["Retired"];
  
  // Helper function to get OS icon
  const getOSIcon = (os) => {
    switch(os?.toLowerCase()) {
      case 'linux':
        return <FaLinux className="os-icon linux" />;
      case 'windows':
        return <FaWindows className="os-icon windows" />;
      default:
        return <FaDesktop className="os-icon" />;
    }
  };

  // Calculate machine statistics
  const allMachines = [...startingPointMachines, ...activeMachines, ...retiredMachines];
  const totalMachines = allMachines.length;
  const startingPointCount = startingPointMachines.length;
  const activeCount = activeMachines.length;
  const retiredCount = retiredMachines.length;
  
  // Navigation sections
  const sections = [
    { id: 'overview', label: 'Overview', icon: FaChartLine },
    { id: 'cpts', label: 'CPTS Journey', icon: FaGraduationCap },
    { id: 'machines', label: 'Machines', icon: FaServer },
    { id: 'skills', label: 'Skills & Tools', icon: FaShieldAlt }
  ];

  // Code snippet examples
  const penTestNmapCode = `# Initial Network Reconnaissance
$ sudo nmap -sC -sV -p- -oA initial_scan 10.10.10.10
Starting Nmap 7.92 ( https://nmap.org )
Nmap scan report for target.htb (10.10.10.10)
Host is up (0.041s latency).
Not shown: 65530 closed tcp ports (reset)

PORT     STATE SERVICE     VERSION
22/tcp   open  ssh         OpenSSH 8.2p1 (protocol 2.0)
80/tcp   open  http        Apache httpd 2.4.41
135/tcp  open  msrpc       Microsoft Windows RPC
139/tcp  open  netbios-ssn Microsoft Windows netbios-ssn
445/tcp  open  microsoft-ds Windows Server 2019 Standard 17763 microsoft-ds
3389/tcp open  ms-wbt-server Microsoft Terminal Services

Service detection performed. Please report any incorrect results.
Nmap done: 1 IP address (1 host up) scanned in 87.32 seconds`;

  const webExploitCode = `# SQL Injection Discovery and Exploitation
$ sqlmap -u "http://10.10.10.10/index.php?id=1" --batch --dbs
...
[INFO] testing if GET parameter 'id' is dynamic
[INFO] confirming that GET parameter 'id' is dynamic
[INFO] GET parameter 'id' appears to be dynamic
[INFO] heuristic (basic) test shows that GET parameter 'id' might be injectable
[INFO] testing for SQL injection on GET parameter 'id'
...
[INFO] GET parameter 'id' appears to be 'MySQL >= 5.0.12 AND time-based blind' injectable 
...
[INFO] the back-end DBMS is MySQL
[INFO] fetching database names
available databases [5]:
[*] information_schema
[*] mysql
[*] performance_schema
[*] sys
[*] webapp_db

$ sqlmap -u "http://10.10.10.10/index.php?id=1" -D webapp_db --tables
...
Database: webapp_db
[3 tables]
+----------+
| users    |
| products |
| settings |
+----------+

$ sqlmap -u "http://10.10.10.10/index.php?id=1" -D webapp_db -T users --dump
...
Database: webapp_db
Table: users
[2 entries]
+---------+-------------------+-----------------------------------+
| user_id | username          | password                          |
+---------+-------------------+-----------------------------------+
| 1       | admin             | 5f4dcc3b5aa765d61d8327deb882cf99 |
| 2       | regularuser       | 025e4f7f5d6d87c23f4675b8ae71e8d7 |
+---------+-------------------+-----------------------------------+`;

  return (
    <div className="page-container">
      <section id="htb" className="page-section htb-section">
        <div className="page-header">
          <h1 className="page-title">Cybersecurity Hub</h1>
          <p className="page-subtitle">Explore my journey through penetration testing, certifications, and hands-on security challenges.</p>
        </div>

        {/* Navigation Tabs */}
        <div className="cyber-nav">
          {sections.map((section) => {
            const IconComponent = section.icon;
            return (
              <button
                key={section.id}
                className={`nav-tab ${activeSection === section.id ? 'active' : ''}`}
                onClick={() => setActiveSection(section.id)}
              >
                <IconComponent className="nav-icon" />
                <span className="nav-label">{section.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Sections */}
        <div className="cyber-content">
          {/* OVERVIEW SECTION */}
          {activeSection === 'overview' && (
            <div className="content-section overview-section">
              <div className="overview-grid">
                <div className="overview-card stats-card">
                  <h3>
                    <FaChartLine className="card-icon" />
                    Quick Stats
                  </h3>
                  <div className="stats-grid">
                    <div className="stat-item">
                      <span className="stat-number">{summary.completedModules}</span>
                      <span className="stat-label">CPTS Modules Completed</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number">{Math.round(totalProgress)}%</span>
                      <span className="stat-label">CPTS Progress</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number">{totalMachines}</span>
                      <span className="stat-label">Machines Conquered</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number">{startingPointCount + retiredCount}</span>
                      <span className="stat-label">Completed Challenges</span>
                    </div>
                  </div>
                </div>

                <div className="overview-card journey-card">
                  <h3>
                    <FaTrophy className="card-icon" />
                    Current Focus
                  </h3>
                  <div className="current-focus">
                    <div className="focus-item">
                      <h4>CPTS Certification</h4>
                      <p>Pursuing HTB's Certified Penetration Testing Specialist certification</p>
                      <div className="focus-progress">
                        <div className="progress-bar">
                          <div 
                            className="progress-fill"
                            style={{ width: `${totalProgress}%` }}
                          ></div>
                        </div>
                        <span className="progress-text">{Math.round(totalProgress)}% Complete</span>
                      </div>
                    </div>
                    <div className="focus-item">
                      <h4>Active Learning</h4>
                      <p>Currently working through {summary.inProgressModules} modules in parallel</p>
                    </div>
                  </div>
                </div>

                <div className="overview-card recent-card">
                  <h3>
                    <FaFire className="card-icon" />
                    Recent Activity
                  </h3>
                  <div className="recent-items">
                    <div className="recent-item">
                      <FaServer className="activity-icon" />
                      <span>Completed {startingPointMachines.slice(-3).map(m => m.name).join(', ')} machines</span>
                    </div>
                    <div className="recent-item">
                      <FaGraduationCap className="activity-icon" />
                      <span>Advanced through Tier 2 Starting Point challenges</span>
                    </div>
                    <div className="recent-item">
                      <FaTrophy className="activity-icon" />
                      <span>Achieved {summary.completedModules} completed CPTS modules</span>
                    </div>
                  </div>
                </div>

                <div className="overview-card next-card">
                  <h3>
                    <FaNetworkWired className="card-icon" />
                    Next Goals
                  </h3>
                  <div className="next-goals">
                    <div className="goal-item">
                      <span className="goal-icon">🎯</span>
                      <span>Complete remaining {summary.totalModules - summary.completedModules} CPTS modules</span>
                    </div>
                    <div className="goal-item">
                      <span className="goal-icon">🏆</span>
                      <span>Take CPTS certification exam</span>
                    </div>
                    <div className="goal-item">
                      <span className="goal-icon">🚀</span>
                      <span>Begin OSCP preparation</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CPTS SECTION */}
          {activeSection === 'cpts' && (
            <div className="content-section cpts-section">
              <div className="section-header">
                <h2 className="section-title">
                  <FaGraduationCap className="section-icon" />
                  CPTS Certification Journey
                </h2>
                <p className="section-description">
                  Comprehensive penetration testing certification covering reconnaissance, exploitation, and post-exploitation techniques.
                </p>
              </div>

              <div className="cpts-progress-section">
                <div 
                  className="cpts-journey-header" 
                  onClick={toggleModules}
                >
                  <div className="journey-title-section">
                    <h3>HTB Academy Modules</h3>
                    <div className="journey-summary">
                      <div className="progress-bar-inline">
                        <div 
                          className="progress-fill-inline"
                          style={{ width: `${totalProgress}%` }}
                        ></div>
                      </div>
                      <span className="progress-percentage-inline">{Math.round(totalProgress)}%</span>
                    </div>
                  </div>
                  <div className="htb-stats">
                    <div className="htb-stat-item">
                      <span className="htb-stat-number">{summary.completedModules}</span>
                      <span className="htb-stat-label">Completed<br />Modules</span>
                    </div>
                    <div className="htb-stat-item">
                      <span className="htb-stat-number">{summary.totalModules}</span>
                      <span className="htb-stat-label">Total<br />Modules</span>
                    </div>
                  </div>
                  <div className={`expand-icon ${isModulesExpanded ? 'expanded' : ''}`}>
                    <FaChevronDown />
                  </div>
                </div>
                
                {(isModulesExpanded || animationState === 'collapsing') && (
                  <div className={`modules-content ${animationState}`}>              
                    <div className="module-list">
                      {cptsModules.map((module, index) => (
                        <div key={index} className={`module-item ${module.status}`}>
                          <div className="module-info">
                            <div className="module-header">
                              <span className="module-name">{module.name}</span>
                              <div className="module-badges">
                                <span className={`difficulty-badge ${module.difficulty.toLowerCase()}`}>
                                  {module.difficulty}
                                </span>
                                <span className="module-percentage">{module.progress}%</span>
                              </div>
                            </div>
                            <div className="module-progress">
                              <div 
                                className="module-fill"
                                style={{ width: `${module.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="htb-journey">
                <h3>Learning Path & Milestones</h3>
                <div className="journey-timeline">
                  <div className="journey-item completed">
                    <div className="journey-marker"></div>
                    <div className="journey-content">
                      <h4>Foundation Building</h4>
                      <p>Completed fundamental modules covering networking, web applications, and basic exploitation techniques.</p>
                    </div>
                  </div>
                  
                  <div className="journey-item completed">
                    <div className="journey-marker"></div>
                    <div className="journey-content">
                      <h4>Skill Development</h4>
                      <p>Advanced through complex topics including Active Directory, privilege escalation, and post-exploitation.</p>
                    </div>
                  </div>
                  
                  <div className="journey-item current">
                    <div className="journey-marker"></div>
                    <div className="journey-content">
                      <h4>Certification Preparation</h4>
                      <p>Currently completing final modules and preparing for the hands-on CPTS examination.</p>
                    </div>
                  </div>
                  
                  <div className="journey-item">
                    <div className="journey-marker"></div>
                    <div className="journey-content">
                      <h4>Professional Application</h4>
                      <p>Goal: Apply certified skills in real-world pentesting scenarios and pursue OSCP certification.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MACHINES SECTION */}
          {activeSection === 'machines' && (
            <div className="content-section machines-section">
              <div className="section-header">
                <h2 className="section-title">
                  <FaServer className="section-icon" />
                  Machine Challenges
                </h2>
                <p className="section-description">
                  Hands-on penetration testing experience across {totalMachines} different machine challenges.
                </p>
                
                <div className="machines-stats">
                  <div className="machine-stat-item">
                    <span className="machine-stat-number">{startingPointCount}</span>
                    <span className="machine-stat-label">Starting Point</span>
                  </div>
                  <div className="machine-stat-item">
                    <span className="machine-stat-number">{activeCount}</span>
                    <span className="machine-stat-label">Active</span>
                  </div>
                  <div className="machine-stat-item">
                    <span className="machine-stat-number">{retiredCount}</span>
                    <span className="machine-stat-label">Retired</span>
                  </div>
                  <div className="machine-stat-item">
                    <span className="machine-stat-number">{totalMachines}</span>
                    <span className="machine-stat-label">Total</span>
                  </div>
                </div>
              </div>

              {/* Starting Point Machines */}
              <div className="machine-category">
                <h3 className="category-title">
                  <FaTerminal className="category-icon" />
                  Starting Point ({startingPointCount})
                </h3>
                <p className="category-description">Guided learning machines organized by tiers</p>
                
                <div className="machines-grid">
                  {startingPointMachines.map((machine, index) => (
                    <div key={index} className={`machine-card ${machine.difficulty.toLowerCase().replace(' ', '-')}`}>
                      <div className="machine-header">
                        <div className="machine-title">
                          {getOSIcon(machine.os)}
                          <span className="machine-name">{machine.name}</span>
                        </div>
                        <span className="machine-tier">Tier {machine.tier}</span>
                      </div>
                      <div className="machine-info">
                        <span className={`difficulty-badge ${machine.difficulty.toLowerCase().replace(' ', '-')}`}>
                          {machine.difficulty}
                        </span>
                        <span className="machine-date">{machine.date}</span>
                      </div>
                      <div className="machine-tags">
                        {machine.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span key={tagIndex} className="machine-tag">{tag}</span>
                        ))}
                        {machine.tags.length > 3 && (
                          <span className="machine-tag">+{machine.tags.length - 3} more</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Active Machines */}
              <div className="machine-category">
                <h3 className="category-title">
                  <FaFire className="category-icon" />
                  Active Machines ({activeCount})
                </h3>
                <p className="category-description">Currently available machines</p>
                
                <div className="machines-grid">
                  {activeMachines.map((machine, index) => (
                    <div key={index} className={`machine-card ${machine.difficulty.toLowerCase()}`}>
                      <div className="machine-header">
                        <div className="machine-title">
                          {getOSIcon(machine.os)}
                          <span className="machine-name">{machine.name}</span>
                        </div>
                        {machine.points ? (
                          <span className="machine-points">{machine.points} pts</span>
                        ) : machine.tier !== undefined ? (
                          <span className="machine-tier">Tier {machine.tier}</span>
                        ) : null}
                      </div>
                      <div className="machine-info">
                        <span className={`difficulty-badge ${machine.difficulty.toLowerCase()}`}>
                          {machine.difficulty}
                        </span>
                        <span className="machine-date">{machine.date}</span>
                      </div>
                      <div className="machine-tags">
                        {machine.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span key={tagIndex} className="machine-tag">{tag}</span>
                        ))}
                        {machine.tags.length > 3 && (
                          <span className="machine-tag">+{machine.tags.length - 3} more</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Retired Machines */}
              <div className="machine-category">
                <h3 className="category-title">
                  <FaLock className="category-icon" />
                  Retired Machines ({retiredCount})
                </h3>
                <p className="category-description">Classic machines from the archives</p>
                
                <div className="machines-grid">
                  {retiredMachines.map((machine, index) => (
                    <div key={index} className={`machine-card ${machine.difficulty.toLowerCase()}`}>
                      <div className="machine-header">
                        <div className="machine-title">
                          {getOSIcon(machine.os)}
                          <span className="machine-name">{machine.name}</span>
                        </div>
                        <span className="machine-points">{machine.points} pts</span>
                      </div>
                      <div className="machine-info">
                        <span className={`difficulty-badge ${machine.difficulty.toLowerCase()}`}>
                          {machine.difficulty}
                        </span>
                        <span className="machine-date">{machine.date}</span>
                      </div>
                      <div className="machine-tags">
                        {machine.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="machine-tag">{tag}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SKILLS SECTION */}
          {activeSection === 'skills' && (
            <div className="content-section skills-section">
              <div className="section-header">
                <h2 className="section-title">
                  <FaShieldAlt className="section-icon" />
                  Skills & Tools
                </h2>
                <p className="section-description">
                  Technical skills and tools developed through hands-on penetration testing experience.
                </p>
              </div>

              <div className="skills-grid">
                <div className="skill-category">
                  <h3>
                    <FaTerminal className="skill-icon" />
                    Reconnaissance
                  </h3>
                  <div className="skill-items">
                    <span className="skill-item">Nmap</span>
                    <span className="skill-item">Directory Enumeration</span>
                    <span className="skill-item">Service Discovery</span>
                    <span className="skill-item">OSINT</span>
                  </div>
                </div>

                <div className="skill-category">
                  <h3>
                    <FaNetworkWired className="skill-icon" />
                    Web Application Testing
                  </h3>
                  <div className="skill-items">
                    <span className="skill-item">SQL Injection</span>
                    <span className="skill-item">XSS</span>
                    <span className="skill-item">File Upload Vulnerabilities</span>
                    <span className="skill-item">Authentication Bypass</span>
                  </div>
                </div>

                <div className="skill-category">
                  <h3>
                    <FaServer className="skill-icon" />
                    System Exploitation
                  </h3>
                  <div className="skill-items">
                    <span className="skill-item">Buffer Overflow</span>
                    <span className="skill-item">Privilege Escalation</span>
                    <span className="skill-item">Remote Code Execution</span>
                    <span className="skill-item">CVE Research</span>
                  </div>
                </div>

                <div className="skill-category">
                  <h3>
                    <FaLock className="skill-icon" />
                    Post-Exploitation
                  </h3>
                  <div className="skill-items">
                    <span className="skill-item">Lateral Movement</span>
                    <span className="skill-item">Persistence</span>
                    <span className="skill-item">Data Exfiltration</span>
                    <span className="skill-item">Covering Tracks</span>
                  </div>
                </div>
              </div>

              <div className="tools-section">
                <h3>Penetration Testing Tools</h3>
                <div className="tools-grid">
                  <div className="tool-item">
                    <FaTerminal className="tool-icon" />
                    <span>Nmap</span>
                  </div>
                  <div className="tool-item">
                    <FaServer className="tool-icon" />
                    <span>Metasploit</span>
                  </div>
                  <div className="tool-item">
                    <FaNetworkWired className="tool-icon" />
                    <span>Burp Suite</span>
                  </div>
                  <div className="tool-item">
                    <FaShieldAlt className="tool-icon" />
                    <span>SQLMap</span>
                  </div>
                  <div className="tool-item">
                    <FaFire className="tool-icon" />
                    <span>Gobuster</span>
                  </div>
                  <div className="tool-item">
                    <FaLock className="tool-icon" />
                    <span>John the Ripper</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HackTheBox;
