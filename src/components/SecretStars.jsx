import React, { useState, useEffect } from 'react';
import { soundEffects } from '../utils/soundEffects';

const SecretStars = ({ secretStars = [], onStarDiscovered }) => {
  const [activeStar, setActiveStar] = useState(null);
  const [discoveredIds, setDiscoveredIds] = useState(new Set());

  const handleStarClick = (star, e) => {
    e.stopPropagation();
    soundEffects.playStarChime();
    
    const newDiscovered = new Set(discoveredIds);
    if (!newDiscovered.has(star.id)) {
      newDiscovered.add(star.id);
      setDiscoveredIds(newDiscovered);
      if (onStarDiscovered) {
        onStarDiscovered(newDiscovered.size, secretStars.length);
      }
    }
    
    const burstEvent = new CustomEvent('confetti-burst', {
      detail: { x: e.clientX, y: e.clientY }
    });
    window.dispatchEvent(burstEvent);

    setActiveStar(star);
  };

  const closeStarModal = () => {
    soundEffects.playClick();
    setActiveStar(null);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeStar && e.key === 'Escape') {
        closeStarModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeStar]);

  return (
    <>
      {/* Hidden Easter Egg Stars Layer */}
      <div className="secret-stars-layer">
        {secretStars.map((star) => {
          const isFound = discoveredIds.has(star.id);
          return (
            <div
              key={star.id}
              className={`secret-star-node ${isFound ? 'discovered' : ''}`}
              style={{
                top: star.top,
                left: star.left,
                '--star-glow': star.color || '#00f0ff'
              }}
              onClick={(e) => handleStarClick(star, e)}
              title="A shimmering star..."
            >
              <div className="secret-star-core" />
              <div className="secret-star-crosshair" />
              <div className="secret-star-shimmer" />
            </div>
          );
        })}
      </div>

      {/* Secret Star Revelation Modal */}
      {activeStar && (
        <div className="secret-star-modal-backdrop" onClick={closeStarModal}>
          <div
            className="secret-star-card"
            onClick={(e) => e.stopPropagation()}
            style={{ '--star-accent': activeStar.color || '#00f0ff' }}
            role="dialog"
            aria-modal="true"
          >
            <div className="secret-star-header">
              <span className="secret-star-badge">✨ SECRET STAR DISCOVERED ({discoveredIds.size}/{secretStars.length})</span>
              <button className="secret-star-close" onClick={closeStarModal} aria-label="Close star popup">✕</button>
            </div>
            <div className="secret-star-body">
              <div className="secret-star-sparkle-icon">🌟</div>
              <h3 className="secret-star-title">{activeStar.hint || "A Special Thought"}</h3>
              <p className="secret-star-quote">“{activeStar.message}”</p>
            </div>
            <div className="secret-star-footer">
              <button className="secret-star-confirm-btn" onClick={closeStarModal}>
                Keep Shone ✨
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SecretStars;
