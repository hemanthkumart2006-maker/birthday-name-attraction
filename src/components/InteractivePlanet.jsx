import React, { useState, useEffect } from 'react';
import { soundEffects } from '../utils/soundEffects';

const InteractivePlanet = ({ planetConfig = {} }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
    soundEffects.playStarChime();
    setIsOpen(true);

    const burstEvent = new CustomEvent('confetti-burst', {
      detail: { x: e.clientX, y: e.clientY }
    });
    window.dispatchEvent(burstEvent);
  };

  const handleClose = () => {
    soundEffects.playClick();
    setIsOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isOpen && e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <>
      <div
        className="interactive-celestial-planet"
        onClick={handleClick}
        title="Memory Planet (Click to scan)"
        role="button"
        tabIndex={0}
        aria-label="Interactive Memory Planet"
        onKeyDown={(e) => e.key === 'Enter' && handleClick(e)}
      >
        <div className="planet-body">
          <div className="planet-atmosphere" />
          <div className="planet-ring" />
          <div className="planet-glow" />
        </div>
      </div>

      {isOpen && (
        <div className="planet-modal-backdrop" onClick={handleClose}>
          <div className="planet-modal-card" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <div className="planet-header">
              <span className="planet-badge">🪐 {planetConfig.name || "MEMORY PLANET"}</span>
              <button className="planet-close-btn" onClick={handleClose} aria-label="Close planet modal">✕</button>
            </div>
            <div className="planet-status-badge">
              <span className="status-dot-pulsing" />
              <span>{planetConfig.status || "STATUS: FULL OF GOOD MEMORIES"}</span>
            </div>
            <p className="planet-desc">
              {planetConfig.description ||
                "Orbiting through time, preserving every single laugh, every great conversation, and every shared milestone."}
            </p>
            <div className="planet-snapshot-mini">
              <img
                src="/Photos/2.png"
                alt="Memory snapshot"
                className="planet-snap-img"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80';
                }}
              />
              <span className="snap-label">Archive Highlight #02</span>
            </div>
            <button className="planet-done-btn" onClick={handleClose}>
              Resume Orbit 🪐
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default InteractivePlanet;
