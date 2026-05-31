import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, FileText, Mail, MapPin } from 'lucide-react';
import { FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import './Contact.css';
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const whatsAppMessage = encodeURIComponent(`
Hi Siva,

Name: ${formData.name}
Email: ${formData.email}

Message:
${formData.message}
`);

const whatsAppUrl =
  `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}?text=${whatsAppMessage}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setIsSubmitting(false);
          setFormData({ name: "", email: "", message: "" });
          alert("Message sent successfully!");
        },
        (error) => {
          setIsSubmitting(false);
          alert("Failed to send message");
          console.log(error);
        }
      );
  };

  return (
    <section id="contact" className="section container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="contact-header"
      >
        <h2 className="section-title">
          <span>Get in</span> <span className="gradient-text">Touch</span>
        </h2>
        <p className="contact-subtitle">Let's build something amazing together.</p>
      </motion.div>

      <div className="contact-container">
        {/* Contact Info & Resume */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="contact-info"
        >
          <div className="glass-card contact-card">
            <h3 className="card-title">Contact Information</h3>
            <p className="card-desc">Feel free to reach out for collaborations, opportunities, or just a tech chat!</p>

            <ul className="info-list">
              <li>
                <div className="info-icon"><Mail size={20} /></div>
                <span>sivapothula0654@gmail.com</span>
              </li>
              <li>
                <div className="info-icon"><MapPin size={20} /></div>
                <span>India</span>
              </li>
            </ul>

            <div className="social-links">
              <a href="https://github.com/sivapothula000" target="_blank" rel="noreferrer" className="social-btn">
                <FaGithub size={20} />
              </a>
              <a href="https://www.linkedin.com/in/pothula-siva-anand/" target="_blank" rel="noreferrer" className="social-btn">
                <FaLinkedin size={20} />
              </a>
            </div>

            <div className="resume-section">
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-secondary resume-btn">
                👁  View Resume
              </a>
              <br></br>
              <br></br>
              <a href="/resume.pdf" download className="btn btn-primary resume-btn">
                <FileText size={18} /> Download Resume
              </a>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="contact-form-wrapper"
        >
          <form className="glass-card contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                className="form-control glass"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                className="form-control glass"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                rows="5"
                className="form-control glass"
                placeholder="How can I help you?"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              ></textarea>
            </div>

            <div className="contact-actions">
              <button type="submit" className="btn btn-primary submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : <><Send size={18} /> Send Message</>}
              </button>

              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary submit-btn"
              >
                <FaWhatsapp size={18} />
                WhatsApp Me
              </a>
            </div>
          </form>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Siva Anand. Built with React & Vite.</p>
      </footer>
    </section>
  );
};

export default Contact;
