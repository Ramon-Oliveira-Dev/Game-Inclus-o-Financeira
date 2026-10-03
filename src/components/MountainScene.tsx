import React from 'react';

export const MountainScene = ({ className }: { className?: string }) => (
  <svg className={className || "absolute top-[5vh] sm:top-[24px] left-0 w-full h-[25vh] sm:h-[300px] overflow-visible z-10"} preserveAspectRatio="none" viewBox="0 0 1366 300">
    <defs>
      <filter id="contourGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="30" />
      </filter>
      <linearGradient id="ridgeGlow" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#1d5560" stopOpacity="0"/>
        <stop offset="12%" stopColor="#e8a85c" stopOpacity="0.85"/>
        <stop offset="40%" stopColor="#4fd6c8" stopOpacity="0.9"/>
        <stop offset="65%" stopColor="#4fd6e0" stopOpacity="0.95"/>
        <stop offset="88%" stopColor="#e8a85c" stopOpacity="0.7"/>
        <stop offset="100%" stopColor="#1d5560" stopOpacity="0"/>
      </linearGradient>
      <linearGradient id="mainFill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#0b262c"/>
        <stop offset="100%" stopColor="#071a1f"/>
      </linearGradient>
      <linearGradient id="fadeMask" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#fff"/>
        <stop offset="88%" stopColor="#fff"/>
        <stop offset="100%" stopColor="#444"/>
      </linearGradient>
      <mask id="bottomFade">
        <rect x="0" y="0" width="1366" height="300" fill="url(#fadeMask)"/>
      </mask>
    </defs>

    {/* Efeito de Brilho Piscante Atrás do Mestre Álvaro acompanhando o contorno */}
    <path d="M250,240 Q310,205 360,215 Q420,228 460,175 Q495,135 530,150 Q565,162 600,118 Q635,82 672,98 Q705,112 738,80 Q768,52 800,72 Q832,90 866,108 Q905,128 940,158 Q975,185 1020,178 Q1065,172 1100,200 Q1135,222 1170,228" fill="none" stroke="#4fd6e0" strokeWidth="40" strokeLinecap="round" strokeLinejoin="round" style={{ mixBlendMode: 'screen', filter: 'url(#contourGlow)' }}>
      <animate attributeName="opacity" values="0.1; 0.5; 0.1" dur="6s" repeatCount="indefinite" />
    </path>
    <path d="M250,240 Q310,205 360,215 Q420,228 460,175 Q495,135 530,150 Q565,162 600,118 Q635,82 672,98 Q705,112 738,80 Q768,52 800,72 Q832,90 866,108 Q905,128 940,158 Q975,185 1020,178 Q1065,172 1100,200 Q1135,222 1170,228" fill="none" stroke="#4fd6e0" strokeWidth="80" strokeLinecap="round" strokeLinejoin="round" style={{ mixBlendMode: 'screen', filter: 'url(#contourGlow)' }}>
      <animate attributeName="opacity" values="0.05; 0.2; 0.05" dur="6s" repeatCount="indefinite" />
    </path>

    <g mask="url(#bottomFade)">
      <path d="M0,210 Q90,170 190,195 Q260,212 340,188 L340,300 L0,300 Z" fill="#0a1f25" opacity="0.5"/>
      <path d="M1010,200 Q1110,165 1190,192 Q1280,210 1366,180 L1366,300 L1010,300 Z" fill="#0a1f25" opacity="0.5"/>
      <path d="M250,240 Q310,205 360,215 Q420,228 460,175 Q495,135 530,150 Q565,162 600,118 Q635,82 672,98 Q705,112 738,80 Q768,52 800,72 Q832,90 866,108 Q905,128 940,158 Q975,185 1020,178 Q1065,172 1100,200 Q1135,222 1170,228 L1170,300 L250,300 Z" fill="url(#mainFill)"/>
      <g fill="#f4c177" opacity="0.75">
        <circle cx="430" cy="232" r="1.3"/>
        <circle cx="460" cy="238" r="1"/>
        <circle cx="495" cy="230" r="1.4"/>
        <circle cx="520" cy="241" r="1"/>
        <circle cx="555" cy="234" r="1.2"/>
        <circle cx="585" cy="240" r="1"/>
        <circle cx="615" cy="231" r="1.3"/>
        <circle cx="650" cy="237" r="1"/>
        <circle cx="685" cy="233" r="1.4"/>
        <circle cx="715" cy="240" r="1"/>
        <circle cx="745" cy="230" r="1.2"/>
        <circle cx="780" cy="238" r="1"/>
        <circle cx="815" cy="232" r="1.3"/>
        <circle cx="850" cy="240" r="1"/>
        <circle cx="880" cy="231" r="1.2"/>
        <circle cx="915" cy="237" r="1"/>
      </g>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes windowBlink {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.9; }
        }
        .window-1 { animation: windowBlink 8s ease-in-out infinite; }
        .window-2 { animation: windowBlink 12s ease-in-out infinite 2s; }
        .window-3 { animation: windowBlink 10s ease-in-out infinite 5s; }
        .window-4 { animation: windowBlink 14s ease-in-out infinite 1s; }
        .window-5 { animation: windowBlink 9s ease-in-out infinite 7s; }
      `}} />

      <path d="M250,240 Q310,205 360,215 Q420,228 460,175 Q495,135 530,150 Q565,162 600,118 Q635,82 672,98 Q705,112 738,80 Q768,52 800,72 Q832,90 866,108 Q905,128 940,158 Q975,185 1020,178 Q1065,172 1100,200 Q1135,222 1170,228" fill="none" stroke="url(#ridgeGlow)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 5px rgba(79,214,224,0.45))' }} />

      {/* Foreground Cityscape: Left Side */}
      <path d="M0,300 L0,210 L15,210 L15,240 L35,240 L35,180 L42,180 L42,170 L48,170 L48,180 L65,180 L65,225 L95,225 L95,160 L125,160 L125,205 L150,205 L150,190 L180,190 L180,230 L205,230 L205,175 L230,175 L230,245 L265,245 L265,225 L290,225 L290,265 L325,265 L325,300 Z" fill="#040e12" opacity="0.95" />
      
      {/* Foreground Cityscape: Right Side */}
      <path d="M1366,300 L1366,195 L1345,195 L1345,165 L1320,165 L1320,220 L1290,220 L1290,180 L1285,180 L1285,170 L1280,170 L1280,180 L1255,180 L1255,235 L1220,235 L1220,200 L1195,200 L1195,215 L1165,215 L1165,250 L1130,250 L1130,210 L1105,210 L1105,260 L1065,260 L1065,225 L1040,225 L1040,265 L1000,265 L1000,300 Z" fill="#040e12" opacity="0.95" />

      {/* Subtle City Windows / Lights */}
      <g fill="#f4c177" opacity="0.8">
        {/* Left Lights */}
        <rect className="window-1" x="18" y="250" width="3" height="3" />
        <rect className="window-3" x="25" y="250" width="3" height="3" />
        <rect className="window-2" x="42" y="200" width="3" height="3" />
        <rect className="window-5" x="52" y="190" width="3" height="3" />
        <rect className="window-1" x="52" y="200" width="3" height="3" />
        <rect className="window-4" x="105" y="175" width="3" height="3" />
        <rect className="window-2" x="105" y="185" width="3" height="3" />
        <rect className="window-5" x="115" y="175" width="3" height="3" />
        <rect className="window-3" x="165" y="210" width="3" height="3" />
        <rect className="window-1" x="155" y="205" width="3" height="3" />
        <rect className="window-4" x="215" y="190" width="3" height="3" />
        <rect className="window-2" x="220" y="205" width="3" height="3" />
        <rect className="window-5" x="245" y="260" width="3" height="3" />
        <rect className="window-3" x="275" y="235" width="3" height="3" />
        <rect className="window-1" x="305" y="270" width="3" height="3" />

        {/* Right Lights */}
        <rect className="window-2" x="1350" y="225" width="3" height="3" />
        <rect className="window-4" x="1330" y="185" width="3" height="3" />
        <rect className="window-1" x="1325" y="200" width="3" height="3" />
        <rect className="window-5" x="1265" y="195" width="3" height="3" />
        <rect className="window-3" x="1275" y="195" width="3" height="3" />
        <rect className="window-2" x="1270" y="220" width="3" height="3" />
        <rect className="window-1" x="1205" y="210" width="3" height="3" />
        <rect className="window-4" x="1185" y="230" width="3" height="3" />
        <rect className="window-2" x="1115" y="235" width="3" height="3" />
        <rect className="window-4" x="1120" y="243" width="3" height="3" />
        <rect className="window-1" x="1055" y="250" width="3" height="3" />
        <rect className="window-5" x="1050" y="260" width="3" height="3" />
        <rect className="window-3" x="1015" y="285" width="3" height="3" />
      </g>
    </g>
  </svg>
);
