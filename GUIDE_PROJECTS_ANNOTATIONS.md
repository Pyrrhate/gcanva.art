# 🎨 GUIDE: Pages de Projets avec Annotations

## ✨ Ce qui a changé

Avant : Clic sur un projet = modal simple avec images  
**Après : Clic sur un projet = page complète avec annotations !**

---

## 🎯 Nouvelle structure

### Chaque projet a maintenant :

```tsx
{
  id: 'project-1',
  title: 'Titre du projet',
  category: 'Catégorie',
  year: 2024,
  description: 'Courte description',
  fullDescription: 'Description longue affichée sur la page détail',
  
  images: [
    {
      url: '/images/project-1/image1.jpg',
      caption: 'Titre de l\'image',
      annotation: 'Description/contexte de l\'image'
    },
    // ... plus d'images
  ],
  
  link: 'https://...' // optionnel
}
```

---

## 📝 Modifier vos projets

Ouvrez `src/data/projects.ts` et modifiez :

### Exemple complet :

```tsx
export const projects: Project[] = [
  {
    id: 'mon-projet',
    title: 'Mon Projet Artistique',
    category: 'Photographie',
    year: 2024,
    description: 'Courte présentation pour la grille',
    fullDescription: 'Ici vous pouvez écrire une description plus longue et détaillée qui s\'affichera en haut de la page du projet.',
    
    images: [
      {
        url: '/images/mon-projet/photo1.jpg',
        caption: 'Coucher de soleil urbain',
        annotation: 'Prise en fin d\'après-midi, explorant l\'intersection entre architecture et nature.'
      },
      {
        url: '/images/mon-projet/photo2.jpg',
        caption: 'Détail architectural',
        annotation: 'Zoom sur les textures et patterns créés par l\'usure du temps.'
      },
      {
        url: '/images/mon-projet/photo3.jpg',
        caption: 'Vue d\'ensemble',
        annotation: 'Composition montrant l\'harmonie entre les éléments urbains.'
      },
    ],
    
    link: 'https://instagram.com/...' // optionnel
  },
];
```

---

## 🎨 Structure des images

```
public/
└── images/
    └── mon-projet/
        ├── photo1.jpg
        ├── photo2.jpg
        └── photo3.jpg
```

Référencez-les dans le code :
```tsx
url: '/images/mon-projet/photo1.jpg'
```

---

## 📄 Pages de projets

Quand on clique sur un projet :

### À l'écran :
1. **Navbar avec "← BACK"** - Pour revenir à la grille
2. **Titre & Description** - fullDescription s'affiche ici
3. **Galerie scrollable** :
   - Toutes les images, une après l'autre
   - **Caption** (titre de l'image) en gras
   - **Annotation** (description détaillée) en dessous
   - Compteur "Image X of Y"
4. **Navigation** :
   - Flèches ← →
   - Dots indicators (cliquez pour aller à une image)
   - Click sur l'image pour naviguer

---

## 🎯 Comment ça marche

### Grid principale (page d'accueil)
- Affiche la thumbnail (première image)
- Titre, catégorie, année
- Hover effect "VIEW"

### Page détail (au clic)
- Page fullscreen avec navbar
- Toutes les images affichées en scroll
- Caption et annotation pour chaque image
- Navigation entre images via flèches ou dots
- Bouton "BACK" pour revenir

---

## 📝 Champs obligatoires vs optionnels

| Champ | Obligatoire | Notes |
|-------|------------|-------|
| `id` | ✅ Oui | Unique identifier |
| `title` | ✅ Oui | Nom du projet |
| `category` | ✅ Oui | Genre/domaine |
| `year` | ✅ Oui | Année de création |
| `description` | ✅ Oui | Courte (grille) |
| `fullDescription` | ❌ Non | Longue (détail) |
| `images` | ✅ Oui | Array min 1 |
| `link` | ❌ Non | Lien externe |
| `images[].url` | ✅ Oui | Chemin image |
| `images[].caption` | ✅ Oui | Titre image |
| `images[].annotation` | ❌ Non | Description |

---

## 💡 Conseils

### Descriptions courtes
```tsx
caption: 'Interface Design'  // 2-3 mots
annotation: 'Étude des patterns UI et UX dans les systèmes legacy.'
```

### Images cohérentes
- Gardez un ratio d'aspect similaire
- Optimisez les fichiers (< 2MB chacun)
- JPG pour les photos, PNG pour les illustrations

### Organisation
- 1 dossier par projet dans `public/images/`
- Images nommées simplement : `image1.jpg`, `image2.jpg`
- Pas de caractères spéciaux

---

## 🚀 Exemple minimal

Voici le minimum requis :

```tsx
export const projects: Project[] = [
  {
    id: 'p1',
    title: 'Mon Projet',
    category: 'Art',
    year: 2024,
    description: 'Description courte',
    images: [
      {
        url: '/images/p1/img1.jpg',
        caption: 'Image 1',
      },
      {
        url: '/images/p1/img2.jpg',
        caption: 'Image 2',
      },
    ],
  },
];
```

---

## 🎓 Types TypeScript

```tsx
export interface ImageWithAnnotation {
  url: string;           // Chemin de l'image
  caption: string;       // Titre
  annotation?: string;   // Description (optionnel)
}

export interface Project {
  id: string;
  title: string;
  category: string;
  year: number;
  description: string;
  fullDescription?: string;
  images: ImageWithAnnotation[];
  link?: string;
}
```

---

## 📱 Responsive

Automatiquement responsive sur :
- ✅ Mobile (stack vertical)
- ✅ Tablet (1-2 colonnes grille)
- ✅ Desktop (3 colonnes grille, grand écran détail)

---

## ✅ Checklist

- [ ] Modifier `src/data/projects.ts` avec vos projets
- [ ] Créer dossiers dans `public/images/`
- [ ] Ajouter vos images
- [ ] Ajouter captions aux images
- [ ] Ajouter annotations (optionnel mais recommandé)
- [ ] Ajouter fullDescription (optionnel)
- [ ] Tester localement : `npm run dev`
- [ ] Vérifier les liens avec clic
- [ ] Tester sur mobile

---

## 🔗 Fichiers clés

- `src/data/projects.ts` - Vos données (À MODIFIER)
- `src/components/Projects.tsx` - Grille des projets
- `src/components/ProjectDetail.tsx` - Page détail (Ne pas modifier)
- `src/App.tsx` - Routage principal (Ne pas modifier)

---

Bon travail ! 🎨
