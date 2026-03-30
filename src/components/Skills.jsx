import React from 'react';
import { motion } from 'framer-motion';
import './Skills.css';

const skillsData = [
  { name: 'Java', level: 90, color: '#f89820' },
  { name: 'JavaScript / ES6+', level: 95, color: '#f7df1e' },
  { name: 'React', level: 90, color: '#61dafb' },
  { name: 'Node.js', level: 85, color: '#339933' },
  { name: 'Python', level: 80, color: '#3776ab' },
  { name: 'Machine Learning', level: 75, color: '#ff6f00' },
];

const Skills = () => {
  return (
    <section id="skills" className="section container">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="section-title"
      >
        <span>My</span> <span className="gradient-text">Skills</span>
      </motion.h2>

      <div className="skills-grid">
        {skillsData.map((skill, index) => (
          <motion.div 
            key={skill.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="skill-card glass"
          >
            <div className="skill-info">
              <h3 className="skill-name">{skill.name}</h3>
              <span className="skill-percentage">{skill.level}%</span>
            </div>
            <div className="progress-bg">
              <motion.div 
                className="progress-bar"
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1.5, delay: 0.2 + (index * 0.1), ease: "easeOut" }}
                style={{ backgroundColor: skill.color, boxShadow: `0 0 10px ${skill.color}` }}
              ></motion.div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Decorative floating indicators */}
      <div className="skills-decor">
        <div className="decor-circle decor-1"></div>
        <div className="decor-circle decor-2"></div>
      </div>
    </section>
  );
};

export default Skills;
