
import React from "react";

const MovingHeaderLines: React.FC = () => (
  <svg
    className="moving-lines-bg moving-lines-svg"
    width="100%"
    height="100%"
    viewBox="0 0 1440 220"
    preserveAspectRatio="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none" }}
    focusable="false"
  >
    <g>
      <line x1="0" y1="38" x2="1440" y2="15" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" opacity="0.19"/>
      <line x1="70" y1="65" x2="1370" y2="135" stroke="#8b5cf6" strokeWidth="4" strokeDasharray="100 6" opacity="0.47"/>
      <line x1="20" y1="120" x2="1320" y2="155" stroke="#b794f4" strokeWidth="2.8" strokeDasharray="32 12" opacity="0.30"/>
      <line x1="0" y1="160" x2="1440" y2="195" stroke="#1ea0e9" strokeWidth="2.5" strokeDasharray="60 20" opacity="0.35"/>
      <line x1="50" y1="200" x2="1390" y2="210" stroke="#f9fafb" strokeWidth="4.5" strokeDasharray="100 10" opacity="0.15"/>
      <line x1="0" y1="210" x2="1440" y2="100" stroke="#8b5cf6" strokeWidth="2.7" strokeDasharray="80 30" opacity="0.33"/>
    </g>
  </svg>
);

export default MovingHeaderLines;
