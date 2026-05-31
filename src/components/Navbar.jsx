import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const navLinks = [
  { name: 'Home', to: 'home' },
  { name: 'About', to: 'about' },
  { name: 'Skills', to: 'skills' },
  { name: 'Projects', to: 'projects' },
  { name: 'Certifications', to: 'certifications' },
  { name: 'Contact', to: 'contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? 'scrolled glass' : ''}`}>
      <div className="nav-container container">
        <div className="logo">
          <Link to="home" smooth={true} duration={500} className="logo-link">
            Siva<span className="gradient-text">Anand</span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <nav className="desktop-menu">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              smooth={true}
              duration={500}
              offset={-90}
              spy={true}
              activeClass="active-link"
              className="nav-item"
            >
              {item.name}
            </Link>
          ))}
          <a href="#contact" className="btn btn-primary nav-cta">Hire Me</a>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="mobile-toggle" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu glass ${isOpen ? 'open' : ''}`}>
        <nav className="mobile-nav">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              smooth={true}
              duration={500}
              offset={-90}
              onClick={() => setIsOpen(false)}
              className="mobile-nav-item"
            >
              {item.name}
            </Link>
          ))}
          <a href="#contact" className="btn btn-primary" onClick={() => setIsOpen(false)}>Hire Me</a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
