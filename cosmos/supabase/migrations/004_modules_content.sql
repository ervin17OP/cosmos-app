-- Migration 004 : Contenu des 5 modules restants + questions quiz
-- À exécuter après 001, 002, 003

-- ══════════════════════════════════════════════════════════════
-- MODULE : La Relativité Générale (id: ...0002)
-- ══════════════════════════════════════════════════════════════

INSERT INTO public.module_content (module_id, level, content_json) VALUES
(
  '10000000-0000-0000-0000-000000000002', 'curious',
  '[
    {"type":"text","title":"L''espace se courbe !","content":"La relativité générale d''Einstein dit que la gravité n''est pas une force, mais une courbure de l''espace-temps. Les objets massifs comme le Soleil « creusent » l''espace autour d''eux, comme une boule de bowling sur un trampoline."},
    {"type":"analogy","quote":"Imaginez l''espace-temps comme un tissu. Le Soleil est une boule lourde posée dessus qui crée un creux. La Terre tourne autour parce qu''elle suit le bord de ce creux, pas parce qu''une force l''attire.","icon":"🌍"},
    {"type":"formula","formula":"G_μν = 8πT_μν","label":"Équations d''Einstein (simplifiées)"},
    {"type":"text","title":"La lumière se courbe aussi","content":"Pendant l''éclipse de 1919, Arthur Eddington a observé que la lumière des étoiles se courbait en passant près du Soleil — exactement comme prédit par Einstein. C''est la première confirmation expérimentale de la relativité générale."},
    {"type":"quiz_teaser","title":"Tester votre compréhension","subtitle":"3 questions · Niveau Curieux"}
  ]'
),
(
  '10000000-0000-0000-0000-000000000002', 'passionate',
  '[
    {"type":"text","title":"La courbure de l''espace-temps","content":"La relativité générale décrit la gravitation comme la courbure de l''espace-temps 4D causée par l''énergie-impulsion de la matière. Le tenseur de Ricci mesure cette courbure locale."},
    {"type":"formula","formula":"R_μν - ½Rg_μν + Λg_μν = 8πG/c⁴ · T_μν","label":"Équations de champ d''Einstein"},
    {"type":"analogy","quote":"Les équations d''Einstein sont comme les lois de Newton mais pour l''espace-temps lui-même : la géométrie dicte le mouvement, et la matière dicte la géométrie.","icon":"🌀"},
    {"type":"text","title":"Les ondes gravitationnelles","content":"Les équations d''Einstein prédisent des « rides » dans l''espace-temps appelées ondes gravitationnelles. Détectées par LIGO en 2015, elles provenaient de deux trous noirs fusionnant à 1,3 milliard d''années-lumière."},
    {"type":"quiz_teaser","title":"Valider votre compréhension","subtitle":"3 questions · Niveau Passionné"}
  ]'
),
(
  '10000000-0000-0000-0000-000000000002', 'student',
  '[
    {"type":"text","title":"Le tenseur de Riemann","content":"La courbure de l''espace-temps est décrite par le tenseur de Riemann R^ρ_σμν. Sa contraction donne le tenseur de Ricci R_μν, et sa trace le scalaire de Ricci R. Ces objets apparaissent dans les équations d''Einstein."},
    {"type":"formula","formula":"∇_μG^μν = 0","label":"Conservation de l''énergie-impulsion"},
    {"type":"text","title":"Solutions exactes","content":"La solution de Schwarzschild décrit l''espace-temps autour d''un objet sphérique non rotatif. Elle prédit le rayon de Schwarzschild r_s = 2GM/c², en deçà duquel même la lumière ne peut s''échapper."},
    {"type":"formula","formula":"ds² = -(1-r_s/r)c²dt² + dr²/(1-r_s/r) + r²dΩ²","label":"Métrique de Schwarzschild"},
    {"type":"quiz_teaser","title":"Défi Étudiant","subtitle":"3 questions · Niveau Étudiant"}
  ]'
),

-- ══════════════════════════════════════════════════════════════
-- MODULE : Les Lois de Kepler (id: ...0003)
-- ══════════════════════════════════════════════════════════════

