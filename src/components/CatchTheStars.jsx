import React, { useState, useEffect, useRef, useCallback } from 'react';
import { soundEffects } from '../utils/soundEffects';

const TOTAL_STARS = 10;
const MAX_CONCURRENT_STARS = 4;

const CatchTheStars = ({ gameConfig = {}, onStarCaught, onCompleted, onContinue }) => {
  const [caughtCount, setCaughtCount] = useState(0);
  const [activeStars, setActiveStars] = useState([]);
  const [particles, setParticles] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showRevealSequence, setShowRevealSequence] = useState(0); // 0: playing, 1: found them all, 2: waiting, 3: reveal message
  const [isPlaying, setIsPlaying] = useState(true);

  const arenaRef = useRef(null);
  const nextStarIdRef = useRef(1);
  const spawnTimerRef = useRef(null);
  const animFrameRef = useRef(null);

  // Sound and event callback when star is caught
  const handleCatchStar = (star, e) => {
    e.stopPropagation();
    if (isCompleted || !isPlaying) return;

    const nextCount = caughtCount + 1;
    setCaughtCount(nextCount);

    // Audio chime with rising pitch
    soundEffects.playCatchStar(nextCount);

    // Get click/touch position relative to arena
    const arenaRect = arenaRef.current?.getBoundingClientRect() || { left: 0, top: 0, width: 300, height: 200 };
    const clickX = e.clientX ? e.clientX - arenaRect.left : (star.x / 100) * arenaRect.width;
    const clickY = e.clientY ? e.clientY - arenaRect.top : (star.y / 100) * arenaRect.height;

    // Spawn localized particle burst (capped at 12 particles per star)
    const newParticles = Array.from({ length: 10 }).map((_, i) => {
      const angle = (Math.PI * 2 * i) / 10 + (Math.random() - 0.5) * 0.5;
      const speed = Math.random() * 3 + 2;
      return {
        id: `p-${Date.now()}-${i}-${Math.random()}`,
        x: clickX,
        y: clickY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: star.color,
        size: Math.random() * 3 + 2,
        alpha: 1,
        life: 1
      };
    });

    setParticles((prev) => [...prev.slice(-30), ...newParticles]);

    // Remove the caught star immediately
    setActiveStars((prev) => prev.filter((s) => s.id !== star.id));

    // Notify parent for stats & achievement
    if (onStarCaught) {
      onStarCaught(nextCount, TOTAL_STARS);
    }

    // Trigger confetti burst on completion
    if (nextCount >= TOTAL_STARS) {
      setIsCompleted(true);
      setIsPlaying(false);
      if (onCompleted) onCompleted();

      // Cinematic sequence
      setShowRevealSequence(1);
      setTimeout(() => setShowRevealSequence(2), 2200);
      setTimeout(() => {
        setShowRevealSequence(3);
        soundEffects.playCelebrationChord();
        const burstEvent = new CustomEvent('confetti-burst', {
          detail: { x: window.innerWidth / 2, y: window.innerHeight * 0.5 }
        });
        window.dispatchEvent(burstEvent);
      }, 4500);
    }
  };

  // Helper to spawn a new floating star
  const spawnStar = useCallback(() => {
    if (isCompleted || !isPlaying) return;

    setActiveStars((prev) => {
      if (prev.length >= MAX_CONCURRENT_STARS) return prev;

      const starColors = [
        '#00f0ff', // cyan
        '#fcd34d', // warm gold
        '#ff00ea', // magenta
        '#a855f7', // purple
        '#4ade80', // soft emerald
        '#ffffff'  // diamond white
      ];

      const newStar = {
        id: nextStarIdRef.current++,
        x: Math.random() * 75 + 12, // 12% to 87% within arena
        y: Math.random() * 65 + 18, // 18% to 83%
        size: Math.random() * 12 + 22, // 22px to 34px clickable hitbox
        color: starColors[Math.floor(Math.random() * starColors.length)],
        floatDelay: Math.random() * 2,
        duration: Math.random() * 2 + 3.5, // floats for 3.5 to 5.5s
        createdAt: Date.now()
      };

      return [...prev, newStar];
    });
  }, [isCompleted, isPlaying]);

  // Star spawning interval and auto-cleanup of old stars
  useEffect(() => {
    if (!isPlaying || isCompleted) return;

    // Initial stars
    spawnStar();
    spawnStar();

    spawnTimerRef.current = setInterval(() => {
      spawnStar();

      // Clean up stars that have been floating for too long (> 8s) to allow natural respawn
      setActiveStars((prev) => {
        const now = Date.now();
        return prev.filter((s) => now - s.createdAt < 7500);
      });
    }, 1400);

    return () => {
      if (spawnTimerRef.current) clearInterval(spawnTimerRef.current);
    };
  }, [isPlaying, isCompleted, spawnStar]);

  // Particle animation loop (clean and throttled)
  useEffect(() => {
    if (particles.length === 0) return;

    const updateParticles = () => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy + 0.1, // subtle gravity
            alpha: p.alpha - 0.035,
            life: p.life - 0.035
          }))
          .filter((p) => p.alpha > 0)
      );
      animFrameRef.current = requestAnimationFrame(updateParticles);
    };

    animFrameRef.current = requestAnimationFrame(updateParticles);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [particles.length]);

  // Reset / Replay mini game
  const handleReplay = () => {
    soundEffects.playClick();
    setCaughtCount(0);
    setActiveStars([]);
    setParticles([]);
    setIsCompleted(false);
    setShowRevealSequence(0);
    setIsPlaying(true);
  };

  const handleContinueClick = () => {
    soundEffects.playClick();
    if (onContinue) {
      onContinue();
    } else {
      const nextElem = document.getElementById('letter') || document.getElementById('cake');
      if (nextElem) nextElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="catch-stars-section" id="mini-game">
      <div className="catch-stars-card">
        {/* Header and status */}
        <div className="catch-stars-header">
          <div className="catch-badge">
            <span className="catch-badge-dot" />
            <span>INTERACTIVE MINI-GAME</span>
          </div>
          <h2 className="catch-title">{gameConfig.title || "CATCH THE STARS"}</h2>
          <p className="catch-subtitle">
            {gameConfig.subtitle || "A quiet moment in the cosmos — click or tap floating stars to collect them ✨"}
          </p>

          {/* Progress Tracker */}
          <div className="catch-score-dock">
            <span className="catch-score-label">STARS CAUGHT:</span>
            <span className="catch-score-value">
              {caughtCount} / {TOTAL_STARS}
            </span>
            <div className="catch-progress-track">
              <div
                className="catch-progress-fill"
                style={{ width: `${(caughtCount / TOTAL_STARS) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Interactive Game Arena */}
        <div className="catch-stars-arena" ref={arenaRef}>
          {/* Cosmic background stardust texture */}
          <div className="arena-nebula-glow" />
          <div className="arena-grid-overlay" />

          {/* Particle Burst Layer */}
          {particles.map((p) => (
            <div
              key={p.id}
              className="catch-particle"
              style={{
                left: `${p.x}px`,
                top: `${p.y}px`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                backgroundColor: p.color,
                boxShadow: `0 0 8px ${p.color}`,
                opacity: p.alpha
              }}
            />
          ))}

          {/* Floating Stars to Catch */}
          {!isCompleted &&
            activeStars.map((star) => (
              <div
                key={star.id}
                className="catch-star-item"
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  '--star-color': star.color,
                  animationDelay: `${star.floatDelay}s`,
                  animationDuration: `${star.duration}s`
                }}
                onClick={(e) => handleCatchStar(star, e)}
                onTouchStart={(e) => handleCatchStar(star, e)}
                role="button"
                tabIndex={0}
                aria-label="Catch floating star"
              >
                <div className="catch-star-core" />
                <div className="catch-star-halo" />
                <div className="catch-star-sparkle" />
              </div>
            ))}

          {/* Gameplay Prompt */}
          {!isCompleted && caughtCount < TOTAL_STARS && (
            <div className="arena-instruction-chip">
              <span>✦ Tap glowing stars as they drift through the cosmos ✦</span>
            </div>
          )}

          {/* Completed State Revelation */}
          {isCompleted && (
            <div className="catch-completion-overlay">
              {showRevealSequence === 1 && (
                <div className="reveal-step fade-in-step">
                  <span className="reveal-icon">🌟</span>
                  <h3 className="reveal-title-large">{gameConfig.completedTitle || "YOU FOUND THEM ALL ✨"}</h3>
                </div>
              )}

              {showRevealSequence === 2 && (
                <div className="reveal-step fade-in-step">
                  <span className="reveal-icon">💫</span>
                  <h3 className="reveal-title-medium">{gameConfig.waitingText || "There's something waiting for you..."}</h3>
                </div>
              )}

              {showRevealSequence >= 3 && (
                <div className="reveal-final-card fade-in-step">
                  <div className="reveal-star-badge">✨ A CELESTIAL MESSAGE ✨</div>
                  <blockquote className="reveal-quote">
                    “{gameConfig.hiddenMessage || "Some people are stars in our lives.\nYou're one of mine."}”
                  </blockquote>
                  <div className="reveal-action-buttons">
                    <button className="catch-continue-btn" onClick={handleContinueClick}>
                      {gameConfig.continueButtonText || "CONTINUE JOURNEY 💫"}
                    </button>
                    <button className="catch-replay-btn" onClick={handleReplay}>
                      {gameConfig.replayButtonText || "PLAY AGAIN 🔄"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CatchTheStars;
