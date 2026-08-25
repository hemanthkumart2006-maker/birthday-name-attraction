import React, { useState } from 'react';
import { soundEffects } from '../utils/soundEffects';

const BirthdayDNA = ({ userName = "HEMANTH" }) => {
  const [secondName, setSecondName] = useState('');
  const [comparedData, setComparedData] = useState(null);

  const name1 = (userName || "HEMANTH").trim().toUpperCase();

  const handleCompare = (e) => {
    if (e) e.preventDefault();
    const name2 = secondName.trim().toUpperCase();
    if (!name2) return;

    soundEffects.playCelebrationChord();

    // Calculate a high, joyful love percentage between 94% and 99.9%
    let charSum = 0;
    const combined = name1 + name2;
    for (let i = 0; i < combined.length; i++) {
      charSum += combined.charCodeAt(i) * (i + 1);
    }
    const loveScore = (94 + (charSum % 59) / 10).toFixed(1);

    // Build DNA base pairs from both names with love & sparkle symbols
    const maxLen = Math.max(name1.length, name2.length);
    const rungs = [];
    for (let i = 0; i < maxLen; i++) {
      const charA = name1[i % name1.length] || '★';
      const charB = name2[i % name2.length] || '★';
      rungs.push({
        charA,
        charB,
        index: i,
        bond: ['💖', '✨', '💕', '⚡', '🌹', '💫'][i % 6]
      });
    }

    setComparedData({
      name1,
      name2,
      score: loveScore,
      rungs
    });

    const burstEvent = new CustomEvent('confetti-burst', {
      detail: { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    });
    window.dispatchEvent(burstEvent);
  };

  return (
    <div className="birthday-dna-container">
      <div className="dna-card-glass">
        {/* Title */}
        <div className="dna-header-simple">
          <span className="dna-badge">🧬 COSMIC DNA & LOVE CALCULATOR 💖</span>
          <h3 className="dna-heading">COMPARE DNA & LOVE PERCENTAGE</h3>
        </div>

        {/* Input Form Area */}
        <form onSubmit={handleCompare} className="dna-compare-form">
          <div className="dna-names-row">
            {/* Name 1 (Fixed from start) */}
            <div className="dna-name-box name-box-1">
              <span className="dna-label">NAME 1</span>
              <div className="dna-name-display">{name1}</div>
            </div>

            <div className="dna-vs-badge">💖 + 💖</div>

            {/* Name 2 (User enters) */}
            <div className="dna-name-box name-box-2">
              <label htmlFor="second-name-input" className="dna-label">ENTER SECOND NAME</label>
              <input
                id="second-name-input"
                type="text"
                className="dna-name-input-slot"
                value={secondName}
                onChange={(e) => setSecondName(e.target.value)}
                placeholder="Type name here..."
                maxLength={18}
                autoComplete="off"
              />
            </div>
          </div>

          {/* Compare Button */}
          <div className="dna-btn-wrap">
            <button
              type="submit"
              className="dna-compare-action-btn"
              disabled={!secondName.trim()}
            >
              💖 COMPARE DNA & LOVE % ✨
            </button>
          </div>
        </form>

        {/* Comparison Result with Love Percentage & DNA Strand */}
        {comparedData && (
          <div className="dna-result-box">
            {/* Love Percentage Card */}
            <div className="love-score-card">
              <div className="love-heart-circle">
                <span className="love-heart-emoji">💖</span>
                <span className="love-percent-text">{comparedData.score}%</span>
                <span className="love-tag">LOVE MATCH</span>
              </div>

              <div className="love-message-box">
                <h4 className="love-couple-title">{comparedData.name1} & {comparedData.name2}</h4>
                <div className="love-status-pill">✨ PURE COSMIC SOULMATES ✨</div>
                <p className="love-description">
                  The universe calculated your cosmic DNA frequencies! You share an infinite gravitational pull of pure love, deep understanding, and endless happiness together. 💫
                </p>
              </div>
            </div>

            {/* Double Helix DNA Strands Comparison */}
            <div className="dna-strands-comparison">
              <div className="strand-header-row">
                <span className="strand-title-a">{comparedData.name1} DNA</span>
                <span className="strand-title-mid">💖 LOVE BONDS 💖</span>
                <span className="strand-title-b">{comparedData.name2} DNA</span>
              </div>

              <div className="dna-helix-track">
                {comparedData.rungs.map((rung, i) => (
                  <div
                    key={i}
                    className="dna-rung-pair"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    {/* Base from Name 1 */}
                    <div className="dna-node node-left">
                      <span className="dna-char">{rung.charA}</span>
                    </div>

                    {/* Connecting Hydrogen Energy Bond with Heart */}
                    <div className="dna-bond-line love-bond-line">
                      <span className="dna-bond-spark">{rung.bond}</span>
                    </div>

                    {/* Base from Name 2 */}
                    <div className="dna-node node-right">
                      <span className="dna-char char-right">{rung.charB}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BirthdayDNA;
