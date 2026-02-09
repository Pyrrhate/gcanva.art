/* EXEMPLE COMPLET - Appliquez ces modifications étape par étape */

// ============================================
// ÉTAPE 1: Ajouter Projects à votre App.tsx
// ============================================

// En haut du fichier, ajoutez:
import Projects from './components/Projects';

// Puis dans le JSX, ajoutez Projects avant Manifesto ou à la place de Gallery:
<Hero />
<Projects />  {/* ← Ajoutez cette ligne */}
<Manifesto />

// ============================================
// ÉTAPE 2: Créer la structure des images
// ============================================

// Dans votre dossier 'public/', créez:
// public/images/
//   ├── dystopian-interfaces/
//   │   ├── image1.jpg
//   │   ├── image2.jpg
//   │   └── image3.jpg
//   └── urban-decay/
//       ├── image1.jpg
//       └── image2.jpg

// ============================================
// ÉTAPE 3: Remplir src/data/projects.ts
// ============================================

// Exemple simple avec 2 projets:

export const projects = [
  {
    id: 'dystopian-interfaces',
    title: 'Dystopian Interfaces',
    category: 'Digital Art',
    year: 2024,
    description: 'Une série explorant l\'esthétique numérique corrompue. Inspirée par l\'interface que vous venez de voir dans "Are You Human".',
    images: [
      '/images/dystopian-interfaces/image1.jpg',
      '/images/dystopian-interfaces/image2.jpg',
      '/images/dystopian-interfaces/image3.jpg',
    ],
    link: 'https://behance.net/...', // optionnel
  },
  {
    id: 'urban-decay',
    title: 'Urban Decay',
    category: 'Photography',
    year: 2023,
    description: 'Captures de la beauté dans les espaces oubliés de la ville.',
    images: [
      '/images/urban-decay/image1.jpg',
      '/images/urban-decay/image2.jpg',
    ],
  },
];

// ============================================
// ÉTAPE 4 (optionnel): Personnaliser le style
// ============================================

// Dans Projects.tsx, vous pouvez changer les couleurs:

// De:
className="... bg-gray-900 ... text-gray-400 ..."

// À:
className="... bg-blue-900 ... text-blue-400 ..."

// Ou changer le nombre de colonnes:

// De:
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

// À:
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

// ============================================
// VÉRIFIÉ & PRÊT À UTILISER
// ============================================

// ✅ AreYouHuman.tsx - Nouvelle page de captcha
// ✅ Projects.tsx - Composant galerie
// ✅ projects.ts - Données des projets
// ✅ App.tsx - Routage + menu mise à jour
// ✅ DEMARRAGE_RAPIDE.md - Guide rapide
// ✅ GUIDE_PROJETS.md - Documentation complète

