import React, { useState, useRef, useEffect } from 'react';
import { soundEffects } from '../utils/soundEffects';

const VoiceMessage = ({ voiceConfig = {}, onPlaybackChange, onVoiceListened }) => {
  const [isPlayerRevealed, setIsPlayerRevealed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isAvailable, setIsAvailable] = useState(true);
  const [volume, setVolume] = useState(1);
  const [hasEnded, setHasEnded] = useState(false);
  const audioRef = useRef(null);

  const audioSrc = voiceConfig.audioSrc || '/voice.mp3';

  // Inform parent when playing state changes so parent can duck/restore background music
  useEffect(() => {
    if (onPlaybackChange) {
      onPlaybackChange(isPlaying);
    }
  }, [isPlaying, onPlaybackChange]);

  useEffect(() => {
    const audio = new Audio();
    audio.src = audioSrc;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
      setIsAvailable(true);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime || 0);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(audio.duration || 0);
      setHasEnded(true);
      soundEffects.playEmotionalChime();
    };

    const handleError = () => {
      // Audio file not found or couldn't load -> graceful fallback
      setIsAvailable(false);
      setIsPlaying(false);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [audioSrc]);

  // Initial trigger button: reveals player and starts playback
  const handleInitialPlayClick = () => {
    soundEffects.playClick();
    setIsPlayerRevealed(true);

    if (onVoiceListened) {
      onVoiceListened();
    }

    if (audioRef.current && isAvailable) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // If browser policy or missing file prevents play, fall back gracefully
          setIsPlaying(false);
        });
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    soundEffects.playClick();

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      if (hasEnded) {
        audioRef.current.currentTime = 0;
        setHasEnded(false);
      }
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          if (onVoiceListened) onVoiceListened();
        })
        .catch(() => {
          setIsPlaying(false);
        });
    }
  };

  const handleSeek = (e) => {
    if (!audioRef.current || !duration) return;
    const newTime = Number(e.target.value);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const newVol = Number(e.target.value);
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
    }
  };

  const formatTime = (secs) => {
    if (!secs || isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="voice-message-container" id="voice-message">
      <div className="voice-message-card">
        <div className="voice-header-row">
          <div className="voice-icon-pulse">🎙</div>
          <div className="voice-text-header">
            <span className="voice-kicker">PERSONAL AUDIO NOTE</span>
            <h3 className="voice-title">
              {voiceConfig.title || "A Message I'd Rather Say Than Write"}
            </h3>
            <p className="voice-sub">
              {voiceConfig.subtitle || "Some things are easier to say than type."}
            </p>
          </div>
        </div>

        {/* Initial CTA button before player is revealed */}
        {!isPlayerRevealed ? (
          <div className="voice-cta-wrap">
            <button
              className="voice-launch-btn"
              onClick={handleInitialPlayClick}
              aria-label="Play personal voice message"
            >
              <span className="voice-launch-icon">🎙</span>
              <span>{voiceConfig.playButtonText || "PLAY MY MESSAGE"}</span>
            </button>
            <p className="voice-note-hint">Background music will soften gently while playing ✨</p>
          </div>
        ) : (
          /* Revealed Audio Player Controls */
          <div className="voice-player-controls fade-in-content">
            <div className="voice-main-row">
              <button
                className={`voice-play-btn ${isPlaying ? 'playing' : ''}`}
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause voice message' : 'Play voice message'}
              >
                {isPlaying ? '⏸ PAUSE' : '▶ PLAY'}
              </button>

              {/* Dynamic Waveform Visualizer */}
              <div className="voice-waveform-preview" aria-hidden="true">
                {Array.from({ length: 28 }).map((_, i) => {
                  const barHeight = isPlaying
                    ? Math.max(8, Math.sin((i * 0.7 + currentTime * 6)) * 24 + 14)
                    : 6;
                  return (
                    <span
                      key={i}
                      className={`wave-bar ${isPlaying ? 'active' : ''}`}
                      style={{
                        height: `${barHeight}px`,
                        animationDelay: `${i * 0.04}s`
                      }}
                    />
                  );
                })}
              </div>
            </div>

            {/* Progress Scrubber */}
            <div className="voice-scrubber-row">
              <span className="voice-time">{formatTime(currentTime)}</span>
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="voice-slider"
                aria-label="Voice progress"
              />
              <span className="voice-time">{formatTime(duration)}</span>
            </div>

            {/* Volume Control */}
            <div className="voice-volume-row">
              <span className="volume-label">🔈 Volume</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={handleVolumeChange}
                className="voice-vol-slider"
                aria-label="Voice volume"
              />
            </div>

            {/* Completion Banner */}
            {hasEnded && (
              <div className="voice-ended-banner fade-in-step">
                <span className="ended-heart">❤️</span>
                <p className="ended-text">
                  {voiceConfig.completionMessage || "Thank you for listening. ❤️"}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Non-crashing graceful fallback info if audio file fails to load */}
        {!isAvailable && (
          <div className="voice-fallback-box">
            <span className="voice-fallback-icon">🎧</span>
            <p className="voice-fallback-text">
              {voiceConfig.fallbackText ||
                "Personal voice message ready! You can drop an audio file named 'voice.mp3' in the root directory anytime."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceMessage;
