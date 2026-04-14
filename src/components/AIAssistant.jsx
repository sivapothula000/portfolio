import React, { useState } from 'react';
import { MessageCircle, X, Sparkles } from 'lucide-react';
import './AIAssistant.css';

const SivaAI = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleIconClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating AI Icon */}
      <div className="siva-ai-icon" onClick={handleIconClick} title="Chat with Siva AI">
        <Sparkles size={24} />
      </div>

      {/* Modal/Message */}
      {isOpen && (
        <div className="siva-ai-modal-overlay">
          <div className="siva-ai-modal">
            <div className="siva-ai-modal-header">
              <div className="siva-ai-modal-title">
                <Sparkles size={20} />
                <span>Siva AI Assistant</span>
              </div>
              <button className="siva-ai-close-btn" onClick={handleClose}>
                <X size={20} />
              </button>
            </div>
            
            <div className="siva-ai-modal-content">
              <div className="siva-ai-message updating-message">
                <div className="loading-spinner"></div>
                <p>🚀 This feature is in <strong>updating stage</strong></p>
                <p className="sub-text">The AI assistant will soon be able to answer all your questions about me!</p>
              </div>
            </div>

            <div className="siva-ai-modal-footer">
              <button className="close-btn" onClick={handleClose}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SivaAI;
