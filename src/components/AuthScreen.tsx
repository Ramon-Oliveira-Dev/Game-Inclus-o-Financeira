import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MountainScene } from "./MountainScene";
import {
  Building2,
  User,
  ChevronRight,
  LogIn,
  Search,
  X,
  Sparkles,
  Trophy,
  GraduationCap,
  DollarSign,
  LineChart,
  Users,
  Scale,
  Play,
  MapPin,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  ShieldCheck,
  Check,
  UserCheck,
  UserPlus,
  Globe,
} from "lucide-react";

const getTitle = (lang: Language) => {
  if (lang === "en") return "FINANCIAL INCLUSION";
  if (lang === "es") return "INCLUSIÓN FINANCIERA";
  return "INCLUSÃO FINANCEIRA";
};

const getSubtitle = (lang: Language) => {
  if (lang === "en") return "THE SPECIAL EDUCATION CHALLENGE";
  if (lang === "es") return "EL DESAFÍO DE LA EDUCACIÓN ESPECIAL";
  return "O DESAFIO DA EDUCAÇÃO ESPECIAL.";
};
import { Language } from "../types";
import { useSound } from "../hooks/useSound";
import { supabase } from "../lib/supabase";
import { ES_SERRA_SCHOOLS, getAvatarForSchool } from "../data/schools";
import { useAuth } from "../contexts/AuthContext";

import { SchoolAvatar } from "./SchoolAvatar";

interface AuthScreenProps {
  onLogin: (userProfile: any) => void;
  lang: Language;
  setLang?: (lang: Language) => void;
  onOpenAdmin?: () => void;
}

