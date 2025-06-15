import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FaArrowLeft, FaBookOpen, FaSpinner } from 'react-icons/fa';
import './Walkthrough.css';

const Walkthrough = ({ walkthroughPath, onClose }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadWalkthrough = async () => {
      try {
        setLoading(true);
        
        const response = await fetch(`/data/docs/walkthroughs/${walkthroughPath}`);
        if (!response.ok) {
          throw new Error('Walkthrough not found');
        }
        const text = await response.text();
        setContent(text);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (walkthroughPath) {
      loadWalkthrough();
    }
  }, [walkthroughPath]);

  if (loading) {
    return (
      <div className="walkthrough-overlay">
        <div className="walkthrough-container">
          <div className="walkthrough-header">
            <button className="back-button" onClick={onClose}>
              <FaArrowLeft /> Back
            </button>
            <h2><FaBookOpen /> Loading Walkthrough...</h2>
          </div>
          <div className="walkthrough-loading">
            <FaSpinner className="spinner" />
            <p>Loading walkthrough content...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="walkthrough-overlay">
        <div className="walkthrough-container">
          <div className="walkthrough-header">
            <button className="back-button" onClick={onClose}>
              <FaArrowLeft /> Back
            </button>
            <h2><FaBookOpen /> Walkthrough</h2>
          </div>
          <div className="walkthrough-error">
            <p>Error loading walkthrough: {error}</p>
            <p>Walkthrough coming soon!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="walkthrough-overlay">
      <div className="walkthrough-container">
        <div className="walkthrough-header">
          <button className="back-button" onClick={onClose}>
            <FaArrowLeft /> Back
          </button>
          <h2><FaBookOpen /> Walkthrough</h2>
        </div>
        <div className="walkthrough-content">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({node, inline, className, children, ...props}) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <pre className="code-block">
                    <code className={className} {...props}>
                      {children}
                    </code>
                  </pre>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              }
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default Walkthrough;
