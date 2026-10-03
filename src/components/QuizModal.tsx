import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import { Language, LearningTrack, Quiz, QuizOption } from "../types";
import { useSound } from "../hooks/useSound";

interface QuizModalProps {
  track: LearningTrack;
  quizzes: Quiz[];
  options: Record<string, QuizOption[]>;
  onClose: () => void;
  onComplete?: () => void;
  lang?: Language;
}

export function QuizModal({ track, quizzes, options, onClose, onComplete, lang = "pt" }: QuizModalProps) {
  const { playClick, playTick } = useSound();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<QuizOption | null>(null);
  
  if (!quizzes || quizzes.length === 0) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
          className="bg-[#0B1120] border border-white/10 rounded-2xl p-6 max-w-md w-full relative"
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
          <div className="text-center">
            <h3 className="text-lg font-bold text-slate-100 mb-2">
              {lang === "pt" ? "Quiz Indisponível" : lang === "es" ? "Quiz No Disponible" : "Quiz Unavailable"}
            </h3>
            <p className="text-sm text-slate-400">
              {lang === "pt"
                ? "Nenhum quiz encontrado para este módulo ainda."
                : lang === "es"
                ? "Ningún quiz encontrado para este módulo aún."
                : "No quiz found for this module yet."}
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  const currentQuiz = quizzes[currentIndex];
  const currentOptions = options[currentQuiz.id] || [];

  const handleOptionSelect = (option: QuizOption) => {
    if (selectedOption) return; // Prevent changing answer
    playTick();
    setSelectedOption(option);
  };

  const handleNext = () => {
    playClick();
    if (currentIndex < quizzes.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
    } else {
      if (onComplete) {
        onComplete();
      }
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }} 
        animate={{ opacity: 1, scale: 1, y: 0 }} 
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-[#0B1120] sm:bg-[#111827]/90 sm:backdrop-blur-xl border-t sm:border border-white/10 rounded-t-2xl sm:rounded-2xl p-6 md:p-8 max-w-2xl w-full h-[92vh] sm:h-[85vh] sm:max-h-[750px] relative shadow-2xl overflow-hidden flex flex-col"
      >
        <button onClick={onClose} className="absolute top-5 right-5 text-slate-400 hover:text-white transition-colors z-20 bg-black/20 rounded-full p-1">
          <X className="w-5 h-5" />
        </button>

        {/* Progress */}
        <div className="flex items-center gap-4 mb-6 pt-2">
          <div className="text-xs font-bold text-slate-400 tracking-wider">
            {currentIndex + 1} / {quizzes.length}
          </div>
          <div className="flex-1 h-1.5 bg-black/40 rounded-full overflow-hidden border border-white/5">
            <motion.div 
              className="h-full bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.5)]"
              initial={{ width: 0 }}
              animate={{ width: `${((currentIndex + 1) / quizzes.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400 mb-2 block">{track.title}</span>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 leading-relaxed">
            {currentQuiz.question_text}
          </h2>
        </div>

        {/* Options */}
        <div className={`flex flex-col gap-3 flex-1 overflow-y-auto pr-2 ${selectedOption ? 'pb-64 sm:pb-2' : 'pb-6'}`}>
          {currentOptions.map((opt) => {
            const isSelected = selectedOption?.id === opt.id;
            const isAnswered = selectedOption !== null;
            
            let buttonClasses = "bg-white/5 border-white/10 hover:bg-white/10 text-slate-300 hover:text-white";
            let glow = "";

            if (isAnswered) {
              if (opt.is_correct) {
                buttonClasses = "bg-green-500/10 border-green-500 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.3)]";
              } else if (isSelected && !opt.is_correct) {
                buttonClasses = "bg-red-500/10 border-red-500 text-red-400";
              } else {
                buttonClasses = "bg-white/5 border-white/10 opacity-50";
              }
            }

            return (
              <button
                key={opt.id}
                disabled={isAnswered}
                onClick={() => handleOptionSelect(opt)}
                className={`relative p-4 rounded-xl border flex items-center gap-4 text-left transition-all duration-300 ${buttonClasses}`}
              >
                <div className="flex-1 text-sm md:text-base font-medium">{opt.option_text}</div>
                {isAnswered && opt.is_correct && <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />}
                {isAnswered && isSelected && !opt.is_correct && <XCircle className="w-5 h-5 text-red-400 shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Explanation Panel */}
        <AnimatePresence>
          {selectedOption && (
            <motion.div
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 1, y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute bottom-0 left-0 right-0 p-6 bg-[#0B1120] border-t border-white/10 rounded-t-2xl z-30 shadow-[0_-10px_30px_rgba(0,0,0,0.6)] sm:relative sm:bottom-auto sm:left-auto sm:right-auto sm:p-4 sm:bg-[#111827]/60 sm:border sm:rounded-xl sm:mt-6 sm:shadow-none"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold uppercase tracking-wider ${selectedOption.is_correct ? 'text-green-400' : 'text-red-400'}`}>
                    {selectedOption.is_correct 
                      ? (lang === "pt" ? "Correto!" : lang === "es" ? "¡Correcto!" : "Correct!")
                      : (lang === "pt" ? "Incorreto" : lang === "es" ? "Incorrecto" : "Incorrect")}
                  </span>
                  <span className="text-[10px] text-slate-500 bg-white/5 px-2 py-0.5 rounded-full">
                    {lang === "pt" ? "Justificativa" : lang === "es" ? "Justificación" : "Explanation"}
                  </span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {currentQuiz.explanation}
                </p>
                <div className="flex justify-between items-center mt-3 pt-3 border-t border-white/10">
                  <span className="text-xs font-bold text-amber-400">+{currentQuiz.xp_reward} XP</span>
                  <button 
                    onClick={handleNext}
                    className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-slate-950 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-lg shadow-cyan-500/25"
                  >
                    {currentIndex < quizzes.length - 1
                      ? (lang === "pt" ? "Próxima" : lang === "es" ? "Siguiente" : "Next")
                      : (lang === "pt" ? "Finalizar" : lang === "es" ? "Finalizar" : "Finish")}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
