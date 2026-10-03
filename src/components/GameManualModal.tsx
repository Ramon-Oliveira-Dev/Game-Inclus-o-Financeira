import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, BookOpen, Gamepad2, Trophy, Award, ShieldCheck, 
  Scale, CircleDollarSign, Zap, CheckCircle2, AlertTriangle, 
  Clock, Sparkles, HelpCircle, Layers, LayoutGrid, 
  School, Gavel, Users, Tablet, Presentation, Scroll, Map, 
  ChevronRight, ArrowRight, Brain, FileText, Check, Star
} from "lucide-react";
import { Language } from "../types";
import { useSound } from "../hooks/useSound";
import { t } from "../locales";

interface GameManualModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

type TabType = "overview" | "modules" | "scoring" | "decisions" | "achievements";

export function GameManualModal({ isOpen, onClose, lang }: GameManualModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const { playClick, playTick } = useSound();

  if (!isOpen) return null;

  const tabLabels = {
    pt: {
      overview: "Regras & Regras do Jogo",
      modules: "Módulos & Fases",
      scoring: "Pontuação & Combos",
      decisions: "Tipos de Decisões",
      achievements: "Conquistas",
      title: "Manual de Instruções do Jogo",
      subtitle: "Guia Completo para o Gestor de Educação Especial e Inclusiva",
      close: "Fechar Manual",
    },
    en: {
      overview: "Rules & Game Overview",
      modules: "Modules & Phases",
      scoring: "Scoring & Combos",
      decisions: "Decision Types",
      achievements: "Achievements",
      title: "Game Instruction Manual",
      subtitle: "Complete Guide for Special and Inclusive Education Managers",
      close: "Close Manual",
    },
    es: {
      overview: "Reglas y Visión General",
      modules: "Módulos y Fases",
      scoring: "Puntuación y Combos",
      decisions: "Tipos de Decisiones",
      achievements: "Logros",
      title: "Manual de Instrucciones del Juego",
      subtitle: "Guía Completa para el Gestor de Educación Especial e Inclusiva",
      close: "Cerrar Manual",
    }
  };

  const labels = tabLabels[lang] || tabLabels.pt;

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: "overview", label: labels.overview, icon: <HelpCircle size={16} /> },
    { id: "modules", label: labels.modules, icon: <Layers size={16} /> },
    { id: "scoring", label: labels.scoring, icon: <Zap size={16} /> },
    { id: "decisions", label: labels.decisions, icon: <Scale size={16} /> },
    { id: "achievements", label: labels.achievements, icon: <Award size={16} /> },
  ];

  return (
    <AnimatePresence>
      <motion.div
        key="manual-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-[#020617]/80 backdrop-blur-md z-[9998] flex items-center justify-center p-2 sm:p-4 md:p-6"
        onClick={onClose}
      >
        <motion.div
          key="manual-container"
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 220 }}
          className="relative w-full max-w-5xl max-h-[92vh] bg-gradient-to-b from-[#0a0f1d] via-[#070b16] to-[#040710] border border-cyan-500/30 rounded-3xl shadow-[0_0_50px_rgba(6,182,212,0.15)] flex flex-col overflow-hidden z-[9999]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 sm:p-6 border-b border-white/10 bg-white/[0.02] shrink-0">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-500/20 via-blue-500/20 to-indigo-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                <BookOpen size={22} />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400 uppercase">
                  {labels.title}
                </h2>
                <p className="text-xs text-cyan-300/70 font-medium">
                  {labels.subtitle}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => { playClick(); onClose(); }}
                onMouseEnter={playTick}
                className="p-2.5 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white rounded-full transition-all cursor-pointer active:scale-95 border border-white/10"
                title={labels.close}
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1.5 p-2 px-4 sm:px-6 bg-[#030611]/90 border-b border-white/5 overflow-x-auto scrollbar-hide shrink-0">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => { playClick(); setActiveTab(tab.id); }}
                  onMouseEnter={playTick}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                    isActive
                      ? "bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_15px_rgba(34,211,238,0.15)]"
                      : "text-white/60 hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6 text-white/90 font-sans text-sm scrollbar-thin scrollbar-thumb-cyan-500/20">
            {activeTab === "overview" && <TabOverview lang={lang} />}
            {activeTab === "modules" && <TabModules lang={lang} />}
            {activeTab === "scoring" && <TabScoring lang={lang} />}
            {activeTab === "decisions" && <TabDecisions lang={lang} />}
            {activeTab === "achievements" && <TabAchievements lang={lang} />}
          </div>

          {/* Footer */}
          <div className="p-4 px-6 bg-[#030611] border-t border-white/10 flex items-center justify-center shrink-0">
            <p className="text-[10px] text-white/20 text-center font-mono tracking-wider uppercase">
              {t(lang, "start_title")} &copy; 2026
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* =========================================================================
   TAB 1: OVERVIEW & GAME RULES
   ========================================================================= */
function TabOverview({ lang }: { lang: Language }) {
  if (lang === "es") {
    return (
      <div className="space-y-6">
        <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950/40 via-cyan-950/20 to-slate-900/40 border border-cyan-500/30">
          <h3 className="text-base font-bold text-cyan-300 flex items-center gap-2 mb-2">
            <ShieldCheck className="text-cyan-400" size={20} />
            ¿Cuál es tu rol en el juego?
          </h3>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
            Asumes el cargo de <strong>Gestor(a) Municipal de Educación Especial e Inclusiva</strong>. Tu misión es tomar decisiones estratégicas para garantizar el Atendido Educativo Especializado (AEE), la accesibilidad física y pedagógica y el cumplimiento de la Ley Brasileña de Inclusión (LBI - Ley nº 13.146/2015) y la LDB, manteniendo el equilibrio presupuestario y fiscal.
          </p>
        </div>

        {/* Indicadores Principales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/20">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 mb-3">
              <CheckCircle2 size={20} />
            </div>
            <h4 className="text-sm font-bold text-cyan-300 mb-1">♿ Calidad de Inclusión</h4>
            <p className="text-xs text-white/70 leading-normal">
              Mide la adecuación pedagógica, formación docente, salas de AEE y el respeto a los derechos de los estudiantes con discapacidad (0% a 100%).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-teal-950/20 border border-teal-500/20">
            <div className="w-9 h-9 rounded-xl bg-teal-500/20 flex items-center justify-center text-teal-400 mb-3">
              <Scale size={20} />
            </div>
            <h4 className="text-sm font-bold text-teal-300 mb-1">💼 Sostenibilidad Fiscal</h4>
            <p className="text-xs text-white/70 leading-normal">
              Mide la eficiencia del uso del presupuesto, cumplimiento de licitaciones, asignación de FUNDEB y gestión del gasto público (0% a 100%).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/20">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 mb-3">
              <CircleDollarSign size={20} />
            </div>
            <h4 className="text-sm font-bold text-amber-300 mb-1">💰 Presupuesto Municipal</h4>
            <p className="text-xs text-white/70 leading-normal">
              Recursos financieros disponibles para implementar soluciones, contratar especialistas y atender urgencias judiciales o cautelares.
            </p>
          </div>
        </div>

        {/* Regla del Temporizador */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/30 via-slate-900/40 to-blue-950/30 border border-cyan-500/30 space-y-3">
          <h4 className="text-sm font-bold text-cyan-300 flex items-center gap-2">
            <Clock className="text-cyan-400" size={18} />
            Regla del Temporizador y Contador de Tiempo (90s)
          </h4>
          <p className="text-xs text-white/80 leading-relaxed">
            Cada carta de escenario cuenta con un límite de tiempo para simular la presión real de la gestión pública. El tiempo base es de <strong>90 segundos</strong> (120s en Fácil, 90s en Medio, 60s en Difícil).
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 pt-1 text-xs">
            <div className="p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-300 font-medium">
              🟢 <strong>&gt; 25s (Verde):</strong> Tiempo seguro de análisis jurídico.
            </div>
            <div className="p-2.5 rounded-xl bg-yellow-950/30 border border-yellow-500/30 text-yellow-300 font-medium">
              🟡 <strong>25s a 16s (Amarillo):</strong> Inicio de la cuenta regresiva con sonido progresivo.
            </div>
            <div className="p-2.5 rounded-xl bg-orange-950/30 border border-orange-500/30 text-orange-300 font-medium">
              🟠 <strong>15s a 6s (Naranja):</strong> Alerta de atención con tono más rápido.
            </div>
            <div className="p-2.5 rounded-xl bg-red-950/30 border border-red-500/30 text-red-300 font-medium">
              🔴 <strong>5s a 0s (Rojo):</strong> Alerta crítica con pulso y alarme final a los 0s.
            </div>
          </div>
          <p className="text-xs text-cyan-200/80 italic">
            ⚡ <strong>Bono de Velocidad:</strong> ¡Cualquier segundo restante al responder otorga +10 XP adicionales!
          </p>
        </div>

        {/* Cartas de Decisión y Fundamentación */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/30 via-slate-900/40 to-indigo-950/30 border border-purple-500/30 space-y-3">
          <h4 className="text-sm font-bold text-purple-300 flex items-center gap-2">
            <FileText className="text-purple-400" size={18} />
            Funcionamiento de las Cartas de Decisión
          </h4>
          <p className="text-xs text-white/80 leading-relaxed">
            Cada dilema presenta <strong>3 Cartas de Opción de Decisión</strong>. Al elegir una carta, se revela el <strong>Card de Feedback / Debriefing</strong> con:
          </p>
          <ul className="list-disc list-inside text-xs text-white/70 space-y-1 pl-2">
            <li><strong>Fundamentación Jurídica Completa:</strong> Artículos de la LBI (13.146/15), LDB (9.394/96), FUNDEB (14.113/20), CF/88 o LAI (12.527/11).</li>
            <li><strong>Análisis Pedagógico:</strong> Explicación técnica del impacto directo en los alumnos y profesores de AEE.</li>
            <li><strong>Efecto en Indicadores:</strong> Ganancia o pérdida en Calidad, Sostenibilidad Fiscal y Presupuesto.</li>
          </ul>
        </div>

        <div className="p-5 rounded-2xl bg-red-950/20 border border-red-500/30">
          <h4 className="text-sm font-bold text-red-300 flex items-center gap-2 mb-2">
            <AlertTriangle className="text-red-400" size={18} />
            Condiciones de Derrota (Gestión Inviable)
          </h4>
          <ul className="list-disc list-inside text-xs sm:text-sm text-white/80 space-y-1.5">
            <li>Si la <strong>Calidad de Inclusión</strong> llega al 0% debido a negligencia pedagógica o violaciones de derechos.</li>
            <li>Si la <strong>Sostenibilidad Fiscal</strong> cae al 0% por quiebra o irregularidades en el gasto del FUNDEB.</li>
            <li>Si el <strong>Presupuesto</strong> se agota totalmente y no puedes responder a una emergencia.</li>
          </ul>
        </div>
      </div>
    );
  }

  if (lang === "en") {
    return (
      <div className="space-y-6">
        <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950/40 via-cyan-950/20 to-slate-900/40 border border-cyan-500/30">
          <h3 className="text-base font-bold text-cyan-300 flex items-center gap-2 mb-2">
            <ShieldCheck className="text-cyan-400" size={20} />
            What is your role in the game?
          </h3>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
            You take on the role of <strong>Municipal Manager of Special and Inclusive Education</strong>. Your mission is to make strategic decisions to guarantee Specialized Educational Service (AEE), physical and pedagogical accessibility, and compliance with Brazilian Inclusion Legislation (LBI - Law No. 13,146/2015) and LDB, while maintaining budget and fiscal balance.
          </p>
        </div>

        {/* Key Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/20">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 mb-3">
              <CheckCircle2 size={20} />
            </div>
            <h4 className="text-sm font-bold text-cyan-300 mb-1">♿ Inclusion Quality</h4>
            <p className="text-xs text-white/70 leading-normal">
              Measures pedagogical adequacy, teacher training, AEE resource rooms, and respect for students with disabilities' rights (0% to 100%).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-teal-950/20 border border-teal-500/20">
            <div className="w-9 h-9 rounded-xl bg-teal-500/20 flex items-center justify-center text-teal-400 mb-3">
              <Scale size={20} />
            </div>
            <h4 className="text-sm font-bold text-teal-300 mb-1">💼 Fiscal Sustainability</h4>
            <p className="text-xs text-white/70 leading-normal">
              Measures budget efficiency, procurement compliance, FUNDEB allocation, and public spending management (0% to 100%).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/20">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 mb-3">
              <CircleDollarSign size={20} />
            </div>
            <h4 className="text-sm font-bold text-amber-300 mb-1">💰 Municipal Budget</h4>
            <p className="text-xs text-white/70 leading-normal">
              Financial resources available to implement solutions, hire specialists, and answer judicial injunctions or court orders.
            </p>
          </div>
        </div>

        {/* Timer Rule */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/30 via-slate-900/40 to-blue-950/30 border border-cyan-500/30 space-y-3">
          <h4 className="text-sm font-bold text-cyan-300 flex items-center gap-2">
            <Clock className="text-cyan-400" size={18} />
            Timer Rules & Countdown Clock (90s)
          </h4>
          <p className="text-xs text-white/80 leading-relaxed">
            Each scenario card features a countdown timer simulating real management pressure. Standard time limit is <strong>90 seconds</strong> (120s on Easy, 90s on Medium, 60s on Hard).
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 pt-1 text-xs">
            <div className="p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-300 font-medium">
              🟢 <strong>&gt; 25s (Green):</strong> Safe time for legal analysis.
            </div>
            <div className="p-2.5 rounded-xl bg-yellow-950/30 border border-yellow-500/30 text-yellow-300 font-medium">
              🟡 <strong>25s to 16s (Yellow):</strong> Countdown warning with soft audio tick.
            </div>
            <div className="p-2.5 rounded-xl bg-orange-950/30 border border-orange-500/30 text-orange-300 font-medium">
              orange <strong>15s to 6s (Orange):</strong> Attention warning with faster ticks.
            </div>
            <div className="p-2.5 rounded-xl bg-red-950/30 border border-red-500/30 text-red-300 font-medium">
              🔴 <strong>5s to 0s (Red):</strong> Critical pulse and time-out alarm at 0s.
            </div>
          </div>
          <p className="text-xs text-cyan-200/80 italic">
            ⚡ <strong>Speed Bonus:</strong> Every remaining second upon answering grants +10 bonus XP!
          </p>
        </div>

        {/* Decision Cards Structure */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/30 via-slate-900/40 to-indigo-950/30 border border-purple-500/30 space-y-3">
          <h4 className="text-sm font-bold text-purple-300 flex items-center gap-2">
            <FileText className="text-purple-400" size={18} />
            How Decision Cards Work
          </h4>
          <p className="text-xs text-white/80 leading-relaxed">
            Every scenario presents <strong>3 Decision Option Cards</strong>. Selecting a card reveals the <strong>Debriefing / Feedback Card</strong> with:
          </p>
          <ul className="list-disc list-inside text-xs text-white/70 space-y-1 pl-2">
            <li><strong>Full Legal Grounding:</strong> Articles from LBI (13.146/15), LDB (9.394/96), FUNDEB (14.113/20), Federal Constitution, or LAI (12.527/11).</li>
            <li><strong>Pedagogical Analysis:</strong> Technical explanation of impacts on AEE students and teachers.</li>
            <li><strong>Metric Impact:</strong> Direct gain or loss in Quality, Fiscal Sustainability, and Budget.</li>
          </ul>
        </div>

        <div className="p-5 rounded-2xl bg-red-950/20 border border-red-500/30">
          <h4 className="text-sm font-bold text-red-300 flex items-center gap-2 mb-2">
            <AlertTriangle className="text-red-400" size={18} />
            Failure Conditions (Unviable Management)
          </h4>
          <ul className="list-disc list-inside text-xs sm:text-sm text-white/80 space-y-1.5">
            <li>If <strong>Inclusion Quality</strong> reaches 0% due to pedagogical neglect or human rights violations.</li>
            <li>If <strong>Fiscal Sustainability</strong> reaches 0% due to financial collapse or improper FUNDEB usage.</li>
            <li>If the <strong>Budget</strong> is completely depleted and you cannot fulfill mandatory requirements.</li>
          </ul>
        </div>
      </div>
    );
  }

  // Portuguese Default
  return (
    <div className="space-y-6">
      <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950/40 via-cyan-950/20 to-slate-900/40 border border-cyan-500/30">
        <h3 className="text-base font-bold text-cyan-300 flex items-center gap-2 mb-2">
          <ShieldCheck className="text-cyan-400" size={20} />
          Qual é o seu papel no jogo?
        </h3>
        <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
          Você assume o cargo de <strong>Gestor(a) Municipal de Educação Especial e Inclusiva</strong>. Sua missão é tomar decisões estratégicas para garantir o Atendimento Educacional Especializado (AEE), a acessibilidade física e pedagógica e o cumprimento da Lei Brasileira de Inclusão (LBI - Lei nº 13.146/2015) e da LDB (Lei nº 9.394/1996), mantendo o equilíbrio orçamentário e fiscal.
        </p>
      </div>

      {/* Medidores Principais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/20">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 mb-3">
            <CheckCircle2 size={20} />
          </div>
          <h4 className="text-sm font-bold text-cyan-300 mb-1">♿ Qualidade da Inclusão</h4>
          <p className="text-xs text-white/70 leading-normal">
            Mede a adequação pedagógica, formação docente, salas de AEE e o respeito aos direitos dos alunos com deficiência (0% a 100%).
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-teal-950/20 border border-teal-500/20">
          <div className="w-9 h-9 rounded-xl bg-teal-500/20 flex items-center justify-center text-teal-400 mb-3">
            <Scale size={20} />
          </div>
          <h4 className="text-sm font-bold text-teal-300 mb-1">💼 Sustentabilidade Fiscal</h4>
          <p className="text-xs text-white/70 leading-normal">
            Mede a eficiência do uso do orçamento, cumprimento de licitações, alocação do FUNDEB e gestão do gasto público (0% a 100%).
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/20">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 mb-3">
            <CircleDollarSign size={20} />
          </div>
          <h4 className="text-sm font-bold text-amber-300 mb-1">💰 Orçamento Municipal</h4>
          <p className="text-xs text-white/70 leading-normal">
            Recursos financeiros disponíveis para implementar soluções, contratar especialistas e atender urgências judiciais ou liminares.
          </p>
        </div>
      </div>

      {/* Regra do Temporizador */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/30 via-slate-900/40 to-blue-950/30 border border-cyan-500/30 space-y-3">
        <h4 className="text-sm font-bold text-cyan-300 flex items-center gap-2">
          <Clock className="text-cyan-400" size={18} />
          Regra de Contagem de Tempo e Relógio Contador (90s)
        </h4>
        <p className="text-xs text-white/80 leading-relaxed">
          Cada carta de cenário possui um tempo limite para simular a pressão real da tomada de decisão na gestão pública. O tempo padrão do jogo é de <strong>90 segundos</strong> (120s no Fácil, 90s no Médio, 60s no Difícil).
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 pt-1 text-xs">
          <div className="p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-300 font-medium">
            🟢 <strong>&gt; 25s (Verde):</strong> Tempo seguro para análise pedagógica e legal.
          </div>
          <div className="p-2.5 rounded-xl bg-yellow-950/30 border border-yellow-500/30 text-yellow-300 font-medium">
            🟡 <strong>25s a 16s (Amarelo):</strong> Início da contagem com som progressivo.
          </div>
          <div className="p-2.5 rounded-xl bg-orange-950/30 border border-orange-500/30 text-orange-300 font-medium">
            🟠 <strong>15s a 6s (Laranja):</strong> Alerta de atenção com bipes mais rápidos.
          </div>
          <div className="p-2.5 rounded-xl bg-red-950/30 border border-red-500/30 text-red-300 font-medium">
            🔴 <strong>5s a 0s (Vermelho):</strong> Alerta crítico com pulso e alarme sonoro aos 0s.
          </div>
        </div>
        <p className="text-xs text-cyan-200/80 italic">
          ⚡ <strong>Bônus de Velocidade:</strong> Cada segundo restante ao responder concede +10 XP de bônus!
        </p>
      </div>

      {/* Cartas de Decisão e Fundamentação */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/30 via-slate-900/40 to-indigo-950/30 border border-purple-500/30 space-y-3">
        <h4 className="text-sm font-bold text-purple-300 flex items-center gap-2">
          <FileText className="text-purple-400" size={18} />
          Estrutura e Funcionamento das Cartas de Decisão
        </h4>
        <p className="text-xs text-white/80 leading-relaxed">
          Cada dilema apresenta <strong>3 Cartas de Opção de Decisão</strong>. Ao selecionar uma alternativa, é exibido o <strong>Card de Feedback / Debriefing</strong> com:
        </p>
        <ul className="list-disc list-inside text-xs text-white/70 space-y-1 pl-2">
          <li><strong>Fundamentação Jurídica Completa:</strong> Dispositivos legais específicos da LBI (Lei nº 13.146/15), LDB (Lei nº 9.394/96), FUNDEB (Lei nº 14.113/20), Constituição Federal e Lei de Acessibilidade (Lei nº 10.098/00).</li>
          <li><strong>Análise Pedagógica e Operacional:</strong> Explicação técnica da solução para a rotina da escola e dos alunos de AEE.</li>
          <li><strong>Impacto nos Medidores:</strong> Alteração imediata na Qualidade da Inclusão, Sustentabilidade Fiscal e saldo do Orçamento Municipal.</li>
        </ul>
      </div>

      <div className="p-5 rounded-2xl bg-red-950/20 border border-red-500/30">
        <h4 className="text-sm font-bold text-red-300 flex items-center gap-2 mb-2">
          <AlertTriangle className="text-red-400" size={18} />
          Condições de Derrota (Gestão Inviável)
        </h4>
        <ul className="list-disc list-inside text-xs sm:text-sm text-white/80 space-y-1.5">
          <li>Se a <strong>Qualidade da Inclusão</strong> chegar a 0% por negligência pedagógica ou violação de direitos humanos.</li>
          <li>Se a <strong>Sustentabilidade Fiscal</strong> cair para 0% por colapso financeiro ou uso indevido do FUNDEB.</li>
          <li>Se o <strong>Orçamento</strong> zerar totalmente e você não puder cumprir exigências obrigatórias da lei.</li>
        </ul>
      </div>
    </div>
  );
}

/* =========================================================================
   TAB 2: MODULES & PHASES BREAKDOWN
   ========================================================================= */
function TabModules({ lang }: { lang: Language }) {
  const modulesData = {
    pt: [
      {
        id: 1,
        title: "Módulo 1: Fundamentos da Inclusão & Acessibilidade",
        icon: <School className="text-cyan-400" size={20} />,
        phases: [
          { name: "Fase 1: Acessibilidade Inicial", desc: "Infraestrutura física, rampas de acesso, sanitários adaptados, transporte escolar acessível." },
          { name: "Fase 2: Desenho Universal para Aprendizagem (DUA)", desc: "Materiais didáticos adaptados, recursos pedagógicos reutilizáveis, currículo inclusivo." },
          { name: "Fase 3: Parcerias & Ajuste Financeiro", desc: "Convênios estaduais/federais, captação suplementar de recursos, remanejamento licitatório." },
        ]
      },
      {
        id: 2,
        title: "Módulo 2: Urgências Judiciais, Pressões & Crises",
        icon: <Gavel className="text-amber-400" size={20} />,
        phases: [
          { name: "Fase 4: Urgências Judiciais", desc: "Liminares do Ministério Público, TACs (Termos de Ajustamento de Conduta), fornecimento urgente de CAA." },
          { name: "Fase 5: Pressões Políticas", desc: "Relacionamento com a Câmara de Vereadores, Conselho Municipal de Educação, denúncias na imprensa." },
          { name: "Fase 6: Crise de Caixa", desc: "Contingenciamento do FUNDEB, atraso de repasses federais, repriorização de contratos." },
        ]
      },
      {
        id: 3,
        title: "Módulo 3: Tecnologia Assistiva, Formação & Políticas Públicas",
        icon: <Tablet className="text-purple-400" size={20} />,
        phases: [
          { name: "Fase 7: Estratégia e Tecnologia Assistiva (TA)", desc: "Softwares de Comunicação Alternativa (CAA), pranchas digitais, Salas de Recursos SRM Tipo 2." },
          { name: "Fase 8: Capacitação & Formação Docente", desc: "Especialização em AEE para professores, concursos públicos vs contratos temporários, intérpretes de LIBRAS." },
          { name: "Fase 9: Políticas Públicas & Planos Decenais", desc: "Plano Municipal de Educação (PME), metas do INEP/MEC, diagnóstico do Índice de Inclusão." },
        ]
      },
      {
        id: 4,
        title: "Módulo 4: Governança Avançada & Desafios Interfederativos",
        icon: <Map className="text-emerald-400" size={20} />,
        phases: [
          { name: "Fase 10: Desafios Interfederativos", desc: "Consórcios intermunicipais de inclusão, Piso Nacional do Magistério, auditoria de IA no Tribunal de Contas." },
        ]
      }
    ],
    en: [
      {
        id: 1,
        title: "Module 1: Foundations of Inclusion & Accessibility",
        icon: <School className="text-cyan-400" size={20} />,
        phases: [
          { name: "Phase 1: Initial Accessibility", desc: "Physical infrastructure, access ramps, accessible restrooms, adapted school transport." },
          { name: "Phase 2: Universal Design for Learning (UDL)", desc: "Adapted teaching materials, reusable pedagogical resources, inclusive curriculum." },
          { name: "Phase 3: Partnerships & Financial Adjustment", desc: "State/Federal agreements, supplementary funding, procurement reallocation." },
        ]
      },
      {
        id: 2,
        title: "Module 2: Judicial Urgencies, Pressures & Crises",
        icon: <Gavel className="text-amber-400" size={20} />,
        phases: [
          { name: "Phase 4: Judicial Injunctions", desc: "Prosecutor court orders, Conduct Adjustment Agreements (TACs), urgent AAC supply." },
          { name: "Phase 5: Political Pressures", desc: "Relationship with City Council, Municipal Education Board, media inquiries." },
          { name: "Phase 6: Cash Flow Crisis", desc: "FUNDEB budget freezes, delayed federal transfers, essential contract prioritization." },
        ]
      },
      {
        id: 3,
        title: "Module 3: Assistive Technology, Training & Public Policy",
        icon: <Tablet className="text-purple-400" size={20} />,
        phases: [
          { name: "Phase 7: Strategy and Assistive Tech (AT)", desc: "Augmentative Communication (AAC) software, digital boards, Type 2 AEE Resource Rooms." },
          { name: "Phase 8: Teacher Training & Qualification", desc: "AEE specialization for teachers, civil service exams vs temporary contracts, LIBRAS interpreters." },
          { name: "Phase 9: Public Policies & Ten-Year Plans", desc: "Municipal Education Plan (PME), INEP/MEC goals, Inclusion Index diagnosis." },
        ]
      },
      {
        id: 4,
        title: "Module 4: Advanced Governance & Interfederal Challenges",
        icon: <Map className="text-emerald-400" size={20} />,
        phases: [
          { name: "Phase 10: Interfederal Challenges", desc: "Inter-municipal inclusion consortia, National Teachers' Minimum Wage, AI audit by Court of Accounts." },
        ]
      }
    ],
    es: [
      {
        id: 1,
        title: "Módulo 1: Fundamentos de Inclusión y Accesibilidad",
        icon: <School className="text-cyan-400" size={20} />,
        phases: [
          { name: "Fase 1: Accesibilidad Inicial", desc: "Infraestructura física, rampas de acceso, baños adaptados, transporte escolar accesible." },
          { name: "Fase 2: Diseño Universal para el Aprendizaje (DUA)", desc: "Materiales didácticos adaptados, recursos pedagógicos reutilizables, currículo inclusivo." },
          { name: "Fase 3: Alianzas y Ajuste Financiero", desc: "Convenios estatales/federales, captación suplementaria de recursos, reasignación licitatoria." },
        ]
      },
      {
        id: 2,
        title: "Módulo 2: Urgencias Judiciales, Presiones y Crisis",
        icon: <Gavel className="text-amber-400" size={20} />,
        phases: [
          { name: "Fase 4: Urgencias Judiciales", desc: "Medidas cautelares del Ministerio Público, convenios de ajuste (TAC), suministro urgente de CAA." },
          { name: "Fase 5: Presiones Políticas", desc: "Relación con el Consejo Municipal, Consejo de Educación, denuncias en medios de prensa." },
          { name: "Fase 6: Crisis de Caja", desc: "Congelamiento del FUNDEB, retrasos de giros federales, repriorización de contratos." },
        ]
      },
      {
        id: 3,
        title: "Módulo 3: Tecnología Asistiva, Formación y Políticas Públicas",
        icon: <Tablet className="text-purple-400" size={20} />,
        phases: [
          { name: "Fase 7: Estrategia y Tecnología Asistiva (TA)", desc: "Software de Comunicación Aumentativa (CAA), tableros digitales, Aulas AEE Tipo 2." },
          { name: "Fase 8: Capacitación y Formación Docente", desc: "Especialización en AEE para docentes, oposiciones públicas vs contratos temporales, intérpretes LIBRAS." },
          { name: "Fase 9: Políticas Públicas y Planes Decenales", desc: "Plan Municipal de Educación (PME), metas INEP/MEC, diagnóstico del Índice de Inclusión." },
        ]
      },
      {
        id: 4,
        title: "Módulo 4: Gobernanza Avanzada y Desafíos Interfederativos",
        icon: <Map className="text-emerald-400" size={20} />,
        phases: [
          { name: "Fase 10: Desafíos Interfederativos", desc: "Consorcios intermunicipales de inclusión, Salario Mínimo Magisterial, auditoría de IA en Tribunal de Cuentas." },
        ]
      }
    ]
  };

  const list = modulesData[lang] || modulesData.pt;

  return (
    <div className="space-y-6">
      {list.map((mod) => (
        <div key={mod.id} className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-cyan-500/30 transition-all space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
              {mod.icon}
            </div>
            <h3 className="text-base font-bold text-white tracking-wide">
              {mod.title}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
            {mod.phases.map((ph, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-[#080d1a] border border-white/5 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                    {ph.name}
                  </span>
                  <p className="text-xs text-white/70 leading-relaxed">
                    {ph.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* =========================================================================
   TAB 3: SCORING, MULTIPLIERS & COMBOS
   ========================================================================= */
function TabScoring({ lang }: { lang: Language }) {
  if (lang === "es") {
    return (
      <div className="space-y-6">
        <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/30 via-cyan-950/20 to-slate-900/40 border border-amber-500/30">
          <h3 className="text-base font-bold text-amber-300 flex items-center gap-2 mb-2">
            <Zap className="text-amber-400" size={20} />
            ¿Cómo se calcula la puntuación?
          </h3>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
            Cada decisión acertada otorga puntos de XP base. La puntuación final de cada elección se calcula multiplicando los puntos base por la <strong>dificultad del juego</strong>, la <strong>velocidad de respuesta</strong> y el <strong>multiplicador de Combo acumulado</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
            <h4 className="text-sm font-bold text-cyan-300 flex items-center gap-2">
              <Clock size={16} className="text-cyan-400" />
              Multiplicadores de Dificultad & Tiempo
            </h4>
            <ul className="text-xs text-white/70 space-y-2 leading-relaxed">
              <li>🟢 <strong>Fácil (40s):</strong> Multiplicador 1.0x. Ideal para aprender la legislación.</li>
              <li>🟡 <strong>Medio (30s):</strong> Multiplicador 1.5x. Equilibrio entre tiempo e impacto.</li>
              <li>🔴 <strong>Difícil (20s):</strong> Multiplicador 2.0x. Alta presión y máxima recompensa.</li>
              <li>⚡ <strong>Bonificación por Velocidad:</strong> +10 XP por cada segundo restante en el temporizador al responder.</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
            <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
              <Zap size={16} className="text-amber-400" />
              Sistema de Combos de Respuestas
            </h4>
            <ul className="text-xs text-white/70 space-y-2 leading-relaxed">
              <li>🔥 <strong>Combo x1:</strong> 1ª respuesta Estratégica.</li>
              <li>🔥 <strong>Combo x2:</strong> 2ª respuesta consecutiva (+50% puntos extra).</li>
              <li>🔥 <strong>Combo x3:</strong> 3ª respuesta consecutiva (+100% puntos extra).</li>
              <li>💥 <strong>Combo x5 MAX:</strong> ¡Respuestas consecutivas impecables otorgan hasta 3.0x multiplicador final!</li>
              <li>⚠️ <strong>Atención:</strong> Una respuesta imprudente o perjudicial reseta el combo a 0.</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  if (lang === "en") {
    return (
      <div className="space-y-6">
        <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/30 via-cyan-950/20 to-slate-900/40 border border-amber-500/30">
          <h3 className="text-base font-bold text-amber-300 flex items-center gap-2 mb-2">
            <Zap className="text-amber-400" size={20} />
            How is your Score calculated?
          </h3>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
            Every strategic decision awards base XP points. The final score for each choice is calculated by multiplying the base points by the <strong>game difficulty</strong>, <strong>response speed</strong>, and the <strong>accumulated Combo multiplier</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
            <h4 className="text-sm font-bold text-cyan-300 flex items-center gap-2">
              <Clock size={16} className="text-cyan-400" />
              Difficulty & Speed Multipliers
            </h4>
            <ul className="text-xs text-white/70 space-y-2 leading-relaxed">
              <li>🟢 <strong>Easy (40s):</strong> 1.0x multiplier. Ideal for learning legislation.</li>
              <li>🟡 <strong>Medium (30s):</strong> 1.5x multiplier. Balanced time and impact.</li>
              <li>🔴 <strong>Hard (20s):</strong> 2.0x multiplier. High pressure and maximum reward.</li>
              <li>⚡ <strong>Speed Bonus:</strong> +10 XP for every remaining second on the timer.</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
            <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
              <Zap size={16} className="text-amber-400" />
              Response Combo Streak System
            </h4>
            <ul className="text-xs text-white/70 space-y-2 leading-relaxed">
              <li>🔥 <strong>Combo x1:</strong> 1st Strategic answer.</li>
              <li>🔥 <strong>Combo x2:</strong> 2nd consecutive answer (+50% extra score).</li>
              <li>🔥 <strong>Combo x3:</strong> 3rd consecutive answer (+100% extra score).</li>
              <li>💥 <strong>Combo x5 MAX:</strong> Flawless streak grants up to 3.0x final multiplier!</li>
              <li>⚠️ <strong>Warning:</strong> An unwise or harmful decision resets the combo streak to 0.</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // Portuguese Default
  return (
    <div className="space-y-6">
      <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/30 via-cyan-950/20 to-slate-900/40 border border-amber-500/30">
        <h3 className="text-base font-bold text-amber-300 flex items-center gap-2 mb-2">
          <Zap className="text-amber-400" size={20} />
          Como é calculada a sua Pontuação?
        </h3>
        <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
          Cada decisão acertada concede pontos de XP base. A pontuação final de cada escolha é calculada multiplicando os pontos base pela <strong>dificuldade do jogo</strong>, a <strong>velocidade de resposta</strong> e o <strong>multiplicador de Combo acumulado</strong>.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
          <h4 className="text-sm font-bold text-cyan-300 flex items-center gap-2">
            <Clock size={16} className="text-cyan-400" />
            Multiplicadores de Dificuldade & Tempo
          </h4>
          <ul className="text-xs text-white/70 space-y-2 leading-relaxed">
            <li>🟢 <strong>Fácil (40s):</strong> Multiplicador 1.0x. Ideal para aprender a legislação.</li>
            <li>🟡 <strong>Médio (30s):</strong> Multiplicador 1.5x. Equilíbrio entre tempo e impacto.</li>
            <li>🔴 <strong>Difícil (20s):</strong> Multiplicador 2.0x. Alta pressão e máxima recompensa.</li>
            <li>⚡ <strong>Bônus de Velocidade:</strong> +10 XP por cada segundo restante no cronômetro ao responder.</li>
          </ul>
        </div>

        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
          <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
            <Zap size={16} className="text-amber-400" />
            Sistema de Combos de Respuestas
          </h4>
          <ul className="text-xs text-white/70 space-y-2 leading-relaxed">
            <li>🔥 <strong>Combo x1:</strong> 1ª resposta Estratégica.</li>
            <li>🔥 <strong>Combo x2:</strong> 2ª resposta consecutiva (+50% pontos extras).</li>
            <li>🔥 <strong>Combo x3:</strong> 3ª resposta consecutiva (+100% pontos extras).</li>
            <li>💥 <strong>Combo x5 MAX:</strong> Respostas consecutivas impecáveis concedem até 3.0x multiplicador final!</li>
            <li>⚠️ <strong>Atenção:</strong> Uma resposta imprudente ou prejudicial reseta o combo para 0.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   TAB 4: DECISION TYPES & LEGAL IMPACT
   ========================================================================= */
function TabDecisions({ lang }: { lang: Language }) {
  const decisions = [
    {
      type: lang === "es" ? "Excelente / Estratégico" : lang === "en" ? "Excellent / Strategic" : "Excelente / Estratégico",
      color: "border-emerald-500/40 bg-emerald-950/20 text-emerald-300",
      icon: <CheckCircle2 className="text-emerald-400" size={18} />,
      desc: lang === "es"
        ? "Solución ideal basada en la LBI (Ley nº 13.146/2015) y LDB. Aumenta la Calidad y Sostenibilidad Fiscal manteniendo el costo presupuestario optimizado."
        : lang === "en"
        ? "Ideal solution based on LBI (Law 13,146/2015) and LDB. Boosts Quality and Fiscal Sustainability while optimizing budget cost."
        : "Solução ideal baseada na LBI (Lei nº 13.146/2015) e LDB. Aumenta a Qualidade e Sustentabilidade Fiscal mantendo o custo orçamentário otimizado."
    },
    {
      type: lang === "es" ? "Bueno / Prudente" : lang === "en" ? "Good / Prudent" : "Bom / Prudente",
      color: "border-cyan-500/40 bg-cyan-950/20 text-cyan-300",
      icon: <Check className="text-cyan-400" size={18} />,
      desc: lang === "es"
        ? "Elección sólida con bajo riesgo. Garantiza ganancias reales en inclusión con una inversión razonable del FUNDEB."
        : lang === "en"
        ? "Solid low-risk choice. Guarantees real gains in inclusion with a reasonable FUNDEB investment."
        : "Escolha sólida com baixo risco. Garante ganhos reais na inclusão com um investimento razoável do FUNDEB."
    },
    {
      type: lang === "es" ? "Regular / Pasable" : lang === "en" ? "Fair / Acceptable" : "Regular / Passável",
      color: "border-amber-500/40 bg-amber-950/20 text-amber-300",
      icon: <AlertTriangle className="text-amber-400" size={18} />,
      desc: lang === "es"
        ? "Medida paliativa de corto plazo. Resuelve la urgencia momentánea, pero puede generar cuellos de botella contractuales o sobrecarga docente."
        : lang === "en"
        ? "Short-term palliative measure. Solves immediate urgency but may create contractual bottlenecks or teacher overload."
        : "Medida paliativa de curto prazo. Resolve a urgência momentânea, mas pode gerar gargalos contratuais ou sobrecarga nos docentes."
    },
    {
      type: "Arriscado / Ruim",
      color: "border-orange-500/40 bg-orange-950/20 text-orange-300",
      icon: <AlertTriangle className="text-orange-400" size={18} />,
      desc: lang === "es"
        ? "Decisión que compromete la Sostenibilidad Fiscal o trae fricción legal. Puede sufrir impugnación del Ministerio Público."
        : lang === "en"
        ? "Decision that compromises Fiscal Sustainability or triggers legal friction. Subject to Public Prosecutor challenge."
        : "Decisão que compromete a Sustentabilidade Fiscal ou traz atrito legal. Pode sofrer contestação do Ministério Público."
    },
    {
      type: lang === "es" ? "Pésimo / Ilegal" : lang === "en" ? "Critical / Illegal" : "Péssimo / Ilegal",
      color: "border-red-500/40 bg-red-950/20 text-red-300",
      icon: <X className="text-red-400" size={18} />,
      desc: lang === "es"
        ? "Viola artículos fundamentales de la LBI y LDB. Genera severas pérdidas de indicadores, riesgo de impropiedad administrativa y bloqueo de cuentas."
        : lang === "en"
        ? "Violates fundamental articles of LBI and LDB. Causes severe metric drops, risk of administrative misconduct, and frozen accounts."
        : "Viola artigos fundamentais da LBI e LDB. Gera severas perdas de indicadores, risco de improbidade administrativa e bloqueio de contas."
    }
  ];

  return (
    <div className="space-y-6">
      {/* Box explicativo detalhado das Cartas */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-blue-950/20 to-slate-900/40 border border-cyan-500/30 space-y-3">
        <h3 className="text-base font-bold text-cyan-300 flex items-center gap-2">
          <Layers className="text-cyan-400" size={20} />
          {lang === "es"
            ? "Análisis Detallado de las Cartas de Decisión"
            : lang === "en"
            ? "Detailed Analysis of Decision Cards"
            : "Análise Detalhada das Cartas de Decisão"}
        </h3>
        <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
          {lang === "es"
            ? "Cada dilema en el juego se compone de 3 Cartas de Opción de Decisión. Las cartas simulan decisiones del mundo real que un gestor público de educación especial debe enfrentar cotidianamente."
            : lang === "en"
            ? "Each scenario dilemma presents 3 Decision Option Cards. The cards simulate real-world choices that a special education public manager encounters daily."
            : "Cada dilema do jogo é composto por 3 Cartas de Opção de Decisão. As cartas simulam escolhas do mundo real que um gestor público de educação especial enfrenta cotidianamente."}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-1.5">
            <h4 className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
              <FileText size={14} className="text-cyan-400" />
              {lang === "es" ? "Estructura de la Carta" : lang === "en" ? "Card Structure" : "Estrutura da Carta"}
            </h4>
            <p className="text-xs text-white/70 leading-relaxed">
              {lang === "es"
                ? "Presenta el título de la medida, descripción de la acción, costo presupuestario estimado y el nivel de riesgo asociado."
                : lang === "en"
                ? "Displays the measure title, action description, estimated budget cost, and associated risk level."
                : "Exibe o título da medida, descrição da ação, custo orçamentário estimado e o nível de risco associado."}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-1.5">
            <h4 className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
              <Gavel size={14} className="text-amber-400" />
              {lang === "es" ? "Debriefing y Base Legal" : lang === "en" ? "Debriefing & Legal Grounding" : "Debriefing & Base Legal"}
            </h4>
            <p className="text-xs text-white/70 leading-relaxed">
              {lang === "es"
                ? "Al seleccionar una opción, se revela la fundamentación basada en la LBI (Ley 13.146/15), LDB (Ley 9.394/96) y FUNDEB (Ley 14.113/20)."
                : lang === "en"
                ? "Selecting an option reveals grounding based on LBI (Law 13,146/15), LDB (Law 9,394/96), and FUNDEB (Law 14,113/20)."
                : "Ao selecionar uma opção, é revelada a fundamentação baseada na LBI (Lei 13.146/15), LDB (Lei 9.394/96) e FUNDEB (Lei 14.113/20)."}
            </p>
          </div>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
        {lang === "es"
          ? "Clasificación de las opciones según su impacto legal y presupuestario:"
          : lang === "en"
          ? "Option classification according to legal and fiscal impact:"
          : "Classificação das opções segundo seu impacto legal e orçamentário:"}
      </p>

      <div className="grid grid-cols-1 gap-3">
        {decisions.map((item, idx) => (
          <div key={idx} className={`p-4 rounded-2xl border ${item.color} flex items-start gap-3 transition-all`}>
            <div className="p-2 rounded-xl bg-white/5 border border-white/10 shrink-0 mt-0.5">
              {item.icon}
            </div>
            <div>
              <h4 className="text-sm font-bold tracking-wide uppercase mb-1">
                {item.type}
              </h4>
              <p className="text-xs text-white/80 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================================
   TAB 5: ACHIEVEMENTS GUIDE
   ========================================================================= */
function TabAchievements({ lang }: { lang: Language }) {
  const achList = [
    {
      title: lang === "es" ? "Especialista en Inclusión" : lang === "en" ? "Inclusion Specialist" : "Especialista em Inclusão",
      desc: lang === "es" ? "Completar el Módulo 1 (Fundamentos de Inclusión)." : lang === "en" ? "Complete Module 1 (Foundations of Inclusion)." : "Concluir o Módulo 1 (Fundamentos da Inclusão).",
      icon: <School className="text-cyan-400" size={22} />,
      tag: "Módulo 1"
    },
    {
      title: lang === "es" ? "Gestor de Crisis" : lang === "en" ? "Crisis Manager" : "Gestor de Crises",
      desc: lang === "es" ? "Completar el Módulo 2 (Superar urgencias judiciales y de caja)." : lang === "en" ? "Complete Module 2 (Overcome judicial and cash crises)." : "Concluir o Módulo 2 (Superar urgências judiciais e fiscais).",
      icon: <Gavel className="text-amber-400" size={22} />,
      tag: "Módulo 2"
    },
    {
      title: lang === "es" ? "Maestro en Políticas Públicas" : lang === "en" ? "Public Policy Master" : "Mestre em Políticas Públicas",
      desc: lang === "es" ? "Completar el Módulo 3 (Tecnología asistiva y formación)." : lang === "en" ? "Complete Module 3 (Assistive technology and training)." : "Concluir o Módulo 3 (Tecnologia assistiva e formação).",
      icon: <Tablet className="text-purple-400" size={22} />,
      tag: "Módulo 3"
    },
    {
      title: lang === "es" ? "Líder Nacional" : lang === "en" ? "National Leader" : "Líder Nacional",
      desc: lang === "es" ? "Completar el Módulo 4 y liderar la gestión pública." : lang === "en" ? "Complete Module 4 and lead public management." : "Concluir o Módulo 4 e liderar a gestão pública.",
      icon: <Map className="text-emerald-400" size={22} />,
      tag: "Módulo 4"
    },
    {
      title: lang === "es" ? "Ejecución Impecable" : lang === "en" ? "Flawless Execution" : "Execução Impecável",
      desc: lang === "es" ? "Completar una fase con 100% de Calidad y Sostenibilidad." : lang === "en" ? "Finish a phase with 100% Quality & Sustainability." : "Finalizar uma fase com 100% de Qualidade e Sustentabilidade.",
      icon: <Zap className="text-yellow-400" size={22} />,
      tag: "Especial"
    },
    {
      title: lang === "es" ? "Maestro del Conocimiento" : lang === "en" ? "Knowledge Master" : "Mestre do Conhecimento",
      desc: lang === "es" ? "Completar todos los cuestionarios teóricos en Aprender." : lang === "en" ? "Complete all theoretical quizzes in Learn." : "Concluir todos os quizzes teóricos na aba Aprender.",
      icon: <Brain className="text-pink-400" size={22} />,
      tag: "Teoria"
    }
  ];

  return (
    <div className="space-y-4">
      <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
        {lang === "es"
          ? "Desbloquea trofeos exclusivos durante tu jornada como gestor. Las conquistas quedan registradas en tu perfil e influencian tu ranking global:"
          : lang === "en"
          ? "Unlock exclusive trophies throughout your journey as a manager. Achievements are saved to your profile and boost your global ranking:"
          : "Desbloqueie troféus exclusivos durante sua jornada como gestor. As conquistas ficam salvas no seu perfil e influenciam seu ranking global:"}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {achList.map((ach, idx) => (
          <div key={idx} className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-cyan-500/30 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:scale-105 transition-all">
                  {ach.icon}
                </div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-2 py-0.5 rounded-md">
                  {ach.tag}
                </span>
              </div>
              <h4 className="text-sm font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                {ach.title}
              </h4>
              <p className="text-xs text-white/60 leading-relaxed">
                {ach.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
