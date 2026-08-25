import React, { useState, useEffect } from 'react';
import { soundEffects } from '../utils/soundEffects';

const EasterEggs = ({ userName = "HEMANTH", easterEggConfig = {}, onEasterEggFound }) => {
  const [unlocked, setUnlocked] = useState(false);
  const [typedSequence, setTypedSequence] = useState('');

  const secretCode = (easterEggConfig.secretSequence || 'birthday').toLowerCase();

  // Keyboard sequence listener (e.g. typing 'birthday')
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (unlocked && e.key === 'Escape') {
        closeEgg();
        return;
      }
      // Ignore if user is currently typing in an input or textarea
      if (['INPUT', 'TEXTAREA'].includes(e.target?.tagName)) return;

      const char = e.key.toLowerCase();
      setTypedSequence((prev) => {
        const updated = (prev + char).slice(-secretCode.length);
        if (updated === secretCode) {
          triggerUnlock();
        }
        return updated;
      });
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [secretCode, unlocked]);

  const triggerUnlock = () => {
    soundEffects.playSecretUnlock();
    setUnlocked(true);
    if (onEasterEggFound) onEasterEggFound();

    const burst = new CustomEvent('confetti-burst', {
      detail: { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    });
    window.dispatchEvent(burst);
  };

  const closeEgg = () => {
    soundEffects.playClick();
    setUnlocked(false);
  };

  return (
    <>
      {unlocked && (
        <div className="easter-egg-modal-backdrop" onClick={closeEgg}>
          <div className="easter-egg-card" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <div className="egg-sparkle-halo">🎉 💫 👑 💫 🎉</div>
            <h2 className="egg-title">{easterEggConfig.unlockedTitle || "🌟 SECRET MODE UNLOCKED!"}</h2>
            <h3 className="egg-name">Happy Birthday to the Legend, {userName}!</h3>
            <p className="egg-message">
              {easterEggConfig.unlockedMessage ||
                "You found the secret cosmic passphrase! May this year give you superpowers, infinite smiles, and legendary luck in everything you do."}
            </p>
            <div className="egg-badge-pill">SUPER STAR STATUS: ACTIVE 🌟</div>
            <button className="egg-close-btn" onClick={closeEgg} aria-label="Close easter egg modal">
              Collect Secret Star Power ✨
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default EasterEggs;
