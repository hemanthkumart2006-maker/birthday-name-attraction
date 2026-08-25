import React from 'react';
import { soundEffects } from '../utils/soundEffects';

const ProgressIndicator = ({ currentStep, onJumpToSection, onTriggerFinale }) => {
  const steps = [
    { id: 'intro', label: 'IGNITE', icon: '✨' },
    { id: 'card', label: 'WISH CARD', icon: '🌌' },
    { id: 'memories', label: 'MEMORIES', icon: '📸' },
    { id: 'mini-game', label: 'MINI-GAME', icon: '⭐' },
    { id: 'letter', label: 'LETTER', icon: '💌' },
    { id: 'voice-message', label: 'VOICE', icon: '🎙' },
    { id: 'cake', label: 'CAKE', icon: '🎂' },
    { id: 'finale', label: 'FINALE', icon: '🎬' }
  ];

  const handleStepClick = (stepId) => {
    soundEffects.playClick();
    if (stepId === 'finale') {
      if (onTriggerFinale) onTriggerFinale();
      return;
    }

    const elem = document.getElementById(stepId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    } else if (onJumpToSection) {
      onJumpToSection(stepId);
    }
  };

  return (
    <nav className="cosmic-progress-dock" aria-label="Journey Progress">
      <div className="progress-dock-inner">
        {steps.map((s, idx) => {
          const isCompleted = idx <= currentStep;
          const isCurrent = idx === currentStep;

          return (
            <React.Fragment key={s.id}>
              <button
                className={`progress-step-node ${isCurrent ? 'current' : ''} ${isCompleted ? 'completed' : ''}`}
                onClick={() => handleStepClick(s.id)}
                title={`Jump to ${s.label}`}
              >
                <span className="step-icon">{s.icon}</span>
                <span className="step-label">{s.label}</span>
              </button>
              {idx < steps.length - 1 && <span className="step-connector" />}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
};

export default ProgressIndicator;
