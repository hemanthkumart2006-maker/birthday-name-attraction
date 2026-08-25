import React, { useState } from 'react';
import { soundEffects } from '../utils/soundEffects';

const SecretBox = ({ boxConfig = {}, onSecretBoxOpened }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (e) => {
    e.stopPropagation();
    if (!isOpen) {
      soundEffects.playSecretUnlock();
      setIsOpen(true);
      if (onSecretBoxOpened) onSecretBoxOpened();
      
      const burstEvent = new CustomEvent('confetti-burst', {
        detail: { x: window.innerWidth / 2, y: window.innerHeight / 2 }
      });
      window.dispatchEvent(burstEvent);
    }
  };

  const handleClose = () => {
    soundEffects.playClick();
    setIsOpen(false);
  };

  return (
    <div className="secret-box-container">
      <div className="secret-box-card">
        <div className="secret-box-tag">EXTRA SURPRISE</div>
        <h3 className="secret-box-heading">{boxConfig.title || "A LITTLE SECRET"}</h3>
        <p className="secret-box-sub">
          {isOpen
            ? "You unlocked a hidden keepsake ✨"
            : (boxConfig.subtitle || "You found something I didn't want you to miss.")}
        </p>

        {/* 3D Floating Mystery Box Visual */}
        <div className={`mystery-box-graphic ${isOpen ? 'box-opened' : ''}`} onClick={handleOpen}>
          <div className="mystery-box-lid" />
          <div className="mystery-box-body">
            <div className="box-ribbon-v" />
            <div className="box-ribbon-h" />
            <div className="box-radiance" />
          </div>
        </div>

        {!isOpen ? (
          <button className="secret-box-open-btn" onClick={handleOpen}>
            ✨ {boxConfig.buttonText || "OPEN THE SECRET BOX"} ✨
          </button>
        ) : (
          <div className="secret-box-content-revealed">
            <div className="revealed-photo-frame">
              <img
                src={boxConfig.image || "/Photos/1.png"}
                alt="Secret surprise"
                className="revealed-photo"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80';
                }}
              />
            </div>
            <h4 className="revealed-title">{boxConfig.revealTitle || "A Heartfelt Keepsake"}</h4>
            <p className="revealed-note">
              {boxConfig.revealNote ||
                "Some surprises don't shout; they simply wait quietly for you to find them. Thank you for making this world brighter just by being in it."}
            </p>
            <button className="secret-box-done-btn" onClick={handleClose}>
              Close Secret Box
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SecretBox;
