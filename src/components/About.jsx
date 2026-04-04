import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Target, BookOpen } from 'lucide-react';
import './About.css';

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  };

  return (
    <section id="about" className="section container">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="section-title"
      >
        <span>About</span> <span className="gradient-text">Me</span>
      </motion.h2>

      <div className="about-grid">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="about-text-content"
        >
          <p>
            I am a B.Tech Computer Science student with a deep passion for building intuitive, 
            high-performing web applications and exploring the frontiers of Artificial Intelligence. 
            My journey in tech is driven by curiosity and the desire to create software that 
            solves real-world problems.
          </p>
          <p>
            When I'm not coding, you can find me diving into machine learning research, 
            participating in hackathons, or continuously learning new modern frameworks. 
            My goal is to craft digital experiences that leave a lasting impact.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="about-cards"
        >
          <motion.div variants={itemVariants} className="glass-card bento-card">
            <div className="bento-icon"><GraduationCap size={28} /></div>
            <h3>Education</h3>
            <p className="bento-highlight">B.Tech in Computer Science</p>
            <p className="bento-sub">2024 - Present</p>
            <br></br>
            <p className="bento-highlight">Diploma in Electrical and Electronics Engineering</p>
            <p className="bento-sub">2021 - 2024</p>
          </motion.div>

          <motion.div variants={itemVariants} className="glass-card bento-card">
            <div className="bento-icon"><Target size={28} /></div>
            <h3>Career Goals</h3>
            <p className="bento-highlight">Senior Full Stack Engineer</p>
            <p className="bento-sub">Innovative Tech Companies</p>
          </motion.div>

          <motion.div variants={itemVariants} className="glass-card bento-card">
            <div className="bento-icon"><Briefcase size={28} /></div>
            <h3>Experience</h3>
            <p className="bento-highlight">Internships & Hackathons</p>
            <p className="bento-sub">Hands-on application development</p>
          </motion.div>

          <motion.div variants={itemVariants} className="glass-card bento-card">
            <div className="bento-icon"><BookOpen size={28} /></div>
            <h3>Interests</h3>
            <p className="bento-highlight">Artificial Intelligence</p>
            <p className="bento-sub">Machine Learning & Web3</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
