import React from 'react';
import { soundEffects } from '../utils/soundEffects';
import JourneyStats from './JourneyStats';

const MissionComplete = ({ onRestart, recipientName, stats = {}, onTriggerSecretEnding }) => {
  const handleRestart = () => {
    soundEffects.playCelebrationChord();
    onRestart();
  };

  const handleSecretClick = (e) => {
    e.stopPropagation();
    soundEffects.playSecretUnlock();
    if (onTriggerSecretEnding) {
      onTriggerSecretEnding();
    }
  };

  return (
    <div className="mission-complete-overlay">
      <div className="mission-complete-card">
        <div className="mission-complete-badge">✨ MISSION ARCHIVE ✨</div>
        <h1 className="mission-complete-title">MISSION COMPLETE</h1>
        <h2 className="mission-complete-sub">BIRTHDAY SURPRISE UNLOCKED</h2>

        {/* 100% Cyber-Cosmic Progress Bar */}
        <div className="mission-progress-box">
          <div className="mission-progress-track">
            <div className="mission-progress-fill" />
          </div>
          <div className="mission-progress-label">
            <span>UNIVERSE EXPERIENCE: 100% COMPLETED</span>
            <span
              className="subtle-secret-symbol"
              onClick={handleSecretClick}
              title="A quiet celestial symbol..."
              role="button"
              tabIndex={0}
              aria-label="Secret celestial symbol"
              onKeyDown={(e) => e.key === 'Enter' && handleSecretClick(e)}
            >
              ✦
            </span>
          </div>
        </div>

        {/* Personalized Journey Statistics */}
        <JourneyStats stats={stats} />

        <p className="mission-personal-quote">
          “May this upcoming year be filled with exciting adventures, unbreakable peace, and boundless reasons to smile, {recipientName || "Hemanth"}.”
        </p>

        <div className="mission-action-row">
          <button className="restart-experience-btn" onClick={handleRestart}>
            🔄 EXPERIENCE AGAIN
          </button>
        </div>

        {/* Discreet bottom secret spark */}
        <div className="mission-corner-secret">
          <span
            className="secret-sparkle-trigger"
            onClick={handleSecretClick}
            title="✦"
          >
            ✦
          </span>
        </div>
      </div>
    </div>
  );
};

export default MissionComplete;
