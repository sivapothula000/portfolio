import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';
import { ExternalLink } from 'lucide-react';
import './ProjectCard.css'

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();
  const images = project.images?.length ? project.images : project.image ? [project.image] : [];
  const coverImage = images.length ? images[0] : '';

  return (
    <div
      className="project-card glass-card"
      onClick={() => navigate(`/projects/${project.slug}`)}
    >
      <div className="project-image-wrapper">
        <div className="slide-item">
          <img
            src={coverImage}
            alt={`${project.title}-cover`}
            className="project-image"
            loading="lazy"
          />
        </div>
      </div>

      <div className="project-content">
        <h3 className="project-title">{project.title}</h3>

        <p className="project-desc">{project.shortDescription}</p>

        <div className="project-tech-stack">
          {project.tech.map((tech) => (
            <span key={tech} className="tech-badge">
              {tech}
            </span>
          ))}
        </div>

        <div className="project-card-links">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="card-link"
            >
              <FaGithub /> GitHub
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="card-link card-link-primary"
            >
              <ExternalLink /> Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;