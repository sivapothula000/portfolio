import React from 'react';
import { motion } from 'framer-motion';
import './Skills.css';

import javaLogo from '../assets/skills/java.webp';
import javascriptLogo from '../assets/skills/javascript.webp';
import reactLogo from '../assets/skills/react.webp';
import nodeLogo from '../assets/skills/node.webp';
import pythonLogo from '../assets/skills/python.webp';
import fastapiLogo from '../assets/skills/fastapi.webp';
import mysqlLogo from '../assets/skills/mysql.webp';
import mongodbLogo from '../assets/skills/mongodb.webp';
import gitLogo from '../assets/skills/git.webp';
import agenticAILogo from '../assets/skills/agenticAi.webp';
import machineLearningLogo from '../assets/skills/machine_learning.webp';
import tailwindLogo from '../assets/skills/tailwind.webp';
import githubLogo from '../assets/skills/github.webp';
import langchainLogo from '../assets/skills/langchain.webp';
import promptLogo from '../assets/skills/prompt.webp';

import genAILogo from '../assets/generative_AI.webp';
import dsAlgoLogo from '../assets/dataStructuresAndAlgorithms.webp';
import practicePythonLogo from '../assets/practicePython.webp';

const skillCategories = [
  {
    title: 'Programming Languages',
    subtitle: 'Type-safe, expressive, and industry-proven languages powering modern apps.',
    items: [
      { name: 'Java', logo: javaLogo },
      { name: 'JavaScript', logo: javascriptLogo },
      { name: 'Python', logo: pythonLogo },
    ],
  },
  {
    title: 'AI & Machine Learning',
    subtitle: 'Next-generation intelligence for data, automation, and generative workflows.',
    items: [
      { name: 'Machine Learning', logo: machineLearningLogo },
      { name: 'Deep Learning', logo: genAILogo },
      
      { name: 'Agentic AI', logo: agenticAILogo },
      { name: 'RAG', logo: machineLearningLogo },
      { name: 'LangChain', logo: langchainLogo },
      
      { name: 'Prompt Engineering', logo: promptLogo },
    ],
  },
  {
    title: 'Frontend Development',
    subtitle: 'Modern UI engines built for fast, interactive user interfaces.',
    items: [
      { name: 'React', logo: reactLogo },
      { name: 'JavaScript', logo: javascriptLogo },
      { name: 'TailwindCSS', logo: tailwindLogo }
    ],
  },
  {
    title: 'Backend Development',
    subtitle: 'API-first platforms designed for reliability, speed, and scale.',
    items: [
      { name: 'Node.js', logo: nodeLogo },
      { name: 'FastAPI', logo: fastapiLogo },
      { name: 'Python', logo: pythonLogo },
    ],
  },
  {
    title: 'Databases',
    subtitle: 'High-performance engines for transactional and document-driven data.',
    items: [
      { name: 'MySQL', logo: mysqlLogo },
      { name: 'MongoDB', logo: mongodbLogo },
    ],
  },
  
  {
    title: 'Tools & Platforms',
    subtitle: 'Collaboration, version control, and cloud-native deployment workflows.',
    items: [
      { name: 'Git', logo: gitLogo },
      { name: 'GitHub', logo: githubLogo },
      
    ],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="section container">
      <div className="skills-headline">
        <p className="skills-eyebrow">Skills & Technologies</p>
        <h2 className="section-title">Skills & Technologies</h2>
        <p className="section-subtitle skills-intro">
          A premium toolkit for building modern web applications, scalable APIs, and AI-first products with elegant execution.
        </p>
      </div>

      <div className="skill-categories">
        {skillCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 0.55, delay: categoryIndex * 0.08 }}
            className="skill-category"
          >
            <div className="category-header">
              <div>
                <p className="category-label">{category.title}</p>
                <p className="category-copy">{category.subtitle}</p>
              </div>
              <span className="category-count">{category.items.length} skills</span>
            </div>

            <div className="category-grid">
              {category.items.map((skill) => (
                <motion.div
                  key={`${category.title}-${skill.name}`}
                  className="skill-card"
                  whileHover={{ y: -12, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                >
                  <div className="skill-logo-wrap">
                    <img src={skill.logo} alt={`${skill.name} logo`} className="skill-logo" />
                  </div>
                  <p className="skill-name">{skill.name}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
};

export default Skills;