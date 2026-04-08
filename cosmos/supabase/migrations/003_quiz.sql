-- Migration 003 : Système de Quiz
-- À exécuter après 001 et 002

-- ─────────────────────────────────────────────
-- Table : quiz_questions
-- ─────────────────────────────────────────────
CREATE TABLE public.quiz_questions (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id   UUID NOT NULL REFERENCES public.modules(id) ON DELETE CASCADE,
  level       user_level NOT NULL,
  question    TEXT NOT NULL,
  options     JSONB NOT NULL,  -- ["option A", "option B", "option C", "option D"]
  answer      INTEGER NOT NULL, -- index de la bonne réponse (0-3)
  explanation TEXT NOT NULL DEFAULT '',
  "order"     INTEGER NOT NULL DEFAULT 0
);

ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Questions visibles par tous" ON public.quiz_questions FOR SELECT USING (true);

-- ─────────────────────────────────────────────
-- Seed : Questions pour La Relativité Restreinte
-- ─────────────────────────────────────────────

-- Niveau Curieux (3 questions)
INSERT INTO public.quiz_questions (module_id, level, question, options, answer, explanation, "order") VALUES
(
  '10000000-0000-0000-0000-000000000001', 'curious',
  'Qu''est-ce que la dilatation du temps signifie ?',
  '["Le temps s''écoule plus vite quand on va vite", "Le temps s''écoule plus lentement quand on va vite", "Le temps s''arrête à la vitesse de la lumière", "Le temps n''existe pas dans l''espace"]',
  1,
  'Plus un objet se déplace vite, plus le temps s''écoule lentement pour lui. C''est la dilatation temporelle prédite par Einstein.',
  1
),
(
  '10000000-0000-0000-0000-000000000001', 'curious',
  'Quelle est la célèbre formule d''Einstein sur l''équivalence masse-énergie ?',
  '["F = ma", "E = mc²", "a² + b² = c²", "v = d/t"]',
  1,
  'E = mc² signifie qu''énergie et masse sont interconvertibles. c est la vitesse de la lumière (≈300 000 km/s).',
  2
),
(
  '10000000-0000-0000-0000-000000000001', 'curious',
  'Quelle est la vitesse maximale qu''un objet peut atteindre dans l''univers ?',
  '["La vitesse du son", "La vitesse de la lumière", "Deux fois la vitesse de la lumière", "Il n''y a pas de limite"]',
  1,
  'Rien ne peut dépasser la vitesse de la lumière (c ≈ 300 000 km/s). C''est une loi fondamentale de la physique.',
  3
),

-- Niveau Passionné (3 questions)
(
  '10000000-0000-0000-0000-000000000001', 'passionate',
  'Dans la formule de Lorentz t'' = t/√(1−v²/c²), que se passe-t-il quand v → c ?',
  '["t'' → 0", "t'' → t", "t'' → ∞", "t'' → −t"]',
  2,
  'Quand v tend vers c, le dénominateur tend vers 0, donc t'' tend vers l''infini : le temps s''écoule infiniment lentement.',
  1
),
(
  '10000000-0000-0000-0000-000000000001', 'passionate',
  'Les muons créés à 10 km d''altitude survivent jusqu''au sol. Pourquoi ?',
  '["Ils vont très lentement", "Leur temps est dilaté par leur grande vitesse", "Ils ont une longue durée de vie naturelle", "La gravité les protège"]',
  1,
  'Les muons voyagent à ~99% de c. Leur durée de vie de 2,2 μs est dilatée d''un facteur ~22, leur permettant d''atteindre le sol.',
  2
),
(
  '10000000-0000-0000-0000-000000000001', 'passionate',
  'Qu''est-ce que la contraction des longueurs prédit ?',
  '["Les objets grandissent quand ils accélèrent", "Les objets se contractent dans la direction du mouvement", "La masse d''un objet diminue à grande vitesse", "L''espace se dilate autour des objets rapides"]',
  1,
  'Un objet en mouvement paraît plus court dans la direction du déplacement pour un observateur externe. À 87% de c, il paraît deux fois plus court.',
  3
),

-- Niveau Étudiant (3 questions)
(
  '10000000-0000-0000-0000-000000000001', 'student',
  'Quelle est la signature de la métrique de Minkowski ?',
  '["(+,+,+,+)", "(−,+,+,+)", "(+,−,−,−)", "(−,−,−,−)"]',
  1,
  'L''espace-temps de Minkowski a la signature (−,+,+,+) : une dimension temporelle de signe négatif et trois spatiales positives.',
  1
),
(
  '10000000-0000-0000-0000-000000000001', 'student',
  'Quel groupe de transformations laisse invariant l''intervalle ds² de Minkowski ?',
  '["Le groupe de Galilée SO(3)", "Le groupe de Lorentz SO(1,3)", "Le groupe de Poincaré U(1)", "Le groupe de rotation SO(4)"]',
  1,
  'Les transformations de Lorentz forment le groupe SO(1,3). Elles laissent invariant l''intervalle ds² = −c²dt² + dx² + dy² + dz².',
  2
),
(
  '10000000-0000-0000-0000-000000000001', 'student',
  'Pour un intervalle ds² < 0, quelle est la nature de la séparation entre deux événements ?',
  '["Genre espace : pas de connexion causale possible", "Genre temps : une connexion causale est possible", "Genre lumière : les événements sont simultanés", "Indéfini : impossible à déterminer"]',
  1,
  'ds² < 0 (genre temps) signifie que les deux événements peuvent être causalement connectés — l''un peut influencer l''autre.',
  3
);
