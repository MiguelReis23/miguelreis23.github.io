import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaGithub, FaLinkedin, FaTerminal } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-logo">
          <Link to="/" className="logo-link">
            <span className="logo-text">~/miguel_reis</span>
            <span className="cursor-small"></span>
          </Link>
        </div>
        
        <div className="footer-copyright">
          <p>© {currentYear} Miguel Reis. All rights reserved.</p>
          <p className="made-with">
            Made with <FaHeart className="heart-icon" />
          </p>
        </div>
        
        <div className="footer-links">
          <div className="social-links">
            <a href="https://github.com/miguelreis23" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/miguel-rosa-reis/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
            {/* <a href="https://app.hackthebox.com/profile/miguelreis" target="_blank" rel="noopener noreferrer">
              <FaTerminal />
            </a> */}
          </div>
          {/* <div className="resource-links">
            <a href="https://hackthebox.com/" target="_blank" rel="noopener noreferrer">HackTheBox</a>
            <a href="https://tryhackme.com/" target="_blank" rel="noopener noreferrer">TryHackMe</a>
            <a href="https://portswigger.net/web-security" target="_blank" rel="noopener noreferrer">PortSwigger</a>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
