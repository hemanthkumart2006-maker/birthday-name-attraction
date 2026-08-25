import React from 'react';

const MusicVisualizer = ({ isPlaying }) => {
  return (
    <div className={`music-visualizer-dock ${isPlaying ? 'is-playing' : 'is-paused'}`}>
      <div className="visualizer-bars-group">
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className="viz-bar"
            style={{
              animationDelay: `${(i % 6) * 0.12}s`,
              animationDuration: `${0.4 + (i % 4) * 0.15}s`
            }}
          />
        ))}
      </div>
      <span className="visualizer-label">
        {isPlaying ? "LIVE AUDIO VISUALIZER 🎶" : "AUDIO PAUSED"}
      </span>
    </div>
  );
};

export default MusicVisualizer;
