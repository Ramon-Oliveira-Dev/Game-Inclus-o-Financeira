import React from "react";
import { 
  Building2, Scale, Accessibility, 
  Gavel, Users, CircleDollarSign, X,
  Tablet, Presentation, Scroll, Handshake,
  Map as MapIcon, Trophy, FileBadge,
  Clock, AlertTriangle, FileText, School, Lock, Check
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { GameState, Language } from "../types";
import { getAC } from "../lib/audio";
import { useSound } from "../hooks/useSound";
import { useAuth } from "../contexts/AuthContext";
import { getPhases, getScenarios } from "../data";
import { t } from "../locales";

interface StartScreenProps {
  lang: Language;
  setLang: (lang: Language) => void;
  onStart: (partial: Partial<GameState>) => void;
  isMenuOpen: boolean;
  onOpenMenu: () => void;
  score: number;
  onShowRanking: () => void;
  gameState: GameState;
}

export function StartScreen({ lang, onStart, score, onShowRanking, gameState }: StartScreenProps) {
  const { playStart, playTick } = useSound();
  const { profile } = useAuth();
  
  const phases = getPhases(lang).slice(0, getScenarios(lang).length);
  const phaseIcons = [
    School,            // Phase 1: Acessibilidade Inicial
    Scale,             // Phase 2: Desenho Universal
    Users,             // Phase 3: Parcerias
    Gavel,             // Phase 4: Urgências Judiciais
    AlertTriangle,     // Phase 5: Pressões Políticas
    CircleDollarSign,  // Phase 6: Crise de Caixa
    Tablet,            // Phase 7: Estratégia e TA
    Presentation,      // Phase 8: Formação
    Scroll,            // Phase 9: Políticas Públicas
    MapIcon            // Phase 10: Desafios Interfederativos
  ];

  const moduleIcons = [
    School,
    Scale,
    Tablet,
    MapIcon
  ];

  const getModules = (l: Language) => {
    if (l === "es") {
      return [
        {
          id: 1,
          name: "Módulo 1: Inclusión y Accesibilidad Inicial",
          desc: "Establecer las bases de la accesibilidad, diseño universal y alianzas estratégicas.",
          phases: [0, 1, 2],
        },
        {
          id: 2,
          name: "Módulo 2: Desafíos Presupuestarios y Legales",
          desc: "Gestionar urgencias judiciales, presiones políticas y optimización de caja.",
          phases: [3, 4, 5],
        },
        {
          id: 3,
          name: "Módulo 3: Tecnología y Formación Continua",
          desc: "Implementar tecnologías asistivas y capacitación de equipos pedagógicos.",
          phases: [6, 7, 8],
        },
        {
          id: 4,
          name: "Módulo 4: Gestión Ampliada y Cooperación",
          desc: "Hacer frente a desafíos interfederativos y articulación institucional.",
          phases: [9],
        }
      ];
    }
    if (l === "en") {
      return [
        {
          id: 1,
          name: "Module 1: Inclusion and Initial Accessibility",
          desc: "Establish the foundations of accessibility, universal design, and strategic partnerships.",
          phases: [0, 1, 2],
        },
        {
          id: 2,
          name: "Module 2: Budgetary and Legal Challenges",
          desc: "Manage legal urgencies, political pressures, and cash-flow optimization.",
          phases: [3, 4, 5],
        },
        {
          id: 3,
          name: "Module 3: Technology and Ongoing Training",
          desc: "Implement assistive technologies and professional development for pedagogical teams.",
          phases: [6, 7, 8],
        },
        {
          id: 4,
          name: "Module 4: Extended Management and Cooperation",
          desc: "Tackle intergovernmental challenges and institutional coordination.",
          phases: [9],
        }
      ];
    }
    // Default to PT
    return [
      {
        id: 1,
        name: "Módulo 1: Inclusão e Acessibilidade Inicial",
        desc: "Estabelecer as bases da acessibilidade, desenho universal e parcerias estratégicas.",
        phases: [0, 1, 2],
      },
      {
        id: 2,
        name: "Módulo 2: Desafios Orçamentários e Legais",
        desc: "Gerenciar urgências judiciais, pressões políticas e otimização de fluxo de caixa.",
        phases: [3, 4, 5],
      },
      {
        id: 3,
        name: "Módulo 3: Tecnologia e Formação Continuada",
        desc: "Implementar tecnologia assistiva e capacitação das equipes pedagógicas.",
        phases: [6, 7, 8],
      },
      {
        id: 4,
        name: "Módulo 4: Gestão Ampliada e Cooperação",
        desc: "Enfrentar desafios interfederativos e articulação institucional.",
        phases: [9],
      }
    ];
  };

  const modules = getModules(lang);

  // Initialize carousel to current active module based on current phase
  const initialActiveModule = modules.findIndex(m => m.phases.includes(gameState.ph));
  const [activeModuleIndex, setActiveModuleIndex] = React.useState(initialActiveModule !== -1 ? initialActiveModule : 0);
  const [isPaused, setIsPaused] = React.useState(false);

  React.useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveModuleIndex((prev) => (prev + 1) % modules.length);
    }, 6000); // 6 seconds for each card
    return () => clearInterval(interval);
  }, [isPaused, modules.length]);

  const getModuleState = (modPhases: number[]) => {
    const isCompleted = Math.max(...modPhases) < gameState.ph;
    const isCurrent = modPhases.includes(gameState.ph);
    const isLocked = Math.min(...modPhases) > gameState.ph;
    return { isCompleted, isCurrent, isLocked };
  };

  const handleStart = () => {
    getAC();
    playStart();
    if (gameState.ph > 0 || gameState.sc > 0 || gameState.score > 0) {
      onStart({ resume: true } as any);
    } else {
      const selectedDiff = gameState.diff || "medio";
      const initialTimer = selectedDiff === "facil" ? 120 : selectedDiff === "dificil" ? 60 : 90;
      onStart({
        player: profile?.nome || "Gestor(a)",
        diff: selectedDiff,
        timerSec: initialTimer,
      });
    }
  };

  const handleRestart = () => {
    getAC();
    playStart();
    const selectedDiff = gameState.diff || "medio";
    const initialTimer = selectedDiff === "facil" ? 120 : selectedDiff === "dificil" ? 60 : 90;
    onStart({
      ph: 0,
      sc: 0,
      score: 0,
      player: profile?.nome || "Gestor(a)",
      diff: selectedDiff,
      timerSec: initialTimer,
    });
  };

  const activeModule = modules[activeModuleIndex];

  const currentModuleIdxForProgress = modules.findIndex(m => m.phases.includes(gameState.ph));
  const progressFactor = Math.min(Math.max(currentModuleIdxForProgress !== -1 ? currentModuleIdxForProgress : 0, 0) / 3, 1);

  return (
    <div className="flex-1 w-full flex flex-col bg-transparent text-white overflow-y-auto md:overflow-hidden">
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-6 py-4 flex flex-col justify-start md:justify-center gap-4 md:overflow-hidden">
        {/* 1. Cabeçalho (Header) */}
        <header className="flex flex-col shrink-0">
          <h1 className="text-base sm:text-lg md:text-3xl font-bold uppercase tracking-tight text-white leading-tight">
            {lang === "pt" ? "FORMAÇÃO DE GESTORES DE EDUCAÇÃO ESPECIAL" : lang === "es" ? "FORMACIÓN DE GESTORES DE EDUCACIÓN ESPECIAL" : "TRAINING OF SPECIAL EDUCATION MANAGERS"}
          </h1>
          <h2 className="text-[8px] sm:text-[10px] md:text-sm text-cyan-400 font-bold tracking-widest mt-0.5 md:mt-1 uppercase">
            {lang === "pt" ? "O DESAFIO NA GESTÃO PÚBLICA" : lang === "es" ? "EL DESAFÍO EN LA GESTIÓN PÚBLICA" : "THE CHALLENGE IN PUBLIC MANAGEMENT"}
          </h2>
        </header>

        {/* 2. Tracker de Progresso (Barra Superior - 4 Módulos) */}
        <div className="hidden md:block relative w-full py-2 md:py-4 shrink-0">
          {/* A Linha de Fundo */}
          <div className="absolute top-1/2 left-8 right-8 md:left-14 md:right-14 h-[2px] bg-slate-800 -translate-y-1/2 rounded-full -z-10"></div>
          {/* A Linha de Progresso baseada no módulo ativo do jogador */}
          <div 
            className="absolute top-1/2 left-8 md:left-14 h-[2px] bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)] -translate-y-1/2 -z-10 transition-all duration-1000"
            style={{ 
              width: `calc(${progressFactor} * calc(100% - 4rem))` 
            }}
          ></div>

          <div className="flex justify-between w-full relative z-10 px-2 md:px-8">
            {modules.map((module, i) => {
              const { isCompleted, isCurrent, isLocked } = getModuleState(module.phases);
              const isSelected = i === activeModuleIndex;
              const Icon = moduleIcons[i] || School;

              let stateStyles = "";
              if (isCompleted) {
                stateStyles = "bg-[#0B1120] border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]";
              } else if (isCurrent) {
                stateStyles = "bg-cyan-950 border-cyan-400 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.5)]";
              } else {
                stateStyles = "bg-[#0B1120] border-slate-700 text-slate-600";
              }

              return (
                <div 
                  key={i}
                  onClick={() => {
                    playTick();
                    setActiveModuleIndex(i);
                  }}
                  className={`flex flex-col items-center justify-center gap-1 md:gap-2 cursor-pointer hover:scale-105 transition-transform ${isSelected ? 'scale-110' : ''}`}
                >
                  <div className={`w-10 h-10 md:w-12 md:h-12 border-2 rounded-full flex items-center justify-center relative ${stateStyles} ${isSelected ? 'ring-2 ring-cyan-400 ring-offset-2 ring-offset-slate-900' : ''}`}>
                    {isCurrent && <div className="absolute inset-0 rounded-full border border-cyan-400 animate-ping opacity-20"></div>}
                    <Icon className="w-4 h-4 md:w-5 md:h-5" strokeWidth={1.5} />
                    {isCompleted && <Check className="w-2.5 h-2.5 md:w-3 md:h-3 absolute -bottom-1 -right-1 bg-[#0B1120] rounded-full text-emerald-400" strokeWidth={3} />}
                    {isLocked && <Lock className="w-2.5 h-2.5 md:w-3 md:h-3 absolute -bottom-1 -right-1 bg-[#0B1120] rounded-full text-slate-500" strokeWidth={2} />}
                  </div>
                  <span className={`text-[8px] md:text-[10px] font-bold uppercase tracking-wider text-center max-w-[60px] md:max-w-[80px] leading-tight ${isCompleted ? 'text-emerald-400' : isCurrent ? 'text-cyan-400' : isSelected ? 'text-cyan-300' : 'text-slate-500'}`}>
                    {lang === "pt" ? `MÓDULO ${i + 1}` : lang === "es" ? `MÓDULO ${i + 1}` : `MODULE ${i + 1}`}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Hero Card (Módulo Ativo - Centro com Carrossel Automático) */}
        <div 
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="w-full bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-2xl md:rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] overflow-hidden relative shrink flex-1 flex flex-col min-h-0"
        >
          <div className="absolute top-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-cyan-500/10 rounded-full blur-[80px] md:blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModuleIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 p-3 sm:p-4 md:p-5 lg:p-6 relative z-10 flex-1 overflow-y-auto lg:overflow-y-hidden min-h-0"
            >
              
              {/* Coluna Esquerda: Módulo e suas Fases */}
              <div className="flex flex-col justify-between gap-2.5 md:gap-4 min-h-0">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[9px] md:text-xs font-bold text-cyan-400 tracking-widest bg-cyan-950/50 border border-cyan-500/20 px-1.5 py-0.5 rounded uppercase">
                      {lang === "pt" ? `Módulo ${activeModule.id}` : lang === "es" ? `Módulo ${activeModule.id}` : `Module ${activeModule.id}`}
                    </span>
                    <span className="text-[9px] md:text-xs text-slate-400">
                      {activeModule.phases.length} {lang === "pt" ? "Fases" : lang === "es" ? "Fases" : "Phases"}
                    </span>
                  </div>
                  <h2 className="text-sm sm:text-base md:text-xl lg:text-2xl font-extrabold text-white leading-tight mb-1 tracking-wide text-left">
                    {activeModule.name.split(": ")[1] || activeModule.name}
                  </h2>
                  <p className="text-[10px] sm:text-[11px] md:text-xs lg:text-sm text-slate-300 leading-normal mb-2.5 text-left line-clamp-2 md:line-clamp-none">
                    {activeModule.desc}
                  </p>

                  {/* Lista de Fases do Módulo */}
                  <div className="flex flex-col gap-1.5 md:gap-2">
                    {activeModule.phases.map((phaseIndex) => {
                      const phase = phases[phaseIndex];
                      if (!phase) return null;
                      const isPhaseCompleted = phaseIndex < gameState.ph;
                      const isPhaseCurrent = phaseIndex === gameState.ph;
                      const isPhaseLocked = phaseIndex > gameState.ph;
                      const PhaseIcon = phaseIcons[phaseIndex] || School;

                      let phaseBg = "bg-white/[0.02] border-white/5";
                      let textClass = "text-slate-300";
                      if (isPhaseCurrent) {
                        phaseBg = "bg-cyan-500/10 border-cyan-400/30 shadow-[0_0_15px_rgba(34,211,238,0.1)]";
                        textClass = "text-white";
                      } else if (isPhaseCompleted) {
                        phaseBg = "bg-emerald-500/5 border-emerald-500/20";
                        textClass = "text-slate-300";
                      }

                      return (
                        <div
                          key={phaseIndex}
                          onClick={() => {
                            if (!isPhaseLocked) {
                              playTick();
                              if (isPhaseCurrent) {
                                handleStart();
                              }
                            }
                          }}
                          className={`p-1.5 px-2.5 md:p-2.5 md:px-3.5 rounded-lg md:rounded-xl border flex items-center justify-between transition-all duration-300 ${phaseBg} ${!isPhaseLocked ? 'cursor-pointer hover:bg-white/[0.05] hover:border-white/10' : 'opacity-40 cursor-not-allowed'}`}
                        >
                          <div className="flex items-center gap-2 md:gap-3 min-w-0">
                            <div className={`w-6 h-6 md:w-7 md:h-7 rounded-md md:rounded-lg flex items-center justify-center border shrink-0 ${isPhaseCurrent ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300' : isPhaseCompleted ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'bg-slate-800 border-slate-700 text-slate-500'}`}>
                              <PhaseIcon className="w-3 md:w-3.5 h-3 md:h-3.5" />
                            </div>
                            <div className="flex flex-col text-left min-w-0">
                              <span className="text-[8px] md:text-[9px] text-slate-400 font-mono leading-none mb-0.5">
                                {lang === "pt" ? `FASE ${phaseIndex + 1}` : lang === "es" ? `FASE ${phaseIndex + 1}` : `PHASE ${phaseIndex + 1}`}
                              </span>
                              <span className={`text-[10px] sm:text-xs font-bold leading-tight line-clamp-1 ${textClass}`}>
                                {phase.desc}
                              </span>
                            </div>
                          </div>

                          {/* Status badge */}
                          <div className="shrink-0 ml-2">
                            {isPhaseCompleted ? (
                              <span className="text-[8px] md:text-[9px] font-extrabold uppercase tracking-widest text-emerald-400 border border-emerald-500/30 bg-emerald-950/20 px-1.5 py-0.5 rounded">
                                {lang === "pt" ? "Concluída" : lang === "es" ? "Completada" : "Completed"}
                              </span>
                            ) : isPhaseCurrent ? (
                              <motion.span 
                                animate={{ opacity: [1, 0.5, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="text-[8px] md:text-[9px] font-extrabold uppercase tracking-widest text-cyan-400 border border-cyan-500/30 bg-cyan-950/20 px-1.5 py-0.5 rounded flex items-center gap-1"
                              >
                                <span className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse"></span>
                                {lang === "pt" ? "Jogar" : lang === "es" ? "Jugar" : "Play"}
                              </motion.span>
                            ) : (
                              <span className="text-[8px] md:text-[9px] font-extrabold uppercase tracking-widest text-slate-500 border border-slate-800 bg-slate-950/20 px-1.5 py-0.5 rounded flex items-center gap-1">
                                <Lock className="w-2 h-2" /> {lang === "pt" ? "Bloqueada" : lang === "es" ? "Bloqueada" : "Locked"}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Coluna Direita (Status do Município) */}
              <div className="bg-black/20 backdrop-blur-xl rounded-xl md:rounded-2xl p-2.5 md:p-4 border border-white/5 flex flex-col justify-between h-full shadow-inner relative overflow-hidden group hover:bg-black/30 transition-colors">
                <div className="absolute -right-10 -top-10 w-32 md:w-40 h-32 md:h-40 bg-cyan-500/5 rounded-full blur-2xl md:blur-3xl pointer-events-none group-hover:bg-cyan-500/10 transition-colors duration-500" />
                
                <div>
                  <h3 className="text-[9px] md:text-xs text-cyan-400/80 font-black uppercase tracking-widest mb-1.5 md:mb-3 text-left">
                    {lang === "pt" ? "Status do Município" : lang === "es" ? "Estado del Municipio" : "Municipality Status"}
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-2 md:gap-4 mb-2 md:mb-4 text-left">
                    <div className="flex flex-col">
                      <span className="text-[8px] md:text-[9px] text-slate-500 uppercase tracking-widest mb-0.5 font-bold">{lang === "pt" ? "Orçamento" : lang === "es" ? "Presupuesto" : "Budget"}</span>
                      <span className="text-xs sm:text-sm md:text-base lg:text-lg font-black text-emerald-400 tracking-tight drop-shadow-[0_0_12px_rgba(16,185,129,0.4)]">
                        {activeModule.phases.includes(gameState.ph) ? `R$ ${(gameState.budget * 1000).toLocaleString("pt-BR")},00` : "---"}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[8px] md:text-[9px] text-slate-500 uppercase tracking-widest mb-0.5 font-bold">{lang === "pt" ? "Módulo Ativo" : lang === "es" ? "Módulo Activo" : "Active Module"}</span>
                      <span className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-white tracking-wide">
                        {Math.min(modules.findIndex(m => m.phases.includes(gameState.ph)) !== -1 ? modules.findIndex(m => m.phases.includes(gameState.ph)) + 1 : 1, 4)} <span className="text-slate-500 text-[9px] md:text-sm">/ 4</span>
                      </span>
                    </div>
                  </div>

                  <div className="w-full mb-2 md:mb-4 text-left">
                    <div className="flex justify-between items-end mb-0.5">
                      <span className="text-[8px] md:text-[9px] text-cyan-400/80 font-bold uppercase tracking-widest">{lang === "pt" ? "Progresso do Módulo" : lang === "es" ? "Progreso del Módulo" : "Module Progress"}</span>
                      <span className="text-[9px] md:text-xs text-cyan-400 font-black">
                        {(() => {
                          const modulePhases = activeModule.phases;
                          const completedInModule = modulePhases.filter(p => p < gameState.ph).length;
                          const totalInModule = modulePhases.length;
                          if (modulePhases.includes(gameState.ph)) {
                            return `${Math.round((completedInModule / totalInModule) * 100)}%`;
                          } else if (Math.max(...modulePhases) < gameState.ph) {
                            return "100%";
                          } else {
                            return "0%";
                          }
                        })()}
                      </span>
                    </div>
                    <div className="w-full h-1 md:h-1.5 bg-black/50 rounded-full overflow-hidden border border-white/5">
                      <div 
                        className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)] rounded-full relative"
                        style={{ 
                          width: (() => {
                            const modulePhases = activeModule.phases;
                            const completedInModule = modulePhases.filter(p => p < gameState.ph).length;
                            const totalInModule = modulePhases.length;
                            if (modulePhases.includes(gameState.ph)) {
                              return `${(completedInModule / totalInModule) * 100}%`;
                            } else if (Math.max(...modulePhases) < gameState.ph) {
                              return "100%";
                            } else {
                              return "0%";
                            }
                          })()
                        }}
                      >
                        <div className="absolute top-0 right-0 bottom-0 w-4 bg-white/20 blur-[2px]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons / Controls */}
                <div className="flex flex-col gap-1.5 mt-1.5 md:mt-3">
                  {activeModule.phases.includes(gameState.ph) ? (
                    <>
                      <button
                        onClick={handleStart}
                        onMouseEnter={playTick}
                        className="bg-cyan-400 text-cyan-950 text-[10px] sm:text-xs font-black uppercase tracking-widest px-3 py-2.5 rounded-lg md:rounded-xl hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:shadow-[0_0_25px_rgba(34,211,238,0.5)] cursor-pointer w-full flex items-center justify-center gap-1.5"
                      >
                        <span>{lang === "pt" ? "Continuar Jornada" : lang === "es" ? "Continuar Jornada" : "Continue Journey"}</span>
                      </button>

                      {(gameState.ph > 0 || gameState.score > 0) && (
                        <button
                          onClick={handleRestart}
                          onMouseEnter={playTick}
                          className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-1.5 rounded-lg transition-all cursor-pointer w-full flex items-center justify-center gap-1"
                        >
                          <span>{lang === "pt" ? "Reiniciar Formação (Zerar)" : lang === "es" ? "Reiniciar Formación (Zerar)" : "Restart Training (Reset)"}</span>
                        </button>
                      )}
                    </>
                  ) : Math.max(...activeModule.phases) < gameState.ph ? (
                    <div className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] md:text-xs font-bold uppercase tracking-wider p-2 md:p-2.5 rounded-lg md:rounded-xl flex items-center justify-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-400" strokeWidth={2.5} />
                      <span>{lang === "pt" ? "Módulo Concluído" : lang === "es" ? "Módulo Completado" : "Module Completed"}</span>
                    </div>
                  ) : (
                    <div className="bg-slate-800/50 text-slate-500 border border-slate-700/30 text-[10px] md:text-xs font-bold uppercase tracking-wider p-2 md:p-2.5 rounded-lg md:rounded-xl flex items-center justify-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-slate-500" />
                      <span>{lang === "pt" ? "Módulo Bloqueado" : lang === "es" ? "Módulo Bloqueado" : "Module Locked"}</span>
                    </div>
                  )}

                  {/* Carousel navigation indicators */}
                  <div className="flex justify-center items-center gap-1.5 mt-1">
                    {modules.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          playTick();
                          setActiveModuleIndex(idx);
                        }}
                        className={`w-1 h-1 rounded-full transition-all ${idx === activeModuleIndex ? 'bg-cyan-400 w-2.5' : 'bg-slate-700 hover:bg-slate-600'}`}
                        title={`Módulo ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>

          {/* Botões de Navegação Manual do Carrossel */}
          <button 
            onClick={() => {
              playTick();
              setActiveModuleIndex((prev) => (prev - 1 + modules.length) % modules.length);
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-6 h-6 md:w-8 md:h-8 rounded-full bg-slate-900/60 hover:bg-slate-900 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all cursor-pointer z-20 text-xs md:text-sm"
          >
            &larr;
          </button>
          <button 
            onClick={() => {
              playTick();
              setActiveModuleIndex((prev) => (prev + 1) % modules.length);
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 md:w-8 md:h-8 rounded-full bg-slate-900/60 hover:bg-slate-900 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all cursor-pointer z-20 text-xs md:text-sm"
          >
            &rarr;
          </button>
        </div>

        {/* 4. Action Widgets (Rodapé) */}
        <div className="flex flex-row gap-2 md:gap-4 shrink-0 mt-auto md:mt-0 pb-2 md:pb-0 w-full">
          
          {/* Widget 1 (Urgência Diária / Tarefa Atual) */}
          <div 
            onClick={() => onStart({ resume: true } as any)}
            className="w-full group relative bg-gradient-to-r from-red-950/40 via-red-950/20 to-[#0a0f16] border border-red-500/30 hover:border-red-500/60 rounded-xl p-2.5 md:p-4 flex flex-row items-center justify-between gap-3 cursor-pointer overflow-hidden transition-all duration-300 shadow-[0_0_15px_rgba(239,68,68,0.08)] hover:shadow-[0_0_25px_rgba(239,68,68,0.18)]"
            onMouseEnter={playTick}
          >
            {/* Animated background glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-red-500/10 rounded-full blur-[40px] -mr-12 -mt-12 group-hover:bg-red-500/20 transition-all duration-500 pointer-events-none" />
            <div className="absolute left-0 bottom-0 w-32 h-32 bg-red-600/5 rounded-full blur-[30px] -ml-8 -mb-8 pointer-events-none" />
            
            <div className="flex items-center gap-2.5 md:gap-4 min-w-0 z-10 flex-1">
              {/* Left alert icon with subtle glow */}
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(239,68,68,0.1)] group-hover:bg-red-500/20 transition-all">
                <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 text-red-500 animate-pulse" />
              </div>

              <div className="flex flex-col text-left min-w-0 flex-1">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-[8px] md:text-[10px] lg:text-xs text-red-500 font-black uppercase tracking-[0.05em] md:tracking-[0.2em] leading-none flex items-center gap-1">
                    {lang === "pt" ? "URGÊNCIA DIÁRIA" : lang === "es" ? "URGENCIA DIARIA" : "DAILY URGENCY"}
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping shrink-0" />
                </div>
                
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="flex items-center gap-1 bg-red-500/15 border border-red-500/20 px-1.5 py-0.5 rounded shadow-[inset_0_0_6px_rgba(239,68,68,0.15)] shrink-0">
                    <Clock className="w-3 h-3 text-red-400" />
                    <span className="text-[9px] md:text-xs font-black text-white tracking-wider whitespace-nowrap">
                      {getScenarios(lang)[gameState.ph]?.[gameState.sc]?.prazoHoras ? `${getScenarios(lang)[gameState.ph]?.[gameState.sc]?.prazoHoras}h` : "48h"}
                    </span>
                  </div>
                  <span className="text-[9px] md:text-xs lg:text-sm font-semibold text-slate-300 line-clamp-1 group-hover:text-white transition-colors" title={getScenarios(lang)[gameState.ph]?.[gameState.sc]?.title || ""}>
                    {getScenarios(lang)[gameState.ph]?.[gameState.sc]?.title || (lang === "pt" ? "Aguardando próxima fase..." : "Waiting for next phase...")}
                  </span>
                </div>
              </div>
            </div>
            
            <button 
              className="px-2.5 py-1.5 md:px-5 md:py-2.5 bg-red-500 hover:bg-red-600 text-white shadow-[0_0_12px_rgba(239,68,68,0.3)] group-hover:scale-[1.03] border border-red-400 text-[9px] md:text-xs font-black rounded-lg transition-all duration-300 cursor-pointer text-center whitespace-nowrap z-10 flex items-center justify-center gap-1 uppercase tracking-wide shrink-0"
            >
              <span>{lang === "pt" ? "RESOLVER" : lang === "es" ? "RESOLVER" : "RESOLVE"}</span>
              <span className="group-hover:translate-x-1 transition-transform duration-300 text-xs md:text-sm leading-none">&rarr;</span>
            </button>
          </div>

        </div>

      </main>
    </div>
  );
}
