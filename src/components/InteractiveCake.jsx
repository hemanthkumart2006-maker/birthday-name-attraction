import React, { useState } from 'react';
import { soundEffects } from '../utils/soundEffects';

const InteractiveCake = ({ cakeConfig = {}, recipientName, onCakeCompleted }) => {
  const totalCandles = cakeConfig.candlesCount || 4;
  const [blownCandles, setBlownCandles] = useState(new Set());
  const [allBlown, setAllBlown] = useState(false);

  const handleCandleClick = (index, e) => {
    e.stopPropagation();
    if (blownCandles.has(index)) return;

    soundEffects.playCandleBlow();

    // Trigger local puff/sparkle
    const burstEvent = new CustomEvent('confetti-burst', {
      detail: { x: e.clientX, y: e.clientY }
    });
    window.dispatchEvent(burstEvent);

    const updated = new Set(blownCandles);
    updated.add(index);
    setBlownCandles(updated);

    if (updated.size === totalCandles) {
      if (onCakeCompleted) onCakeCompleted();
      setTimeout(() => {
        soundEffects.playCelebrationChord();
        setAllBlown(true);

        // Huge celebration confetti
        for (let i = 0; i < 4; i++) {
          setTimeout(() => {
            const bigBurst = new CustomEvent('confetti-burst', {
              detail: {
                x: window.innerWidth * (0.2 + i * 0.2),
                y: window.innerHeight * 0.4
              }
            });
            window.dispatchEvent(bigBurst);
          }, i * 300);
        }
      }, 600);
    }
  };

  const handleRelight = () => {
    soundEffects.playClick();
    setBlownCandles(new Set());
    setAllBlown(false);
  };

  return (
    <div className="interactive-cake-section">
      <div className="cake-glass-container">
        <div className="cake-badge">🎂 RITUAL OF LIGHT</div>
        <h3 className="cake-section-title">BLOW OUT THE CANDLES</h3>
        <p className="cake-instruction">
          {allBlown
            ? "✨ All candles blown! Your wish has been released to the stars!"
            : `Click or tap each candle to blow them out (${totalCandles - blownCandles.size} remaining)...`}
        </p>

        {/* 3D Visual Cake Structure */}
        <div className={`cake-structure ${allBlown ? 'cake-celebrating' : ''}`}>
          {/* Candles row */}
          <div className="cake-candles-row">
            {Array.from({ length: totalCandles }).map((_, i) => {
              const isExtinguished = blownCandles.has(i);
              return (
                <div
                  key={i}
                  className={`cake-candle-item ${isExtinguished ? 'extinguished' : 'lit'}`}
                  onClick={(e) => handleCandleClick(i, e)}
                  title={isExtinguished ? "Blown out ✨" : "Click to blow out candle!"}
                  role="button"
                  tabIndex={0}
                  aria-label={`Candle ${i + 1}`}
                  onKeyDown={(e) => e.key === 'Enter' && handleCandleClick(i, e)}
                >
                  <div className="candle-flame">
                    <div className="flame-core" />
                    <div className="flame-glow" />
                  </div>
                  {isExtinguished && <div className="candle-smoke-puff" />}
                  <div className="candle-wick" />
                  <div className={`candle-stick candle-color-${(i % 3) + 1}`} />
                </div>
              );
            })}
          </div>

          {/* Cake Tiers */}
          <div className="cake-tier tier-top">
            <div className="cake-frosting-drips" />
            <div className="cake-cherries">🍒 🍓 🍒 🍓</div>
          </div>
          <div className="cake-tier tier-middle">
            <div className="cake-frosting-band" />
          </div>
          <div className="cake-tier tier-base">
            <div className="cake-plate" />
          </div>
        </div>

        {/* Wish Announcement */}
        {allBlown ? (
          <div className="cake-wish-granted-banner">
            <h4 className="wish-granted-heading">🎉 MAKE A WISH, {recipientName || "HEMANTH"}! 🎉</h4>
            <p className="wish-granted-text">
              May every single dream you carry quietly in your heart come true this year!
            </p>
            <button className="cake-relight-btn" onClick={handleRelight}>
              Relight Candles 🕯️
            </button>
          </div>
        ) : (
          <div className="make-a-wish-pill">
            <span>✨ Tap each candle to make your wish ✨</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveCake;
