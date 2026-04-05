-- Migration 002 : Données de seed pour COSMOS
-- À exécuter après la migration 001

-- ─────────────────────────────────────────────
-- Thèmes
-- ─────────────────────────────────────────────
INSERT INTO public.themes (id, slug, title, description, icon, color, "order") VALUES
  ('00000000-0000-0000-0000-000000000001', 'mecanique-celeste',       'Mécanique Céleste',       'Les lois qui gouvernent les mouvements des corps célestes', '🪐', '#c799ff', 1),
  ('00000000-0000-0000-0000-000000000002', 'relativite',              'Relativité & Temps',      'Einstein et la révolution de notre compréhension du temps',  '⚡', '#26fedc', 2),
  ('00000000-0000-0000-0000-000000000003', 'trous-noirs',             'Trous Noirs',             'Les singularités les plus extrêmes de l''univers',            '🌑', '#ffdb8f', 3),
  ('00000000-0000-0000-0000-000000000004', 'ondes-gravitationnelles', 'Ondes Gravi.',            'Les rides de l''espace-temps détectées par LIGO',             '〰️', '#bb83ff', 4),
  ('00000000-0000-0000-0000-000000000005', 'exoplanetes',             'Exoplanètes',             'Mondes au-delà de notre système solaire',                     '🌍', '#eabe55', 5),
  ('00000000-0000-0000-0000-000000000006', 'big-bang',                'Big Bang',                'L''origine et l''évolution de l''univers',                    '💥', '#ff6e84', 6);

-- ─────────────────────────────────────────────
-- Modules
-- ─────────────────────────────────────────────
INSERT INTO public.modules (id, theme_id, title, slug, duration_minutes, is_premium, "order") VALUES
  ('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002', 'La Relativité Restreinte',  'relativite-restreinte',    12, FALSE, 1),
  ('10000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000002', 'La Relativité Générale',    'relativite-generale',      18, FALSE, 2),
  ('10000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000001', 'Les Lois de Kepler',        'lois-kepler',              10, FALSE, 1),
  ('10000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000001', 'La Gravitation Universelle','gravitation-universelle',   15, TRUE,  2),
  ('10000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000003', 'Naissance d''un Trou Noir', 'naissance-trou-noir',      14, FALSE, 1),
  ('10000000-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000003', 'L''Horizon des Événements', 'horizon-evenements',       20, TRUE,  2);

-- ─────────────────────────────────────────────
-- Contenu complet : La Relativité Restreinte (3 niveaux)
-- ─────────────────────────────────────────────

-- Niveau Curieux
INSERT INTO public.module_content (module_id, level, content_json) VALUES
(
  '10000000-0000-0000-0000-000000000001',
  'curious',
  '[
    {
      "type": "text",
      "title": "Le Temps, c''est Relatif !",
      "content": "Imagine que le temps n''écoule pas à la même vitesse pour tout le monde. C''est exactement ce qu''Einstein a découvert en 1905 : plus tu vas vite, plus le temps ralentit autour de toi."
    },
    {
      "type": "analogy",
      "quote": "Imaginez deux jumeaux. L''un voyage vers les étoiles à une vitesse proche de la lumière tandis que l''autre reste sur Terre. Au retour du voyageur, il sera bien plus jeune que son frère resté ici.",
      "icon": "👨‍👦"
    },
    {
      "type": "formula",
      "formula": "E = mc²",
      "label": "Équivalence masse-énergie"
    },
    {
      "type": "text",
      "title": "La Limite Ultime",
      "content": "Rien dans l''univers ne peut aller plus vite que la lumière. C''est la règle numéro 1 du cosmos ! La vitesse de la lumière est d''environ 300 000 km par seconde."
    },
    {
      "type": "quiz_teaser",
      "title": "Prêt pour le test ?",
      "subtitle": "Tester ta compréhension"
    }
  ]'
),

-- Niveau Passionné
(
  '10000000-0000-0000-0000-000000000001',
  'passionate',
  '[
    {
      "type": "text",
      "title": "La Dilatation du Temps",
      "content": "La relativité restreinte prédit que le temps s''écoule plus lentement pour un observateur en mouvement par rapport à un observateur au repos. Ce phénomène, appelé dilatation temporelle, a été confirmé par des expériences avec des horloges atomiques à bord d''avions."
    },
    {
      "type": "formula",
      "formula": "t'' = t/√(1−v²/c²)",
      "label": "Facteur de Lorentz (γ)"
    },
    {
      "type": "analogy",
      "quote": "Les muons créés par les rayons cosmiques à 10 km d''altitude survivent jusqu''au sol malgré leur durée de vie de 2,2 μs. Du point de vue terrestre, leur temps est dilaté par un facteur ~22.",
      "icon": "⚛️"
    },
    {
      "type": "text",
      "title": "La Contraction des Longueurs",
      "content": "Non seulement le temps se dilate, mais les longueurs se contractent dans la direction du mouvement. Un vaisseau voyageant à 87% de c paraît deux fois plus court pour un observateur externe."
    },
    {
      "type": "quiz_teaser",
      "title": "Prêt pour le test ?",
      "subtitle": "Valider ta compréhension du niveau Passionné"
    }
  ]'
),

-- Niveau Étudiant
(
  '10000000-0000-0000-0000-000000000001',
  'student',
  '[
    {
      "type": "text",
      "title": "Le Tenseur Métrique de Minkowski",
      "content": "La relativité restreinte se formule dans l''espace-temps de Minkowski, un espace pseudo-riemannien à 4 dimensions avec signature (−,+,+,+). Les transformations de Lorentz forment le groupe SO(1,3)."
    },
    {
      "type": "formula",
      "formula": "ds² = −c²dt² + dx² + dy² + dz²",
      "label": "Intervalle espace-temps de Minkowski"
    },
    {
      "type": "text",
      "title": "Invariance Causale",
      "content": "L''intervalle ds² est un invariant de Lorentz. Pour ds² < 0 (genre temps), deux événements peuvent être causalement connectés. Pour ds² > 0 (genre espace), aucune interaction causale n''est possible — c''est le cône de lumière qui délimite ces régions."
    },
    {
      "type": "formula",
      "formula": "p^μ = mU^μ = γm(c, v)",
      "label": "Quadri-impulsion relativiste"
    },
    {
      "type": "analogy",
      "quote": "Le paradoxe des jumeaux se résout en reconnaissant l''asymétrie : le jumeau voyageur subit une accélération lors du demi-tour, brisant la symétrie apparente des référentiels.",
      "icon": "⚛️"
    },
    {
      "type": "quiz_teaser",
      "title": "Défi Étudiant",
      "subtitle": "Démontrer ta maîtrise de la relativité restreinte"
    }
  ]'
);
