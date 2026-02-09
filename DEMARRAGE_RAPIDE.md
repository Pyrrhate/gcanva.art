# 🚀 DÉMARRAGE RAPIDE

## Ce qui a été fait

✅ **Créé une nouvelle page "Are You Human"** - Un captcha dystopique amusant avec drag-and-drop  
✅ **Créé un composant Projects** - Pour afficher vos projets/réalisations avec galeries d'images  
✅ **Ajouté le menu "ARE YOU HUMAN"** - Accessible depuis la navigation principale  
✅ **Organisé la structure des données** - Facile à modifier  

---

## 📋 Les 5 étapes pour fonctionner

### 1️⃣ Lancez le serveur de développement
```bash
npm run dev
```

### 2️⃣ Testez la nouvelle page "Are You Human"
- Allez dans le menu
- Cliquez sur "ARE YOU HUMAN"
- Testez le drag-and-drop
- L'ordre correct est : WORK → BUY → CONSUME → REPEAT → DIE

### 3️⃣ Préparez vos images
```
public/
└── images/
    ├── mon-projet-1/
    │   ├── image1.jpg
    │   ├── image2.jpg
    │   └── image3.jpg
    └── mon-projet-2/
        ├── image1.jpg
        └── image2.jpg
```

### 4️⃣ Modifiez `src/data/projects.ts`
Remplacez le contenu par vos vrais projets :
```tsx
export const projects = [
  {
    id: 'mon-premier-projet',
    title: 'Titre de mon projet',
    category: 'Photographie',
    year: 2024,
    description: 'Description courte',
    images: [
      '/images/mon-projet-1/image1.jpg',
      '/images/mon-projet-1/image2.jpg',
    ],
  },
  // Ajoutez plus de projets...
];
```

### 5️⃣ Intégrez Projects dans votre site
Dans `src/App.tsx`, ajoutez :
```tsx
import Projects from './components/Projects';

// Dans le JSX (avant Manifesto par exemple):
<Projects />
<Manifesto />
```

---

## 🎨 Fichiers modifiés/créés

- ✨ `src/components/AreYouHuman.tsx` - Nouvelle page
- ✨ `src/components/Projects.tsx` - Galerie de projets
- ✨ `src/data/projects.ts` - Données des projets
- 📝 `src/App.tsx` - Routage + menu mise à jour
- 📖 `GUIDE_PROJETS.md` - Documentation complète

---

## 🔗 Comment ça marche

### Page "Are You Human"
- Éléments draggables avec Drag & Drop HTML5
- Validation de l'ordre correct
- Message ironique quand c'est bon ✓
- Style dystopique grunge avec grille et bruit

### Projects
- Affiche les projets en **grille responsive**
- Click sur un projet = **modal fullscreen**
- Naviguez les images avec **← →**
- Compteur d'images intégré

---

## 💡 Conseils pratiques

📌 **Images** : < 2MB chacune, ratio d'aspect cohérent  
📌 **Projets** : Commencez avec 2-3 pour tester  
📌 **Couleurs** : Modifiez les classes Tailwind dans les composants  
📌 **Layout** : Changez `lg:grid-cols-3` en `lg:grid-cols-4` pour plus de colonnes  

---

## 🚨 Erreurs courantes

❌ Images ne s'affichent pas ?  
→ Vérifiez les chemins dans `projects.ts` (ex: `/images/projet-1/image.jpg`)

❌ Composant Projects ne s'affiche pas ?  
→ Assurez-vous d'avoir ajouté `<Projects />` dans `App.tsx`

❌ Drag-and-drop ne marche pas ?  
→ Rafrâichissez la page (Ctrl+R)

---

## 📚 Documentation complète

Voir le fichier `GUIDE_PROJETS.md` pour plus de détails sur :
- La structure des fichiers
- La personnalisation CSS
- Les options avancées
- Les exemples complets

---

## ✨ Résultat final

Votre site aura maintenant :
- 📱 Page d'accueil avec hero
- 🎨 Galerie de projets responsive
- 🎭 Manifestaire
- 🤖 Captcha dystopique amusant
- 📧 Section contact

Profitez ! 🚀