export function AuthScreen({ onLogin, lang, setLang, onOpenAdmin }: AuthScreenProps) {
  const { signInLocal, setProfile } = useAuth();
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showSchoolModal, setShowSchoolModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"form">("form");
  const [authMode, setAuthMode] = useState<"register" | "login">("register");
  const [claimedSchools, setClaimedSchools] = useState<string[]>([]);
  const [showAllSchools, setShowAllSchools] = useState(false);
  const [successData, setSuccessData] = useState<{
    name: string;
    city: string;
    email: string;
    isGuest: boolean;
    profileObj: any;
  } | null>(null);
  const [welcomeBackData, setWelcomeBackData] = useState<{
    name: string;
    school: string;
    email: string;
    profileObj: any;
  } | null>(null);

  const getManagerProgressSummary = (profileId?: string, profileObj?: any) => {
    let score = profileObj?.score_acumulado || 0;
    let phase = 0; // 0-indexed (Módulo 1)
    let scenario = 0; // 0-indexed (Cenário 1)
    let completedModulesCount = 0;
    const totalModulesCount = 10;

    if (profileId) {
      try {
        const rawState =
          localStorage.getItem(`game_state_data_${profileId}`) ||
          localStorage.getItem("game_state_data");
        if (rawState) {
          const parsed = JSON.parse(rawState);
          const gs = parsed.gameState || parsed;
          if (gs) {
            if (typeof gs.score === "number" && gs.score > 0) {
              score = Math.max(score, gs.score);
            }
            if (typeof gs.ph === "number") phase = gs.ph;
            if (typeof gs.sc === "number") scenario = gs.sc;
          }
        }
      } catch (e) {
        console.warn("Notice reading game state for welcome back modal:", e);
      }

      try {
        const rawTrack =
          localStorage.getItem(`rs_track_progress_${profileId}`) ||
          localStorage.getItem("rs_track_progress_guest");
        if (rawTrack) {
          const parsedTrack = JSON.parse(rawTrack);
          completedModulesCount = Object.values(parsedTrack).filter(
            (val) => val === 100
          ).length;
        }
      } catch (e) {
        console.warn("Notice reading track progress for welcome back modal:", e);
      }
    }

    const phaseTitles = [
      "Módulo 1: O Orçamento Base",
      "Módulo 2: Acessibilidade & LBD",
      "Módulo 3: Formação AEE & Tecnologia",
      "Módulo 4: Gestão Estratégica & FUNDEB",
    ];

    const currentModuleTitle = phaseTitles[phase] || `Módulo ${phase + 1}`;
    const stoppedAt = `${currentModuleTitle} (Cenário ${scenario + 1})`;

    return {
      score,
      completedModulesCount,
      totalModulesCount,
      phase: phase + 1,
      scenario: scenario + 1,
      currentModuleTitle,
      stoppedAt,
    };
  };

  const { playClick, playTick } = useSound();

  const fetchClaimedSchools = async () => {
    const claimedSet = new Set<string>();

    // 1. From localStorage
    try {
      const localMap = JSON.parse(
        localStorage.getItem("serra_registered_schools") || "{}",
      );
      Object.keys(localMap).forEach((cleanKey) => {
        if (localMap[cleanKey]?.schoolName) {
          claimedSet.add(localMap[cleanKey].schoolName);
        }
      });
    } catch (e) {}

    // 2. From Supabase profiles
    if (supabase) {
      try {
        const { data: profiles } = await supabase
          .from("profiles")
          .select("municipio");
        if (profiles) {
          profiles.forEach((p) => {
            if (p.municipio) claimedSet.add(p.municipio);
          });
        }
      } catch (e) {
        console.warn("Notice fetching claimed profiles:", e);
      }
    }

    setClaimedSchools(Array.from(claimedSet));
  };

  useEffect(() => {
    fetchClaimedSchools();
  }, []);

  const finishRegistrationSuccess = (
    managerName: string,
    schoolCity: string,
    managerEmail: string,
    profileObj: any,
    managerPassword?: string,
  ) => {
    // Garante que o estado de jogo e progresso estejam limpos para o novo registro
    if (profileObj?.id) {
      try {
        localStorage.removeItem(`game_state_data_${profileObj.id}`);
        localStorage.removeItem(`rs_track_progress_${profileObj.id}`);
      } catch (e) {}
    }
    signInLocal(profileObj, managerEmail);
    try {
      const cleanSchool = schoolCity
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "");
      const localMap = JSON.parse(
        localStorage.getItem("serra_registered_schools") || "{}",
      );
      localMap[cleanSchool] = {
        ...(localMap[cleanSchool] || {}),
        nome: managerName,
        schoolName: schoolCity,
        ...(managerPassword ? { password: managerPassword } : {}),
      };
      localStorage.setItem(
        "serra_registered_schools",
        JSON.stringify(localMap),
      );
    } catch (e) {}

    setClaimedSchools((prev) =>
      prev.includes(schoolCity) ? prev : [...prev, schoolCity],
    );
    setSuccessData({
      name: managerName,
      city: schoolCity,
      email: managerEmail,
      isGuest: false,
      profileObj,
    });
  };

  const handleManagerLocalLogin = (
    managerName: string,
    schoolCity: string,
    managerEmail: string,
    managerPassword?: string,
  ) => {
    const schoolAvatar = getAvatarForSchool(schoolCity);
    const cleanSchool = schoolCity
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");

    const managerId = `manager_${cleanSchool}`;
    const localProfileObj = {
      id: managerId,
      nome: managerName,
      municipio: schoolCity,
      score_acumulado: 0,
      avatar_url: schoolAvatar,
    };

    if (managerPassword) {
      try {
        const localMap = JSON.parse(
          localStorage.getItem("serra_registered_schools") || "{}",
        );
        localMap[cleanSchool] = {
          ...(localMap[cleanSchool] || {}),
          nome: managerName,
          schoolName: schoolCity,
          password: managerPassword,
        };
        localStorage.setItem(
          "serra_registered_schools",
          JSON.stringify(localMap),
        );
      } catch (e) {}
    }

    finishRegistrationSuccess(
      managerName,
      schoolCity,
      managerEmail,
      localProfileObj,
      managerPassword,
    );
  };

  const handleGuestLogin = (customName?: string, customSchool?: string) => {
    const defaultSchool =
      customSchool || city || ES_SERRA_SCHOOLS[0]?.name || "EMEF MÁRIO VALADARES";
    const schoolAvatar = getAvatarForSchool(defaultSchool);
    const guestId = `guest_${Date.now()}`;
    const guestEmail = `visitante_${Date.now()}@serra.es.gov.br`;
    const finalName = (customName || name).trim();
    const guestName =
      finalName ||
      (lang === "pt"
        ? "Gestor(a) Não Cadastrado(a)"
        : lang === "es"
          ? "Gestor(a) No Registrado(a)"
          : "Non-Registered Manager");

    // Garante estado 100% zerado ao entrar como convidado/não cadastrado
    try {
      localStorage.removeItem("game_state_data_guest");
      localStorage.removeItem(`game_state_data_${guestId}`);
      localStorage.removeItem(`rs_track_progress_${guestId}`);
      localStorage.removeItem("rs_track_progress_guest");
    } catch (e) {}

    const localProfileObj = {
      id: guestId,
      nome: guestName,
      municipio: defaultSchool,
      score_acumulado: 0,
      avatar_url: schoolAvatar,
    };

    signInLocal(localProfileObj, guestEmail);

    onLogin({
      name: guestName,
      city: defaultSchool,
      email: guestEmail,
      isGuest: true,
    });
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    playClick();
    setIsLoading(true);
    setErrorMsg("");

    const inputName = name.trim();
    const inputPass = password.trim();

    if (!inputName) {
      setErrorMsg(
        lang === "pt"
          ? "Por favor, digite o nome do gestor(a) cadastrado."
          : lang === "es"
            ? "Por favor, ingrese el nombre del gestor registrado."
            : "Please enter your registered manager name.",
      );
      setIsLoading(false);
      return;
    }

    if (!inputPass) {
      setErrorMsg(
        lang === "pt"
          ? "Por favor, informe a senha de acesso."
          : lang === "es"
            ? "Por favor, ingrese la contraseña."
            : "Please enter your access password.",
      );
      setIsLoading(false);
      return;
    }

    const lowerInputName = inputName.toLowerCase();

    // 1. Pesquisa no LocalStorage de escolas/gestores registrados
    let matchedSchool: string | null = null;
    let matchedName: string | null = null;
    let localFoundNameMatch = false;

    try {
      const localMap = JSON.parse(
        localStorage.getItem("serra_registered_schools") || "{}",
      );
      for (const cleanKey of Object.keys(localMap)) {
        const entry = localMap[cleanKey];
        if (
          entry &&
          entry.nome &&
          entry.nome.trim().toLowerCase() === lowerInputName
        ) {
          localFoundNameMatch = true;
          if (entry.password === inputPass) {
            matchedSchool = entry.schoolName || entry.municipio || cleanKey;
            matchedName = entry.nome;
            break;
          }
        }
      }
    } catch (e) {
      console.warn("Notice reading registered schools:", e);
    }

    if (matchedSchool && matchedName) {
      const cleanSchool = matchedSchool
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "");
      const schoolEmail = `gestor_${cleanSchool}_serra@serra.es.gov.br`;
      const schoolAvatar = getAvatarForSchool(matchedSchool);
      const managerId = `manager_${cleanSchool}`;

      const profileObj = {
        id: managerId,
        nome: matchedName,
        municipio: matchedSchool,
        score_acumulado: 0,
        avatar_url: schoolAvatar,
      };

      signInLocal(profileObj, schoolEmail);
      setIsLoading(false);
      setWelcomeBackData({
        name: matchedName,
        school: matchedSchool,
        email: schoolEmail,
        profileObj,
      });
      return;
    }

    if (localFoundNameMatch) {
      setErrorMsg(
        lang === "pt"
          ? "Senha incorreta para o gestor cadastrado informado."
          : lang === "es"
            ? "Contraseña incorrecta."
            : "Incorrect password for registered manager.",
      );
      setIsLoading(false);
      return;
    }

    // 2. Pesquisa nos perfis do Supabase se disponível
    if (supabase) {
      try {
        const { data: profiles } = await supabase
          .from("profiles")
          .select("id, nome, municipio, avatar_url, score_acumulado");

        const matchedProfile = profiles?.find(
          (p) => p.nome && p.nome.trim().toLowerCase() === lowerInputName,
        );

        if (matchedProfile && matchedProfile.municipio) {
          const schoolCity = matchedProfile.municipio;
          const cleanSchool = schoolCity
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .replace(/[^a-z0-9]/g, "");
          const schoolEmail = `gestor_${cleanSchool}_serra@serra.es.gov.br`;

          const { data: signInData, error: signInError } =
            await supabase.auth.signInWithPassword({
              email: schoolEmail,
              password: inputPass,
            });

          if (!signInError && signInData?.user) {
            const profileObj = {
              id: matchedProfile.id || signInData.user.id,
              nome: matchedProfile.nome,
              municipio: schoolCity,
              score_acumulado: matchedProfile.score_acumulado || 0,
              avatar_url:
                matchedProfile.avatar_url || getAvatarForSchool(schoolCity),
            };

            signInLocal(profileObj, schoolEmail);
            setIsLoading(false);
            setWelcomeBackData({
              name: matchedProfile.nome,
              school: schoolCity,
              email: schoolEmail,
              profileObj,
            });
            return;
          } else if (signInError) {
            setErrorMsg(
              lang === "pt"
                ? "Senha incorreta para o gestor cadastrado."
                : lang === "es"
                  ? "Contraseña incorrecta."
                  : "Incorrect password.",
            );
            setIsLoading(false);
            return;
          }
        }
      } catch (err) {
        console.warn("Notice checking Supabase profiles for login:", err);
      }
    }

    setIsLoading(false);
    setErrorMsg(
      lang === "pt"
        ? "Gestor(a) cadastrado(a) não encontrado(a). Verifique se digitou o nome corretamente ou altere para a aba 'Tomar Posse'."
        : lang === "es"
          ? "Gestor(a) no encontrado(a). Verifique el nombre o cambie a 'Posesión'."
          : "Registered manager not found. Please check the name or switch to 'Take Office'.",
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    playClick();
    setIsLoading(true);
    setErrorMsg("");

    if (!city) {
      setErrorMsg(
        lang === "pt"
          ? "Por favor, selecione uma escola municipal de Serra - ES."
          : lang === "es"
            ? "Por favor, seleccione una escuela municipal de Serra - ES."
            : "Please select a municipal school from Serra - ES.",
      );
      setIsLoading(false);
      return;
    }
    if (!name.trim()) {
      setErrorMsg(
        lang === "pt"
          ? "Por favor, preencha o nome do gestor(a)."
          : lang === "es"
            ? "Por favor, ingrese el nombre del gestor(a)."
            : "Please enter the manager's name.",
      );
      setIsLoading(false);
      return;
    }
    if (!password || password.trim().length < 6) {
      setErrorMsg(
        lang === "pt"
          ? "A senha do gestor deve conter no mínimo 6 caracteres."
          : lang === "es"
            ? "La contraseña del gestor debe tener al menos 6 caracteres."
            : "Manager password must be at least 6 characters.",
      );
      setIsLoading(false);
      return;
    }

    if (password.trim() !== confirmPassword.trim()) {
      setErrorMsg(
        lang === "pt"
          ? "As senhas não coincidem. Por favor, confirme a senha corretamente."
          : lang === "es"
            ? "Las contraseñas no coinciden. Por favor confirma tu contraseña."
            : "Passwords do not match. Please confirm your password correctly.",
      );
      setIsLoading(false);
      return;
    }

    const schoolAvatar = getAvatarForSchool(city);

    const cleanSchool = city
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");

    const schoolEmail = `gestor_${cleanSchool}_serra@serra.es.gov.br`;
    const userPassword = password.trim();

    if (!supabase) {
      // Offline / Local fallback validation
      try {
        const localMap = JSON.parse(
          localStorage.getItem("serra_registered_schools") || "{}",
        );
        if (localMap[cleanSchool]) {
          const registered = localMap[cleanSchool];
          if (registered.password !== userPassword) {
            setErrorMsg(
              lang === "pt"
                ? `A escola "${city}" já está cadastrada para o(a) gestor(a) ${registered.nome}. A senha informada está incorreta.`
                : lang === "es"
                  ? `La escuela "${city}" ya está registrada para ${registered.nome}. Contraseña incorrecta.`
                  : `School "${city}" is already registered for ${registered.nome}. Incorrect password.`,
            );
            setIsLoading(false);
            return;
          }
        } else {
          localMap[cleanSchool] = {
            nome: name.trim(),
            password: userPassword,
            schoolName: city,
          };
          localStorage.setItem(
            "serra_registered_schools",
            JSON.stringify(localMap),
          );
        }
      } catch (e) {
        console.warn("Local storage error:", e);
      }

      setTimeout(() => {
        setIsLoading(false);
        handleManagerLocalLogin(name.trim(), city, schoolEmail, userPassword);
      }, 500);
      return;
    }

    try {
      // Check if this school is already registered in Supabase profiles
      let schoolProfile: any = null;
      try {
        const { data: existingProfiles } = await supabase
          .from("profiles")
          .select("id, nome, municipio")
          .eq("municipio", city);

        if (existingProfiles && existingProfiles.length > 0) {
          schoolProfile = existingProfiles[0];
        }
      } catch (err) {
        console.warn("Notice fetching existing school profile:", err);
      }

      // Try signing in
      const { data: signInData, error: signInError } =
        await supabase.auth.signInWithPassword({
          email: schoolEmail,
          password: userPassword,
        });

      if (signInError) {
        const isNetworkOrLimitError =
          signInError.message &&
          (signInError.message.includes("rate limit") ||
            signInError.message.includes("exceeded") ||
            signInError.message.includes("Failed to fetch") ||
            signInError.message.includes("network") ||
            signInError.status === 429);

        if (isNetworkOrLimitError) {
          console.warn(
            "Connection or rate limit reached. Accessing in Local Sandbox mode.",
          );
          handleManagerLocalLogin(name.trim(), city, schoolEmail, userPassword);
          return;
        }

        // If a profile for this school exists in the database, the school belongs to another/existing manager
        // and the password entered is wrong!
        if (schoolProfile) {
          setErrorMsg(
            lang === "pt"
              ? `A escola "${city}" já está cadastrada para o(a) gestor(a) ${schoolProfile.nome}. A senha digitada está incorreta.`
              : lang === "es"
                ? `La escuela "${city}" ya está registrada para el gestor ${schoolProfile.nome}. Contraseña incorrecta.`
                : `School "${city}" is already registered for manager ${schoolProfile.nome}. Incorrect password.`,
          );
          setIsLoading(false);
          return;
        }

        // If school is not registered in DB, attempt sign up
        const { data: signUpData, error: signUpError } =
          await supabase.auth.signUp({
            email: schoolEmail,
            password: userPassword,
            options: {
              data: {
                nome: name.trim(),
                municipio: city,
                senha: userPassword,
                avatar_url: schoolAvatar,
              },
            },
          });

        if (signUpError) {
          if (
            signUpError.message &&
            signUpError.message.includes("User already registered")
          ) {
            setErrorMsg(
              lang === "pt"
                ? `Esta escola já possui um gestor cadastrado. A senha informada está incorreta.`
                : lang === "es"
                  ? `Esta escuela ya está registrada. La contraseña informada es incorrecta.`
                  : `This school is already registered. The password provided is incorrect.`,
            );
            setIsLoading(false);
            return;
          }

          const isSignUpNetworkOrLimit =
            signUpError.message &&
            (signUpError.message.includes("rate limit") ||
              signUpError.message.includes("exceeded") ||
              signUpError.message.includes("Failed to fetch") ||
              signUpError.message.includes("network") ||
              signUpError.status === 429);

          if (isSignUpNetworkOrLimit) {
            console.warn(
              "Sign-up issue or network limit. Accessing in Local Sandbox mode.",
            );
            handleManagerLocalLogin(name.trim(), city, schoolEmail, userPassword);
            return;
          }
          throw signUpError;
        }

        const managerId = signUpData.user?.id || `manager_${cleanSchool}`;

        if (signUpData.user) {
          try {
            await supabase.from("profiles").upsert(
              {
                id: managerId,
                nome: name.trim(),
                municipio: city,
                senha: userPassword,
                avatar_url: schoolAvatar,
                score_acumulado: 0,
                updated_at: new Date().toISOString(),
              },
              { onConflict: "id" },
            );
          } catch (e) {
            console.warn("Manual profile creation issue:", e);
          }
        }

        try {
          const localMap = JSON.parse(
            localStorage.getItem("serra_registered_schools") || "{}",
          );
          localMap[cleanSchool] = {
            nome: name.trim(),
            password: userPassword,
            schoolName: city,
          };
          localStorage.setItem(
            "serra_registered_schools",
            JSON.stringify(localMap),
          );
        } catch (e) {}

        const profileObj = {
          id: managerId,
          nome: name.trim(),
          municipio: city,
          score_acumulado: 0,
          avatar_url: schoolAvatar,
        };

        finishRegistrationSuccess(
          name.trim(),
          city,
          schoolEmail,
          profileObj,
          userPassword,
        );
      } else {
        // Logged in successfully
        const managerId = signInData.user?.id || `manager_${cleanSchool}`;

        if (signInData.user) {
          try {
            await supabase.from("profiles").upsert(
              {
                id: managerId,
                nome: name.trim(),
                municipio: city,
                senha: userPassword,
                avatar_url: schoolAvatar,
                updated_at: new Date().toISOString(),
              },
              { onConflict: "id" },
            );
          } catch (e) {}
        }

        try {
          const localMap = JSON.parse(
            localStorage.getItem("serra_registered_schools") || "{}",
          );
          localMap[cleanSchool] = {
            nome: name.trim(),
            password: userPassword,
            schoolName: city,
          };
          localStorage.setItem(
            "serra_registered_schools",
            JSON.stringify(localMap),
          );
        } catch (e) {}

        const profileObj = {
          id: managerId,
          nome: name.trim(),
          municipio: city,
          score_acumulado: 0,
          avatar_url: schoolAvatar,
        };

        finishRegistrationSuccess(
          name.trim(),
          city,
          schoolEmail,
          profileObj,
          userPassword,
        );
      }
    } catch (error: any) {
      console.warn("Auth warning:", error);
      handleManagerLocalLogin(name.trim(), city, schoolEmail, userPassword);
    } finally {
      setIsLoading(false);
    }
  };

  // Filtragem inteligente de escolas de Serra ES (exclui escolas já com posse tomada por padrão)
  const availableSchools = ES_SERRA_SCHOOLS.filter((school) => {
    if (showAllSchools) return true;
    return !claimedSchools.includes(school.name);
  });

  const filteredSchools = availableSchools.filter((school) =>
    school.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div
      className={`fixed inset-0 w-full h-[100dvh] overflow-hidden font-['Poppins',_sans-serif]`}
    >
      <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');
          
          @keyframes btnPulse {
            0% {
              box-shadow: 0 0 20px rgba(0, 240, 255, 0.2), inset 0 0 10px rgba(0, 240, 255, 0.1);
              border-color: rgba(0, 240, 255, 0.4);
            }
            50% {
              box-shadow: 0 0 40px rgba(0, 240, 255, 0.6), inset 0 0 20px rgba(0, 240, 255, 0.3);
              border-color: rgba(0, 240, 255, 0.8);
            }
            100% {
              box-shadow: 0 0 20px rgba(0, 240, 255, 0.2), inset 0 0 10px rgba(0, 240, 255, 0.1);
              border-color: rgba(0, 240, 255, 0.4);
            }
          }
          
          .animate-btn-pulse:not(:disabled) {
            animation: btnPulse 2.5s ease-in-out infinite;
          }

          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
       `}</style>

      <MountainScene className="absolute top-8 sm:top-12 md:top-14 left-0 w-full h-[28vh] sm:h-[310px] overflow-visible z-10 pointer-events-none" />

      {/* Header Top Navigation Bar: Admin Mode Icon Button (Left), Language Selector (Right) */}
      <div className="absolute top-3.5 sm:top-6 left-3.5 sm:left-6 right-3.5 sm:right-6 z-40 flex items-center justify-between gap-2 pointer-events-auto">
        {/* Botão Modo Administrador (Apenas Ícone no canto esquerdo) */}
        <button
          type="button"
          onClick={() => {
            playClick();
            if (onOpenAdmin) onOpenAdmin();
            document.dispatchEvent(new CustomEvent("open-admin"));
          }}
          className="bg-[#050810]/85 backdrop-blur-md hover:bg-amber-500/20 border border-amber-500/40 hover:border-amber-400 text-amber-400 hover:text-amber-300 p-2.5 sm:p-3.5 rounded-full shadow-[0_4px_24px_rgba(245,158,11,0.25)] transition-all flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 group"
          title={lang === "pt" ? "Modo Administrador" : lang === "es" ? "Modo Administrador" : "Admin Mode"}
        >
          <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 group-hover:text-amber-300 shrink-0" />
        </button>

        {/* Botão para alternar idiomas (Canto direito) */}
        <div className="flex bg-[#050810]/85 backdrop-blur-md p-1 sm:p-1.5 rounded-full border border-white/15 shadow-xl items-center gap-1 sm:gap-1.5">
          <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 ml-2 mr-0.5 shrink-0 hidden xs:block" />
          {(["pt", "es", "en"] as Language[]).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => {
                playClick();
                if (setLang) setLang(l);
              }}
              className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 text-[10px] sm:text-[11.5px] font-mono font-extrabold uppercase rounded-full transition-all cursor-pointer ${
                lang === l
                  ? "bg-cyan-500/25 text-[#00f0ff] border border-cyan-500/50 shadow-[0_0_12px_rgba(0,240,255,0.4)]"
                  : "text-white/40 hover:text-white/80 hover:bg-white/5"
              }`}
            >
              {l === "pt" ? "PT" : l === "es" ? "ES" : "EN"}
            </button>
          ))}
        </div>
      </div>

      {/* Main Layout Area - STATIC HEADER CENTERED OVER MESTRE ÁLVARO & BALANCED CARDS */}
      <div className="absolute inset-0 w-full h-[100dvh] z-30 flex flex-col items-center justify-between pt-6 sm:pt-8 md:pt-10 pb-7 sm:pb-8 md:pb-9 px-3 sm:px-6 overflow-hidden">
        <div className="w-full max-w-5xl flex flex-col items-center justify-between h-full max-h-[100dvh] relative">
          {/* Header Title Space */}
          <motion.div
            className="flex flex-col items-center px-4 pointer-events-none mb-2 shrink-0 text-center mt-14 sm:mt-18 md:mt-22 lg:mt-26"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div
              className="font-extrabold text-2xl sm:text-4xl lg:text-[44px] leading-[1.15] tracking-[0.5px] text-white text-center select-none"
              style={{
                textShadow:
                  "0 4px 20px rgba(0,0,0,0.9), 0 0 30px rgba(0,240,255,0.6), 0 0 60px rgba(0,240,255,0.3)",
              }}
            >
              {getTitle(lang)}
            </div>
            <div className="my-1.5 sm:my-2 w-[70px] sm:w-[110px] h-[2px] bg-gradient-to-r from-transparent via-[#f4c177] to-transparent opacity-90 shadow-[0_0_10px_rgba(244,193,119,0.8)]" />
            <div className="font-bold text-[9.5px] sm:text-[13.5px] tracking-[2px] sm:tracking-[4px] text-[#f4c177] text-center uppercase select-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
              {getSubtitle(lang)}
            </div>
          </motion.div>

          {/* Cards Container Area - POSITIONED LOW NEAR FOOTER */}
          <div className="flex-1 w-full flex items-end justify-center min-h-0 pb-1 sm:pb-2">
            <motion.div
              className="w-full flex items-center justify-center max-w-[480px] shrink-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              {/* CARD: Posse Administrativa / Login de Gestor */}
              <div
                className="w-full bg-[#0c111d]/85 backdrop-blur-2xl border border-[#00f0ff]/25 hover:border-cyan-400/50 rounded-[22px] sm:rounded-[26px] p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden transition-all duration-300 min-h-[420px] sm:min-h-[440px] max-h-[85vh]"
                style={{
                  boxShadow:
                    "0 30px 60px -15px rgba(0,0,0,0.7), inset 0 0 24px rgba(0,240,255,0.06)",
                }}
              >
                {/* Top Glowing Cyan Accent Line */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent shadow-[0_0_12px_#00f0ff]" />

                {/* Tab Selector: Tomar Posse vs Já Sou Cadastrado */}
                <div className="flex bg-[#050810]/90 p-1 rounded-xl border border-white/10 mb-3 shrink-0 shadow-inner">
                  <button
                    type="button"
                    onClick={() => {
                      playTick();
                      setAuthMode("register");
                      setErrorMsg("");
                    }}
                    className={`flex-1 py-1.5 px-2 text-center text-[10px] sm:text-[11px] font-bold uppercase tracking-wider rounded-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 ${
                      authMode === "register"
                        ? "bg-gradient-to-r from-cyan-500/25 to-[#00f0ff]/15 text-[#00f0ff] border border-[#00f0ff]/40 shadow-[0_0_14px_rgba(0,240,255,0.25)]"
                        : "text-white/40 hover:text-white/80 hover:bg-white/5"
                    }`}
                  >
                    <UserPlus className={`w-3.5 h-3.5 ${authMode === "register" ? "text-[#00f0ff]" : "text-white/40"}`} />
                    <span>
                      {lang === "pt"
                        ? "Tomar Posse (Novo)"
                        : lang === "es"
                          ? "Posesión"
                          : "Take Office"}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      playTick();
                      setAuthMode("login");
                      setErrorMsg("");
                    }}
                    className={`flex-1 py-1.5 px-2 text-center text-[10px] sm:text-[11px] font-bold uppercase tracking-wider rounded-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 ${
                      authMode === "login"
                        ? "bg-gradient-to-r from-cyan-500/25 to-[#00f0ff]/15 text-[#00f0ff] border border-[#00f0ff]/40 shadow-[0_0_14px_rgba(0,240,255,0.25)]"
                        : "text-white/40 hover:text-white/80 hover:bg-white/5"
                    }`}
                  >
                    <LogIn className={`w-3.5 h-3.5 ${authMode === "login" ? "text-[#00f0ff]" : "text-white/40"}`} />
                    <span>
                      {lang === "pt"
                        ? "Já sou Cadastrado"
                        : lang === "es"
                          ? "Ya Registrado"
                          : "Manager Login"}
                    </span>
                  </button>
                </div>

                <div className="mb-2.5 shrink-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h2 className="text-[15px] sm:text-[18px] font-bold text-white tracking-tight">
                      {authMode === "register"
                        ? lang === "pt"
                          ? "Posse Administrativa"
                          : lang === "es"
                            ? "Posesión Administrativa"
                            : "Administrative Office"
                        : lang === "pt"
                          ? "Acesso de Gestor Cadastrado"
                          : lang === "es"
                            ? "Acceso de Gestor Registrado"
                            : "Registered Manager Login"}
                    </h2>
                    <span className="inline-flex items-center gap-1.5 bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded-full text-[8px] sm:text-[8.5px] font-mono font-bold text-[#00f0ff] tracking-wider shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-pulse shadow-[0_0_8px_#00f0ff]" />
                      SEME
                    </span>
                  </div>

                  <p className="text-[10px] sm:text-[11px] leading-snug text-white/50 text-left">
                    {authMode === "register"
                      ? lang === "pt"
                        ? "Informe o nome completo do gestor(a) e selecione a escola correspondente do município de Serra."
                        : lang === "es"
                          ? "Informe el nombre completo del gestor(a) y seleccione la escuela de Serra para tomar posesión."
                          : "Enter the manager's full name and select the corresponding school from Serra."
                      : lang === "pt"
                        ? "Informe seu nome de gestor(a) cadastrado e sua senha de acesso para carregar diretamente a gestão da sua escola."
                        : lang === "es"
                          ? "Ingrese su nombre de gestor registrado y contraseña para acceder a la gestión de su escuela."
                          : "Enter your registered manager name and password to access your school management."}
                  </p>
                </div>

                <form
                  onSubmit={authMode === "register" ? handleSubmit : handleLoginSubmit}
                  className="space-y-2.5 relative flex-1 flex flex-col justify-center my-1"
                >
                  {/* Nome do Gestor */}
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-10">
                      <User className={`w-[17px] h-[17px] transition-colors ${name.trim() ? "text-[#00f0ff]" : "text-white/30 group-focus-within:text-[#00f0ff]"}`} />
                    </div>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={
                        authMode === "register"
                          ? lang === "pt"
                            ? "Nome do gestor(a)"
                            : lang === "es"
                              ? "Nombre del gestor(a)"
                              : "Manager's name"
                          : lang === "pt"
                            ? "Nome do gestor(a) cadastrado"
                            : lang === "es"
                              ? "Nombre del gestor registrado"
                              : "Registered manager's name"
                      }
                      className="w-full bg-[#050810]/70 backdrop-blur-md border border-white/10 hover:border-white/20 text-white placeholder-white/35 focus:border-[#00f0ff]/70 focus:ring-2 focus:ring-[#00f0ff]/20 rounded-xl px-4 py-2.5 pl-[38px] outline-none transition-all text-[12.5px] sm:text-[13px] font-medium shadow-inner"
                      disabled={isLoading}
                    />
                  </div>

                  {/* Botão Seletor Inteligente para Escola Municipal (Somente em Registro) */}
                  {authMode === "register" && (
                    <div className="relative group">
                      <button
                        type="button"
                        onClick={() => {
                          playClick();
                          fetchClaimedSchools();
                          setShowSchoolModal(true);
                        }}
                        className={`w-full bg-[#050810]/70 backdrop-blur-md hover:bg-[#080d1a]/90 border ${city ? "border-[#00f0ff]/40 bg-[#00f0ff]/5" : "border-white/10 hover:border-white/20"} text-white focus:border-[#00f0ff]/70 focus:ring-2 focus:ring-[#00f0ff]/20 rounded-xl px-4 py-2 sm:py-2.5 pl-[38px] flex items-center justify-between outline-none transition-all text-left cursor-pointer text-[12.5px] sm:text-[13px] font-medium shadow-inner`}
                        disabled={isLoading}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <Building2 className={`absolute left-3.5 w-[17px] h-[17px] transition-colors ${city ? "text-[#00f0ff]" : "text-white/30 group-hover:text-[#00f0ff]"}`} />
                          <span
                            className={`truncate ${city ? "text-white font-semibold" : "text-white/35"}`}
                          >
                            {city ||
                              (lang === "pt"
                                ? "Selecione a Escola Municipal..."
                                : lang === "es"
                                  ? "Seleccione la Escuela..."
                                  : "Select the School...")}
                          </span>
                        </div>
                        {city ? (
                          <div className="flex items-center gap-2 shrink-0">
                            <SchoolAvatar
                              avatarUrl={getAvatarForSchool(city)}
                              schoolName={city}
                              className="w-6 h-6 rounded-full border border-[#00f0ff]/40 shadow-[0_0_8px_rgba(0,240,255,0.3)]"
                              iconClassName="w-3.5 h-3.5"
                            />
                            <span className="text-[9px] text-[#00f0ff] font-bold uppercase tracking-wider bg-[#00f0ff]/10 px-2 py-0.5 rounded border border-[#00f0ff]/30">
                              {lang === "pt" ? "Alterar" : "Change"}
                            </span>
                          </div>
                        ) : (
                          <span className="text-[9px] text-[#00f0ff] font-bold uppercase tracking-wider shrink-0 select-none bg-[#00f0ff]/10 px-2.5 py-1 rounded-lg border border-[#00f0ff]/25 flex items-center gap-1 transition-all shadow-[0_0_10px_rgba(0,240,255,0.15)] group-hover:bg-[#00f0ff]/20">
                            {lang === "pt"
                              ? "SELECIONAR"
                              : lang === "es"
                                ? "SELECCIONAR"
                                : "SELECT"}{" "}
                            <Search className="w-3 h-3 text-[#00f0ff]" />
                          </span>
                        )}
                      </button>
                    </div>
                  )}

                  {/* Senha do Gestor */}
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-10">
                      <Lock className={`w-[17px] h-[17px] transition-colors ${password ? "text-[#00f0ff]" : "text-white/30 group-focus-within:text-[#00f0ff]"}`} />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={
                        authMode === "register"
                          ? lang === "pt"
                            ? "Senha de acesso (mín. 6 dígitos)"
                            : lang === "es"
                              ? "Contraseña (mín. 6 dígitos)"
                              : "Password (min 6 chars)"
                          : lang === "pt"
                            ? "Senha de acesso"
                            : lang === "es"
                              ? "Contraseña"
                              : "Password"
                      }
                      className="w-full bg-[#050810]/70 backdrop-blur-md border border-white/10 hover:border-white/20 text-white placeholder-white/35 focus:border-[#00f0ff]/70 focus:ring-2 focus:ring-[#00f0ff]/20 rounded-xl px-4 py-2.5 pl-[38px] pr-[40px] outline-none transition-all text-[12.5px] sm:text-[13px] font-medium shadow-inner"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-white/35 hover:text-white transition-colors cursor-pointer"
                      title={showPassword ? "Ocultar senha" : "Exibir senha"}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Confirmar Senha do Gestor (Somente em Registro) */}
                  {authMode === "register" && (
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-10">
                        <Lock className={`w-[17px] h-[17px] transition-colors ${confirmPassword ? (confirmPassword === password && password.length >= 6 ? "text-emerald-400" : "text-[#00f0ff]") : "text-white/30 group-focus-within:text-[#00f0ff]"}`} />
                      </div>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder={
                          lang === "pt"
                            ? "Confirmar senha de acesso"
                            : lang === "es"
                              ? "Confirmar contraseña"
                              : "Confirm password"
                        }
                        className={`w-full bg-[#050810]/70 backdrop-blur-md border ${confirmPassword && confirmPassword === password && password.length >= 6 ? "border-emerald-500/40 focus:border-emerald-400 focus:ring-emerald-400/20" : "border-white/10 hover:border-white/20 focus:border-[#00f0ff]/70 focus:ring-[#00f0ff]/20"} text-white placeholder-white/35 focus:ring-2 rounded-xl px-4 py-2.5 pl-[38px] pr-[40px] outline-none transition-all text-[12.5px] sm:text-[13px] font-medium shadow-inner`}
                        disabled={isLoading}
                      />
                      <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center gap-1.5">
                        {confirmPassword && confirmPassword === password && password.length >= 6 && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 animate-in fade-in zoom-in" />
                        )}
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="text-white/35 hover:text-white transition-colors cursor-pointer"
                          title={showConfirmPassword ? "Ocultar senha" : "Exibir senha"}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {errorMsg && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-[11px] sm:text-[12px] p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-center backdrop-blur-md font-medium space-y-2 shadow-lg"
                    >
                      <div>{errorMsg}</div>
                      {authMode === "login" && (
                        <button
                          type="button"
                          onClick={() => {
                            playClick();
                            handleGuestLogin(name, city);
                          }}
                          className="w-full bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 font-bold text-[11px] py-1.5 px-3 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-[0_0_12px_rgba(0,240,255,0.15)]"
                        >
                          <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
                          <span>
                            {lang === "pt"
                              ? `Entrar como "${name.trim() || "Gestor"}" (Não Cadastrado)`
                              : `Enter as "${name.trim() || "Manager"}" (Non-Registered)`}
                          </span>
                        </button>
                      )}
                    </motion.div>
                  )}

                  {/* Botão de Submit Principal */}
                  <motion.button
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    disabled={
                      isLoading ||
                      !name.trim() ||
                      !password.trim() ||
                      (authMode === "register" && (!city || !confirmPassword.trim()))
                    }
                    type="submit"
                    className="relative w-full mt-1 bg-gradient-to-r from-cyan-500/25 via-[#00f0ff]/30 to-cyan-500/25 border border-[#00f0ff] text-[#00f0ff] font-bold uppercase tracking-[0.12em] text-[13px] sm:text-[14px] py-[10px] sm:py-[11px] rounded-xl flex items-center justify-center px-5 sm:px-6 cursor-pointer disabled:opacity-40 disabled:bg-white/5 disabled:border-white/10 disabled:text-white/30 disabled:cursor-not-allowed group overflow-hidden transition-all duration-200 hover:shadow-[0_0_24px_rgba(0,240,255,0.45)] hover:bg-[#00f0ff]/35 backdrop-blur-md shadow-[0_0_14px_rgba(0,240,255,0.15)]"
                  >
                    {!isLoading &&
                      name.trim() &&
                      password.trim() &&
                      (authMode === "login" || (city && confirmPassword.trim())) && (
                        <div className="absolute inset-0 border-t border-[#00f0ff]/50 rounded-xl mix-blend-overlay pointer-events-none" />
                      )}

                    {isLoading ? (
                      <div className="flex-1 flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-[#00f0ff]/30 border-t-[#00f0ff] rounded-full animate-spin" />
                        <span>
                          {lang === "pt"
                            ? "AUTENTICANDO..."
                            : lang === "es"
                              ? "AUTENTICANDO..."
                              : "AUTHENTICATING..."}
                        </span>
                      </div>
                    ) : (
                      <span className="text-center w-full flex items-center justify-center gap-2">
                        {authMode === "register" ? (
                          <>
                            <UserCheck className="w-4 h-4" />
                            <span>
                              {lang === "pt"
                                ? "TOMAR POSSE"
                                : lang === "es"
                                  ? "TOMAR POSESIÓN"
                                  : "TAKE OFFICE"}
                            </span>
                          </>
                        ) : (
                          <>
                            <LogIn className="w-4 h-4" />
                            <span>
                              {lang === "pt"
                                ? "ENTRAR NA GESTÃO"
                                : lang === "es"
                                  ? "INGRESAR A LA GESTIÓN"
                                  : "ENTER MANAGEMENT"}
                            </span>
                          </>
                        )}
                      </span>
                    )}
                  </motion.button>

                  <div className="flex items-center justify-center gap-3 my-1">
                    <div className="h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent flex-1" />
                    <span className="text-[9px] text-white/35 uppercase font-mono tracking-widest font-semibold">
                      {lang === "pt" ? "OU ACESSO RÁPIDO" : lang === "es" ? "O ACCESO RÁPIDO" : "OR QUICK ACCESS"}
                    </span>
                    <div className="h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent flex-1" />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    type="button"
                    onClick={() => {
                      playClick();
                      handleGuestLogin(name, city);
                    }}
                    className="w-full bg-[#131b2e]/60 hover:bg-[#1a253e]/80 border border-white/10 hover:border-cyan-500/40 text-slate-200 hover:text-white font-bold uppercase tracking-[0.08em] text-[11px] sm:text-[12px] py-[8px] sm:py-[9px] rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 shadow-inner"
                  >
                    <Play className="w-3.5 h-3.5 text-cyan-400" />
                    <span>
                      {name.trim()
                        ? (lang === "pt"
                            ? `Acessar como "${name.trim()}" (Não Cadastrado)`
                            : `Access as "${name.trim()}" (Non-Registered)`)
                        : (lang === "pt"
                            ? "Acessar como Gestor Não Cadastrado"
                            : lang === "es"
                              ? "Acceder como Gestor No Registrado"
                              : "Access as Non-Registered Manager")}
                    </span>
                  </motion.button>
                </form>
              </div>
          </motion.div>
        </div>
      </div>
    </div>

      {/* POPUP INTERATIVO DE ESCOLHA DE ESCOLA ESTADUAL */}
      <AnimatePresence>
        {showSchoolModal && (
          <motion.div
            key="auth-school-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.97, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.97, opacity: 0, y: 15 }}
              className="bg-[#0a1120] border border-white/10 p-5 sm:p-6 rounded-2xl sm:rounded-[24px] shadow-2xl w-full max-w-2xl h-[85vh] sm:h-[80vh] relative flex flex-col overflow-hidden"
            >
              {/* Botão de Fechar */}
              <button
                type="button"
                onClick={() => {
                  playTick();
                  setShowSchoolModal(false);
                }}
                className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-full text-white/40 hover:text-white transition-colors cursor-pointer z-10"
                aria-label="Proteger janela"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="shrink-0 mb-4 pr-10">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] text-[#00f0ff] bg-[#00f0ff]/10 px-2 py-0.5 rounded-full font-mono font-bold border border-[#00f0ff]/20 uppercase tracking-wider">
                    SERRA-ES • SEME
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 tracking-tight">
                  <Building2 className="w-5 h-5 text-indigo-400 shrink-0" />
                  {lang === "pt"
                    ? "Buscar Escola Municipal"
                    : lang === "es"
                      ? "Buscar Escuela Municipal"
                      : "Search Municipal School"}
                </h3>
                <p className="text-white/50 text-xs mt-1 leading-relaxed">
                  {lang === "pt"
                    ? "Digite para pesquisar entre as 36 Unidades Escolares (EMEFs) credenciadas e selecione com um clique."
                    : lang === "es"
                      ? "Escribe para buscar entre las 36 Unidades Escolares (EMEFs) acreditadas y selecciónala con un clic."
                      : "Type to search through the 36 accredited School Units (EMEFs) and click to select."}
                </p>
              </div>

              {/* Input Inteligente de Busca */}
              <div className="relative mb-3 shrink-0">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Search className="w-4.5 h-4.5 text-cyan-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    lang === "pt"
                      ? "Pesquisar por nome da escola municipal..."
                      : lang === "es"
                        ? "Buscar por nombre de la escuela..."
                        : "Search by school name..."
                  }
                  className="w-full bg-[#11192b] border border-cyan-500/30 hover:border-cyan-400 focus:border-cyan-400 shadow-[0_2px_10px_rgba(0,240,255,0.05)] focus:shadow-[0_0_15px_rgba(0,240,255,0.15)] rounded-xl px-4 py-3 pl-11 outline-none transition-all text-sm text-white placeholder-gray-500"
                  autoFocus
                />
              </div>

              {/* Dynamic schools counter & Filter Toggle */}
              <div className="flex items-center justify-between text-[10px] font-mono text-white/40 mb-3 bg-[#050810]/50 px-3 py-1.5 rounded-lg border border-white/5 shrink-0">
                <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
                  <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                  {lang === "pt" ? "DISPONÍVEIS PARA POSSE:" : "AVAILABLE FOR POSSESSION:"}{" "}
                  {ES_SERRA_SCHOOLS.length - claimedSchools.length} / {ES_SERRA_SCHOOLS.length}
                </span>
                <button
                  type="button"
                  onClick={() => setShowAllSchools(!showAllSchools)}
                  className="text-[9.5px] text-white/50 hover:text-cyan-300 underline cursor-pointer font-sans transition-colors"
                >
                  {showAllSchools
                    ? (lang === "pt" ? "Ocultar cadastradas" : "Hide claimed")
                    : (lang === "pt" ? "Exibir todas" : "Show all")}
                </button>
              </div>

              {/* Lista Filtrada de Escolas Municipais */}
              <div className="overflow-y-auto flex-1 pr-1 space-y-2 custom-scrollbar">
                {filteredSchools.length > 0 ? (
                  filteredSchools.map((school, i) => {
                    const isSelected = city === school.name;
                    const isClaimed = claimedSchools.includes(school.name);
                    let tagLabel = isClaimed
                      ? (lang === "pt"
                          ? "POSSE REALIZADA - INDISPONÍVEL"
                          : lang === "es"
                            ? "POSESIÓN REALIZADA - NO DISPONIBLE"
                            : "POSSESSION TAKEN - UNAVAILABLE")
                      : (lang === "pt"
                          ? "DISPONÍVEL PARA POSSE"
                          : lang === "es"
                            ? "DISPONIBLE PARA POSESIÓN"
                            : "AVAILABLE FOR POSSESSION");
                    let tagStyle = isClaimed
                      ? "text-amber-400 bg-amber-500/10 border-amber-500/20"
                      : "text-[#00f0ff] bg-[#00f0ff]/10 border-[#00f0ff]/20 shadow-[0_0_8px_rgba(0,240,255,0.15)]";

                    return (
                      <button
                        key={`auth-school-${school.name}-${i}`}
                        type="button"
                        disabled={isClaimed}
                        onClick={() => {
                          if (isClaimed) return;
                          playClick();
                          setCity(school.name);
                          setShowSchoolModal(false);
                        }}
                        className={`w-full flex items-center gap-3.5 p-3 rounded-xl transition-all text-left group/school border ${
                          isClaimed
                            ? "bg-[#0b1324]/30 border-amber-500/20 opacity-50 cursor-not-allowed"
                            : isSelected
                              ? "bg-cyan-900/20 border-cyan-500/40 shadow-[0_2px_12px_rgba(34,211,238,0.1)] cursor-pointer"
                              : "bg-[#0b1324]/50 hover:bg-[#121c32] border-white/5 hover:border-white/10 cursor-pointer"
                        }`}
                      >
                        {/* Avatar exclusivo da escola */}
                        <SchoolAvatar
                          avatarUrl={school.avatarUrl}
                          schoolName={school.name}
                          className="w-10 h-10 rounded-full border border-white/10 shadow-inner group-hover/school:scale-105 transition-transform shrink-0"
                          iconClassName="w-5 h-5"
                        />
                        <div className="flex-1 min-w-0">
                          <h4
                            className={`text-sm font-bold truncate ${isSelected ? "text-cyan-400" : "text-white group-hover/school:text-cyan-200"}`}
                          >
                            {school.name}
                          </h4>
                          <span
                            className={`text-[8.5px] font-bold tracking-wider px-2 py-0.5 rounded border inline-block mt-0.5 ${tagStyle}`}
                          >
                            {tagLabel}
                          </span>
                        </div>
                        <ChevronRight
                          className={`w-4 h-4 transition-colors shrink-0 ${isSelected ? "text-cyan-400" : "text-white/20 group-hover/school:text-white/60"}`}
                        />
                      </button>
                    );
                  })
                ) : (
                  <div className="text-center py-12 px-4 text-white/40 text-sm flex flex-col items-center justify-center gap-2">
                    <Building2 className="w-8 h-8 text-white/20" />
                    <p>
                      {searchQuery
                        ? (lang === "pt"
                            ? `Nenhuma escola encontrada para "${searchQuery}"`
                            : `No school found for "${searchQuery}"`)
                        : (lang === "pt"
                            ? "Todas as escolas disponíveis já foram registradas."
                            : "All available schools have already been registered.")}
                    </p>
                    {!showAllSchools && (
                      <button
                        type="button"
                        onClick={() => setShowAllSchools(true)}
                        className="text-xs text-[#00f0ff] hover:underline mt-1 font-medium"
                      >
                        {lang === "pt"
                          ? "Clique aqui para visualizar todas as escolas"
                          : "Click here to show all schools"}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* POPUP DE CONFIRMAÇÃO DE CADASTRO E POSSE REALIZADOS COM SUCESSO */}
      <AnimatePresence>
        {successData && (
          <motion.div
            key="auth-success-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-[#0c1527] border-2 border-[#00f0ff]/50 p-6 sm:p-8 rounded-3xl shadow-[0_0_50px_rgba(0,240,255,0.25)] w-full max-w-lg text-center relative overflow-hidden flex flex-col items-center"
            >
              {/* Top ambient glow background */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-[#00f0ff]/20 to-transparent blur-2xl pointer-events-none" />

              {/* Animated check icon badge */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#00f0ff]/10 border-2 border-[#00f0ff] flex items-center justify-center text-[#00f0ff] mb-4 shadow-[0_0_30px_rgba(0,240,255,0.4)] animate-bounce relative z-10">
                <CheckCircle2 className="w-9 h-9 sm:w-11 sm:h-11" />
              </div>

              {/* Tag / Header */}
              <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full text-emerald-400 text-[10px] sm:text-[11px] font-mono font-bold tracking-widest uppercase mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>POSSE & CADASTRO HOMOLOGADOS</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2">
                {lang === "pt"
                  ? "Cadastro e Posse Concluídos!"
                  : lang === "es"
                    ? "¡Registro y Posesión Concluidos!"
                    : "Registration & Office Confirmed!"}
              </h3>

              <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-5 max-w-md">
                {lang === "pt"
                  ? "A posse da unidade escolar e o cadastro do(a) gestor(a) foram validados com sucesso no sistema da SEME de Serra - ES."
                  : lang === "es"
                    ? "La posesión de la unidad escolar y el registro del gestor(a) se han validado con éxito."
                    : "School possession and manager registration have been successfully validated."}
              </p>

              {/* Information Summary Box */}
              <div className="w-full bg-[#050810]/80 border border-white/10 rounded-2xl p-4 text-left space-y-2.5 mb-6 shadow-inner text-xs sm:text-sm">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="text-white/40 font-medium">Gestor(a) em Posse:</span>
                  <span className="text-cyan-300 font-bold truncate max-w-[200px]">
                    {successData.name}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="text-white/40 font-medium">Unidade Escolar:</span>
                  <span className="text-white font-bold truncate max-w-[200px]">
                    {successData.city}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="text-white/40 font-medium">Município / Órgão:</span>
                  <span className="text-emerald-400 font-bold">Serra - ES (SEME)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/40 font-medium">Data de Posse:</span>
                  <span className="text-white/80 font-mono font-semibold">
                    {new Date().toLocaleDateString("pt-BR")}
                  </span>
                </div>
              </div>

              {/* Action button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  playClick();
                  const data = successData;
                  setSuccessData(null);
                  onLogin({
                    name: data.name,
                    city: data.city,
                    email: data.email,
                    isGuest: false,
                  });
                }}
                className="w-full bg-gradient-to-r from-cyan-500 via-teal-400 to-[#00f0ff] hover:brightness-110 text-slate-950 font-black uppercase tracking-wider text-xs sm:text-sm py-3.5 rounded-xl shadow-[0_0_25px_rgba(0,240,255,0.4)] cursor-pointer transition-all flex items-center justify-center gap-2"
              >
                <span>
                  {lang === "pt"
                    ? "PROSSEGUIR PARA A GESTÃO ESCOLAR"
                    : lang === "es"
                      ? "PROSEGUIR A LA GESTIÓN ESCOLAR"
                      : "PROCEED TO SCHOOL MANAGEMENT"}
                </span>
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* POPUP DE BOAS-VINDAS DE VOLTA PARA GESTOR JÁ CADASTRADO */}
      <AnimatePresence>
        {welcomeBackData && (
          <motion.div
            key="auth-welcomeback-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-[#0c1527] border-2 border-cyan-400/60 p-6 sm:p-8 rounded-3xl shadow-[0_0_50px_rgba(0,240,255,0.3)] w-full max-w-lg text-center relative overflow-hidden flex flex-col items-center"
            >
              {/* Glow background */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-cyan-500/20 to-transparent blur-2xl pointer-events-none" />

              {/* School Avatar Badge */}
              <div className="relative mb-4">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#050b14] border-2 border-cyan-400 shadow-[0_0_30px_rgba(0,240,255,0.4)] flex items-center justify-center overflow-hidden z-10 p-1">
                  <SchoolAvatar
                    avatarUrl={getAvatarForSchool(welcomeBackData.school)}
                    schoolName={welcomeBackData.school}
                    className="w-full h-full rounded-full"
                    iconClassName="w-10 h-10 text-cyan-400"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-slate-950 p-1.5 rounded-full border-2 border-[#0c1527] shadow-lg">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>

              {/* Header Badge */}
              <div className="inline-flex items-center gap-1.5 bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 rounded-full text-cyan-400 text-[10px] sm:text-[11px] font-mono font-bold tracking-widest uppercase mb-2">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>GESTOR RECONHECIDO • AUTENTICADO</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2">
                {lang === "pt"
                  ? `Seja Bem-vindo(a) de Volta, ${welcomeBackData.name}!`
                  : lang === "es"
                    ? `¡Bienvenido(a) de Nuevo, ${welcomeBackData.name}!`
                    : `Welcome Back, ${welcomeBackData.name}!`}
              </h3>

              <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-5 max-w-md">
                {lang === "pt"
                  ? "Sua autenticação foi concluída com sucesso. Os dados e o progresso da sua unidade escolar foram carregados."
                  : lang === "es"
                    ? "Tu autenticación fue exitosa. Los datos de tu escuela han sido cargados."
                    : "Authentication successful. Your school management data has been loaded."}
              </p>

              {/* Respective School Display Box with Progress Summary */}
              <div className="w-full bg-[#050810]/80 border border-cyan-500/30 rounded-2xl p-4 text-left space-y-3 mb-6 shadow-inner text-xs sm:text-sm relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <div className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>ESCOLA VINCULADA:</span>
                  </div>
                  <span className="text-emerald-400 font-bold text-[11px]">SEME • Serra - ES</span>
                </div>

                <div className="text-base sm:text-lg font-black text-white leading-tight">
                  {welcomeBackData.school}
                </div>

                {/* Status metrics grid: Score, Completed Modules, Where stopped */}
                {(() => {
                  const summary = getManagerProgressSummary(
                    welcomeBackData.profileObj?.id,
                    welcomeBackData.profileObj
                  );
                  return (
                    <div className="pt-2.5 border-t border-white/10 space-y-2">
                      <div className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Trophy className="w-3.5 h-3.5 text-amber-400" />
                        <span>RESUMO DO SEU PROGRESSO:</span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {/* Pontuação */}
                        <div className="bg-[#02050c] border border-cyan-500/20 rounded-xl p-2.5 flex flex-col justify-center">
                          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1 mb-0.5">
                            <Trophy className="w-3 h-3 text-amber-400" />
                            <span>PONTUAÇÃO</span>
                          </span>
                          <span className="text-sm sm:text-base font-black text-white font-mono">
                            {summary.score.toLocaleString("pt-BR")} <span className="text-[10px] text-amber-300 font-normal">PTS</span>
                          </span>
                        </div>

                        {/* Módulos Concluídos */}
                        <div className="bg-[#02050c] border border-cyan-500/20 rounded-xl p-2.5 flex flex-col justify-center">
                          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1 mb-0.5">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                            <span>MÓDULOS</span>
                          </span>
                          <span className="text-sm sm:text-base font-black text-white font-mono">
                            {summary.completedModulesCount} <span className="text-[10px] text-white/50 font-normal">/ {summary.totalModulesCount}</span>
                          </span>
                        </div>

                        {/* Onde Parou */}
                        <div className="bg-[#02050c] border border-cyan-500/20 rounded-xl p-2.5 flex flex-col justify-center col-span-2 sm:col-span-1">
                          <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1 mb-0.5">
                            <MapPin className="w-3 h-3 text-cyan-400" />
                            <span>ONDE PAROU</span>
                          </span>
                          <span className="text-xs font-bold text-cyan-200 truncate" title={summary.stoppedAt}>
                            {summary.stoppedAt}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Action Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  playClick();
                  const wb = welcomeBackData;
                  setWelcomeBackData(null);
                  onLogin({
                    name: wb.name,
                    city: wb.school,
                    email: wb.email,
                    isGuest: false,
                  });
                }}
                className="w-full bg-gradient-to-r from-cyan-500 via-teal-400 to-[#00f0ff] hover:brightness-110 text-slate-950 font-black uppercase tracking-wider text-xs sm:text-sm py-3.5 rounded-xl shadow-[0_0_25px_rgba(0,240,255,0.4)] cursor-pointer transition-all flex items-center justify-center gap-2"
              >
                <span>
                  {lang === "pt"
                    ? "ACESSAR GESTÃO ESCOLAR"
                    : lang === "es"
                      ? "ACCEDER A LA GESTIÓN"
                      : "ACCESS SCHOOL MANAGEMENT"}
                </span>
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
