-- Execute este script no SQL Editor do seu projeto Supabase

-- 1. Cria a tabela de Perfis
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid references auth.users on delete cascade primary key,
  nome text,
  municipio text,
  score_acumulado integer default 0,
  avatar_url text
);

-- 2. Trigger para criar perfil automaticamente no SignUp
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, nome, avatar_url)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'nome',
    new.raw_user_meta_data->>'avatar_url'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Remove o trigger se já existir para poder recriar
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Associa o trigger à tabela de usuários do Supabase Auth
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 3. Configura a Segurança em Nível de Linha (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Permite que qualquer pessoa veja os perfis (necessário para o Ranking)
CREATE POLICY "Perfis são públicos para leitura"
  ON public.profiles FOR SELECT
  USING ( true );

-- Permite que o usuário insira seu próprio perfil
CREATE POLICY "Usuários podem inserir seus perfis"
  ON public.profiles FOR INSERT
  WITH CHECK ( auth.uid() = id );

-- Permite que o usuário atualize seu próprio perfil
CREATE POLICY "Usuários podem atualizar seus perfis"
  ON public.profiles FOR UPDATE
  USING ( auth.uid() = id );

-- 4. Configura o Storage para os Avatares
INSERT INTO storage.buckets (id, name, public) 
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Políticas do Storage
CREATE POLICY "Avatares são públicos"
  ON storage.objects FOR SELECT
  USING ( bucket_id = 'avatars' );

CREATE POLICY "Usuários podem fazer upload de avatares"
  ON storage.objects FOR INSERT
  WITH CHECK ( bucket_id = 'avatars' AND auth.role() = 'authenticated' );

CREATE POLICY "Usuários podem atualizar seus próprios avatares"
  ON storage.objects FOR UPDATE
  USING ( auth.uid() = owner );

CREATE POLICY "Usuários podem deletar seus próprios avatares"
  ON storage.objects FOR DELETE
  USING ( auth.uid() = owner );
