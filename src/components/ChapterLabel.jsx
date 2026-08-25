import React from 'react';

const ChapterLabel = ({ number, title, subtitle }) => {
  return (
    <div className="cinematic-chapter-banner">
      <div className="chapter-line-left" />
      <div className="chapter-content">
        <span className="chapter-number">{number}</span>
        <h2 className="chapter-title">{title}</h2>
        {subtitle && <p className="chapter-subtitle">{subtitle}</p>}
      </div>
      <div className="chapter-line-right" />
    </div>
  );
};

export default ChapterLabel;
