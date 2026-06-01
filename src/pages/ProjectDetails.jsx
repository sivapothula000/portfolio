import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';
import { ExternalLink, ArrowLeft } from 'lucide-react';
import './ProjectDetails.css';

// Import your projectsData
import { projectsData } from '../data/projectsData';

const ProjectDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const project = projectsData.find((item) => item.slug === slug);
  const imageList = project?.images?.length ? project.images : project?.image ? [project.image] : [];
  const [currentImage, setCurrentImage] = useState(0);
  const hasMultipleImages = imageList.length > 1;

  // Scroll to top when component mounts or slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (!hasMultipleImages) return undefined;

    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % imageList.length);
    }, 3200);

    return () => clearInterval(timer);
  }, [imageList.length, hasMultipleImages]);

  if (!project) {
    return (
      <div className="project-not-found">
        <h2>Project Not Found</h2>
      </div>
    );
  }

  return (
    <section className="project-details-page">
      <div className="container">
        <button
          className="back-btn"
          onClick={() => navigate({ pathname: '/', hash: '#projects' })}
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="details-gallery-panel glass-card">
          {imageList.length > 0 && (
            <div className="project-gallery">
              <div className="details-gallery-slider">
                <div
                  className="slider-track"
                  style={{ transform: `translateX(-${currentImage * 100}%)` }}
                >
                  {imageList.map((img, index) => (
                    <div className="slide-item" key={index}>
                      <img src={img} alt={`${project.title}-slide-${index}`} />
                    </div>
                  ))}
                </div>

                {hasMultipleImages && (
                  <>
                    <button
                      className="gallery-arrow left"
                      onClick={() => setCurrentImage((prev) => (prev === 0 ? imageList.length - 1 : prev - 1))}
                      type="button"
                    >
                      ❮
                    </button>
                    <button
                      className="gallery-arrow right"
                      onClick={() => setCurrentImage((prev) => (prev === imageList.length - 1 ? 0 : prev + 1))}
                      type="button"
                    >
                      ❯
                    </button>

                    <div className="image-indicators details-indicators">
                      {imageList.map((_, index) => (
                        <button
                          key={index}
                          type="button"
                          className={`indicator-dot ${currentImage === index ? 'active' : ''}`}
                          onClick={() => setCurrentImage(index)}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="details-summary-panel glass-card">
          <p className="eyebrow">Featured Project</p>
          <h1 className="project-main-title">{project.title}</h1>
          <p className="project-subtitle">{project.shortDescription}</p>

          <div className="project-meta">
            <span>{imageList.length} images</span>
            <span>{project.tech.length} technologies</span>
          </div>

          <div className="project-links">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline"
              >
                <FaGithub /> GitHub
              </a>
            )}
            {project.demo ? (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
              >
                <ExternalLink /> Live Demo
              </a>
            ) : (
              <button className="btn btn-primary disabled" disabled>
                Demo Unavailable
              </button>
            )}
          </div>

          <div className="tech-stack detail-tech-stack">
            {project.tech.map((tech) => (
              <span key={tech} className="tech-badge">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="details-grid">
          <div className="details-card glass-card">
            <h2>Project Overview</h2>
            <p>{project.fullDescription}</p>
          </div>

          {project.features?.length > 0 && (
            <div className="details-card glass-card">
              <h2>Key Features</h2>
              <ul>
                {project.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectDetails;