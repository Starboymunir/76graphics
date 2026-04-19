"use client";

export function DesignIcon({ size = 54 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Printer body */}
      <rect x="6" y="20" width="42" height="24" rx="2" stroke="currentColor" strokeWidth="2.2"/>
      {/* Paper tray out */}
      <rect x="14" y="36" width="26" height="16" rx="1" stroke="currentColor" strokeWidth="2"/>
      {/* Brand swoosh on paper */}
      <line x1="17" y1="42" x2="37" y2="42" stroke="currentColor" strokeWidth="1.4"/>
      <line x1="17" y1="46" x2="30" y2="46" stroke="currentColor" strokeWidth="1.4"/>
      {/* Paper in top */}
      <rect x="14" y="8" width="26" height="14" rx="1" stroke="currentColor" strokeWidth="2"/>
      {/* Star */}
      <path d="M43 8l1 2.5 2.5 1-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1z" fill="currentColor"/>
    </svg>
  );
}

export function QuoteIcon({ size = 54 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Document */}
      <rect x="8" y="4" width="30" height="38" rx="2" stroke="currentColor" strokeWidth="2.2"/>
      {/* Corner fold */}
      <path d="M29 4l9 9H29V4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
      {/* Lines on doc */}
      <line x1="14" y1="20" x2="30" y2="20" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="14" y1="26" x2="27" y2="26" stroke="currentColor" strokeWidth="1.5"/>
      {/* Lightning bolt overlay */}
      <path d="M34 22l-6 10h5l-3 10 10-14h-5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      {/* Star */}
      <path d="M6 44l1 2.5 2.5 1-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1z" fill="currentColor"/>
    </svg>
  );
}

export function TruckIcon({ size = 54 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Truck cab */}
      <path d="M32 14v22H6V14h26z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/>
      {/* Trailer */}
      <path d="M32 20h10l6 8v8H32V20z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/>
      {/* Brand wrap stripe on body */}
      <line x1="6" y1="28" x2="32" y2="22" stroke="currentColor" strokeWidth="1.8"/>
      {/* Wheels */}
      <circle cx="14" cy="38" r="4" stroke="currentColor" strokeWidth="2"/>
      <circle cx="40" cy="38" r="4" stroke="currentColor" strokeWidth="2"/>
      {/* Star */}
      <path d="M44 8l1 2.5 2.5 1-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1z" fill="currentColor"/>
    </svg>
  );
}

export function RocketIcon({ size = 54 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Rocket body */}
      <path d="M27 6c-4 8-6 18-6 28h12c0-10-2-20-6-28z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/>
      {/* Left fin */}
      <path d="M21 30l-7 8v4l7-6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      {/* Right fin */}
      <path d="M33 30l7 8v4l-7-6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      {/* Window */}
      <circle cx="27" cy="22" r="4" stroke="currentColor" strokeWidth="2"/>
      {/* Flame */}
      <path d="M24 34l3 8 3-8" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
      {/* Star */}
      <path d="M44 10l1 2.5 2.5 1-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1z" fill="currentColor"/>
    </svg>
  );
}