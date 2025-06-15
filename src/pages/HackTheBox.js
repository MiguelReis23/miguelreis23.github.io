import React, { useState } from 'react';
import { FaTrophy, FaServer, FaTerminal, FaNetworkWired, FaLock, FaFire, FaChevronDown } from 'react-icons/fa';
import CodeBlock from '../components/CodeBlock';
import './HackTheBox.css';

const HackTheBox = () => {
  // State for collapsible modules
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
  
  // Completed machines
  const boxesCompleted = [
    { name: "Lame", difficulty: "Easy", points: 10, date: "May 2022" },
    { name: "Legacy", difficulty: "Easy", points: 10, date: "May 2022" },
    { name: "Devel", difficulty: "Easy", points: 10, date: "June 2022" },
    { name: "Bashed", difficulty: "Easy", points: 10, date: "June 2022" },
    { name: "Blue", difficulty: "Easy", points: 10, date: "July 2022" },
    { name: "Optimum", difficulty: "Easy", points: 10, date: "July 2022" },
    { name: "Bastard", difficulty: "Medium", points: 20, date: "August 2022" },
    { name: "Nineveh", difficulty: "Medium", points: 20, date: "September 2022" }
  ];

  // Starting Point Machines
  const startingPointMachines = [
    { name: "Meow", difficulty: "Very Easy", date: "June 2024", tier: 0, tags: ["Telnet", "Protocols", "Reconnaissance", "Weak Credentials", "Misconfiguration"] },
    { name: "Fawn", difficulty: "Very Easy", date: "June 2024", tier: 0, tags: ["FTP", "Protocols", "Reconnaissance", "Anonymous/Guest Access"]},
    {name: "Dancing", difficulty: "Very Easy", date: "June 2024", tier: 0, tags: ["Protocols", "SMB", "Reconnaissance", "Anonymous/Guest Access"]},
    {name: "Redeemer", difficulty: "Very Easy", date: "June 2024", tier: 0, tags: ["Redis", "Vulnerability Assessment", "Databases", "Reconnaissance", "Anonymous/Guest Access"]},
    {name: "Appointment", difficulty: "Very Easy", date: "June 2024", tier: 1, tags: ["Databases", "Apache", "MariaDB", "PHP", "SQL", "Reconnaissance", "SQL Injection"]},
    {name: "Sequel", difficulty: "Very Easy", date: "June 2024", tier: 1, tags: ["Vulnerability Assessment", "Databases", "MySQL", "SQL", "Reconnaissance", "Weak Credentials"] },
    {name: "Crocodile", difficulty: "Very Easy", date: "June 2024", tier: 1, tags: ["Custom Applications", "Protocols", "Apache", "FTP", "Reconnaissance", "Web Site Structure Discovery", "Clear Text Credentials", "Anonymous/Guest Access"]},
    {name: "Responder", difficulty: "Very Easy", date: "June 2024", tier: 1, tags: ["WinRM", "Custom Applications", "Protocols", "XAMPP", "SMB", "Responder", "PHP", "Reconnaissance", "Password Cracking", "Hash Capture", "Remote File Inclusion", "Remote Code Execution"]},
    {name: "Three", difficulty: "Very Easy", date: "July 2024", tier: 1, tags: ["Cloud", "Custom Applications", "AWS", "Reconnaissance", "Web Site Structure Discovery", "Bucket Enumeration", "Arbitrary File Upload", "Anonymous/Guest Access"]},
    {name: "Archetype", difficulty: "Very Easy", date: "July 2024", tier: 2, tags: ["Protocols", "MSSQL", "SMB", "Powershell", "Reconnaissance", "Remote Code Execution", "Clear Text Credentials", "Information Disclosure", "Anonymous/Guest Access"]},
    {name: "Oopsie", difficulty: "Very Easy", date: "July 2024", tier: 2, tags: ["PHP", "Custom Applications", "Apache", "Reconnaissance", "Web Site Structure Discovery", "Cookie Manipulation", "SUID Exploitation", "Authentication Bypass", "Clear Text Credentials", "Arbitrary File Upload", "Insecure Direct Object Reference (IDOR)", "Path Hijacking"]},
    {name: "Vaccine", difficulty: "Very Easy", date: "July 2024", tier: 2, tags: ["Vulnerability Assessment", "Databases", "Custom Applications", "Protocols", "Source Code Analysis", "Apache", "PostgreSQL", "FTP", "PHP", "Reconnaissance", "Password Cracking", "SUDO Exploitation", "SQL Injection", "Remote Code Execution", "Clear Text Credentials", "Anonymous/Guest Access"]},
    {name: "Unified", difficulty: "Very Easy", date: "July 2024", tier: 2, tags: ["Vulnerability Assessment", "Databases", "Custom Applications", "MongoDB", "Java", "Reconnaissance", "Clear Text Credentials", "Default Credentials", "Code Injection"]},
  ]
  
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
          <h1 className="page-title">HackTheBox & CPTS Journey</h1>
          <p className="page-subtitle">Follow my progress through cybersecurity challenges and professional certification.</p>
        </div>

        <div className="htb-intro">
          <div className="htb-description">
            <p>
              I'm currently pursuing the <strong>Hack The Box Certified Penetration Testing Specialist (CPTS)</strong> certification to enhance my practical skills in cybersecurity. This challenging certification covers various aspects of penetration testing, from initial reconnaissance to post-exploitation.
            </p>
            <p>
              Currently working through <strong>{summary.totalModules} HTB Academy modules</strong> with <strong>{summary.completedModules} completed</strong> and <strong>{summary.inProgressModules} in progress</strong>. Through HTB's practical labs and challenges, I'm gaining hands-on experience with real-world scenarios that test my ability to identify vulnerabilities and exploit them ethically.
            </p>
          </div>
        </div>

        <div className="cpts-progress-section">
          <div 
            className="cpts-journey-header" 
            onClick={toggleModules}
          >
            <div className="journey-title-section">
              <h2>HTB CPTS Progress</h2>
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

        <div className="htb-content">
          {/* <div className="htb-showcase">
            <h2>Skills in Action</h2>
            <div className="code-examples">
              <div className="code-block">
                <div className="code-title">Network Reconnaissance</div>
                <CodeBlock language="bash">
                  {penTestNmapCode}
                </CodeBlock>
              </div>
              
              <div className="code-block">
                <div className="code-title">Web Application Testing</div>
                <CodeBlock language="bash">
                  {webExploitCode}
                </CodeBlock>
              </div>
            </div>
          </div> */}
          
          <div className="completed-boxes">
            <h2>Machines Conquered</h2>
            <table className="boxes-table">
              <thead>
                <tr>
                  <th>Machine</th>
                  <th>Difficulty</th>
                  <th>Points</th>
                  <th>Completed</th>
                </tr>
              </thead>
              <tbody>
                {boxesCompleted.map((box, index) => (
                  <tr key={index} className={`difficulty-${box.difficulty.toLowerCase()}`}>
                    <td><FaServer className="box-icon-small" /> {box.name}</td>
                    <td>{box.difficulty}</td>
                    <td>{box.points}</td>
                    <td>{box.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div className="boxes-grid">
              {boxesCompleted.map((box, index) => (
                <div key={index} className={`box-item ${box.difficulty.toLowerCase()}`}>
                  <FaServer className="box-icon" />
                  <div className="box-name">{box.name}</div>
                  <div className="box-difficulty">{box.difficulty}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="htb-journey">
          <h2>Learning Path & Future Goals</h2>
          <div className="journey-timeline">
            <div className="journey-item completed">
              <div className="journey-marker"></div>
              <div className="journey-content">
                <h3>Getting Started</h3>
                <p>Completed fundamental learning paths on HTB Academy and pwned my first easy machines.</p>
              </div>
            </div>
            
            <div className="journey-item completed">
              <div className="journey-marker"></div>
              <div className="journey-content">
                <h3>Building Skills</h3>
                <p>Tackled more difficult machines and explored specialized topics like Active Directory attacks.</p>
              </div>
            </div>
            
            <div className="journey-item current">
              <div className="journey-marker"></div>
              <div className="journey-content">
                <h3>CPTS Certification</h3>
                <p>Currently working through the CPTS learning path and preparing for the exam.</p>
              </div>
            </div>
            
            <div className="journey-item">
              <div className="journey-marker"></div>
              <div className="journey-content">
                <h3>Professional Pentesting</h3>
                <p>Goal: Apply skills in real-world environments and continue with OSCP certification.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HackTheBox;
