import React from 'react';
import { soundEffects } from '../utils/soundEffects';

const CuteCelebrationStickers = () => {
  const stickers = [
    {
      id: 'cat',
      title: 'Party Kitty 🐱',
      src: '/cat.gif',
      fallback: 'https://fonts.gstatic.com/s/e/notoemoji/latest/1f431/512.gif',
      alt: 'Cute party cat'
    },
    {
      id: 'bear',
      title: 'Dancing Bear 🐻',
      src: '/bear.gif',
      fallback: 'https://fonts.gstatic.com/s/e/notoemoji/latest/1f43b/512.gif',
      alt: 'Dancing celebration bear'
    },
    {
      id: 'party',
      title: 'Party Spirit 🥳',
      src: '/party.gif',
      fallback: 'https://fonts.gstatic.com/s/e/notoemoji/latest/1f973/512.gif',
      alt: 'Party celebration face'
    },
    {
      id: 'cake',
      title: 'Birthday Cake 🎂',
      src: '/cake.gif',
      fallback: 'https://fonts.gstatic.com/s/e/notoemoji/latest/1f382/512.gif',
      alt: 'Sparkling Birthday Cake'
    },
    {
      id: 'popper',
      title: 'Confetti Popper 🎉',
      src: '/popper.gif',
      fallback: 'https://fonts.gstatic.com/s/e/notoemoji/latest/1f389/512.gif',
      alt: 'Party Confetti Popper'
    },
    {
      id: 'gift',
      title: 'Magic Gift 🎁',
      src: '/gift.gif',
      fallback: 'https://fonts.gstatic.com/s/e/notoemoji/latest/1f381/512.gif',
      alt: 'Bouncing Gift Box'
    },
    {
      id: 'parrot',
      title: 'Party Parrot 🦜',
      src: '/parrot.gif',
      fallback: 'https://fonts.gstatic.com/s/e/notoemoji/latest/2728/512.gif',
      alt: 'Party Parrot'
    },
    {
      id: 'party_cat',
      title: 'Club Cat 🎶',
      src: '/party_cat.gif',
      fallback: 'https://fonts.gstatic.com/s/e/notoemoji/latest/1f38a/512.gif',
      alt: 'Party Vibe Cat'
    }
  ];

  const handleStickerClick = (stk, e) => {
    soundEffects.playStarChime();
    const burstEvent = new CustomEvent('confetti-burst', {
      detail: { x: e.clientX || window.innerWidth / 2, y: e.clientY || window.innerHeight / 2 }
    });
    window.dispatchEvent(burstEvent);
  };

  return (
    <div className="cute-stickers-container">
      <div className="cute-stickers-row">
        {stickers.map((stk, idx) => (
          <div
            key={stk.id}
            className={`cute-sticker-card sticker-${stk.id} idx-${idx}`}
            title={`${stk.title} (Click for sparkles!)`}
            onClick={(e) => handleStickerClick(stk, e)}
          >
            <img
              src={stk.src}
              alt={stk.alt}
              className="sticker-gif-img"
              loading="lazy"
              onError={(e) => {
                if (stk.fallback && e.target.src !== stk.fallback) {
                  e.target.src = stk.fallback;
                }
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CuteCelebrationStickers;
