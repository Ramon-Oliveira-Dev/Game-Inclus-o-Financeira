import React, { useRef, useState } from "react";
import { GameState } from "../types";
import { getAllAch } from "../data";
import { t } from "../locales";
import { Trophy, Target, PieChart, Lock, CheckCircle, Camera, Upload, Building2, Mail, User, X, Edit, Search, Settings, Globe, Smartphone, Copy, Check, Sparkles, ShieldCheck, Award, CheckCircle2, Info, ChevronRight, Zap, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";
import { ES_SERRA_SCHOOLS, getAvatarForSchool } from "../data/schools";
import { SchoolAvatar } from "./SchoolAvatar";

interface ProfileScreenProps {
  gameState: GameState;
}

export function ProfileScreen({ gameState }: ProfileScreenProps) {
  const { lang, qual, sust, budget, rights, sc, unlockedAchievements = [] } = gameState;
  const { profile, user, updateProfile, isGuest } = useAuth();
  
  const isGuestUser = isGuest || user?.id?.startsWith('guest_') || user?.id === 'local_guest' || profile?.id?.startsWith('guest_');
  
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  
  // Metric detail modal state (Score Global, Maior Combo, Decisões)
  const [selectedMetricDetail, setSelectedMetricDetail] = useState<'score' | 'combo' | 'decisions' | null>(null);

  // Calculate clean App URL once for QR code & sharing
  const appUrlWithCacheBuster = React.useMemo(() => {
    try {
      let origin = window.location.origin;
      if (origin.includes("-dev-")) {
        origin = origin.replace("-dev-", "-pre-");
      }
      return origin;
    } catch (e) {
      return "https://ais-pre-quexd6q7qh5mww7kip5ho4-90978133043.us-west1.run.app";
    }
  }, []);

  // Selected Achievement state for detailed modal
  const [selectedAchievement, setSelectedAchievement] = useState<{
    icon: string;
    name: string;
    desc: string;
    unlocked: boolean;
    index: number;
  } | null>(null);
  
  // States for name, city & password edit form
  const [editTab, setEditTab] = useState<"nome" | "escola" | "senha">("nome");
  const [editNome, setEditNome] = useState("");
  const [editMunicipio, setEditMunicipio] = useState("");
  const [editSearchQuery, setEditSearchQuery] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [passwordSuccessMsg, setPasswordSuccessMsg] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);
  const [copied, setCopied] = useState(false);
  const [occupiedSchoolsMap, setOccupiedSchoolsMap] = useState<Record<string, { userId: string; managerName: string }>>({});
  const [loadingOccupied, setLoadingOccupied] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchOccupiedSchools = async () => {
    setLoadingOccupied(true);
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, nome, municipio")
        .not("municipio", "is", null);

      if (data && !error) {
        const map: Record<string, { userId: string; managerName: string }> = {};
        data.forEach((p: any) => {
          if (p.municipio && p.municipio !== "Não Informado" && p.municipio.trim()) {
            map[p.municipio.trim()] = {
              userId: p.id,
              managerName: p.nome || (lang === "pt" ? "Gestor" : "Manager")
            };
          }
        });
        setOccupiedSchoolsMap(map);
      }
    } catch (e) {
      console.warn("Erro ao buscar escolas ocupadas:", e);
    } finally {
      setLoadingOccupied(false);
    }
  };

  const allAch = getAllAch(lang);
  const totalQuestions = sc || 1; 
  const winRate = Math.round((rights / totalQuestions) * 100);

  // Unlocked achievements statistics
  const unlockedCount = allAch.filter((_, idx) => {
    const translationsNames = ["pt", "en", "es"].map(l => {
      const list = getAllAch(l as any);
      return list[idx]?.name;
    }).filter(Boolean);
    return unlockedAchievements.some(name => translationsNames.includes(name));
  }).length;
  const totalAchievements = allAch.length;
  const unlockPercentage = Math.round((unlockedCount / totalAchievements) * 100);

  const getAchievementConditionHint = (idx: number, lang: string) => {
    switch (idx) {
      case 0:
        return lang === "pt"
          ? "Acertar pelo menos 8 decisões corretas no simulador."
          : lang === "es"
          ? "Acertar al menos 8 decisiones correctas en el simulador."
          : "Make at least 8 correct decisions in the simulator.";
      case 1:
        return lang === "pt"
          ? "Alcançar 85% ou mais no indicador de Qualidade Pedagógica e Acessibilidade."
          : lang === "es"
          ? "Alcanzar 85% o más en el indicador de Calidad Pedagógica y Accesibilidad."
          : "Reach 85% or higher in Pedagogical Quality and Accessibility indicator.";
      case 2:
        return lang === "pt"
          ? "Manter 80% ou mais no indicador de Sustentabilidade Fiscal do Fundeb."
          : lang === "es"
          ? "Mantener 80% o más en el indicador de Sostenibilidad Fiscal de Fundeb."
          : "Maintain 80% or higher in Fundeb Fiscal Sustainability indicator.";
      case 3:
        return lang === "pt"
          ? "Responder com rapidez e eficiência a pelo menos 3 situações de urgência."
          : lang === "es"
          ? "Responder con rapidez y eficiencia a al menos 3 situaciones de urgencia."
          : "Respond quickly and efficiently to at least 3 urgent situations.";
      case 4:
        return lang === "pt"
          ? "Alcançar um combo consecutivo de 3 ou mais acertos sem falhas."
          : lang === "es"
          ? "Alcanzar un combo consecutivo de 3 o más aciertos sin fallos."
          : "Achieve a consecutive combo of 3 or more correct answers without errors.";
      case 5:
        return lang === "pt"
          ? "Completar com sucesso todas as etapas da jornada de tomada de decisão."
          : lang === "es"
          ? "Completar con éxito todas las etapas de la jornada de toma de decisiones."
          : "Successfully complete all stages of the decision-making journey.";
      default:
        return lang === "pt"
          ? "Cumprir as metas de gestão propostas nos cenários."
          : lang === "es"
          ? "Cumplir las metas de gestión propuestas en los escenarios."
          : "Achieve the management targets set in the scenarios.";
    }
  };

  const filteredSchoolsEdit = ES_SERRA_SCHOOLS.filter(school =>
    school.name.toLowerCase().includes(editSearchQuery.toLowerCase())
  );

  const openEditModal = (initialTab: "nome" | "escola" | "senha" = "nome") => {
    setEditNome(profile?.nome || "");
    setEditMunicipio(!profile?.municipio || profile.municipio === "Não Informado" ? "" : profile.municipio);
    setEditSearchQuery("");
    setNewPassword("");
    setConfirmNewPassword("");
    setShowNewPassword(false);
    setShowConfirmNewPassword(false);
    setPasswordSuccessMsg("");
    setEditTab(initialTab === "senha" && isGuestUser ? "nome" : initialTab);
    setUploadError("");
    setShowEditProfileModal(true);
    fetchOccupiedSchools();
  };

  const handleSaveProfileInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploadError("");
    setPasswordSuccessMsg("");

    if (editTab === "nome") {
      if (!editNome.trim()) {
        setUploadError(lang === "pt" ? "O nome não pode estar vazio." : lang === "es" ? "El nombre no puede estar vacío." : "Name cannot be empty.");
        return;
      }
      setSavingProfile(true);
      try {
        await updateProfile({
          nome: editNome.trim()
        });
        setShowEditProfileModal(false);
      } catch (err: any) {
        console.error("Error updating profile name:", err);
        setUploadError(lang === "pt" ? "Erro ao salvar nome do gestor." : lang === "es" ? "Error al guardar nombre del gestor." : "Error saving manager name.");
      } finally {
        setSavingProfile(false);
      }
      return;
    }

    if (editTab === "escola") {
      if (!editMunicipio) {
        setUploadError(lang === "pt" ? "Por favor, selecione uma Escola Municipal." : lang === "es" ? "Por favor, seleccione una Escuela Municipal." : "Please select a Municipal School.");
        return;
      }

      // Check if school is occupied by another manager
      const occupied = occupiedSchoolsMap[editMunicipio];
      if (occupied && occupied.userId !== user?.id) {
        setUploadError(
          lang === "pt"
            ? `A escola "${editMunicipio}" já está sob posse ativa de ${occupied.managerName}.`
            : lang === "es"
            ? `La escuela "${editMunicipio}" ya está en posición activa de ${occupied.managerName}.`
            : `The school "${editMunicipio}" is already in active office by ${occupied.managerName}.`
        );
        return;
      }

      setSavingProfile(true);
      try {
        const correspondingAvatar = getAvatarForSchool(editMunicipio);
        await updateProfile({
          municipio: editMunicipio.trim() || "Não Informado",
          avatar_url: correspondingAvatar
        });
        setShowEditProfileModal(false);
      } catch (err: any) {
        console.error("Error updating profile school:", err);
        setUploadError(lang === "pt" ? "Erro ao salvar escola vinculada." : lang === "es" ? "Error al guardar escuela vinculada." : "Error saving linked school.");
      } finally {
        setSavingProfile(false);
      }
      return;
    }

    if (editTab === "senha") {
      if (!newPassword || newPassword.trim().length < 6) {
        setUploadError(
          lang === "pt"
            ? "A nova senha deve conter no mínimo 6 caracteres."
            : lang === "es"
            ? "La nueva contraseña debe contener al menos 6 caracteres."
            : "New password must be at least 6 characters."
        );
        return;
      }

      if (newPassword.trim() !== confirmNewPassword.trim()) {
        setUploadError(
          lang === "pt"
            ? "As novas senhas não coincidem. Por favor, confirme a senha corretamente."
            : lang === "es"
            ? "Las nuevas contraseñas no coinciden. Por favor confirma correctamente."
            : "New passwords do not match. Please confirm your password correctly."
        );
        return;
      }

      setSavingProfile(true);
      try {
        const updatedPwd = newPassword.trim();

        // 1. Supabase auth password update if available
        if (supabase && user && !user.id.startsWith("local_")) {
          const { error: updateAuthErr } = await supabase.auth.updateUser({
            password: updatedPwd
          });
          if (updateAuthErr) {
            console.warn("Notice updating Supabase user password:", updateAuthErr.message);
          }

          try {
            await supabase.from("profiles").update({
              senha: updatedPwd,
              updated_at: new Date().toISOString()
            }).eq("id", user.id);
          } catch (e) {
            console.warn("Notice updating Supabase profile table password:", e);
          }
        }

        // 2. Local registered school map update
        if (profile?.municipio && profile.municipio !== "Não Informado") {
          const cleanSchool = profile.municipio
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .replace(/[^a-z0-9]/g, "");

          try {
            const localMap = JSON.parse(localStorage.getItem("serra_registered_schools") || "{}");
            if (localMap[cleanSchool]) {
              localMap[cleanSchool].password = updatedPwd;
            } else {
              localMap[cleanSchool] = {
                nome: profile.nome || "Gestor(a)",
                password: updatedPwd,
                schoolName: profile.municipio
              };
            }
            localStorage.setItem("serra_registered_schools", JSON.stringify(localMap));
          } catch (e) {
            console.warn("Local storage password update notice:", e);
          }
        }

        // 3. Update local_profile_active if present
        try {
          const activeLocal = localStorage.getItem("local_profile_active");
          if (activeLocal) {
            const parsed = JSON.parse(activeLocal);
            localStorage.setItem("local_profile_active", JSON.stringify({
              ...parsed,
              password: updatedPwd
            }));
          }
        } catch (e) {}

        setPasswordSuccessMsg(
          lang === "pt"
            ? "Senha alterada com sucesso!"
            : lang === "es"
            ? "¡Contraseña cambiada con éxito!"
            : "Password changed successfully!"
        );
        setNewPassword("");
        setConfirmNewPassword("");
        setTimeout(() => {
          setPasswordSuccessMsg("");
          setShowEditProfileModal(false);
        }, 1500);
      } catch (err: any) {
        console.error("Error changing password:", err);
        setUploadError(
          lang === "pt"
            ? "Erro ao alterar a senha. Tente novamente."
            : lang === "es"
            ? "Error al cambiar la contraseña."
            : "Error changing password."
        );
      } finally {
        setSavingProfile(false);
      }
    }
  };

  return (
    <div className="w-full min-h-full bg-transparent p-3 md:p-6 font-sans text-white pb-24 md:pb-6 relative flex flex-col justify-start">
      <div className="absolute top-0 right-0 w-[50vw] md:w-[25vw] h-[50vw] md:h-[25vw] bg-blue-900/10 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[60vw] h-[60vw] bg-purple-900/10 rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/4" />

      <div className="max-w-4xl mx-auto w-full relative z-10 space-y-3 md:space-y-4 mt-8 md:mt-2">
        
        {/* Screen Title */}
        <div className="flex items-center gap-2 mb-1 border-b border-white/5 pb-2">
          <User className="w-5 h-5 text-blue-400 shrink-0" />
          <h1 className="text-base md:text-lg font-bold tracking-tight text-white">{t(lang, "prof_title") || "Perfil de Gestão"}</h1>
        </div>
        
        {/* Profile Card Header - Ultra Credential Glassmorphism Design */}
        <div className="bg-gradient-to-br from-[#0e172a]/90 via-[#0b1222]/95 to-[#060b16]/98 backdrop-blur-2xl border border-cyan-500/30 hover:border-cyan-400/50 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-[0_20px_40px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.1)] relative overflow-hidden flex flex-col group transition-all duration-300">
          
          {/* Subtle Ambient Light Orbs behind content */}
          <div className="absolute -top-20 -left-20 w-44 h-44 bg-cyan-500/15 blur-3xl rounded-full pointer-events-none group-hover:scale-125 transition-transform duration-700" />
          <div className="absolute -bottom-20 -right-20 w-44 h-44 bg-blue-600/15 blur-3xl rounded-full pointer-events-none group-hover:scale-125 transition-transform duration-700" />
          
          {/* Tech Grid overlay pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:18px_18px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

          {/* Top Header Bar inside Profile Card */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-white/10 z-20">
            {/* Status Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.15)] backdrop-blur-md">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400">
                  {lang === "pt" ? "Posse Ativa" : lang === "es" ? "Posición Activa" : "Active Office"}
                </span>
              </div>
              
              <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-cyan-500/10 rounded-full border border-cyan-500/20 shadow-[0_0_10px_rgba(6,182,212,0.1)] backdrop-blur-md">
                <ShieldCheck className="w-3 h-3 text-cyan-400" />
                <span className="text-[9px] font-black uppercase tracking-widest text-cyan-300">
                  {lang === "pt" ? "Gestor Credenciado" : lang === "es" ? "Gestor Acreditado" : "Accredited Manager"}
                </span>
              </div>

              <div className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-500/10 rounded-full border border-indigo-500/20 backdrop-blur-md">
                <Globe className="w-3 h-3 text-indigo-400" />
                <span className="text-[9px] font-black uppercase tracking-widest text-indigo-300">
                  SERRA - ES
                </span>
              </div>
            </div>
          </div>

          {/* Main Profile Info Stack */}
          <div className="space-y-3 z-10 relative">
            {/* 1. MINI CARD DA ESCOLA (Avatar com Iniciais da Escola - SEM EDIÇÃO DE IMAGEM) */}
            <div className="w-full bg-gradient-to-r from-cyan-950/30 via-slate-900/40 to-blue-950/20 border border-cyan-500/20 rounded-2xl p-3 sm:p-3.5 shadow-lg backdrop-blur-md">
              <div className="flex items-center gap-3.5">
                {/* School Avatar with Initials */}
                <div className="relative shrink-0">
                  <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-2xl p-0.5 bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-500 shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                    <div className="w-full h-full bg-[#030712] rounded-[14px] flex items-center justify-center overflow-hidden relative border border-black/40">
                      <SchoolAvatar 
                        avatarUrl={profile?.avatar_url || null} 
                        schoolName={profile?.municipio} 
                        className="w-full h-full object-cover"
                        iconClassName="w-7 h-7"
                      />
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 p-1 bg-cyan-500 rounded-lg text-slate-950 border border-slate-900 shadow-md">
                    <Building2 className="w-2.5 h-2.5" />
                  </div>
                </div>

                {/* School Name & Official Badge (NO EDIT) */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <span className="text-[9px] uppercase tracking-widest font-black text-cyan-400">
                      {lang === "pt" ? "Escola Municipal Vinculada" : lang === "es" ? "Escuela Municipal Vinculada" : "Linked Municipal School"}
                    </span>
                    <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/25 rounded-md text-[8.5px] font-black text-emerald-400 uppercase tracking-wider shrink-0">
                      {lang === "pt" ? "Oficial" : "Official"}
                    </span>
                  </div>
                  <h2 className="text-sm sm:text-base font-black text-white truncate tracking-tight">
                    {!profile?.municipio || profile.municipio === "Não Informado"
                      ? (lang === "pt" ? "Sem escola vinculada" : lang === "es" ? "Sin escuela vinculada" : "No school linked")
                      : profile.municipio}
                  </h2>
                  <p className="text-[10px] text-slate-400 font-medium truncate mt-0.5">
                    {lang === "pt" ? "Rede Municipal de Ensino de Serra/ES" : "Serra Municipal School Network"}
                  </p>
                </div>
              </div>
            </div>

            {/* 2. CARD DO GESTOR (Nome do Gestor + Opção de Edição) */}
            <div className="w-full bg-white/[0.02] border border-white/10 hover:border-cyan-500/30 rounded-2xl p-3 sm:p-3.5 flex items-center justify-between gap-3 backdrop-blur-md transition-colors">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="p-2.5 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-cyan-400 shrink-0">
                  <User className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="block text-[9px] uppercase tracking-widest font-black text-slate-400 mb-0.5">
                    {lang === "pt" ? "Nome do Gestor(a) Responsável" : lang === "es" ? "Nombre del Gestor(a) Responsable" : "Responsible Manager Name"}
                  </span>
                  <div className="flex items-center gap-2">
                    <h1 className="text-sm sm:text-base font-black text-white tracking-tight truncate">
                      {profile?.nome || (lang === "pt" ? "Gestor(a)" : lang === "es" ? "Gestor(a)" : "Manager")}
                    </h1>
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0 animate-pulse" />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {/* Edit Manager Name Button (Icon Only in Right Corner) */}
                <button 
                  type="button"
                  onClick={() => openEditModal("nome")}
                  className="p-2 sm:p-2.5 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-400 rounded-xl text-cyan-300 hover:text-white transition-all cursor-pointer shadow-md group/editbtn shrink-0"
                  title={lang === "pt" ? "Editar Nome do Gestor" : "Edit Manager Name"}
                >
                  <Edit className="w-4 h-4 text-cyan-400 group-hover/editbtn:scale-110 transition-transform" />
                </button>

                {/* Change Password Button (Apenas para gestores cadastrados, oculto para convidados) */}
                {!isGuestUser && (
                  <button 
                    type="button"
                    onClick={() => openEditModal("senha")}
                    className="p-2 sm:p-2.5 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 hover:border-amber-400 rounded-xl text-amber-300 hover:text-white transition-all cursor-pointer shadow-md group/passbtn shrink-0 flex items-center gap-1.5"
                    title={lang === "pt" ? "Alterar Senha do Gestor" : "Change Password"}
                  >
                    <Lock className="w-4 h-4 text-amber-400 group-hover/passbtn:scale-110 transition-transform" />
                    <span className="hidden sm:inline text-xs font-extrabold text-amber-300">
                      {lang === "pt" ? "Senha" : lang === "es" ? "Senha" : "Password"}
                    </span>
                  </button>
                )}
              </div>
            </div>

            <AnimatePresence>
              {uploadError && (
                <motion.div key="upload-error" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="text-red-400 text-[10px] bg-red-500/10 border border-red-500/20 p-2 rounded-xl text-center sm:text-left font-medium">
                  {uploadError}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Metrics Overview - Bento-Grid com Glassmorphism & Gradientes Ambientais */}
        <section className="grid grid-cols-3 gap-2 sm:gap-4">
          {/* 1. Score Global Card */}
          <button
            type="button"
            onClick={() => setSelectedMetricDetail('score')}
            className="bg-gradient-to-br from-[#0f192e]/70 via-[#0b1222]/70 to-[#080d19]/80 backdrop-blur-xl border border-white/10 hover:border-cyan-500/50 p-3 sm:p-4 rounded-xl flex flex-col justify-between transition-all duration-300 shadow-lg hover:shadow-cyan-500/15 group cursor-pointer text-left relative overflow-hidden active:scale-98"
          >
            <div className="flex items-center justify-between gap-1 sm:gap-2 mb-2 w-full">
              <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
                <div className="p-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-lg shrink-0 group-hover:scale-110 transition-transform shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                  <Target className="w-3.5 sm:w-4.5 h-3.5 sm:h-4.5 text-cyan-400" />
                </div>
                <h3 className="font-extrabold text-[9px] sm:text-xs tracking-wider text-slate-400 uppercase truncate">
                  {lang === "pt" ? "SCORE GLOBAL" : lang === "es" ? "PUNTUACIÓN GLOBAL" : "GLOBAL SCORE"}
                </h3>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-cyan-400/50 group-hover:text-cyan-300 group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg sm:text-2xl font-black text-white leading-none font-mono drop-shadow">{gameState.score ?? profile?.score_acumulado ?? 0}</span>
              <span className="text-[8px] sm:text-xs font-bold text-cyan-400/80 uppercase font-mono">PTS</span>
            </div>
            <div className="mt-1.5 text-[8px] sm:text-[9.5px] font-bold text-cyan-300/80 flex items-center gap-0.5 group-hover:text-cyan-200">
              <span>{lang === "pt" ? "Ver detalhamento" : lang === "es" ? "Ver detalle" : "View details"}</span>
            </div>
          </button>

          {/* 2. Maior Combo Card */}
          <button
            type="button"
            onClick={() => setSelectedMetricDetail('combo')}
            className="bg-gradient-to-br from-[#0f192e]/70 via-[#0b1222]/70 to-[#080d19]/80 backdrop-blur-xl border border-white/10 hover:border-emerald-500/50 p-3 sm:p-4 rounded-xl flex flex-col justify-between transition-all duration-300 shadow-lg hover:shadow-emerald-500/15 group cursor-pointer text-left relative overflow-hidden active:scale-98"
          >
            <div className="flex items-center justify-between gap-1 sm:gap-2 mb-2 w-full">
              <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
                <div className="p-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg shrink-0 group-hover:scale-110 transition-transform shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                  <PieChart className="w-3.5 sm:w-4.5 h-3.5 sm:h-4.5 text-emerald-400" />
                </div>
                <h3 className="font-extrabold text-[9px] sm:text-xs tracking-wider text-slate-400 uppercase truncate">
                  {lang === "pt" ? "MAIOR COMBO" : lang === "es" ? "MAYOR COMBO" : "MAX COMBO"}
                </h3>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-emerald-400/50 group-hover:text-emerald-300 group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg sm:text-2xl font-black text-white leading-none font-mono drop-shadow">{gameState.maxCombo}x</span>
              <span className="text-[8px] sm:text-xs font-bold text-emerald-400/80 uppercase font-mono">
                {lang === "pt" ? "RESPOSTAS" : lang === "es" ? "RESPUESTAS" : "RESPONSES"}
              </span>
            </div>
            <div className="mt-1.5 text-[8px] sm:text-[9.5px] font-bold text-emerald-300/80 flex items-center gap-0.5 group-hover:text-emerald-200">
              <span>{lang === "pt" ? "Ver detalhamento" : lang === "es" ? "Ver detalle" : "View details"}</span>
            </div>
          </button>

          {/* 3. Decisões Card */}
          <button
            type="button"
            onClick={() => setSelectedMetricDetail('decisions')}
            className="bg-gradient-to-br from-[#0f192e]/70 via-[#0b1222]/70 to-[#080d19]/80 backdrop-blur-xl border border-white/10 hover:border-amber-500/50 p-3 sm:p-4 rounded-xl flex flex-col justify-between transition-all duration-300 shadow-lg hover:shadow-amber-500/15 group cursor-pointer text-left relative overflow-hidden active:scale-98"
          >
            <div className="flex items-center justify-between gap-1 sm:gap-2 mb-2 w-full">
              <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
                <div className="p-1.5 bg-amber-500/10 border border-amber-500/20 rounded-lg shrink-0 group-hover:scale-110 transition-transform shadow-[0_0_10px_rgba(245,158,11,0.2)]">
                  <Trophy className="w-3.5 sm:w-4.5 h-3.5 sm:h-4.5 text-amber-400" />
                </div>
                <h3 className="font-extrabold text-[9px] sm:text-xs tracking-wider text-slate-400 uppercase truncate">
                  {lang === "pt" ? "DECISÕES" : lang === "es" ? "DECISIONES" : "DECISIONS"}
                </h3>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-amber-400/50 group-hover:text-amber-300 group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>
            <div className="flex items-baseline gap-0.5">
              <span className="text-lg sm:text-2xl font-black text-white leading-none font-mono drop-shadow">{rights}</span>
              <span className="text-[8px] sm:text-xs font-bold text-amber-400/80 uppercase font-mono">/ {totalQuestions}</span>
            </div>
            <div className="mt-1.5 text-[8px] sm:text-[9.5px] font-bold text-amber-300/80 flex items-center gap-0.5 group-hover:text-amber-200">
              <span>{lang === "pt" ? "Ver detalhamento" : lang === "es" ? "Ver detalle" : "View details"}</span>
            </div>
          </button>
        </section>

        {/* Achievements Card - Otimizado e Interativo */}
        <section className="bg-gradient-to-br from-[#0e172a]/80 via-[#0b1222]/85 to-[#070d18]/90 backdrop-blur-xl border border-amber-500/20 hover:border-amber-500/35 p-4 sm:p-5 rounded-2xl shadow-xl transition-all duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.2)]">
                <Trophy className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-black text-white tracking-tight flex items-center gap-2">
                  <span>{t(lang, "res_ach")}</span>
                  <span className="text-[10px] font-mono font-black text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                    {unlockedCount}/{totalAchievements}
                  </span>
                </h2>
                <p className="text-[11px] text-slate-400 font-medium">
                  {lang === "pt"
                    ? "Clique nas conquistas para ver detalhes e requisitos"
                    : lang === "es"
                    ? "Haz clic en los logros para ver detalles y requisitos"
                    : "Click on achievements to view details and requirements"}
                </p>
              </div>
            </div>

            {/* Progress bar in header */}
            <div className="flex items-center gap-2 sm:w-48">
              <div className="flex-1 h-2 bg-slate-800/80 rounded-full overflow-hidden p-0.5 border border-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${unlockPercentage}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-amber-500 to-orange-400 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                />
              </div>
              <span className="text-xs font-mono font-extrabold text-amber-400 shrink-0">
                {unlockPercentage}%
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-2.5">
            {allAch.map((ach, idx) => {
              const translationsNames = ["pt", "en", "es"].map(l => {
                const list = getAllAch(l as any);
                return list[idx]?.name;
              }).filter(Boolean);
              const unlocked = unlockedAchievements.some(name => translationsNames.includes(name));

              return (
                <motion.button
                  key={`ach-card-${idx}`}
                  type="button"
                  whileHover={{ scale: 1.04, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedAchievement({
                    icon: ach.icon,
                    name: ach.name,
                    desc: ach.desc,
                    unlocked,
                    index: idx
                  })}
                  className={`relative w-full py-2 px-1.5 rounded-xl flex flex-col items-center justify-center border transition-all duration-300 cursor-pointer text-center group min-h-[72px] sm:min-h-[76px] ${
                    unlocked
                      ? "bg-gradient-to-br from-amber-500/15 via-orange-500/5 to-amber-600/10 border-amber-500/35 hover:border-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.12)] hover:shadow-[0_0_18px_rgba(245,158,11,0.25)]"
                      : "bg-slate-900/40 border-white/5 grayscale opacity-60 hover:opacity-100 hover:grayscale-0 hover:border-white/20"
                  }`}
                >
                  {/* Top-right Status Icon */}
                  <div className="absolute top-1.5 right-1.5">
                    {unlocked ? (
                      <CheckCircle2 className="w-3 h-3 text-amber-400 drop-shadow-[0_0_6px_rgba(245,158,11,0.8)]" />
                    ) : (
                      <Lock className="w-2.5 h-2.5 text-slate-500" />
                    )}
                  </div>

                  {/* Icon */}
                  <span className="text-xl sm:text-2xl mb-0.5 transition-transform duration-300 group-hover:scale-110 drop-shadow-md select-none">
                    {ach.icon}
                  </span>

                  {/* Name */}
                  <h4 className={`text-[9px] sm:text-[10px] font-extrabold leading-tight line-clamp-2 px-0.5 ${
                    unlocked ? "text-amber-100 group-hover:text-amber-300" : "text-slate-400 group-hover:text-slate-200"
                  }`}>
                    {ach.name}
                  </h4>
                </motion.button>
              );
            })}
          </div>
        </section>

        {/* PWA / App Installation QR Code & Link sharing */}
        <section className="bg-[#0b0f19]/40 backdrop-blur-xl border border-cyan-500/15 hover:border-cyan-500/35 p-4 md:p-5 rounded-2xl shadow-lg transition-all duration-300">
          <div className="flex items-center gap-2 mb-4">
            <Smartphone className="w-4 h-4 text-cyan-400" />
            <h2 className="text-xs md:text-sm font-bold text-white">
              {lang === "pt" 
                ? "Instalação do Aplicativo (PWA)" 
                : lang === "es" 
                ? "Instalación de la Aplicación (PWA)" 
                : "App Installation (PWA)"}
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-stretch">
            {/* Left side: QR Code Container */}
            <div className="flex flex-col items-center justify-center p-3 bg-black/30 border border-white/5 rounded-xl w-[160px] shrink-0">
              <div className="bg-white p-2 rounded-xl flex items-center justify-center w-[124px] h-[124px]">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=110x110&data=${encodeURIComponent(appUrlWithCacheBuster)}&margin=2`}
                  alt="QR Code de Instalação"
                  className="w-[110px] h-[110px] object-contain select-none"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-[9px] text-cyan-400 font-mono font-black tracking-widest mt-2 uppercase text-center">
                {lang === "pt" ? "Escaneie o QR Code" : lang === "es" ? "Escanea el Código" : "Scan the QR"}
              </span>
            </div>

            {/* Right side: App Links, Copy button & Instructions */}
            <div className="flex-1 flex flex-col justify-between text-left gap-3">
              <div className="space-y-1">
                <h3 className="text-xs font-bold text-cyan-300">
                  {lang === "pt" 
                    ? "Jogue no Celular ou Tablet" 
                    : lang === "es" 
                    ? "Juega en el Celular o Tablet" 
                    : "Play on Mobile or Tablet"}
                </h3>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  {lang === "pt"
                    ? "Aponte a câmera do seu celular para o QR Code ao lado para abrir o app diretamente, ou copie o link abaixo para compartilhar."
                    : lang === "es"
                    ? "Apunta la cámara de tu teléfono al código de al lado para abrir la app directamente, o copia el enlace de abajo para compartilhar."
                    : "Point your phone camera at the QR Code to open the app directly, or copy the link below to share."}
                </p>
              </div>

              {/* Link Input & Copy button */}
              <div className="space-y-1 w-full">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  {lang === "pt" ? "Link de Acesso Rápido" : lang === "es" ? "Enlace de Acceso Rápido" : "Quick Access Link"}
                </span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    readOnly
                    value={appUrlWithCacheBuster}
                    className="flex-1 bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-300 outline-none select-all font-mono"
                  />
                  <button
                    onClick={() => {
                      try {
                        navigator.clipboard.writeText(appUrlWithCacheBuster);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      } catch (err) {
                        console.error("Failed to copy link", err);
                      }
                    }}
                    className={`px-3 py-2 rounded-xl border font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                      copied
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                        : "bg-white/5 border-white/10 hover:bg-white/10 text-white"
                    }`}
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copied ? (lang === "pt" ? "Copiado!" : lang === "es" ? "Copiado!" : "Copied!") : (lang === "pt" ? "Copiar" : lang === "es" ? "Copiar" : "Copy")}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>



      {/* Edit Profile Modal */}
      <AnimatePresence>
        {showEditProfileModal && (
          <motion.div 
            key="edit-profile-modal"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-[#0f172a] border border-cyan-500/20 hover:border-cyan-500/40 p-6 md:p-8 rounded-3xl shadow-2xl w-full max-w-md relative transition-all duration-300"
            >
              <button 
                type="button"
                onClick={() => setShowEditProfileModal(false)}
                className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors cursor-pointer"
                disabled={savingProfile}
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-lg sm:text-xl font-black text-white mb-0.5 flex items-center gap-2">
                <Settings className="w-5 h-5 text-cyan-400" />
                <span>{lang === "pt" ? "Gestão do Perfil" : lang === "es" ? "Gestión del Perfil" : "Profile Management"}</span>
              </h3>
              <p className="text-slate-400 text-xs mb-3.5">
                {lang === "pt" ? "Altere seu nome ou vincule sua escola municipal de posse." : lang === "es" ? "Cambia tu nombre o vincula tu escuela municipal." : "Change your name or link your municipal school."}
              </p>

              {/* Tab Switcher */}
              <div className={`grid ${isGuestUser ? 'grid-cols-2' : 'grid-cols-3'} gap-1 bg-black/40 p-1 rounded-2xl border border-white/10 mb-3.5`}>
                <button
                  type="button"
                  onClick={() => { setEditTab("nome"); setUploadError(""); setPasswordSuccessMsg(""); }}
                  className={`py-2 px-2 sm:px-3 rounded-xl text-[11px] sm:text-xs font-extrabold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                    editTab === "nome"
                      ? "bg-cyan-500 text-slate-950 shadow-[0_0_12px_rgba(6,182,212,0.4)]"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <User className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{lang === "pt" ? "Nome" : lang === "es" ? "Nombre" : "Name"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setEditTab("escola"); setUploadError(""); setPasswordSuccessMsg(""); }}
                  className={`py-2 px-2 sm:px-3 rounded-xl text-[11px] sm:text-xs font-extrabold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                    editTab === "escola"
                      ? "bg-cyan-500 text-slate-950 shadow-[0_0_12px_rgba(6,182,212,0.4)]"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{lang === "pt" ? "Escola" : lang === "es" ? "Escuela" : "School"}</span>
                </button>

                {!isGuestUser && (
                  <button
                    type="button"
                    onClick={() => { setEditTab("senha"); setUploadError(""); setPasswordSuccessMsg(""); }}
                    className={`py-2 px-2 sm:px-3 rounded-xl text-[11px] sm:text-xs font-extrabold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                      editTab === "senha"
                        ? "bg-amber-500 text-slate-950 shadow-[0_0_12px_rgba(245,158,11,0.4)]"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Lock className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{lang === "pt" ? "Senha" : lang === "es" ? "Contraseña" : "Password"}</span>
                  </button>
                )}
              </div>

              {uploadError && (
                <div className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 p-2.5 rounded-xl text-center font-medium mb-3">
                  {uploadError}
                </div>
              )}

              {passwordSuccessMsg && (
                <div className="text-emerald-400 text-xs bg-emerald-500/10 border border-emerald-500/30 p-2.5 rounded-xl text-center font-bold flex items-center justify-center gap-1.5 mb-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{passwordSuccessMsg}</span>
                </div>
              )}

              <form onSubmit={handleSaveProfileInfo} className="space-y-3">
                {editTab === "nome" ? (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                        {lang === "pt" ? "Nome Completo do Gestor(a)" : lang === "es" ? "Nombre Completo del Gestor(a)" : "Manager's Full Name"}
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                          <User className="w-4 h-4 text-cyan-400" />
                        </div>
                        <input
                          type="text"
                          required
                          value={editNome}
                          onChange={(e) => setEditNome(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 bg-black/30 border border-white/10 hover:border-white/20 focus:border-cyan-400 rounded-xl text-white outline-none transition-all text-xs font-medium placeholder:text-slate-500"
                          placeholder={lang === "pt" ? "Digite seu nome completo..." : lang === "es" ? "Escribe tu nombre completo..." : "Type your full name..."}
                          maxLength={100}
                          disabled={savingProfile}
                        />
                      </div>
                    </div>

                    <p className="text-[10.5px] text-slate-400 bg-white/[0.02] p-2.5 rounded-xl border border-white/5 leading-relaxed">
                      💡 {lang === "pt" ? "Este nome será exibido nos relatórios pedagógicos, ranking de gestores e na barra de cabeçalho." : lang === "es" ? "Este nombre se mostrará en los informes pedagógicos y en el ranking." : "This name will be displayed in pedagogical reports and manager rankings."}
                    </p>

                    <div className="pt-2 flex gap-2">
                      <button
                        type="button"
                        onClick={() => setShowEditProfileModal(false)}
                        className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-bold transition-all text-center text-xs"
                        disabled={savingProfile}
                      >
                        {lang === "pt" ? "Cancelar" : lang === "es" ? "Cancelar" : "Cancel"}
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black rounded-xl text-xs transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] flex items-center justify-center cursor-pointer"
                        disabled={savingProfile}
                      >
                        {savingProfile ? (
                          <div className="w-4 h-4 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                        ) : (
                          lang === "pt" ? "Salvar Somente Nome" : lang === "es" ? "Guardar Solo Nombre" : "Save Name Only"
                        )}
                      </button>
                    </div>
                  </div>
                ) : editTab === "escola" ? (
                  <div className="space-y-3">
                    {/* Selected school preview */}
                    <div className="flex items-center justify-between p-2.5 bg-black/30 border border-white/10 rounded-xl text-xs">
                      <div className="flex items-center gap-2 truncate">
                        <Building2 className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span className="truncate text-slate-300">
                          <strong className="text-white">
                            {!editMunicipio || editMunicipio === "Não Informado"
                              ? (lang === "pt" ? "Nenhuma escola selecionada" : lang === "es" ? "Ninguna escuela seleccionada" : "No school selected")
                              : editMunicipio}
                          </strong>
                        </span>
                      </div>
                      {editMunicipio && (
                        <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 ${
                          occupiedSchoolsMap[editMunicipio] && occupiedSchoolsMap[editMunicipio].userId !== user?.id
                            ? "bg-red-500/20 text-red-400 border border-red-500/30"
                            : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        }`}>
                          {occupiedSchoolsMap[editMunicipio] && occupiedSchoolsMap[editMunicipio].userId !== user?.id
                            ? (lang === "pt" ? "Ocupada" : lang === "es" ? "Ocupada" : "Occupied")
                            : (lang === "pt" ? "Disponível" : lang === "es" ? "Disponible" : "Available")}
                        </span>
                      )}
                    </div>

                    {/* Search input */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="w-3.5 h-3.5 text-slate-500" />
                      </div>
                      <input
                        type="text"
                        value={editSearchQuery}
                        onChange={(e) => setEditSearchQuery(e.target.value)}
                        placeholder={lang === "pt" ? "Buscar escola municipal (Serra-ES)..." : lang === "es" ? "Buscar escuela municipal..." : "Search municipal school..."}
                        className="w-full bg-black/30 border border-white/10 hover:border-white/20 focus:border-cyan-400 rounded-xl px-3 py-2 pl-9 outline-none transition-all text-xs text-white placeholder-slate-500"
                      />
                    </div>

                    {/* Filtered school list capped at max-h-[145px] */}
                    <div className="overflow-y-auto max-h-[145px] pr-1 space-y-1.5 scrollbar-thin scrollbar-thumb-white/15 scrollbar-track-transparent">
                      {filteredSchoolsEdit.length > 0 ? (
                        filteredSchoolsEdit.map((school, i) => {
                          const isSelected = editMunicipio === school.name;
                          const occupied = occupiedSchoolsMap[school.name];
                          const isOccupiedByOther = occupied && occupied.userId !== user?.id;
                          const isOccupiedBySelf = occupied && occupied.userId === user?.id;

                          return (
                            <button
                              key={`edit-school-${school.name}-${i}`}
                              type="button"
                              disabled={isOccupiedByOther}
                              onClick={() => {
                                if (!isOccupiedByOther) {
                                  setEditMunicipio(school.name);
                                  setUploadError("");
                                }
                              }}
                              className={`w-full flex items-center gap-2 p-2 rounded-xl transition-all text-left cursor-pointer text-xs ${
                                isOccupiedByOther
                                  ? "bg-red-950/20 border border-red-500/20 opacity-60 cursor-not-allowed"
                                  : isSelected
                                  ? "bg-cyan-500/20 border border-cyan-400/50 shadow-[0_0_10px_rgba(6,182,212,0.15)]"
                                  : "bg-white/[0.02] hover:bg-white/[0.06] border border-white/5"
                              }`}
                            >
                              <div className="w-6 h-6 rounded-full overflow-hidden border border-white/10 shrink-0">
                                <SchoolAvatar avatarUrl={school.avatarUrl} schoolName={school.name} className="w-full h-full" iconClassName="w-3.5 h-3.5" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <span className={`block truncate font-bold text-[11px] ${
                                  isOccupiedByOther ? "text-slate-400" : isSelected ? "text-cyan-300" : "text-slate-200"
                                }`}>
                                  {school.name}
                                </span>
                                {isOccupiedByOther && (
                                  <span className="block text-[9px] font-bold text-red-400/90 truncate">
                                    🔒 {lang === "pt" ? `Ocupada por: ${occupied.managerName}` : lang === "es" ? `Ocupada por: ${occupied.managerName}` : `Occupied by: ${occupied.managerName}`}
                                  </span>
                                )}
                                {isOccupiedBySelf && (
                                  <span className="block text-[9px] font-extrabold text-emerald-400 truncate">
                                    🟢 {lang === "pt" ? "Sua Posse Atual" : lang === "es" ? "Su Posesión Actual" : "Your Current Office"}
                                  </span>
                                )}
                                {!occupied && (
                                  <span className="block text-[8.5px] text-slate-500 font-medium">
                                    ✨ {lang === "pt" ? "Posse Disponível" : lang === "es" ? "Posesión Disponible" : "Office Available"}
                                  </span>
                                )}
                              </div>
                              {isSelected && <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />}
                              {isOccupiedByOther && <Lock className="w-3.5 h-3.5 text-red-400 shrink-0" />}
                            </button>
                          );
                        })
                      ) : (
                        <div className="text-center py-4 text-slate-400 text-xs">
                          {lang === "pt" ? `Nenhuma escola encontrada para "${editSearchQuery}"` : lang === "es" ? `No se encontró escuela para "${editSearchQuery}"` : `No school found for "${editSearchQuery}"`}
                        </div>
                      )}
                    </div>

                    <div className="pt-2 flex gap-2">
                      <button
                        type="button"
                        onClick={() => setShowEditProfileModal(false)}
                        className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-bold transition-all text-center text-xs"
                        disabled={savingProfile}
                      >
                        {lang === "pt" ? "Cancelar" : lang === "es" ? "Cancelar" : "Cancel"}
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black rounded-xl text-xs transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] flex items-center justify-center cursor-pointer"
                        disabled={savingProfile || (occupiedSchoolsMap[editMunicipio] && occupiedSchoolsMap[editMunicipio].userId !== user?.id)}
                      >
                        {savingProfile ? (
                          <div className="w-4 h-4 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                        ) : (
                          lang === "pt" ? "Vincular Escola" : lang === "es" ? "Vincular Escuela" : "Link School"
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                        {lang === "pt" ? "Nova Senha de Acesso" : lang === "es" ? "Nueva Contraseña" : "New Password"}
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-10">
                          <Lock className="w-4 h-4 text-amber-400" />
                        </div>
                        <input
                          type={showNewPassword ? "text" : "password"}
                          required
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full pl-10 pr-10 py-2.5 bg-black/30 border border-white/10 hover:border-white/20 focus:border-amber-400 rounded-xl text-white outline-none transition-all text-xs font-medium placeholder:text-slate-500"
                          placeholder={lang === "pt" ? "Mínimo 6 caracteres..." : "Minimum 6 characters..."}
                          disabled={savingProfile}
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white transition-colors cursor-pointer"
                        >
                          {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                        {lang === "pt" ? "Confirmar Nova Senha" : lang === "es" ? "Confirmar Nueva Contraseña" : "Confirm New Password"}
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-10">
                          <Lock className="w-4 h-4 text-amber-400" />
                        </div>
                        <input
                          type={showConfirmNewPassword ? "text" : "password"}
                          required
                          value={confirmNewPassword}
                          onChange={(e) => setConfirmNewPassword(e.target.value)}
                          className="w-full pl-10 pr-10 py-2.5 bg-black/30 border border-white/10 hover:border-white/20 focus:border-amber-400 rounded-xl text-white outline-none transition-all text-xs font-medium placeholder:text-slate-500"
                          placeholder={lang === "pt" ? "Confirme a nova senha..." : "Confirm new password..."}
                          disabled={savingProfile}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white transition-colors cursor-pointer"
                        >
                          {showConfirmNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <p className="text-[10.5px] text-slate-400 bg-white/[0.02] p-2.5 rounded-xl border border-white/5 leading-relaxed">
                      🔒 {lang === "pt" ? "A nova senha será utilizada no seu próximo acesso para garantir a segurança do cadastro da escola." : "The new password will be used for your next access to secure your school profile."}
                    </p>

                    <div className="pt-2 flex gap-2">
                      <button
                        type="button"
                        onClick={() => setShowEditProfileModal(false)}
                        className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-bold transition-all text-center text-xs cursor-pointer"
                        disabled={savingProfile}
                      >
                        {lang === "pt" ? "Cancelar" : lang === "es" ? "Cancelar" : "Cancel"}
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black rounded-xl text-xs transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)] flex items-center justify-center cursor-pointer"
                        disabled={savingProfile || !newPassword || !confirmNewPassword}
                      >
                        {savingProfile ? (
                          <div className="w-4 h-4 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                        ) : (
                          lang === "pt" ? "Atualizar Senha" : lang === "es" ? "Actualizar Contraseña" : "Update Password"
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Selected Achievement Details Modal */}
      <AnimatePresence>
        {selectedAchievement && (
          <motion.div
            key="achievement-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[160] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedAchievement(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-gradient-to-b from-[#0e172a] via-[#0b1222] to-[#070d18] border border-amber-500/30 p-6 sm:p-8 rounded-3xl shadow-[0_0_50px_rgba(245,158,11,0.2)] w-full max-w-md relative overflow-hidden text-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Background ambient light */}
              <div className={`absolute -top-20 left-1/2 -translate-x-1/2 w-48 h-48 blur-3xl rounded-full pointer-events-none ${selectedAchievement.unlocked ? "bg-amber-500/20" : "bg-cyan-500/10"}`} />

              <button
                type="button"
                onClick={() => setSelectedAchievement(null)}
                className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors cursor-pointer z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Icon Container with Glow */}
              <div className="relative mx-auto mb-4 w-24 h-24 flex items-center justify-center">
                <div className={`absolute inset-0 rounded-2xl rotate-6 transition-all duration-500 ${selectedAchievement.unlocked ? "bg-gradient-to-tr from-amber-500/30 to-orange-500/30 blur-md animate-pulse" : "bg-slate-700/20 blur-sm"}`} />
                
                <div className={`relative w-20 h-20 rounded-2xl flex items-center justify-center border shadow-xl ${
                  selectedAchievement.unlocked
                    ? "bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-yellow-600/20 border-amber-500/50 text-amber-300 shadow-amber-500/20"
                    : "bg-slate-900/80 border-slate-700/50 text-slate-500"
                }`}>
                  <span className="text-4xl drop-shadow-md select-none">{selectedAchievement.icon}</span>
                  {selectedAchievement.unlocked ? (
                    <div className="absolute -bottom-2 -right-2 p-1.5 bg-amber-500 rounded-full text-slate-950 shadow-lg border border-yellow-300">
                      <CheckCircle2 className="w-4 h-4 stroke-[3]" />
                    </div>
                  ) : (
                    <div className="absolute -bottom-2 -right-2 p-1.5 bg-slate-800 rounded-full text-slate-400 shadow-lg border border-slate-600">
                      <Lock className="w-4 h-4" />
                    </div>
                  )}
                </div>
              </div>

              {/* Badge Status */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-3 border backdrop-blur-md">
                {selectedAchievement.unlocked ? (
                  <span className="bg-amber-500/15 border border-amber-500/30 text-amber-400 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-[0_0_10px_rgba(245,158,11,0.2)]">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    {lang === "pt" ? "Conquista Desbloqueada" : lang === "es" ? "Logro Desbloqueado" : "Achievement Unlocked"}
                  </span>
                ) : (
                  <span className="bg-slate-800/60 border border-slate-700 text-slate-400 px-3 py-1 rounded-full flex items-center gap-1.5">
                    <Lock className="w-3 h-3 text-slate-400" />
                    {lang === "pt" ? "Conquista Bloqueada" : lang === "es" ? "Logro Bloqueado" : "Achievement Locked"}
                  </span>
                )}
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-black text-white mb-2 tracking-tight">
                {selectedAchievement.name}
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed mb-5 bg-white/[0.02] border border-white/5 rounded-2xl p-3.5 text-left font-medium">
                {selectedAchievement.desc}
              </p>

              {/* Requirements Card */}
              <div className="bg-[#030712]/60 border border-white/10 rounded-2xl p-4 text-left space-y-2.5 mb-6">
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                  <Info className="w-4 h-4 shrink-0" />
                  <span>{lang === "pt" ? "Como Desbloquear" : lang === "es" ? "Cómo Desbloquear" : "How to Unlock"}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed pl-6">
                  {getAchievementConditionHint(selectedAchievement.index, lang)}
                </p>

                {/* Reward / XP Info */}
                <div className="pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 font-medium">
                    {lang === "pt" ? "Recompensa de Perfil:" : lang === "es" ? "Recompensa de Perfil:" : "Profile Reward:"}
                  </span>
                  <span className="text-amber-400 font-extrabold flex items-center gap-1 font-mono">
                    <Award className="w-3.5 h-3.5" /> +100 PTS / Selo Oficial
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={() => setSelectedAchievement(null)}
                className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black rounded-xl text-sm transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_25px_rgba(245,158,11,0.5)] cursor-pointer"
              >
                {lang === "pt" ? "Entendido" : lang === "es" ? "Entendido" : "Got it"}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Metric Detail Modal (Score Global, Maior Combo, Decisões) */}
      <AnimatePresence>
        {selectedMetricDetail && (
          <motion.div
            key="metric-detail-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[160] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedMetricDetail(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={`bg-gradient-to-b from-[#0e172a] via-[#0b1222] to-[#070d18] border ${
                selectedMetricDetail === 'score'
                  ? 'border-cyan-500/40 shadow-[0_0_50px_rgba(6,182,212,0.25)]'
                  : selectedMetricDetail === 'combo'
                  ? 'border-emerald-500/40 shadow-[0_0_50px_rgba(16,185,129,0.25)]'
                  : 'border-amber-500/40 shadow-[0_0_50px_rgba(245,158,11,0.25)]'
              } p-5 sm:p-7 rounded-3xl w-full max-w-lg relative overflow-hidden text-left max-h-[90vh] overflow-y-auto custom-scrollbar`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Background ambient light */}
              <div
                className={`absolute -top-20 left-1/2 -translate-x-1/2 w-56 h-56 blur-3xl rounded-full pointer-events-none ${
                  selectedMetricDetail === 'score'
                    ? 'bg-cyan-500/15'
                    : selectedMetricDetail === 'combo'
                    ? 'bg-emerald-500/15'
                    : 'bg-amber-500/15'
                }`}
              />

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedMetricDetail(null)}
                className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors cursor-pointer z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* 1. SCORE GLOBAL DETAILS */}
              {selectedMetricDetail === 'score' && (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.25)] shrink-0">
                      <Target className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400">
                        {lang === "pt" ? "Detalhamento de Progresso" : lang === "es" ? "Detalle de Progreso" : "Progress Breakdown"}
                      </span>
                      <h3 className="text-xl font-black text-white tracking-tight">
                        {lang === "pt" ? "Score Global de Gestão" : lang === "es" ? "Puntuación Global de Gestión" : "Global Score Details"}
                      </h3>
                    </div>
                  </div>

                  {/* Main Metric Banner */}
                  <div className="bg-gradient-to-r from-cyan-950/40 via-slate-900/60 to-blue-950/30 border border-cyan-500/25 rounded-2xl p-4 mb-4 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-extrabold text-slate-400 block mb-0.5">
                        {lang === "pt" ? "Pontuação Acumulada" : lang === "es" ? "Puntuación Acumulada" : "Total Points Earned"}
                      </span>
                      <div className="text-3xl font-black text-white font-mono tracking-tight flex items-baseline gap-1.5">
                        <span>{gameState.score ?? profile?.score_acumulado ?? 0}</span>
                        <span className="text-xs text-cyan-400 font-bold">PTS</span>
                      </div>
                    </div>
                    <div className="px-3 py-1.5 bg-cyan-500/15 border border-cyan-500/30 rounded-xl text-xs font-black text-cyan-300">
                      {lang === "pt" ? "Gestor Credenciado" : lang === "es" ? "Gestor Acreditado" : "Accredited Manager"}
                    </div>
                  </div>

                  {/* Breakdown of Indicators */}
                  <div className="space-y-2.5 mb-4">
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-cyan-400" />
                      <span>{lang === "pt" ? "Composição pelos 4 Eixos da Gestão:" : "Score Composition by Axis:"}</span>
                    </h4>

                    {/* Qualidade de Ensino */}
                    <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3 space-y-1.5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-slate-200">
                          {lang === "pt" ? "Qualidade de Ensino & Acessibilidade" : "Teaching Quality & Accessibility"}
                        </span>
                        <span className="font-mono font-black text-cyan-400">{qual} / 100 PTS</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${Math.min(100, qual)}%` }} />
                      </div>
                      <p className="text-[10.5px] text-slate-400 leading-snug">
                        {lang === "pt" 
                          ? "Mede a inovação pedagógica, apoio a alunos PCD e clima escolar seguro." 
                          : "Measures pedagogical innovation, support for students with disabilities, and safe school climate."}
                      </p>
                    </div>

                    {/* Sustentabilidade */}
                    <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3 space-y-1.5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-slate-200">
                          {lang === "pt" ? "Sustentabilidade & Infraestrutura" : "Sustainability & Infrastructure"}
                        </span>
                        <span className="font-mono font-black text-emerald-400">{sust} / 100 PTS</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${Math.min(100, sust)}%` }} />
                      </div>
                      <p className="text-[10.5px] text-slate-400 leading-snug">
                        {lang === "pt" 
                          ? "Reflete a manutenção predial, eficiência de recursos e conservação ambiental." 
                          : "Reflects building maintenance, resource efficiency, and environmental conservation."}
                      </p>
                    </div>

                    {/* Orçamento */}
                    <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3 space-y-1.5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-slate-200">
                          {lang === "pt" ? "Gestão Orçamentária (FUNDEB & PDDE)" : "Budget Management"}
                        </span>
                        <span className="font-mono font-black text-amber-400">{budget} / 100 PTS</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-400 rounded-full" style={{ width: `${Math.min(100, budget)}%` }} />
                      </div>
                      <p className="text-[10.5px] text-slate-400 leading-snug">
                        {lang === "pt" 
                          ? "Avalia a aplicação ética das verbas públicas e conformidade na prestação de contas." 
                          : "Evaluates ethical allocation of public funds and financial compliance."}
                      </p>
                    </div>

                    {/* Direitos e Inclusão */}
                    <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3 space-y-1.5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-slate-200">
                          {lang === "pt" ? "Conformidade Legal & LBI (Inclusão)" : "Legal Compliance & LBI"}
                        </span>
                        <span className="font-mono font-black text-purple-400">{rights} / 100 PTS</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-400 rounded-full" style={{ width: `${Math.min(100, rights)}%` }} />
                      </div>
                      <p className="text-[10.5px] text-slate-400 leading-snug">
                        {lang === "pt" 
                          ? "Cumprimento das diretrizes da Lei Brasileira de Inclusão e garantias de direitos." 
                          : "Compliance with Brazilian Inclusion Law directives and student rights guarantees."}
                      </p>
                    </div>
                  </div>

                  {/* Summary Footer */}
                  <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl text-[11px] text-slate-300 leading-relaxed">
                    💡 <strong className="text-cyan-300">{lang === "pt" ? "Como evoluir seu Score:" : "How to increase your score:"}</strong> {lang === "pt" ? "Cada escolha assertiva nos cenários práticos concede +10 a +25 PTS, multiplicados por combos e conquistas." : "Each assertive choice in practical scenarios awards +10 to +25 PTS, boosted by combos and achievements."}
                  </div>
                </>
              )}

              {/* 2. MAIOR COMBO DETAILS */}
              {selectedMetricDetail === 'combo' && (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.25)] shrink-0">
                      <Zap className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">
                        {lang === "pt" ? "Detalhamento de Sequência" : lang === "es" ? "Detalle de Racha" : "Streak Breakdown"}
                      </span>
                      <h3 className="text-xl font-black text-white tracking-tight">
                        {lang === "pt" ? "Maior Combo de Respostas" : lang === "es" ? "Mayor Combo de Respuestas" : "Max Combo Streak"}
                      </h3>
                    </div>
                  </div>

                  {/* Main Metric Banner */}
                  <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900/60 to-teal-950/30 border border-emerald-500/25 rounded-2xl p-4 mb-4 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-extrabold text-slate-400 block mb-0.5">
                        {lang === "pt" ? "Maior Sequência Recorde" : lang === "es" ? "Mayor Racha Record" : "Highest Record Streak"}
                      </span>
                      <div className="text-3xl font-black text-white font-mono tracking-tight flex items-baseline gap-1.5">
                        <span>{gameState.maxCombo}x</span>
                        <span className="text-xs text-emerald-400 font-bold uppercase">
                          {lang === "pt" ? "Acertos Seguidos" : "In a Row"}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-extrabold text-slate-400 block mb-0.5">
                        {lang === "pt" ? "Combo Atual" : "Current Combo"}
                      </span>
                      <span className="text-xl font-black text-emerald-300 font-mono">
                        {gameState.combo || 0}x
                      </span>
                    </div>
                  </div>

                  {/* Multiplier Scale Info */}
                  <div className="space-y-3 mb-4">
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      <span>{lang === "pt" ? "Tabela de Bônus de Multiplicador:" : "Multiplier Bonus Scale:"}</span>
                    </h4>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-white/[0.02] border border-white/5 p-3 rounded-xl">
                        <span className="block text-[10px] text-slate-400 uppercase font-bold">1x - 2x {lang === "pt" ? "Acertos" : "Correct"}</span>
                        <span className="text-xs font-extrabold text-slate-200">{lang === "pt" ? "Pontuação Padrão (+0%)" : "Standard Score (+0%)"}</span>
                      </div>
                      <div className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl">
                        <span className="block text-[10px] text-emerald-400 uppercase font-bold">3x - 4x {lang === "pt" ? "Acertos" : "Correct"}</span>
                        <span className="text-xs font-extrabold text-emerald-300">{lang === "pt" ? "Bônus de +25% PTS" : "+25% PTS Bonus"}</span>
                      </div>
                      <div className="bg-emerald-500/15 border border-emerald-500/30 p-3 rounded-xl">
                        <span className="block text-[10px] text-emerald-400 uppercase font-bold">5x - 7x {lang === "pt" ? "Acertos" : "Correct"}</span>
                        <span className="text-xs font-extrabold text-emerald-300">{lang === "pt" ? "Bônus de +50% PTS" : "+50% PTS Bonus"}</span>
                      </div>
                      <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-400/40 p-3 rounded-xl">
                        <span className="block text-[10px] text-emerald-300 uppercase font-bold">8x+ Super Combo</span>
                        <span className="text-xs font-black text-emerald-200">{lang === "pt" ? "Bônus Máximo (+100%)" : "Max Bonus (+100%)"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Explanation Card */}
                  <div className="p-3 bg-[#030712]/60 border border-white/10 rounded-2xl text-xs text-slate-300 space-y-1.5">
                    <div className="font-bold text-emerald-400 flex items-center gap-1.5 text-[11px]">
                      <Info className="w-3.5 h-3.5" />
                      <span>{lang === "pt" ? "Como é calculado o Combo?" : "How is Combo calculated?"}</span>
                    </div>
                    <p className="text-[10.5px] text-slate-400 leading-relaxed">
                      {lang === "pt"
                        ? "Manter uma sequência contínua de decisões pedagógicas e financeiras sem cometer deslizes eleva o seu multiplicador. Uma escolha incorreta reinicia a contagem atual, mas o seu recorde fica salvo!"
                        : "Maintaining a continuous streak of correct decisions increases your multiplier. An incorrect choice resets the current streak, but your record stays saved!"}
                    </p>
                  </div>
                </>
              )}

              {/* 3. DECISÕES DETAILS */}
              {selectedMetricDetail === 'decisions' && (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.25)] shrink-0">
                      <Trophy className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">
                        {lang === "pt" ? "Histórico de Resoluções" : lang === "es" ? "Historial de Resoluciones" : "Resolution History"}
                      </span>
                      <h3 className="text-xl font-black text-white tracking-tight">
                        {lang === "pt" ? "Detalhamento de Decisões" : lang === "es" ? "Detalle de Decisiones" : "Decisions Breakdown"}
                      </h3>
                    </div>
                  </div>

                  {/* Main Metric Banner */}
                  <div className="bg-gradient-to-r from-amber-950/40 via-slate-900/60 to-orange-950/30 border border-amber-500/25 rounded-2xl p-4 mb-4 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-extrabold text-slate-400 block mb-0.5">
                        {lang === "pt" ? "Decisões Assertivas" : "Assertive Decisions"}
                      </span>
                      <div className="text-3xl font-black text-white font-mono tracking-tight flex items-baseline gap-1">
                        <span>{rights}</span>
                        <span className="text-sm text-slate-400 font-bold">/ {totalQuestions}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-extrabold text-slate-400 block mb-0.5">
                        {lang === "pt" ? "Taxa de Assertividade" : "Accuracy Rate"}
                      </span>
                      <span className="text-2xl font-black text-amber-400 font-mono">
                        {Math.min(100, Math.round((rights / Math.max(1, totalQuestions)) * 100))}%
                      </span>
                    </div>
                  </div>

                  {/* Progress Info Grid */}
                  <div className="space-y-3 mb-4">
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-amber-400" />
                      <span>{lang === "pt" ? "Resumo de Atuação em Casos Práticos:" : "Practical Cases Summary:"}</span>
                    </h4>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-white/[0.02] border border-white/5 p-3 rounded-xl">
                        <span className="block text-[10px] text-slate-400 uppercase font-bold">{lang === "pt" ? "Cenários Enfrentados" : "Scenarios Faced"}</span>
                        <span className="text-base font-black text-white font-mono">{sc} {lang === "pt" ? "Casos" : "Cases"}</span>
                      </div>
                      <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl">
                        <span className="block text-[10px] text-amber-400 uppercase font-bold">{lang === "pt" ? "Escolhas Alinhadas" : "Aligned Choices"}</span>
                        <span className="text-base font-black text-amber-300 font-mono">{rights} {lang === "pt" ? "Decisões" : "Decisions"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Context Guidance Card */}
                  <div className="p-3 bg-[#030712]/60 border border-white/10 rounded-2xl text-xs text-slate-300 space-y-1.5">
                    <div className="font-bold text-amber-400 flex items-center gap-1.5 text-[11px]">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{lang === "pt" ? "Alinhamento com LBI, FUNDEB e LDB" : "LBI & FUNDEB Alignment"}</span>
                    </div>
                    <p className="text-[10.5px] text-slate-400 leading-relaxed">
                      {lang === "pt"
                        ? "Mede a capacidade de gerir verbas com ética, promover inclusão escolar sem discriminação e assegurar o cumprimento de prazos administrativos e pedagógicos."
                        : "Measures the ability to manage public funds ethically, promote inclusion, and ensure administrative compliance."}
                    </p>
                  </div>
                </>
              )}

              {/* Understand / Close Button */}
              <button
                type="button"
                onClick={() => setSelectedMetricDetail(null)}
                className={`w-full mt-4 py-3 bg-gradient-to-r ${
                  selectedMetricDetail === 'score'
                    ? 'from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-[0_0_20px_rgba(6,182,212,0.3)]'
                    : selectedMetricDetail === 'combo'
                    ? 'from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                    : 'from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 shadow-[0_0_20px_rgba(245,158,11,0.3)]'
                } text-slate-950 font-black rounded-xl text-xs sm:text-sm transition-all cursor-pointer text-center`}
              >
                {lang === "pt" ? "Entendido" : lang === "es" ? "Entendido" : "Got it"}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
