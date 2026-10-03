import React from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { Lock, CheckCircle2, Star, Sparkles } from "lucide-react";
import { Language } from "../types";

export type Track = {
  id: string;
  title: string;
  level: number;
  progress: number;
  isLocked: boolean;
  unlockRequirementText?: string;
  xpReward: number;
  iconName: string;
  bonusTag?: string;
};

interface TrackCardProps {
  track: Track;
  onClick: () => void;
  onHover: () => void;
  lang?: Language;
}

export const TrackCard: React.FC<TrackCardProps> = ({ track, onClick, onHover, lang = "pt" }) => {
  // Map Lucide icons dynamically
  const IconComponent = (Icons as any)[track.iconName] || Icons.BookOpen;

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.96, y: 12 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 140, damping: 16 }
    }
  };

  const levelText = lang === "pt" ? `Módulo Nível ${track.level}` : lang === "es" ? `Módulo Nivel ${track.level}` : `Module Level ${track.level}`;
  const progressLabel = lang === "pt" ? "Progresso" : lang === "es" ? "Progreso" : "Progress";
  const lockedDefault = lang === "pt" ? "Bloqueado" : lang === "es" ? "Bloqueado" : "Locked";

  if (track.isLocked) {
    return (
      <div className="relative w-full h-full pt-2.5">
        <motion.div 
          variants={cardVariants}
          className="relative bg-slate-950/40 backdrop-blur-md border border-white/5 rounded-2xl p-5 opacity-40 cursor-not-allowed overflow-hidden h-[calc(100%-10px)] flex flex-col justify-between shadow-none select-none"
        >
          {/* Subtle glass reflection effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 pointer-events-none" />
          
          {/* Decorative corner orb glow */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-slate-800/10 blur-xl rounded-full pointer-events-none" />

          {/* Lock Icon overlay centered over content with premium styling */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0B1120]/45 backdrop-blur-[1px] z-20 rounded-2xl">
            <div className="bg-slate-900/80 border border-white/10 p-3 rounded-full shadow-lg mb-2">
              <Lock className="w-5 h-5 text-cyan-400/70 drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]" />
            </div>
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest bg-black/40 px-2.5 py-1 rounded-full border border-white/5 shadow-md">
              {track.unlockRequirementText || lockedDefault}
            </span>
          </div>

          {/* Top bar (locked) */}
          <div className="flex justify-between items-start mb-3 relative z-10">
            <div className="bg-white/5 border border-white/5 rounded-xl p-2.5 w-11 h-11 flex items-center justify-center">
              <IconComponent className="w-5 h-5 text-slate-500" strokeWidth={1.5} />
            </div>
            <div className="bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
              <span className="text-[10px] font-extrabold text-slate-500 tracking-wider">+{track.xpReward} XP</span>
            </div>
          </div>

          {/* Body content (locked) */}
          <div className="flex flex-col mb-4 relative z-10 flex-grow justify-center">
            <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest mb-1">
              {levelText}
            </span>
            <h3 className="font-bold text-sm sm:text-base text-slate-400 leading-snug line-clamp-2">
              {track.title}
            </h3>
          </div>

          {/* Bottom bar (locked) */}
          <div className="mt-auto pt-3 border-t border-slate-800/40 flex items-center justify-between relative z-10">
            <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">{progressLabel}</span>
            <span className="text-[10px] font-bold text-slate-500">0%</span>
          </div>
        </motion.div>
      </div>
    );
  }

  // Active styles setup with dynamic, gorgeous glassmorphism and ambient glows
  let cardBgClass = "bg-gradient-to-br from-[#10192e]/50 via-[#0d1425]/45 to-[#0b101f]/50";
  let borderClass = "border border-white/5 hover:border-cyan-500/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.03)]";
  let orbColorClass = "from-cyan-500/5 to-transparent";
  let glowColorClass = "group-hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]";
  let iconBgClass = "bg-gradient-to-br from-cyan-500/5 to-blue-500/5 border border-cyan-500/20";
  let iconColorClass = "text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]";
  let progressColor = "bg-gradient-to-r from-cyan-500 to-blue-400 shadow-[0_0_8px_rgba(6,182,212,0.6)]";
  let badgeText = lang === "pt" ? "Começar" : lang === "es" ? "Comenzar" : "Start";
  let badgeColor = "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20";

  if (track.progress === 100) {
    cardBgClass = "bg-gradient-to-br from-[#0c1c1f]/55 via-[#0b141a]/50 to-[#090e14]/55";
    borderClass = "border border-emerald-500/20 hover:border-emerald-400/40 shadow-[0_0_15px_rgba(16,185,129,0.05),inset_0_1px_1px_rgba(255,255,255,0.03)]";
    orbColorClass = "from-emerald-500/10 to-transparent";
    glowColorClass = "group-hover:shadow-[0_0_25px_rgba(16,185,129,0.2)]";
    iconBgClass = "bg-gradient-to-br from-emerald-500/5 to-teal-500/5 border border-emerald-500/25";
    iconColorClass = "text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]";
    progressColor = "bg-gradient-to-r from-emerald-500 to-teal-400 shadow-[0_0_8px_rgba(16,185,129,0.6)]";
    badgeText = lang === "pt" ? "Concluído" : lang === "es" ? "Completado" : "Completed";
    badgeColor = "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
  } else if (track.progress > 0) {
    cardBgClass = "bg-gradient-to-br from-[#121c33]/60 via-[#0e162b]/55 to-[#0b1021]/60";
    borderClass = "border border-cyan-500/25 hover:border-cyan-400/50 shadow-[0_0_15px_rgba(6,182,212,0.05),inset_0_1px_1px_rgba(255,255,255,0.03)]";
    orbColorClass = "from-cyan-500/10 to-transparent";
    glowColorClass = "group-hover:shadow-[0_0_25px_rgba(6,182,212,0.2)]";
    iconBgClass = "bg-gradient-to-br from-cyan-500/10 to-indigo-500/5 border border-cyan-500/30";
    iconColorClass = "text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]";
    progressColor = "bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400 shadow-[0_0_10px_rgba(6,182,212,0.7)]";
    badgeText = lang === "pt" ? "Em Progresso" : lang === "es" ? "En Progreso" : "In Progress";
    badgeColor = "bg-amber-500/15 text-amber-400 border border-amber-500/20";
  }

  return (
    <div className="relative w-full h-full pt-2.5 group">
      {/* Bonus tag / indicator */}
      {track.bonusTag && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none">
          <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 text-slate-950 text-[9px] font-extrabold px-2.5 py-0.5 rounded-full shadow-lg shadow-amber-500/20 border border-amber-400/30 tracking-widest uppercase flex items-center gap-1 whitespace-nowrap">
            <Sparkles className="w-2.5 h-2.5 animate-pulse" />
            {track.bonusTag}
          </span>
        </div>
      )}

      <motion.div 
        variants={cardVariants}
        whileHover={{ scale: 1.025, y: -4 }}
        whileTap={{ scale: 0.985 }}
        onMouseEnter={onHover}
        onClick={onClick}
        className={`relative rounded-2xl p-5 ${cardBgClass} ${borderClass} ${glowColorClass} backdrop-blur-lg transition-all duration-300 cursor-pointer overflow-hidden h-[calc(100%-10px)] flex flex-col justify-between`}
      >
        {/* Decorative Light Flare/Glow Orb behind card content */}
        <div className={`absolute -top-12 -right-12 w-28 h-28 bg-gradient-to-br ${orbColorClass} blur-2xl rounded-full pointer-events-none group-hover:scale-125 transition-transform duration-500 ease-out`} />
        
        {/* Dynamic Grid Background overlay for tech feel */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:16px_16px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        {/* Glass overlay shine */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.02] to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Card Header */}
        <div className="flex justify-between items-start mb-3.5 relative z-10">
          <div className={`rounded-xl p-2.5 w-11 h-11 flex items-center justify-center transition-all duration-300 ${iconBgClass} group-hover:scale-110 shadow-lg`}>
            <IconComponent className={`w-5 h-5 transition-transform duration-500 group-hover:rotate-12 ${iconColorClass}`} strokeWidth={1.5} />
          </div>
          
          <div className="flex items-center gap-1.5">
            <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${badgeColor}`}>
              {badgeText}
            </span>
            <div className="bg-white/5 border border-white/5 px-2.5 py-1 rounded-full shadow-md backdrop-blur-sm group-hover:bg-white/10 transition-colors">
              <span className="text-[10px] font-extrabold text-white tracking-wider">+{track.xpReward} XP</span>
            </div>
          </div>
        </div>

        {/* Main Content Info */}
        <div className="flex flex-col mb-4 relative z-10 flex-grow justify-center">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest">
              {levelText}
            </span>
            {track.progress === 100 && (
              <span className="flex items-center gap-0.5 text-emerald-400 text-[9px] font-black uppercase bg-emerald-500/10 px-1.5 py-0.5 rounded">
                <CheckCircle2 className="w-3 h-3" />
                OK
              </span>
            )}
          </div>
          
          <h3 className="font-extrabold text-sm sm:text-[15px] text-white leading-snug tracking-tight group-hover:text-cyan-300 transition-colors duration-300 line-clamp-2">
            {track.title}
          </h3>
        </div>

        {/* Progress Footer Panel */}
        <div className="mt-auto pt-3.5 relative z-10 border-t border-white/5">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-300 transition-colors">
              {progressLabel}
            </span>
            <span className={`text-[10px] font-extrabold ${track.progress === 100 ? 'text-emerald-400' : 'text-slate-200'}`}>
              {track.progress}%
            </span>
          </div>
          
          <div className="w-full h-1.5 bg-slate-950/60 rounded-full overflow-hidden border border-white/5 relative shadow-inner">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${Math.max(track.progress, 4)}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`absolute top-0 left-0 h-full rounded-full ${progressColor}`}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
