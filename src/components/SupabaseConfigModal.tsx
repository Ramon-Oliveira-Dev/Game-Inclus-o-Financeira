import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Database, Key, Globe, CheckCircle2, AlertTriangle, RefreshCw, Save, Trash2, HelpCircle } from "lucide-react";
import { getStoredSupabaseConfig, saveSupabaseConfig, clearSupabaseConfig, supabase } from "../lib/supabase";
import { useSound } from "../hooks/useSound";
import { Language } from "../types";

interface SupabaseConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: Language;
}

export function SupabaseConfigModal({ isOpen, onClose, lang = "pt" }: SupabaseConfigModalProps) {
  const { playClick, playTick } = useSound();
  const currentConfig = getStoredSupabaseConfig();

  const [url, setUrl] = useState(currentConfig.url);
  const [anonKey, setAnonKey] = useState(currentConfig.anonKey);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  if (!isOpen) return null;

  const handleSave = () => {
    playClick();
    if (!url.trim() || !anonKey.trim()) {
      setTestResult({
        success: false,
        message: lang === "pt" ? "Por favor preencha a URL e a chave Anon Key." : "Please fill in both URL and Anon Key."
      });
      return;
    }
    saveSupabaseConfig(url, anonKey);
  };

  const handleClear = () => {
    playClick();
    clearSupabaseConfig();
  };

  const handleTestConnection = async () => {
    playClick();
    setTesting(true);
    setTestResult(null);

    try {
      if (!supabase) {
        setTestResult({
          success: false,
          message: lang === "pt" ? "Cliente Supabase não inicializado. Verifique os dados inseridos." : "Supabase client not initialized. Please verify inserted data."
        });
        return;
      }

      // Test connection with a lightweight query
      const { error } = await supabase.from("profiles").select("id").limit(1);

      if (error && error.code !== "PGRST116" && !error.message.includes("relation")) {
        setTestResult({
          success: false,
          message: `Erro na conexão: ${error.message}`
        });
      } else {
        setTestResult({
          success: true,
          message: lang === "pt" ? "Conexão com Supabase estabelecida com sucesso! 🚀" : "Supabase connection established successfully! 🚀"
        });
      }
    } catch (err: any) {
      setTestResult({
        success: false,
        message: `Erro ao testar: ${err?.message || "Falha na requisição"}`
      });
    } finally {
      setTesting(false);
    }
  };

  const isConnected = Boolean(supabase);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[300] flex items-center justify-center p-3 sm:p-5">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            playClick();
            onClose();
          }}
          className="absolute inset-0 bg-[#03060d]/85 backdrop-blur-2xl cursor-pointer"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-xl bg-slate-900 border border-emerald-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.8)] rounded-3xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
        >
          {/* Neon Top Bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 shadow-[0_0_20px_#10b981]" />

          {/* Header */}
          <div className="p-5 sm:p-6 pb-4 flex items-center justify-between border-b border-white/10 shrink-0">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                <Database className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white tracking-wide uppercase flex items-center gap-2">
                  <span>Conexão Supabase</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono border ${isConnected ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300" : "bg-red-500/20 border-red-500/40 text-red-300"}`}>
                    {isConnected ? "● Conectado" : "○ Não Conectado"}
                  </span>
                </h3>
                <p className="text-xs text-white/50 font-medium">
                  {lang === "pt" ? "Configuração de VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY" : "Configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY"}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                playClick();
                onClose();
              }}
              onMouseEnter={playTick}
              className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white rounded-xl transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-5 sm:p-6 space-y-5 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-white/10">
            {/* Environment Var Notice */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                <Globe className="w-4 h-4" />
                <span>{lang === "pt" ? "Variáveis de Ambiente Vite (.env)" : "Vite Environment Variables"}</span>
              </div>
              <p className="text-xs text-white/70 leading-relaxed">
                {lang === "pt"
                  ? "Para conectar o aplicativo ao Supabase, utilize as chaves de API do seu projeto Supabase no arquivo .env ou no painel do Vite:"
                  : "To connect this app to Supabase, use your Supabase project API keys in your .env or Vite config:"}
              </p>
              <div className="p-3 bg-black/60 rounded-xl font-mono text-[11px] text-emerald-300 border border-white/5 space-y-1 select-all">
                <div>VITE_SUPABASE_URL="https://sua-url.supabase.co"</div>
                <div>VITE_SUPABASE_ANON_KEY="sua-chave-anon-publica"</div>
              </div>
            </div>

            {/* Form Inputs for Direct Local Connection */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-white/60 uppercase tracking-wider flex items-center gap-2">
                <Key className="w-4 h-4 text-emerald-400" />
                <span>{lang === "pt" ? "Configuração Manual no Navegador" : "Browser Manual Override"}</span>
              </h4>

              {/* URL Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white/80 block">
                  Supabase Project URL (VITE_SUPABASE_URL)
                </label>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://xyzxyzxyz.supabase.co"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-white/30"
                />
              </div>

              {/* Anon Key Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white/80 block">
                  Supabase Anon Key (VITE_SUPABASE_ANON_KEY)
                </label>
                <textarea
                  value={anonKey}
                  onChange={(e) => setAnonKey(e.target.value)}
                  rows={3}
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-white/30 resize-none"
                />
              </div>
            </div>

            {/* Feedback Alert */}
            {testResult && (
              <div
                className={`p-3.5 rounded-2xl border text-xs flex items-start gap-3 ${
                  testResult.success
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                    : "bg-red-500/10 border-red-500/30 text-red-300"
                }`}
              >
                {testResult.success ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                )}
                <div>{testResult.message}</div>
              </div>
            )}

            {/* Quick SQL Schema Help */}
            <div className="p-4 rounded-2xl bg-slate-950/40 border border-white/5 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                <HelpCircle className="w-4 h-4" />
                <span>{lang === "pt" ? "Script SQL Completo para o Supabase Editor" : "Complete SQL Script for Supabase"}</span>
              </div>
              <p className="text-[11px] text-white/60">
                Copie o script abaixo e execute no <b className="text-white">SQL Editor</b> do seu painel Supabase para configurar as tabelas, permissões e ranking:
              </p>
              <pre className="p-3 bg-black/80 rounded-xl font-mono text-[10px] text-amber-300/90 border border-white/10 overflow-x-auto select-all max-h-60 leading-relaxed">
{`-- 1. CRIAR OU ATUALIZAR TABELA DE PERFIS DE GESTORES
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY,
  nome TEXT NOT NULL,
  municipio TEXT NOT NULL,
  senha TEXT,
  score_acumulado INTEGER DEFAULT 0,
  avatar_url TEXT,
  modulo_atual INTEGER DEFAULT 1,
  game_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Garantir colunas essenciais caso a tabela ja exista
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS senha TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now());
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now());

-- Index para agilizar a ordenacao do Ranking
CREATE INDEX IF NOT EXISTS idx_profiles_score ON public.profiles(score_acumulado DESC);

-- 2. HABILITAR ROW LEVEL SECURITY (RLS) E POLITICAS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Permitir leitura publica de perfis para ranking" ON public.profiles;
DROP POLICY IF EXISTS "Gestor pode atualizar seu proprio perfil" ON public.profiles;
DROP POLICY IF EXISTS "Permitir acesso total a perfis" ON public.profiles;

-- Politica permissiva para leitura, cadastro e sincronizacao de perfis
CREATE POLICY "Permitir acesso total a perfis" 
  ON public.profiles FOR ALL 
  USING (true)
  WITH CHECK (true);

-- 3. TRIGGER AUTOMATICO AO CADASTRAR NOVO GESTOR VIA AUTH
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, nome, municipio, senha, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'nome', 'Gestor(a)'),
    COALESCE(NEW.raw_user_meta_data->>'municipio', 'Escola Municipal'),
    NEW.raw_user_meta_data->>'senha',
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', '')
  )
  ON CONFLICT (id) DO UPDATE SET
    nome = EXCLUDED.nome,
    municipio = EXCLUDED.municipio,
    senha = COALESCE(EXCLUDED.senha, public.profiles.senha);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();`}
              </pre>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-4 sm:p-5 border-t border-white/10 bg-slate-950/80 flex flex-wrap items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2">
              <button
                onClick={handleTestConnection}
                disabled={testing}
                className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${testing ? "animate-spin" : ""}`} />
                <span>{testing ? "Testando..." : "Testar Conexão"}</span>
              </button>

              {(currentConfig.url || currentConfig.anonKey) && (
                <button
                  onClick={handleClear}
                  className="px-3 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-300 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                  title="Limpar dados do navegador"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Limpar</span>
                </button>
              )}
            </div>

            <button
              onClick={handleSave}
              className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <Save className="w-4 h-4" />
              <span>Salvar e Recarregar</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
