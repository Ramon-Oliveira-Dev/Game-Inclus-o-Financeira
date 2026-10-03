import React, { useEffect, useState, useRef } from "react";
import { Clock, ArrowRight, Trophy, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { GameState, Achievement } from "../types";
import { StatInfoModal, StatModalType } from "./StatInfoModal";
import { getPhases, getScenarios, getAllAch } from "../data";
import {
  sndGood,
  sndBad,
  sndMid,
  sndNext,
  sndCombo,
  toggleSnd,
  sndOn,
  sndTimerTick,
  sndTimeOutAlarm,
} from "../lib/audio";
import { useSound } from "../hooks/useSound";
import { t } from "../locales";
import { useAuth } from "../contexts/AuthContext";
import { syncProgressToSupabase } from "../lib/syncService";

interface GameScreenProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  onShowRanking: () => void;
  onEndGame: () => void;
  isMenuOpen?: boolean;
  onOpenMenu?: () => void;
}

export function GameScreen({
  gameState,
  setGameState,
  onShowRanking,
  onEndGame,
  isMenuOpen,
  onOpenMenu,
}: GameScreenProps) {
  const { ph, sc, diff, timerSec, answered, lang } = gameState;
  const currentPhase = getPhases(lang)[ph];
  const currentScenario = getScenarios(lang)[ph][sc];
  const [chosenOption, setChosenOption] = useState<number | null>(null);
  const [animatingXp, setAnimatingXp] = useState(false);
  const [lastGained, setLastGained] = useState(0);
  const [isHoveringOptions, setIsHoveringOptions] = useState(false);
  const [lastSpeedBonus, setLastSpeedBonus] = useState(0);
  const [defeatReason, setDefeatReason] = useState<"qual" | "sust" | "budget" | null>(null);
  const [activeAchievement, setActiveAchievement] =
    useState<Achievement | null>(null);
  const [showImprevisto, setShowImprevisto] = useState<{ title: string; desc: string; cost: number } | null>(null);
  const [animateCard, setAnimateCard] = useState(false);
  const [statModal, setStatModal] = useState<{ isOpen: boolean; type: StatModalType }>({ isOpen: false, type: "budget" });

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const { playSwoosh, playTick, playClick } = useSound();
  const { profile } = useAuth();

  const defaultTimer = diff === "facil" ? 120 : diff === "dificil" ? 60 : 90;

  useEffect(() => {
    setAnimateCard(false);
    const timer = setTimeout(() => {
      setAnimateCard(true);
    }, 45);
    return () => clearTimeout(timer);
  }, [ph, sc]);

  useEffect(() => {
    if (!answered && timerSec === defaultTimer && ph > 0 && sc === 0) {
      // Show Imprevisto at the start of Phase 1 or later
      const imprevistosMap = {
        pt: [
          { title: "Corte de Repasse do FUNDEB", desc: "Uma determinação federal ajustou os coeficientes deste ano. Você perdeu parte do orçamento.", cost: 30 },
          { title: "Ação Judicial", desc: "Família ganha liminar exigindo Tecnologia Assistiva imediata para um aluno.", cost: 20 },
          { title: "Pressão Política", desc: "Vereadores exigem reforma em escola modelo, consumindo recursos livres.", cost: 25 }
        ],
        en: [
          { title: "FUNDEB Transfer Cut", desc: "A federal determination adjusted this year's coefficients. You lost part of the budget.", cost: 30 },
          { title: "Lawsuit", desc: "A family wins an injunction demanding immediate Assistive Technology for a student.", cost: 20 },
          { title: "Political Pressure", desc: "Council members demand a model school renovation, consuming free resources.", cost: 25 }
        ],
        es: [
          { title: "Corte de Transferencia FUNDEB", desc: "Una determinación federal ajustó los coeficientes de este año. Perdiste parte del presupuesto.", cost: 30 },
          { title: "Acción Judicial", desc: "Una familia gana medida cautelar exigiendo Tecnología Asistiva inmediata para un estudiante.", cost: 20 },
          { title: "Presión Política", desc: "Concejales exigen reforma en escuela modelo, consumiendo recursos libres.", cost: 25 }
        ]
      };
      const list = imprevistosMap[lang] || imprevistosMap.pt;
      setShowImprevisto(list[ph % list.length]);
      playSwoosh();
    }
  }, [ph, sc, answered, timerSec, defaultTimer, playSwoosh, lang]);

  useEffect(() => {
    if (!answered && !showImprevisto) {
      playSwoosh();
    }
  }, [ph, sc, answered, showImprevisto, playSwoosh]);

  useEffect(() => {
    if (answered) return;
    if (isHoveringOptions) return; // Pause timer on hover
    if (isMenuOpen) return; // Pause timer when drawer is open
    if (showImprevisto) return; // Pause timer on Imprevisto
    if (statModal.isOpen) return; // Pause timer when info modal is open

    timerRef.current = setInterval(() => {
      setGameState((prev) => {
        const newSec = prev.timerSec - 1;
        if (newSec <= 0) {
          if (timerRef.current) clearInterval(timerRef.current);
          if (sndOn) sndTimeOutAlarm();
          return { ...prev, timerSec: 0 };
        }
        if (newSec <= 25 && sndOn) {
          sndTimerTick(newSec);
        }
        return { ...prev, timerSec: newSec };
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [answered, isHoveringOptions, isMenuOpen, setGameState]);

  useEffect(() => {
    if (timerSec === 0 && !answered) {
      let worstIdx = 0;
      let minSc = currentScenario.opts[0].sc;
      currentScenario.opts.forEach((o, i) => {
        if (o.sc < minSc) {
          minSc = o.sc;
          worstIdx = i;
        }
      });
      handleChoose(worstIdx, true);
    }
  }, [timerSec, answered, currentScenario]);

  useEffect(() => {
    if (answered && gameState.score > 0) return;
    if (activeAchievement) return;
    const allAchs = getAllAch(lang);
    for (let idx = 0; idx < allAchs.length; idx++) {
      const ach = allAchs[idx];
      const translationsNames = ["pt", "en", "es"].map(l => {
        const list = getAllAch(l as any);
        return list[idx]?.name;
      }).filter(Boolean);
      const isUnlocked = gameState.unlockedAchievements?.some(name => translationsNames.includes(name));
      if (
        !isUnlocked &&
        ach.cond(gameState)
      ) {
        setGameState((prev) => ({
          ...prev,
          unlockedAchievements: [
            ...(prev.unlockedAchievements || []),
            ach.name,
          ],
        }));
        setActiveAchievement(ach);
        playSwoosh();
        setTimeout(() => {
          setActiveAchievement((curr) =>
            curr?.name === ach.name ? null : curr,
          );
        }, 4000);
        break;
      }
    }
  }, [gameState, lang, answered, playSwoosh, setGameState, activeAchievement]);

  // Handle active triggers
  useEffect(() => {
    if (!answered && gameState.activeTriggers?.length > 0 && !gameState.isPausedForEvent) {
      // Logic for triggering events based on activeTriggers
      // For now, we just pause the event loop to allow for future modal injection
      setGameState((prev) => ({ ...prev, isPausedForEvent: true }));
    }
  }, [gameState.activeTriggers, gameState.isPausedForEvent, answered, setGameState]);

  const handleChoose = (idx: number, auto = false) => {
    if (answered) return;
    playClick();
    setChosenOption(idx);

    const opt = currentScenario.opts[idx];
    const isGood = opt.type === "good";
    const isBad = opt.type === "bad";

    if (isGood) sndGood();
    else if (isBad) sndBad();
    else sndMid();

    let newCombo = gameState.combo;
    let newMax = gameState.maxCombo;
    if (isGood) {
      newCombo++;
      if (newCombo > newMax) newMax = newCombo;
      if (newCombo >= 2) sndCombo();
    } else {
      newCombo = 0;
    }

    const multDiff = diff === "facil" ? 1 : diff === "medio" ? 1.5 : 2;
    // Sistema de Combos: x1 (1.0x), x2 (1.5x), x3 (2.0x), x4 (2.5x), x5 MAX (3.0x). Opção neutra ou ruim reseta combo para 0.
    const multCombo = isGood ? Math.min(3.0, 1 + (newCombo > 0 ? (newCombo - 1) * 0.5 : 0)) : 1.0;
    const basePts = Math.round(opt.sc * multDiff * multCombo);
    
    // ⚡ Bônus de Velocidade: +10 XP por segundo restante ao responder
    const speedBonus = auto ? 0 : Math.max(0, timerSec) * 10;
    const totalPts = basePts + speedBonus;

    const newRights = isGood ? gameState.rights + 1 : gameState.rights;
    const newFast =
      isGood && timerSec >= defaultTimer - 15
        ? gameState.fast + 1
        : gameState.fast;

    setLastGained(totalPts);
    setLastSpeedBonus(speedBonus);
    setAnimatingXp(true);
    setTimeout(() => setAnimatingXp(false), 2500);

    let budgetCost = 0;
    // Lógica Eliasiana: Sustentabilidade Fiscal em vermelho cobra 50% mais orçamento se a opção tiver custo fiscal (opt.sust < 0)
    if (gameState.sust < 30 && opt.sust < 0) {
      budgetCost = 20 * 1.5; // Exemplo de penalidade maior
    } else if (opt.sust < 0) {
      budgetCost = 20;
    }

    const newQual = Math.max(0, Math.min(100, gameState.qual + opt.qual));
    const newSust = Math.max(0, Math.min(100, gameState.sust + opt.sust));
    const newBudget = Math.max(0, gameState.budget - budgetCost);

    // Condições de Derrota (Gestão Inviável)
    let currentDefeat: "qual" | "sust" | "budget" | null = null;
    if (newQual <= 0) currentDefeat = "qual";
    else if (newSust <= 0) currentDefeat = "sust";
    else if (newBudget <= 0) currentDefeat = "budget";

    if (currentDefeat) {
      setDefeatReason(currentDefeat);
    }

    const decisionId = `M${ph + 1}F1C${sc + 1}_${String.fromCharCode(65 + idx)}`;

    setGameState((prev) => ({
      ...prev,
      answered: true,
      score: prev.score + totalPts,
      budget: newBudget,
      qual: newQual,
      sust: newSust,
      combo: newCombo,
      maxCombo: newMax,
      rights: newRights,
      fast: newFast,
      decisionHistory: [...(prev.decisionHistory || []), decisionId],
    }));
  };

  const handleNext = () => {
    playClick();
    setTimeout(() => {
      if (defeatReason) {
        setGameState(prev => ({ ...prev, needsSync: true }));
        onEndGame();
        return;
      }

      let nextSc = sc + 1;

      if (nextSc >= getScenarios(lang)[ph].length) {
        // End of the module -> go to Checkpoint (ResultScreen)
        setGameState(prev => ({ ...prev, needsSync: true }));
        onEndGame();
      } else {
        setChosenOption(null);
        setDefeatReason(null);
        setGameState((prev) => ({
          ...prev,
          sc: nextSc,
          answered: false,
          timerSec: diff === "facil" ? 120 : diff === "dificil" ? 60 : 90,
        }));
      }
    }, 400);
  };

  const getTimerColor = (sec: number) => {
    if (sec > 25) return "#22c55e"; // Green (>25s)
    if (sec > 15) return "#eab308"; // Yellow (25 to 15s)
    if (sec > 5)  return "#f97316"; // Orange (15 to 5s)
    return "#ef4444";               // Red (5 to 0s)
  };
  const timerColor = getTimerColor(timerSec);
  const timerPulse = timerSec <= 5 ? "animate-pulse" : "";
  const bgHue =
    gameState.qual < 30
      ? "bg-red-600/10"
      : gameState.budget < 100
        ? "bg-yellow-600/10"
        : "bg-blue-600/20";
  const bgHue2 = gameState.sust < 30 ? "bg-red-500/10" : "bg-teal-500/10";

  return (
    <div className="flex-1 w-full flex flex-col relative font-sans text-white">

      {/* Imprevisto Modal */}
      <AnimatePresence>
        {showImprevisto && (
          <motion.div
            key="modal-imprevisto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#050b14]/80 backdrop-blur-3xl z-[200] flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white/5 border border-red-500/30 shadow-[0_0_50px_rgba(239,68,68,0.2)] rounded-3xl p-8 max-w-sm w-full text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-500" />
              <div className="w-16 h-16 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl shadow-[0_0_20px_rgba(239,68,68,0.3)]">
                ⚠️
              </div>
              <h3 className="text-xl font-bold tracking-widest text-red-400 mb-2 uppercase">
                {lang === "pt" ? "Cenário Imprevisto" : lang === "es" ? "Escenario Imprevisto" : "Unforeseen Scenario"}
              </h3>
              <h4 className="text-white font-bold text-lg mb-4">{showImprevisto.title}</h4>
              <p className="text-white/60 text-sm mb-8 leading-relaxed">
                {showImprevisto.desc}
              </p>
              
              <div className="flex items-center justify-between bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-8">
                <span className="text-red-300 font-bold text-sm">
                  {lang === "pt" ? "Impacto Imediato:" : lang === "es" ? "Impacto Inmediato:" : "Immediate Impact:"}
                </span>
                <span className="text-red-400 font-black">- {showImprevisto.cost}k QSD</span>
              </div>

              <button
                onClick={() => {
                  playClick();
                  setGameState(prev => ({ ...prev, budget: Math.max(0, prev.budget - showImprevisto.cost) }));
                  setShowImprevisto(null);
                }}
                className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/50 py-3 rounded-full font-bold tracking-widest uppercase transition-all shadow-[0_0_15px_rgba(239,68,68,0.2)]"
              >
                {lang === "pt" ? "Assumir Consequência" : lang === "es" ? "Aceptar Consecuencia" : "Accept Consequence"}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Achievement Popup */}
      <AnimatePresence>
        {activeAchievement && (
          <motion.div
            key="achievement-popup"
            initial={{ y: -80, opacity: 0, scale: 0.9 }}
            animate={{ y: 80, opacity: 1, scale: 1 }}
            exit={{
              y: -80,
              opacity: 0,
              scale: 0.9,
              transition: { duration: 0.3 },
            }}
            transition={{ type: "spring", bounce: 0.5, duration: 0.6 }}
            className="fixed top-0 left-0 right-0 z-[100] flex justify-center pointer-events-none"
          >
            <div className="bg-gradient-to-r from-gray-900 to-black border border-blue-500/30 rounded-2xl p-3 flex items-center gap-4 shadow-[0_0_30px_rgba(30,136,229,0.3)] backdrop-blur-md">
              <div className="bg-blue-500/20 w-12 h-12 flex items-center justify-center rounded-xl text-2xl shadow-inner">
                {activeAchievement.icon}
              </div>
              <div>
                <div className="text-[10px] text-blue-400 font-mono font-bold tracking-widest uppercase mb-0.5">
                  {t(lang, "ach_unlocked")}
                </div>
                <div className="text-white font-bold text-sm md:text-base leading-tight">
                  {activeAchievement.name}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HUD & Progress Lines Fixo */}
      <div className="sticky top-0 z-40 w-full flex flex-col bg-slate-950/80 backdrop-blur-2xl border-b border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
        {/* HUD Consolidado */}
        <nav className="w-full px-4 md:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-2">
          {/* Left Side: Phase Pill */}
          <div className="flex-1 min-w-0 flex items-center gap-1.5 sm:gap-3">
            <div className="bg-cyan-500/10 border border-cyan-500/20 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full shrink-0 flex items-center justify-center">
              <span className="text-cyan-400 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider whitespace-nowrap">
                {t(lang, "hud_phase")} {ph + 1}
              </span>
            </div>
            <span className="text-white/20 text-xs shrink-0 hidden sm:inline">|</span>
            <span className="text-white/80 text-xs sm:text-sm uppercase tracking-wide truncate font-semibold hidden sm:inline max-w-[120px] md:max-w-[180px] lg:max-w-none">
              {currentPhase?.name || `Módulo ${ph + 1}`}
            </span>
          </div>

          {/* Minimalist Timer with viewBox Scaling */}
          <div className="flex-none flex items-center justify-center relative mx-1 sm:mx-3">
            <svg viewBox="0 0 44 44" className="w-10 h-10 sm:w-11 sm:h-11 rotate-[-90deg]">
              <circle
                cx="22"
                cy="22"
                r="18"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="3"
              />
              <circle
                cx="22"
                cy="22"
                r="18"
                fill="none"
                stroke={timerColor}
                strokeWidth="3"
                strokeDasharray={113}
                strokeDashoffset={113 - (timerSec / defaultTimer) * 113}
                className={`transition-all duration-1000 ease-linear ${timerPulse}`}
                strokeLinecap="round"
              />
            </svg>
            <span
              className={`absolute font-mono font-bold text-xs sm:text-sm ${timerPulse}`}
              style={{ color: timerColor }}
            >
              {timerSec}
            </span>
          </div>

          {/* Info Icons / Stats with Beautiful Glassmorphism Capsules */}
          <div className="flex-1 flex justify-end gap-1.5 sm:gap-3 items-center text-xs sm:text-sm font-bold font-mono min-w-0">
            {/* Budget Pill */}
            <button
              onClick={() => {
                playClick();
                setStatModal({ isOpen: true, type: "budget" });
              }}
              className="flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full shadow-[0_2px_10px_rgba(16,185,129,0.1)] hover:bg-emerald-500/25 hover:border-emerald-500/40 hover:scale-105 active:scale-95 transition-all shrink-0 cursor-pointer"
              title={`${t(lang, "hud_budget")} - ${lang === "pt" ? "Clique para detalhes" : lang === "es" ? "Haz clic para detalles" : "Click for details"}`}
            >
              <span className="text-xs sm:text-sm">💰</span>
              <span className="font-semibold tracking-tight text-[11px] sm:text-xs md:text-sm">R$ {(gameState.budget * 1000).toLocaleString("pt-BR")},00</span>
            </button>

            {/* Score Pill */}
            <button
              onClick={() => {
                playClick();
                setStatModal({ isOpen: true, type: "score" });
              }}
              className="flex items-center gap-1 bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full shadow-[0_2px_10px_rgba(234,179,8,0.1)] hover:bg-yellow-500/25 hover:border-yellow-500/40 hover:scale-105 active:scale-95 transition-all shrink-0 relative cursor-pointer"
              title={`${t(lang, "hud_score")} - ${lang === "pt" ? "Clique para detalhes" : lang === "es" ? "Haz clic para detalles" : "Click for details"}`}
            >
              <span className="text-xs sm:text-sm">⭐</span>
              <span className="font-semibold tracking-tight text-[11px] sm:text-xs md:text-sm relative">
                {gameState.score}
                <AnimatePresence>
                  {animatingXp && (
                    <motion.span
                      key="animating-xp-span"
                      initial={{ opacity: 1, y: 0, scale: 1 }}
                      animate={{ opacity: 0, y: -20, scale: 1.2 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1 }}
                      className="absolute left-full ml-1 text-yellow-300 pointer-events-none drop-shadow-[0_0_5px_#fde047] font-bold"
                    >
                      +{lastGained}
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
            </button>

            {/* Combo Pill */}
            <button
              onClick={() => {
                playClick();
                setStatModal({ isOpen: true, type: "combo" });
              }}
              className={`flex items-center gap-1 border px-2 py-1 rounded-full transition-all shrink-0 cursor-pointer hover:scale-105 active:scale-95 ${
                gameState.combo >= 5
                  ? "bg-gradient-to-r from-orange-500/20 to-red-500/20 border-orange-500/50 hover:border-orange-400 text-orange-300 shadow-[0_0_12px_rgba(249,115,22,0.3)] animate-pulse"
                  : gameState.combo >= 2
                  ? "bg-orange-500/10 border-orange-500/30 hover:bg-orange-500/20 hover:border-orange-500/50 text-orange-400 shadow-[0_2px_10px_rgba(249,115,22,0.15)]"
                  : "bg-white/5 border-white/10 text-white/40 hover:bg-white/10 hover:text-white/80"
              }`}
              title={`${t(lang, "hud_combo")}: ${gameState.combo > 0 ? `x${gameState.combo}` : "0"} - ${lang === "pt" ? "Clique para detalhes" : lang === "es" ? "Haz clic para detalles" : "Click for details"}`}
            >
              <span className="text-xs sm:text-sm">🔥</span>
              <span className="font-bold tracking-tight text-[11px] sm:text-xs md:text-sm">
                {gameState.combo >= 5 ? `x${gameState.combo} MAX` : gameState.combo >= 1 ? `x${gameState.combo}` : "-"}
              </span>
            </button>
          </div>
        </nav>

        {/* Thin Quality/Fiscal Lines */}
        <div className="w-full flex h-1 bg-white/5 relative z-40">
          <div
            className="h-full bg-[#2ecc71] shadow-[0_0_10px_#2ecc71] transition-all duration-700 ease-out"
            style={{ width: `${gameState.qual}%` }}
            title={`Qualidade: ${Math.round(gameState.qual)}%`}
          />
          <div
            className="h-full bg-[#3498db] shadow-[0_0_10px_#3498db] transition-all duration-700 ease-out"
            style={{ width: `${gameState.sust}%` }}
            title={`Fiscal: ${Math.round(gameState.sust)}%`}
          />
        </div>
      </div>

       <div className={`flex-1 px-2.5 py-4 md:px-4 md:py-12 flex flex-col justify-start z-10 relative ${answered ? 'pb-48 md:pb-28' : 'pb-20 md:pb-12'}`}>
        <div
          key={`scenario-${ph}-${sc}`}
          className={`w-full max-w-5xl mx-auto p-3.5 sm:p-6 md:p-10 bg-slate-900/40 backdrop-blur-2xl border-t border-l border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.6)] rounded-2xl sm:rounded-3xl scenario-card-transition ${
            animateCard ? "scenario-card-enter-active" : ""
          }`}
        >
            <div className="grid lg:grid-cols-2 gap-5 md:gap-12 items-start">
              {/* Context Area (Left on Desktop) */}
              <div className="flex flex-col gap-3.5 sm:gap-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div
                    className="w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-2xl flex items-center justify-center text-xl sm:text-3xl shadow-[inset_0_0_20px_rgba(255,255,255,0.1)] border border-white/10 shrink-0"
                    style={{ background: currentScenario.color }}
                  >
                    {currentScenario.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5 sm:mb-1">
                      <div className="text-[10px] uppercase font-bold tracking-widest text-[#4facfe]">
                        {t(lang, "hud_phase")} {ph + 1} &bull; {currentPhase?.name || `Módulo ${ph + 1}`}
                      </div>
                      {currentScenario.prazoHoras && (
                        <div className="flex items-center gap-1 text-[10px] font-bold text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded border border-red-500/20">
                          <Clock size={10} /> {currentScenario.prazoHoras}H
                        </div>
                      )}
                    </div>
                    <h2 className="text-lg sm:text-2xl md:text-3xl font-black text-white leading-tight">
                      {currentScenario.title}
                    </h2>
                  </div>
                </div>

                <div className="text-white/80 text-[13px] sm:text-base md:text-lg leading-relaxed font-light">
                  {currentScenario.body}
                </div>

                <AnimatePresence>
                  {answered && currentScenario.perguntaDebriefing && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 p-4 rounded-xl bg-blue-900/20 border border-blue-500/30 text-blue-200"
                    >
                      <div className="text-[10px] uppercase font-bold tracking-widest text-blue-400 mb-1">
                        {lang === "pt" ? "🤔 Ponto de Reflexão" : lang === "es" ? "🤔 Punto de Reflexión" : "🤔 Reflection Point"}
                      </div>
                      <div className="text-sm md:text-base italic">
                        "{currentScenario.perguntaDebriefing}"
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Options Stack (Right on Desktop) */}
              <div
                className="flex flex-col gap-3"
                onMouseEnter={() => setIsHoveringOptions(true)}
                onMouseLeave={() => setIsHoveringOptions(false)}
              >
                {currentScenario.opts.map((opt, i) => {
                  const isSelected = chosenOption === i;
                  const showFeedbackInline = answered && isSelected;
                  const notSelected = answered && !isSelected;

                  let boxClass = "bg-slate-900/40 backdrop-blur-md border border-white/10";
                  let glowClass = "";
                  let subtleHintClass = "";

                  if (!answered) {
                    // Blind Choice Hints
                    if (opt.type === "good") {
                      subtleHintClass = "rounded-tl-3xl shadow-[inset_0_2px_10px_rgba(255,255,255,0.03)]";
                    } else if (opt.type === "bad") {
                      subtleHintClass = "rounded-br-sm transition-all";
                    } else {
                      subtleHintClass = "transition-all";
                    }
                  }

                  if (showFeedbackInline) {
                    if (opt.type === "good") {
                      boxClass = "bg-green-900/30 backdrop-blur-md border-green-500/50 border-l-4 border-l-green-500";
                      glowClass = "shadow-[0_0_25px_rgba(46,204,113,0.15)]";
                    } else if (opt.type === "bad") {
                      boxClass = "bg-red-900/30 backdrop-blur-md border-red-500/50 border-l-4 border-l-red-500";
                      glowClass = "shadow-[0_0_25px_rgba(231,76,60,0.15)]";
                    } else {
                      boxClass = "bg-yellow-900/30 backdrop-blur-md border-yellow-500/50 border-l-4 border-l-yellow-500";
                      glowClass = "shadow-[0_0_25px_rgba(243,156,18,0.15)]";
                    }
                  } else if (notSelected) {
                    boxClass = "bg-slate-900/20 backdrop-blur-sm border-white/5 opacity-40 grayscale";
                  }

                  return (
                    <div key={i} className="flex flex-col gap-1.5">
                      <motion.button
                        disabled={answered}
                        onClick={() => handleChoose(i)}
                        onMouseEnter={!answered ? playTick : undefined}
                        whileHover={!answered ? { x: 6, borderLeftWidth: "4px", borderLeftColor: "#06b6d4", backgroundColor: "rgba(15, 23, 42, 0.6)" } : {}}
                        whileTap={!answered ? { scale: 0.98 } : {}}
                        className={`w-full text-left p-3.5 sm:p-5 transition-colors rounded-xl sm:rounded-2xl flex items-start gap-3 sm:gap-4 ${boxClass} ${glowClass} ${subtleHintClass} ${!answered ? "cursor-pointer" : "cursor-default"}`}
                      >
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 flex items-center justify-center font-bold font-mono text-xs sm:text-sm shrink-0 border border-white/10">
                          {opt.l}
                        </div>
                        <div className="flex-1 mt-0.5 text-white/90 text-xs sm:text-sm md:text-base font-medium leading-snug">
                          {opt.txt}
                        </div>
                      </motion.button>

                      {/* Inline Feedback Panel */}
                      <AnimatePresence>
                        {showFeedbackInline && (
                          <motion.div
                            key={`feedback-inline-${i}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            transition={{ type: "spring", bounce: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div
                              className={`p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border bg-black/40 backdrop-blur-md mt-1 ${opt.type === "good" ? "border-green-500/30" : opt.type === "bad" ? "border-red-500/30" : "border-yellow-500/30"}`}
                            >
                              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                                <span
                                  className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${opt.type === "good" ? "bg-green-500/20 text-green-400" : opt.type === "bad" ? "bg-red-500/20 text-red-400" : "bg-yellow-500/20 text-yellow-400"}`}
                                >
                                  {opt.tag}
                                </span>
                                <span className="text-base sm:text-xl">{opt.fi.icon}</span>
                                <span
                                  className={`font-bold text-xs sm:text-sm tracking-tight ${opt.type === "good" ? "text-green-400" : opt.type === "bad" ? "text-red-400" : "text-yellow-400"}`}
                                >
                                  {opt.fi.t}
                                </span>
                              </div>
                              <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-3">
                                {opt.fi.b}
                                {opt.fi.baseJuridica && (
                                  <span className="block mt-1 text-[#4facfe]/80 italic text-[10px] tracking-wide">
                                    ⚖️ {lang === "pt" ? "BASE JURÍDICA:" : lang === "es" ? "BASE LEGAL:" : "LEGAL BASIS:"} {opt.fi.baseJuridica}
                                  </span>
                                )}
                              </p>
                              <div className="flex flex-wrap gap-1.5 font-mono text-[10px] font-bold text-white/80 uppercase">
                                <span className="px-2 py-1 rounded bg-green-500/10 border border-green-500/20 text-green-400">
                                  ♿ {t(lang, "stat_qual")}: {opt.fi.qual}
                                </span>
                                <span className="px-2 py-1 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400">
                                  ⚖️ {t(lang, "stat_fisc")}: {opt.fi.sust}
                                </span>
                                <span className="px-2 py-1 rounded bg-white/10 border border-white/20">
                                  ⭐ {opt.fi.pts} {t(lang, "pts")}
                                </span>
                                {gameState.combo >= 1 && opt.type === "good" && (
                                  <span className="px-2 py-1 rounded bg-orange-500/20 border border-orange-500/40 text-orange-300 font-bold flex items-center gap-1">
                                    🔥 Combo x{gameState.combo} ({gameState.combo >= 5 ? "3.0x MAX" : `${(1 + (gameState.combo - 1) * 0.5).toFixed(1)}x`})
                                  </span>
                                )}
                                {lastSpeedBonus > 0 && (
                                  <span className="px-2 py-1 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold flex items-center gap-1">
                                    ⚡ {lang === "pt" ? "Bônus Vel." : lang === "es" ? "Bono Vel." : "Speed Bonus"}: +{lastSpeedBonus} XP
                                  </span>
                                )}
                                {opt.consequenciaLateral && (
                                  <span className="px-2 py-1 rounded bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center gap-1">
                                    <span>🔮</span> {lang === "pt" ? "Consequência Gerada" : lang === "es" ? "Consecuencia Generada" : "Generated Consequence"}
                                  </span>
                                )}
                              </div>

                              {/* Defeat Condition Warning Banner */}
                              {defeatReason && (
                                <motion.div
                                  initial={{ scale: 0.95, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  className="mt-3 p-3.5 rounded-xl bg-red-950/80 border-2 border-red-500 text-red-200 space-y-1 shadow-[0_0_25px_rgba(239,68,68,0.3)]"
                                >
                                  <div className="flex items-center gap-2 text-red-400 font-black uppercase text-xs sm:text-sm tracking-wider">
                                    <span>⚠️</span>
                                    <span>{lang === "pt" ? "GESTÃO INVIÁVEL - CONDIÇÃO DE DERROTA" : lang === "es" ? "GESTIÓN INVIABLE - CONDICIÓN DE DERROTA" : "UNVIABLE MANAGEMENT - DEFEAT CONDITION"}</span>
                                  </div>
                                  <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-medium">
                                    {defeatReason === "qual" && (
                                      lang === "pt"
                                        ? "A Qualidade da Inclusão chegou a 0% por negligência pedagógica e violação dos direitos dos alunos da Educação Especial."
                                        : lang === "es"
                                        ? "La Calidad de la Inclusión llegó al 0% por negligencia pedagógica y violación de derechos humanos."
                                        : "Inclusion Quality reached 0% due to pedagogical neglect and human rights violations."
                                    )}
                                    {defeatReason === "sust" && (
                                      lang === "pt"
                                        ? "A Sustentabilidade Fiscal caiu para 0% por colapso financeiro, insolvência e uso indevido dos recursos do FUNDEB."
                                        : lang === "es"
                                        ? "La Sostenibilidad Fiscal cayó al 0% por colapso financiero e uso indebido de los recursos del FUNDEB."
                                        : "Fiscal Sustainability dropped to 0% due to financial collapse and improper use of FUNDEB funds."
                                    )}
                                    {defeatReason === "budget" && (
                                      lang === "pt"
                                        ? "O Orçamento foi totalmente zerado (0 QSD). A gestão não possui recursos para cumprir as exigências legais obrigatórias da lei."
                                        : lang === "es"
                                        ? "El Presupuesto se agotó totalmente (0 QSD). La gestión no posee recursos para cumplir con las exigencias legales obligatorias."
                                        : "Budget fully depleted (0 QSD). Management cannot meet basic legal requirements for inclusive education."
                                    )}
                                  </p>
                                </motion.div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
      </div>

      {/* Floating Next action */}
      <AnimatePresence>
        {answered && (
          <motion.div
            key="next-button-floating"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 p-3.5 pb-16 md:pb-6 bg-gradient-to-t from-[#070b16] via-[#070b16]/90 to-transparent backdrop-blur-md border-t border-white/10 z-[110] flex justify-center pointer-events-none"
          >
            <motion.button
              onClick={handleNext}
              onMouseEnter={() => playTick()}
              animate={{ 
                scale: [1, 1.05, 1], 
                boxShadow: ["0 0 20px rgba(34,211,238,0.4)", "0 0 35px rgba(34,211,238,0.8)", "0 0 20px rgba(34,211,238,0.4)"] 
              }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="pointer-events-auto bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 text-slate-950 font-black rounded-full px-8 py-3 text-xs sm:text-sm tracking-widest uppercase flex items-center gap-2.5 cursor-pointer shadow-lg active:scale-95"
            >
              <span>{t(lang, "btn_next")}</span> <ArrowRight size={18} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <StatInfoModal
        isOpen={statModal.isOpen}
        onClose={() => setStatModal((prev) => ({ ...prev, isOpen: false }))}
        type={statModal.type}
        gameState={gameState}
        lang={lang}
      />
    </div>
  );
}
