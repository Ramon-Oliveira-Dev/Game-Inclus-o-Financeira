-- PARTE 1: ESTRUTURA DO BANCO DE DADOS (SUPABASE SQL)

-- Atualiza ou cria a tabela profiles com suporte à nova estrutura híbrida
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nome TEXT,
  municipio TEXT,
  score_acumulado NUMERIC DEFAULT 0,
  modulo_atual INT DEFAULT 0,
  game_data JSONB DEFAULT '{}'::jsonb,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Ativa o Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Política 1: Usuários podem ler seus próprios dados, ou talvez dados de todos (se houver ranking global)
-- Vamos permitir leitura global para o Ranking:
DROP POLICY IF EXISTS "Permitir leitura global de perfis" ON public.profiles;
CREATE POLICY "Permitir leitura global de perfis" 
ON public.profiles FOR SELECT 
USING (true);

-- Política 2: Usuários só podem atualizar (UPSERT) seu próprio perfil
DROP POLICY IF EXISTS "Permitir upsert do próprio perfil" ON public.profiles;
CREATE POLICY "Permitir upsert do próprio perfil" 
ON public.profiles FOR INSERT 
WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Permitir update do próprio perfil" ON public.profiles;
CREATE POLICY "Permitir update do próprio perfil" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id) 
WITH CHECK (auth.uid() = id);

-- Trigger para atualizar automaticamente o updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
