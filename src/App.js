import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import HackTheBox from './pages/HackTheBox';
import Contact from './pages/Contact';
import UnderConstruction from './components/UnderConstruction';
import Footer from './components/Footer';
import './App.css';

// Wrapper component to show Under Construction overlay
const UnderConstructionWrapper = ({ component: Component }) => {
  return (
    <>
      <Component />
      <UnderConstruction />
    </>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<UnderConstructionWrapper component={Skills} />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/htb" element={<UnderConstructionWrapper component={HackTheBox} />} />
            <Route path="/contact" element={<Contact/>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
