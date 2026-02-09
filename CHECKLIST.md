# ✅ CHECKLIST RAPIDE

## 🚀 AVANT DE COMMENCER
- [ ] `npm install` (si nécessaire)
- [ ] `npm run dev` dans le terminal
- [ ] Ouvrir http://localhost:5173

---

## 🎭 TESTER "ARE YOU HUMAN"
- [ ] Aller dans le menu → "ARE YOU HUMAN"
- [ ] Essayer de drag-and-drop les mots
- [ ] Tester l'ordre correct: WORK → BUY → CONSUME → REPEAT → DIE
- [ ] Vérifier le message de validation ✓

---

## 📁 PRÉPARER LES IMAGES
- [ ] Créer le dossier `public/images/`
- [ ] Créer les sous-dossiers pour chaque projet
  - [ ] `public/images/mon-projet-1/`
  - [ ] `public/images/mon-projet-2/`
  - [ ] etc.
- [ ] Copier vos images dans ces dossiers
- [ ] Vérifier la qualité (< 2MB par image)

---

## 💾 MODIFIER LES DONNÉES
- [ ] Ouvrir `src/data/projects.ts`
- [ ] Remplacer le premier projet
  - [ ] Changer `id`
  - [ ] Changer `title`
  - [ ] Changer `category`
  - [ ] Changer `year`
  - [ ] Changer `description`
  - [ ] Changer les chemins `images`
- [ ] Ajouter un 2e projet
- [ ] Sauvegarder le fichier

---

## 🎯 VOIR LES RÉSULTATS
- [ ] Aller sur http://localhost:5173
- [ ] Vérifier que les images d'apparaissent bien
- [ ] Cliquer sur un projet pour ouvrir la modal
- [ ] Tester la navigation ← →
- [ ] Vérifier que ça marche sur mobile

---

## 🎨 INTÉGRER PROJECTS (OPTIONNEL)
- [ ] Ouvrir `src/App.tsx`
- [ ] Ajouter l'import : `import Projects from './components/Projects';`
- [ ] Ajouter `<Projects />` dans le JSX
- [ ] Sauvegarder
- [ ] Rafraîchir le navigateur

---

## ✨ PERSONNALISER (OPTIONNEL)
- [ ] Changer les couleurs (couleurs Tailwind)
- [ ] Changer le nombre de colonnes (lg:grid-cols-3)
- [ ] Modifier la description des projets
- [ ] Ajouter des liens externes

---

## 📚 SI VOUS AVEZ DES QUESTIONS
- [ ] Lire **DEMARRAGE_RAPIDE.md** (5 min)
- [ ] Lire **GUIDE_PROJETS.md** (si détails)
- [ ] Lire **COMMENT_INTEGRER_PROJECTS.md** (pour Projects)

---

## 🚀 PRÊT À DÉPLOYER ?
- [ ] Tester sur desktop
- [ ] Tester sur mobile
- [ ] Tester sur tablette
- [ ] Vérifier tous les liens
- [ ] Vérifier les images

```bash
npm run build     # Compiler
npm run preview   # Tester le build
```

---

## 📝 NOTES RAPIDES

**Fichiers les plus importants:**
- `src/data/projects.ts` ← Votre contenu
- `src/components/Projects.tsx` ← Le composant
- `src/App.tsx` ← L'intégration

**À ne pas toucher (sauf si important):**
- `src/components/AreYouHuman.tsx`
- `src/components/Gallery.tsx`
- `src/components/Hero.tsx`
- `src/components/Manifesto.tsx`

**Dossiers à créer:**
- `public/images/`
- `public/images/[votre-projet-1]/`
- `public/images/[votre-projet-2]/`
- etc.

---

**Durée estimée:** 30-45 min pour la configuration complète  
**Niveau de difficulté:** 🟢 Facile  
**Support:** Consultez les fichiers .md

✨ Bon travail ! 🚀
