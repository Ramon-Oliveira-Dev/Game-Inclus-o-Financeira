import React, { useState } from "react";
import { Home, BookOpen, Gamepad2, User, Menu, Trophy, Globe, LogOut, Bell, BellOff, ChevronDown, ChevronUp, Smartphone, BookMarked, Gauge, ShieldCheck } from "lucide-react";
import { t } from "../locales";
import { useSound } from "../hooks/useSound";
import { useAuth } from "../contexts/AuthContext";
import { SchoolAvatar } from "./SchoolAvatar";
import { motion, AnimatePresence } from "framer-motion";
import { toggleSnd, sndOn } from "../lib/audio";
import { GameState } from "../types";
import { StatInfoModal, StatModalType } from "./StatInfoModal";

export type TabState = "home" | "learn" | "game" | "profile" | "ranking" | "result";

interface LayoutProps {
  currentTab: TabState;
  onTabChange: (tab: TabState) => void;
  children: React.ReactNode;
  lang: import("../locales").Language;
  setLang: (l: import("../locales").Language) => void;
  gameState?: GameState;
  setGameState?: React.Dispatch<React.SetStateAction<GameState>>;
}

export function Layout({ currentTab, onTabChange, children, lang, setLang, gameState, setGameState }: LayoutProps) {
  const { playClick, playTick } = useSound();
  const { profile, signOut } = useAuth();

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [showLanguages, setShowLanguages] = useState(false);
  const [, setForceRender] = useState(0);
  const [statModal, setStatModal] = useState<{ isOpen: boolean; type: StatModalType }>({ isOpen: false, type: "budget" });

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

  const handleTabClick = (tab: TabState) => {
    if (tab !== currentTab) {
      playClick();
      onTabChange(tab);
    }
  };

  const handleToggleSound = () => {
    toggleSnd();
    setForceRender((prev) => prev + 1);
    playClick();
  };

  const handleSignOutClick = async () => {
    playClick();
    await signOut();
  };

  const menuTitle = lang === "pt" ? "Navegação" : lang === "es" ? "Navegación" : "Navigation";
  const langLabel = lang === "pt" ? "Idiomas" : lang === "es" ? "Idiomas" : "Languages";

  return (
    <div className="flex flex-col md:flex-row h-[100dvh] h-full bg-transparent overflow-hidden w-full text-white font-sans">
      {/* Expandable Sidebar for Desktop */}
      <motion.div 
        initial={false}
        animate={{ width: isSidebarExpanded ? 280 : 80 }}
        transition={{ type: "spring", damping: 25, stiffness: 220 }}
        className="hidden md:flex flex-col h-screen bg-[#050810]/95 border-r border-white/10 shrink-0 z-40 relative py-6 shadow-[4px_0_24px_rgba(0,0,0,0.5)] overflow-hidden"
      >
        {/* Toggle Button & Profile */}
        <div className={`flex px-4 mb-8 ${isSidebarExpanded ? 'flex-row items-center justify-between' : 'flex-col items-center gap-4'}`}>
          <div className="flex items-center gap-3">
            {isSidebarExpanded && (
              <button
                onClick={() => { playClick(); setIsSidebarExpanded(!isSidebarExpanded); }}
                onMouseEnter={playTick}
                className="p-2 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white rounded-xl transition-all cursor-pointer active:scale-95 shrink-0"
                title={t(lang, "settings")}
              >
                <Menu size={18} />
              </button>
            )}
          </div>

          {!isSidebarExpanded && (
            <button
              onClick={() => { playClick(); setIsSidebarExpanded(!isSidebarExpanded); }}
              onMouseEnter={playTick}
              className="w-10 h-10 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white rounded-xl transition-all cursor-pointer active:scale-95 shrink-0 flex items-center justify-center"
              title={t(lang, "settings")}
            >
              <Menu size={18} />
            </button>
          )}

          {!isSidebarExpanded && <div className="w-8 h-px bg-white/10 shrink-0 mt-2 mb-1" />}

          <AnimatePresence>
            {isSidebarExpanded && profile ? (
              <motion.button
                key="layout-profile-expanded"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                onClick={() => handleTabClick("profile")}
                onMouseEnter={playTick}
                className="flex items-center gap-2 p-1.5 pl-3 pr-2.5 rounded-2xl bg-gradient-to-r from-white/5 to-[#0c1220]/40 hover:from-blue-600/10 hover:to-indigo-600/10 border border-white/10 hover:border-cyan-500/40 transition-all duration-300 cursor-pointer group text-left shadow-[0_4px_20px_rgba(0,0,0,0.15)] active:scale-98 overflow-hidden shrink ml-2"
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
              </motion.button>
            ) : (!isSidebarExpanded && profile ? (
              <div key="layout-profile-collapsed-wrapper" className="flex flex-col items-center gap-4 w-full">
                <button
                  onClick={() => handleTabClick("profile")}
                  onMouseEnter={playTick}
                  className="w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-500 shadow-[0_0_12px_rgba(34,211,238,0.25)] hover:shadow-[0_0_16px_rgba(34,211,238,0.45)] hover:scale-105 transition-all duration-300 flex items-center justify-center shrink-0 cursor-pointer mt-1"
                  title={profile.nome}
                >
                  <SchoolAvatar 
                    avatarUrl={profile.avatar_url} schoolName={profile.municipio}
                    className="w-full h-full rounded-full"
                    iconClassName="w-4 h-4"
                  />
                </button>
              </div>
            ) : null)}
          </AnimatePresence>
        </div>

        <div className={`flex-1 flex flex-col px-4 ${isSidebarExpanded ? 'gap-6' : 'gap-6'} overflow-y-auto overflow-x-hidden scrollbar-hide`}>
          {/* Navigation Section */}
          <div className="h-px w-full bg-white/5 shrink-0" />
          <div className="flex flex-col gap-2">
            <AnimatePresence>
              {isSidebarExpanded && (
                <motion.span 
                  key="layout-navigation-title"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="text-[10px] font-bold uppercase tracking-widest text-white/30 px-2 mb-1 truncate"
                >
                  {menuTitle}
                </motion.span>
              )}
            </AnimatePresence>

            <div className={`flex flex-col ${isSidebarExpanded ? 'gap-1.5' : 'gap-5'}`}>
              <SidebarNavButton expanded={isSidebarExpanded} active={currentTab === "home"} onClick={() => handleTabClick("home")} icon={<Home size={18} />} label={t(lang,"nav_home")} onMouseEnter={playTick} />
              <SidebarNavButton expanded={isSidebarExpanded} active={currentTab === "learn"} onClick={() => handleTabClick("learn")} icon={<BookOpen size={18} />} label={t(lang,"nav_learn")} onMouseEnter={playTick} activeColor="cyan" />
              <SidebarNavButton expanded={isSidebarExpanded} active={currentTab === "game"} onClick={() => handleTabClick("game")} icon={<Gamepad2 size={18} />} label={t(lang,"nav_play")} onMouseEnter={playTick} />
              <SidebarNavButton expanded={isSidebarExpanded} active={currentTab === "ranking"} onClick={() => handleTabClick("ranking")} icon={<Trophy size={18} />} label={t(lang,"nav_ranking")} onMouseEnter={playTick} />
              <SidebarNavButton expanded={isSidebarExpanded} active={false} onClick={() => { playClick(); document.dispatchEvent(new CustomEvent('open-manual')); }} icon={<BookMarked size={18} />} label={t(lang,"nav_manual")} onMouseEnter={playTick} activeColor="cyan" />
            </div>
          </div>

          <div className="h-px w-full bg-white/5 shrink-0" />

          {/* Settings Title */}
          <AnimatePresence>
            {isSidebarExpanded && (
              <motion.span 
                key="layout-settings-title"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="text-[10px] font-bold uppercase tracking-widest text-white/30 px-2 truncate mt-1"
              >
                {t(lang, "settings")}
              </motion.span>
            )}
          </AnimatePresence>

          {/* Languages Control */}
          <div className={`flex flex-col ${isSidebarExpanded ? 'gap-2' : 'gap-5'}`}>
            <button
              onClick={() => { 
                playClick(); 
                if (!isSidebarExpanded) setIsSidebarExpanded(true);
                setShowLanguages(!showLanguages); 
              }}
              onMouseEnter={playTick}
              className={`flex items-center rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/10 text-white/80 hover:text-white transition-all cursor-pointer ${isSidebarExpanded ? 'px-4 py-3 justify-between w-full' : 'w-10 h-10 justify-center mx-auto'}`}
              title={langLabel}
            >
              <div className="flex items-center gap-3 text-white/80 shrink-0">
                <Globe size={isSidebarExpanded ? 18 : 20} className="text-[#4facfe]" />
                {isSidebarExpanded && <span className="font-semibold text-xs truncate">{langLabel}</span>}
              </div>
              {isSidebarExpanded && (
                showLanguages ? <ChevronUp size={16} className="text-white/40 shrink-0" /> : <ChevronDown size={16} className="text-white/40 shrink-0" />
              )}
            </button>

            <AnimatePresence initial={false}>
              {showLanguages && isSidebarExpanded && (
                <motion.div
                  key="layout-languages-dropdown"
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
          </div>

          {/* Sound Control */}
          <div className={`flex items-center bg-white/[0.015] border border-white/5 rounded-xl ${isSidebarExpanded ? 'justify-between px-4 py-3' : 'justify-center w-10 h-10 mx-auto flex-col gap-1 mt-1'}`}>
            <button
              onClick={() => {
                if (!isSidebarExpanded) handleToggleSound();
              }}
              className="flex items-center gap-3 text-white/80 shrink-0 outline-none cursor-pointer"
              title={t(lang, "sound")}
            >
              {sndOn ? <Bell size={isSidebarExpanded ? 18 : 20} className="text-yellow-400" /> : <BellOff size={isSidebarExpanded ? 18 : 20} className="text-white/40" />}
              {isSidebarExpanded && <span className="font-semibold text-xs text-white/85 truncate">{t(lang, "sound")}</span>}
            </button>
            {isSidebarExpanded && (
              <button
                onClick={handleToggleSound}
                onMouseEnter={playTick}
                className={`w-11 h-6 rounded-full relative transition-[background-color] duration-300 cursor-pointer shrink-0 ${sndOn ? "bg-blue-500" : "bg-white/10"}`}
                title={t(lang, "sound")}
              >
                <motion.div
                  className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-md"
                  animate={{ x: sndOn ? 20 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </button>
            )}
          </div>

          {/* Difficulty Control */}
          {isSidebarExpanded ? (
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
          ) : (
            <button
              onClick={() => setIsSidebarExpanded(true)}
              className="flex items-center justify-center w-10 h-10 mx-auto rounded-xl bg-white/[0.015] border border-white/5 text-amber-400 hover:text-amber-300 transition-all cursor-pointer"
              title={`${t(lang, "diff_title")}: ${currentDiff}`}
            >
              <Gauge size={20} />
            </button>
          )}
          
          {/* Administrador Navigation */}
          <div className={`flex flex-col ${isSidebarExpanded ? 'gap-1.5' : 'gap-5'} mt-1`}>
            <SidebarNavButton expanded={isSidebarExpanded} active={false} onClick={() => { playClick(); document.dispatchEvent(new CustomEvent('open-admin')); }} icon={<ShieldCheck size={18} className="text-cyan-400" />} label={lang === "pt" ? "Administrador" : lang === "es" ? "Administrador" : "Administrator"} onMouseEnter={playTick} activeColor="cyan" />
          </div>
          
          <div className="h-px w-full bg-white/5 shrink-0" />
        </div>

        {/* Footer */}
        <div className="mt-auto flex flex-col px-4 pt-6 gap-4 shrink-0">
          <button
            onClick={handleSignOutClick}
            onMouseEnter={playTick}
            className={`flex items-center justify-center gap-2 rounded-xl border border-red-500/20 hover:border-red-500/40 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all font-bold cursor-pointer active:scale-95 shadow-[0_4px_12px_rgba(239,68,68,0.05)] ${isSidebarExpanded ? 'w-full px-3 py-3 text-xs' : 'w-10 h-10 mx-auto'}`}
            title={lang === "pt" ? "Sair da Conta" : lang === "es" ? "Cerrar sesión" : "Sign Out"}
          >
            <LogOut size={isSidebarExpanded ? 15 : 18} />
            {isSidebarExpanded && <span className="truncate">{lang === "pt" ? "Sair da Conta" : lang === "es" ? "Cerrar sesión" : "Sign Out"}</span>}
          </button>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative w-full h-[100dvh] overflow-hidden">
        
        {/* Glassmorphism Header for Mobile */}
        <header className="md:hidden sticky top-0 z-[100] h-[68px] flex items-center justify-between p-3.5 px-6 bg-gradient-to-r from-blue-950/40 via-[#0b0f19]/50 to-indigo-950/40 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.3)] shrink-0 w-full">
          {/* Left Side: Hamburguer & Title */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => { playClick(); document.dispatchEvent(new CustomEvent('open-settings')); }}
              onMouseEnter={playTick}
              className="p-2 bg-gradient-to-tr from-white/5 to-white/10 hover:from-blue-500/10 hover:to-indigo-500/15 border border-white/10 hover:border-blue-500/30 rounded-xl text-white/80 hover:text-[#4facfe] transition-all cursor-pointer shadow-[0_4px_15px_rgba(0,0,0,0.1)] active:scale-95 flex items-center justify-center"
              title={t(lang, "settings")}
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>

          {/* Right Side: Profile */}
          <div className="flex items-center gap-2">
            {profile && (
              <button
                onClick={() => handleTabClick("profile")}
                onMouseEnter={playTick}
                className="flex items-center gap-2 px-2.5 py-1.5 sm:p-1.5 sm:pl-3 sm:pr-2.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-white/10 to-[#0c1220]/40 hover:from-blue-600/10 hover:to-indigo-600/10 border border-white/10 hover:border-cyan-500/40 transition-all duration-300 cursor-pointer group text-left min-w-0 max-w-[200px] xs:max-w-[240px] shadow-[0_4px_20px_rgba(0,0,0,0.15)] active:scale-98"
              >
                <div className="flex flex-col items-end leading-tight text-right select-none min-w-0 flex-1">
                  <span className="text-[10px] sm:text-[11px] font-black text-white group-hover:text-cyan-400 transition-colors tracking-wide truncate w-full uppercase">
                    {profile.nome}
                  </span>
                  <span className="text-[8px] xs:text-[9px] text-cyan-300/80 font-bold tracking-normal whitespace-normal line-clamp-2 w-full mt-0.5 text-right" title={profile.municipio}>
                    {profile.municipio || "Serra - ES"}
                  </span>
                </div>
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full p-0.5 bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-500 shadow-[0_0_12px_rgba(34,211,238,0.25)] group-hover:shadow-[0_0_16px_rgba(34,211,238,0.45)] group-hover:scale-105 transition-all duration-300 flex items-center justify-center shrink-0">
                  <SchoolAvatar 
                    avatarUrl={profile.avatar_url} schoolName={profile.municipio}
                    className="w-full h-full rounded-full"
                    iconClassName="w-3.5 h-3.5"
                  />
                </div>
              </button>
            )}
          </div>
        </header>

        {/* Header for Desktop */}
        <header className="hidden md:flex sticky top-0 z-30 h-16 items-center justify-between px-8 bg-gradient-to-r from-[#050810]/60 via-[#070b16]/80 to-[#050810]/95 backdrop-blur-xl border-b border-white/10 w-full shrink-0 shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 rounded-full">
              GESTAO INCLUSIVA 2026
            </span>
          </div>

          {gameState && (
            <div className="flex items-center gap-2.5">
              {/* Budget Pill */}
              <button
                onClick={() => {
                  playClick();
                  setStatModal({ isOpen: true, type: "budget" });
                }}
                className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full shadow-[0_2px_10px_rgba(16,185,129,0.1)] hover:bg-emerald-500/20 hover:scale-105 active:scale-95 transition-all text-xs font-bold font-mono cursor-pointer"
                title={`${t(lang, "hud_budget")} - ${lang === "pt" ? "Clique para ver detalhes" : lang === "es" ? "Haz clic para detalles" : "Click for details"}`}
              >
                <span>💰</span>
                <span>{gameState.budget}k</span>
              </button>

              {/* Score Pill */}
              <button
                onClick={() => {
                  playClick();
                  setStatModal({ isOpen: true, type: "score" });
                }}
                className="flex items-center gap-1.5 bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full shadow-[0_2px_10px_rgba(234,179,8,0.1)] hover:bg-yellow-500/20 hover:scale-105 active:scale-95 transition-all text-xs font-bold font-mono cursor-pointer"
                title={`${t(lang, "hud_score")} - ${lang === "pt" ? "Clique para ver detalhes" : lang === "es" ? "Haz clic para detalles" : "Click for details"}`}
              >
                <span>⭐</span>
                <span>{gameState.score} PTS</span>
              </button>

              {/* Combo Pill */}
              <button
                onClick={() => {
                  playClick();
                  setStatModal({ isOpen: true, type: "combo" });
                }}
                className="flex items-center gap-1.5 bg-orange-500/10 border border-orange-500/20 text-orange-400 px-3 py-1 rounded-full shadow-[0_2px_10px_rgba(249,115,22,0.1)] hover:bg-orange-500/20 hover:scale-105 active:scale-95 transition-all text-xs font-bold font-mono cursor-pointer"
                title={`${t(lang, "hud_combo")} - ${lang === "pt" ? "Clique para ver detalhes" : lang === "es" ? "Haz clic para detalles" : "Click for details"}`}
              >
                <span>🔥</span>
                <span>{gameState.combo > 0 ? `x${gameState.combo}` : "0"}</span>
              </button>
            </div>
          )}
        </header>

        <div className="flex-1 w-full relative overflow-y-auto overflow-x-hidden md:pb-0 pb-[calc(5rem+env(safe-area-inset-bottom))] flex flex-col">
          {children}
        </div>
      </div>

      {/* Bottom Navigation for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-20 bg-[#050b14]/80 backdrop-blur-3xl border-t border-white/10 z-40 flex justify-around items-center px-2 pb-safe">
         <BottomNavButton active={currentTab === "home"} onClick={() => handleTabClick("home")} icon={<Home className="w-5 h-5 sm:w-6 sm:h-6" />} label={t(lang,"nav_home")} onMouseEnter={playTick} />
         <BottomNavButton active={currentTab === "learn"} onClick={() => handleTabClick("learn")} icon={<BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />} label={t(lang,"nav_learn")} onMouseEnter={playTick} />
         <BottomNavButton active={currentTab === "game"} onClick={() => handleTabClick("game")} icon={<Gamepad2 className="w-5 h-5 sm:w-6 sm:h-6" />} label={t(lang,"nav_play")} onMouseEnter={playTick} />
         <BottomNavButton active={currentTab === "ranking"} onClick={() => handleTabClick("ranking")} icon={<Trophy className="w-5 h-5 sm:w-6 sm:h-6" />} label={t(lang,"nav_ranking")} onMouseEnter={playTick} />
         <BottomNavButton active={false} onClick={() => { playClick(); document.dispatchEvent(new CustomEvent('open-manual')); }} icon={<BookMarked className="w-5 h-5 sm:w-6 sm:h-6" />} label={t(lang,"nav_manual")} onMouseEnter={playTick} />
      </div>

      {gameState && (
        <StatInfoModal
          isOpen={statModal.isOpen}
          onClose={() => setStatModal((prev) => ({ ...prev, isOpen: false }))}
          type={statModal.type}
          gameState={gameState}
          lang={lang}
        />
      )}
    </div>
  );
}

export function SidebarNavButton({ active, onClick, icon, label, onMouseEnter, expanded, activeColor = "blue" }: any) {
  const activeClasses = activeColor === "cyan" 
    ? "bg-gradient-to-r from-cyan-600/15 to-transparent border-cyan-500/40 text-cyan-400 shadow-[0_4px_15px_-3px_rgba(34,211,238,0.15)]"
    : "bg-gradient-to-r from-blue-600/15 to-transparent border-blue-500/40 text-blue-400 shadow-[0_4px_15px_-3px_rgba(29,78,216,0.15)]";
    
  return (
    <button
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      title={!expanded ? label : undefined}
      className={`flex items-center gap-3.5 rounded-xl border z-10 transition-all font-semibold cursor-pointer shrink-0 ${expanded ? 'w-full px-4 py-3 text-xs justify-start' : 'w-10 h-10 justify-center mx-auto'} ${
        active
          ? activeClasses
          : "bg-white/[0.02] border-transparent text-white/75 hover:bg-white/[0.07] hover:text-white"
      }`}
    >
      <div className={active ? (activeColor === "cyan" ? "text-cyan-400" : "text-blue-400") : "text-white/50"}>{icon}</div>
      {expanded && <span className="flex-1 text-left truncate">{label}</span>}
    </button>
  );
}

export function LanguageOption({ lang, currentLang, onClick, onMouseEnter }: any) {
  const isSelected = lang === currentLang;
  
  let label = "";
  let iconSvg = null;
  let bgColors = "";

  if (lang === "pt") {
    label = "Português (Brasil)";
    bgColors = isSelected ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 font-bold" : "bg-transparent border-transparent text-white/60 hover:text-white hover:bg-white/5";
    iconSvg = (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72" className="w-5 h-5 shrink-0 rounded-sm">
        <rect x="5" y="17" width="62" height="38" rx="4" fill="#5EAA5F"/>
        <polygon points="36,22 59,36 36,50 13,36" fill="#F2C249"/>
        <circle cx="36" cy="36" r="8" fill="#3D53A0"/>
      </svg>
    );
  } else if (lang === "en") {
    label = "English (US)";
    bgColors = isSelected ? "bg-blue-500/10 border-blue-500/30 text-blue-400 font-bold" : "bg-transparent border-transparent text-white/60 hover:text-white hover:bg-white/5";
    iconSvg = (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72" className="w-5 h-5 shrink-0 rounded-sm">
        <rect x="5" y="17" width="62" height="38" rx="4" fill="#eee"/>
        <rect x="5" y="22" width="62" height="5" fill="#D22F27"/>
        <rect x="5" y="32" width="62" height="5" fill="#D22F27"/>
        <rect x="5" y="42" width="62" height="5" fill="#D22F27"/>
        <rect x="5" y="17" width="28" height="20" rx="2" fill="#3D53A0"/>
        <circle cx="12" cy="22" r="1" fill="#fff"/>
        <circle cx="19" cy="27" r="1" fill="#fff"/>
        <circle cx="26" cy="22" r="1" fill="#fff"/>
      </svg>
    );
  } else if (lang === "es") {
    label = "Español (Latam)";
    bgColors = isSelected ? "bg-amber-500/10 border-amber-500/30 text-amber-400 font-bold" : "bg-transparent border-transparent text-white/60 hover:text-white hover:bg-white/5";
    iconSvg = (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72" className="w-5 h-5 shrink-0 rounded-sm">
        <rect x="5" y="17" width="62" height="38" rx="4" fill="#D22F27"/>
        <rect x="5" y="27" width="62" height="18" fill="#F2C249"/>
        <circle cx="22" cy="36" r="3" fill="#D22F27"/>
      </svg>
    );
  }

  return (
    <button
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border transition-all text-xs cursor-pointer ${bgColors}`}
    >
      {iconSvg}
      <span className="flex-1 text-left truncate">{label}</span>
    </button>
  );
}

function BottomNavButton({ active, onClick, icon, label, onMouseEnter }: any) {
  return (
    <button
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className={`flex flex-col items-center gap-1.5 transition-all ${active ? "text-[#4facfe] scale-110" : "text-white/40 hover:text-white/80"}`}
    >
      {active && React.cloneElement(icon, { fill: "currentColor" })}
      {!active && icon}
      <span className="text-[10px] font-bold">{label}</span>
    </button>
  );
}
