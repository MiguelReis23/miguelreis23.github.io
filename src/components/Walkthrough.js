import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FaArrowLeft, FaBookOpen, FaSpinner } from 'react-icons/fa';
import './Walkthrough.css';

const Walkthrough = ({ walkthroughPath, onClose }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Handle click outside modal
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const loadWalkthrough = async () => {
      try {
        setLoading(true);
        
        // Extract walkthrough folder name from path (e.g., "UnderPass/UnderPass.md" -> "UnderPass")
        const walkthroughFolder = walkthroughPath.split('/')[0];
        
        const response = await fetch(`/data/docs/walkthroughs/${walkthroughPath}`);
        if (!response.ok) {
          throw new Error('Walkthrough not found');
        }
        const text = await response.text();
        
        // Convert Obsidian syntax to standard markdown
        let processedContent = text
          // Convert Obsidian image syntax ![[image.png]] to ![](image.png)
          .replace(/!\[\[(.*?)\]\]/g, (match, imagePath) => {
            // If it's already a full path, use as is
            if (imagePath.startsWith('/') || imagePath.startsWith('http')) {
              return `![](${imagePath})`;
            }
            // URL encode the image path to handle spaces and special characters
            const encodedImagePath = encodeURIComponent(imagePath);
            // Images are in the same folder as the markdown file
            return `![](/data/docs/walkthroughs/${walkthroughFolder}/${encodedImagePath})`;
          })
          // Add double line breaks for better spacing
          .replace(/\n\n/g, '\n\n\n')
          // Ensure proper spacing around headings
          .replace(/\n(#{1,6}\s)/g, '\n\n$1');
        
        setContent(processedContent);
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
      <div className="walkthrough-overlay" onClick={handleOverlayClick}>
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
      <div className="walkthrough-overlay" onClick={handleOverlayClick}>
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
    <div className="walkthrough-overlay" onClick={handleOverlayClick}>
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
            rehypePlugins={[]}
            skipHtml={false}
            components={{
              // Handle line breaks better
              p({node, children, ...props}) {
                return <p style={{marginBottom: '1.5rem'}} {...props}>{children}</p>;
              },
              // Handle code blocks
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
              },
              // Handle headings with better spacing
              h1({node, children, ...props}) {
                return <h1 style={{marginTop: '2.5rem', marginBottom: '1.5rem'}} {...props}>{children}</h1>;
              },
              h2({node, children, ...props}) {
                return <h2 style={{marginTop: '2rem', marginBottom: '1rem'}} {...props}>{children}</h2>;
              },
              h3({node, children, ...props}) {
                return <h3 style={{marginTop: '1.5rem', marginBottom: '1rem'}} {...props}>{children}</h3>;
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