(
  '10000000-0000-0000-0000-000000000003', 'curious',
  '[
    {"type":"text","title":"Les planètes suivent des ellipses","content":"Johannes Kepler a découvert au XVIIe siècle que les planètes ne tournent pas en cercles parfaits autour du Soleil, mais en ellipses. Le Soleil se trouve à l''un des deux foyers de cette ellipse."},
    {"type":"analogy","quote":"Imaginez une ellipse comme un cercle un peu aplati. Si vous posez le Soleil à un côté, la planète est parfois plus proche (périhélie) et parfois plus éloignée (aphélie).","icon":"☀️"},
    {"type":"formula","formula":"T² = a³","label":"3e loi de Kepler (unités astronomiques)"},
    {"type":"text","title":"Plus vite près du Soleil","content":"Une planète se déplace plus vite quand elle est proche du Soleil et plus lentement quand elle en est éloignée. C''est la 2e loi : les aires balayées sont égales en temps égaux."},
    {"type":"quiz_teaser","title":"Tester vos connaissances","subtitle":"3 questions · Niveau Curieux"}
  ]'
),
(
  '10000000-0000-0000-0000-000000000003', 'passionate',
  '[
    {"type":"text","title":"Les trois lois de Kepler","content":"1ère loi : Les planètes décrivent des ellipses dont le Soleil occupe l''un des foyers. 2ème loi : Le rayon vecteur balaie des aires égales en temps égaux (conservation du moment cinétique). 3ème loi : Le carré de la période est proportionnel au cube du demi-grand axe."},
    {"type":"formula","formula":"T² / a³ = 4π² / (GM)","label":"3e loi de Kepler (forme générale)"},
    {"type":"analogy","quote":"La 2e loi de Kepler est une conséquence directe de la conservation du moment cinétique — la même raison pour laquelle un patineur tourne plus vite en rapprochant ses bras.","icon":"⛸️"},
    {"type":"quiz_teaser","title":"Valider votre compréhension","subtitle":"3 questions · Niveau Passionné"}
  ]'
),
(
  '10000000-0000-0000-0000-000000000003', 'student',
  '[
    {"type":"text","title":"Dérivation depuis Newton","content":"Les lois de Kepler sont des conséquences directes de la loi de gravitation universelle de Newton. En résolvant l''équation du mouvement sous force centrale en 1/r², on obtient des coniques (ellipses, paraboles, hyperboles)."},
    {"type":"formula","formula":"d²u/dθ² + u = GM/h²","label":"Équation de Binet (orbites)"},
    {"type":"text","title":"Énergie orbitale","content":"L''énergie mécanique totale d''une orbite elliptique E = -GMm/(2a) ne dépend que du demi-grand axe a. Une orbite circulaire a E < 0, une parabole E = 0 (vitesse de libération), une hyperbole E > 0."},
    {"type":"formula","formula":"v_lib = √(2GM/r)","label":"Vitesse de libération"},
    {"type":"quiz_teaser","title":"Défi Étudiant","subtitle":"3 questions · Niveau Étudiant"}
  ]'
),

-- ══════════════════════════════════════════════════════════════
-- MODULE : Naissance d'un Trou Noir (id: ...0005)
-- ══════════════════════════════════════════════════════════════

(
  '10000000-0000-0000-0000-000000000005', 'curious',
  '[
    {"type":"text","title":"Quand une étoile meurt","content":"Un trou noir se forme quand une étoile très massive épuise son carburant nucléaire. Sans la pression de la fusion nucléaire pour la soutenir, l''étoile s''effondre sur elle-même sous l''effet de sa propre gravité."},
    {"type":"analogy","quote":"Imaginez un feu de bois. Tant qu''il brûle, la chaleur repousse tout. Le jour où il s''éteint, tout s''effondre vers le centre. Pour les étoiles géantes, cet effondrement est si violent qu''il crée un trou noir.","icon":"🌟"},
    {"type":"text","title":"L''horizon des événements","content":"La frontière d''un trou noir s''appelle l''horizon des événements. Rien de ce qui entre ne peut en ressortir — pas même la lumière. C''est pourquoi on l''appelle « noir »."},
    {"type":"formula","formula":"r_s = 2GM/c²","label":"Rayon de Schwarzschild"},
    {"type":"quiz_teaser","title":"Tester vos connaissances","subtitle":"3 questions · Niveau Curieux"}
  ]'
),
(
  '10000000-0000-0000-0000-000000000005', 'passionate',
  '[
    {"type":"text","title":"L''effondrement gravitationnel","content":"Quand une étoile de masse > 20 M☉ s''effondre, la pression électronique puis neutronique sont surmontées. L''effondrement continue jusqu''à une singularité de densité infinie, enveloppée par l''horizon de Schwarzschild."},
    {"type":"formula","formula":"M_Chandrasekar ≈ 1,4 M☉","label":"Limite de Chandrasekhar (naines blanches)"},
    {"type":"analogy","quote":"Les étoiles à neutrons résistent à l''effondrement grâce à la pression de dégénérescence neutronique. Mais au-delà de ~3 M☉ (limite TOV), même cette résistance cède.","icon":"⭐"},
    {"type":"text","title":"Types de trous noirs","content":"Il existe 3 types : stellaires (3-100 M☉, issus d''étoiles), intermédiaires (100-10⁵ M☉) et supermassifs (10⁶-10¹⁰ M☉) au cœur des galaxies. Sagittarius A*, le trou noir central de notre galaxie, pèse 4 millions de masses solaires."},
    {"type":"quiz_teaser","title":"Valider votre compréhension","subtitle":"3 questions · Niveau Passionné"}
  ]'
),
(
  '10000000-0000-0000-0000-000000000005', 'student',
  '[
    {"type":"text","title":"Thermodynamique des trous noirs","content":"Bekenstein et Hawking ont montré que les trous noirs possèdent une entropie S = A/4 (en unités de Planck) et une température T_H = ℏc³/(8πGMk_B). Ce rayonnement de Hawking est purement quantique."},
    {"type":"formula","formula":"T_H = ℏc³ / (8πGMk_B)","label":"Température de Hawking"},
    {"type":"text","title":"Paradoxe de l''information","content":"Si un trou noir s''évapore via le rayonnement de Hawking, que deviennent les informations des objets tombés dedans ? Ce paradoxe de l''information reste l''un des problèmes ouverts de la physique théorique."},
    {"type":"formula","formula":"S_BH = k_B · A / (4l_P²)","label":"Entropie de Bekenstein-Hawking"},
    {"type":"quiz_teaser","title":"Défi Étudiant","subtitle":"3 questions · Niveau Étudiant"}
  ]'
);

-- ══════════════════════════════════════════════════════════════
-- QUIZ : Questions pour les nouveaux modules
-- ══════════════════════════════════════════════════════════════

-- Relativité Générale — Curieux
INSERT INTO public.quiz_questions (module_id, level, question, options, answer, explanation, "order") VALUES
('10000000-0000-0000-0000-000000000002', 'curious',
  'Selon la relativité générale, qu''est-ce que la gravité ?',
  '["Une force entre deux masses", "Une courbure de l''espace-temps", "Un champ magnétique", "Une onde électromagnétique"]', 1,
  'Einstein a montré que la gravité n''est pas une force mais la courbure de l''espace-temps causée par la masse.', 1),
