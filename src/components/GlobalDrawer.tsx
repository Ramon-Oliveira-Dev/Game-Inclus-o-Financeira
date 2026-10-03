import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GameState, Language } from "../types";
import { t } from "../locales";
import { toggleSnd, sndOn } from "../lib/audio";
import { useSound } from "../hooks/useSound";
import { 
  Bell, 
  BellOff, 
  Globe, 
  X, 
  LogOut, 
  Home, 
  BookOpen, 
  Gamepad2, 
  User,
  Trophy,
  BookMarked,
  ChevronDown, 
  ChevronUp,
  Smartphone,
  Gauge,
  ShieldCheck
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { SidebarNavButton, LanguageOption } from "./Layout";
import { SchoolAvatar } from "./SchoolAvatar";

interface GlobalDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  setLang: (l: Language) => void;
  syncStatus?: "synced" | "error" | "syncing";
  currentTab?: string;
  onTabChange?: (tab: any) => void;
  gameState?: GameState;
  setGameState?: React.Dispatch<React.SetStateAction<GameState>>;
}

export function GlobalDrawer({
  isOpen,
  onClose,
  lang,
  setLang,
  syncStatus = "synced",
  currentTab,
  onTabChange,
  gameState,
  setGameState,
}: GlobalDrawerProps) {
  const [, setForceRender] = useState(0);
  const [showLanguages, setShowLanguages] = useState(false);
  const { playClick, playTick } = useSound();
  const { signOut, profile } = useAuth();

  const currentDiff = gameState?.diff || "medio";

  const handleSetDifficulty = (newDiff: "facil" | "medio" | "dificil") => {
    playClick();
    if (!setGameState) return;
    const newTimer = newDiff === "facil" ? 120 : newDiff === "dificil" ? 60 : 90;
    setGameState((prev) => ({
      ...prev,
      diff: newDiff,
      timerSec: !prev.answered ? newTimer : prev.timerSec,
    }));
  };

  const handleToggleSound = () => {
    toggleSnd();
    setForceRender((prev) => prev + 1);
    playClick();
  };

  const handleSignOutClick = async () => {
    playClick();
    onClose();
    await signOut();
  };

  const handleTabClick = (tab: string) => {
    if (onTabChange) {
      playClick();
      onTabChange(tab);
      onClose(); // Automatically close the side menu for seamless transition
    }
  };

  const menuTitle = lang === "pt" ? "Navegação" : lang === "es" ? "Navegación" : "Navigation";
  const langLabel = lang === "pt" ? "Idiomas" : lang === "es" ? "Idiomas" : "Languages";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="global-drawer-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#020617]/70 backdrop-blur-md z-[9998]"
          onClick={onClose}
        />
      )}

      {isOpen && (
        <motion.div
          key="global-drawer-container"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 220 }}
          className="fixed top-0 right-0 h-full w-[320px] max-w-[85vw] bg-slate-950/90 border-l border-white/10 z-[9999] p-5 shadow-2xl flex flex-col gap-4 backdrop-blur-2xl overflow-y-auto"
        >
          {/* Header: Title and Close button */}
          <div className="flex items-center justify-between pb-3 shrink-0">
            {profile ? (
              <button
                onClick={() => handleTabClick("profile")}
                onMouseEnter={playTick}
                className="flex items-center gap-2 p-1.5 pl-3 pr-2.5 rounded-2xl bg-gradient-to-r from-white/5 to-[#0c1220]/40 hover:from-blue-600/10 hover:to-indigo-600/10 border border-white/10 hover:border-cyan-500/40 transition-all duration-300 cursor-pointer group text-left shadow-[0_4px_20px_rgba(0,0,0,0.15)] active:scale-98 overflow-hidden shrink"
              >
                <div className="flex flex-col items-start leading-tight text-left select-none min-w-0">
                  <span className="text-[11px] font-black text-white group-hover:text-cyan-400 transition-colors tracking-wide truncate max-w-[120px] uppercase">
                    {profile.nome}
                  </span>
                  <span className="text-[9px] text-cyan-300/80 font-bold tracking-normal truncate max-w-[120px] mt-0.5" title={profile.municipio}>
                    {profile.municipio || "Serra - ES"}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full p-0.5 bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-500 shadow-[0_0_12px_rgba(34,211,238,0.25)] group-hover:shadow-[0_0_16px_rgba(34,211,238,0.45)] group-hover:scale-105 transition-all duration-300 flex items-center justify-center shrink-0 ml-1">
                  <SchoolAvatar 
                    avatarUrl={profile.avatar_url} schoolName={profile.municipio}
                    className="w-full h-full rounded-full"
                    iconClassName="w-3.5 h-3.5"
                  />
                </div>
              </button>
            ) : (
              <div />
            )}
            <button
              onClick={() => { playClick(); onClose(); }}
              onMouseEnter={playTick}
              className="p-2 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white rounded-full transition-all cursor-pointer active:scale-95 shrink-0"
            >
              <X size={18} />
            </button>
          </div>

          {/* Navigation Section */}
          {onTabChange && (
            <>
              <div className="h-px w-full bg-white/5 shrink-0" />
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/30 px-2 mb-1 truncate">
                  {menuTitle}
                </span>

                <div className="flex flex-col gap-1.5">
                  <SidebarNavButton expanded={true} active={currentTab === "home"} onClick={() => handleTabClick("home")} icon={<Home size={18} />} label={t(lang,"nav_home")} onMouseEnter={playTick} />
                  <SidebarNavButton expanded={true} active={currentTab === "learn"} onClick={() => handleTabClick("learn")} icon={<BookOpen size={18} />} label={t(lang,"nav_learn")} onMouseEnter={playTick} />
                  <SidebarNavButton expanded={true} active={currentTab === "game"} onClick={() => handleTabClick("game")} icon={<Gamepad2 size={18} />} label={t(lang,"nav_play")} onMouseEnter={playTick} />
                  <SidebarNavButton expanded={true} active={currentTab === "ranking"} onClick={() => handleTabClick("ranking")} icon={<Trophy size={18} />} label={t(lang,"nav_ranking")} onMouseEnter={playTick} />
                  <SidebarNavButton expanded={true} active={false} onClick={() => { playClick(); onClose(); document.dispatchEvent(new CustomEvent('open-manual')); }} icon={<BookMarked size={18} />} label={t(lang,"nav_manual")} onMouseEnter={playTick} activeColor="cyan" />
                  <SidebarNavButton expanded={true} active={false} onClick={() => { playClick(); onClose(); document.dispatchEvent(new CustomEvent('open-admin')); }} icon={<ShieldCheck size={18} className="text-cyan-400" />} label={lang === "pt" ? "Administrador" : lang === "es" ? "Administrador" : "Administrator"} onMouseEnter={playTick} activeColor="cyan" />
                </div>
              </div>
            </>
          )}

          {/* Settings Section */}
          <div className="flex flex-col gap-2 shrink-0">
            <div className="h-px w-full bg-white/5 shrink-0 mb-1" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/30 px-2 truncate">
              {t(lang, "settings")}
            </span>

            {/* Languages Control */}
            <button
              onClick={() => { playClick(); setShowLanguages(!showLanguages); }}
              onMouseEnter={playTick}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/10 text-white/80 hover:text-white transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3 text-white/80">
                <Globe size={18} className="text-[#4facfe]" />
                <span className="font-semibold text-xs">{langLabel}</span>
              </div>
              {showLanguages ? <ChevronUp size={16} className="text-white/40" /> : <ChevronDown size={16} className="text-white/40" />}
            </button>

            {/* Collapsed/Expanded List of Languages separated on individual rows */}
            <AnimatePresence initial={false}>
              {showLanguages && (
                <motion.div
                  key="global-drawer-languages-list"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden flex flex-col gap-1.5 pl-1.5"
                >
                  <LanguageOption lang="pt" currentLang={lang} onClick={() => { playClick(); setLang("pt"); }} onMouseEnter={playTick} />
                  <LanguageOption lang="en" currentLang={lang} onClick={() => { playClick(); setLang("en"); }} onMouseEnter={playTick} />
                  <LanguageOption lang="es" currentLang={lang} onClick={() => { playClick(); setLang("es"); }} onMouseEnter={playTick} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Section 3: Sound Control */}
            <div className="flex items-center justify-between px-4 py-3 bg-white/[0.015] border border-white/5 rounded-xl shrink-0">
              <div className="flex items-center gap-3 text-white/80">
                {sndOn ? <Bell size={18} className="text-yellow-400" /> : <BellOff size={18} className="text-white/40" />}
                <span className="font-semibold text-xs text-white/85">
                  {t(lang, "sound")}
                </span>
              </div>
              <button
                onClick={handleToggleSound}
                onMouseEnter={playTick}
                className={`w-11 h-6 rounded-full relative transition-[background-color] duration-300 cursor-pointer ${
                  sndOn ? "bg-blue-500" : "bg-white/10"
                }`}
                title={t(lang, "sound")}
              >
                <motion.div
                  className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-md"
                  animate={{ x: sndOn ? 20 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </button>
            </div>

            {/* Section 4: Game Difficulty Selector */}
            <div className="flex flex-col gap-2 p-3 bg-white/[0.015] border border-white/5 rounded-xl shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-white/80">
                  <Gauge size={16} className="text-amber-400" />
                  <span className="font-semibold text-xs text-white/85">
                    {t(lang, "diff_title")}
                  </span>
                </div>
                <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full border ${
                  currentDiff === "facil" 
                    ? "bg-emerald-950/60 border-emerald-500/40 text-emerald-300" 
                    : currentDiff === "dificil" 
                    ? "bg-red-950/60 border-red-500/40 text-red-300" 
                    : "bg-amber-950/60 border-amber-500/40 text-amber-300"
                }`}>
                  {currentDiff === "facil" ? t(lang, "easy_label") : currentDiff === "dificil" ? t(lang, "hard_label") : t(lang, "med_label")}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-1.5 pt-0.5">
                <button
                  onClick={() => handleSetDifficulty("facil")}
                  onMouseEnter={playTick}
                  className={`py-1.5 px-1 rounded-lg text-xs font-bold transition-all border cursor-pointer text-center ${
                    currentDiff === "facil"
                      ? "bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.2)]"
                      : "bg-white/[0.03] border-white/5 hover:border-white/20 text-white/60 hover:text-white"
                  }`}
                >
                  <div className="text-[10px]">{t(lang, "easy_label")}</div>
                  <div className="text-[8px] opacity-75 font-normal">120s</div>
                </button>

                <button
                  onClick={() => handleSetDifficulty("medio")}
                  onMouseEnter={playTick}
                  className={`py-1.5 px-1 rounded-lg text-xs font-bold transition-all border cursor-pointer text-center ${
                    currentDiff === "medio"
                      ? "bg-amber-500/20 border-amber-500 text-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.2)]"
                      : "bg-white/[0.03] border-white/5 hover:border-white/20 text-white/60 hover:text-white"
                  }`}
                >
                  <div className="text-[10px]">{t(lang, "med_label")}</div>
                  <div className="text-[8px] opacity-75 font-normal">90s</div>
                </button>

                <button
                  onClick={() => handleSetDifficulty("dificil")}
                  onMouseEnter={playTick}
                  className={`py-1.5 px-1 rounded-lg text-xs font-bold transition-all border cursor-pointer text-center ${
                    currentDiff === "dificil"
                      ? "bg-red-500/20 border-red-500 text-red-300 shadow-[0_0_10px_rgba(239,68,68,0.2)]"
                      : "bg-white/[0.03] border-white/5 hover:border-white/20 text-white/60 hover:text-white"
                  }`}
                >
                  <div className="text-[10px]">{t(lang, "hard_label")}</div>
                  <div className="text-[8px] opacity-75 font-normal">60s</div>
                </button>
              </div>

              <p className="text-[9px] text-white/50 leading-relaxed bg-black/20 p-2 rounded-lg border border-white/5 mt-0.5">
                {t(lang, "diff_desc")}
              </p>
            </div>

          </div>

          <div className="h-px w-full bg-white/5 shrink-0" />

          {/* Bottom Footer: Sign Out (Sair) & Copyright details */}
          <div className="mt-auto flex flex-col w-full gap-3 pt-2 shrink-0">
            <button
              onClick={handleSignOutClick}
              onMouseEnter={playTick}
              className="w-full flex items-center justify-center gap-2 px-3 py-3 rounded-xl border border-red-500/20 hover:border-red-500/40 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all font-bold text-xs cursor-pointer active:scale-95 shadow-[0_4px_12px_rgba(239,68,68,0.05)]"
            >
              <LogOut size={15} />
              <span>{lang === "pt" ? "Sair da Conta" : lang === "es" ? "Cerrar sesión" : "Sign Out"}</span>
            </button>

            <p className="text-[10px] text-white/20 text-center font-mono tracking-wider uppercase">
              {t(lang, "start_title")} &copy; 2026
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
