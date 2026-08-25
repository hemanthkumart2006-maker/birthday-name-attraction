import React, { useState } from 'react';
import { soundEffects } from '../utils/soundEffects';

const CinematicIntro = ({ onYes }) => {
  const [view, setView] = useState('ask'); // 'ask' | 'rejected'
  const [isFadingOut, setIsFadingOut] = useState(false);

  const handleYes = (e) => {
    e.stopPropagation();
    soundEffects.playClick();
    setIsFadingOut(true);
    setTimeout(() => {
      onYes();
    }, 800);
  };

  const handleNo = (e) => {
    e.stopPropagation();
    soundEffects.playClick();
    setView('rejected');
  };

  const handleGoBack = (e) => {
    e.stopPropagation();
    soundEffects.playClick();
    setView('ask');
  };

  return (
    <div className={`pure-black-intro-screen ${isFadingOut ? 'fade-out' : 'fade-in'}`}>
      <div className="black-intro-center-box">
        {view === 'ask' ? (
          <div className="intro-prompt-view fade-in-content">
            <h1 className="black-intro-title">
              I MADE SOMETHING SPECIAL FOR YOU.
            </h1>
            <p className="black-intro-subtitle">
              Do you want to see it?
            </p>
            <div className="black-intro-button-row">
              <button 
                className="black-intro-btn yes-btn" 
                onClick={handleYes}
                aria-label="Yes, see birthday surprise"
              >
                YES
              </button>
              <button 
                className="black-intro-btn no-btn" 
                onClick={handleNo}
                aria-label="No"
              >
                NO
              </button>
            </div>
          </div>
        ) : (
          <div className="intro-prompt-view fade-in-content">
            <h2 className="black-intro-persuade-title">
              Please see it.
            </h2>
            <p className="black-intro-persuade-sub">
              I made this especially for you.
            </p>
            <div className="black-intro-button-row">
              <button 
                className="black-intro-btn back-btn" 
                onClick={handleGoBack}
                aria-label="Go back to the question"
              >
                GO BACK
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CinematicIntro;
