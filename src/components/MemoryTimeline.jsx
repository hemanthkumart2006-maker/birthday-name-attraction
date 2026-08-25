import React from 'react';
import { soundEffects } from '../utils/soundEffects';

const MemoryTimeline = ({ memories, onSelectMemory, activeMemoryId }) => {
  const handleNodeClick = (id) => {
    soundEffects.playStarChime();
    if (onSelectMemory) {
      onSelectMemory(id);
    }
  };

  return (
    <div className="cosmic-timeline-container">
      <div className="timeline-title-bar">
        <span className="timeline-subtitle">COSMIC MILESTONES</span>
        <h3 className="timeline-heading">JOURNEY THROUGH TIME</h3>
      </div>

      <div className="space-timeline-track">
        {/* Glowing cosmic energy conduit beam */}
        <div className="timeline-energy-line" />
        <div className="timeline-energy-glow-pulse" />

        <div className="timeline-nodes-wrapper">
          {memories.map((mem, index) => {
            const isActive = activeMemoryId === mem.id;
            return (
              <div
                key={mem.id}
                className={`timeline-node-item ${isActive ? 'active' : ''}`}
                onClick={() => handleNodeClick(mem.id)}
                role="button"
                tabIndex={0}
                aria-label={`Jump to ${mem.title}`}
                onKeyDown={(e) => e.key === 'Enter' && handleNodeClick(mem.id)}
              >
                <div className="node-beacon-ring">
                  <div className="node-core-dot" />
                  <div className="node-pulse-halo" />
                </div>
                <div className="node-label-box">
                  <span className="node-index-pill">0{index + 1}</span>
                  <span className="node-caption">{mem.title}</span>
                </div>
              </div>
            );
          })}

          {/* Final 'TODAY' celebration node */}
          <div
            className="timeline-node-item today-node active"
            onClick={() => handleNodeClick(memories[memories.length - 1]?.id)}
            role="button"
            tabIndex={0}
            aria-label="Celebrate Today"
          >
            <div className="node-beacon-ring today-ring">
              <div className="node-core-dot today-dot" />
              <div className="node-pulse-halo today-halo" />
            </div>
            <div className="node-label-box">
              <span className="node-index-pill today-pill">TODAY</span>
              <span className="node-caption">Celebration ✨</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoryTimeline;
