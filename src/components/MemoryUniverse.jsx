import React, { useState, useEffect, useCallback } from 'react';
import { soundEffects } from '../utils/soundEffects';

const MemoryUniverse = ({ memories, activeMemoryId, onSelectMemory, onMemoryViewed }) => {
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [touchStartX, setTouchStartX] = useState(0);

  // Sync if activeMemoryId changes from timeline
  useEffect(() => {
    if (activeMemoryId) {
      const found = memories.find((m) => m.id === activeMemoryId);
      if (found) {
        setSelectedMemory(found);
        if (onMemoryViewed) onMemoryViewed(found.id);
      }
    }
  }, [activeMemoryId, memories, onMemoryViewed]);

  const openModal = (memory) => {
    soundEffects.playOpenModal();
    setSelectedMemory(memory);
    if (onSelectMemory) onSelectMemory(memory.id);
    if (onMemoryViewed) onMemoryViewed(memory.id);
  };

  const closeModal = useCallback(() => {
    soundEffects.playClick();
    setSelectedMemory(null);
    if (onSelectMemory) onSelectMemory(null);
  }, [onSelectMemory]);

  const nextMemory = useCallback(() => {
    if (!selectedMemory) return;
    const currentIndex = memories.findIndex((m) => m.id === selectedMemory.id);
    const nextIndex = (currentIndex + 1) % memories.length;
    soundEffects.playClick();
    setSelectedMemory(memories[nextIndex]);
    if (onSelectMemory) onSelectMemory(memories[nextIndex].id);
  }, [selectedMemory, memories, onSelectMemory]);

  const prevMemory = useCallback(() => {
    if (!selectedMemory) return;
    const currentIndex = memories.findIndex((m) => m.id === selectedMemory.id);
    const prevIndex = (currentIndex - 1 + memories.length) % memories.length;
    soundEffects.playClick();
    setSelectedMemory(memories[prevIndex]);
    if (onSelectMemory) onSelectMemory(memories[prevIndex].id);
  }, [selectedMemory, memories, onSelectMemory]);

  // Keyboard navigation (ESC, ArrowLeft, ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedMemory) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') nextMemory();
      if (e.key === 'ArrowLeft') prevMemory();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedMemory, closeModal, nextMemory, prevMemory]);

  // Touch swipe handling for mobile
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (!touchStartX) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 50) nextMemory();
    else if (diff < -50) prevMemory();
    setTouchStartX(0);
  };

  return (
    <section className="memory-universe-section" id="memory-universe">
      <div className="memory-header-box">
        <span className="memory-super-badge">COSMIC ARCHIVE</span>
        <h2 className="memory-universe-title">OUR MEMORIES</h2>
        <p className="memory-universe-subtitle">
          Every moment with you is a constellation in this universe. Click any card to explore.
        </p>
      </div>

      {/* Floating 3D Cards Grid */}
      <div className="memory-cards-grid">
        {memories.map((mem, index) => (
          <div
            key={mem.id}
            className={`memory-card-wrapper card-item-${index + 1}`}
            onClick={() => openModal(mem)}
            role="button"
            tabIndex={0}
            aria-label={`View memory: ${mem.title}`}
            onKeyDown={(e) => e.key === 'Enter' && openModal(mem)}
          >
            <div className="memory-card-3d">
              <div className="memory-card-glow-aura" />
              <div className="memory-card-inner">
                <div className="memory-image-container">
                  <img
                    src={mem.image}
                    alt={mem.title}
                    className="memory-card-photo"
                    loading="lazy"
                    onError={(e) => {
                      // Fallback if image fails
                      e.target.src = 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80';
                    }}
                  />
                  <span className="memory-badge-tag">{mem.tag || mem.date}</span>
                </div>
                <div className="memory-card-info">
                  <span className="memory-date-label">{mem.date}</span>
                  <h3 className="memory-card-heading">{mem.title}</h3>
                  <p className="memory-card-snippet">{mem.description}</p>
                  <div className="memory-card-footer">
                    <span className="expand-pill">View Memory 🔍</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cinematic Lightbox Modal */}
      {selectedMemory && (
        <div
          className="memory-lightbox-backdrop"
          onClick={closeModal}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="memory-lightbox-card"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <button
              className="lightbox-close-btn"
              onClick={closeModal}
              aria-label="Close memory modal"
            >
              ✕
            </button>

            <button
              className="lightbox-nav-btn prev-btn"
              onClick={prevMemory}
              aria-label="Previous memory"
            >
              ‹
            </button>

            <button
              className="lightbox-nav-btn next-btn"
              onClick={nextMemory}
              aria-label="Next memory"
            >
              ›
            </button>

            <div className="lightbox-content">
              <div className="lightbox-image-wrap">
                <img
                  src={selectedMemory.image}
                  alt={selectedMemory.title}
                  className="lightbox-full-img"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80';
                  }}
                />
              </div>
              <div className="lightbox-details">
                <div className="lightbox-tag-row">
                  <span className="lightbox-date-chip">{selectedMemory.date}</span>
                  <span className="lightbox-special-chip">{selectedMemory.tag || "Unforgettable Moment"}</span>
                </div>
                <h2 className="lightbox-title">{selectedMemory.title}</h2>
                <p className="lightbox-description">{selectedMemory.description}</p>
                <div className="lightbox-action-row">
                  <span className="lightbox-nav-hint">Use arrow keys or swipe to browse 💫</span>
                  <button className="lightbox-done-btn" onClick={closeModal}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MemoryUniverse;
