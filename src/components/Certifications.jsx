import React from 'react';
import { motion } from 'framer-motion';
import './Certifications.css';


import joyOfComputingImg from '../assets/joyOfComputing.webp';
import humanComputerInteractionImg from '../assets/humanComputerInteraction.webp';
import cloudComputingImg from '../assets/cloudComputing.webp';
import largeLanguageModelImg from '../assets/largeLanguageModel.webp';
import dataStructuresImg from '../assets/dataStructuresAndAlgorithms.webp';
import gitImg from '../assets/github.webp';
import practiceJavaImg from '../assets/practiceJava.webp';
import practicePythonImg from '../assets/practicePython.webp';
const certifications = [
  {
    title: 'Joy of Computing Using Python – NPTEL',
    image: joyOfComputingImg,
    link: '/Joy_of_Computing(NPTEL).pdf'
  },
   {
    title: 'Cloud Computing – NPTEL',
    image: cloudComputingImg,
    link: '/Cloud_Computing(NPTEL).pdf'
  },
  {
    title: 'Introduction to Large Language Model(LLMs) – NPTEL',
    image: largeLanguageModelImg,
    link: '/Introduction_to_Large_Language_Models(NPTEL).pdf'
  },{
    title: 'Human Computer Interaction – NPTEL',
    image: humanComputerInteractionImg,
    link: '/Human_Computer_Interaction(NPTEL).pdf'
  },{
    title: 'Data Structures and Algorithms using Java – NPTEL',
    image: dataStructuresImg,
    link: '/Data_Structure_and_Algorithms_using_Java(NPTEL).pdf'
  },{
    title: 'Git/GitHub – CodeChef',
    image: gitImg,
    link: '/GitHub(CodeChef).pdf'
  },{
    title: 'Practice Java – CodeChef',
    image: practiceJavaImg,
    link: '/Practice_Java(CodeChef).pdf'
  },{
    title: 'Practice Python – CodeChef',
    image: practicePythonImg,
    link: '/Practice_Python(CodeChef).pdf'
  },
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

      </div><br></br>
       
    </section>
  );
};

export default Certifications;