('10000000-0000-0000-0000-000000000002', 'curious',
  'Quelle observation en 1919 a confirmé la relativité générale ?',
  '["La chute d''une pomme", "La déviation de la lumière par le Soleil", "La rotation de la Terre", "L''éclipse de Lune"]', 1,
  'Eddington observa la déviation de la lumière des étoiles en passant près du Soleil lors de l''éclipse de 1919.', 2),
('10000000-0000-0000-0000-000000000002', 'curious',
  'Qu''est-ce que l''espace-temps ?',
  '["L''espace à 3 dimensions", "La fusion des 3 dimensions spatiales et du temps en une seule entité à 4D", "Une théorie sur la vitesse de la lumière", "L''espace entre les galaxies"]', 1,
  'L''espace-temps unit les 3 dimensions spatiales et la dimension temporelle en un continuum à 4 dimensions.', 3),

-- Lois de Kepler — Curieux
('10000000-0000-0000-0000-000000000003', 'curious',
  'Quelle forme décrivent les orbites des planètes autour du Soleil ?',
  '["Des cercles parfaits", "Des ellipses", "Des spirales", "Des lignes droites"]', 1,
  'C''est la 1ère loi de Kepler : les planètes décrivent des ellipses avec le Soleil à l''un des foyers.', 1),
('10000000-0000-0000-0000-000000000003', 'curious',
  'Une planète va-t-elle plus vite quand elle est proche ou éloignée du Soleil ?',
  '["Elle va à vitesse constante", "Plus vite quand elle est éloignée", "Plus vite quand elle est proche", "Ça dépend de sa taille"]', 2,
  'La 2e loi de Kepler : une planète se déplace plus vite à son périhélie (point le plus proche du Soleil).', 2),
('10000000-0000-0000-0000-000000000003', 'curious',
  'La période orbitale de Mars est de ~1,88 ans. Son demi-grand axe est environ ?',
  '["0,7 UA", "1,0 UA", "1,52 UA", "5,2 UA"]', 2,
  'Par la 3e loi T² = a³ : (1,88)² ≈ 3,53 ≈ (1,52)³. Mars est à 1,52 UA du Soleil.', 3),

-- Naissance d'un Trou Noir — Curieux
('10000000-0000-0000-0000-000000000005', 'curious',
  'Comment se forme un trou noir stellaire ?',
  '["Par l''explosion d''une planète", "Par l''effondrement d''une étoile très massive", "Par la collision de deux étoiles normales", "Par le refroidissement du Soleil"]', 1,
  'Les trous noirs stellaires se forment quand une étoile de plus de ~20 masses solaires épuise son carburant et s''effondre.', 1),
('10000000-0000-0000-0000-000000000005', 'curious',
  'Pourquoi un trou noir est-il "noir" ?',
  '["Il est peint en noir", "Rien ne peut s''en échapper, pas même la lumière", "Il absorbe toutes les couleurs sauf le noir", "Il est trop loin pour être vu"]', 1,
  'L''horizon des événements est une frontière de non-retour : la vitesse de libération dépasse c, même la lumière ne peut s''échapper.', 2),
('10000000-0000-0000-0000-000000000005', 'curious',
  'Quel est le nom du trou noir supermassif au centre de notre galaxie ?',
  '["Alpha Centauri", "Sagittarius A*", "Betelgeuse", "Cygnus X-1"]', 1,
  'Sagittarius A* est le trou noir supermassif au centre de la Voie Lactée, avec ~4 millions de masses solaires.', 3);

-- ══════════════════════════════════════════════════════════════
-- MODULE CONTENT : La Gravitation Universelle (id: ...0004)
-- ══════════════════════════════════════════════════════════════

