import React, { useState, useEffect } from 'react';
import { soundEffects } from '../utils/soundEffects';

const SecretFinalEnding = ({ endingConfig = {}, recipientName, signature, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    soundEffects.playEmotionalChime();

    // Sequence timings (cinematic, respectful, emotional pacing)
    const sequence = [
      { step: 1, delay: 1000 },  // "YOU FOUND THE LAST SECRET."
      { step: 2, delay: 4200 },  // "I didn't put this anywhere else..."
      { step: 3, delay: 7800 },  // "Thank you for being part of my life."
      { step: 4, delay: 11500 }, // "Happy Birthday. ❤️"
      { step: 5, delay: 15200 }, // "Always remember how special you are."
      { step: 6, delay: 19000 }, // "— With Love" & Signature
    ];

    const timeouts = sequence.map(({ step, delay }) =>
      setTimeout(() => {
        setCurrentStep(step);
        if (step === 4) {
          soundEffects.playEmotionalChime();
        }
      }, delay)
    );

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, []);

  const handleCloseClick = () => {
    soundEffects.playClick();
    if (onClose) onClose();
  };

  const targetRecipient = recipientName || "Hemanth";
  const targetSignature = signature || endingConfig.signature || "Your Friend";

  return (
    <div className="secret-final-overlay">
      {/* Soft celestial background with slow drifting stardust */}
      <div className="secret-final-stardust-bg" />
      <div className="secret-final-vignette" />

      {/* Gentle ambient stars */}
      <div className="secret-ambient-constellation">
        {Array.from({ length: 35 }).map((_, i) => (
          <span
            key={i}
            className="secret-soft-star"
            style={{
              left: `${(i * 37) % 96 + 2}%`,
              top: `${(i * 53) % 94 + 3}%`,
              animationDelay: `${(i % 7) * 0.8}s`,
              transform: `scale(${0.6 + (i % 5) * 0.2})`
            }}
          />
        ))}
      </div>

      <div className="secret-final-content-box">
        {currentStep >= 1 && (
          <div className="secret-line-wrapper step-1">
            <span className="secret-final-kicker">✦ THE ULTIMATE KEEPSAKE ✦</span>
            <h2 className="secret-final-heading">YOU FOUND THE LAST SECRET.</h2>
          </div>
        )}

        {currentStep >= 2 && (
          <p className="secret-final-prose step-2">
            I didn't put this anywhere else...
          </p>
        )}

        {currentStep >= 3 && (
          <p className="secret-final-prose step-3">
            Thank you for being part of my life.
          </p>
        )}

        {currentStep >= 4 && (
          <div className="secret-final-birthday-wrap step-4">
            <h1 className="secret-final-hbd">Happy Birthday. ❤️</h1>
            <h3 className="secret-final-name">{targetRecipient}</h3>
          </div>
        )}

        {currentStep >= 5 && (
          <p className="secret-final-prose special-prose step-5">
            Always remember how special you are.
          </p>
        )}

        {currentStep >= 6 && (
          <div className="secret-final-closing-block step-6">
            <div className="secret-closing-separator" />
            <span className="secret-closing-text">{endingConfig.closing || "— With Love"}</span>
            <span className="secret-closing-author">{targetSignature}</span>

            <div className="secret-return-row">
              <button className="secret-return-btn" onClick={handleCloseClick}>
                Back to Archive ✦
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SecretFinalEnding;
