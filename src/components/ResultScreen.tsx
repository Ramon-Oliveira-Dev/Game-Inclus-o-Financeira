import React, { useEffect, useRef } from "react";
import { Trophy, RefreshCw } from "lucide-react";
import { GameState } from "../types";
import { getAllAch, getScenarios } from "../data";
import { useSound } from "../hooks/useSound";
import { t } from "../locales";
import { supabase } from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";

interface ResultScreenProps {
  gameState: GameState;
  onViewRanking: () => void;
  onRestart: () => void;
  onAdvance: () => void;
  onRetry: () => void;
}

export function ResultScreen({
  gameState,
  onViewRanking,
  onRestart,
  onAdvance,
  onRetry,
}: ResultScreenProps) {
  const savedRef = useRef(false);

  const { lang } = gameState;
  const { playFinish, playClick, playTick } = useSound();
  const allAch = getAllAch(lang);
  const earned = allAch.filter((a) => a.cond(gameState));

  const titleIndex =
    gameState.score >= 1400
      ? 0
      : gameState.score >= 1000
        ? 1
        : gameState.score >= 600
          ? 2
          : 3;

  const titles = [
    t(lang, "res_t1"),
    t(lang, "res_t2"),
    t(lang, "res_t3"),
    t(lang, "res_t4"),
  ];

  const title = titles[titleIndex];
  const trophy =
    gameState.score >= 1400
      ? "🥇"
      : gameState.score >= 1000
        ? "🏆"
        : gameState.score >= 600
          ? "🎖️"
          : "📋";

  const { user, profile, isGuest, updateProfile, refreshProfile } = useAuth();

  useEffect(() => {
    playFinish();

    if (!savedRef.current) {
      savedRef.current = true;
      const saveScore = async () => {
        // Regra: Convidado NUNCA salva no banco e NUNCA pontua no ranking
        if (isGuest || !user || user.id.startsWith("guest_")) {
          console.log("Acesso como Convidado: Nenhuma informação foi enviada ao ranking ou banco de dados.");
          return;
        }

        if (supabase) {
          try {
            // Busca o maior score anterior ou o score acumulado
            const { data: existingProfile } = await supabase
              .from("profiles")
              .select("score_acumulado")
              .eq("id", user.id)
              .maybeSingle();

            const currentScore = existingProfile?.score_acumulado || profile?.score_acumulado || 0;
            const newTotalScore = Math.max(currentScore, gameState.score);

            // 1. Atualiza na tabela 'profiles' para o Ranking oficial
            const { error: profileErr } = await supabase
              .from("profiles")
              .upsert({
                id: user.id,
                nome: gameState.player || profile?.nome || user.user_metadata?.nome || "Gestor(a)",
                municipio: profile?.municipio || user.user_metadata?.municipio || "Escola Municipal",
                score_acumulado: newTotalScore,
                avatar_url: profile?.avatar_url || null,
                updated_at: new Date().toISOString(),
              });

            if (profileErr) {
              console.warn("Aviso ao salvar pontuação em profiles (modo local ativo):", profileErr.message || profileErr);
            }

            // 2. Atualiza na tabela 'rankings' (como log/backup)
            try {
              await supabase.from("rankings").upsert({
                user_id: user.id,
                player_name: gameState.player || profile?.nome || "Gestor(a)",
                score: gameState.score,
                tags: title,
                updated_at: new Date().toISOString(),
              }, { onConflict: 'user_id' });
            } catch (rErr) {
              console.warn("Aviso na tabela de rankings secundária:", rErr);
            }

            // 3. Sincroniza o contexto de autenticação do app
            await updateProfile({ score_acumulado: newTotalScore });
            await refreshProfile();
          } catch (e: any) {
            console.warn("Aviso ao salvar pontuação (modo local ativo):", e?.message || e);
          }
        }
      };
      saveScore();
    }
  }, [gameState.player, gameState.score, title, isGuest, user]);

  const zeroQuality = gameState.qual <= 0;
  const zeroFiscal = gameState.sust <= 0;
  const zeroBudget = gameState.budget <= 0;

  const isApproved = gameState.qual >= 60 && gameState.sust >= 40 && gameState.budget > 0;
  const failedQuality = gameState.qual < 60;
  const failedFiscal = gameState.sust < 40;

  return (
    <div className="w-full p-0 flex flex-col min-h-full">
      <div className="w-full flex-1 flex flex-col py-3 md:py-6 px-3 md:px-4">
        <div className="w-full max-w-3xl mx-auto flex flex-col items-center flex-1">
          
          {/* Header Score Info */}
          <motion.div
            className="w-full max-w-2xl text-center shrink-0 mb-1 md:mb-3"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.4, duration: 0.6 }}
          >
            <motion.div
              className="inline-block"
              style={{ fontSize: "clamp(2rem, 5vh, 2.75rem)", filter: "drop-shadow(0 0 15px rgba(245, 200, 66, 0.25))" }}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", bounce: 0.6, delay: 0.2 }}
            >
              {trophy}
            </motion.div>
            
            <motion.div
              className="font-mono font-black text-center select-none leading-none tracking-tight mb-0.5"
              style={{ 
                fontSize: "clamp(2.25rem, 6vh, 3.25rem)",
                background: "linear-gradient(135deg, #fccd33, #ff7e5f)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", bounce: 0.4, delay: 0.4 }}
            >
              {gameState.score}
            </motion.div>
            
            <div className="text-[10px] md:text-xs text-slate-400 font-bold uppercase tracking-wider mb-0.5">
              {gameState.player}
            </div>
            
            <motion.div
              className="text-yellow-500 font-extrabold uppercase tracking-wide leading-tight"
              style={{ fontSize: "clamp(0.9rem, 2.5vh, 1.25rem)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {title}
            </motion.div>
          </motion.div>

          {/* Stats Cards Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 w-full max-w-[720px] shrink-0 mb-3 md:mb-4">
            <motion.div
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-[#0a0f1e]/50 backdrop-blur-md border border-white/5 rounded-xl p-2 md:p-3 text-center flex flex-col justify-center items-center shadow-lg transition-transform hover:scale-[1.02]"
            >
              <div className="text-base md:text-xl mb-0.5">♿</div>
              <div className="text-sm md:text-base lg:text-lg font-mono font-black text-emerald-400">
                {Math.round(gameState.qual)}%
              </div>
              <div className="text-[9px] md:text-xs text-slate-400 font-bold tracking-wider uppercase">
                {t(lang, "res_qual").split(" ")[0]}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-[#0a0f1e]/50 backdrop-blur-md border border-white/5 rounded-xl p-2 md:p-3 text-center flex flex-col justify-center items-center shadow-lg transition-transform hover:scale-[1.02]"
            >
              <div className="text-base md:text-xl mb-0.5">⚖️</div>
              <div className="text-sm md:text-base lg:text-lg font-mono font-black text-blue-400">
                {Math.round(gameState.sust)}%
              </div>
              <div className="text-[9px] md:text-xs text-slate-400 font-bold tracking-wider uppercase">
                {t(lang, "res_sust").split(" ")[0]}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="bg-[#0a0f1e]/50 backdrop-blur-md border border-white/5 rounded-xl p-2 md:p-3 text-center flex flex-col justify-center items-center shadow-lg transition-transform hover:scale-[1.02]"
            >
              <div className="text-base md:text-xl mb-0.5">✅</div>
              <div className="text-sm md:text-base lg:text-lg font-mono font-black text-yellow-400">
                {gameState.rights}
              </div>
              <div className="text-[9px] md:text-xs text-slate-400 font-bold tracking-wider uppercase">
                {t(lang, "res_acert")}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="bg-[#0a0f1e]/50 backdrop-blur-md border border-purple-500/20 rounded-xl p-2 md:p-3 text-center flex flex-col justify-center items-center shadow-lg transition-transform hover:scale-[1.02]"
            >
              <div className="text-base md:text-xl mb-0.5">🔥</div>
              <div className="text-sm md:text-base lg:text-lg font-mono font-black text-purple-400">
                x{gameState.maxCombo}
              </div>
              <div className="text-[9px] md:text-xs text-slate-400 font-bold tracking-wider uppercase">
                {t(lang, "res_combo")}
              </div>
            </motion.div>
          </div>

          {/* Achievements Header */}
          <div className="w-full max-w-[720px] text-[10px] md:text-xs font-bold text-slate-400 mb-1 md:mb-1.5 tracking-wider uppercase text-left px-1">
            {t(lang, "res_achiev")}
          </div>

          {/* Achievements Slider */}
          <div className="w-full max-w-[720px] gap-2 mb-3 shrink min-h-0 relative hide-scrollbar overflow-x-auto overflow-y-hidden flex flex-row snap-x snap-mandatory pb-1">
            {allAch.map((a, i) => {
              const ok = earned.includes(a);
              return (
                <motion.div
                  key={i}
                  className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-left shrink-0 w-[200px] md:w-[240px] snap-center transition-all ${
                    ok 
                      ? "bg-gradient-to-r from-yellow-500/10 to-[#0a0f1e]/60 border-yellow-500/20" 
                      : "bg-[#0a0f1e]/40 border-white/5 opacity-40"
                  }`}
                  initial={{ x: -15, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.8 + i * 0.08 }}
                >
                  <div className="text-lg md:text-xl shrink-0">{ok ? a.icon : "🔒"}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] md:text-xs font-bold text-yellow-500 truncate">{ok ? a.name : "???"}</div>
                    <div className={`text-[9px] md:text-[10px] truncate ${ok ? "text-slate-400" : "text-slate-600"}`}>
                      {ok ? a.desc : t(lang, "ach_lock")}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Approval Notification Panel */}
          <motion.div
            className="w-full max-w-[720px] text-center mb-3 md:mb-4 shrink-0"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.0 }}
          >
            {isApproved ? (
              <div className="p-2.5 md:p-3.5 bg-emerald-950/20 border border-emerald-500/40 rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                <h3 className="text-emerald-400 font-extrabold uppercase tracking-wide text-[10px] md:text-xs lg:text-sm">
                  {lang === "pt"
                    ? "Contas Aprovadas! Sua gestão equilibrou inclusão e responsabilidade fiscal."
                    : lang === "es"
                    ? "¡Cuentas Aprobadas! Su gestión equilibró inclusión y responsabilidad fiscal."
                    : "Accounts Approved! Your management balanced inclusion and fiscal responsibility."}
                </h3>
              </div>
            ) : (
              <div className="p-2.5 md:p-3.5 bg-red-950/30 border-2 border-red-500/60 rounded-xl shadow-[0_0_20px_rgba(239,68,68,0.25)] text-left">
                <h3 className="text-red-400 font-black uppercase tracking-wide text-xs md:text-sm mb-1 text-center">
                  ⚠️ {zeroQuality || zeroFiscal || zeroBudget ? (
                    lang === "pt" ? "GESTÃO INVIÁVEL (GAME OVER)" : lang === "es" ? "GESTIÓN INVIABLE (GAME OVER)" : "UNVIABLE MANAGEMENT (GAME OVER)"
                  ) : (
                    lang === "pt" ? "GESTÃO REPROVADA" : lang === "es" ? "GESTIÓN RECHAZADA" : "MANAGEMENT REJECTED"
                  )}
                </h3>
                <p className="text-red-200 text-[11px] md:text-xs leading-relaxed text-center font-medium">
                  {zeroQuality
                    ? (lang === "pt"
                        ? "A Qualidade da Inclusão chegou a 0% por negligência pedagógica e violação dos direitos humanos dos alunos."
                        : lang === "es"
                        ? "La Calidad de la Inclusión llegó al 0% por negligencia pedagógica y violación de derechos humanos."
                        : "Inclusion Quality reached 0% due to pedagogical neglect and human rights violations.")
                    : zeroFiscal
                    ? (lang === "pt"
                        ? "A Sustentabilidade Fiscal caiu para 0% por colapso financeiro e irregularidades no uso do FUNDEB."
                        : lang === "es"
                        ? "La Sostenibilidad Fiscal cayó al 0% por colapso financiero e uso indebido del FUNDEB."
                        : "Fiscal Sustainability dropped to 0% due to financial collapse and FUNDEB misuse.")
                    : zeroBudget
                    ? (lang === "pt"
                        ? "O Orçamento foi totalmente zerado (0 QSD). A gestão não possui recursos para cumprir as obrigações legais mínimas da lei."
                        : lang === "es"
                        ? "El Presupuesto se agotó totalmente (0 QSD). La gestión no posee recursos para cumplir con las exigencias legales."
                        : "Budget fully depleted (0 QSD). Management cannot meet basic legal requirements for inclusive education.")
                    : failedQuality && failedFiscal
                    ? (lang === "pt"
                        ? "Gestão Reprovada: Intervenção do MP e Contas Rejeitadas pelo Tribunal de Contas."
                        : lang === "es"
                        ? "Gestión Rechazada: Intervención del MP y Cuentas Rechazadas por el Tribunal de Cuentas."
                        : "Management Rejected: Prosecutor Intervention and Accounts Rejected by Court of Accounts.")
                    : failedQuality
                    ? (lang === "pt"
                        ? "Intervenção do Ministério Público: Qualidade pedagógica abaixo do patamar legal exigido (60%)."
                        : lang === "es"
                        ? "Intervención del Ministerio Público: Calidad pedagógica insuficiente (menos del 60%)."
                        : "Prosecutor's Office Intervention: Insufficient pedagogical quality (below 60%).")
                    : (lang === "pt"
                        ? "Contas Rejeitadas pelo TCE: Irresponsabilidade fiscal detectada (menos de 40%)."
                        : lang === "es"
                        ? "Cuentas Rechazadas por el TCE: Irresponsabilidad fiscal detectada (menos del 40%)."
                        : "Accounts Rejected by Court of Accounts: Fiscal irresponsibility detected (below 40%).")}
                </p>
              </div>
            )}
          </motion.div>

          {/* Action Buttons Row */}
          <motion.div
            className="flex flex-row gap-2.5 w-full max-w-[720px] justify-center mt-auto pt-2 pb-6 md:pb-4 shrink-0"
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            <button
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 md:px-5 md:py-3 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-700/50 hover:border-slate-500/50 text-slate-300 hover:text-white text-[10px] md:text-xs font-black uppercase tracking-wider transition-all duration-200 shadow-md active:scale-95 cursor-pointer"
              onMouseEnter={playTick}
              onClick={() => {
                playClick();
                onViewRanking();
              }}
            >
              <Trophy className="w-3.5 h-3.5" /> {t(lang, "btn_view_rank").toUpperCase()}
            </button>
            
            {isApproved ? (
              <button
                className="flex-[1.2] flex items-center justify-center gap-1.5 px-3 py-2.5 md:px-6 md:py-3 rounded-xl bg-cyan-600/20 hover:bg-cyan-600/35 border-2 border-cyan-500 text-cyan-400 hover:text-cyan-200 text-[10px] md:text-xs font-black uppercase tracking-wider hover:shadow-[0_0_20px_rgba(34,211,238,0.35)] transition-all duration-200 active:scale-95 cursor-pointer"
                onMouseEnter={playTick}
                onClick={() => {
                  playClick();
                  if (gameState.ph + 1 >= getScenarios(lang).length) {
                    onViewRanking(); // Show ranking or final screen if game is completely over
                  } else {
                    onAdvance();
                  }
                }}
              >
                {gameState.ph + 1 >= getScenarios(lang).length 
                  ? (lang === "pt" ? "[ CONCLUIR ]" : lang === "es" ? "[ CONCLUIR ]" : "[ COMPLETE ]")
                  : (lang === "pt" 
                      ? `[ AVANÇAR FASE ${gameState.ph + 2} ]` 
                      : lang === "es" 
                      ? `[ AVANZAR FASE ${gameState.ph + 2} ]` 
                      : `[ NEXT PHASE ${gameState.ph + 2} ]`
                    )
                }
              </button>
            ) : (
              <button
                className="flex-[1.2] flex items-center justify-center gap-1.5 px-3 py-2.5 md:px-6 md:py-3 rounded-xl bg-red-950/30 hover:bg-red-900/40 border-2 border-red-500 text-red-400 hover:text-red-200 text-[10px] md:text-xs font-black uppercase tracking-wider hover:shadow-[0_0_20px_rgba(239,68,68,0.35)] transition-all duration-200 active:scale-95 cursor-pointer"
                onMouseEnter={playTick}
                onClick={() => {
                  playClick();
                  onRetry();
                }}
              >
                <RefreshCw className="w-3.5 h-3.5 animate-spin-slow" /> {
                  lang === "pt"
                    ? `[ REFAZER FASE ${gameState.ph + 1} ]`
                    : lang === "es"
                    ? `[ REHACER FASE ${gameState.ph + 1} ]`
                    : `[ RETRY PHASE ${gameState.ph + 1} ]`
                }
              </button>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}