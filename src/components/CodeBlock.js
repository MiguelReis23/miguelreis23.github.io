import React from 'react';
import './CodeBlock.css';

const CodeBlock = ({ children, language }) => {
  return (
    <div className="code-block-container">
      <pre className={`language-${language}`}>
        <code>{children}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
