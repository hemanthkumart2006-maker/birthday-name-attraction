import React from 'react';

const JourneyStats = ({ stats = {} }) => {
  const {
    memoriesDiscovered = 0,
    totalMemories = 5,
    secretsFound = 0,
    totalSecrets = 8,
    starsCollected = 0,
    totalStars = 10,
    wishesMade = 0,
    journeyCompleted = 100
  } = stats;

  return (
    <div className="journey-stats-card">
      <div className="journey-stats-header">
        <span className="stats-kicker">PERSONALIZED CHRONICLE</span>
        <h3 className="stats-title">YOUR JOURNEY</h3>
        <p className="stats-sub">A reflection of your steps through this universe today</p>
      </div>

      <div className="stats-items-list">
        <div className="stat-row-item">
          <div className="stat-label-wrap">
            <span className="stat-bullet-icon">📸</span>
            <span className="stat-name">Memories discovered:</span>
          </div>
          <span className="stat-number">
            {memoriesDiscovered} <span className="stat-total">/ {totalMemories}</span>
          </span>
        </div>

        <div className="stat-row-item">
          <div className="stat-label-wrap">
            <span className="stat-bullet-icon">🔐</span>
            <span className="stat-name">Secrets found:</span>
          </div>
          <span className="stat-number">
            {secretsFound} <span className="stat-total">/ {totalSecrets}</span>
          </span>
        </div>

        <div className="stat-row-item">
          <div className="stat-label-wrap">
            <span className="stat-bullet-icon">⭐</span>
            <span className="stat-name">Stars collected:</span>
          </div>
          <span className="stat-number">
            {starsCollected} <span className="stat-total">/ {totalStars}</span>
          </span>
        </div>

        <div className="stat-row-item">
          <div className="stat-label-wrap">
            <span className="stat-bullet-icon">🌠</span>
            <span className="stat-name">Wishes made:</span>
          </div>
          <span className="stat-number">
            {wishesMade} <span className="stat-total">{wishesMade > 0 ? '✨' : ''}</span>
          </span>
        </div>

        <div className="stat-row-item stat-row-highlight">
          <div className="stat-label-wrap">
            <span className="stat-bullet-icon">🌌</span>
            <span className="stat-name">Journey completed:</span>
          </div>
          <span className="stat-number stat-highlight-val">{journeyCompleted}%</span>
        </div>
      </div>
    </div>
  );
};

export default JourneyStats;