INSERT INTO public.module_content (module_id, level, content_json) VALUES
(
  '10000000-0000-0000-0000-000000000004', 'curious',
  '[
    {"type":"text","title":"La force qui gouverne l''univers","content":"Isaac Newton a découvert en 1687 que deux objets s''attirent mutuellement. Plus ils sont massifs et proches, plus cette attraction est forte. C''est la même force qui fait tomber une pomme et qui maintient la Lune en orbite."},
    {"type":"analogy","quote":"Imaginez que chaque objet dans l''univers « appelle » tous les autres. La Terre appelle la Lune, le Soleil appelle la Terre, et même vous et ce livre vous vous attirez mutuellement — juste trop faiblement pour le ressentir.","icon":"🍎"},
    {"type":"formula","formula":"F = G·m₁·m₂/r²","label":"Loi de gravitation universelle"},
    {"type":"text","title":"G, la constante universelle","content":"G = 6,674 × 10⁻¹¹ N·m²/kg² est la même partout dans l''univers. C''est l''une des constantes fondamentales de la nature. Sa petite valeur explique pourquoi la gravité est si faible à notre échelle."},
    {"type":"quiz_teaser","title":"Tester vos connaissances","subtitle":"3 questions · Niveau Curieux"}
  ]'
),
(
  '10000000-0000-0000-0000-000000000004', 'passionate',
  '[
    {"type":"text","title":"Champ gravitationnel et potentiel","content":"Le champ gravitationnel g = -GM/r² décrit l''accélération subie par un objet test. Le potentiel gravitationnel V = -GM/r est l''énergie potentielle par unité de masse. Ces concepts remplacent avantageusement la notion de « force à distance »."},
    {"type":"formula","formula":"V(r) = -GM/r","label":"Potentiel gravitationnel newtonien"},
    {"type":"analogy","quote":"Le champ gravitationnel est comme une pente : un objet roule naturellement vers le bas du potentiel. La Terre est au fond d''un puits gravitationnel creusé dans l''espace.","icon":"⚡"},
    {"type":"text","title":"Vitesse de libération","content":"Pour quitter un corps céleste, il faut atteindre la vitesse de libération v_lib = √(2GM/r). Pour la Terre : ~11,2 km/s. Pour une étoile à neutrons : une fraction de c. C''est ce concept qui mène naturellement à la notion de trou noir."},
    {"type":"formula","formula":"v_lib = √(2GM/r)","label":"Vitesse de libération"},
    {"type":"quiz_teaser","title":"Valider votre compréhension","subtitle":"3 questions · Niveau Passionné"}
  ]'
),
(
  '10000000-0000-0000-0000-000000000004', 'student',
  '[
    {"type":"text","title":"Problème à deux corps et intégrales premières","content":"Le problème à deux corps se réduit à un problème à un corps de masse réduite μ = m₁m₂/(m₁+m₂) dans un potentiel central. La conservation du moment cinétique L et de l''énergie E donnent les intégrales premières qui permettent de résoudre complètement le mouvement."},
    {"type":"formula","formula":"E = ½μṙ² + L²/(2μr²) - GMμ/r","label":"Énergie dans le référentiel CM"},
    {"type":"text","title":"Développement multipolaire","content":"Pour une distribution de masse étendue, le potentiel s''exprime comme une série de multipôles : V = -GM/r - GQ/r³ - ... Le terme quadrupolaire Q = ∫ρ(3z²-r²)dV décrit l''aplatissement. Il explique la précession des orbites des satellites et les marées."},
    {"type":"formula","formula":"∇²V = 4πGρ","label":"Équation de Poisson (champ de gravitation)"},
    {"type":"quiz_teaser","title":"Défi Étudiant","subtitle":"3 questions · Niveau Étudiant"}
  ]'
),

-- ══════════════════════════════════════════════════════════════
-- MODULE CONTENT : L'Horizon des Événements (id: ...0006)
-- ══════════════════════════════════════════════════════════════

(
  '10000000-0000-0000-0000-000000000006', 'curious',
  '[
    {"type":"text","title":"La frontière de non-retour","content":"L''horizon des événements est la frontière invisible d''un trou noir. Une fois franchie, rien — pas même la lumière — ne peut revenir en arrière. Ce n''est pas une surface physique, juste une limite mathématique dans l''espace."},
    {"type":"analogy","quote":"Imaginez une rivière qui coule vers une cascade. Jusqu''à un certain point, vous pouvez nager à contre-courant et remonter. Passé ce point, même le meilleur nageur du monde sera emporté. L''horizon des événements, c''est ce point de non-retour.","icon":"🌊"},
    {"type":"formula","formula":"r_s = 2GM/c²","label":"Rayon de Schwarzschild"},
    {"type":"text","title":"Ce que verrait un observateur","content":"Un observateur lointain verrait quelqu''un tomber dans un trou noir se figer et rougir à l''approche de l''horizon — jamais le franchir. Mais l''astronaute tombant ne ressentirait rien de spécial en passant l''horizon (pour un grand trou noir). Deux réalités différentes !"},
    {"type":"quiz_teaser","title":"Tester vos connaissances","subtitle":"3 questions · Niveau Curieux"}
  ]'
),
(
  '10000000-0000-0000-0000-000000000006', 'passionate',
  '[
    {"type":"text","title":"Géométrie de Schwarzschild","content":"La métrique de Schwarzschild décrit l''espace-temps autour d''un trou noir non-rotatif. Elle révèle une singularité de coordonnées en r = r_s (l''horizon) et une vraie singularité physique en r = 0. Le diagramme de Kruskal-Szekeres élimine la singularité de coordonnées."},
    {"type":"formula","formula":"ds² = -(1-r_s/r)c²dt² + dr²/(1-r_s/r) + r²dΩ²","label":"Métrique de Schwarzschild"},
    {"type":"analogy","quote":"L''horizon des événements dans la métrique de Schwarzschild est comme l''équateur sur une sphère : une frontière réelle mais sans rien de physiquement spécial au franchissement, sauf qu''on ne peut plus revenir en arrière.","icon":"🌐"},
    {"type":"text","title":"Dilatation temporelle extrême","content":"À l''approche de r_s, la dilatation temporelle diverge : dt_propre/dt_∞ = √(1 - r_s/r) → 0. Un observateur distant voit le temps se figer à l''horizon. Les photons émis près de l''horizon sont infiniment décalés vers le rouge (redshift gravitationnel)."},
    {"type":"quiz_teaser","title":"Valider votre compréhension","subtitle":"3 questions · Niveau Passionné"}
  ]'
),
(
  '10000000-0000-0000-0000-000000000006', 'student',
  '[
    {"type":"text","title":"Coordonnées de Kruskal-Szekeres","content":"Les coordonnées (T, X) de Kruskal éliminent la singularité de coordonnées en r = r_s. Le diagramme de Kruskal révèle la structure causale complète : deux régions extérieures asymptotiquement plates, une région intérieure future (trou noir) et une région intérieure passée (trou blanc)."},
    {"type":"formula","formula":"T² - X² = -(r/r_s - 1)e^(r/r_s)","label":"Relation de Kruskal (région extérieure)"},
    {"type":"text","title":"Théorèmes sur les horizons","content":"Le théorème de Hawking interdit la décroissance de l''aire de l''horizon A_h en relativité générale classique : dA_h/dt ≥ 0. Mais le rayonnement quantique de Hawking T_H ∝ 1/M entraîne une évaporation lente. Pour un trou noir solaire, le temps d''évaporation est ~10⁷⁴ ans."},
    {"type":"formula","formula":"A_h = 16πG²M²/c⁴","label":"Aire de l''horizon de Schwarzschild"},
    {"type":"quiz_teaser","title":"Défi Étudiant","subtitle":"3 questions · Niveau Étudiant"}
  ]'
);

