import React from 'react';
import './HTBRulesDialog.css';
import { FaLock } from 'react-icons/fa';

const HTBRulesDialog = ({ onClose }) => {
return (
    <div className="htb-rules-overlay">
        <div className="htb-rules-container">
            <div className="htb-rules-icon"><FaLock/> </div>
            <h2>HackTheBox Community Rules</h2>
            <p>
                Per <strong><a href="https://app.hackthebox.com/rules#:~:text=6.%20Content,the%20ToS." target="_blank" rel="noopener noreferrer">HackTheBox Community Guidelines</a></strong>, walkthroughs for currently active machines 
                cannot be shared publicly. This ensures fair competition and maintains the educational value 
                for all users.
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
