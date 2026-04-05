import React from 'react';
import { motion } from 'framer-motion';
import './Certifications.css';


import joyOfComputingImg from '../assets/joyOfComputing.png';

const certifications = [
  {
    title: 'Joy of Computing Using Python – NPTEL',
    image: joyOfComputingImg,
    link: '/Joy_of_Computing(NPTEL).pdf'
  }
];

const Certifications = () => {
  return (
    <section id="certifications" className="section container">

      <h2 className="section-title">
        <span>My</span> <span className="gradient-text">Certifications</span>
      </h2>

      <div className="cert-list">

        {certifications.map((cert, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="cert-card glass-card"
          >

            <div className="cert-info">
              <h3 className="cert-title">{cert.title}</h3>

              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                View Certificate
              </a>
            </div>

            <img
              src={cert.image}
              alt={cert.title}
              className="cert-image"
            />

          </motion.div>
        ))}

      </div>
    </section>
  );
};

export default Certifications;