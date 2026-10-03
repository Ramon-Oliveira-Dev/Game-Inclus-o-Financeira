/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { SplashScreen } from "./components/SplashScreen";
import { StartScreen } from "./components/StartScreen";
import { LearningDashboard } from "./components/LearningDashboard";
import { GameScreen } from "./components/GameScreen";
import { RankingScreen } from "./components/RankingScreen";
import { ResultScreen } from "./components/ResultScreen";
import { ProfileScreen } from "./components/ProfileScreen";
import { GlobalDrawer } from "./components/GlobalDrawer";
import { GameManualModal } from "./components/GameManualModal";
import { AuthScreen } from "./components/AuthScreen";
import { Layout, TabState } from "./components/Layout";
import { GlobalBackground } from "./components/GlobalBackground";
import { GameState, Language } from "./types";
import { getPhases } from "./data";
import { t } from "./locales";
import { BookOpen } from "lucide-react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { PWAProvider } from "./contexts/PWAContext";
import { PWAInstallModal } from "./components/PWAInstallModal";
import { AdminModal } from "./components/AdminModal";
import { motion, AnimatePresence } from "framer-motion";
import { syncProgressToSupabase } from "./lib/syncService";

type ScreenState = "splash" | "auth" | "main" | "ranking" | "result";

