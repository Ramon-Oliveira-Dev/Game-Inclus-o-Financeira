import React, { useEffect, useState } from "react";
import { ArrowLeft, Trophy, Layers, Filter, Info, X, CheckCircle2, Lock, PlayCircle, Sparkles } from "lucide-react";
import { GameState } from "../types";
import { supabase } from "../lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { useSound } from "../hooks/useSound";
import { useAuth } from "../contexts/AuthContext";
import { SchoolAvatar } from "./SchoolAvatar";
import { getPhases } from "../data";

interface RankingScreenProps {
  gameState: GameState;
  onBack: () => void;
}

interface DBProfile {
  id: string;
  nome: string;
  municipio: string;
  score_acumulado: number;
  avatar_url: string | null;
  modulo_atual?: number;
  game_data?: any;
}

export const MODULE_DEFINITIONS = [
  {
    id: 1,
    titlePt: "Módulo 1: Inclusão e Acessibilidade Inicial",
    titleEs: "Módulo 1: Inclusión y Accesibilidad Inicial",
    titleEn: "Module 1: Inclusion & Initial Accessibility",
    shortPt: "Módulo 1",
    shortEs: "Módulo 1",
    shortEn: "Module 1",
    phases: [0, 1, 2],
  },
  {
    id: 2,
    titlePt: "Módulo 2: Desafios Orçamentários e Legais",
    titleEs: "Módulo 2: Desafíos Presupuestarios y Legales",
    titleEn: "Module 2: Budget & Legal Challenges",
    shortPt: "Módulo 2",
    shortEs: "Módulo 2",
    shortEn: "Module 2",
    phases: [3, 4, 5],
  },
  {
    id: 3,
    titlePt: "Módulo 3: Tecnologia e Formação Continuada",
    titleEs: "Módulo 3: Tecnología y Formación Continuada",
    titleEn: "Module 3: Technology & Continuous Training",
    shortPt: "Módulo 3",
    shortEs: "Módulo 3",
    shortEn: "Module 3",
    phases: [6, 7, 8],
  },
  {
    id: 4,
    titlePt: "Módulo 4: Gestão Ampliada e Cooperação",
    titleEs: "Módulo 4: Gestión Ampliada y Cooperación",
    titleEn: "Module 4: Extended Management & Cooperation",
    shortPt: "Módulo 4",
    shortEs: "Módulo 4",
    shortEn: "Module 4",
    phases: [9],
  },
];

export function getScoreBreakdown(profile: DBProfile, currentGameState?: GameState) {
  const isMe = currentGameState && (profile.id === currentGameState.player || profile.nome === currentGameState.player);
  const currentPh = profile.modulo_atual ?? (isMe ? currentGameState.ph : 0);
  const totalScore = profile.score_acumulado ?? 0;

  const phaseScores: { [phaseIndex: number]: { score: number; status: "completed" | "current" | "locked" } } = {};
  
  const completedPhasesCount = Math.max(0, currentPh);
  
  let remainingScore = totalScore;

  for (let i = 0; i <= 9; i++) {
    if (i < currentPh) {
      const pScore = Math.min(remainingScore, Math.max(10, Math.round(totalScore / (currentPh + 1))));
      remainingScore -= pScore;
      phaseScores[i] = { score: pScore, status: "completed" };
    } else if (i === currentPh) {
      phaseScores[i] = { score: Math.max(0, remainingScore), status: "current" };
      remainingScore = 0;
    } else {
      phaseScores[i] = { score: 0, status: "locked" };
    }
  }

  const moduleScores: { [modId: number]: { score: number; completedCount: number; totalPhases: number } } = {
    1: {
      score: (phaseScores[0]?.score || 0) + (phaseScores[1]?.score || 0) + (phaseScores[2]?.score || 0),
      completedCount: [0, 1, 2].filter((p) => p < currentPh).length,
      totalPhases: 3,
    },
    2: {
      score: (phaseScores[3]?.score || 0) + (phaseScores[4]?.score || 0) + (phaseScores[5]?.score || 0),
      completedCount: [3, 4, 5].filter((p) => p < currentPh).length,
      totalPhases: 3,
    },
    3: {
      score: (phaseScores[6]?.score || 0) + (phaseScores[7]?.score || 0) + (phaseScores[8]?.score || 0),
      completedCount: [6, 7, 8].filter((p) => p < currentPh).length,
      totalPhases: 3,
    },
    4: {
      score: phaseScores[9]?.score || 0,
      completedCount: [9].filter((p) => p < currentPh).length,
      totalPhases: 1,
    },
  };

  let moduleNumber = 1;
  if (currentPh >= 3 && currentPh <= 5) moduleNumber = 2;
  else if (currentPh >= 6 && currentPh <= 8) moduleNumber = 3;
  else if (currentPh >= 9) moduleNumber = 4;

  return {
    currentPh,
    moduleNumber,
    faseNumber: currentPh + 1,
    totalScore,
    phaseScores,
    moduleScores,
  };
}

