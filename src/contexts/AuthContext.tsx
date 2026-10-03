import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { User, Session } from "@supabase/supabase-js";

export interface UserProfile {
  id: string;
  nome: string;
  municipio: string;
  score_acumulado: number;
  avatar_url: string | null;
  senha?: string;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  isLoading: boolean;
  isGuest: boolean;
  refreshProfile: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  signOut: () => Promise<void>;
  signInLocal: (profile: UserProfile, email: string) => void;
  setProfile: (profile: UserProfile | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  session: null,
  isLoading: true,
  isGuest: false,
  refreshProfile: async () => {},
  updateProfile: async () => {},
  signOut: async () => {},
  signInLocal: () => {},
  setProfile: () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getLocalStorageProfileKey = (userId: string) => `profile_${userId}`;

  const fetchProfile = async (userId: string) => {
    const localKey = getLocalStorageProfileKey(userId);
    let cachedProfile: UserProfile | null = null;
    
    try {
      const cached = localStorage.getItem(localKey);
      if (cached) {
        cachedProfile = JSON.parse(cached);
      }
    } catch (e) {
      console.warn("Storage item parsing failed", e);
    }

    if (!supabase || userId.startsWith("local_")) {
      if (cachedProfile) {
        setProfile(cachedProfile);
      } else {
        setProfile({
          id: userId,
          nome: "Gestor(a)",
          municipio: "Não Informado",
          score_acumulado: 0,
          avatar_url: null,
        });
      }
      return;
    }

    try {
      // Usamos .select().eq().maybeSingle() pq .single() falha (lança erro) se não houver linha, 
      // enquanto maybeSingle retorna null sem erro.
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .maybeSingle();
      
      if (error) throw error;
      
      if (data) {
        const merged = {
          ...cachedProfile,
          ...data,
        };
        localStorage.setItem(localKey, JSON.stringify(merged));
        setProfile(merged as UserProfile);
      } else {
        const defaultProfile: UserProfile = cachedProfile || {
          id: userId,
          nome: user?.user_metadata?.nome || "Gestor(a)",
          municipio: user?.user_metadata?.municipio || "Não Informado",
          score_acumulado: 0,
          avatar_url: null,
        };
        setProfile(defaultProfile);
        
        try {
          await supabase.from("profiles").upsert(defaultProfile);
        } catch (dbErr) {
          console.warn("Silent profile upsert during fetch failed:", dbErr);
        }
      }
    } catch (error) {
      console.warn("Notice fetching profile:", error);
      const fallback = cachedProfile || {
        id: userId,
        nome: "Gestor(a)",
        municipio: "Não Informado",
        score_acumulado: 0,
        avatar_url: null,
      };
      setProfile(fallback);
    }
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id);
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return;
    const localKey = getLocalStorageProfileKey(user.id);
    
    const currentProfile = profile || {
      id: user.id,
      nome: user.user_metadata?.nome || "Gestor(a)",
      municipio: user.user_metadata?.municipio || "Não Informado",
      score_acumulado: 0,
      avatar_url: null,
    };
    
    const updatedProfile: UserProfile = {
      ...currentProfile,
      ...updates,
    };

    // Salva localmente primeiro de forma resiliente
    localStorage.setItem(localKey, JSON.stringify(updatedProfile));
    
    // Se for perfil local, também atualiza o local_profile_active
    if (user.id.startsWith("local_")) {
      localStorage.setItem("local_profile_active", JSON.stringify({
        ...updatedProfile,
        email: user.email
      }));
    }
    
    setProfile(updatedProfile);

    // Salva no Supabase se não for local bypass
    if (supabase && !user.id.startsWith("local_")) {
      try {
        const { error } = await supabase
          .from("profiles")
          .upsert(updatedProfile);
        
        if (error) console.warn("Database profile update notice (local state persisted):", error.message);
      } catch (dbErr: any) {
        console.warn("Notice updating profile in database (local state active):", dbErr?.message || dbErr);
      }
    }
  };

  const isGuest = Boolean(
    !user ||
    user.id.startsWith("guest_") ||
    user.email === "convidado@serra.es.gov.br" ||
    user.email?.startsWith("visitante_") ||
    profile?.id?.startsWith("guest_")
  );

  const signOut = async () => {
    localStorage.removeItem("local_profile_active");
    localStorage.removeItem("gestao_inclusiva_progress");
    localStorage.removeItem("guest_session");
    localStorage.removeItem("game_state_data");
    localStorage.removeItem("game_state_data_guest");
    if (supabase) {
      try {
        await supabase.auth.signOut();
      } catch (e) {
        console.error("Supabase signOut error:", e);
      }
    }
    setUser(null);
    setSession(null);
    setProfile(null);
  };

  const signInLocal = (localProfileObj: UserProfile, email: string) => {
    localStorage.setItem(
      "local_profile_active",
      JSON.stringify({ ...localProfileObj, email })
    );
    setProfile(localProfileObj);
    setUser({
      id: localProfileObj.id,
      email: email || "gestor@serra.es.gov.br",
      app_metadata: {},
      user_metadata: { nome: localProfileObj.nome, municipio: localProfileObj.municipio },
      aud: "authenticated",
      created_at: new Date().toISOString()
    } as any);
  };

  useEffect(() => {
    // Check if there is an active local/offline session first to prevent rate limitation blocks
    const savedLocal = localStorage.getItem("local_profile_active");
    if (savedLocal) {
      try {
        const parsed = JSON.parse(savedLocal);
        setProfile(parsed);
        setUser({
          id: parsed.id,
          email: parsed.email || "gestor@serra.es.gov.br",
          app_metadata: {},
          user_metadata: { nome: parsed.nome, municipio: parsed.municipio },
          aud: "authenticated",
          created_at: new Date().toISOString()
        } as any);
        setIsLoading(false);
        return;
      } catch (e) {
        console.error("Local profile load issue:", e);
      }
    }

    if (!supabase) {
      setIsLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      const savedLocalSession = localStorage.getItem("local_profile_active");
      if (savedLocalSession) {
        return; // Prioritize local sandbox bypass session
      }
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id).finally(() => setIsLoading(false));
      } else {
        setIsLoading(false);
      }
    }).catch((e) => {
      console.warn("getSession error:", e);
      setIsLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const savedLocalSession = localStorage.getItem("local_profile_active");
      if (savedLocalSession) {
        try {
          const parsed = JSON.parse(savedLocalSession);
          setProfile(parsed);
          setUser({
            id: parsed.id,
            email: parsed.email || "gestor@serra.es.gov.br",
            app_metadata: {},
            user_metadata: { nome: parsed.nome, municipio: parsed.municipio },
            aud: "authenticated",
            created_at: new Date().toISOString()
          } as any);
          return;
        } catch (e) {}
      }

      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [user?.id]);

  return (
    <AuthContext.Provider value={{ user, profile, session, isLoading, isGuest, refreshProfile, updateProfile, signOut, signInLocal, setProfile }}>
      {children}
    </AuthContext.Provider>
  );
}
