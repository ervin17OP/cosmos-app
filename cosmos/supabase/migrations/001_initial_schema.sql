-- Migration 001 : Schéma initial COSMOS
-- À exécuter dans l'éditeur SQL de Supabase

-- ─────────────────────────────────────────────
-- Types énumérés
-- ─────────────────────────────────────────────
CREATE TYPE user_level AS ENUM ('curious', 'passionate', 'student');

-- ─────────────────────────────────────────────
-- Table : users_profiles
-- ─────────────────────────────────────────────
CREATE TABLE public.users_profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username    TEXT NOT NULL,
  level       user_level NOT NULL DEFAULT 'curious',
  xp          INTEGER NOT NULL DEFAULT 0,
  streak_days INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Sécurité niveau ligne (RLS)
ALTER TABLE public.users_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Utilisateurs voient leur propre profil"
  ON public.users_profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Utilisateurs modifient leur propre profil"
  ON public.users_profiles FOR UPDATE
  USING (auth.uid() = id);

-- ─────────────────────────────────────────────
-- Table : themes
-- ─────────────────────────────────────────────
CREATE TABLE public.themes (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        TEXT UNIQUE NOT NULL,
  title       TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  icon        TEXT NOT NULL DEFAULT '🌌',
  color       TEXT NOT NULL DEFAULT '#c799ff',
  "order"     INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.themes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Thèmes visibles par tous" ON public.themes FOR SELECT USING (true);

-- ─────────────────────────────────────────────
-- Table : modules
-- ─────────────────────────────────────────────
CREATE TABLE public.modules (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  theme_id          UUID NOT NULL REFERENCES public.themes(id) ON DELETE CASCADE,
  title             TEXT NOT NULL,
  slug              TEXT UNIQUE NOT NULL,
  duration_minutes  INTEGER NOT NULL DEFAULT 10,
  is_premium        BOOLEAN NOT NULL DEFAULT FALSE,
  "order"           INTEGER NOT NULL DEFAULT 0,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Modules visibles par tous" ON public.modules FOR SELECT USING (true);

-- ─────────────────────────────────────────────
-- Table : module_content
-- ─────────────────────────────────────────────
CREATE TABLE public.module_content (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id    UUID NOT NULL REFERENCES public.modules(id) ON DELETE CASCADE,
  level        user_level NOT NULL,
  content_json JSONB NOT NULL DEFAULT '[]',
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (module_id, level)
);

ALTER TABLE public.module_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Contenu visible par tous" ON public.module_content FOR SELECT USING (true);

-- ─────────────────────────────────────────────
-- Table : user_progress
-- ─────────────────────────────────────────────
CREATE TABLE public.user_progress (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID NOT NULL REFERENCES public.users_profiles(id) ON DELETE CASCADE,
  module_id    UUID NOT NULL REFERENCES public.modules(id) ON DELETE CASCADE,
  completed    BOOLEAN NOT NULL DEFAULT FALSE,
  score        INTEGER NOT NULL DEFAULT 0,
  completed_at TIMESTAMPTZ,
  UNIQUE (user_id, module_id)
);

ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Utilisateurs voient leur progression"
  ON public.user_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Utilisateurs modifient leur progression"
  ON public.user_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Utilisateurs mettent à jour leur progression"
  ON public.user_progress FOR UPDATE
  USING (auth.uid() = user_id);

-- ─────────────────────────────────────────────
-- Fonction : créer le profil automatiquement après inscription
-- ─────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users_profiles (id, username, level)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', 'Explorateur'),
    COALESCE((NEW.raw_user_meta_data->>'level')::user_level, 'curious')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
