import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiCodechef, SiLeetcode } from 'react-icons/si';
import './Hero.css';
import { Link } from 'react-scroll';
import heroImg from '../assets/hero2.png';

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
            <a href="mailto:sivapothula0654@gmail.com" className="social-icon">
              <Mail size={24} />
            </a>
            <a href="https://www.codechef.com/users/sivapothula000" target="_blank" rel="noreferrer" className="social-icon">
              <SiCodechef size={24} />
            </a>
            <a href="https://leetcode.com/sivapothula000" target="_blank" rel="noreferrer" className="social-icon">
              <SiLeetcode size={24} />
            </a>
          </motion.div>
        </div>

        {/* Profile Image */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="hero-visual"
        >
          <div className="profile-img-container">
            <img src={heroImg} alt="siva" className="profile-img" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