-- ══════════════════════════════════════════════════════════════
-- QUIZ : Niveaux Passionné + Étudiant pour modules 002, 003, 005
-- + Tous niveaux pour modules 004, 006
-- ══════════════════════════════════════════════════════════════

INSERT INTO public.quiz_questions (module_id, level, question, options, answer, explanation, "order") VALUES

-- ── Relativité Générale — Passionné ─────────────────────────
('10000000-0000-0000-0000-000000000002', 'passionate',
  'Que représente le tenseur T_μν dans les équations d''Einstein ?',
  '["La courbure de l''espace-temps", "Le tenseur énergie-impulsion de la matière", "La constante cosmologique", "Le scalaire de Ricci"]', 1,
  'T_μν est le tenseur énergie-impulsion : il encode la densité d''énergie, la pression et les flux d''énergie-impulsion de la matière.', 1),
('10000000-0000-0000-0000-000000000002', 'passionate',
  'Que sont les ondes gravitationnelles ?',
  '["Des ondes électromagnétiques émises par des trous noirs", "Des ondulations de l''espace-temps se propageant à la vitesse de la lumière", "Des vibrations du champ de Higgs", "Des ondes sonores dans le plasma cosmique"]', 1,
  'Les ondes gravitationnelles sont des déformations propagatives de l''espace-temps, prédites par Einstein en 1916 et détectées par LIGO en 2015.', 2),
('10000000-0000-0000-0000-000000000002', 'passionate',
  'Quelle est l''expérience qui confirma la relativité générale en 1919 ?',
  '["La détection du redshift gravitationnel", "La déviation de la lumière par le Soleil lors d''une éclipse", "La mesure du périhélie de Mercure", "La détection d''ondes gravitationnelles"]', 1,
  'Eddington mesura la déviation angulaire de la lumière d''étoiles rasant le Soleil lors de l''éclipse totale du 29 mai 1919, confirmant la prédiction d''Einstein.', 3),

-- ── Relativité Générale — Étudiant ──────────────────────────
('10000000-0000-0000-0000-000000000002', 'student',
  'Quelle est la relation entre le tenseur de Ricci et le tenseur de Riemann ?',
  '["R_μν = R^ρ_μρν (contraction sur le 1er et 3e indices)", "R_μν = g^ρσ R_ρμσν", "R_μν = ∂_ρΓ^ρ_μν - ∂_νΓ^ρ_μρ + ...", "Toutes ces réponses sont correctes"]', 3,
  'Le tenseur de Ricci est la contraction R_μν = R^ρ_μρν du tenseur de Riemann, ce qui revient aussi à la formule explicite avec les symboles de Christoffel.', 1),
('10000000-0000-0000-0000-000000000002', 'student',
  'Que prédit la solution de Schwarzschild pour r < r_s ?',
  '["L''espace-temps est plat", "Les rôles du temps et de r sont échangés : r devient temporel", "La courbure est nulle", "La constante cosmologique domine"]', 1,
  'Pour r < r_s, le coefficient (1 - r_s/r) change de signe : la coordonnée r devient de genre temps et t de genre espace, ce qui rend tout mouvement vers r = 0 inévitable.', 2),
('10000000-0000-0000-0000-000000000002', 'student',
  'Quelle identité garantit la conservation de l''énergie-impulsion dans la RG ?',
  '["L''identité de Bianchi contractée : ∇_μG^μν = 0", "Le théorème de Noether pour la translation temporelle", "La symétrie de Killing du vecteur ∂_t", "L''équation de continuité ∂_μT^μν = 0"]', 0,
  'L''identité de Bianchi contractée ∇_μG^μν = 0 garantit que le membre gauche des équations d''Einstein est automatiquement conservé, ce qui impose ∇_μT^μν = 0.', 3),

-- ── Lois de Kepler — Passionné ───────────────────────────────
('10000000-0000-0000-0000-000000000003', 'passionate',
  'La 2ème loi de Kepler (aires égales) est une conséquence de quel principe ?',
  '["La conservation de l''énergie", "La conservation du moment cinétique", "La loi de gravitation de Newton", "Le principe d''inertie"]', 1,
  'La loi des aires découle directement de la conservation du moment cinétique L = r × p, qui est constante pour toute force centrale (dont la gravitation).', 1),
('10000000-0000-0000-0000-000000000003', 'passionate',
  'Pour une orbite elliptique, l''énergie mécanique totale E = -GMm/(2a). Que se passe-t-il si E = 0 ?',
  '["L''orbite est circulaire", "L''orbite est une ellipse très allongée", "L''orbite est une parabole (vitesse de libération)", "L''objet est capturé définitivement"]', 2,
  'E = 0 correspond à une trajectoire parabolique, soit exactement la vitesse de libération. L''objet s''échappe à l''infini avec une vitesse finale nulle.', 2),
('10000000-0000-0000-0000-000000000003', 'passionate',
  'Jupiter orbite à 5,2 UA du Soleil. Quelle est sa période orbitale approximative ?',
  '["5,2 ans", "11,9 ans", "27 ans", "84 ans"]', 1,
  'Par T² = a³ : T² = (5,2)³ ≈ 140,6, donc T ≈ 11,9 ans. Jupiter fait le tour du Soleil en ~12 ans.', 3),

