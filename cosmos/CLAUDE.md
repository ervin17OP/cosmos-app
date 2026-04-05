# COSMOS — Carnet de bord Agent (CLAUDE.md)

> Document de reprise pour toute IA ou développeur reprenant ce projet.
> Dernière mise à jour : 2026-04-05

---

## 1. Vision du projet

Application mobile éducative sur l'astronomie et l'astrophysique.
Concept : **Duolingo meets Kurzgesagt** — contenu adaptatif selon le niveau de l'utilisateur (Curieux / Passionné / Étudiant).

**Répertoire du projet :** `c:/laragon/www/cosmos-app/cosmos/`
**Maquettes Stitch (HTML) :** `c:/laragon/www/cosmos-app/stitch_cosmos_astronomy_app/stitch_cosmos_astronomy_app/`

---

## 2. Stack technique (versions réelles installées)

| Outil | Version installée | Note |
|---|---|---|
| Expo SDK | **54** (non 52 comme spécifié) | Managed workflow |
| Expo Router | **v4** (non v3) | File-based navigation |
| React Native | 0.81.5 | |
| React | 19.1.0 | |
| TypeScript | ~5.9.2 | strict mode |
| NativeWind | 4.2.3 | Tailwind v3 |
| Tailwind CSS | 3.4.19 | |
| Reanimated | **4.3.0** (non 3.x) | |
| Supabase JS | 2.101.1 | |
| AsyncStorage | 3.0.2 | |
| expo-linear-gradient | 55.0.11 | |

**Fonts (via @expo-google-fonts) :**
- `SpaceGrotesk` (400, 500, 600, 700) — utilisé comme fonte principale UI à la place de DM Sans
- `Manrope` (300, 400, 500, 600) — corps de texte léger
- `Cinzel` (400, 600) — titres display
- `SpaceMono` (400) — formules mathématiques

> **Attention :** Le prompt original demandait DM Sans, mais SpaceGrotesk + Manrope ont été utilisés à la place. Ne pas changer sans décision explicite.

---

## 3. Design system

### Couleurs — `constants/colors.ts`
> **RÈGLE ABSOLUE : toujours importer depuis `Colors` de `constants/colors.ts`. Jamais de valeur hex en dur.**

