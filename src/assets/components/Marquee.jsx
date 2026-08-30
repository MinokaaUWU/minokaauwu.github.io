import React from 'react';
import './Marquee.css';

export const Marquee = ({ text }) => {
  return (
    <div className="marquee-container">
      <div className="marquee-track">
        <span className="marquee-item">{text}</span>
        <span className="marquee-item">{text}</span>
      </div>
    </div>
  );
};