export function RankingScreen({ gameState, onBack }: RankingScreenProps) {
  const { lang } = gameState;
  const { playClick, playTick } = useSound();
  const { user } = useAuth();
  const [dbRank, setDbRank] = useState<DBProfile[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters state
  const [filterMode, setFilterMode] = useState<"geral" | "modulo" | "fase">("geral");
  const [selectedModule, setSelectedModule] = useState<number>(1);
  const [selectedPhase, setSelectedPhase] = useState<number>(0);

  // Selected player detail modal
  const [selectedPlayerDetail, setSelectedPlayerDetail] = useState<DBProfile | null>(null);

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        let fetchedData: DBProfile[] = [];
        if (supabase) {
          const { data, error } = await supabase
            .from("profiles")
            .select("id, nome, municipio, score_acumulado, avatar_url, modulo_atual, game_data")
            .order("score_acumulado", { ascending: false })
            .limit(20);

          if (!error && data) {
            fetchedData = data;
          }
        }

        // Merge local active user if not in database
        if (user || gameState.player) {
          const myId = user?.id || "local_player";
          const exists = fetchedData.some((p) => p.id === myId || p.nome === gameState.player);
          if (!exists && gameState.player) {
            fetchedData.push({
              id: myId,
              nome: gameState.player,
              municipio: "Escola Ativa",
              score_acumulado: gameState.score,
              avatar_url: null,
              modulo_atual: gameState.ph,
            });
          } else {
            // Update local user score in list
            fetchedData = fetchedData.map((p) => {
              if (p.id === myId || p.nome === gameState.player) {
                return {
                  ...p,
                  score_acumulado: Math.max(p.score_acumulado || 0, gameState.score),
                  modulo_atual: gameState.ph,
                };
              }
              return p;
            });
          }
        }

        setDbRank(fetchedData);
      } catch (e) {
        console.warn("Ranking fetch notice:", e);
        setDbRank([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRankings();
  }, [user, gameState]);

  // Sort rank based on active filter
  const getSortedRank = () => {
    const list = [...dbRank];
    if (filterMode === "geral") {
      return list.sort((a, b) => (b.score_acumulado || 0) - (a.score_acumulado || 0));
    } else if (filterMode === "modulo") {
      return list.sort((a, b) => {
        const bMod = getScoreBreakdown(b, gameState).moduleScores[selectedModule]?.score || 0;
        const aMod = getScoreBreakdown(a, gameState).moduleScores[selectedModule]?.score || 0;
        if (bMod !== aMod) return bMod - aMod;
        return (b.score_acumulado || 0) - (a.score_acumulado || 0);
      });
    } else if (filterMode === "fase") {
      return list.sort((a, b) => {
        const bPhase = getScoreBreakdown(b, gameState).phaseScores[selectedPhase]?.score || 0;
        const aPhase = getScoreBreakdown(a, gameState).phaseScores[selectedPhase]?.score || 0;
        if (bPhase !== aPhase) return bPhase - aPhase;
        return (b.score_acumulado || 0) - (a.score_acumulado || 0);
      });
    }
    return list;
  };

  const sortedRank = getSortedRank();

  const myRankIndex = sortedRank.findIndex((p) => p.id === user?.id || p.nome === gameState.player);
  const myRankPos = myRankIndex >= 0 ? myRankIndex + 1 : null;
  const myData = myRankIndex >= 0 ? sortedRank[myRankIndex] : null;

  const getPodium = () => {
    const p1 = sortedRank[0];
    const p2 = sortedRank[1];
    const p3 = sortedRank[2];
    return [p2, p1, p3]; // 2nd, 1st, 3rd
  };

  const podium = getPodium();
  const listPlayers = sortedRank.slice(3);

  const phaseList = getPhases(lang as any);

  return (
    <div className="w-full min-h-full bg-transparent font-sans text-white relative pb-32">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-blue-900/20 to-transparent pointer-events-none" />
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

      <div className="max-w-4xl mx-auto relative z-10 p-4 sm:p-6 lg:p-10 mt-10 md:mt-2">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-1 flex items-center gap-3">
              <Trophy className="w-7 h-7 sm:w-8 sm:h-8 text-yellow-500 shrink-0" />
              <span>{lang === "pt" ? "Ranking do Curso" : lang === "es" ? "Clasificación" : "Course Ranking"}</span>
            </h1>
            <p className="text-white/50 text-xs sm:text-sm md:text-base">
              {lang === "pt" ? "Pontuação detalhada por Módulos e Fases" : lang === "es" ? "Puntuación detallada por Módulos y Fases" : "Detailed score breakdown by Modules & Phases"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all font-bold text-xs sm:text-sm cursor-pointer"
              onClick={() => {
                playClick();
                onBack();
              }}
              onMouseEnter={playTick}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">{lang === "pt" ? "Voltar" : lang === "es" ? "Volver" : "Back"}</span>
            </button>
          </div>
        </header>

        {/* Filter Navigation Bar: Geral / Por Módulo / Por Fase */}
        <div className="bg-[#0b1324]/80 backdrop-blur-md border border-white/10 rounded-2xl p-3 mb-8 shadow-lg">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 p-1 bg-white/5 rounded-xl border border-white/5">
              <button
                onClick={() => {
                  playClick();
                  setFilterMode("geral");
                }}
                className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  filterMode === "geral"
                    ? "bg-cyan-500 text-cyan-950 shadow-[0_0_12px_rgba(34,211,238,0.4)]"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <Trophy className="w-3.5 h-3.5" />
                <span>{lang === "pt" ? "Geral" : lang === "es" ? "General" : "Overall"}</span>
              </button>

              <button
                onClick={() => {
                  playClick();
                  setFilterMode("modulo");
                }}
                className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  filterMode === "modulo"
                    ? "bg-cyan-500 text-cyan-950 shadow-[0_0_12px_rgba(34,211,238,0.4)]"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{lang === "pt" ? "Por Módulo" : lang === "es" ? "Por Módulo" : "By Module"}</span>
              </button>

              <button
                onClick={() => {
                  playClick();
                  setFilterMode("fase");
                }}
                className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  filterMode === "fase"
                    ? "bg-cyan-500 text-cyan-950 shadow-[0_0_12px_rgba(34,211,238,0.4)]"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <Filter className="w-3.5 h-3.5" />
                <span>{lang === "pt" ? "Por Fase" : lang === "es" ? "Por Fase" : "By Phase"}</span>
              </button>
            </div>

            {/* Sub-selector when Módulo or Fase filter is active */}
            {filterMode === "modulo" && (
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                {MODULE_DEFINITIONS.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => {
                      playClick();
                      setSelectedModule(m.id);
                    }}
                    className={`px-3 py-1 rounded-lg text-[11px] font-extrabold uppercase transition-all whitespace-nowrap cursor-pointer border ${
                      selectedModule === m.id
                        ? "bg-blue-600 text-white border-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                        : "bg-white/5 text-white/60 border-white/5 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {lang === "pt" ? m.shortPt : lang === "es" ? m.shortEs : m.shortEn}
                  </button>
                ))}
              </div>
            )}

            {filterMode === "fase" && (
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                {phaseList.slice(0, 10).map((p, idx) => (
                  <button
                    key={`phase-filter-${idx}`}
                    onClick={() => {
                      playClick();
                      setSelectedPhase(idx);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold transition-all whitespace-nowrap cursor-pointer border ${
                      selectedPhase === idx
                        ? "bg-emerald-500 text-emerald-950 border-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                        : "bg-white/5 text-white/60 border-white/5 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    Fase {idx + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {loading ? (
          <div className="space-y-6">
            <div className="h-64 w-full bg-white/5 border border-white/10 rounded-3xl animate-pulse backdrop-blur-md relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
            </div>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-20 w-full bg-white/5 border border-white/10 rounded-2xl animate-pulse backdrop-blur-md relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Podium */}
            <div className="flex items-end justify-center gap-2 md:gap-6 mb-12 h-64 mt-16">
              {podium.map((pl, i) => {
                if (!pl) return <div key={i} className="w-[30%] max-w-[140px]" />;
                const isFirst = i === 1;
                const rankPos = isFirst ? 1 : i === 0 ? 2 : 3;

                const heights = {
                  1: "h-48 md:h-56",
                  2: "h-40 md:h-48",
                  3: "h-32 md:h-40",
                };
                const colors = {
                  1: "from-yellow-500/20 to-yellow-600/5 border-yellow-400/50 shadow-[0_0_30px_rgba(250,204,21,0.3)]",
                  2: "from-slate-300/20 to-slate-400/5 border-slate-300/40 shadow-[0_0_20px_rgba(203,213,225,0.15)]",
                  3: "from-amber-600/20 to-amber-700/5 border-amber-600/40 shadow-[0_0_20px_rgba(217,119,6,0.15)]",
                };
                const medals = { 1: "🥇", 2: "🥈", 3: "🥉" };

                const breakdown = getScoreBreakdown(pl, gameState);
                const activeScoreDisplay =
                  filterMode === "geral"
                    ? breakdown.totalScore
                    : filterMode === "modulo"
                    ? breakdown.moduleScores[selectedModule]?.score || 0
                    : breakdown.phaseScores[selectedPhase]?.score || 0;

                return (
                  <motion.div
                    key={`podium-${pl.id || ""}-${pl.nome || ""}-${i}`}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.2 + rankPos * 0.1,
                      type: "spring",
                      bounce: 0.4,
                    }}
                    onClick={() => {
                      playClick();
                      setSelectedPlayerDetail(pl);
                    }}
                    className={`w-[30%] max-w-[160px] ${
                      heights[rankPos as keyof typeof heights]
                    } bg-gradient-to-t ${
                      colors[rankPos as keyof typeof colors]
                    } rounded-t-2xl border-t border-x flex flex-col items-center p-2.5 relative backdrop-blur-sm cursor-pointer hover:scale-[1.03] transition-all group`}
                  >
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex flex-col items-center">
                      <div
                        className={`w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#050b14] border-2 shadow-xl flex items-center justify-center overflow-hidden z-10 ${
                          rankPos === 1
                            ? "border-yellow-400 w-14 h-14 md:w-18 md:h-18"
                            : rankPos === 2
                            ? "border-slate-300"
                            : "border-amber-600"
                        }`}
                      >
                        <SchoolAvatar
                          avatarUrl={pl.avatar_url}
                          schoolName={pl.municipio}
                          className="w-full h-full"
                          iconClassName="w-6 h-6"
                        />
                      </div>
                      <div className="text-xl md:text-2xl mt-[-10px] z-20 drop-shadow-md">
                        {medals[rankPos as keyof typeof medals]}
                      </div>
                    </div>

                    <div className="mt-8 md:mt-10 flex flex-col items-center text-center w-full">
                      <h3
                        className={`font-bold truncate w-full ${
                          isFirst ? "text-xs md:text-base text-yellow-100" : "text-[11px] md:text-sm text-white/90"
                        }`}
                      >
                        {pl.nome}
                      </h3>

                      {/* Module / Phase Badge */}
                      <div className="my-1 px-1.5 py-0.5 rounded-full bg-black/40 border border-white/10 text-[9px] md:text-[10px] text-cyan-300 font-bold uppercase tracking-wider flex items-center gap-1">
                        <span>
                          M{breakdown.moduleNumber} • F{breakdown.faseNumber}
                        </span>
                      </div>

                      <div
                        className={`font-black ${
                          isFirst ? "text-lg md:text-2xl text-yellow-400" : "text-base md:text-xl text-white"
                        }`}
                      >
                        {activeScoreDisplay}
                      </div>
                      <div className="text-[8px] md:text-[9px] uppercase tracking-widest text-white/40">
                        {filterMode === "geral" ? "PTS TOTAL" : filterMode === "modulo" ? `PTS MÓD ${selectedModule}` : `PTS FASE ${selectedPhase + 1}`}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* List 4 to N */}
            <div className="flex flex-col gap-3">
              {listPlayers.map((pl, idx) => {
                const isMe = pl.id === user?.id || pl.nome === gameState.player;
                const rankNum = idx + 4;
                const breakdown = getScoreBreakdown(pl, gameState);

                const activeScoreDisplay =
                  filterMode === "geral"
                    ? breakdown.totalScore
                    : filterMode === "modulo"
                    ? breakdown.moduleScores[selectedModule]?.score || 0
                    : breakdown.phaseScores[selectedPhase]?.score || 0;

                return (
                  <motion.div
                    key={`list-${pl.id || ""}-${pl.nome || ""}-${idx}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + idx * 0.05 }}
                    onClick={() => {
                      playClick();
                      setSelectedPlayerDetail(pl);
                    }}
                    className={`flex items-center gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-2xl border backdrop-blur-md transition-all cursor-pointer hover:border-cyan-500/40 ${
                      isMe
                        ? "bg-blue-500/10 border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.15)]"
                        : "bg-white/5 border-white/5 hover:bg-white/10"
                    }`}
                  >
                    <div className="w-6 sm:w-8 text-center font-bold text-white/40 font-mono text-xs sm:text-base">
                      {rankNum}
                    </div>
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#050b14] border border-white/10 shadow-inner flex items-center justify-center overflow-hidden shrink-0">
                      <SchoolAvatar
                        avatarUrl={pl.avatar_url}
                        schoolName={pl.municipio}
                        className="w-full h-full"
                        iconClassName="w-5 h-5 cursor-default"
                      />
                    </div>
                    <div className="flex flex-col min-w-0 pr-2">
                      <h4 className="font-bold text-white text-xs sm:text-base truncate flex items-center gap-1.5">
                        <span className="truncate">{pl.nome}</span>
                        {isMe && (
                          <span className="px-1.5 py-0.5 text-[8px] sm:text-[9px] font-black uppercase tracking-wider bg-blue-500 text-white rounded-md shrink-0">
                            {lang === "pt" ? "Você" : lang === "es" ? "Tú" : "You"}
                          </span>
                        )}
                      </h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[11px] text-white/50 truncate max-w-[140px] sm:max-w-none">
                          {pl.municipio}
                        </span>
                        <span className="px-1.5 py-0.2 bg-white/5 border border-white/10 text-cyan-400 rounded text-[9px] font-extrabold uppercase">
                          Mód {breakdown.moduleNumber} • Fase {breakdown.faseNumber}
                        </span>
                      </div>
                    </div>

                    <div className="ml-auto text-right shrink-0 flex items-center gap-3">
                      <div>
                        <div className="font-black text-white text-base sm:text-lg">
                          {activeScoreDisplay}
                        </div>
                        <div className="text-[9px] sm:text-[10px] text-white/40 uppercase tracking-widest">
                          {filterMode === "geral" ? "PTS TOTAL" : filterMode === "modulo" ? `PTS MÓD ${selectedModule}` : `PTS FASE ${selectedPhase + 1}`}
                        </div>
                      </div>
                      <Info className="w-4 h-4 text-white/30 hover:text-cyan-400 transition-colors hidden sm:block" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Sticky Footer: My Position */}
      {!loading && myData && (
        <div className="fixed bottom-20 md:bottom-0 left-0 right-0 z-50 bg-[#050b14]/90 backdrop-blur-xl border-t border-white/10 p-3 md:p-5 shadow-[0_-10px_30px_rgba(0,0,0,0.6)]">
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shrink-0 border border-blue-400/30">
                <span className="font-black text-base sm:text-xl text-white">
                  #{myRankPos}
                </span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] text-white/50 font-bold tracking-widest uppercase mb-0.5">
                  {lang === "pt" ? "Sua Posição" : lang === "es" ? "Tu Posición" : "Your Position"}
                </span>
                <span className="font-bold text-white text-xs sm:text-base truncate">
                  {myData.nome}
                </span>
              </div>
            </div>
            <div className="text-right shrink-0 flex items-center gap-3">
              <div>
                <div className="font-black text-lg md:text-2xl text-cyan-400">
                  {filterMode === "geral"
                    ? getScoreBreakdown(myData, gameState).totalScore
                    : filterMode === "modulo"
                    ? getScoreBreakdown(myData, gameState).moduleScores[selectedModule]?.score || 0
                    : getScoreBreakdown(myData, gameState).phaseScores[selectedPhase]?.score || 0}{" "}
                  <span className="text-xs md:text-sm text-white/40 font-bold">PTS</span>
                </div>
                <div className="text-[9px] text-white/50">
                  Módulo {getScoreBreakdown(myData, gameState).moduleNumber} • Fase {getScoreBreakdown(myData, gameState).faseNumber}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Modal: Detailed Performance Breakdown for Selected Player */}
      <AnimatePresence>
        {selectedPlayerDetail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0b1324] border border-cyan-500/30 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-[0_0_50px_rgba(0,240,255,0.2)] p-5 sm:p-7 relative text-white"
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  playClick();
                  setSelectedPlayerDetail(null);
                }}
                className="absolute top-4 right-4 p-2 text-white/50 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              {(() => {
                const breakdown = getScoreBreakdown(selectedPlayerDetail, gameState);
                return (
                  <div>
                    <div className="flex items-center gap-4 mb-6 pb-5 border-b border-white/10">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#050b14] border-2 border-cyan-400 shadow-xl flex items-center justify-center overflow-hidden shrink-0">
                        <SchoolAvatar
                          avatarUrl={selectedPlayerDetail.avatar_url}
                          schoolName={selectedPlayerDetail.municipio}
                          className="w-full h-full"
                          iconClassName="w-8 h-8"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          {lang === "pt" ? "Detalhamento do Desempenho" : "Performance Breakdown"}
                        </span>
                        <h2 className="text-xl sm:text-2xl font-black text-white truncate">
                          {selectedPlayerDetail.nome}
                        </h2>
                        <p className="text-xs text-white/50 truncate">
                          {selectedPlayerDetail.municipio}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-xl sm:text-2xl font-black text-yellow-400">
                          {breakdown.totalScore} <span className="text-xs text-white/40">PTS</span>
                        </div>
                        <div className="text-[10px] text-white/40 uppercase tracking-wider">
                          Pontuação Total
                        </div>
                      </div>
                    </div>

                    {/* Modules Grid Breakdown */}
                    <div className="mb-6">
                      <h3 className="text-sm font-extrabold uppercase tracking-wider text-white/80 mb-3 flex items-center gap-2">
                        <Layers className="w-4 h-4 text-cyan-400" />
                        <span>{lang === "pt" ? "Pontuação por Módulo" : "Score by Module"}</span>
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {MODULE_DEFINITIONS.map((m) => {
                          const modInfo = breakdown.moduleScores[m.id];
                          const isCurrent = breakdown.moduleNumber === m.id;
                          const isCompleted = breakdown.moduleNumber > m.id;

                          return (
                            <div
                              key={`mod-detail-${m.id}`}
                              className={`p-3.5 rounded-2xl border transition-all ${
                                isCurrent
                                  ? "bg-cyan-950/30 border-cyan-500/50 shadow-[0_0_15px_rgba(34,211,238,0.15)]"
                                  : isCompleted
                                  ? "bg-emerald-950/20 border-emerald-500/30"
                                  : "bg-white/5 border-white/5 opacity-60"
                              }`}
                            >
                              <div className="flex items-center justify-between mb-1.5">
                                <span className="text-xs font-black uppercase text-cyan-300">
                                  {lang === "pt" ? m.shortPt : m.shortEn}
                                </span>
                                <span className="text-xs font-black text-white">
                                  {modInfo.score} PTS
                                </span>
                              </div>
                              <p className="text-[11px] text-white/70 line-clamp-1 mb-2">
                                {m.titlePt}
                              </p>
                              <div className="flex items-center justify-between text-[10px]">
                                <span className="text-white/40">
                                  {modInfo.completedCount} / {modInfo.totalPhases} {lang === "pt" ? "Fases" : "Phases"}
                                </span>
                                {isCompleted ? (
                                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                                    <CheckCircle2 className="w-3 h-3" />
                                    {lang === "pt" ? "Concluído" : "Completed"}
                                  </span>
                                ) : isCurrent ? (
                                  <span className="text-cyan-400 font-bold flex items-center gap-1">
                                    <PlayCircle className="w-3 h-3" />
                                    {lang === "pt" ? "Em Andamento" : "In Progress"}
                                  </span>
                                ) : (
                                  <span className="text-white/30 font-bold flex items-center gap-1">
                                    <Lock className="w-3 h-3" />
                                    {lang === "pt" ? "A Iniciar" : "Not Started"}
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Phases List Breakdown */}
                    <div>
                      <h3 className="text-sm font-extrabold uppercase tracking-wider text-white/80 mb-3 flex items-center gap-2">
                        <Filter className="w-4 h-4 text-emerald-400" />
                        <span>{lang === "pt" ? "Detalhamento por Fase" : "Phase Details"}</span>
                      </h3>
                      <div className="space-y-2 max-h-60 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/10">
                        {phaseList.slice(0, 10).map((p, idx) => {
                          const pInfo = breakdown.phaseScores[idx];
                          const isPhaseCompleted = pInfo.status === "completed";
                          const isPhaseCurrent = pInfo.status === "current";

                          return (
                            <div
                              key={`phase-row-${idx}`}
                              className={`flex items-center justify-between p-3 rounded-xl border text-xs ${
                                isPhaseCurrent
                                  ? "bg-cyan-500/10 border-cyan-500/30 text-white"
                                  : isPhaseCompleted
                                  ? "bg-emerald-500/10 border-emerald-500/20 text-white/90"
                                  : "bg-white/5 border-white/5 text-white/40"
                              }`}
                            >
                              <div className="flex items-center gap-2.5 min-w-0 pr-2">
                                <span className="w-6 h-6 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center font-black text-[11px] shrink-0">
                                  {idx + 1}
                                </span>
                                <div className="min-w-0">
                                  <div className="font-bold truncate">{p.name}</div>
                                  <div className="text-[10px] text-white/50 truncate">{p.desc}</div>
                                </div>
                              </div>
                              <div className="text-right shrink-0 flex items-center gap-3">
                                <div className="font-black text-sm">
                                  {pInfo.score} <span className="text-[9px] text-white/40">PTS</span>
                                </div>
                                {isPhaseCompleted ? (
                                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[9px] uppercase">
                                    Concluída
                                  </span>
                                ) : isPhaseCurrent ? (
                                  <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 font-bold text-[9px] uppercase">
                                    Atual
                                  </span>
                                ) : (
                                  <span className="px-2 py-0.5 rounded bg-white/5 text-white/30 font-bold text-[9px] uppercase">
                                    Bloqueada
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

