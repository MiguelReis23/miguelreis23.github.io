import React from 'react';
import { Link } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="terminal-window">
          <div className="terminal-header">
            <div className="terminal-buttons">
              <span className="terminal-button red"></span>
              <span className="terminal-button yellow"></span>
              <span className="terminal-button green"></span>
            </div>
            <div className="terminal-title">~/welcome.sh</div>
          </div>
          <div className="terminal-body">
            <div className="line">
              <span className="prompt">$</span> whoami
            </div>
            <div className="response name">Miguel Reis</div>
            
            <div className="line">
              <span className="prompt">$</span> cat description.txt
            </div>
            <div className="response">
              Computer & Informatics Engineering Student<br />
            </div>
            
            {/* <div className="line">
              <span className="prompt">$</span> ./skills --list
            </div>
            <div className="response">
              <span className="skill">Python</span>
              <span className="skill">Java</span>
              <span className="skill">SQL</span>
              <span className="skill">Frontend Development</span>
              <span className="skill">Teamwork</span>
            </div> */}
            
            <div className="line">
              <span className="prompt">$</span> echo $INTERESTS
            </div>
            <div className="response">
              Ethical Hacking, CTF Challenges
            </div>
            
            <div className="line">
              <span className="prompt">$</span> <span className="cursor-blink">_</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* <a href="#" className="scroll-down">
        <FaChevronDown />
      </a> */}
    </section>
  );
};

export default Hero;