| Token | Valeur | Usage |
|---|---|---|
| `Colors.background` | `#0f0d18` | Fond principal (spec originale : #03020a) |
| `Colors.primary` | `#c799ff` | Violet Nébuleuse — accent principal |
| `Colors.secondary` | `#26fedc` | Cyan Pulsar — éléments interactifs |
| `Colors.tertiary` | `#ffdb8f` | Or Stellaire — highlights, formules |
| `Colors.onSurface` | `#e9e3f5` | Texte principal |
| `Colors.onSurfaceVariant` | `#aea8b9` | Texte secondaire / muted |
| `Colors.glass` | `rgba(255,255,255,0.04)` | Cards glassmorphism |
| `Colors.glassBorder` | `rgba(255,255,255,0.07)` | Bordures |
| `Colors.glassBorderFocus` | `rgba(38,254,220,0.4)` | Focus cyan sur inputs |
| `Colors.error` | `#ff6e84` | Rose erreur / badge niveau avancé |

### Typographie — `constants/typography.ts`
Importée via `Typography.fontFamily.XXX` et `Typography.fontSize.XXX`.

### Important : StyleSheet vs NativeWind
Le prompt original demandait **NativeWind uniquement** (pas de `StyleSheet.create`).
En pratique, **tous les écrans utilisent `StyleSheet.create`**. NativeWind est installé mais non utilisé dans les composants actuels.
Decision à prendre avant Phase 2 : migrer vers NativeWind ou continuer avec StyleSheet.

---

## 4. Structure des fichiers

```
cosmos/
├── app/
│   ├── _layout.tsx           ← Root layout : fonts, auth guard, Stack navigator
│   ├── (auth)/
│   │   ├── _layout.tsx
│   │   ├── login.tsx         ← Login email/password
│   │   └── register.tsx      ← Register + choix de niveau inline
│   ├── (tabs)/
│   │   ├── _layout.tsx       ← Tab bar avec 4 onglets
│   │   ├── index.tsx         ← Accueil (dashboard) — données HARDCODÉES
│   │   ├── explore.tsx       ← Liste thèmes + modules
│   │   ├── progress.tsx      ← Progression + badges — données HARDCODÉES
│   │   └── profile.tsx       ← Profil — données HARDCODÉES
│   ├── module/
│   │   └── [id].tsx          ← Détail module, contenu depuis Supabase avec fallback démo
│   └── onboarding/
│       ├── index.tsx         ← Splash (logo, étoiles, CTA)
│       └── level.tsx         ← Sélection niveau (3 cartes animées)
├── components/
│   ├── ui/
│   │   ├── StarField.tsx     ← Champ d'étoiles animé (80 étoiles, scintillement loop)
│   │   ├── GlowCard.tsx      ← Card glassmorphism avec halo violet
│   │   └── LevelBadge.tsx    ← Badge coloré Curieux/Passionné/Étudiant
│   ├── home/
│   │   ├── FeaturedModule.tsx ← Carte "Module du jour"
│   │   ├── ThemeChip.tsx     ← Puce thème scroll horizontal
│   │   └── XPBar.tsx         ← Barre XP animée
│   └── module/
│       ├── LevelSelector.tsx ← Tabs Curieux/Passionné/Étudiant
│       ├── FormulaBox.tsx    ← Bloc formule (Space Mono, cyan)
│       └── AnalogyCard.tsx   ← Carte analogie (fond or)
├── constants/
│   ├── colors.ts             ← Source unique des couleurs
│   ├── typography.ts         ← Polices + tailles
│   └── themes.ts             ← Données statiques : THEMES[], MODULES[], LEVEL_CONFIG
├── hooks/
│   ├── useUserLevel.ts       ← Lit/sauvegarde le niveau depuis AsyncStorage + Supabase
│   └── useProgress.ts        ← XP et progression (stub partiel)
├── lib/
│   └── supabase.ts           ← Client Supabase + helpers (getCurrentProfile, addXP, updateUserLevel)
├── types/
│   └── index.ts              ← Tous les types TypeScript : UserLevel, Theme, Module, ContentBlock…
├── supabase/migrations/
│   ├── 001_initial_schema.sql ← Schéma complet (users_profiles, themes, modules, module_content, user_progress)
│   └── 002_seed_data.sql     ← 6 thèmes, 6 modules, contenu complet "Relativité Restreinte" (3 niveaux)
├── .env.example              ← Template variables d'environnement
├── app.json                  ← Config Expo
├── babel.config.js           ← Reanimated plugin inclus
├── tailwind.config.js        ← Config NativeWind
├── global.css                ← Directives Tailwind
└── tsconfig.json             ← TypeScript strict, alias @ → ./
```

---

## 5. État d'avancement — Phase 1 (COMPLÉTÉE)

### Fait
- [x] Setup projet Expo + TypeScript + NativeWind + Expo Router
- [x] Configuration des fonts Google (Cinzel, SpaceGrotesk, Manrope, SpaceMono)
- [x] Design system complet (colors.ts, typography.ts)
- [x] Composant `StarField` — 80 étoiles animées avec scintillement loop
- [x] Composants UI : `GlowCard`, `LevelBadge`
- [x] Composants Home : `XPBar`, `FeaturedModule`, `ThemeChip`
- [x] Composants Module : `LevelSelector`, `FormulaBox`, `AnalogyCard`
- [x] Écran Onboarding Splash — animation entrée + pulse logo
- [x] Écran Sélection Niveau — 3 cartes animées staggerées, sauvegarde AsyncStorage
- [x] Écran Accueil — header, XPBar, thèmes horizontal, featured module, stats
- [x] Écran Explorer — liste thèmes + modules navigables
- [x] Écran Module `[id]` — hero, LevelSelector, blocs contenu depuis Supabase (fallback démo)
- [x] Écran Progress — badge niveau circulaire, stats, barres thèmes, grille badges
- [x] Écran Profil — avatar, options, déconnexion Supabase
- [x] Écran Login — email/password Supabase auth
- [x] Écran Register — email/password/username/niveau + boutons Google & Apple (non fonctionnels)
- [x] Auth Guard dans `_layout.tsx` — redirige vers onboarding si non connecté
- [x] Client Supabase configuré (AsyncStorage session persistante)
- [x] Migrations SQL : schéma complet + seed data (6 thèmes, 6 modules, contenu Relativité Restreinte)
- [x] Types TypeScript stricts (UserProfile, Theme, Module, ContentBlock, etc.)
- [x] Hooks : `useUserLevel`, `useProgress`

---

## 6. Ce qui manque / Phase 2

### Priorité haute
- [ ] **Données réelles dans Home/Profile/Progress** — ces 3 écrans affichent du contenu hardcodé ("Jean-Pierre", "380 XP", stats fixes). Brancher sur Supabase via `getCurrentProfile()` et `useProgress`.
- [ ] **Système de Quiz** — aucun écran quiz n'existe. Le `quiz_teaser` block dans les modules est un bouton sans destination. Créer `app/quiz/[moduleId].tsx` avec questions/réponses, scoring, et attribution XP.
- [ ] **Auth sociale (Google/Apple)** — les boutons existent dans `register.tsx` mais sont des `TouchableOpacity` vides. Implémenter via Supabase OAuth + `expo-auth-session`.
- [ ] **Contenu manquant** — seul "La Relativité Restreinte" a du contenu complet (3 niveaux). Les 5 autres modules ont seulement des métadonnées, pas de `module_content`.

### Priorité moyenne
- [ ] **useProgress hook** — le hook est un stub. Implémenter la lecture/écriture réelle vers `user_progress` Supabase.
- [ ] **Système XP** — `addXP()` existe dans `lib/supabase.ts` mais n'est appelé nulle part. Déclencher après quiz complété.
- [ ] **Streak** — `streak_days` existe en base mais n'est pas géré.
- [ ] **Contenus seed** — ajouter `module_content` pour les 5 autres modules dans `002_seed_data.sql` ou une nouvelle migration.
- [ ] **Navigation tab bar** — vérifier que les icônes et labels de la tab bar sont corrects dans `(tabs)/_layout.tsx`.

### Priorité basse (Phase 3+)
- [ ] **React Native Skia** — simulationsvisuelles (orbites, champs gravitationnels). Pas encore installé.
- [ ] **RevenueCat** — abonnements freemium/premium. Variables .env déjà commentées.
- [ ] **Push notifications** (`expo-notifications`)
- [ ] **Offline support** — mise en cache du contenu
- [ ] **Animations Reanimated 3** — les animations actuelles utilisent `Animated` de React Native core, pas Reanimated. Migrer pour fluidité 60fps garantie.
- [ ] **React Native Skia** — non installé.

---

## 7. Supabase — schéma de base de données

### Tables
| Table | Description |
|---|---|
| `users_profiles` | Profil utilisateur (id, username, level, xp, streak_days) |
| `themes` | Thèmes astronomiques (6 seedés) |
| `modules` | Modules de cours (6 seedés) |
| `module_content` | Contenu JSON par module + niveau (1 seedé : relativite-restreinte) |
| `user_progress` | Progression par utilisateur + module |

### Trigger automatique
Un trigger `on_auth_user_created` crée automatiquement une entrée dans `users_profiles` à chaque inscription Supabase auth. Username et level sont lus depuis `raw_user_meta_data`.

### RLS (Row Level Security)
- `users_profiles`, `user_progress` : SELECT/UPDATE limité à `auth.uid() = id`
- `themes`, `modules`, `module_content` : SELECT public (tous les utilisateurs)

### Variables d'environnement requises
```
EXPO_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```
Copier `.env.example` → `.env.local`

---

## 8. Lancer le projet

```bash
cd c:/laragon/www/cosmos-app/cosmos

# Installer les dépendances (si node_modules manquant)
npm install

# Lancer
npx expo start

# Sur iOS (simulateur ou Expo Go)
npx expo start --ios

# Sur Android
npx expo start --android
```

Scan QR code avec **Expo Go** sur le téléphone, ou utiliser un simulateur iOS/Android.

---

## 9. Conventions de code

- **TypeScript strict** — pas de `any`. Tous les types dans `types/index.ts`.
- **Composants fonctionnels uniquement** — pas de class components.
- **Couleurs depuis `Colors`** — jamais de valeur hex en dur dans les composants.
- **Fonts depuis `Typography`** — jamais de fontFamily string en dur.
- **Commentaires en français** — convention du projet.
- **StyleSheet.create** — utilisé dans tous les fichiers actuels (NativeWind installé mais non utilisé).
- **Un composant par fichier.**

---

## 10. Points d'attention / pièges connus

1. **`STARS` est généré une fois au module level** dans `StarField.tsx` — les positions sont fixes entre renders, ce qui est voulu pour la performance.
2. **`useUserLevel`** lit depuis AsyncStorage en priorité, puis Supabase. Le niveau peut donc être désynchronisé si modifié directement en base. Toujours passer par le hook.
3. **Le module `[id].tsx`** fait un fallback sur `DEMO_CONTENT` si Supabase retourne une erreur ou pas de données — l'app fonctionne sans connexion Supabase configurée.
4. **Les données statiques** dans `constants/themes.ts` (THEMES, MODULES, LEVEL_CONFIG) sont utilisées en fallback dans plusieurs écrans. Elles doivent rester synchronisées avec les UUIDs du seed SQL.
5. **Expo Router v4** — la syntaxe des groupes `(auth)`, `(tabs)` est identique à v3. Mais certaines APIs de navigation ont changé (ex. `useSegments` retourne un tableau de strings).
6. **React Native Reanimated v4** — l'API a changé par rapport à v3 (certains hooks ont été renommés). Vérifier la doc avant d'ajouter des animations Reanimated.
7. **`react-native-url-polyfill/auto`** est importé dans `lib/supabase.ts` — c'est obligatoire pour que Supabase fonctionne sur React Native.
