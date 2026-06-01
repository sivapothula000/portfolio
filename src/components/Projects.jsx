import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Code } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import './Projects.css';
import travelGuardianImg from '../assets/travelguardian.webp';
import multiMlModelImg from '../assets/ml_models.png';
import ecommerceImg from '../assets/ecommerce.webp';
import stockMarketImg from '../assets/stockMarket.png';
import toDoImg from '../assets/ToDoList.png';
import weatherImg from '../assets/weather.png';
import portfolioImg from '../assets/portfolio.webp';
import pdfRagImg from '../assets/pdfRag.webp';


const projectsData = [
  {
  title: 'Portfolio Website',
  description: 'A modern developer portfolio showcasing projects, skills, certifications, and contact information. The website features smooth animations, responsive design, and interactive sections built with modern frontend technologies.',
  image: portfolioImg,
  tech: ['React', 'Framer Motion', 'CSS', 'Vite'],
  github: 'https://github.com/sivapothula000/portfolio',
  demo: 'https://portfoliosiva-two.vercel.app/'
},
  {
    title: 'ML Multi-Model System',
    description: 'Developed a Streamlit-based web application that integrates multiple machine learning models in one platform. The project includes Email Spam Detection, Handwritten Digit Classification, and House Price Prediction, allowing users to input data and get real-time predictions using trained ML models.',
    image: multiMlModelImg,
    tech: ['Python', 'Streamlit', 'Scikit-learn', 'NumPy'],
    github: 'https://github.com/sivapothula000/ML_Models.git',
    demo: 'https://siva-dl-models.streamlit.app/'
  },
  {
  title: 'PDF RAG Assistant',
  description: 'An AI-powered PDF Question Answering application built using Streamlit, FAISS, Sentence Transformers, and Google Gemini. Users can upload PDF documents and interact with them through a ChatGPT-style conversational interface. The system extracts text from PDFs, performs semantic search using vector embeddings, retrieves the most relevant content through FAISS, and generates context-aware answers using Google Gemini. The project demonstrates Retrieval-Augmented Generation (RAG), vector databases, embeddings, semantic search, and LLM integration.',
  image: pdfRagImg,
  tech: [
    'Python','Streamlit','FAISS','Sentence Transformers','Google Gemini','PyPDF','NumPy','RAG'
  ],
  github: 'https://github.com/sivapothula000/PDF_RAG_ASSISTANT.git',
  demo: 'https://siva-pdf-rag-assistant.streamlit.app/'
},
  {
  title: 'To-Do List App',
  description: 'A full-stack task management application that allows users to add, view, and delete tasks through a simple and responsive interface. The frontend is built using HTML, CSS, and JavaScript, while the backend is developed using Node.js and Express.js. Task data is stored persistently in a MySQL database, ensuring tasks remain saved even after page refresh. The application demonstrates CRUD operations and REST API communication between the client and server.',
  image: toDoImg,
  tech: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Express.js', 'MySQL'],
  github: 'https://github.com/sivapothula000/To_Do_List_User_separated_MogoDB.git',
  demo: 'https://task-manager-siva.vercel.app/login.html'
},
  {
    title: 'Weather App',
    description: 'A modern weather application that fetches real-time weather data using the OpenWeatherMap API. The app allows users to search for any city worldwide and view current temperature, weather conditions, humidity, and wind speed. Built with React and Vite, it provides a responsive and user-friendly interface with dynamic weather icons.',
    image: weatherImg,
    tech: ['React', 'JavaScript', 'Vite', 'CSS', 'OpenWeatherMap API'],
    github: 'https://github.com/sivapothula000/Weather-App.git',
    demo: 'https://weather-app-seven-bay-68.vercel.app/'
  },
  
{
    title: 'Stock Market Price Prediction',
    description: 'A machine learning application that predicts future stock prices using an LSTM neural network. The system fetches historical stock data from Yahoo Finance, preprocesses it using MinMaxScaler, and forecasts future trends with deep learning. It also includes a Tkinter GUI for selecting companies, viewing current prices, and visualizing predicted stock trends.',
    image: stockMarketImg,
    tech: ['Python', 'TensorFlow', 'Keras', 'LSTM', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib', 'Tkinter', 'Yahoo Finance API'],
    github: 'https://github.com/sivapothula000/Stock-Market-Future-Prediction.git',
    demo: null
  },
  {
    title: 'TravelGuardian AI',
    description: 'AI-powered smart tourism planning and safety platform with real-time map integration and multi-agent systems.',
    image: travelGuardianImg,
    tech: ['React', 'FastAPI', 'MongoDB', 'CrewAI'],
    github: 'https://github.com/sivapothula000/AI_TravelGuardian.git',
    demo: null
  },
   {
    title: 'E-Commerce Platform',
    description: 'A full-stack ecommerce application with a React/Vite storefront and a Node.js/Express backend. It includes user auth, product search, cart and order flows, admin product management, and payment support with Stripe and Razorpay.',
    image: ecommerceImg,
    tech: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB', 'Mongoose', 'Stripe', 'Razorpay', 'Cloudinary'],
    github: 'https://github.com/sivapothula000/E-commerce_Platform.git',
    demo: null,
  },
  {
    title: 'Machine Learning Image Classifier',
    description: 'A deep learning model specialized in identifying manufacturing defects in real-time on assembly lines.',
    image: 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?q=80&w=600&auto=format&fit=crop',
    tech: ['Python', 'TensorFlow', 'Flask', 'OpenCV'],
    github: 'https://github.com',
    demo: null
  },
 
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
                    <Code size={12} className="tech-icon" /> {tech}
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