-- ── Lois de Kepler — Étudiant ────────────────────────────────
('10000000-0000-0000-0000-000000000003', 'student',
  'L''équation de Binet d²u/dθ² + u = GM/h² décrit les orbites. Que représente u ?',
  '["La vitesse angulaire", "L''inverse du rayon : u = 1/r", "L''énergie cinétique orbitale", "Le module du moment cinétique"]', 1,
  'u = 1/r est l''inverse du rayon orbital. Cette substitution transforme l''équation du mouvement radial en une équation différentielle linéaire à coefficients constants.', 1),
('10000000-0000-0000-0000-000000000003', 'student',
  'Quel type de conic section correspond à une énergie E > 0 ?',
  '["Ellipse (E < 0)", "Parabole (E = 0)", "Hyperbole (E > 0)", "Cercle (E = -GMm/2r)"]', 2,
  'L''énergie totale détermine la trajectoire : E < 0 → ellipse, E = 0 → parabole, E > 0 → hyperbole. Les comètes non liées suivent des hyperboles.', 2),
('10000000-0000-0000-0000-000000000003', 'student',
  'La précession du périhélie de Mercure (43"/siècle) ne peut pas être expliquée par Newton seul. Quelle correction l''explique ?',
  '["L''influence de Jupiter sur l''orbite", "La pression de radiation solaire", "Les corrections de la relativité générale au potentiel newtonien", "Le vent solaire"]', 2,
  'La RG ajoute un terme correctif −GML²/(m²c²r³) au potentiel effectif, causant une précession de l''orbite. Ce fut l''une des premières confirmations de la relativité générale.', 3),

-- ── Naissance d''un Trou Noir — Passionné ────────────────────
('10000000-0000-0000-0000-000000000005', 'passionate',
  'La limite de Chandrasekhar (~1,4 M☉) s''applique à quels objets ?',
  '["Les étoiles à neutrons", "Les naines blanches", "Les trous noirs", "Les géantes rouges"]', 1,
  'La limite de Chandrasekhar est la masse maximale d''une naine blanche soutenue par la pression de dégénérescence électronique. Au-delà, elle s''effondre en étoile à neutrons ou trou noir.', 1),
('10000000-0000-0000-0000-000000000005', 'passionate',
  'Qu''est-ce que la limite TOV (~3 M☉) ?',
  '["La masse maximale d''une naine blanche", "La masse maximale d''une étoile à neutrons avant effondrement en trou noir", "La masse minimale pour former un trou noir supermassif", "La masse du Soleil en unités de Planck"]', 1,
  'La limite TOV (Tolman-Oppenheimer-Volkoff) est la masse maximale d''une étoile à neutrons soutenue par la pression de dégénérescence neutronique, au-delà de laquelle elle s''effondre en trou noir.', 2),
('10000000-0000-0000-0000-000000000005', 'passionate',
  'Comment classe-t-on les trous noirs par masse ?',
  '["Blancs (< 1 M☉), gris (1-100 M☉), noirs (> 100 M☉)", "Stellaires (3-100 M☉), intermédiaires (100-10⁵ M☉), supermassifs (10⁶-10¹⁰ M☉)", "Froids, chauds, et en fusion", "Rotatifs et non-rotatifs uniquement"]', 1,
  'On distingue les trous noirs stellaires (issus d''étoiles), les intermédiaires (détectés dans certains amas globulaires), et les supermassifs (au cœur des galaxies).', 3),

-- ── Naissance d''un Trou Noir — Étudiant ─────────────────────
('10000000-0000-0000-0000-000000000005', 'student',
  'La température de Hawking T_H = ℏc³/(8πGMk_B). Pour un trou noir de 10 M☉, T_H est environ ?',
  '["~6 × 10⁻⁹ K (quasi nul)", "~3000 K (comme une étoile froide)", "~10⁶ K (comme une couronne solaire)", "~10¹² K (comme le Big Bang)"]', 0,
  'T_H ≈ 6 nK pour 10 M☉. Le rayonnement de Hawking est fantastiquement faible pour les trous noirs astrophysiques — inférieur au fond diffus cosmologique (2,7 K).', 1),
('10000000-0000-0000-0000-000000000005', 'student',
  'L''entropie de Bekenstein-Hawking S = k_B·A/(4l_P²) est proportionnelle à quoi ?',
  '["Au volume du trou noir", "À la masse du trou noir", "À l''aire de l''horizon des événements", "Au rayon au carré, divisé par la masse"]', 2,
  'S_BH est proportionnelle à l''aire de l''horizon A = 4πr_s², pas au volume. C''est le principe holographique : l''information est encodée sur la surface, pas dans le volume.', 2),
('10000000-0000-0000-0000-000000000005', 'student',
  'Quel est le paradoxe de l''information et pourquoi est-il important ?',
  '["On ne peut pas calculer les orbites autour d''un trou noir", "Si un trou noir s''évapore entièrement, les informations quantiques des objets tombés semblent perdues — violant la mécanique quantique unitaire", "La masse d''un trou noir ne peut pas être mesurée", "Les équations d''Einstein ne peuvent pas décrire les trous noirs en rotation"]', 1,
  'L''unitarité de la MQ exige que l''information soit conservée. Si elle est perdue dans l''évaporation de Hawking, cela contredit la MQ. Ce problème ouvert est au cœur de la physique théorique actuelle.', 3),

