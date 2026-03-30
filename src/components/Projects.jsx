import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Code } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import './Projects.css';

const projectsData = [
  {
    title: 'TravelGuardian AI',
    description: 'AI-powered smart tourism planning and safety platform with real-time map integration and multi-agent systems.',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=600&auto=format&fit=crop',
    tech: ['React', 'FastAPI', 'MongoDB', 'CrewAI'],
    github: 'https://github.com',
    demo: 'https://example.com'
  },
  {
    title: 'E-Commerce Dashboard',
    description: 'A comprehensive admin dashboard for managing products, visualizing sales data, and handling user roles.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop',
    tech: ['Next.js', 'Tailwind', 'Node.js', 'PostgreSQL'],
    github: 'https://github.com',
    demo: 'https://example.com'
  },
  {
    title: 'Machine Learning Image Classifier',
    description: 'A deep learning model specialized in identifying manufacturing defects in real-time on assembly lines.',
    image: 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?q=80&w=600&auto=format&fit=crop',
    tech: ['Python', 'TensorFlow', 'Flask', 'OpenCV'],
    github: 'https://github.com',
    demo: null
  }
];

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
        {projectsData.map((project, index) => (
          <motion.div 
            key={project.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="project-card glass-card"
          >
            <div className="project-image-wrapper">
              <img src={project.image} alt={project.title} className="project-image" />
              <div className="project-overlay">
                <div className="project-links">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noreferrer" className="project-icon-btn">
                      <FaGithub size={20} />
                    </a>
                  )}
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noreferrer" className="project-icon-btn">
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
              </div>
            </div>
            
            <div className="project-content">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.description}</p>
              
              <div className="project-tech-stack">
                {project.tech.map((tech) => (
                  <span key={tech} className="tech-badge">
                    <Code size={12} className="tech-icon"/> {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
