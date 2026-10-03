import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";
import { useSound } from "../hooks/useSound";
import { getAC } from "../lib/audio";
import { Language } from "../types";
import { MountainScene } from "./MountainScene";

const getTitle = (lang: Language) => {
  if (lang === "en") return "FINANCIAL INCLUSION";
  if (lang === "es") return "INCLUSIÓN FINANCIERA";
  return "INCLUSÃO FINANCEIRA";
};

const getSubtitle = (lang: Language) => {
  if (lang === "en") return "THE SPECIAL EDUCATION CHALLENGE";
  if (lang === "es") return "EL DESAFÍO DE LA EDUCACIÓN ESPECIAL";
  return "O DESAFIO DA EDUCAÇÃO ESPECIAL.";
};

const LeftPanIcons = () => (
  <g
    transform="translate(0, 82)"
    fill="none"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Calculator (Finance) - Yellow Glow */}
    <g
      transform="translate(-24, -8)"
      stroke="#facc15"
      style={{ filter: "drop-shadow(0 0 5px rgba(250, 204, 21, 0.7))" }}
    >
      <rect x="-8" y="-12" width="16" height="24" rx="3" />
      <rect x="-4" y="-8" width="8" height="4" rx="1" />
      <line x1="-3" y1="1" x2="-3" y2="1.1" strokeWidth="2.5" />
      <line x1="0" y1="1" x2="0" y2="1.1" strokeWidth="2.5" />
      <line x1="3" y1="1" x2="3" y2="1.1" strokeWidth="2.5" />

      <line x1="-3" y1="5" x2="-3" y2="5.1" strokeWidth="2.5" />
      <line x1="0" y1="5" x2="0" y2="5.1" strokeWidth="2.5" />
      <line x1="3" y1="5" x2="3" y2="5.1" strokeWidth="2.5" />

      <line x1="-3" y1="9" x2="-3" y2="9.1" strokeWidth="2.5" />
      <line x1="0" y1="9" x2="0" y2="9.1" strokeWidth="2.5" />
      <line x1="3" y1="9" x2="3" y2="9.1" strokeWidth="2.5" />
    </g>

    {/* Dollar Coin (Center) - Yellow Glow */}
    <g
      transform="translate(0, -6) scale(1.4)"
      stroke="#facc15"
      style={{ filter: "drop-shadow(0 0 6px rgba(250, 204, 21, 0.8))" }}
    >
      <circle cx="0" cy="0" r="10" />
      <path d="M2,-3 C0,-6 -3,-3 0,0 C3,3 0,6 -2,3" strokeWidth="1.5" />
      <line x1="0" y1="-5.5" x2="0" y2="-4" strokeWidth="1.5" />
      <line x1="0" y1="5.5" x2="0" y2="4" strokeWidth="1.5" />
    </g>

    {/* Bar Chart (Right) - Green Glow */}
    <g
      transform="translate(24, -6)"
      stroke="#4ade80"
      style={{ filter: "drop-shadow(0 0 5px rgba(74, 222, 128, 0.7))" }}
    >
      <polyline points="-10,12 12,12" />
      <rect x="-7" y="2" width="4" height="10" />
      <rect x="-1" y="-6" width="4" height="18" />
      <rect x="5" y="-10" width="4" height="22" />
    </g>
  </g>
);

const RightPanIcons = () => (
  <g
    transform="translate(0, 82)"
    fill="none"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Wheelchair (Accessibility) - Blue Glow */}
    <g
      transform="translate(-25, -6) scale(1.5)"
      stroke="#3b82f6"
      style={{ filter: "drop-shadow(0 0 5px rgba(59, 130, 246, 0.7))" }}
    >
      <circle cx="2" cy="-5" r="2" />
      <path d="M2,-1 V3.5 H5.5 V7 H7.5" />
      <path d="M2,1 H5.5" />
      <path d="M4,7 A 4.5 4.5 0 1 1 1.5,-0.5" />
    </g>

    {/* Puzzle (Autism) - Cyan Glow */}
    <g
      transform="translate(0, -5) scale(1.6)"
      stroke="#22d3ee"
      style={{ filter: "drop-shadow(0 0 6px rgba(34, 211, 238, 0.8))" }}
    >
      <path
        d="M -5,-5 h 3 c 0,-3 4,-3 4,0 h 3 v 3 c 3,0 3,4 0,4 v 3 h -3 c 0,-3 -4,-3 -4,0 h -3 v -3 c -3,0 -3,-4 0,-4 v -3 z"
        strokeWidth="1.5"
      />
    </g>

    {/* Users (Special Education/Inclusion) - Purple Glow */}
    <g
      transform="translate(28, -6) scale(1.3)"
      stroke="#c084fc"
      style={{ filter: "drop-shadow(0 0 5px rgba(192, 132, 252, 0.7))" }}
    >
      <circle cx="-3" cy="-4" r="3" />
      <path d="M-9,6 C-9,1 3,1 3,6" />
      <circle cx="5" cy="-1" r="2.5" />
      <path d="M3,6 C3,3.5 9,3.5 9,6" />
    </g>
  </g>
);

