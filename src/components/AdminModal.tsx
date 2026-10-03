import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, 
  ShieldAlert, 
  X, 
  Search, 
  Key, 
  Eye, 
  EyeOff, 
  UserCheck, 
  UserX, 
  Building2, 
  Lock, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  UserPlus, 
  Edit3, 
  Trash2, 
  LogOut, 
  Sparkles, 
  School,
  KeyRound,
  ChevronRight,
  Filter
} from "lucide-react";
import { ES_SERRA_SCHOOLS } from "../data/schools";
import { SchoolAvatar } from "./SchoolAvatar";
import { useSound } from "../hooks/useSound";
import { Language } from "../types";
import { supabase } from "../lib/supabase";
import { t } from "../locales";

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

interface ManagerRecord {
  nome: string;
  password?: string;
  schoolName: string;
  registeredAt?: string;
  updatedAt?: string;
}

export function AdminModal({ isOpen, onClose, lang }: AdminModalProps) {
  const { playClick, playTick } = useSound();

  // Admin auth state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminUsername, setAdminUsername] = useState("ramon.oliveira.developer@gmail.com");
  const [adminPassword, setAdminPassword] = useState("");
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Registered managers dataset
  const [registeredMap, setRegisteredMap] = useState<Record<string, ManagerRecord>>({});
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "registered" | "pending">("all");

  // Reset password modal state
  const [resetTarget, setResetTarget] = useState<{
    cleanSchool: string;
    schoolName: string;
    currentManager: string;
    currentPassword?: string;
  } | null>(null);

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [newManagerName, setNewManagerName] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [resetError, setResetError] = useState("");
  const [resetSuccess, setResetSuccess] = useState("");
  const [isSavingPassword, setIsSavingPassword] = useState(false);

  // Visible passwords toggles map
  const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});

  // Global notification banner
  const [bannerMsg, setBannerMsg] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Helper to normalize school name to key
  const getCleanSchoolKey = (schoolName: string) => {
    return schoolName
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");
  };

  // Load registered managers data from localStorage & Supabase
  const loadRegisteredManagers = async () => {
    setIsLoadingData(true);
    let localData: Record<string, ManagerRecord> = {};

    try {
      const stored = localStorage.getItem("serra_registered_schools");
      if (stored) {
        localData = JSON.parse(stored);
      }
    } catch (err) {
      console.warn("Failed to load local registered schools:", err);
    }

    // Attempt to merge with Supabase profiles if active
    if (supabase) {
      try {
        const { data: profiles } = await supabase
          .from("profiles")
          .select("id, nome, municipio, senha, created_at");

        if (profiles && profiles.length > 0) {
          profiles.forEach((p: any) => {
            if (p.municipio) {
              const cleanKey = getCleanSchoolKey(p.municipio);
              if (!localData[cleanKey]) {
                localData[cleanKey] = {
                  nome: p.nome || "Gestor(a)",
                  schoolName: p.municipio,
                  password: p.senha || "",
                  registeredAt: p.created_at,
                };
              } else {
                if (p.nome) localData[cleanKey].nome = p.nome;
                if (p.senha) localData[cleanKey].password = p.senha;
              }
            }
          });
        }
      } catch (e) {
        console.warn("Supabase fetch notice:", e);
      }
    }

    setRegisteredMap(localData);
    setIsLoadingData(false);
  };

  useEffect(() => {
    if (isOpen && isAdminLoggedIn) {
      loadRegisteredManagers();
    }
  }, [isOpen, isAdminLoggedIn]);

  // Admin login handler
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    playClick();
    setIsAuthenticating(true);
    setLoginError("");

    const inputUser = adminUsername.trim().toLowerCase();
    const inputPass = adminPassword.trim();

    // Primary official admin credentials requested
    const isOfficialAdminUser = inputUser === "ramon.oliveira.developer@gmail.com";
    const isOfficialAdminPass = inputPass === "Zenfonemaxprom2";

    // Legacy fallback credentials (admin, admin123, serra2026, seme2026)
    const customAdminPass = localStorage.getItem("serra_admin_master_password") || "admin123";
    const isFallbackUser = inputUser === "admin" || inputUser === "seme" || inputUser === "administrador";
    const isFallbackPass = [customAdminPass, "admin", "admin123", "serra2026", "seme2026"].includes(inputPass);

    setTimeout(() => {
      if ((isOfficialAdminUser && isOfficialAdminPass) || (isFallbackUser && isFallbackPass)) {
        setIsAdminLoggedIn(true);
        setIsAuthenticating(false);
        setAdminPassword("");
        loadRegisteredManagers();
      } else {
        setIsAuthenticating(false);
        setLoginError(
          lang === "pt"
            ? "E-mail ou senha de Administrador incorretos."
            : lang === "es"
              ? "Correo o contraseña de administrador incorrectos."
              : "Incorrect admin email or password."
        );
      }
    }, 400);
  };

  const togglePasswordVisibility = (key: string) => {
    playTick();
    setVisiblePasswords((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Open reset password dialog
  const handleOpenReset = (schoolName: string, currentRecord?: ManagerRecord) => {
    playClick();
    const cleanKey = getCleanSchoolKey(schoolName);
    setResetTarget({
      cleanSchool: cleanKey,
      schoolName: schoolName,
      currentManager: currentRecord?.nome || "",
      currentPassword: currentRecord?.password || "",
    });
    setNewManagerName(currentRecord?.nome || "");
    setNewPassword("");
    setConfirmNewPassword("");
    setResetError("");
    setResetSuccess("");
  };

  // Save new password for manager
  const handleSaveResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    playClick();
    if (!resetTarget) return;

    if (!newManagerName.trim()) {
      setResetError(lang === "pt" ? "Por favor, informe o nome do gestor(a)." : "Please enter manager name.");
      return;
    }

    if (!newPassword) {
      setResetError(lang === "pt" ? "Por favor, digite a nova senha." : "Please enter the new password.");
      return;
    }

    if (newPassword.length < 4) {
      setResetError(lang === "pt" ? "A nova senha deve ter pelo menos 4 caracteres." : "New password must be at least 4 characters.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setResetError(lang === "pt" ? "As senhas digitadas não coincidem." : "Passwords do not match.");
      return;
    }

    setIsSavingPassword(true);
    setResetError("");

    try {
      const stored = localStorage.getItem("serra_registered_schools") || "{}";
      const localMap = JSON.parse(stored);

      const existingRecord = localMap[resetTarget.cleanSchool] || {};
      const updatedRecord: ManagerRecord = {
        ...existingRecord,
        nome: newManagerName.trim(),
        password: newPassword,
        schoolName: resetTarget.schoolName,
        updatedAt: new Date().toISOString(),
      };

      localMap[resetTarget.cleanSchool] = updatedRecord;
      localStorage.setItem("serra_registered_schools", JSON.stringify(localMap));

      // Update in Supabase profiles if possible
      if (supabase) {
        try {
          const cleanSchool = resetTarget.cleanSchool;
          const schoolEmail = `gestor_${cleanSchool}_serra@serra.es.gov.br`;

          await supabase.from("profiles").upsert({
            nome: newManagerName.trim(),
            municipio: resetTarget.schoolName,
            updated_at: new Date().toISOString(),
          }, { onConflict: "municipio" });
        } catch (supaErr) {
          console.warn("Notice updating Supabase profile password:", supaErr);
        }
      }

      setRegisteredMap(localMap);
      setIsSavingPassword(false);

      const msg = lang === "pt"
        ? `Senha alterada com sucesso para o(a) gestor(a) "${newManagerName.trim()}" (${resetTarget.schoolName})!`
        : `Password updated successfully for ${newManagerName.trim()}!`;

      setBannerMsg({ text: msg, type: "success" });
      setResetTarget(null);

      setTimeout(() => {
        setBannerMsg(null);
      }, 5000);

    } catch (err) {
      console.error("Error saving new password:", err);
      setIsSavingPassword(false);
      setResetError(lang === "pt" ? "Erro ao salvar nova senha no banco local." : "Failed to update password.");
    }
  };

  // Delete/Clear manager registration
  const handleRemoveManager = (schoolName: string, managerName: string) => {
    playClick();
    if (!window.confirm(lang === "pt" 
      ? `Tem certeza que deseja remover o cadastro do gestor(a) "${managerName}" da escola "${schoolName}"?`
      : `Are you sure you want to remove manager ${managerName}?`)) {
      return;
    }

    try {
      const cleanKey = getCleanSchoolKey(schoolName);
      const stored = localStorage.getItem("serra_registered_schools") || "{}";
      const localMap = JSON.parse(stored);

      if (localMap[cleanKey]) {
        delete localMap[cleanKey];
        localStorage.setItem("serra_registered_schools", JSON.stringify(localMap));
        setRegisteredMap(localMap);
        setBannerMsg({
          text: lang === "pt" 
            ? `Cadastro do gestor(a) da escola "${schoolName}" removido.`
            : `Manager registration removed.`,
          type: "success"
        });
        setTimeout(() => setBannerMsg(null), 4000);
      }
    } catch (e) {
      console.error("Remove manager error:", e);
    }
  };

  // Filtered schools
  const filteredSchools = ES_SERRA_SCHOOLS.filter((school) => {
    const cleanKey = getCleanSchoolKey(school.name);
    const isRegistered = !!registeredMap[cleanKey];
    const record = registeredMap[cleanKey];

    // Status filter
    if (filterStatus === "registered" && !isRegistered) return false;
    if (filterStatus === "pending" && isRegistered) return false;

    // Search query
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const nameMatch = school.name.toLowerCase().includes(q);
    const managerMatch = record?.nome?.toLowerCase().includes(q) || false;

    return nameMatch || managerMatch;
  });

  const totalSchools = ES_SERRA_SCHOOLS.length;
  const totalRegistered = Object.keys(registeredMap).length;
  const totalPending = Math.max(0, totalSchools - totalRegistered);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="admin-modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[10000] flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-xl overflow-y-auto"
      >
        <motion.div
          key="admin-modal-container"
          initial={{ scale: 0.94, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 15 }}
          className="bg-[#0b1120] border border-cyan-500/30 rounded-2xl sm:rounded-3xl shadow-[0_0_60px_rgba(0,240,255,0.25)] w-full max-w-5xl text-white relative overflow-hidden flex flex-col max-h-[92vh]"
        >
          {/* Header Glow */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-500 via-teal-400 to-blue-600 shadow-[0_0_15px_rgba(0,240,255,0.8)]" />

          {/* Top Bar */}
          <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between shrink-0 bg-[#050914]/80 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.2)] shrink-0">
                <ShieldCheck className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-xl font-black text-white tracking-tight">
                    {lang === "pt" ? "Painel de Administração SEME" : "SEME Administration Panel"}
                  </h2>
                  <span className="text-[9px] font-mono font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded-full uppercase tracking-wider hidden sm:inline-block">
                    SERRA - ES
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-white/50">
                  {lang === "pt"
                    ? "Gestão e controle de acesso das Unidades Escolares Municipais"
                    : "Municipal School Units Access Management"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {isAdminLoggedIn && (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      playClick();
                      loadRegisteredManagers();
                    }}
                    onMouseEnter={playTick}
                    className="p-2 sm:px-3 sm:py-2 bg-white/5 hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-500/30 text-cyan-300 rounded-xl transition-all text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                    title="Atualizar Dados"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isLoadingData ? "animate-spin text-cyan-400" : ""}`} />
                    <span className="hidden sm:inline">Atualizar</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      playClick();
                      setIsAdminLoggedIn(false);
                    }}
                    onMouseEnter={playTick}
                    className="p-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 hover:text-red-300 rounded-xl transition-all cursor-pointer active:scale-95"
                    title={lang === "pt" ? "Sair do Painel Admin" : "Logout Admin Panel"}
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </>
              )}

              <button
                type="button"
                onClick={() => {
                  playClick();
                  onClose();
                }}
                onMouseEnter={playTick}
                className="p-2 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white rounded-full transition-all cursor-pointer active:scale-95"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Banner notification if present */}
          <AnimatePresence>
            {bannerMsg && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className={`px-5 py-2.5 text-xs sm:text-sm font-semibold flex items-center justify-between border-b ${
                  bannerMsg.type === "success"
                    ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-300"
                    : "bg-red-500/20 border-red-500/30 text-red-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{bannerMsg.text}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setBannerMsg(null)}
                  className="text-white/60 hover:text-white p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Body Content */}
          <div className="p-4 sm:p-6 overflow-y-auto flex-1">
            {!isAdminLoggedIn ? (
              /* ================= LOGIN FORM FOR ADMIN ================= */
              <div className="max-w-md mx-auto my-6 sm:my-10 bg-[#050812]/80 border border-cyan-500/30 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.5)] relative overflow-hidden">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-400/40 text-cyan-400 flex items-center justify-center mx-auto mb-3 shadow-[0_0_20px_rgba(0,240,255,0.2)]">
                    <Lock className="w-8 h-8 text-cyan-400" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    {lang === "pt" ? "Autenticação do Administrador" : "Administrator Login"}
                  </h3>
                  <p className="text-xs text-white/50 mt-1">
                    {lang === "pt"
                      ? "Digite suas credenciais de gestor master da SEME para acessar o gerenciamento de senhas."
                      : "Enter SEME master admin credentials to manage managers and passwords."}
                  </p>
                </div>

                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-bold text-cyan-400 uppercase tracking-wider mb-1.5">
                      {lang === "pt" ? "E-mail do Administrador" : "Admin Email"}
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        value={adminUsername}
                        onChange={(e) => setAdminUsername(e.target.value)}
                        placeholder="ramon.oliveira.developer@gmail.com"
                        className="w-full bg-[#02050c] border border-white/10 hover:border-cyan-500/40 text-white placeholder-white/30 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 rounded-xl px-4 py-2.5 outline-none transition-all text-xs sm:text-sm font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-cyan-400 uppercase tracking-wider mb-1.5">
                      {lang === "pt" ? "Senha de Acesso" : "Access Password"}
                    </label>
                    <div className="relative">
                      <input
                        type={showAdminPassword ? "text" : "password"}
                        required
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-[#02050c] border border-white/10 hover:border-cyan-500/40 text-white placeholder-white/30 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 rounded-xl px-4 py-2.5 pr-10 outline-none transition-all text-xs sm:text-sm font-medium"
                      />
                      <button
                        type="button"
                        onClick={() => setShowAdminPassword(!showAdminPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/40 hover:text-white"
                      >
                        {showAdminPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {loginError && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs font-medium text-center">
                      {loginError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isAuthenticating}
                    className="w-full bg-gradient-to-r from-cyan-500 via-teal-400 to-blue-600 hover:brightness-110 text-slate-950 font-black uppercase tracking-wider text-xs sm:text-sm py-3 rounded-xl shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isAuthenticating ? (
                      <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>{lang === "pt" ? "ENTRAR NO PAINEL" : "ACCESS PANEL"}</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              /* ================= ADMIN DASHBOARD CONTENT ================= */
              <div className="space-y-5">
                {/* Metrics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-[#050814]/80 border border-cyan-500/20 rounded-2xl p-4 flex items-center justify-between shadow-inner">
                    <div>
                      <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-0.5">
                        {lang === "pt" ? "Escolas Mapeadas" : "Mapped Schools"}
                      </div>
                      <div className="text-2xl font-black text-white">{totalSchools} <span className="text-xs text-white/40 font-normal">EMEFs</span></div>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
                      <School className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="bg-[#050814]/80 border border-emerald-500/20 rounded-2xl p-4 flex items-center justify-between shadow-inner">
                    <div>
                      <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-0.5">
                        {lang === "pt" ? "Gestores Cadastrados" : "Registered Managers"}
                      </div>
                      <div className="text-2xl font-black text-emerald-300">{totalRegistered} <span className="text-xs text-emerald-400/60 font-normal">com acesso</span></div>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <UserCheck className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="bg-[#050814]/80 border border-amber-500/20 rounded-2xl p-4 flex items-center justify-between shadow-inner">
                    <div>
                      <div className="text-[10px] font-bold text-amber-400 uppercase tracking-widest mb-0.5">
                        {lang === "pt" ? "Escolas Pendentes" : "Pending Schools"}
                      </div>
                      <div className="text-2xl font-black text-amber-300">{totalPending} <span className="text-xs text-amber-400/60 font-normal">sem gestor</span></div>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
                      <UserX className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Search & Filter Bar */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#050814]/60 border border-white/10 rounded-2xl p-3">
                  {/* Search Input */}
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={lang === "pt" ? "Buscar por escola ou nome do gestor..." : "Search by school or manager name..."}
                      className="w-full bg-[#02050c] border border-white/10 hover:border-cyan-500/30 text-white placeholder-white/30 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 rounded-xl pl-10 pr-4 py-2 outline-none text-xs sm:text-sm font-medium"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Status Filters */}
                  <div className="flex items-center gap-1.5 bg-[#02050c] p-1 rounded-xl border border-white/5 shrink-0">
                    <button
                      type="button"
                      onClick={() => { playTick(); setFilterStatus("all"); }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        filterStatus === "all"
                          ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-[0_0_10px_rgba(0,240,255,0.2)]"
                          : "text-white/50 hover:text-white"
                      }`}
                    >
                      Todas ({totalSchools})
                    </button>
                    <button
                      type="button"
                      onClick={() => { playTick(); setFilterStatus("registered"); }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        filterStatus === "registered"
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.2)]"
                          : "text-white/50 hover:text-white"
                      }`}
                    >
                      Cadastradas ({totalRegistered})
                    </button>
                    <button
                      type="button"
                      onClick={() => { playTick(); setFilterStatus("pending"); }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        filterStatus === "pending"
                          ? "bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.2)]"
                          : "text-white/50 hover:text-white"
                      }`}
                    >
                      Pendentes ({totalPending})
                    </button>
                  </div>
                </div>

                {/* Table / List of Schools */}
                <div className="bg-[#050814]/80 border border-white/10 rounded-2xl overflow-hidden">
                  <div className="p-3 bg-[#080d1e] border-b border-white/10 text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest flex items-center justify-between">
                    <span>LISTA DE UNIDADES ESCOLARES DE SERRA ({filteredSchools.length})</span>
                    <span className="text-white/40 font-sans normal-case text-xs">Ações: Cadastrar, Redefinir Senha e Gerenciar</span>
                  </div>

                  <div className="divide-y divide-white/5 max-h-[480px] overflow-y-auto">
                    {filteredSchools.length === 0 ? (
                      <div className="p-8 text-center text-white/40 text-xs">
                        Nenhuma escola encontrada para o filtro ou pesquisa inserida.
                      </div>
                    ) : (
                      filteredSchools.map((school) => {
                        const cleanKey = getCleanSchoolKey(school.name);
                        const record = registeredMap[cleanKey];
                        const isRegistered = !!record;
                        const isPasswordVisible = visiblePasswords[cleanKey] || false;

                        return (
                          <div
                            key={school.name}
                            className="p-3.5 sm:p-4 hover:bg-white/[0.02] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                          >
                            {/* Left: School Info & Avatar */}
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                              <div className="w-10 h-10 rounded-full border border-cyan-500/30 overflow-hidden bg-[#02050c] shrink-0 p-0.5">
                                <SchoolAvatar
                                  avatarUrl={school.avatarUrl}
                                  schoolName={school.name}
                                  className="w-full h-full rounded-full"
                                  iconClassName="w-5 h-5 text-cyan-400"
                                />
                              </div>

                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                                    {school.name}
                                  </h4>

                                  {isRegistered ? (
                                    <span className="inline-flex items-center gap-1 bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[9px] font-bold px-2 py-0.5 rounded-full">
                                      <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                                      CADASTRADO
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center gap-1 bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[9px] font-bold px-2 py-0.5 rounded-full">
                                      <AlertCircle className="w-2.5 h-2.5 text-amber-400" />
                                      PENDENTE
                                    </span>
                                  )}
                                </div>

                                <div className="text-[11px] text-white/60 mt-0.5 flex items-center gap-2 flex-wrap">
                                  {isRegistered ? (
                                    <>
                                      <span className="font-semibold text-cyan-300">
                                        Gestor(a): {record.nome || "Não informado"}
                                      </span>
                                      <span className="text-white/20">•</span>
                                      <span className="font-mono text-[10px] text-white/50 flex items-center gap-1">
                                        <span>Senha:</span>
                                        <code className="bg-black/50 px-1.5 py-0.5 rounded text-amber-300 border border-white/10 font-bold">
                                          {isPasswordVisible
                                            ? record.password || (lang === "pt" ? "Não cadastrada" : "Not set")
                                            : "••••••••"}
                                        </code>
                                        <button
                                          type="button"
                                          onClick={() => togglePasswordVisibility(cleanKey)}
                                          className="text-white/40 hover:text-cyan-400 ml-0.5 cursor-pointer"
                                          title={isPasswordVisible ? "Ocultar Senha" : "Ver Senha"}
                                        >
                                          {isPasswordVisible ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                                        </button>
                                      </span>
                                    </>
                                  ) : (
                                    <span className="text-white/40 italic">
                                      Nenhum gestor cadastrado para esta escola ainda.
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Right: Action Buttons */}
                            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                              {isRegistered ? (
                                <>
                                  <button
                                    type="button"
                                    onClick={() => handleOpenReset(school.name, record)}
                                    onMouseEnter={playTick}
                                    className="px-3 py-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 hover:text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-[0_0_10px_rgba(0,240,255,0.1)]"
                                  >
                                    <KeyRound className="w-3.5 h-3.5 text-cyan-400" />
                                    <span>Redefinir Senha</span>
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => handleRemoveManager(school.name, record.nome)}
                                    onMouseEnter={playTick}
                                    className="p-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 rounded-xl transition-all cursor-pointer"
                                    title="Remover Cadastro do Gestor"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => handleOpenReset(school.name, undefined)}
                                  onMouseEnter={playTick}
                                  className="px-3 py-1.5 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 hover:text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-[0_0_10px_rgba(16,185,129,0.1)]"
                                >
                                  <UserPlus className="w-3.5 h-3.5 text-emerald-400" />
                                  <span>Cadastrar Gestor</span>
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* Bottom System Footer */}
                <div className="flex items-center justify-center border-t border-white/10 pt-4 text-center">
                  <p className="text-[10px] sm:text-xs text-white/40 font-mono tracking-wider uppercase">
                    {t(lang, "start_title")} &copy; 2026 • SECRETARIA MUNICIPAL DE EDUCAÇÃO (SEME) - SERRA / ES
                  </p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* ================= MODAL DE REDEFINIÇÃO DE SENHA DO GESTOR ================= */}
      <AnimatePresence>
        {resetTarget && (
          <motion.div
            key="reset-password-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10010] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          >
            <motion.div
              key="reset-password-container"
              initial={{ scale: 0.9, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 10 }}
              className="bg-[#0c1324] border border-cyan-400/50 rounded-2xl p-6 shadow-[0_0_50px_rgba(0,240,255,0.3)] w-full max-w-lg text-white relative overflow-hidden"
            >
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
                    <KeyRound className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Redefinir Senha do Gestor</h3>
                    <p className="text-[11px] text-cyan-300 font-mono uppercase tracking-wider truncate max-w-[280px]">
                      {resetTarget.schoolName}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setResetTarget(null)}
                  className="text-white/50 hover:text-white p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveResetPassword} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-cyan-400 uppercase tracking-wider mb-1">
                    Nome Completo do Gestor(a)
                  </label>
                  <input
                    type="text"
                    required
                    value={newManagerName}
                    onChange={(e) => setNewManagerName(e.target.value)}
                    placeholder="Ex: Maria das Graças Silva"
                    className="w-full bg-[#030611] border border-white/10 hover:border-cyan-500/40 text-white placeholder-white/30 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 rounded-xl px-4 py-2.5 outline-none text-xs sm:text-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-cyan-400 uppercase tracking-wider mb-1">
                    Nova Senha de Acesso
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Mínimo 4 caracteres"
                      className="w-full bg-[#030611] border border-white/10 hover:border-cyan-500/40 text-white placeholder-white/30 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 rounded-xl px-4 py-2.5 pr-10 outline-none text-xs sm:text-sm font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/40 hover:text-white cursor-pointer"
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-cyan-400 uppercase tracking-wider mb-1">
                    Confirmar Nova Senha
                  </label>
                  <input
                    type={showNewPassword ? "text" : "password"}
                    required
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    placeholder="Repita a nova senha"
                    className="w-full bg-[#030611] border border-white/10 hover:border-cyan-500/40 text-white placeholder-white/30 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 rounded-xl px-4 py-2.5 outline-none text-xs sm:text-sm font-medium"
                  />
                </div>

                {resetError && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs font-medium text-center">
                    {resetError}
                  </div>
                )}

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setResetTarget(null)}
                    className="px-4 py-2.5 rounded-xl border border-white/10 text-white/70 hover:text-white hover:bg-white/5 text-xs font-bold cursor-pointer"
                  >
                    Cancelar
                  </button>

                  <button
                    type="submit"
                    disabled={isSavingPassword}
                    className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-teal-400 hover:brightness-110 text-slate-950 font-black uppercase tracking-wider text-xs rounded-xl shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    {isSavingPassword ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Salvar Nova Senha</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
}