-- ── Gravitation Universelle — Curieux ───────────────────────
('10000000-0000-0000-0000-000000000004', 'curious',
  'Selon la loi de Newton, que se passe-t-il si la distance entre deux objets double ?',
  '["La force double", "La force est divisée par 2", "La force est divisée par 4", "La force reste la même"]', 2,
  'La gravité est en 1/r². Si r double, la force est divisée par 2² = 4. C''est la loi du carré inverse.', 1),
('10000000-0000-0000-0000-000000000004', 'curious',
  'Quelle est la valeur approximative de l''accélération gravitationnelle à la surface de la Terre ?',
  '["1 m/s²", "9,8 m/s²", "100 m/s²", "0,1 m/s²"]', 1,
  'g ≈ 9,8 m/s² à la surface de la Terre. C''est l''accélération d''un objet en chute libre (en négligeant la résistance de l''air).', 2),
('10000000-0000-0000-0000-000000000004', 'curious',
  'Pourquoi la Lune ne « tombe »-t-elle pas sur la Terre malgré la gravité ?',
  '["Elle est trop loin pour être attirée", "Elle tombe en permanence mais avance assez vite pour rater la Terre", "La gravité n''agit pas dans l''espace", "Elle est repoussée par le Soleil"]', 1,
  'La Lune est en orbite : elle tombe vers la Terre mais se déplace latéralement assez vite pour que la courbure de sa trajectoire suive la courbure de la Terre. Newton fut le premier à comprendre ça.', 3),

-- ── Gravitation Universelle — Passionné ─────────────────────
('10000000-0000-0000-0000-000000000004', 'passionate',
  'Le potentiel gravitationnel V = -GM/r est négatif. Que signifie cette convention ?',
  '["La gravité est répulsive", "V = 0 à l''infini ; un objet lié a une énergie négative par rapport à l''infini", "Le potentiel est une quantité sans signification physique", "La constante G est négative"]', 1,
  'La convention V = 0 à l''infini est choisie par commodité. Un objet lié à un corps massif a V < 0, indiquant qu''il faut fournir de l''énergie pour l''en extraire.', 1),
('10000000-0000-0000-0000-000000000004', 'passionate',
  'La vitesse de libération de la Terre est ~11,2 km/s. Que faut-il pour l''atteindre ?',
  '["Maintenir cette vitesse indéfiniment", "Atteindre cette vitesse initiale ; ensuite la gravité ne peut plus vous retenir", "Voyager à cette vitesse en ligne droite perpendiculaire à la Terre", "Cette vitesse est théorique et ne peut être atteinte"]', 1,
  'La vitesse de libération est la vitesse initiale nécessaire pour s''échapper à l''infini sans propulsion supplémentaire. Une fois lancé à 11,2 km/s, vous pouvez couper les moteurs.', 2),
('10000000-0000-0000-0000-000000000004', 'passionate',
  'Pourquoi les marées océaniques existent-elles ?',
  '["La rotation de la Terre crée une force centrifuge", "La force gravitationnelle de la Lune est légèrement différente d''un côté de la Terre à l''autre (forces de marée)", "Le Soleil chauffe les océans inégalement", "Les vents planétaires poussent l''eau"]', 1,
  'Les forces de marée résultent du gradient de la gravité lunaire : la face proche est plus attirée que le centre, et le centre plus que la face opposée, créant deux bosses d''eau.', 3),

-- ── Gravitation Universelle — Étudiant ──────────────────────
('10000000-0000-0000-0000-000000000004', 'student',
  'L''équation de Poisson ∇²V = 4πGρ relie le potentiel gravitationnel à la densité de masse. Dans le vide, elle devient ?',
  '["∇²V = 4πG", "∇²V = 0 (équation de Laplace)", "∇²V = -4πGρ", "∇V = Gρ"]', 1,
  'Dans le vide (ρ = 0), l''équation de Poisson se réduit à l''équation de Laplace ∇²V = 0. Le potentiel gravitationnel est une fonction harmonique dans les régions sans masse.', 1),
('10000000-0000-0000-0000-000000000004', 'student',
  'Le théorème de Birkhoff stipule que pour une distribution sphérique de masse, le potentiel extérieur est identique à celui d''une masse ponctuelle. Quelle est son implication pour une coquille sphérique creuse ?',
  '["Le potentiel à l''intérieur est en 1/r", "Le potentiel à l''intérieur est constant (pas de force gravitationnelle)", "Le champ est plus fort à l''intérieur", "La coquille repousse les objets à l''intérieur"]', 1,
  'Par le théorème de Birkhoff, une coquille sphérique n''exerce aucune force nette sur un objet à l''intérieur. Le potentiel y est constant égal à -GM/R (R = rayon de la coquille).', 2),
('10000000-0000-0000-0000-000000000004', 'student',
  'Le développement multipolaire du potentiel gravitationnel commence par le terme monopolaire -GM/r. Le terme suivant est le terme quadrupolaire. Que décrit-il ?',
  '["La distribution de charge électrique", "L''aplatissement ou l''élongation de la distribution de masse (ex : planète aplatie)", "La rotation de l''objet massif", "La constante cosmologique"]', 1,
  'Le terme quadrupolaire, proportionnel à J₂ pour une planète, encode l''aplatissement aux pôles. Il cause la précession des orbites des satellites artificiels et est mesuré précisément par la géodésie spatiale.', 3),

-- ── Horizon des Événements — Curieux ────────────────────────
('10000000-0000-0000-0000-000000000006', 'curious',
  'Qu''est-ce que l''horizon des événements d''un trou noir ?',
  '["La surface visible du trou noir", "La frontière au-delà de laquelle rien ne peut s''échapper, même la lumière", "L''anneau de matière chaude autour du trou noir", "La zone où les étoiles sont détruites par les marées"]', 1,
  'L''horizon des événements est la frontière de non-retour : la vitesse de libération y est égale à c. Tout ce qui entre ne peut plus jamais sortir.', 1),
