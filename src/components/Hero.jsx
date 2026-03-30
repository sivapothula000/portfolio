import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import './Hero.css';
import { Link } from 'react-scroll';

const Hero = () => {
  return (
    <section id="home" className="hero-section">
      {/* Animated BG Blobs */}
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      <div className="blob blob-3"></div>

      <div className="container hero-container">
        <div className="hero-content">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-badge"
          >
            <span className="pulse-dot"></span> Available for new opportunities
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-title"
          >
            Hi, I'm <span className="gradient-text">Siva Anand</span>
          </motion.h1>

          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hero-subtitle"
          >
            Full Stack Developer <span className="separator">|</span> AI Enthusiast
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="hero-description"
          >
            I build modern, interactive, and high-performance web applications. 
            Passionate about bridging the gap between cutting-edge AI technologies and seamless user experiences.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="hero-actions"
          >
            <Link to="projects" smooth={true} duration={500} offset={-80} className="btn btn-primary hero-btn">
              View Projects <ArrowRight size={18} />
            </Link>
            <Link to="contact" smooth={true} duration={500} offset={-80} className="btn btn-secondary hero-btn">
              Contact Me
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="hero-socials"
          >
            <a href="https://github.com" target="_blank" rel="noreferrer" className="social-icon">
              <FaGithub size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-icon">
              <FaLinkedin size={24} />
            </a>
            <a href="mailto:siva@example.com" className="social-icon">
              <Mail size={24} />
            </a>
          </motion.div>
        </div>

        {/* Optional Code visual or abstract shape */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="hero-visual"
        >
          <div className="glass-card hero-code-card">
            <div className="card-header">
              <div className="dot red"></div>
              <div className="dot yellow"></div>
              <div className="dot green"></div>
            </div>
            <pre>
              <code>
<span className="code-keyword">const</span> <span className="code-var">developer</span> = {'{'}
<br/>  <span className="code-prop">name</span>: <span className="code-string">'Siva Anand'</span>,
<br/>  <span className="code-prop">skills</span>: [<span className="code-string">'React'</span>, <span className="code-string">'Node.js'</span>, <span className="code-string">'Python'</span>],
<br/>  <span className="code-prop">passions</span>: [<span className="code-string">'Machine Learning'</span>, <span className="code-string">'Web Dev'</span>],
<br/>  <span className="code-prop">isAvailable</span>: <span className="code-keyword">true</span>
<br/>{'}'};
              </code>
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
