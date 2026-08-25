import React, { useState, useEffect } from 'react';
import { soundEffects } from '../utils/soundEffects';

const CinematicFinale = ({ recipientName, onFinish, onCancel }) => {
  const [currentStep, setCurrentStep] = useState(0);

  // Step 0: Ambient cosmos darkens, singular celestial point emerges
  // Step 1: "One last thing..."
  // Step 2: "Thank you for being you."
  // Step 3: "HAPPY BIRTHDAY"
  // Step 4: [NAME]
  // Step 5: ❤️
  // Step 6: "MADE WITH LOVE"
  // Step 7: Complete -> triggers Mission Complete screen

  useEffect(() => {
    soundEffects.playOpenModal();

    const timings = [
      { step: 1, time: 2000 },
      { step: 2, time: 5000 },
      { step: 3, time: 8200 },
      { step: 4, time: 11000 },
      { step: 5, time: 13500 },
      { step: 6, time: 16000 },
      { step: 7, time: 19500 }
    ];

    const timeouts = timings.map(({ step, time }) =>
      setTimeout(() => {
        setCurrentStep(step);
        if (step === 3 || step === 4) {
          soundEffects.playStarChime();
        } else if (step === 5) {
          soundEffects.playCelebrationChord();
        } else if (step === 7) {
          onFinish();
        }
      }, time)
    );

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [onFinish]);

  const targetName = recipientName || "HEMANTH";

  return (
    <div className="cinematic-finale-overlay" onClick={onFinish}>
      <button
        className="finale-skip-btn"
        onClick={(e) => {
          e.stopPropagation();
          onFinish();
        }}
        aria-label="Skip finale to mission complete"
      >
        SKIP FINALE ⏩
      </button>

      {/* Central gathering stardust vortex */}
      <div className="finale-vortex-center" />
      <div className="finale-stardust-beacon" />

      <div className="finale-prose-container">
        {currentStep === 1 && (
          <h2 className="finale-line fade-in-line">One last thing...</h2>
        )}

        {currentStep === 2 && (
          <h2 className="finale-line fade-in-line">Thank you for being you.</h2>
        )}

        {currentStep === 3 && (
          <h1 className="finale-line grand-title fade-in-line">HAPPY BIRTHDAY</h1>
        )}

        {currentStep === 4 && (
          <h1 className="finale-line recipient-name-title fade-in-line">{targetName}</h1>
        )}

        {currentStep === 5 && (
          <div className="finale-heart-wrap fade-in-line">
            <span className="finale-pulsing-heart">❤️</span>
          </div>
        )}

        {currentStep >= 6 && (
          <div className="finale-credit-wrap fade-in-line">
            <span className="finale-heart-small">❤️</span>
            <h3 className="finale-credit-text">MADE WITH LOVE</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default CinematicFinale;
