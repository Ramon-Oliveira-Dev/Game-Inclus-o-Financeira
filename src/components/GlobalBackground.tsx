import React from 'react';

export const DawnGlow = () => (
  <svg className="absolute top-0 left-0 w-full h-[50vh] sm:h-[55%]" preserveAspectRatio="none" viewBox="0 0 1366 420">
    <defs>
      <radialGradient id="dawnGlowGlobal" cx="50%" cy="60%" r="55%">
        <stop offset="0%" stopColor="#e89a4d" stopOpacity="0.24"/>
        <stop offset="35%" stopColor="#3a8d8a" stopOpacity="0.15"/>
        <stop offset="70%" stopColor="#0c2530" stopOpacity="0"/>
        <stop offset="100%" stopColor="#070f14" stopOpacity="0"/>
      </radialGradient>
    </defs>
    <rect width="1366" height="420" fill="url(#dawnGlowGlobal)"/>
  </svg>
);

export const FloatingAccents = () => (
  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1366px] h-full pointer-events-none z-10 hidden sm:block">
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#e0507a" strokeWidth="1.6" className="absolute top-[64px] left-[148px] opacity-60 drop-shadow-[0_0_5px_rgba(224,80,122,0.4)]">
      <path d="M3 14a9 9 0 0 1 18 0"/><path d="M21 19a2 2 0 0 1-2 2h-1v-7h3z"/><path d="M3 19a2 2 0 0 0 2 2h1v-7H3z"/>
    </svg>
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#9c7af0" strokeWidth="1.6" className="absolute top-[332px] left-[1060px] opacity-55 drop-shadow-[0_0_5px_rgba(156,122,240,0.4)]">
      <circle cx="9" cy="7" r="3"/><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/><circle cx="18" cy="8" r="2.4"/><path d="M16 21v-1.5a3 3 0 0 1 3-3h0"/>
    </svg>
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4fd6e0" strokeWidth="1.6" className="absolute top-[400px] left-[268px] opacity-55 drop-shadow-[0_0_5px_rgba(79,214,224,0.4)]">
      <path d="M3 3v18h18"/><path d="M7 16l4-6 3 3 5-7"/>
    </svg>
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f4c177" strokeWidth="1.6" className="absolute top-[400px] left-[1068px] opacity-55 drop-shadow-[0_0_5px_rgba(244,193,119,0.4)]">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>
    </svg>
  </div>
);

export const GlobalBackground = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden font-['Poppins',_sans-serif]">
    <div className="absolute inset-0 bg-[#070f14] z-0" />
    <DawnGlow />
    <div 
      className="absolute inset-0 z-0 pointer-events-none"
      style={{
        backgroundImage: `radial-gradient(circle, rgba(110,200,210,0.07) 1px, transparent 1px)`,
        backgroundSize: `28px 28px`
      }}
    />
  </div>
);
