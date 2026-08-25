import React, { useState, useEffect } from 'react';
import { soundEffects } from '../utils/soundEffects';

const InteractiveMoon = ({ moonConfig = {}, onMoonExplored }) => {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
    soundEffects.playStarChime();
    setIsRevealed(true);

    if (onMoonExplored) {
      onMoonExplored();
    }

    const burstEvent = new CustomEvent('confetti-burst', {
      detail: { x: e.clientX, y: e.clientY }
    });
    window.dispatchEvent(burstEvent);
  };

  const handleClose = () => {
    soundEffects.playClick();
    setIsRevealed(false);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isRevealed && e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isRevealed]);

  return (
    <>
      <div
        className="interactive-celestial-moon"
        onClick={handleClick}
        title="The Moon (Click to explore)"
        role="button"
        tabIndex={0}
        aria-label="Interactive Moon"
        onKeyDown={(e) => e.key === 'Enter' && handleClick(e)}
      >
        <div className="moon-orb">
          <div className="moon-crater c1" />
          <div className="moon-crater c2" />
          <div className="moon-crater c3" />
          <div className="moon-halo" />
        </div>
      </div>

      {isRevealed && (
        <div className="moon-modal-backdrop" onClick={handleClose}>
          <div className="moon-modal-card" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <div className="moon-modal-header">
              <span className="moon-badge">🌙 {moonConfig.title || "The Silent Watcher"}</span>
              <button className="moon-close-btn" onClick={handleClose} aria-label="Close moon modal">✕</button>
            </div>
            <h3 className="moon-quote">“{moonConfig.quote || "Some nights are worth remembering."}”</h3>
            <p className="moon-note">
              {moonConfig.note ||
                "Under the same sky, celebrating the same wonderful person. May all your quiet wishes come true tonight."}
            </p>
            <button className="moon-done-btn" onClick={handleClose}>
              Continue Gazing ✨
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default InteractiveMoon;
