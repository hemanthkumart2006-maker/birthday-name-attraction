import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import './BirthdaySurprise.css';

// Master Configuration & Sound Engine
import { birthdayConfig } from './src/birthdayConfig.js';
import { soundEffects } from './src/utils/soundEffects.js';

// Interactive Components
import CinematicIntro from './src/components/CinematicIntro.jsx';
import MemoryUniverse from './src/components/MemoryUniverse.jsx';
import MemoryTimeline from './src/components/MemoryTimeline.jsx';
import SecretStars from './src/components/SecretStars.jsx';
import SecretBox from './src/components/SecretBox.jsx';
import HandwrittenLetter from './src/components/HandwrittenLetter.jsx';
import VoiceMessage from './src/components/VoiceMessage.jsx';
import MusicVisualizer from './src/components/MusicVisualizer.jsx';
import ShootingStars from './src/components/ShootingStars.jsx';
import InteractiveMoon from './src/components/InteractiveMoon.jsx';
import InteractivePlanet from './src/components/InteractivePlanet.jsx';
import InteractiveCake from './src/components/InteractiveCake.jsx';
import BirthdayDNA from './src/components/BirthdayDNA.jsx';
import CinematicFinale from './src/components/CinematicFinale.jsx';
import MissionComplete from './src/components/MissionComplete.jsx';
import ProgressIndicator from './src/components/ProgressIndicator.jsx';
import EasterEggs from './src/components/EasterEggs.jsx';
import CuteCelebrationStickers from './src/components/CuteCelebrationStickers.jsx';

// Premium Upgrades Components
import ChapterLabel from './src/components/ChapterLabel.jsx';
import CatchTheStars from './src/components/CatchTheStars.jsx';
import AchievementToaster from './src/components/AchievementToaster.jsx';
import SecretFinalEnding from './src/components/SecretFinalEnding.jsx';

