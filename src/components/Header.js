import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaTerminal, FaToolbox } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        <div className="logo">
          <Link to="/" className="logo-link">
            <span className="logo-text">~/miguel_reis</span>
            <span className="cursor"></span>
          </Link>
        </div>
        
        <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          <div className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}></div>
        </div>
        
        <nav className={`nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <ul className="nav-list">
            <li><Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link></li>
            <li>
              <Link to="/about" onClick={() => setMobileMenuOpen(false)}>About</Link>
            </li>
            {/* <li>
              <Link to="/skills" onClick={() => setMobileMenuOpen(false)}>
                Skills <FaToolbox className="construction-icon" title="Under Construction" />
              </Link>
            </li> */}
            <li>
              <Link to="/projects" onClick={() => setMobileMenuOpen(false)}> Projects</Link>
            </li>
            <li>
              <Link to="/cyber" onClick={() => setMobileMenuOpen(false)}> Cybersecurity </Link>
            </li>
            <li>
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)}> Contact</Link>
            </li>
          </ul>
        </nav>
        
        <div className="social-links">
          <a href="https://github.com/miguelreis23" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
          <a href="https://linkedin.com/in/miguel-rosa-reis" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
          {/* <a href="https://app.hackthebox.com/profile/miguelreis" target="_blank" rel="noopener noreferrer">
            <FaTerminal />
          </a> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
