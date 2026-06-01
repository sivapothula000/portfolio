import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';
import { ExternalLink } from 'lucide-react';
import './ProjectCard.css'

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();
  const images = project.images?.length ? project.images : project.image ? [project.image] : [];

  const [currentImage, setCurrentImage] = useState(0);
  const hasMultipleImages = images.length > 1;

  useEffect(() => {
    if (!images.length || !hasMultipleImages) return undefined;

    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 2200);

    return () => clearInterval(timer);
  }, [images.length, hasMultipleImages]);

  const prevImage = (e) => {
    e.stopPropagation();
    if (!hasMultipleImages) return;

    setCurrentImage((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const nextImage = (e) => {
    e.stopPropagation();
    if (!hasMultipleImages) return;

    setCurrentImage((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div
      className="project-card glass-card"
      onClick={() => navigate(`/projects/${project.slug}`)}
    >
      <div className="project-image-wrapper">
        <div
          className="slider-track"
          style={{ transform: `translateX(-${currentImage * 100}%)` }}
        >
          {images.map((img, index) => (
            <div className="slide-item" key={index}>
              <img
                src={img}
                alt={`${project.title}-${index}`}
                className="project-image"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {hasMultipleImages && (
          <>
            <button
              className="gallery-arrow left"
              onClick={prevImage}
            >
              ❮
            </button>

            <button
              className="gallery-arrow right"
              onClick={nextImage}
            >
              ❯
            </button>

            <div className="image-indicators">
              {images.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className={`indicator-dot ${currentImage === index ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImage(index);
                  }}
                />
              ))}
            </div>
          </>
        )}
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