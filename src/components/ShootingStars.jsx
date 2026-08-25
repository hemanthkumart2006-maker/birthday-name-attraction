import React, { useState, useEffect } from 'react';
import { soundEffects } from '../utils/soundEffects';

const ShootingStars = () => {
  const [stars, setStars] = useState([]);
  const [wishToast, setWishToast] = useState(null);

  useEffect(() => {
    // Generate a shooting star occasionally (every 7-12 seconds)
    const scheduleNextStar = () => {
      const delay = Math.random() * 5000 + 7000;
      return setTimeout(() => {
        const newStar = {
          id: Date.now() + Math.random(),
          startX: Math.random() * 70, // % from left
          startY: Math.random() * 40, // % from top
          angle: Math.random() * 20 + 35, // deg
          speed: Math.random() * 1.2 + 1.2, // seconds
          length: Math.random() * 80 + 120 // px
        };

        setStars((prev) => [...prev, newStar]);

        // Remove after animation finishes
        setTimeout(() => {
          setStars((prev) => prev.filter((s) => s.id !== newStar.id));
        }, 2200);

        timeoutId = scheduleNextStar();
      }, delay);
    };

    let timeoutId = scheduleNextStar();
    return () => clearTimeout(timeoutId);
  }, []);

  const handleStarClick = (star, e) => {
    e.stopPropagation();
    soundEffects.playStarChime();

    // Trigger stardust burst
    const burstEvent = new CustomEvent('confetti-burst', {
      detail: { x: e.clientX, y: e.clientY }
    });
    window.dispatchEvent(burstEvent);

    setWishToast({
      x: e.clientX,
      y: e.clientY,
      text: "Make a wish ✨"
    });

    setTimeout(() => {
      setWishToast(null);
    }, 2500);
  };

  return (
    <div className="shooting-stars-overlay">
      {stars.map((star) => (
        <div
          key={star.id}
          className="shooting-star-streak"
          style={{
            top: `${star.startY}%`,
            left: `${star.startX}%`,
            transform: `rotate(${star.angle}deg)`,
            animationDuration: `${star.speed}s`,
            width: `${star.length}px`
          }}
          onClick={(e) => handleStarClick(star, e)}
          title="Click the shooting star to make a wish!"
        >
          <div className="shooting-star-head" />
          <div className="shooting-star-tail" />
        </div>
      ))}

      {wishToast && (
        <div
          className="shooting-star-wish-toast"
          style={{
            left: Math.min(window.innerWidth - 160, Math.max(20, wishToast.x - 70)),
            top: Math.max(20, wishToast.y - 60)
          }}
        >
          <span className="toast-sparkle">🌠</span> {wishToast.text}
        </div>
      )}
    </div>
  );
};

export default ShootingStars;