export const ScaleGraphic = ({ progress }: { progress: number }) => {
  return (
    <svg
      className="absolute top-[58vh] sm:top-[58vh] lg:top-[62vh] -translate-y-1/2 left-1/2 -translate-x-1/2 w-[145%] xs:w-[135%] sm:w-[1200px] lg:w-[1366px] h-auto pointer-events-none z-10"
      viewBox="0 0 1366 280"
    >
      <defs>
        <linearGradient id="beamGrad2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#4fd6e0" />
          <stop offset="50%" stopColor="#9ff0e0" />
          <stop offset="100%" stopColor="#4fd6e0" />
        </linearGradient>
        <linearGradient id="rainbow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="33%" stopColor="#f59e0b" />
          <stop offset="66%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <linearGradient id="panLeft" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f4c177" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#e8923f" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="panRight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7fe8e8" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#3fb8c4" stopOpacity="0.8" />
        </linearGradient>
      </defs>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes endlessTip {
          0%, 100% { transform: rotate(-6deg); }
          50% { transform: rotate(6deg); }
        }
        @keyframes endlessPan {
          0%, 100% { transform: rotate(6deg); }
          50% { transform: rotate(-6deg); }
        }
        .animate-swing {
          animation: endlessTip 12s ease-in-out infinite;
        }
        .animate-pan {
          animation: endlessPan 12s ease-in-out infinite;
        }
      `,
        }}
      />

      <ellipse cx="683" cy="206" rx="60" ry="8" fill="#000" opacity="0.25" />
      <rect x="648" y="188" width="70" height="12" rx="6" fill="#0c534a" />

      {/* Pedestal mais suave e afinado (tapered) */}
      <path d="M680,72 L687,72 L692,188 L675,188 Z" fill="#0e7164" />

      <g className="animate-swing" style={{ transformOrigin: "683.5px 70px" }}>
        {/* Barra de ligação horizontal (beam) suavizada com curvatura (tapered) */}
        <path
          d="M500,68 Q683.5,61 867,68 L867,72 Q683.5,79 500,72 Z"
          fill="url(#beamGrad2)"
        />

        <circle cx="500" cy="70" r="9" fill="#e8923f" />
        <circle cx="867" cy="70" r="9" fill="#e8923f" />

        <circle
          cx="683.5"
          cy="70"
          r="14"
          fill="#0a1a1f"
          stroke="#f4c177"
          strokeWidth="2.4"
        />
        <circle cx="683.5" cy="70" r="6" fill="#f4c177" />

        <g transform="translate(500, 70)">
          <g className="animate-pan" style={{ transformOrigin: "0px 0px" }}>
            {/* Hastes de ligação mais suaves com curvas quadráticas */}
            <path
              d="M0,4 Q-22,40 -44,82 M0,4 Q22,40 44,82"
              fill="none"
              stroke="#4fd6e0"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.9"
            />
            <circle cx="0" cy="4" r="3" fill="#e8923f" />

            <LeftPanIcons />
            <path
              d="M-52,82 Q0,104 52,82 L44,95 Q0,114 -44,95 Z"
              fill="url(#panLeft)"
              stroke="#e8923f"
              strokeWidth="1.5"
              opacity="0.95"
            />
          </g>
        </g>

        <g transform="translate(867, 70)">
          <g className="animate-pan" style={{ transformOrigin: "0px 0px" }}>
            {/* Hastes de ligação mais suaves com curvas quadráticas */}
            <path
              d="M0,4 Q-22,40 -44,82 M0,4 Q22,40 44,82"
              fill="none"
              stroke="#4fd6e0"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.9"
            />
            <circle cx="0" cy="4" r="3" fill="#e8923f" />

            <RightPanIcons />
            <path
              d="M-52,82 Q0,104 52,82 L44,95 Q0,114 -44,95 Z"
              fill="url(#panRight)"
              stroke="#3fb8c4"
              strokeWidth="1.5"
              opacity="0.95"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

interface SplashScreenProps {
  onFinish: () => void;
  lang: Language;
}

export function SplashScreen({ onFinish, lang }: SplashScreenProps) {
  const { playStart, playSwoosh, playTick } = useSound();
  const [clicked, setClicked] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);

  const statusMessages = {
    pt: [
      "Carregando módulos...",
      "Preparando conteúdo...",
      "Organizando trilha...",
      "Sincronizando sistema...",
    ],
    en: [
      "Loading modules...",
      "Preparing content...",
      "Organizing trail...",
      "Synchronizing system...",
    ],
    es: [
      "Cargando módulos...",
      "Preparando contenido...",
      "Organizando ruta...",
      "Sincronizando sistema...",
    ],
  };

  useEffect(() => {
    const statusInterval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % statusMessages[lang].length);
    }, 1500);
    return () => clearInterval(statusInterval);
  }, [lang]);

  useEffect(() => {
    playSwoosh();
    const duration = 8000; // Exactly 8 seconds
    const startTimestamp = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTimestamp;
      const computedProgress = Math.min(
        Math.floor((elapsed / duration) * 100),
        100,
      );
      setProgress(computedProgress);

      if (computedProgress >= 100) {
        clearInterval(interval);
      }
    }, 45); // highly responsive 45ms timer ticks

    return () => clearInterval(interval);
  }, [playSwoosh]);

  useEffect(() => {
    if (progress > 0 && progress < 100 && progress % 15 === 0) {
      playTick();
    }
  }, [progress, playTick]);

  const onFinishRef = useRef(onFinish);
  useEffect(() => {
    onFinishRef.current = onFinish;
  }, [onFinish]);

  const playStartRef = useRef(playStart);
  useEffect(() => {
    playStartRef.current = playStart;
  }, [playStart]);

  useEffect(() => {
    if (progress >= 100) {
      setClicked(true);
      try {
        getAC()?.resume();
      } catch (e) {}
      playStartRef.current();
      const t = setTimeout(() => {
        onFinishRef.current();
      }, 1000); // smooth 1-second final transition
      return () => clearTimeout(t);
    }
  }, [progress]);

  return (
    <div className="w-full min-h-[100dvh] overflow-hidden relative flex flex-col items-center justify-center font-['Poppins',_sans-serif]">
      <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');
       `}</style>

      <MountainScene />
      <ScaleGraphic progress={progress} />

      <div className="absolute top-4 sm:top-6 left-1/2 -translate-x-1/2 z-40 flex items-center justify-center pointer-events-none">
        <div className="flex items-center gap-1.5 sm:gap-2 bg-[#050810]/70 backdrop-blur-md border border-cyan-500/30 px-3.5 sm:px-4.5 py-1.5 rounded-full shadow-[0_4px_24px_rgba(0,240,255,0.15),inset_0_0_12px_rgba(0,240,255,0.05)]">
          <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#f4c177] animate-pulse shrink-0" />
          <span className="font-mono text-[9px] sm:text-[11px] font-bold tracking-[1.5px] sm:tracking-[2.5px] text-white uppercase whitespace-nowrap">
            Município de Serra <span className="text-cyan-400 font-bold mx-0.5 sm:mx-1">•</span> ES
          </span>
        </div>
      </div>

      <AnimatePresence>
        {!clicked && (
          <motion.div
            key="splash-overlay-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(15px)", scale: 1.05 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 w-full h-full z-30 pointer-events-none"
          >
            {/* Title & Subtitle block below the mountain scene */}
            <div className="absolute top-[33vh] sm:top-[340px] lg:top-[31vh] left-0 w-full flex flex-col items-center px-4">
              <div
                className="font-extrabold text-3xl sm:text-5xl lg:text-[56px] leading-[1.15] tracking-[0.5px] text-white text-center select-none"
                style={{
                  textShadow:
                    "0 0 24px rgba(110,225,235,0.5), 0 0 60px rgba(60,190,210,0.22)",
                }}
              >
                {getTitle(lang)}
              </div>
              <div className="my-3 sm:my-[14px] w-[80px] sm:w-[110px] h-[2px] bg-gradient-to-r from-transparent via-[#f4c177] to-transparent opacity-80" />
              <div className="font-semibold text-[11px] sm:text-[15px] tracking-[3px] sm:tracking-[5px] text-[#f4c177] text-center uppercase select-none drop-shadow-md">
                {getSubtitle(lang)}
              </div>
            </div>

            {/* Progress Bar at the bottom of the screen */}
            <div className="absolute bottom-[12vh] sm:bottom-[14vh] left-0 w-full flex flex-col items-center px-6">
              <div className="flex flex-col items-center gap-3.5 w-full max-w-[320px] sm:max-w-[380px] pointer-events-auto">
                <div className="w-full flex items-center justify-between px-1.5 font-bold text-[11px] sm:text-[13px] tracking-[1.5px] sm:tracking-[2px] text-[#8eecf2]/90 uppercase font-mono">
                  <span className="animate-pulse truncate max-w-[75%]">
                    {
                      statusMessages[lang as keyof typeof statusMessages][
                        statusIndex
                      ]
                    }
                  </span>
                  <span className="font-bold text-[#4fd6e0] bg-[#4fd6e0]/10 px-1.5 py-0.5 rounded font-mono">
                    {progress}%
                  </span>
                </div>
                {/* Neon Linear Progress Bar */}
                <div className="w-full h-2.5 sm:h-3 bg-[#071317]/90 border border-cyan-500/20 rounded-full overflow-hidden shadow-[inset_0_1px_4px_rgba(0,0,0,0.9),0_0_15px_rgba(0,240,255,0.05)] p-[2px]">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 via-[#4fd6e0] to-blue-500 shadow-[0_0_16px_rgba(79,214,224,0.9),_0_0_6px_rgba(0,240,255,0.6)] rounded-full transition-all duration-75"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
