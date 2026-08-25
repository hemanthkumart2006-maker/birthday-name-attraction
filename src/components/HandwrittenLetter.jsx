import React, { useState, useEffect } from 'react';
import { soundEffects } from '../utils/soundEffects';

const HandwrittenLetter = ({ letterConfig = {}, recipientName, signature }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openLetter = () => {
    soundEffects.playOpenModal();
    setIsOpen(true);
  };

  const closeLetter = () => {
    soundEffects.playClick();
    setIsOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isOpen && e.key === 'Escape') {
        closeLetter();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const targetName = recipientName || "Hemanth";
  const authorSignature = signature || letterConfig.author || "Your Friend";

  return (
    <div className="handwritten-letter-section">
      <div className="letter-invitation-box">
        <div className="letter-envelope-icon">💌</div>
        <h3 className="letter-section-heading">A Personal Letter</h3>
        <p className="letter-section-sub">
          A few words written especially for you on your birthday.
        </p>
        <button className="open-letter-trigger-btn" onClick={openLetter}>
          ✉️ OPEN THE LETTER
        </button>
      </div>

      {isOpen && (
        <div className="letter-modal-backdrop" onClick={closeLetter}>
          <div
            className="letter-unfold-container"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <button className="letter-close-btn" onClick={closeLetter} aria-label="Close letter">
              ✕
            </button>

            <div className="letter-paper">
              {/* Paper wax stamp / ribbon decoration */}
              <div className="letter-wax-seal">
                <span>🎂</span>
              </div>

              <div className="letter-header-decor">
                <span className="letter-date-stamp">A Special Day</span>
              </div>

              <div className="letter-body-content">
                <p className="letter-salutation">Dear {targetName},</p>

                <p className="letter-paragraph">
                  I wanted to make something a little different for you this year — something that lasts longer than ordinary words.
                </p>

                <p className="letter-paragraph">
                  We've shared so many moments, big and small, and somehow those little moments become the memories we remember the most.
                </p>

                <p className="letter-paragraph">
                  I hope this year brings you genuine happiness, exciting new chapters, good health, peace of mind, and plenty of reasons to smile.
                </p>

                <p className="letter-paragraph letter-birthday-wish">
                  Happy Birthday.
                </p>

                <div className="letter-sign-off">
                  <p className="letter-closing">With love,</p>
                  <p className="letter-signature">{authorSignature}</p>
                </div>
              </div>

              <div className="letter-footer-bar">
                <button className="letter-fold-btn" onClick={closeLetter}>
                  Fold & Save Letter 💫
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HandwrittenLetter;
