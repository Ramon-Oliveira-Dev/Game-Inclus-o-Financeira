import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Coins, Star, Flame, ShieldAlert, Award, TrendingUp, Sparkles, CheckCircle2, Zap, HelpCircle, Scale, BookOpen } from "lucide-react";
import { GameState, Language } from "../types";
import { useSound } from "../hooks/useSound";

export type StatModalType = "budget" | "score" | "combo";

interface StatInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: StatModalType;
  gameState: GameState;
  lang: Language;
}

export function StatInfoModal({ isOpen, onClose, type, gameState, lang }: StatInfoModalProps) {
  const [activeTab, setActiveTab] = useState<StatModalType>(type);
  const { playClick, playTick } = useSound();

  useEffect(() => {
    setActiveTab(type);
  }, [type]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleTabChange = (newTab: StatModalType) => {
    playClick();
    setActiveTab(newTab);
  };

  const handleClose = () => {
    playClick();
    onClose();
  };

  const getFiscalStatus = (sust: number) => {
    if (sust < 30) {
      return {
        label: lang === "pt" ? "⚠️ Situação Crítica" : lang === "es" ? "⚠️ Condición Crítica" : "⚠️ Critical Condition",
        desc: lang === "pt" ? "Penalidade ativa: +50% nos custos orçamentários das decisões!" : lang === "es" ? "¡Penalización activa: +50% en costos presupuestarios!" : "Active penalty: +50% budget cost on decisions!",
        color: "text-red-400 bg-red-500/10 border-red-500/30"
      };
    }
    if (sust < 60) {
      return {
        label: lang === "pt" ? "⚡ Situação Moderada" : lang === "es" ? "⚡ Condición Moderada" : "⚡ Moderate Condition",
        desc: lang === "pt" ? "Atenção ao fluxo de caixa para evitar contenção de contingência." : lang === "es" ? "Atención al flujo de caja para evitar contención." : "Monitor cash flow to avoid contingency cuts.",
        color: "text-amber-400 bg-amber-500/10 border-amber-500/30"
      };
    }
    return {
      label: lang === "pt" ? "✅ Gestão Fiscal Saudável" : lang === "es" ? "✅ Gestión Fiscal Saludable" : "✅ Healthy Fiscal Management",
      desc: lang === "pt" ? "Recursos equilibrados para investimentos em AEE e Tecnologia Assistiva." : lang === "es" ? "Recursos equilibrados para inversiones en AEE y TA." : "Balanced funds for AEE and Assistive Tech investments.",
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30"
    };
  };

  const getComboMultiplier = (combo: number) => {
    if (combo >= 5) return "3.0x (MAX 🔥)";
    if (combo === 4) return "2.5x";
    if (combo === 3) return "2.0x";
    if (combo === 2) return "1.5x";
    return "1.0x";
  };

  const fiscalStatus = getFiscalStatus(gameState.sust);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[250] flex items-center justify-center p-3 sm:p-5 md:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="absolute inset-0 bg-[#03060d]/85 backdrop-blur-2xl cursor-pointer"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-slate-900/90 border border-white/15 shadow-[0_16px_50px_rgba(0,0,0,0.8)] rounded-2xl sm:rounded-3xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
        >
          {/* Top Decorative Neon Glow Header */}
          <div
            className={`h-1.5 w-full bg-gradient-to-r transition-all duration-500 ${
              activeTab === "budget"
                ? "from-emerald-500 via-teal-400 to-cyan-500 shadow-[0_0_20px_#10b981]"
                : activeTab === "score"
                ? "from-amber-400 via-yellow-400 to-orange-400 shadow-[0_0_20px_#f59e0b]"
                : "from-orange-500 via-red-500 to-rose-500 shadow-[0_0_20px_#f97316]"
            }`}
          />

          {/* Header Bar */}
          <div className="p-4 sm:p-6 pb-2 flex items-center justify-between border-b border-white/10 shrink-0">
            <div className="flex items-center gap-3">
              <div
                className={`p-2.5 rounded-2xl border transition-all ${
                  activeTab === "budget"
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                    : activeTab === "score"
                    ? "bg-yellow-500/10 border-yellow-500/30 text-yellow-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                    : "bg-orange-500/10 border-orange-500/30 text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.2)]"
                }`}
              >
                {activeTab === "budget" && <Coins className="w-6 h-6" />}
                {activeTab === "score" && <Star className="w-6 h-6" />}
                {activeTab === "combo" && <Flame className="w-6 h-6" />}
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-black text-white tracking-wide uppercase">
                  {activeTab === "budget" && (lang === "pt" ? "Orçamento Público" : lang === "es" ? "Presupuesto Público" : "Public Budget")}
                  {activeTab === "score" && (lang === "pt" ? "Pontuação & Desempenho" : lang === "es" ? "Puntuación y Rendimiento" : "Score & Performance")}
                  {activeTab === "combo" && (lang === "pt" ? "Sequência de Sucesso" : lang === "es" ? "Racha de Éxito" : "Combo Streak")}
                </h3>
                <p className="text-[11px] sm:text-xs text-white/50 font-medium">
                  {lang === "pt" ? "Painel detalhado do indicador selecionado" : lang === "es" ? "Panel detallado del indicador seleccionado" : "Detailed panel of the selected indicator"}
                </p>
              </div>
            </div>

            <button
              onClick={handleClose}
              onMouseEnter={playTick}
              className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white rounded-xl transition-all cursor-pointer active:scale-95"
              title={lang === "pt" ? "Fechar" : lang === "es" ? "Cerrar" : "Close"}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs Bar */}
          <div className="px-4 sm:px-6 pt-3 pb-2 bg-slate-950/40 border-b border-white/5 flex gap-2 overflow-x-auto scrollbar-hide shrink-0">
            {/* Tab Moeda / Budget */}
            <button
              onClick={() => handleTabChange("budget")}
              onMouseEnter={playTick}
              className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                activeTab === "budget"
                  ? "bg-emerald-500/15 border-emerald-500/50 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                  : "bg-white/[0.03] border-white/5 text-white/50 hover:bg-white/[0.08] hover:text-white"
              }`}
            >
              <span className="text-sm">💰</span>
              <span>{lang === "pt" ? "Orçamento" : lang === "es" ? "Presupuesto" : "Budget"}</span>
              <span className="ml-auto text-[10px] font-mono opacity-80">{gameState.budget}k</span>
            </button>

            {/* Tab Estrela / Score */}
            <button
              onClick={() => handleTabChange("score")}
              onMouseEnter={playTick}
              className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                activeTab === "score"
                  ? "bg-yellow-500/15 border-yellow-500/50 text-yellow-300 shadow-[0_0_15px_rgba(245,158,11,0.15)]"
                  : "bg-white/[0.03] border-white/5 text-white/50 hover:bg-white/[0.08] hover:text-white"
              }`}
            >
              <span className="text-sm">⭐</span>
              <span>{lang === "pt" ? "Pontuação" : lang === "es" ? "Puntuación" : "Score"}</span>
              <span className="ml-auto text-[10px] font-mono opacity-80">{gameState.score}</span>
            </button>

            {/* Tab Fogo / Combo */}
            <button
              onClick={() => handleTabChange("combo")}
              onMouseEnter={playTick}
              className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                activeTab === "combo"
                  ? "bg-orange-500/15 border-orange-500/50 text-orange-300 shadow-[0_0_15px_rgba(249,115,22,0.15)]"
                  : "bg-white/[0.03] border-white/5 text-white/50 hover:bg-white/[0.08] hover:text-white"
              }`}
            >
              <span className="text-sm">🔥</span>
              <span>{lang === "pt" ? "Sequência" : lang === "es" ? "Racha" : "Combo"}</span>
              <span className="ml-auto text-[10px] font-mono opacity-80">
                {gameState.combo > 0 ? `x${gameState.combo}` : "0"}
              </span>
            </button>
          </div>

          {/* Tab Content Body */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1 scrollbar-thin scrollbar-thumb-white/10">
            {/* ==================== BUDGET / MOEDA ==================== */}
            {activeTab === "budget" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-5"
              >
                {/* Main Hero Card */}
                <div className="bg-gradient-to-br from-emerald-950/40 via-slate-900 to-teal-950/30 border border-emerald-500/30 rounded-2xl p-5 shadow-[0_8px_24px_rgba(16,185,129,0.1)] relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-10 text-emerald-400 pointer-events-none">
                    <Coins size={120} />
                  </div>
                  <div className="relative z-10">
                    <div className="text-[11px] font-bold uppercase tracking-widest text-emerald-400 mb-1 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      {lang === "pt" ? "Saldo Orçamentário Atual" : lang === "es" ? "Saldo Presupuestario Actual" : "Current Budget Balance"}
                    </div>
                    <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight flex items-baseline gap-2">
                      <span className="text-emerald-400">R$ {gameState.budget.toLocaleString("pt-BR")}.000</span>
                      <span className="text-xs text-emerald-300/70 font-sans font-normal">({gameState.budget}k QSD)</span>
                    </div>

                    {/* Fiscal Indicator Bar */}
                    <div className="mt-4 pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
                      <div className="flex-1">
                        <div className="flex justify-between text-xs font-bold mb-1.5">
                          <span className="text-white/70">
                            {lang === "pt" ? "Sustentabilidade Fiscal:" : lang === "es" ? "Sustentabilidad Fiscal:" : "Fiscal Sustainability:"}
                          </span>
                          <span className="text-cyan-400 font-mono">{gameState.sust}%</span>
                        </div>
                        <div className="h-2 bg-black/40 rounded-full overflow-hidden border border-white/10">
                          <div
                            className="h-full bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full transition-all duration-500"
                            style={{ width: `${gameState.sust}%` }}
                          />
                        </div>
                      </div>

                      <div className={`px-3 py-1.5 rounded-xl border text-xs font-bold text-center shrink-0 ${fiscalStatus.color}`}>
                        {fiscalStatus.label}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Fiscal Alert Banner if Critical */}
                {gameState.sust < 30 && (
                  <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3 text-red-300 text-xs">
                    <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold uppercase tracking-wider block mb-0.5">
                        {lang === "pt" ? "Aviso de Penúria Fiscal" : lang === "es" ? "Aviso de Penuria Fiscal" : "Fiscal Deficit Warning"}
                      </span>
                      {fiscalStatus.desc}
                    </div>
                  </div>
                )}

                {/* Conceptual & Legal Explanation */}
                <div className="bg-slate-950/50 border border-white/10 rounded-2xl p-4 sm:p-5 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    {lang === "pt" ? "O que é o Orçamento no AEE?" : lang === "es" ? "¿Qué es el Presupuesto en AEE?" : "What is the Budget in AEE?"}
                  </h4>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                    {lang === "pt"
                      ? "O orçamento público municipal financia o Atendimento Educacional Especializado (AEE), a aquisição de Salas de Recursos Multifuncionais (SRM Tipo 1 e 2), contratação de profissionais de apoio (cuidadores) e compra de Tecnologias Assistivas conforme diretrizes do FUNDEB (Lei nº 14.113/2020) e da LDB."
                      : lang === "es"
                      ? "El presupuesto municipal financia la Atención Educativa Especializada (AEE), salas de recursos multifuncionales (SRM), personal de apoyo y Tecnología Asistiva según pautas del FUNDEB (Ley 14.113/2020) y LDB."
                      : "The municipal public budget funds Specialized Educational Services (AEE), Multifunctional Resource Rooms (SRM), support caregivers, and Assistive Technologies under FUNDEB (Law 14,113/2020) and LDB directives."}
                  </p>
                </div>

                {/* Strategic Management Rules */}
                <div className="bg-slate-950/30 border border-white/5 rounded-2xl p-4 sm:p-5 space-y-2.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white/60 flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-emerald-400" />
                    {lang === "pt" ? "Regras de Gestão Financeira" : lang === "es" ? "Reglas de Gestión Financiera" : "Financial Management Rules"}
                  </h4>
                  <ul className="space-y-2 text-xs text-white/70">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>
                        {lang === "pt"
                          ? "Decisões ÓTIMAS economizam verba garantindo conformidade legal sem desperdício de recursos."
                          : lang === "es"
                          ? "Decisiones ÓPTIMAS ahorran dinero garantizando cumplimiento legal sin desperdicio."
                          : "OPTIMAL decisions save money ensuring legal compliance without waste."}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>
                        {lang === "pt"
                          ? "Liminares judiciais e urgências de saúde/tecnologia podem subtrair valores do orçamento ativo."
                          : lang === "es"
                          ? "Medidas cautelares y emergencias pueden restar valores del presupuesto activo."
                          : "Court injunctions and emergencies can deduct funds from active budget."}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>
                        {lang === "pt"
                          ? "Esgotar o orçamento (R$ 0k) causa moratória orçamentária e encerra a gestão por inviabilidade."
                          : lang === "es"
                          ? "Agotar el presupuesto ($ 0k) causa moratoria presupuestaria y finaliza la gestión."
                          : "Depleting the budget ($ 0k) causes a budget default and ends the game."}
                      </span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            )}

            {/* ==================== SCORE / ESTRELA ==================== */}
            {activeTab === "score" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-5"
              >
                {/* Main Hero Card */}
                <div className="bg-gradient-to-br from-yellow-950/40 via-slate-900 to-amber-950/30 border border-yellow-500/30 rounded-2xl p-5 shadow-[0_8px_24px_rgba(245,158,11,0.1)] relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-10 text-yellow-400 pointer-events-none">
                    <Star size={120} />
                  </div>
                  <div className="relative z-10">
                    <div className="text-[11px] font-bold uppercase tracking-widest text-yellow-400 mb-1 flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5" />
                      {lang === "pt" ? "Pontuação de Gestão Acumulada" : lang === "es" ? "Puntuación de Gestión Acumulada" : "Accumulated Management Score"}
                    </div>
                    <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight flex items-baseline gap-2">
                      <span className="text-yellow-400">{gameState.score}</span>
                      <span className="text-xs text-yellow-300/70 font-sans font-normal">PTS XP</span>
                    </div>

                    {/* Performance Stats Grid */}
                    <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-3 gap-2 text-center">
                      <div className="bg-black/30 p-2 sm:p-2.5 rounded-xl border border-white/5">
                        <span className="text-[10px] text-white/50 font-bold block uppercase truncate">
                          {lang === "pt" ? "Acertos Diretos" : lang === "es" ? "Aciertos Directos" : "Optimal Choices"}
                        </span>
                        <span className="text-sm sm:text-base font-black text-emerald-400 font-mono">
                          {gameState.rights}
                        </span>
                      </div>

                      <div className="bg-black/30 p-2 sm:p-2.5 rounded-xl border border-white/5">
                        <span className="text-[10px] text-white/50 font-bold block uppercase truncate">
                          {lang === "pt" ? "Agilidade (Fast)" : lang === "es" ? "Agilidad (Fast)" : "Speed Choices"}
                        </span>
                        <span className="text-sm sm:text-base font-black text-cyan-400 font-mono">
                          {gameState.fast}
                        </span>
                      </div>

                      <div className="bg-black/30 p-2 sm:p-2.5 rounded-xl border border-white/5">
                        <span className="text-[10px] text-white/50 font-bold block uppercase truncate">
                          {lang === "pt" ? "Dificuldade" : lang === "es" ? "Dificultad" : "Difficulty"}
                        </span>
                        <span className="text-xs sm:text-sm font-black text-amber-400 font-mono uppercase">
                          {gameState.diff === "facil" ? "1.0x" : gameState.diff === "dificil" ? "2.0x" : "1.5x"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* How XP Works */}
                <div className="bg-slate-950/50 border border-white/10 rounded-2xl p-4 sm:p-5 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-yellow-400 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    {lang === "pt" ? "Como Funciona a Pontuação?" : lang === "es" ? "¿Cómo Funciona la Puntuación?" : "How Score Works?"}
                  </h4>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                    {lang === "pt"
                      ? "A pontuação mede sua capacidade técnica de garantir direitos inclusivos fundamentados na Lei Brasileira de Inclusão (LBI nº 13.146/2015). Respostas com excelente fundamentação jurídica concedem a pontuação máxima."
                      : lang === "es"
                      ? "La puntuación mide su capacidad técnica para garantizar derechos inclusivos fundamentados en la Ley de Inclusión (LBI 13.146/2015). Respuestas óptimas otorgan la puntuación máxima."
                      : "The score measures your technical capacity to guarantee inclusive rights based on the Brazilian Inclusion Law (LBI No. 13,146/2015). Optimal responses award maximum points."}
                  </p>
                </div>

                {/* Score Formula Components */}
                <div className="bg-slate-950/30 border border-white/5 rounded-2xl p-4 sm:p-5 space-y-2.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white/60 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    {lang === "pt" ? "Multiplicadores de XP" : lang === "es" ? "Multiplicadores de XP" : "XP Multipliers"}
                  </h4>
                  <ul className="space-y-2 text-xs text-white/70">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                      <span>
                        <strong>{lang === "pt" ? "Bônus de Dificuldade:" : lang === "es" ? "Bono de Dificultad:" : "Difficulty Bonus:"}</strong>{" "}
                        {lang === "pt" ? "Fácil (1.0x), Médio (1.5x) e Difícil (2.0x)." : lang === "es" ? "Fácil (1.0x), Medio (1.5x) y Difícil (2.0x)." : "Easy (1.0x), Medium (1.5x), Hard (2.0x)."}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                      <span>
                        <strong>{lang === "pt" ? "Bônus de Tempo:" : lang === "es" ? "Bono de Tiempo:" : "Time Bonus:"}</strong>{" "}
                        {lang === "pt" ? "Ganhe +10 XP para cada segundo restante ao confirmar a escolha." : lang === "es" ? "Gane +10 XP por cada segundo restante al confirmar la elección." : "Earn +10 XP for each second remaining when confirming your choice."}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                      <span>
                        <strong>{lang === "pt" ? "Ranking Competitivo:" : lang === "es" ? "Ranking Competitivo:" : "Competitive Ranking:"}</strong>{" "}
                        {lang === "pt" ? "Sua pontuação acumulada define sua posição no Ranking Global de Gestores." : lang === "es" ? "Su puntuación acumulada define su posición en el Ranking Global de Gestores." : "Your cumulative score determines your rank on the Global Leaderboard."}
                      </span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            )}

            {/* ==================== COMBO / FOGO ==================== */}
            {activeTab === "combo" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-5"
              >
                {/* Main Hero Card */}
                <div className="bg-gradient-to-br from-orange-950/40 via-slate-900 to-red-950/30 border border-orange-500/30 rounded-2xl p-5 shadow-[0_8px_24px_rgba(249,115,22,0.1)] relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-10 text-orange-400 pointer-events-none">
                    <Flame size={120} />
                  </div>
                  <div className="relative z-10">
                    <div className="text-[11px] font-bold uppercase tracking-widest text-orange-400 mb-1 flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5" />
                      {lang === "pt" ? "Sequência de Acertos Atual" : lang === "es" ? "Racha de Aciertos Actual" : "Current Combo Streak"}
                    </div>
                    <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight flex items-baseline gap-2">
                      <span className="text-orange-400">
                        {gameState.combo >= 5 ? `x${gameState.combo} MAX 🔥` : gameState.combo > 0 ? `x${gameState.combo}` : "x0"}
                      </span>
                      <span className="text-xs text-orange-300/70 font-sans font-normal">
                        ({getComboMultiplier(gameState.combo)} {lang === "pt" ? "Bônus" : "Bonus"})
                      </span>
                    </div>

                    {/* Streak Progress Stats */}
                    <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-white/60 font-medium">
                          {lang === "pt" ? "Combo Máximo Atingido:" : lang === "es" ? "Racha Máxima Alcanzada:" : "Max Combo Streak:"}
                        </span>
                        <span className="font-mono font-bold text-amber-400 text-sm">
                          x{gameState.maxCombo}
                        </span>
                      </div>

                      <div className="px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-300 font-bold font-mono text-[11px]">
                        {gameState.combo >= 5
                          ? "🔥 STREAK LENDÁRIA"
                          : gameState.combo >= 2
                          ? "⚡ EM SEQUÊNCIA"
                          : "💤 SEM SEQUÊNCIA"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Multipliers Scale Table */}
                <div className="bg-slate-950/50 border border-white/10 rounded-2xl p-4 sm:p-5 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-orange-400 flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    {lang === "pt" ? "Tabela de Multiplicadores de Combo" : lang === "es" ? "Tabla de Multiplicadores de Racha" : "Combo Multipliers Table"}
                  </h4>
                  <div className="grid grid-cols-5 gap-1.5 text-center font-mono text-xs">
                    <div className={`p-2 rounded-xl border ${gameState.combo === 1 ? "bg-orange-500/20 border-orange-500 text-white font-bold" : "bg-white/5 border-white/5 text-white/50"}`}>
                      <div className="text-[10px] text-white/40">x1</div>
                      <div>1.0x</div>
                    </div>
                    <div className={`p-2 rounded-xl border ${gameState.combo === 2 ? "bg-orange-500/20 border-orange-500 text-white font-bold" : "bg-white/5 border-white/5 text-white/50"}`}>
                      <div className="text-[10px] text-white/40">x2</div>
                      <div>1.5x</div>
                    </div>
                    <div className={`p-2 rounded-xl border ${gameState.combo === 3 ? "bg-orange-500/20 border-orange-500 text-white font-bold" : "bg-white/5 border-white/5 text-white/50"}`}>
                      <div className="text-[10px] text-white/40">x3</div>
                      <div>2.0x</div>
                    </div>
                    <div className={`p-2 rounded-xl border ${gameState.combo === 4 ? "bg-orange-500/20 border-orange-500 text-white font-bold" : "bg-white/5 border-white/5 text-white/50"}`}>
                      <div className="text-[10px] text-white/40">x4</div>
                      <div>2.5x</div>
                    </div>
                    <div className={`p-2 rounded-xl border ${gameState.combo >= 5 ? "bg-gradient-to-r from-orange-500/30 to-red-500/30 border-orange-400 text-orange-300 font-bold animate-pulse" : "bg-white/5 border-white/5 text-white/50"}`}>
                      <div className="text-[10px] text-orange-400 font-bold">MAX</div>
                      <div>3.0x</div>
                    </div>
                  </div>
                </div>

                {/* Rules & Reset */}
                <div className="bg-slate-950/30 border border-white/5 rounded-2xl p-4 sm:p-5 space-y-2.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white/60 flex items-center gap-2">
                    <Scale className="w-4 h-4 text-orange-400" />
                    {lang === "pt" ? "Como Manter a Sequência?" : lang === "es" ? "¿Cómo Mantener la Racha?" : "How to Keep the Streak?"}
                  </h4>
                  <ul className="space-y-2 text-xs text-white/70">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                      <span>
                        {lang === "pt"
                          ? "Cada resposta ÓTIMA (padrão-ouro legal e pedagógico) aumenta a sequência em +1."
                          : lang === "es"
                          ? "Cada respuesta ÓPTIMA aumenta la racha en +1."
                          : "Each OPTIMAL response increases the streak by +1."}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                      <span>
                        {lang === "pt"
                          ? "Respostas SUBÓTIMAS ou CRÍTICAS resetam imediatamente a sequência para x0."
                          : lang === "es"
                          ? "Respuestas SUBÓPTIMAS o CRÍTICAS reinician inmediatamente la racha a x0."
                          : "SUBOPTIMAL or CRITICAL choices immediately reset the combo to x0."}
                      </span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            )}
          </div>

          {/* Footer Close Action Button */}
          <div className="p-4 sm:p-5 border-t border-white/10 bg-slate-950/80 flex items-center justify-end shrink-0">
            <button
              onClick={handleClose}
              onMouseEnter={playTick}
              className={`w-full sm:w-auto px-8 py-3 rounded-xl font-bold uppercase tracking-wider text-xs transition-all shadow-lg cursor-pointer active:scale-95 ${
                activeTab === "budget"
                  ? "bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/50 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                  : activeTab === "score"
                  ? "bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/50 text-yellow-300 shadow-[0_0_20px_rgba(245,158,11,0.2)]"
                  : "bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/50 text-orange-300 shadow-[0_0_20px_rgba(249,115,22,0.2)]"
              }`}
            >
              {lang === "pt" ? "Entendido" : lang === "es" ? "Entendido" : "Got It"}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
