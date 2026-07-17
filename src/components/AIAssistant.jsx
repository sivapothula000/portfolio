import React, { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  Send,
  Sparkles,
  Trash2,
  X
} from 'lucide-react';

import './AIAssistant.css';


const WELCOME_MESSAGE = {
  id: 'welcome',
  role: 'assistant',
  content:
    "Hi! I'm Siva's AI Assistant. You can ask me about his skills, projects, education, certifications, achievements, or technical background."
};


const SUGGESTED_QUESTIONS = [
  'Tell me about Siva',
  'Explore his projects',
  'What are his strongest skills?',
  'Why should we hire him?',
  'Show his AI projects',
  'How can I contact him?'
];


const SivaAI = () => {

  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState([
    WELCOME_MESSAGE
  ]);

  const [input, setInput] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  }, [messages, isLoading]);


  const handleIconClick = () => {
    setIsOpen(true);
  };


  const handleClose = () => {
    setIsOpen(false);
  };


  const handleClearChat = () => {

    setMessages([
      WELCOME_MESSAGE
    ]);

    setInput('');
  };


  const handleSendMessage = async (customMessage = null) => {
    const messageText = (customMessage || input).trim();

    if (!messageText || isLoading) {
      return;
    }

    const userMessage = {
      id: `${Date.now()}-user`,
      role: 'user',
      content: messageText
    };

    setMessages(previousMessages => [
      ...previousMessages,
      userMessage
    ]);

    setInput('');
    setIsLoading(true);

    try {
      const apiUrl = import.meta.env.VITE_AI_API_URL;

      if (!apiUrl) {
        throw new Error(
          'VITE_AI_API_URL is not configured.'
        );
      }

      const response = await fetch(
        `${apiUrl}/api/chat`,
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({
            message: messageText
          })
        }
      );

      if (!response.ok) {
        throw new Error(
          `Chat request failed with status ${response.status}`
        );
      }

      const data = await response.json();

      const assistantMessage = {
        id: `${Date.now()}-assistant`,
        role: 'assistant',
        content: data.answer,
        actions: data.actions || []
      };

      setMessages(previousMessages => [
        ...previousMessages,
        assistantMessage
      ]);
    } catch (error) {
      console.error(
        'Siva AI request failed:',
        error
      );

      const errorMessage = {
        id: `${Date.now()}-error`,
        role: 'assistant',
        content:
          "I'm having trouble connecting to the AI assistant right now. Please try again shortly.",
        isError: true
      };

      setMessages(previousMessages => [
        ...previousMessages,
        errorMessage
      ]);
    } finally {
      setIsLoading(false);
    }
  };


  const handleKeyDown = event => {

    if (
      event.key === 'Enter'
      && !event.shiftKey
    ) {

      event.preventDefault();

      handleSendMessage();
    }
  };


  return (
    <>

      {/* Existing floating AI button */}

      <button
        className="siva-ai-icon"
        onClick={handleIconClick}
        title="Chat with Siva AI"
        aria-label="Open Siva AI Assistant"
      >
        <Sparkles size={24} />
      </button>


      {isOpen && (

        <div className="siva-ai-modal-overlay">

          <div className="siva-ai-modal">


            {/* Header */}

            <div className="siva-ai-modal-header">

              <div className="siva-ai-modal-title">

                <div className="siva-ai-header-icon">
                  <Sparkles size={20} />
                </div>

                <div>

                  <span>
                    Siva AI Assistant
                  </span>

                  <small>
                    Ask me about Siva
                  </small>

                </div>

              </div>


              <div className="siva-ai-header-actions">

                <button
                  className="siva-ai-header-btn"
                  onClick={handleClearChat}
                  title="Clear chat"
                  aria-label="Clear chat"
                >
                  <Trash2 size={18} />
                </button>


                <button
                  className="siva-ai-header-btn"
                  onClick={handleClose}
                  title="Close"
                  aria-label="Close assistant"
                >
                  <X size={20} />
                </button>

              </div>

            </div>


            {/* Messages */}

            <div className="siva-ai-chat-content">

              {messages.map(message => (

                <div
                  key={message.id}
                  className={
                    `siva-ai-chat-row ${message.role
                    }`
                  }
                >

                  <div
                    className={
                      `siva-ai-chat-message ${message.role
                      } ${message.isError
                        ? 'error'
                        : ''
                      }`
                    }
                  >
                    <div className="siva-ai-message-text">
                      {message.role === 'assistant' ? (
                        <ReactMarkdown
                          components={{
                            a: ({ ...props }) => (
                              <a
                                {...props}
                                target="_blank"
                                rel="noopener noreferrer"
                              />
                            )
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      ) : (
                        message.content
                      )}
                    </div>

                    {message.actions?.length > 0 && (
                      <div className="siva-ai-message-actions">
                        {message.actions.map(
                          (action, index) => (
                            <a
                              key={`${action.type}-${index}`}
                              href={action.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="siva-ai-action-btn"
                            >
                              {action.label}
                            </a>
                          )
                        )}
                      </div>
                    )}
                  </div>

                </div>

              ))}


              {isLoading && (

                <div className="siva-ai-chat-row assistant">

                  <div className="siva-ai-typing">

                    <span></span>
                    <span></span>
                    <span></span>

                  </div>

                </div>

              )}
              <div ref={messagesEndRef} />

            </div>


            {/* Suggested questions */}

            {messages.length === 1 && (

              <div className="siva-ai-suggestions">

                {SUGGESTED_QUESTIONS.map(
                  question => (

                    <button
                      key={question}
                      onClick={() =>
                        handleSendMessage(
                          question
                        )
                      }
                    >

                      {question}

                    </button>

                  )
                )}

              </div>

            )}


            {/* Input */}

            <div className="siva-ai-input-container">

              <textarea
                value={input}
                onChange={
                  event =>
                    setInput(
                      event.target.value
                    )
                }
                onKeyDown={handleKeyDown}
                placeholder="Ask about Siva..."
                rows="1"
                maxLength="1000"
                disabled={isLoading}
              />


              <button
                className="siva-ai-send-btn"
                onClick={() =>
                  handleSendMessage()
                }
                disabled={
                  !input.trim()
                  || isLoading
                }
                aria-label="Send message"
              >

                <Send size={19} />

              </button>

            </div>


            <div className="siva-ai-disclaimer">
              AI responses are based on Siva's verified portfolio information.
            </div>

          </div>

        </div>

      )}

    </>
  );
};


export default SivaAI;