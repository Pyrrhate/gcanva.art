# 📋 GUIDE: Structure des Projets & Réalisations

## 🎯 Vue d'ensemble
Votre site est maintenant structuré pour supporter facilement des projets/réalisations avec plusieurs images par projet.

---

## 📁 Structure des fichiers

```
src/
├── components/
│   ├── Gallery.tsx          (Composant galerie existant)
│   ├── Hero.tsx             (Section hero existante)
│   ├── Manifesto.tsx        (Section manifesto existante)
│   ├── AreYouHuman.tsx      (🆕 Nouvelle page - Captcha dystopique)
│   └── Projects.tsx         (🆕 Composant projets réutilisable)
├── App.tsx                  (Routage simple modifié)
├── main.tsx
└── index.css
```

---

## 🚀 Comment intégrer Projects.tsx à votre site

### Option 1 : Remplacer Gallery.tsx
Si vous voulez utiliser `Projects.tsx` à la place de votre `Gallery.tsx` existant :

**Dans `App.tsx`, remplacez :**
```tsx
import Gallery from './components/Gallery';
// ...
<Gallery />
```

**Par :**
```tsx
import Projects from './components/Projects';
// ...
<Projects />
```

### Option 2 : Garder les deux
Vous pouvez avoir à la fois `Gallery` et `Projects` :
```tsx
<Gallery />
<Projects />
```

---

## 📝 Comment définir vos propres projets

Dans le fichier `Projects.tsx`, trouvez la section `defaultProjects` et modifiez-la :

```tsx
const defaultProjects: Project[] = [
  {
    id: 'mon-projet',
    title: 'Titre du projet',
    category: 'Catégorie (ex: Digital Art, Photography)',
    year: 2024,
    description: 'Description courte du projet',
    images: [
      '/images/mon-projet/image1.jpg',
      '/images/mon-projet/image2.jpg',
      '/images/mon-projet/image3.jpg',
    ],
    link: 'https://example.com', // optionnel
  },
  // Ajoutez plus de projets ici...
];
```

---

## 🖼️ Organisation des images

### Structure recommandée :
```
public/
└── images/
    ├── mon-projet/
    │   ├── image1.jpg
    │   ├── image2.jpg
    │   └── image3.jpg
    ├── autre-projet/
    │   ├── cover.jpg
    │   ├── detail1.jpg
    │   └── detail2.jpg
    └── [et cetera...]
```

### Chemins d'accès aux images :
Depuis `src/`, vous pouvez référencer les images dans `public/` comme :
```tsx
images: [
  '/images/mon-projet/image1.jpg',
  '/images/mon-projet/image2.jpg',
]
```

---

## 🎨 Interface des projets

### Cards de projet (vue d'accueil)
- Affichage en grille responsive (1 colonne mobile, 2 colonnes tablette, 3 colonnes desktop)
- Chaque carte affiche la première image du projet
- Hover effect avec "VIEW"

### Modal (vue détail)
Quand l'utilisateur clique sur un projet :
- Affichage grand format de la première image
- Navigation par flèches ← → pour voir toutes les images
- Compteur d'images (ex: "3/5")
- Affichage du titre, catégorie, année et description
- Lien optionnel "VIEW PROJECT"

---

## 💾 Exemple complet de projet

```tsx
const defaultProjects: Project[] = [
  {
    id: 'dystopian-art',
    title: 'Dystopian Interfaces',
    category: 'Digital Art',
    year: 2024,
    description: 'Une série explorant l\'esthétique numérique corrompue et le rétro-futurisme. Créé avec une attention particulière aux détails et aux références culturelles.',
    images: [
      '/images/dystopian/interface1.jpg',
      '/images/dystopian/interface2.jpg',
      '/images/dystopian/interface3.jpg',
      '/images/dystopian/interface4.jpg',
    ],
    link: 'https://behance.net/...',
  },
  {
    id: 'urban-decay',
    title: 'Urban Decay Series',
    category: 'Photography',
    year: 2023,
    description: 'Captures de la beauté dans les espaces oubliés. Un projet photographique sur 6 mois explorant les zones abandonnées.',
    images: [
      '/images/urban/decay1.jpg',
      '/images/urban/decay2.jpg',
      '/images/urban/decay3.jpg',
    ],
    link: 'https://instagram.com/...',
  },
];
```

---

## ✨ Personnalisation du composant

### Changer le nombre de colonnes
Dans `Projects.tsx`, trouvez :
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
```

- `grid-cols-1` = 1 colonne sur mobile
- `md:grid-cols-2` = 2 colonnes sur tablette
- `lg:grid-cols-3` = 3 colonnes sur desktop

Vous pouvez changer à `lg:grid-cols-4` si vous voulez 4 colonnes, etc.

### Changer les couleurs
Le composant utilise les classes Tailwind existantes. Modifiez les classes comme :
- `bg-gray-900` → `bg-blue-900`
- `text-gray-400` → `text-blue-400`

---

## 🔗 Routage simple de l'app

Le site utilise un routage simple **sans React Router** :

```tsx
// Dans App.tsx
const [currentPage, setCurrentPage] = useState<PageType>('home');

if (currentPage === 'areyouhuman') {
  return <AreYouHuman />;
}
```

Cette approche est simple mais fonctionne bien pour 1-2 pages supplémentaires.

---

## 📱 Points clés

✅ **Responsive** - Adapté mobile/tablette/desktop  
✅ **Image-heavy** - Optimisé pour showcaser des images  
✅ **Modal intégré** - Pas de redirection, vue fullscreen  
✅ **Navigation intuitive** - Flèches pour naviguer les images  
✅ **Extensible** - Facile d'ajouter plus de projets  

---

## 🚀 Prochaines étapes

1. **Créez la structure des dossiers** d'images dans `public/images/`
2. **Importez vos images** dans ces dossiers
3. **Mettez à jour `defaultProjects`** avec vos vrais projets
4. **Testez** avec `npm run dev`

---

## 💡 Tips

- Les images doivent être en **format web-friendly** (JPG/PNG, < 2MB par image)
- Gardez une **cohérence** dans le ratio d'aspect des images
- Utilisez des **thumbnails** pour les cards (ca charge plus vite)
- N'hésitez pas à créer des **routes séparées** pour chaque projet si besoin