const BirthdaySurprise = () => {
  // Screen 1: Black Cinematic Intro ([ YES ] / [ NO ])
  // Phase 0: Landing Name Input Form ("Enter Name for Surprise" -> "Ignite Cinematic Universe")
  // Phase 1: Flashbang Supernova
  // Phase 2: Space / Cinematic Subtitles
  // Phase 3: Reveal Stable Holo-Glass Letter + NASA Speller + Music + Extended Universe
  const [showIntro, setShowIntro] = useState(true);
  const [phase, setPhase] = useState(0);
  const [typedChars, setTypedChars] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [nameInput, setNameInput] = useState(birthdayConfig.name || 'Hemanth');
  const [userName, setUserName] = useState((birthdayConfig.name || 'HEMANTH').toUpperCase());
  const [isPlaying, setIsPlaying] = useState(false);
  const [musicVolume, setMusicVolume] = useState(1);
  const [isVoicePlaying, setIsVoicePlaying] = useState(false);
  const [wishInput, setWishInput] = useState('');
  const [sentWish, setSentWish] = useState('');
  const [miracleOpen, setMiracleOpen] = useState(false);
  const [miracleTypedChars, setMiracleTypedChars] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [activeMemoryId, setActiveMemoryId] = useState(null);
  const [showFinale, setShowFinale] = useState(false);
  const [showMissionComplete, setShowMissionComplete] = useState(false);
  const [showSecretFinalEnding, setShowSecretFinalEnding] = useState(false);
  const [titleClickCount, setTitleClickCount] = useState(0);

  // Live Statistics & Achievement Tracking
  const [unlockedAchievements, setUnlockedAchievements] = useState(new Set());
  const [lastUnlockedAchievement, setLastUnlockedAchievement] = useState(null);
  const [discoveredMemories, setDiscoveredMemories] = useState(new Set());
  const [discoveredSecrets, setDiscoveredSecrets] = useState(new Set());
  const [starsCaughtCount, setStarsCaughtCount] = useState(0);
  const [wishesCount, setWishesCount] = useState(0);
  const [voiceListened, setVoiceListened] = useState(false);

  const canvasRef = useRef(null);
  const audioRef = useRef(null);

  const fullStory = `I destroyed everything ordinary to build this cinematic universe exclusively for you, ${userName}. You aren't just a year older; you are stepping into a year with limitless potential. Every rule can be broken, every goal can be shattered. Get ready for surprising joy, glowing memories, and a year full of magic.`;
  const miracleMessage = `Your wish has been checked. I will fulfil your wish.`;
  const miracleNote = `Study well, be healthy, stay strong, shine brighter, and keep believing in every miracle that comes your way.`;

  // Achievement unlock helper
  const unlockAchievement = useCallback((achId) => {
    setUnlockedAchievements((prev) => {
      if (prev.has(achId)) return prev;
      const next = new Set(prev);
      next.add(achId);
      setLastUnlockedAchievement(achId);
      return next;
    });
  }, []);

  // Secret discovery helper
  const trackSecretDiscovered = useCallback((secretId) => {
    setDiscoveredSecrets((prev) => {
      const next = new Set(prev);
      next.add(secretId);
      return next;
    });
    unlockAchievement('secret_finder');
  }, [unlockAchievement]);

  // Audio ducking: smoothly interpolate background music volume when voice message plays
  useEffect(() => {
    if (!audioRef.current) return;
    const targetVol = isVoicePlaying ? musicVolume * 0.15 : musicVolume;

    // Smooth transition
    let currentVol = audioRef.current.volume;
    const step = (targetVol - currentVol) / 10;
    let count = 0;

    const interval = setInterval(() => {
      count++;
      currentVol += step;
      if (audioRef.current) {
        audioRef.current.volume = Math.max(0, Math.min(1, currentVol));
      }
      if (count >= 10) {
        if (audioRef.current) audioRef.current.volume = targetVol;
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [isVoicePlaying, musicVolume]);

  // NASA Landsat Name Speller dynamically computed for every letter of the typed userName
  const landsatImages = useMemo(() => {
    const indexMap = {
      a: [2, 0], b: [0, 1], c: [0, 1], d: [0, 1], e: [3, 0],
      f: [0, 1], g: [0, 1], h: [1, 0], i: [0, 1], j: [0, 1],
      k: [0, 1], l: [0, 1], m: [1, 0], n: [0, 1], o: [0, 1],
      p: [0, 1], q: [0, 1], r: [0, 1], s: [0, 1], t: [0, 1],
      u: [0, 1], v: [0, 1], w: [0, 1], x: [0, 1], y: [0, 1], z: [0, 1]
    };

    return userName.split('').map((char, index) => {
      const lower = char.toLowerCase();
      if (lower >= 'a' && lower <= 'z') {
        const choices = indexMap[lower] || [0];
        const selectedIdx = choices[index % choices.length];
        return {
          letter: char.toUpperCase(),
          url: `https://science.nasa.gov/specials/your-name-in-landsat/images/${lower}_${selectedIdx}.jpg`
        };
      }
      return { letter: char, url: null };
    });
  }, [userName]);

  // Pre-generate random stars for the background
  const starsArray = useMemo(() => {
    return Array.from({ length: 180 }).map(() => ({
      left: `${Math.random() * 100}vw`,
      top: `${Math.random() * 100}vh`,
      size: `${Math.random() * 2.5 + 1}px`,
      opacity: Math.random() * 0.7 + 0.3,
      animationDelay: `${Math.random() * 5}s`,
      depth: Math.random()
    }));
  }, []);

  // Pre-generate confetti particles
  const confettiArray = useMemo(() => {
    return Array.from({ length: 120 }).map(() => ({
      angle: Math.random() * 360,
      distance: Math.random() * 150 + 50,
      size: Math.random() * 6 + 2,
      color: ['#0ff', '#f0f', '#fff', '#fcd34d'][Math.floor(Math.random() * 4)],
      rotation: Math.random() * 720,
      duration: Math.random() * 1.5 + 1
    }));
  }, []);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // Fullscreen Stardust Canvas Emitter
  useEffect(() => {
    if (showIntro) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let isHidden = false;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    const handleVisibility = () => {
      isHidden = document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const spawnParticles = (x, y, count = 3, force = 1) => {
      const maxParticles = isTouchDevice ? 50 : 120;
      if (particles.length > maxParticles) return;

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2 * force;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 0.3,
          vy: Math.sin(angle) * speed - 0.4,
          size: Math.random() * 2.5 + 1,
          color: ['#0ff', '#f0f', '#fff', '#fcd34d'][Math.floor(Math.random() * 4)],
          alpha: 1,
          decay: Math.random() * 0.02 + 0.015
        });
      }
    };

    const triggerSupernovaBlast = (e) => {
      const x = e.detail?.x || window.innerWidth / 2;
      const y = e.detail?.y || window.innerHeight / 2;
      spawnParticles(x, y, 100, 5);
    };

    const triggerConfettiBurst = (e) => {
      const x = e.detail?.x || Math.random() * window.innerWidth;
      const y = e.detail?.y || Math.random() * window.innerHeight * 0.8;
      spawnParticles(x, y, 30, 2.5);
    };

    window.addEventListener('supernova-blast', triggerSupernovaBlast);
    window.addEventListener('confetti-burst', triggerConfettiBurst);

    const animate = () => {
      if (!isHidden) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= p.decay;

          if (p.alpha <= 0) {
            particles.splice(i, 1);
          } else {
            ctx.save();
            ctx.globalAlpha = p.alpha;
            ctx.shadowBlur = 6;
            ctx.shadowColor = p.color;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('supernova-blast', triggerSupernovaBlast);
      window.removeEventListener('confetti-burst', triggerConfettiBurst);
      document.removeEventListener('visibilitychange', handleVisibility);
      cancelAnimationFrame(animationFrameId);
    };
  }, [showIntro, isTouchDevice]);

  // Continuous background confetti blasts upon claim
  useEffect(() => {
    if (showConfetti) {
      const interval = setInterval(() => {
        const event = new CustomEvent('confetti-burst', {
          detail: {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight * 0.7
          }
        });
        window.dispatchEvent(event);
      }, 700);
      return () => clearInterval(interval);
    }
  }, [showConfetti]);

  // Typing effect for main Holo-Glass story
  useEffect(() => {
    if (phase >= 3) {
      let currentLength = 0;
      let intervalId = null;
      const startTyping = setTimeout(() => {
        intervalId = setInterval(() => {
          currentLength++;
          setTypedChars(currentLength);
          if (currentLength >= fullStory.length) {
            clearInterval(intervalId);
          }
        }, 30);
      }, 1500);

      return () => {
        clearTimeout(startTyping);
        if (intervalId) clearInterval(intervalId);
      };
    }
  }, [phase, fullStory]);

  // Miracle typing effect
  useEffect(() => {
    if (!miracleOpen) return;
    setMiracleTypedChars(0);
    let currentLength = 0;
    const intervalId = setInterval(() => {
      currentLength += 1;
      setMiracleTypedChars(currentLength);
      if (currentLength >= miracleMessage.length) {
        clearInterval(intervalId);
      }
    }, 40);
    return () => clearInterval(intervalId);
  }, [miracleOpen, miracleMessage]);

  // Audio cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    soundEffects.playClick();
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => console.log("Play failed:", err));
    }
  };

  const handleMusicVolumeChange = (e) => {
    const newVol = Number(e.target.value);
    setMusicVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = isVoicePlaying ? newVol * 0.15 : newVol;
    }
  };

  const toggleGlobalMute = () => {
    const muted = soundEffects.toggleMute();
    setIsMuted(muted);
    if (audioRef.current) {
      audioRef.current.muted = muted;
    }
  };

  const sendWish = () => {
    const trimmedWish = wishInput.trim();
    if (!trimmedWish) return;
    soundEffects.playStarChime();
    setSentWish(trimmedWish);
    setWishInput('');
    setShowConfetti(true);
    setWishesCount((prev) => prev + 1);
    unlockAchievement('wish_maker');
  };

  const openMiracle = () => {
    soundEffects.playOpenModal();
    setMiracleOpen(true);
    setPhase(3);
    trackSecretDiscovered('miracle_box');
  };

  // Called when user clicks YES on the black intro: transitions to Phase 0 (Name Input Landing Screen)
  const handleIntroYes = () => {
    setShowIntro(false);
  };

  // Called when user enters their name and submits the landing form
  const handleIgniteSubmit = (e) => {
    if (e) e.preventDefault();
    soundEffects.playClick();

    const finalName = (nameInput.trim() || birthdayConfig.name || "HEMANTH").trim();
    setUserName(finalName.toUpperCase());

    // Safe music ignition from user interaction
    try {
      if (!audioRef.current) {
        const audio = new Audio('/song.mp3');
        audio.currentTime = 40;
        audio.volume = musicVolume;
        audio.play().then(() => {
          setIsPlaying(true);
        }).catch(err => {
          console.log("Audio playback deferred:", err);
        });
        audioRef.current = audio;
      } else {
        audioRef.current.currentTime = 40;
        audioRef.current.volume = musicVolume;
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    } catch (err) {
      console.log("Audio creation error:", err);
    }

    // Trigger supernova explosion in particles
    const event = new CustomEvent('supernova-blast', {
      detail: { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    });
    window.dispatchEvent(event);

    // Sequence progression
    setPhase(1); // Supernova flash

    setTimeout(() => {
      setPhase(2); // Space appears, cinematic subtitles
    }, 1500);

    setTimeout(() => {
      setPhase(3); // Holo-Glass letter and all content reveal
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 7000);
  };

  // Easter egg: rapid title clicks
  const handleTitleClick = () => {
    const nextCount = titleClickCount + 1;
    setTitleClickCount(nextCount);
    soundEffects.playStarChime();

    if (nextCount >= 5) {
      soundEffects.playSecretUnlock();
      trackSecretDiscovered('title_multi_click');
      const burstEvent = new CustomEvent('confetti-burst', {
        detail: { x: window.innerWidth / 2, y: window.innerHeight / 3 }
      });
      window.dispatchEvent(burstEvent);
      setTitleClickCount(0);
    }
  };

  // Memory opened handler
  const handleMemoryViewed = useCallback((memoryId) => {
    setDiscoveredMemories((prev) => {
      const next = new Set(prev);
      next.add(memoryId);
      return next;
    });
    unlockAchievement('memory_keeper');
  }, [unlockAchievement]);

  // Star caught in mini-game
  const handleStarCaught = useCallback((caughtCount, total) => {
    setStarsCaughtCount(caughtCount);
    if (caughtCount === 1) {
      unlockAchievement('first_star');
    }
  }, [unlockAchievement]);

  // Voice message playback status change
  const handleVoicePlaybackChange = useCallback((playing) => {
    setIsVoicePlaying(playing);
  }, []);

  const handleVoiceListened = useCallback(() => {
    setVoiceListened(true);
    unlockAchievement('listener');
  }, [unlockAchievement]);

  // Cake completion
  const handleCakeCompleted = useCallback(() => {
    setWishesCount((prev) => prev + 1);
    unlockAchievement('candle_master');
  }, [unlockAchievement]);

  // Safe reset function for "EXPERIENCE AGAIN"
  const handleRestartExperience = useCallback(() => {
    setShowFinale(false);
    setShowMissionComplete(false);
    setShowSecretFinalEnding(false);
    setShowConfetti(false);
    setMiracleOpen(false);
    setTypedChars(0);
    setSentWish('');
    setWishInput('');
    setActiveMemoryId(null);
    setPhase(0);
    setShowIntro(true);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 40;
      setIsPlaying(false);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleFinishFinale = useCallback(() => {
    setShowFinale(false);
    setShowMissionComplete(true);
    unlockAchievement('experience_complete');
  }, [unlockAchievement]);

  // Compute live journey statistics
  const journeyStatsData = useMemo(() => {
    const totalMem = birthdayConfig.memories?.length || 5;
    const totalSec = (birthdayConfig.secretStars?.length || 7) + 3; // stars + box + easter egg + planet
    const totalSt = 10;
    
    // Milestones completion score
    let points = 0;
    if (phase >= 3) points += 20;
    if (discoveredMemories.size > 0) points += 15;
    if (starsCaughtCount >= 10) points += 20;
    if (voiceListened) points += 15;
    if (wishesCount > 0) points += 15;
    if (showMissionComplete) points += 15;

    const completionPercent = Math.min(100, points);

    return {
      memoriesDiscovered: discoveredMemories.size,
      totalMemories: totalMem,
      secretsFound: discoveredSecrets.size,
      totalSecrets: totalSec,
      starsCollected: starsCaughtCount,
      totalStars: totalSt,
      wishesMade: wishesCount,
      journeyCompleted: showMissionComplete ? 100 : completionPercent
    };
  }, [phase, discoveredMemories.size, discoveredSecrets.size, starsCaughtCount, voiceListened, wishesCount, showMissionComplete]);

  return (
    <div className={`cinematic-verse phase-${phase} ${showConfetti ? 'claimed' : ''}`}>
      {/* =========================================================
          1. FIRST SCREEN — PURE BLACK CINEMATIC INTRO
          ========================================================= */}
      {showIntro ? (
        <CinematicIntro onYes={handleIntroYes} />
      ) : (
        <>
          {/* Global Mute / Sound FX Control */}
          <div className="global-sound-dock">
            <button
              className="sound-toggle-pill"
              onClick={toggleGlobalMute}
              title={isMuted ? "Unmute Sound Effects" : "Mute Sound Effects"}
              aria-label="Toggle sound effects"
            >
              <span>{isMuted ? "🔇 SOUND MUTED" : "🔊 SOUND ON"}</span>
            </button>
          </div>

          {/* Fullscreen Stardust Layer */}
          <canvas ref={canvasRef} className="stardust-canvas" />
          <div className={`energy-ring ${phase >= 2 ? 'active' : ''}`} />
          <div className={`spectral-trails ${phase >= 2 ? 'active' : ''}`} />
          <div className={`glitch-grid ${phase === 0 ? 'intro' : ''}`} />

          {/* THE COSMOS LAYER (Parallax background) */}
          <div
            className={`cosmos-bg ${showConfetti ? 'warping' : ''}`}
            style={{
              opacity: phase >= 2 ? 1 : 0
            }}
          >
            <div className="nebula-layer" />
            {starsArray.map((star, i) => (
              <div
                key={i}
                className="twinkle-star"
                style={{
                  left: star.left,
                  top: star.top,
                  width: star.size,
                  height: star.size,
                  opacity: star.opacity,
                  animationDelay: star.animationDelay,
                  '--depth': star.depth
                }}
              />
            ))}
          </div>

          {/* Celestial Background Interactive Elements */}
          {phase >= 2 && (
            <>
              <ShootingStars />
              <InteractiveMoon
                moonConfig={birthdayConfig.moon}
                onMoonExplored={() => {
                  trackSecretDiscovered('moon_watcher');
                  unlockAchievement('moon_explorer');
                }}
              />
              <InteractivePlanet
                planetConfig={birthdayConfig.planet}
                onPlanetScanned={() => {
                  trackSecretDiscovered('planet_scanned');
                }}
              />
              <SecretStars
                secretStars={birthdayConfig.secretStars}
                onStarDiscovered={(found, total) => {
                  trackSecretDiscovered(`star_${found}`);
                }}
              />
            </>
          )}

          {/* =========================================================
              PHASE 0: LANDING NAME INPUT SCREEN
              ========================================================= */}
          {phase === 0 && (
            <div className="landing-form-container">
              <div className="landing-form" onClick={(e) => e.stopPropagation()}>
                <ChapterLabel
                  number="CHAPTER I"
                  title="A LITTLE SURPRISE"
                  subtitle="Ignite the cosmic celebration"
                />
                <h2 className="landing-title">Enter Name for Surprise</h2>
                <form onSubmit={handleIgniteSubmit}>
                  <input 
                    type="text" 
                    className="name-input-field" 
                    value={nameInput} 
                    onChange={(e) => setNameInput(e.target.value)}
                    placeholder="Enter name (e.g. Hemanth)"
                    maxLength={18}
                    autoFocus
                  />
                  <button type="submit" className="ignite-button">
                    Ignite Cinematic Universe
                  </button>
                </form>
                <div className="blinking-prompt">
                  {isTouchDevice ? "Touch button to ignite." : "Type a name and ignite the universe."}
                </div>
              </div>
            </div>
          )}

          {/* SUPERNOVA FLASHBANG LAYER */}
          <div className={`flashbang ${phase === 1 ? 'detonate' : ''}`} />

          {/* CINEMATIC SUBTITLES LAYER */}
          {phase >= 2 && (
            <div className={`cinematic-subtitle-layer ${phase >= 3 ? 'fade-away' : ''}`}>
              <h1 className="cinematic-prose line-one">Sometimes, the universe pauses...</h1>
              <h1 className="cinematic-prose line-two">Just to celebrate a singular moment.</h1>
            </div>
          )}

          {/* =========================================================
              PHASE >= 3: THE ARTIFACT & EXTENDED UNIVERSE
              ========================================================= */}
          {phase >= 3 && (
            <div className="artifact-container">
              {/* STABLE, NON-TILTING MAIN HOLO-GLASS CARD */}
              <div className="holo-glass-card" id="card">
                {/* Confetti Explosion Layer inside card */}
                {showConfetti && (
                  <div className="confetti-origin">
                    {confettiArray.map((c, i) => (
                      <div 
                        key={`confetti-${i}`} 
                        className="confetti-shard"
                        style={{
                          '--angle': `${c.angle}deg`,
                          '--dist': `${c.distance}vw`,
                          '--size': `${c.size}px`,
                          '--color': c.color,
                          '--rot': `${c.rotation}deg`,
                          '--dur': `${c.duration}s`
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Elegant Polaroid frames */}
                <div className="hologram hologram-left">
                  <div className="holo-frame-photo img-left" />
                  <span className="holo-photo-caption">Happy Times ✨</span>
                </div>
                <div className="hologram hologram-right">
                  <div className="holo-frame-photo img-right" />
                  <span className="holo-photo-caption">Next Chapter 🌟</span>
                </div>

                {/* Cute Celebration Animated Stickers & Gifs */}
                <CuteCelebrationStickers />

                {/* Main Magnificent Card Title */}
                <h1 
                  className="card-magnificent-title" 
                  onClick={handleTitleClick}
                  title="Click me ✨"
                  style={{ cursor: 'pointer' }}
                >
                  Happy Birthday, {userName}.
                </h1>

                {/* NASA Landsat Name Speller - Generated for EVERY letter of userName */}
                <div className="landsat-name-speller">
                  <div className="landsat-title">YOUR NAME IN SATELLITE IMAGES (NASA LANDSAT):</div>
                  <div className="landsat-row">
                    {landsatImages.map((img, idx) => (
                      img.url ? (
                        <div key={idx} className="landsat-tile">
                          <img src={img.url} alt={img.letter} className="landsat-img" />
                          <span className="landsat-letter">{img.letter}</span>
                        </div>
                      ) : (
                        <div key={idx} className="landsat-space" />
                      )
                    ))}
                  </div>
                </div>

                <div className="card-story">
                  <p className="typing-text">
                    {fullStory.substring(0, typedChars)}
                    {typedChars < fullStory.length && phase >= 3 && <span className="cursor-blink highlight-cursor">|</span>}
                  </p>
                  
                  {typedChars >= fullStory.length && (
                    <>
                      <div className="wish-box">
                        <p className="wish-heading">Type your wish to make it real.</p>
                        <div className="wish-input-row">
                          <input
                            type="text"
                            className="wish-input-field"
                            placeholder="Write your wish..."
                            value={wishInput}
                            onChange={(e) => setWishInput(e.target.value)}
                            maxLength={120}
                          />
                          <button className="send-wish-button" onClick={sendWish}>
                            Send Wish
                          </button>
                        </div>
                        {sentWish && <p className="wish-confirm">Wish sent: “{sentWish}”</p>}
                        <button className="miracle-button" onClick={openMiracle}>
                          Miracle
                        </button>
                        {miracleOpen && (
                          <div className="miracle-panel">
                            <p className="miracle-message">
                              {miracleMessage.substring(0, miracleTypedChars)}
                              {miracleTypedChars < miracleMessage.length && <span className="cursor-blink highlight-cursor">|</span>}
                            </p>
                            {miracleTypedChars >= miracleMessage.length && (
                              <p className="miracle-note">{miracleNote}</p>
                            )}
                          </div>
                        )}
                      </div>

                      <button 
                        className={`claim-button ${showConfetti ? 'claimed' : ''}`}
                        onClick={() => {
                          setShowConfetti(true);
                          unlockAchievement('wish_maker');
                        }}
                      >
                        {showConfetti ? "WISH GRANTED! 🎉" : "MAKE A WISH 🎂"}
                      </button>

                      {showConfetti && (
                        <div className="emoji-birthday-chart">
                          <div className="emoji-row">🎉 🎂 🎈 🎁 ✨ 🍰 🥳 🥂 🧁 🎉</div>
                          <div className="chart-body">
                            <div className="cute-gifs-row">
                              <img
                                src="/bear.gif"
                                alt="party bear"
                                className="cute-gif"
                                onError={(e) => {
                                  e.target.src = 'https://fonts.gstatic.com/s/e/notoemoji/latest/1f43b/512.gif';
                                }}
                              />
                              <img
                                src="/cat.gif"
                                alt="party cat"
                                className="cute-gif"
                                onError={(e) => {
                                  e.target.src = 'https://fonts.gstatic.com/s/e/notoemoji/latest/1f431/512.gif';
                                }}
                              />
                              <img
                                src="/party.gif"
                                alt="party celebration"
                                className="cute-gif"
                                onError={(e) => {
                                  e.target.src = 'https://fonts.gstatic.com/s/e/notoemoji/latest/1f973/512.gif';
                                }}
                              />
                            </div>
                            <h2 className="chart-heading">HAPPY BIRTHDAY</h2>
                            <h1 className="chart-name">{userName}</h1>
                            <p className="chart-text">May your special day be filled with endless joy, beautiful smiles, and magical moments! 💖</p>
                          </div>
                          <div className="emoji-row">🧁 🥂 🥳 🍰 ✨ 🎁 🎉 🎈 🎂 🎉</div>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Custom Audio Player & Music Visualizer Deck */}
                <div className="audio-control-deck">
                  <div className="audio-status" onClick={togglePlay} style={{ cursor: 'pointer' }}>
                    <div className={`eq-bars ${isPlaying ? 'playing' : ''}`}>
                      <span /><span /><span />
                    </div>
                    {isPlaying ? "Vibe Status: Playing song.mp3 🎵" : "Vibe Status: Paused (Click to Play)"}
                  </div>
                  <div className="custom-player-controls">
                    <button className="play-toggle-btn" onClick={togglePlay}>
                      {isPlaying ? "PAUSE ⏸" : "PLAY ▶"}
                    </button>
                    <span className="song-timestamp">Playing from 0:40</span>

                    {/* Master Music Volume Slider */}
                    <div className="music-volume-control">
                      <span className="vol-icon">{musicVolume === 0 ? "🔇" : "🎵"}</span>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={musicVolume}
                        onChange={handleMusicVolumeChange}
                        className="music-vol-slider"
                        title="Background music volume"
                        aria-label="Background music volume"
                      />
                    </div>
                  </div>
                  {/* Visualizer */}
                  <MusicVisualizer isPlaying={isPlaying} />
                </div>
              </div>

              {/* CHAPTER II: OUR MEMORIES */}
              <div id="memories" className="universe-section-wrapper">
                <ChapterLabel
                  number="CHAPTER II"
                  title="OUR MEMORIES"
                  subtitle="Constellations of timeless moments"
                />
                <MemoryUniverse
                  memories={birthdayConfig.memories}
                  activeMemoryId={activeMemoryId}
                  onSelectMemory={setActiveMemoryId}
                  onMemoryViewed={handleMemoryViewed}
                />
                <MemoryTimeline
                  memories={birthdayConfig.memories}
                  activeMemoryId={activeMemoryId}
                  onSelectMemory={setActiveMemoryId}
                />
              </div>

              {/* CHAPTER III: CATCH THE STARS MINI-GAME */}
              <div id="mini-game" className="universe-section-wrapper">
                <ChapterLabel
                  number="CHAPTER III"
                  title="CATCH THE STARS"
                  subtitle="A quiet, relaxing moment in the cosmos"
                />
                <CatchTheStars
                  gameConfig={birthdayConfig.catchTheStars}
                  onStarCaught={handleStarCaught}
                  onCompleted={() => {
                    unlockAchievement('first_star');
                  }}
                  onContinue={() => {
                    const elem = document.getElementById('letter');
                    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                  }}
                />
              </div>

              {/* CHAPTER IV: HANDWRITTEN LETTER */}
              <div id="letter" className="universe-section-wrapper">
                <ChapterLabel
                  number="CHAPTER IV"
                  title="A FEW WORDS"
                  subtitle="Written from the heart, made just for today"
                />
                <HandwrittenLetter
                  letterConfig={birthdayConfig.letter}
                  recipientName={userName}
                  signature={birthdayConfig.signature}
                />
              </div>

              {/* CHAPTER V: PERSONAL VOICE MESSAGE */}
              <div id="voice-message" className="universe-section-wrapper">
                <ChapterLabel
                  number="CHAPTER V"
                  title="SOMETHING JUST FOR YOU"
                  subtitle="A personal audio note"
                />
                <VoiceMessage
                  voiceConfig={birthdayConfig.voiceMessage}
                  onPlaybackChange={handleVoicePlaybackChange}
                  onVoiceListened={handleVoiceListened}
                />
              </div>

              {/* CHAPTER VI: INTERACTIVE BIRTHDAY CAKE */}
              <div id="cake" className="universe-section-wrapper">
                <ChapterLabel
                  number="CHAPTER VI"
                  title="MAKE A WISH"
                  subtitle="Blow out the candles and release your wish"
                />
                <InteractiveCake
                  cakeConfig={birthdayConfig.cake}
                  recipientName={userName}
                  onCakeCompleted={handleCakeCompleted}
                />
              </div>

              {/* CHAPTER VII: SECRET KEEPSAKES (Box & DNA) */}
              <div className="universe-section-wrapper">
                <ChapterLabel
                  number="CHAPTER VII"
                  title="SECRET KEEPSAKES"
                  subtitle="Hidden treasures & friendship blueprint"
                />
                <SecretBox
                  boxConfig={birthdayConfig.secretBox}
                  onSecretBoxOpened={() => trackSecretDiscovered('secret_mystery_box')}
                />
                <BirthdayDNA userName={userName} />
              </div>

              {/* CHAPTER VIII: Bottom Finale Trigger Banner */}
              <div id="finale" className="universe-section-wrapper" style={{ textAlign: 'center', margin: '60px auto 40px auto' }}>
                <ChapterLabel
                  number="CHAPTER VIII"
                  title="ONE LAST THING"
                  subtitle="The grand cinematic celebration"
                />
                <button
                  className="claim-button finale-launch-btn"
                  onClick={() => setShowFinale(true)}
                >
                  🎬 EXPERIENCE THE CINEMATIC FINALE 🌟
                </button>
              </div>
            </div>
          )}

          {/* PROGRESS JOURNEY INDICATOR */}
          {phase >= 3 && (
            <ProgressIndicator
              currentStep={showConfetti ? 5 : 1}
              onTriggerFinale={() => setShowFinale(true)}
            />
          )}

          {/* ACHIEVEMENT TOAST & QUICK DOCK */}
          <AchievementToaster
            unlockedIds={unlockedAchievements}
            lastUnlockedId={lastUnlockedAchievement}
          />

          {/* EASTER EGGS SYSTEM */}
          <EasterEggs
            userName={userName}
            easterEggConfig={birthdayConfig.easterEggs}
            onEasterEggFound={() => trackSecretDiscovered('easter_egg_code')}
          />

          {/* CINEMATIC FINALE OVERLAY */}
          {showFinale && (
            <CinematicFinale
              recipientName={userName}
              onFinish={handleFinishFinale}
              onCancel={() => setShowFinale(false)}
            />
          )}

          {/* MISSION COMPLETE DASHBOARD */}
          {showMissionComplete && (
            <MissionComplete
              recipientName={userName}
              stats={journeyStatsData}
              onRestart={handleRestartExperience}
              onTriggerSecretEnding={() => setShowSecretFinalEnding(true)}
            />
          )}

          {/* SECRET FINAL ENDING OVERLAY */}
          {showSecretFinalEnding && (
            <SecretFinalEnding
              endingConfig={birthdayConfig.secretEnding}
              recipientName={userName}
              signature={birthdayConfig.signature}
              onClose={() => setShowSecretFinalEnding(false)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default BirthdaySurprise;
