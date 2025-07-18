import React, { useState } from 'react';
import { FaTrophy, FaServer, FaTerminal, FaNetworkWired, FaLock, FaFire, FaChevronDown, FaLinux, FaWindows, FaDesktop, FaGraduationCap, FaChartLine, FaShieldAlt, FaExternalLinkAlt, FaBookOpen, FaBook } from 'react-icons/fa';
import CodeBlock from '../components/CodeBlock';
import Walkthrough from '../components/Walkthrough';
import HTBRulesDialog from '../components/HTBRulesDialog';
import './HackTheBox.css';

const HackTheBox = () => {
  // State for navigation and collapsible modules
  const [activeSection, setActiveSection] = useState('overview');
  const [isModulesExpanded, setIsModulesExpanded] = useState(false);
  const [animationState, setAnimationState] = useState('');
  
  // State for machine category filter
  const [activeMachineFilter, setActiveMachineFilter] = useState('total');
  
  // State for walkthrough modal
  const [selectedWalkthrough, setSelectedWalkthrough] = useState(null);
  
  // State for HTB rules dialog
  const [showHTBRulesDialog, setShowHTBRulesDialog] = useState(false);
  
  // State for highlighted machine
  const [highlightedMachine, setHighlightedMachine] = useState(null);
  
  // State for highlighted module
  const [highlightedModule, setHighlightedModule] = useState(null);
  
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

  // Handle machine filter change
  const handleMachineFilter = (filter) => {
    setActiveMachineFilter(filter);
  };

  // Handle walkthrough open
  const openWalkthrough = (walkthroughPath, machineType) => {
    if (machineType === 'active') {
      // Show dialog for active machines
      setShowHTBRulesDialog(true);
    } else {
      setSelectedWalkthrough(walkthroughPath);
    }
  };

  // Handle walkthrough close
  const closeWalkthrough = () => {
    setSelectedWalkthrough(null);
  };

  // Handle HTB rules dialog close
  const closeHTBRulesDialog = () => {
    setShowHTBRulesDialog(false);
  };
  
  // Get HTB Academy modules data from JSON
  const htbModulesData = require('../data/htb-academy-modules.json');
  
  // Get HTB Machines data from JSON
  const htbMachinesData = require('../data/htb-machines.json');
  
  // Get cybersecurity content data from JSON
  const cybersecurityContent = require('../data/cybersecurity-content.json');
  const cybersecuritySkills = require('../data/cybersecurity-skills.json');
  const cybersecurityNavigation = require('../data/cybersecurity-navigation.json');
  
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
  
  // Helper function to parse month/year dates for sorting
  const parseDate = (dateString) => {
    // Handle formats like "January 2025", "Jan 2025", "01/2025", etc.
    const date = new Date(dateString + " 01"); // Add day 01 to make it parseable
    return date.getTime(); // Return timestamp for comparison
  };

  // Get machines from JSON data
  const startingPointMachines = htbMachinesData["Starting Point"];
  const activeMachines = htbMachinesData["Active"].sort((a, b) => parseDate(b.date) - parseDate(a.date));
  const retiredMachines = htbMachinesData["Retired"].sort((a, b) => parseDate(b.date) - parseDate(a.date));
  
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
  
  // Helper function to get icon component from string
  const getIconComponent = (iconName) => {
    const iconMap = {
      FaServer, FaTerminal, FaNetworkWired, FaLock, FaFire, FaShieldAlt,
      FaTrophy, FaGraduationCap, FaChartLine, FaLinux, FaWindows, FaDesktop,
      FaBookOpen, FaBook
    };
    return iconMap[iconName] || FaDesktop;
  };

  // Navigation sections
  const sections = cybersecurityNavigation.navigation.map(section => ({
    ...section,
    IconComponent: getIconComponent(section.icon)
  }));

  // Handle machine click from recent activity
  const handleMachineClick = (machineName) => {
    // Find the machine in the data
    const machine = allMachines.find(m => m.name === machineName);
    if (!machine) return;
    
    // Set highlighted machine
    setHighlightedMachine(machineName);
    
    // Clear highlight after 3 seconds
    setTimeout(() => {
      setHighlightedMachine(null);
    }, 5000);
    
    // Scroll to the machine card
    setTimeout(() => {
      const machineElement = document.getElementById(`machine-${machineName.replace(/\s+/g, '-').toLowerCase()}`);
      if (machineElement) {
        machineElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 300);
  };

  // Handle module click from recent activity
  const handleModuleClick = (moduleName) => {
    // Find the module in the data
    const module = cptsModules.find(m => m.name.toLowerCase().includes(moduleName.toLowerCase()));
    if (!module) return;
    
    // Set highlighted module
    setHighlightedModule(module.name);
    
    // Clear highlight after 3 seconds
    setTimeout(() => {
      setHighlightedModule(null);
    }, 5000);
    
    // First expand the modules section if not already expanded
    if (!isModulesExpanded) {
      setIsModulesExpanded(true);
      setAnimationState('expanding');
      setTimeout(() => {
        setAnimationState('');
      }, 300);
    }
    
    // Scroll to the module
    setTimeout(() => {
      const moduleElement = document.getElementById(`module-${module.name.replace(/\s+/g, '-').toLowerCase()}`);
      if (moduleElement) {
        moduleElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, isModulesExpanded ? 300 : 600);
  };

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
            const IconComponent = section.IconComponent;
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
                      <span className="stat-label">Machines Owns</span>
                    </div>
                    {/* <div className="stat-item">
                      <span className="stat-number">{startingPointCount + retiredCount}</span>
                      <span className="stat-label">Completed Challenges</span>
                    </div> */}
                  </div>
                </div>

                <div className="overview-card journey-card">
                  <h3>
                    <FaTrophy className="card-icon" />
                    Current Focus
                  </h3>
                  <div className="current-focus">
                    <div className="focus-item">
                      <h4>{cybersecurityContent.overview.currentFocus.primary.title}</h4>
                      <p>{cybersecurityContent.overview.currentFocus.primary.description}</p>
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
                      <h4>{cybersecurityContent.overview.currentFocus.secondary.title}</h4>
                      <p>{cybersecurityContent.overview.currentFocus.secondary.description}</p>
                    </div>
                  </div>
                </div>

                <div className="overview-card recent-card">
                  <h3>
                    <FaFire className="card-icon" />
                    Recent Activity
                  </h3>
                  <div className="recent-items">
                    {cybersecurityContent.overview.recentActivity.map((activity, index) => {
                      const IconComponent = getIconComponent(activity.icon);
                      let description = activity.description;
                      
                      // Replace dynamic content based on activity type
                      if (activity.type === 'machines') {
                        // Extract machine name from description (without quotes)
                        const machineNameMatch = activity.description.match(/(?:Completed|Achieved)\s+(.+?)\s+machine/);
                        if (machineNameMatch) {
                          const machineName = machineNameMatch[1];
                          
                          // Find the machine in our data
                          const allMachines = [...activeMachines, ...retiredMachines, ...startingPointMachines];
                          const machine = allMachines.find(m => m.name === machineName);
                          
                          if (machine) {
                            // Create clickable machine name
                            const beforeMachine = activity.description.substring(0, machineNameMatch.index + machineNameMatch[0].indexOf(machineName));
                            const afterMachine = activity.description.substring(machineNameMatch.index + machineNameMatch[0].indexOf(machineName) + machineName.length);
                            
                            return (
                              <div key={index} className="recent-item">
                                <IconComponent className="activity-icon" />
                                <span>
                                  {beforeMachine}
                                  <button 
                                    className="machine-name-link"
                                    onClick={() => {
                                      setActiveSection('machines');
                                      setTimeout(() => {
                                        handleMachineClick(machineName);
                                      }, 100);
                                    }}
                                  >
                                    {machineName}
                                  </button>
                                  {afterMachine}
                                </span>
                              </div>
                            );
                          }
                        }
                      } else if (activity.type === 'module') {
                        // Extract module name from description (without quotes)
                        const moduleNameMatch = activity.description.match(/(?:Finished|Completed)\s+(.+?)\s+module/);
                        if (moduleNameMatch) {
                          const moduleName = moduleNameMatch[1];
                          
                          // Find the module in our data
                          const module = cptsModules.find(m => m.name.toLowerCase().includes(moduleName.toLowerCase()));
                          
                          if (module) {
                            // Create clickable module name
                            const beforeModule = activity.description.substring(0, moduleNameMatch.index + moduleNameMatch[0].indexOf(moduleName));
                            const afterModule = activity.description.substring(moduleNameMatch.index + moduleNameMatch[0].indexOf(moduleName) + moduleName.length);
                            
                            return (
                              <div key={index} className="recent-item">
                                <IconComponent className="activity-icon" />
                                <span>
                                  {beforeModule}
                                  <button 
                                    className="machine-name-link"
                                    onClick={() => {
                                      setActiveSection('cpts');
                                      setTimeout(() => {
                                        handleModuleClick(moduleName);
                                      }, 100);
                                    }}
                                  >
                                    {moduleName}
                                  </button>
                                  {afterModule}
                                </span>
                              </div>
                            );
                          }
                        }
                      } else if (activity.type === 'walkthrough') {
                        // Extract machine name from walkthrough description
                        const walkthroughNameMatch = activity.description.match(/(?:Published|Created)\s+(.+?)\s+walkthrough/);
                        if (walkthroughNameMatch) {
                          const machineName = walkthroughNameMatch[1];
                          
                          // Find the machine in our data
                          const allMachines = [...activeMachines, ...retiredMachines, ...startingPointMachines];
                          const machine = allMachines.find(m => m.name === machineName);
                          
                          if (machine) {
                            // Create clickable machine name
                            const beforeMachine = activity.description.substring(0, walkthroughNameMatch.index + walkthroughNameMatch[0].indexOf(machineName));
                            const afterMachine = activity.description.substring(walkthroughNameMatch.index + walkthroughNameMatch[0].indexOf(machineName) + machineName.length);
                            
                            return (
                              <div key={index} className="recent-item">
                                <IconComponent className="activity-icon" />
                                <span>
                                  {beforeMachine}
                                  <button 
                                    className="machine-name-link"
                                    onClick={() => {
                                      setActiveSection('machines');
                                      setTimeout(() => {
                                        handleMachineClick(machineName);
                                      }, 100);
                                    }}
                                  >
                                    {machineName}
                                  </button>
                                  {afterMachine}
                                </span>
                              </div>
                            );
                          }
                        }
                      } else if (activity.type === 'certification') {
                        description = `Achieved ${summary.completedModules} completed CPTS modules`;
                      }
                      
                      return (
                        <div key={index} className="recent-item">
                          <IconComponent className="activity-icon" />
                          <span>{description}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* <div className="overview-card next-card">
                  <h3>
                    <FaNetworkWired className="card-icon" />
                    Next Goals
                  </h3>
                  <div className="next-goals">
                    {cybersecurityContent.overview.nextGoals.map((goal, index) => {
                      let description = goal.description;
                      
                      // Replace dynamic content based on goal type
                      if (goal.type === 'certification') {
                        description = `Complete remaining ${summary.totalModules - summary.completedModules} CPTS modules`;
                      }
                      
                      return (
                        <div key={index} className="goal-item">
                          <span className="goal-icon">{goal.icon}</span>
                          <span>{description}</span>
                        </div>
                      );
                    })}
                  </div>
                </div> */}
              </div>
            </div>
          )}

          {/* CPTS SECTION */}
          {activeSection === 'cpts' && (
            <div className="content-section cpts-section">
              <div className="section-header">
                <h2 className="section-title">
                  <FaGraduationCap className="section-icon" />
                  {cybersecurityContent.journey.title}
                </h2>
                <p className="section-description">
                  {cybersecurityContent.journey.description}
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
                        <div key={index} className={`module-item ${module.status} ${module.difficulty.toLowerCase()}${highlightedModule === module.name ? ' highlighted' : ''}`} id={`module-${module.name.replace(/\s+/g, '-').toLowerCase()}`}>
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

              {/* <div className="htb-journey">
                <h3>Learning Path & Milestones</h3>
                <div className="journey-timeline">
                  {cybersecurityContent.journey.timeline.map((milestone, index) => (
                    <div key={index} className={`journey-item ${milestone.status}`}>
                      <div className="journey-marker"></div>
                      <div className="journey-content">
                        <h4>{milestone.title}</h4>
                        <p>{milestone.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div> */}
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
                  Hands-on penetration testing experience across {totalMachines} different machines.
                </p>
                
                <div className="machines-stats">
                  <div 
                    className={`machine-stat-item clickable ${activeMachineFilter === 'active' ? 'active' : ''}`}
                    onClick={() => handleMachineFilter('active')}
                  >
                    <span className="machine-stat-number">{activeCount}</span>
                    <span className="machine-stat-label">Active</span>
                  </div>
                  <div 
                    className={`machine-stat-item clickable ${activeMachineFilter === 'retired' ? 'active' : ''}`}
                    onClick={() => handleMachineFilter('retired')}
                  >
                    <span className="machine-stat-number">{retiredCount}</span>
                    <span className="machine-stat-label">Retired</span>
                  </div>
                  <div 
                    className={`machine-stat-item clickable ${activeMachineFilter === 'startingPoint' ? 'active' : ''}`}
                    onClick={() => handleMachineFilter('startingPoint')}
                  >
                    <span className="machine-stat-number">{startingPointCount}</span>
                    <span className="machine-stat-label">Starting Point</span>
                  </div>
                  <div 
                    className={`machine-stat-item clickable ${activeMachineFilter === 'total' ? 'active' : ''}`}
                    onClick={() => handleMachineFilter('total')}
                  >
                    <span className="machine-stat-number">{totalMachines}</span>
                    <span className="machine-stat-label">Total</span>
                  </div>
                </div>
              </div>

              {/* Active Machines */}
              {(activeMachineFilter === 'active' || activeMachineFilter === 'total') && (
                <div className="machine-category">
                  <h3 className="category-title">
                    {React.createElement(getIconComponent(cybersecurityNavigation.machineCategories[1].icon), { className: "category-icon" })}
                    {cybersecurityNavigation.machineCategories[1].title} ({activeCount})
                  </h3>
                  <p className="category-description">{cybersecurityNavigation.machineCategories[1].description}</p>
                  
                  <div className="machines-grid">
                    {activeMachines.map((machine, index) => (
                      <div key={index} className={`machine-card ${machine.difficulty.toLowerCase()}${highlightedMachine === machine.name ? ' highlighted' : ''}`} id={`machine-${machine.name.replace(/\s+/g, '-').toLowerCase()}`}>
                        <div className="machine-header">
                          <div className="machine-title">
                            {getOSIcon(machine.os)}
                            <span className="machine-name">{machine.name}</span>
                          </div>
                          <button 
                            className="walkthrough-button active-machine"
                            onClick={() => openWalkthrough(machine.walkthrough, 'active')}
                          >
                            Walkthrough <FaBookOpen className="walkthrough-icon" />
                          </button>
                        </div>
                        <div className="machine-info">
                          <span className={`difficulty-badge ${machine.difficulty.toLowerCase()}`}>
                            {machine.difficulty}
                          </span>
                          <span className="machine-date">{machine.date}</span>
                        </div>
                        {machine.tags && machine.tags.length > 0 && (
                          <div className="machine-tags">
                            {machine.tags.slice(0, 3).map((tag, tagIndex) => (
                              <span key={tagIndex} className="machine-tag">{tag}</span>
                            ))}
                            {machine.tags.length > 3 && (
                              <span className="machine-tag">+{machine.tags.length - 3} more</span>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Retired Machines */}
              {(activeMachineFilter === 'retired' || activeMachineFilter === 'total') && (
                <div className="machine-category">
                  <h3 className="category-title">
                    {React.createElement(getIconComponent(cybersecurityNavigation.machineCategories[2].icon), { className: "category-icon" })}
                    {cybersecurityNavigation.machineCategories[2].title} ({retiredCount})
                  </h3>
                  <p className="category-description">{cybersecurityNavigation.machineCategories[2].description}</p>
                  
                  <div className="machines-grid">
                    {retiredMachines.map((machine, index) => (
                      <div key={index} className={`machine-card ${machine.difficulty.toLowerCase()}${highlightedMachine === machine.name ? ' highlighted' : ''}`} id={`machine-${machine.name.replace(/\s+/g, '-').toLowerCase()}`}>
                        <div className="machine-header">
                          <div className="machine-title">
                            {getOSIcon(machine.os)}
                            <span className="machine-name">{machine.name}</span>
                          </div>
                          {machine.walkthrough ? (
                            <button 
                              className="walkthrough-button"
                              onClick={() => openWalkthrough(machine.walkthrough, 'retired')}
                            >
                              Walkthrough <FaBookOpen className="walkthrough-icon" />
                            </button>
                          ) : (
                            <div className="walkthrough-placeholder">
                             Walkthrough <FaBook className="walkthrough-icon disabled" />
                            </div>
                          )}
                        </div>
                        <div className="machine-info">
                          <span className={`difficulty-badge ${machine.difficulty.toLowerCase()}`}>
                            {machine.difficulty}
                          </span>
                          <span className="machine-date">{machine.date}</span>
                        </div>
                        {machine.tags && machine.tags.length > 0 && (
                          <div className="machine-tags">
                            {machine.tags.map((tag, tagIndex) => (
                              <span key={tagIndex} className="machine-tag">{tag}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Starting Point Machines */}
              {(activeMachineFilter === 'startingPoint' || activeMachineFilter === 'total') && (
                <div className="machine-category">
                  <h3 className="category-title">
                    {React.createElement(getIconComponent(cybersecurityNavigation.machineCategories[0].icon), { className: "category-icon" })}
                    {cybersecurityNavigation.machineCategories[0].title} ({startingPointCount})
                  </h3>
                  <p className="category-description">{cybersecurityNavigation.machineCategories[0].description}</p>
                  
                  <div className="machines-grid">
                    {startingPointMachines.map((machine, index) => (
                      <div key={index} className={`machine-card ${machine.difficulty.toLowerCase().replace(' ', '-')}${highlightedMachine === machine.name ? ' highlighted' : ''}`} id={`machine-${machine.name.replace(/\s+/g, '-').toLowerCase()}`}>
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
                        {machine.tags && machine.tags.length > 0 && (
                          <div className="machine-tags">
                            {machine.tags.slice(0, 3).map((tag, tagIndex) => (
                              <span key={tagIndex} className="machine-tag">{tag}</span>
                            ))}
                            {machine.tags.length > 3 && (
                              <span className="machine-tag">+{machine.tags.length - 3} more</span>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* HTB Rules Dialog */}
      {showHTBRulesDialog && (
        <HTBRulesDialog onClose={closeHTBRulesDialog} />
      )}

      {/* Walkthrough Modal */}
      {selectedWalkthrough && (
        <Walkthrough
          walkthroughPath={selectedWalkthrough}
          onClose={closeWalkthrough}
        />
      )}
    </div>
  );
};

export default HackTheBox;
