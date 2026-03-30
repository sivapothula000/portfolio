import React from 'react';
import { motion } from 'framer-motion';
import { Award, Calendar } from 'lucide-react';
import './Certifications.css';

const certificationsList = [
  {
    title: 'Git/Github',
    issuer: 'CodeChef',
    date: 'Feb 2026',
    description: 'Learned the basics of Git and Github'
  },
  {
    title: 'Generative AI by Google Cloud',
    issuer: 'L4G',
    date: 'Nov 2024',
    description: 'Gained the Generative AI skills and knowledge'
  },
  {
    title: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    date: 'January 2024',
    description: 'Validated overall understanding of the AWS Cloud platform, covering security and architecture.'
  },
  {
    title: 'Full Stack Web Development Certification',
    issuer: 'Coursera / Meta',
    date: 'August 2023',
    description: 'Completed comprehensive coursework in React, Node.js, and database management.'
  }
];

const Certifications = () => {
  return (
    <section id="certifications" className="section container">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="section-title"
      >
        <span>Certifications &</span> <span className="gradient-text">Achievements</span>
      </motion.h2>

      <div className="timeline">
        {certificationsList.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="timeline-item"
          >
            <div className="timeline-dot"></div>
            <div className="timeline-content glass-card">
              <div className="timeline-header">
                <h3 className="timeline-title">{item.title}</h3>
                <span className="timeline-date">
                  <Calendar size={14} /> {item.date}
                </span>
              </div>
              <p className="timeline-issuer"><Award size={16} className="issuer-icon" /> {item.issuer}</p>
              <p className="timeline-desc">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Certifications;