('10000000-0000-0000-0000-000000000006', 'curious',
  'Pourquoi un observateur lointain ne voit-il jamais quelqu''un franchir l''horizon des événements ?',
  '["L''horizon est trop petit pour être visible", "Le temps se dilate infiniment à l''approche de l''horizon : l''astronaute semble se figer", "L''astronaute est immédiatement détruit à l''horizon", "La lumière est absorbée avant d''atteindre l''observateur"]', 1,
  'La dilatation temporelle gravitationnelle diverge à l''horizon. Pour l''observateur distant, le temps de l''astronaute ralentit jusqu''à s''arrêter, et la lumière émise est décalée vers le rouge jusqu''à disparaître.', 2),
('10000000-0000-0000-0000-000000000006', 'curious',
  'Qu''est-ce que le disque d''accrétion d''un trou noir ?',
  '["Un anneau de planètes capturées", "De la matière chaude en spirale autour du trou noir qui émet beaucoup de lumière", "L''ombre visible du trou noir", "Les restes d''étoiles explosées"]', 1,
  'Le disque d''accrétion est de la matière (gaz, poussière, étoiles déchiquetées) en orbite spirale autour du trou noir. En tombant, cette matière s''échauffe à des millions de degrés et émet des rayons X.', 3),

-- ── Horizon des Événements — Passionné ──────────────────────
('10000000-0000-0000-0000-000000000006', 'passionate',
  'Dans la métrique de Schwarzschild, que se passe-t-il aux composantes g_tt et g_rr en r = r_s ?',
  '["Les deux composantes divergent", "g_tt → 0 et g_rr → ∞ (singularité de coordonnées)", "La métrique devient euclidienne", "Le tenseur de Riemann diverge"]', 1,
  'En r = r_s, g_tt = (1 - r_s/r) → 0 et g_rr = 1/(1 - r_s/r) → ∞. C''est une singularité de coordonnées (comme le pôle Nord en coordonnées sphériques), pas une singularité physique.', 1),
('10000000-0000-0000-0000-000000000006', 'passionate',
  'Le redshift gravitationnel d''un photon émis près de l''horizon est décrit par z + 1 = √(g_tt,∞ / g_tt,r). Que vaut z quand r → r_s ?',
  '["z → 0 (pas de redshift)", "z → 1 (doublement de longueur d''onde)", "z → ∞ (décalage infini, photon non reçu)", "z → -1 (blueshift)"]', 2,
  'À l''approche de l''horizon, g_tt → 0, donc z + 1 → ∞ et z → ∞. Les photons sont infiniment décalés vers le rouge et leur fréquence tend vers 0 : l''objet devient invisible.', 2),
('10000000-0000-0000-0000-000000000006', 'passionate',
  'Quelle est la particularité de la photosphère d''un trou noir (r = 3/2 · r_s) ?',
  '["C''est la surface physique du trou noir", "Les photons peuvent orbiter en cercle à cette distance", "C''est la zone de génération du rayonnement de Hawking", "C''est là où la matière est déchiquetée par les forces de marée"]', 1,
  'À r = 1,5 r_s (photosphère ou sphère de photons), les photons peuvent orbiter en cercle. Ces orbites sont instables : la moindre perturbation les fait soit s''échapper, soit plonger dans le trou noir.', 3),

-- ── Horizon des Événements — Étudiant ───────────────────────
('10000000-0000-0000-0000-000000000006', 'student',
  'Dans les coordonnées de Kruskal-Szekeres, comment est représenté l''horizon des événements futur ?',
  '["Une hyperbole T² - X² = 1", "Les droites T = ±X (avec X > 0 ou X < 0)", "La ligne T = 0", "Un cercle de rayon r_s dans le plan (T, X)"]', 1,
  'Dans le diagramme de Kruskal, l''horizon des événements futur est la droite T = X (avec X > 0), et l''horizon passé est T = -X. Ces droites à 45° sont des géodésiques de genre lumière.', 1),
('10000000-0000-0000-0000-000000000006', 'student',
  'Le théorème de l''aire de Hawking stipule dA_h/dτ ≥ 0 en relativité générale classique. Quelle analogie thermodynamique cela évoque-t-il ?',
  '["La conservation de l''énergie (1er principe)", "La loi de croissance de l''entropie (2e principe)", "L''équilibre thermique (0e principe)", "L''impossibilité du mouvement perpétuel de 3e espèce"]', 1,
  'La non-décroissance de l''aire est l''analogue du 2e principe : l''entropie de Bekenstein S_BH ∝ A ne peut que croître en relativité générale classique, exactement comme l''entropie thermodynamique.', 2),
('10000000-0000-0000-0000-000000000006', 'student',
  'Pour un trou noir de Kerr (en rotation), comment l''horizon externe diffère-t-il de Schwarzschild ?',
  '["r_+ = r_s (identique à Schwarzschild)", "r_+ = GM/c² + √((GM/c²)² - a²) < r_s, avec a = J/(Mc) le paramètre de spin", "r_+ dépend de la charge électrique, pas du spin", "Il n''y a pas d''horizon pour les trous noirs en rotation"]', 1,
  'Pour le trou noir de Kerr, l''horizon externe r_+ = GM/c² + √((GM/c²)² - a²) est plus petit que r_s. L''ergosphère (r_erg > r_+) est une région où rien ne peut rester stationnaire par rapport aux étoiles lointaines.', 3);
