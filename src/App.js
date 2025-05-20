import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import HackTheBox from './components/HackTheBox';
import Contact from './components/Contact';
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
            <Route path="/about" element={<UnderConstructionWrapper component={About} />} />
            <Route path="/skills" element={<UnderConstructionWrapper component={Skills} />} />
            <Route path="/projects" element={<UnderConstructionWrapper component={Projects} />} />
            <Route path="/htb" element={<UnderConstructionWrapper component={HackTheBox} />} />
            <Route path="/contact" element={<UnderConstructionWrapper component={Contact} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
