// ====================================================================
// SOUND EFFECTS ENGINE (Web Audio API Synthesizer)
// Provides lightweight, beautiful procedural audio without external dependencies
// ====================================================================

let audioCtx = null;
let isMuted = false;

const getAudioContext = () => {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
};

export const soundEffects = {
  isMuted: () => isMuted,
  
  toggleMute: () => {
    isMuted = !isMuted;
    return isMuted;
  },

  setMute: (muted) => {
    isMuted = muted;
  },

  // Soft high-frequency chime for star click / small interactions
  playStarChime: () => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      
      const now = ctx.currentTime;
      const notes = [587.33, 880, 1174.66, 1760]; // D5, A5, D6, A6
      
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);
        
        gain.gain.setValueAtTime(0, now + idx * 0.05);
        gain.gain.linearRampToValueAtTime(0.08, now + idx * 0.05 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + 0.8);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(now + idx * 0.05);
        osc.stop(now + idx * 0.05 + 0.85);
      });
    } catch (e) {}
  },

  // Catch the Stars mini-game chime that pitches up as stars are collected
  playCatchStar: (pitchIndex = 0) => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      // Pentatonic major scale (C5, D5, E5, G5, A5, C6, D6, E6, G6, A6)
      const scale = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50, 1174.66, 1318.51, 1567.98, 1760.00];
      const baseFreq = scale[Math.min(pitchIndex, scale.length - 1)] || 523.25;

      const osc = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, now + 0.15);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(baseFreq * 2, now + 0.02);
      osc2.frequency.exponentialRampToValueAtTime(baseFreq * 2.5, now + 0.18);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

      osc.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc2.start(now);
      osc.stop(now + 0.46);
      osc2.stop(now + 0.46);
    } catch (e) {}
  },

  // Achievement unlock chime
  playAchievement: () => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      // Radiant fanfare chord (E5 -> G#5 -> B5 -> E6)
      const chord = [659.25, 830.61, 987.77, 1318.51];

      chord.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        gain.gain.setValueAtTime(0, now + idx * 0.06);
        gain.gain.linearRampToValueAtTime(0.07, now + idx * 0.06 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 1.25);
      });
    } catch (e) {}
  },

  // Gentle emotional chime for Voice Message completion & secret ending
  playEmotionalChime: () => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const notes = [440, 554.37, 659.25, 880, 1108.73]; // A major 9th warmth

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0, now + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.05, now + idx * 0.08 + 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 2.5);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 2.6);
      });
    } catch (e) {}
  },

  // Soft subtle click sound
  playClick: () => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.06);
      
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now);
      osc.stop(now + 0.07);
    } catch (e) {}
  },

  // Soft whoosh / chime for opening modals & letter
  playOpenModal: () => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      
      const now = ctx.currentTime;
      const chord = [440, 554.37, 659.25, 880]; // A major
      
      chord.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.04);
        
        gain.gain.setValueAtTime(0, now + idx * 0.04);
        gain.gain.linearRampToValueAtTime(0.07, now + idx * 0.04 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.04 + 1.2);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(now + idx * 0.04);
        osc.stop(now + idx * 0.04 + 1.25);
      });
    } catch (e) {}
  },

  // Candle extinguish gentle puff / sparkle
  playCandleBlow: () => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      
      const now = ctx.currentTime;
      
      // Noise buffer for gentle breath/puff
      const bufferSize = ctx.sampleRate * 0.2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      
      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = buffer;
      
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1000, now);
      filter.frequency.exponentialRampToValueAtTime(200, now + 0.18);
      
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);
      
      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      
      whiteNoise.start(now);
      whiteNoise.stop(now + 0.2);

      // Sweet subtle chime alongside
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1320, now + 0.05);
      oscGain.gain.setValueAtTime(0.03, now + 0.05);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);
      osc.connect(oscGain);
      oscGain.connect(ctx.destination);
      osc.start(now + 0.05);
      osc.stop(now + 0.45);
    } catch (e) {}
  },

  // Celebration fanfare / celestial triumph for all candles extinguished & finale
  playCelebrationChord: () => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      
      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98]; // C maj9 arpeggio
      
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);
        
        gain.gain.setValueAtTime(0, now + idx * 0.07);
        gain.gain.linearRampToValueAtTime(0.09, now + idx * 0.07 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.07 + 2.0);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 2.1);
      });
    } catch (e) {}
  },

  // Secret discovery shimmer sound
  playSecretUnlock: () => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      
      const now = ctx.currentTime;
      const freqs = [659.25, 830.61, 987.77, 1318.51, 1661.22];
      
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        
        gain.gain.setValueAtTime(0, now + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.08, now + idx * 0.08 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 1.5);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 1.6);
      });
    } catch (e) {}
  }
};
