import React from 'react';
import { motion } from 'framer-motion';
import './Projects.css';
import ProjectCard from './ProjectCard';
import { projectsData } from '../data/projectsData';

const Projects = () => {
  return (
    <section id="projects" className="section container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="projects-header"
      >
        <h2 className="section-title">
          <span>Featured</span> <span className="gradient-text">Projects</span>
        </h2>
        <p className="projects-subtitle">Some of my recent work bridging frontend and AI</p>
      </motion.div>

      <div className="projects-grid">
        {projectsData.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;
