import React, { useState, useEffect } from 'react';
import { soundEffects } from '../utils/soundEffects';

export const ALL_ACHIEVEMENTS = [
  {
    id: 'first_star',
    icon: '⭐',
    title: 'FIRST STAR',
    desc: 'Collected the first star in the cosmos.'
  },
  {
    id: 'moon_explorer',
    icon: '🌙',
    title: 'MOON EXPLORER',
    desc: 'Discovered the quiet wisdom of the Moon.'
  },
  {
    id: 'secret_finder',
    icon: '🔐',
    title: 'SECRET FINDER',
    desc: 'Uncovered a hidden secret in the galaxy.'
  },
  {
    id: 'memory_keeper',
    icon: '💌',
    title: 'MEMORY KEEPER',
    desc: 'Opened and cherished a timeless memory.'
  },
  {
    id: 'wish_maker',
    icon: '🌠',
    title: 'WISH MAKER',
    desc: 'Sent a heartfelt wish into the universe.'
  },
  {
    id: 'candle_master',
    icon: '🎂',
    title: 'CANDLE MASTER',
    desc: 'Extinguished all candles on the birthday cake.'
  },
  {
    id: 'listener',
    icon: '🎙',
    title: 'LISTENER',
    desc: 'Listened to the personal voice message.'
  },
  {
    id: 'experience_complete',
    icon: '🏆',
    title: 'EXPERIENCE COMPLETE',
    desc: 'Completed the main birthday cosmos journey.'
  }
];

const AchievementToaster = ({ unlockedIds = new Set(), lastUnlockedId = null }) => {
  const [activeToast, setActiveToast] = useState(null);
  const [showDrawer, setShowDrawer] = useState(false);

  // When lastUnlockedId changes, display the toast notification
  useEffect(() => {
    if (!lastUnlockedId) return;

    const ach = ALL_ACHIEVEMENTS.find((a) => a.id === lastUnlockedId);
    if (ach) {
      setActiveToast(ach);
      soundEffects.playAchievement();

      const timer = setTimeout(() => {
        setActiveToast(null);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [lastUnlockedId]);

  const toggleDrawer = () => {
    soundEffects.playClick();
    setShowDrawer((prev) => !prev);
  };

  const unlockedCount = ALL_ACHIEVEMENTS.filter((a) => unlockedIds.has(a.id)).length;

  return (
    <>
      {/* Floating Toast Notification */}
      {activeToast && (
        <div className="achievement-toast-container" onClick={toggleDrawer} role="alert">
          <div className="achievement-toast-card">
            <div className="toast-icon-halo">{activeToast.icon}</div>
            <div className="toast-text-box">
              <span className="toast-kicker">Achievement Unlocked ✨</span>
              <h4 className="toast-title">{activeToast.title}</h4>
              <p className="toast-desc">{activeToast.desc}</p>
            </div>
            <button
              className="toast-dismiss-btn"
              onClick={(e) => {
                e.stopPropagation();
                setActiveToast(null);
              }}
              aria-label="Dismiss toast"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Floating Badges Quick Dock Button */}
      <div className="achievements-dock-btn-wrap">
        <button
          className="achievements-dock-pill"
          onClick={toggleDrawer}
          title="View unlocked achievements"
          aria-label={`View achievements (${unlockedCount}/${ALL_ACHIEVEMENTS.length} unlocked)`}
        >
          <span className="ach-badge-icon">🏆</span>
          <span className="ach-badge-text">
            {unlockedCount} / {ALL_ACHIEVEMENTS.length}
          </span>
        </button>
      </div>

      {/* Full Achievements Drawer / Modal */}
      {showDrawer && (
        <div className="achievements-modal-backdrop" onClick={() => setShowDrawer(false)}>
          <div
            className="achievements-modal-card"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="ach-modal-header">
              <div>
                <span className="ach-modal-kicker">COSMIC MILESTONES</span>
                <h3 className="ach-modal-title">JOURNEY ACHIEVEMENTS</h3>
              </div>
              <button
                className="ach-modal-close-btn"
                onClick={() => setShowDrawer(false)}
                aria-label="Close achievements modal"
              >
                ✕
              </button>
            </div>

            <p className="ach-modal-sub">
              {unlockedCount === ALL_ACHIEVEMENTS.length
                ? "🌟 Master of the Cosmos! You have discovered all achievements."
                : `You have unlocked ${unlockedCount} of ${ALL_ACHIEVEMENTS.length} achievements as you explore.`}
            </p>

            <div className="achievements-grid">
              {ALL_ACHIEVEMENTS.map((ach) => {
                const isUnlocked = unlockedIds.has(ach.id);
                return (
                  <div
                    key={ach.id}
                    className={`achievement-item-card ${isUnlocked ? 'unlocked' : 'locked'}`}
                  >
                    <div className="ach-item-icon">{isUnlocked ? ach.icon : '🔒'}</div>
                    <div className="ach-item-content">
                      <h4 className="ach-item-title">{ach.title}</h4>
                      <p className="ach-item-desc">
                        {isUnlocked ? ach.desc : 'Explore the universe to unlock...'}
                      </p>
                    </div>
                    <div className="ach-item-status">
                      {isUnlocked ? (
                        <span className="unlocked-chip">UNLOCKED ✨</span>
                      ) : (
                        <span className="locked-chip">LOCKED</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="ach-modal-footer">
              <button className="ach-done-btn" onClick={() => setShowDrawer(false)}>
                Back to Journey ✨
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AchievementToaster;