function AppContent() {
  const { profile } = useAuth();
  const [screen, setScreen] = useState<ScreenState>("splash");

  const [currentTab, setCurrentTab] = useState<TabState>(() => {
    try {
      const activeLocal = localStorage.getItem("local_profile_active");
      if (activeLocal) {
        const parsedProfile = JSON.parse(activeLocal);
        const saved = localStorage.getItem(`game_state_data_${parsedProfile.id}`);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.currentTab) return parsed.currentTab;
        }
      }
    } catch (e) {}
    return "home";
  });

  const [lang, setLang] = useState<Language>(() => {
    try {
      const activeLocal = localStorage.getItem("local_profile_active");
      if (activeLocal) {
        const parsedProfile = JSON.parse(activeLocal);
        const saved = localStorage.getItem(`game_state_data_${parsedProfile.id}`);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.lang) return parsed.lang;
        }
      }
    } catch (e) {}
    return "pt";
  });

  const [gameState, setGameState] = useState<GameState>(() => {
    try {
      const activeLocal = localStorage.getItem("local_profile_active");
      if (activeLocal) {
        const parsedProfile = JSON.parse(activeLocal);
        const saved = localStorage.getItem(`game_state_data_${parsedProfile.id}`);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.gameState) {
            return {
              ...parsed.gameState,
              decisionHistory: parsed.gameState.decisionHistory || [],
              activeTriggers: parsed.gameState.activeTriggers || [],
              isPausedForEvent: parsed.gameState.isPausedForEvent || false,
              needsSync: parsed.gameState.needsSync || false,
            };
          }
        }
      }
    } catch (e) {}
    return {
      ph: 0,
      sc: 0,
      score: 0,
      qual: 70,
      sust: 60,
      budget: 500,
      combo: 0,
      maxCombo: 0,
      rights: 0,
      fast: 0,
      answered: false,
      timerSec: 90,
      diff: "medio",
      player: "Gestor(a)",
      lang: "pt",
      unlockedAchievements: [],
      decisionHistory: [],
      activeTriggers: [],
      isPausedForEvent: false,
      needsSync: false,
    };
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPWAOpen, setIsPWAOpen] = useState(false);
  const [isManualOpen, setIsManualOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [showGuestNotice, setShowGuestNotice] = useState(false);

  const [syncStatus, setSyncStatus] = useState<"synced" | "error" | "syncing">("synced");

  const serializedState = JSON.stringify(gameState);

  // Re-registra event listeners globais para abertura de menus (Menu Hamburguer, PWA, Manual, Admin)
  React.useEffect(() => {
    const handleOpenSettings = () => setIsMenuOpen(true);
    const handleOpenPWA = () => setIsPWAOpen(true);
    const handleOpenManual = () => setIsManualOpen(true);
    const handleOpenAdmin = () => setIsAdminOpen(true);
    document.addEventListener('open-settings', handleOpenSettings);
    document.addEventListener('open-pwa', handleOpenPWA);
    document.addEventListener('open-manual', handleOpenManual);
    document.addEventListener('open-admin', handleOpenAdmin);
    return () => {
      document.removeEventListener('open-settings', handleOpenSettings);
      document.removeEventListener('open-pwa', handleOpenPWA);
      document.removeEventListener('open-manual', handleOpenManual);
      document.removeEventListener('open-admin', handleOpenAdmin);
    };
  }, []);

  const loadedProfileIdRef = React.useRef<string | null>(null);

  // 1. Efeito para CARREGAR / ZERAR o progresso ao alternar o perfil logado
  React.useEffect(() => {
    if (!profile) {
      // Quando não há perfil logado (página de login ou splash), reseta estado para 100% zerado
      loadedProfileIdRef.current = null;
      setGameState({
        ph: 0,
        sc: 0,
        score: 0,
        qual: 70,
        sust: 60,
        budget: getPhases(lang)[0]?.budget || 500,
        combo: 0,
        maxCombo: 0,
        rights: 0,
        fast: 0,
        answered: false,
        timerSec: 90,
        diff: "medio",
        player: "Gestor(a)",
        lang: lang,
        unlockedAchievements: [],
        decisionHistory: [],
        activeTriggers: [],
        isPausedForEvent: false,
        needsSync: false,
      });
      setCurrentTab("home");
      return;
    }

    const currentProfileId = profile.id;
    if (loadedProfileIdRef.current !== currentProfileId) {
      loadedProfileIdRef.current = currentProfileId;
      const key = `game_state_data_${currentProfileId}`;
      const saved = localStorage.getItem(key);

      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.gameState) {
            setGameState({
              ...parsed.gameState,
              player: profile?.nome || parsed.gameState.player || "Gestor(a)",
              decisionHistory: parsed.gameState.decisionHistory || [],
              activeTriggers: parsed.gameState.activeTriggers || [],
              isPausedForEvent: parsed.gameState.isPausedForEvent || false,
              needsSync: parsed.gameState.needsSync || false,
            });
            if (parsed.currentTab) setCurrentTab(parsed.currentTab);
            return;
          }
        } catch (e) {}
      }

      // Se não houver estado salvo para este novo gestor/convidado, inicializa o jogo 100% ZERADO
      setGameState({
        ph: 0,
        sc: 0,
        score: 0,
        qual: 70,
        sust: 60,
        budget: getPhases(lang)[0]?.budget || 500,
        combo: 0,
        maxCombo: 0,
        rights: 0,
        fast: 0,
        answered: false,
        timerSec: 90,
        diff: "medio",
        player: profile?.nome || "Gestor(a)",
        lang: lang,
        unlockedAchievements: [],
        decisionHistory: [],
        activeTriggers: [],
        isPausedForEvent: false,
        needsSync: false,
      });
      setCurrentTab("home");
    } else if (profile && profile.nome && gameState.player !== profile.nome) {
      setGameState((prev) => ({ ...prev, player: profile.nome }));
    }
  }, [profile]);

  // 2. Efeito para SALVAR o progresso atual do perfil carregado
  React.useEffect(() => {
    if (!profile) return;
    const currentProfileId = profile.id;
    
    // Proteção crucial: não salva se o perfil atual ainda não foi devidamente carregado/zerado no Ref
    if (loadedProfileIdRef.current !== currentProfileId) {
      return;
    }

    try {
      setSyncStatus("syncing");
      const dataToSave = JSON.stringify({
        gameState,
        screen,
        currentTab,
        lang,
      });
      localStorage.setItem(`game_state_data_${currentProfileId}`, dataToSave);
      localStorage.setItem("game_state_data", dataToSave);
      setSyncStatus("synced");
    } catch (e) {
      console.error("Error saving state to localStorage", e);
      setSyncStatus("error");
    }
  }, [serializedState, screen, currentTab, lang, profile?.id]);

  React.useEffect(() => {
    if (gameState.lang !== lang) {
      setGameState(prev => ({ ...prev, lang }));
    }
  }, [lang, gameState.lang]);

  React.useEffect(() => {
    if (!profile && screen !== "splash" && screen !== "auth") {
      setScreen("auth");
    }
  }, [profile, screen]);

  // Sincronização por Checkpoints em Lote
  React.useEffect(() => {
    if (!profile) return;

    // Dispara quando muda de fase (Módulo) e volta pra 'home' ou quando needsSync for true e a rede estiver disponível
    // No nosso caso, após cada módulo, o jogador costuma voltar pra tela home (ou a gente quer sincronizar a cada fim de módulo).
    // Na verdade, a fase (ph) muda na GameScreen. Podemos só monitorar se há precisa de sync
    const attemptSync = async () => {
      // Avoid excessive syncing, we can just sync if we are in 'home' tab and have a history,
      // or if needsSync is true, or if ph changed. We'll simply sync whenever 'needsSync' is true OR 'ph' changes.
      // But we need to ensure we don't spam.
      const success = await syncProgressToSupabase(gameState, profile.id);
      if (success && gameState.needsSync) {
        setGameState(prev => ({ ...prev, needsSync: false }));
      } else if (!success && !gameState.needsSync) {
        setGameState(prev => ({ ...prev, needsSync: true }));
      }
    };

    // Disparar o checkpoint sempre que a tab atual mudar para "home" após ter progresso
    // Ou quando a fase (ph) mudar, ou quando precisar sincronizar e o usuário abrir o app (needsSync)
    if ((currentTab === "home" && gameState.sc === 0 && gameState.decisionHistory.length > 0) || gameState.needsSync) {
      attemptSync();
    }
  }, [gameState.ph, currentTab, profile, gameState.needsSync]);

  const handleStartGame = (partialState: Partial<GameState> & { resume?: boolean }) => {
    if (partialState.resume) {
      setCurrentTab("game");
      return;
    }
    const diff = partialState.diff || "medio";
    setGameState({
      ...gameState,
      ...partialState,
      ph: 0,
      sc: 0,
      score: 0,
      qual: 70,
      sust: 60,
      budget: getPhases(lang)[0].budget,
      combo: 0,
      maxCombo: 0,
      rights: 0,
      fast: 0,
      answered: false,
      diff,
      lang,
      unlockedAchievements: [],
      timerSec: diff === "facil" ? 40 : diff === "dificil" ? 20 : 30,
    });
    setCurrentTab("game");
  };

  const handleRestart = () => {
    setScreen("main");
    setCurrentTab("home");
  };

  const [previousTab, setPreviousTab] = useState<TabState>("home");

  const handleShowRanking = () => {
    setPreviousTab(currentTab);
    setScreen("main");
    setCurrentTab("ranking");
  };

  const handleBackFromRanking = () => {
    setScreen("main");
    setCurrentTab(previousTab !== "ranking" ? previousTab : "home");
  };

  const handleEndGame = () => {
    setScreen("main");
    setCurrentTab("result");
  };

  const handleAdvanceModule = () => {
    setGameState(prev => ({
      ...prev,
      ph: prev.ph + 1,       // Sobe um módulo
      sc: 0,                 // Reseta para o primeiro cenário do novo módulo
      qual: 50,              // Reseta barra de qualidade para o valor base do novo módulo
      sust: 50,              // Reseta barra fiscal para o valor base
      budget: getPhases(lang)[prev.ph + 1]?.budget || 500, // Orçamento inicial do próximo módulo
      needsSync: true        // Força sincronização do progresso
    }));
    setScreen("main");
    setCurrentTab("home");
  };

  const handleRetryModule = () => {
    setGameState(prev => ({
      ...prev,
      sc: 0,                 // Volta para o primeiro cenário do MÓDULO ATUAL
      qual: 50,              // Reseta os danos feitos na qualidade
      sust: 50,              // Reseta os danos fiscais
      budget: getPhases(lang)[prev.ph]?.budget || 500, // Volta para o budget inicial deste módulo
    }));
    setScreen("main");
    setCurrentTab("game");
  };

  const renderTabContent = () => {
    switch (currentTab) {
      case "home":
        return <StartScreen lang={lang} setLang={setLang} onStart={handleStartGame} isMenuOpen={isMenuOpen} onOpenMenu={() => setIsMenuOpen(true)} score={gameState.score} onShowRanking={() => setCurrentTab("ranking")} gameState={gameState} />;
      case "learn":
        return <LearningDashboard lang={lang} gameState={gameState} setGameState={setGameState} />;
      case "game":
        return <GameScreen
          gameState={gameState}
          setGameState={setGameState}
          onShowRanking={handleShowRanking}
          onEndGame={handleEndGame}
          isMenuOpen={isMenuOpen}
          onOpenMenu={() => setIsMenuOpen(true)}
        />;
      case "profile":
        return <ProfileScreen gameState={gameState} />;
      case "ranking":
        return <RankingScreen gameState={gameState} onBack={handleBackFromRanking} />;
      case "result":
        return <ResultScreen
          gameState={gameState}
          onViewRanking={handleShowRanking}
          onRestart={handleRestart}
          onAdvance={handleAdvanceModule}
          onRetry={handleRetryModule}
        />;
      default:
        return null;
    }
  }

  return (
    <>
      <GlobalBackground />
      <AnimatePresence mode="popLayout">
        {screen === "splash" && (
          <motion.div
            key="screen-splash"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-50 w-full h-full"
          >
            <SplashScreen 
              onFinish={() => {
                if (profile) {
                  setGameState(prev => ({ ...prev, player: profile.nome }));
                  setScreen("main");
                } else {
                  setScreen("auth");
                }
              }} 
              lang={lang} 
            />
          </motion.div>
        )}
        {screen === "auth" && (
          <motion.div
            key="screen-auth"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-40 w-full h-full"
          >
            <AuthScreen 
              onLogin={(userProfile) => {
                setGameState(prev => ({ ...prev, player: userProfile.name }));
                if (userProfile.isGuest) {
                  setShowGuestNotice(true);
                }
                setScreen("main");
              }} 
              lang={lang} 
              setLang={setLang}
              onOpenAdmin={() => setIsAdminOpen(true)}
            />
          </motion.div>
        )}
        {screen === "main" && (
          <motion.div
            key="screen-main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="w-full h-full"
          >
            <Layout 
              currentTab={currentTab} 
              onTabChange={setCurrentTab} 
              lang={lang} 
              setLang={setLang}
              gameState={gameState}
              setGameState={setGameState}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full"
                >
                  {renderTabContent()}
                </motion.div>
              </AnimatePresence>
            </Layout>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="md:hidden">
        <GlobalDrawer
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          lang={lang}
          setLang={setLang}
          syncStatus={syncStatus}
          currentTab={currentTab}
          onTabChange={(tab) => {
            setScreen("main");
            setCurrentTab(tab);
          }}
          gameState={gameState}
          setGameState={setGameState}
        />
      </div>
      <div className={`fixed w-full flex flex-row items-center justify-center px-4 z-40 pointer-events-none ${screen === "main" ? "bottom-24 md:bottom-3" : "bottom-3"}`}>
         <div className="font-medium text-[8.5px] sm:text-[10.5px] tracking-[1.5px] sm:tracking-[2px] text-cyan-400/70 sm:text-cyan-400/80 text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
           UFES &nbsp;|&nbsp; GRUPGIE &nbsp;|&nbsp; R&A PROJECT © 2026
         </div>
      </div>
      <PWAInstallModal isOpen={isPWAOpen} onClose={() => setIsPWAOpen(false)} lang={lang} />
      <GameManualModal isOpen={isManualOpen} onClose={() => setIsManualOpen(false)} lang={lang} />
      <AdminModal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} lang={lang} />

      <AnimatePresence>
        {showGuestNotice && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="bg-[#0f172a] border border-cyan-500/30 p-6 rounded-2xl sm:rounded-3xl max-w-md w-full shadow-[0_0_50px_rgba(6,182,212,0.2)] text-center space-y-4 relative overflow-hidden"
            >
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto text-2xl">
                👤
              </div>
              <div>
                <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-widest block mb-1">
                  {lang === "pt" ? "Acesso como Convidado" : lang === "es" ? "Acceso como Invitado" : "Guest Access"}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white leading-tight">
                  {lang === "pt" ? "Aviso de Pontuação" : lang === "es" ? "Aviso de Puntuación" : "Score Notice"}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-slate-900/80 p-4 rounded-xl border border-white/5">
                {lang === "pt"
                  ? "Suas pontuações não são salvas no banco de dados. Cadastre-se como gestor para entrar no ranking e preservar seus dados."
                  : lang === "es"
                  ? "Tus puntuaciones no se guardan en la base de datos. Regístrate como gestor para figurar en el ranking y preservar tus datos."
                  : "Your scores are not saved in the database. Register as a manager to join the leaderboard and preserve your data."}
              </p>
              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={() => setShowGuestNotice(false)}
                  className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold rounded-xl transition-all shadow-lg shadow-cyan-500/20 text-xs sm:text-sm uppercase tracking-wider cursor-pointer"
                >
                  {lang === "pt" ? "Entendi, Continuar" : lang === "es" ? "Entendido, Continuar" : "Understood, Continue"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function App() {
  return (
    <PWAProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </PWAProvider>
  );
}
