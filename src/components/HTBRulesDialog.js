import React from 'react';
import './HTBRulesDialog.css';
import { FaLock } from 'react-icons/fa';

const HTBRulesDialog = ({ onClose }) => {
  // Handle click outside modal
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

return (
    <div className="htb-rules-overlay" onClick={handleOverlayClick}>
        <div className="htb-rules-container">
            <div className="htb-rules-icon"><FaLock/> </div>
            <h2>HackTheBox Community Rules</h2>
            <p>
                Per <strong><a href="https://app.hackthebox.com/rules#:~:text=6.%20Content,the%20ToS." target="_blank" rel="noopener noreferrer">HackTheBox Community Guidelines</a></strong>, walkthroughs for currently active machines 
                cannot be shared publicly. For hints and tips, please refer to the <a href="https://forum.hackthebox.com/" target="_blank" rel="noopener noreferrer"> official HackTheBox forums</a> or the <a href="https://discord.gg/hackthebox" target="_blank" rel="noopener noreferrer">HackTheBox Discord</a>.
            </p>
            <p className="htb-rules-note">
                Walkthroughs will be available once the machine retires! 📚
            </p>
            <button onClick={onClose} className="close-button">
                Got it!
            </button>
        </div>
    </div>
);
};

export default HTBRulesDialog;
