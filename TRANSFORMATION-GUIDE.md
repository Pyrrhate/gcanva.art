# 🎨 Guide de Transformation - Thème Obsidian Industrial

## ✅ Modifications Effectuées

### 1. **Thème Obsidian Industrial**
- Fond sombre : `#0a0a0a`
- Accent principal : `#ff5722` (Orange/Amber)
- Accent secondaire : `#ffca28` (Gold)
- Effets de glow et bordures lumineuses
- Animations fade-up et pulse

### 2. **Composants Refondus**

#### HeroSection
- Design industriel avec effet glow sur l'image de profil
- Badge avec animation pulse
- Boutons avec effets de survol avancés
- Statistiques tech en bas

#### StackSection (Maintenant dynamique ✅)
- Accepte les données via props
- Cartes avec effets glow et hover
- Icônes configurables
- Tailles de cartes ajustables (Bento Grid)

#### GallerySection (Maintenant dynamique ✅)
- Accepte les images depuis Sanity
- Effets de zoom sur les images
- Overlay gradient industriel
- Badges de catégorie avec animations

#### FooterSection
- Style industriel avec lignes décoratives
- Effets glow sur les icônes sociales
- Signature technique en bas

### 3. **Nouveau Schéma Sanity : `homepage`**

Un nouveau schéma a été créé pour gérer toutes les données de la page d'accueil de manière dynamique.

## 🚀 Comment Utiliser

### Étape 1 : Redémarrer Sanity Studio

1. Ouvre un terminal dans le dossier racine du projet
2. Lance le Studio Sanity :
   ```bash
   npm run dev
   ```

3. Le Studio devrait maintenant afficher le nouveau document **"Page d'Accueil"**

### Étape 2 : Créer ton Contenu dans Sanity

1. Dans le Studio, clique sur **"Page d'Accueil"**
2. Remplis les champs :

   **Hero Section :**
   - Titre Hero
   - Sous-titre Hero
   - Image de profil (optionnel)

   **Stack Section :**
   - Ajoute tes technologies (bouton "+ Ajouter")
   - Pour chaque technologie :
     - Nom
     - Description
     - Icône (choix dans la liste)
     - Taille de carte (Petite, Moyenne, Grande)
     - Couleur d'accent

   **Gallery Section :**
   - Ajoute tes projets (bouton "+ Ajouter")
   - Pour chaque projet :
     - Nom du projet
     - Catégorie
     - Image (upload)
     - URL (optionnel)
     - Taille de carte

3. Clique sur **"Publish"** pour publier tes modifications

### Étape 3 : Vérifier le Front-End

1. Ouvre un nouveau terminal dans le dossier `web/`
2. Lance le serveur Next.js :
   ```bash
   cd web
   npm run dev
   ```

3. Ouvre ton navigateur sur `http://localhost:3000`
4. Tu devrais voir ton nouveau design avec tes données !

## 🎨 Icônes Disponibles pour la Stack

- `code` : Icône de code
- `palette` : Icône de palette
- `git` : Icône Git/branche
- `globe` : Icône globe/monde
- `file` : Icône fichier/document
- `wrench` : Icône clé/outil

## 📐 Tailles de Cartes

### Stack Section
- **Petite** : `col-span-1` (1 colonne)
- **Moyenne** : `col-span-2` (2 colonnes)
- **Grande** : `col-span-2 row-span-2` (2 colonnes × 2 lignes)

### Gallery Section
- **Normal** : `md:col-span-1` (1 colonne)
- **Large** : `md:col-span-2` (2 colonnes)
- **Extra Large** : `md:col-span-2 md:row-span-2` (2 colonnes × 2 lignes)

## 🎯 Structure des Fichiers Modifiés

```
web/
├── src/
│   ├── app/
│   │   ├── globals.css          ✅ Thème Obsidian + Animations
│   │   └── page.tsx             ✅ Récupération des données
│   └── components/
│       ├── HomeDesign.tsx       ✅ Distribution des props
│       ├── HeroSection.tsx      ✅ Style industriel
│       ├── StackSection.tsx     ✅ Dynamique avec props
│       ├── GallerySection.tsx   ✅ Dynamique avec images Sanity
│       └── FooterSection.tsx    ✅ Style industriel

schemas/
└── documents/
    └── homepage.ts              ✅ Nouveau schéma
```

## ⚠️ Important

- **Aucun contenu n'est codé en dur** : Tout passe par les props
- **Images Sanity** : Les images utilisent `urlFor()` pour l'optimisation
- **Types TypeScript** : Tous les interfaces sont à jour
- **Lien préservé** : La chaîne `page.tsx → HomeDesign.tsx → Composants` fonctionne parfaitement

## 🔥 Exemple de Données de Test

Si tu veux tester rapidement, voici des exemples de données :

### Stack Items (Technologies)
1. **React / Next.js** - Large card
   - Description : "Lightning-fast rendering with server components"
   - Icon : `code`
2. **Tailwind CSS** - Small card
   - Description : "Utility-first design system"
   - Icon : `palette`
3. **Sanity CMS** - Medium card
   - Description : "Real-time content platform"
   - Icon : `file`

### Gallery Projects
1. **Mon Portfolio**
   - Catégorie : "Personal Site"
   - Taille : Extra Large
2. **E-commerce App**
   - Catégorie : "Web Application"
   - Taille : Normal

## 🎉 Résultat Final

Tu as maintenant un portfolio avec :
- ✅ Design industriel/tech moderne
- ✅ Thème Obsidian (#0a0a0a background, #ff5722 accent)
- ✅ Animations et effets glow
- ✅ Gestion 100% via Sanity CMS
- ✅ Aucun contenu en dur
- ✅ Types TypeScript corrects

Profite bien de ton nouveau design ! 🚀
